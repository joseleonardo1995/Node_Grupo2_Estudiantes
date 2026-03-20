/*
Modelo: Roles
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define(
    'Rol',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.STRING(150),
            allowNull: true
        }
    },
    {
        tableName: 'roles',
        timestamps: true
    }
);

module.exports = Rol;
