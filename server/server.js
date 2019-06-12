const express = require('express');
const loda = require('lodash');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./mongo_connect');


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine' , 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/form' , (req , res) => {
	res.render('form.html');

});

app.listen(port,() => {
	console.log(`Listening on port ${port}`);
});