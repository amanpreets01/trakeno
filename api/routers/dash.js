// const express = require('express');
// const router = express.Router();
// const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;
// const mongo_url = require('./../../db/mongo_connection');

// router.get('/',(req,res,next)=>{
//     console.log(req.session.email);
// 	console.log(det.password);
// 	MongoClient.connect(mongo_url , (err,client) => {
// 		client.db(process.env.DB).collection("views").find({'email':det.email})
// 		.then((doc) => {
// 			console.log(doc.password,det.password);
// 			if(doc.password == det.password){
// 				req.session.user=doc.email;
// 				res.render('dash.html',{email:req.session.email});
// 				console.log('Sess-->'+req.session.user);
// 			}
// 			else{
// 				res.render('/user/form');
// 			}
// 		})
// 		.catch((err) => console.log(err));
// 	});
// });


// module.exports=router;