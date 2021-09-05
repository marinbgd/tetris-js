window.TETRIS.background = (function () {

    var ctx
    var canvas

    function setCanvasSize () {
        var size = window.TETRIS.config.getCanvasSize()
        canvas.height = size.height
        canvas.width = size.width

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = size.width + 'px'
        canvas.style.height = size.height + 'px'
    }

    function init () {
        canvas = document.getElementById('background')
        ctx = canvas.getContext('2d', { alpha: false })
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)

        setCanvasSize()
    }

    function renderGrid (PLAYGROUND) {
        ctx.lineWidth = 1
        ctx.strokeStyle = PLAYGROUND.gridLineColor

        //set background color
        ctx.fillStyle = PLAYGROUND.gridBackgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw vertical
        var i = 1;
        var wLength = PLAYGROUND.width
        for (i; i < wLength; i += 1) {
            ctx.moveTo(i * PLAYGROUND.blockSizeInPx, 0)
            ctx.lineTo(i * PLAYGROUND.blockSizeInPx, canvas.height)
            ctx.stroke()
        }

        // draw horizontal
        var j = 1;
        var hLength = PLAYGROUND.height
        for (j; j < hLength; j += 1) {
            ctx.moveTo(0, j * PLAYGROUND.blockSizeInPx)
            ctx.lineTo(canvas.width, j * PLAYGROUND.blockSizeInPx)
            ctx.stroke()
        }
    }

    return {
        init: init,
        renderGrid: renderGrid,
        setCanvasSize: setCanvasSize,
    }
}())
