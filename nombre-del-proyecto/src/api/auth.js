import axios from 'axios'; // o desde './axios' si has creado una instancia personalizada

// Define la URL base para tus solicitudes de autenticación
const API_URL = 'http://localhost:4000/api/auth';

// Función para registrar un nuevo usuario
export const registerRequest = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; // Devuelve los datos de la respuesta para manejarla en el componente
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            console.error('Error en la respuesta:', error.response.data);
            throw new Error(error.response.data.message || 'Error en el registro');
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('Error:', error.message);
            throw new Error('Error al realizar la solicitud');
        }
    }
};

// Función para iniciar sesión
export const loginRequest = async (userData) => {
    try {
        console.log("Datos enviados para login:", userData); // Verificar datos enviados
        const response = await axios.post(`${API_URL}/login`, userData);

        console.log('Status de la respuesta:', response.status); // Imprimir el estado de la respuesta
        console.log('Headers de la respuesta:', response.headers); // Imprimir las cabeceras de la respuesta
        console.log('Datos de respuesta:', response.data); // Imprimir los datos de respuesta del servidor

        if (response.status === 200) {
            // Si hay datos, los devuelve; si no, lanza un error controlado
            if (response.data) {
                console.log('Mensaje del servidor:', response.data.message); // Verificar mensaje del servidor
                console.log('Usuario:', response.data.user); // Verificar datos de usuario
                return response.data;
            } else {
                throw new Error('Respuesta vacía del servidor');
            }
        } else if (response.status === 204) {
            // Manejar la respuesta 204: No Content
            console.warn('La respuesta es 204: No hay contenido');
            throw new Error('El servidor no devolvió datos');
        } else {
            throw new Error('Error inesperado en el inicio de sesión');
        }
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            console.error('Error en la respuesta:', error.response.data);
            throw new Error(error.response.data.message || 'Error en el inicio de sesión');
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('Error:', error.message);
            throw new Error('Error al realizar la solicitud');
        }
    }
};

// Función para verificar el token
export const verityTokenRequest = async (token) => {
    try {
        console.log("Token enviado para verificación:", token); // Verificar token enviado
        const response = await axios.get(`${API_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Datos de respuesta para verificación de token:", response.data); // Verificar datos de respuesta del token
        return response.data; // Devuelve los datos de la respuesta para manejarla en el componente
    } catch (error) {
        // Manejo de errores
        if (error.response) {
            console.error('Error en la respuesta:', error.response.data);
            throw new Error(error.response.data.message || 'Error al verificar el token');
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            throw new Error('No se recibió respuesta del servidor');
        } else {
            console.error('Error:', error.message);
            throw new Error('Error al realizar la solicitud');
        }
    }
};
