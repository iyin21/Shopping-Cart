var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var passport = require("passport");
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
	res.render("signup", {csrfToken: req.csrfToken()});
});
router.post("/signup", function(req, res){
	var newUser = new User({email: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.redirect("/signup");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
		})
	})
	res.render("signup");
});

module.exports = router;