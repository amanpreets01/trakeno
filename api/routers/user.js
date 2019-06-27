const express = require('express');
const router = express.Router();
const Form = require('./../models/form');
const register = require('./../models/register');
const Camp = require('./../models/campaign');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = require('./../../db/mongo_connection');
var sess;
var mongo_result = {}

router.get('/form', (req, res,next) => {
    //res['req']['cookies']['_tracker'];
    res.render('home.hbs');
});

router.post('/dash',(req,res,next)=>{
	var det = new Form({
		email : req.body.email,
		password : req.body.password
	});
	var flag=0;
	var cname;
	MongoClient.connect(mongo_url , (err,client) => {
		client.db(process.env.DB).collection("register").findOne({'email':det.email})
		.then((doc) => {
			if(doc.password == det.password){
				var sess=req.session.user;
				req.session.user=doc.email;
				email=req.session.user;
				email=email.substring(0,email.indexOf('@'));
				flag=1;
				}
			else{
				flag=0;
			}
		})
		.catch((err) => console.log(err));
	});
	// MongoClient.connect(mongo_url , (err,client) => {
	// 	client.db(process.env.DB).collection("clicks").findOne({'cname':det.email})
	// 	.then((doc) => {
			
	// 	})
	// 	.catch((err) => console.log(err));
	// });
	// MongoClient.connect(mongo_url , (err,client) => {
	// 	client.db(process.env.DB).collection("visits").findOne({'email':det.email})
	// 	.then((doc) => {
	// 		if(doc.password == det.password){
	// 			var sess=req.session.user;
	// 			req.session.user=doc.email;
	// 			email=req.session.user;
	// 			email=email.substring(0,email.indexOf('@'));
	// 			flag=1;
	// 			}
	// 		else{
	// 			flag=0;
	// 		}
	// 	})
	// 	.catch((err) => console.log(err));
	// });	
	 MongoClient.connect(mongo_url , (err,client) => {
	 	client.db(process.env.DB).collection("register").findOne({'email':det.email})
	 	.then((doc) => {
	 		mongo_result.email = doc.email;
	 	});
	 	client.db(process.env.DB).collection("campaign").find()
	 	.toArray((err, result) => {
	 		mongo_result.campaign = result;  
    });
	 	client.db(process.env.DB).collection("clicks").find()
	 	.toArray((err, result) => {
	 		mongo_result.clicks = result;    	
    });
	 	client.db(process.env.DB).collection("visits").find()
	 	.toArray((err, result) => {
	 		mongo_result.visits = result;    
	 		return res.json(mongo_result);
	 		next();	
    });
	});
	
});




router.get('/dash',(req,res,next)=>{
	console.log("Hello");
	console.log(sess);
	// MongoClient.connect(mongo_url,(err,result)=>{
	// 	client.db(process.env.DB).collection("")
	// })
});



router.get('/campaign' , (req,res) => {
	res.render('campaign.hbs');
});



router.get('/logout',(req,res,next) => {
	if(req.session.email && req.cookie.user_sid){
		res.redirect('/user/form');
	}
	else{
		res.redirect('/user/form');
	}
});




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
			return res.render('home.hbs');
		})
		.catch(err => console.log(err));
	});

	});

router.post('/savecampaign' , (req,res,next) => {
	var det = new Camp({
	_id : mongoose.Types.ObjectId(),
	cname: req.body.cname,
	ctype : req.body.ctype,
	cstart : req.body.cstart,
	cend: req.body.cend,
	ptype : req.body.ptype,
	url : req.body.url+'&'+'cname='+req.body.cname+'&'+'ptype='+req.body.ptype
	});
	MongoClient.connect(mongo_url , (err,client) => {
		client.db(process.env.DB).collection('campaign').insertOne(det)
		.then((doc) => {
			res.render('dash.hbs')
		})
		.catch(err => console.log(err));
	});
});

module.exports = router;