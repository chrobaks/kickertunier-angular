if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('GameFactory',[
        'MessageFactory',
        function (MessageFactory) {
            
            var set_gridOptions = function (scope) {
                scope.gridOptionsGame = { 
                    data: 'gameData',
                    showGroupPanel: false,
                    columnDefs: [
                        {field: 'team_1', displayName: 'Team 1'},
                        {field: 'team_2', displayName: 'Team 2'},
                        {
                            displayName: 'Aktion',
                            cellTemplate: 'templates/grid-options-game-template.html'
                        }
                    ]
                };
            }
            var get_checkTeamNotDiff = function (game) {
                return (game.team_1.teamname===game.team_2.teamname);
            }
            var set_addGameData = function (scope) {
                var newgame = {
                    team_1: scope.game.team_1.teamname, 
                    team_2: scope.game.team_2.teamname
                };
                scope.gameActualTeamData = angular.copy(newgame);
                scope.game = {team_1: '', team_2: ''};
                scope.gameIsRunning = true;
            }
            var set_addGame = function (scope) {
                var isok = true;
                if ( ! scope.gameForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if(get_checkTeamNotDiff(scope.game)){
                    MessageFactory.set_error("Ein Spiel benötigt zwei Teams.");
                    scope.game.team_2 = "";
                    isok = false;
                }
                
                if(isok){
                    set_addGameData(scope);
                }
                return isok;
            }
            var set_deleteGame = function (id, scope) {
                var res = [];
                for(var e in scope.teamData){
                    if(scope.teamData[e].id != id){
                        res.push(scope.teamData[e]);
                    }
                }
                scope.teamData = res;
                set_gridOptions(scope);
            }
            return {
                set_scopeAddGame: set_addGame,
                set_scopeDeleteGame: set_deleteGame,
                set_scopeGridOptions: set_gridOptions
            };
        }
    ]);
}