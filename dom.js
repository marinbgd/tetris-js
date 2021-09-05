window.TETRIS.dom = (function () {

    var timeElement
    var statusElement

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

    function renderStatus (isRunning) {
        if (isRunning) {
            statusElement.innerHTML = 'Running'
            statusElement.className = 'game-status game-status--run'
        } else {
            statusElement.innerHTML = 'Paused'
            statusElement.className = 'game-status game-status--pause'
        }
    }

    return {
        init: init,
        renderGameTime: renderGameTime,
        renderStatus: renderStatus,
    }
}())
