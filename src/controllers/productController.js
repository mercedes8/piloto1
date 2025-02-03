import Product from '../models/product-models.js';

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrlFrente, imageUrlEspalda } = req.body;
        const newProduct = new Product({ name, description, price, category, stock, imageUrlFrente, imageUrlEspalda });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto', error });
    }
};

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Busca todos los productos en la base de datos
        res.status(200).json(products); // Responde con la lista de productos
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Buscar productos (nueva funcionalidad)
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query; // Captura el parámetro de búsqueda desde la URL

        // Busca en los campos name, description y category usando expresiones regulares
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar productos', error });
    }
};
