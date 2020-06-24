var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	Email: {type: String, required: true},
	Password:{type: String, required: true}
});

UserSchema.plugin(passportLocalMongoose, {usernameField : "email"});

module.exports = mongoose.model("User", UserSchema);

