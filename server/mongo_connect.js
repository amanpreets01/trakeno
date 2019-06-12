const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://node-shop:@cluster0-bui2o.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
		console.log('Failed');
	});