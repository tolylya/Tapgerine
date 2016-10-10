'use strict';

export default function(app) {

    app.directive('gridPallet', gridPallet);

    function gridPallet() {
        'ngInject';

        return {
            restrict: 'E',
            link: linkFn,
            // controller: controller,
            template: template,
            scope: {
                color: '@'
            }
        };

        // function controller($scope, $log) {
        //     $log.info($scope.item);
        // }

        function linkFn(scope, elem, attrs) {
            
        }
    }
}

let template = `
<main>
    <div class="pallet {{color}}"></div>
</main>`;

