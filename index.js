const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const flash = require('req-flash');
const moment = require('moment')
require('dotenv').config()
app.locals.moment = moment;
const port = process.env.PORT || 3000;
const passport = require('./config/passport')
const passport2 = require('./config/passport2')

app.use(express.urlencoded({ extended:true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport2.initialize());
app.use(passport2.session());
app.use(flash())


const empresaRoute = require('./routes/empresaRoute')
app.use(empresaRoute)

const clienteRoute = require('./routes/clienteRoute')
app.use(clienteRoute)

app.listen(port, ()=>{
    console.log("Serving on port " + port);
})