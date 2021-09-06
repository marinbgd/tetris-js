window.TETRIS.keys = (function () {

    var VALID_KEY_CODES_MAP = {
        ARROW_DOWN: 'ArrowDown',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight',
        ARROW_UP: 'ArrowUp',
        R: 'KeyR', //rotate
        C: 'KeyC', //config
        SPACE: 'Space', //down
        ENTER: 'Enter', //down
        BACK_SPACE: 'Backspace', //pause
    }
    var VALID_KEY_CODES = Object.values(VALID_KEY_CODES_MAP)

    function getIsKeyValid (keyEvent) {
        return (!!~VALID_KEY_CODES.indexOf(keyEvent.code))
    }

    return {
        getIsKeyValid: getIsKeyValid,
        keyMap: VALID_KEY_CODES_MAP,
    }
}())