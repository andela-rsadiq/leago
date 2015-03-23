var Player = require('../models/player');
var Team = require('../models/teams');
var League = require('../models/league');
var _ = require('lodash');

module.exports.allPlayers = function(req, res) {
  Player.find(function(err, players) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(req.team.players);
    }
  });
  //res.json(req.league.teams.players);
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
          res.send(err);
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

module.exports.getPlayer = function(req, res) {
  res.json(req.player);
};

module.exports.updatePlayer = function(req, res) {
  var player = req.player;
  _.extend(player, req.body);
  player.save(function(err, player) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({message: "Player's record has been updated!"});
    }
  });
};

module.exports.deletePlayer = function(req, res) {
  Player.remove({
    _id: req.params.playerId
  }, function(err, player) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({message: "Player has been deleted!"});
    }
  });
}