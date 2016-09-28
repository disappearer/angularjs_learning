'use strict';

angular.module('myContacts.version', [
  'myContacts.version.interpolate-filter',
  'myContacts.version.version-directive'
])

.value('version', '0.1');
