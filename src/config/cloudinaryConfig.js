// config/cloudinaryConfig.js
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
// Configuración de Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'dhmj0jngh',    // Reemplaza con tu nombre de nube
  api_key: '292767365161672',          // Reemplaza con tu API Key
  api_secret: 'G1eFOutpY8aeTLkUuLQxko9hn1s',    // Reemplaza con tu API Secret
});

export default cloudinary;

