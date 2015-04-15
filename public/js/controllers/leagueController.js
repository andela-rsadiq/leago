angular.module('leaGo')
  .controller('leagueCtrl', ['$scope', '$http', 'leaGoFactory', '$stateParams', '$mdDialog', function($scope, $http, leaGoFactory, $stateParams, $mdDialog) {
    $scope.teams = {};
    $scope.alert = '';
    $scope.league = {};
    var display = function() {
      leaGoFactory.queryLeague(function(data) {
        $scope.leagues = data;
      });
    };

    var displayTeam = function() {
      if($stateParams.leagueId) {
        
        leaGoFactory.findTeamsInOneLeague($stateParams.leagueId).then(function(data) {
          if(data.data.teams.length === 0) {
            console.log(data.data.teams.length);
            $scope.emptyDivAlert = true;
            $scope.showCreateTeamForm = function() {
              $scope.createTeamForm = true;
            };
          }
          else {
            $scope.emptyDivAlert = false;
            $scope.createTeamForm = true;
            alertMessage = null;
            $scope.teams = data.data.teams;
            $scope.league = data.data;
            console.log(data.data.teams);
            console.log(data.data.teams.length);
          }
        });
      }
    };

    var displayPlayer = function() {
      leaGoFactory.findPlayersInOneTeam($stateParams.leagueId, $stateParams.teamId).success(function(data) {
        $scope.players = data;
      });
    };
    
    $scope.createLeague = function(ev) {
      console.log('fsfsfd');

      if ($scope.leagueForm.$valid) {
        leaGoFactory.createLeague($scope.league).then(function(data) {
          $mdDialog.show(
            $mdDialog.alert()
            .title('Success!')
            .content('New Tournament has been created!')
            .ariaLabel('Create League Alert Dialog')
            .ok('Got it!')
            .targetEvent(ev)
          );
        }, function(error){
          $mdDialog.show(
            $mdDialog.alert()
            .title('This is an alert title')
            .content('Sorry, an error has occurred, league was not created!')
            .ariaLabel('Create League Alert Dialog')
            .ok('Got it!')
            .targetEvent(ev)
          );
        });
        $scope.reset();
        display();
      } else {
        alert("There are invalid fields");
      }
    };

    $scope.reset = function() {
      $scope.league = { name: '', durationOfTournament: '' };
      $scope.team = {name: ''};
    };

    var getLeague = $scope.getLeague = function(leagueId){
      leaGoFactory.getOneLeague(leagueId).success(function(data) {
        console.log(data);
        $scope.updateLeague = data;
      }).error(function(data) {
        //do something
      });
    };

    /*$scope.edit = function(leagueId) {
      $scope.editLeagueDiv = true;
      $scope.getLeague(leagueId);
      $scope.editLeague = function() {
        $scope.editLeagueDiv = false;
        leaGoFactory.updateLeague(leagueId, $scope.updateLeague).success(function(data) {
          alert('League details have been updated.');
          $scope.updateLeague = {};
          display();
        }).error(function(data) {
          alert('An error has occurred!');
        });
      }
    };*/

    $scope.edit = function(ev, leagueId) {
      $mdDialog.show({
        controller: ['$scope', '$mdDialog', function($scope, $mdDialog) {
          $scope.editLeagueDiv = true;
          getLeague(leagueId);
          $scope.editLeague = function() {
            $scope.editLeagueDiv = false;
            leaGoFactory.updateLeague(leagueId, $scope.updateLeague).success(function(data) {
              //alert('League details have been updated.');
              $mdDialog.show(
                $mdDialog.alert()
                .title('This is an alert title')
                .content('League details have been updated!')
                .ariaLabel('Successful edit League Dialog.')
                .ok('Got it!')
                .targetEvent(ev)
              );
              $scope.updateLeague = {};
              display();
            }).error(function(data) {
              $mdDialog.show(
                $mdDialog.alert()
                .title('This is an alert title')
                .content('An error has occurred!')
                .ariaLabel('Unsuccessful edit League Dialog.')
                .ok('Got it!')
                .targetEvent(ev)
              );
            });
          };
          $scope.hide = function() {
            $mdDialog.hide();
          };
          /*$scope.cancel = function() {
            $mdDialog.cancel();
          };*/
          $scope.hideEditLeague = function() {
            $scope.editLeagueDiv = false;
          };
/*          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };*/
        }],
        templateUrl: '../views/editLeagueTemplate.html',
        targetEvent: ev,
      })
      .then(function(answer) {
        $scope.alert = 'League details have been updated.';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };

    $scope.editTeamInit = function(teamId) {
      $scope.editTeamDiv = true;
      $scope.getTeam(teamId);
      $scope.editTeam = function() {
        $scope.editTeamDiv = false;
        leaGoFactory.updateTeam($stateParams.leagueId, teamId, $scope.updateTeam).success(function(data) {
          alert('Team details have been updated.');
          $scope.updateTeam = {};
          displayTeam();
        }).error(function(data) {
          alert('An error has occurred.' + data);
        });
      }
    };

    $scope.addPlayerInit = function() {
      $scope.addPlayerDiv = true;
    };

    $scope.hidePlayerForm = function() {
      $scope.addPlayerDiv = false;
    };

    $scope.hideEditLeague = function() {
      $scope.editTeamDiv = false;
    }

    $scope.addPlayer = function() {
      leaGoFactory.addPlayertoTeam($stateParams.leagueId, $stateParams.teamId, $scope.player).success(function(data) {
        console.log(data);
        displayPlayer();
      }).error(function(error) {
        alert('An error has occurred, player was not created, please try again.');
      });
    };

    

    $scope.getTeam = function(teamId) {
      leaGoFactory.getOneTeam($stateParams.leagueId, teamId).success(function(data) {
        $scope.updateTeam = data;
        console.log(data);
      }).error(function(data) {
        //do something
      });
    };

    $scope.removeLeague = function(ev, leagueId) {
      console.log(1, 'here');
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
      /*.parent(angular.element(document.body))*/
      .title('Are you sure you want to delete league?')
      .content('Details about this league would be not be accessible after deletion.')
      .ariaLabel('Lucky day')
      .ok('Please do it!')
      .cancel('No, keep league details')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
      leaGoFactory.deleteLeague(leagueId);
      $scope.alert = 'You decided to delete the league.';
      display();
    }, function() {
      $scope.alert = 'You decided to keep the league';
    });
    display();
  };

    $scope.addTeam = function() {
      leaGoFactory.createTeam($stateParams.leagueId, $scope.team).then(function(data) {
        alert('New Team has been added to league');
        $scope.teams.push(data.data);
      }, function(error){
        alert("Sorry, an error has occurred, team was not created!");
      });
      $scope.emptyDivAlert = false;
      $scope.team = {};
    },

    $scope.removeTeam = function(teamId) {
      var checkAction = confirm('Are you sure you want to delete team?');
      if(checkAction) {
        leaGoFactory.deleteTeam($stateParams.leagueId, teamId). success(function(data) {
          console.log(data);
          alert('Team has been deleted');
        }).error(function(error) {
          alert('Ooops, an error has occurred, please try again.')
        });
      }
      displayTeam();
    };

    $scope.init = function() {
      display();
      displayTeam();
      leaGoFactory.findPlayersInOneTeam($stateParams.leagueId, $stateParams.teamId).success(function(data) {
        $scope.players = data;
      });
    };

    $scope.viewPlayer = function(playerId) {
      leaGoFactory.displayPlayer($stateParams.leagueId, $stateParams.teamId, playerId). success(function(data) {
        console.log(data);
        $scope.result = data;
      }).error(function(error) {
        alert(error + ' has occurred, please try again!')
      });
    };
    $scope.init();
  }]);