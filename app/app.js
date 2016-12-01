'use strict';

// Declare app level module which depends on views, and components
angular
  .module('ygAdmin', [
    'ygAdmin.login',
    'ygAdmin.reminders',
    'ygAdmin.categories',
    'ygAdmin.timeframes',
    'ygAdmin.tests',
    'ygAdmin.testDates',
    'ygAdmin.contentItems',
    'ygAdmin.services',
    'ygAdmin.directives',
    'LocalStorageModule',
    'ui.router',
    'ui.bootstrap',
    'cgPrompt'
  ])
  .config([
    '$locationProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider',
    function($locationProvider, $urlRouterProvider, localStorageServiceProvider) {
      $locationProvider.hashPrefix('!');
      $urlRouterProvider.otherwise(function() {
        return '/reminders';
      });
      localStorageServiceProvider.setPrefix('yg.');
  }])
  .run([
    '$rootScope',
    '$state',
    'authService',
    function($rootScope, $state, auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (!auth.isAuthorized() && toState.name !== 'login') {
          event.preventDefault();
          $state.go('login');
        }
      });

      $rootScope.isAuthorized = function() {
        return auth.isAuthorized();
      };

      $rootScope.logout = function() {
        auth.removeUserToken();
        $state.go('login');
      }
    }
  ]);
