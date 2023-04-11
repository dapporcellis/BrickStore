const express = require('express')
const routes = express.Router()
const controller = require('../controller/empresaController')

routes.get('/empresa', controller.abrelogin)
routes.get('/cadastraempresa', controller.abrecadastro)

module.exports = routes