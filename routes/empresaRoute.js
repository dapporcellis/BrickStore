const express = require('express')
const routes = express.Router()
const controller = require('../controller/empresaController')
const upload = require('../config/upload')

routes.get('/empresa', controller.abrelogin)
routes.get('/cadastraempresa', controller.abrecadastro)
routes.post('/cadastraempresa', upload.single('logo'), controller.cadastrar)

module.exports = routes