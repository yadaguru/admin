'use strict';

describe('The ygAdmin.services.baseControllers service', function() {
  var $q, deferred, rootScope, baseControllers;
  var apiSpy, errorSpy, stateSpy, toastrSpy, promptSpy;

  beforeEach(module('ygAdmin.services.baseControllers'));

  beforeEach(module(function($provide) {
    apiSpy = jasmine.createSpyObj('api', ['getAll', 'getOne', 'post', 'put', 'delete']);
    $provide.value('apiService', apiSpy);
    errorSpy = jasmine.createSpyObj('error', ['handleHttpError']);
    $provide.value('errorService', errorSpy);
    promptSpy = jasmine.createSpy('prompt');
    $provide.value('prompt', promptSpy);
    stateSpy = jasmine.createSpyObj('state', ['go']);
    $provide.value('$state', stateSpy);
    toastrSpy = jasmine.createSpyObj('toastr', ['success', 'error']);
    $provide.value('toastr', toastrSpy);
  }));

  beforeEach(inject(function(_$q_, $rootScope, _baseControllersService_) {
    $q = _$q_;
    baseControllers = _baseControllersService_;
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
    });

    it('should process each item with a callback passed into the init method', function() {
      var responseData = [{foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getAll.and.returnValue(deferred.promise);

      controller.init(function(item) {
        item.foo = item.foo + 's';
        item.bar = item.bar + 's';
        return item
      });
      rootScope.$apply();
      expect(scope).toEqual({foo: [{foo: 'foos', bar: 'bars'}], loaded: true});
    })
  });

  describe('getEditFormController method', function() {
    var controller, scope;

    beforeEach(function() {
      scope = {};
      controller = baseControllers.getEditFormController('foo', 'foos', scope);
    });

    it('should return an object with an init method for handling the edit form', function() {
      expect(controller.init).toEqual(jasmine.any(Function));
    });

    it('should add the retrieved resource to the scope on init and set the loaded flag to true', function() {
      var responseData = [{foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      controller.init(1);
      rootScope.$apply();
      expect(scope.foo).toEqual(responseData[0]);
      expect(scope.loaded).toBe(true);
      expect(apiSpy.getOne).toHaveBeenCalledWith('foo', 1);
    });

    it('should process the loaded item with a callback passed into the init method', function() {
      var responseData = [{foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      controller.init(1, function(item) {
        item.foo = item.foo + 's';
        item.bar = item.bar + 's';
        return item
      });
      rootScope.$apply();
      expect(scope.foo).toEqual({foo: 'foos', bar: 'bars'});
    });

    it('should handle errors if the api request fails', function() {
      deferred.reject('some error');
      apiSpy.getOne.and.returnValue(deferred.promise);

      controller.init(1);
      rootScope.$apply();
      expect(errorSpy.handleHttpError).toHaveBeenCalledWith('some error');
    });

    it('should set scope.isNew to false if an ID is passed into the init function', function() {
      var responseData = [{foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      controller.init(1);
      rootScope.$apply();
      expect(scope.isNew).toBe(false);
    });

    it('should set scope.isNew to true if no ID is passed to the init function', function() {
      controller.init();
      rootScope.$apply();
      expect(scope.isNew).toBe(true);
    });

    it('should make a POST request when scope.saveItem() is called on a new item', function() {
      deferred.resolve();
      apiSpy.post.and.returnValue(deferred.promise);

      controller.init();
      scope.foo.name = 'foo';
      scope.foo.value = 42;
      scope.saveItem();

      expect(apiSpy.post).toHaveBeenCalledWith('foo', {name: 'foo', value: 42}, undefined);
    });

    it('should make a PUT request when scope.saveItem() is called on an existing item', function() {
      var responseData = [{id: 1, foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      var putDeferred = $q.defer();
      putDeferred.resolve();
      apiSpy.put.and.returnValue(deferred.promise);

      controller.init(1);
      rootScope.$apply();
      scope.foo.bar = 'rab';
      scope.saveItem();

      expect(apiSpy.put).toHaveBeenCalledWith('foo', {id: 1, foo: 'foo', bar: 'rab'}, 1);
    });

    it('should flash a success message and return to the parent view on successful save', function() {
      deferred.resolve();
      apiSpy.post.and.returnValue(deferred.promise);

      controller.init();
      scope.saveItem();
      rootScope.$apply();

      expect(toastrSpy.success).toHaveBeenCalledWith('Item saved successfully');
      expect(stateSpy.go).toHaveBeenCalledWith('foos');
    });

    it('should prompt the user if scope.deleteItem() is called', function() {
      var responseData = [{id: 1, foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      var promptDeferred = $q.defer();
      promptDeferred.reject();
      promptSpy.and.returnValue(promptDeferred.promise);

      controller.init(1);
      rootScope.$apply();
      scope.deleteItem();

      expect(promptSpy).toHaveBeenCalledWith({
        title: 'Delete Item?',
        message: 'Are you sure you want to delete this item?'
      });
    });

    it('should delete the item if scope.deleteItem() is called, and return to the parent state', function() {
      var responseData = [{id: 1, foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      var promptDeferred = $q.defer();
      promptDeferred.resolve();
      promptSpy.and.returnValue(promptDeferred.promise);

      var deleteDeferred = $q.defer();
      deleteDeferred.resolve();
      apiSpy.delete.and.returnValue(deleteDeferred.promise);

      controller.init(1);
      rootScope.$apply();
      scope.deleteItem();
      rootScope.$apply();

      expect(apiSpy.delete).toHaveBeenCalledWith('foo', 1);
      expect(stateSpy.go).toHaveBeenCalledWith('foos');
    });

    it('should handle errors when saving an item', function() {
      deferred.reject('some error');
      apiSpy.post.and.returnValue(deferred.promise);

      controller.init();
      scope.foo.name = 'foo';
      scope.foo.value = 42;
      scope.saveItem();
      rootScope.$apply();

      expect(errorSpy.handleHttpError).toHaveBeenCalledWith('some error');
      expect(toastrSpy.error).toHaveBeenCalledWith(
        'There was an error processing your request. Please try again.'
      );
    });

    it('should handle errors when deleting an item', function() {
      var responseData = [{id: 1, foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      var promptDeferred = $q.defer();
      promptDeferred.resolve();
      promptSpy.and.returnValue(promptDeferred.promise);

      var deleteDeferred = $q.defer();
      deleteDeferred.reject('some error');
      apiSpy.delete.and.returnValue(deleteDeferred.promise);

      controller.init(1);
      rootScope.$apply();
      scope.deleteItem();
      rootScope.$apply();

      expect(errorSpy.handleHttpError).toHaveBeenCalledWith('some error');
      expect(toastrSpy.error).toHaveBeenCalledWith(
        'There was an error processing your request. Please try again.'
      );
    });

    it('should handle conflict errors specially when deleting', function() {
      var responseData = [{id: 1, foo: 'foo', bar: 'bar'}];
      var resp = {data: responseData};
      deferred.resolve(resp);
      apiSpy.getOne.and.returnValue(deferred.promise);

      var promptDeferred = $q.defer();
      promptDeferred.resolve();
      promptSpy.and.returnValue(promptDeferred.promise);

      var deleteDeferred = $q.defer();
      deleteDeferred.reject({status: 409});
      apiSpy.delete.and.returnValue(deleteDeferred.promise);

      controller.init(1);
      rootScope.$apply();
      scope.deleteItem();
      rootScope.$apply();

      expect(errorSpy.handleHttpError).toHaveBeenCalledWith({status: 409});
      expect(toastrSpy.error).toHaveBeenCalledWith(
        'This item cannot be deleted because it is currently in use. Please unassign ' +
        'all uses of this item and try again'
      );
    });

    it('should go back to the parent state on scope.cancel()', function() {
      controller.init();
      scope.cancel();

      expect(stateSpy.go).toHaveBeenCalledWith('foos');
    })
  });
});

