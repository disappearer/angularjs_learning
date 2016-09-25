'use strict';

describe('templateStore.version module', function() {
  beforeEach(module('templateStore.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
