if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('UserFactory',[
        'MessageFactory',
        function (MessageFactory) {
            var get_checkNicknameUnique = function(scope){
                var r = true;
                if(scope.userData.length){
                    for(var e in scope.userData){
                        if(scope.userData[e].nickname==scope.user.nickname){r=false;break;}
                    }
                }
                return r;
            }
            var set_gridOptions = function (scope) {
                scope.gridOptionsUser = { 
                    data: 'userData',
                    showGroupPanel: false,
                    columnDefs: [
                        {field: 'nickname', displayName: 'Nick-Name'},
                        {field: 'firstname', displayName: 'Vorname'},
                        {field: 'secondname', displayName: 'Nachname'},
                        {displayName: 'Aktion', cellTemplate: 'templates/grid-options-user-template.html'}
                    ]
                };
            }
            var set_addUserData = function (scope) {
                scope.user.id = scope.userAutoId();
                scope.userData.push(angular.copy(scope.user));
                set_gridOptions(scope);
                scope.user = {nickname: '', firstname: '', secondname: '', id: 0};
            }
            var set_addUser = function (scope) {
                var isok = true;
                if ( ! scope.userForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if( ! get_checkNicknameUnique(scope)){
                    MessageFactory.set_error("Der Nickname existiert schon.");
                    isok = false;
                }
                if(isok){
                    set_addUserData(scope);
                }
                return isok;
            }
            var set_deleteUser = function (id, scope) {
                var res = [];
                for(var e in scope.userData){
                    if(scope.userData[e].id != id){
                        res.push(scope.userData[e]);
                    }
                }
                scope.userData = res;
                set_gridOptions(scope);
            }
            return {
                set_scopeAddUser: set_addUser,
                set_scopeDeleteUser: set_deleteUser,
                set_scopeGridOptions: set_gridOptions
            };
        }
    ]);
}