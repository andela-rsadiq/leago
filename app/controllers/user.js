var User = require('../models/user');
var _ = require('lodash');

module.exports.allUsers = function(req, res) {
  User.find(function(err, users) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(users);
    }
  });
};

module.exports.createUser = function(req, res) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({
        message: 'New user has been created!'
      });
    }
  });
};

module.exports.findUser = function(req, res, next) {
  User.findById(req.params.userId).populate('eventsScheduled').exec(function(err, user) {
    if(err) {
      res.send(err);
    }
    else {
      req.user = user;
      next();
    }
  });
};

module.exports.getUser = function(req, res) {
  res.json(req.user);
};

module.exports.updateUser = function(req, res) {
  var user = req.user;
  _.extend(user, req.body);
  user.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
};

module.exports.deleteUser = function(req,res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    res.json({
      message: "User has been deleted!"
    });
  });
}