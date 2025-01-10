import axiosInstance from './axiosConfig'; // Importa la configuración global de Axios

// Función para registrar un usuario
export const registerRequest = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData); // Cambiado a '/auth/register'
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error('Error en registro:', error); // Agrega un mensaje de error más específico
        throw error; // Re-lanza el error para manejarlo más adelante
    }
};

// Función para eliminar una imagen en Cloudinary
export const eliminarImagen = async (public_id) => {
    const timestamp = Math.floor(Date.now() / 1000); // Obtener el timestamp actual

    try {
        // Primero, obtener la firma desde tu servidor
        const response = await axiosInstance.post('/generate-signature', {
            public_id,
            timestamp
        });

        const { signature } = response.data; // Extrae la firma

        // Luego, hacer la solicitud de eliminación a Cloudinary
        const deleteResponse = await axiosInstance.post(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, 
            {
                public_id,
                api_key: process.env.CLOUDINARY_API_KEY, // Asegúrate de que esta variable esté configurada correctamente
                signature,
                timestamp
            }
        );

        return deleteResponse.data; // Devuelve la respuesta de Cloudinary
    } catch (error) {
        console.error('Error al eliminar la imagen:', error); // Maneja el error de eliminación
        throw error; // Re-lanza el error para manejarlo en el lugar que se invoque
    }
};

export default axiosInstance; // Exporta la instancia global de Axios también
