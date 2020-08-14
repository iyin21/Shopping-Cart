var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Cart = require("../models/cart");
var paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ASMvQeafoArGMg57vls5u1dYEBzarXEbaawj0UJBo-JUX-XypB9_2sQyTbksgi-LQROoNhktZny2hvDB',
  'client_secret': 'EPOGKnKu5LVRWEgt-pSCOt2-bYshPriIzudBBuVwQ83xbOZADYH2U-JhQQP_u6DZxV-3k2dmE6QHv_zK'
});
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
	if(!req.session.cart){
		return res.render("shop/shopping-cart", {books:null});
	}
	 var cart = new Cart(req.session.cart);
	 res.render("shop/shopping-cart", {books: cart.generateArray(), totalPrice: cart.totalPrice})
});
// router.get("/checkout", function(req, res){
// 	if(!req.session.cart){
// 		return res.redirect("shop/shopping-cart");
// 	}
// 	var cart = new Cart(req.session.cart);
// 	res.render("shop/checkout", {total: cart.totalPrice});
// });
// router.post("/checkout", function(req, res){
// });
// 	var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://localhost:3000",
//         "cancel_url": "http://localhost:3000/checkout"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "item",
//                 "sku": "item",
//                 "price": "1.00",
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": "1.00"
//         },
//         "description": "This is the payment description."
//     }]
// };

// 	paypal.payment.create(create_payment_json, function (error, payment){
// 	    if (error) {
// 	        throw error;
// 	    } else {
// 	        for(let i = 0; i< payment.links.length; i++){
// 	        	if(payment.links[i].rel === 'approval_url'){
// 	        		res.redirect(payment.links[i].href);
// 	        	}
// 	        // req.flash("success", "succesfully bought product");
// 	        // req.cart= null;	
// 	        }
// 	    }
// 	});
// 	var payerId = req.query.PayerID;
// 	var paymentId = req.query.paymentId;

// 	var execute_payment_json = {
// 	    "payer_id": "payerId",
// 	    "transactions": [{
// 	        "amount": {
// 	            "currency": "USD",
// 	            "total": "1.00"
// 	        }
// 	    }]
// 	};
// 	paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
// 	    if (error) {
// 	        console.log(error.response);
// 	        throw error;
// 	    } else {
// 	        console.log("Get Payment Response");
// 	        console.log(JSON.stringify(payment));
// 	        res.render("shop/index");
// 	    }
// 	});
	

// });
// router.get("/sucess", function(req, res){
	

// })

module.exports = router;