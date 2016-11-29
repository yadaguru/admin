'use strict';

angular.module('ygAdmin.categories', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('categories', {
    templateUrl: 'categories/categories.html',
    controller: 'CategoriesCtrl',
    url: '/categories'
  });

  $stateProvider.state('categoriesEdit', {
    templateUrl: 'categories/categoriesEdit.html',
    controller: 'CategoriesEditCtrl',
    url: '/categories/edit/:id'
  })
})

.controller('CategoriesCtrl', [
  '$scope',
  'baseControllersService',
  function($scope, BaseController) {
    var controller = BaseController.getListController('categories', $scope);
    controller.init();
}])

.controller('CategoriesEditCtrl', [
  '$scope',
  '$state',
  'baseControllersService',
  function($scope, $state, BaseController) {
    var controller = BaseController.getEditFormController('categories', 'categories', $scope);
    controller.init($state.params.id);
  }
]);