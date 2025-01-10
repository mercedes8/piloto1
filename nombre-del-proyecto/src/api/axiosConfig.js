import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Cambia esto según la URL de tu API
    timeout: 10000, // Establecer un tiempo de espera (opcional)
    headers: {
        'Content-Type': 'application/json', // Tipo de contenido por defecto
        // Puedes agregar más encabezados si es necesario
    },
});

// Manejo de errores global
axiosInstance.interceptors.response.use(
    (response) => {
        return response; // Si la respuesta es exitosa, simplemente devuelve la respuesta
    },
    (error) => {
        // Manejar errores aquí si es necesario
        if (error.response) {
            // La solicitud se realizó y el servidor respondió con un estado de error
            console.error('Error en la respuesta del servidor:', error.response);
        } else if (error.request) {
            // La solicitud se realizó pero no se recibió respuesta
            console.error('No se recibió respuesta del servidor:', error.request);
        } else {
            // Algo sucedió al configurar la solicitud que desencadenó un error
            console.error('Error al configurar la solicitud:', error.message);
        }
        return Promise.reject(error); // Rechaza la promesa para que el manejo de errores local pueda tomar acción
    }
);

export default axiosInstance;
