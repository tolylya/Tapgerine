'use strict';

export default function(app) {

    app.directive('gridItem', gridItem);

    function gridItem() {
        'ngInject';

        return {
            restrict: 'E',
            link: linkFn,
            scope: {
                item: '='
            }
        };

        function linkFn(scope, elem, attrs) {
            
        }

        
    }
}
