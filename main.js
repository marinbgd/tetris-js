window.TETRIS.main = (function () {

    var ctx
    var canvas

    var startTime = Date.now()
    var currentFrame = 0
    var gameSpeedInMs = 100

    var currentElement = null

    function handleWindowResize () {
        window.TETRIS.config.setCanvasSize(canvas)
    }

    function handleRight () {
        currentElement.left += window.TETRIS.config.getPlaygroundConfig().blockSizeInPx
    }

    function handleLeft () {
        currentElement.left -= window.TETRIS.config.getPlaygroundConfig().blockSizeInPx
    }

    function handleKeyDown (event) {
        event.stopPropagation()
        const isKeyValid = window.TETRIS.keys.getIsKeyValid(event)
        if (!isKeyValid) {
            return
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_RIGHT) {
            handleRight()
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_LEFT) {
            handleLeft()
        }
    }

    function init () {
        currentElement = getNewRandomElement(currentFrame)

        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)

        window.TETRIS.config.setCanvasSize(canvas)

        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('keydown', handleKeyDown)
    }

    function render () {
        console.log('render')
        var PLAYGROUND = window.TETRIS.config.getPlaygroundConfig()

        window.TETRIS.render.renderGrid(ctx, PLAYGROUND)

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        window.TETRIS.render.renderGameTime(timeInMs, ctx)

        if (currentElement.currentFrame < currentFrame) {
            currentElement.currentFrame = currentFrame
            currentElement.top += PLAYGROUND.blockSizeInPx
        }

        if (currentElement.top > canvas.height) {
            currentElement = getNewRandomElement(currentFrame)
        }
        window.TETRIS.render.renderElement(
            currentElement.top,
            currentElement.left,
            currentElement.element,
            currentElement.color,
            ctx,
            PLAYGROUND.blockSizeInPx
        )
    }

    function getNewRandomElement (startedFrame) {
        var element = {}
        element.element = window.TETRIS.blocks.getRandomElement()
        element.color = window.TETRIS.colors.getRandomColor()
        element.top = 0
        element.left = 0
        element.createdAtFrame = startedFrame
        element.currentFrame = startedFrame
        return element
    }

    function start () {
        render()
        window.requestAnimationFrame(start)
    }

    return {
        init: init,
        start: start,
    }
}())

window.TETRIS.main.init()
window.TETRIS.main.start()