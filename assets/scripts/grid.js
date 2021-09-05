window.TETRIS.grid = (function () {

    var EMPTY_GRID_CELL = null

    // mutates grid
    function mergeElementInGrid (grid, element) {
        var i = 0
        var j = 0
        var elementRowsCount = element.shape.length
        var rowLength = element.shape[0].length
        var blockValue
        for (i = 0; i < elementRowsCount; i += 1) {
            for(j = 0; j < rowLength; j += 1) {
                blockValue = element.shape[i][j]
                if (blockValue) {
                    grid[element.top + i][element.left + j] = blockValue    
                }
            }
        }
        return grid
    }

    function getEmptyGridRow (width) {
        return new Array(width).fill(EMPTY_GRID_CELL)
    }

    function getEmptyGrid (width, height) {
        var grid = []
        var i = 0;
        for (i; i < height; i += 1) {
            grid[i] = getEmptyGridRow(width)
        }

        return grid
    }

    function getIsElementInCollision (element, grid) {
        var inCollision = false
        var i = 0
        var j = 0
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

    // mutates element top
    function getToBottom (element, grid) {
        var isElementNotInCollision = true
        while (isElementNotInCollision) {
            var isInCollision = getIsElementInCollision(element, grid)
            if (isInCollision) {
                isElementNotInCollision = false
                element.top -= 1 // prepare element for merging into grid - must not intersect
                break
            }
            element.top += 1
        }
    }

    function getCompletedLineIndexes (grid) {
        var i = 0
        var j = 0
        var rowsCount = grid.length
        var colsCount = grid[0].length
        var isRowFull = true
        var fullRowIndexes = []

        for (i; i < rowsCount; i += 1) {
            isRowFull = true
            for(j = 0; j < colsCount; j += 1) {
                blockValue = grid[i][j]
                if (!blockValue) {
                    isRowFull = false
                }
            }
            if (isRowFull) {
                fullRowIndexes.push(i)
            }
        }

        return fullRowIndexes
    }

    function destroyGridLinesByIndexes (grid, gridIndexes) {
        var i = 0
        var gridIndex
        var gridColsCount = grid[0].length

        for (i = 0; i < gridIndexes.length; i += 1) {
            gridIndex = gridIndexes[i]
            grid.splice(gridIndex, 1)
        }

        for (i = 0; i < gridIndexes.length; i += 1) {
            grid.unshift(getEmptyGridRow(gridColsCount))
        }

        return grid
    }

    return {
        getEmptyGrid: getEmptyGrid,
        mergeElementInGrid: mergeElementInGrid,
        getIsElementInCollision: getIsElementInCollision,
        getCompletedLineIndexes: getCompletedLineIndexes,
        destroyGridLinesByIndexes: destroyGridLinesByIndexes,
        getToBottom: getToBottom,
    }
}())