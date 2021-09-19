window.TETRIS.canvasNextElement = (function () {

    var ctx
    var canvas
    var blockSizeInPx

    function init (newBlockSizeInPx) {
        canvas = document.getElementById('next-element--canvas')
        ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)

        setCanvasSize(newBlockSizeInPx)
    }

    function setCanvasSize (newBlockSizeInPx) {
        blockSizeInPx = newBlockSizeInPx

        canvas.height = newBlockSizeInPx * 4
        canvas.width = newBlockSizeInPx * 4

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = (newBlockSizeInPx * 4) + 'px'
        canvas.style.height = (newBlockSizeInPx * 4) + 'px'
    }

    function setPositionOnScreen (mainCanvasWidth) {
        // set just to the left of the main game canvas
        var wrapperElement = document.getElementsByClassName('next-element')[0]
        wrapperElement.style.position = 'absolute'
        wrapperElement.style.right = mainCanvasWidth + 20 + 'px'
        wrapperElement.style.top = 0.5 + 'em'
        wrapperElement.style.marginTop = 0
    }

    function clearCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function renderElement (element) {
        clearCanvas()

        var left = 0
        var top = 0
        element.shape.forEach(function (row) {
            left = 0
            row.forEach(function (cell) {
                if (cell) {
                    var gradient = ctx.createLinearGradient(left, top, left + blockSizeInPx, top + blockSizeInPx)
                    gradient.addColorStop(0, cell[0])
                    gradient.addColorStop(1, cell[1])
                    ctx.fillStyle = gradient
                    ctx.fillRect(left, top, blockSizeInPx, blockSizeInPx)
                }
                left += blockSizeInPx
            })
            top += blockSizeInPx
        })
    }

    return {
        init: init,
        renderElement: renderElement,
        setCanvasSize: setCanvasSize,
        clearCanvas: clearCanvas,
        setPositionOnScreen: setPositionOnScreen,
    }
}())
