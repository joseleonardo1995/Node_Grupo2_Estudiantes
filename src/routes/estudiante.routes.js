/*
Rutas: Estudiantes
*/
const express = require('express');
const router = express.Router();

const controller = require('../controllers/estudiante.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', verificarToken, autorizar('director', 'admin'), controller.getEstudiantesAll);
router.get('/:id', verificarToken, autorizar('director', 'admin'), controller.getEstudiantesById);
router.post('/', verificarToken, autorizar('director', 'admin'), controller.createEstudiantes);
router.put('/:id', verificarToken, autorizar('director', 'admin'), controller.updateEstudiantes);
router.delete('/:id', verificarToken, autorizar('director', 'admin'), controller.removeEstudiantes);

module.exports = router;