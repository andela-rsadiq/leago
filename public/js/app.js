var leaGo = angular.module('leaGo', [
  'ui.router', 
  'ngMaterial'
  // 'lodash'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      //$locationProvider.hashPrefix('!');
      
      $urlRouterProvider.otherwise('/home');
      $stateProvider.
      state('home', {
        url: '/home',
        templateUrl: '../views/home.html'
      }).
      state('leagues', {
        url: '/leagues',
        templateUrl: '../views/leagues.html',
        controller: 'leagueCtrl'
      }).
      state('leagues/id', {
        url: '/leagues/:leagueId',
        templateUrl: '../views/Games.html',
        controller: 'leagueCtrl'
      }).
      state('leagues/id/team/id/players', {
        url: '/leagues/:leagueId/teams/:teamId/players',
        templateUrl: '../views/teamDetails.html',
        controller: 'leagueCtrl'
      })/*.
      otherwise({
        redirectTo: '/home'
      })*/;
      $locationProvider.html5Mode(true);
    }
  ]);