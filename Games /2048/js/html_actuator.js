function HTMLActuator() {
    this.tileContainer = document.getElementsByClassName("tile-container")[0],
    this.scoreContainer = document.getElementsByClassName("score-container")[0],
    this.messageContainer = document.getElementsByClassName("game-message")[0],
    this.sharingContainer = document.getElementsByClassName("score-sharing")[0],
    this.score = 0
}
HTMLActuator.prototype.actuate = function(t, e) {
    var o = this;
    window.requestAnimationFrame((function() {
        o.clearContainer(o.tileContainer),
        t.cells.forEach((function(t) {
            t.forEach((function(t) {
                t && o.addTile(t)
            }
            ))
        }
        )),
        o.updateScore(e.score),
        e.over && o.message(!1),
        e.won && o.message(!0)
    }
    ))
}
,
HTMLActuator.prototype.restart = function() {
    ga && ga("send", "event", "game", "restart"),
    this.clearMessage()
}
,
HTMLActuator.prototype.clearContainer = function(t) {
    for (; t.firstChild; )
        t.removeChild(t.firstChild)
}
,
HTMLActuator.prototype.addTile = function(t) {
    var e = this
      , o = document.createElement("div")
      , n = t.previousPosition || {
        x: t.x,
        y: t.y
    };
    positionClass = this.positionClass(n);
    var s = ["tile", "tile-" + t.value, positionClass];
    this.applyClasses(o, s),
    o.textContent = t.value,
    t.previousPosition ? window.requestAnimationFrame((function() {
        s[2] = e.positionClass({
            x: t.x,
            y: t.y
        }),
        e.applyClasses(o, s)
    }
    )) : t.mergedFrom ? (s.push("tile-merged"),
    this.applyClasses(o, s),
    t.mergedFrom.forEach((function(t) {
        e.addTile(t)
    }
    ))) : (s.push("tile-new"),
    this.applyClasses(o, s)),
    this.tileContainer.appendChild(o)
}
,
HTMLActuator.prototype.applyClasses = function(t, e) {
    t.setAttribute("class", e.join(" "))
}
,
HTMLActuator.prototype.normalizePosition = function(t) {
    return {
        x: t.x + 1,
        y: t.y + 1
    }
}
,
HTMLActuator.prototype.positionClass = function(t) {
    return "tile-position-" + (t = this.normalizePosition(t)).x + "-" + t.y
}
,
HTMLActuator.prototype.updateScore = function(t) {
    this.clearContainer(this.scoreContainer);
    var e = t - this.score;
    if (this.score = t,
    this.scoreContainer.textContent = this.score,
    e > 0) {
        var o = document.createElement("div");
        o.classList.add("score-addition"),
        o.textContent = "+" + e,
        this.scoreContainer.appendChild(o)
    }
}
,
HTMLActuator.prototype.message = function(t) {
    var e = t ? "game-won" : "game-over"
      , o = t ? "You win!" : "Game over!";
    this.messageContainer.classList.add(e),
    this.messageContainer.getElementsByTagName("p")[0].textContent = o,
    this.clearContainer(this.sharingContainer),
    this.sharingContainer.appendChild(this.scoreTweetButton()),
    twttr.widgets.load()
}
,
HTMLActuator.prototype.clearMessage = function() {
    this.messageContainer.classList.remove("game-won", "game-over")
}
,
HTMLActuator.prototype.scoreTweetButton = function() {
    var t = document.createElement("a");
    t.classList.add("twitter-share-button"),
    t.setAttribute("href", "https://twitter.com/share"),
    t.setAttribute("data-via", "gabrielecirulli"),
    t.textContent = "Tweet";
    var e = "I scored " + this.score + " points at 2048, a game where you join numbers to score high! #2048game #2048ai";
    return t.setAttribute("data-text", e),
    t
}
,
HTMLActuator.prototype.showHint = function(t) {
    document.getElementById("feedback-container").innerHTML = ["↑", "→", "↓", "←"][t]
}
,
HTMLActuator.prototype.setRunButton = function(t) {
    document.getElementById("run-button").innerHTML = t
}
;
