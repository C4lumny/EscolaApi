const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');

// Rutas de registro
router.post('/registro/acudiente', authController.registroAcudiente);
router.post('/registro/administradores', authController.registroAdministrador);

// Rutas de inicio de sesión
router.post('/login', authController.login);

module.exports = {
    authRouter: router,
};
