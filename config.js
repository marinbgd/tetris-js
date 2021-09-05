window.TETRIS.config = (function () {

    var PLAYGROUND = {
        gridBackgroundColor: '#222222',
        gridLineColor: '#331111',
        width: 10, // blocks
        height: 40, // blocks
        blockSizeInPx: -1,
    }

    function isFloat (n) {
        return Number(n) === n && n % 1 !== 0
    }

    function getCanvasSize () {
        // it is important to have whole numbers integers because of performance - antialiasing

        var calculatedHeight = window.innerHeight
        var calculatedWidth = Math.round(calculatedHeight / (PLAYGROUND.height / PLAYGROUND.width)) // set canvas size according to playground

        var blockSizeInPx = calculatedWidth / PLAYGROUND.width
        if (isFloat(blockSizeInPx)) {
            // need to adjust width and height to be whole numbers
            blockSizeInPx = Math.floor(blockSizeInPx)
            calculatedWidth = blockSizeInPx * PLAYGROUND.width
            calculatedHeight = blockSizeInPx * PLAYGROUND.height
        }

        return {
            height: calculatedHeight,
            width: calculatedWidth,
            blockSizeInPx: blockSizeInPx,
        }
    }

    function setCanvasSize (canvas) {
        var size = getCanvasSize()
        canvas.height = size.height
        canvas.width = size.width

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = size.width + 'px'
        canvas.style.height = size.height + 'px'

        // set size of one block
        PLAYGROUND.blockSizeInPx = size.blockSizeInPx
    }

    function getPlaygroundConfig () {
        return PLAYGROUND
    }

    return {
        getCanvasSize: getCanvasSize,
        setCanvasSize: setCanvasSize,
        getPlaygroundConfig: getPlaygroundConfig,
    }
}())