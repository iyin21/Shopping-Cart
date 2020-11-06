var express = require("express");
var router = express.Router();
var Book = require("../models/book");
var Cart = require("../models/cart");
var User = require("../models/user")
var Order = require("../models/order")
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
	 res.render("shop/shopping-cart", {books: cart.generateArray(), totalPrice: JSON.stringify(cart.totalPrice)})
});
router.get("/checkout", function(req, res){
	if(!req.session.cart){
		return res.render("shop/shopping-cart", {books:null});
	}
	 var cart = new Cart(req.session.cart);
	 res.render("shop/checkout", {user:User, username: JSON.stringify(User.email), totalPrice: JSON.stringify(cart.totalPrice)})
});
 router.get("/verify_transaction", function(req, res){
 	if(!req.session.cart){
		return res.render("shop/shopping-cart", {books:null});
	}
	 var cart = new Cart(req.session.cart);
 	const ref= req.query.reference 
 	const https = require('https')
	const options = {
	  hostname: 'api.paystack.co',
	  port: 443,
	  path: '/transaction/verify/:ref',
	  method: 'GET',
	  headers: {
	    Authorization: 'Bearer sk_test_964eb646e6f3eed17fc77b287789e827808ea80e'
	  }
	}
	https.request(options, res => {
	  let data = ''
	  resp.on('data', (chunk) => {
	    data += chunk
	  });
	  resp.on('end', () => {
	    console.log(JSON.parse(data))
	    response = JSON.parse(data);
	  })
	}).on('error', error => {
	  console.error(error)
	})
	var order = new Order({
		user: req.user,
		cart: cart,
		name: req.body.name,
		address: req.body.address,
		reference: ref
	});
	order.save(function(err, result){
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong")
		}else{
			req.flash("success", "Transaction successful")
			req.session.cart = null;
			res.redirect("/");
		}
	})
 	req.flash("success", "Transaction successful")
	req.session.cart = null;
	res.redirect("/");
 });
// router.post("/shopping-cart", async (req, res) => {
// 	if(!req.session.cart){
// 		return res.render("shop/shopping-cart", {books:null});
// 	}
// 	 var cart = new Cart(req.session.cart);
// 	// 2a. Get the order ID from the request body
// 	 // const orderID = req.body.orderID;
// 	 // let request = new paypal.orders.OrdersGetRequest(orderID);
// 	  // 3. Call PayPal to get the transaction details
// 	  const request = new paypal.orders.OrdersCreateRequest();
// 	  request.prefer("return=representation");
// 	  request.requestBody({
// 	    intent: 'CAPTURE',
// 	    purchase_units: [{
// 	      amount: {
// 	        currency_code: 'USD',
// 	        value: cart.totalPrice
// 	      }
// 	    }]
// 	  });

// 	  let order;
// 	  try {
// 	    order = await paypalClient.client().execute(request);
// 	  } catch (err) {

// 	    // 4. Handle any errors from the call
// 	    console.error(err);
// 	    return res.sendStatus(500);
// 	  }

// 	  //5. Return a successful response to the client with the order ID
// 	  res.json({
// 	    orderID: order.result.id
// 	  });
// 	  console.log(order.result.id);
	  // let order;
	  // try {
	  //   order = await paypalClient.client().execute(request);
	  // } catch (err) {

	  //   // 4. Handle any errors from the call
	  //   console.error(err);
	  //   return res.sendStatus(500);
	  // }

	  // // 5. Validate the transaction details are as expected
	  // if (order.result.purchase_units[0].amount.value !== cart.totalPrice) {
	  //   return res.sendStatus(400);
	  // }

	  // 6. Save the transaction in your database
	  // await database.saveTransaction(orderID);

	  // 7. Return a successful response to the client
	  //return res.send(200); 

	  // res.json({
	  //   orderID: order.result.id
	  // });
	  // console.log(order.result.id);
// });
// router.post("/capture", async(req, res) => {
// 	if(!req.session.cart){
// 		return res.render("shop/shopping-cart", {books:null});
// 	}
// 	 var cart = new Cart(req.session.cart);
// 	// 2a. Get the order ID from the request body
// 	  let captureDetails= "";
// 	  const orderID = req.body.orderID;

// 	  // 3. Call PayPal to capture the order
// 	  const request = new paypal.orders.OrdersCaptureRequest(orderID);
// 	  request.requestBody({});

// 	  try {
// 	    const capture = await paypalClient.client().execute(request);

// 	    // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
// 	    const captureID = capture.result.purchase_units[0].payments.captures[0].id;
// 	   // await database.saveCaptureID(captureID);
// 	    //captureDetails = capture.result;
//     // await database.saveCaptureID(captureID);
//     	//res.json(captureDetails);

// 	  } catch (err) {

// 	    // 5. Handle any errors from the call
// 	    console.error(err);
// 	    return res.sendStatus(500);
// 	  }

// 	  // 6. Return a successful response to the client
// 	  //res.send(200);
// 	  res.json({ details: captureDetails });
// 	  req.flash("success", "Transaction successful")
// 	  req.session.cart = null;
// 	  res.redirect("/");


// });

	


module.exports = router;