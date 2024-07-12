const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');

router.get('/farmacos',(req,res)=>{
    Farmaco.find().sort({nome:1})
        .then((result)=>{
            res.render('storage',{title: 'Todos os Farmacos', farmacos: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.post('/farmacos',(req,res)=>{
    const farmaco = new Farmaco(req.body);
    farmaco.save()
        .then((result)=>{
            res.redirect('/storage');
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.get('/farmacos/:id', (req,res)=>{
    const id= req.params.id;
    Farmaco.findById(id)
        .then(result=>{
            res.render('detalhes',{farmacos: result,title: 'Gerenciando Medicamento'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

router.delete('/farmacos/:id',(req,res)=>{
    const id = req.params.id;
    
    Farmaco.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect: '/farmacos'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

// Rota para atualizar o fármaco
router.put('/farmacos/:id', (req, res) => {
    const id = req.params.id;

    // Logs para verificar os dados recebidos
    //console.log("Dados recebidos para atualização:", req.body);

    const updatedData = {
        nome: req.body.nome,
        quantidade: req.body.quantidade,
        setor: req.body.setor
    };

    Farmaco.findByIdAndUpdate(id, updatedData, { new: true })
        .then(result => {
            if (result) {
                console.log("Dados atualizados:", result);
                res.json({ redirect: `/storage` });
            } else {
                console.error("Fármaco não encontrado para atualização");
                res.status(404).json({ error: 'Fármaco não encontrado' });
            }
        })
        .catch(err => {
            console.error("Erro ao atualizar fármaco:", err);
            res.status(500).json({ error: 'Erro ao atualizar o fármaco' });
        });
});

// Rota para mostrar os detalhes do fármaco
router.get('/farmacos/:id', (req, res) => {
    const id = req.params.id;
    Farmaco.findById(id)
        .then(result => {
            res.render('detalhes', { farmacos: result, title: 'Gerenciando Medicamento' });
        })
        .catch(err => {
            console.log(err);
        });
});
module.exports = router