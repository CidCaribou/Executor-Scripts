if (!window.ThreeDit || !window.ThreeDit.initialized) {
    window.ThreeDit = function (a, b) {
        function G(a) { p = a.clientX + g.scrollLeft; q = a.clientY + g.scrollTop; }
        function F() { var a = g.scrollLeft - t; var b = g.scrollTop - u; p = v = g.scrollLeft + r; q = w = g.scrollTop + s; n += a; o += b; x = v + l.clientLeft - e.pageXOffset; y = w + l.clientTop - e.pageYOffset; t = g.scrollLeft; u = g.scrollTop; }
        function E() { r = e.innerWidth / 2; s = e.innerHeight / 2; p = v = g.scrollLeft + r; q = w = g.scrollTop + s; x = v + l.clientLeft - e.pageXOffset; y = w + l.clientTop - e.pageYOffset; }
        function D() { n += (p - n) * 0.05; o += (q - o) * 0.05; var a = (n - v) / r * 5; var b = -(o - w) / s * 5; for (var e = 0; e < d.length; e++) { var f = d[e].node; var g = f; var h = 0; var k = 0; var l = d[e].z; f.style[i] = x - h + "px " + (y - k) + "px"; f.style[j] = "rotateY(" + a + "deg) rotateX(" + b + "deg)translate3d(0px,0px, " + l * c.zDepth + "px)"; } }
        function C() { var a; for (var b = 0; b < d.length; b++) { d[b].node.style[j] = "none"; } delete d; d = []; A(g, 0); d.push({ node: g, z: 0 }); d.sort(function h(a, b) { return a.z - b.z; }); var c = 0; var e = [c]; d[0].z = c; for (var b = 1; b < d.length; b++) { e.push(c = d[b].z == d[b - 1].z ? c : c + 1); } var f = e[e.length - 1]; for (var b = 0; b < d.length; b++) { d[b].z = e[b] / f; } }
        function B(a) { c.perspective = a; k[h + "Perspective"] = c.perspective + "px"; }
        function A(a, b, e) { if (d.length >= c.maxElems - 1) return; if (!e && a.tagName == "DIV" && a.childNodes.length > 0) { d.push({ node: a, z: b }); } for (var f = 0; f < a.childNodes.length; f++) { A(a.childNodes[f], b + 1, a.childNodes.length < 2); } }
        function z(a) { f = a; g = f.body; h = "webkitTransform" in g.style ? "webkit" : "MozTransform" in g.style ? "Moz" : null; i = h + "TransformOrigin"; j = h + "Transform"; l = f.documentElement; k = l.style; m = e.getComputedStyle; t = g.scrollLeft; u = g.scrollTop; k[h + "Perspective"] = c.perspective + "px"; k.backgroundImage = m(g).getPropertyValue("background-image"); k.backgroundColor = m(g).getPropertyValue("background-color"); C(); if (!c.initialized) { E(); n = p; o = q; e.addEventListener("resize", E); e.addEventListener("scroll", F); f.addEventListener("mousemove", G); setInterval(D, 1000 / 60); } c.initialized = true; }
        var c = { zDepth: 300, maxElems: 100, perspective: 500, initialized: false }; var d = []; var e = a; var f = b; var g; var h; var i; var j; var k; var l; var m; var n; var o; var p; var q; var r; var s; var t; var u; var v; var w; var x; var y; c.init = z; c.recollectElems = C; c.render = D; c.changePerspective = B; return c;
    }(window, document);
    ThreeDit.init(document);
    alert("3D page is ON\n\nRefresh To Remove\n\nNOTE WILL REMOVE ALL SCRIPTS!");
}
