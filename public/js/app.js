var leaGo = angular.module('leaGo', [
  'ngRoute', 
  'ngMaterial'
  ])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/home', {
        templateUrl: '../views/home.html'
      }).
      when('/leagues', {
        templateUrl: '../views/leagues.html',
        controller: 'leagueCtrl'
      }).
      when('/leagues/:leagueId', {
        templateUrl: '../views/Games.html',
        controller: 'leagueCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
    }
  ]);