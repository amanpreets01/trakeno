const mongoose = require('mongoose');

const CampSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	cname: String,
	ctype : String,
	cstart : String,
	cend: String,
	ptype : String,
	url : {
		type : String
	}
});

module.exports = mongoose.model('Camp',CampSchema);