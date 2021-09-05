window.TETRIS.render = (function () {

    var canvas
    var ctx

    function init (canvasSize) {
        canvas = document.getElementById('canvas')
        //canvas = window.TETRIS.canvasHelper.setCanvasSize(canvas, canvasSize)
        setCanvasSize(canvasSize)
        ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)
    }

    function setCanvasSize (canvasSize) {
        canvas = window.TETRIS.canvasHelper.setCanvasSize(canvas, canvasSize)
    }

    function renderElement (initialTop, initialLeft, element, color, blockSize) {
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

    function clearCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function renderGrid (grid, color, blockSize) {
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
        init: init,
        setCanvasSize: setCanvasSize,
        renderGrid: renderGrid,
        renderElement: renderElement,
        clearCanvas: clearCanvas,
    }
}())
