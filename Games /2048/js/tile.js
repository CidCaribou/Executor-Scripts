function Tile(i, t) {
    this.x = i.x,
    this.y = i.y,
    this.value = t || 2,
    this.previousPosition = null,
    this.mergedFrom = null
}
Tile.prototype.savePosition = function() {
    this.previousPosition = {
        x: this.x,
        y: this.y
    }
}
,
Tile.prototype.updatePosition = function(i) {
    this.x = i.x,
    this.y = i.y
}
,
Tile.prototype.clone = function() {
    return newTile = new Tile({
        x: this.x,
        y: this.y
    },this.value),
    newTile
}
;
