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

    function post(resource, data, isPublic) {
      var route = BASE_URL + resource + '/';
      var config = isPublic ? undefined : authHeaderConfig;

      return $http.post(route, data, config);
    }

    function foo() {
      return 'bar';
    }

    return {
      foo: foo,
      post: post
    }
  }
]);