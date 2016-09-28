'use strict';

describe('myContacts.version module', function() {
  beforeEach(module('myContacts.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
