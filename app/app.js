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

const router = express.Router();

app.use(morgan('dev'));
app.use(cors());
app.set('view engine' , 'html');
app.use('/assets',express.static('assets'));
app.engine('html', require('hbs').__express);
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