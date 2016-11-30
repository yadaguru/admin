'use strict';

describe('ygAdmin.timeframes module', function() {
  var TimeframesCtrl, TimeframesEditCtrl, $scope, baseControllersService, $state, timeframeResponse;

  beforeEach(module('ygAdmin.timeframes'));

  beforeEach(function() {
    timeframeResponse = {
      data: undefined
    };
  });

  beforeEach(module(function($provide) {

    baseControllersService = {
      getListController: function() {
        return {
          init: function(callback) {
            $scope.timeframes = timeframeResponse.data.map(function(timeframe) {
              return callback(timeframe);
            });
            $scope.loaded = true;
          }
        }
      },
      getEditFormController: function() {
        return {
          init: function(id, callback) {
            var timeframe = {
              type: 'absolute',
              formula: '2017-02-01'
            };

            if (id) {
              $scope.isNew = false;
              $scope.timeframes = callback(timeframeResponse.data);
            } else {
              $scope.isNew = true;
              $scope.timeframes = {};
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
          format: function() {
            return val + ' (moment-processed)'
          },
          toDate: function() {
            return val + ' (moment-processed)'
          }
        }
      }
    })
  }));

  describe('timeframes controller $scope', function(){
    it('should have a reference to all timeframes after init', function() {
      timeframeResponse.data = [{
        type: 'relative',
        formula: '90'
      }];

      inject(function($rootScope, $controller, baseControllersService) {
        $scope = $rootScope.$new();
        TimeframesCtrl = $controller('TimeframesCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService
        });
      });

      expect($scope.timeframes).toEqual(timeframeResponse.data);
      expect($scope.loaded).toBe(true);
    });

    it('should process absolute timeframe formulas with moment', function() {
      timeframeResponse.data = [{
        type: 'absolute',
        formula: '2017-02-01'
      }];

      inject(function($rootScope, $controller, baseControllersService) {
        $scope = $rootScope.$new();
        TimeframesCtrl = $controller('TimeframesCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService
        });
      });

      expect($scope.timeframes).toEqual([{
        type: 'absolute',
        formula: '2017-02-01 (moment-processed)'
      }]);
      expect($scope.loaded).toBe(true);
    });
  });

  describe('the timeframes edit controller $scope', function() {
    beforeEach(function() {
      $state = {
        params: {}
      };
      $scope = {};
    });

    it('should be in "edit" mode when an id is passed in to the state', function() {
      timeframeResponse.data = {
        type: 'relative',
        formula: '90'
      };

      inject(function($rootScope, $controller, baseControllersService, $state) {
        $state.params.id = 1;
        $scope = $rootScope.$new();
        TimeframesEditCtrl = $controller('TimeframesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.timeframes).toEqual(timeframeResponse.data);
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        TimeframesEditCtrl = $controller('TimeframesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.timeframes).toEqual({});
    });

    it('should process absolute timeframe formulas with moment', function() {
      timeframeResponse.data = {
        type: 'absolute',
        formula: '2017-02-01'
      };

      inject(function($rootScope, $controller, baseControllersService, $state) {
        $state.params.id = 1;
        $scope = $rootScope.$new();
        TimeframesEditCtrl = $controller('TimeframesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.timeframes).toEqual({
        type: 'absolute',
        formula: '2017-02-01 (moment-processed)'
      });
    });

    it('should set the formula to null when clearFormula() is called', function() {
      timeframeResponse.data = {
        type: 'relative',
        formula: '90'
      };

      inject(function($rootScope, $controller, baseControllersService, $state) {
        $state.params.id = 1;
        $scope = $rootScope.$new();
        TimeframesEditCtrl = $controller('TimeframesEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.timeframes.formula).toEqual('90');
      $scope.clearFormula();
      expect($scope.timeframes.formula).toBe(null);
    })
  });
});