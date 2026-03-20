/*
Despliegue de la aplicación
*/

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');


const app = require('./app');
const db = require('./models');
const PORT = process.env.PORT || 3000;


const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const SSL_ENABLED = process.env.SSL_ENABLED === 'true';

const cargarSSL = () => {
    try {
        const rutaKEY = process.env.SSL_KEY_PATH;
        const rutaCRT = process.env.SSL_CERT_PATH;
        const rutaCA = process.env.SSL_CA_PATH;

        if (!rutaKEY || !rutaCRT) {
            throw new Error('No se han definido las variablaes SSL_KEY_PATH o SSL_CERT_PATH en el archivo de entorno');
        }

        const opcionesSSL = {
            key: fs.readFileSync(path.resolve(rutaKEY)),
            cert: fs.readFileSync(path.resolve(rutaCRT))
        };

        if  (rutaCA && rutaCA.trim() !== '') {
            opcionesSSL.ca = fs.readFileSync(path.resolve(rutaCA));
        }

        return opcionesSSL;

    } catch (error) {
        console.error('Error al cargar los certificados.', error.message);
        throw error;
    }
};

const iniciarServidor = async() => {
    try {
        await db.sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');
        await db.sequelize.sync({alter: true});
        console.log('Modelos sincronizados correctamente.');

        if (SSL_ENABLED) {
            const opcionesSSL = cargarSSL();

            http.createServer(app).listen(HTTPS_PORT, ()=> {
                console.log(`Servidor funcionando en el puerto: ${HTTPS_PORT}`);
            });
        } else {
            console.log('SSL deshabilitado, se inició el servidor HTTP.');

            http.createServer(app).listen(PORT, ()=> {
                console.log(`Servidor funcionando en el puerto: ${PORT}`);
            });
        }

    } catch(error) {
        console.log('Error al iniciar el servidor.', error.message);
    }
};

iniciarServidor();