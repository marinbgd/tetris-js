window.TETRIS.colors  = (function () {

    var COLORS_DUAL = [
        ['#66A1ED', '#4b76aa' ], // light blue
        ['#A0D231', '#7ca026'], // light green
        ['#E66D64', '#9b4a44'], // light red
        ['#EA5D0D', '#b5460a'], // orange
        ['#C261EE', '#994dbc'], // light purple
        ['#EBCE26', '#b29c1e'], // yellow
        ['#BEBEBE', '#878787'], // grey
    ]

    function getRandomColors () {
        var length = COLORS_DUAL.length
        return COLORS_DUAL[Math.floor(Math.random() * length)]
    }

    return {
        getRandomColors: getRandomColors,
    }
}())