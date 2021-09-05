window.TETRIS.background = (function () {

    var ctx
    var canvas

    function init (canvasSize) {
        canvas = document.getElementById('background')
        setCanvasSize(canvasSize)
        ctx = canvas.getContext('2d', { alpha: false })
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)
    }

    function setCanvasSize (canvasSize) {
        canvas = window.TETRIS.canvasHelper.setCanvasSize(canvas, canvasSize)
    }

    function renderGrid (gridConfig) {
        ctx.lineWidth = 1
        ctx.strokeStyle = gridConfig.backgroundLineColor

        //set background color
        ctx.fillStyle = gridConfig.backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw vertical
        var i = 1;
        var wLength = gridConfig.width
        for (i; i < wLength; i += 1) {
            ctx.moveTo(i * gridConfig.blockSizeInPx, 0)
            ctx.lineTo(i * gridConfig.blockSizeInPx, canvas.height)
        }

        // draw horizontal
        var j = 1;
        var hLength = gridConfig.height
        for (j; j < hLength; j += 1) {
            ctx.moveTo(0, j * gridConfig.blockSizeInPx)
            ctx.lineTo(canvas.width, j * gridConfig.blockSizeInPx)
        }

        ctx.stroke()
    }

    return {
        init: init,
        setCanvasSize: setCanvasSize,
        renderGrid: renderGrid,
    }
}())
