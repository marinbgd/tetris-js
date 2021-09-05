window.TETRIS.render = (function () {

    function renderElement (initialTop, initialLeft, element, color, ctx, blockSize) {
        ctx.fillStyle = color
        var top = initialTop
        var left = initialLeft
        element.forEach(function (row) {
            left = initialLeft
            row.forEach(function (cell) {
                if (cell) {
                    ctx.fillRect(left, top, blockSize, blockSize)
                }
                left += blockSize
            })
            top += blockSize
        })
    }

    function clearCanvas (canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function renderGrid (grid, color, ctx, blockSize) {
        ctx.fillStyle = color
        var top = 0
        var left = 0
        grid.forEach(function (row) {
            left = 0
            row.forEach(function (cell) {
                if (cell) {
                    ctx.fillRect(left, top, blockSize, blockSize)
                }
                left += blockSize
            })
            top += blockSize
        })
    }

    return {
        renderGrid: renderGrid,
        renderElement: renderElement,
        clearCanvas: clearCanvas,
    }
}())
