/*
Rutas: Roles
*/

const express = require('express');
const router = express.Router();

const {
    getRoles,
    crearRol,
    actualizarRol,
    borrarRol
} = require('../controllers/role.controller');

const { verificarToken } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', verificarToken, autorizar('admin'), getRoles);
router.post('/', verificarToken, autorizar('admin'), crearRol);
router.put('/:id', verificarToken, autorizar('admin'), actualizarRol);
router.delete('/:id', verificarToken, autorizar('admin'), borrarRol);

module.exports = router;