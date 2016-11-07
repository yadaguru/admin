'use strict';

angular.module('ygAdmin.directives.listTable', [])

.directive('ygListTable', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        resource: '=',
        columns: '='
      },
      templateUrl: 'components/list-table/list-table.html',
      transclude: true,
      controller: ['$scope', function($scope) {}]
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

.directive('ygLinkCell', [
  function() {
    return {
      restrict: 'E',
      require: '^ygListTable',
      scope: true,
      replace: true,
      template: '<td><a href="{{ sref }}">{{ value }}</a></td>',
      controller: ['$scope', '$state', function($scope, $state) {
        $scope.state = $state;
      }],
      link: function($scope, element, attrs) {
        var item = $scope.$parent.$parent.item;
        $scope.value = item[attrs.key];
        var params = {};
        params[attrs.srefParam] = item[attrs.srefValue];
        $scope.sref = $scope.state.href(attrs.srefView, params);
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
]);