const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const mongo_url = require('./../../db/mongo_connection');


router.get('/save_clicks' , (req,res,next) => {
	console.log(req.query.key);
	const det = {
		vd : req.query.key.split('?cname=')[0],
		cname : req.query.key.split('?cname=')[1],
		ptype : req.query.ptype,
		click_id : req.query.click_id
	};
	console.log("CLicks:"+det);
	MongoClient.connect(mongo_url , (err , client) => {
		client.db(process.env.DB).collection('clicks').insertOne(det)
		.then((doc) => res.status(200).send())
		.catch((err) => res.status(404).send());
	})
	res.status(200).send('COOL');
});

router.get('/save_visits' , (req,res,next) => {
	console.log(req.query.key);
const det = {
		vd : req.query.key.split('?cname=')[0],
		cname : req.query.key.split('?cname=')[1],
		ptype : req.query.ptype,
		click_id : req.query.click_id
	};
	MongoClient.connect(mongo_url , (err , client) => {
		client.db(process.env.DB).collection('visits').insertOne(det)
		.then((doc) => res.status(200).send())
		.catch((err) => res.status(404).send());
	console.log(det);
});

});

module.exports = router;