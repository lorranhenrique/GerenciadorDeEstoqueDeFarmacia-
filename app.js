const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const storageRoutes = require('./routes/storageRoutes');

const {result,sortedLastIndexOf}=require('lodash');
const { title } = require('process');


//express app

const app = express();

//conectando o DB

//register view engine

app.set('view engine','ejs');

//listen to requests 

app.listen(3000);

//middleware static files 

 app.use(express.static('public'));
 app.use(morgan('dev'));

app.get('/',(req,res)=>{
    const produtos = [
        {nome: 'nesaldina', quantidade: 45, setor: 'a'},
        {nome: 'Dipirona', quantidade: 20, setor: 'b'},
        {nome: 'Tandrilax', quantidade: 90,setor: 'c'}
    ];
    res.render('storage',{title: 'Inicio',produtos});
});

app.get('/about', (req,res)=>{
    res.render('about',{title: 'Sobre'});
});

app.get('/create', (req,res)=>{
    res.render('create',{title: 'Novo'});
});

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
});

// app.use(express.static('public'));
// app.use(express.urlencoded({extended: true}));
// app.use(morgan('dev'));

//routes

