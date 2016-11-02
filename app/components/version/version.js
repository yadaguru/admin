'use strict';

angular.module('ygAdmin.version', [
  'ygAdmin.version.interpolate-filter',
  'ygAdmin.version.version-directive'
])

.value('version', '0.1');
