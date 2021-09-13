window.TETRIS.configDialog = (function () {

    var currentDeferred
    var dialogElement
    var allButtonElements
    var currentActiveButtonIndex

    function Defer () {
        var self = this;
        self.promise = new Promise(function (resolve, reject) {
            self.resolve = resolve
            self.reject = reject
        })
    }

    function handleClick (event) {
        currentDeferred.resolve(event.target.value)
        hide()
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

    function addEventListeners (element) {
        element.addEventListener('click', handleClick)
        document.addEventListener('keydown', handleKeyDown)
    }

    function removeEventListeners (element) {
        element.removeEventListener('click', handleClick)
        document.removeEventListener('keydown', handleKeyDown)
    }

    function init () {
        if (!dialogElement) {
            //get dialog element
            dialogElement = document.getElementById('config-dialog')

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
        addEventListeners(dialogElement)
        currentDeferred = new Defer()
        return currentDeferred.promise
    }

    function hide () {
        dialogElement = document.getElementById('config-dialog')
        removeEventListeners(dialogElement)
        dialogElement.className = 'config'
    }

    return {
        show: show,
        hide: hide,
    }
}())
