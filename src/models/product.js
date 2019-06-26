'use-strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //é gerado automaticamente um _id
    title:{ //ex: Cadeira Gamer
        type: String,
        required: true,
        trim: true
    },
    slug:{ // ex: cadeira-gamer -- Deve ser unico
        type: String,
        required: [true, 'O slug é obrigatório'], //or true
        trim: true,
        index: true,
        unique: true
    },    
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    tags:[{
        type: String,
        required: true
    }]

});

module.exports = mongoose.model('Product', schema);