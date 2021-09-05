window.TETRIS.render = (function () {

    function renderElement (initialTop, initialLeft, element, color, ctx, blockSize) {
        ctx.fillStyle = color
        var top = initialTop
        var left = initialLeft
        element.forEach(function (row) {
            left = initialLeft
            row.forEach(function (cell) {
                if (cell) {
                    ctx.fillRect(left, top, blockSize, blockSize)
                }
                left += blockSize
            })
            top += blockSize
        })
    }

    function renderGameTime (timeInMs, ctx) {
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#fefefe'
        var minutes = Math.floor((timeInMs / 1000) / 60)
        var seconds = Math.floor((timeInMs / 1000) % 60)
        var minutesString = minutes.toString().padStart(2, '0')
        var secondsString = seconds.toString().padStart(2, '0')
        ctx.fillText(minutesString + ':' + secondsString, 120, 20)
    }

    function renderGrid (ctx, PLAYGROUND) {
        ctx.lineWidth = 1
        ctx.strokeStyle = PLAYGROUND.gridLineColor

        //set background color
        ctx.fillStyle = PLAYGROUND.gridBackgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // draw vertical
        var i = 1;
        var wLength = PLAYGROUND.width
        for (i; i < wLength; i += 1) {
            ctx.moveTo(i * PLAYGROUND.blockSizeInPx, 0)
            ctx.lineTo(i * PLAYGROUND.blockSizeInPx, canvas.height)
            ctx.stroke()
        }

        // draw horizontal
        var j = 1;
        var hLength = PLAYGROUND.height
        for (j; j < hLength; j += 1) {
            ctx.moveTo(0, j * PLAYGROUND.blockSizeInPx)
            ctx.lineTo(canvas.width, j * PLAYGROUND.blockSizeInPx)
            ctx.stroke()
        }
    }

    return {
        renderGameTime: renderGameTime,
        renderElement: renderElement,
        renderGrid: renderGrid,
    }
}())
