'use strict';

angular.module('ygAdmin.categories', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('categories', {
    templateUrl: 'categories/categories.html',
    controller: 'CategoriesCtrl',
    url: '/categories'
  });
})

.controller('CategoriesCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('categories', $scope);
    controller.init();
}]);