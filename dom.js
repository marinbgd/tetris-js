window.TETRIS.dom = (function () {

    var timeElement

    function init () {
        timeElement = document.getElementById('game-time')
    }

    function renderGameTime (timeInMs) {
        var minutes = Math.floor((timeInMs / 1000) / 60)
        var seconds = Math.floor((timeInMs / 1000) % 60)
        var minutesString = minutes.toString().padStart(2, '0')
        var secondsString = seconds.toString().padStart(2, '0')
        timeElement.innerHTML = minutesString + ':' + secondsString
    }

    return {
        init: init,
        renderGameTime: renderGameTime,
    }
}())
