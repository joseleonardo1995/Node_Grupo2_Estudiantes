/*
Rutas: Autenticación
*/

const express = require('express');
const router = express.Router();

const { register, login, perfil } = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

module.exports = router;