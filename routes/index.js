var express = require("express");
var router = express.Router();
var Book = require("../models/book");

router.get("/", function(req, res){
	Book.find({}).lean().exec(function(err, books){
		if(err){
			console.log(err);
		}else{
			res.render("index", {title: "Shopping Cart", books: books})
		}	
	});
});



module.exports = router;