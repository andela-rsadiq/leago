/*var League = require('../model/league.js');

module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  app.use('/', router);

  router.use(function(req, res) {
    console.log("Something is also happening");
    next();
  });

  router.route('/league')
  .get(function(req, res) {
    League.find(err, league) {
      if(err)
        res.send(err);
      res.json(league);
    });
  })
  .post(function(req, res) {
    var player = new Player();
  })
}*/