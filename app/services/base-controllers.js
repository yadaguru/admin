'use strict';

angular.module('ygAdmin.services.baseControllers', ['ui.router', 'ngAnimate', 'toastr'])

  .factory('baseControllersService', [
    'apiService',
    'errorService',
    '$state',
    'prompt',
    'toastr',
    function(api, error, $state, prompt, toastr) {
      function getListController(resource, $scope) {
        return {
          init: function(callback) {
            getItems()
              .then(processItems(callback))
              .catch(error.handleHttpError)
          }
        };

        function getItems() {
          return api.getAll(resource);
        }

        function processItems(callback) {
          return function(response) {
            if (typeof callback === 'function') {
              $scope[resource] = response.data.map(function(item) {
                return callback(item);
              });
            } else {
              $scope[resource] = response.data;
            }
            $scope.loaded = true;
          };
        }
      }

      function getEditFormController(resource, parentState, $scope) {
        return {
          init: function(id, callback) {
            $scope.saveItem = saveItem;
            $scope.deleteItem = deleteItem;
            $scope.cancel = cancel;
            if (id) {
              $scope.isNew = false;
              return getItem(id)
                .then(processItem(callback))
                .catch(handleError);
            }
            $scope.isNew = true;
            $scope.loaded = true;
            $scope[resource] = {};
          }
        };

        function getItem(id) {
          return api.getOne(resource, id);
        }

        function saveItem() {
          var method = $scope.isNew ? 'post' : 'put';
          api[method](resource, $scope[resource], $scope[resource].id)
            .then(handleSuccessfulSave)
            .catch(handleError);
        }

        function deleteItem() {
          prompt({
            title: 'Delete Item?',
            message: 'Are you sure you want to delete this item?'
          }).then(function() {
            api.delete(resource, $scope[resource].id)
              .then(handleSuccessfulDelete)
              .catch(handleError)
          })
        }

        function cancel() {
          $state.go(parentState);
        }

        function processItem(callback) {
          return function(response) {
            if (typeof callback === 'function') {
              $scope[resource] = callback(response.data[0]);
            } else {
              $scope[resource] = response.data[0];
            }
            $scope.loaded = true;
          }
        }

        function handleSuccessfulSave(res) {
          toastr.success('Item saved successfully');
          $state.go(parentState);
        }

        function handleSuccessfulDelete(res) {
          toastr.success('Item deleted successfully');
          $state.go(parentState);
        }

        function handleError(err) {
          var message;
          switch (err.status) {
            case 409:
              message = 'This item cannot be deleted because it is currently in use. Please unassign ' +
                'all uses of this item and try again';
              break;
            default:
              message = 'There was an error processing your request. Please try again.';
          }
          toastr.error(message);
          error.handleHttpError(err);
        }
      }

      return {
        getListController: getListController,
        getEditFormController: getEditFormController
      }
    }
  ]);
