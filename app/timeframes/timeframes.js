'use strict';

angular.module('ygAdmin.timeframes', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('timeframes', {
    templateUrl: 'timeframes/timeframes.html',
    controller: 'TimeframesCtrl',
    url: '/timeframes'
  });
})

.controller('TimeframesCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('timeframes', $scope);
    controller.init();
}]);