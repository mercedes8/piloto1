// config/cloudinaryConfig.js
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
// Configuración de Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'dyhcfc5vx',    // Reemplaza con tu nombre de nube
  api_key: '687429723932828',          // Reemplaza con tu API Key
  api_secret: 'sw36NGbOvbq8WHFRJdhiGJX7qXI',    // Reemplaza con tu API Secret
  CLOUDINARY_URL: 'cloudinary://687429723932828:sw36NGbOvbq8WHFRJdhiGJX7qXI@dyhcfc5vx', // Variable de entorno
});

export default cloudinary;

