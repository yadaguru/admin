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
    'ygAdmin.services',
    'ygAdmin.directives',
    'LocalStorageModule',
    'ui.router'
  ])
  .config([
    '$locationProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider',
    function($locationProvider, $urlRouterProvider, localStorageServiceProvider) {
      $locationProvider.hashPrefix('!');
      //$urlRouterProvider.otherwise(function() {
      //  console.log('otherwise');
      //  return '/reminders';
      //});
      localStorageServiceProvider.setPrefix('yg.');
  }])
  .run([
    '$rootScope',
    '$state',
    'authService',
    function($rootScope, $state, auth) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        console.log(toState.name, auth.isAuthorized());
        if (!auth.isAuthorized() && toState.name !== 'login') {
          event.preventDefault();
          console.log('going to login');
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
