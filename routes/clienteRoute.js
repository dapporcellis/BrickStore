const express = require('express')
const routes = express.Router()
const controller = require('../controller/clienteController')

routes.get('/', controller.principal)

module.exports = routes