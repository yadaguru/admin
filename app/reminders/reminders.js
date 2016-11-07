'use strict';

angular.module('ygAdmin.reminders', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reminders', {
    templateUrl: 'reminders/reminders.html',
    controller: 'RemindersCtrl',
    url: '/reminders'
  });
}])

.controller('RemindersCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('base_reminders', $scope);
    controller.init();
}]);