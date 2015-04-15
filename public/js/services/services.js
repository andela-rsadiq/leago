angular.module('leaGo')
  .factory('leaGoFactory',['$http', function($http) {
    return {
      queryLeague: function(load) {
        return $http.get('/api/leagues').success(function(data) {
          load(data);
        }).error(function(error) {
          alert("An error has occurred!");
        });
      },

      createLeague: function(data) {
        return $http.post('/api/leagues', data);
      },

      getOneLeague: function(leagueId) {
        return $http.get('/api/leagues/' + leagueId);
      },

      updateLeague: function(leagueId, data) {
        console.log(data);
        console.log(leagueId);
        return $http.put('/api/leagues/' + leagueId, data);
      },

      deleteLeague: function(leagueId) {
        return $http.delete('/api/leagues/' + leagueId);
      },

      createTeam: function(leagueId, data) {
        console.log(data);
        return $http.post('/api/leagues/' + leagueId + '/teams', data);
      },

      getOneTeam: function(leagueId, teamId) {
        return $http.get('/api/leagues/' + leagueId + '/teams/' + teamId);
      },

      updateTeam: function(leagueId, teamId, data) {
        return $http.put('/api/leagues/' + leagueId + '/teams/' + teamId, data);
      },

      deleteTeam: function(leagueId, teamId) {
        return $http.delete('/api/leagues/' + leagueId + '/teams/' + teamId);
      },

      findTeamsInOneLeague: function(leagueId) {
        return $http.get('/api/leagues/' + leagueId);
      },

      findPlayersInOneTeam: function(leagueId, teamId) {
        return $http.get('/api/leagues/' + leagueId + '/teams/' + teamId + '/players');
      },

      addPlayertoTeam: function(leagueId, teamId, data) {
        return $http.post('/api/leagues/' + leagueId + '/teams/' + teamId + '/players', data);
      },

      displayPlayer: function(leagueId, teamId, playerId) {
        return $http.get('/api/leagues/' + leagueId + '/teams/' + teamId + '/players/' + playerId);
      }
    };
  }]);