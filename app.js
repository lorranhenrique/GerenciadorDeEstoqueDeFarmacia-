const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Farmaco = require('./models/farmaco');
const Usuario = require('./models/usuario');
const {result,sortedLastIndexOf}=require('lodash');
const { title } = require('process');
const methodOverride = require('method-override');
const cors = require('cors');
const bycript = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const rotasLogin = require('./routes/rotasLogin');
const rotasUsuarios = require('./routes/rotasUsuarios');
const rotasFarmacos = require('./routes/rotasFarmacos.js');
const rotasAutentificar = require('./routes/rotasAutentificar');
const rotasLogout = require('./routes/rotasLogout');
const rotasRedirecionamento = require('./routes/rotasRedirecionamento');
const rotas404 = require('./routes/rotas404');
const cookieparser = require('cookie-parser');

const dbURI = 'mongodb+srv://lorranhrezendea:test1234@farmacia.jnm2nm8.mongodb.net/dados?retryWrites=true&w=majority&appName=farmacia';
mongoose.connect(dbURI)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(cookieparser())
app.use(morgan('dev')); 

app.use(rotasLogin);
app.use(rotasAutentificar);
app.use(rotasLogout);
app.use(rotasUsuarios);
app.use(rotasFarmacos);
app.use(rotasRedirecionamento);


// biscoitos 

app.get('/set-cookies',(req,res)=>{
    
    res.cookie('novoUsuario',false);
    res.cookie('Empregado',true,{maxAge: 1000*60*60*24, httpOnly: true, secure: true});
    res.send('voce esta com biscoitos');

})

app.get('/read-cookies',(req,res)=>{
    const cookies = req.cookies;
    console.log(cookies)

    res.json(cookies);
})

app.use(rotas404);


