const models = require('../models/index')
const Empresa = models.Empresa

async function abrelogin(req, res, next) {
    res.render('empresa/login')
}

async function abrecadastro(req, res, next) {
    res.render('empresa/cadastro')
}

async function cadastrar(req, res, next) {
    let empresa = await Empresa.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        logo: req.body.logo,
        registro: req.body.registro,
        telefone: req.body.telefone,
        endereco: req.body.endereco
    })
    req.flash('msg','Você cadastrou a empresa: '+empresa.nome)
    res.redirect('/empresa')
}

module.exports = {
    abrelogin,
    abrecadastro,
    cadastrar
}