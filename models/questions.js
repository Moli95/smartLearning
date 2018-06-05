var mongoose = require('mongoose');


// var answearsSchema = new mongoose.Schema({
//   "answear": String,
//   "isTrue": Boolean
// });

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
  // answears: [answearsSchema]
})


var Questions = mongoose.model('questions', questionsSchema);
module.exports = Questions;
