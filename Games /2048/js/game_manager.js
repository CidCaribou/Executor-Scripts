function GameManager(t, i, n) {
    this.size = t,
    this.inputManager = new i,
    this.actuator = new n,
    this.running = !1,
    this.inputManager.on("move", this.move.bind(this)),
    this.inputManager.on("restart", this.restart.bind(this)),
    this.inputManager.on("think", function() {
        var t = this.ai.getBest();
        this.actuator.showHint(t.move)
    }
    .bind(this)),
    this.inputManager.on("run", function() {
        this.running ? (this.running = !1,
        this.actuator.setRunButton("Auto-run")) : (this.running = !0,
        this.run(),
        this.actuator.setRunButton("Stop"))
    }
    .bind(this)),
    this.setup()
}
GameManager.prototype.restart = function() {
    this.actuator.restart(),
    this.running = !1,
    this.actuator.setRunButton("Auto-run"),
    this.setup()
}
,
GameManager.prototype.setup = function() {
    this.grid = new Grid(this.size),
    this.grid.addStartTiles(),
    this.ai = new AI(this.grid),
    this.score = 0,
    this.over = !1,
    this.won = !1,
    this.actuate()
}
,
GameManager.prototype.actuate = function() {
    this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won
    })
}
,
GameManager.prototype.move = function(t) {
    var i = this.grid.move(t);
    this.score += i.score,
    i.won ? this.won = !0 : i.moved && this.grid.computerMove(),
    this.grid.movesAvailable() || (this.over = !0),
    this.actuate()
}
,
GameManager.prototype.run = function() {
    var t = this.ai.getBest();
    this.move(t.move);
    var i = animationDelay;
    if (this.running && !this.over && !this.won) {
        var n = this;
        setTimeout((function() {
            n.run()
        }
        ), i)
    }
}
;
