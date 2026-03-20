/*
Módulo de Encripción/Desencripción
*/

const bcrypt = require('bcryptjs');

const passwordHash = async (password)=> {
    return await bcrypt.hash(password, 10);
};

const compararClave = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    passwordHash,
    compararClave
};