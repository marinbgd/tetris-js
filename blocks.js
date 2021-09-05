window.TETRIS.blocks  = (function () {

    var line = {
        shape: [
            [true, true, true, true],
        ],
    }

    var square = {
        shape: [
            [true, true],
            [true, true],
        ],
    }

    var tBlock = {
        shape: [
            [false, true, false],
            [true, true, true],
        ],
    }

    var zBlock = {
        shape: [
            [false, true, true],
            [true, true, false],
        ],
    }

    var zBlock2 = {
        shape: [
            [true, true, false],
            [false, true, true],
        ],
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

    function getRandomElementWithColors (colors, initialLeftPosition) {
        var randomElement = getRandomElement()
        var randomElementCopy = JSON.parse(JSON.stringify(randomElement))
        var randomElementWithColors = addColorsToElement(randomElementCopy, colors)
        var element = new window.TETRIS.Block(randomElementWithColors.shape, initialLeftPosition)
        return element
    }

    return {
        getRandomElement: getRandomElement,
        getRandomElementWithColors: getRandomElementWithColors,
        addColorsToElement: addColorsToElement,
    }
}())
