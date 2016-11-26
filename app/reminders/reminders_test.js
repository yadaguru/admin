'use strict';

describe('ygAdmin.reminders module', function() {
  var RemindersCtrl, RemindersEditCtrl, $scope, baseControllersService, $state;

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
      },
      getEditFormController: function() {
        return {
          init: function(id) {
            if (id) {
              $scope.isNew = false;
              $scope.base_reminders = {foo: 'foo'};
            } else {
              $scope.isNew = true;
              $scope.base_reminders = {};
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

  describe('reminders controller $scope', function(){
    beforeEach(inject(function($rootScope, $controller, baseControllersService) {
      $scope = $rootScope.$new();
      RemindersCtrl = $controller('RemindersCtrl', {
        $scope: $scope,
        baseControllersService: baseControllersService
      });
    }));

    it('should have a reference to all reminders after init', function() {
      expect($scope.base_reminders).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });

  describe('the reminders edit controller $scope', function() {
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
        RemindersEditCtrl = $controller('RemindersEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.base_reminders).toEqual({foo: 'foo'});
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        RemindersEditCtrl = $controller('RemindersEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.base_reminders).toEqual({});
    });
  });
});