function KeyboardInputManager() {
    this.events = {},
    this.listen()
}
KeyboardInputManager.prototype.on = function(e, t) {
    this.events[e] || (this.events[e] = []),
    this.events[e].push(t)
}
,
KeyboardInputManager.prototype.emit = function(e, t) {
    var n = this.events[e];
    n && n.forEach((function(e) {
        e(t)
    }
    ))
}
,
KeyboardInputManager.prototype.listen = function() {
    var e = this
      , t = {
        38: 0,
        39: 1,
        40: 2,
        37: 3,
        75: 0,
        76: 1,
        74: 2,
        72: 3
    };
    document.addEventListener("keydown", (function(n) {
        var r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey
          , i = t[n.which];
        r || (void 0 !== i && (n.preventDefault(),
        document.getElementById("feedback-container").innerHTML = " ",
        e.emit("move", i)),
        32 === n.which && e.restart.bind(e)(n))
    }
    )),
    document.getElementsByClassName("retry-button")[0].addEventListener("click", this.restart.bind(this)),
    document.getElementById("hint-button").addEventListener("click", (function(t) {
        t.preventDefault(),
        document.getElementById("feedback-container").innerHTML = "<img src=img/spinner.gif />",
        e.emit("think")
    }
    )),
    document.getElementById("run-button").addEventListener("click", (function(t) {
        t.preventDefault(),
        e.emit("run")
    }
    ));
    var n = [Hammer.DIRECTION_UP, Hammer.DIRECTION_RIGHT, Hammer.DIRECTION_DOWN, Hammer.DIRECTION_LEFT]
      , r = document.getElementsByClassName("game-container")[0];
    Hammer(r, {
        drag_block_horizontal: !0,
        drag_block_vertical: !0
    }).on("swipe", (function(t) {
        t.gesture.preventDefault(),
        mapped = n.indexOf(t.gesture.direction),
        -1 !== mapped && e.emit("move", mapped)
    }
    ))
}
,
KeyboardInputManager.prototype.restart = function(e) {
    e.preventDefault(),
    this.emit("restart")
}
;
