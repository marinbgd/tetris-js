window.TETRIS.main = (function () {

    var ctx
    var canvas

    var startTime = Date.now()
    var currentFrame = 0
    var gameSpeedInMs = 100
    var isRunning = true

    var currentElement = null

    var gridState = null

    function handleWindowResize () {
        window.TETRIS.config.setCanvasSize(canvas)
        window.TETRIS.background.setCanvasSize()
    }

    function handleRight () {
        currentElement.left += window.TETRIS.config.getPlaygroundConfig().blockSizeInPx
    }

    function handleLeft () {
        currentElement.left -= window.TETRIS.config.getPlaygroundConfig().blockSizeInPx
    }

    function handleSpace () {
        isRunning = !isRunning
        window.TETRIS.dom.renderStatus(isRunning)
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

        if (event.code === window.TETRIS.keys.keyMap.SPACE) {
            handleSpace()
        }
    }

    function init () {
        window.TETRIS.dom.init()
        window.TETRIS.background.init()
        gridState = getEmptyGrid(window.TETRIS.config.getPlaygroundConfig())
        currentElement = getNewRandomElement(currentFrame)

        canvas = document.getElementById('canvas')
        ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)

        window.TETRIS.config.setCanvasSize(canvas)
        window.TETRIS.background.renderGrid(window.TETRIS.config.getPlaygroundConfig())

        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('keydown', handleKeyDown)
    }

    function render () {
        console.log('render')
        if (!isRunning) {
            return
        }

        var PLAYGROUND = window.TETRIS.config.getPlaygroundConfig()

        window.TETRIS.render.clearCanvas(canvas, ctx)

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        window.TETRIS.dom.renderGameTime(timeInMs)

        if (currentElement.currentFrame < currentFrame) {
            currentElement.currentFrame = currentFrame
            currentElement.top += PLAYGROUND.blockSizeInPx
        }
        var elementBottom = currentElement.top + (currentElement.element.rowCount * PLAYGROUND.blockSizeInPx)
        if (elementBottom > canvas.height) {
            // element got to the bottom

            //merge element into grid state
            gridState = mergeElementInGrid(gridState, currentElement.element.shape, 20, 4)
            window.TETRIS.render.renderGrid(gridState, '#ffaaff', ctx, PLAYGROUND.blockSizeInPx)

            // get new element
            currentElement = getNewRandomElement(currentFrame)
        }
        window.TETRIS.render.renderGrid(gridState, '#ffaaff', ctx, PLAYGROUND.blockSizeInPx)
        window.TETRIS.render.renderElement(
            currentElement.top,
            currentElement.left,
            currentElement.element.shape,
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

    function mergeElementInGrid (grid, elementShape, top, left) {
        var i = 0
        var elementRowsCount = elementShape.length
        for (i; i < elementRowsCount; i += 1) {
            var j = 0
            var rowLength = elementShape[i].length

            for(j; j < rowLength; j += 1) {
                if (elementShape[i][j]) {
                    grid[top + i][left + j] = true    
                }
            }
        }
        return grid
    }

    function getEmptyGrid () {
        var grid = []
        var PLAYGROUND = window.TETRIS.config.getPlaygroundConfig()
        var i = 0;
        for (i; i < PLAYGROUND.height; i += 1) {
            grid[i] = new Array(PLAYGROUND.width).fill(false)
        }

        grid[30][1] = true
        grid[30][2] = true
        grid[30][3] = true
        grid[31][2] = true
        return grid
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