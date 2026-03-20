/*
Controladora de Autenticación
*/

const { User, Rol } = require('../models');
const { passwordHash, compararClave} = require('../services/auth.service');
const { generarToken } = require('../utils/jwt');
const { respuestaExitosa, respuestaErronea } = require('../utils/response');

const register = async (req, res)=> {
    try {
        const {nombres, email, password, rolId } = req.body;

        if (!nombres || !email || !password) {
            return respuestaErronea(res, 400, 'Nombre, correo y clave son obligatorios');
        }

        // Se busca usuario por email
        const usuarioExiste = await User.findOne({where: {email} });

        if (usuarioExiste) {
            return respuestaErronea(res, 409, 'El correo ya está registrado.');
        }

        let rolasignado = rolId;

        if (!rolasignado) {
            const rolDefecto = await Rol.findOne({ where: { nombre: 'usuario' }});
            rolasignado =  rolDefecto ? rolDefecto.id : null;
        }

        if (!rolasignado) {
            return respuestaErronea(res, 400, 'No hay un rol válido para asignar.');
        }

        const hashClave = await passwordHash(password);

        const usuario = await User.create({
            nombres,
            email,
            password: hashClave,
            rolId: rolasignado
        });

        const rolUsuario = await User.findByPk(usuario.id, {
            attributes: {exclude: ['password']},
            include: [{model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        const token = generarToken({
            id: usuario.id,
            email: usuario.email
        });

        return respuestaExitosa(res, 201, 'Usuario registrado correctamente.', {
            usuario: rolUsuario,
            token
        });
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al registrar el usuario.', error.message);
    }
};

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return respuestaErronea(res, 400, 'Correo y clave son obligatorios.');
        }


        const usuario = await User.findOne({
            where: {email},
            include: [{model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        if (!usuario) {
            return respuestaErronea(res, 401, 'Credenciales no válidas.');
        }

        if (!usuario.estado) {
            return respuestaErronea(res, 403, 'Usuario inactivo.');
        }

        const claveValida = await compararClave(password, usuario.password);

        if (!claveValida) {
            return respuestaErronea(res, 401, 'Clave incorrecta.');
        }

        const token = generarToken({
            id: usuario.id,
            email: usuario.email
        });

        return respuestaExitosa(res, 200, 'Inicio de sesión exitosa.', {
            usuario: {
                id: usuario.id,
                nombres: usuario.nombres,
                email: usuario.email,
                password: usuario.password,
                estado: usuario.estado,
                rol: usuario.rol
            },
            token
        });
    } catch (error) {
        return respuestaErronea(res, 500, 'Error al iniciar sesión.', error.message);
    }
};

const perfil = async (req, res) => {
    try {
        const usuario = await User.findByPk(req.usuario.id, {
            attributes: {exclude: ['password']},
            include: [{model: Rol, as: 'rol', attributes: ['id', 'nombre']}]
        });

        if (!usuario) {
            return respuestaErronea(res, 404, 'Usuario no encontrado.');
        }

        return respuestaExitosa(res, 200, 'Perfil obtenido correctamente.', usuario);

    } catch (error) {
        return respuestaErronea(res, 500, 'Error al obtener el perfil del usuario.', error.message);
    }
};

module.exports = {
    register,
    login,
    perfil
};