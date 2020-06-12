var express= require("express");
var app = express();
var hbs = require("express-handlebars");
var bodyParser = require("body-parser")
var logger = require("morgan");


//require routes
var indexRoutes = require("./routes/index");
//view engine setup
//app.engine("hbs", hbs({defaultLayout: "layout"}));
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//bodyparser setup
app.use(bodyParser.urlencoded({extended : true}));
//setup morgan
app.use(logger("dev"));



app.use("/", indexRoutes);

app.listen("3000", function(){
	console.log("App running");
})