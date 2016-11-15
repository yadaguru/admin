'use strict';

describe('ygAdmin.reminders module', function() {
  var RemindersCtrl, $scope, baseControllersService;

  beforeEach(module('ygAdmin.reminders'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.base_reminders = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      }
    };

    $provide.value('baseControllersService', baseControllersService);
  }));

  beforeEach(inject(function($rootScope, $controller, baseControllersService) {
    $scope = $rootScope.$new();
    RemindersCtrl = $controller('RemindersCtrl', {
      $scope: $scope,
      baseControllersService: baseControllersService
    });
  }));

  describe('reminders controller $scope', function(){
    it('should have a reference to all reminders after init', function() {
      expect($scope.base_reminders).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });
});