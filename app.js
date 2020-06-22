var express= require("express");
var app = express();
var hbs = require("express-handlebars");
var bodyParser = require("body-parser")
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var Book = require("./models/book");
var seedDB = require("./seed");
//npm cache clean --force

seedDB();
//require routes
var indexRoutes = require("./routes/index");
//database
mongoose.connect("mongodb://localhost/cart", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

//view engine setup
app.engine("hbs", hbs({defaultLayout: "layout", extname:".hbs"}));
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
//bodyparser setup
app.use(bodyParser.urlencoded({extended : true}));
//setup morgan
app.use(logger("dev"));
//public directory
app.use(express.static(__dirname +"/public"));
//Handle express-session
app.use(session({
	secret: "It is mine",
	resave: false,
	saveUninitialized: false

}));

app.use("/", indexRoutes);

app.listen("3000", function(){
	console.log("App running");
});
// // catch 404 and forward to error handler
// app.use(function(req, res, next){
// 	var err = new Error("Not found");
// 	err.status = 404;
// 	next(err);
// });
// //error handlers
// //development error handler
// if(app.get("env")==="development"){
// 	app.use(function(err, req, res, next){
// 		res.status(err.status || 500);
// 		res.render("error", {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }