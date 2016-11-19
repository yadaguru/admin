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
      return $http.post(route, _convertToStrings(data), getRequestConfig());
    }

    function put(resource, data, id) {
      var route = BASE_URL + resource + '/' + id + '/';
      return $http.put(route, _convertToStrings(data), getRequestConfig());
    }

    function _delete_(resource, id) {
      var route = BASE_URL + resource + '/' + id + '/';
      return $http.delete(route, getRequestConfig());
    }

    function _convertToStrings(data) {
      var convertedData = {};
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          var value = data[prop];
          if (['number', 'boolean'].indexOf(typeof value) > -1) {
            convertedData[prop] = value.toString();
          } else {
            convertedData[prop] = value;
          }
        }
      }
      return convertedData;
    }

    return {
      getAll: getAll,
      getOne: getOne,
      post: post,
      put: put,
      delete: _delete_
    }
  }
]);