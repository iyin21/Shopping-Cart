var express = require("express");
var router = express.Router();
//var Book = require("../models/book");
var passport = require("passport");
var {body, validationResult} = require("express-validator");
var User = require("../models/user");
var csrf = require("csurf");

var csrfProtection = csrf();
router.use(csrfProtection);

router.get("/profile", isLoggedIn, function(req, res){
	res.render("users/profile");
});

router.get("/signout", isLoggedIn, function(req, res){
	req.logout();
	res.redirect("/");
});

router.use('/', notLoggedIn, function(req, res, next){
	next();
});

router.get("/signup", function(req, res){
	res.render("users/signup",{csrfToken: req.csrfToken()});
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
		return res.render("users/signup", {
			error: errorMessage, //hasErrors: errorMessage.length >0
			
		})
	}else{
		var newUser = new User({email: req.body.email});
		User.register(newUser, req.body.password, function(err, user){
			if(err){
				console.log(err);
				req.flash("errors", err.message);
				return res.redirect("/");
			}
			passport.authenticate("local")(req, res, function(){
				if(req.session.oldUrl){
					var oldUrl = req.session.oldUrl;
					req.session.oldUrl = null;
					res.redirect(req.session.oldUrl)
				}else{
					res.redirect("users/profile");
				}
			});
		});

	}
	
});
router.get("/signin", function(req, res){
	res.render("users/signin", {csrfToken: req.csrfToken()})
})
router.post("/signin", passport.authenticate("local",
	{
		failureRedirect: "/users/signin",
		failureFlash: true
}), function(req, res, next){
	if(req.session.oldUrl){
		res.redirect(req.session.oldUrl)
		req.session.oldUrl = null;
	}else{
		res.redirect("users/profile");
	}

});


function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	req.flash("errors", "Please sign in first");
	res.redirect('users/signin');
}

function notLoggedIn(req, res, next){
	if(!req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
module.exports = router;