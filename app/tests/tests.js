'use strict';

angular.module('ygAdmin.tests', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('tests', {
    templateUrl: 'tests/tests.html',
    controller: 'TestsCtrl',
    url: '/tests'
  });

  $stateProvider.state('testsEdit', {
    templateUrl: 'tests/testsEdit.html',
    controller: 'TestsEditCtrl',
    url: '/tests/edit/:id'
  });
})

.controller('TestsCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('tests', $scope);
    controller.init();
}])

.controller('TestsEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  function($scope, $state, BaseController) {
    var controller = BaseController.getEditFormController('tests', 'tests', $scope);
    controller.init($state.params.id);
  }
]);