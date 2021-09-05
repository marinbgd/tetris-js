window.TETRIS.Block  = (function () {

    function constr (shape, initialLeftPosition) {
        this.shape = shape
        this.rowCount = this.getRowCountFromShape()
        this.top = 0
        this.left = initialLeftPosition
    }
    
    return constr
}())

window.TETRIS.Block.prototype.rotate = function rotate () {
    var rotatedShape = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse())
    this.shape = rotatedShape
    this.rowCount = this.getRowCountFromShape()
}

window.TETRIS.Block.prototype.getShapeWidth = function getShapeWidth () {
    return this.shape[0].length
}

window.TETRIS.Block.prototype.getRowCountFromShape = function getRowCountFromShape () {
    return this.shape.length
}