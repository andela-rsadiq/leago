module.exports = function(app) {
  var playerCtrl = require('../controllers/players')

  app.ExpressRouter.route('/teams/:teamId/players')
  .get(playerCtrl.getPlayers)
  .post(playerCtrl.createPlayer);

  app.ExpressRouter.route('/teams/:teamId/players/:playerId')
  .put(playerCtrl.updatePlayer);

  app.ExpressRouter.param('playerId', playerCtrl.findPlayer);
}
