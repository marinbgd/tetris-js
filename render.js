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

    return {
        renderElement: renderElement,
        clearCanvas: clearCanvas,
    }
}())
