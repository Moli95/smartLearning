var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  articleID: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  title: {
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
  },
  text: {
  	type: String,
  	unique: false,
  	required: true,
  	trim: true
  },
  image: {
  	type: String,
  	unique: false,
  	required: true,
  	trim: true
  },
  source: {
    type: String,
    unique: false,
    required: true
  },
  tags: [String]
  // tags: {
  //   type: Array,
  //   uniqie: false,
  //   required: true
  // }
});



var Article = mongoose.model('articles', articleSchema);
module.exports = Article;
