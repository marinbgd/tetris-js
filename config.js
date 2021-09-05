window.TETRIS.config = (function () {

    var PLAYGROUND = {
        gridBackgroundColor: '#222222',
        gridLineColor: '#331111',
        width: 10, // blocks
        height: 40, // blocks
        blockSizeInPx: -1,
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

    function getPlaygroundConfig () {
        return PLAYGROUND
    }

    return {
        setCanvasSize: setCanvasSize,
        getPlaygroundConfig: getPlaygroundConfig,
    }
}())