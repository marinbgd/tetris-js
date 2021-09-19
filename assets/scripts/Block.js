window.TETRIS.Block = function Block (shape, initialLeftPosition) {
    this.shape = shape
    this.rowCount = this.getRowCountFromShape()
    this.top = 0
    this.left = initialLeftPosition
}

window.TETRIS.Block.prototype.rotate = function rotate (MAX_LEFT, MAX_BOTTOM) {
    var rotatedShape = this.shape[0].map((val, index) => this.shape.map(row => row[index]).reverse())
    this.shape = rotatedShape
    this.rowCount = this.getRowCountFromShape()

    // fix when rotation would make element to go through the right boundary
    if ((this.left + this.getShapeWidth()) > MAX_LEFT) {
        var newLeftDelta = (this.left + this.getShapeWidth()) - MAX_LEFT
        this.left -= newLeftDelta
    }

    // fix when rotation would make element to go through the bottom boundary
    if ((this.top + this.rowCount) > MAX_BOTTOM) {
        var newTopDelta = (this.top + this.rowCount) - MAX_BOTTOM
        this.top -= newTopDelta
    }
}

window.TETRIS.Block.prototype.getShapeWidth = function getShapeWidth () {
    return this.shape[0].length
}

window.TETRIS.Block.prototype.getRowCountFromShape = function getRowCountFromShape () {
    return this.shape.length
}
