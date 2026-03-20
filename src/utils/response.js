/*
Utilerías: Funciones comunes
*/

const respuestaExitosa = (res, estado, mensaje, data = null) => {
    return res.status(estado).json({
        ok: true,
        mensaje,
        data
    });
};

const respuestaErronea = (res, estado, mensaje, data = null) => {
    return res.status(estado).json({
        ok: false,
        mensaje,
        data
    });
};

module.exports = {
    respuestaExitosa,
    respuestaErronea
};