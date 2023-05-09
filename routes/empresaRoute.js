const express = require('express')
const routes = express.Router()
const controller = require('../controller/empresaController')
const upload = require('../config/upload')
const passport = require('../config/passport')

routes.get('/empresa', controller.abrelogin)
routes.post('/empresa', passport.authenticate('local', {
    successRedirect : '/perfil', 
    failureRedirect : '/empresa',
    failureFlash : true 
}))
routes.get('/cadastraempresa', controller.abrecadastro)
routes.post('/cadastraempresa', upload.single('logo'), controller.cadastrar)

module.exports = routes