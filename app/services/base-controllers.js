'use strict';

angular.module('ygAdmin.services.baseControllers', [])

  .factory('baseControllersService', [
    'apiService',
    'errorService',
    function(api, error) {
      function getListController(resource, $scope) {
        return {
          init: function() {
            getItems()
              .then(processItems)
              .catch(error.handleHttpError)
          }
        };

        function getItems() {
          return api.getAll(resource);
        }

        function processItems(response) {
          $scope[resource] = response.data;
          $scope.loaded = true;
        }
      }

      return {
        getListController: getListController
      }
    }
  ]);
