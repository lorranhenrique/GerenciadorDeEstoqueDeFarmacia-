const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { lowerCase } = require('lodash');
const { isLowercase } = require('validator');

const usuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: [true,'Por favor digite a sua senha'],
        minlenght: [6,'Minimo de 6 digitos'],
    },
    cargo: {
        type: String,
        required: true
    }
},{timestamps: true});

usuarioSchema.post('save', function(doc,next){
    
    console.log('Novo Usuario Criado',doc);
    next();
})

usuarioSchema.pre('save',function(next){
    
    console.log('sobre',this);
    next();
})

usuarioSchema.pre('save', async function(next){
    
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(this.senha,salt)
    next();
})

//metodo estatico de login 

// usuarioSchema.statics.login = async function(nome,senha,cargo){
//     const user = await this.findOne({nome});
//     if(user){
//         const auth = await bcrypt.compare(senha,user.senha);
//         if(auth){
//             return user
//         }
//     }

// }



const Usuario = mongoose.model('Usuario',usuarioSchema);
module.exports = Usuario;