'use strict';

angular.module('templateStore.version', [
  'templateStore.version.interpolate-filter',
  'templateStore.version.version-directive'
])

.value('version', '0.1');
