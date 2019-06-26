const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session=require("express-session");
const userRoute = require('./../api/routers/user');
const trackRoute = require('./../api/routers/track');
const hbs=require('express-handlebars');
const path=require('path');


const router = express.Router();

app.use(morgan('dev'));
app.use(cors());
console.log(path.join(__dirname, '../views/'));
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:path.join(__dirname, '../views/')}));

app.set('view engine' , 'hbs');
app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: '1235 ',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
app.use(router);
app.use('/user',userRoute);
app.use('/track',trackRoute);

/*
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});*/

module.exports = {app}