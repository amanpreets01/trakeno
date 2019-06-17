const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	email:{
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
	}
});

module.exports = mongoose.model('Form',FormSchema);