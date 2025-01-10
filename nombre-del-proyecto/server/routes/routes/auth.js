// task-manager-app/server/routes/auth.js
import express from 'express';

const router = express.Router();

// Ruta de registro
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    console.log(`Registering user: ${username}, ${email}`);
    res.status(201).send({ message: 'User registered successfully' });
});

export default router;
