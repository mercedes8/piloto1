import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterForm = () => {
    const { signup } = useAuth();
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(user);
            setSuccessMessage('Registro exitoso. ¡Bienvenido!'); // Mensaje de éxito
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label htmlFor="username">Nombre de usuario:</label>
            <input type="text" name="username" id="username" value={user.username} onChange={handleChange} required />

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} required />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required />

            <button type="submit">Registrar</button>

            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Mostrar el mensaje de éxito */}
        </form>
    );
};

export default RegisterForm;
