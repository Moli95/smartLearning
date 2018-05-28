var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Questions = require('../models/questions');
// var express = require('express');
// var router = express.Router();

// console.log("bbb");
// // GET route for reading data
// router.get('/api/', function (req, res, next) {
//   return "bbb";
// });
console.log("aaaa");


router.get('/api/randomquestion', function (req, res) {
  Questions.find({}).then(function(questions){
    var rnd = Math.floor(Math.random() * questions.length) + 0;
    res.send(questions[rnd]);
  });
});



module.exports = router;