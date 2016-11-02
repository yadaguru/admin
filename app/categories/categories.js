'use strict';

angular.module('ygAdmin.categories', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider.state('categories', {
    templateUrl: 'categories/categories.html',
    controller: 'CategoriesCtrl',
    url: '/categories'
  });
})

.controller('CategoriesCtrl', [function() {

}]);