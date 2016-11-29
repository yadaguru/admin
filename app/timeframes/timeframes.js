'use strict';

angular.module('ygAdmin.timeframes', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('timeframes', {
    templateUrl: 'timeframes/timeframes.html',
    controller: 'TimeframesCtrl',
    url: '/timeframes'
  });

  $stateProvider.state('timeframesEdit', {
    templateUrl: 'timeframes/timeframesEdit.html',
    controller: 'TimeframesEditCtrl',
    url: '/timeframes/edit/:id'
  })
})

.controller('TimeframesCtrl', [
  '$scope',
  'baseControllersService',
  'moment',
  function($scope, BaseController, moment) {
    var controller = BaseController.getListController('timeframes', $scope);
    controller.init(function(timeframe) {
      if (timeframe.type === 'absolute') {
        timeframe.formula = moment.utc(timeframe.formula).format('M/D/YYYY');
      }
      return timeframe;
    });
}])

.controller('TimeframesEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  'moment',
  function($scope, $state, BaseController, moment) {
    var controller = BaseController.getEditFormController('timeframes', 'timeframes', $scope);
    controller.init($state.params.id, function(timeframe) {
      if (timeframe.type === 'absolute') {
        timeframe.formula = moment.utc(timeframe.formula).toDate();
        return timeframe;
      }
      return timeframe;
    });

    $scope.clearFormula = function() {
      $scope.timeframes.formula = null;
    }
  }
]);
