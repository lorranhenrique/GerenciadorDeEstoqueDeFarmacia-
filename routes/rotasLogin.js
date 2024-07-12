const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';


router.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    
    try {
        // Usar findOne para buscar um único usuário
        const usuario = await Usuario.findOne({ nome: login });
        
        if (usuario && usuario.senha === senha) {
            const token = jwt.sign({ cargo: usuario.cargo }, SECRET_KEY, { expiresIn: '1h' });

            res.redirect(`/storage?token=${token}`);
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