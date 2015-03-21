var Player = require('../models/player');
var Team = require('../models/teams');
var _ = require('lodash');

module.exports.getPlayers = function(req, res) {
  res.send(req.team.players);
};

module.exports.createPlayer = function(req, res) {
  var team = req.team;

  var player = new Player(req.body);

  player.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      team.players.push(player);
      team.save(function(err) {
        if(err) {
          //do somn
        }
        else {
          res.json({
            message: "New player has been created and added to team!"
          }); 
        }
      });
    }
  });
};

module.exports.findPlayer = function(req, res, next) {
  Player.findById(req.params.playerId).exec(function(err, player) {
    if(err) {
      res.send(err);
    }
    else {
      req.player = player;
      next();
    }
  })
};

module.exports.updatePlayer = function(req, res) {
  var player = req.player;
  _.extend(player, req.body);
  player.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
};