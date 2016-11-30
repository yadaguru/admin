'use strict';

describe('ygAdmin.contentItems module', function() {
  var ContentItemsCtrl, ContentItemsEditCtrl, $scope, baseControllersService, $state;

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
      },
      getEditFormController: function() {
        return {
          init: function(id) {
            if (id) {
              $scope.isNew = false;
              $scope.content_items = {foo: 'foo'};
            } else {
              $scope.isNew = true;
              $scope.content_items = {};
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

  describe('the contentItems edit controller $scope', function() {
    beforeEach(function() {
      $state = {
        params: {}
      };
      $scope = {};
    });

    it('should be in "edit" mode when an id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $state.params.name = 'foo';
        $scope = $rootScope.$new();
        ContentItemsEditCtrl = $controller('ContentItemsEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(false);
      expect($scope.content_items).toEqual({foo: 'foo'});
    });

    it('should be in "add" mode when no id is passed in to the state', function() {
      inject(function($rootScope, $controller, baseControllersService, $state) {
        $scope = $rootScope.$new();
        ContentItemsEditCtrl = $controller('ContentItemsEditCtrl', {
          $scope: $scope,
          baseControllersService: baseControllersService,
          $state: $state
        });
      });

      expect($scope.isNew).toBe(true);
      expect($scope.content_items).toEqual({});
    });
  });
});