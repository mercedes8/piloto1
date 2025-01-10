import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products'; // Asegúrate de que esta URL esté correcta

const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product);
        return response.data;
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
};

const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

// Nueva función para buscar productos
const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query },
        });
        return response.data; // Devuelve los productos que coincidan con la búsqueda
    } catch (error) {
        console.error('Error al buscar productos:', error);
    }
};

// Exportación de todas las funciones
export default { addProduct, getProducts, searchProducts };
