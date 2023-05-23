const models = require('../models/index')
const Empresa = models.Empresa
const bcrypt = require('bcrypt')
const passport = require('../config/passport')

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
    res.render('empresa/perfil')
}

async function produtos(req, res){
    res.render('empresa/produtos')
}


module.exports = {
    produtos,
    perfil,
    abrelogin,
    abrecadastro,
    cadastrar
}