var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Cart = require("../models/cart");
// var passport = require("passport");
// var {body, validationResult} = require("express-validator");
// var User = require("../models/user");
// var csrf = require("csurf");

//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get("/", function(req, res){
	Book.find({}).lean().exec(function(err, books){
		if(err){
			console.log(err);
		}else{
			res.render("shop/index", {title: "Shopping Cart", books: books})
		}	
	});
});

router.get("/add-to-cart/:id", function(req, res){
	var bookId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Book.findById(bookId, function(err, book){
		if(err){
			return res.redirect("/");
		}
		cart.add(book, book.id);
		req.session.cart = cart;
		console.log(cart);
		res.redirect("/")

	});
});
router.get("/shopping-cart", function(req, res){
	if("!req.session.cart"){
		return res.render("shop/shopping-cart", {books:null})
	}
	 var cart = new Cart(req.session.cart);
	 return res.render("shop/shopping-cart", {books: cart.generateArray(), totalPrice: cart.totalPrice})
});


module.exports = router;