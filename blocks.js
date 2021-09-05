window.TETRIS.blocks  = (function () {

    var line = {
        shape: [
            [true, true, true, true],
        ],
        rowCount: 1,
    }

    var square = {
        shape: [
            [true, true],
            [true, true],
        ],
        rowCount: 2,
    }

    var tBlock = {
        shape: [
            [false, true, false],
            [true, true, true],
        ],
        rowCount: 2,
    }

    var zBlock = {
        shape: [
            [false, true, true],
            [true, true, false],
        ],
        rowCount: 2,
    }

    var zBlock2 = {
        shape: [
            [true, true, false],
            [false, true, true],
        ],
        rowCount: 2,
    }

    var lBlock = {
        shape: [
            [false, false, true],
           [true, true, true],
        ],
        rowCount: 2,
    }

    var lBlock2 = {
        shape: [
            [true, false, false],
            [true, true, true],
        ],
        rowCount: 2,
    }

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