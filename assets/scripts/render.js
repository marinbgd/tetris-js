window.TETRIS.render = (function () {

    var canvas
    var ctx

    function init (canvasSize) {
        canvas = document.getElementById('canvas')
        setCanvasSize(canvasSize)
        ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)
    }

    function setCanvasSize (canvasSize) {
        canvas = window.TETRIS.canvasHelper.setCanvasSize(canvas, canvasSize)
    }

    function renderElement (element, blockSize) {
        var top = element.top * blockSize
        var initialLeft = element.left * blockSize
        var left

        var i = 0
        var j = 0
        var shapeRowCount = element.shape.length
        var shapeColCount = element.shape[i].length
        var cell
        var gradient

        for (i; i < shapeRowCount; i += 1) {
            left = initialLeft
            for (j = 0; j < shapeColCount; j += 1) {
                cell = element.shape[i][j]
                if (cell) {
                    // pseudo 3d shadow cell
                    var shadowRelativeDistance = Math.ceil(blockSize/12)
                    var shadowBlurDistance = Math.ceil(blockSize/4)
                    var shadowSize = blockSize * 1.125
                    var shadowColor = window.TETRIS.colors.getLightenDarkenHexColor(cell[1], -40)
                    ctx.fillStyle = shadowColor
                    ctx.fillRect(
                        left + shadowRelativeDistance,
                        top + shadowRelativeDistance,
                        shadowSize,
                        shadowSize
                    )
                    ctx.shadowColor = shadowColor
                    ctx.shadowBlur = shadowBlurDistance

                    // main cell
                    gradient = ctx.createLinearGradient(left, top, left + blockSize, top + blockSize)
                    gradient.addColorStop(0, cell[0])
                    gradient.addColorStop(1, cell[1])
                    ctx.fillStyle = gradient
                    ctx.fillRect(left, top, blockSize, blockSize)

                    ctx.strokeStyle = '#FEFEFE'
                    ctx.strokeRect(left, top, blockSize, blockSize)
                }
                left += blockSize
            }
            top += blockSize
        }
    }

    function clearCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function renderGrid (grid, blockSize) {
        var top = 0
        var left = 0

        var cell
        var gradient
        var i = 0
        var j = 0
        var gridLength = grid.length
        var gridHeight = grid[0].length

        for (i; i < gridLength; i += 1) {
            left = 0
            for (j = 0; j < gridHeight; j += 1) {
                cell = grid[i][j]
                if (cell) {
                    // pseudo 3d shadow cell
                    var shadowRelativeDistance = Math.ceil(blockSize/12)
                    var shadowBlurDistance = Math.ceil(blockSize/4)
                    var shadowSize = blockSize * 1.125
                    var shadowColor = window.TETRIS.colors.getLightenDarkenHexColor(cell[1], -60)
                    ctx.fillStyle = shadowColor
                    ctx.fillRect(
                        left + shadowRelativeDistance,
                        top + shadowRelativeDistance,
                        shadowSize,
                        shadowSize
                    )
                    ctx.shadowColor = shadowColor
                    ctx.shadowBlur = shadowBlurDistance

                    // main cell
                    gradient = ctx.createLinearGradient(left, top, left + blockSize, top + blockSize)
                    gradient.addColorStop(0, cell[0])
                    gradient.addColorStop(1, cell[1])

                    ctx.fillStyle = gradient
                    ctx.fillRect(left, top, blockSize, blockSize)

                    ctx.strokeStyle = '#FEFEFE'
                    ctx.strokeRect(left, top, blockSize, blockSize)
                }
                left += blockSize
            }
            top += blockSize
        }
    }

    return {
        init: init,
        setCanvasSize: setCanvasSize,
        renderGrid: renderGrid,
        renderElement: renderElement,
        clearCanvas: clearCanvas,
    }
}())
