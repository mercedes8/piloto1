import { Router } from 'express';
import cloudinary from '../config/cloudinaryConfig.js'; // Importa el archivo configurado

const router = Router();

// Endpoint para generar la firma
router.post('/generate-signature', (req, res) => {
  try {
    const paramsToSign = req.body; // Los parámetros a firmar desde el cuerpo de la solicitud
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET // Usa la variable de entorno directamente
    );

    // Responder con la firma, apiKey y cloudName
    res.json({
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: 'Error al generar la firma', error: error.message });
  }
});

export default router;

