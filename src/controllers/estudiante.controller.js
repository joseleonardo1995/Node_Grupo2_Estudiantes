const Estudiante = require('../models/estudiante.model');

const ok = (res, message, data = null, status = 200) => {
  return res.status(status).json({
    ok: true,
    message,
    data
  });
};

const error = (res, message, status = 500, detail = null) => {
  return res.status(status).json({
    ok: false,
    message,
    detail
  });
};

// OBTENER TODOS LOS ESTUDIANTES
const getEstudiantesAll = async (req, res) => {
  try {
    const data = await Estudiante.findAll();
    return ok(res, 'Estudiantes obtenidos correctamente', data);
  } catch (err) {
    return error(res, 'Error al obtener estudiantes', 500, err.message);
  }
};

// OBTENER ESTUDIANTE POR ID
const getEstudiantesById = async (req, res) => {
  try {
    const data = await Estudiante.findByPk(req.params.id);

    if (!data) {
      return error(res, 'Estudiante no encontrado', 404);
    }

    return ok(res, 'Estudiante obtenido correctamente', data);
  } catch (err) {
    return error(res, 'Error al obtener el estudiante', 500, err.message);
  }
};

// CREAR ESTUDIANTE
const createEstudiantes = async (req, res) => {
  try {
    const { nombres, correo } = req.body;

    if (!nombres || !correo) {
      return error(res, 'Nombre y email son obligatorios', 400);
    }
    const existingEstudiante = await Estudiante.findOne({ where: { correo } });

    if (existingEstudiante) {
      return error(res, 'El correo ya está registrado', 400);
    }

    const existingCedula = await Estudiante.findOne({ where: { cedula: req.body.cedula } });
    
    if (existingCedula) {
      return error(res, 'La cédula ya está registrada', 400);
    }
    const estudiante = await Estudiante.create(req.body);

    return ok(res, 'Estudiante creado correctamente', estudiante, 201);
  } catch (err) {
    return error(res, 'Error al crear estudiante', 500, err.message);
  }
};

// ACTUALIZAR ESTUDIANTE
const updateEstudiantes = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);

    if (!estudiante) {
      return error(res, 'Estudiante no encontrado', 404);
    }

    await estudiante.update(req.body);

    return ok(res, 'Estudiante actualizado correctamente', estudiante);
  } catch (err) {
    return error(res, 'Error al actualizar estudiante', 500, err.message);
  }
};

// ELIMINAR ESTUDIANTE
const removeEstudiantes = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);

    if (!estudiante) {
      return error(res, 'Estudiante no encontrado', 404);
    }

    await estudiante.destroy();

    return ok(res, 'Estudiante eliminado correctamente');
  } catch (err) {
    return error(res, 'Error al eliminar estudiante', 500, err.message);
  }
};

module.exports = {
  getEstudiantesAll,
  getEstudiantesById,
  createEstudiantes,
  updateEstudiantes,
  removeEstudiantes
};