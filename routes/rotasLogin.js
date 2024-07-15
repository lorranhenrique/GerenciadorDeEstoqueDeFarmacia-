const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';
const cookieParser = require('cookie-parser');

router.use(cookieParser());

//criando token
const maxAge =  200*60 *50; 
const createToken = (id)=>{
    return jwt.sign({id},'segredo',{
        expiresIn: maxAge
    });
}

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.send('<script>alert("Logout Executado"); window.location.href = "/";</script>');
});


router.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ nome: login });
        
        if (usuario && usuario.senha === senha) {
            const token = createToken(usuario._id);
            res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge})
            res.redirect(`/storage?token=${token},user:${usuario}`)
        } else {
            res.status(401).redirect('/?error=senha_invalida');
        }
    } catch (err) {
        console.error('Erro ao processar login:', err);
        res.status(500).send('Erro no servidor.');
    }
});

router.get('/',(req,res)=>{
    Usuario.find().sort({nome:1})
    .then((result)=>{
        res.render('login',{title: 'login', usuarios: result});
        
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

module.exports = router;