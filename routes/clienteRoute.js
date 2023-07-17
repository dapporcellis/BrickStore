const express = require('express')
const routes = express.Router()
const controller = require('../controller/clienteController')
const upload = require('../config/upload')
const passport2 = require('../config/passport2')

routes.get('/', controller.principal)
routes.get('/produto/:id', controller.detalhe)
routes.get('/logar', controller.abrecadastro)
routes.post('/logar', passport.authenticate('local', {
    successRedirect : '/', 
    failureRedirect : '/logar',
    failureFlash : true 
}))
routes.post('/cadastrar', upload.single('foto'), controller.cadastro)

module.exports = routes