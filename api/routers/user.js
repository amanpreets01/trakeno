const express = require('express');
const router = express.Router();
const Form = require('./../models/form');
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = require('./../../db/mongo_connection');

router.get('/form', (req, res,next) => {
    console.log('FORM');
    
    //res['req']['cookies']['_tracker'];
    res.render('form.html');
});

router.post('/save' , (req , res,next) => {
	var user = new Form({
		_id : new mongoose.Types.ObjectId(),
		email : req.body.email,
		password : req.body.password
	});
	MongoClient.connect(mongo_url , (err , client) => {
		client.db(process.env.DB).collection(process.env.COL).insertOne(user)
		.then(res => console.log(res)).catch(err => console.log(err));
	});
	});

module.exports = router;