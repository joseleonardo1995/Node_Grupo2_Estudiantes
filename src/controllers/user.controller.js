/*
Controladora: User
*/

const { User, Rol } = require('../models');
const { passwordHash } = require('../services/auth.service');
const { respuestaExitosa, respuestaErronea } = require('../utils/response');

const getUsuarios = async (req, res)=> {
    try {
        const usuarios = await User.findAll({
            attributes: {exclude: ['password']},
            include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });
        return respuestaExitosa(res, 200, 'Se obtuvieron todos los usuarios con éxito.', usuarios);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener los usuarios.', error.message);
    }
};

const getUsuarioId = async (req, res)=> {
    try {
        const usuario = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password']},
            include: [{model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        if (!usuario) {
            return respuestaErronea(res, 404, 'Usuario no encontrado.');
        }

        return respuestaExitosa(res, 200, 'Usuario encontrado.', usuario);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener el usuario.', error.message);
    }
};

const crearUsuario = async(req, res)=>{
    try {
        const { nombres, email, password, rolId, estado } = req.body;

        if (!nombres || !email || !password || !rolId) {
            return respuestaErronea(res, 400, 'Nombres, correo, clave y rol son obligatorios.');
        }

        const existeUsuario = await User.findOne({where: {email}});

        if (existeUsuario) {
            return respuestaErronea(res, 409, 'El usuario ya existe.');
        }

        const hashClave = await passwordHash(password);

        const usuario = await User.create({
            nombres,
            email,
            password: hashClave,
            rolId,
            estado
        });

        const usuarioCreado = await User.findByPk(usuario.id, {
            attributes: { exclude: ['password']},
            include: [{model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        return respuestaExitosa(res, 200, 'Usuario creado correctamente.', usuario);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al crear el usuario.', error.message);
    }
};

const actualizarUsuario = async (req, res)=> {
    try {
        const { nombres, email, password, rolId, estado} = req.body;
        const { id } = req.params;
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return respuestaErronea(res, 404, 'Usuario no encontrado,');
        }

        const actualizar = {
            nombres,
            email,
            rolId,
            estado
        };

        if (password) {
            actualizar.password = await passwordHash(password);
        }

        await User.update(actualizar);

        const usuarioActualizado = await User.findByPk(id, {
            attributes: { exclude: ['password']},
            include: [{ model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        return respuestaExitosa(res, 200, 'Usuario actualizado correctamente.', usuarioActualizado);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al actualizar el usuario.', error.message);
    }
};

const borrarUsuario = async (req, res)=> {
    try {
        const usuario = await User.findByPk(id);

        if (!usuario) {
            return respuestaErronea(res, 404, 'Usuario no encontrado,');
        }

        usuario.destroy();
        return respuestaExitosa(res, 200, 'El usuario ha sido eliminado.', null);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al borrar el usuario.', error.message);
    }
};

module.exports = {
    getUsuarios,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};