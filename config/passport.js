const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const models = require('../models/index')
const Empresa = models.Empresa

passport.use(new LocalStrategy({
    passReqToCallback: true
}, async function verify(req, username, password, cb) {
    let empresa = await Empresa.findOne({
        where: {
            email: username
        }
    });
    console.log(empresa)
    if (!empresa) {
        return cb(null, false, req.flash('msg', 'Email não encontrado.'))
    } else if (!await bcrypt.compare(password, empresa.senha)) {
        return cb(null, false, req.flash('msg', 'Senha incorreta.'))
    } else {
        return cb(null, empresa);
    }

}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, {
            id: user.id,
            email: user.email,
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


module.exports = passport