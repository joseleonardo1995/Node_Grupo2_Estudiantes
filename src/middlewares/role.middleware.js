/*
Middleware: Roles
*/

const { User, Rol } = require('../models');

const autorizar = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const usuario = await User.findByPk(req.usuario.id, {
                include: [
                    {
                        model: Rol,
                        as: 'rol',
                        attributes: ['id', 'nombre']
                    }
                ]
            });

            if (!usuario || !usuario.rol) {
                return res.status(403).json({
                    ok: false,
                    mensaje: 'Acceso denegado.'
                });
            }

            if (!allowedRoles.includes(usuario.rol.nombre)){
                return res.status(403).json({
                    ok: false,
                    mensaje: 'No tiene permisos para acceder a este recurso.'
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al validar permisos.',
                error: error.message
            });
        }
    };
};

module.exports = {
    autorizar
};