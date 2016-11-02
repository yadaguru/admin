'use strict';

angular.module('ygAdmin.services.error', [])

  .factory('errorService', [
    function() {
      function handleHttpError(response) {
        console.log(response);
      }

      return {
        handleHttpError: handleHttpError
      }
    }
  ]);
