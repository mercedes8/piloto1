import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom"
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)

function TaskCard({ task }) {
    const { deleteTask } = useTasks();

}

export default TaskCard;
