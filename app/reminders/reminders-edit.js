'use strict';

angular.module('ygAdmin.reminders.edit', ['ui.router'])

  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('reminders-edit', {
      templateUrl: 'reminders/reminders-edit.html',
      controller: 'RemindersEditCtrl',
      url: '/reminders/edit/:id'
    });
  }])

  .controller('RemindersEditCtrl', [
    '$scope',
    'apiService',
    'errorService',
    '$stateParams',
    function($scope, api, error, $stateParams) {
      console.log($stateParams);
      getReminder($stateParams.id)
        .then(processReminder)
        .catch(error.handleHttpError);

      function getReminder(id) {
        return api.getOne('base_reminders', id);
      }

      function processReminder(response) {
        console.log(response.data);
        $scope.reminder = response.data[0];
      }
    }]);