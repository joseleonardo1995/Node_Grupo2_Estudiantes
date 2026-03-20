/*
Despliegue de los modelos en la base de datos
*/

const sequelize = require('../config/database');

const Rol = require('./role.model');
const User = require('./user.model');

Rol.hasMany(User, {
    foreignKey: 'rolId',
    as: 'usuarios'
});

User.belongsTo(Rol, {
    foreignKey: 'rolId',
    as: 'rol'
});



const db = {
    sequelize,
    Rol,
    User
};

module.exports = db;