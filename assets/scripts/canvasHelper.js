window.TETRIS.canvasHelper = (function () {

    function isFloat (n) {
        return Number(n) === n && n % 1 !== 0
    }

    function getCanvasSize (gridWidth, gridHeight) {
        // it is important to have whole numbers integers because of performance - antialiasing

        var calculatedHeight = window.innerHeight
        var calculatedWidth = Math.round(calculatedHeight / (gridHeight / gridWidth)) // set canvas size according to playground

        var blockSizeInPx = calculatedWidth / gridWidth
        if (isFloat(blockSizeInPx)) {
            // need to adjust width and height to be whole numbers
            blockSizeInPx = Math.floor(blockSizeInPx)
            calculatedWidth = blockSizeInPx * gridWidth
            calculatedHeight = blockSizeInPx * gridHeight
        }

        return {
            height: calculatedHeight,
            width: calculatedWidth,
            blockSizeInPx: blockSizeInPx,
        }
    }

    function setCanvasSize (canvas, canvasSize) {
        canvas.height = canvasSize.height
        canvas.width = canvasSize.width

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = canvasSize.width + 'px'
        canvas.style.height = canvasSize.height + 'px'

        return canvas
    }


    return {
        getCanvasSize: getCanvasSize,
        setCanvasSize: setCanvasSize,
    }
}())