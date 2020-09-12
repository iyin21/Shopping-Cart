var express= require("express");
var app = express();
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passportLocalMongoose = require("passport-local-mongoose");
var logger = require("morgan");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(session);
var Book = require("./models/book");
var User = require("./models/user");
var Cart = require("./models/cart");
var seedDB = require("./seed");
//npm cache clean --force

seedDB();
//require routes
var indexRoutes = require("./routes/index");
var userRoutes = require("./routes/users")
//database
//mongoose.connect("mongodb://localhost/cart", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
mongoose.connect("mongodb+srv://Iyinoluwa:oluleke@books.olzyq.mongodb.net/books?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
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
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: mongoose.connection}),
	cookie: { maxAge: 180 * 60 * 1000}
}));
app.use(flash());
//configure passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
// passport.use(new LocalStrategy({
// 	usernameField: 'email',
// 	//passwordField: "password"
// }, User.createStrategy()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.session = req.session;
	res.locals.error = req.flash("error");
	res.locals.errors = req.flash("errors");
	next();
});

app.use("/users", userRoutes);
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