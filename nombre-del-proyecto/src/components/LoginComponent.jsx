import React, { useState } from 'react';
import { loginRequest } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        error: '',
        user: null,
    });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userData = { email: formState.username, password: formState.password };
            const data = await loginRequest(userData);
            console.log('Datos recibidos en el componente:', data);

            setFormState({ ...formState, user: data.user, error: '' });
            alert(data.message); // Muestra un mensaje de éxito

            // Redirige a TaskPage después del inicio de sesión
            navigate('/TaskPage');
        } catch (error) {
            console.error('Error en el componente:', error.message);
            setFormState({ ...formState, error: error.message });
        }
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <input
                type="text"
                name="username"
                placeholder="Correo electrónico"
                value={formState.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formState.password}
                onChange={handleChange}
            />
            <button onClick={handleLogin}>Ingresar</button>

            {formState.error && <p style={{ color: 'red' }}>{formState.error}</p>}
            {formState.user && (
                <div>
                    <h3>Bienvenido, {formState.user.username}!</h3>
                    <p>Email: {formState.user.email}</p>
                </div>
            )}
        </div>
    );
};

export default LoginComponent;
