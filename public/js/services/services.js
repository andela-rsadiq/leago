angular.module('leaGo')
  .factory('leaGoFactory',['$http', '$routeParams', function($http, $routeParams) {
    return {
      queryLeague: function(load) {
        return $http.get('/leagues').success(function(data) {
          load(data);
        }).error(function(error) {
          alert("An error has occurred!");
        });
      },

      findOneLeague: function(data) {
        return $http.get('/leagues/' + $routeParams.leagueId);
      },
      createLeague: function(data) {
        return $http.post('/leagues', data);
      }
    };
  }]);