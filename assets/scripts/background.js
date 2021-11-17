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
        var PSEUDO_3D_SHIFT = 10

        //set background color shadow
        ctx.fillStyle = gridConfig.backgroundColor
        ctx.fillRect(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT, canvas.width - PSEUDO_3D_SHIFT, canvas.height - PSEUDO_3D_SHIFT)

        ctx.lineWidth = 1
        ctx.strokeStyle = gridConfig.backgroundLineColor

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

        // polygon between perspective lines - vertical
        ctx.beginPath()
        ctx.fillStyle = '#111111'
        ctx.moveTo(0, 0)
        ctx.lineTo(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT)
        ctx.lineTo(PSEUDO_3D_SHIFT, canvas.height - (PSEUDO_3D_SHIFT/2))
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()

        // polygon between perspective lines - horizontal
        ctx.beginPath()
        ctx.fillStyle = '#191919'
        ctx.moveTo(0, 0)
        ctx.lineTo(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT)
        ctx.lineTo(canvas.width, PSEUDO_3D_SHIFT)
        ctx.lineTo(canvas.width, 0)
        ctx.closePath()
        ctx.fill()

        // perspective lines
        ctx.lineWidth = 2
        ctx.strokeStyle = gridConfig.backgroundLineColor
        ctx.beginPath()

        ctx.moveTo(0, 0)
        ctx.lineTo(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT)
        ctx.stroke()

        ctx.moveTo(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT)
        ctx.lineTo(canvas.width, PSEUDO_3D_SHIFT)
        ctx.stroke()

        ctx.moveTo(PSEUDO_3D_SHIFT, PSEUDO_3D_SHIFT)
        ctx.lineTo(PSEUDO_3D_SHIFT, canvas.height - (PSEUDO_3D_SHIFT/2))
        ctx.stroke()

        ctx.moveTo(0, canvas.height)
        ctx.lineTo(PSEUDO_3D_SHIFT, canvas.height - (PSEUDO_3D_SHIFT/2))
        ctx.stroke()
    }

    return {
        init: init,
        setCanvasSize: setCanvasSize,
        renderGrid: renderGrid,
    }
}())
