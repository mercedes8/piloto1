import React, { createContext, useContext, useState, useEffect } from "react"; // Importa React aquí
import {
    createTaskRequest,
    deleteTaskRequest,
    getTasksRequest,
    updateTaskRequest,
} from '../api/tasks';

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    return context;
};

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    // Función para obtener las tareas
    const getTasks = async () => {
        try {
            const res = await getTasksRequest(); // Llamada a la función para obtener las tareas
            setTasks(res.data); // Asegúrate de que res.data contenga las tareas
        } catch (error) {
      
        }
    };

    // Llama a getTasks al montar el componente
    useEffect(() => {
        getTasks(); // Obtiene las tareas al iniciar
    }, []);

    // Función para crear una nueva tarea
    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
            setTasks([...tasks, res.data]); // Agrega la nueva tarea al estado
        } catch (error) {
            console.error("Error al crear tarea:", error);
        }
    };

    // Función para eliminar una tarea
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204) {
                setTasks(tasks.filter((task) => task._id !== id)); // Filtra la tarea eliminada
            }
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    // Función para obtener una tarea por ID
    const getTask = async (id) => {
        try {
            const res = await getTasksRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener tarea:", error);
        }
    };

    // Función para actualizar una tarea
    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
            // Aquí podrías implementar la lógica para actualizar el estado si lo deseas
        } catch (error) {
            console.error("Error al actualizar tarea:", error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
                deleteTask,
                getTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}
