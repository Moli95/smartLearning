var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Questions = require('../models/questions');




router.get('/api/randomquestion', function (req, res) {
  var name = req.query.category;
  var value = req.query.value;
  var query = {};
  console.log(req.query);
  if(req.query.category) {
    query.category = name;
  }
  console.log(query);
  Questions.find(query).then(function(questions){
    var rnd = Math.floor(Math.random() * questions.length) + 0;
    if(questions.length == 0) {
      res.send("No questions available!");
    }
    console.log(questions);
    res.send(questions[rnd]);
  });
});


// POST request to add question to database
router.post('/api/addquestion', function (req, res) {
  // long version
  var question = new Questions(req.body);
  question.save();
  // question.create(req.body).then(function(question) {
  //   res.send(question);
  // });
  res.send(req.body);
});


// POST question to submit result of answerar in QUIZ

router.post('/api/submitanswear', function(req, res) {
	
});







module.exports = router;
