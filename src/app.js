/*
 Despliegue de los endpoint's
*/

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const manejadorErrores = require('./middlewares/error.middleware');
const { EmptyResultError } = require('sequelize');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.json({
        ok: true,
        mensaje: 'API del backend funcionando.'
    });
});

app.use('/api', routes);

app.use(manejadorErrores);

module.exports = app;