const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const storageRoutes = require('./routes/storageRoutes');
const Farmaco = require('./models/farmaco');
const Usuario = require('./models/usuario');


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
app.use(express.urlencoded({extended:true})); // aceitar dados de formulario
app.use(morgan('dev')); // vai cuidar dos logs do middleware

 // mongoose and mong sandbox routes

 //rotas
 
app.get('/storage',(req,res)=>{
    res.redirect('/farmacos');
});

app.get('/funcionarios',(req,res)=>{
    res.redirect('/usuarios');
})

app.get('/about', (req,res)=>{
    res.render('about',{title: 'Sobre'});
});

app.get('/menu',(req,res)=>{
    res.render('menu',{title: 'menu do adm'});
})

// app.get('/adm/storage',(req,res)=>{
//     res.render('adm/storage',{title:'teste'});
// })

//rotas de entrada

app.get('/usuarios',(req,res)=>{
    Usuario.find().sort({nome:1})
        .then((result)=>{
            res.render('funcionarios',{title: 'Todos os Funcionarios', usuarios: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/usuarios',(req,res)=>{
    const usuario = new Usuario(req.body);
    usuario.save()
        .then((result)=>{
            res.redirect('/menu');
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get('/farmacos',(req,res)=>{
    Farmaco.find().sort({nome:1})
        .then((result)=>{
            res.render('storage',{title: 'Todos os Farmacos', farmacos: result})
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/farmacos',(req,res)=>{
    const farmaco = new Farmaco(req.body);
    farmaco.save()
        .then((result)=>{
            res.redirect('/storage');
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

