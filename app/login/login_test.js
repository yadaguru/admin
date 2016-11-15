'use strict';

describe('ygAdmin.login module', function() {
  var deferred, LoginCtrl, $scope, rootScope, apiService, authService, $state, errorService;

  beforeEach(module('ygAdmin.login'));

  beforeEach(module(function($provide) {
    apiService = jasmine.createSpyObj('apiService', ['post']);
    authService = jasmine.createSpyObj('authService', ['saveUserToken']);
    $state = jasmine.createSpyObj('$state', ['go']);
    errorService = jasmine.createSpyObj('errorService', ['handleHttpError']);
    $provide.value('apiService', apiService);
    $provide.value('authService', authService);
    $provide.value('$state', $state);
    $provide.value('errorService', errorService);
  }));

  beforeEach(inject(function($q, $rootScope, $controller, apiService, authService, $state, errorService) {
    rootScope = $rootScope;
    $scope = rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: $scope,
      apiService: apiService,
      authService: authService,
      $state: $state,
      errorService: errorService
    });
    deferred = $q.defer();
  }));

  describe('login controller $scope.login function', function(){
    beforeEach(function() {
      $scope.userName = 'foo';
      $scope.password = 'bar';
    });

    it('should post the username and password to the /admin_users route', function() {
      deferred.resolve({data: {token: 'token'}});
      apiService.post.and.returnValue(deferred.promise);
      $scope.login();
      rootScope.$apply();

      expect(apiService.post).toHaveBeenCalledWith('admin_users', {
        userName: 'foo',
        password: 'bar'
      });
    });

    it('should save the user token on successful login', function() {
      deferred.resolve({data: {token: 'token'}});
      apiService.post.and.returnValue(deferred.promise);
      $scope.login();
      rootScope.$apply();

      expect(authService.saveUserToken).toHaveBeenCalledWith('token');
    });

    it('should redirect to /reminders on successful login', function() {
      deferred.resolve({data: {token: 'token'}});
      apiService.post.and.returnValue(deferred.promise);
      $scope.login();
      rootScope.$apply();

      expect($state.go).toHaveBeenCalledWith('reminders');
    });

    it('should handle the error if login is not successful', function() {
      deferred.reject('some error');
      apiService.post.and.returnValue(deferred.promise);
      $scope.login();
      rootScope.$apply();

      expect(errorService.handleHttpError).toHaveBeenCalledWith('some error');
    });

  });
});