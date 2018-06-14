var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var resultsSchema = new mongoose.Schema({
  category: {
    type: String
  },
  history: {
    type: Array,
    default: [0,0,0]
  },
  good: {
    type: Number,
    default: 0
  },
  all: {
    type: Number,
    default: 0
  }
});

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  },
  scores: {
    type: Array,
    required: false,
    default: []
  },
  goodscores: {
    type: Number,
    required: false,
    default: 0
  },
  allscores: {
    type: Number,
    required: false,
    default: 0
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
