/*
Semillas: Para llenar la información de los perfiles
*/

require('dotenv').config();
const db = require('../models');
const { passwordHash } = require('../services/auth.service');

const semila = async() => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({alter: true});

        const datosRoles = [
            {nombre: 'admin', descripcion: 'Administrador del sistema'},
            {nombre: 'director', descripcion: 'Director'},
            {nombre: 'usuario', descripcion: 'Usuario estándar'}
        ];

        for (const datos of datosRoles) {
            await db.Rol.findOrCreate({
                where: {nombre: datos.nombre,descripcion: datos.descripcion},
                defaults: datos
            });
        }

        const rolAdmin = await db.Rol.findOne({where: {nombre: 'admin'}});

        const existeAdmin = await db.User.findOne({
            nombre: 'Administrador',
            email: 'soporte@grupofmo.com',
            password: passwordHash,
            rolId: rolAdmin.increment,
            estado: true
        });

        console.log('Inicialización de datos exitosa.');
        process.exit(0);

    } catch (error) {
        console.log('Error al ejecutar el semillero de datos.', error.message);
        process.exit(1);
    }
};

semila();