var mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
	image: {type: String, required: true},
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true}
});
module.exports = mongoose.model("Book", BookSchema);