window.TETRIS.dom = (function () {

    var timeElement
    var statusElement

    var STATUSES = {
        RUNNING: 'Running',
        PAUSED: 'Paused',
        GAME_OVER: 'Game Over',
    }

    function init () {
        timeElement = document.getElementById('game-time')
        statusElement = document.getElementById('game-status')
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

    return {
        init: init,
        renderGameTime: renderGameTime,
        renderStatus: renderStatus,
        STATUSES: STATUSES,
    }
}())
