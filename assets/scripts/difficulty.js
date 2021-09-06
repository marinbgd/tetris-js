window.TETRIS.difficulty = (function () {

    var DIFFICULT_TO_GAME_SPEED_MAP = {
        'easy': 500,
        'medium': 250,
        'hard': 150,
        'expert': 100,
        'impossible': 50,
    }

    function getGameSpeedByDifficulty (difficulty) {
        return DIFFICULT_TO_GAME_SPEED_MAP[difficulty]
    }

    return {
        getGameSpeedByDifficulty: getGameSpeedByDifficulty,
    }
}())