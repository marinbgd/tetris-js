window.TETRIS.main = (function () {

    var startTime = Date.now()
    var currentFrame = 0
    var gameSpeedInMs = 100
    var isRunning = true

    var currentElement = null

    var grid = {
        config: {
            width: 10,
            height: 40,

            widthInPx: -1,
            heightInPx: -1,
        
            blockSizeInPx: -1,

            backgroundColor: '#222222',
            backgroundLineColor: '#331111',
        },
        state: null,
    }

    function handleWindowResize () {
        var canvasSize = initCanvasSizes()
        window.TETRIS.render.setCanvasSize(canvasSize)
        window.TETRIS.background.setCanvasSize(canvasSize)
        window.TETRIS.background.renderGrid(grid.config)
    }

    function handleRight () {
        currentElement.left += grid.config.blockSizeInPx
    }

    function handleLeft () {
        currentElement.left -= grid.config.blockSizeInPx
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

    function initCanvasSizes () {
        var canvasSize = window.TETRIS.canvasHelper.getCanvasSize(
            grid.config.width,
            grid.config.height
        )
        grid.config.widthInPx = canvasSize.width
        grid.config.heightInPx = canvasSize.height
        grid.config.blockSizeInPx = canvasSize.blockSizeInPx

        return canvasSize
    }

    function init () {
        window.TETRIS.dom.init()
        var canvasSize = initCanvasSizes()

        window.TETRIS.render.init(canvasSize)
        window.TETRIS.background.init(canvasSize)

        window.TETRIS.background.renderGrid(grid.config)

        grid.state = window.TETRIS.grid.getEmptyGrid(grid.config.width, grid.config.height)
        currentElement = getNewRandomElement(currentFrame)

        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('keydown', handleKeyDown)
    }

    function render () {
        console.log('render')
        if (!isRunning) {
            return
        }

        window.TETRIS.render.clearCanvas()

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        window.TETRIS.dom.renderGameTime(timeInMs)

        if (currentElement.currentFrame < currentFrame) {
            currentElement.currentFrame = currentFrame
            currentElement.top += grid.config.blockSizeInPx
        }
        var elementBottom = currentElement.top + (currentElement.element.rowCount * grid.config.blockSizeInPx)
        if (elementBottom > grid.config.heightInPx) {
            // element got to the bottom

            //merge element into grid state
            grid.state = window.TETRIS.grid.mergeElementInGrid(grid.state, currentElement.element.shape, 20, 4)
            window.TETRIS.render.renderGrid(grid.state, '#ffaaff', grid.config.blockSizeInPx)

            // get new element
            currentElement = getNewRandomElement(currentFrame)
        }
        window.TETRIS.render.renderGrid(grid.state, '#ffaaff', grid.config.blockSizeInPx)
        window.TETRIS.render.renderElement(
            currentElement.top,
            currentElement.left,
            currentElement.element.shape,
            currentElement.color,
            grid.config.blockSizeInPx
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