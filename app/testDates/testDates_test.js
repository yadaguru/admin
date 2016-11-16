'use strict';

describe('ygAdmin.testDates module', function() {
  var TestDatesCtrl, $scope, baseControllersService;

  beforeEach(module('ygAdmin.testDates'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.testDatess = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      }
    };

    $provide.value('baseControllersService', baseControllersService);
  }));

  beforeEach(inject(function($rootScope, $controller, baseControllersService) {
    $scope = $rootScope.$new();
    TestDatesCtrl = $controller('TestDatesCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('testDates controller $scope', function(){
    it('should have a reference to all test dates after init', function() {
      expect($scope.testDatess).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
});