const express = require('express');
const router = express.Router();
const Form = require('./../models/form');
const register = require('./../models/register');
const Camp = require('./../models/campaign');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = require('./../../db/mongo_connection');

router.get('/form', (req, res,next) => {
    //res['req']['cookies']['_tracker'];
    res.render('home.html');
});

router.post('/dash',(req,res,next)=>{
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
				req.session.user=doc.email;
				res.render('dash.html',{email:req.session.email});
				console.log('Sess-->'+req.session.user);
			}
			else{
				res.render('/user/form');
			}
		})
		.catch((err) => console.log(err));
	});
});

router.get('/campaign' , (req,res) => {
	res.render('campaign.html');
})

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
			return res.render('home.html');
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
			res.render('dash.html')
		})
		.catch(err => console.log(err));
	});
});

module.exports = router;