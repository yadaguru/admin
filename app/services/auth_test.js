'use strict';

describe('The ygAdmin.services.auth service', function() {
  var auth, localStorage;
  var localStorageSpy;
  beforeEach(module('ygAdmin.services.auth'));

  beforeEach(module(function($provide) {
    localStorageSpy = jasmine.createSpyObj('localStorage', ['get', 'set', 'remove']);
    $provide.value('localStorageService', localStorageSpy);
  }));

  beforeEach(inject(function(_authService_, _localStorageService_) {
    auth = _authService_;
    localStorage = _localStorageService_;
  }));

  describe('getUserToken method', function() {
    it('should return the user\'s auth token', function() {
      localStorageSpy.get.and.returnValue('user_token');
      expect(auth.getUserToken()).toEqual('user_token');
      expect(localStorageSpy.get).toHaveBeenCalledWith('token');
    });
  });

  describe('saveUserToken method', function() {
    it('should save the user\'s auth token to local storage', function() {
      auth.saveUserToken('user_token');
      expect(localStorageSpy.set).toHaveBeenCalledWith('token', 'user_token');
    });
  });

  describe('removeUserToken method', function() {
    it('should remove the user\'s auth token from local storage', function() {
      auth.removeUserToken();
      expect(localStorageSpy.remove).toHaveBeenCalledWith('token');
    });
  });

  describe('isAuthorized method', function() {
    it('return true if there is a token set', function() {
      localStorageSpy.get.and.returnValue('user_token');
      expect(auth.isAuthorized()).toEqual(true);
      expect(localStorageSpy.get).toHaveBeenCalledWith('token');
    });

    it('return false if there is no token set', function() {
      localStorageSpy.get.and.returnValue(undefined);
      expect(auth.isAuthorized()).toEqual(false);
      expect(localStorageSpy.get).toHaveBeenCalledWith('token');
    });
  });
});