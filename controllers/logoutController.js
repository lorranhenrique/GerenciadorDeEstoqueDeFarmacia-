const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';
const cookieParser = require('cookie-parser');

const logout_index = (req,res)=>{
    res.cookie('jwt', '', { maxAge: 1 });
    res.send('<script>alert("Logout Executado"); window.location.href = "/";</script>');
}

module.exports = {
    logout_index
}