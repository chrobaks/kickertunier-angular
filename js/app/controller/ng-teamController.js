if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.controller('teamController',[
        '$scope', 
        'TeamFactory', 
        'StorageFactory',
        'MessageFactory',  
        function($scope, TeamFactory, StorageFactory, MessageFactory) {
            
            $scope.headertitle = "Control Team";
            
            $scope.teamData = [
                {teamname: 'Ateam', player_1: 'SChrobak', player_2: 'MChrobak', id: 1},
                {teamname: 'Vollenergie', player_1: 'PaulM', player_2: 'PaulaM', id: 2}
            ];
            
            $scope.formmsg = "Neues Team speichern";
            
            $scope.teamUserData = StorageFactory.get_storeUserData();
            
            $scope.addTeam = function () {
                if(TeamFactory.set_scopeAddTeam($scope)){
                    $scope.formmsg = "Neues Team speichern";
                }else{
                    $scope.formmsg = MessageFactory.get_error();
                }
            }
            
            $scope.deleteTeam = function (id) {
                if(StorageFactory.get_storeCheckTeamIsInActiveGame(id)){
                    alert("Das Team befindet sich in einem aktivem Spiel und kann nicht gelöscht werden!")
                }else{
                    TeamFactory.set_scopeDeleteTeam(id, $scope);    
                    StorageFactory.set_storeGameTeamDataScope($scope.teamData);
                }
            }
            
            TeamFactory.set_scopeGridOptions($scope);
            
            StorageFactory.set_storeTeamScope($scope);
            $scope.teamAutoId = StorageFactory.funcautoId("team");
            
        }
    ]);
}