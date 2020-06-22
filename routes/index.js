var express = require("express");
var router = express.Router();
var Book = require("../models/book");
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
	res.redirect("/")
});

module.exports = router;