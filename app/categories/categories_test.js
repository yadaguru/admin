'use strict';

describe('ygAdmin.categories module', function() {
  var CategoriesCtrl, CategoriesEditCtrl, $scope, baseControllersService, $state;

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
      },
      getEditFormController: function() {
        return {
          init: function(id) {
            if (id) {
              $scope.isNew = false;
              $scope.categories = {foo: 'foo'};
            } else {
              $scope.isNew = true;
              $scope.categories = {};
            }
          }
        }
      }
    };

    $state = {
      params: {}
    };
    
    $provide.value('$state', $state);
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
  
  describe('the categories edit controller $scope', function() {
    beforeEach(function() {
      $state = {
        params: {}
      };
      $scope = {};
    });

    it('should be in "edit" mode when an id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $state.params.id = 1;
        $scope = $rootScope.$new();
        CategoriesEditCtrl = $controller('CategoriesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.categories).toEqual({foo: 'foo'});
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        CategoriesEditCtrl = $controller('CategoriesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.categories).toEqual({});
    });
  });
});