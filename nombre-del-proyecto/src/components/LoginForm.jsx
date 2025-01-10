import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const { signin } = useAuth();
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(user);
        // Aquí podrías agregar redirección o mensaje de éxito
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} required />

            <label htmlFor="password">Contraseña:</label>
            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required />

            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginForm;
