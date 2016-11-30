'use strict';

describe('ygAdmin.testDates module', function() {
  var TestDatesCtrl, TestDatesEditCtrl, $scope, baseControllersService, $state;

  beforeEach(module('ygAdmin.testDates'));

  beforeEach(module(function($provide) {
    baseControllersService = {
      getListController: function() {
        return {
          init: function() {
            $scope.testDates = [{foo: 'foo'}, {bar: 'bar'}];
            $scope.loaded = true;
          }
        }
      },
      getEditFormController: function() {
        return {
          init: function(id, callback) {
            if (id) {
              $scope.isNew = false;
              $scope.testDates = callback({type: 'sat', adminDate: '2017-01-01', registrationDate: '2017-01-01'});
            } else {
              $scope.isNew = true;
              $scope.testDates = {};
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
    $provide.value('moment', {
      utc: function(val) {
        return {
          toDate: function() {
            return val + ' (moment-processed)'
          }
        }
      }
    })
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
      expect($scope.testDates).toEqual([{foo: 'foo'}, {bar: 'bar'}]);
      expect($scope.loaded).toBe(true);
    });
  });

  describe('the testDates edit controller $scope', function() {
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
        TestDatesEditCtrl = $controller('TestDatesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.testDates).toEqual({
        type: 'sat',
        adminDate: '2017-01-01 (moment-processed)',
        registrationDate: '2017-01-01 (moment-processed)'
      });
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        TestDatesEditCtrl = $controller('TestDatesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.testDates).toEqual({});
    });
  });
});