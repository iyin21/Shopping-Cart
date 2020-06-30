var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var passport = require("passport");
var {body, validationResult} = require("express-validator");
var User = require("../models/user");
var csrf = require("csurf");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/", function(req, res){
	Book.find({}).lean().exec(function(err, books){
		if(err){
			console.log(err);
		}else{
			res.render("index", {title: "Shopping Cart", books: books})
		}	
	});
});

router.get("/signup", function(req, res){
	res.render("signup",{csrfToken: req.csrfToken()});
});
router.post("/signup", [body("email", "Invalid email").isEmail(), body("password", "Invalid password").isLength({min: 4})
	], function(req, res){
	var errors = validationResult(req);

	if(!errors.isEmpty()){
		// var error = [];
		// errors.forEach(function(error){
		var errorMessage = errors.array().map(function (elem) {
            return elem.msg;
        });	


		// });
		console.log(errorMessage);
		return res.render("signup", {
			error: errorMessage, //hasErrors: errorMessage.length >0
			
		})
	}else{
		var newUser = new User({email: req.body.email});
		User.register(newUser, req.body.password, function(err, user){
			if(err){
				console.log(err);
				req.flash("errors", err.message);
				res.redirect("signup");
			}
			passport.authenticate("local")(req, res, function(){
				res.redirect("profile");
			});
		});

	}
	
});
router.get("/signin", function(req, res, next){
	res.render("signin", {csrfToken: req.csrfToken()})
})
router.post("/signin", passport.authenticate("local",
	{
		successRedirect: "/profile",
		failureRedirect: "/signin"
}), function(req, res){

});

router.get("/profile", function(req, res){
	res.render("profile");
});
module.exports = router;