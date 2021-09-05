window.TETRIS.colors  = (function () {

    var COLORS = [
        '#66A1ED', // light blue
        '#A0D231', // light green
        '#E66D64', // light red
        '#EA5D0D', // orange
        '#C261EE', // light purple
        '#EBCE26', // yellow
        '#BEBEBE', // grey
    ]

    function getRandomColor () {
        var length = COLORS.length
        return COLORS[Math.floor(Math.random() * length)]
    }

    return {
        getRandomColor: getRandomColor,
    }
}())