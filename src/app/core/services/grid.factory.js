'use strict';

export default function(app) {
    app
        .factory('grid', gridFactory);

    function gridFactory() {
    	let grid = [];
        for (let i = 0; i < 10; i++) {
            grid[i] = [];
            for (let j = 0; j < 10; j++)
                grid[i][j] = { color: {red: 255, blue: 255, green: 255}, x: i, y: j };
        }
        return grid;
    }
}
