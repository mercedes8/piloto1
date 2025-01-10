import express from 'express';
import {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct,
    searchProducts
} from '../controllers/productController.js';

const router = express.Router();

// Rutas
router.get('/', getProducts); // Obtener todos los productos
router.post('/', createProduct); // Crear un nuevo producto
router.delete('/:id', deleteProduct); // Eliminar un producto
router.put('/:id', updateProduct); // Actualizar un producto
router.get('/search', searchProducts); // Buscar productos (nueva ruta)

export default router;
