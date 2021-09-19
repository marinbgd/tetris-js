window.TETRIS.configDialog = (function () {

    var currentDeferred
    var dialogElement
    var dialogDifficultyElement //#config-difficulty
    var dialogGridElement //#config-grid
    var allButtonElements
    var currentActiveButtonIndex

    function Defer () {
        var self = this;
        self.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve
            self.reject = reject
        })
    }

    function handleDifficultyClick (event) {
        currentDeferred.resolve(event.target.value)
        hide()
    }

    function handleConfigClick (event) {
        if (event.target.nodeName === 'BUTTON') {
            var newWidth = document.getElementById('config-grid-width').value
            var newHeight = document.getElementById('config-grid-height').value
            var newGridDimensions = {
                height: +newHeight,
                width: +newWidth,
            }
            currentDeferred.resolve(newGridDimensions)
            hide()
        }
    }

    function handleKeyDown (event) {
        event.stopPropagation()
        event.preventDefault()

        if (event.code === window.TETRIS.keys.keyMap.C) {
            currentDeferred.reject('closed')
            hide() // just close the config
            return
        }

        if (event.code === window.TETRIS.keys.keyMap.ENTER) {
            allButtonElements[currentActiveButtonIndex].click()
            return
        }

        var nextIndex = currentActiveButtonIndex + 1

        if (event.code === window.TETRIS.keys.keyMap.ARROW_DOWN) {
            nextIndex = currentActiveButtonIndex + 1
        }

        if (event.code === window.TETRIS.keys.keyMap.ARROW_UP) {
            nextIndex = currentActiveButtonIndex - 1
        }

        if (typeof allButtonElements[nextIndex] !== 'undefined') {
            allButtonElements[currentActiveButtonIndex].blur()
            allButtonElements[nextIndex].focus()
            currentActiveButtonIndex = nextIndex
        }
    }

    function addEventListeners () {
        dialogDifficultyElement.addEventListener('click', handleDifficultyClick)
        dialogGridElement.addEventListener('click', handleConfigClick)
        document.addEventListener('keydown', handleKeyDown)
    }

    function removeEventListeners () {
        dialogDifficultyElement.removeEventListener('click', handleDifficultyClick)
        dialogGridElement.removeEventListener('click', handleConfigClick)
        document.removeEventListener('keydown', handleKeyDown)
    }

    function init () {
        if (!dialogElement) {
            //get dialog element
            dialogElement = document.getElementById('config-dialog')

            dialogDifficultyElement = document.getElementById('config-difficulty')

            dialogGridElement = document.getElementById('config-grid')

            // get all buttons
            allButtonElements = dialogElement.getElementsByTagName('button')
        }
        dialogElement.className = 'config config--visible'

        // set active button
        currentActiveButtonIndex = 0

        // focus first button
        allButtonElements[currentActiveButtonIndex].focus()
    }

    function show () {
        init()
        addEventListeners()
        currentDeferred = new Defer()
        return currentDeferred.promise
    }

    function hide () {
        dialogElement = document.getElementById('config-dialog')
        removeEventListeners()
        dialogElement.className = 'config'
    }

    return {
        show: show,
        hide: hide,
    }
}())
