const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const storageRoutes = require('./routes/storageRoutes');
const Farmaco = require('./models/farmaco');


const {result,sortedLastIndexOf}=require('lodash');
const { title } = require('process');


//express app

const app = express();



//conectando o DB

const dbURI = 'mongodb+srv://lorranhrezendea:test1234@farmacia.jnm2nm8.mongodb.net/dados?retryWrites=true&w=majority&appName=farmacia';
mongoose.connect(dbURI)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))

//register view engine

app.set('view engine','ejs');

app.use(express.static('public')); // permite indicar os arquivos e páginas públicas 
app.use(morgan('dev')); // vai cuidar dos logs do middleware

 // mongoose and mong sandbox routes

 //rotas
 
app.get('/storage',(req,res)=>{
    res.redirect('/farmacos');
});

app.get('/about', (req,res)=>{
    res.render('about',{title: 'Sobre'});
});

// app.get('/adm/storage',(req,res)=>{
//     res.render('adm/storage',{title:'teste'});
// })

//rotas de entrada

app.get('/farmacos',(req,res)=>{
    Farmaco.find().sort()
        .then((result)=>{
            res.render('storage',{title: 'Todos os Farmacos', farmacos: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/',(req,res)=>{
    res.render('login',{title: 'login'});
})

app.get('/autentificar',(req,res)=>{
    res.render('autentificar',{title: 'autentificar'});
})

app.get('/contratar',(req,res)=>{
    res.render('contratar',{title: 'contratar'});
})

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

