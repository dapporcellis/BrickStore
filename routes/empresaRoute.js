const express = require('express')
const routes = express.Router()
const controller = require('../controller/empresaController')
const upload = require('../config/upload')
const passport = require('../config/passport')

routes.get('/cadastraempresa', controller.abrecadastro)
routes.post('/cadastraempresa', upload.single('logo'), controller.cadastrar)

routes.get('/empresa', controller.abrelogin)
routes.post('/empresa', passport.authenticate('local', {
    successRedirect : '/empresa/perfil', 
    failureRedirect : '/empresa',
    failureFlash : true 
}))

routes.get('/empresa/perfil', controller.perfil)

routes.get('/empresa/produtos', controller.produtos)

routes.get('/empresa/editaproduto/:id', controller.editaproduto)

routes.get('/empresa/addproduto', controller.addproduto)
routes.post('/empresa/addproduto', upload.single('foto'), controller.salvarproduto)


module.exports = routes