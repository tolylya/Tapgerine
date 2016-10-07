'use strict';

function MainController($log, $scope, grid) {
    'ngInject';

    $scope.grid = grid;

    $log.info($scope.grid);

}

export default MainController;
