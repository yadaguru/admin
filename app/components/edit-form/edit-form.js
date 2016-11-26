'use strict';

angular.module('ygAdmin.directives.editForm',
  ['angularMoment', 'textAngular', 'ygAdmin.services']
)

.directive('ygEditForm', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      templateUrl: 'components/edit-form/edit-form.html',
      transclude: true,
      link: function(scope, element, attrs) {
      }
    }
  }
])

.directive('ygTextInput', [
  function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template:
        '<div class="form-group">' +
          '<label class="control-label" ng-if="label" for="{{ id }}">{{ label }}</label>' +
          '<input type="text" class="form-control" ng-model="value" id="{{ id }}" name="{{ id }}" ng-change="onChange()"/>' +
        '</div>',
      scope: true,
      replace: true,
      link: function(scope, element, attrs, ngModel) {
        scope.label = attrs.label;
        scope.id = attrs.ngModel.split('.').pop();

        scope.onChange = function() {
          ngModel.$setViewValue(scope.value);
        };

        ngModel.$render = function() {
          scope.value = ngModel.$modelValue;
        };
      }
    }
  }
])

.directive('ygRichTextBox', [
  function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template:
      '<div class="form-group">' +
      '<label class="control-label" ng-if="label" for="{{ id }}">{{ label }}</label>' +
      '<div text-angular ng-model="value" id="{{ id }}" name="{{ id }}" ng-change="onChange()"/>' +
      '</div>',
      replace: true,
      scope: true,
      link: function(scope, element, attrs, ngModel) {
        scope.label = attrs.label;
        scope.id = attrs.ngModel.split('.').pop();

        scope.onChange = function() {
          ngModel.$setViewValue(scope.value);
        };

        ngModel.$render = function() {
          scope.value = ngModel.$modelValue;
        };
      }
    }
  }
])

.directive('ygDropDown', [
  'apiService',
  'errorService',
  function(api, error) {
    return {
      require: 'ngModel',
      restrict: 'E',
      template:
      '<div class="form-group">' +
      '<label class="control-label" ng-if="label" for="{{ id }}">{{ label }}</label>' +
      '<select ng-if="loaded" class="form-control" ng-model="option.value" id="{{ id }}" name="{{ id }}" ng-change="onChange()"' +
      'ng-options="option[optionValue] as option[optionText] for option in options">' +
      '</select>' +
      '</div>',
      replace: true,
      scope: true,
      link: function(scope, element, attrs, ngModel) {
        scope.label = attrs.label;
        scope.id = attrs.ngModel.split('.').pop();

        checkAttributes(attrs, ['optionValue', 'optionText', 'optionResource'], 'ygDropDown');

        scope.optionValue = attrs.optionValue;
        scope.optionText = attrs.optionText;
        scope.option = {};

        scope.onChange = function() {
          ngModel.$setViewValue(scope.option.value);
        };

        ngModel.$render = function() {
          scope.option.value = ngModel.$modelValue;
        };

        getOptions(attrs.optionResource)
          .then(function(resp) {
            scope.options = resp.data;
            scope.loaded = true;
          })
          .catch(error.handleHttpError);

        function getOptions(resource) {
          return api.getAll(resource);
        }
      }
    }
  }
])

.directive('ygMultiDropDown', [
  'apiService',
  'errorService',
  function(api, error) {
    return {
      require: 'ngModel',
      restrict: 'E',
      template:
      '<div class="form-group">' +
      '<label class="control-label" ng-if="label" for="{{ id }}">{{ label }}</label>' +
      '<select ng-if="loaded" class="form-control" ng-model="option.value" id="{{ id }}" name="{{ id }}" ng-change="onChange()"' +
      'ng-options="option[optionValue] as option[optionText] for option in options" multiple>' +
      '</select>' +
      '</div>',
      replace: true,
      scope: true,
      link: function(scope, element, attrs, ngModel) {
        scope.label = attrs.label;
        scope.id = attrs.ngModel.split('.').pop();
        scope.optionValue = attrs.optionValue;
        scope.optionText = attrs.optionText;
        scope.option = {};

        checkAttributes(attrs, ['optionValue', 'optionText', 'optionResource'], 'ygMultiDropDown');

        scope.onChange = function() {
          ngModel.$setViewValue(scope.option.value);
        };

        ngModel.$render = function() {
          scope.option.value = ngModel.$modelValue;
        };

        getOptions(attrs.optionResource)
          .then(function(resp) {
            scope.options = resp.data;
            scope.loaded = true;
          })
          .catch(error.handleHttpError);

        function getOptions(resource) {
          return api.getAll(resource);
        }
      }
    }
  }
]);

function checkAttributes(attrs, requiredAttrs, directive) {
  requiredAttrs.forEach(function(attr) {
    if (!attrs.hasOwnProperty(attr)) {
      throw new Error(directive + ' directive requires ' + attr + ' attribute')
    }
  })
}
