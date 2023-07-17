const models = require('../models/index')
const Produto = models.Produto
const Cliente = models.Cliente


async function principal(req,res){
    let cliente;
    if(!req.user.tipo){
        cliente = await Cliente.findByPk(req.user.id)
    }
    const produtos = await Produto.findAll()
    res.render('cliente/principal',{Produtos:produtos, Cliente:cliente})
}

async function detalhe(req,res){
    const produto = await Produto.findByPk(req.params.id)
    res.render('cliente/detalhe',{Produto:produto})
}

async function abrecadastro(req,res){
    res.render('cliente/cadastro')
}

async function cadastro(req,res){
    let cliente = await Cliente.create({
        nome:req.body.nome,
        email:req.body.email,
        senha:req.body.senha,
        endereco:req.body.endereco,
        cpf:req.body.cpf,
        foto:req.file.filename
    }).catch(function (err) {
        if(err){
            console.log(err)
            req.flash('msg','Problemas ao cadastrar o cliente: '+req.body.nome)
            return res.redirect('/logar')
        }
    })
    if (cliente) {
        req.flash('msg', 'Você cadastrou o cliente: ' + cliente.nome)
        return res.redirect('/logar')
    }
}

async function login(req,res){

}

module.exports = {
    principal,
    detalhe,
    abrecadastro,
    cadastro,
    login
}