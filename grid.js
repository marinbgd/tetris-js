window.TETRIS.grid = (function () {

    // mutates grid
    function mergeElementInGrid (grid, element) {
        var i = 0
        var elementRowsCount = element.shape.length
        for (i; i < elementRowsCount; i += 1) {
            var j = 0
            var rowLength = element.shape[i].length

            for(j; j < rowLength; j += 1) {
                var blockValue = element.shape[i][j]
                if (blockValue) {
                    grid[element.top + i][element.left + j] = blockValue    
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

    function getIsElementInCollision (element, grid) {
        var inCollision = false
        var i = 0
        var elementRowsCount = element.shape.length
        var rowLength = element.shape[i].length

        var gridCol
        var gridRow
        var gridValue
        var blockValue

        checkMatrix:
        for (i; i < elementRowsCount; i += 1) {
            for(j = 0; j < rowLength; j += 1) {
            
                gridCol = element.top + i
                if (gridCol >= grid.length) {
                    inCollision = true
                    break checkMatrix
                }

                gridRow = element.left + j
                if (gridRow >= grid[0].length) {
                    inCollision = true
                    break checkMatrix
                }

                blockValue = element.shape[i][j]
                gridValue = grid[element.top + i][element.left + j]
                if (blockValue && gridValue) {
                    inCollision = true
                    break checkMatrix
                }
            }
        }

        return inCollision
    }

    return {
        getEmptyGrid: getEmptyGrid,
        mergeElementInGrid: mergeElementInGrid,
        getIsElementInCollision: getIsElementInCollision,
    }
}())