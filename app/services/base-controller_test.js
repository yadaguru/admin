'use strict';

xdescribe('The ygAdmin.services.baseControllers service', function() {
  var deferred, rootScope, baseControllers, api, error;
  var apiSpy, errorSpy;

  beforeEach(module('ygAdmin.services.baseControllers'));

  beforeEach(module(function($provide) {
    apiSpy = jasmine.createSpyObj('api', ['getAll']);
    $provide.value('apiService', apiSpy);
    errorSpy = jasmine.createSpyObj('error', ['handleHttpError']);
    $provide.value('errorService', errorSpy);
  }));

  beforeEach(inject(function($q, $rootScope, _baseControllersService_, _apiService_, _errorService_) {
    baseControllers = _baseControllersService_;
    api = _apiService_;
    error = _errorService_;
    deferred = $q.defer();
    rootScope = $rootScope;
  }));

  describe('getListController method', function() {
    var controller, scope;
    beforeEach(function() {
      scope = {};
      controller = baseControllers.getListController('foo', scope);
    });

    it('should return an object with an init method for handling lists', function() {
      expect(controller.init).toEqual(jasmine.any(Function));
    });

    it('should add resources to the scope on init and set loaded flag to true', function() {
      var responseData = [{foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getAll.and.returnValue(deferred.promise);

      controller.init();
      rootScope.$apply();
      expect(scope).toEqual({foo: responseData, loaded: true});
    });

    it('should handle errors if api request fails', function() {
      deferred.reject('some error');
      apiSpy.getAll.and.returnValue(deferred.promise);

      controller.init();
      rootScope.$apply();
      expect(errorSpy.handleHttpError).toHaveBeenCalledWith('some error');
    })
  })
});

