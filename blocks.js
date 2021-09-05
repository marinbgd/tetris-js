window.TETRIS.blocks  = (function () {

    var line = [
        [1, 1, 1, 1],
    ]

    var square = [
        [1, 1],
        [1, 1],
    ]

    var tBlock = [
        [0, 1, 0],
        [1, 1, 1],
    ]

    var zBlock = [
        [0, 1, 1],
        [1, 1, 0],
    ]

    var zBlock2 = [
        [1, 1, 0],
        [0, 1, 1],
    ]

    var lBlock = [
        [0, 0, 1],
        [1, 1, 1],
    ]

    var lBlock2 = [
        [1, 0, 0],
        [1, 1, 1],
    ]

    function getRandomElement () {
        var ALL_ELEMENTS = [line, tBlock, square, zBlock, zBlock2, lBlock, lBlock2]
        var length = ALL_ELEMENTS.length
        return ALL_ELEMENTS[Math.floor(Math.random() * length)]
    }

    return {
        line: line,
        square: square,
        tBlock: tBlock,
        getRandomElement: getRandomElement,
    }
}())