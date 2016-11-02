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
  'apiService',
  function(api) {
    console.log(api.foo());
}]);