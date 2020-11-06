var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	cart: {type: Object, required: true },
	address: {type: String, required: true},
	name: {type: String, required: true},
	reference: {type: String, required: true}
});
module.exports = mongoose.model("Order", OrderSchema);
