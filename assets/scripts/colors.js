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

    function getLightenDarkenHexColor (hexColor, amount) {
        var usePound = false
        if ( hexColor[0] === '#' ) {
            hexColor = hexColor.slice(1)
            usePound = true
        }

        var num = parseInt(hexColor,16)

        var r = (num >> 16) + amount

        if ( r > 255 ) r = 255
        else if  (r < 0) r = 0

        var b = ((num >> 8) & 0x00FF) + amount

        if ( b > 255 ) b = 255
        else if  (b < 0) b = 0

        var g = (num & 0x0000FF) + amount

        if ( g > 255 ) g = 255
        else if ( g < 0 ) g = 0

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }

    return {
        getRandomColors: getRandomColors,
        getLightenDarkenHexColor: getLightenDarkenHexColor,
    }
}())
