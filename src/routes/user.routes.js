/*
Rutas: Usuario
*/

const express = require('express');
const router = express.Router();

const {
    getUsuarios,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require ('../controllers/user.controller');

const { verificarToken } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', verificarToken, autorizar('admin'), getUsuarios);
router.get('/:id', verificarToken, autorizar('admin'), getUsuarioId);
router.post('/', verificarToken, autorizar('admin'), crearUsuario);
router.put('/:id', verificarToken, autorizar('admin'), actualizarUsuario);
router.delete('/:id', verificarToken, autorizar('admin'), borrarUsuario);

module.exports = router;