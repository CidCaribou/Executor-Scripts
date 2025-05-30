function Grid(e) {
    this.size = e,
    this.startTiles = 2,
    this.cells = [],
    this.build(),
    this.playerTurn = !0
}
Grid.prototype.indexes = [];
for (var x = 0; x < 4; x++) {
    Grid.prototype.indexes.push([]);
    for (var y = 0; y < 4; y++)
        Grid.prototype.indexes[x].push({
            x: x,
            y: y
        })
}
Grid.prototype.build = function() {
    for (var e = 0; e < this.size; e++)
        for (var t = this.cells[e] = [], i = 0; i < this.size; i++)
            t.push(null)
}
,
Grid.prototype.randomAvailableCell = function() {
    var e = this.availableCells();
    if (e.length)
        return e[Math.floor(Math.random() * e.length)]
}
,
Grid.prototype.availableCells = function() {
    var e = [];
    return this.eachCell((function(t, i, r) {
        r || e.push({
            x: t,
            y: i
        })
    }
    )),
    e
}
,
Grid.prototype.eachCell = function(e) {
    for (var t = 0; t < this.size; t++)
        for (var i = 0; i < this.size; i++)
            e(t, i, this.cells[t][i])
}
,
Grid.prototype.cellsAvailable = function() {
    return !!this.availableCells().length
}
,
Grid.prototype.cellAvailable = function(e) {
    return !this.cellOccupied(e)
}
,
Grid.prototype.cellOccupied = function(e) {
    return !!this.cellContent(e)
}
,
Grid.prototype.cellContent = function(e) {
    return this.withinBounds(e) ? this.cells[e.x][e.y] : null
}
,
Grid.prototype.insertTile = function(e) {
    this.cells[e.x][e.y] = e
}
,
Grid.prototype.removeTile = function(e) {
    this.cells[e.x][e.y] = null
}
,
Grid.prototype.withinBounds = function(e) {
    return e.x >= 0 && e.x < this.size && e.y >= 0 && e.y < this.size
}
,
Grid.prototype.clone = function() {
    newGrid = new Grid(this.size),
    newGrid.playerTurn = this.playerTurn;
    for (var e = 0; e < this.size; e++)
        for (var t = 0; t < this.size; t++)
            this.cells[e][t] && newGrid.insertTile(this.cells[e][t].clone());
    return newGrid
}
,
Grid.prototype.addStartTiles = function() {
    for (var e = 0; e < this.startTiles; e++)
        this.addRandomTile()
}
,
Grid.prototype.addRandomTile = function() {
    if (this.cellsAvailable()) {
        var e = Math.random() < .9 ? 2 : 4
          , t = new Tile(this.randomAvailableCell(),e);
        this.insertTile(t)
    }
}
,
Grid.prototype.prepareTiles = function() {
    this.eachCell((function(e, t, i) {
        i && (i.mergedFrom = null,
        i.savePosition())
    }
    ))
}
,
Grid.prototype.moveTile = function(e, t) {
    this.cells[e.x][e.y] = null,
    this.cells[t.x][t.y] = e,
    e.updatePosition(t)
}
,
Grid.prototype.vectors = {
    0: {
        x: 0,
        y: -1
    },
    1: {
        x: 1,
        y: 0
    },
    2: {
        x: 0,
        y: 1
    },
    3: {
        x: -1,
        y: 0
    }
},
Grid.prototype.getVector = function(e) {
    return this.vectors[e]
}
,
Grid.prototype.move = function(e) {
    var t, i, r = this, l = this.getVector(e), o = this.buildTraversals(l), s = !1, n = 0, a = !1;
    return this.prepareTiles(),
    o.x.forEach((function(e) {
        o.y.forEach((function(o) {
            if (t = r.indexes[e][o],
            i = r.cellContent(t)) {
                var h = r.findFarthestPosition(t, l)
                  , c = r.cellContent(h.next);
                if (c && c.value === i.value && !c.mergedFrom) {
                    var u = new Tile(h.next,2 * i.value);
                    u.mergedFrom = [i, c],
                    r.insertTile(u),
                    r.removeTile(i),
                    i.updatePosition(h.next),
                    n += u.value,
                    2048 === u.value && (a = !0)
                } else
                    r.moveTile(i, h.farthest);
                r.positionsEqual(t, i) || (r.playerTurn = !1,
                s = !0)
            }
        }
        ))
    }
    )),
    {
        moved: s,
        score: n,
        won: a
    }
}
,
Grid.prototype.computerMove = function() {
    this.addRandomTile(),
    this.playerTurn = !0
}
,
Grid.prototype.buildTraversals = function(e) {
    for (var t = {
        x: [],
        y: []
    }, i = 0; i < this.size; i++)
        t.x.push(i),
        t.y.push(i);
    return 1 === e.x && (t.x = t.x.reverse()),
    1 === e.y && (t.y = t.y.reverse()),
    t
}
,
Grid.prototype.findFarthestPosition = function(e, t) {
    var i;
    do {
        e = {
            x: (i = e).x + t.x,
            y: i.y + t.y
        }
    } while (this.withinBounds(e) && this.cellAvailable(e));
    return {
        farthest: i,
        next: e
    }
}
,
Grid.prototype.movesAvailable = function() {
    return this.cellsAvailable() || this.tileMatchesAvailable()
}
,
Grid.prototype.tileMatchesAvailable = function() {
    for (var e, t = 0; t < this.size; t++)
        for (var i = 0; i < this.size; i++)
            if (e = this.cellContent({
                x: t,
                y: i
            }))
                for (var r = 0; r < 4; r++) {
                    var l = this.getVector(r)
                      , o = {
                        x: t + l.x,
                        y: i + l.y
                    }
                      , s = this.cellContent(o);
                    if (s && s.value === e.value)
                        return !0
                }
    return !1
}
,
Grid.prototype.positionsEqual = function(e, t) {
    return e.x === t.x && e.y === t.y
}
,
Grid.prototype.toString = function() {
    string = "";
    for (var e = 0; e < 4; e++) {
        for (var t = 0; t < 4; t++)
            this.cells[t][e] ? string += this.cells[t][e].value + " " : string += "_ ";
        string += "\n"
    }
    return string
}
,
Grid.prototype.islands = function() {
    for (var e = this, t = function(i, r, l) {
        if (i >= 0 && i <= 3 && r >= 0 && r <= 3 && e.cells[i][r] && e.cells[i][r].value == l && !e.cells[i][r].marked)
            for (direction in e.cells[i][r].marked = !0,
            [0, 1, 2, 3]) {
                var o = e.getVector(direction);
                t(i + o.x, r + o.y, l)
            }
    }, i = 0, r = 0; r < 4; r++)
        for (var l = 0; l < 4; l++)
            this.cells[r][l] && (this.cells[r][l].marked = !1);
    for (r = 0; r < 4; r++)
        for (l = 0; l < 4; l++)
            this.cells[r][l] && !this.cells[r][l].marked && (i++,
            t(r, l, this.cells[r][l].value));
    return i
}
,
Grid.prototype.smoothness = function() {
    for (var e = 0, t = 0; t < 4; t++)
        for (var i = 0; i < 4; i++)
            if (this.cellOccupied(this.indexes[t][i]))
                for (var r = Math.log(this.cellContent(this.indexes[t][i]).value) / Math.log(2), l = 1; l <= 2; l++) {
                    var o = this.getVector(l)
                      , s = this.findFarthestPosition(this.indexes[t][i], o).next;
                    if (this.cellOccupied(s)) {
                        var n = this.cellContent(s)
                          , a = Math.log(n.value) / Math.log(2);
                        e -= Math.abs(r - a)
                    }
                }
    return e
}
,
Grid.prototype.monotonicity = function() {
    for (var e = this, t = [], i = [], r = 0, l = {
        x: 0,
        y: 0
    }, o = 0; o < 4; o++) {
        t.push([]),
        i.push([]);
        for (var s = 0; s < 4; s++)
            t[o].push(!1),
            i[o].push(!1),
            this.cells[o][s] && this.cells[o][s].value > r && (r = this.cells[o][s].value,
            l.x = o,
            l.y = s)
    }
    increases = 0,
    cellQueue = [l],
    i[l.x][l.y] = !0,
    markList = [l],
    markAfter = 1;
    for (var n = function(r) {
        var l;
        for (direction in markList.push(r),
        l = e.cellOccupied(r) ? Math.log(e.cellContent(r).value) / Math.log(2) : 0,
        [0, 1, 2, 3]) {
            var o = e.getVector(direction)
              , s = {
                x: r.x + o.x,
                y: r.y + o.y
            };
            e.withinBounds(s) && !t[s.x][s.y] && (e.cellOccupied(s) && (targetValue = Math.log(e.cellContent(s).value) / Math.log(2),
            targetValue > l && (increases += targetValue - l)),
            i[s.x][s.y] || (cellQueue.push(s),
            i[s.x][s.y] = !0))
        }
        if (0 == markAfter) {
            for (; markList.length > 0; ) {
                var n = markList.pop();
                t[n.x][n.y] = !0
            }
            markAfter = cellQueue.length
        }
    }; cellQueue.length > 0; )
        markAfter--,
        n(cellQueue.shift());
    return -increases
}
,
Grid.prototype.monotonicity2 = function() {
    for (var e = [0, 0, 0, 0], t = 0; t < 4; t++)
        for (var i = 1 + (l = 0); i < 4; ) {
            for (; i < 4 && !this.cellOccupied(this.indexes[t][i]); )
                i++;
            i >= 4 && i--,
            (o = this.cellOccupied({
                x: t,
                y: l
            }) ? Math.log(this.cellContent(this.indexes[t][l]).value) / Math.log(2) : 0) > (s = this.cellOccupied({
                x: t,
                y: i
            }) ? Math.log(this.cellContent(this.indexes[t][i]).value) / Math.log(2) : 0) ? e[0] += s - o : s > o && (e[1] += o - s),
            l = i,
            i++
        }
    for (var r = 0; r < 4; r++) {
        var l;
        for (i = 1 + (l = 0); i < 4; ) {
            for (; i < 4 && !this.cellOccupied(this.indexes[i][r]); )
                i++;
            var o, s;
            i >= 4 && i--,
            (o = this.cellOccupied({
                x: l,
                y: r
            }) ? Math.log(this.cellContent(this.indexes[l][r]).value) / Math.log(2) : 0) > (s = this.cellOccupied({
                x: i,
                y: r
            }) ? Math.log(this.cellContent(this.indexes[i][r]).value) / Math.log(2) : 0) ? e[2] += s - o : s > o && (e[3] += o - s),
            l = i,
            i++
        }
    }
    return Math.max(e[0], e[1]) + Math.max(e[2], e[3])
}
,
Grid.prototype.maxValue = function() {
    for (var e = 0, t = 0; t < 4; t++)
        for (var i = 0; i < 4; i++)
            if (this.cellOccupied(this.indexes[t][i])) {
                var r = this.cellContent(this.indexes[t][i]).value;
                r > e && (e = r)
            }
    return Math.log(e) / Math.log(2)
}
,
Grid.prototype.isWin = function() {
    for (var e = 0; e < 4; e++)
        for (var t = 0; t < 4; t++)
            if (this.cellOccupied(this.indexes[e][t]) && 2048 == this.cellContent(this.indexes[e][t]).value)
                return !0;
    return !1
}
;
