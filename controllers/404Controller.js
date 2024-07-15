const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';

const index = (req,res)=>{
    res.status(404).render('404',{title: '404'});
}

module.exports = {
    index
}