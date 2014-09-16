if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.controller('userController', [
        '$scope', 
        'UserFactory', 
        'StorageFactory',
        'MessageFactory', 
        function ($scope, UserFactory, StorageFactory, MessageFactory) {
            
            $scope.headertitle = "Control User";
            $scope.formmsg = "Neuen Mitspieler speichern";
            
            $scope.userData = [
                {nickname: 'SChrobak', firstname: 'Stefan', secondname: 'Chrobak', id: 1},
                {nickname: 'MChrobak', firstname: 'Max', secondname: 'Chrobak', id: 2},
                {nickname: 'PaulM', firstname: 'Paul', secondname: 'Mustermann', id: 3},
                {nickname: 'PaulaM', firstname: 'Paula', secondname: 'Musterfrau', id: 4}
            ];
            
            
            $scope.addUser = function () {
                if(UserFactory.set_scopeAddUser($scope)){
                    $scope.formmsg = "Neuen Mitspieler speichern";
                }else{
                    $scope.formmsg = MessageFactory.get_error();
                }
            }  
            
            $scope.deleteUser = function (id) {
                if( ! StorageFactory.get_storeCheckUserIsInTeam(id)){
                    UserFactory.set_scopeDeleteUser(id, $scope);
                    StorageFactory.set_storeTeamUserDataScope($scope.userData);
                }else{
                    alert("Der Spieler ist Mitglied in einem Team und kann nicht gelöscht werden.");
                }
            }
            
            UserFactory.set_scopeGridOptions($scope);
            
            StorageFactory.set_storeUserScope($scope);
            $scope.userAutoId = StorageFactory.funcautoId("user");
        
        }
    ]);
}