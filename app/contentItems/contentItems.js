'use strict';

angular.module('ygAdmin.contentItems', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('contentItems', {
    templateUrl: 'contentItems/contentItems.html',
    controller: 'ContentItemsCtrl',
    url: '/content_items'
  });

  $stateProvider.state('contentItemsEdit', {
    templateUrl: 'contentItems/contentItemsEdit.html',
    controller: 'ContentItemsEditCtrl',
    url: '/content_items/edit/:name'
  });
})

.controller('ContentItemsCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('content_items', $scope);
    controller.init();
  }])

.controller('ContentItemsEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  function($scope, $state, BaseController) {
    var controller = BaseController.getEditFormController('content_items', 'contentItems', $scope);
    controller.init($state.params.name);
  }
]);
