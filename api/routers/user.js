const express = require('express');
const router = express.Router();
const Form = require('./../models/form');
const register = require('./../models/register');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = require('./../../db/mongo_connection');

router.get('/form', (req, res,next) => {
    console.log('FORM');
    
    //res['req']['cookies']['_tracker'];
    res.render('home.html');
});
router.post('/check',(req,res,next)=>{
	var det = new Form({
		email : req.body.email,
		password : req.body.password
	});
	console.log(det.password);
	MongoClient.connect(mongo_url , (err,client) => {
		client.db(process.env.DB).collection("register").findOne({'email':det.email})
		.then((doc) => {
			console.log(doc.password,det.password);
			if(doc.password == det.password){
				sess=req.session;
				sess.email;
				res.render('dash.html');
			}
		})
		.catch((err) => console.log(err));
	});
});

router.get('/dash',function(req,res){
	
})
router.post('/form' , (req , res,next) => {
	var reg = new register({
		_id : new mongoose.Types.ObjectId(),
		fname:req.body.FirstName,
		lname:req.body.LastName,
		orgname:req.body.OrganizationName,
		email : req.body.email,
		password : req.body.password,
		address: req.body.address,
		city:req.body.city,
		country:req.body.country,
		zip:req.body.zip,	
	});

	MongoClient.connect(mongo_url , (err , client) => {
		client.db(process.env.DB).collection("register").insertOne(reg)
		.then((doc) => {
			return res.render('home.html');
		})
		.catch(err => console.log(err));
	});

	});


module.exports = router;