'use strict';

angular.module('ygAdmin.services.api', [])

.factory('apiService', [
  '$http',
  'authService',
  function($http, auth) {
    var authHeaderConfig = {
      headers: {
        Authorization: function() {
          return auth.getUserToken();
        }
      }
    };

    var BASE_URL = 'http://localhost:3005/api/'; // TODO: move to config

    function getAll(resource, isPublic) {
      var route = BASE_URL + resource + '/';
      var config = isPublic ? undefined : authHeaderConfig;

      return $http.get(route, config);
    }

    function getOne(resource, id, isPublic) {
      var route = BASE_URL + resource + '/' + id + '/';
      var config = isPublic ? undefined : authHeaderConfig;

      return $http.get(route, config);
    }

    function post(resource, data, isPublic) {
      var route = BASE_URL + resource + '/';
      var config = isPublic ? undefined : authHeaderConfig;

      return $http.post(route, data, config);
    }

    return {
      getAll: getAll,
      getOne: getOne,
      post: post
    }
  }
]);