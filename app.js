const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const storageRoutes = require('./routes/authRoutes');
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

//conectando o DB

const dbURI = 'mongodb+srv://lorranhrezendea:test1234@farmacia.jnm2nm8.mongodb.net/dados?retryWrites=true&w=majority&appName=farmacia';
mongoose.connect(dbURI)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err))

//register view engine

app.set('view engine','ejs');

app.use(express.static('public')); // permite indicar os arquivos e páginas públicas 
app.use(express.urlencoded({extended:true})); // aceitar dados de formulario
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // vai cuidar dos logs do middleware

 // mongoose and mong sandbox routes

 //middleware para verificar token 

 const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

    if (!token) {
        return res.status(401).send('Acesso não autorizado: Token não fornecido.');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.cargo = decoded.cargo;  // Adiciona o cargo ao request para uso posterior
        next();  // Passa para o próximo middleware ou rota
    } catch (err) {
        res.status(401).send('Token inválido ou expirado.');
    }
};
 //autentificação 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Em produção, deve ser true com HTTPS
}));

const SECRET_KEY = 'seu_segredo_super_secreto';

// Rota de login
app.post('/login', async (req, res) => {
    const { login, senha } = req.body;
    
    try {
        // Usar findOne para buscar um único usuário
        const usuario = await Usuario.findOne({ nome: login });
        
        if (usuario && usuario.senha === senha) {
            // Criar um token JWT com o cargo do usuário
            const token = jwt.sign({ cargo: usuario.cargo }, SECRET_KEY, { expiresIn: '1h' });

            // Redirecionar para /storage com o token como parâmetro de consulta
            res.redirect(`/storage?token=${token}`);
        } else {
            res.status(401).send('Credenciais inválidas.');
        }
    } catch (err) {
        console.error('Erro ao processar login:', err);
        res.status(500).send('Erro no servidor.');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout.');
        }
        res.redirect('/');
    });
});

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

app.get('/autentificar',(req,res)=>{
    res.render('autentificar',{title: 'autentificar'});
})

app.get('/contratar',(req,res)=>{
    res.render('contratar',{title: 'contratar'});
})

app.get('/create', (req,res)=>{
    res.render('create',{title: 'Novo'});
});


//rotas de entrada

app.get('/',(req,res)=>{
    Usuario.find().sort({nome:1})
    .then((result)=>{
        res.render('login',{title: 'login', usuarios: result});
    })
    .catch((err)=>{
        console.log(err);
    })
    
})

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
            res.redirect('/funcionarios');
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.get('/usuarios/:id', (req,res)=>{
    const id= req.params.id;
    Usuario.findById(id)
        .then((result)=>{
            res.render('detalhes-Funcionario',{usuarios: result,title: 'Gerenciando Funcionário'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.delete('/usuarios/:id',(req,res)=>{
    const id = req.params.id;

    Usuario.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect: '/usuarios'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.put('/usuarios/:id',(req,res)=>{
    const id = req.params.id;

    const updatedData = {
        nome: req.body.nome,
        senha: req.body.senha,
        cargo: req.body.cargo
    };

    Usuario.findByIdAndUpdate(id, updatedData, { new: true })
        .then(result => {
            if (result) {
                //console.log("Dados atualizados:", result);
                res.json({ redirect: `/funcionarios` });
            } else {
                //console.error("Fármaco não encontrado para atualização");
                res.status(404).json({ error: 'Usuario não encontrado' });
            }
        })
        .catch(err => {
            //console.error("Erro ao atualizar fármaco:", err);
            res.status(500).json({ error: 'Erro ao atualizar Funcionário' });
        });

})

app.get('/usuarios/:id',(req,res)=>{
    const id = req.params.id;
    Usuario.findById(id)
        .then(result => {
            res.render('detalhes-Funcionario', { usuarios: result, title: 'Gerenciando Funcionários' });
        })
        .catch(err => {
            console.log(err);
        });
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

app.get('/farmacos/:id', (req,res)=>{
    const id= req.params.id;
    Farmaco.findById(id)
        .then(result=>{
            res.render('detalhes',{farmacos: result,title: 'Gerenciando Medicamento'});
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.delete('/farmacos/:id',(req,res)=>{
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
app.put('/farmacos/:id', (req, res) => {
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
app.get('/farmacos/:id', (req, res) => {
    const id = req.params.id;
    Farmaco.findById(id)
        .then(result => {
            res.render('detalhes', { farmacos: result, title: 'Gerenciando Medicamento' });
        })
        .catch(err => {
            console.log(err);
        });
});

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
});


