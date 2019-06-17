const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Form = require('./api/models/Form');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const tracker = require('pixel-tracker');

// replace the uri string with your connection string.
const uri = "mongodb+srv://node-shop:node-shop@cluster0-bui2o.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(uri,{useNewUrlParser : true}, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else{
      console.log('Connected...');}
});

app.use(morgan('dev'));
app.use(cors());
app.set('views' , __dirname + '/views');
app.set('view engine' , 'html');
app.engine('html', require('hbs').__express);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/form', (req, res) => {
    console.log('FORM');
    res['req']['cookies']['_tracker'];
    res.render('form.html');
});

app.post('/save' , (req , res , next) => {
	const user = new Form({
		_id : new mongoose.Types.ObjectId(),
		email : req.body.email,
		password : req.body.password
	});
	user.save().then((res) => {
		return res.status(200).json('Done');
	}).catch((err) => {
		return res.status(400).json({
			'message' : "Status failed"
		});
	});
});

/*
app.all('/pixel' , tracker.middleware);
tracker.use((err , res) => {
  console.log(JSON.stringify(res, null, 2))
}).configure({
  disable_cookies : false
});*/

const port  = process.env.PORT || 3000;


app.listen(port , () => {
	console.log(`Server listening at ${port}`);
});