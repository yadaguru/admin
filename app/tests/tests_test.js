'use strict';

describe('ygAdmin.tests module', function() {
  var TestsCtrl, $scope, baseControllersService;

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
      }
    };

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
});