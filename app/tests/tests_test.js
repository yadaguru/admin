'use strict';

describe('ygAdmin.tests module', function() {
  var TestsCtrl, TestsEditCtrl, $scope, baseControllersService, $state;

  beforeEach(module('ygAdmin.tests'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.tests = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      },
      getEditFormController: function() {
        return {
          init: function(id) {
            if (id) {
              $scope.isNew = false;
              $scope.tests = {foo: 'foo'};
            } else {
              $scope.isNew = true;
              $scope.tests = {};
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
    TestsCtrl = $controller('TestsCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('tests controller $scope', function(){
    it('should have a reference to all tests after init', function() {
      expect($scope.tests).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
  
  describe('the tests edit controller $scope', function() {
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
        TestsEditCtrl = $controller('TestsEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.tests).toEqual({foo: 'foo'});
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        TestsEditCtrl = $controller('TestsEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.tests).toEqual({});
    });
  });
});