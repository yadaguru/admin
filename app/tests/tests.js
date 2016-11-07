'use strict';

angular.module('ygAdmin.tests', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('tests', {
    templateUrl: 'tests/tests.html',
    controller: 'TestsCtrl',
    url: '/tests'
  });
})

.controller('TestsCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('tests', $scope);
    controller.init();
}]);