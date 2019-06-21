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

app.use(morgan('dev'));
app.use(cors());
app.set('view engine' , 'html');
app.use('/assets',express.static('assets'));
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use(cookieParser());
app.use(session({secret:'',saveUninitialized:true,resave:true}));

module.exports = {app}