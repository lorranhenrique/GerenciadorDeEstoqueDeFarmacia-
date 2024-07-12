const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';


router.get('/storage',(req,res)=>{
    res.redirect('/farmacos');
 });
 
 router.get('/funcionarios',(req,res)=>{
     res.redirect('/usuarios');
 })
 
 router.get('/about', (req,res)=>{
     res.render('about',{title: 'Sobre'});
 });
 
 router.get('/menu',(req,res)=>{
     res.render('menu',{title: 'menu do adm'});
 })
 
 router.get('/autentificar',(req,res)=>{
     res.render('autentificar',{title: 'autentificar'});
 })
 
 router.get('/contratar',(req,res)=>{
     res.render('contratar',{title: 'contratar'});
 })
 
 router.get('/create', (req,res)=>{
     res.render('create',{title: 'Novo'});
 });

module.exports = router;