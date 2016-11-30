'use strict';

angular.module('ygAdmin.directives.listTable', ['angularMoment', 'ui.router'])

.directive('ygListTable', [
  '$state',
  function($state) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        resource: '=',
        columns: '=',
        title: '@',
        items: '@',
        item: '@',
        editView: '@',
        editViewParam: '@'
      },
      templateUrl: 'components/list-table/list-table.html',
      transclude: true,
      controller: [function(){}],
      link: function(scope) {
        scope.editViewParam = scope.editViewParam || 'id';
        scope.newItem = function() {
          $state.go(scope.editView);
        };
        scope.editItem = function(item) {
          var params = {};
          params[scope.editViewParam] = item[scope.editViewParam];
          $state.go(scope.editView, params)
        }
      }
    }
  }
])

.directive('ygTextCell', [
  function() {
    return {
      restrict: 'E',
      require: '^ygListTable',
      template: '<td>{{ value }}</td>',
      scope: true,
      replace: true,
      controller: ['$scope', function($scope) {}],
      link: function($scope, element, attrs) {
        $scope.value = $scope.$parent.$parent.item[attrs.key];
      }
    }
  }
])

.directive('ygRichTextCell', [
  function() {
    return {
      restrict: 'E',
      require: '^ygListTable',
      template: '<td ng-bind-html="value"></td>',
      scope: true,
      replace: true,
      controller: ['$scope', function($scope) {}],
      link: function($scope, element, attrs) {
        $scope.value = $scope.$parent.$parent.item[attrs.key];
      }
    }
  }
])

.directive('ygArrayCell', [
  function() {
    return {
      restrict: 'E',
      require: '^ygListTable',
      scope: true,
      replace: true,
      template: '<td><div ng-repeat="subValue in value">{{ subValue }}</div></td>',
      controller: [function() {}],
      link: function($scope, element, attrs, ctrl) {
        $scope.value = $scope.$parent.$parent.item[attrs.key];
      }
    }
  }
])

.directive('ygDateCell', [
  'moment',
  function($moment) {
    return {
      restrict: 'E',
      require: '^ygListTable',
      template: '<td>{{ value }}</td>',
      scope: true,
      replace: true,
      controller: ['$scope', function($scope) {}],
      link: function($scope, element, attrs) {
        var format = attrs.format || 'M/D/YYYY';
        var value = $scope.$parent.$parent.item[attrs.key];
        $scope.value = $moment.utc(value).format(format);
      }
    }
  }
]);