// backend/src/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/product-models.js'; // Asegúrate de tener el modelo de producto

dotenv.config(); // Cargar el archivo .env antes de utilizar process.env

const app = express();
const PORT = process.env.PORT || 4000;

// Imprime la URI de MongoDB para verificar
console.log('URI de MongoDB:', process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB utilizando la URI de .env
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Rutas

// Ruta de prueba para verificar que el servidor funciona
app.get('/api', (req, res) => {
    res.send('API está funcionando :D');
});

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find(); // Obtiene todos los productos desde MongoDB
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, description, price, category, stock, imageUrl });
        await newProduct.save(); // Guarda el producto en MongoDB
        res.status(201).json(newProduct); // Devuelve el producto recién creado
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
