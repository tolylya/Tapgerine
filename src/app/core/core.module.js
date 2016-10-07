'use strict';

const shared = angular.module('core.shared', []);

require('./directives/validation-test/validation-test.directive')(shared);

require('./services/grid.factory')(shared);

export default shared;
