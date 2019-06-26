'use strict';
const express = require('express'); //
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Conecta ao banco
mongoose.connect('mongodb+srv://israel:israel@ndstr-dbqgu.mongodb.net/test?retryWrites=true&w=majority')

//Carrega os Models
const Product = require('./models/product');

//Carrega as rotas
const indexRoutes = require('./routes/index-route');
const productRoutes = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended : false 
}));

app.use('/', indexRoutes);
app.use('/products', productRoutes);

module.exports = app;