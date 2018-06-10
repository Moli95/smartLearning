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
    // if(res.send(req.query.category))
    var rnd = Math.floor(Math.random() * articles.length) + 0;
    if(articles.length == 0) {
      res.send("No articles available!");
    }
    res.send(articles[rnd]);
  });
});

// GET route to get all articles
router.get('/api/allarticles', function (req, res) {
  var name = req.query.category;
  var value = req.query.value;
  var query = {};
  console.log(req.query);
  if(req.query.category) {
    query.category = name;
  }
  if(req.query.title) {
    query.title = req.query.title;
  }
  if(req.query.tags) {
    console.log("są tagi");
    query.tags = req.query.tags;
  }
  if(req.query.id) {
    console.log("są tagi");
    query.articleID = req.query.id;
  }

  console.log(query);
  Article.find(query).then(function(items) {
    res.send(items);
  });
});

//POST route for category Search
router.post('/api/categorychange', function(req, res) {
  var url = '/articles?category=' + req.body.category + '&title=' + req.body.search;
  res.redirect(url);
});


// POST route for adding article
router.post('/api/addarticle', function (req, res) {
  Article.find({}).then(function(items){
  var dataToSend = {
    articleID: items.length + 1,
    title: req.body.title,
    category: req.body.category,
    text: req.body.text,
    image: req.body.image,
    source: req.body.source,
    tags: req.body.tags.split(" ")
  };
  console.log("UWAGA");
  console.log(dataToSend);
  var article = new Article(dataToSend);
  article.save();
  res.send(article);
  });
});

router.get('/api/articlecategories', function(req, res) {
  Article.find({}).then(function(items){
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


router.get('/articles/', function(req, res) {
  return res.sendFile('articles.html', { root: __dirname + '/../public/'});
});

router.get('/article/', function(req, res) {
  return res.sendFile('article.html', { root: __dirname + '/../public/'});
});




module.exports = router;
