'use strict';

describe('ygAdmin.contentItems module', function() {
  var ContentItemsCtrl, $scope, baseControllersService;

  beforeEach(module('ygAdmin.contentItems'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.contentItems = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      }
    };

    $provide.value('baseControllersService', baseControllersService);
  }));

  beforeEach(inject(function($rootScope, $controller, baseControllersService) {
    $scope = $rootScope.$new();
    ContentItemsCtrl = $controller('ContentItemsCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('contentItems controller $scope', function(){
    it('should have a reference to all contentItems after init', function() {
      expect($scope.contentItems).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
});