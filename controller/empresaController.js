async function abrelogin(req, res, next) {
    res.render('empresa/login')
}

async function abrecadastro(req, res, next) {
    res.render('empresa/cadastro')
}

module.exports = {
    abrelogin,
    abrecadastro
}