window.TETRIS.sound = (function () {

    var audio

    function init () {
        audio = new Audio('./assets/sounds/splat.mp3')
    }

    function playSplat () {
        audio.play()
    }

    return {
        init: init,
        playSplat: playSplat,
    }
}())