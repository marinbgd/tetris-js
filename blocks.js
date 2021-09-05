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

    // mutates element
    function addColorsToElement (element, colors) {
        element.shape.forEach(function (row, indexR) {
            row.forEach(function (cell, indexC) {
                if (cell) {
                    element.shape[indexR][indexC] = colors
                }
            })
        })
        return element
    }

    function getRandomElement () {
        var ALL_ELEMENTS = [line, tBlock, square, zBlock, zBlock2, lBlock, lBlock2]
        var length = ALL_ELEMENTS.length
        return ALL_ELEMENTS[Math.floor(Math.random() * length)]
    }

    function getRandomElementWithColors (colors) {
        var ALL_ELEMENTS = [line, tBlock, square, zBlock, zBlock2, lBlock, lBlock2]
        var length = ALL_ELEMENTS.length
        var randomElement = ALL_ELEMENTS[Math.floor(Math.random() * length)]
        var element = JSON.parse(JSON.stringify(randomElement))
        return addColorsToElement(element, colors)
    }

    return {
        getRandomElement: getRandomElement,
        getRandomElementWithColors: getRandomElementWithColors,
        addColorsToElement: addColorsToElement,
    }
}())
