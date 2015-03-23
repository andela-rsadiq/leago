module.exports = function(app) {
  var gamesCtrl = require('../controllers/games');

  app.ExpressRouter.route('/users/:userId/leagues/:leagueId/games')
  .post(gamesCtrl.createEvent)
  .get(gamesCtrl.allEvents);

  app.ExpressRouter.route('/users/:userId/leagues/:leagueId/games/:gameId')
  .get(gamesCtrl.getEvent)
  .put(gamesCtrl.updateEvent)
  .delete(gamesCtrl.deleteEvent);

  app.ExpressRouter.param('gameId', gamesCtrl.findEvent);
}