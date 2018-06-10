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


// router.get('/api/randomquestion', function (req, res) {
//   Questions.find({}).then(function(questions){
//     var rnd = Math.floor(Math.random() * questions.length) + 0;
//     res.send(questions[rnd]);
//   });
// });

// include routes






//POST route for updating questions
router.post('/addquestion', function (req, res, next) {
  if (req.body.questionID &&
    req.body.questionText &&
    req.body.answears) {

    var questionData = {
      questionID: req.body.questionID,
      questionText: req.body.questionText,
      answears: req.body.answears,
    }

    Questions.create(questionData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/YEAH');
      }
    });

  }
});


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile('index.html', { root: __dirname + '/../public/'});
});

router.get('/train-category-select', function (req, res, next) {
  return res.sendFile('category-select.html', { root: __dirname + '/../public/'});
});

router.get('/quiz-category-select', function (req, res, next) {
  return res.sendFile('category-select-quiz.html', { root: __dirname + '/../public/'});
});

router.get('/train', function (req, res, next) {
  return res.sendFile('question.html', { root: __dirname + '/../public/'});
});

router.get('/quiz', function (req, res, next) {
  return res.sendFile('quiz.html', { root: __dirname + '/../public/'});
});

router.get('/login', function (req, res) {
  return res.sendFile('login.html', { root: __dirname + '/../public/'});
});

router.get('/cards', function (req, res) {
  return res.sendFile('cards.html', { root: __dirname + '/../public/'});
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // console.log("JAZDA");
  // console.log(req.session.userId);
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      results: [1,0]
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return res.redirect('/login');
        } else {
          return res.sendFile('profile.html', { root: __dirname + '/../public/'});
          //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.results + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

router.get('/api/userscores', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          var response = {
            good: user.goodscores,
            all: user.allscores
          };
          return res.send(response);
        }
      }
    });
  });

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    console.log(req.session);
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


module.exports = router;
