const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cedula: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  nombres: {
    type: DataTypes.STRING(450),
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING(450),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telefono: {
    type: DataTypes.STRING(10)
  },
  programa: {
    type: DataTypes.STRING(100)
  },
  semestre: {
    type: DataTypes.INTEGER,
    validate: {
      isNumeric: true
    }
  }
}, {
  tableName: 'estudiantes',
  timestamps: false
});

module.exports = Estudiante;