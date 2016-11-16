'use strict';

angular.module('ygAdmin.testDates', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('testDates', {
    templateUrl: 'testDates/testDates.html',
    controller: 'TestDatesCtrl',
    url: '/test_dates'
  });
})

.controller('TestDatesCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('test_dates', $scope);
    controller.init();
}]);