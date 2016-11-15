'use strict';

describe('ygAdmin.categories module', function() {
  var CategoriesCtrl, $scope, baseControllersService;

  beforeEach(module('ygAdmin.categories'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.categories = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      }
    };

    $provide.value('baseControllersService', baseControllersService);
  }));

  beforeEach(inject(function($rootScope, $controller, baseControllersService) {
    $scope = $rootScope.$new();
    CategoriesCtrl = $controller('CategoriesCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('categories controller $scope', function(){
    it('should have a reference to all categories after init', function() {
      expect($scope.categories).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
});