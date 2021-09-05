window.TETRIS.main = (function () {

    var ctx
    var canvas

    var startTime = Date.now()
    var currentFrame = 0
    var gameSpeedInMs = 500

    var PLAYGROUND = {
        gridLineColor: '#331111',
        width: 10, // blocks
        height: 40, // blocks
        blockSizeInPx: -1,
    }

    function handleWindowResize () {
        setCanvasSize(canvas)
    }

    function init () {
        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')

        setCanvasSize(canvas)
        window.addEventListener('resize', handleWindowResize)
    }

    function setCanvasSize (canvas) {
        var calculatedHeight = window.innerHeight
        var calculatedWidth = Math.round(calculatedHeight / (PLAYGROUND.height / PLAYGROUND.width)) // set canvas size according to playground
        canvas.height = calculatedHeight
        canvas.width = calculatedWidth

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = calculatedWidth + 'px'
        canvas.style.height = calculatedHeight + 'px'

        // set size of one block
        PLAYGROUND.blockSizeInPx = calculatedWidth / PLAYGROUND.width
    }

    function drawGrid () {
        ctx.lineWidth = 1
        ctx.strokeStyle = PLAYGROUND.gridLineColor

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

    function render () {
        console.log('render')

        //set background color
        ctx.fillStyle = '#222222'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        drawGrid()

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        var timeInSeconds = Math.round(timeInMs / 1000)
        window.TETRIS.render.renderGameTime(timeInSeconds + 's', ctx)

        var top = currentFrame * PLAYGROUND.blockSizeInPx
        var element = window.TETRIS.blocks.tBlock
        window.TETRIS.render.renderElement(top, 0, element, '#00aa00', ctx, PLAYGROUND.blockSizeInPx)
    }

    function start () {
        render()
        window.requestAnimationFrame(start)
    }

    return {
        init: init,
        start: start
    }
}())

window.TETRIS.main.init()
window.TETRIS.main.start()