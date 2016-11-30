'use strict';

angular.module('ygAdmin.testDates', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('testDates', {
    templateUrl: 'testDates/testDates.html',
    controller: 'TestDatesCtrl',
    url: '/test_dates'
  });

  $stateProvider.state('testDatesEdit', {
    templateUrl: 'testDates/testDatesEdit.html',
    controller: 'TestDatesEditCtrl',
    url: '/test_dates/edit/:id'
  });
})

.controller('TestDatesCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('test_dates', $scope);
    controller.init();
  }])

.controller('TestDatesEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  'moment',
  function($scope, $state, BaseController, moment) {
    var controller = BaseController.getEditFormController('test_dates', 'testDates', $scope);
    controller.init($state.params.id, function(testDate) {
      testDate.adminDate = moment.utc(testDate.adminDate).toDate();
      testDate.registrationDate = moment.utc(testDate.registrationDate).toDate();
      return testDate;
    });
  }
]);
