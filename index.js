import dotenv from 'dotenv';
import express from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno
if (!process.env.MONGODB_URI ) {
  console.error("Variables de entorno faltantes. Por favor, verifica el archivo .env");
  process.exit(1);
}

// Configuración
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Ruta para generar la firma
app.post("/generate-signature", (req, res) => {
  const { public_id, timestamp } = req.body;

  if (!public_id || !timestamp) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  const paramsToSign = `public_id=${public_id}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash("sha256").update(paramsToSign).digest("hex");

  res.json({ signature });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API está funcionando :)');
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err.message);
});
