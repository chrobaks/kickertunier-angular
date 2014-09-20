if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('TeamFactory',[
        'StorageFactory',
        'MessageFactory', 
        function (StorageFactory, MessageFactory) {
            // STORE TEAM SCOPE
            var factoryScope = {};
            /**
            * get_checkTeamnameUnique
            *
            * @returns boolean if teamname not unique than false
            */
            var get_checkTeamnameUnique = function () {
                var r = true;
                if(factoryScope.teamData.length){
                    for(var e in factoryScope.teamData){
                        if(factoryScope.teamData[e].teamname==factoryScope.team.teamname){r=false;break;}
                    }
                }
                return r;
            }
            /**
            * get_checkPlayerNotDiff
            *
            * @returns boolean if player_1.nickname is not same player_2.nickname than false
            */
            var get_checkPlayerNotDiff = function () {
                return (factoryScope.team.player_1.nickname===factoryScope.team.player_2.nickname);
            }
            /**
            * set_gridOptions
            *
            * @description set ng-grid gridOptionsTeam
            * @returns void
            */
            var set_gridOptions = function () {
                factoryScope.gridOptionsTeam = { 
                    data: 'teamData',
                    showGroupPanel: false,
                    columnDefs: [
                        {field: 'teamname', displayName: 'Team-Name'},
                        {field: 'player_1', displayName: 'Spieler 1'},
                        {field: 'player_2', displayName: 'Spieler 2'},
                        {
                            displayName: 'Aktion',
                            cellTemplate: 'templates/grid-options-team-template.html'
                        }
                    ]
                };
            }
            /**
            * set_addTeamData
            *
            * @description set new team
            * @returns void
            */
            var set_addTeamData = function () {
                var newteam = {
                    teamname: factoryScope.team.teamname, 
                    player_1: factoryScope.team.player_1.nickname, 
                    player_2: factoryScope.team.player_2.nickname, 
                    id: factoryScope.autoId()
                };
                factoryScope.teamData.push(angular.copy(newteam));
                set_gridOptions();
                factoryScope.team = {teamname: '', player_1: '', player_2: '', id: 0};
            }
            /**
            * set_addTeam
            *
            * @description valided teamform and if ok run add func
            * @returns boolean if form not valid than false
            */
            var set_addTeam = function () {
                var isok = true;
                if ( ! factoryScope.teamForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if( ! get_checkTeamnameUnique()){
                    MessageFactory.set_error("Der Teamname existiert schon.");
                    isok = false;
                }
                if(get_checkPlayerNotDiff()){
                    MessageFactory.set_error("Ein Team benötigt zwei Mitspieler.");
                    factoryScope.team.player_2 = "";
                    isok = false;
                }
                
                if(isok){
                    set_addTeamData();
                }
                return isok;
            }
            /**
            * set_deleteTeam
            *
            * @description valided team not in a active game and if ok delete
            * @returns boolean if team in a active game than false
            */
            var set_deleteTeam = function (id) {
                var res = [];
                if(StorageFactory.get_storeCheckTeamIsInActiveGame(id)){
                    MessageFactory.set_error("Das Team befindet sich in einem aktivem Spiel und kann nicht gelöscht werden!");
                    return false;
                }else{
                    for(var e in factoryScope.teamData){
                        if(factoryScope.teamData[e].id != id){
                            res.push(factoryScope.teamData[e]);
                        }
                    }
                    factoryScope.teamData = res;
                    set_gridOptions();
                    StorageFactory.set_storeGameTeamDataScope(factoryScope.teamData);
                    return true;
                }
                
            }
            /**
            * set_init
            *
            * @description set default scope store
            * @returns void
            */
            var set_init = function(scope){
                factoryScope = scope;
                factoryScope.teamUserData = StorageFactory.get_storeUserData();
                set_gridOptions();
                StorageFactory.set_storeTeamScope(scope);
                factoryScope.autoId = StorageFactory.funcautoId("team");
            }
            return {
                set_scopeInit: set_init,
                set_scopeAddTeam: set_addTeam,
                set_scopeDeleteTeam: set_deleteTeam
            };
        }
    ]);
}