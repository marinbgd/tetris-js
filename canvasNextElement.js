window.TETRIS.canvasNextElement = (function () {

    var ctx
    var canvas
    var blockSizeInPx

    function init (newBlockSizeInPx) {
        canvas = document.getElementById('next-element--canvas')
        ctx = canvas.getContext('2d', { alpha: true })
        ctx.imageSmoothingEnabled = false
        ctx.scale(1, 1)

        canvas.height = newBlockSizeInPx * 4
        canvas.width = newBlockSizeInPx * 4

        // set physical canvas size - css size, to prevent scaling
        canvas.style.width  = (newBlockSizeInPx * 4) + 'px'
        canvas.style.height = (newBlockSizeInPx * 4) + 'px'

        blockSizeInPx = newBlockSizeInPx
    }

    function clearCanvas () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function renderElement (element) {
        console.log(element)
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
    }
}())
