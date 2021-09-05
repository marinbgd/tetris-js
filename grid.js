window.TETRIS.grid = (function () {

    // mutates grid
    function mergeElementInGrid (grid, elementShape, top, left) {
        console.log(top, left)
        var i = 0
        var elementRowsCount = elementShape.length
        for (i; i < elementRowsCount; i += 1) {
            var j = 0
            var rowLength = elementShape[i].length

            for(j; j < rowLength; j += 1) {
                var blockValue = elementShape[i][j]
                if (blockValue) {
                    grid[top + i][left + j] = blockValue    
                }
            }
        }
        return grid
    }

    function getEmptyGrid (width, height) {
        var EMPTY_BLOCK = null
        
        var grid = []
        var i = 0;
        for (i; i < height; i += 1) {
            grid[i] = new Array(width).fill(EMPTY_BLOCK)
        }

        return grid
    }

    return {
        getEmptyGrid: getEmptyGrid,
        mergeElementInGrid: mergeElementInGrid,
    }
}())