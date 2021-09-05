window.TETRIS.score = (function () {

    var LINES_TO_POINTS_MAP = {
        1: 10,
        2: 40,
        3: 100,
        4: 300,
    }

    function getScorePointsFromCompletedLines (completedLineCount) {
        return LINES_TO_POINTS_MAP[completedLineCount]
    }

    return {
        getScorePointsFromCompletedLines: getScorePointsFromCompletedLines,
    }
}())