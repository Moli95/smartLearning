var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Article = require('../models/article');


// GET route for random article
router.get('/api/randomarticle', function (req, res) {
  var name = req.params.category;
  var value = req.params.value;
  var query = {};
  if(req.params.category) {
    query[name] = value;
  }
  Article.find(query).then(function(articles){
    if(res.send(req.query.category))
    var rnd = Math.floor(Math.random() * articles.length) + 0;
    if(articles.length == 0) {
      res.send("No articles available!");
    }
    res.send(articles[rnd]);
  });
});

// GET route for random article from selected category
// router.get('/api/randomarticle', function (req, res) {
//
// });





module.exports = router;
