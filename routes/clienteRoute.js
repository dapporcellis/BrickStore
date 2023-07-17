const express = require('express')
const routes = express.Router()
const controller = require('../controller/clienteController')
const upload = require('../config/upload')

routes.get('/', controller.principal)
routes.get('/produto/:id', controller.detalhe)
routes.get('/logar', controller.abrecadastro)
routes.post('/logar', controller.login)
routes.post('/cadastrar', upload.single('foto'), controller.cadastro)

module.exports = routes