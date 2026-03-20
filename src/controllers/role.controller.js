/*
Controladora: Roles
*/

const { Rol } = require('../models');
const { respuestaExitosa, respuestaErronea } = require('../utils/response');

const getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        return respuestaExitosa(res, 200, 'Roles cargados correctamente.', roles);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener los roles.', error.message);
    }
};

const crearRol = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return respuestaErronea(res, 400, 'El nombre del rol es obligatorio.');
        }

        const rolExiste = await Rol.findOne({where: {nombre} });

        if (rolExiste) {
            return respuestaErronea(res, 409, 'El rol ya existe.');
        }

        const rol = await Rol.create({nombre, descripcion});
        return respuestaExitosa(res, 200, 'Rol creado exitosamente.', rol);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al crear el rol.', error.message);
    }
};

const actualizarRol = async (req, res)=> {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const rol = await Rol.findByPk(id);

        if (!rol) {
            return respuestaErronea(res, 404, 'El rol no existe.');
        }

        await rol.update({nombre, descripcion});
        return respuestaExitosa(res, 200, 'Rol actualizado exitosamente.', rol);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al actualizar el rol.', error.message);
    }
};


const borrarRol = async (req, res)=> {
    try {
        const { id } = req.params;
        const rol = await Rol.findByPk(id); // Se busca por id (pk)

        if (!rol) {
            return respuestaErronea(res, 404, 'El rol no existe.');
        }

        await rol.destroy();
        return respuestaExitosa(res, 200, 'Rol eliminado exitosamente.', rol);
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al borrar el rol.', error.message);
    }
};

module.exports = {
    getRoles,
    crearRol,
    actualizarRol,
    borrarRol
};