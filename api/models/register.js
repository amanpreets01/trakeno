const mongoose = require('mongoose');

const RegSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fname:{
        type : String,
		required : true,
    },
    lname:{
        type : String,
		required : true,
    },
    orgname:{
        type : String,
		required : true,
    },
	email:{
		type : String,
		required : true,
		unique : true
	},
	password : {
		type : String,
		required : true
    },
    address:{
        type : String,
		required : true,
    },
    city:{
        type : String,
		required : true,
    },
    country:{
        type : String,
		required : true,
    },
    zip:{
        type : Number,
		required : true,
    }
});

module.exports = mongoose.model('Reg',RegSchema);