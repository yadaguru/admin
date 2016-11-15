'use strict';

describe('The ygAdmin.services.api service', function() {
  var deferred, rootScope, api, http, auth;
  var httpSpy, authGetUserTokenSpy, httpConfig;
  beforeEach(module('ygAdmin.services.api'));

  beforeEach(module(function($provide) {
    httpSpy = jasmine.createSpyObj('http', ['get', 'post']);
    authGetUserTokenSpy = jasmine.createSpy('authGetUserToken');

    $provide.value('$http', httpSpy);
    $provide.value('authService', {getUserToken: authGetUserTokenSpy});
  }));

  beforeEach(inject(function($q, $rootScope, _apiService_, $http, _authService_) {
    rootScope = $rootScope;
    api = _apiService_;
    http = $http;
    auth = _authService_;
    deferred = $q.defer();

    authGetUserTokenSpy.and.returnValue('token');
    httpConfig = {headers: {Authorization: 'token'}}
  }));

  describe('getAll method', function() {
    var result, responseData;

    beforeEach(function() {
      responseData = [{foo: 'foo'}, {bar: 'bar'}];
      deferred.resolve(responseData);
      httpSpy.get.and.returnValue(deferred.promise);
    });

    it('should return a promise resolving with all private resources', function() {
      api.getAll('foo').then(function(r) {result = r});
      rootScope.$apply();
      expect(result).toEqual(responseData);
      expect(httpSpy.get).toHaveBeenCalledWith(
        'http://localhost:3005/api/foo/',
        httpConfig
      )
    });

    it('should return a promise resolving with all public resources', function() {
      api.getAll('foo', true).then(function(r){result = r});
      rootScope.$apply();
      expect(result).toEqual(responseData);
      expect(httpSpy.get).toHaveBeenCalledWith(
        'http://localhost:3005/api/foo/',
        {}
      );
    });
  });

  describe('getOne method', function() {
    var result, responseData;

    beforeEach(function() {
      responseData = [{foo: 'foo'}];
      deferred.resolve(responseData);
      httpSpy.get.and.returnValue(deferred.promise);
    });

    it('should return a promise resolving with the request private resources', function() {
      api.getOne('foo', 1).then(function(r) {result = r});
      rootScope.$apply();
      expect(result).toEqual(responseData);
      expect(httpSpy.get).toHaveBeenCalledWith(
        'http://localhost:3005/api/foo/1/',
        httpConfig
      )
    });

    it('should return a promise resolving with the requested public resources', function() {
      api.getOne('foo', 1, true).then(function(r){result = r});
      rootScope.$apply();
      expect(result).toEqual(responseData);
      expect(httpSpy.get).toHaveBeenCalledWith(
        'http://localhost:3005/api/foo/1/',
        {}
      );
    });
  });

  describe('post method', function() {
    var result, requestData, responseData;

    beforeEach(function() {
      responseData = [{id: 1, foo: 'foo'}];
      requestData = [{foo: 'foo'}];
      deferred.resolve(responseData);
      httpSpy.post.and.returnValue(deferred.promise);
    });

    it('should return a promise resolving with the request private resources', function() {
      api.post('foo', requestData).then(function(r) {result = r});
      rootScope.$apply();
      expect(result).toEqual(responseData);
      expect(httpSpy.post).toHaveBeenCalledWith(
        'http://localhost:3005/api/foo/',
        requestData,
        httpConfig
      )
    });
  });
});