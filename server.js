const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const Form = require('./api/models/Form');

const MongoClient = require('mongodb').MongoClient;

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

app.get('/form', (req, res ,next) => {
    console.log('FORM');
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
tracker.use((res) => {
	console.log(res);
});*/


const trackImg = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

app.get('/api/track/:campaign/:list/:id', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': trackImg.length
  })

  const { campaign, list, id } = req.params 
  const { things } = req.query
  
  // db.save() 

  console.log(things);
  
  res.end(trackImg)
});


const port  = process.env.PORT || 3000;


app.listen(port , () => {
	console.log(`Server listening at ${port}`);
});