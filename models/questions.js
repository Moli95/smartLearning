var mongoose = require('mongoose');

var questionsSchema = new mongoose.Schema({
  questionID: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  questionText: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  category: {
  	type: String,
  	unique: false,
  	required: true,
  	trim: true
  }
  //,
  // answears: [
	// 	{
	// 		"answear": String,
	// 		"isTrue": Boolean
	// 	}
  //   ]
});



var Questions = mongoose.model('questions', questionsSchema);
module.exports = Questions;




// var express = require('express');
// var router = express.Router();

// console.log("bbb");
// // GET route for reading data
// router.get('/api/', function (req, res, next) {
//   return "bbb";
// });
