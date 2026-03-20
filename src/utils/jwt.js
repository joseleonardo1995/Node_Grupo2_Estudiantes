/*
 JWT: Generador de Tokens
*/

const jwt = require('jsonwebtoken');

const generarToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '2h'
        }
    );
};

module.exports = {
    generarToken
};