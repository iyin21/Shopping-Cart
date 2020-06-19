var mongoose = require("mongoose");
var Book = require("./models/book");
//mongoose.connect("mongodb://localhost/cart");

var data = [
	{
		image: "https://i.pinimg.com/474x/e1/06/02/e1060277ef050d22c72726d0cae595d1.jpg",
		title: "The arrival of someday",
		description: "A well written memoir",
		price: 39	
	},
	{
		image: "https://i.pinimg.com/474x/de/0d/b6/de0db68999067d061bda491590bb80e7.jpg",
		title: "Apple",
		description:"Award winning book",
		price: 20	
	},
	{
		image: "https://i.pinimg.com/474x/b9/f5/2b/b9f52bbfd0d9ac38eee4a707b536eb05.jpg",
		title: "Dead man in a ditch",
		description: "Bold coloring, fun typography and intriguing",
		price: 35	
	},
	{
		image: "https://i.pinimg.com/474x/77/6a/6f/776a6f3c3738e266ab213c1771d6d996.jpg",
		title: "New waves",
		description: "An amazing novel",
		price: 40	
	},
	{
		image: "https://i.pinimg.com/564x/ea/f1/ef/eaf1ef57a0245da961351fba691fe5b8.jpg",
		title: "The woman in the green dress",
		description: "The enthralling novel from the acclaimed author of Look closer",
		price: 50	
	},
	{
		image: "https://i.pinimg.com/474x/61/65/6a/61656aa79188996aa2c9e4f91e7b1a6d.jpg",
		title: "A river in darkness",
		description: "National bestseller",
		price: 20	
	}
];
function seedDB(){
	//remove all books
	Book.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed books")
		//add
		data.forEach(function(seed){
			Book.create(seed, function(err, book){
				if(err){
					console.log(err)
				}else{
					console.log("Added a book");
				}
			})
		})
	})

}
module.exports = seedDB;


// var done = 0;
// for (var i=0; i< books.length; i++){
// 	books[i].save(function(err, result){
// 		done++
// 		if(done === books.length){
// 			exit();
// 		}
// 	});
// }

// function exit(){
// 	mongoose.disconnect();
// }