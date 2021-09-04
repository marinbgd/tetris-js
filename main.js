window.TETRIS.main = (function () {

    var ctx
    var canvas
    var blockSize

    var startTime = Date.now()
    var gridWidth = 10
    var currentFrame = 0
    var gameSpeedInMs = 500

    function init () {
        canvas = document.getElementById('canvas')
        canvas.height = window.innerHeight
        canvas.width = window.innerHeight / 3

        //set size of one block
        blockSize = canvas.width / gridWidth

        ctx = canvas.getContext('2d')

        //set default font
        ctx.font = '48px serif';
    }

    function render () {
        console.log('render')

        //set background color
        ctx.fillStyle = '#222222'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        var timeInMs = Date.now() - startTime
        currentFrame = Math.round(timeInMs / gameSpeedInMs)

        var timeInSeconds = Math.round(timeInMs / 1000)
        window.TETRIS.render.renderGameTime(timeInSeconds + 's', ctx)

        var top = currentFrame * blockSize
        var element = window.TETRIS.blocks.tBlock
        window.TETRIS.render.renderElement(top, 0, element, '#00aa00', ctx, blockSize)
    }

    function start () {
        render()
        window.requestAnimationFrame(start)
    }

    return {
        init: init,
        start: start
    }
}())

window.TETRIS.main.init()
window.TETRIS.main.start()