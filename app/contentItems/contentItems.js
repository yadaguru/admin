'use strict';

angular.module('ygAdmin.contentItems', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('contentItems', {
    templateUrl: 'contentItems/contentItems.html',
    controller: 'ContentItemsCtrl',
    url: '/content_items'
  });
})

.controller('ContentItemsCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('content_items', $scope);
    controller.init();
}]);