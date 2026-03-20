/*
Gestión general de errores
*/

const manejadorErrores = (err, req, res, next) => {
    console.error(err);

    return res.status(500).json({
        ok: false,
        mensaje: 'Error interno del servidor',
        error: err.message
    });
};

module.exports = manejadorErrores;
