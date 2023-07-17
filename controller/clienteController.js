const models = require('../models/index')
const Produto = models.Produto

async function principal(req,res){
    const produtos = await Produto.findAll()
    res.render('cliente/principal',{Produtos:produtos})
}

async function detalhe(req,res){
    const produto = await Produto.findByPk(req.params.id)
    res.render('cliente/detalhe',{Produto:produto})
}

async function abrecadastro(req,res){
    res.render('cliente/cadastro')
}

async function cadastro(req,res){
    
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