const express = require('express');
const router = express.Router();
const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'né segredo';
const {requireAuth} = require('../middleware/authMiddleware');


router.get('/storage',requireAuth,(req,res)=>{
    res.redirect('/farmacos');
 });
 
 router.get('/funcionarios',requireAuth,(req,res)=>{
     res.redirect('/usuarios');
 })
 
 router.get('/about',requireAuth, (req,res)=>{
     res.render('about',{title: 'Sobre'});
 });
 
 router.get('/menu',requireAuth,(req,res)=>{
     res.render('menu',{title: 'menu do adm'});
 })
 
 router.get('/autentificar',requireAuth,(req,res)=>{
     res.render('autentificar',{title: 'autentificar'});
 })
 
 router.get('/contratar',requireAuth,(req,res)=>{
     res.render('contratar',{title: 'contratar'});
 })
 
 router.get('/create',requireAuth, (req,res)=>{
     res.render('create',{title: 'Novo'});
 });

module.exports = router;