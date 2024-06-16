const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    }
},{timestamps: true})

const Usuario = mongoose.model('Usuario',usuarioSchema);
module.exports = Usuario;