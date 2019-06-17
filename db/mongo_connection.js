const assert = require('assert');


// Connection URL
const url = 'mongodb://node-shop:'+process.env.NODE_PASS+'@cluster0-shard-00-00-bui2o.mongodb.net:27017,cluster0-shard-00-01-bui2o.mongodb.net:27017,cluster0-shard-00-02-bui2o.mongodb.net:27017/trakeno?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';
module.exports = url;