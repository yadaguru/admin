'use strict';

angular.module('ygAdmin.reminders', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('reminders', {
    templateUrl: 'reminders/reminders.html',
    controller: 'RemindersCtrl',
    url: '/reminders'
  });

  $stateProvider.state('remindersEdit', {
    templateUrl: 'reminders/remindersEdit.html',
    controller: 'RemindersEditCtrl',
    url: '/reminders/edit/:id'
  })
}])

.controller('RemindersCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('base_reminders', $scope);
    controller.init();
}])

.controller('RemindersEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  function($scope, $state, BaseController) {
    var controller = BaseController.getEditFormController('base_reminders', 'reminders', $scope);
    controller.init($state.params.id);
  }
]);