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

CONNECTION_URL="mongodb+srv://node-shop:node-shop@cluster0-bui2o.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        else{
            console.log("Connected to ");
        }    
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
    //res['req']['cookies']['_tracker'];
    res.render('form.html');
});

app.post('/save' , (req , res,next) => {
	var user = new Form({
		_id : new mongoose.Types.ObjectId(),
		email : req.body.email,
		password : req.body.password
	});
  console.log(user);
	user.save().then((res) => {
		return res.status(200).send('Done');
	}).catch((err) => {
    console.log(err);
		return res.status(400).json({
			'message' : "Status failed"
		});
	});
});

app.get('/todos' ,(req, res) => {
  Form.find().then((todos) => {
    res.send(todos)
  } , (err) => {
    res.status(400).send('Not Found');
  });
});

const port  = process.env.PORT || 3000;


app.listen(port , () => {
	console.log(`Server listening at ${port}`);
});