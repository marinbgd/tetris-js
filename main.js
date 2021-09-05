window.TETRIS.main = (function () {

    var startTime = Date.now()
    var currentFrame = 0
    var gameSpeedInMs = 100
    var isRunning = true
    var score = 0

    var currentElement = null
    var nextElement = null

    var grid = {
        config: {
            elementInitialLeft: 4,

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
        window.TETRIS.canvasNextElement.setCanvasSize(canvasSize.blockSizeInPx)
        window.TETRIS.canvasNextElement.renderElement(nextElement)
    }

    function handleRight () {
        var newLeft = currentElement.left + 1
        
        // prevent going through the right boundary
        if (newLeft <= (grid.config.width - currentElement.getShapeWidth())) {
            currentElement.left = newLeft
        }
    }

    function handleLeft () {
        var newLeft = currentElement.left - 1
        
        // prevent going through the left boundary
        if (newLeft >= 0) {
            currentElement.left = newLeft
        }
    }

    function handleDown () {
        window.TETRIS.grid.getToBottom(currentElement, grid.state)
    }

    function handleEnter () {
        window.TETRIS.grid.getToBottom(currentElement, grid.state)
    }

    function handleSpace () {
        window.TETRIS.grid.getToBottom(currentElement, grid.state)
    }

    function handleBackSpace () {
        isRunning = !isRunning
        var status = isRunning ? window.TETRIS.dom.STATUSES.RUNNING : window.TETRIS.dom.STATUSES.PAUSED
        window.TETRIS.dom.renderStatus(status)
    }

    function handleRotate () {
        currentElement.rotate(grid.config.width, grid.config.height)
    }

    function handleGameOver () {
        isRunning = false
        window.TETRIS.dom.renderStatus(window.TETRIS.dom.STATUSES.GAME_OVER)
    }

    function handleKeyDown (event) {
        event.stopPropagation()

        const isKeyValid = window.TETRIS.keys.getIsKeyValid(event)
        if (!isKeyValid) {
            return
        }

        if (event.code === window.TETRIS.keys.keyMap.BACK_SPACE) {
            handleBackSpace()
        }

        if (!isRunning) {
            return
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_RIGHT) {
            handleRight()
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_LEFT) {
            handleLeft()
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_DOWN) {
            handleDown()
        }

        if (event.code === window.TETRIS.keys.keyMap.SPACE) {
            handleSpace()
        }

        if (event.code === window.TETRIS.keys.keyMap.R) {
            handleRotate()
        }

        if (event.code === window.TETRIS.keys.keyMap.ENTER) {
            handleEnter()
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
        window.TETRIS.canvasNextElement.init(canvasSize.blockSizeInPx)

        window.TETRIS.background.renderGrid(grid.config)

        grid.state = window.TETRIS.grid.getEmptyGrid(grid.config.width, grid.config.height)
        currentElement = getNewRandomElement(currentFrame)
        nextElement = getNewRandomElement(currentFrame)
        window.TETRIS.canvasNextElement.renderElement(nextElement)

        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('keydown', handleKeyDown)
    }

    function render () {
        if (!isRunning) {
            return
        }

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        window.TETRIS.dom.renderGameTime(timeInMs)

        if (currentElement.currentFrame < currentFrame) {
            currentElement.currentFrame = currentFrame
            currentElement.top += 1
        }

        var isElementInCollision = window.TETRIS.grid.getIsElementInCollision(currentElement, grid.state)
        if (isElementInCollision) {
            // get top of the current element to previous position
            currentElement.top -= 1

            if (currentElement.top < 0) {
                handleGameOver()
                return
            }

            grid.state = window.TETRIS.grid.mergeElementInGrid(grid.state, currentElement)
            score += window.TETRIS.score.ELEMENT_DROP_POINTS

            var completedLineIndexes = window.TETRIS.grid.getCompletedLineIndexes(grid.state)

            if (completedLineIndexes.length) {
                grid.state = window.TETRIS.grid.destroyGridLinesByIndexes(grid.state, completedLineIndexes)
                window.TETRIS.render.clearCanvas()
                window.TETRIS.render.renderGrid(grid.state, grid.config.blockSizeInPx)

                var newPoints = window.TETRIS.score.getScorePointsFromCompletedLines(completedLineIndexes.length)
                score += newPoints
            }

            window.TETRIS.dom.renderScore(score)


            // get new element
            currentElement = nextElement
            nextElement = getNewRandomElement(currentFrame)
            window.TETRIS.canvasNextElement.renderElement(nextElement)
        } else {
            window.TETRIS.render.clearCanvas()
            window.TETRIS.render.renderGrid(grid.state, grid.config.blockSizeInPx)
            window.TETRIS.render.renderElement(currentElement, grid.config.blockSizeInPx)
        }
    }

    function getNewRandomElement (startedFrame) {
        var colors = window.TETRIS.colors.getRandomColors()
        var element = window.TETRIS.blocks.getRandomElementWithColors(colors, grid.config.elementInitialLeft)
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