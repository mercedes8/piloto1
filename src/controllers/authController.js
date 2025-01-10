import User from '../models/user-models.js';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        // Crear y guardar el nuevo usuario
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' }); // Mensaje de éxito
    } catch (error) {
        res.status(400).json({ message: 'Error en el registro', error });
    }
};

// Inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error });
    }
};
