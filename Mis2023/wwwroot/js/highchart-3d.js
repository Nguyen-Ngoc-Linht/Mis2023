﻿/*
 Highcharts JS v8.0.4 (2020-03-10)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
(function (q) { "object" === typeof module && module.exports ? (q["default"] = q, module.exports = q) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (B) { q(B); q.Highcharts = B; return q }) : q("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (q) {
    function B(b, k, v, q) { b.hasOwnProperty(k) || (b[k] = q.apply(null, v)) } q = q ? q._modules : {}; B(q, "parts-3d/Math.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
        var v = k.pick, q = b.deg2rad; b.perspective3D = function (b,
            k, w) { k = 0 < w && w < Number.POSITIVE_INFINITY ? w / (b.z + k.z + w) : 1; return { x: b.x * k, y: b.y * k } }; b.perspective = function (k, z, w, x) {
                var t = z.options.chart.options3d, h = v(x, w ? z.inverted : !1), u = { x: z.plotWidth / 2, y: z.plotHeight / 2, z: t.depth / 2, vd: v(t.depth, 1) * v(t.viewDistance, 0) }, r = z.scale3d || 1; x = q * t.beta * (h ? -1 : 1); t = q * t.alpha * (h ? -1 : 1); var a = Math.cos(t), f = Math.cos(-x), p = Math.sin(t), l = Math.sin(-x); w || (u.x += z.plotLeft, u.y += z.plotTop); return k.map(function (d) {
                    var c = (h ? d.y : d.x) - u.x; var m = (h ? d.x : d.y) - u.y; d = (d.z || 0) - u.z; c = {
                        x: f * c - l *
                            d, y: -p * l * c + a * m - f * p * d, z: a * l * c + p * m + a * f * d
                    }; m = b.perspective3D(c, u, u.vd); m.x = m.x * r + u.x; m.y = m.y * r + u.y; m.z = c.z * r + u.z; return { x: h ? m.y : m.x, y: h ? m.x : m.y, z: m.z }
                })
            }; b.pointCameraDistance = function (b, k) { var w = k.options.chart.options3d, x = k.plotWidth / 2; k = k.plotHeight / 2; w = v(w.depth, 1) * v(w.viewDistance, 0) + w.depth; return Math.sqrt(Math.pow(x - v(b.plotX, b.x), 2) + Math.pow(k - v(b.plotY, b.y), 2) + Math.pow(w - v(b.plotZ, b.z), 2)) }; b.shapeArea = function (b) {
                var k = 0, w; for (w = 0; w < b.length; w++) {
                    var x = (w + 1) % b.length; k += b[w].x * b[x].y - b[x].x *
                        b[w].y
                } return k / 2
            }; b.shapeArea3d = function (k, v, w) { return b.shapeArea(b.perspective(k, v, w)) }
    }); B(q, "parts-3d/SVGRenderer.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
        function v(a, d, e, D, g, f, m, r) {
            var n = [], E = f - g; return f > g && f - g > Math.PI / 2 + .0001 ? (n = n.concat(v(a, d, e, D, g, g + Math.PI / 2, m, r)), n = n.concat(v(a, d, e, D, g + Math.PI / 2, f, m, r))) : f < g && g - f > Math.PI / 2 + .0001 ? (n = n.concat(v(a, d, e, D, g, g - Math.PI / 2, m, r)), n = n.concat(v(a, d, e, D, g - Math.PI / 2, f, m, r))) : ["C", a + e * Math.cos(g) - e * c * E * Math.sin(g) + m, d + D * Math.sin(g) +
                D * c * E * Math.cos(g) + r, a + e * Math.cos(f) + e * c * E * Math.sin(f) + m, d + D * Math.sin(f) - D * c * E * Math.cos(f) + r, a + e * Math.cos(f) + m, d + D * Math.sin(f) + r]
        } var q = k.animObject, t = k.defined, z = k.extend, w = k.merge, x = k.objectEach, A = k.pick, h = Math.cos, u = Math.PI, r = Math.sin, a = b.charts, f = b.color, p = b.deg2rad, l = b.perspective, d = b.SVGElement; k = b.SVGRenderer; var c = 4 * (Math.sqrt(2) - 1) / 3 / (u / 2); k.prototype.toLinePath = function (a, d) { var e = []; a.forEach(function (a) { e.push("L", a.x, a.y) }); a.length && (e[0] = "M", d && e.push("Z")); return e }; k.prototype.toLineSegments =
            function (a) { var d = [], e = !0; a.forEach(function (a) { d.push(e ? "M" : "L", a.x, a.y); e = !e }); return d }; k.prototype.face3d = function (c) {
                var n = this, e = this.createElement("path"); e.vertexes = []; e.insidePlotArea = !1; e.enabled = !0; e.attr = function (e) {
                    if ("object" === typeof e && (t(e.enabled) || t(e.vertexes) || t(e.insidePlotArea))) {
                    this.enabled = A(e.enabled, this.enabled); this.vertexes = A(e.vertexes, this.vertexes); this.insidePlotArea = A(e.insidePlotArea, this.insidePlotArea); delete e.enabled; delete e.vertexes; delete e.insidePlotArea;
                        var c = l(this.vertexes, a[n.chartIndex], this.insidePlotArea), g = n.toLinePath(c, !0); c = b.shapeArea(c); c = this.enabled && 0 < c ? "visible" : "hidden"; e.d = g; e.visibility = c
                    } return d.prototype.attr.apply(this, arguments)
                }; e.animate = function (e) {
                    if ("object" === typeof e && (t(e.enabled) || t(e.vertexes) || t(e.insidePlotArea))) {
                    this.enabled = A(e.enabled, this.enabled); this.vertexes = A(e.vertexes, this.vertexes); this.insidePlotArea = A(e.insidePlotArea, this.insidePlotArea); delete e.enabled; delete e.vertexes; delete e.insidePlotArea;
                        var c = l(this.vertexes, a[n.chartIndex], this.insidePlotArea), g = n.toLinePath(c, !0); c = b.shapeArea(c); c = this.enabled && 0 < c ? "visible" : "hidden"; e.d = g; this.attr("visibility", c)
                    } return d.prototype.animate.apply(this, arguments)
                }; return e.attr(c)
            }; k.prototype.polyhedron = function (a) {
                var c = this, e = this.g(), n = e.destroy; this.styledMode || e.attr({ "stroke-linejoin": "round" }); e.faces = []; e.destroy = function () { for (var a = 0; a < e.faces.length; a++)e.faces[a].destroy(); return n.call(this) }; e.attr = function (a, n, g, f) {
                    if ("object" ===
                        typeof a && t(a.faces)) { for (; e.faces.length > a.faces.length;)e.faces.pop().destroy(); for (; e.faces.length < a.faces.length;)e.faces.push(c.face3d().add(e)); for (var m = 0; m < a.faces.length; m++)c.styledMode && delete a.faces[m].fill, e.faces[m].attr(a.faces[m], null, g, f); delete a.faces } return d.prototype.attr.apply(this, arguments)
                }; e.animate = function (a, n, g) {
                    if (a && a.faces) {
                        for (; e.faces.length > a.faces.length;)e.faces.pop().destroy(); for (; e.faces.length < a.faces.length;)e.faces.push(c.face3d().add(e)); for (var f = 0; f <
                            a.faces.length; f++)e.faces[f].animate(a.faces[f], n, g); delete a.faces
                    } return d.prototype.animate.apply(this, arguments)
                }; return e.attr(a)
            }; var m = {
                initArgs: function (a) { var d = this, e = d.renderer, c = e[d.pathType + "Path"](a), n = c.zIndexes; d.parts.forEach(function (a) { d[a] = e.path(c[a]).attr({ "class": "highcharts-3d-" + a, zIndex: n[a] || 0 }).add(d) }); d.attr({ "stroke-linejoin": "round", zIndex: n.group }); d.originalDestroy = d.destroy; d.destroy = d.destroyParts }, singleSetterForParts: function (a, d, e, c, g, f) {
                    var n = {}; c = [null, null,
                        c || "attr", g, f]; var m = e && e.zIndexes; e ? (m && m.group && this.attr({ zIndex: m.group }), x(e, function (d, c) { n[c] = {}; n[c][a] = d; m && (n[c].zIndex = e.zIndexes[c] || 0) }), c[1] = n) : (n[a] = d, c[0] = n); return this.processParts.apply(this, c)
                }, processParts: function (a, d, e, c, g) { var n = this; n.parts.forEach(function (f) { d && (a = A(d[f], !1)); if (!1 !== a) n[f][e](a, c, g) }); return n }, destroyParts: function () { this.processParts(null, null, "destroy"); return this.originalDestroy() }
            }; var g = w(m, {
                parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a,
                    c, e, g) { if ("string" === typeof a && "undefined" !== typeof c) { var n = a; a = {}; a[n] = c } return a.shapeArgs || t(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : d.prototype.attr.call(this, a, void 0, e, g) }, animate: function (a, c, e) { t(a.x) && t(a.y) ? (a = this.renderer[this.pathType + "Path"](a), this.singleSetterForParts("d", null, a, "animate", c, e), this.attr({ zIndex: a.zIndexes.group })) : d.prototype.animate.call(this, a, c, e); return this }, fillSetter: function (a) {
                        this.singleSetterForParts("fill",
                            null, { front: a, top: f(a).brighten(.1).get(), side: f(a).brighten(-.1).get() }); this.color = this.fill = a; return this
                    }
            }); k.prototype.elements3d = { base: m, cuboid: g }; k.prototype.element3d = function (a, c) { var e = this.g(); z(e, this.elements3d[a]); e.initArgs(c); return e }; k.prototype.cuboid = function (a) { return this.element3d("cuboid", a) }; b.SVGRenderer.prototype.cuboidPath = function (c) {
                function d(a) { return 0 === m && 1 < a && 6 > a ? { x: w[a].x, y: w[a].y + 10, z: w[a].z } : w[a] } function e(a) { return w[a] } var g = c.x, f = c.y, n = c.z, m = c.height, r = c.width,
                    u = c.depth, p = a[this.chartIndex], k = p.options.chart.options3d.alpha, h = 0, w = [{ x: g, y: f, z: n }, { x: g + r, y: f, z: n }, { x: g + r, y: f + m, z: n }, { x: g, y: f + m, z: n }, { x: g, y: f + m, z: n + u }, { x: g + r, y: f + m, z: n + u }, { x: g + r, y: f, z: n + u }, { x: g, y: f, z: n + u }]; w = l(w, p, c.insidePlotArea); var x = function (a, c) { var g = [[], -1], f = a.map(e), n = c.map(e); a = a.map(d); c = c.map(d); 0 > b.shapeArea(a) ? g = [f, 0] : 0 > b.shapeArea(c) && (g = [n, 1]); return g }; var v = x([3, 2, 1, 0], [7, 6, 5, 4]); c = v[0]; u = v[1]; v = x([1, 6, 7, 0], [4, 5, 2, 3]); r = v[0]; var t = v[1]; v = x([1, 2, 5, 6], [0, 7, 4, 3]); x = v[0]; v = v[1];
                1 === v ? h += 1E6 * (p.plotWidth - g) : v || (h += 1E6 * g); h += 10 * (!t || 0 <= k && 180 >= k || 360 > k && 357.5 < k ? p.plotHeight - f : 10 + f); 1 === u ? h += 100 * n : u || (h += 100 * (1E3 - n)); return { front: this.toLinePath(c, !0), top: this.toLinePath(r, !0), side: this.toLinePath(x, !0), zIndexes: { group: Math.round(h) }, isFront: u, isTop: t }
            }; b.SVGRenderer.prototype.arc3d = function (a) {
                function c(a) { var c = !1, e = {}, d; a = w(a); for (d in a) -1 !== n.indexOf(d) && (e[d] = a[d], delete a[d], c = !0); return c ? e : !1 } var e = this.g(), g = e.renderer, n = "x y r innerR start end depth".split(" ");
                a = w(a); a.alpha = (a.alpha || 0) * p; a.beta = (a.beta || 0) * p; e.top = g.path(); e.side1 = g.path(); e.side2 = g.path(); e.inn = g.path(); e.out = g.path(); e.onAdd = function () { var a = e.parentGroup, c = e.attr("class"); e.top.add(e);["out", "inn", "side1", "side2"].forEach(function (d) { e[d].attr({ "class": c + " highcharts-3d-side" }).add(a) }) };["addClass", "removeClass"].forEach(function (a) { e[a] = function () { var c = arguments;["top", "out", "inn", "side1", "side2"].forEach(function (d) { e[d][a].apply(e[d], c) }) } }); e.setPaths = function (a) {
                    var c = e.renderer.arc3dPath(a),
                    d = 100 * c.zTop; e.attribs = a; e.top.attr({ d: c.top, zIndex: c.zTop }); e.inn.attr({ d: c.inn, zIndex: c.zInn }); e.out.attr({ d: c.out, zIndex: c.zOut }); e.side1.attr({ d: c.side1, zIndex: c.zSide1 }); e.side2.attr({ d: c.side2, zIndex: c.zSide2 }); e.zIndex = d; e.attr({ zIndex: d }); a.center && (e.top.setRadialReference(a.center), delete a.center)
                }; e.setPaths(a); e.fillSetter = function (a) {
                    var c = f(a).brighten(-.1).get(); this.fill = a; this.side1.attr({ fill: c }); this.side2.attr({ fill: c }); this.inn.attr({ fill: c }); this.out.attr({ fill: c }); this.top.attr({ fill: a });
                    return this
                };["opacity", "translateX", "translateY", "visibility"].forEach(function (a) { e[a + "Setter"] = function (a, c) { e[c] = a;["out", "inn", "side1", "side2", "top"].forEach(function (d) { e[d].attr(c, a) }) } }); e.attr = function (a) { var g; "object" === typeof a && (g = c(a)) && (z(e.attribs, g), e.setPaths(e.attribs)); return d.prototype.attr.apply(e, arguments) }; e.animate = function (a, g, f) {
                    var n = this.attribs, m = "data-" + Math.random().toString(26).substring(2, 9); delete a.center; delete a.z; delete a.alpha; delete a.beta; var r = q(A(g, this.renderer.globalAnimation));
                    if (r.duration) { var l = c(a); e[m] = 0; a[m] = 1; e[m + "Setter"] = b.noop; l && (r.step = function (a, c) { function e(a) { return n[a] + (A(l[a], n[a]) - n[a]) * c.pos } c.prop === m && c.elem.setPaths(w(n, { x: e("x"), y: e("y"), r: e("r"), innerR: e("innerR"), start: e("start"), end: e("end"), depth: e("depth") })) }); g = r } return d.prototype.animate.call(this, a, g, f)
                }; e.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); return d.prototype.destroy.call(this) }; e.hide = function () {
                    this.top.hide();
                    this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide()
                }; e.show = function (a) { this.top.show(a); this.out.show(a); this.inn.show(a); this.side1.show(a); this.side2.show(a) }; return e
            }; k.prototype.arc3dPath = function (a) {
                function c(a) { a %= 2 * Math.PI; a > Math.PI && (a = 2 * Math.PI - a); return a } var e = a.x, d = a.y, g = a.start, f = a.end - .00001, m = a.r, n = a.innerR || 0, l = a.depth || 0, b = a.alpha, p = a.beta, k = Math.cos(g), w = Math.sin(g); a = Math.cos(f); var x = Math.sin(f), t = m * Math.cos(p); m *= Math.cos(b); var A = n * Math.cos(p), q = n * Math.cos(b);
                n = l * Math.sin(p); var y = l * Math.sin(b); l = ["M", e + t * k, d + m * w]; l = l.concat(v(e, d, t, m, g, f, 0, 0)); l = l.concat(["L", e + A * a, d + q * x]); l = l.concat(v(e, d, A, q, f, g, 0, 0)); l = l.concat(["Z"]); var z = 0 < p ? Math.PI / 2 : 0; p = 0 < b ? 0 : Math.PI / 2; z = g > -z ? g : f > -z ? -z : g; var B = f < u - p ? f : g < u - p ? u - p : f, C = 2 * u - p; b = ["M", e + t * h(z), d + m * r(z)]; b = b.concat(v(e, d, t, m, z, B, 0, 0)); f > C && g < C ? (b = b.concat(["L", e + t * h(B) + n, d + m * r(B) + y]), b = b.concat(v(e, d, t, m, B, C, n, y)), b = b.concat(["L", e + t * h(C), d + m * r(C)]), b = b.concat(v(e, d, t, m, C, f, 0, 0)), b = b.concat(["L", e + t * h(f) + n, d + m * r(f) + y]),
                    b = b.concat(v(e, d, t, m, f, C, n, y)), b = b.concat(["L", e + t * h(C), d + m * r(C)]), b = b.concat(v(e, d, t, m, C, B, 0, 0))) : f > u - p && g < u - p && (b = b.concat(["L", e + t * Math.cos(B) + n, d + m * Math.sin(B) + y]), b = b.concat(v(e, d, t, m, B, f, n, y)), b = b.concat(["L", e + t * Math.cos(f), d + m * Math.sin(f)]), b = b.concat(v(e, d, t, m, f, B, 0, 0))); b = b.concat(["L", e + t * Math.cos(B) + n, d + m * Math.sin(B) + y]); b = b.concat(v(e, d, t, m, B, z, n, y)); b = b.concat(["Z"]); p = ["M", e + A * k, d + q * w]; p = p.concat(v(e, d, A, q, g, f, 0, 0)); p = p.concat(["L", e + A * Math.cos(f) + n, d + q * Math.sin(f) + y]); p = p.concat(v(e,
                        d, A, q, f, g, n, y)); p = p.concat(["Z"]); k = ["M", e + t * k, d + m * w, "L", e + t * k + n, d + m * w + y, "L", e + A * k + n, d + q * w + y, "L", e + A * k, d + q * w, "Z"]; e = ["M", e + t * a, d + m * x, "L", e + t * a + n, d + m * x + y, "L", e + A * a + n, d + q * x + y, "L", e + A * a, d + q * x, "Z"]; x = Math.atan2(y, -n); d = Math.abs(f + x); a = Math.abs(g + x); g = Math.abs((g + f) / 2 + x); d = c(d); a = c(a); g = c(g); g *= 1E5; f = 1E5 * a; d *= 1E5; return { top: l, zTop: 1E5 * Math.PI + 1, out: b, zOut: Math.max(g, f, d), inn: p, zInn: Math.max(g, f, d), side1: k, zSide1: .99 * d, side2: e, zSide2: .99 * f }
            }
    }); B(q, "parts-3d/Chart.js", [q["parts/Globals.js"], q["parts/Utilities.js"]],
        function (b, k) {
            function v(b, r) {
                var a = b.plotLeft, f = b.plotWidth + a, p = b.plotTop, l = b.plotHeight + p, d = a + b.plotWidth / 2, c = p + b.plotHeight / 2, m = Number.MAX_VALUE, g = -Number.MAX_VALUE, n = Number.MAX_VALUE, u = -Number.MAX_VALUE, e = 1; var k = [{ x: a, y: p, z: 0 }, { x: a, y: p, z: r }];[0, 1].forEach(function (a) { k.push({ x: f, y: k[a].y, z: k[a].z }) });[0, 1, 2, 3].forEach(function (a) { k.push({ x: k[a].x, y: l, z: k[a].z }) }); k = A(k, b, !1); k.forEach(function (a) { m = Math.min(m, a.x); g = Math.max(g, a.x); n = Math.min(n, a.y); u = Math.max(u, a.y) }); a > m && (e = Math.min(e, 1 - Math.abs((a +
                    d) / (m + d)) % 1)); f < g && (e = Math.min(e, (f - d) / (g - d))); p > n && (e = 0 > n ? Math.min(e, (p + c) / (-n + p + c)) : Math.min(e, 1 - (p + c) / (n + c) % 1)); l < u && (e = Math.min(e, Math.abs((l - c) / (u - c)))); return e
            } var q = k.addEvent, t = k.isArray, z = k.merge, w = k.pick; k = k.wrap; var x = b.Chart, A = b.perspective; x.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; x.prototype.propsRequireDirtyBox.push("chart.options3d"); x.prototype.propsRequireUpdateSeries.push("chart.options3d"); q(x, "afterInit", function () {
                var b =
                    this.options; this.is3d() && (b.series || []).forEach(function (r) { "scatter" === (r.type || b.chart.type || b.chart.defaultSeriesType) && (r.type = "scatter3d") })
            }); q(x, "addSeries", function (b) { this.is3d() && "scatter" === b.options.type && (b.options.type = "scatter3d") }); k(b.Chart.prototype, "isInsidePlot", function (b) { return this.is3d() || b.apply(this, [].slice.call(arguments, 1)) }); var h = b.getOptions(); z(!0, h, {
                chart: {
                    options3d: {
                        enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, axisLabelPosition: null, frame: {
                            visible: "default",
                            size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {}
                        }
                    }
                }
            }); q(x, "afterGetContainer", function () {
            this.styledMode && (this.renderer.definition({ tagName: "style", textContent: ".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n" }), [{ name: "darker", slope: .6 }, { name: "brighter", slope: 1.4 }].forEach(function (b) {
                this.renderer.definition({
                    tagName: "filter", id: "highcharts-" + b.name, children: [{
                        tagName: "feComponentTransfer", children: [{
                            tagName: "feFuncR", type: "linear",
                            slope: b.slope
                        }, { tagName: "feFuncG", type: "linear", slope: b.slope }, { tagName: "feFuncB", type: "linear", slope: b.slope }]
                    }]
                })
            }, this))
            }); k(x.prototype, "setClassName", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.is3d() && (this.container.className += " highcharts-3d-chart") }); q(b.Chart, "afterSetChartSize", function () {
                var b = this.options.chart.options3d; if (this.is3d()) {
                    b && (b.alpha = b.alpha % 360 + (0 <= b.alpha ? 0 : 360), b.beta = b.beta % 360 + (0 <= b.beta ? 0 : 360)); var r = this.inverted, a = this.clipBox, f = this.margin; a[r ? "y" :
                        "x"] = -(f[3] || 0); a[r ? "x" : "y"] = -(f[0] || 0); a[r ? "height" : "width"] = this.chartWidth + (f[3] || 0) + (f[1] || 0); a[r ? "width" : "height"] = this.chartHeight + (f[0] || 0) + (f[2] || 0); this.scale3d = 1; !0 === b.fitToPlot && (this.scale3d = v(this, b.depth)); this.frame3d = this.get3dFrame()
                }
            }); q(x, "beforeRedraw", function () { this.is3d() && (this.isDirtyBox = !0) }); q(x, "beforeRender", function () { this.is3d() && (this.frame3d = this.get3dFrame()) }); k(x.prototype, "renderSeries", function (b) {
                var r = this.series.length; if (this.is3d()) for (; r--;)b = this.series[r],
                    b.translate(), b.render(); else b.call(this)
            }); q(x, "afterDrawChartBox", function () {
                if (this.is3d()) {
                    var k = this.renderer, r = this.options.chart.options3d, a = this.get3dFrame(), f = this.plotLeft, p = this.plotLeft + this.plotWidth, l = this.plotTop, d = this.plotTop + this.plotHeight; r = r.depth; var c = f - (a.left.visible ? a.left.size : 0), m = p + (a.right.visible ? a.right.size : 0), g = l - (a.top.visible ? a.top.size : 0), n = d + (a.bottom.visible ? a.bottom.size : 0), h = 0 - (a.front.visible ? a.front.size : 0), e = r + (a.back.visible ? a.back.size : 0), w = this.hasRendered ?
                        "animate" : "attr"; this.frame3d = a; this.frameShapes || (this.frameShapes = { bottom: k.polyhedron().add(), top: k.polyhedron().add(), left: k.polyhedron().add(), right: k.polyhedron().add(), back: k.polyhedron().add(), front: k.polyhedron().add() }); this.frameShapes.bottom[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: a.bottom.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.bottom.color).brighten(.1).get(), vertexes: [{ x: c, y: n, z: h }, { x: m, y: n, z: h }, { x: m, y: n, z: e }, { x: c, y: n, z: e }], enabled: a.bottom.visible },
                            { fill: b.color(a.bottom.color).brighten(.1).get(), vertexes: [{ x: f, y: d, z: r }, { x: p, y: d, z: r }, { x: p, y: d, z: 0 }, { x: f, y: d, z: 0 }], enabled: a.bottom.visible }, { fill: b.color(a.bottom.color).brighten(-.1).get(), vertexes: [{ x: c, y: n, z: h }, { x: c, y: n, z: e }, { x: f, y: d, z: r }, { x: f, y: d, z: 0 }], enabled: a.bottom.visible && !a.left.visible }, { fill: b.color(a.bottom.color).brighten(-.1).get(), vertexes: [{ x: m, y: n, z: e }, { x: m, y: n, z: h }, { x: p, y: d, z: 0 }, { x: p, y: d, z: r }], enabled: a.bottom.visible && !a.right.visible }, {
                                fill: b.color(a.bottom.color).get(), vertexes: [{
                                    x: m,
                                    y: n, z: h
                                }, { x: c, y: n, z: h }, { x: f, y: d, z: 0 }, { x: p, y: d, z: 0 }], enabled: a.bottom.visible && !a.front.visible
                            }, { fill: b.color(a.bottom.color).get(), vertexes: [{ x: c, y: n, z: e }, { x: m, y: n, z: e }, { x: p, y: d, z: r }, { x: f, y: d, z: r }], enabled: a.bottom.visible && !a.back.visible }]
                        }); this.frameShapes.top[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-top", zIndex: a.top.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.top.color).brighten(.1).get(), vertexes: [{ x: c, y: g, z: e }, { x: m, y: g, z: e }, { x: m, y: g, z: h }, { x: c, y: g, z: h }], enabled: a.top.visible },
                            { fill: b.color(a.top.color).brighten(.1).get(), vertexes: [{ x: f, y: l, z: 0 }, { x: p, y: l, z: 0 }, { x: p, y: l, z: r }, { x: f, y: l, z: r }], enabled: a.top.visible }, { fill: b.color(a.top.color).brighten(-.1).get(), vertexes: [{ x: c, y: g, z: e }, { x: c, y: g, z: h }, { x: f, y: l, z: 0 }, { x: f, y: l, z: r }], enabled: a.top.visible && !a.left.visible }, { fill: b.color(a.top.color).brighten(-.1).get(), vertexes: [{ x: m, y: g, z: h }, { x: m, y: g, z: e }, { x: p, y: l, z: r }, { x: p, y: l, z: 0 }], enabled: a.top.visible && !a.right.visible }, {
                                fill: b.color(a.top.color).get(), vertexes: [{ x: c, y: g, z: h },
                                { x: m, y: g, z: h }, { x: p, y: l, z: 0 }, { x: f, y: l, z: 0 }], enabled: a.top.visible && !a.front.visible
                            }, { fill: b.color(a.top.color).get(), vertexes: [{ x: m, y: g, z: e }, { x: c, y: g, z: e }, { x: f, y: l, z: r }, { x: p, y: l, z: r }], enabled: a.top.visible && !a.back.visible }]
                        }); this.frameShapes.left[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-left", zIndex: a.left.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.left.color).brighten(.1).get(), vertexes: [{ x: c, y: n, z: h }, { x: f, y: d, z: 0 }, { x: f, y: d, z: r }, { x: c, y: n, z: e }], enabled: a.left.visible && !a.bottom.visible },
                            { fill: b.color(a.left.color).brighten(.1).get(), vertexes: [{ x: c, y: g, z: e }, { x: f, y: l, z: r }, { x: f, y: l, z: 0 }, { x: c, y: g, z: h }], enabled: a.left.visible && !a.top.visible }, { fill: b.color(a.left.color).brighten(-.1).get(), vertexes: [{ x: c, y: n, z: e }, { x: c, y: g, z: e }, { x: c, y: g, z: h }, { x: c, y: n, z: h }], enabled: a.left.visible }, { fill: b.color(a.left.color).brighten(-.1).get(), vertexes: [{ x: f, y: l, z: r }, { x: f, y: d, z: r }, { x: f, y: d, z: 0 }, { x: f, y: l, z: 0 }], enabled: a.left.visible }, {
                                fill: b.color(a.left.color).get(), vertexes: [{ x: c, y: n, z: h }, { x: c, y: g, z: h },
                                { x: f, y: l, z: 0 }, { x: f, y: d, z: 0 }], enabled: a.left.visible && !a.front.visible
                            }, { fill: b.color(a.left.color).get(), vertexes: [{ x: c, y: g, z: e }, { x: c, y: n, z: e }, { x: f, y: d, z: r }, { x: f, y: l, z: r }], enabled: a.left.visible && !a.back.visible }]
                        }); this.frameShapes.right[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-right", zIndex: a.right.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.right.color).brighten(.1).get(), vertexes: [{ x: m, y: n, z: e }, { x: p, y: d, z: r }, { x: p, y: d, z: 0 }, { x: m, y: n, z: h }], enabled: a.right.visible && !a.bottom.visible },
                            { fill: b.color(a.right.color).brighten(.1).get(), vertexes: [{ x: m, y: g, z: h }, { x: p, y: l, z: 0 }, { x: p, y: l, z: r }, { x: m, y: g, z: e }], enabled: a.right.visible && !a.top.visible }, { fill: b.color(a.right.color).brighten(-.1).get(), vertexes: [{ x: p, y: l, z: 0 }, { x: p, y: d, z: 0 }, { x: p, y: d, z: r }, { x: p, y: l, z: r }], enabled: a.right.visible }, { fill: b.color(a.right.color).brighten(-.1).get(), vertexes: [{ x: m, y: n, z: h }, { x: m, y: g, z: h }, { x: m, y: g, z: e }, { x: m, y: n, z: e }], enabled: a.right.visible }, {
                                fill: b.color(a.right.color).get(), vertexes: [{ x: m, y: g, z: h }, {
                                    x: m,
                                    y: n, z: h
                                }, { x: p, y: d, z: 0 }, { x: p, y: l, z: 0 }], enabled: a.right.visible && !a.front.visible
                            }, { fill: b.color(a.right.color).get(), vertexes: [{ x: m, y: n, z: e }, { x: m, y: g, z: e }, { x: p, y: l, z: r }, { x: p, y: d, z: r }], enabled: a.right.visible && !a.back.visible }]
                        }); this.frameShapes.back[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: a.back.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.back.color).brighten(.1).get(), vertexes: [{ x: m, y: n, z: e }, { x: c, y: n, z: e }, { x: f, y: d, z: r }, { x: p, y: d, z: r }], enabled: a.back.visible && !a.bottom.visible },
                            { fill: b.color(a.back.color).brighten(.1).get(), vertexes: [{ x: c, y: g, z: e }, { x: m, y: g, z: e }, { x: p, y: l, z: r }, { x: f, y: l, z: r }], enabled: a.back.visible && !a.top.visible }, { fill: b.color(a.back.color).brighten(-.1).get(), vertexes: [{ x: c, y: n, z: e }, { x: c, y: g, z: e }, { x: f, y: l, z: r }, { x: f, y: d, z: r }], enabled: a.back.visible && !a.left.visible }, { fill: b.color(a.back.color).brighten(-.1).get(), vertexes: [{ x: m, y: g, z: e }, { x: m, y: n, z: e }, { x: p, y: d, z: r }, { x: p, y: l, z: r }], enabled: a.back.visible && !a.right.visible }, {
                                fill: b.color(a.back.color).get(),
                                vertexes: [{ x: f, y: l, z: r }, { x: p, y: l, z: r }, { x: p, y: d, z: r }, { x: f, y: d, z: r }], enabled: a.back.visible
                            }, { fill: b.color(a.back.color).get(), vertexes: [{ x: c, y: n, z: e }, { x: m, y: n, z: e }, { x: m, y: g, z: e }, { x: c, y: g, z: e }], enabled: a.back.visible }]
                        }); this.frameShapes.front[w]({
                            "class": "highcharts-3d-frame highcharts-3d-frame-front", zIndex: a.front.frontFacing ? -1E3 : 1E3, faces: [{ fill: b.color(a.front.color).brighten(.1).get(), vertexes: [{ x: c, y: n, z: h }, { x: m, y: n, z: h }, { x: p, y: d, z: 0 }, { x: f, y: d, z: 0 }], enabled: a.front.visible && !a.bottom.visible },
                            { fill: b.color(a.front.color).brighten(.1).get(), vertexes: [{ x: m, y: g, z: h }, { x: c, y: g, z: h }, { x: f, y: l, z: 0 }, { x: p, y: l, z: 0 }], enabled: a.front.visible && !a.top.visible }, { fill: b.color(a.front.color).brighten(-.1).get(), vertexes: [{ x: c, y: g, z: h }, { x: c, y: n, z: h }, { x: f, y: d, z: 0 }, { x: f, y: l, z: 0 }], enabled: a.front.visible && !a.left.visible }, { fill: b.color(a.front.color).brighten(-.1).get(), vertexes: [{ x: m, y: n, z: h }, { x: m, y: g, z: h }, { x: p, y: l, z: 0 }, { x: p, y: d, z: 0 }], enabled: a.front.visible && !a.right.visible }, {
                                fill: b.color(a.front.color).get(),
                                vertexes: [{ x: p, y: l, z: 0 }, { x: f, y: l, z: 0 }, { x: f, y: d, z: 0 }, { x: p, y: d, z: 0 }], enabled: a.front.visible
                            }, { fill: b.color(a.front.color).get(), vertexes: [{ x: m, y: n, z: h }, { x: c, y: n, z: h }, { x: c, y: g, z: h }, { x: m, y: g, z: h }], enabled: a.front.visible }]
                        })
                }
            }); x.prototype.retrieveStacks = function (b) { var r = this.series, a = {}, f, p = 1; this.series.forEach(function (l) { f = w(l.options.stack, b ? 0 : r.length - 1 - l.index); a[f] ? a[f].series.push(l) : (a[f] = { series: [l], position: p }, p++) }); a.totalStacks = p + 1; return a }; x.prototype.get3dFrame = function () {
                var h = this,
                r = h.options.chart.options3d, a = r.frame, f = h.plotLeft, p = h.plotLeft + h.plotWidth, l = h.plotTop, d = h.plotTop + h.plotHeight, c = r.depth, m = function (a) { a = b.shapeArea3d(a, h); return .5 < a ? 1 : -.5 > a ? -1 : 0 }, g = m([{ x: f, y: d, z: c }, { x: p, y: d, z: c }, { x: p, y: d, z: 0 }, { x: f, y: d, z: 0 }]), n = m([{ x: f, y: l, z: 0 }, { x: p, y: l, z: 0 }, { x: p, y: l, z: c }, { x: f, y: l, z: c }]), k = m([{ x: f, y: l, z: 0 }, { x: f, y: l, z: c }, { x: f, y: d, z: c }, { x: f, y: d, z: 0 }]), e = m([{ x: p, y: l, z: c }, { x: p, y: l, z: 0 }, { x: p, y: d, z: 0 }, { x: p, y: d, z: c }]), t = m([{ x: f, y: d, z: 0 }, { x: p, y: d, z: 0 }, { x: p, y: l, z: 0 }, { x: f, y: l, z: 0 }]); m = m([{
                    x: f,
                    y: l, z: c
                }, { x: p, y: l, z: c }, { x: p, y: d, z: c }, { x: f, y: d, z: c }]); var x = !1, v = !1, q = !1, z = !1;[].concat(h.xAxis, h.yAxis, h.zAxis).forEach(function (a) { a && (a.horiz ? a.opposite ? v = !0 : x = !0 : a.opposite ? z = !0 : q = !0) }); var y = function (a, d, c) {
                    for (var e = ["size", "color", "visible"], g = {}, f = 0; f < e.length; f++)for (var b = e[f], m = 0; m < a.length; m++)if ("object" === typeof a[m]) { var n = a[m][b]; if ("undefined" !== typeof n && null !== n) { g[b] = n; break } } a = c; !0 === g.visible || !1 === g.visible ? a = g.visible : "auto" === g.visible && (a = 0 < d); return {
                        size: w(g.size, 1), color: w(g.color,
                            "none"), frontFacing: 0 < d, visible: a
                    }
                }; a = { axes: {}, bottom: y([a.bottom, a.top, a], g, x), top: y([a.top, a.bottom, a], n, v), left: y([a.left, a.right, a.side, a], k, q), right: y([a.right, a.left, a.side, a], e, z), back: y([a.back, a.front, a], m, !0), front: y([a.front, a.back, a], t, !1) }; "auto" === r.axisLabelPosition ? (e = function (a, d) { return a.visible !== d.visible || a.visible && d.visible && a.frontFacing !== d.frontFacing }, r = [], e(a.left, a.front) && r.push({ y: (l + d) / 2, x: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }), e(a.left, a.back) && r.push({
                    y: (l + d) / 2, x: f, z: c, xDir: {
                        x: 0,
                        y: 0, z: -1
                    }
                }), e(a.right, a.front) && r.push({ y: (l + d) / 2, x: p, z: 0, xDir: { x: 0, y: 0, z: 1 } }), e(a.right, a.back) && r.push({ y: (l + d) / 2, x: p, z: c, xDir: { x: -1, y: 0, z: 0 } }), g = [], e(a.bottom, a.front) && g.push({ x: (f + p) / 2, y: d, z: 0, xDir: { x: 1, y: 0, z: 0 } }), e(a.bottom, a.back) && g.push({ x: (f + p) / 2, y: d, z: c, xDir: { x: -1, y: 0, z: 0 } }), n = [], e(a.top, a.front) && n.push({ x: (f + p) / 2, y: l, z: 0, xDir: { x: 1, y: 0, z: 0 } }), e(a.top, a.back) && n.push({ x: (f + p) / 2, y: l, z: c, xDir: { x: -1, y: 0, z: 0 } }), k = [], e(a.bottom, a.left) && k.push({ z: (0 + c) / 2, y: d, x: f, xDir: { x: 0, y: 0, z: -1 } }), e(a.bottom,
                    a.right) && k.push({ z: (0 + c) / 2, y: d, x: p, xDir: { x: 0, y: 0, z: 1 } }), d = [], e(a.top, a.left) && d.push({ z: (0 + c) / 2, y: l, x: f, xDir: { x: 0, y: 0, z: -1 } }), e(a.top, a.right) && d.push({ z: (0 + c) / 2, y: l, x: p, xDir: { x: 0, y: 0, z: 1 } }), f = function (a, d, c) { if (0 === a.length) return null; if (1 === a.length) return a[0]; for (var e = 0, g = A(a, h, !1), f = 1; f < g.length; f++)c * g[f][d] > c * g[e][d] ? e = f : c * g[f][d] === c * g[e][d] && g[f].z < g[e].z && (e = f); return a[e] }, a.axes = {
                        y: { left: f(r, "x", -1), right: f(r, "x", 1) }, x: { top: f(n, "y", -1), bottom: f(g, "y", 1) }, z: {
                            top: f(d, "y", -1), bottom: f(k,
                                "y", 1)
                        }
                    }) : a.axes = { y: { left: { x: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }, right: { x: p, z: 0, xDir: { x: 0, y: 0, z: 1 } } }, x: { top: { y: l, z: 0, xDir: { x: 1, y: 0, z: 0 } }, bottom: { y: d, z: 0, xDir: { x: 1, y: 0, z: 0 } } }, z: { top: { x: q ? p : f, y: l, xDir: q ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } }, bottom: { x: q ? p : f, y: d, xDir: q ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } } } }; return a
            }; b.Fx.prototype.matrixSetter = function () {
                if (1 > this.pos && (t(this.start) || t(this.end))) { var b = this.start || [1, 0, 0, 1, 0, 0], r = this.end || [1, 0, 0, 1, 0, 0]; var a = []; for (var f = 0; 6 > f; f++)a.push(this.pos * r[f] + (1 - this.pos) * b[f]) } else a =
                    this.end; this.elem.attr(this.prop, a, null, !0)
            }; ""
        }); B(q, "parts-3d/Axis.js", [q["parts/Globals.js"], q["parts/Tick.js"], q["parts/Utilities.js"]], function (b, k, q) {
            function v(d, c, f) {
                if (!d.chart.is3d() || "colorAxis" === d.coll) return c; var g = d.chart, b = r * g.options.chart.options3d.alpha, m = r * g.options.chart.options3d.beta, e = x(f && d.options.title.position3d, d.options.labels.position3d); f = x(f && d.options.title.skew3d, d.options.labels.skew3d); var l = g.frame3d, h = g.plotLeft, k = g.plotWidth + h, w = g.plotTop, q = g.plotHeight + w;
                g = !1; var t = 0, v = 0, u = { x: 0, y: 1, z: 0 }; c = d.swapZ({ x: c.x, y: c.y, z: 0 }); if (d.isZAxis) if (d.opposite) { if (null === l.axes.z.top) return {}; v = c.y - w; c.x = l.axes.z.top.x; c.y = l.axes.z.top.y; h = l.axes.z.top.xDir; g = !l.top.frontFacing } else { if (null === l.axes.z.bottom) return {}; v = c.y - q; c.x = l.axes.z.bottom.x; c.y = l.axes.z.bottom.y; h = l.axes.z.bottom.xDir; g = !l.bottom.frontFacing } else if (d.horiz) if (d.opposite) { if (null === l.axes.x.top) return {}; v = c.y - w; c.y = l.axes.x.top.y; c.z = l.axes.x.top.z; h = l.axes.x.top.xDir; g = !l.top.frontFacing } else {
                    if (null ===
                        l.axes.x.bottom) return {}; v = c.y - q; c.y = l.axes.x.bottom.y; c.z = l.axes.x.bottom.z; h = l.axes.x.bottom.xDir; g = !l.bottom.frontFacing
                } else if (d.opposite) { if (null === l.axes.y.right) return {}; t = c.x - k; c.x = l.axes.y.right.x; c.z = l.axes.y.right.z; h = l.axes.y.right.xDir; h = { x: h.z, y: h.y, z: -h.x } } else { if (null === l.axes.y.left) return {}; t = c.x - h; c.x = l.axes.y.left.x; c.z = l.axes.y.left.z; h = l.axes.y.left.xDir } "chart" !== e && ("flap" === e ? d.horiz ? (m = Math.sin(b), b = Math.cos(b), d.opposite && (m = -m), g && (m = -m), u = { x: h.z * m, y: b, z: -h.x * m }) : h = {
                    x: Math.cos(m),
                    y: 0, z: Math.sin(m)
                } : "ortho" === e ? d.horiz ? (u = Math.cos(b), e = Math.sin(m) * u, b = -Math.sin(b), m = -u * Math.cos(m), u = { x: h.y * m - h.z * b, y: h.z * e - h.x * m, z: h.x * b - h.y * e }, b = 1 / Math.sqrt(u.x * u.x + u.y * u.y + u.z * u.z), g && (b = -b), u = { x: b * u.x, y: b * u.y, z: b * u.z }) : h = { x: Math.cos(m), y: 0, z: Math.sin(m) } : d.horiz ? u = { x: Math.sin(m) * Math.sin(b), y: Math.cos(b), z: -Math.cos(m) * Math.sin(b) } : h = { x: Math.cos(m), y: 0, z: Math.sin(m) }); c.x += t * h.x + v * u.x; c.y += t * h.y + v * u.y; c.z += t * h.z + v * u.z; g = a([c], d.chart)[0]; f && (0 > p(a([c, { x: c.x + h.x, y: c.y + h.y, z: c.z + h.z }, {
                    x: c.x +
                        u.x, y: c.y + u.y, z: c.z + u.z
                }], d.chart)) && (h = { x: -h.x, y: -h.y, z: -h.z }), d = a([{ x: c.x, y: c.y, z: c.z }, { x: c.x + h.x, y: c.y + h.y, z: c.z + h.z }, { x: c.x + u.x, y: c.y + u.y, z: c.z + u.z }], d.chart), g.matrix = [d[1].x - d[0].x, d[1].y - d[0].y, d[2].x - d[0].x, d[2].y - d[0].y, g.x, g.y], g.matrix[4] -= g.x * g.matrix[0] + g.y * g.matrix[2], g.matrix[5] -= g.x * g.matrix[1] + g.y * g.matrix[3]); return g
            } var t = q.addEvent, z = q.extend, w = q.merge, x = q.pick, A = q.splat; q = q.wrap; var h = b.Axis, u = b.Chart, r = b.deg2rad, a = b.perspective, f = b.perspective3D, p = b.shapeArea; w(!0, h.prototype.defaultOptions,
                { labels: { position3d: "offset", skew3d: !1 }, title: { position3d: null, skew3d: null } }); t(h, "afterSetOptions", function () { if (this.chart.is3d && this.chart.is3d() && "colorAxis" !== this.coll) { var a = this.options; a.tickWidth = x(a.tickWidth, 0); a.gridLineWidth = x(a.gridLineWidth, 1) } }); q(h.prototype, "getPlotLinePath", function (d) {
                    var c = d.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d() || "colorAxis" === this.coll || null === c) return c; var f = this.chart, g = f.options.chart.options3d; g = this.isZAxis ? f.plotWidth : g.depth; f =
                        f.frame3d; c = [this.swapZ({ x: c[1], y: c[2], z: 0 }), this.swapZ({ x: c[1], y: c[2], z: g }), this.swapZ({ x: c[4], y: c[5], z: 0 }), this.swapZ({ x: c[4], y: c[5], z: g })]; g = []; this.horiz ? (this.isZAxis ? (f.left.visible && g.push(c[0], c[2]), f.right.visible && g.push(c[1], c[3])) : (f.front.visible && g.push(c[0], c[2]), f.back.visible && g.push(c[1], c[3])), f.top.visible && g.push(c[0], c[1]), f.bottom.visible && g.push(c[2], c[3])) : (f.front.visible && g.push(c[0], c[2]), f.back.visible && g.push(c[1], c[3]), f.left.visible && g.push(c[0], c[1]), f.right.visible &&
                            g.push(c[2], c[3])); g = a(g, this.chart, !1); return this.chart.renderer.toLineSegments(g)
                }); q(h.prototype, "getLinePath", function (a) { return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1)) }); q(h.prototype, "getPlotBandPath", function (a) {
                    if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1)); var c = arguments, d = c[2], g = []; c = this.getPlotLinePath({ value: c[1] }); d = this.getPlotLinePath({ value: d }); if (c && d) for (var f = 0; f < c.length; f += 6)g.push("M",
                        c[f + 1], c[f + 2], "L", c[f + 4], c[f + 5], "L", d[f + 4], d[f + 5], "L", d[f + 1], d[f + 2], "Z"); return g
                }); q(k.prototype, "getMarkPath", function (a) { var d = a.apply(this, [].slice.call(arguments, 1)); d = [v(this.axis, { x: d[1], y: d[2], z: 0 }), v(this.axis, { x: d[4], y: d[5], z: 0 })]; return this.axis.chart.renderer.toLineSegments(d) }); t(k, "afterGetLabelPosition", function (a) { z(a.pos, v(this.axis, a.pos)) }); q(h.prototype, "getTitlePosition", function (a) { var d = a.apply(this, [].slice.call(arguments, 1)); return v(this, d, !0) }); t(h, "drawCrosshair", function (a) {
                    this.chart.is3d() &&
                    "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos)
                }); t(h, "destroy", function () { ["backFrame", "bottomFrame", "sideFrame"].forEach(function (a) { this[a] && (this[a] = this[a].destroy()) }, this) }); u.prototype.addZAxis = function (a) { return new l(this, a) }; u.prototype.collectionsWithUpdate.push("zAxis"); u.prototype.collectionsWithInit.zAxis = [u.prototype.addZAxis]; h.prototype.swapZ = function (a, c) {
                    return this.isZAxis ? (c = c ? 0 : this.chart.plotLeft, {
                        x: c + a.z, y: a.y,
                        z: a.x - c
                    }) : a
                }; var l = b.ZAxis = function () { this.init.apply(this, arguments) }; z(l.prototype, h.prototype); z(l.prototype, {
                    isZAxis: !0, setOptions: function (a) { a = w({ offset: 0, lineWidth: 0 }, a); h.prototype.setOptions.call(this, a); this.coll = "zAxis" }, setAxisSize: function () { h.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left }, getSeriesExtremes: function () {
                        var a = this, c = a.chart; a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.ignoreMinPadding =
                            a.ignoreMaxPadding = null; a.buildStacks && a.buildStacks(); a.series.forEach(function (d) { if (d.visible || !c.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, d = d.zData, d.length && (a.dataMin = Math.min(x(a.dataMin, d[0]), Math.min.apply(null, d)), a.dataMax = Math.max(x(a.dataMax, d[0]), Math.max.apply(null, d))) })
                    }
                }); t(u, "afterGetAxes", function () { var a = this, c = this.options; c = c.zAxis = A(c.zAxis || {}); a.is3d() && (this.zAxis = [], c.forEach(function (c, d) { c.index = d; c.isX = !0; a.addZAxis(c).setScale() })) }); q(h.prototype, "getSlotWidth",
                    function (a, c) {
                        if (this.chart.is3d() && c && c.label && this.categories && this.chart.frameShapes) {
                            var d = this.chart, g = this.ticks, b = this.gridGroup.element.childNodes[0].getBBox(), h = d.frameShapes.left.getBBox(), e = d.options.chart.options3d; d = { x: d.plotWidth / 2, y: d.plotHeight / 2, z: e.depth / 2, vd: x(e.depth, 1) * x(e.viewDistance, 0) }; var l, r; e = c.pos; var p = g[e - 1]; g = g[e + 1]; 0 !== e && p && p.label.xy && (l = f({ x: p.label.xy.x, y: p.label.xy.y, z: null }, d, d.vd)); g && g.label.xy && (r = f({ x: g.label.xy.x, y: g.label.xy.y, z: null }, d, d.vd)); g = {
                                x: c.label.xy.x,
                                y: c.label.xy.y, z: null
                            }; g = f(g, d, d.vd); return Math.abs(l ? g.x - l.x : r ? r.x - g.x : b.x - h.x)
                        } return a.apply(this, [].slice.call(arguments, 1))
                    })
        }); B(q, "parts-3d/Series.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
            var q = k.addEvent, y = k.pick, t = b.perspective; q(b.Series, "afterTranslate", function () { this.chart.is3d() && this.translate3dPoints() }); b.Series.prototype.translate3dPoints = function () {
                var b = this.chart, k = y(this.zAxis, b.options.zAxis[0]), q = [], v; for (v = 0; v < this.data.length; v++) {
                    var h = this.data[v];
                    if (k && k.translate) { var u = k.isLog && k.val2lin ? k.val2lin(h.z) : h.z; h.plotZ = k.translate(u); h.isInside = h.isInside ? u >= k.min && u <= k.max : !1 } else h.plotZ = 0; h.axisXpos = h.plotX; h.axisYpos = h.plotY; h.axisZpos = h.plotZ; q.push({ x: h.plotX, y: h.plotY, z: h.plotZ })
                } b = t(q, b, !0); for (v = 0; v < this.data.length; v++)h = this.data[v], k = b[v], h.plotX = k.x, h.plotY = k.y, h.plotZ = k.z
            }
        }); B(q, "parts-3d/Column.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
            function q(b) {
                var a = b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d &&
                    this.chart.is3d() && (a.stroke = this.options.edgeColor || a.fill, a["stroke-width"] = w(this.options.edgeWidth, 1)); return a
            } function y(b, a, f) { var h = this.chart.is3d && this.chart.is3d(); h && (this.options.inactiveOtherPoints = !0); b.call(this, a, f); h && (this.options.inactiveOtherPoints = !1) } function t(b) { for (var a = [], f = 1; f < arguments.length; f++)a[f - 1] = arguments[f]; return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : b.apply(this, a) } var z = k.addEvent, w = k.pick; k = k.wrap; var x = b.perspective,
                A = b.Series, h = b.seriesTypes, u = b.svg; k(h.column.prototype, "translate", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.translate3dShapes() }); k(b.Series.prototype, "justifyDataLabel", function (b) { return arguments[2].outside3dPlot ? !1 : b.apply(this, [].slice.call(arguments, 1)) }); h.column.prototype.translate3dPoints = function () { }; h.column.prototype.translate3dShapes = function () {
                    var b = this, a = b.chart, f = b.options, h = f.depth, l = (f.stacking ? f.stack || 0 : b.index) * (h + (f.groupZPadding || 1)), d =
                        b.borderWidth % 2 ? .5 : 0, c; a.inverted && !b.yAxis.reversed && (d *= -1); !1 !== f.grouping && (l = 0); l += f.groupZPadding || 1; b.data.forEach(function (f) {
                        f.outside3dPlot = null; if (null !== f.y) {
                            var g = f.shapeArgs, m = f.tooltipPos, k;[["x", "width"], ["y", "height"]].forEach(function (a) { k = g[a[0]] - d; 0 > k && (g[a[1]] += g[a[0]] + d, g[a[0]] = -d, k = 0); k + g[a[1]] > b[a[0] + "Axis"].len && 0 !== g[a[1]] && (g[a[1]] = b[a[0] + "Axis"].len - g[a[0]]); if (0 !== g[a[1]] && (g[a[0]] >= b[a[0] + "Axis"].len || g[a[0]] + g[a[1]] <= d)) { for (var c in g) g[c] = 0; f.outside3dPlot = !0 } }); "rect" ===
                                f.shapeType && (f.shapeType = "cuboid"); g.z = l; g.depth = h; g.insidePlotArea = !0; c = { x: g.x + g.width / 2, y: g.y, z: l + h / 2 }; a.inverted && (c.x = g.height, c.y = f.clientX); f.plot3d = x([c], a, !0, !1)[0]; m = x([{ x: m[0], y: m[1], z: l + h / 2 }], a, !0, !1)[0]; f.tooltipPos = [m.x, m.y]
                        }
                        }); b.z = l
                }; k(h.column.prototype, "animate", function (b) {
                    if (this.chart.is3d()) {
                        var a = arguments[1], f = this.yAxis, h = this, l = this.yAxis.reversed; u && (a ? h.data.forEach(function (a) {
                        null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, l || (a.shapeArgs.y =
                            a.stackY ? a.plotY + f.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height)))
                        }) : (h.data.forEach(function (a) { null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, h.options.animation)) }), this.drawDataLabels()))
                    } else b.apply(this, [].slice.call(arguments, 1))
                }); k(h.column.prototype, "plotGroup", function (b, a, f, h, l, d) {
                "dataLabelsGroup" !== a && this.chart.is3d() && (this[a] && delete this[a], d && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(d)),
                    this[a] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[a].survive = !0, "group" === a || "markerGroup" === a)) && (arguments[3] = "visible"); return b.apply(this, Array.prototype.slice.call(arguments, 1))
                }); k(h.column.prototype, "setVisible", function (b, a) {
                    var f = this, h; f.chart.is3d() && f.data.forEach(function (b) { h = (b.visible = b.options.visible = a = "undefined" === typeof a ? !w(f.visible, b.visible) : a) ? "visible" : "hidden"; f.options.data[f.data.indexOf(b)] = b.options; b.graphic && b.graphic.attr({ visibility: h }) });
                    b.apply(this, Array.prototype.slice.call(arguments, 1))
                }); h.column.prototype.handle3dGrouping = !0; z(A, "afterInit", function () {
                    if (this.chart.is3d() && this.handle3dGrouping) {
                        var b = this.options, a = b.grouping, f = b.stacking, h = w(this.yAxis.options.reversedStacks, !0), l = 0; if ("undefined" === typeof a || a) { a = this.chart.retrieveStacks(f); l = b.stack || 0; for (f = 0; f < a[l].series.length && a[l].series[f] !== this; f++); l = 10 * (a.totalStacks - a[l].position) + (h ? f : -f); this.xAxis.reversed || (l = 10 * a.totalStacks - l) } b.depth = b.depth || 25; this.z =
                            this.z || 0; b.zIndex = l
                    }
                }); k(h.column.prototype, "pointAttribs", q); k(h.column.prototype, "setState", y); k(h.column.prototype.pointClass.prototype, "hasNewShapeType", t); h.columnrange && (k(h.columnrange.prototype, "pointAttribs", q), k(h.columnrange.prototype, "setState", y), k(h.columnrange.prototype.pointClass.prototype, "hasNewShapeType", t), h.columnrange.prototype.plotGroup = h.column.prototype.plotGroup, h.columnrange.prototype.setVisible = h.column.prototype.setVisible); k(A.prototype, "alignDataLabel", function (b, a,
                    f, h, l) { var d = this.chart; h.outside3dPlot = a.outside3dPlot; if (d.is3d() && this.is("column")) { var c = this.options, m = w(h.inside, !!this.options.stacking), g = d.options.chart.options3d, k = a.pointWidth / 2 || 0; c = { x: l.x + k, y: l.y, z: this.z + c.depth / 2 }; d.inverted && (m && (l.width = 0, c.x += a.shapeArgs.height / 2), 90 <= g.alpha && 270 >= g.alpha && (c.y += a.shapeArgs.width)); c = x([c], d, !0, !1)[0]; l.x = c.x - k; l.y = a.outside3dPlot ? -9E9 : c.y } b.apply(this, [].slice.call(arguments, 1)) }); k(b.StackItem.prototype, "getStackBox", function (b, a, f, k, l, d, c, m) {
                        var g =
                            b.apply(this, [].slice.call(arguments, 1)); if (a.is3d() && f.base) { var n = +f.base.split(",")[0], p = a.series[n]; n = a.options.chart.options3d; p && p instanceof h.column && (p = { x: g.x + (a.inverted ? c : d / 2), y: g.y, z: p.options.depth / 2 }, a.inverted && (g.width = 0, 90 <= n.alpha && 270 >= n.alpha && (p.y += d)), p = x([p], a, !0, !1)[0], g.x = p.x - d / 2, g.y = p.y) } return g
                    })
        }); B(q, "parts-3d/Pie.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
            var q = k.pick; k = k.wrap; var y = b.deg2rad, t = b.seriesTypes, z = b.svg; k(t.pie.prototype, "translate",
                function (b) {
                    b.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
                        var k = this, q = k.options, h = q.depth || 0, t = k.chart.options.chart.options3d, r = t.alpha, a = t.beta, f = q.stacking ? (q.stack || 0) * h : k._i * h; f += h / 2; !1 !== q.grouping && (f = 0); k.data.forEach(function (b) {
                            var l = b.shapeArgs; b.shapeType = "arc3d"; l.z = f; l.depth = .75 * h; l.alpha = r; l.beta = a; l.center = k.center; l = (l.end + l.start) / 2; b.slicedTranslation = {
                                translateX: Math.round(Math.cos(l) * q.slicedOffset * Math.cos(r * y)), translateY: Math.round(Math.sin(l) * q.slicedOffset *
                                    Math.cos(r * y))
                            }
                        })
                    }
                }); k(t.pie.prototype.pointClass.prototype, "haloPath", function (b) { var k = arguments; return this.series.chart.is3d() ? [] : b.call(this, k[1]) }); k(t.pie.prototype, "pointAttribs", function (b, k, t) { b = b.call(this, k, t); t = this.options; this.chart.is3d() && !this.chart.styledMode && (b.stroke = t.edgeColor || k.color || this.color, b["stroke-width"] = q(t.edgeWidth, 1)); return b }); k(t.pie.prototype, "drawDataLabels", function (b) {
                    if (this.chart.is3d()) {
                        var k = this.chart.options.chart.options3d; this.data.forEach(function (b) {
                            var h =
                                b.shapeArgs, q = h.r, r = (h.start + h.end) / 2; b = b.labelPosition; var a = b.connectorPosition, f = -q * (1 - Math.cos((h.alpha || k.alpha) * y)) * Math.sin(r), p = q * (Math.cos((h.beta || k.beta) * y) - 1) * Math.cos(r);[b.natural, a.breakAt, a.touchingSliceAt].forEach(function (a) { a.x += p; a.y += f })
                        })
                    } b.apply(this, [].slice.call(arguments, 1))
                }); k(t.pie.prototype, "addPoint", function (b) { b.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); k(t.pie.prototype, "animate", function (b) {
                    if (this.chart.is3d()) {
                        var k =
                            arguments[1], q = this.options.animation, h = this.center, t = this.group, r = this.markerGroup; z && (!0 === q && (q = {}), k ? (t.oldtranslateX = t.translateX, t.oldtranslateY = t.translateY, k = { translateX: h[0], translateY: h[1], scaleX: .001, scaleY: .001 }, t.attr(k), r && (r.attrSetters = t.attrSetters, r.attr(k))) : (k = { translateX: t.oldtranslateX, translateY: t.oldtranslateY, scaleX: 1, scaleY: 1 }, t.animate(k, q), r && r.animate(k, q)))
                    } else b.apply(this, [].slice.call(arguments, 1))
                })
        }); B(q, "parts-3d/Scatter.js", [q["parts/Globals.js"], q["parts/Point.js"],
        q["parts/Utilities.js"]], function (b, k, q) {
            q = q.seriesType; var v = b.seriesTypes; q("scatter3d", "scatter", { tooltip: { pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" } }, { pointAttribs: function (k) { var q = v.scatter.prototype.pointAttribs.apply(this, arguments); this.chart.is3d() && k && (q.zIndex = b.pointCameraDistance(k, this.chart)); return q }, axisTypes: ["xAxis", "yAxis", "zAxis"], pointArrayMap: ["x", "y", "z"], parallelArrays: ["x", "y", "z"], directTouch: !0 }, {
                applyOptions: function () {
                    k.prototype.applyOptions.apply(this,
                        arguments); "undefined" === typeof this.z && (this.z = 0); return this
                }
            }); ""
        }); B(q, "parts-3d/VMLRenderer.js", [q["parts/Globals.js"], q["parts/Utilities.js"]], function (b, k) {
            k = k.addEvent; var q = b.Axis, y = b.SVGRenderer, t = b.VMLRenderer; t && (b.setOptions({ animate: !1 }), t.prototype.face3d = y.prototype.face3d, t.prototype.polyhedron = y.prototype.polyhedron, t.prototype.elements3d = y.prototype.elements3d, t.prototype.element3d = y.prototype.element3d, t.prototype.cuboid = y.prototype.cuboid, t.prototype.cuboidPath = y.prototype.cuboidPath,
                t.prototype.toLinePath = y.prototype.toLinePath, t.prototype.toLineSegments = y.prototype.toLineSegments, t.prototype.arc3d = function (b) { b = y.prototype.arc3d.call(this, b); b.css({ zIndex: b.zIndex }); return b }, b.VMLRenderer.prototype.arc3dPath = b.SVGRenderer.prototype.arc3dPath, k(q, "render", function () {
                this.sideFrame && (this.sideFrame.css({ zIndex: 0 }), this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color }));
                    this.backFrame && (this.backFrame.css({ zIndex: 0 }), this.backFrame.front.attr({ fill: this.backFrame.color }))
                }))
        }); B(q, "masters/highcharts-3d.src.js", [], function () { })
});
//# sourceMappingURL=highcharts-3d.js.map