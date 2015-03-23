var Games = require('../models/games');
var League = require('../models/league');
var _ = require('lodash');

module.exports.createEvent = function(req, res) {
  var league = req.league;
  var game = new Games(req.body);

  game.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      league.games.push(game);
      league.save(function(err) {
        if(err) {
          res.send(err);
        }
        else {
          res.json({
            message: "New game event has been created!"
          });
        }
      });
    }
  });
};

module.exports.allEvents = function (req, res) {
  Games.find(function(err, games) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(games);
    }
  });
};

module.exports.findEvent = function(req, res, next) {
  Games.findById(req.params.gameId).exec(function(err, game) {
    if(err) {
      res.send(err);
    }
    else {
      req.game = game;
      next();
    }
  });
};

module.exports.getEvent = function(req, res) {
  res.json(req.game);
};

module.exports.updateEvent = function(req, res) {
  var game = req.game;
  _.extend(game, req.body);
  game.save(function(err, game) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({
        message: "This event has been updated!"
      });
    }
  });
};

module.exports.deleteEvent = function(req, res) {
  Games.remove({
    _id: req.params.gameId
  }, function(err, game) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({
        message: "Event has been deleted!"
      });
    }
  });
};