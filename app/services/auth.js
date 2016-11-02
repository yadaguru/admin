'use strict';

angular.module('ygAdmin.services.auth', [])

  .factory('authService', [
    'localStorageService',
    function(localStorage) {
      function saveUserToken(token) {
        localStorage.set('token', token);
      }

      function getUserToken() {
        return localStorage.get('token');
      }

      function isAuthorized() {
        return Boolean(getUserToken());
      }

      function removeUserToken() {
        localStorage.remove('token');
      }

      return {
        saveUserToken: saveUserToken,
        getUserToken: getUserToken,
        isAuthorized: isAuthorized,
        removeUserToken: removeUserToken
      }
    }
  ]);
