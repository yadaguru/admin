'use strict';

describe('ygAdmin.version module', function() {
  beforeEach(module('ygAdmin.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
