if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.controller('userController', [
        '$scope', 
        'UserFactory', 
        'MessageFactory', 
        function ($scope, UserFactory, MessageFactory) {
            // SCOPE VAR headertitle  show controller header titel
            $scope.headertitle = "Control User";
            // SCOPE VAR formmsg show formular messages
            $scope.formmsg = "Neuen Mitspieler speichern";
            // SCOPE VAR userdate stores all user
            $scope.userData = [
                {nickname: 'SChrobak', firstname: 'Stefan', secondname: 'Chrobak', id: 1},
                {nickname: 'MChrobak', firstname: 'Max', secondname: 'Chrobak', id: 2},
                {nickname: 'PaulM', firstname: 'Paul', secondname: 'Mustermann', id: 3},
                {nickname: 'PaulaM', firstname: 'Paula', secondname: 'Musterfrau', id: 4}
            ];
            // ADD NEW USER
            $scope.addUser = function () {
                if(UserFactory.set_scopeAddUser()){
                    $scope.formmsg = "Neuen Mitspieler speichern";
                }else{
                    $scope.formmsg = MessageFactory.get_error();
                }
            }  
            // DELETE USER
            $scope.deleteUser = function (id) {
                if( ! UserFactory.set_scopeDeleteUser(id)){
                    alert(MessageFactory.get_error());
                }
            }
            // INIT USER SCOPE
            UserFactory.set_scopeInit($scope);
        }
    ]);
}