import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import './TasksPage.css';

function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (tasks.length === 0) return <h1>pensi</h1>;

  return (
    <div className="grid-container">
      {tasks.map((task, index) => (
        <TaskCard task={task} key={task._id || index} />
      ))}
    </div>
  );
}

export default TasksPage;
