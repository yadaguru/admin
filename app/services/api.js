'use strict';

angular.module('ygAdmin.services.api', [])

.factory('apiService', [
  '$http',
  'authService',
  function($http, auth) {
    function getRequestConfig(isPublic) {
      if (isPublic) {
        return {};
      }
      return {headers: {Authorization: auth.getUserToken()}}
    }

    var BASE_URL = 'http://localhost:3005/api/'; // TODO: move to config

    function getAll(resource, isPublic) {
      var route = BASE_URL + resource + '/';
      return $http.get(route, getRequestConfig(isPublic));
    }

    function getOne(resource, id, isPublic) {
      var route = BASE_URL + resource + '/' + id + '/';
      return $http.get(route, getRequestConfig(isPublic));
    }

    function post(resource, data) {
      var route = BASE_URL + resource + '/';
      return $http.post(route, data, getRequestConfig());
    }

    return {
      getAll: getAll,
      getOne: getOne,
      post: post
    }
  }
]);