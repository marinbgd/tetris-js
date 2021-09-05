window.TETRIS.score = (function () {

    var LINES_TO_POINTS_MAP = {
        1: 50,
        2: 200,
        3: 500,
        4: 1000,
    }

    var ELEMENT_DROP_POINTS = 5

    function getScorePointsFromCompletedLines (completedLineCount) {
        return LINES_TO_POINTS_MAP[completedLineCount]
    }

    return {
        ELEMENT_DROP_POINTS: ELEMENT_DROP_POINTS,
        getScorePointsFromCompletedLines: getScorePointsFromCompletedLines,
    }
}())