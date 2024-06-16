const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const farmacoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    setor: {
        type: String,
        required: true
    }
},{timestamps: true})

const Farmaco = mongoose.model('Farmaco',farmacoSchema);
module.exports = Farmaco;