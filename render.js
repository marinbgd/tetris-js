window.TETRIS.render = (function () {

    var initialLeft = 0
    var direction = 1

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

    function renderGameTime (time, ctx) {
        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#fefefe'
        ctx.fillText(time, 150, 20)
    }

    function renderText () {
        console.log('renderText')

        //set background color
        ctx.fillStyle = '#222222'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        //draw text
        ctx.fillStyle = '#fefefe'

        if (initialLeft >= canvas.width) {
            direction = 0
        }

        if (initialLeft <= 0) {
            direction = 1
        }

        if (direction) {
            initialLeft += 1
        } else {
            initialLeft -= 1
        }
        
    
        ctx.fillText('Hello world', initialLeft, 50)
    }

    return {
        renderText: renderText,
        renderGameTime: renderGameTime,
        renderElement: renderElement
    }
}())
