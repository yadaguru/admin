'use strict';

describe('The ygAdmin.services.error service', function() {
  var error;

  beforeEach(module('ygAdmin.services.error'));

  beforeEach(module(function($provide) {

  }));

  beforeEach(inject(function(_errorService_) {
    error = _errorService_;
  }));

  describe('handleHttpError method', function() {
    it('should log the error to the console', function() {
      console.log = jasmine.createSpy('log');

      error.handleHttpError('some error');
      expect(console.log).toHaveBeenCalledWith('some error');
    });
  })
});