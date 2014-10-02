(function() {
    "use strict";
    angular.module('mainApp').controller('gameController', TeamController);

    TeamController.$inject = [
        '$scope',
        'TeamFactory',
        'MessageFactory'
    ];

    function TeamController($scope, TeamFactory, MessageFactory) {
        // SCOPE VAR headertitle  show controller header titel
        $scope.headertitle = "Control Team";
        // SCOPE VAR formmsg show formular messages
        $scope.formmsg = "Neues Team speichern";
        // SCOPE VAR teamdata stores all teams
        $scope.teamData = [
            {teamname: 'Ateam', player_1: 'SChrobak', player_2: 'MChrobak', id: 1},
            {teamname: 'Vollenergie', player_1: 'PaulM', player_2: 'PaulaM', id: 2}
        ];
        // SCOPE VAR teamuserdata stores all user
        // option values for selects
        $scope.teamUserData = [];
        // ADD NEW Team
        $scope.addTeam = addTeam;
        // DELETE Team
        $scope.deleteTeam = deleteTeam;
        // INIT Team SCOPE
        activate();
        /////////////////////////////////////////////////
        function activate() {
            TeamFactory.set_scopeInit($scope);
        }
        function deleteTeam(id) {
            if( ! TeamFactory.set_scopeDeleteTeam(id)){
                alert(MessageFactory.get_error());
            }
        }
        function addTeam() {
            if(TeamFactory.set_scopeAddTeam($scope)){
                $scope.formmsg = "Neues Team speichern";
            }else{
                $scope.formmsg = MessageFactory.get_error();
            }
        }
    }
})()