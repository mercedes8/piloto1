import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import './TaskFormPage.css';

dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTasks, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue("date", dayjs(task.date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTasks(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input 
            type="text"
            placeholder="Title"
            {...register('title')}
            className="input"
            autoFocus
          />
          
          <label htmlFor="description">Description</label>
          <textarea 
            rows="3"
            placeholder="Description"
            {...register('description')}
            className="textarea"
          ></textarea>
          
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register('date')}
            className="date-input"
          />
          
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
