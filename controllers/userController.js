const Farmaco = require('../models/farmaco');
const Usuario = require('../models/usuario');

const user_index = (req,res)=>{
    Usuario.find().sort({nome:1})
        .then((result)=>{
            res.render('funcionarios',{title: 'Todos os Funcionarios', usuarios: result})
        })
        .catch((err)=>{
            console.log(err);
        })
}

const user_post = (req,res)=>{
    const usuario = new Usuario(req.body);
    usuario.save()
        .then((result)=>{
            res.redirect('/funcionarios');
        })
        .catch((err)=>{
            console.log(err);
        })
}

const user_put = (req,res)=>{
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

}

const user_index_det = (req,res)=>{
    const id= req.params.id;
    Usuario.findById(id)
        .then((result)=>{
            res.render('detalhes-Funcionario',{usuarios: result,title: 'Gerenciando Funcionário'});
        })
        .catch((err)=>{
            console.log(err);
        })
}

const user_delete = (req,res)=>{
    const id = req.params.id;

    Usuario.findByIdAndDelete(id)
        .then(result =>{
            res.json({redirect: '/usuarios'})
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = {
    user_delete,
    user_index,
    user_index_det,
    user_post,
    user_put
}