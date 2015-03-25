module.exports = function(app) {
  var playerCtrl = require('../controllers/players')

  app.ExpressRouter.route('/leagues/:leagueId/teams/:teamId/players')
  .get(playerCtrl.allPlayers)
  .post(playerCtrl.createPlayer);

  app.ExpressRouter.route('/leagues/:leagueId/teams/:teamId/players/:playerId')
  .get(playerCtrl.getPlayer)
  .put(playerCtrl.updatePlayer)
  .delete(playerCtrl.deletePlayer);

  app.ExpressRouter.param('playerId', playerCtrl.findPlayer);
}
