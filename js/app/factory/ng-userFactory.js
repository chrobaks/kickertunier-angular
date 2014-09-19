if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('UserFactory',[
        'StorageFactory',
        'MessageFactory',
        function (StorageFactory, MessageFactory) {
            // STORE USER SCOPE
            var factoryScope = {};
            /**
            * get_checkNicknameUnique
            *
            * @returns boolean if nickname not unique than false
            */
            var get_checkNicknameUnique = function(){
                var r = true;
                if(factoryScope.userData.length){
                    for(var e in factoryScope.userData){
                        if(factoryScope.userData[e].nickname==factoryScope.user.nickname){r=false;break;}
                    }
                }
                return r;
            }
            /**
            * set_gridOptions
            *
            * @description set ng-grid gridOptionsUser
            * @returns void
            */
            var set_gridOptions = function () {
                factoryScope.gridOptionsUser = { 
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
            /**
            * set_addUserData
            *
            * @description set new user
            * @returns void
            */
            var set_addUserData = function () {
                factoryScope.user.id = factoryScope.autoId();
                factoryScope.userData.push(angular.copy(factoryScope.user));
                set_gridOptions();
                factoryScope.user = {nickname: '', firstname: '', secondname: '', id: 0};
            }
            /**
            * set_addUser
            *
            * @description valided userform and if ok run add func
            * @returns boolean if form not valid than false
            */
            var set_addUser = function () {
                var isok = true;
                if ( ! factoryScope.userForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if( ! get_checkNicknameUnique()){
                    MessageFactory.set_error("Der Nickname existiert schon.");
                    isok = false;
                }
                if(isok){
                    set_addUserData();
                }
                return isok;
            }
            /**
            * set_deleteUser
            *
            * @description valided user not in a team and if ok delete
            * @returns boolean if user in a team than false
            */
            var set_deleteUser = function (id, scope) {
                var res = [];
                if( StorageFactory.get_storeCheckUserIsInTeam(id) ){
                    MessageFactory.set_error("Der Spieler ist Mitglied in einem Team und kann nicht gelöscht werden.");
                    return false;
                }else{
                    for(var e in factoryScope.userData){
                        if(factoryScope.userData[e].id != id){
                            res.push(factoryScope.userData[e]);
                        }
                    }
                    factoryScope.userData = res;
                    set_gridOptions(); 
                    StorageFactory.set_storeTeamUserDataScope(factoryScope.userData); 
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
                set_gridOptions();
                StorageFactory.set_storeUserScope(scope);
                factoryScope.autoId = StorageFactory.funcautoId("user");
            }
            return {
                set_scopeInit: set_init,
                set_scopeAddUser: set_addUser,
                set_scopeDeleteUser: set_deleteUser
            };
        }
    ]);
}