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
router.post('/api/addquestion', function (req, res, next) {
  // long version
  Questions.find({}).then(function(questions){
  console.log(req.body);
  var datatoSafe = {
    questionID: questions.length + 1,
    questionText: req.body.question,
    category: req.body.category,
    source: req.body.source,
    answears: [
      {
        isTrue: true,
        answear: req.body.answearA
      },
      {
        isTrue: false,
        answear: req.body.answearA
      },
      {
        isTrue: false,
        answear: req.body.answearC
      },
      {
        isTrue: false,
        answear: req.body.answearD
      }
    ]
  };
  console.log(datatoSafe);
  var question = new Questions(datatoSafe);
  question.save();
  // question.create(req.body).then(function(question) {
  //   res.send(question);
  // });
  res.send(question);
});
});


// POST question to submit result of answerar in QUIZ

router.put('/api/submitanswear/:id', function(req, res) {
  User.findOne({_id: req.params.id}).then(function(user) {
    var toUpdate = {
      goodscores: user.goodscores,
      allscores: user.allscores
    };
    if(req.body.score == 1) {
      toUpdate.goodscores++;
    }
    toUpdate.allscores++;
    User.findByIdAndUpdate({_id: req.params.id}, toUpdate).then(function() {
      User.findOne({_id: req.params.id}).then(function(user) {
        res.send(user);
    });
  });
  
});
});



router.get('/api/questioncategories', function(req, res) {
  Questions.find({}).then(function(items){
    console.log(items);
    var uniqueCategories = [];
    for(i = 0; i< items.length; i++){
      if(uniqueCategories.indexOf(items[i].category) === -1){
        uniqueCategories.push(items[i].category);
      }
    }
    res.send(uniqueCategories);
  });
});







module.exports = router;
