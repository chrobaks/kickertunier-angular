(function() {
    "use strict";
    angular.module('mainApp').controller('userController', UserController);

    UserController.$inject = [
        '$scope',
        'TeamFactory',
        'MessageFactory'
    ];

    function UserController($scope, UserFactory, MessageFactory) {
        // SCOPE VAR headertitle  show controller header titel
        $scope.headertitle = "Control User";
        // SCOPE VAR formmsg show formular messages
        $scope.formmsg = "Neuen Mitspieler speichern";
        // SCOPE VAR userdata stores all user
        $scope.userData = [
            {nickname: 'SChrobak', firstname: 'Stefan', secondname: 'Chrobak', id: 1},
            {nickname: 'MChrobak', firstname: 'Max', secondname: 'Chrobak', id: 2},
            {nickname: 'PaulM', firstname: 'Paul', secondname: 'Mustermann', id: 3},
            {nickname: 'PaulaM', firstname: 'Paula', secondname: 'Musterfrau', id: 4}
        ];
        // ADD NEW USER
        $scope.addUser = addUser;
        // DELETE USER
        $scope.deleteUser = deleteUser;
        // INIT USER SCOPE
        activate();

        /////////////////////////////////////////////////
        function activate() {
            UserFactory.set_scopeInit($scope);
        }
        function deleteUser(id) {
            if( ! UserFactory.set_scopeDeleteUser(id)){
                alert(MessageFactory.get_error());
            }
        }
        function addUser() {
            if(UserFactory.set_scopeAddUser()){
                $scope.formmsg = "Neuen Mitspieler speichern";
            }else{
                $scope.formmsg = MessageFactory.get_error();
            }
        }
    }

})()