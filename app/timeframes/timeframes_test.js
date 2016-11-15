'use strict';

describe('ygAdmin.timeframes module', function() {
  var TimeframesCtrl, $scope, baseControllersService;

  beforeEach(module('ygAdmin.timeframes'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.timeframes = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      }
    };

    $provide.value('baseControllersService', baseControllersService);
  }));

  beforeEach(inject(function($rootScope, $controller, baseControllersService) {
    $scope = $rootScope.$new();
    TimeframesCtrl = $controller('TimeframesCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('timeframes controller $scope', function(){
    it('should have a reference to all timeframes after init', function() {
      expect($scope.timeframes).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
});