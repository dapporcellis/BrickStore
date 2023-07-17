const passport = require('passport')
const LocalStrategy = require('passport-local')
const models = require('../models/index')
const Cliente = models.Cliente

passport.use(new LocalStrategy({
    passReqToCallback: true
}, async function verify(req, username, password, cb) {
    let cliente = await Cliente.findOne({
        where: {
            email: username
        }
    });
    
    if (!cliente) {
        return cb(null, false, req.flash('msg', 'Email não encontrado.'))
    } else if (password!=cliente.senha) {
        return cb(null, false, req.flash('msg', 'Senha incorreta.'))
    } else {
        return cb(null, cliente);
    }
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            nome: user.nome,
            email: user.email,
            foto: user.foto,
            tipo: 'cliente'
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


module.exports = passport