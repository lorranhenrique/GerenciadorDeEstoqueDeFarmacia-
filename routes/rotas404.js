const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';

router.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
});


module.exports = router;