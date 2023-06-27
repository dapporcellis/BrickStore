const express = require('express')
const routes = express.Router()
const controller = require('../controller/clienteController')

routes.get('/', controller.principal)
routes.get('/produto/:id', controller.detalhe)

module.exports = routes