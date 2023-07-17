const models = require('../models/index')
const Empresa = models.Empresa
const Produto = models.Produto
const bcrypt = require('bcrypt')

async function abrelogin(req, res, next) {
    res.render('empresa/login', {msg:req.flash('msg')})
}

async function abrecadastro(req, res, next) {
    res.render('empresa/cadastro')
}

async function cadastrar(req, res, next) {

    const salt = bcrypt.genSaltSync(10);
    console.log('salt: '+salt)
    const senha = bcrypt.hashSync(req.body.senha, salt);
    console.log('senha: '+senha)
    
    let empresa = await Empresa.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: senha,
        logo: req.file.filename,
        registro: req.body.registro,
        telefone: req.body.telefone,
        endereco: req.body.endereco
    }).catch(function (err) {
        if(err){
            console.log(err)
            req.flash('msg','Problemas ao cadastrar a empresa: '+req.body.nome)
            return res.redirect('/empresa')
        }
    })
    if (empresa) {
        req.flash('msg', 'Você cadastrou a empresa: ' + empresa.nome)
        return res.redirect('/empresa')
    }
}

async function perfil(req, res){
    const empresa = await Empresa.findByPk(req.user.id)
    res.render('empresa/perfil', {Empresa:empresa})
}

async function produtos(req, res){
    const empresa = await Empresa.findByPk(req.user.id)
    const produtos = await Produto.findAll({where: {
        usuarioId: req.user.id
    }})
    res.render('empresa/produtos', {Produtos: produtos,Empresa:empresa})
}

async function addproduto(req, res){
    const empresa = await Empresa.findByPk(req.user.id)
    res.render('empresa/addproduto',{Empresa:empresa})
}

async function salvarproduto(req, res){
    const produto = new Produto()
    produto.nome = req.body.nome
    produto.descricao = req.body.descricao
    produto.categoria = req.body.categoria
    produto.valor = parseFloat(req.body.valor)
    produto.ativo = Boolean(req.body.ativo)
    produto.foto = req.file.filename
    produto.usuarioId = req.user.id
    await produto.save()
    res.redirect('/empresa/produtos')
}

async function editaproduto(req, res) {
    const empresa = await Empresa.findByPk(req.user.id)
    const produto = await Produto.findByPk(req.params.id)
    console.log(produto)
    res.render('empresa/editaproduto', {Produto: produto,Empresa:empresa})
}

module.exports = {
    editaproduto,
    salvarproduto,
    addproduto,
    produtos,
    perfil,
    abrelogin,
    abrecadastro,
    cadastrar
}