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
  'apiService',
  'errorService',
  function($scope, api, error) {
    getReminders()
      .then(processReminders)
      .catch(error.handleHttpError);

    function getReminders() {
      return api.getAll('base_reminders');
    }

    function processReminders(response) {
      console.log(response.data);
      $scope.reminders = response.data;
    }
}]);