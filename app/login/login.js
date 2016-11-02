'use strict';

angular.module('ygAdmin.login', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl',
    url: '/login'
  });
})

.controller('LoginCtrl', [
  '$scope',
  'apiService',
  'authService',
  '$state',
  'errorService',
  function($scope, api, auth, $state, error) {
    $scope.login = function() {
      api.post('admin_users', {
        userName: $scope.userName,
        password: $scope.password
      }).then(function(resp) {
        auth.saveUserToken(resp.data.token);
        $state.go('reminders');
      }).catch(error.handleHttpError)
    };


}]);