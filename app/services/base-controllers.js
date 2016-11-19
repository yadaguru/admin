'use strict';

angular.module('ygAdmin.services.baseControllers', ['ui.router'])

  .factory('baseControllersService', [
    'apiService',
    'errorService',
    '$state',
    'prompt',
    function(api, error, $state, prompt) {
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

      function getEditFormController(resource, parentState, $scope) {
        return {
          init: function(id) {
            $scope.saveItem = saveItem;
            $scope.deleteItem = deleteItem;
            $scope.cancel = cancel;
            if (id) {
              return getItem(id)
                .then(processItem)
                .catch(error.handleHttpError);
            }
            $scope.isNew = true;
            $scope[resource] = {};
            console.log($scope.form);
          }
        };

        function getItem(id) {
          console.log(id);
          return api.getOne(resource, id);
        }

        function saveItem() {
          console.log('save item', $scope[resource]);
          var method = $scope.isNew ? 'post' : 'put';
          api[method](resource, $scope[resource], $scope[resource].id)
            .then(handleSuccessfulSave)
            .catch(error.handleHttpError);
        }

        function deleteItem() {
          console.log('delete item', $scope[resource]);
          prompt({
            title: 'Delete Item?',
            message: 'Are you sure you want to delete this item?'
          }).then(function() {
            api.delete(resource, $scope[resource].id)
              .then(handleSucessfulDelete)
              .catch(error.handleHttpError)
          })
        }

        function cancel() {
          console.log('cancel');
          $state.go(parentState);
        }

        function processItem(response) {
          $scope[resource] = response.data[0];
          $scope.loaded = true;
        }

        function handleSuccessfulSave(res) {
          console.log('saved successfully');
        }

        function handleSucessfulDelete(res) {
          console.log('deleted successfully');
        }
      }

      return {
        getListController: getListController,
        getEditFormController: getEditFormController
      }
    }
  ]);
