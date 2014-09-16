if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('TeamFactory',[
        'MessageFactory', 
        function (MessageFactory) {
            var get_checkTeamnameUnique = function (scope) {
                var r = true;
                if(scope.teamData.length){
                    for(var e in scope.teamData){
                        if(scope.teamData[e].teamname==scope.team.teamname){r=false;break;}
                    }
                }
                return r;
            }
            var get_checkPlayerNotDiff = function (team) {
                return (team.player_1.nickname===team.player_2.nickname);
            }
            var set_addTeamData = function (scope) {
                var newteam = {
                    teamname: scope.team.teamname, 
                    player_1: scope.team.player_1.nickname, 
                    player_2: scope.team.player_2.nickname, 
                    id: scope.teamAutoId()
                };
                scope.teamData.push(angular.copy(newteam));
                set_gridOptions(scope);
                scope.team = {teamname: '', player_1: '', player_2: '', id: 0};
            }
            var set_gridOptions = function (scope) {
                scope.gridOptionsTeam = { 
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
            var set_addTeam = function (scope) {
                var isok = true;
                if ( ! scope.teamForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if( ! get_checkTeamnameUnique(scope)){
                    MessageFactory.set_error("Der Teamname existiert schon.");
                    isok = false;
                }
                if(get_checkPlayerNotDiff(scope.team)){
                    MessageFactory.set_error("Ein Team benötigt zwei Mitspieler.");
                    scope.team.player_2 = "";
                    isok = false;
                }
                
                if(isok){
                    set_addTeamData(scope);
                }
                return isok;
            }
            var set_deleteTeam = function (id, scope) {
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
                set_scopeAddTeam: set_addTeam,
                set_scopeDeleteTeam: set_deleteTeam,
                set_scopeGridOptions: set_gridOptions
            };
        }
    ]);
}