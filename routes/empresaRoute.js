const express = require('express')
const routes = express.Router()
const controller = require('../controller/empresaController')
const upload = require('../config/upload')
const passport = require('../config/passport')

routes.get('/empresa', controller.abrelogin)
routes.post('/empresa', passport.authenticate('local', {
    successRedirect : '/perfil', // redirect to the secure profile section
    failureRedirect : '/empresa', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))
routes.get('/cadastraempresa', controller.abrecadastro)
routes.post('/cadastraempresa', upload.single('logo'), controller.cadastrar)

module.exports = routes