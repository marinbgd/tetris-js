window.TETRIS.blocks  = (function () {

    var line = [
        [1, 1, 1, 1]
    ]

    var square = [
        [1, 1],
        [1, 1]
    ]

    var tBlock = [
        [0, 1, 0],
        [1, 1, 1]
    ]

    return {
        line: line,
        square: square,
        tBlock: tBlock
    }
}())