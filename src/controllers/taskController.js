// src/controllers/taskController.js
import Task from '../models/task-models.js';


export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const task = new Task({ title, description, date, user: req.user.id });
    await task.save();
    res.status(201).json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
};

export const updateTask = async (req, res) => {
    const { title, description, date } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { title, description, date }, { new: true });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
};

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
};
