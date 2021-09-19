window.TETRIS.dom = (function () {

    var timeElement
    var statusElement
    var scoreElement
    var modeElement
    var pointsContainerElement
    var pointsValueElement
    var gridHeightElement
    var gridWidthElement
    var bodyElement
    var pointsFlashingTimeout = -1

    var STATUSES = {
        RUNNING: 'Running',
        PAUSED: 'Paused',
        GAME_OVER: 'Game Over',
    }

    var BACKGROUND_CLASS_NAMES = [
        'background--divcibare',
        'background--fullmoon',
        'background--house',
        'background--lovebirds',
        'background--palic',
    ]

    function init () {
        timeElement = document.getElementById('game-time')
        statusElement = document.getElementById('game-status')
        scoreElement = document.getElementById('game-score')
        modeElement = document.getElementById('game-mode')
        pointsContainerElement = document.getElementById('points-container')
        pointsValueElement = document.getElementById('points-value')
        gridHeightElement = document.getElementById('game-grid-size-height')
        gridWidthElement = document.getElementById('game-grid-size-width')
        bodyElement = document.body
    }

    function renderNewPoints (newPoints) {
        pointsContainerElement.className = 'points points--animation'
        pointsValueElement.innerHTML = newPoints
        window.clearTimeout(pointsFlashingTimeout)
        pointsFlashingTimeout = setTimeout(removeNewPoints, 1000)
    }

    function renderNewGridSize (width, height) {
        gridHeightElement.innerHTML = height
        gridWidthElement.innerHTML = width
    }

    function removeNewPoints () {
        pointsContainerElement.className = 'points'
        window.clearTimeout(pointsFlashingTimeout)
        pointsFlashingTimeout = -1
    }

    function renderScore (newScore) {
        scoreElement.innerHTML = newScore
    }

    function renderGameMode (newMode) {
        modeElement.innerHTML = newMode
    }

    function renderGameTime (timeInMs) {
        var minutes = Math.floor((timeInMs / 1000) / 60)
        var seconds = Math.floor((timeInMs / 1000) % 60)
        var minutesString = minutes.toString().padStart(2, '0')
        var secondsString = seconds.toString().padStart(2, '0')
        timeElement.innerHTML = minutesString + ':' + secondsString
    }

    function renderStatus (status) {
        switch (status) {
            case STATUSES.PAUSED:
                statusElement.className = 'game-status game-status--pause'
                break
            case STATUSES.GAME_OVER:
                statusElement.className = 'game-status game-status--over'
                break
            case STATUSES.RUNNING:
            default:
                statusElement.className = 'game-status game-status--run'
                break
        }
        statusElement.innerHTML = status
    }

    function setRandomBackgroundImage () {
        var length = BACKGROUND_CLASS_NAMES.length
        var randomBg = BACKGROUND_CLASS_NAMES[Math.floor(Math.random() * length)]
        bodyElement.className = 'background ' + randomBg
    }

    return {
        init: init,
        renderGameTime: renderGameTime,
        renderStatus: renderStatus,
        renderScore: renderScore,
        renderGameMode: renderGameMode,
        renderNewPoints: renderNewPoints,
        renderNewGridSize: renderNewGridSize,
        setRandomBackgroundImage: setRandomBackgroundImage,
        STATUSES: STATUSES,
    }
}())
