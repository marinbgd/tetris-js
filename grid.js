window.TETRIS.grid = (function () {

    // mutates grid
    function mergeElementInGrid (grid, elementShape, top, left) {
        var i = 0
        var elementRowsCount = elementShape.length
        for (i; i < elementRowsCount; i += 1) {
            var j = 0
            var rowLength = elementShape[i].length

            for(j; j < rowLength; j += 1) {
                if (elementShape[i][j]) {
                    grid[top + i][left + j] = true    
                }
            }
        }
        return grid
    }

    function getEmptyGrid (width, height) {
        var grid = []
        var i = 0;
        for (i; i < height; i += 1) {
            grid[i] = new Array(width).fill(false)
        }

        grid[30][1] = true
        grid[30][2] = true
        grid[30][3] = true
        grid[31][2] = true
        return grid
    }

    return {
        getEmptyGrid: getEmptyGrid,
        mergeElementInGrid: mergeElementInGrid,
    }
}())