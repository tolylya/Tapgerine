'use strict';

const shared = angular.module('core.shared', []);

require('./directives/grid-item/grid-item.js')(shared);
require('./directives/grid-pallet/grid-pallet.js')(shared);

require('./services/grid.factory')(shared);

export default shared;
