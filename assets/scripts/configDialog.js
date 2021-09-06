window.TETRIS.configDialog = (function () {

    var currentDeferred

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

    function addEventListeners (element) {
        element.addEventListener('click', handleClick)
    }

    function removeEventListeners (element) {
        element.removeEventListener('click', handleClick)
    }

    function show () {
        var dialogElement = document.getElementById('config-dialog')
        dialogElement.className = 'config config--visible'
        addEventListeners(dialogElement)
        currentDeferred = new Defer()
        return currentDeferred.promise
    }

    function hide () {
        var dialogElement = document.getElementById('config-dialog')
        removeEventListeners(dialogElement)
        dialogElement.className = 'config'
    }
    
    return {
        show: show,
        hide: hide,
    }
}())