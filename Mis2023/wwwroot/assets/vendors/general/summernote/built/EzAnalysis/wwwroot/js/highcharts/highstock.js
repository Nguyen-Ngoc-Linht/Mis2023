/*
 Highstock JS v10.2.0 (2022-07-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (U, P) { "object" === typeof module && module.exports ? (P["default"] = P, module.exports = U.document ? P(U) : P) : "function" === typeof define && define.amd ? define("highcharts/highstock", function () { return P(U); }) : (U.Highcharts && U.Highcharts.error(16, !0), U.Highcharts = P(U)); })("undefined" !== typeof window ? window : this, function (U) {
    function P(d, C, g, E) { d.hasOwnProperty(C) || (d[C] = E.apply(null, g), "function" === typeof CustomEvent && U.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: C, module: d[C] } }))); }
    var g = {};
    P(g, "Core/Globals.js", [], function () {
        var d;
        (function (d) {
            d.SVG_NS = "http://www.w3.org/2000/svg";
            d.product = "Highcharts";
            d.version = "10.2.0";
            d.win = "undefined" !== typeof U ? U : {};
            d.doc = d.win.document;
            d.svg = d.doc && d.doc.createElementNS && !!d.doc.createElementNS(d.SVG_NS, "svg").createSVGRect;
            d.userAgent = d.win.navigator && d.win.navigator.userAgent || "";
            d.isChrome = -1 !== d.userAgent.indexOf("Chrome");
            d.isFirefox = -1 !== d.userAgent.indexOf("Firefox");
            d.isMS = /(edge|msie|trident)/i.test(d.userAgent) && !d.win.opera;
            d.isSafari =
                !d.isChrome && -1 !== d.userAgent.indexOf("Safari");
            d.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(d.userAgent);
            d.isWebKit = -1 !== d.userAgent.indexOf("AppleWebKit");
            d.deg2rad = 2 * Math.PI / 360;
            d.hasBidiBug = d.isFirefox && 4 > parseInt(d.userAgent.split("Firefox/")[1], 10);
            d.hasTouch = !!d.win.TouchEvent;
            d.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            d.noop = function () { };
            d.supportsPassiveEvents = function () {
                var g = !1;
                if (!d.isMS) {
                    var C = Object.defineProperty({}, "passive", { get: function () { g = !0; } });
                    d.win.addEventListener && d.win.removeEventListener && (d.win.addEventListener("testPassive", d.noop, C), d.win.removeEventListener("testPassive", d.noop, C));
                }
                return g;
            }();
            d.charts = [];
            d.dateFormats = {};
            d.seriesTypes = {};
            d.symbolSizes = {};
            d.chartCount = 0;
        })(d || (d = {}));
        "";
        return d;
    });
    P(g, "Core/Utilities.js", [g["Core/Globals.js"]], function (d) {
        function g(f, b, h, n) {
            var p = b ? "Highcharts error" : "Highcharts warning";
            32 === f && (f = "" + p + ": Deprecated member");
            var D = q(f), K = D ? "" + p + " #" + f + ": www.highcharts.com/errors/" + f + "/" : f.toString();
            if ("undefined" !== typeof n) {
                var H = "";
                D && (K += "?");
                L(n, function (b, f) { H += "\n - ".concat(f, ": ").concat(b); D && (K += encodeURI(f) + "=" + encodeURI(b)); });
                K += H;
            }
            y(d, "displayError", { chart: h, code: f, message: K, params: n }, function () { if (b)
                throw Error(K); e.console && -1 === g.messages.indexOf(K) && console.warn(K); });
            g.messages.push(K);
        }
        function B(f, b) { var e = {}; L(f, function (h, p) { if (I(f[p], !0) && !f.nodeType && b[p])
            h = B(f[p], b[p]), Object.keys(h).length && (e[p] = h);
        else if (I(f[p]) || f[p] !== b[p] || p in f && !(p in b))
            e[p] = f[p]; }); return e; }
        function E(f, b) { return parseInt(f, b || 10); }
        function x(f) { return "string" === typeof f; }
        function G(f) { f = Object.prototype.toString.call(f); return "[object Array]" === f || "[object Array Iterator]" === f; }
        function I(f, b) { return !!f && "object" === typeof f && (!b || !G(f)); }
        function A(f) { return I(f) && "number" === typeof f.nodeType; }
        function t(f) { var b = f && f.constructor; return !(!I(f, !0) || A(f) || !b || !b.name || "Object" === b.name); }
        function q(f) { return "number" === typeof f && !isNaN(f) && Infinity > f && -Infinity < f; }
        function c(f) {
            return "undefined" !==
                typeof f && null !== f;
        }
        function l(f, b, e) { var h = x(b) && !c(e), p, D = function (b, e) { c(b) ? f.setAttribute(e, b) : h ? (p = f.getAttribute(e)) || "class" !== e || (p = f.getAttribute(e + "Name")) : f.removeAttribute(e); }; x(b) ? D(e, b) : L(b, D); return p; }
        function a(f, b) { var e; f || (f = {}); for (e in b)
            f[e] = b[e]; return f; }
        function k() { for (var f = arguments, b = f.length, e = 0; e < b; e++) {
            var h = f[e];
            if ("undefined" !== typeof h && null !== h)
                return h;
        } }
        function v(f, b) {
            d.isMS && !d.svg && b && c(b.opacity) && (b.filter = "alpha(opacity=".concat(100 * b.opacity, ")"));
            a(f.style, b);
        }
        function m(f) { return Math.pow(10, Math.floor(Math.log(f) / Math.LN10)); }
        function N(f, b) { return 1E14 < f ? f : parseFloat(f.toPrecision(b || 14)); }
        function F(f, b, h) {
            var D = d.getStyle || F;
            if ("width" === b)
                return b = Math.min(f.offsetWidth, f.scrollWidth), h = f.getBoundingClientRect && f.getBoundingClientRect().width, h < b && h >= b - 1 && (b = Math.floor(h)), Math.max(0, b - (D(f, "padding-left", !0) || 0) - (D(f, "padding-right", !0) || 0));
            if ("height" === b)
                return Math.max(0, Math.min(f.offsetHeight, f.scrollHeight) - (D(f, "padding-top", !0) || 0) - (D(f, "padding-bottom", !0) || 0));
            e.getComputedStyle || g(27, !0);
            if (f = e.getComputedStyle(f, void 0)) {
                var p = f.getPropertyValue(b);
                k(h, "opacity" !== b) && (p = E(p));
            }
            return p;
        }
        function L(f, b, e) { for (var h in f)
            Object.hasOwnProperty.call(f, h) && b.call(e || f[h], f[h], h, f); }
        function J(f, b, e) {
            function h(b, e) { var M = f.removeEventListener || d.removeEventListenerPolyfill; M && M.call(f, b, e, !1); }
            function p(e) { var M; if (f.nodeName) {
                if (b) {
                    var p = {};
                    p[b] = !0;
                }
                else
                    p = e;
                L(p, function (b, f) { if (e[f])
                    for (M = e[f].length; M--;)
                        h(f, e[f][M].fn); });
            } }
            var D = "function" === typeof f && f.prototype || f;
            if (Object.hasOwnProperty.call(D, "hcEvents")) {
                var K = D.hcEvents;
                b ? (D = K[b] || [], e ? (K[b] = D.filter(function (b) { return e !== b.fn; }), h(b, e)) : (p(K), K[b] = [])) : (p(K), delete D.hcEvents);
            }
        }
        function y(f, b, e, h) {
            e = e || {};
            if (w.createEvent && (f.dispatchEvent || f.fireEvent && f !== d)) {
                var p = w.createEvent("Events");
                p.initEvent(b, !0, !0);
                e = a(p, e);
                f.dispatchEvent ? f.dispatchEvent(e) : f.fireEvent(b, e);
            }
            else if (f.hcEvents) {
                e.target || a(e, { preventDefault: function () { e.defaultPrevented = !0; }, target: f,
                    type: b });
                p = [];
                for (var n = f, K = !1; n.hcEvents;)
                    Object.hasOwnProperty.call(n, "hcEvents") && n.hcEvents[b] && (p.length && (K = !0), p.unshift.apply(p, n.hcEvents[b])), n = Object.getPrototypeOf(n);
                K && p.sort(function (b, f) { return b.order - f.order; });
                p.forEach(function (b) { !1 === b.fn.call(f, e) && e.preventDefault(); });
            }
            h && !e.defaultPrevented && h.call(f, e);
        }
        var z = d.charts, w = d.doc, e = d.win;
        (g || (g = {})).messages = [];
        Math.easeInOutSine = function (f) { return -.5 * (Math.cos(Math.PI * f) - 1); };
        var r = Array.prototype.find ? function (f, b) { return f.find(b); } :
            function (f, b) { var e, h = f.length; for (e = 0; e < h; e++)
                if (b(f[e], e))
                    return f[e]; };
        L({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (f, b) { d[b] = function (e) { var h; g(32, !1, void 0, (h = {}, h["Highcharts.".concat(b)] = "use Array.".concat(f), h)); return Array.prototype[f].apply(e, [].slice.call(arguments, 1)); }; });
        var h, n = function () { var f = Math.random().toString(36).substring(2, 9) + "-", b = 0; return function () { return "highcharts-" + (h ? "" : f) + b++; }; }();
        e.jQuery && (e.jQuery.fn.highcharts = function () {
            var f = [].slice.call(arguments);
            if (this[0])
                return f[0] ? (new (d[x(f[0]) ? f.shift() : "Chart"])(this[0], f[0], f[1]), this) : z[l(this[0], "data-highcharts-chart")];
        });
        r = { addEvent: function (f, b, e, h) {
                void 0 === h && (h = {});
                var p = "function" === typeof f && f.prototype || f;
                Object.hasOwnProperty.call(p, "hcEvents") || (p.hcEvents = {});
                p = p.hcEvents;
                d.Point && f instanceof d.Point && f.series && f.series.chart && (f.series.chart.runTrackerClick = !0);
                var n = f.addEventListener || d.addEventListenerPolyfill;
                n && n.call(f, b, e, d.supportsPassiveEvents ? { passive: void 0 ===
                        h.passive ? -1 !== b.indexOf("touch") : h.passive, capture: !1 } : !1);
                p[b] || (p[b] = []);
                p[b].push({ fn: e, order: "number" === typeof h.order ? h.order : Infinity });
                p[b].sort(function (b, f) { return b.order - f.order; });
                return function () { J(f, b, e); };
            }, arrayMax: function (f) { for (var b = f.length, e = f[0]; b--;)
                f[b] > e && (e = f[b]); return e; }, arrayMin: function (f) { for (var b = f.length, e = f[0]; b--;)
                f[b] < e && (e = f[b]); return e; }, attr: l, clamp: function (f, b, e) { return f > b ? f < e ? f : e : b; }, cleanRecursively: B, clearTimeout: function (f) { c(f) && clearTimeout(f); }, correctFloat: N,
            createElement: function (f, b, e, h, p) { f = w.createElement(f); b && a(f, b); p && v(f, { padding: "0", border: "none", margin: "0" }); e && v(f, e); h && h.appendChild(f); return f; }, css: v, defined: c, destroyObjectProperties: function (f, b) { L(f, function (e, h) { e && e !== b && e.destroy && e.destroy(); delete f[h]; }); }, discardElement: function (f) { f && f.parentElement && f.parentElement.removeChild(f); }, erase: function (f, b) { for (var e = f.length; e--;)
                if (f[e] === b) {
                    f.splice(e, 1);
                    break;
                } }, error: g, extend: a, extendClass: function (f, b) {
                var e = function () { };
                e.prototype =
                    new f;
                a(e.prototype, b);
                return e;
            }, find: r, fireEvent: y, getMagnitude: m, getNestedProperty: function (f, b) { for (f = f.split("."); f.length && c(b);) {
                var h = f.shift();
                if ("undefined" === typeof h || "__proto__" === h)
                    return;
                b = b[h];
                if (!c(b) || "function" === typeof b || "number" === typeof b.nodeType || b === e)
                    return;
            } return b; }, getStyle: F, inArray: function (f, b, e) { g(32, !1, void 0, { "Highcharts.inArray": "use Array.indexOf" }); return b.indexOf(f, e); }, isArray: G, isClass: t, isDOMElement: A, isFunction: function (f) { return "function" === typeof f; }, isNumber: q,
            isObject: I, isString: x, keys: function (f) { g(32, !1, void 0, { "Highcharts.keys": "use Object.keys" }); return Object.keys(f); }, merge: function () { var f, b = arguments, e = {}, h = function (b, f) { "object" !== typeof b && (b = {}); L(f, function (e, M) { "__proto__" !== M && "constructor" !== M && (!I(e, !0) || t(e) || A(e) ? b[M] = f[M] : b[M] = h(b[M] || {}, e)); }); return b; }; !0 === b[0] && (e = b[1], b = Array.prototype.slice.call(b, 2)); var p = b.length; for (f = 0; f < p; f++)
                e = h(e, b[f]); return e; }, normalizeTickInterval: function (f, b, e, h, p) {
                var n = f;
                e = k(e, m(f));
                var K = f / e;
                b || (b =
                    p ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === h && (1 === e ? b = b.filter(function (b) { return 0 === b % 1; }) : .1 >= e && (b = [1 / e])));
                for (h = 0; h < b.length && !(n = b[h], p && n * e >= f || !p && K <= (b[h] + (b[h + 1] || b[h])) / 2); h++)
                    ;
                return n = N(n * e, -Math.round(Math.log(.001) / Math.LN10));
            }, objectEach: L, offset: function (f) {
                var b = w.documentElement;
                f = f.parentElement || f.parentNode ? f.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
                return { top: f.top + (e.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: f.left + (e.pageXOffset || b.scrollLeft) -
                        (b.clientLeft || 0), width: f.width, height: f.height };
            }, pad: function (f, b, e) { return Array((b || 2) + 1 - String(f).replace("-", "").length).join(e || "0") + f; }, pick: k, pInt: E, relativeLength: function (f, b, e) { return /%$/.test(f) ? b * parseFloat(f) / 100 + (e || 0) : parseFloat(f); }, removeEvent: J, splat: function (f) { return G(f) ? f : [f]; }, stableSort: function (f, b) { var e = f.length, h, p; for (p = 0; p < e; p++)
                f[p].safeI = p; f.sort(function (f, e) { h = b(f, e); return 0 === h ? f.safeI - e.safeI : h; }); for (p = 0; p < e; p++)
                delete f[p].safeI; }, syncTimeout: function (f, b, e) {
                if (0 <
                    b)
                    return setTimeout(f, b, e);
                f.call(0, e);
                return -1;
            }, timeUnits: { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }, uniqueKey: n, useSerialIds: function (f) { return h = k(f, h); }, wrap: function (f, b, e) { var h = f[b]; f[b] = function () { var b = Array.prototype.slice.call(arguments), f = arguments, K = this; K.proceed = function () { h.apply(K, arguments.length ? arguments : f); }; b.unshift(h); b = e.apply(this, b); K.proceed = null; return b; }; } };
        "";
        return r;
    });
    P(g, "Core/Chart/ChartDefaults.js", [], function () {
        return { alignThresholds: !1,
            panning: { enabled: !1, type: "x" }, styledMode: !1, borderRadius: 0, colorCount: 10, allowMutatingData: !0, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, zoomBySingleTouch: !1, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" };
    });
    P(g, "Core/Color/Color.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = g.isNumber, E = g.merge, x = g.pInt;
        g = function () {
            function g(C) {
                this.rgba =
                    [NaN, NaN, NaN, NaN];
                this.input = C;
                var A = d.Color;
                if (A && A !== g)
                    return new A(C);
                if (!(this instanceof g))
                    return new g(C);
                this.init(C);
            }
            g.parse = function (d) { return d ? new g(d) : g.None; };
            g.prototype.init = function (d) {
                var A;
                if ("object" === typeof d && "undefined" !== typeof d.stops)
                    this.stops = d.stops.map(function (c) { return new g(c[1]); });
                else if ("string" === typeof d) {
                    this.input = d = g.names[d.toLowerCase()] || d;
                    if ("#" === d.charAt(0)) {
                        var t = d.length;
                        var q = parseInt(d.substr(1), 16);
                        7 === t ? A = [(q & 16711680) >> 16, (q & 65280) >> 8, q & 255, 1] :
                            4 === t && (A = [(q & 3840) >> 4 | (q & 3840) >> 8, (q & 240) >> 4 | q & 240, (q & 15) << 4 | q & 15, 1]);
                    }
                    if (!A)
                        for (q = g.parsers.length; q-- && !A;) {
                            var c = g.parsers[q];
                            (t = c.regex.exec(d)) && (A = c.parse(t));
                        }
                }
                A && (this.rgba = A);
            };
            g.prototype.get = function (d) {
                var A = this.input, t = this.rgba;
                if ("object" === typeof A && "undefined" !== typeof this.stops) {
                    var q = E(A);
                    q.stops = [].slice.call(q.stops);
                    this.stops.forEach(function (c, l) { q.stops[l] = [q.stops[l][0], c.get(d)]; });
                    return q;
                }
                return t && C(t[0]) ? "rgb" === d || !d && 1 === t[3] ? "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")" : "a" ===
                    d ? "".concat(t[3]) : "rgba(" + t.join(",") + ")" : A;
            };
            g.prototype.brighten = function (d) { var A = this.rgba; if (this.stops)
                this.stops.forEach(function (q) { q.brighten(d); });
            else if (C(d) && 0 !== d)
                for (var t = 0; 3 > t; t++)
                    A[t] += x(255 * d), 0 > A[t] && (A[t] = 0), 255 < A[t] && (A[t] = 255); return this; };
            g.prototype.setOpacity = function (d) { this.rgba[3] = d; return this; };
            g.prototype.tweenTo = function (d, A) {
                var t = this.rgba, q = d.rgba;
                if (!C(t[0]) || !C(q[0]))
                    return d.input || "none";
                d = 1 !== q[3] || 1 !== t[3];
                return (d ? "rgba(" : "rgb(") + Math.round(q[0] + (t[0] - q[0]) *
                    (1 - A)) + "," + Math.round(q[1] + (t[1] - q[1]) * (1 - A)) + "," + Math.round(q[2] + (t[2] - q[2]) * (1 - A)) + (d ? "," + (q[3] + (t[3] - q[3]) * (1 - A)) : "") + ")";
            };
            g.names = { white: "#ffffff", black: "#000000" };
            g.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (d) { return [x(d[1]), x(d[2]), x(d[3]), parseFloat(d[4], 10)]; } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (d) { return [x(d[1]), x(d[2]), x(d[3]), 1]; } }];
            g.None = new g("");
            return g;
        }();
        "";
        return g;
    });
    P(g, "Core/Color/Palettes.js", [], function () { return { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ") }; });
    P(g, "Core/Time.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = d.win, E = g.defined, x = g.error, G = g.extend, I = g.isObject, A = g.merge, t = g.objectEach, q = g.pad, c = g.pick, l = g.splat, a = g.timeUnits, k = d.isSafari && C.Intl && C.Intl.DateTimeFormat.prototype.formatRange, v = d.isSafari && C.Intl && !C.Intl.DateTimeFormat.prototype.formatRange;
        g = function () {
            function m(a) { this.options = {}; this.variableTimezone = this.useUTC = !1; this.Date = C.Date; this.getTimezoneOffset = this.timezoneOffsetFunction(); this.update(a); }
            m.prototype.get = function (a, c) { if (this.variableTimezone || this.timezoneOffset) {
                var m = c.getTime(), N = m - this.getTimezoneOffset(c);
                c.setTime(N);
                a = c["getUTC" + a]();
                c.setTime(m);
                return a;
            } return this.useUTC ? c["getUTC" + a]() : c["get" + a](); };
            m.prototype.set = function (a, c, m) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === a || "Seconds" ===
                        a || "Minutes" === a && 0 === this.getTimezoneOffset(c) % 36E5)
                        return c["setUTC" + a](m);
                    var N = this.getTimezoneOffset(c);
                    N = c.getTime() - N;
                    c.setTime(N);
                    c["setUTC" + a](m);
                    a = this.getTimezoneOffset(c);
                    N = c.getTime() + a;
                    return c.setTime(N);
                }
                return this.useUTC || k && "FullYear" === a ? c["setUTC" + a](m) : c["set" + a](m);
            };
            m.prototype.update = function (a) {
                var m = c(a && a.useUTC, !0);
                this.options = a = A(!0, this.options || {}, a);
                this.Date = a.Date || C.Date || Date;
                this.timezoneOffset = (this.useUTC = m) && a.timezoneOffset || void 0;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = m && !(!a.getTimezoneOffset && !a.timezone);
            };
            m.prototype.makeTime = function (a, m, k, l, y, z) { if (this.useUTC) {
                var w = this.Date.UTC.apply(0, arguments);
                var e = this.getTimezoneOffset(w);
                w += e;
                var r = this.getTimezoneOffset(w);
                e !== r ? w += r - e : e - 36E5 !== this.getTimezoneOffset(w - 36E5) || v || (w -= 36E5);
            }
            else
                w = (new this.Date(a, m, c(k, 1), c(l, 0), c(y, 0), c(z, 0))).getTime(); return w; };
            m.prototype.timezoneOffsetFunction = function () {
                var a = this, c = this.options, m = c.getTimezoneOffset, k = c.moment || C.moment;
                if (!this.useUTC)
                    return function (a) {
                        return 6E4 *
                            (new Date(a.toString())).getTimezoneOffset();
                    };
                if (c.timezone) {
                    if (k)
                        return function (a) { return 6E4 * -k.tz(a, c.timezone).utcOffset(); };
                    x(25);
                }
                return this.useUTC && m ? function (a) { return 6E4 * m(a.valueOf()); } : function () { return 6E4 * (a.timezoneOffset || 0); };
            };
            m.prototype.dateFormat = function (a, m, k) {
                if (!E(m) || isNaN(m))
                    return d.defaultOptions.lang && d.defaultOptions.lang.invalidDate || "";
                a = c(a, "%Y-%m-%d %H:%M:%S");
                var l = this, y = new this.Date(m), z = this.get("Hours", y), w = this.get("Day", y), e = this.get("Date", y), r = this.get("Month", y), h = this.get("FullYear", y), n = d.defaultOptions.lang, f = n && n.weekdays, b = n && n.shortWeekdays;
                y = G({ a: b ? b[w] : f[w].substr(0, 3), A: f[w], d: q(e), e: q(e, 2, " "), w: w, b: n.shortMonths[r], B: n.months[r], m: q(r + 1), o: r + 1, y: h.toString().substr(2, 2), Y: h, H: q(z), k: z, I: q(z % 12 || 12), l: z % 12 || 12, M: q(this.get("Minutes", y)), p: 12 > z ? "AM" : "PM", P: 12 > z ? "am" : "pm", S: q(y.getSeconds()), L: q(Math.floor(m % 1E3), 3) }, d.dateFormats);
                t(y, function (b, f) { for (; -1 !== a.indexOf("%" + f);)
                    a = a.replace("%" + f, "function" === typeof b ? b.call(l, m) : b); });
                return k ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
            };
            m.prototype.resolveDTLFormat = function (a) { return I(a, !0) ? a : (a = l(a), { main: a[0], from: a[1], to: a[2] }); };
            m.prototype.getTimeTicks = function (m, k, l, v) {
                var y = this, z = [], w = {}, e = new y.Date(k), r = m.unitRange, h = m.count || 1, n;
                v = c(v, 1);
                if (E(k)) {
                    y.set("Milliseconds", e, r >= a.second ? 0 : h * Math.floor(y.get("Milliseconds", e) / h));
                    r >= a.second && y.set("Seconds", e, r >= a.minute ? 0 : h * Math.floor(y.get("Seconds", e) / h));
                    r >= a.minute && y.set("Minutes", e, r >= a.hour ? 0 : h * Math.floor(y.get("Minutes", e) / h));
                    r >= a.hour &&
                        y.set("Hours", e, r >= a.day ? 0 : h * Math.floor(y.get("Hours", e) / h));
                    r >= a.day && y.set("Date", e, r >= a.month ? 1 : Math.max(1, h * Math.floor(y.get("Date", e) / h)));
                    if (r >= a.month) {
                        y.set("Month", e, r >= a.year ? 0 : h * Math.floor(y.get("Month", e) / h));
                        var f = y.get("FullYear", e);
                    }
                    r >= a.year && y.set("FullYear", e, f - f % h);
                    r === a.week && (f = y.get("Day", e), y.set("Date", e, y.get("Date", e) - f + v + (f < v ? -7 : 0)));
                    f = y.get("FullYear", e);
                    v = y.get("Month", e);
                    var b = y.get("Date", e), D = y.get("Hours", e);
                    k = e.getTime();
                    !y.variableTimezone && y.useUTC || !E(l) || (n = l -
                        k > 4 * a.month || y.getTimezoneOffset(k) !== y.getTimezoneOffset(l));
                    k = e.getTime();
                    for (e = 1; k < l;)
                        z.push(k), k = r === a.year ? y.makeTime(f + e * h, 0) : r === a.month ? y.makeTime(f, v + e * h) : !n || r !== a.day && r !== a.week ? n && r === a.hour && 1 < h ? y.makeTime(f, v, b, D + e * h) : k + r * h : y.makeTime(f, v, b + e * h * (r === a.day ? 1 : 7)), e++;
                    z.push(k);
                    r <= a.hour && 1E4 > z.length && z.forEach(function (b) { 0 === b % 18E5 && "000000000" === y.dateFormat("%H%M%S%L", b) && (w[b] = "day"); });
                }
                z.info = G(m, { higherRanks: w, totalRange: r * h });
                return z;
            };
            m.prototype.getDateFormat = function (c, m, k, l) { var y = this.dateFormat("%m-%d %H:%M:%S.%L", m), z = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, w = "millisecond"; for (e in a) {
                if (c === a.week && +this.dateFormat("%w", m) === k && "00:00:00.000" === y.substr(6)) {
                    var e = "week";
                    break;
                }
                if (a[e] > c) {
                    e = w;
                    break;
                }
                if (z[e] && y.substr(z[e]) !== "01-01 00:00:00.000".substr(z[e]))
                    break;
                "week" !== e && (w = e);
            } return this.resolveDTLFormat(l[e]).main; };
            return m;
        }();
        "";
        return g;
    });
    P(g, "Core/DefaultOptions.js", [g["Core/Chart/ChartDefaults.js"], g["Core/Color/Color.js"], g["Core/Globals.js"],
        g["Core/Color/Palettes.js"], g["Core/Time.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G) {
        g = g.parse;
        var C = G.merge, A = { colors: E.colors, symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: { loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "), weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " " }, global: {}, time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0 }, chart: d, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, labels: { style: { position: "absolute", color: "#333333" } }, legend: { enabled: !0, align: "center",
                alignColumns: !0, className: "highcharts-no-tooltip", layout: "horizontal", labelFormatter: function () { return this.name; }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom",
                x: 0, y: 0, title: { style: { fontWeight: "bold" } } }, loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: { enabled: !0, animation: B.svg, borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", headerShape: "callout",
                hideDelay: 500, padding: 8, shape: "callout", shared: !1, snap: B.isTouchDevice ? 25 : 10, headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: g("#f7f7f7").setOpacity(.85).get(), borderWidth: 1, shadow: !0, stickOnContact: !1, style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" }, useHTML: !1 }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right",
                    x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" } };
        A.chart.styledMode = !1;
        "";
        var t = new x(C(A.global, A.time));
        d = { defaultOptions: A, defaultTime: t, getOptions: function () { return A; }, setOptions: function (q) { C(!0, A, q); if (q.time || q.global)
                B.time ? B.time.update(C(A.global, A.time, q.global, q.time)) : B.time = t; return A; } };
        "";
        return d;
    });
    P(g, "Core/Animation/Fx.js", [g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = d.parse, x = g.win, G = B.isNumber, I = B.objectEach;
        return function () {
            function d(t, q, c) { this.pos = NaN; this.options = q; this.elem = t; this.prop = c; }
            d.prototype.dSetter = function () { var t = this.paths, q = t && t[0]; t = t && t[1]; var c = this.now || 0, l = []; if (1 !== c && q && t)
                if (q.length === t.length && 1 > c)
                    for (var a = 0; a < t.length; a++) {
                        for (var k = q[a], v = t[a], m = [], N = 0; N < v.length; N++) {
                            var F = k[N], L = v[N];
                            G(F) && G(L) && ("A" !== v[0] || 4 !== N && 5 !== N) ? m[N] = F + c * (L - F) : m[N] = L;
                        }
                        l.push(m);
                    }
                else
                    l = t;
            else
                l = this.toD || []; this.elem.attr("d", l, void 0, !0); };
            d.prototype.update =
                function () { var t = this.elem, q = this.prop, c = this.now, l = this.options.step; if (this[q + "Setter"])
                    this[q + "Setter"]();
                else
                    t.attr ? t.element && t.attr(q, c, null, !0) : t.style[q] = c + this.unit; l && l.call(t, c, this); };
            d.prototype.run = function (t, q, c) {
                var l = this, a = l.options, k = function (a) { return k.stopped ? !1 : l.step(a); }, v = x.requestAnimationFrame || function (a) { setTimeout(a, 13); }, m = function () { for (var a = 0; a < d.timers.length; a++)
                    d.timers[a]() || d.timers.splice(a--, 1); d.timers.length && v(m); };
                t !== q || this.elem["forceAnimate:" + this.prop] ?
                    (this.startTime = +new Date, this.start = t, this.end = q, this.unit = c, this.now = this.start, this.pos = 0, k.elem = this.elem, k.prop = this.prop, k() && 1 === d.timers.push(k) && v(m)) : (delete a.curAnim[this.prop], a.complete && 0 === Object.keys(a.curAnim).length && a.complete.call(this.elem));
            };
            d.prototype.step = function (t) {
                var q = +new Date, c = this.options, l = this.elem, a = c.complete, k = c.duration, v = c.curAnim;
                if (l.attr && !l.element)
                    t = !1;
                else if (t || q >= k + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var m = v[this.prop] = !0;
                    I(v, function (a) { !0 !== a && (m = !1); });
                    m && a && a.call(l);
                    t = !1;
                }
                else
                    this.pos = c.easing((q - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), t = !0;
                return t;
            };
            d.prototype.initPath = function (t, q, c) {
                function l(a, z) { for (; a.length < J;) {
                    var w = a[0], e = z[J - a.length];
                    e && "M" === w[0] && (a[0] = "C" === e[0] ? ["C", w[1], w[2], w[1], w[2], w[1], w[2]] : ["L", w[1], w[2]]);
                    a.unshift(w);
                    m && (w = a.pop(), a.push(a[a.length - 1], w));
                } }
                function a(a, z) {
                    for (; a.length < J;)
                        if (z = a[Math.floor(a.length / N) - 1].slice(), "C" === z[0] && (z[1] =
                            z[5], z[2] = z[6]), m) {
                            var w = a[Math.floor(a.length / N)].slice();
                            a.splice(a.length / 2, 0, z, w);
                        }
                        else
                            a.push(z);
                }
                var k = t.startX, v = t.endX;
                c = c.slice();
                var m = t.isArea, N = m ? 2 : 1;
                q = q && q.slice();
                if (!q)
                    return [c, c];
                if (k && v && v.length) {
                    for (t = 0; t < k.length; t++)
                        if (k[t] === v[0]) {
                            var F = t;
                            break;
                        }
                        else if (k[0] === v[v.length - k.length + t]) {
                            F = t;
                            var L = !0;
                            break;
                        }
                        else if (k[k.length - 1] === v[v.length - k.length + t]) {
                            F = k.length - t;
                            break;
                        }
                    "undefined" === typeof F && (q = []);
                }
                if (q.length && G(F)) {
                    var J = c.length + F * N;
                    L ? (l(q, c), a(c, q)) : (l(c, q), a(q, c));
                }
                return [q,
                    c];
            };
            d.prototype.fillSetter = function () { d.prototype.strokeSetter.apply(this, arguments); };
            d.prototype.strokeSetter = function () { this.elem.attr(this.prop, C(this.start).tweenTo(C(this.end), this.pos), void 0, !0); };
            d.timers = [];
            return d;
        }();
    });
    P(g, "Core/Animation/AnimationUtilities.js", [g["Core/Animation/Fx.js"], g["Core/Utilities.js"]], function (d, g) {
        function C(a) { return t(a) ? q({ duration: 500, defer: 0 }, a) : { duration: a ? 500 : 0, defer: 0 }; }
        function E(a, c) {
            for (var k = d.timers.length; k--;)
                d.timers[k].elem !== a || c && c !== d.timers[k].prop ||
                    (d.timers[k].stopped = !0);
        }
        var x = g.defined, G = g.getStyle, I = g.isArray, A = g.isNumber, t = g.isObject, q = g.merge, c = g.objectEach, l = g.pick;
        return { animate: function (a, k, l) {
                var m, v = "", F, L;
                if (!t(l)) {
                    var J = arguments;
                    l = { duration: J[2], easing: J[3], complete: J[4] };
                }
                A(l.duration) || (l.duration = 400);
                l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine;
                l.curAnim = q(k);
                c(k, function (c, z) {
                    E(a, z);
                    L = new d(a, l, z);
                    F = void 0;
                    "d" === z && I(k.d) ? (L.paths = L.initPath(a, a.pathArray, k.d), L.toD = k.d, m = 0, F = 1) : a.attr ?
                        m = a.attr(z) : (m = parseFloat(G(a, z)) || 0, "opacity" !== z && (v = "px"));
                    F || (F = c);
                    "string" === typeof F && F.match("px") && (F = F.replace(/px/g, ""));
                    L.run(m, F, v);
                });
            }, animObject: C, getDeferredAnimation: function (a, c, l) { var m = C(c), k = 0, v = 0; (l ? [l] : a.series).forEach(function (a) { a = C(a.options.animation); k = c && x(c.defer) ? m.defer : Math.max(k, a.duration + a.defer); v = Math.min(m.duration, a.duration); }); a.renderer.forExport && (k = 0); return { defer: Math.max(0, k - v), duration: Math.min(k, v) }; }, setAnimation: function (a, c) {
                c.renderer.globalAnimation =
                    l(a, c.options.chart.animation, !0);
            }, stop: E };
    });
    P(g, "Core/Renderer/HTML/AST.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = d.SVG_NS, E = g.attr, x = g.createElement, G = g.css, I = g.error, A = g.isFunction, t = g.isString, q = g.objectEach, c = g.splat, l = (g = d.win.trustedTypes) && A(g.createPolicy) && g.createPolicy("highcharts", { createHTML: function (a) { return a; } }), a = l ? l.createHTML("") : "";
        try {
            var k = !!(new DOMParser).parseFromString(a, "text/html");
        }
        catch (v) {
            k = !1;
        }
        A = function () {
            function v(a) {
                this.nodes = "string" ===
                    typeof a ? this.parseMarkup(a) : a;
            }
            v.filterUserAttributes = function (a) { q(a, function (c, m) { var k = !0; -1 === v.allowedAttributes.indexOf(m) && (k = !1); -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(m) && (k = t(c) && v.allowedReferences.some(function (a) { return 0 === c.indexOf(a); })); k || (I(33, !1, void 0, { "Invalid attribute in config": "".concat(m) }), delete a[m]); }); return a; };
            v.parseStyle = function (a) {
                return a.split(";").reduce(function (a, c) {
                    c = c.split(":").map(function (a) { return a.trim(); });
                    var m = c.shift();
                    m && c.length &&
                        (a[m.replace(/-([a-z])/g, function (a) { return a[1].toUpperCase(); })] = c.join(":"));
                    return a;
                }, {});
            };
            v.setElementHTML = function (a, c) { a.innerHTML = v.emptyHTML; c && (new v(c)).addToDOM(a); };
            v.prototype.addToDOM = function (a) {
                function m(a, k) {
                    var l;
                    c(a).forEach(function (a) {
                        var c = a.tagName, w = a.textContent ? d.doc.createTextNode(a.textContent) : void 0, e = v.bypassHTMLFiltering;
                        if (c)
                            if ("#text" === c)
                                var r = w;
                            else if (-1 !== v.allowedTags.indexOf(c) || e) {
                                c = d.doc.createElementNS("svg" === c ? C : k.namespaceURI || C, c);
                                var h = a.attributes ||
                                    {};
                                q(a, function (e, f) { "tagName" !== f && "attributes" !== f && "children" !== f && "style" !== f && "textContent" !== f && (h[f] = e); });
                                E(c, e ? h : v.filterUserAttributes(h));
                                a.style && G(c, a.style);
                                w && c.appendChild(w);
                                m(a.children || [], c);
                                r = c;
                            }
                            else
                                I(33, !1, void 0, { "Invalid tagName in config": c });
                        r && k.appendChild(r);
                        l = r;
                    });
                    return l;
                }
                return m(this.nodes, a);
            };
            v.prototype.parseMarkup = function (a) {
                var c = [];
                a = a.trim().replace(/ style="/g, ' data-style="');
                if (k)
                    a = (new DOMParser).parseFromString(l ? l.createHTML(a) : a, "text/html");
                else {
                    var m = x("div");
                    m.innerHTML = a;
                    a = { body: m };
                }
                var q = function (a, c) { var z = a.nodeName.toLowerCase(), w = { tagName: z }; "#text" === z && (w.textContent = a.textContent || ""); if (z = a.attributes) {
                    var e = {};
                    [].forEach.call(z, function (h) { "data-style" === h.name ? w.style = v.parseStyle(h.value) : e[h.name] = h.value; });
                    w.attributes = e;
                } if (a.childNodes.length) {
                    var r = [];
                    [].forEach.call(a.childNodes, function (e) { q(e, r); });
                    r.length && (w.children = r);
                } c.push(w); };
                [].forEach.call(a.body.childNodes, function (a) { return q(a, c); });
                return c;
            };
            v.allowedAttributes =
                "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            v.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            v.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            v.emptyHTML = a;
            v.bypassHTMLFiltering = !1;
            return v;
        }();
        "";
        return A;
    });
    P(g, "Core/FormatUtilities.js", [g["Core/DefaultOptions.js"], g["Core/Utilities.js"]], function (d, g) {
        function C(q, c, l, a) {
            q = +q || 0;
            c = +c;
            var k = E.lang, v = (q.toString().split(".")[1] || "").split("e")[0].length, m = q.toString().split("e"), N = c;
            if (-1 === c)
                c = Math.min(v, 20);
            else if (!I(c))
                c = 2;
            else if (c && m[1] && 0 > m[1]) {
                var F = c + +m[1];
                0 <= F ? (m[0] = (+m[0]).toExponential(F).split("e")[0], c = F) : (m[0] = m[0].split(".")[0] || 0, q = 20 > c ? (m[0] * Math.pow(10, m[1])).toFixed(c) : 0, m[1] = 0);
            }
            F = (Math.abs(m[1] ? m[0] : q) + Math.pow(10, -Math.max(c, v) -
                1)).toFixed(c);
            v = String(t(F));
            var L = 3 < v.length ? v.length % 3 : 0;
            l = A(l, k.decimalPoint);
            a = A(a, k.thousandsSep);
            q = (0 > q ? "-" : "") + (L ? v.substr(0, L) + a : "");
            q = 0 > +m[1] && !N ? "0" : q + v.substr(L).replace(/(\d{3})(?=\d)/g, "$1" + a);
            c && (q += l + F.slice(-c));
            m[1] && 0 !== +q && (q += "e" + m[1]);
            return q;
        }
        var E = d.defaultOptions, x = d.defaultTime, G = g.getNestedProperty, I = g.isNumber, A = g.pick, t = g.pInt;
        return { dateFormat: function (q, c, l) { return x.dateFormat(q, c, l); }, format: function (q, c, l) {
                var a = "{", k = !1, v = /f$/, m = /\.([0-9])/, N = E.lang, F = l && l.time ||
                    x;
                l = l && l.numberFormatter || C;
                for (var L = []; q;) {
                    var J = q.indexOf(a);
                    if (-1 === J)
                        break;
                    var y = q.slice(0, J);
                    if (k) {
                        y = y.split(":");
                        a = G(y.shift() || "", c);
                        if (y.length && "number" === typeof a)
                            if (y = y.join(":"), v.test(y)) {
                                var z = parseInt((y.match(m) || ["", "-1"])[1], 10);
                                null !== a && (a = l(a, z, N.decimalPoint, -1 < y.indexOf(",") ? N.thousandsSep : ""));
                            }
                            else
                                a = F.dateFormat(y, a);
                        L.push(a);
                    }
                    else
                        L.push(y);
                    q = q.slice(J + 1);
                    a = (k = !k) ? "}" : "{";
                }
                L.push(q);
                return L.join("");
            }, numberFormat: C };
    });
    P(g, "Core/Renderer/RendererUtilities.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.clamp, B = d.pick, E = d.stableSort, x;
        (function (d) {
            function x(d, t, q) {
                var c = d, l = c.reducedLen || t, a = function (a, c) { return (c.rank || 0) - (a.rank || 0); }, k = function (a, c) { return a.target - c.target; }, v, m = !0, N = [], F = 0;
                for (v = d.length; v--;)
                    F += d[v].size;
                if (F > l) {
                    E(d, a);
                    for (F = v = 0; F <= l;)
                        F += d[v].size, v++;
                    N = d.splice(v - 1, d.length);
                }
                E(d, k);
                for (d = d.map(function (a) { return { size: a.size, targets: [a.target], align: B(a.align, .5) }; }); m;) {
                    for (v = d.length; v--;)
                        l = d[v], a = (Math.min.apply(0, l.targets) + Math.max.apply(0, l.targets)) /
                            2, l.pos = g(a - l.size * l.align, 0, t - l.size);
                    v = d.length;
                    for (m = !1; v--;)
                        0 < v && d[v - 1].pos + d[v - 1].size > d[v].pos && (d[v - 1].size += d[v].size, d[v - 1].targets = d[v - 1].targets.concat(d[v].targets), d[v - 1].align = .5, d[v - 1].pos + d[v - 1].size > t && (d[v - 1].pos = t - d[v - 1].size), d.splice(v, 1), m = !0);
                }
                c.push.apply(c, N);
                v = 0;
                d.some(function (a) {
                    var m = 0;
                    return (a.targets || []).some(function () {
                        c[v].pos = a.pos + m;
                        if ("undefined" !== typeof q && Math.abs(c[v].pos - c[v].target) > q)
                            return c.slice(0, v + 1).forEach(function (a) { return delete a.pos; }), c.reducedLen =
                                (c.reducedLen || t) - .1 * t, c.reducedLen > .1 * t && x(c, t, q), !0;
                        m += c[v].size;
                        v++;
                        return !1;
                    });
                });
                E(c, k);
                return c;
            }
            d.distribute = x;
        })(x || (x = {}));
        return x;
    });
    P(g, "Core/Renderer/SVG/SVGElement.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Renderer/HTML/AST.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g, B, E, x) {
        var C = d.animate, I = d.animObject, A = d.stop, t = E.deg2rad, q = E.doc, c = E.noop, l = E.svg, a = E.SVG_NS, k = E.win, v = x.addEvent, m = x.attr, N = x.createElement, F = x.css, L = x.defined, J = x.erase, y = x.extend, z = x.fireEvent, w = x.isArray, e = x.isFunction, r = x.isNumber, h = x.isString, n = x.merge, f = x.objectEach, b = x.pick, D = x.pInt, H = x.syncTimeout, p = x.uniqueKey;
        d = function () {
            function u() { this.element = void 0; this.onEvents = {}; this.opacity = 1; this.renderer = void 0; this.SVG_NS = a; this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" "); }
            u.prototype._defaultGetter = function (f) {
                f = b(this[f + "Value"], this[f], this.element ? this.element.getAttribute(f) : null, 0);
                /^[\-0-9\.]+$/.test(f) &&
                    (f = parseFloat(f));
                return f;
            };
            u.prototype._defaultSetter = function (b, f, e) { e.setAttribute(f, b); };
            u.prototype.add = function (b) { var f = this.renderer, e = this.element; b && (this.parentGroup = b); this.parentInverted = b && b.inverted; "undefined" !== typeof this.textStr && "text" === this.element.nodeName && f.buildText(this); this.added = !0; if (!b || b.handleZ || this.zIndex)
                var h = this.zIndexSetter(); h || (b ? b.element : f.box).appendChild(e); if (this.onAdd)
                this.onAdd(); return this; };
            u.prototype.addClass = function (b, f) {
                var e = f ? "" : this.attr("class") ||
                    "";
                b = (b || "").split(/ /g).reduce(function (b, f) { -1 === e.indexOf(f) && b.push(f); return b; }, e ? [e] : []).join(" ");
                b !== e && this.attr("class", b);
                return this;
            };
            u.prototype.afterSetters = function () { this.doTransform && (this.updateTransform(), this.doTransform = !1); };
            u.prototype.align = function (f, e, M) {
                var p = {}, a = this.renderer, n = a.alignedObjects, K, u, Q;
                if (f) {
                    if (this.alignOptions = f, this.alignByTranslate = e, !M || h(M))
                        this.alignTo = K = M || "renderer", J(n, this), n.push(this), M = void 0;
                }
                else
                    f = this.alignOptions, e = this.alignByTranslate,
                        K = this.alignTo;
                M = b(M, a[K], "scrollablePlotBox" === K ? a.plotBox : void 0, a);
                K = f.align;
                var r = f.verticalAlign;
                a = (M.x || 0) + (f.x || 0);
                n = (M.y || 0) + (f.y || 0);
                "right" === K ? u = 1 : "center" === K && (u = 2);
                u && (a += (M.width - (f.width || 0)) / u);
                p[e ? "translateX" : "x"] = Math.round(a);
                "bottom" === r ? Q = 1 : "middle" === r && (Q = 2);
                Q && (n += (M.height - (f.height || 0)) / Q);
                p[e ? "translateY" : "y"] = Math.round(n);
                this[this.placed ? "animate" : "attr"](p);
                this.placed = !0;
                this.alignAttr = p;
                return this;
            };
            u.prototype.alignSetter = function (b) {
                var f = { left: "start", center: "middle",
                    right: "end" };
                f[b] && (this.alignValue = b, this.element.setAttribute("text-anchor", f[b]));
            };
            u.prototype.animate = function (e, h, M) { var p = this, a = I(b(h, this.renderer.globalAnimation, !0)); h = a.defer; b(q.hidden, q.msHidden, q.webkitHidden, !1) && (a.duration = 0); 0 !== a.duration ? (M && (a.complete = M), H(function () { p.element && C(p, e, a); }, h)) : (this.attr(e, void 0, M || a.complete), f(e, function (b, f) { a.step && a.step.call(this, b, { prop: f, pos: 1, elem: this }); }, this)); return this; };
            u.prototype.applyTextOutline = function (b) {
                var f = this.element;
                -1 !== b.indexOf("contrast") && (b = b.replace(/contrast/g, this.renderer.getContrast(f.style.fill)));
                var e = b.split(" ");
                b = e[e.length - 1];
                if ((e = e[0]) && "none" !== e && E.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    e = e.replace(/(^[\d\.]+)(.*?)$/g, function (b, f, e) { return 2 * Number(f) + e; });
                    this.removeTextOutline();
                    var h = q.createElementNS(a, "tspan");
                    m(h, { "class": "highcharts-text-outline", fill: b, stroke: b, "stroke-width": e, "stroke-linejoin": "round" });
                    [].forEach.call(f.childNodes, function (b) {
                        var f = b.cloneNode(!0);
                        f.removeAttribute &&
                            ["fill", "stroke", "stroke-width", "stroke"].forEach(function (b) { return f.removeAttribute(b); });
                        h.appendChild(f);
                    });
                    var p = q.createElementNS(a, "tspan");
                    p.textContent = "\u200b";
                    ["x", "y"].forEach(function (b) { var e = f.getAttribute(b); e && p.setAttribute(b, e); });
                    h.appendChild(p);
                    f.insertBefore(h, f.firstChild);
                }
            };
            u.prototype.attr = function (b, e, h, p) {
                var M = this.element, a = this.symbolCustomAttribs, O, n = this, K, u;
                if ("string" === typeof b && "undefined" !== typeof e) {
                    var r = b;
                    b = {};
                    b[r] = e;
                }
                "string" === typeof b ? n = (this[b + "Getter"] ||
                    this._defaultGetter).call(this, b, M) : (f(b, function (f, e) { K = !1; p || A(this, e); this.symbolName && -1 !== a.indexOf(e) && (O || (this.symbolAttr(b), O = !0), K = !0); !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0); K || (u = this[e + "Setter"] || this._defaultSetter, u.call(this, f, e, M), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, f, u)); }, this), this.afterSetters());
                h && h.call(this);
                return n;
            };
            u.prototype.clip = function (b) {
                return this.attr("clip-path", b ? "url(" +
                    this.renderer.url + "#" + b.id + ")" : "none");
            };
            u.prototype.crisp = function (b, f) { f = f || b.strokeWidth || 0; var e = Math.round(f) % 2 / 2; b.x = Math.floor(b.x || this.x || 0) + e; b.y = Math.floor(b.y || this.y || 0) + e; b.width = Math.floor((b.width || this.width || 0) - 2 * e); b.height = Math.floor((b.height || this.height || 0) - 2 * e); L(b.strokeWidth) && (b.strokeWidth = f); return b; };
            u.prototype.complexColor = function (b, e, h) {
                var M = this.renderer, a, K, u, r, Q, c, D, H, m, k, l = [], y;
                z(this.renderer, "complexColor", { args: arguments }, function () {
                    b.radialGradient ? K = "radialGradient" :
                        b.linearGradient && (K = "linearGradient");
                    if (K) {
                        u = b[K];
                        Q = M.gradients;
                        c = b.stops;
                        m = h.radialReference;
                        w(u) && (b[K] = u = { x1: u[0], y1: u[1], x2: u[2], y2: u[3], gradientUnits: "userSpaceOnUse" });
                        "radialGradient" === K && m && !L(u.gradientUnits) && (r = u, u = n(u, M.getRadialAttr(m, r), { gradientUnits: "userSpaceOnUse" }));
                        f(u, function (b, f) { "id" !== f && l.push(f, b); });
                        f(c, function (b) { l.push(b); });
                        l = l.join(",");
                        if (Q[l])
                            k = Q[l].attr("id");
                        else {
                            u.id = k = p();
                            var O = Q[l] = M.createElement(K).attr(u).add(M.defs);
                            O.radAttr = r;
                            O.stops = [];
                            c.forEach(function (b) {
                                0 ===
                                    b[1].indexOf("rgba") ? (a = B.parse(b[1]), D = a.get("rgb"), H = a.get("a")) : (D = b[1], H = 1);
                                b = M.createElement("stop").attr({ offset: b[0], "stop-color": D, "stop-opacity": H }).add(O);
                                O.stops.push(b);
                            });
                        }
                        y = "url(" + M.url + "#" + k + ")";
                        h.setAttribute(e, y);
                        h.gradient = l;
                        b.toString = function () { return y; };
                    }
                });
            };
            u.prototype.css = function (b) {
                var e = this.styles, h = {}, p = this.element, a = !e;
                b.color && (b.fill = b.color);
                e && f(b, function (b, f) { e && e[f] !== b && (h[f] = b, a = !0); });
                if (a) {
                    e && (b = y(e, h));
                    if (null === b.width || "auto" === b.width)
                        delete this.textWidth;
                    else if ("text" === p.nodeName.toLowerCase() && b.width)
                        var u = this.textWidth = D(b.width);
                    this.styles = b;
                    u && !l && this.renderer.forExport && delete b.width;
                    var K = n(b);
                    p.namespaceURI === this.SVG_NS && ["textOutline", "textOverflow", "width"].forEach(function (b) { return K && delete K[b]; });
                    F(p, K);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b.textOutline && this.applyTextOutline(b.textOutline));
                }
                return this;
            };
            u.prototype.dashstyleSetter = function (f) {
                var e = this["stroke-width"];
                "inherit" === e && (e =
                    1);
                if (f = f && f.toLowerCase()) {
                    var h = f.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (f = h.length; f--;)
                        h[f] = "" + D(h[f]) * b(e, NaN);
                    f = h.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", f);
                }
            };
            u.prototype.destroy = function () {
                var b = this, e = b.element || {}, h = b.renderer, p = e.ownerSVGElement, a = h.isSVG &&
                    "SPAN" === e.nodeName && b.parentGroup || void 0;
                e.onclick = e.onmouseout = e.onmouseover = e.onmousemove = e.point = null;
                A(b);
                if (b.clipPath && p) {
                    var n = b.clipPath;
                    [].forEach.call(p.querySelectorAll("[clip-path],[CLIP-PATH]"), function (b) { -1 < b.getAttribute("clip-path").indexOf(n.element.id) && b.removeAttribute("clip-path"); });
                    b.clipPath = n.destroy();
                }
                if (b.stops) {
                    for (p = 0; p < b.stops.length; p++)
                        b.stops[p].destroy();
                    b.stops.length = 0;
                    b.stops = void 0;
                }
                b.safeRemoveChild(e);
                for (h.styledMode || b.destroyShadows(); a && a.div && 0 === a.div.childNodes.length;)
                    e =
                        a.parentGroup, b.safeRemoveChild(a.div), delete a.div, a = e;
                b.alignTo && J(h.alignedObjects, b);
                f(b, function (f, e) { b[e] && b[e].parentGroup === b && b[e].destroy && b[e].destroy(); delete b[e]; });
            };
            u.prototype.destroyShadows = function () { (this.shadows || []).forEach(function (b) { this.safeRemoveChild(b); }, this); this.shadows = void 0; };
            u.prototype.destroyTextPath = function (b, f) {
                var e = b.getElementsByTagName("text")[0];
                if (e) {
                    if (e.removeAttribute("dx"), e.removeAttribute("dy"), f.element.setAttribute("id", ""), this.textPathWrapper &&
                        e.getElementsByTagName("textPath").length) {
                        for (b = this.textPathWrapper.element.childNodes; b.length;)
                            e.appendChild(b[0]);
                        e.removeChild(this.textPathWrapper.element);
                    }
                }
                else if (b.getAttribute("dx") || b.getAttribute("dy"))
                    b.removeAttribute("dx"), b.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy());
            };
            u.prototype.dSetter = function (b, f, e) {
                w(b) && ("string" === typeof b[0] && (b = this.renderer.pathToSegments(b)), this.pathArray = b, b = b.reduce(function (b, f, e) {
                    return f && f.join ?
                        (e ? b + " " : "") + f.join(" ") : (f || "").toString();
                }, ""));
                /(NaN| {2}|^$)/.test(b) && (b = "M 0 0");
                this[f] !== b && (e.setAttribute(f, b), this[f] = b);
            };
            u.prototype.fadeOut = function (f) { var e = this; e.animate({ opacity: 0 }, { duration: b(f, 150), complete: function () { e.hide(); } }); };
            u.prototype.fillSetter = function (b, f, e) { "string" === typeof b ? e.setAttribute(f, b) : b && this.complexColor(b, f, e); };
            u.prototype.getBBox = function (f, h) {
                var p = this.alignValue, a = this.element, n = this.renderer, r = this.styles, w = this.textStr, c = n.cache, Q = n.cacheKeys, D = a.namespaceURI ===
                    this.SVG_NS;
                h = b(h, this.rotation, 0);
                var H = n.styledMode ? a && u.prototype.getStyle.call(a, "font-size") : r && r.fontSize, K;
                if (L(w)) {
                    var m = w.toString();
                    -1 === m.indexOf("<") && (m = m.replace(/[0-9]/g, "0"));
                    m += ["", h, H, this.textWidth, p, r && r.textOverflow, r && r.fontWeight].join();
                }
                m && !f && (K = c[m]);
                if (!K) {
                    if (D || n.forExport) {
                        try {
                            var z = this.fakeTS && function (b) { var f = a.querySelector(".highcharts-text-outline"); f && F(f, { display: b }); };
                            e(z) && z("none");
                            K = a.getBBox ? y({}, a.getBBox()) : { width: a.offsetWidth, height: a.offsetHeight };
                            e(z) &&
                                z("");
                        }
                        catch (da) {
                            "";
                        }
                        if (!K || 0 > K.width)
                            K = { x: 0, y: 0, width: 0, height: 0 };
                    }
                    else
                        K = this.htmlGetBBox();
                    if (n.isSVG && (n = K.width, f = K.height, D && (K.height = f = { "11px,17": 14, "13px,20": 16 }["" + (H || "") + ",".concat(Math.round(f))] || f), h)) {
                        D = Number(a.getAttribute("y") || 0) - K.y;
                        p = { right: 1, center: .5 }[p || 0] || 0;
                        r = h * t;
                        H = (h - 90) * t;
                        var k = n * Math.cos(r);
                        h = n * Math.sin(r);
                        z = Math.cos(H);
                        r = Math.sin(H);
                        n = K.x + p * (n - k) + D * z;
                        H = n + k;
                        z = H - f * z;
                        k = z - k;
                        D = K.y + D - p * h + D * r;
                        p = D + h;
                        f = p - f * r;
                        h = f - h;
                        K.x = Math.min(n, H, z, k);
                        K.y = Math.min(D, p, f, h);
                        K.width = Math.max(n, H, z, k) - K.x;
                        K.height = Math.max(D, p, f, h) - K.y;
                    }
                    if (m && ("" === w || 0 < K.height)) {
                        for (; 250 < Q.length;)
                            delete c[Q.shift()];
                        c[m] || Q.push(m);
                        c[m] = K;
                    }
                }
                return K;
            };
            u.prototype.getStyle = function (b) { return k.getComputedStyle(this.element || this, "").getPropertyValue(b); };
            u.prototype.hasClass = function (b) { return -1 !== ("" + this.attr("class")).split(" ").indexOf(b); };
            u.prototype.hide = function () { return this.attr({ visibility: "hidden" }); };
            u.prototype.htmlGetBBox = function () { return { height: 0, width: 0, x: 0, y: 0 }; };
            u.prototype.init = function (b, f) { this.element = "span" === f ? N(f) : q.createElementNS(this.SVG_NS, f); this.renderer = b; z(this, "afterInit"); };
            u.prototype.invert = function (b) { this.inverted = b; this.updateTransform(); return this; };
            u.prototype.on = function (b, f) { var e = this.onEvents; if (e[b])
                e[b](); e[b] = v(this.element, b, f); return this; };
            u.prototype.opacitySetter = function (b, f, e) { this.opacity = b = Number(Number(b).toFixed(3)); e.setAttribute(f, b); };
            u.prototype.removeClass = function (b) {
                return this.attr("class", ("" + this.attr("class")).replace(h(b) ? new RegExp("(^| )".concat(b, "( |$)")) : b, " ").replace(/ +/g, " ").trim());
            };
            u.prototype.removeTextOutline = function () { var b = this.element.querySelector("tspan.highcharts-text-outline"); b && this.safeRemoveChild(b); };
            u.prototype.safeRemoveChild = function (b) { var f = b.parentNode; f && f.removeChild(b); };
            u.prototype.setRadialReference = function (b) { var f = this.element.gradient && this.renderer.gradients[this.element.gradient]; this.element.radialReference = b; f && f.radAttr && f.animate(this.renderer.getRadialAttr(b, f.radAttr)); return this; };
            u.prototype.setTextPath =
                function (b, e) {
                    var h = this.element, a = this.text ? this.text.element : h, u = { textAnchor: "text-anchor" }, w = !1, D = this.textPathWrapper, H = !D;
                    e = n(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, e);
                    var Q = g.filterUserAttributes(e.attributes);
                    if (b && e && e.enabled) {
                        D && null === D.element.parentNode ? (H = !0, D = D.destroy()) : D && this.removeTextOutline.call(D.parentGroup);
                        this.options && this.options.padding && (Q.dx = -this.options.padding);
                        D || (this.textPathWrapper = D = this.renderer.createElement("textPath"), w =
                            !0);
                        var m = D.element;
                        (e = b.element.getAttribute("id")) || b.element.setAttribute("id", e = p());
                        if (H)
                            for (a.setAttribute("y", 0), r(Q.dx) && a.setAttribute("x", -Q.dx), b = [].slice.call(a.childNodes), H = 0; H < b.length; H++) {
                                var z = b[H];
                                z.nodeType !== k.Node.TEXT_NODE && "tspan" !== z.nodeName || m.appendChild(z);
                            }
                        w && D && D.add({ element: a });
                        m.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + e);
                        L(Q.dy) && (m.parentNode.setAttribute("dy", Q.dy), delete Q.dy);
                        L(Q.dx) && (m.parentNode.setAttribute("dx", Q.dx), delete Q.dx);
                        f(Q, function (b, f) { m.setAttribute(u[f] || f, b); });
                        h.removeAttribute("transform");
                        this.removeTextOutline.call(D);
                        this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
                        this.applyTextOutline = this.updateTransform = c;
                    }
                    else
                        D && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(h, b), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                    return this;
                };
            u.prototype.shadow = function (b, e, h) {
                var p = [], a = this.element, M = this.oldShadowOptions, n = { color: "#000000", offsetX: this.parentInverted ? -1 : 1, offsetY: this.parentInverted ? -1 : 1, opacity: .15, width: 3 }, u = !1, r;
                !0 === b ? r = n : "object" === typeof b && (r = y(n, b));
                r && (r && M && f(r, function (b, f) { b !== M[f] && (u = !0); }), u && this.destroyShadows(), this.oldShadowOptions = r);
                if (!r)
                    this.destroyShadows();
                else if (!this.shadows) {
                    var D = r.opacity / r.width;
                    var w = this.parentInverted ? "translate(".concat(r.offsetY, ", ").concat(r.offsetX, ")") : "translate(".concat(r.offsetX, ", ").concat(r.offsetY, ")");
                    for (n = 1; n <=
                        r.width; n++) {
                        var c = a.cloneNode(!1);
                        var H = 2 * r.width + 1 - 2 * n;
                        m(c, { stroke: b.color || "#000000", "stroke-opacity": D * n, "stroke-width": H, transform: w, fill: "none" });
                        c.setAttribute("class", (c.getAttribute("class") || "") + " highcharts-shadow");
                        h && (m(c, "height", Math.max(m(c, "height") - H, 0)), c.cutHeight = H);
                        e ? e.element.appendChild(c) : a.parentNode && a.parentNode.insertBefore(c, a);
                        p.push(c);
                    }
                    this.shadows = p;
                }
                return this;
            };
            u.prototype.show = function (b) { void 0 === b && (b = !0); return this.attr({ visibility: b ? "inherit" : "visible" }); };
            u.prototype.strokeSetter =
                function (b, f, e) { this[f] = b; this.stroke && this["stroke-width"] ? (u.prototype.fillSetter.call(this, this.stroke, "stroke", e), e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === b && this.hasStroke ? (e.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (e.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0); };
            u.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode)
                    return this["stroke-width"] || 0;
                var b = this.getStyle("stroke-width"), f = 0;
                if (b.indexOf("px") === b.length - 2)
                    f = D(b);
                else if ("" !== b) {
                    var e = q.createElementNS(a, "rect");
                    m(e, { width: b, "stroke-width": 0 });
                    this.element.parentNode.appendChild(e);
                    f = e.getBBox().width;
                    e.parentNode.removeChild(e);
                }
                return f;
            };
            u.prototype.symbolAttr = function (f) { var e = this; "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (h) { e[h] = b(f[h], e[h]); }); e.attr({ d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e) }); };
            u.prototype.textSetter =
                function (b) { b !== this.textStr && (delete this.textPxLength, this.textStr = b, this.added && this.renderer.buildText(this)); };
            u.prototype.titleSetter = function (f) { var e = this.element, h = e.getElementsByTagName("title")[0] || q.createElementNS(this.SVG_NS, "title"); e.insertBefore ? e.insertBefore(h, e.firstChild) : e.appendChild(h); h.textContent = String(b(f, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">"); };
            u.prototype.toFront = function () { var b = this.element; b.parentNode.appendChild(b); return this; };
            u.prototype.translate =
                function (b, f) { return this.attr({ translateX: b, translateY: f }); };
            u.prototype.updateShadows = function (b, f, e) { var h = this.shadows; if (h)
                for (var p = h.length; p--;)
                    e.call(h[p], "height" === b ? Math.max(f - (h[p].cutHeight || 0), 0) : "d" === b ? this.d : f, b, h[p]); };
            u.prototype.updateTransform = function () {
                var f = this.scaleX, e = this.scaleY, h = this.inverted, p = this.rotation, a = this.matrix, n = this.element, u = this.translateX || 0, r = this.translateY || 0;
                h && (u += this.width, r += this.height);
                u = ["translate(" + u + "," + r + ")"];
                L(a) && u.push("matrix(" + a.join(",") +
                    ")");
                h ? u.push("rotate(90) scale(-1,1)") : p && u.push("rotate(" + p + " " + b(this.rotationOriginX, n.getAttribute("x"), 0) + " " + b(this.rotationOriginY, n.getAttribute("y") || 0) + ")");
                (L(f) || L(e)) && u.push("scale(" + b(f, 1) + " " + b(e, 1) + ")");
                u.length && n.setAttribute("transform", u.join(" "));
            };
            u.prototype.visibilitySetter = function (b, f, e) { "inherit" === b ? e.removeAttribute(f) : this[f] !== b && e.setAttribute(f, b); this[f] = b; };
            u.prototype.xGetter = function (b) { "circle" === this.element.nodeName && ("x" === b ? b = "cx" : "y" === b && (b = "cy")); return this._defaultGetter(b); };
            u.prototype.zIndexSetter = function (b, f) {
                var e = this.renderer, h = this.parentGroup, p = (h || e).element || e.box, a = this.element;
                e = p === e.box;
                var n = !1;
                var u = this.added;
                var r;
                L(b) ? (a.setAttribute("data-z-index", b), b = +b, this[f] === b && (u = !1)) : L(this[f]) && a.removeAttribute("data-z-index");
                this[f] = b;
                if (u) {
                    (b = this.zIndex) && h && (h.handleZ = !0);
                    f = p.childNodes;
                    for (r = f.length - 1; 0 <= r && !n; r--) {
                        h = f[r];
                        u = h.getAttribute("data-z-index");
                        var w = !L(u);
                        if (h !== a)
                            if (0 > b && w && !e && !r)
                                p.insertBefore(a, f[r]), n = !0;
                            else if (D(u) <= b || w && (!L(b) ||
                                0 <= b))
                                p.insertBefore(a, f[r + 1] || null), n = !0;
                    }
                    n || (p.insertBefore(a, f[e ? 3 : 0] || null), n = !0);
                }
                return n;
            };
            return u;
        }();
        d.prototype["stroke-widthSetter"] = d.prototype.strokeSetter;
        d.prototype.yGetter = d.prototype.xGetter;
        d.prototype.matrixSetter = d.prototype.rotationOriginXSetter = d.prototype.rotationOriginYSetter = d.prototype.rotationSetter = d.prototype.scaleXSetter = d.prototype.scaleYSetter = d.prototype.translateXSetter = d.prototype.translateYSetter = d.prototype.verticalAlignSetter = function (b, f) {
            this[f] = b;
            this.doTransform =
                !0;
        };
        "";
        return d;
    });
    P(g, "Core/Renderer/RendererRegistry.js", [g["Core/Globals.js"]], function (d) { var g; (function (g) { g.rendererTypes = {}; var C; g.getRendererType = function (d) { void 0 === d && (d = C); return g.rendererTypes[d] || g.rendererTypes[C]; }; g.registerRendererType = function (x, B, I) { g.rendererTypes[x] = B; if (!C || I)
        C = x, d.Renderer = B; }; })(g || (g = {})); return g; });
    P(g, "Core/Renderer/SVG/SVGLabel.js", [g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = this && this.__extends || function () {
            var q = function (c, l) { q = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var k in c)
                c.hasOwnProperty(k) && (a[k] = c[k]); }; return q(c, l); };
            return function (c, l) { function a() { this.constructor = c; } q(c, l); c.prototype = null === l ? Object.create(l) : (a.prototype = l.prototype, new a); };
        }(), E = g.defined, x = g.extend, G = g.isNumber, I = g.merge, A = g.pick, t = g.removeEvent;
        return function (q) {
            function c(l, a, k, v, m, N, F, d, J, y) {
                var z = q.call(this) || this;
                z.paddingLeftSetter = z.paddingSetter;
                z.paddingRightSetter =
                    z.paddingSetter;
                z.init(l, "g");
                z.textStr = a;
                z.x = k;
                z.y = v;
                z.anchorX = N;
                z.anchorY = F;
                z.baseline = J;
                z.className = y;
                z.addClass("button" === y ? "highcharts-no-tooltip" : "highcharts-label");
                y && z.addClass("highcharts-" + y);
                z.text = l.text(void 0, 0, 0, d).attr({ zIndex: 1 });
                var w;
                "string" === typeof m && ((w = /^url\((.*?)\)$/.test(m)) || z.renderer.symbols[m]) && (z.symbolKey = m);
                z.bBox = c.emptyBBox;
                z.padding = 3;
                z.baselineOffset = 0;
                z.needsBox = l.styledMode || w;
                z.deferredAttr = {};
                z.alignFactor = 0;
                return z;
            }
            C(c, q);
            c.prototype.alignSetter = function (c) {
                c =
                    { left: 0, center: .5, right: 1 }[c];
                c !== this.alignFactor && (this.alignFactor = c, this.bBox && G(this.xSetting) && this.attr({ x: this.xSetting }));
            };
            c.prototype.anchorXSetter = function (c, a) { this.anchorX = c; this.boxAttr(a, Math.round(c) - this.getCrispAdjust() - this.xSetting); };
            c.prototype.anchorYSetter = function (c, a) { this.anchorY = c; this.boxAttr(a, c - this.ySetting); };
            c.prototype.boxAttr = function (c, a) { this.box ? this.box.attr(c, a) : this.deferredAttr[c] = a; };
            c.prototype.css = function (l) {
                if (l) {
                    var a = {};
                    l = I(l);
                    c.textProps.forEach(function (c) {
                        "undefined" !==
                            typeof l[c] && (a[c] = l[c], delete l[c]);
                    });
                    this.text.css(a);
                    var k = "width" in a;
                    "fontSize" in a || "fontWeight" in a ? this.updateTextPadding() : k && this.updateBoxSize();
                }
                return d.prototype.css.call(this, l);
            };
            c.prototype.destroy = function () { t(this.element, "mouseenter"); t(this.element, "mouseleave"); this.text && this.text.destroy(); this.box && (this.box = this.box.destroy()); d.prototype.destroy.call(this); };
            c.prototype.fillSetter = function (c, a) { c && (this.needsBox = !0); this.fill = c; this.boxAttr(a, c); };
            c.prototype.getBBox = function () {
                this.textStr &&
                    0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var c = this.padding, a = A(this.paddingLeft, c);
                return { width: this.width, height: this.height, x: this.bBox.x - a, y: this.bBox.y - c };
            };
            c.prototype.getCrispAdjust = function () { return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2; };
            c.prototype.heightSetter = function (c) { this.heightSetting = c; };
            c.prototype.onAdd = function () {
                var c = this.textStr;
                this.text.add(this);
                this.attr({ text: E(c) ?
                        c : "", x: this.x, y: this.y });
                this.box && E(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
            };
            c.prototype.paddingSetter = function (c, a) { G(c) ? c !== this[a] && (this[a] = c, this.updateTextPadding()) : this[a] = void 0; };
            c.prototype.rSetter = function (c, a) { this.boxAttr(a, c); };
            c.prototype.shadow = function (c) { c && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(c)); return this; };
            c.prototype.strokeSetter = function (c, a) { this.stroke = c; this.boxAttr(a, c); };
            c.prototype["stroke-widthSetter"] =
                function (c, a) { c && (this.needsBox = !0); this["stroke-width"] = c; this.boxAttr(a, c); };
            c.prototype["text-alignSetter"] = function (c) { this.textAlign = c; };
            c.prototype.textSetter = function (c) { "undefined" !== typeof c && this.text.attr({ text: c }); this.updateTextPadding(); };
            c.prototype.updateBoxSize = function () {
                var l = this.text.element.style, a = {}, k = this.padding, v = this.bBox = G(this.widthSetting) && G(this.heightSetting) && !this.textAlign || !E(this.text.textStr) ? c.emptyBBox : this.text.getBBox();
                this.width = this.getPaddedWidth();
                this.height =
                    (this.heightSetting || v.height || 0) + 2 * k;
                l = this.renderer.fontMetrics(l && l.fontSize, this.text);
                this.baselineOffset = k + Math.min((this.text.firstLineMetrics || l).b, v.height || Infinity);
                this.heightSetting && (this.baselineOffset += (this.heightSetting - l.h) / 2);
                this.needsBox && (this.box || (k = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), k.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), k.add(this)), k = this.getCrispAdjust(),
                    a.x = k, a.y = (this.baseline ? -this.baselineOffset : 0) + k, a.width = Math.round(this.width), a.height = Math.round(this.height), this.box.attr(x(a, this.deferredAttr)), this.deferredAttr = {});
            };
            c.prototype.updateTextPadding = function () {
                var c = this.text;
                this.updateBoxSize();
                var a = this.baseline ? 0 : this.baselineOffset, k = A(this.paddingLeft, this.padding);
                E(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (k += { center: .5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
                if (k !==
                    c.x || a !== c.y)
                    c.attr("x", k), c.hasBoxWidthChanged && (this.bBox = c.getBBox(!0)), "undefined" !== typeof a && c.attr("y", a);
                c.x = k;
                c.y = a;
            };
            c.prototype.widthSetter = function (c) { this.widthSetting = G(c) ? c : void 0; };
            c.prototype.getPaddedWidth = function () { var c = this.padding, a = A(this.paddingLeft, c); c = A(this.paddingRight, c); return (this.widthSetting || this.bBox.width || 0) + a + c; };
            c.prototype.xSetter = function (c) {
                this.x = c;
                this.alignFactor && (c -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                this.xSetting = Math.round(c);
                this.attr("translateX", this.xSetting);
            };
            c.prototype.ySetter = function (c) { this.ySetting = this.y = Math.round(c); this.attr("translateY", this.ySetting); };
            c.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
            c.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return c;
        }(d);
    });
    P(g, "Core/Renderer/SVG/Symbols.js", [g["Core/Utilities.js"]], function (d) {
        function g(d, t, q, c, l) {
            var a = [];
            if (l) {
                var k = l.start || 0, v = I(l.r, q);
                q = I(l.r, c || q);
                var m = (l.end || 0) - .001;
                c = l.innerR;
                var N = I(l.open, .001 > Math.abs((l.end || 0) - k - 2 * Math.PI)), F = Math.cos(k), L = Math.sin(k), J = Math.cos(m), y = Math.sin(m);
                k = I(l.longArc, .001 > m - k - Math.PI ? 0 : 1);
                a.push(["M", d + v * F, t + q * L], ["A", v, q, 0, k, I(l.clockwise, 1), d + v * J, t + q * y]);
                x(c) && a.push(N ? ["M", d + c * J, t + c * y] : ["L", d + c * J, t + c * y], ["A", c, c, 0, k, x(l.clockwise) ? 1 - l.clockwise : 0, d + c * F, t + c * L]);
                N || a.push(["Z"]);
            }
            return a;
        }
        function B(d, t, q, c, l) { return l && l.r ? E(d, t, q, c, l) : [["M", d, t], ["L", d + q, t], ["L", d + q, t + c], ["L", d, t + c], ["Z"]]; }
        function E(d, t, q, c, l) { l = l && l.r || 0; return [["M", d + l, t], ["L", d + q - l, t], ["C", d + q, t, d + q, t, d + q, t + l], ["L", d + q, t + c - l], ["C", d + q, t + c, d + q, t + c, d + q - l, t + c], ["L", d + l, t + c], ["C", d, t + c, d, t + c, d, t + c - l], ["L", d, t + l], ["C", d, t, d, t, d + l, t]]; }
        var x = d.defined, G = d.isNumber, I = d.pick;
        return { arc: g, callout: function (d, t, q, c, l) {
                var a = Math.min(l && l.r || 0, q, c), k = a + 6, v = l && l.anchorX;
                l = l && l.anchorY || 0;
                var m = E(d, t, q, c, { r: a });
                if (!G(v))
                    return m;
                d + v >= q ? l > t + k && l < t + c - k ? m.splice(3, 1, ["L", d + q, l - 6], ["L", d + q + 6, l], ["L", d + q, l + 6], ["L", d + q, t + c - a]) : m.splice(3, 1, ["L", d + q, c /
                        2], ["L", v, l], ["L", d + q, c / 2], ["L", d + q, t + c - a]) : 0 >= d + v ? l > t + k && l < t + c - k ? m.splice(7, 1, ["L", d, l + 6], ["L", d - 6, l], ["L", d, l - 6], ["L", d, t + a]) : m.splice(7, 1, ["L", d, c / 2], ["L", v, l], ["L", d, c / 2], ["L", d, t + a]) : l && l > c && v > d + k && v < d + q - k ? m.splice(5, 1, ["L", v + 6, t + c], ["L", v, t + c + 6], ["L", v - 6, t + c], ["L", d + a, t + c]) : l && 0 > l && v > d + k && v < d + q - k && m.splice(1, 1, ["L", v - 6, t], ["L", v, t - 6], ["L", v + 6, t], ["L", q - a, t]);
                return m;
            }, circle: function (d, t, q, c) { return g(d + q / 2, t + c / 2, q / 2, c / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 }); }, diamond: function (d, t, q, c) {
                return [["M",
                        d + q / 2, t], ["L", d + q, t + c / 2], ["L", d + q / 2, t + c], ["L", d, t + c / 2], ["Z"]];
            }, rect: B, roundedRect: E, square: B, triangle: function (d, t, q, c) { return [["M", d + q / 2, t], ["L", d + q, t + c], ["L", d, t + c], ["Z"]]; }, "triangle-down": function (d, t, q, c) { return [["M", d, t], ["L", d + q, t], ["L", d + q / 2, t + c], ["Z"]]; } };
    });
    P(g, "Core/Renderer/SVG/TextBuilder.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = g.doc, x = g.SVG_NS, G = g.win, I = B.attr, A = B.extend, t = B.isString, q = B.objectEach, c = B.pick;
        return function () {
            function l(a) {
                var c = a.styles;
                this.renderer = a.renderer;
                this.svgElement = a;
                this.width = a.textWidth;
                this.textLineHeight = c && c.lineHeight;
                this.textOutline = c && c.textOutline;
                this.ellipsis = !(!c || "ellipsis" !== c.textOverflow);
                this.noWrap = !(!c || "nowrap" !== c.whiteSpace);
                this.fontSize = c && c.fontSize;
            }
            l.prototype.buildSVG = function () {
                var a = this.svgElement, k = a.element, v = a.renderer, m = c(a.textStr, "").toString(), l = -1 !== m.indexOf("<"), q = k.childNodes;
                v = this.width && !a.added && v.box;
                var L = /<br.*?>/g, J = [m, this.ellipsis, this.noWrap, this.textLineHeight,
                    this.textOutline, this.fontSize, this.width].join();
                if (J !== a.textCache) {
                    a.textCache = J;
                    delete a.actualWidth;
                    for (J = q.length; J--;)
                        k.removeChild(q[J]);
                    l || this.ellipsis || this.width || -1 !== m.indexOf(" ") && (!this.noWrap || L.test(m)) ? "" !== m && (v && v.appendChild(k), m = new d(m), this.modifyTree(m.nodes), m.addToDOM(a.element), this.modifyDOM(), this.ellipsis && -1 !== (k.textContent || "").indexOf("\u2026") && a.attr("title", this.unescapeEntities(a.textStr || "", ["&lt;", "&gt;"])), v && v.removeChild(k)) : k.appendChild(C.createTextNode(this.unescapeEntities(m)));
                    t(this.textOutline) && a.applyTextOutline && a.applyTextOutline(this.textOutline);
                }
            };
            l.prototype.modifyDOM = function () {
                var a = this, c = this.svgElement, d = I(c.element, "x");
                c.firstLineMetrics = void 0;
                for (var m; m = c.element.firstChild;)
                    if (/^[\s\u200B]*$/.test(m.textContent || " "))
                        c.element.removeChild(m);
                    else
                        break;
                [].forEach.call(c.element.querySelectorAll("tspan.highcharts-br"), function (m, k) {
                    m.nextSibling && m.previousSibling && (0 === k && 1 === m.previousSibling.nodeType && (c.firstLineMetrics = c.renderer.fontMetrics(void 0, m.previousSibling)), I(m, { dy: a.getLineHeight(m.nextSibling), x: d }));
                });
                var l = this.width || 0;
                if (l) {
                    var q = function (m, k) {
                        var z = m.textContent || "", w = z.replace(/([^\^])-/g, "$1- ").split(" "), e = !a.noWrap && (1 < w.length || 1 < c.element.childNodes.length), r = a.getLineHeight(k), h = 0, n = c.actualWidth;
                        if (a.ellipsis)
                            z && a.truncate(m, z, void 0, 0, Math.max(0, l - parseInt(a.fontSize || 12, 10)), function (f, b) { return f.substring(0, b) + "\u2026"; });
                        else if (e) {
                            z = [];
                            for (e = []; k.firstChild && k.firstChild !== m;)
                                e.push(k.firstChild), k.removeChild(k.firstChild);
                            for (; w.length;)
                                w.length && !a.noWrap && 0 < h && (z.push(m.textContent || ""), m.textContent = w.join(" ").replace(/- /g, "-")), a.truncate(m, void 0, w, 0 === h ? n || 0 : 0, l, function (f, b) { return w.slice(0, b).join(" ").replace(/- /g, "-"); }), n = c.actualWidth, h++;
                            e.forEach(function (f) { k.insertBefore(f, m); });
                            z.forEach(function (f) { k.insertBefore(C.createTextNode(f), m); f = C.createElementNS(x, "tspan"); f.textContent = "\u200b"; I(f, { dy: r, x: d }); k.insertBefore(f, m); });
                        }
                    }, L = function (a) {
                        [].slice.call(a.childNodes).forEach(function (m) {
                            m.nodeType ===
                                G.Node.TEXT_NODE ? q(m, a) : (-1 !== m.className.baseVal.indexOf("highcharts-br") && (c.actualWidth = 0), L(m));
                        });
                    };
                    L(c.element);
                }
            };
            l.prototype.getLineHeight = function (a) { var c; a = a.nodeType === G.Node.TEXT_NODE ? a.parentElement : a; this.renderer.styledMode || (c = a && /(px|em)$/.test(a.style.fontSize) ? a.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12); return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(c, a || this.svgElement.element).h; };
            l.prototype.modifyTree = function (a) {
                var c = this, d = function (m, k) {
                    var l = m.attributes;
                    l = void 0 === l ? {} : l;
                    var v = m.children, q = m.style;
                    q = void 0 === q ? {} : q;
                    var y = m.tagName, z = c.renderer.styledMode;
                    if ("b" === y || "strong" === y)
                        z ? l["class"] = "highcharts-strong" : q.fontWeight = "bold";
                    else if ("i" === y || "em" === y)
                        z ? l["class"] = "highcharts-emphasized" : q.fontStyle = "italic";
                    q && q.color && (q.fill = q.color);
                    "br" === y ? (l["class"] = "highcharts-br", m.textContent = "\u200b", (k = a[k + 1]) && k.textContent && (k.textContent = k.textContent.replace(/^ +/gm, ""))) : "a" === y && v && v.some(function (a) {
                        return "#text" ===
                            a.tagName;
                    }) && (m.children = [{ children: v, tagName: "tspan" }]);
                    "#text" !== y && "a" !== y && (m.tagName = "tspan");
                    A(m, { attributes: l, style: q });
                    v && v.filter(function (a) { return "#text" !== a.tagName; }).forEach(d);
                };
                a.forEach(d);
            };
            l.prototype.truncate = function (a, c, d, m, l, q) {
                var k = this.svgElement, v = k.renderer, y = k.rotation, z = [], w = d ? 1 : 0, e = (c || d || "").length, r = e, h, n = function (b, f) {
                    f = f || b;
                    var e = a.parentNode;
                    if (e && "undefined" === typeof z[f])
                        if (e.getSubStringLength)
                            try {
                                z[f] = m + e.getSubStringLength(0, d ? f + 1 : f);
                            }
                            catch (p) {
                                "";
                            }
                        else
                            v.getSpanWidth &&
                                (a.textContent = q(c || d, b), z[f] = m + v.getSpanWidth(k, a));
                    return z[f];
                };
                k.rotation = 0;
                var f = n(a.textContent.length);
                if (m + f > l) {
                    for (; w <= e;)
                        r = Math.ceil((w + e) / 2), d && (h = q(d, r)), f = n(r, h && h.length - 1), w === e ? w = e + 1 : f > l ? e = r - 1 : w = r;
                    0 === e ? a.textContent = "" : c && e === c.length - 1 || (a.textContent = h || q(c || d, r));
                }
                d && d.splice(0, r);
                k.actualWidth = f;
                k.rotation = y;
            };
            l.prototype.unescapeEntities = function (a, c) { q(this.renderer.escapes, function (k, m) { c && -1 !== c.indexOf(k) || (a = a.toString().replace(new RegExp(k, "g"), m)); }); return a; };
            return l;
        }();
    });
    P(g, "Core/Renderer/SVG/SVGRenderer.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGLabel.js"], g["Core/Renderer/SVG/Symbols.js"], g["Core/Renderer/SVG/TextBuilder.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A, t) {
        var q = B.charts, c = B.deg2rad, l = B.doc, a = B.isFirefox, k = B.isMS, v = B.isWebKit, m = B.noop, N = B.SVG_NS, F = B.symbolSizes, L = B.win, J = t.addEvent, y = t.attr, z = t.createElement, w = t.css, e = t.defined, r = t.destroyObjectProperties, h = t.extend, n = t.isArray, f = t.isNumber, b = t.isObject, D = t.isString, H = t.merge, p = t.pick, u = t.pInt, K = t.uniqueKey, T;
        B = function () {
            function M(b, f, e, h, p, a, c) { this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0; this.init(b, f, e, h, p, a, c); }
            M.prototype.init = function (b, f, e, h, p, c, n) {
                var M = this.createElement("svg").attr({ version: "1.1",
                    "class": "highcharts-root" }), u = M.element;
                n || M.css(this.getStyle(h));
                b.appendChild(u);
                y(b, "dir", "ltr");
                -1 === b.innerHTML.indexOf("xmlns") && y(u, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = u;
                this.boxWrapper = M;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highcharts 10.2.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = p;
                this.styledMode = n;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys =
                    [];
                this.imgCount = 0;
                this.setSize(f, e, !1);
                var r;
                a && b.getBoundingClientRect && (f = function () { w(b, { left: 0, top: 0 }); r = b.getBoundingClientRect(); w(b, { left: Math.ceil(r.left) - r.left + "px", top: Math.ceil(r.top) - r.top + "px" }); }, f(), this.unSubPixelFix = J(L, "resize", f));
            };
            M.prototype.definition = function (b) { return (new d([b])).addToDOM(this.defs.element); };
            M.prototype.getReferenceURL = function () {
                if ((a || v) && l.getElementsByTagName("base").length) {
                    if (!e(T)) {
                        var b = K();
                        b = (new d([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs",
                                        children: [{ tagName: "clipPath", attributes: { id: b }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": "url(#".concat(b, ")"), fill: "rgba(0,0,0,0.001)" } }] }])).addToDOM(l.body);
                        w(b, { position: "fixed", top: 0, left: 0, zIndex: 9E5 });
                        var f = l.elementFromPoint(6, 6);
                        T = "hitme" === (f && f.id);
                        l.body.removeChild(b);
                    }
                    if (T)
                        return L.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20");
                }
                return "";
            };
            M.prototype.getStyle =
                function (b) { return this.style = h({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, b); };
            M.prototype.setStyle = function (b) { this.boxWrapper.css(this.getStyle(b)); };
            M.prototype.isHidden = function () { return !this.boxWrapper.getBBox().width; };
            M.prototype.destroy = function () {
                var b = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                r(this.gradients || {});
                this.gradients = null;
                b && (this.defs = b.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects =
                    null;
            };
            M.prototype.createElement = function (b) { var f = new this.Element; f.init(this, b); return f; };
            M.prototype.getRadialAttr = function (b, f) { return { cx: b[0] - b[2] / 2 + (f.cx || 0) * b[2], cy: b[1] - b[2] / 2 + (f.cy || 0) * b[2], r: (f.r || 0) * b[2] }; };
            M.prototype.buildText = function (b) { (new A(b)).buildSVG(); };
            M.prototype.getContrast = function (b) { b = g.parse(b).rgba.map(function (b) { b /= 255; return .03928 >= b ? b / 12.92 : Math.pow((b + .055) / 1.055, 2.4); }); b = .2126 * b[0] + .7152 * b[1] + .0722 * b[2]; return 1.05 / (b + .05) > (b + .05) / .05 ? "#FFFFFF" : "#000000"; };
            M.prototype.button =
                function (f, e, p, a, c, n, M, u, r, w) {
                    void 0 === c && (c = {});
                    var D = this.label(f, e, p, r, void 0, void 0, w, void 0, "button"), O = this.styledMode;
                    f = c.states || {};
                    var m = 0;
                    c = H(c);
                    delete c.states;
                    var Q = H({ color: "#333333", cursor: "pointer", fontWeight: "normal" }, c.style);
                    delete c.style;
                    var z = d.filterUserAttributes(c);
                    D.attr(H({ padding: 8, r: 2 }, z));
                    if (!O) {
                        z = H({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, z);
                        n = H(z, { fill: "#e6e6e6" }, d.filterUserAttributes(n || f.hover || {}));
                        var K = n.style;
                        delete n.style;
                        M = H(z, { fill: "#e6ebf5", style: { color: "#000000",
                                fontWeight: "bold" } }, d.filterUserAttributes(M || f.select || {}));
                        var X = M.style;
                        delete M.style;
                        u = H(z, { style: { color: "#cccccc" } }, d.filterUserAttributes(u || f.disabled || {}));
                        var l = u.style;
                        delete u.style;
                    }
                    J(D.element, k ? "mouseover" : "mouseenter", function () { 3 !== m && D.setState(1); });
                    J(D.element, k ? "mouseout" : "mouseleave", function () { 3 !== m && D.setState(m); });
                    D.setState = function (f) {
                        1 !== f && (D.state = m = f);
                        D.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed",
                            "disabled"][f || 0]);
                        O || (D.attr([z, n, M, u][f || 0]), f = [Q, K, X, l][f || 0], b(f) && D.css(f));
                    };
                    O || D.attr(z).css(h({ cursor: "default" }, Q));
                    return D.on("touchstart", function (b) { return b.stopPropagation(); }).on("click", function (b) { 3 !== m && a.call(D, b); });
                };
            M.prototype.crispLine = function (b, f, h) { void 0 === h && (h = "round"); var p = b[0], a = b[1]; e(p[1]) && p[1] === a[1] && (p[1] = a[1] = Math[h](p[1]) - f % 2 / 2); e(p[2]) && p[2] === a[2] && (p[2] = a[2] = Math[h](p[2]) + f % 2 / 2); return b; };
            M.prototype.path = function (f) {
                var e = this.styledMode ? {} : { fill: "none" };
                n(f) ? e.d = f : b(f) && h(e, f);
                return this.createElement("path").attr(e);
            };
            M.prototype.circle = function (f, e, h) { f = b(f) ? f : "undefined" === typeof f ? {} : { x: f, y: e, r: h }; e = this.createElement("circle"); e.xSetter = e.ySetter = function (b, f, e) { e.setAttribute("c" + f, b); }; return e.attr(f); };
            M.prototype.arc = function (f, e, h, p, a, c) { b(f) ? (p = f, e = p.y, h = p.r, f = p.x) : p = { innerR: p, start: a, end: c }; f = this.symbol("arc", f, e, h, h, p); f.r = h; return f; };
            M.prototype.rect = function (f, e, h, p, a, c) {
                a = b(f) ? f.r : a;
                var n = this.createElement("rect");
                f = b(f) ? f : "undefined" ===
                    typeof f ? {} : { x: f, y: e, width: Math.max(h, 0), height: Math.max(p, 0) };
                this.styledMode || ("undefined" !== typeof c && (f["stroke-width"] = c, f = n.crisp(f)), f.fill = "none");
                a && (f.r = a);
                n.rSetter = function (b, f, e) { n.r = b; y(e, { rx: b, ry: b }); };
                n.rGetter = function () { return n.r || 0; };
                return n.attr(f);
            };
            M.prototype.setSize = function (b, f, e) { this.width = b; this.height = f; this.boxWrapper.animate({ width: b, height: f }, { step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }); }, duration: p(e, !0) ? void 0 : 0 }); this.alignElements(); };
            M.prototype.g = function (b) { var f = this.createElement("g"); return b ? f.attr({ "class": "highcharts-" + b }) : f; };
            M.prototype.image = function (b, e, h, p, a, c) {
                var n = { preserveAspectRatio: "none" }, M = function (b, f) { b.setAttributeNS ? b.setAttributeNS("http://www.w3.org/1999/xlink", "href", f) : b.setAttribute("hc-svg-href", f); };
                f(e) && (n.x = e);
                f(h) && (n.y = h);
                f(p) && (n.width = p);
                f(a) && (n.height = a);
                var u = this.createElement("image").attr(n);
                e = function (f) { M(u.element, b); c.call(u, f); };
                c ? (M(u.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    h = new L.Image, J(h, "load", e), h.src = b, h.complete && e({})) : M(u.element, b);
                return u;
            };
            M.prototype.symbol = function (b, f, a, c, n, M) {
                var u = this, r = /^url\((.*?)\)$/, D = r.test(b), H = !D && (this.symbols[b] ? b : "circle"), m = H && this.symbols[H], Q;
                if (m) {
                    "number" === typeof f && (Q = m.call(this.symbols, Math.round(f || 0), Math.round(a || 0), c || 0, n || 0, M));
                    var O = this.path(Q);
                    u.styledMode || O.attr("fill", "none");
                    h(O, { symbolName: H || void 0, x: f, y: a, width: c, height: n });
                    M && h(O, M);
                }
                else if (D) {
                    var k = b.match(r)[1];
                    var d = O = this.image(k);
                    d.imgwidth =
                        p(F[k] && F[k].width, M && M.width);
                    d.imgheight = p(F[k] && F[k].height, M && M.height);
                    var K = function (b) { return b.attr({ width: b.width, height: b.height }); };
                    ["width", "height"].forEach(function (b) {
                        d[b + "Setter"] = function (b, f) {
                            var h = this["img" + f];
                            this[f] = b;
                            e(h) && (M && "within" === M.backgroundSize && this.width && this.height && (h = Math.round(h * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(f, h), this.alignByTranslate || (b = ((this[f] || 0) - h) / 2, this.attr("width" === f ? { translateX: b } :
                                { translateY: b })));
                        };
                    });
                    e(f) && d.attr({ x: f, y: a });
                    d.isImg = !0;
                    e(d.imgwidth) && e(d.imgheight) ? K(d) : (d.attr({ width: 0, height: 0 }), z("img", { onload: function () { var b = q[u.chartIndex]; 0 === this.width && (w(this, { position: "absolute", top: "-999em" }), l.body.appendChild(this)); F[k] = { width: this.width, height: this.height }; d.imgwidth = this.width; d.imgheight = this.height; d.element && K(d); this.parentNode && this.parentNode.removeChild(this); u.imgCount--; if (!u.imgCount && b && !b.hasLoaded)
                            b.onload(); }, src: k }), this.imgCount++);
                }
                return O;
            };
            M.prototype.clipRect = function (b, f, e, h) { var p = K() + "-", a = this.createElement("clipPath").attr({ id: p }).add(this.defs); b = this.rect(b, f, e, h, 0).add(a); b.id = p; b.clipPath = a; b.count = 0; return b; };
            M.prototype.text = function (b, f, h, p) {
                var a = {};
                if (p && (this.allowHTML || !this.forExport))
                    return this.html(b, f, h);
                a.x = Math.round(f || 0);
                h && (a.y = Math.round(h));
                e(b) && (a.text = b);
                b = this.createElement("text").attr(a);
                if (!p || this.forExport && !this.allowHTML)
                    b.xSetter = function (b, f, e) {
                        for (var h = e.getElementsByTagName("tspan"), p = e.getAttribute(f), a = 0, c; a < h.length; a++)
                            c = h[a], c.getAttribute(f) === p && c.setAttribute(f, b);
                        e.setAttribute(f, b);
                    };
                return b;
            };
            M.prototype.fontMetrics = function (b, f) { b = !this.styledMode && /px/.test(b) || !L.getComputedStyle ? b || f && f.style && f.style.fontSize || this.style && this.style.fontSize : f && x.prototype.getStyle.call(f, "font-size"); b = /px/.test(b) ? u(b) : 12; f = 24 > b ? b + 3 : Math.round(1.2 * b); return { h: f, b: Math.round(.8 * f), f: b }; };
            M.prototype.rotCorr = function (b, f, e) {
                var h = b;
                f && e && (h = Math.max(h * Math.cos(f * c), 4));
                return { x: -b / 3 * Math.sin(f * c),
                    y: h };
            };
            M.prototype.pathToSegments = function (b) { for (var e = [], h = [], p = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, a = 0; a < b.length; a++)
                D(h[0]) && f(b[a]) && h.length === p[h[0].toUpperCase()] && b.splice(a, 0, h[0].replace("M", "L").replace("m", "l")), "string" === typeof b[a] && (h.length && e.push(h.slice(0)), h.length = 0), h.push(b[a]); e.push(h.slice(0)); return e; };
            M.prototype.label = function (b, f, e, h, p, a, c, n, M) { return new G(this, b, f, e, h, p, a, c, n, M); };
            M.prototype.alignElements = function () { this.alignedObjects.forEach(function (b) { return b.align(); }); };
            return M;
        }();
        h(B.prototype, { Element: x, SVG_NS: N, escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }, symbols: I, draw: m });
        E.registerRendererType("svg", B, !0);
        "";
        return B;
    });
    P(g, "Core/Renderer/HTML/HTMLElement.js", [g["Core/Globals.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () {
            var a = function (c, m) {
                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) {
                    for (var m in c)
                        c.hasOwnProperty(m) &&
                            (a[m] = c[m]);
                };
                return a(c, m);
            };
            return function (c, m) { function k() { this.constructor = c; } a(c, m); c.prototype = null === m ? Object.create(m) : (k.prototype = m.prototype, new k); };
        }(), x = d.isFirefox, G = d.isMS, I = d.isWebKit, A = d.win, t = B.css, q = B.defined, c = B.extend, l = B.pick, a = B.pInt;
        return function (k) {
            function d() { return null !== k && k.apply(this, arguments) || this; }
            C(d, k);
            d.compose = function (a) {
                if (-1 === d.composedClasses.indexOf(a)) {
                    d.composedClasses.push(a);
                    var c = d.prototype, m = a.prototype;
                    m.getSpanCorrection = c.getSpanCorrection;
                    m.htmlCss =
                        c.htmlCss;
                    m.htmlGetBBox = c.htmlGetBBox;
                    m.htmlUpdateTransform = c.htmlUpdateTransform;
                    m.setSpanRotation = c.setSpanRotation;
                }
                return a;
            };
            d.prototype.getSpanCorrection = function (a, c, k) { this.xCorr = -a * k; this.yCorr = -c; };
            d.prototype.htmlCss = function (a) {
                var m = "SPAN" === this.element.tagName && a && "width" in a, k = l(m && a.width, void 0);
                if (m) {
                    delete a.width;
                    this.textWidth = k;
                    var d = !0;
                }
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = c(this.styles, a);
                t(this.element, a);
                d && this.htmlUpdateTransform();
                return this;
            };
            d.prototype.htmlGetBBox = function () { var a = this.element; return { x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight }; };
            d.prototype.htmlUpdateTransform = function () {
                if (this.added) {
                    var c = this.renderer, k = this.element, d = this.translateX || 0, l = this.translateY || 0, v = this.x || 0, y = this.y || 0, z = this.textAlign || "left", w = { left: 0, center: .5, right: 1 }[z], e = this.styles;
                    e = e && e.whiteSpace;
                    t(k, { marginLeft: d, marginTop: l });
                    !c.styledMode && this.shadows && this.shadows.forEach(function (b) {
                        t(b, { marginLeft: d +
                                1, marginTop: l + 1 });
                    });
                    this.inverted && [].forEach.call(k.childNodes, function (b) { c.invertChild(b, k); });
                    if ("SPAN" === k.tagName) {
                        var r = this.rotation, h = this.textWidth && a(this.textWidth), n = [r, z, k.innerHTML, this.textWidth, this.textAlign].join(), f = void 0;
                        f = !1;
                        if (h !== this.oldTextWidth) {
                            if (this.textPxLength)
                                var b = this.textPxLength;
                            else
                                t(k, { width: "", whiteSpace: e || "nowrap" }), b = k.offsetWidth;
                            (h > this.oldTextWidth || b > h) && (/[ \-]/.test(k.textContent || k.innerText) || "ellipsis" === k.style.textOverflow) && (t(k, { width: b > h ||
                                    r ? h + "px" : "auto", display: "block", whiteSpace: e || "normal" }), this.oldTextWidth = h, f = !0);
                        }
                        this.hasBoxWidthChanged = f;
                        n !== this.cTT && (f = c.fontMetrics(k.style.fontSize, k).b, !q(r) || r === (this.oldRotation || 0) && z === this.oldAlign || this.setSpanRotation(r, w, f), this.getSpanCorrection(!q(r) && this.textPxLength || k.offsetWidth, f, w, r, z));
                        t(k, { left: v + (this.xCorr || 0) + "px", top: y + (this.yCorr || 0) + "px" });
                        this.cTT = n;
                        this.oldRotation = r;
                        this.oldAlign = z;
                    }
                }
                else
                    this.alignOnAdd = !0;
            };
            d.prototype.setSpanRotation = function (a, c, k) {
                var m = {}, d = G && !/Edge/.test(A.navigator.userAgent) ? "-ms-transform" : I ? "-webkit-transform" : x ? "MozTransform" : A.opera ? "-o-transform" : void 0;
                d && (m[d] = m.transform = "rotate(" + a + "deg)", m[d + (x ? "Origin" : "-origin")] = m.transformOrigin = 100 * c + "% " + k + "px", t(this.element, m));
            };
            d.composedClasses = [];
            return d;
        }(g);
    });
    P(g, "Core/Renderer/HTML/HTMLRenderer.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGRenderer.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = this && this.__extends ||
            function () { var d = function (c, l) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var k in c)
                c.hasOwnProperty(k) && (a[k] = c[k]); }; return d(c, l); }; return function (c, l) { function a() { this.constructor = c; } d(c, l); c.prototype = null === l ? Object.create(l) : (a.prototype = l.prototype, new a); }; }(), C = E.attr, I = E.createElement, A = E.extend, t = E.pick;
        return function (q) {
            function c() { return null !== q && q.apply(this, arguments) || this; }
            x(c, q);
            c.compose = function (d) {
                -1 === c.composedClasses.indexOf(d) &&
                    (c.composedClasses.push(d), d.prototype.html = c.prototype.html);
                return d;
            };
            c.prototype.html = function (c, a, k) {
                var l = this.createElement("span"), m = l.element, q = l.renderer, F = q.isSVG, L = function (a, c) { ["opacity", "visibility"].forEach(function (m) { a[m + "Setter"] = function (w, e, r) { var h = a.div ? a.div.style : c; g.prototype[m + "Setter"].call(this, w, e, r); h && (h[e] = w); }; }); a.addedSetters = !0; };
                l.textSetter = function (a) {
                    a !== this.textStr && (delete this.bBox, delete this.oldTextWidth, d.setElementHTML(this.element, t(a, "")), this.textStr =
                        a, l.doTransform = !0);
                };
                F && L(l, l.element.style);
                l.xSetter = l.ySetter = l.alignSetter = l.rotationSetter = function (a, c) { "align" === c ? l.alignValue = l.textAlign = a : l[c] = a; l.doTransform = !0; };
                l.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1); };
                l.attr({ text: c, x: Math.round(a), y: Math.round(k) }).css({ position: "absolute" });
                q.styledMode || l.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
                m.style.whiteSpace = "nowrap";
                l.css = l.htmlCss;
                F && (l.add = function (a) {
                    var c = q.box.parentNode, z = [];
                    if (this.parentGroup = a) {
                        var w = a.div;
                        if (!w) {
                            for (; a;)
                                z.push(a), a = a.parentGroup;
                            z.reverse().forEach(function (e) {
                                function a(b, h) { e[h] = b; "translateX" === h ? f.left = b + "px" : f.top = b + "px"; e.doTransform = !0; }
                                var h = C(e.element, "class"), n = e.styles || {};
                                w = e.div = e.div || I("div", h ? { className: h } : void 0, { position: "absolute", left: (e.translateX || 0) + "px", top: (e.translateY || 0) + "px", display: e.display, opacity: e.opacity, cursor: n.cursor, pointerEvents: n.pointerEvents, visibility: e.visibility }, w || c);
                                var f = w.style;
                                A(e, { classSetter: function (b) { return function (f) { this.element.setAttribute("class", f); b.className = f; }; }(w), on: function () { z[0].div && l.on.apply({ element: z[0].div, onEvents: e.onEvents }, arguments); return e; }, translateXSetter: a, translateYSetter: a });
                                e.addedSetters || L(e);
                            });
                        }
                    }
                    else
                        w = c;
                    w.appendChild(m);
                    l.added = !0;
                    l.alignOnAdd && l.htmlUpdateTransform();
                    return l;
                });
                return l;
            };
            c.composedClasses = [];
            return c;
        }(B);
    });
    P(g, "Core/Axis/AxisDefaults.js", [], function () {
        var d;
        (function (d) {
            d.defaultXAxisOptions = { alignTicks: !0, allowDecimals: void 0,
                panningEnabled: !0, zIndex: 2, zoomEnabled: !0, dateTimeLabelFormats: { millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" }, week: { main: "%e. %b" }, month: { main: "%b '%y" }, year: { main: "%Y" } }, endOnTick: !1, gridLineDashStyle: "Solid", gridZIndex: 1, labels: { autoRotation: void 0, autoRotationLimit: 80, distance: void 0, enabled: !0, indentation: 10, overflow: "justify", padding: 5, reserveSpace: void 0, rotation: void 0, staggerLines: 0,
                    step: 0, useHTML: !1, x: 0, zIndex: 7, style: { color: "#666666", cursor: "default", fontSize: "11px" } }, maxPadding: .01, minorGridLineDashStyle: "Solid", minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, offset: void 0, opposite: !1, reversed: void 0, reversedStacks: !1, showEmpty: !0, showFirstLabel: !0, showLastLabel: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", rotation: 0, useHTML: !1, x: 0, y: 0, style: { color: "#666666" } }, type: "linear",
                uniqueNames: !0, visible: !0, minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb", lineWidth: 1, gridLineColor: "#e6e6e6", gridLineWidth: void 0, tickColor: "#ccd6eb" };
            d.defaultYAxisOptions = { reversedStacks: !0, endOnTick: !0, maxPadding: .05, minPadding: .05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { animation: {}, allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function () {
                        var d = this.axis.chart.numberFormatter;
                        return d(this.total, -1);
                    }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
            d.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
            d.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
            d.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
            d.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
        })(d || (d = {}));
        return d;
    });
    P(g, "Core/Foundation.js", [g["Core/Utilities.js"]], function (d) { var g = d.addEvent, B = d.isFunction, E = d.objectEach, x = d.removeEvent, G; (function (d) { d.registerEventOptions = function (d, t) { d.eventOptions = d.eventOptions || {}; E(t.events, function (q, c) { d.eventOptions[c] !== q && (d.eventOptions[c] && (x(d, c, d.eventOptions[c]), delete d.eventOptions[c]), B(q) && (d.eventOptions[c] = q, g(d, c, q))); }); }; })(G || (G = {})); return G; });
    P(g, "Core/Axis/Tick.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = g.deg2rad, x = B.clamp, G = B.correctFloat, I = B.defined, A = B.destroyObjectProperties, t = B.extend, q = B.fireEvent, c = B.isNumber, l = B.merge, a = B.objectEach, k = B.pick;
        g = function () {
            function v(a, c, k, d, l) { this.isNewLabel = this.isNew = !0; this.axis = a; this.pos = c; this.type = k || ""; this.parameters = l || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options = this.parameters.options; q(this, "init"); k || d || this.addLabel(); }
            v.prototype.addLabel = function () {
                var a = this, l = a.axis, v = l.options, g = l.chart, J = l.categories, y = l.logarithmic, z = l.names, w = a.pos, e = k(a.options &&
                    a.options.labels, v.labels), r = l.tickPositions, h = w === r[0], n = w === r[r.length - 1], f = (!e.step || 1 === e.step) && 1 === l.tickInterval;
                r = r.info;
                var b = a.label, D;
                J = this.parameters.category || (J ? k(J[w], z[w], w) : w);
                y && c(J) && (J = G(y.lin2log(J)));
                if (l.dateTime)
                    if (r) {
                        var H = g.time.resolveDTLFormat(v.dateTimeLabelFormats[!v.grid && r.higherRanks[w] || r.unitName]);
                        var p = H.main;
                    }
                    else
                        c(J) && (p = l.dateTime.getXDateFormat(J, v.dateTimeLabelFormats || {}));
                a.isFirst = h;
                a.isLast = n;
                var u = { axis: l, chart: g, dateTimeLabelFormat: p, isFirst: h, isLast: n,
                    pos: w, tick: a, tickPositionInfo: r, value: J };
                q(this, "labelFormat", u);
                var K = function (b) { return e.formatter ? e.formatter.call(b, b) : e.format ? (b.text = l.defaultLabelFormatter.call(b), d.format(e.format, b, g)) : l.defaultLabelFormatter.call(b, b); };
                v = K.call(u, u);
                var T = H && H.list;
                a.shortenLabel = T ? function () { for (D = 0; D < T.length; D++)
                    if (t(u, { dateTimeLabelFormat: T[D] }), b.attr({ text: K.call(u, u) }), b.getBBox().width < l.getSlotWidth(a) - 2 * e.padding)
                        return; b.attr({ text: "" }); } : void 0;
                f && l._addedPlotLB && a.moveLabel(v, e);
                I(b) || a.movedLabel ?
                    b && b.textStr !== v && !f && (!b.textWidth || e.style.width || b.styles.width || b.css({ width: null }), b.attr({ text: v }), b.textPxLength = b.getBBox().width) : (a.label = b = a.createLabel({ x: 0, y: 0 }, v, e), a.rotation = 0);
            };
            v.prototype.createLabel = function (a, c, k) { var d = this.axis, m = d.chart; if (a = I(c) && k.enabled ? m.renderer.text(c, a.x, a.y, k.useHTML).add(d.labelGroup) : null)
                m.styledMode || a.css(l(k.style)), a.textPxLength = a.getBBox().width; return a; };
            v.prototype.destroy = function () { A(this, this.axis); };
            v.prototype.getPosition = function (a, c, k, d) { var m = this.axis, l = m.chart, z = d && l.oldChartHeight || l.chartHeight; a = { x: a ? G(m.translate(c + k, void 0, void 0, d) + m.transB) : m.left + m.offset + (m.opposite ? (d && l.oldChartWidth || l.chartWidth) - m.right - m.left : 0), y: a ? z - m.bottom + m.offset - (m.opposite ? m.height : 0) : G(z - m.translate(c + k, void 0, void 0, d) - m.transB) }; a.y = x(a.y, -1E5, 1E5); q(this, "afterGetPosition", { pos: a }); return a; };
            v.prototype.getLabelPosition = function (a, c, k, d, l, y, z, w) {
                var e = this.axis, r = e.transA, h = e.isLinked && e.linkedParent ? e.linkedParent.reversed : e.reversed, n = e.staggerLines, f = e.tickRotCorr || { x: 0, y: 0 }, b = d || e.reserveSpaceDefault ? 0 : -e.labelOffset * ("center" === e.labelAlign ? .5 : 1), D = {};
                k = 0 === e.side ? k.rotation ? -8 : -k.getBBox().height : 2 === e.side ? f.y + 8 : Math.cos(k.rotation * C) * (f.y - k.getBBox(!1, 0).height / 2);
                I(l.y) && (k = 0 === e.side && e.horiz ? l.y + k : l.y);
                a = a + l.x + b + f.x - (y && d ? y * r * (h ? -1 : 1) : 0);
                c = c + k - (y && !d ? y * r * (h ? 1 : -1) : 0);
                n && (d = z / (w || 1) % n, e.opposite && (d = n - d - 1), c += e.labelOffset / n * d);
                D.x = a;
                D.y = Math.round(c);
                q(this, "afterGetLabelPosition", { pos: D, tickmarkOffset: y, index: z });
                return D;
            };
            v.prototype.getLabelSize = function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0; };
            v.prototype.getMarkPath = function (a, c, k, d, l, y) { return y.crispLine([["M", a, c], ["L", a + (l ? 0 : -k), c + (l ? k : 0)]], d); };
            v.prototype.handleOverflow = function (a) {
                var c = this.axis, d = c.options.labels, m = a.x, l = c.chart.chartWidth, y = c.chart.spacing, z = k(c.labelLeft, Math.min(c.pos, y[3]));
                y = k(c.labelRight, Math.max(c.isRadial ? 0 : c.pos + c.len, l - y[1]));
                var w = this.label, e = this.rotation, r = { left: 0, center: .5, right: 1 }[c.labelAlign ||
                    w.attr("align")], h = w.getBBox().width, n = c.getSlotWidth(this), f = {}, b = n, D = 1, H;
                if (e || "justify" !== d.overflow)
                    0 > e && m - r * h < z ? H = Math.round(m / Math.cos(e * C) - z) : 0 < e && m + r * h > y && (H = Math.round((l - m) / Math.cos(e * C)));
                else if (l = m + (1 - r) * h, m - r * h < z ? b = a.x + b * (1 - r) - z : l > y && (b = y - a.x + b * r, D = -1), b = Math.min(n, b), b < n && "center" === c.labelAlign && (a.x += D * (n - b - r * (n - Math.min(h, b)))), h > b || c.autoRotation && (w.styles || {}).width)
                    H = b;
                H && (this.shortenLabel ? this.shortenLabel() : (f.width = Math.floor(H) + "px", (d.style || {}).textOverflow || (f.textOverflow =
                    "ellipsis"), w.css(f)));
            };
            v.prototype.moveLabel = function (c, k) { var d = this, m = d.label, l = d.axis, y = l.reversed, z = !1; m && m.textStr === c ? (d.movedLabel = m, z = !0, delete d.label) : a(l.ticks, function (e) { z || e.isNew || e === d || !e.label || e.label.textStr !== c || (d.movedLabel = e.label, z = !0, e.labelPos = d.movedLabel.xy, delete e.label); }); if (!z && (d.labelPos || m)) {
                var w = d.labelPos || m.xy;
                m = l.horiz ? y ? 0 : l.width + l.left : w.x;
                l = l.horiz ? w.y : y ? l.width + l.left : 0;
                d.movedLabel = d.createLabel({ x: m, y: l }, c, k);
                d.movedLabel && d.movedLabel.attr({ opacity: 0 });
            } };
            v.prototype.render = function (a, c, d) { var m = this.axis, l = m.horiz, y = this.pos, z = k(this.tickmarkOffset, m.tickmarkOffset); y = this.getPosition(l, y, z, c); z = y.x; var w = y.y; m = l && z === m.pos + m.len || !l && w === m.pos ? -1 : 1; l = k(d, this.label && this.label.newOpacity, 1); d = k(d, 1); this.isActive = !0; this.renderGridLine(c, d, m); this.renderMark(y, d, m); this.renderLabel(y, c, l, a); this.isNew = !1; q(this, "afterRender"); };
            v.prototype.renderGridLine = function (a, c, d) {
                var m = this.axis, l = m.options, y = {}, z = this.pos, w = this.type, e = k(this.tickmarkOffset, m.tickmarkOffset), r = m.chart.renderer, h = this.gridLine, n = l.gridLineWidth, f = l.gridLineColor, b = l.gridLineDashStyle;
                "minor" === this.type && (n = l.minorGridLineWidth, f = l.minorGridLineColor, b = l.minorGridLineDashStyle);
                h || (m.chart.styledMode || (y.stroke = f, y["stroke-width"] = n || 0, y.dashstyle = b), w || (y.zIndex = 1), a && (c = 0), this.gridLine = h = r.path().attr(y).addClass("highcharts-" + (w ? w + "-" : "") + "grid-line").add(m.gridGroup));
                if (h && (d = m.getPlotLinePath({ value: z + e, lineWidth: h.strokeWidth() * d, force: "pass", old: a })))
                    h[a || this.isNew ?
                        "attr" : "animate"]({ d: d, opacity: c });
            };
            v.prototype.renderMark = function (a, c, d) {
                var m = this.axis, l = m.options, y = m.chart.renderer, z = this.type, w = m.tickSize(z ? z + "Tick" : "tick"), e = a.x;
                a = a.y;
                var r = k(l["minor" !== z ? "tickWidth" : "minorTickWidth"], !z && m.isXAxis ? 1 : 0);
                l = l["minor" !== z ? "tickColor" : "minorTickColor"];
                var h = this.mark, n = !h;
                w && (m.opposite && (w[0] = -w[0]), h || (this.mark = h = y.path().addClass("highcharts-" + (z ? z + "-" : "") + "tick").add(m.axisGroup), m.chart.styledMode || h.attr({ stroke: l, "stroke-width": r })), h[n ? "attr" : "animate"]({ d: this.getMarkPath(e, a, w[0], h.strokeWidth() * d, m.horiz, y), opacity: c }));
            };
            v.prototype.renderLabel = function (a, d, l, q) {
                var m = this.axis, y = m.horiz, z = m.options, w = this.label, e = z.labels, r = e.step;
                m = k(this.tickmarkOffset, m.tickmarkOffset);
                var h = a.x;
                a = a.y;
                var n = !0;
                w && c(h) && (w.xy = a = this.getLabelPosition(h, a, w, y, e, m, q, r), this.isFirst && !this.isLast && !z.showFirstLabel || this.isLast && !this.isFirst && !z.showLastLabel ? n = !1 : !y || e.step || e.rotation || d || 0 === l || this.handleOverflow(a), r && q % r && (n = !1), n && c(a.y) ? (a.opacity = l, w[this.isNewLabel ? "attr" :
                    "animate"](a).show(!0), this.isNewLabel = !1) : (w.hide(), this.isNewLabel = !0));
            };
            v.prototype.replaceMovedLabel = function () { var a = this.label, c = this.axis, d = c.reversed; if (a && !this.isNew) {
                var k = c.horiz ? d ? c.left : c.width + c.left : a.xy.x;
                d = c.horiz ? a.xy.y : d ? c.width + c.top : c.top;
                a.animate({ x: k, y: d, opacity: 0 }, void 0, a.destroy);
                delete this.label;
            } c.isDirty = !0; this.label = this.movedLabel; delete this.movedLabel; };
            return v;
        }();
        "";
        return g;
    });
    P(g, "Core/Axis/Axis.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/AxisDefaults.js"],
        g["Core/Color/Color.js"], g["Core/DefaultOptions.js"], g["Core/Foundation.js"], g["Core/Globals.js"], g["Core/Axis/Tick.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A) {
        var t = d.animObject, q = E.defaultOptions, c = x.registerEventOptions, l = G.deg2rad, a = A.arrayMax, k = A.arrayMin, v = A.clamp, m = A.correctFloat, N = A.defined, F = A.destroyObjectProperties, L = A.erase, J = A.error, y = A.extend, z = A.fireEvent, w = A.isArray, e = A.isNumber, r = A.isString, h = A.merge, n = A.normalizeTickInterval, f = A.objectEach, b = A.pick, D = A.relativeLength, H = A.removeEvent, p = A.splat, u = A.syncTimeout, K = function (f, e) { return n(e, void 0, void 0, b(f.options.allowDecimals, .5 > e || void 0 !== f.tickAmount), !!f.tickAmount); };
        d = function () {
            function n(b, f) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange =
                    this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.bottom = this.alternateBands = void 0;
                this.init(b, f);
            }
            n.prototype.init = function (f, a) {
                var h = a.isX;
                this.chart =
                    f;
                this.horiz = f.inverted && !this.isZAxis ? !h : h;
                this.isXAxis = h;
                this.coll = this.coll || (h ? "xAxis" : "yAxis");
                z(this, "init", { userOptions: a });
                this.opposite = b(a.opposite, this.opposite);
                this.side = b(a.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(a);
                var n = this.options, u = n.labels, M = n.type;
                this.userOptions = a;
                this.minPixelPadding = 0;
                this.reversed = b(n.reversed, this.reversed);
                this.visible = n.visible;
                this.zoomEnabled = n.zoomEnabled;
                this.hasNames = "category" === M || !0 === n.categories;
                this.categories =
                    n.categories || (this.hasNames ? [] : void 0);
                this.names || (this.names = [], this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = N(n.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = n.minRange || n.maxZoom;
                this.range = n.range;
                this.offset = n.offset || 0;
                this.min = this.max = null;
                a = b(n.crosshair, p(f.options.tooltip.crosshairs)[h ? 0 : 1]);
                this.crosshair = !0 === a ? {} :
                    a;
                -1 === f.axes.indexOf(this) && (h ? f.axes.splice(f.xAxis.length, 0, this) : f.axes.push(this), f[this.coll].push(this));
                this.series = this.series || [];
                f.inverted && !this.isZAxis && h && "undefined" === typeof this.reversed && (this.reversed = !0);
                this.labelRotation = e(u.rotation) ? u.rotation : void 0;
                c(this, n);
                z(this, "afterInit");
            };
            n.prototype.setOptions = function (b) {
                this.options = h(g.defaultXAxisOptions, "yAxis" === this.coll && g.defaultYAxisOptions, [g.defaultTopAxisOptions, g.defaultRightAxisOptions, g.defaultBottomAxisOptions, g.defaultLeftAxisOptions][this.side], h(q[this.coll], b));
                z(this, "afterSetOptions", { userOptions: b });
            };
            n.prototype.defaultLabelFormatter = function (b) {
                var f = this.axis;
                b = this.chart.numberFormatter;
                var a = e(this.value) ? this.value : NaN, h = f.chart.time, c = this.dateTimeLabelFormat, p = q.lang, n = p.numericSymbols;
                p = p.numericSymbolMagnitude || 1E3;
                var u = f.logarithmic ? Math.abs(a) : f.tickInterval, M = n && n.length;
                if (f.categories)
                    var r = "".concat(this.value);
                else if (c)
                    r = h.dateFormat(c, a);
                else if (M && 1E3 <= u)
                    for (; M-- && "undefined" === typeof r;)
                        f = Math.pow(p, M + 1), u >= f &&
                            0 === 10 * a % f && null !== n[M] && 0 !== a && (r = b(a / f, -1) + n[M]);
                "undefined" === typeof r && (r = 1E4 <= Math.abs(a) ? b(a, -1) : b(a, -1, void 0, ""));
                return r;
            };
            n.prototype.getSeriesExtremes = function () {
                var f = this, a = f.chart, h;
                z(this, "getSeriesExtremes", null, function () {
                    f.hasVisibleSeries = !1;
                    f.dataMin = f.dataMax = f.threshold = null;
                    f.softThreshold = !f.isXAxis;
                    f.stacking && f.stacking.buildStacks();
                    f.series.forEach(function (c) {
                        if (c.visible || !a.options.chart.ignoreHiddenSeries) {
                            var p = c.options, n = p.threshold;
                            f.hasVisibleSeries = !0;
                            f.positiveValuesOnly &&
                                0 >= n && (n = null);
                            if (f.isXAxis) {
                                if (p = c.xData, p.length) {
                                    p = f.logarithmic ? p.filter(f.validatePositiveValue) : p;
                                    h = c.getXExtremes(p);
                                    var u = h.min;
                                    var r = h.max;
                                    e(u) || u instanceof Date || (p = p.filter(e), h = c.getXExtremes(p), u = h.min, r = h.max);
                                    p.length && (f.dataMin = Math.min(b(f.dataMin, u), u), f.dataMax = Math.max(b(f.dataMax, r), r));
                                }
                            }
                            else if (c = c.applyExtremes(), e(c.dataMin) && (u = c.dataMin, f.dataMin = Math.min(b(f.dataMin, u), u)), e(c.dataMax) && (r = c.dataMax, f.dataMax = Math.max(b(f.dataMax, r), r)), N(n) && (f.threshold = n), !p.softThreshold ||
                                f.positiveValuesOnly)
                                f.softThreshold = !1;
                        }
                    });
                });
                z(this, "afterGetSeriesExtremes");
            };
            n.prototype.translate = function (b, f, a, h, c, p) {
                var n = this.linkedParent || this, u = h && n.old ? n.old.min : n.min;
                if (!e(u))
                    return NaN;
                var r = n.minPixelPadding;
                c = (n.isOrdinal || n.brokenAxis && n.brokenAxis.hasBreaks || n.logarithmic && c) && n.lin2val;
                var M = 1, w = 0;
                h = h && n.old ? n.old.transA : n.transA;
                h || (h = n.transA);
                a && (M *= -1, w = n.len);
                n.reversed && (M *= -1, w -= M * (n.sector || n.len));
                f ? (p = (b * M + w - r) / h + u, c && (p = n.lin2val(p))) : (c && (b = n.val2lin(b)), b = M * (b - u) *
                    h, p = (n.isRadial ? b : m(b)) + w + M * r + (e(p) ? h * p : 0));
                return p;
            };
            n.prototype.toPixels = function (b, f) { return this.translate(b, !1, !this.horiz, void 0, !0) + (f ? 0 : this.pos); };
            n.prototype.toValue = function (b, f) { return this.translate(b - (f ? 0 : this.pos), !0, !this.horiz, void 0, !0); };
            n.prototype.getPlotLinePath = function (f) {
                function a(b, f, e) { if ("pass" !== k && b < f || b > e)
                    k ? b = v(b, f, e) : q = !0; return b; }
                var h = this, c = h.chart, p = h.left, n = h.top, u = f.old, r = f.value, M = f.lineWidth, w = u && c.oldChartHeight || c.chartHeight, D = u && c.oldChartWidth || c.chartWidth, d = h.transB, H = f.translatedValue, k = f.force, l, m, K, y, q;
                f = { value: r, lineWidth: M, old: u, force: k, acrossPanes: f.acrossPanes, translatedValue: H };
                z(this, "getPlotLinePath", f, function (f) { H = b(H, h.translate(r, void 0, void 0, u)); H = v(H, -1E5, 1E5); l = K = Math.round(H + d); m = y = Math.round(w - H - d); e(H) ? h.horiz ? (m = n, y = w - h.bottom, l = K = a(l, p, p + h.width)) : (l = p, K = D - h.right, m = y = a(m, n, n + h.height)) : (q = !0, k = !1); f.path = q && !k ? null : c.renderer.crispLine([["M", l, m], ["L", K, y]], M || 1); });
                return f.path;
            };
            n.prototype.getLinearTickPositions = function (b, f, e) { var a = m(Math.floor(f / b) * b); e = m(Math.ceil(e / b) * b); var h = [], c; m(a + b) === a && (c = 20); if (this.single)
                return [f]; for (f = a; f <= e;) {
                h.push(f);
                f = m(f + b, c);
                if (f === p)
                    break;
                var p = f;
            } return h; };
            n.prototype.getMinorTickInterval = function () { var f = this.options; return !0 === f.minorTicks ? b(f.minorTickInterval, "auto") : !1 === f.minorTicks ? null : f.minorTickInterval; };
            n.prototype.getMinorTickPositions = function () {
                var b = this.options, f = this.tickPositions, e = this.minorTickInterval, a = this.pointRangePadding || 0, h = this.min - a;
                a = this.max +
                    a;
                var c = a - h, p = [];
                if (c && c / e < this.len / 3) {
                    var n = this.logarithmic;
                    if (n)
                        this.paddedTicks.forEach(function (b, f, a) { f && p.push.apply(p, n.getLogTickPositions(e, a[f - 1], a[f], !0)); });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval())
                        p = p.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(e), h, a, b.startOfWeek));
                    else
                        for (b = h + (f[0] - h) % e; b <= a && b !== p[0]; b += e)
                            p.push(b);
                }
                0 !== p.length && this.trimTicks(p);
                return p;
            };
            n.prototype.adjustForMinRange = function () {
                var f = this.options, e = this.logarithmic, h = this.min, c = this.max, p = 0, n, u, r, w;
                this.isXAxis && "undefined" === typeof this.minRange && !e && (N(f.min) || N(f.max) || N(f.floor) || N(f.ceiling) ? this.minRange = null : (this.series.forEach(function (b) { r = b.xData; w = b.xIncrement ? 1 : r.length - 1; if (1 < r.length)
                    for (n = w; 0 < n; n--)
                        if (u = r[n] - r[n - 1], !p || u < p)
                            p = u; }), this.minRange = Math.min(5 * p, this.dataMax - this.dataMin)));
                if (c - h < this.minRange) {
                    var D = this.dataMax - this.dataMin >= this.minRange;
                    var d = this.minRange;
                    var H = (d - c + h) / 2;
                    H = [h - H, b(f.min, h - H)];
                    D && (H[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) :
                        this.dataMin);
                    h = a(H);
                    c = [h + d, b(f.max, h + d)];
                    D && (c[2] = e ? e.log2lin(this.dataMax) : this.dataMax);
                    c = k(c);
                    c - h < d && (H[0] = c - d, H[1] = b(f.min, c - d), h = a(H));
                }
                this.min = h;
                this.max = c;
            };
            n.prototype.getClosest = function () { var b; this.categories ? b = 1 : this.series.forEach(function (f) { var e = f.closestPointRange, h = f.visible || !f.chart.options.chart.ignoreHiddenSeries; !f.noSharedTooltip && N(e) && h && (b = N(b) ? Math.min(b, e) : e); }); return b; };
            n.prototype.nameToX = function (f) {
                var e = w(this.options.categories), h = e ? this.categories : this.names, a = f.options.x;
                f.series.requireSorting = !1;
                N(a) || (a = this.options.uniqueNames && h ? e ? h.indexOf(f.name) : b(h.keys[f.name], -1) : f.series.autoIncrement());
                if (-1 === a) {
                    if (!e && h)
                        var c = h.length;
                }
                else
                    c = a;
                "undefined" !== typeof c && (this.names[c] = f.name, this.names.keys[f.name] = c);
                return c;
            };
            n.prototype.updateNames = function () {
                var b = this, f = this.names;
                0 < f.length && (Object.keys(f.keys).forEach(function (b) { delete f.keys[b]; }), f.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (f) {
                    f.xIncrement = null;
                    if (!f.points ||
                        f.isDirtyData)
                        b.max = Math.max(b.max, f.xData.length - 1), f.processData(), f.generatePoints();
                    f.data.forEach(function (e, h) { if (e && e.options && "undefined" !== typeof e.name) {
                        var a = b.nameToX(e);
                        "undefined" !== typeof a && a !== e.x && (e.x = a, f.xData[h] = a);
                    } });
                }));
            };
            n.prototype.setAxisTranslation = function () {
                var f = this, e = f.max - f.min, h = f.linkedParent, a = !!f.categories, c = f.isXAxis, p = f.axisPointRange || 0, n = 0, u = 0, w = f.transA;
                if (c || a || p) {
                    var D = f.getClosest();
                    h ? (n = h.minPointOffset, u = h.pointRangePadding) : f.series.forEach(function (e) {
                        var h = a ? 1 : c ? b(e.options.pointRange, D, 0) : f.axisPointRange || 0, w = e.options.pointPlacement;
                        p = Math.max(p, h);
                        if (!f.single || a)
                            e = e.is("xrange") ? !c : c, n = Math.max(n, e && r(w) ? 0 : h / 2), u = Math.max(u, e && "on" === w ? 0 : h);
                    });
                    h = f.ordinal && f.ordinal.slope && D ? f.ordinal.slope / D : 1;
                    f.minPointOffset = n *= h;
                    f.pointRangePadding = u *= h;
                    f.pointRange = Math.min(p, f.single && a ? 1 : e);
                    c && (f.closestPointRange = D);
                }
                f.translationSlope = f.transA = w = f.staticScale || f.len / (e + u || 1);
                f.transB = f.horiz ? f.left : f.bottom;
                f.minPixelPadding = w * n;
                z(this, "afterSetAxisTranslation");
            };
            n.prototype.minFromRange = function () { return this.max - this.range; };
            n.prototype.setTickInterval = function (f) {
                var h = this.chart, a = this.logarithmic, c = this.options, p = this.isXAxis, n = this.isLinked, u = c.tickPixelInterval, r = this.categories, w = this.softThreshold, D = c.maxPadding, d = c.minPadding, H = e(c.tickInterval) && 0 <= c.tickInterval ? c.tickInterval : void 0, k = e(this.threshold) ? this.threshold : null;
                this.dateTime || r || n || this.getTickAmount();
                var l = b(this.userMin, c.min);
                var M = b(this.userMax, c.max);
                if (n) {
                    this.linkedParent = h[this.coll][c.linkedTo];
                    var y = this.linkedParent.getExtremes();
                    this.min = b(y.min, y.dataMin);
                    this.max = b(y.max, y.dataMax);
                    c.type !== this.linkedParent.options.type && J(11, 1, h);
                }
                else {
                    if (w && N(k))
                        if (this.dataMin >= k)
                            y = k, d = 0;
                        else if (this.dataMax <= k) {
                            var q = k;
                            D = 0;
                        }
                    this.min = b(l, y, this.dataMin);
                    this.max = b(M, q, this.dataMax);
                }
                a && (this.positiveValuesOnly && !f && 0 >= Math.min(this.min, b(this.dataMin, this.min)) && J(10, 1, h), this.min = m(a.log2lin(this.min), 16), this.max = m(a.log2lin(this.max), 16));
                this.range && N(this.max) && (this.userMin = this.min = l = Math.max(this.dataMin, this.minFromRange()), this.userMax = M = this.max, this.range = null);
                z(this, "foundExtremes");
                this.beforePadding && this.beforePadding();
                this.adjustForMinRange();
                !(r || this.axisPointRange || this.stacking && this.stacking.usePercentage || n) && N(this.min) && N(this.max) && (h = this.max - this.min) && (!N(l) && d && (this.min -= h * d), !N(M) && D && (this.max += h * D));
                e(this.userMin) || (e(c.softMin) && c.softMin < this.min && (this.min = l = c.softMin), e(c.floor) && (this.min = Math.max(this.min, c.floor)));
                e(this.userMax) || (e(c.softMax) && c.softMax > this.max &&
                    (this.max = M = c.softMax), e(c.ceiling) && (this.max = Math.min(this.max, c.ceiling)));
                w && N(this.dataMin) && (k = k || 0, !N(l) && this.min < k && this.dataMin >= k ? this.min = this.options.minRange ? Math.min(k, this.max - this.minRange) : k : !N(M) && this.max > k && this.dataMax <= k && (this.max = this.options.minRange ? Math.max(k, this.min + this.minRange) : k));
                e(this.min) && e(this.max) && !this.chart.polar && this.min > this.max && (N(this.options.min) ? this.max = this.min : N(this.options.max) && (this.min = this.max));
                this.tickInterval = this.min === this.max || "undefined" ===
                    typeof this.min || "undefined" === typeof this.max ? 1 : n && this.linkedParent && !H && u === this.linkedParent.options.tickPixelInterval ? H = this.linkedParent.tickInterval : b(H, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, r ? 1 : (this.max - this.min) * u / Math.max(this.len, u));
                if (p && !f) {
                    var v = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
                    this.series.forEach(function (b) { b.forceCrop = b.forceCropping && b.forceCropping(); b.processData(v); });
                    z(this, "postProcessData", { hasExtemesChanged: v });
                }
                this.setAxisTranslation();
                z(this, "initialAxisTranslation");
                this.pointRange && !H && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                f = b(c.minTickInterval, this.dateTime && !this.series.some(function (b) { return b.noSharedTooltip; }) ? this.closestPointRange : 0);
                !H && this.tickInterval < f && (this.tickInterval = f);
                this.dateTime || this.logarithmic || H || (this.tickInterval = K(this, this.tickInterval));
                this.tickAmount || (this.tickInterval = this.unsquish());
                this.setTickPositions();
            };
            n.prototype.setTickPositions = function () {
                var b = this.options, f = b.tickPositions, e = this.getMinorTickInterval(), h = this.hasVerticalPanning(), a = "colorAxis" === this.coll, c = (a || !h) && b.startOnTick;
                h = (a || !h) && b.endOnTick;
                a = b.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === b.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === e && this.tickInterval ? this.tickInterval / 5 : e;
                this.single = this.min === this.max && N(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== b.allowDecimals);
                this.tickPositions = e = f && f.slice();
                if (!e) {
                    if (this.ordinal &&
                        this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)))
                        if (this.dateTime)
                            e = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b.units), this.min, this.max, b.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0);
                        else if (this.logarithmic)
                            e = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
                        else
                            for (var p = b = this.tickInterval; p <= 2 * b;)
                                if (e = this.getLinearTickPositions(this.tickInterval, this.min, this.max),
                                    this.tickAmount && e.length > this.tickAmount)
                                    this.tickInterval = K(this, p *= 1.1);
                                else
                                    break;
                    else
                        e = [this.min, this.max], J(19, !1, this.chart);
                    e.length > this.len && (e = [e[0], e.pop()], e[0] === e[1] && (e.length = 1));
                    this.tickPositions = e;
                    a && (a = a.apply(this, [this.min, this.max])) && (this.tickPositions = e = a);
                }
                this.paddedTicks = e.slice(0);
                this.trimTicks(e, c, h);
                this.isLinked || (this.single && 2 > e.length && !this.categories && !this.series.some(function (b) { return b.is("heatmap") && "between" === b.options.pointPlacement; }) && (this.min -= .5,
                    this.max += .5), f || a || this.adjustTickAmount());
                z(this, "afterSetTickPositions");
            };
            n.prototype.trimTicks = function (b, f, e) { var h = b[0], a = b[b.length - 1], c = !this.isOrdinal && this.minPointOffset || 0; z(this, "trimTicks"); if (!this.isLinked) {
                if (f && -Infinity !== h)
                    this.min = h;
                else
                    for (; this.min - c > b[0];)
                        b.shift();
                if (e)
                    this.max = a;
                else
                    for (; this.max + c < b[b.length - 1];)
                        b.pop();
                0 === b.length && N(h) && !this.options.tickPositions && b.push((a + h) / 2);
            } };
            n.prototype.alignToOthers = function () {
                var b = this, f = [this], h = b.options, a = "yAxis" === this.coll &&
                    this.chart.options.chart.alignThresholds, c = [], p;
                b.thresholdAlignment = void 0;
                if ((!1 !== this.chart.options.chart.alignTicks && h.alignTicks || a) && !1 !== h.startOnTick && !1 !== h.endOnTick && !b.logarithmic) {
                    var n = function (b) { var f = b.options; return [b.horiz ? f.left : f.top, f.width, f.height, f.pane].join(); }, u = n(this);
                    this.chart[this.coll].forEach(function (e) { var h = e.series; h.length && h.some(function (b) { return b.visible; }) && e !== b && n(e) === u && (p = !0, f.push(e)); });
                }
                if (p && a) {
                    f.forEach(function (f) {
                        f = f.getThresholdAlignment(b);
                        e(f) && c.push(f);
                    });
                    var r = 1 < c.length ? c.reduce(function (b, f) { return b + f; }, 0) / c.length : void 0;
                    f.forEach(function (b) { b.thresholdAlignment = r; });
                }
                return p;
            };
            n.prototype.getThresholdAlignment = function (b) { (!e(this.dataMin) || this !== b && this.series.some(function (b) { return b.isDirty || b.isDirtyData; })) && this.getSeriesExtremes(); if (e(this.threshold))
                return b = v((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (b = 1 - b), b; };
            n.prototype.getTickAmount = function () {
                var b = this.options, f = b.tickPixelInterval, e = b.tickAmount;
                !N(b.tickInterval) && !e && this.len < f && !this.isRadial && !this.logarithmic && b.startOnTick && b.endOnTick && (e = 2);
                !e && this.alignToOthers() && (e = Math.ceil(this.len / f) + 1);
                4 > e && (this.finalTickAmt = e, e = 5);
                this.tickAmount = e;
            };
            n.prototype.adjustTickAmount = function () {
                var f = this, h = f.finalTickAmt, a = f.max, c = f.min, p = f.options, n = f.tickPositions, u = f.tickAmount, r = f.thresholdAlignment, w = n && n.length, D = b(f.threshold, f.softThreshold ? 0 : null);
                var H = f.tickInterval;
                if (e(r)) {
                    var d = .5 > r ? Math.ceil(r *
                        (u - 1)) : Math.floor(r * (u - 1));
                    p.reversed && (d = u - 1 - d);
                }
                if (f.hasData() && e(c) && e(a)) {
                    r = function () { f.transA *= (w - 1) / (u - 1); f.min = p.startOnTick ? n[0] : Math.min(c, n[0]); f.max = p.endOnTick ? n[n.length - 1] : Math.max(a, n[n.length - 1]); };
                    if (e(d) && e(f.threshold)) {
                        for (; n[d] !== D || n.length !== u || n[0] > c || n[n.length - 1] < a;) {
                            n.length = 0;
                            for (n.push(f.threshold); n.length < u;)
                                void 0 === n[d] || n[d] > f.threshold ? n.unshift(m(n[0] - H)) : n.push(m(n[n.length - 1] + H));
                            if (H > 8 * f.tickInterval)
                                break;
                            H *= 2;
                        }
                        r();
                    }
                    else if (w < u) {
                        for (; n.length < u;)
                            n.length % 2 || c ===
                                D ? n.push(m(n[n.length - 1] + H)) : n.unshift(m(n[0] - H));
                        r();
                    }
                    if (N(h)) {
                        for (H = D = n.length; H--;)
                            (3 === h && 1 === H % 2 || 2 >= h && 0 < H && H < D - 1) && n.splice(H, 1);
                        f.finalTickAmt = void 0;
                    }
                }
            };
            n.prototype.setScale = function () {
                var b = !1, f = !1;
                this.series.forEach(function (e) { b = b || e.isDirtyData || e.isDirty; f = f || e.xAxis && e.xAxis.isDirty || !1; });
                this.setAxisSize();
                var e = this.len !== (this.old && this.old.len);
                e || b || f || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ?
                    (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = e || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                b && this.panningState && (this.panningState.isDirty = !0);
                z(this, "afterSetScale");
            };
            n.prototype.setExtremes = function (f, e, h, a, c) {
                var n = this, p = n.chart;
                h = b(h, !0);
                n.series.forEach(function (b) { delete b.kdTree; });
                c = y(c, { min: f, max: e });
                z(n, "setExtremes", c, function () { n.userMin = f; n.userMax = e; n.eventArgs = c; h && p.redraw(a); });
            };
            n.prototype.zoom = function (f, e) {
                var h = this, a = this.dataMin, c = this.dataMax, n = this.options, p = Math.min(a, b(n.min, a)), u = Math.max(c, b(n.max, c));
                f = { newMin: f, newMax: e };
                z(this, "zoom", f, function (b) {
                    var f = b.newMin, e = b.newMax;
                    if (f !== h.min || e !== h.max)
                        h.allowZoomOutside || (N(a) && (f < p && (f = p), f > u && (f = u)), N(c) && (e < p && (e = p), e > u && (e = u))), h.displayBtn = "undefined" !== typeof f || "undefined" !== typeof e, h.setExtremes(f, e, !1, void 0, { trigger: "zoom" });
                    b.zoomed =
                        !0;
                });
                return f.zoomed;
            };
            n.prototype.setAxisSize = function () {
                var f = this.chart, e = this.options, h = e.offsets || [0, 0, 0, 0], a = this.horiz, c = this.width = Math.round(D(b(e.width, f.plotWidth - h[3] + h[1]), f.plotWidth)), n = this.height = Math.round(D(b(e.height, f.plotHeight - h[0] + h[2]), f.plotHeight)), p = this.top = Math.round(D(b(e.top, f.plotTop + h[0]), f.plotHeight, f.plotTop));
                e = this.left = Math.round(D(b(e.left, f.plotLeft + h[3]), f.plotWidth, f.plotLeft));
                this.bottom = f.chartHeight - n - p;
                this.right = f.chartWidth - c - e;
                this.len = Math.max(a ?
                    c : n, 0);
                this.pos = a ? e : p;
            };
            n.prototype.getExtremes = function () { var b = this.logarithmic; return { min: b ? m(b.lin2log(this.min)) : this.min, max: b ? m(b.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax }; };
            n.prototype.getThreshold = function (b) { var f = this.logarithmic, e = f ? f.lin2log(this.min) : this.min; f = f ? f.lin2log(this.max) : this.max; null === b || -Infinity === b ? b = e : Infinity === b ? b = f : e > b ? b = e : f < b && (b = f); return this.translate(b, 0, 1, 0, 1); };
            n.prototype.autoLabelAlign =
                function (f) { var e = (b(f, 0) - 90 * this.side + 720) % 360; f = { align: "center" }; z(this, "autoLabelAlign", f, function (b) { 15 < e && 165 > e ? b.align = "right" : 195 < e && 345 > e && (b.align = "left"); }); return f.align; };
            n.prototype.tickSize = function (f) { var e = this.options, h = b(e["tick" === f ? "tickWidth" : "minorTickWidth"], "tick" === f && this.isXAxis && !this.categories ? 1 : 0), a = e["tick" === f ? "tickLength" : "minorTickLength"]; if (h && a) {
                "inside" === e[f + "Position"] && (a = -a);
                var c = [a, h];
            } f = { tickSize: c }; z(this, "afterTickSize", f); return f.tickSize; };
            n.prototype.labelMetrics =
                function () { var b = this.tickPositions && this.tickPositions[0] || 0; return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[b] && this.ticks[b].label); };
            n.prototype.unsquish = function () {
                var f = this.options.labels, h = this.horiz, a = this.tickInterval, c = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / a), n = f.rotation, p = this.labelMetrics(), u = Math.max(this.max - this.min, 0), r = function (b) {
                    var f = b / (c || 1);
                    f = 1 < f ? Math.ceil(f) : 1;
                    f * a > u && Infinity !== b && Infinity !== c && u && (f = Math.ceil(u / a));
                    return m(f *
                        a);
                }, w = a, H, D, d = Number.MAX_VALUE;
                if (h) {
                    if (!f.staggerLines && !f.step)
                        if (e(n))
                            var k = [n];
                        else
                            c < f.autoRotationLimit && (k = f.autoRotation);
                    k && k.forEach(function (b) { if (b === n || b && -90 <= b && 90 >= b) {
                        D = r(Math.abs(p.h / Math.sin(l * b)));
                        var f = D + Math.abs(b / 360);
                        f < d && (d = f, H = b, w = D);
                    } });
                }
                else
                    f.step || (w = r(p.h));
                this.autoRotation = k;
                this.labelRotation = b(H, e(n) ? n : 0);
                return w;
            };
            n.prototype.getSlotWidth = function (b) {
                var f = this.chart, h = this.horiz, a = this.options.labels, c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), n = f.margin[3];
                if (b && e(b.slotWidth))
                    return b.slotWidth;
                if (h && 2 > a.step)
                    return a.rotation ? 0 : (this.staggerLines || 1) * this.len / c;
                if (!h) {
                    b = a.style.width;
                    if (void 0 !== b)
                        return parseInt(String(b), 10);
                    if (n)
                        return n - f.spacing[3];
                }
                return .33 * f.chartWidth;
            };
            n.prototype.renderUnsquish = function () {
                var b = this.chart, f = b.renderer, e = this.tickPositions, h = this.ticks, a = this.options.labels, c = a.style, n = this.horiz, p = this.getSlotWidth(), u = Math.max(1, Math.round(p - 2 * a.padding)), w = {}, H = this.labelMetrics(), D = c.textOverflow, d = 0;
                r(a.rotation) ||
                    (w.rotation = a.rotation || 0);
                e.forEach(function (b) { b = h[b]; b.movedLabel && b.replaceMovedLabel(); b && b.label && b.label.textPxLength > d && (d = b.label.textPxLength); });
                this.maxLabelLength = d;
                if (this.autoRotation)
                    d > u && d > H.h ? w.rotation = this.labelRotation : this.labelRotation = 0;
                else if (p) {
                    var k = u;
                    if (!D) {
                        var l = "clip";
                        for (u = e.length; !n && u--;) {
                            var m = e[u];
                            if (m = h[m].label)
                                m.styles && "ellipsis" === m.styles.textOverflow ? m.css({ textOverflow: "clip" }) : m.textPxLength > p && m.css({ width: p + "px" }), m.getBBox().height > this.len / e.length -
                                    (H.h - H.f) && (m.specificTextOverflow = "ellipsis");
                        }
                    }
                }
                w.rotation && (k = d > .5 * b.chartHeight ? .33 * b.chartHeight : d, D || (l = "ellipsis"));
                if (this.labelAlign = a.align || this.autoLabelAlign(this.labelRotation))
                    w.align = this.labelAlign;
                e.forEach(function (b) {
                    var f = (b = h[b]) && b.label, e = c.width, a = {};
                    f && (f.attr(w), b.shortenLabel ? b.shortenLabel() : k && !e && "nowrap" !== c.whiteSpace && (k < f.textPxLength || "SPAN" === f.element.tagName) ? (a.width = k + "px", D || (a.textOverflow = f.specificTextOverflow || l), f.css(a)) : f.styles && f.styles.width && !a.width &&
                        !e && f.css({ width: null }), delete f.specificTextOverflow, b.rotation = w.rotation);
                }, this);
                this.tickRotCorr = f.rotCorr(H.b, this.labelRotation || 0, 0 !== this.side);
            };
            n.prototype.hasData = function () { return this.series.some(function (b) { return b.hasData(); }) || this.options.showEmpty && N(this.min) && N(this.max); };
            n.prototype.addTitle = function (b) {
                var f = this.chart.renderer, e = this.horiz, a = this.opposite, c = this.options.title, n = this.chart.styledMode, p;
                this.axisTitle || ((p = c.textAlign) || (p = (e ? { low: "left", middle: "center", high: "right" } :
                    { low: a ? "right" : "left", middle: "center", high: a ? "left" : "right" })[c.align]), this.axisTitle = f.text(c.text || "", 0, 0, c.useHTML).attr({ zIndex: 7, rotation: c.rotation, align: p }).addClass("highcharts-axis-title"), n || this.axisTitle.css(h(c.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                n || c.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
                this.axisTitle[b ? "show" : "hide"](b);
            };
            n.prototype.generateTick = function (b) { var f = this.ticks; f[b] ? f[b].addLabel() : f[b] = new I(this, b); };
            n.prototype.getOffset =
                function () {
                    var e = this, h = this, a = h.chart, c = h.horiz, n = h.options, p = h.side, u = h.ticks, r = h.tickPositions, w = h.coll, H = h.axisParent, D = a.renderer, d = a.inverted && !h.isZAxis ? [1, 0, 3, 2][p] : p, k = h.hasData(), l = n.title, m = n.labels, K = a.axisOffset;
                    a = a.clipOffset;
                    var y = [-1, 1, 1, -1][p], q = n.className, v, g = 0, t = 0, F = 0;
                    h.showAxis = v = k || n.showEmpty;
                    h.staggerLines = h.horiz && m.staggerLines || void 0;
                    if (!h.axisGroup) {
                        var L = function (b, f, h) {
                            return D.g(b).attr({ zIndex: h }).addClass("highcharts-".concat(w.toLowerCase()).concat(f, " ") + (e.isRadial ?
                                "highcharts-radial-axis".concat(f, " ") : "") + (q || "")).add(H);
                        };
                        h.gridGroup = L("grid", "-grid", n.gridZIndex);
                        h.axisGroup = L("axis", "", n.zIndex);
                        h.labelGroup = L("axis-labels", "-labels", m.zIndex);
                    }
                    k || h.isLinked ? (r.forEach(function (b) { h.generateTick(b); }), h.renderUnsquish(), h.reserveSpaceDefault = 0 === p || 2 === p || { 1: "left", 3: "right" }[p] === h.labelAlign, b(m.reserveSpace, "center" === h.labelAlign ? !0 : null, h.reserveSpaceDefault) && r.forEach(function (b) { F = Math.max(u[b].getLabelSize(), F); }), h.staggerLines && (F *= h.staggerLines),
                        h.labelOffset = F * (h.opposite ? -1 : 1)) : f(u, function (b, f) { b.destroy(); delete u[f]; });
                    if (l && l.text && !1 !== l.enabled && (h.addTitle(v), v && !1 !== l.reserveSpace)) {
                        h.titleOffset = g = h.axisTitle.getBBox()[c ? "height" : "width"];
                        var J = l.offset;
                        t = N(J) ? 0 : b(l.margin, c ? 5 : 10);
                    }
                    h.renderLine();
                    h.offset = y * b(n.offset, K[p] ? K[p] + (n.margin || 0) : 0);
                    h.tickRotCorr = h.tickRotCorr || { x: 0, y: 0 };
                    l = 0 === p ? -h.labelMetrics().h : 2 === p ? h.tickRotCorr.y : 0;
                    k = Math.abs(F) + t;
                    F && (k = k - l + y * (c ? b(m.y, h.tickRotCorr.y + 8 * y) : m.x));
                    h.axisTitleMargin = b(J, k);
                    h.getMaxLabelDimensions &&
                        (h.maxLabelDimensions = h.getMaxLabelDimensions(u, r));
                    "colorAxis" !== w && (c = this.tickSize("tick"), K[p] = Math.max(K[p], (h.axisTitleMargin || 0) + g + y * h.offset, k, r && r.length && c ? c[0] + y * h.offset : 0), n = !h.axisLine || n.offset ? 0 : 2 * Math.floor(h.axisLine.strokeWidth() / 2), a[d] = Math.max(a[d], n));
                    z(this, "afterGetOffset");
                };
            n.prototype.getLinePath = function (b) {
                var f = this.chart, e = this.opposite, h = this.offset, a = this.horiz, c = this.left + (e ? this.width : 0) + h;
                h = f.chartHeight - this.bottom - (e ? this.height : 0) + h;
                e && (b *= -1);
                return f.renderer.crispLine([["M",
                        a ? this.left : c, a ? h : this.top], ["L", a ? f.chartWidth - this.right : c, a ? h : f.chartHeight - this.bottom]], b);
            };
            n.prototype.renderLine = function () { this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 })); };
            n.prototype.getTitlePosition = function () {
                var b = this.horiz, f = this.left, e = this.top, h = this.len, a = this.options.title, c = b ? f : e, n = this.opposite, p = this.offset, u = a.x, r = a.y, w = this.axisTitle, H = this.chart.renderer.fontMetrics(a.style.fontSize, w);
                w = w ? Math.max(w.getBBox(!1, 0).height - H.h - 1, 0) : 0;
                h = { low: c + (b ? 0 : h), middle: c + h / 2, high: c + (b ? h : 0) }[a.align];
                f = (b ? e + this.height : f) + (b ? 1 : -1) * (n ? -1 : 1) * (this.axisTitleMargin || 0) + [-w, w, H.f, -w][this.side];
                b = { x: b ? h + u : f + (n ? this.width : 0) + p + u, y: b ? f + r - (n ? this.height : 0) + p : h + r };
                z(this, "afterGetTitlePosition", { titlePosition: b });
                return b;
            };
            n.prototype.renderMinorTick = function (b, f) {
                var e = this.minorTicks;
                e[b] || (e[b] = new I(this, b, "minor"));
                f && e[b].isNew && e[b].render(null, !0);
                e[b].render(null, !1, 1);
            };
            n.prototype.renderTick = function (b, f, e) { var h = this.ticks; if (!this.isLinked || b >= this.min && b <= this.max || this.grid && this.grid.isColumn)
                h[b] || (h[b] = new I(this, b)), e && h[b].isNew && h[b].render(f, !0, -1), h[b].render(f); };
            n.prototype.render = function () {
                var b = this, h = b.chart, a = b.logarithmic, c = b.options, n = b.isLinked, p = b.tickPositions, r = b.axisTitle, w = b.ticks, H = b.minorTicks, D = b.alternateBands, d = c.stackLabels, k = c.alternateGridColor, l = b.tickmarkOffset, m = b.axisLine, K = b.showAxis, y = t(h.renderer.globalAnimation), q, v;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [w, H, D].forEach(function (b) { f(b, function (b) { b.isActive = !1; }); });
                if (b.hasData() || n) {
                    var g = b.chart.hasRendered && b.old && e(b.old.min);
                    b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (f) { b.renderMinorTick(f, g); });
                    p.length && (p.forEach(function (f, e) { b.renderTick(f, e, g); }), l && (0 === b.min || b.single) && (w[-1] || (w[-1] = new I(b, -1, null, !0)), w[-1].render(-1)));
                    k && p.forEach(function (f, e) {
                        v = "undefined" !==
                            typeof p[e + 1] ? p[e + 1] + l : b.max - l;
                        0 === e % 2 && f < b.max && v <= b.max + (h.polar ? -l : l) && (D[f] || (D[f] = new G.PlotLineOrBand(b)), q = f + l, D[f].options = { from: a ? a.lin2log(q) : q, to: a ? a.lin2log(v) : v, color: k, className: "highcharts-alternate-grid" }, D[f].render(), D[f].isActive = !0);
                    });
                    b._addedPlotLB || (b._addedPlotLB = !0, (c.plotLines || []).concat(c.plotBands || []).forEach(function (f) { b.addPlotBandOrLine(f); }));
                }
                [w, H, D].forEach(function (b) {
                    var e = [], a = y.duration;
                    f(b, function (b, f) { b.isActive || (b.render(f, !1, 0), b.isActive = !1, e.push(f)); });
                    u(function () { for (var f = e.length; f--;)
                        b[e[f]] && !b[e[f]].isActive && (b[e[f]].destroy(), delete b[e[f]]); }, b !== D && h.hasRendered && a ? a : 0);
                });
                m && (m[m.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(m.strokeWidth()) }), m.isPlaced = !0, m[K ? "show" : "hide"](K));
                r && K && (c = b.getTitlePosition(), r[r.isNew ? "attr" : "animate"](c), r.isNew = !1);
                d && d.enabled && b.stacking && b.stacking.renderStackTotals();
                b.old = { len: b.len, max: b.max, min: b.min, transA: b.transA, userMax: b.userMax, userMin: b.userMin };
                b.isDirty = !1;
                z(this, "afterRender");
            };
            n.prototype.redraw =
                function () { this.visible && (this.render(), this.plotLinesAndBands.forEach(function (b) { b.render(); })); this.series.forEach(function (b) { b.isDirty = !0; }); };
            n.prototype.getKeepProps = function () { return this.keepProps || n.keepProps; };
            n.prototype.destroy = function (b) {
                var e = this, h = e.plotLinesAndBands, a = this.eventOptions;
                z(this, "destroy", { keepEvents: b });
                b || H(e);
                [e.ticks, e.minorTicks, e.alternateBands].forEach(function (b) { F(b); });
                if (h)
                    for (b = h.length; b--;)
                        h[b].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (b) {
                    e[b] &&
                        (e[b] = e[b].destroy());
                });
                for (var c in e.plotLinesAndBandsGroups)
                    e.plotLinesAndBandsGroups[c] = e.plotLinesAndBandsGroups[c].destroy();
                f(e, function (b, f) { -1 === e.getKeepProps().indexOf(f) && delete e[f]; });
                this.eventOptions = a;
            };
            n.prototype.drawCrosshair = function (f, e) {
                var h = this.crosshair, a = b(h && h.snap, !0), c = this.chart, n, p = this.cross;
                z(this, "drawCrosshair", { e: f, point: e });
                f || (f = this.cross && this.cross.e);
                if (h && !1 !== (N(e) || !a)) {
                    a ? N(e) && (n = b("colorAxis" !== this.coll ? e.crosshairPos : null, this.isXAxis ? e.plotX : this.len -
                        e.plotY)) : n = f && (this.horiz ? f.chartX - this.pos : this.len - f.chartY + this.pos);
                    if (N(n)) {
                        var u = { value: e && (this.isXAxis ? e.x : b(e.stackY, e.y)), translatedValue: n };
                        c.polar && y(u, { isCrosshair: !0, chartX: f && f.chartX, chartY: f && f.chartY, point: e });
                        u = this.getPlotLinePath(u) || null;
                    }
                    if (!N(u)) {
                        this.hideCrosshair();
                        return;
                    }
                    a = this.categories && !this.isRadial;
                    p || (this.cross = p = c.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a ? "category " : "thin ") + (h.className || "")).attr({ zIndex: b(h.zIndex, 2) }).add(), c.styledMode ||
                        (p.attr({ stroke: h.color || (a ? B.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": b(h.width, 1) }).css({ "pointer-events": "none" }), h.dashStyle && p.attr({ dashstyle: h.dashStyle })));
                    p.show().attr({ d: u });
                    a && !h.width && p.attr({ "stroke-width": this.transA });
                    this.cross.e = f;
                }
                else
                    this.hideCrosshair();
                z(this, "afterDrawCrosshair", { e: f, point: e });
            };
            n.prototype.hideCrosshair = function () { this.cross && this.cross.hide(); z(this, "afterHideCrosshair"); };
            n.prototype.hasVerticalPanning = function () {
                var b = this.chart.options.chart.panning;
                return !!(b && b.enabled && /y/.test(b.type));
            };
            n.prototype.validatePositiveValue = function (b) { return e(b) && 0 < b; };
            n.prototype.update = function (f, e) { var a = this.chart; f = h(this.userOptions, f); this.destroy(!0); this.init(a, f); a.isDirtyBox = !0; b(e, !0) && a.redraw(); };
            n.prototype.remove = function (f) { for (var e = this.chart, h = this.coll, a = this.series, c = a.length; c--;)
                a[c] && a[c].remove(!1); L(e.axes, this); L(e[h], this); e[h].forEach(function (b, f) { b.options.index = b.userOptions.index = f; }); this.destroy(); e.isDirtyBox = !0; b(f, !0) && e.redraw(); };
            n.prototype.setTitle = function (b, f) { this.update({ title: b }, f); };
            n.prototype.setCategories = function (b, f) { this.update({ categories: b }, f); };
            n.defaultOptions = g.defaultXAxisOptions;
            n.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return n;
        }();
        "";
        return d;
    });
    P(g, "Core/Axis/DateTimeAxis.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.addEvent, B = d.getMagnitude, E = d.normalizeTickInterval, x = d.timeUnits, G;
        (function (d) {
            function A() { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments); }
            function t(d) { "datetime" !== d.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new c(this)); }
            var q = [];
            d.compose = function (c) { -1 === q.indexOf(c) && (q.push(c), c.keepProps.push("dateTime"), c.prototype.getTimeTicks = A, g(c, "init", t)); return c; };
            var c = function () {
                function c(a) { this.axis = a; }
                c.prototype.normalizeTimeTickInterval = function (a, c) {
                    var d = c || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]],
                        ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
                    c = d[d.length - 1];
                    var k = x[c[0]], l = c[1], q;
                    for (q = 0; q < d.length && !(c = d[q], k = x[c[0]], l = c[1], d[q + 1] && a <= (k * l[l.length - 1] + x[d[q + 1][0]]) / 2); q++)
                        ;
                    k === x.year && a < 5 * k && (l = [1, 2, 5]);
                    a = E(a / k, l, "year" === c[0] ? Math.max(B(a / k), 1) : 1);
                    return { unitRange: k, count: a, unitName: c[0] };
                };
                c.prototype.getXDateFormat = function (a, c) {
                    var d = this.axis, k = d.chart.time;
                    return d.closestPointRange ? k.getDateFormat(d.closestPointRange, a, d.options.startOfWeek, c) || k.resolveDTLFormat(c.year).main :
                        k.resolveDTLFormat(c.day).main;
                };
                return c;
            }();
            d.Additions = c;
        })(G || (G = {}));
        return G;
    });
    P(g, "Core/Axis/LogarithmicAxis.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.addEvent, B = d.normalizeTickInterval, E = d.pick, x;
        (function (d) {
            function x(c) { var d = this.logarithmic; "logarithmic" !== c.userOptions.type ? this.logarithmic = void 0 : d || (this.logarithmic = new q(this)); }
            function A() { var c = this.logarithmic; c && (this.lin2val = function (d) { return c.lin2log(d); }, this.val2lin = function (d) { return c.log2lin(d); }); }
            var t = [];
            d.compose =
                function (c) { -1 === t.indexOf(c) && (t.push(c), c.keepProps.push("logarithmic"), g(c, "init", x), g(c, "afterInit", A)); return c; };
            var q = function () {
                function c(c) { this.axis = c; }
                c.prototype.getLogTickPositions = function (c, a, d, q) {
                    var k = this.axis, l = k.len, v = k.options, g = [];
                    q || (this.minorAutoInterval = void 0);
                    if (.5 <= c)
                        c = Math.round(c), g = k.getLinearTickPositions(c, a, d);
                    else if (.08 <= c) {
                        var t = Math.floor(a), y, z = v = void 0;
                        for (l = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; t < d + 1 && !z; t++) {
                            var w = l.length;
                            for (y = 0; y < w && !z; y++) {
                                var e = this.log2lin(this.lin2log(t) * l[y]);
                                e > a && (!q || v <= d) && "undefined" !== typeof v && g.push(v);
                                v > d && (z = !0);
                                v = e;
                            }
                        }
                    }
                    else
                        a = this.lin2log(a), d = this.lin2log(d), c = q ? k.getMinorTickInterval() : v.tickInterval, c = E("auto" === c ? null : c, this.minorAutoInterval, v.tickPixelInterval / (q ? 5 : 1) * (d - a) / ((q ? l / k.tickPositions.length : l) || 1)), c = B(c), g = k.getLinearTickPositions(c, a, d).map(this.log2lin), q || (this.minorAutoInterval = c / 5);
                    q || (k.tickInterval = c);
                    return g;
                };
                c.prototype.lin2log = function (c) { return Math.pow(10, c); };
                c.prototype.log2lin =
                    function (c) { return Math.log(c) / Math.LN10; };
                return c;
            }();
            d.Additions = q;
        })(x || (x = {}));
        return x;
    });
    P(g, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.erase, B = d.extend, E = d.isNumber, x;
        (function (d) {
            var x = [], A;
            d.compose = function (d, c) { A || (A = d); -1 === x.indexOf(c) && (x.push(c), B(c.prototype, t.prototype)); return c; };
            var t = function () {
                function d() { }
                d.prototype.getPlotBandPath = function (c, d, a) {
                    void 0 === a && (a = this.options);
                    var k = this.getPlotLinePath({ value: d, force: !0, acrossPanes: a.acrossPanes }), l = [], m = this.horiz;
                    d = !E(this.min) || !E(this.max) || c < this.min && d < this.min || c > this.max && d > this.max;
                    c = this.getPlotLinePath({ value: c, force: !0, acrossPanes: a.acrossPanes });
                    a = 1;
                    if (c && k) {
                        if (d) {
                            var q = c.toString() === k.toString();
                            a = 0;
                        }
                        for (d = 0; d < c.length; d += 2) {
                            var g = c[d], t = c[d + 1], J = k[d], y = k[d + 1];
                            "M" !== g[0] && "L" !== g[0] || "M" !== t[0] && "L" !== t[0] || "M" !== J[0] && "L" !== J[0] || "M" !== y[0] && "L" !== y[0] || (m && J[1] === g[1] ? (J[1] += a, y[1] += a) : m || J[2] !== g[2] || (J[2] += a, y[2] += a), l.push(["M", g[1], g[2]], ["L", t[1], t[2]], ["L", y[1], y[2]], ["L", J[1], J[2]], ["Z"]));
                            l.isFlat = q;
                        }
                    }
                    return l;
                };
                d.prototype.addPlotBand = function (c) { return this.addPlotBandOrLine(c, "plotBands"); };
                d.prototype.addPlotLine = function (c) { return this.addPlotBandOrLine(c, "plotLines"); };
                d.prototype.addPlotBandOrLine = function (c, d) { var a = this, k = this.userOptions, l = new A(this, c); this.visible && (l = l.render()); if (l) {
                    this._addedPlotLB || (this._addedPlotLB = !0, (k.plotLines || []).concat(k.plotBands || []).forEach(function (c) { a.addPlotBandOrLine(c); }));
                    if (d) {
                        var m = k[d] || [];
                        m.push(c);
                        k[d] = m;
                    }
                    this.plotLinesAndBands.push(l);
                } return l; };
                d.prototype.removePlotBandOrLine = function (c) { var d = this.plotLinesAndBands, a = this.options, k = this.userOptions; if (d) {
                    for (var q = d.length; q--;)
                        d[q].id === c && d[q].destroy();
                    [a.plotLines || [], k.plotLines || [], a.plotBands || [], k.plotBands || []].forEach(function (a) { for (q = a.length; q--;)
                        (a[q] || {}).id === c && g(a, a[q]); });
                } };
                d.prototype.removePlotBand = function (c) { this.removePlotBandOrLine(c); };
                d.prototype.removePlotLine = function (c) { this.removePlotBandOrLine(c); };
                return d;
            }();
        })(x || (x = {}));
        return x;
    });
    P(g, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [g["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], g["Core/Utilities.js"]], function (d, g) {
        var B = g.arrayMax, C = g.arrayMin, x = g.defined, G = g.destroyObjectProperties, I = g.erase, A = g.fireEvent, t = g.merge, q = g.objectEach, c = g.pick;
        g = function () {
            function l(a, c) { this.axis = a; c && (this.options = c, this.id = c.id); }
            l.compose = function (a) { return d.compose(l, a); };
            l.prototype.render = function () {
                A(this, "render");
                var a = this, d = a.axis, l = d.horiz, m = d.logarithmic, g = a.options, F = g.color, L = c(g.zIndex, 0), J = g.events, y = {}, z = d.chart.renderer, w = g.label, e = a.label, r = g.to, h = g.from, n = g.value, f = a.svgElem, b = [], D = x(h) && x(r);
                b = x(n);
                var H = !f, p = { "class": "highcharts-plot-" + (D ? "band " : "line ") + (g.className || "") }, u = D ? "bands" : "lines";
                m && (h = m.log2lin(h), r = m.log2lin(r), n = m.log2lin(n));
                d.chart.styledMode || (b ? (p.stroke = F || "#999999", p["stroke-width"] = c(g.width, 1), g.dashStyle && (p.dashstyle = g.dashStyle)) : D && (p.fill = F || "#e6ebf5", g.borderWidth && (p.stroke = g.borderColor, p["stroke-width"] = g.borderWidth)));
                y.zIndex = L;
                u += "-" + L;
                (m = d.plotLinesAndBandsGroups[u]) || (d.plotLinesAndBandsGroups[u] =
                    m = z.g("plot-" + u).attr(y).add());
                H && (a.svgElem = f = z.path().attr(p).add(m));
                if (b)
                    b = d.getPlotLinePath({ value: n, lineWidth: f.strokeWidth(), acrossPanes: g.acrossPanes });
                else if (D)
                    b = d.getPlotBandPath(h, r, g);
                else
                    return;
                !a.eventsAdded && J && (q(J, function (b, e) { f.on(e, function (b) { J[e].apply(a, [b]); }); }), a.eventsAdded = !0);
                (H || !f.d) && b && b.length ? f.attr({ d: b }) : f && (b ? (f.show(), f.animate({ d: b })) : f.d && (f.hide(), e && (a.label = e = e.destroy())));
                w && (x(w.text) || x(w.formatter)) && b && b.length && 0 < d.width && 0 < d.height && !b.isFlat ? (w =
                    t({ align: l && D && "center", x: l ? !D && 4 : 10, verticalAlign: !l && D && "middle", y: l ? D ? 16 : 10 : D ? 6 : -4, rotation: l && !D && 90 }, w), this.renderLabel(w, b, D, L)) : e && e.hide();
                return a;
            };
            l.prototype.renderLabel = function (a, c, d, m) {
                var k = this.axis, l = k.chart.renderer, q = this.label;
                q || (this.label = q = l.text(this.getLabelText(a), 0, 0, a.useHTML).attr({ align: a.textAlign || a.align, rotation: a.rotation, "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || ""), zIndex: m }).add(), k.chart.styledMode || q.css(t({ textOverflow: "ellipsis" }, a.style)));
                m = c.xBounds || [c[0][1], c[1][1], d ? c[2][1] : c[0][1]];
                c = c.yBounds || [c[0][2], c[1][2], d ? c[2][2] : c[0][2]];
                d = C(m);
                l = C(c);
                q.align(a, !1, { x: d, y: l, width: B(m) - d, height: B(c) - l });
                q.alignValue && "left" !== q.alignValue || q.css({ width: (90 === q.rotation ? k.height - (q.alignAttr.y - k.top) : k.width - (q.alignAttr.x - k.left)) + "px" });
                q.show(!0);
            };
            l.prototype.getLabelText = function (a) { return x(a.formatter) ? a.formatter.call(this) : a.text; };
            l.prototype.destroy = function () { I(this.axis.plotLinesAndBands, this); delete this.axis; G(this); };
            return l;
        }();
        "";
        "";
        return g;
    });
    P(g, "Core/Tooltip.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E, x) {
        var C = d.format, I = g.doc, A = B.distribute, t = x.addEvent, q = x.clamp, c = x.css, l = x.defined, a = x.discardElement, k = x.extend, v = x.fireEvent, m = x.isArray, N = x.isNumber, F = x.isString, L = x.merge, J = x.pick, y = x.splat, z = x.syncTimeout;
        d = function () {
            function d(e, a) {
                this.allowShared = !0;
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = e;
                this.init(e, a);
            }
            d.prototype.applyFilter = function () {
                var e = this.chart;
                e.renderer.definition({ tagName: "filter", attributes: { id: "drop-shadow-" + e.index, opacity: .5 }, children: [{ tagName: "feGaussianBlur", attributes: { "in": "SourceAlpha", stdDeviation: 1 } }, { tagName: "feOffset", attributes: { dx: 1, dy: 1 } }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", attributes: { type: "linear", slope: .3 } }] },
                        { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", attributes: { "in": "SourceGraphic" } }] }] });
            };
            d.prototype.bodyFormatter = function (e) { return e.map(function (e) { var h = e.series.tooltipOptions; return (h[(e.point.formatPrefix || "point") + "Formatter"] || e.point.tooltipFormatter).call(e.point, h[(e.point.formatPrefix || "point") + "Format"] || ""); }); };
            d.prototype.cleanSplit = function (e) { this.chart.series.forEach(function (a) { var h = a && a.tt; h && (!h.isActive || e ? a.tt = h.destroy() : h.isActive = !1); }); };
            d.prototype.defaultFormatter =
                function (e) { var a = this.points || y(this); var h = [e.tooltipFooterHeaderFormatter(a[0])]; h = h.concat(e.bodyFormatter(a)); h.push(e.tooltipFooterHeaderFormatter(a[0], !0)); return h; };
            d.prototype.destroy = function () { this.label && (this.label = this.label.destroy()); this.split && this.tt && (this.cleanSplit(!0), this.tt = this.tt.destroy()); this.renderer && (this.renderer = this.renderer.destroy(), a(this.container)); x.clearTimeout(this.hideTimer); x.clearTimeout(this.tooltipTimeout); };
            d.prototype.getAnchor = function (e, a) {
                var h = this.chart, c = h.pointer, f = h.inverted, b = h.plotTop, d = h.plotLeft, r, p, u = 0, w = 0;
                e = y(e);
                this.followPointer && a ? ("undefined" === typeof a.chartX && (a = c.normalize(a)), c = [a.chartX - d, a.chartY - b]) : e[0].tooltipPos ? c = e[0].tooltipPos : (e.forEach(function (e) { r = e.series.yAxis; p = e.series.xAxis; u += e.plotX || 0; w += e.plotLow ? (e.plotLow + (e.plotHigh || 0)) / 2 : e.plotY || 0; p && r && (f ? (u += b + h.plotHeight - p.len - p.pos, w += d + h.plotWidth - r.len - r.pos) : (u += p.pos - d, w += r.pos - b)); }), u /= e.length, w /= e.length, c = [f ? h.plotWidth - w : u, f ? h.plotHeight - u : w],
                    this.shared && 1 < e.length && a && (f ? c[0] = a.chartX - d : c[1] = a.chartY - b));
                return c.map(Math.round);
            };
            d.prototype.getLabel = function () {
                var e = this, a = this.chart.styledMode, h = this.options, n = this.split && this.allowShared, f = "tooltip" + (l(h.className) ? " " + h.className : ""), b = h.style.pointerEvents || (!this.followPointer && h.stickOnContact ? "auto" : "none"), d = function () { e.inContact = !0; }, w = function (b) {
                    var f = e.chart.hoverSeries;
                    e.inContact = e.shouldStickOnContact() && e.chart.pointer.inClass(b.relatedTarget, "highcharts-tooltip");
                    if (!e.inContact &&
                        f && f.onMouseOut)
                        f.onMouseOut();
                }, p, u = this.chart.renderer;
                if (e.label) {
                    var k = !e.label.hasClass("highcharts-label");
                    (n && !k || !n && k) && e.destroy();
                }
                if (!this.label) {
                    if (this.outside) {
                        k = this.chart.options.chart.style;
                        var m = E.getRendererType();
                        this.container = p = g.doc.createElement("div");
                        p.className = "highcharts-tooltip-container";
                        c(p, { position: "absolute", top: "1px", pointerEvents: b, zIndex: Math.max(this.options.style.zIndex || 0, (k && k.zIndex || 0) + 3) });
                        t(p, "mouseenter", d);
                        t(p, "mouseleave", w);
                        g.doc.body.appendChild(p);
                        this.renderer = u = new m(p, 0, 0, k, void 0, void 0, u.styledMode);
                    }
                    n ? this.label = u.g(f) : (this.label = u.label("", 0, 0, h.shape, void 0, void 0, h.useHTML, void 0, f).attr({ padding: h.padding, r: h.borderRadius }), a || this.label.attr({ fill: h.backgroundColor, "stroke-width": h.borderWidth }).css(h.style).css({ pointerEvents: b }).shadow(h.shadow));
                    a && h.shadow && (this.applyFilter(), this.label.attr({ filter: "url(#drop-shadow-" + this.chart.index + ")" }));
                    if (e.outside && !e.split) {
                        var z = this.label, q = z.xSetter, y = z.ySetter;
                        z.xSetter = function (b) {
                            q.call(z, e.distance);
                            p.style.left = b + "px";
                        };
                        z.ySetter = function (b) { y.call(z, e.distance); p.style.top = b + "px"; };
                    }
                    this.label.on("mouseenter", d).on("mouseleave", w).attr({ zIndex: 8 }).add();
                }
                return this.label;
            };
            d.prototype.getPosition = function (e, a, h) {
                var c = this.chart, f = this.distance, b = {}, d = c.inverted && h.h || 0, r = this.outside, p = r ? I.documentElement.clientWidth - 2 * f : c.chartWidth, u = r ? Math.max(I.body.scrollHeight, I.documentElement.scrollHeight, I.body.offsetHeight, I.documentElement.offsetHeight, I.documentElement.clientHeight) : c.chartHeight, w = c.pointer.getChartPosition(), k = function (b) { var n = "x" === b; return [b, n ? p : u, n ? e : a].concat(r ? [n ? e * w.scaleX : a * w.scaleY, n ? w.left - f + (h.plotX + c.plotLeft) * w.scaleX : w.top - f + (h.plotY + c.plotTop) * w.scaleY, 0, n ? p : u] : [n ? e : a, n ? h.plotX + c.plotLeft : h.plotY + c.plotTop, n ? c.plotLeft : c.plotTop, n ? c.plotLeft + c.plotWidth : c.plotTop + c.plotHeight]); }, m = k("y"), l = k("x"), z;
                k = !!h.negative;
                !c.polar && c.hoverSeries && c.hoverSeries.yAxis && c.hoverSeries.yAxis.reversed && (k = !k);
                var q = !this.followPointer && J(h.ttBelow, !c.inverted === k), y = function (e, h, a, c, p, n, u) { var D = r ? "y" === e ? f * w.scaleY : f * w.scaleX : f, H = (a - c) / 2, k = c < p - f, m = p + f + c < h, l = p - D - a + H; p = p + D - H; if (q && m)
                    b[e] = p;
                else if (!q && k)
                    b[e] = l;
                else if (k)
                    b[e] = Math.min(u - c, 0 > l - d ? l : l - d);
                else if (m)
                    b[e] = Math.max(n, p + d + a > h ? p : p + d);
                else
                    return !1; }, g = function (e, h, a, c, p) { var n; p < f || p > h - f ? n = !1 : b[e] = p < a / 2 ? 1 : p > h - c / 2 ? h - c - 2 : p - a / 2; return n; }, Q = function (b) { var f = m; m = l; l = f; z = b; }, t = function () { !1 !== y.apply(0, m) ? !1 !== g.apply(0, l) || z || (Q(!0), t()) : z ? b.x = b.y = 0 : (Q(!0), t()); };
                (c.inverted || 1 < this.len) && Q();
                t();
                return b;
            };
            d.prototype.hide =
                function (e) { var a = this; x.clearTimeout(this.hideTimer); e = J(e, this.options.hideDelay); this.isHidden || (this.hideTimer = z(function () { a.getLabel().fadeOut(e ? void 0 : e); a.isHidden = !0; }, e)); };
            d.prototype.init = function (e, a) { this.chart = e; this.options = a; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = a.split && !e.inverted && !e.polar; this.shared = a.shared || this.split; this.outside = J(a.outside, !(!e.scrollablePixelsX && !e.scrollablePixelsY)); };
            d.prototype.shouldStickOnContact = function () {
                return !(this.followPointer ||
                    !this.options.stickOnContact);
            };
            d.prototype.isStickyOnContact = function () { return !(!this.shouldStickOnContact() || !this.inContact); };
            d.prototype.move = function (e, a, h, c) {
                var f = this, b = f.now, n = !1 !== f.options.animation && !f.isHidden && (1 < Math.abs(e - b.x) || 1 < Math.abs(a - b.y)), d = f.followPointer || 1 < f.len;
                k(b, { x: n ? (2 * b.x + e) / 3 : e, y: n ? (b.y + a) / 2 : a, anchorX: d ? void 0 : n ? (2 * b.anchorX + h) / 3 : h, anchorY: d ? void 0 : n ? (b.anchorY + c) / 2 : c });
                f.getLabel().attr(b);
                f.drawTracker();
                n && (x.clearTimeout(this.tooltipTimeout), this.tooltipTimeout =
                    setTimeout(function () { f && f.move(e, a, h, c); }, 32));
            };
            d.prototype.refresh = function (e, a) {
                var h = this.chart, c = this.options, f = y(e), b = f[0], d = [], r = c.formatter || this.defaultFormatter, p = this.shared, u = h.styledMode, w = {};
                if (c.enabled && b.series) {
                    x.clearTimeout(this.hideTimer);
                    this.allowShared = !(!m(e) && e.series && e.series.noSharedTooltip);
                    this.followPointer = !this.split && b.series.tooltipOptions.followPointer;
                    e = this.getAnchor(e, a);
                    var k = e[0], l = e[1];
                    p && this.allowShared ? (h.pointer.applyInactiveState(f), f.forEach(function (b) {
                        b.setState("hover");
                        d.push(b.getLabelConfig());
                    }), w = { x: b.category, y: b.y }, w.points = d) : w = b.getLabelConfig();
                    this.len = d.length;
                    r = r.call(w, this);
                    p = b.series;
                    this.distance = J(p.tooltipOptions.distance, 16);
                    if (!1 === r)
                        this.hide();
                    else {
                        if (this.split && this.allowShared)
                            this.renderSplit(r, f);
                        else {
                            var z = k, q = l;
                            a && h.pointer.isDirectTouch && (z = a.chartX - h.plotLeft, q = a.chartY - h.plotTop);
                            if (h.polar || !1 === p.options.clip || f.some(function (b) { return b.series.shouldShowTooltip(z, q); }))
                                a = this.getLabel(), c.style.width && !u || a.css({ width: this.chart.spacingBox.width +
                                        "px" }), a.attr({ text: r && r.join ? r.join("") : r }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + J(b.colorIndex, p.colorIndex)), u || a.attr({ stroke: c.borderColor || b.color || p.color || "#666666" }), this.updatePosition({ plotX: k, plotY: l, negative: b.negative, ttBelow: b.ttBelow, h: e[2] || 0 });
                            else {
                                this.hide();
                                return;
                            }
                        }
                        this.isHidden && this.label && this.label.attr({ opacity: 1 }).show();
                        this.isHidden = !1;
                    }
                    v(this, "refresh");
                }
            };
            d.prototype.renderSplit = function (e, a) {
                function h(b, f, e, a, h) {
                    void 0 === h && (h = !0);
                    e ?
                        (f = B ? 0 : ea, b = q(b - a / 2, S.left, S.right - a - (c.outside ? C : 0))) : (f -= G, b = h ? b - a - v : b + v, b = q(b, h ? b : S.left, S.right));
                    return { x: b, y: f };
                }
                var c = this, f = c.chart, b = c.chart, d = b.chartWidth, r = b.chartHeight, p = b.plotHeight, u = b.plotLeft, w = b.plotTop, l = b.pointer, m = b.scrollablePixelsY;
                m = void 0 === m ? 0 : m;
                var z = b.scrollablePixelsX, y = b.scrollingContainer;
                y = void 0 === y ? { scrollLeft: 0, scrollTop: 0 } : y;
                var g = y.scrollLeft;
                y = y.scrollTop;
                var t = b.styledMode, v = c.distance, Q = c.options, L = c.options.positioner, S = c.outside && "number" !== typeof z ? I.documentElement.getBoundingClientRect() :
                    { left: g, right: g + d, top: y, bottom: y + r }, N = c.getLabel(), x = this.renderer || f.renderer, B = !(!f.xAxis[0] || !f.xAxis[0].opposite);
                f = l.getChartPosition();
                var C = f.left;
                f = f.top;
                var G = w + y, E = 0, ea = p - m;
                F(e) && (e = [!1, e]);
                e = e.slice(0, a.length + 1).reduce(function (b, f, e) {
                    if (!1 !== f && "" !== f) {
                        e = a[e - 1] || { isHeader: !0, plotX: a[0].plotX, plotY: p, series: {} };
                        var n = e.isHeader, d = n ? c : e.series;
                        f = f.toString();
                        var r = d.tt, D = e.isHeader;
                        var H = e.series;
                        var k = "highcharts-color-" + J(e.colorIndex, H.colorIndex, "none");
                        r || (r = { padding: Q.padding, r: Q.borderRadius },
                            t || (r.fill = Q.backgroundColor, r["stroke-width"] = Q.borderWidth), r = x.label("", 0, 0, Q[D ? "headerShape" : "shape"], void 0, void 0, Q.useHTML).addClass((D ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + k).attr(r).add(N));
                        r.isActive = !0;
                        r.attr({ text: f });
                        t || r.css(Q.style).shadow(Q.shadow).attr({ stroke: Q.borderColor || e.color || H.color || "#333333" });
                        d = d.tt = r;
                        D = d.getBBox();
                        f = D.width + d.strokeWidth();
                        n && (E = D.height, ea += E, B && (G -= E));
                        H = e.plotX;
                        H = void 0 === H ? 0 : H;
                        k = e.plotY;
                        k = void 0 === k ? 0 : k;
                        r = e.series;
                        if (e.isHeader) {
                            H =
                                u + H;
                            var m = w + p / 2;
                        }
                        else {
                            var l = r.xAxis, z = r.yAxis;
                            H = l.pos + q(H, -v, l.len + v);
                            r.shouldShowTooltip(0, z.pos - w + k, { ignoreX: !0 }) && (m = z.pos + k);
                        }
                        H = q(H, S.left - v, S.right + v);
                        "number" === typeof m ? (D = D.height + 1, k = L ? L.call(c, f, D, e) : h(H, m, n, f), b.push({ align: L ? 0 : void 0, anchorX: H, anchorY: m, boxWidth: f, point: e, rank: J(k.rank, n ? 1 : 0), size: D, target: k.y, tt: d, x: k.x })) : d.isActive = !1;
                    }
                    return b;
                }, []);
                !L && e.some(function (b) { var f = (c.outside ? C : 0) + b.anchorX; return f < S.left && f + b.boxWidth < S.right ? !0 : f < C - S.left + b.boxWidth && S.right - f > f; }) && (e =
                    e.map(function (b) { var f = h(b.anchorX, b.anchorY, b.point.isHeader, b.boxWidth, !1); return k(b, { target: f.y, x: f.x }); }));
                c.cleanSplit();
                A(e, ea);
                var P = C, Y = C;
                e.forEach(function (b) { var f = b.x, e = b.boxWidth; b = b.isHeader; b || (c.outside && C + f < P && (P = C + f), !b && c.outside && P + e > Y && (Y = C + f)); });
                e.forEach(function (b) {
                    var f = b.x, e = b.anchorX, a = b.pos, h = b.point.isHeader;
                    a = { visibility: "undefined" === typeof a ? "hidden" : "inherit", x: f, y: a + G, anchorX: e, anchorY: b.anchorY };
                    if (c.outside && f < e) {
                        var p = C - P;
                        0 < p && (h || (a.x = f + p, a.anchorX = e + p), h && (a.x =
                            (Y - P) / 2, a.anchorX = e + p));
                    }
                    b.tt.attr(a);
                });
                e = c.container;
                m = c.renderer;
                c.outside && e && m && (b = N.getBBox(), m.setSize(b.width + b.x, b.height + b.y, !1), e.style.left = P + "px", e.style.top = f + "px");
            };
            d.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact)
                    this.tracker && this.tracker.destroy();
                else {
                    var e = this.chart, a = this.label, h = this.shared ? e.hoverPoints : e.hoverPoint;
                    if (a && h) {
                        var c = { x: 0, y: 0, width: 0, height: 0 };
                        h = this.getAnchor(h);
                        var f = a.getBBox();
                        h[0] += e.plotLeft - a.translateX;
                        h[1] += e.plotTop -
                            a.translateY;
                        c.x = Math.min(0, h[0]);
                        c.y = Math.min(0, h[1]);
                        c.width = 0 > h[0] ? Math.max(Math.abs(h[0]), f.width - h[0]) : Math.max(Math.abs(h[0]), f.width);
                        c.height = 0 > h[1] ? Math.max(Math.abs(h[1]), f.height - Math.abs(h[1])) : Math.max(Math.abs(h[1]), f.height);
                        this.tracker ? this.tracker.attr(c) : (this.tracker = a.renderer.rect(c).addClass("highcharts-tracker").add(a), e.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
                    }
                }
            };
            d.prototype.styledModeFormat = function (e) {
                return e.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"');
            };
            d.prototype.tooltipFooterHeaderFormatter = function (e, a) {
                var h = e.series, c = h.tooltipOptions, f = h.xAxis, b = f && f.dateTime;
                f = { isFooter: a, labelConfig: e };
                var d = c.xDateFormat, r = c[a ? "footerFormat" : "headerFormat"];
                v(this, "headerFormatter", f, function (f) {
                    b && !d && N(e.key) && (d = b.getXDateFormat(e.key, c.dateTimeLabelFormats));
                    b && d && (e.point && e.point.tooltipDateKeys || ["key"]).forEach(function (b) { r = r.replace("{point." + b + "}", "{point." + b + ":" + d + "}"); });
                    h.chart.styledMode && (r = this.styledModeFormat(r));
                    f.text = C(r, { point: e, series: h }, this.chart);
                });
                return f.text;
            };
            d.prototype.update = function (e) { this.destroy(); L(!0, this.chart.options.tooltip.userOptions, e); this.init(this.chart, L(!0, this.options, e)); };
            d.prototype.updatePosition = function (e) {
                var a = this.chart, h = this.options, n = a.pointer, f = this.getLabel();
                n = n.getChartPosition();
                var b = (h.positioner || this.getPosition).call(this, f.width, f.height, e), d = e.plotX + a.plotLeft;
                e = e.plotY + a.plotTop;
                if (this.outside) {
                    h = h.borderWidth + 2 * this.distance;
                    this.renderer.setSize(f.width +
                        h, f.height + h, !1);
                    if (1 !== n.scaleX || 1 !== n.scaleY)
                        c(this.container, { transform: "scale(".concat(n.scaleX, ", ").concat(n.scaleY, ")") }), d *= n.scaleX, e *= n.scaleY;
                    d += n.left - b.x;
                    e += n.top - b.y;
                }
                this.move(Math.round(b.x), Math.round(b.y || 0), d, e);
            };
            return d;
        }();
        "";
        return d;
    });
    P(g, "Core/Series/Point.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Animation/AnimationUtilities.js"], g["Core/DefaultOptions.js"], g["Core/FormatUtilities.js"], g["Core/Utilities.js"]], function (d, g, B, E, x) {
        var C = g.animObject, I = B.defaultOptions, A = E.format, t = x.addEvent, q = x.defined, c = x.erase, l = x.extend, a = x.fireEvent, k = x.getNestedProperty, v = x.isArray, m = x.isFunction, N = x.isNumber, F = x.isObject, L = x.merge, J = x.objectEach, y = x.pick, z = x.syncTimeout, w = x.removeEvent, e = x.uniqueKey;
        g = function () {
            function r() { this.colorIndex = this.category = void 0; this.formatPrefix = "point"; this.id = void 0; this.isNull = !1; this.percentage = this.options = this.name = void 0; this.selected = !1; this.total = this.shapeArgs = this.series = void 0; this.visible = !0; this.x = void 0; }
            r.prototype.animateBeforeDestroy =
                function () { var e = this, a = { x: e.startXPos, opacity: 0 }, f = e.getGraphicalProps(); f.singular.forEach(function (b) { e[b] = e[b].animate("dataLabel" === b ? { x: e[b].startXPos, y: e[b].startYPos, opacity: 0 } : a); }); f.plural.forEach(function (b) { e[b].forEach(function (b) { b.element && b.animate(l({ x: e.startXPos }, b.startYPos ? { x: b.startXPos, y: b.startYPos } : {})); }); }); };
            r.prototype.applyOptions = function (e, a) {
                var f = this.series, b = f.options.pointValKey || f.pointValKey;
                e = r.prototype.optionsToObject.call(this, e);
                l(this, e);
                this.options = this.options ?
                    l(this.options, e) : e;
                e.group && delete this.group;
                e.dataLabels && delete this.dataLabels;
                b && (this.y = r.prototype.getNestedProperty.call(this, b));
                this.formatPrefix = (this.isNull = y(this.isValid && !this.isValid(), null === this.x || !N(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof a && f.xAxis && f.xAxis.hasNames && (this.x = f.xAxis.nameToX(this));
                "undefined" === typeof this.x && f ? this.x = "undefined" === typeof a ? f.autoIncrement() : a : N(e.x) && f.options.relativeXValue && (this.x =
                    f.autoIncrement(e.x));
                return this;
            };
            r.prototype.destroy = function () { function e() { if (a.graphic || a.dataLabel || a.dataLabels)
                w(a), a.destroyElements(); for (p in a)
                a[p] = null; } var a = this, f = a.series, b = f.chart; f = f.options.dataSorting; var d = b.hoverPoints, r = C(a.series.chart.renderer.globalAnimation), p; a.legendItem && b.legend.destroyItem(a); d && (a.setState(), c(d, a), d.length || (b.hoverPoints = null)); if (a === b.hoverPoint)
                a.onMouseOut(); f && f.enabled ? (this.animateBeforeDestroy(), z(e, r.duration)) : e(); b.pointCount--; };
            r.prototype.destroyElements =
                function (e) { var a = this; e = a.getGraphicalProps(e); e.singular.forEach(function (f) { a[f] = a[f].destroy(); }); e.plural.forEach(function (f) { a[f].forEach(function (b) { b.element && b.destroy(); }); delete a[f]; }); };
            r.prototype.firePointEvent = function (e, c, f) { var b = this, h = this.series.options; (h.point.events[e] || b.options && b.options.events && b.options.events[e]) && b.importEvents(); "click" === e && h.allowPointSelect && (f = function (f) { b.select && b.select(null, f.ctrlKey || f.metaKey || f.shiftKey); }); a(b, e, c, f); };
            r.prototype.getClassName =
                function () { return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : ""); };
            r.prototype.getGraphicalProps = function (e) {
                var a = this, f = [], b = { singular: [], plural: [] }, c;
                e = e || { graphic: 1, dataLabel: 1 };
                e.graphic && f.push("graphic", "upperGraphic", "shadowGroup");
                e.dataLabel && f.push("dataLabel", "dataLabelUpper", "connector");
                for (c = f.length; c--;) {
                    var h = f[c];
                    a[h] && b.singular.push(h);
                }
                ["dataLabel", "connector"].forEach(function (f) { var c = f + "s"; e[f] && a[c] && b.plural.push(c); });
                return b;
            };
            r.prototype.getLabelConfig = function () { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal }; };
            r.prototype.getNestedProperty = function (e) { if (e)
                return 0 === e.indexOf("custom.") ? k(e, this.options) : this[e]; };
            r.prototype.getZone = function () { var e = this.series, a = e.zones; e = e.zoneAxis || "y"; var f, b = 0; for (f = a[b]; this[e] >= f.value;)
                f = a[++b]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = f && f.color && !this.options.color ? f.color : this.nonZonedColor; return f; };
            r.prototype.hasNewShapeType = function () { return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType; };
            r.prototype.init =
                function (c, n, f) { this.series = c; this.applyOptions(n, f); this.id = q(this.id) ? this.id : e(); this.resolveColor(); c.chart.pointCount++; a(this, "afterInit"); return this; };
            r.prototype.optionsToObject = function (e) {
                var a = this.series, f = a.options.keys, b = f || a.pointArrayMap || ["y"], c = b.length, h = {}, p = 0, d = 0;
                if (N(e) || null === e)
                    h[b[0]] = e;
                else if (v(e))
                    for (!f && e.length > c && (a = typeof e[0], "string" === a ? h.name = e[0] : "number" === a && (h.x = e[0]), p++); d < c;)
                        f && "undefined" === typeof e[p] || (0 < b[d].indexOf(".") ? r.prototype.setNestedProperty(h, e[p], b[d]) : h[b[d]] = e[p]), p++, d++;
                else
                    "object" === typeof e && (h = e, e.dataLabels && (a._hasPointLabels = !0), e.marker && (a._hasPointMarkers = !0));
                return h;
            };
            r.prototype.resolveColor = function () {
                var e = this.series, a = e.chart.styledMode;
                var f = e.chart.options.chart.colorCount;
                delete this.nonZonedColor;
                if (e.options.colorByPoint) {
                    if (!a) {
                        f = e.options.colors || e.chart.options.colors;
                        var b = f[e.colorCounter];
                        f = f.length;
                    }
                    a = e.colorCounter;
                    e.colorCounter++;
                    e.colorCounter === f && (e.colorCounter = 0);
                }
                else
                    a || (b = e.color), a = e.colorIndex;
                this.colorIndex = y(this.options.colorIndex, a);
                this.color = y(this.options.color, b);
            };
            r.prototype.setNestedProperty = function (e, a, f) { f.split(".").reduce(function (b, f, e, c) { b[f] = c.length - 1 === e ? a : F(b[f], !0) ? b[f] : {}; return b[f]; }, e); return e; };
            r.prototype.tooltipFormatter = function (e) {
                var a = this.series, f = a.tooltipOptions, b = y(f.valueDecimals, ""), c = f.valuePrefix || "", h = f.valueSuffix || "";
                a.chart.styledMode && (e = a.chart.tooltip.styledModeFormat(e));
                (a.pointArrayMap || ["y"]).forEach(function (f) {
                    f = "{point." + f;
                    if (c || h)
                        e =
                            e.replace(RegExp(f + "}", "g"), c + f + "}" + h);
                    e = e.replace(RegExp(f + "}", "g"), f + ":,." + b + "f}");
                });
                return A(e, { point: this, series: this.series }, a.chart);
            };
            r.prototype.update = function (e, a, f, b) {
                function c() {
                    h.applyOptions(e);
                    var b = n && h.hasDummyGraphic;
                    b = null === h.y ? !b : b;
                    n && b && (h.graphic = n.destroy(), delete h.hasDummyGraphic);
                    F(e, !0) && (n && n.element && e && e.marker && "undefined" !== typeof e.marker.symbol && (h.graphic = n.destroy()), e && e.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy()));
                    w = h.index;
                    p.updateParallelArrays(h, w);
                    r.data[w] = F(r.data[w], !0) || F(e, !0) ? h.options : y(e, r.data[w]);
                    p.isDirty = p.isDirtyData = !0;
                    !p.fixedBox && p.hasCartesianSeries && (d.isDirtyBox = !0);
                    "point" === r.legendType && (d.isDirtyLegend = !0);
                    a && d.redraw(f);
                }
                var h = this, p = h.series, n = h.graphic, d = p.chart, r = p.options, w;
                a = y(a, !0);
                !1 === b ? c() : h.firePointEvent("update", { options: e }, c);
            };
            r.prototype.remove = function (e, a) { this.series.removePoint(this.series.data.indexOf(this), e, a); };
            r.prototype.select = function (e, a) {
                var f = this, b = f.series, c = b.chart;
                this.selectedStaging = e = y(e, !f.selected);
                f.firePointEvent(e ? "select" : "unselect", { accumulate: a }, function () { f.selected = f.options.selected = e; b.options.data[b.data.indexOf(f)] = f.options; f.setState(e && "select"); a || c.getSelectedPoints().forEach(function (b) { var e = b.series; b.selected && b !== f && (b.selected = b.options.selected = !1, e.options.data[e.data.indexOf(b)] = b.options, b.setState(c.hoverPoints && e.options.inactiveOtherPoints ? "inactive" : ""), b.firePointEvent("unselect")); }); });
                delete this.selectedStaging;
            };
            r.prototype.onMouseOver = function (e) { var a = this.series.chart, f = a.pointer; e = e ? f.normalize(e) : f.getChartCoordinatesFromPoint(this, a.inverted); f.runPointActions(e, this); };
            r.prototype.onMouseOut = function () { var e = this.series.chart; this.firePointEvent("mouseOut"); this.series.options.inactiveOtherPoints || (e.hoverPoints || []).forEach(function (e) { e.setState(); }); e.hoverPoints = e.hoverPoint = null; };
            r.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var e = this, a = L(e.series.options.point, e.options).events;
                    e.events = a;
                    J(a, function (f, b) { m(f) && t(e, b, f); });
                    this.hasImportedEvents = !0;
                }
            };
            r.prototype.setState = function (e, c) {
                var f = this.series, b = this.state, h = f.options.states[e || "normal"] || {}, n = I.plotOptions[f.type].marker && f.options.marker, p = n && !1 === n.enabled, u = n && n.states && n.states[e || "normal"] || {}, r = !1 === u.enabled, w = this.marker || {}, k = f.chart, m = n && f.markerAttribs, z = f.halo, q, g = f.stateMarkerGraphic;
                e = e || "";
                if (!(e === this.state && !c || this.selected && "select" !== e || !1 === h.enabled || e && (r || p && !1 === u.enabled) || e && w.states &&
                    w.states[e] && !1 === w.states[e].enabled)) {
                    this.state = e;
                    m && (q = f.markerAttribs(this, e));
                    if (this.graphic && !this.hasDummyGraphic) {
                        b && this.graphic.removeClass("highcharts-point-" + b);
                        e && this.graphic.addClass("highcharts-point-" + e);
                        if (!k.styledMode) {
                            var t = f.pointAttribs(this, e);
                            var Q = y(k.options.chart.animation, h.animation);
                            f.options.inactiveOtherPoints && N(t.opacity) && ((this.dataLabels || []).forEach(function (b) { b && b.animate({ opacity: t.opacity }, Q); }), this.connector && this.connector.animate({ opacity: t.opacity }, Q));
                            this.graphic.animate(t, Q);
                        }
                        q && this.graphic.animate(q, y(k.options.chart.animation, u.animation, n.animation));
                        g && g.hide();
                    }
                    else {
                        if (e && u) {
                            b = w.symbol || f.symbol;
                            g && g.currentSymbol !== b && (g = g.destroy());
                            if (q)
                                if (g)
                                    g[c ? "animate" : "attr"]({ x: q.x, y: q.y });
                                else
                                    b && (f.stateMarkerGraphic = g = k.renderer.symbol(b, q.x, q.y, q.width, q.height).add(f.markerGroup), g.currentSymbol = b);
                            !k.styledMode && g && "inactive" !== this.state && g.attr(f.pointAttribs(this, e));
                        }
                        g && (g[e && this.isInside ? "show" : "hide"](), g.element.point = this, g.addClass(this.getClassName(), !0));
                    }
                    h = h.halo;
                    q = (g = this.graphic || g) && g.visibility || "inherit";
                    h && h.size && g && "hidden" !== q && !this.isCluster ? (z || (f.halo = z = k.renderer.path().add(g.parentGroup)), z.show()[c ? "animate" : "attr"]({ d: this.haloPath(h.size) }), z.attr({ "class": "highcharts-halo highcharts-color-" + y(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""), visibility: q, zIndex: -1 }), z.point = this, k.styledMode || z.attr(l({ fill: this.color || f.color, "fill-opacity": h.opacity }, d.filterUserAttributes(h.attributes || {})))) : z && z.point &&
                        z.point.haloPath && z.animate({ d: z.point.haloPath(0) }, null, z.hide);
                    a(this, "afterSetState", { state: e });
                }
            };
            r.prototype.haloPath = function (e) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - e, this.plotY - e, 2 * e, 2 * e); };
            return r;
        }();
        "";
        return g;
    });
    P(g, "Core/Pointer.js", [g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Tooltip.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = d.parse, C = g.charts, I = g.noop, A = E.addEvent, t = E.attr, q = E.css, c = E.defined, l = E.extend, a = E.find, k = E.fireEvent, v = E.isNumber, m = E.isObject, N = E.objectEach, F = E.offset, L = E.pick, J = E.splat;
        d = function () {
            function d(a, c) { this.lastValidTouch = {}; this.pinchDown = []; this.runChartClick = !1; this.eventsToUnbind = []; this.chart = a; this.hasDragged = !1; this.options = c; this.init(a, c); }
            d.prototype.applyInactiveState = function (a) {
                var c = [], e;
                (a || []).forEach(function (a) { e = a.series; c.push(e); e.linkedParent && c.push(e.linkedParent); e.linkedSeries && (c = c.concat(e.linkedSeries)); e.navigatorSeries && c.push(e.navigatorSeries); });
                this.chart.series.forEach(function (e) {
                    -1 ===
                        c.indexOf(e) ? e.setState("inactive", !0) : e.options.inactiveOtherPoints && e.setAllPointsToState("inactive");
                });
            };
            d.prototype.destroy = function () { var a = this; this.eventsToUnbind.forEach(function (a) { return a(); }); this.eventsToUnbind = []; g.chartCount || (d.unbindDocumentMouseUp && (d.unbindDocumentMouseUp = d.unbindDocumentMouseUp()), d.unbindDocumentTouchEnd && (d.unbindDocumentTouchEnd = d.unbindDocumentTouchEnd())); clearInterval(a.tooltipTimeout); N(a, function (c, e) { a[e] = void 0; }); };
            d.prototype.drag = function (a) {
                var c = this.chart, e = c.options.chart, d = this.zoomHor, h = this.zoomVert, n = c.plotLeft, f = c.plotTop, b = c.plotWidth, k = c.plotHeight, l = this.mouseDownX || 0, p = this.mouseDownY || 0, u = m(e.panning) ? e.panning && e.panning.enabled : e.panning, z = e.panKey && a[e.panKey + "Key"], q = a.chartX, g = a.chartY, y = this.selectionMarker;
                if (!y || !y.touch)
                    if (q < n ? q = n : q > n + b && (q = n + b), g < f ? g = f : g > f + k && (g = f + k), this.hasDragged = Math.sqrt(Math.pow(l - q, 2) + Math.pow(p - g, 2)), 10 < this.hasDragged) {
                        var t = c.isInsidePlot(l - n, p - f, { visiblePlotOnly: !0 });
                        !c.hasCartesianSeries && !c.mapView ||
                            !this.zoomX && !this.zoomY || !t || z || y || (this.selectionMarker = y = c.renderer.rect(n, f, d ? 1 : b, h ? 1 : k, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), c.styledMode || y.attr({ fill: e.selectionMarkerFill || x("#335cad").setOpacity(.25).get() }));
                        y && d && (d = q - l, y.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + l }));
                        y && h && (d = g - p, y.attr({ height: Math.abs(d), y: (0 < d ? 0 : d) + p }));
                        t && !y && u && c.pan(a, e.panning);
                    }
            };
            d.prototype.dragStart = function (a) {
                var c = this.chart;
                c.mouseIsDown = a.type;
                c.cancelClick = !1;
                c.mouseDownX = this.mouseDownX =
                    a.chartX;
                c.mouseDownY = this.mouseDownY = a.chartY;
            };
            d.prototype.drop = function (a) {
                var d = this, e = this.chart, r = this.hasPinched;
                if (this.selectionMarker) {
                    var h = this.selectionMarker, n = h.attr ? h.attr("x") : h.x, f = h.attr ? h.attr("y") : h.y, b = h.attr ? h.attr("width") : h.width, m = h.attr ? h.attr("height") : h.height, z = { originalEvent: a, xAxis: [], yAxis: [], x: n, y: f, width: b, height: m }, p = !!e.mapView;
                    if (this.hasDragged || r)
                        e.axes.forEach(function (e) {
                            if (e.zoomEnabled && c(e.min) && (r || d[{ xAxis: "zoomX", yAxis: "zoomY" }[e.coll]]) && v(n) && v(f)) {
                                var h = e.horiz, u = "touchend" === a.type ? e.minPixelPadding : 0, w = e.toValue((h ? n : f) + u);
                                h = e.toValue((h ? n + b : f + m) - u);
                                z[e.coll].push({ axis: e, min: Math.min(w, h), max: Math.max(w, h) });
                                p = !0;
                            }
                        }), p && k(e, "selection", z, function (b) { e.zoom(l(b, r ? { animation: !1 } : null)); });
                    v(e.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    r && this.scaleGroups();
                }
                e && v(e.index) && (q(e.container, { cursor: e._cursor }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []);
            };
            d.prototype.findNearestKDPoint =
                function (a, c, e) { var d = this.chart, h = d.hoverPoint; d = d.tooltip; if (h && d && d.isStickyOnContact())
                    return h; var n; a.forEach(function (f) { var b = !(f.noSharedTooltip && c) && 0 > f.options.findNearestPointBy.indexOf("y"); f = f.searchPoint(e, b); if ((b = m(f, !0) && f.series) && !(b = !m(n, !0))) {
                    b = n.distX - f.distX;
                    var a = n.dist - f.dist, h = (f.series.group && f.series.group.zIndex) - (n.series.group && n.series.group.zIndex);
                    b = 0 < (0 !== b && c ? b : 0 !== a ? a : 0 !== h ? h : n.series.index > f.series.index ? -1 : 1);
                } b && (n = f); }); return n; };
            d.prototype.getChartCoordinatesFromPoint =
                function (a, c) { var e = a.series, d = e.xAxis; e = e.yAxis; var h = a.shapeArgs; if (d && e) {
                    var n = L(a.clientX, a.plotX), f = a.plotY || 0;
                    a.isNode && h && v(h.x) && v(h.y) && (n = h.x, f = h.y);
                    return c ? { chartX: e.len + e.pos - f, chartY: d.len + d.pos - n } : { chartX: n + d.pos, chartY: f + e.pos };
                } if (h && h.x && h.y)
                    return { chartX: h.x, chartY: h.y }; };
            d.prototype.getChartPosition = function () {
                if (this.chartPosition)
                    return this.chartPosition;
                var a = this.chart.container, c = F(a);
                this.chartPosition = { left: c.left, top: c.top, scaleX: 1, scaleY: 1 };
                var e = a.offsetWidth;
                a = a.offsetHeight;
                2 < e && 2 < a && (this.chartPosition.scaleX = c.width / e, this.chartPosition.scaleY = c.height / a);
                return this.chartPosition;
            };
            d.prototype.getCoordinates = function (a) { var c = { xAxis: [], yAxis: [] }; this.chart.axes.forEach(function (e) { c[e.isXAxis ? "xAxis" : "yAxis"].push({ axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"]) }); }); return c; };
            d.prototype.getHoverData = function (c, d, e, r, h, n) {
                var f = [];
                r = !(!r || !c);
                var b = { chartX: n ? n.chartX : void 0, chartY: n ? n.chartY : void 0, shared: h };
                k(this, "beforeGetHoverData", b);
                var w = d && !d.stickyTracking ?
                    [d] : e.filter(function (f) { return b.filter ? b.filter(f) : f.visible && !(!h && f.directTouch) && L(f.options.enableMouseTracking, !0) && f.stickyTracking; });
                var l = r || !n ? c : this.findNearestKDPoint(w, h, n);
                d = l && l.series;
                l && (h && !d.noSharedTooltip ? (w = e.filter(function (f) { return b.filter ? b.filter(f) : f.visible && !(!h && f.directTouch) && L(f.options.enableMouseTracking, !0) && !f.noSharedTooltip; }), w.forEach(function (b) { var e = a(b.points, function (b) { return b.x === l.x && !b.isNull; }); m(e) && (b.chart.isBoosting && (e = b.getPoint(e)), f.push(e)); })) :
                    f.push(l));
                b = { hoverPoint: l };
                k(this, "afterGetHoverData", b);
                return { hoverPoint: b.hoverPoint, hoverSeries: d, hoverPoints: f };
            };
            d.prototype.getPointFromEvent = function (a) { a = a.target; for (var c; a && !c;)
                c = a.point, a = a.parentNode; return c; };
            d.prototype.onTrackerMouseOut = function (a) { a = a.relatedTarget || a.toElement; var c = this.chart.hoverSeries; this.isDirectTouch = !1; if (!(!c || !a || c.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + c.index) && this.inClass(a, "highcharts-tracker")))
                c.onMouseOut(); };
            d.prototype.inClass = function (a, c) { for (var e; a;) {
                if (e = t(a, "class")) {
                    if (-1 !== e.indexOf(c))
                        return !0;
                    if (-1 !== e.indexOf("highcharts-container"))
                        return !1;
                }
                a = a.parentElement;
            } };
            d.prototype.init = function (a, c) { this.options = c; this.chart = a; this.runChartClick = !(!c.chart.events || !c.chart.events.click); this.pinchDown = []; this.lastValidTouch = {}; B && (a.tooltip = new B(a, c.tooltip), this.followTouchMove = L(c.tooltip.followTouchMove, !0)); this.setDOMEvents(); };
            d.prototype.normalize = function (a, c) {
                var e = a.touches, d = e ? e.length ?
                    e.item(0) : L(e.changedTouches, a.changedTouches)[0] : a;
                c || (c = this.getChartPosition());
                e = d.pageX - c.left;
                d = d.pageY - c.top;
                e /= c.scaleX;
                d /= c.scaleY;
                return l(a, { chartX: Math.round(e), chartY: Math.round(d) });
            };
            d.prototype.onContainerClick = function (a) {
                var c = this.chart, e = c.hoverPoint;
                a = this.normalize(a);
                var d = c.plotLeft, h = c.plotTop;
                c.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (k(e.series, "click", l(a, { point: e })), c.hoverPoint && e.firePointEvent("click", a)) : (l(a, this.getCoordinates(a)), c.isInsidePlot(a.chartX -
                    d, a.chartY - h, { visiblePlotOnly: !0 }) && k(c, "click", a)));
            };
            d.prototype.onContainerMouseDown = function (a) { var c = 1 === ((a.buttons || a.button) & 1); a = this.normalize(a); if (g.isFirefox && 0 !== a.button)
                this.onContainerMouseMove(a); if ("undefined" === typeof a.button || c)
                this.zoomOption(a), c && a.preventDefault && a.preventDefault(), this.dragStart(a); };
            d.prototype.onContainerMouseLeave = function (a) {
                var c = C[L(d.hoverChartIndex, -1)], e = this.chart.tooltip;
                e && e.shouldStickOnContact() && this.inClass(a.relatedTarget, "highcharts-tooltip-container") ||
                    (a = this.normalize(a), c && (a.relatedTarget || a.toElement) && (c.pointer.reset(), c.pointer.chartPosition = void 0), e && !e.isHidden && this.reset());
            };
            d.prototype.onContainerMouseEnter = function (a) { delete this.chartPosition; };
            d.prototype.onContainerMouseMove = function (a) {
                var c = this.chart;
                a = this.normalize(a);
                this.setHoverChartIndex();
                a.preventDefault || (a.returnValue = !1);
                ("mousedown" === c.mouseIsDown || this.touchSelect(a)) && this.drag(a);
                c.openMenu || !this.inClass(a.target, "highcharts-tracker") && !c.isInsidePlot(a.chartX -
                    c.plotLeft, a.chartY - c.plotTop, { visiblePlotOnly: !0 }) || (this.inClass(a.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(a));
            };
            d.prototype.onDocumentTouchEnd = function (a) { var c = C[L(d.hoverChartIndex, -1)]; c && c.pointer.drop(a); };
            d.prototype.onContainerTouchMove = function (a) { if (this.touchSelect(a))
                this.onContainerMouseMove(a);
            else
                this.touch(a); };
            d.prototype.onContainerTouchStart = function (a) { if (this.touchSelect(a))
                this.onContainerMouseDown(a);
            else
                this.zoomOption(a), this.touch(a, !0); };
            d.prototype.onDocumentMouseMove =
                function (a) { var c = this.chart, e = this.chartPosition; a = this.normalize(a, e); var d = c.tooltip; !e || d && d.isStickyOnContact() || c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, { visiblePlotOnly: !0 }) || this.inClass(a.target, "highcharts-tracker") || this.reset(); };
            d.prototype.onDocumentMouseUp = function (a) { var c = C[L(d.hoverChartIndex, -1)]; c && c.pointer.drop(a); };
            d.prototype.pinch = function (a) {
                var c = this, e = c.chart, d = c.pinchDown, h = a.touches || [], n = h.length, f = c.lastValidTouch, b = c.hasZoom, m = {}, H = 1 === n && (c.inClass(a.target, "highcharts-tracker") && e.runTrackerClick || c.runChartClick), p = {}, u = c.selectionMarker;
                1 < n ? c.initiated = !0 : 1 === n && this.followTouchMove && (c.initiated = !1);
                b && c.initiated && !H && !1 !== a.cancelable && a.preventDefault();
                [].map.call(h, function (b) { return c.normalize(b); });
                "touchstart" === a.type ? ([].forEach.call(h, function (b, f) { d[f] = { chartX: b.chartX, chartY: b.chartY }; }), f.x = [d[0].chartX, d[1] && d[1].chartX], f.y = [d[0].chartY, d[1] && d[1].chartY], e.axes.forEach(function (b) {
                    if (b.zoomEnabled) {
                        var f = e.bounds[b.horiz ? "h" : "v"], a = b.minPixelPadding, c = b.toPixels(Math.min(L(b.options.min, b.dataMin), b.dataMin)), h = b.toPixels(Math.max(L(b.options.max, b.dataMax), b.dataMax)), p = Math.max(c, h);
                        f.min = Math.min(b.pos, Math.min(c, h) - a);
                        f.max = Math.max(b.pos + b.len, p + a);
                    }
                }), c.res = !0) : c.followTouchMove && 1 === n ? this.runPointActions(c.normalize(a)) : d.length && (k(e, "touchpan", { originalEvent: a }, function () { u || (c.selectionMarker = u = l({ destroy: I, touch: !0 }, e.plotBox)); c.pinchTranslate(d, h, m, u, p, f); c.hasPinched = b; c.scaleGroups(m, p); }), c.res && (c.res = !1, this.reset(!1, 0)));
            };
            d.prototype.pinchTranslate = function (a, c, e, d, h, n) { this.zoomHor && this.pinchTranslateDirection(!0, a, c, e, d, h, n); this.zoomVert && this.pinchTranslateDirection(!1, a, c, e, d, h, n); };
            d.prototype.pinchTranslateDirection = function (a, c, e, d, h, n, f, b) {
                var k = this.chart, r = a ? "x" : "y", p = a ? "X" : "Y", u = "chart" + p, m = a ? "width" : "height", l = k["plot" + (a ? "Left" : "Top")], w = k.inverted, q = k.bounds[a ? "h" : "v"], g = 1 === c.length, z = c[0][u], y = !g && c[1][u];
                c = function () {
                    "number" === typeof F && 20 < Math.abs(z - y) && (v = b || Math.abs(S - F) / Math.abs(z - y));
                    Q = (l - S) / v + z;
                    t = k["plot" + (a ? "Width" : "Height")] / v;
                };
                var t, Q, v = b || 1, S = e[0][u], F = !g && e[1][u];
                c();
                e = Q;
                if (e < q.min) {
                    e = q.min;
                    var L = !0;
                }
                else
                    e + t > q.max && (e = q.max - t, L = !0);
                L ? (S -= .8 * (S - f[r][0]), "number" === typeof F && (F -= .8 * (F - f[r][1])), c()) : f[r] = [S, F];
                w || (n[r] = Q - l, n[m] = t);
                n = w ? 1 / v : v;
                h[m] = t;
                h[r] = e;
                d[w ? a ? "scaleY" : "scaleX" : "scale" + p] = v;
                d["translate" + p] = n * l + (S - n * z);
            };
            d.prototype.reset = function (a, c) {
                var e = this.chart, d = e.hoverSeries, h = e.hoverPoint, n = e.hoverPoints, f = e.tooltip, b = f && f.shared ? n : h;
                a && b && J(b).forEach(function (b) {
                    b.series.isCartesian &&
                        "undefined" === typeof b.plotX && (a = !1);
                });
                if (a)
                    f && b && J(b).length && (f.refresh(b), f.shared && n ? n.forEach(function (b) { b.setState(b.state, !0); b.series.isCartesian && (b.series.xAxis.crosshair && b.series.xAxis.drawCrosshair(null, b), b.series.yAxis.crosshair && b.series.yAxis.drawCrosshair(null, b)); }) : h && (h.setState(h.state, !0), e.axes.forEach(function (b) { b.crosshair && h.series[b.coll] === b && b.drawCrosshair(null, h); })));
                else {
                    if (h)
                        h.onMouseOut();
                    n && n.forEach(function (b) { b.setState(); });
                    if (d)
                        d.onMouseOut();
                    f && f.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    e.axes.forEach(function (b) { b.hideCrosshair(); });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null;
                }
            };
            d.prototype.runPointActions = function (c, k) {
                var e = this.chart, r = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0, h = r ? r.shared : !1, n = k || e.hoverPoint, f = n && n.series || e.hoverSeries;
                k = this.getHoverData(n, f, e.series, (!c || "touchmove" !== c.type) && (!!k || f && f.directTouch && this.isDirectTouch), h, c);
                n = k.hoverPoint;
                f = k.hoverSeries;
                var b = k.hoverPoints;
                k = f &&
                    f.tooltipOptions.followPointer && !f.tooltipOptions.split;
                var m = h && f && !f.noSharedTooltip;
                if (n && (n !== e.hoverPoint || r && r.isHidden)) {
                    (e.hoverPoints || []).forEach(function (f) { -1 === b.indexOf(f) && f.setState(); });
                    if (e.hoverSeries !== f)
                        f.onMouseOver();
                    this.applyInactiveState(b);
                    (b || []).forEach(function (b) { b.setState("hover"); });
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    if (!n.series)
                        return;
                    e.hoverPoints = b;
                    e.hoverPoint = n;
                    n.firePointEvent("mouseOver", void 0, function () { r && n && r.refresh(m ? b : n, c); });
                }
                else
                    k &&
                        r && !r.isHidden && (h = r.getAnchor([{}], c), e.isInsidePlot(h[0], h[1], { visiblePlotOnly: !0 }) && r.updatePosition({ plotX: h[0], plotY: h[1] }));
                this.unDocMouseMove || (this.unDocMouseMove = A(e.container.ownerDocument, "mousemove", function (b) { var f = C[d.hoverChartIndex]; if (f)
                    f.pointer.onDocumentMouseMove(b); }), this.eventsToUnbind.push(this.unDocMouseMove));
                e.axes.forEach(function (f) {
                    var h = L((f.crosshair || {}).snap, !0), d;
                    h && ((d = e.hoverPoint) && d.series[f.coll] === f || (d = a(b, function (b) {
                        return b.series && b.series[f.coll] ===
                            f;
                    })));
                    d || !h ? f.drawCrosshair(c, d) : f.hideCrosshair();
                });
            };
            d.prototype.scaleGroups = function (a, c) { var e = this.chart; e.series.forEach(function (d) { var h = a || d.getPlotBox(); d.group && (d.xAxis && d.xAxis.zoomEnabled || e.mapView) && (d.group.attr(h), d.markerGroup && (d.markerGroup.attr(h), d.markerGroup.clip(c ? e.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(h)); }); e.clipRect.attr(c || e.clipBox); };
            d.prototype.setDOMEvents = function () {
                var a = this, c = this.chart.container, e = c.ownerDocument;
                c.onmousedown = this.onContainerMouseDown.bind(this);
                c.onmousemove = this.onContainerMouseMove.bind(this);
                c.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(A(c, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(A(c, "mouseleave", this.onContainerMouseLeave.bind(this)));
                d.unbindDocumentMouseUp || (d.unbindDocumentMouseUp = A(e, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var k = this.chart.renderTo.parentElement; k && "BODY" !== k.tagName;)
                    this.eventsToUnbind.push(A(k, "scroll", function () { delete a.chartPosition; })), k =
                        k.parentElement;
                g.hasTouch && (this.eventsToUnbind.push(A(c, "touchstart", this.onContainerTouchStart.bind(this), { passive: !1 })), this.eventsToUnbind.push(A(c, "touchmove", this.onContainerTouchMove.bind(this), { passive: !1 })), d.unbindDocumentTouchEnd || (d.unbindDocumentTouchEnd = A(e, "touchend", this.onDocumentTouchEnd.bind(this), { passive: !1 })));
            };
            d.prototype.setHoverChartIndex = function () {
                var a = this.chart, c = g.charts[L(d.hoverChartIndex, -1)];
                if (c && c !== a)
                    c.pointer.onContainerMouseLeave({ relatedTarget: a.container });
                c && c.mouseIsDown || (d.hoverChartIndex = a.index);
            };
            d.prototype.touch = function (a, c) { var e = this.chart, d; this.setHoverChartIndex(); if (1 === a.touches.length)
                if (a = this.normalize(a), (d = e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop, { visiblePlotOnly: !0 })) && !e.openMenu) {
                    c && this.runPointActions(a);
                    if ("touchmove" === a.type) {
                        c = this.pinchDown;
                        var h = c[0] ? 4 <= Math.sqrt(Math.pow(c[0].chartX - a.chartX, 2) + Math.pow(c[0].chartY - a.chartY, 2)) : !1;
                    }
                    L(h, !0) && this.pinch(a);
                }
                else
                    c && this.reset();
            else
                2 === a.touches.length && this.pinch(a); };
            d.prototype.touchSelect = function (a) { return !(!this.chart.options.chart.zoomBySingleTouch || !a.touches || 1 !== a.touches.length); };
            d.prototype.zoomOption = function (a) { var c = this.chart, e = c.options.chart; c = c.inverted; var d = e.zoomType || ""; /touch/.test(a.type) && (d = L(e.pinchType, d)); this.zoomX = a = /x/.test(d); this.zoomY = e = /y/.test(d); this.zoomHor = a && !c || e && c; this.zoomVert = e && !c || a && c; this.hasZoom = a || e; };
            return d;
        }();
        "";
        return d;
    });
    P(g, "Core/MSPointer.js", [g["Core/Globals.js"], g["Core/Pointer.js"], g["Core/Utilities.js"]], function (d, g, B) {
        function C() { var c = []; c.item = function (a) { return this[a]; }; a(v, function (a) { c.push({ pageX: a.pageX, pageY: a.pageY, target: a.target }); }); return c; }
        function x(a, c, d, k) { var m = I[g.hoverChartIndex || NaN]; "touch" !== a.pointerType && a.pointerType !== a.MSPOINTER_TYPE_TOUCH || !m || (m = m.pointer, k(a), m[c]({ type: d, target: a.currentTarget, preventDefault: t, touches: C() })); }
        var G = this && this.__extends || function () {
            var a = function (c, d) {
                a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) {
                    a.__proto__ =
                        c;
                } || function (a, c) { for (var d in c)
                    c.hasOwnProperty(d) && (a[d] = c[d]); };
                return a(c, d);
            };
            return function (c, d) { function k() { this.constructor = c; } a(c, d); c.prototype = null === d ? Object.create(d) : (k.prototype = d.prototype, new k); };
        }(), I = d.charts, A = d.doc, t = d.noop, q = d.win, c = B.addEvent, l = B.css, a = B.objectEach, k = B.removeEvent, v = {}, m = !!q.PointerEvent;
        return function (a) {
            function g() { return null !== a && a.apply(this, arguments) || this; }
            G(g, a);
            g.isRequired = function () { return !(d.hasTouch || !q.PointerEvent && !q.MSPointerEvent); };
            g.prototype.batchMSEvents =
                function (a) { a(this.chart.container, m ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); a(this.chart.container, m ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); a(A, m ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp); };
            g.prototype.destroy = function () { this.batchMSEvents(k); a.prototype.destroy.call(this); };
            g.prototype.init = function (c, d) { a.prototype.init.call(this, c, d); this.hasZoom && l(c.container, { "-ms-touch-action": "none", "touch-action": "none" }); };
            g.prototype.onContainerPointerDown =
                function (a) { x(a, "onContainerTouchStart", "touchstart", function (a) { v[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget }; }); };
            g.prototype.onContainerPointerMove = function (a) { x(a, "onContainerTouchMove", "touchmove", function (a) { v[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; v[a.pointerId].target || (v[a.pointerId].target = a.currentTarget); }); };
            g.prototype.onDocumentPointerUp = function (a) { x(a, "onDocumentTouchEnd", "touchend", function (a) { delete v[a.pointerId]; }); };
            g.prototype.setDOMEvents = function () {
                a.prototype.setDOMEvents.call(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(c);
            };
            return g;
        }(g);
    });
    P(g, "Core/Legend/Legend.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Series/Point.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G) {
        var C = d.animObject, A = d.setAnimation, t = g.format;
        d = B.isFirefox;
        var q = B.marginNames;
        B = B.win;
        var c = x.distribute, l = G.addEvent, a = G.createElement, k = G.css, v = G.defined, m = G.discardElement, N = G.find, F = G.fireEvent, L = G.isNumber, J = G.merge, y = G.pick, z = G.relativeLength, w = G.stableSort, e = G.syncTimeout;
        x = G.wrap;
        G = function () {
            function d(e, a) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = void 0;
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup =
                    void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = e;
                this.init(e, a);
            }
            d.prototype.init = function (e, a) { this.chart = e; this.setOptions(a); a.enabled && (this.render(), l(this.chart, "endResize", function () { this.legend.positionCheckboxes(); }), this.proximate ? this.unchartrender = l(this.chart, "render", function () { this.legend.proximatePositions(); this.legend.positionItems(); }) : this.unchartrender && this.unchartrender()); };
            d.prototype.setOptions = function (e) {
                var a = y(e.padding, 8);
                this.options = e;
                this.chart.styledMode || (this.itemStyle = e.itemStyle, this.itemHiddenStyle = J(this.itemStyle, e.itemHiddenStyle));
                this.itemMarginTop = e.itemMarginTop || 0;
                this.itemMarginBottom = e.itemMarginBottom || 0;
                this.padding = a;
                this.initialItemY = a - 5;
                this.symbolWidth = y(e.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === e.layout && !this.chart.inverted;
                this.baseline = void 0;
            };
            d.prototype.update = function (e, a) {
                var f = this.chart;
                this.setOptions(J(!0, this.options, e));
                this.destroy();
                f.isDirtyLegend = f.isDirtyBox =
                    !0;
                y(a, !0) && f.redraw();
                F(this, "afterUpdate");
            };
            d.prototype.colorizeItem = function (e, a) {
                e.legendGroup[a ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var f = this.options, b = e.legendItem, c = e.legendLine, h = e.legendSymbol, d = this.itemHiddenStyle.color;
                    f = a ? f.itemStyle.color : d;
                    var n = a ? e.color || d : d, k = e.options && e.options.marker, m = { fill: n };
                    b && b.css({ fill: f, color: f });
                    c && c.attr({ stroke: n });
                    h && (k && h.isMarker && (m = e.pointAttribs(), a || (m.stroke = m.fill = d)), h.attr(m));
                }
                F(this, "afterColorizeItem", { item: e, visible: a });
            };
            d.prototype.positionItems = function () { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes(); };
            d.prototype.positionItem = function (e) { var a = this, f = this.options, b = f.symbolPadding, c = !f.rtl, h = e._legendItemPos; f = h[0]; h = h[1]; var d = e.checkbox, u = e.legendGroup; u && u.element && (b = { translateX: c ? f : this.legendWidth - f - 2 * b - 4, translateY: h }, c = function () { F(a, "afterPositionItem", { item: e }); }, v(u.translateY) ? u.animate(b, void 0, c) : (u.attr(b), c())); d && (d.x = f, d.y = h); };
            d.prototype.destroyItem = function (e) { var a = e.checkbox; ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (f) { e[f] && (e[f] = e[f].destroy()); }); a && m(e.checkbox); };
            d.prototype.destroy = function () { function e(e) { this[e] && (this[e] = this[e].destroy()); } this.getAllItems().forEach(function (a) { ["legendItem", "legendGroup"].forEach(e, a); }); "clipRect up down pager nav box title group".split(" ").forEach(e, this); this.display = null; };
            d.prototype.positionCheckboxes = function () {
                var e = this.group && this.group.alignAttr, a = this.clipHeight || this.legendHeight, f = this.titleHeight;
                if (e) {
                    var b = e.translateY;
                    this.allItems.forEach(function (c) { var h = c.checkbox; if (h) {
                        var d = b + f + h.y + (this.scrollOffset || 0) + 3;
                        k(h, { left: e.translateX + c.checkboxOffset + h.x - 20 + "px", top: d + "px", display: this.proximate || d > b - 6 && d < b + a - 6 ? "" : "none" });
                    } }, this);
                }
            };
            d.prototype.renderTitle = function () {
                var e = this.options, a = this.padding, f = e.title, b = 0;
                f.text && (this.title || (this.title = this.chart.renderer.label(f.text, a - 3, a - 4, void 0, void 0, void 0, e.useHTML, void 0, "legend-title").attr({ zIndex: 1 }),
                    this.chart.styledMode || this.title.css(f.style), this.title.add(this.group)), f.width || this.title.css({ width: this.maxLegendWidth + "px" }), e = this.title.getBBox(), b = e.height, this.offsetWidth = e.width, this.contentGroup.attr({ translateY: b }));
                this.titleHeight = b;
            };
            d.prototype.setText = function (e) { var a = this.options; e.legendItem.attr({ text: a.labelFormat ? t(a.labelFormat, e, this.chart) : a.labelFormatter.call(e) }); };
            d.prototype.renderItem = function (e) {
                var a = this.chart, f = a.renderer, b = this.options, c = this.symbolWidth, h = b.symbolPadding ||
                    0, d = this.itemStyle, u = this.itemHiddenStyle, k = "horizontal" === b.layout ? y(b.itemDistance, 20) : 0, m = !b.rtl, l = !e.series, r = !l && e.series.drawLegendSymbol ? e.series : e, q = r.options, g = this.createCheckboxForItem && q && q.showCheckbox, w = b.useHTML, t = e.options.className, Q = e.legendItem;
                q = c + h + k + (g ? 20 : 0);
                Q || (e.legendGroup = f.g("legend-item").addClass("highcharts-" + r.type + "-series highcharts-color-" + e.colorIndex + (t ? " " + t : "") + (l ? " highcharts-series-" + e.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), e.legendItem = Q = f.text("", m ? c + h : -h, this.baseline || 0, w), a.styledMode || Q.css(J(e.visible ? d : u)), Q.attr({ align: m ? "left" : "right", zIndex: 2 }).add(e.legendGroup), this.baseline || (this.fontMetrics = f.fontMetrics(a.styledMode ? 12 : d.fontSize, Q), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, Q.attr("y", this.baseline), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, b.squareSymbol && (this.symbolWidth = y(b.symbolWidth, Math.max(this.symbolHeight, 16)), q = this.symbolWidth + h + k + (g ? 20 : 0), m && Q.attr("x", this.symbolWidth + h))), r.drawLegendSymbol(this, e), this.setItemEvents && this.setItemEvents(e, Q, w));
                g && !e.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(e);
                this.colorizeItem(e, e.visible);
                !a.styledMode && d.width || Q.css({ width: (b.itemWidth || this.widthOption || a.spacingBox.width) - q + "px" });
                this.setText(e);
                a = Q.getBBox();
                f = this.fontMetrics && this.fontMetrics.h || 0;
                e.itemWidth = e.checkboxOffset = b.itemWidth || e.legendItemWidth || a.width + q;
                this.maxItemWidth = Math.max(this.maxItemWidth, e.itemWidth);
                this.totalItemWidth += e.itemWidth;
                this.itemHeight =
                    e.itemHeight = Math.round(e.legendItemHeight || (a.height > 1.5 * f ? a.height : f));
            };
            d.prototype.layoutItem = function (e) {
                var a = this.options, f = this.padding, b = "horizontal" === a.layout, c = e.itemHeight, h = this.itemMarginBottom, d = this.itemMarginTop, u = b ? y(a.itemDistance, 20) : 0, k = this.maxLegendWidth;
                a = a.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : e.itemWidth;
                b && this.itemX - f + a > k && (this.itemX = f, this.lastLineHeight && (this.itemY += d + this.lastLineHeight + h), this.lastLineHeight = 0);
                this.lastItemY = d + this.itemY + h;
                this.lastLineHeight =
                    Math.max(c, this.lastLineHeight);
                e._legendItemPos = [this.itemX, this.itemY];
                b ? this.itemX += a : (this.itemY += d + c + h, this.lastLineHeight = c);
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - f - (e.checkbox ? 0 : u) : a) + f, this.offsetWidth);
            };
            d.prototype.getAllItems = function () { var e = []; this.chart.series.forEach(function (a) { var f = a && a.options; a && y(f.showInLegend, v(f.linkedTo) ? !1 : void 0, !0) && (e = e.concat(a.legendItems || ("point" === f.legendType ? a.data : a))); }); F(this, "afterGetAllItems", { allItems: e }); return e; };
            d.prototype.getAlignment =
                function () { var e = this.options; return this.proximate ? e.align.charAt(0) + "tv" : e.floating ? "" : e.align.charAt(0) + e.verticalAlign.charAt(0) + e.layout.charAt(0); };
            d.prototype.adjustMargins = function (e, a) { var f = this.chart, b = this.options, c = this.getAlignment(); c && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (d, h) { d.test(c) && !v(e[h]) && (f[q[h]] = Math.max(f[q[h]], f.legend[(h + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h] * b[h % 2 ? "x" : "y"] + y(b.margin, 12) + a[h] + (f.titleOffset[h] || 0))); }); };
            d.prototype.proximatePositions = function () {
                var e = this.chart, a = [], f = "left" === this.options.align;
                this.allItems.forEach(function (b) { var c; var d = f; if (b.yAxis) {
                    b.xAxis.options.reversed && (d = !d);
                    b.points && (c = N(d ? b.points : b.points.slice(0).reverse(), function (b) { return L(b.plotY); }));
                    d = this.itemMarginTop + b.legendItem.getBBox().height + this.itemMarginBottom;
                    var h = b.yAxis.top - e.plotTop;
                    b.visible ? (c = c ? c.plotY : b.yAxis.height, c += h - .3 * d) : c = h + b.yAxis.height;
                    a.push({ target: c, size: d, item: b });
                } }, this);
                c(a, e.plotHeight).forEach(function (b) {
                    b.item._legendItemPos &&
                        b.pos && (b.item._legendItemPos[1] = e.plotTop - e.spacing[0] + b.pos);
                });
            };
            d.prototype.render = function () {
                var e = this.chart, a = e.renderer, f = this.options, b = this.padding, c = this.getAllItems(), d = this.group, p = this.box;
                this.itemX = b;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = z(f.width, e.spacingBox.width - b);
                var u = e.spacingBox.width - 2 * b - f.x;
                -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (u /= 2);
                this.maxLegendWidth = this.widthOption || u;
                d || (this.group = d = a.g("legend").addClass(f.className ||
                    "").attr({ zIndex: 7 }).add(), this.contentGroup = a.g().attr({ zIndex: 1 }).add(d), this.scrollGroup = a.g().add(this.contentGroup));
                this.renderTitle();
                w(c, function (b, f) { return (b.options && b.options.legendIndex || 0) - (f.options && f.options.legendIndex || 0); });
                f.reversed && c.reverse();
                this.allItems = c;
                this.display = u = !!c.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                c.forEach(this.renderItem, this);
                c.forEach(this.layoutItem, this);
                c = (this.widthOption || this.offsetWidth) + b;
                var k = this.lastItemY +
                    this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += b;
                p || (this.box = p = a.rect().addClass("highcharts-legend-box").attr({ r: f.borderRadius }).add(d));
                e.styledMode || p.attr({ stroke: f.borderColor, "stroke-width": f.borderWidth || 0, fill: f.backgroundColor || "none" }).shadow(f.shadow);
                if (0 < c && 0 < k)
                    p[p.placed ? "animate" : "attr"](p.crisp.call({}, { x: 0, y: 0, width: c, height: k }, p.strokeWidth()));
                d[u ? "show" : "hide"]();
                e.styledMode && "none" === d.getStyle("display") && (c = k = 0);
                this.legendWidth = c;
                this.legendHeight = k;
                u &&
                    this.align();
                this.proximate || this.positionItems();
                F(this, "afterRender");
            };
            d.prototype.align = function (e) {
                void 0 === e && (e = this.chart.spacingBox);
                var a = this.chart, f = this.options, b = e.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? b += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a.titleOffset[2] && (b -= a.titleOffset[2]);
                b !== e.y && (e = J(e, { y: b }));
                a.hasRendered || (this.group.placed = !1);
                this.group.align(J(f, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ?
                        "top" : f.verticalAlign }), !0, e);
            };
            d.prototype.handleOverflow = function (e) {
                var a = this, f = this.chart, b = f.renderer, c = this.options, d = c.y, h = "top" === c.verticalAlign, u = this.padding, k = c.maxHeight, m = c.navigation, l = y(m.animation, !0), r = m.arrowSize || 12, q = this.pages, g = this.allItems, w = function (b) { "number" === typeof b ? F.attr({ height: b }) : F && (a.clipRect = F.destroy(), a.contentGroup.clip()); a.contentGroup.div && (a.contentGroup.div.style.clip = b ? "rect(" + u + "px,9999px," + (u + b) + "px,0)" : "auto"); }, t = function (e) {
                    a[e] = b.circle(0, 0, 1.3 *
                        r).translate(r / 2, r / 2).add(v);
                    f.styledMode || a[e].attr("fill", "rgba(0,0,0,0.0001)");
                    return a[e];
                }, Q, z;
                d = f.spacingBox.height + (h ? -d : d) - u;
                var v = this.nav, F = this.clipRect;
                "horizontal" !== c.layout || "middle" === c.verticalAlign || c.floating || (d /= 2);
                k && (d = Math.min(d, k));
                q.length = 0;
                e && 0 < d && e > d && !1 !== m.enabled ? (this.clipHeight = Q = Math.max(d - 20 - this.titleHeight - u, 0), this.currentPage = y(this.currentPage, 1), this.fullHeight = e, g.forEach(function (b, f) {
                    var e = b._legendItemPos[1], a = Math.round(b.legendItem.getBBox().height), c = q.length;
                    if (!c || e - q[c - 1] > Q && (z || e) !== q[c - 1])
                        q.push(z || e), c++;
                    b.pageIx = c - 1;
                    z && (g[f - 1].pageIx = c - 1);
                    f === g.length - 1 && e + a - q[c - 1] > Q && a <= Q && (q.push(e), b.pageIx = c);
                    e !== z && (z = e);
                }), F || (F = a.clipRect = b.clipRect(0, u, 9999, 0), a.contentGroup.clip(F)), w(Q), v || (this.nav = v = b.g().attr({ zIndex: 1 }).add(this.group), this.up = b.symbol("triangle", 0, 0, r, r).add(v), t("upTracker").on("click", function () { a.scroll(-1, l); }), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), !f.styledMode && m.style && this.pager.css(m.style),
                    this.pager.add(v), this.down = b.symbol("triangle-down", 0, 0, r, r).add(v), t("downTracker").on("click", function () { a.scroll(1, l); })), a.scroll(0), e = d) : v && (w(), this.nav = v.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
                return e;
            };
            d.prototype.scroll = function (a, c) {
                var f = this, b = this.chart, d = this.pages, h = d.length, p = this.clipHeight, n = this.options.navigation, k = this.pager, m = this.padding, r = this.currentPage + a;
                r > h && (r = h);
                0 < r && ("undefined" !== typeof c && A(c, b), this.nav.attr({ translateX: m, translateY: p +
                        this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function (b) { b.attr({ "class": 1 === r ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }); }), k.attr({ text: r + "/" + h }), [this.down, this.downTracker].forEach(function (b) { b.attr({ x: 18 + this.pager.getBBox().width, "class": r === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }); }, this), b.styledMode || (this.up.attr({ fill: 1 === r ? n.inactiveColor : n.activeColor }), this.upTracker.css({ cursor: 1 === r ? "default" :
                        "pointer" }), this.down.attr({ fill: r === h ? n.inactiveColor : n.activeColor }), this.downTracker.css({ cursor: r === h ? "default" : "pointer" })), this.scrollOffset = -d[r - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = r, this.positionCheckboxes(), a = C(y(c, b.renderer.globalAnimation, !0)), e(function () { F(f, "afterScroll", { currentPage: r }); }, a.duration));
            };
            d.prototype.setItemEvents = function (e, a, f) {
                var b = this, c = b.chart.renderer.boxWrapper, d = e instanceof E, h = "highcharts-legend-" +
                    (d ? "point" : "series") + "-active", n = b.chart.styledMode, k = function (f) { b.allItems.forEach(function (b) { e !== b && [b].concat(b.linkedSeries || []).forEach(function (b) { b.setState(f, !d); }); }); };
                (f ? [a, e.legendSymbol] : [e.legendGroup]).forEach(function (f) {
                    if (f)
                        f.on("mouseover", function () { e.visible && k("inactive"); e.setState("hover"); e.visible && c.addClass(h); n || a.css(b.options.itemHoverStyle); }).on("mouseout", function () { b.chart.styledMode || a.css(J(e.visible ? b.itemStyle : b.itemHiddenStyle)); k(""); c.removeClass(h); e.setState(); }).on("click", function (b) { var f = function () { e.setVisible && e.setVisible(); k(e.visible ? "inactive" : ""); }; c.removeClass(h); b = { browserEvent: b }; e.firePointEvent ? e.firePointEvent("legendItemClick", b, f) : F(e, "legendItemClick", b, f); });
                });
            };
            d.prototype.createCheckboxForItem = function (e) {
                e.checkbox = a("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: e.selected, defaultChecked: e.selected }, this.options.itemCheckboxStyle, this.chart.container);
                l(e.checkbox, "click", function (a) {
                    F(e.series || e, "checkboxClick", { checked: a.target.checked,
                        item: e }, function () { e.select(); });
                });
            };
            return d;
        }();
        (/Trident\/7\.0/.test(B.navigator && B.navigator.userAgent) || d) && x(G.prototype, "positionItem", function (e, a) { var c = this, f = function () { a._legendItemPos && e.call(c, a); }; f(); c.bubbleLegend || setTimeout(f); });
        "";
        return G;
    });
    P(g, "Core/Series/SeriesRegistry.js", [g["Core/Globals.js"], g["Core/DefaultOptions.js"], g["Core/Series/Point.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = g.defaultOptions, C = E.error, I = E.extendClass, A = E.merge, t;
        (function (q) {
            function c(c, a) {
                var d = x.plotOptions || {}, l = a.defaultOptions;
                a.prototype.pointClass || (a.prototype.pointClass = B);
                a.prototype.type = c;
                l && (d[c] = l);
                q.seriesTypes[c] = a;
            }
            q.seriesTypes = d.seriesTypes;
            q.getSeries = function (c, a) { void 0 === a && (a = {}); var d = c.options.chart; d = a.type || d.type || d.defaultSeriesType || ""; var l = q.seriesTypes[d]; q || C(17, !0, c, { missingModuleFor: d }); d = new l; "function" === typeof d.init && d.init(c, a); return d; };
            q.registerSeriesType = c;
            q.seriesType = function (d, a, k, g, m) {
                var l = x.plotOptions || {};
                a = a || "";
                l[d] = A(l[a], k);
                c(d, I(q.seriesTypes[a] ||
                    function () { }, g));
                q.seriesTypes[d].prototype.type = d;
                m && (q.seriesTypes[d].prototype.pointClass = I(B, m));
                return q.seriesTypes[d];
            };
        })(t || (t = {}));
        return t;
    });
    P(g, "Core/Chart/Chart.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g["Core/FormatUtilities.js"], g["Core/Foundation.js"], g["Core/Globals.js"], g["Core/Legend/Legend.js"], g["Core/MSPointer.js"], g["Core/DefaultOptions.js"], g["Core/Pointer.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Renderer/SVG/SVGRenderer.js"],
        g["Core/Time.js"], g["Core/Utilities.js"], g["Core/Renderer/HTML/AST.js"]], function (d, g, B, E, x, G, I, A, t, q, c, l, a, k, v) {
        var m = d.animate, N = d.animObject, F = d.setAnimation, L = B.numberFormat, J = E.registerEventOptions, y = x.charts, z = x.doc, w = x.marginNames, e = x.svg, r = x.win, h = A.defaultOptions, n = A.defaultTime, f = c.seriesTypes, b = k.addEvent, D = k.attr, H = k.cleanRecursively, p = k.createElement, u = k.css, K = k.defined, T = k.discardElement, M = k.erase, O = k.error, X = k.extend, Z = k.find, C = k.fireEvent, aa = k.getStyle, Q = k.isArray, ba = k.isNumber, S = k.isObject, ca = k.isString, W = k.merge, V = k.objectEach, R = k.pick, da = k.pInt, ia = k.relativeLength, P = k.removeEvent, fa = k.splat, Y = k.syncTimeout, ja = k.uniqueKey;
        d = function () {
            function c(b, f, e) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth =
                    this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(b, f, e);
            }
            c.chart = function (b, f, e) { return new c(b, f, e); };
            c.prototype.getArgs = function (b, f, e) { ca(b) || b.nodeName ? (this.renderTo = b, this.init(f, e)) : this.init(b, f); };
            c.prototype.init = function (b, f) {
                var e = b.plotOptions || {};
                C(this, "init", { args: arguments }, function () {
                    var c = W(h, b), d = c.chart;
                    V(c.plotOptions, function (b, f) { S(b) && (b.tooltip = e[f] && W(e[f].tooltip) || void 0); });
                    c.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    this.userOptions = b;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = { h: {}, v: {} };
                    this.labelCollectors = [];
                    this.callback = f;
                    this.isResizing = 0;
                    this.options = c;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new a(b.time) : x.time;
                    this.numberFormatter = d.numberFormatter || L;
                    this.styledMode = d.styledMode;
                    this.hasCartesianSeries = d.showAxes;
                    this.index =
                        y.length;
                    y.push(this);
                    x.chartCount++;
                    J(this, d);
                    this.xAxis = [];
                    this.yAxis = [];
                    this.pointCount = this.colorCounter = this.symbolCounter = 0;
                    C(this, "afterInit");
                    this.firstRender();
                });
            };
            c.prototype.initSeries = function (b) { var e = this.options.chart; e = b.type || e.type || e.defaultSeriesType; var a = f[e]; a || O(17, !0, this, { missingModuleFor: e }); e = new a; "function" === typeof e.init && e.init(this, b); return e; };
            c.prototype.setSeriesData = function () {
                this.getSeriesOrderByLinks().forEach(function (b) {
                    b.points || b.data || !b.enabledDataSorting ||
                        b.setData(b.options.data, !1);
                });
            };
            c.prototype.getSeriesOrderByLinks = function () { return this.series.concat().sort(function (b, f) { return b.linkedSeries.length || f.linkedSeries.length ? f.linkedSeries.length - b.linkedSeries.length : 0; }); };
            c.prototype.orderSeries = function (b) { var f = this.series; b = b || 0; for (var e = f.length; b < e; ++b)
                f[b] && (f[b].index = b, f[b].name = f[b].getName()); };
            c.prototype.isInsidePlot = function (b, f, e) {
                void 0 === e && (e = {});
                var a = this.inverted, c = this.plotBox, d = this.plotLeft, h = this.plotTop, p = this.scrollablePlotBox, n = 0;
                var u = 0;
                e.visiblePlotOnly && this.scrollingContainer && (u = this.scrollingContainer, n = u.scrollLeft, u = u.scrollTop);
                var k = e.series;
                c = e.visiblePlotOnly && p || c;
                p = e.inverted ? f : b;
                f = e.inverted ? b : f;
                b = { x: p, y: f, isInsidePlot: !0 };
                if (!e.ignoreX) {
                    var m = k && (a ? k.yAxis : k.xAxis) || { pos: d, len: Infinity };
                    p = e.paneCoordinates ? m.pos + p : d + p;
                    p >= Math.max(n + d, m.pos) && p <= Math.min(n + d + c.width, m.pos + m.len) || (b.isInsidePlot = !1);
                }
                !e.ignoreY && b.isInsidePlot && (a = k && (a ? k.xAxis : k.yAxis) || { pos: h, len: Infinity }, e = e.paneCoordinates ? a.pos + f : h +
                    f, e >= Math.max(u + h, a.pos) && e <= Math.min(u + h + c.height, a.pos + a.len) || (b.isInsidePlot = !1));
                C(this, "afterIsInsidePlot", b);
                return b.isInsidePlot;
            };
            c.prototype.redraw = function (b) {
                C(this, "beforeRedraw");
                var f = this.hasCartesianSeries ? this.axes : this.colorAxis || [], e = this.series, a = this.pointer, c = this.legend, d = this.userOptions.legend, h = this.renderer, p = h.isHidden(), n = [], u = this.isDirtyBox, k = this.isDirtyLegend;
                this.setResponsive && this.setResponsive(!1);
                F(this.hasRendered ? b : !1, this);
                p && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;) {
                    var m = e[b];
                    if (m.options.stacking || m.options.centerInCategory) {
                        var r = !0;
                        if (m.isDirty) {
                            var l = !0;
                            break;
                        }
                    }
                }
                if (l)
                    for (b = e.length; b--;)
                        m = e[b], m.options.stacking && (m.isDirty = !0);
                e.forEach(function (b) { b.isDirty && ("point" === b.options.legendType ? ("function" === typeof b.updateTotals && b.updateTotals(), k = !0) : d && (d.labelFormatter || d.labelFormat) && (k = !0)); b.isDirtyData && C(b, "updatedData"); });
                k && c && c.options.enabled && (c.render(), this.isDirtyLegend = !1);
                r && this.getStacks();
                f.forEach(function (b) {
                    b.updateNames();
                    b.setScale();
                });
                this.getMargins();
                f.forEach(function (b) { b.isDirty && (u = !0); });
                f.forEach(function (b) { var f = b.min + "," + b.max; b.extKey !== f && (b.extKey = f, n.push(function () { C(b, "afterSetExtremes", X(b.eventArgs, b.getExtremes())); delete b.eventArgs; })); (u || r) && b.redraw(); });
                u && this.drawChartBox();
                C(this, "predraw");
                e.forEach(function (b) { (u || b.isDirty) && b.visible && b.redraw(); b.isDirtyData = !1; });
                a && a.reset(!0);
                h.draw();
                C(this, "redraw");
                C(this, "render");
                p && this.temporaryDisplay(!0);
                n.forEach(function (b) { b.call(); });
            };
            c.prototype.get = function (b) { function f(f) { return f.id === b || f.options && f.options.id === b; } for (var e = this.series, a = Z(this.axes, f) || Z(this.series, f), c = 0; !a && c < e.length; c++)
                a = Z(e[c].points || [], f); return a; };
            c.prototype.getAxes = function () { var b = this, f = this.options, e = f.xAxis = fa(f.xAxis || {}); f = f.yAxis = fa(f.yAxis || {}); C(this, "getAxes"); e.forEach(function (b, f) { b.index = f; b.isX = !0; }); f.forEach(function (b, f) { b.index = f; }); e.concat(f).forEach(function (f) { new g(b, f); }); C(this, "afterGetAxes"); };
            c.prototype.getSelectedPoints =
                function () { return this.series.reduce(function (b, f) { f.getPointsCollection().forEach(function (f) { R(f.selectedStaging, f.selected) && b.push(f); }); return b; }, []); };
            c.prototype.getSelectedSeries = function () { return this.series.filter(function (b) { return b.selected; }); };
            c.prototype.setTitle = function (b, f, e) { this.applyDescription("title", b); this.applyDescription("subtitle", f); this.applyDescription("caption", void 0); this.layOutTitles(e); };
            c.prototype.applyDescription = function (b, f) {
                var e = this, a = "title" === b ? { color: "#333333",
                    fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" };
                a = this.options[b] = W(!this.styledMode && { style: a }, this.options[b], f);
                var c = this[b];
                c && f && (this[b] = c = c.destroy());
                a && !c && (c = this.renderer.text(a.text, 0, 0, a.useHTML).attr({ align: a.align, "class": "highcharts-" + b, zIndex: a.zIndex || 4 }).add(), c.update = function (f) { e[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[b]](f); }, this.styledMode || c.css(a.style), this[b] = c);
            };
            c.prototype.layOutTitles = function (b) {
                var f = [0, 0, 0], e = this.renderer, a = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (b) {
                    var c = this[b], d = this.options[b], h = d.verticalAlign || "top";
                    b = "title" === b ? "top" === h ? -3 : 0 : "top" === h ? f[0] + 2 : 0;
                    var p;
                    if (c) {
                        this.styledMode || (p = d.style && d.style.fontSize);
                        p = e.fontMetrics(p, c).b;
                        c.css({ width: (d.width || a.width + (d.widthAdjust || 0)) + "px" });
                        var n = Math.round(c.getBBox(d.useHTML).height);
                        c.align(X({ y: "bottom" === h ? p : b + p, height: n }, d), !1, "spacingBox");
                        d.floating || ("top" === h ? f[0] = Math.ceil(f[0] + n) : "bottom" === h && (f[2] = Math.ceil(f[2] +
                            n)));
                    }
                }, this);
                f[0] && "top" === (this.options.title.verticalAlign || "top") && (f[0] += this.options.title.margin);
                f[2] && "bottom" === this.options.caption.verticalAlign && (f[2] += this.options.caption.margin);
                var c = !this.titleOffset || this.titleOffset.join(",") !== f.join(",");
                this.titleOffset = f;
                C(this, "afterLayOutTitles");
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && R(b, !0) && this.isDirtyBox && this.redraw());
            };
            c.prototype.getChartSize = function () {
                var b = this.options.chart, f = b.width;
                b = b.height;
                var e = this.renderTo;
                K(f) || (this.containerWidth = aa(e, "width"));
                K(b) || (this.containerHeight = aa(e, "height"));
                this.chartWidth = Math.max(0, f || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ia(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
            };
            c.prototype.temporaryDisplay = function (b) {
                var f = this.renderTo;
                if (b)
                    for (; f && f.style;)
                        f.hcOrigStyle && (u(f, f.hcOrigStyle), delete f.hcOrigStyle), f.hcOrigDetached && (z.body.removeChild(f), f.hcOrigDetached = !1), f = f.parentNode;
                else
                    for (; f && f.style;) {
                        z.body.contains(f) ||
                            f.parentNode || (f.hcOrigDetached = !0, z.body.appendChild(f));
                        if ("none" === aa(f, "display", !1) || f.hcOricDetached)
                            f.hcOrigStyle = { display: f.style.display, height: f.style.height, overflow: f.style.overflow }, b = { display: "block", overflow: "hidden" }, f !== this.renderTo && (b.height = 0), u(f, b), f.offsetWidth || f.style.setProperty("display", "block", "important");
                        f = f.parentNode;
                        if (f === z.body)
                            break;
                    }
            };
            c.prototype.setClassName = function (b) { this.container.className = "highcharts-container " + (b || ""); };
            c.prototype.getContainer = function () {
                var b = this.options, f = b.chart, a = ja(), c, d = this.renderTo;
                d || (this.renderTo = d = f.renderTo);
                ca(d) && (this.renderTo = d = z.getElementById(d));
                d || O(13, !0, this);
                var h = da(D(d, "data-highcharts-chart"));
                ba(h) && y[h] && y[h].hasRendered && y[h].destroy();
                D(d, "data-highcharts-chart", this.index);
                d.innerHTML = v.emptyHTML;
                f.skipClone || d.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                h = this.chartWidth;
                var n = this.chartHeight;
                u(d, { overflow: "hidden" });
                this.styledMode || (c = X({ position: "relative", overflow: "hidden", width: h + "px",
                    height: n + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)", userSelect: "none", "touch-action": "manipulation", outline: "none" }, f.style || {}));
                this.container = a = p("div", { id: a }, c, d);
                this._cursor = a.style.cursor;
                this.renderer = new (f.renderer || !e ? q.getRendererType(f.renderer) : l)(a, h, n, void 0, f.forExport, b.exporting && b.exporting.allowHTML, this.styledMode);
                F(void 0, this);
                this.setClassName(f.className);
                if (this.styledMode)
                    for (var k in b.defs)
                        this.renderer.definition(b.defs[k]);
                else
                    this.renderer.setStyle(f.style);
                this.renderer.chartIndex = this.index;
                C(this, "afterGetContainer");
            };
            c.prototype.getMargins = function (b) { var f = this.spacing, e = this.margin, a = this.titleOffset; this.resetMargins(); a[0] && !K(e[0]) && (this.plotTop = Math.max(this.plotTop, a[0] + f[0])); a[2] && !K(e[2]) && (this.marginBottom = Math.max(this.marginBottom, a[2] + f[2])); this.legend && this.legend.display && this.legend.adjustMargins(e, f); C(this, "getMargins"); b || this.getAxisMargins(); };
            c.prototype.getAxisMargins = function () {
                var b = this, f = b.axisOffset = [0, 0, 0, 0], e = b.colorAxis, a = b.margin, c = function (b) { b.forEach(function (b) { b.visible && b.getOffset(); }); };
                b.hasCartesianSeries ? c(b.axes) : e && e.length && c(e);
                w.forEach(function (e, c) { K(a[c]) || (b[e] += f[c]); });
                b.setChartSize();
            };
            c.prototype.reflow = function (b) {
                var f = this, e = f.options.chart, a = f.renderTo, c = K(e.width) && K(e.height), d = e.width || aa(a, "width");
                e = e.height || aa(a, "height");
                a = b ? b.target : r;
                delete f.pointer.chartPosition;
                if (!c && !f.isPrinting && d && e && (a === r || a === z)) {
                    if (d !== f.containerWidth || e !==
                        f.containerHeight)
                        k.clearTimeout(f.reflowTimeout), f.reflowTimeout = Y(function () { f.container && f.setSize(void 0, void 0, !1); }, b ? 100 : 0);
                    f.containerWidth = d;
                    f.containerHeight = e;
                }
            };
            c.prototype.setReflow = function (f) { var e = this; !1 === f || this.unbindReflow ? !1 === f && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = b(r, "resize", function (b) { e.options && e.reflow(b); }), b(this, "destroy", this.unbindReflow)); };
            c.prototype.setSize = function (b, f, e) {
                var a = this, c = a.renderer;
                a.isResizing += 1;
                F(e, a);
                e =
                    c.globalAnimation;
                a.oldChartHeight = a.chartHeight;
                a.oldChartWidth = a.chartWidth;
                "undefined" !== typeof b && (a.options.chart.width = b);
                "undefined" !== typeof f && (a.options.chart.height = f);
                a.getChartSize();
                a.styledMode || (e ? m : u)(a.container, { width: a.chartWidth + "px", height: a.chartHeight + "px" }, e);
                a.setChartSize(!0);
                c.setSize(a.chartWidth, a.chartHeight, e);
                a.axes.forEach(function (b) { b.isDirty = !0; b.setScale(); });
                a.isDirtyLegend = !0;
                a.isDirtyBox = !0;
                a.layOutTitles();
                a.getMargins();
                a.redraw(e);
                a.oldChartHeight = null;
                C(a, "resize");
                Y(function () { a && C(a, "endResize", null, function () { --a.isResizing; }); }, N(e).duration);
            };
            c.prototype.setChartSize = function (b) {
                var f = this.inverted, e = this.renderer, a = this.chartWidth, c = this.chartHeight, d = this.options.chart, h = this.spacing, p = this.clipOffset, n, u, k, m;
                this.plotLeft = n = Math.round(this.plotLeft);
                this.plotTop = u = Math.round(this.plotTop);
                this.plotWidth = k = Math.max(0, Math.round(a - n - this.marginRight));
                this.plotHeight = m = Math.max(0, Math.round(c - u - this.marginBottom));
                this.plotSizeX = f ? m : k;
                this.plotSizeY =
                    f ? k : m;
                this.plotBorderWidth = d.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = { x: h[3], y: h[0], width: a - h[3] - h[1], height: c - h[0] - h[2] };
                this.plotBox = e.plotBox = { x: n, y: u, width: k, height: m };
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                a = Math.ceil(Math.max(f, p[3]) / 2);
                c = Math.ceil(Math.max(f, p[0]) / 2);
                this.clipBox = { x: a, y: c, width: Math.floor(this.plotSizeX - Math.max(f, p[1]) / 2 - a), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, p[2]) / 2 - c)) };
                b || (this.axes.forEach(function (b) { b.setAxisSize(); b.setAxisTranslation(); }),
                    e.alignElements());
                C(this, "afterSetChartSize", { skipAxes: b });
            };
            c.prototype.resetMargins = function () { C(this, "resetMargins"); var b = this, f = b.options.chart; ["margin", "spacing"].forEach(function (e) { var a = f[e], c = S(a) ? a : [a, a, a, a]; ["Top", "Right", "Bottom", "Left"].forEach(function (a, d) { b[e][d] = R(f[e + a], c[d]); }); }); w.forEach(function (f, e) { b[f] = R(b.margin[e], b.spacing[e]); }); b.axisOffset = [0, 0, 0, 0]; b.clipOffset = [0, 0, 0, 0]; };
            c.prototype.drawChartBox = function () {
                var b = this.options.chart, f = this.renderer, e = this.chartWidth, a = this.chartHeight, c = this.styledMode, d = this.plotBGImage, h = b.backgroundColor, p = b.plotBackgroundColor, n = b.plotBackgroundImage, u = this.plotLeft, k = this.plotTop, m = this.plotWidth, r = this.plotHeight, l = this.plotBox, q = this.clipRect, g = this.clipBox, w = this.chartBackground, D = this.plotBackground, H = this.plotBorder, y, Q = "animate";
                w || (this.chartBackground = w = f.rect().addClass("highcharts-background").add(), Q = "attr");
                if (c)
                    var t = y = w.strokeWidth();
                else {
                    t = b.borderWidth || 0;
                    y = t + (b.shadow ? 8 : 0);
                    h = { fill: h || "none" };
                    if (t || w["stroke-width"])
                        h.stroke =
                            b.borderColor, h["stroke-width"] = t;
                    w.attr(h).shadow(b.shadow);
                }
                w[Q]({ x: y / 2, y: y / 2, width: e - y - t % 2, height: a - y - t % 2, r: b.borderRadius });
                Q = "animate";
                D || (Q = "attr", this.plotBackground = D = f.rect().addClass("highcharts-plot-background").add());
                D[Q](l);
                c || (D.attr({ fill: p || "none" }).shadow(b.plotShadow), n && (d ? (n !== d.attr("href") && d.attr("href", n), d.animate(l)) : this.plotBGImage = f.image(n, u, k, m, r).add()));
                q ? q.animate({ width: g.width, height: g.height }) : this.clipRect = f.clipRect(g);
                Q = "animate";
                H || (Q = "attr", this.plotBorder =
                    H = f.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
                c || H.attr({ stroke: b.plotBorderColor, "stroke-width": b.plotBorderWidth || 0, fill: "none" });
                H[Q](H.crisp({ x: u, y: k, width: m, height: r }, -H.strokeWidth()));
                this.isDirtyBox = !1;
                C(this, "afterDrawChartBox");
            };
            c.prototype.propFromSeries = function () {
                var b = this, e = b.options.chart, a = b.options.series, c, d, h;
                ["inverted", "angular", "polar"].forEach(function (p) {
                    d = f[e.type || e.defaultSeriesType];
                    h = e[p] || d && d.prototype[p];
                    for (c = a && a.length; !h && c--;)
                        (d = f[a[c].type]) &&
                            d.prototype[p] && (h = !0);
                    b[p] = h;
                });
            };
            c.prototype.linkSeries = function () { var b = this, f = b.series; f.forEach(function (b) { b.linkedSeries.length = 0; }); f.forEach(function (f) { var e = f.options.linkedTo; ca(e) && (e = ":previous" === e ? b.series[f.index - 1] : b.get(e)) && e.linkedParent !== f && (e.linkedSeries.push(f), f.linkedParent = e, e.enabledDataSorting && f.setDataSortingOptions(), f.visible = R(f.options.visible, e.options.visible, f.visible)); }); C(this, "afterLinkSeries"); };
            c.prototype.renderSeries = function () {
                this.series.forEach(function (b) {
                    b.translate();
                    b.render();
                });
            };
            c.prototype.renderLabels = function () { var b = this, f = b.options.labels; f.items && f.items.forEach(function (e) { var a = X(f.style, e.style), c = da(a.left) + b.plotLeft, d = da(a.top) + b.plotTop + 12; delete a.left; delete a.top; b.renderer.text(e.html, c, d).attr({ zIndex: 2 }).css(a).add(); }); };
            c.prototype.render = function () {
                var b = this.axes, f = this.colorAxis, e = this.renderer, a = this.options, c = function (b) { b.forEach(function (b) { b.visible && b.render(); }); }, d = 0;
                this.setTitle();
                this.legend = new G(this, a.legend);
                this.getStacks &&
                    this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                a = this.plotWidth;
                b.some(function (b) { if (b.horiz && b.visible && b.options.labels.enabled && b.series.length)
                    return d = 21, !0; });
                var h = this.plotHeight = Math.max(this.plotHeight - d, 0);
                b.forEach(function (b) { b.setScale(); });
                this.getAxisMargins();
                var p = 1.1 < a / this.plotWidth, n = 1.05 < h / this.plotHeight;
                if (p || n)
                    b.forEach(function (b) { (b.horiz && p || !b.horiz && n) && b.setTickInterval(!0); }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? c(b) : f && f.length && c(f);
                this.seriesGroup || (this.seriesGroup = e.g("series-group").attr({ zIndex: 3 }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0;
            };
            c.prototype.addCredits = function (b) {
                var f = this, e = W(!0, this.options.credits, b);
                e.enabled && !this.credits && (this.credits = this.renderer.text(e.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () { e.href && (r.location.href = e.href); }).attr({ align: e.position.align, zIndex: 8 }), f.styledMode ||
                    this.credits.css(e.style), this.credits.add().align(e.position), this.credits.update = function (b) { f.credits = f.credits.destroy(); f.addCredits(b); });
            };
            c.prototype.destroy = function () {
                var b = this, f = b.axes, e = b.series, a = b.container, c = a && a.parentNode, d;
                C(b, "destroy");
                b.renderer.forExport ? M(y, b) : y[b.index] = void 0;
                x.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                P(b);
                for (d = f.length; d--;)
                    f[d] = f[d].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (d = e.length; d--;)
                    e[d] = e[d].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (f) { var e = b[f]; e && e.destroy && (b[f] = e.destroy()); });
                a && (a.innerHTML = v.emptyHTML, P(a), c && T(a));
                V(b, function (f, e) { delete b[e]; });
            };
            c.prototype.firstRender = function () {
                var b = this, f = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (Q(f.series) ?
                        f.series : []).forEach(function (f) { b.initSeries(f); });
                    b.linkSeries();
                    b.setSeriesData();
                    C(b, "beforeRender");
                    t && (I.isRequired() ? b.pointer = new I(b, f) : b.pointer = new t(b, f));
                    b.render();
                    b.pointer.getChartPosition();
                    if (!b.renderer.imgCount && !b.hasLoaded)
                        b.onload();
                    b.temporaryDisplay(!0);
                }
            };
            c.prototype.onload = function () {
                this.callbacks.concat([this.callback]).forEach(function (b) { b && "undefined" !== typeof this.index && b.apply(this, [this]); }, this);
                C(this, "load");
                C(this, "render");
                K(this.index) && this.setReflow(this.options.chart.reflow);
                this.warnIfA11yModuleNotLoaded();
                this.hasLoaded = !0;
            };
            c.prototype.warnIfA11yModuleNotLoaded = function () {
                var b = this.options, f = this.title;
                b && !this.accessibility && (this.renderer.boxWrapper.attr({ role: "img", "aria-label": f && f.element.textContent || "" }), b.accessibility && !1 === b.accessibility.enabled || O('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.', !1, this));
            };
            c.prototype.addSeries = function (b, f, e) { var a = this, c; b && (f = R(f, !0), C(a, "addSeries", { options: b }, function () { c = a.initSeries(b); a.isDirtyLegend = !0; a.linkSeries(); c.enabledDataSorting && c.setData(b.data, !1); C(a, "afterAddSeries", { series: c }); f && a.redraw(e); })); return c; };
            c.prototype.addAxis = function (b, f, e, a) { return this.createAxis(f ? "xAxis" : "yAxis", { axis: b, redraw: e, animation: a }); };
            c.prototype.addColorAxis = function (b, f, e) { return this.createAxis("colorAxis", { axis: b, redraw: f, animation: e }); };
            c.prototype.createAxis =
                function (b, f) { b = new g(this, W(f.axis, { index: this[b].length, isX: "xAxis" === b })); R(f.redraw, !0) && this.redraw(f.animation); return b; };
            c.prototype.showLoading = function (f) {
                var e = this, a = e.options, c = a.loading, d = function () { h && u(h, { left: e.plotLeft + "px", top: e.plotTop + "px", width: e.plotWidth + "px", height: e.plotHeight + "px" }); }, h = e.loadingDiv, n = e.loadingSpan;
                h || (e.loadingDiv = h = p("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, e.container));
                n || (e.loadingSpan = n = p("span", { className: "highcharts-loading-inner" }, null, h), b(e, "redraw", d));
                h.className = "highcharts-loading";
                v.setElementHTML(n, R(f, a.lang.loading, ""));
                e.styledMode || (u(h, X(c.style, { zIndex: 10 })), u(n, c.labelStyle), e.loadingShown || (u(h, { opacity: 0, display: "" }), m(h, { opacity: c.style.opacity || .5 }, { duration: c.showDuration || 0 })));
                e.loadingShown = !0;
                d();
            };
            c.prototype.hideLoading = function () {
                var b = this.options, f = this.loadingDiv;
                f && (f.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || m(f, { opacity: 0 }, { duration: b.loading.hideDuration || 100,
                    complete: function () { u(f, { display: "none" }); } }));
                this.loadingShown = !1;
            };
            c.prototype.update = function (b, f, e, c) {
                var d = this, h = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, p = b.isResponsiveOptions, u = [], k, m;
                C(d, "update", { options: b });
                p || d.setResponsive(!1, !0);
                b = H(b, d.options);
                d.userOptions = W(d.userOptions, b);
                var r = b.chart;
                if (r) {
                    W(!0, d.options.chart, r);
                    "className" in r && d.setClassName(r.className);
                    "reflow" in r && d.setReflow(r.reflow);
                    if ("inverted" in r || "polar" in r || "type" in
                        r) {
                        d.propFromSeries();
                        var l = !0;
                    }
                    "alignTicks" in r && (l = !0);
                    "events" in r && J(this, r);
                    V(r, function (b, f) { -1 !== d.propsRequireUpdateSeries.indexOf("chart." + f) && (k = !0); -1 !== d.propsRequireDirtyBox.indexOf(f) && (d.isDirtyBox = !0); -1 !== d.propsRequireReflow.indexOf(f) && (p ? d.isDirtyBox = !0 : m = !0); });
                    !d.styledMode && r.style && d.renderer.setStyle(d.options.chart.style || {});
                }
                !d.styledMode && b.colors && (this.options.colors = b.colors);
                b.time && (this.time === n && (this.time = new a(b.time)), W(!0, d.options.time, b.time));
                V(b, function (f, e) { if (d[e] && "function" === typeof d[e].update)
                    d[e].update(f, !1);
                else if ("function" === typeof d[h[e]])
                    d[h[e]](f);
                else
                    "colors" !== e && -1 === d.collectionsWithUpdate.indexOf(e) && W(!0, d.options[e], b[e]); "chart" !== e && -1 !== d.propsRequireUpdateSeries.indexOf(e) && (k = !0); });
                this.collectionsWithUpdate.forEach(function (f) {
                    if (b[f]) {
                        var a = [];
                        d[f].forEach(function (b, f) { b.options.isInternal || a.push(R(b.options.index, f)); });
                        fa(b[f]).forEach(function (b, c) {
                            var h = K(b.id), p;
                            h && (p = d.get(b.id));
                            !p && d[f] && (p = d[f][a ? a[c] : c]) && h &&
                                K(p.options.id) && (p = void 0);
                            p && p.coll === f && (p.update(b, !1), e && (p.touched = !0));
                            !p && e && d.collectionsWithInit[f] && (d.collectionsWithInit[f][0].apply(d, [b].concat(d.collectionsWithInit[f][1] || []).concat([!1])).touched = !0);
                        });
                        e && d[f].forEach(function (b) { b.touched || b.options.isInternal ? delete b.touched : u.push(b); });
                    }
                });
                u.forEach(function (b) { b.chart && b.remove && b.remove(!1); });
                l && d.axes.forEach(function (b) { b.update({}, !1); });
                k && d.getSeriesOrderByLinks().forEach(function (b) { b.chart && b.update({}, !1); }, this);
                l = r &&
                    r.width;
                r = r && (ca(r.height) ? ia(r.height, l || d.chartWidth) : r.height);
                m || ba(l) && l !== d.chartWidth || ba(r) && r !== d.chartHeight ? d.setSize(l, r, c) : R(f, !0) && d.redraw(c);
                C(d, "afterUpdate", { options: b, redraw: f, animation: c });
            };
            c.prototype.setSubtitle = function (b, f) { this.applyDescription("subtitle", b); this.layOutTitles(f); };
            c.prototype.setCaption = function (b, f) { this.applyDescription("caption", b); this.layOutTitles(f); };
            c.prototype.showResetZoom = function () {
                function b() { f.zoomOut(); }
                var f = this, e = h.lang, a = f.options.chart.resetZoomButton, c = a.theme, d = "chart" === a.relativeTo || "spacingBox" === a.relativeTo ? null : "scrollablePlotBox";
                C(this, "beforeShowResetZoom", null, function () { f.resetZoomButton = f.renderer.button(e.resetZoom, null, null, b, c).attr({ align: a.position.align, title: e.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(a.position, !1, d); });
                C(this, "afterShowResetZoom");
            };
            c.prototype.zoomOut = function () { C(this, "selection", { resetSelection: !0 }, this.zoom); };
            c.prototype.zoom = function (b) {
                var f = this, e = f.pointer, a = f.inverted ? e.mouseDownX :
                    e.mouseDownY, c = !1, d;
                !b || b.resetSelection ? (f.axes.forEach(function (b) { d = b.zoom(); }), e.initiated = !1) : b.xAxis.concat(b.yAxis).forEach(function (b) { var h = b.axis, p = f.inverted ? h.left : h.top, n = f.inverted ? p + h.width : p + h.height, u = h.isXAxis, k = !1; if (!u && a >= p && a <= n || u || !K(a))
                    k = !0; e[u ? "zoomX" : "zoomY"] && k && (d = h.zoom(b.min, b.max), h.displayBtn && (c = !0)); });
                var h = f.resetZoomButton;
                c && !h ? f.showResetZoom() : !c && S(h) && (f.resetZoomButton = h.destroy());
                d && f.redraw(R(f.options.chart.animation, b && b.animation, 100 > f.pointCount));
            };
            c.prototype.pan = function (b, f) {
                var e = this, a = e.hoverPoints;
                f = "object" === typeof f ? f : { enabled: f, type: "x" };
                var c = e.options.chart;
                c && c.panning && (c.panning = f);
                var d = f.type, h;
                C(this, "pan", { originalEvent: b }, function () {
                    a && a.forEach(function (b) { b.setState(); });
                    var f = e.xAxis;
                    "xy" === d ? f = f.concat(e.yAxis) : "y" === d && (f = e.yAxis);
                    var c = {};
                    f.forEach(function (f) {
                        if (f.options.panningEnabled && !f.options.isInternal) {
                            var a = f.horiz, p = b[a ? "chartX" : "chartY"];
                            a = a ? "mouseDownX" : "mouseDownY";
                            var n = e[a], u = f.minPointOffset || 0, k = f.reversed &&
                                !e.inverted || !f.reversed && e.inverted ? -1 : 1, r = f.getExtremes(), m = f.toValue(n - p, !0) + u * k, l = f.toValue(n + f.len - p, !0) - (u * k || f.isXAxis && f.pointRangePadding || 0), q = l < m;
                            k = f.hasVerticalPanning();
                            n = q ? l : m;
                            m = q ? m : l;
                            var g = f.panningState;
                            !k || f.isXAxis || g && !g.isDirty || f.series.forEach(function (b) {
                                var f = b.getProcessedData(!0);
                                f = b.getExtremes(f.yData, !0);
                                g || (g = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                                ba(f.dataMin) && ba(f.dataMax) && (g.startMin = Math.min(R(b.options.threshold, Infinity), f.dataMin, g.startMin),
                                    g.startMax = Math.max(R(b.options.threshold, -Infinity), f.dataMax, g.startMax));
                            });
                            k = Math.min(R(g && g.startMin, r.dataMin), u ? r.min : f.toValue(f.toPixels(r.min) - f.minPixelPadding));
                            l = Math.max(R(g && g.startMax, r.dataMax), u ? r.max : f.toValue(f.toPixels(r.max) + f.minPixelPadding));
                            f.panningState = g;
                            f.isOrdinal || (u = k - n, 0 < u && (m += u, n = k), u = m - l, 0 < u && (m = l, n -= u), f.series.length && n !== r.min && m !== r.max && n >= k && m <= l && (f.setExtremes(n, m, !1, !1, { trigger: "pan" }), !e.resetZoomButton && n !== k && m !== l && d.match("y") && (e.showResetZoom(),
                                f.displayBtn = !1), h = !0), c[a] = p);
                        }
                    });
                    V(c, function (b, f) { e[f] = b; });
                    h && e.redraw(!1);
                    u(e.container, { cursor: "move" });
                });
            };
            return c;
        }();
        X(d.prototype, { callbacks: [], collectionsWithInit: { xAxis: [d.prototype.addAxis, [!0]], yAxis: [d.prototype.addAxis, [!1]], series: [d.prototype.addSeries] }, collectionsWithUpdate: ["xAxis", "yAxis", "series"], propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "), propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ") });
        "";
        return d;
    });
    P(g, "Core/Legend/LegendSymbol.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.merge, B = d.pick, E;
        (function (d) {
            d.drawLineMarker = function (d) {
                var x = this.options, A = d.symbolWidth, t = d.symbolHeight, q = t / 2, c = this.chart.renderer, l = this.legendGroup;
                d = d.baseline - Math.round(.3 * d.fontMetrics.b);
                var a = {}, k = x.marker;
                this.chart.styledMode || (a = { "stroke-width": x.lineWidth ||
                        0 }, x.dashStyle && (a.dashstyle = x.dashStyle));
                this.legendLine = c.path([["M", 0, d], ["L", A, d]]).addClass("highcharts-graph").attr(a).add(l);
                k && !1 !== k.enabled && A && (x = Math.min(B(k.radius, q), q), 0 === this.symbol.indexOf("url") && (k = g(k, { width: t, height: t }), x = 0), this.legendSymbol = A = c.symbol(this.symbol, A / 2 - x, d - x, 2 * x, 2 * x, k).addClass("highcharts-point").add(l), A.isMarker = !0);
            };
            d.drawRectangle = function (d, g) {
                var x = d.symbolHeight, t = d.options.squareSymbol;
                g.legendSymbol = this.chart.renderer.rect(t ? (d.symbolWidth - x) / 2 : 0, d.baseline - x + 1, t ? x : d.symbolWidth, x, B(d.options.symbolRadius, x / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(g.legendGroup);
            };
        })(E || (E = {}));
        return E;
    });
    P(g, "Core/Series/SeriesDefaults.js", [], function () {
        return { lineWidth: 2, allowPointSelect: !1, crisp: !0, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc",
                        lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: { animation: {}, align: "center", defer: !0, formatter: function () { var d = this.series.chart.numberFormatter; return "number" !== typeof this.y ? "" : d(this.y, -1); }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } },
                select: { animation: { duration: 0 } }, inactive: { animation: { duration: 50 }, opacity: .2 } }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x" };
    });
    P(g, "Core/Series/Series.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/DefaultOptions.js"], g["Core/Foundation.js"], g["Core/Globals.js"], g["Core/Legend/LegendSymbol.js"], g["Core/Series/Point.js"], g["Core/Series/SeriesDefaults.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A, t, q) {
        var c = d.animObject, l = d.setAnimation, a = g.defaultOptions, k = B.registerEventOptions, v = E.hasTouch, m = E.svg, N = E.win, F = A.seriesTypes, L = q.addEvent, J = q.arrayMax, y = q.arrayMin, z = q.clamp, w = q.cleanRecursively, e = q.correctFloat, r = q.defined, h = q.erase, n = q.error, f = q.extend, b = q.find, D = q.fireEvent, H = q.getNestedProperty, p = q.isArray, u = q.isNumber, K = q.isString, T = q.merge, M = q.objectEach, O = q.pick, C = q.removeEvent, Z = q.splat, ha = q.syncTimeout;
        d = function () {
            function d() {
                this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions =
                    this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0;
            }
            d.prototype.init = function (b, e) {
                D(this, "init", { options: e });
                var a = this, c = b.series;
                this.eventsToUnbind = [];
                a.chart = b;
                a.options = a.setOptions(e);
                e = a.options;
                a.linkedSeries = [];
                a.bindAxes();
                f(a, { name: e.name, state: "", visible: !1 !== e.visible, selected: !0 === e.selected });
                k(this, e);
                var d = e.events;
                if (d && d.click || e.point && e.point.events && e.point.events.click ||
                    e.allowPointSelect)
                    b.runTrackerClick = !0;
                a.getColor();
                a.getSymbol();
                a.parallelArrays.forEach(function (b) { a[b + "Data"] || (a[b + "Data"] = []); });
                a.isCartesian && (b.hasCartesianSeries = !0);
                var h;
                c.length && (h = c[c.length - 1]);
                a._i = O(h && h._i, -1) + 1;
                a.opacity = a.options.opacity;
                b.orderSeries(this.insert(c));
                e.dataSorting && e.dataSorting.enabled ? a.setDataSortingOptions() : a.points || a.data || a.setData(e.data, !1);
                D(this, "afterInit");
            };
            d.prototype.is = function (b) { return F[b] && this instanceof F[b]; };
            d.prototype.insert = function (b) {
                var f = this.options.index, e;
                if (u(f)) {
                    for (e = b.length; e--;)
                        if (f >= O(b[e].options.index, b[e]._i)) {
                            b.splice(e + 1, 0, this);
                            break;
                        }
                    -1 === e && b.unshift(this);
                    e += 1;
                }
                else
                    b.push(this);
                return O(e, b.length - 1);
            };
            d.prototype.bindAxes = function () {
                var b = this, f = b.options, e = b.chart, a;
                D(this, "bindAxes", null, function () {
                    (b.axisTypes || []).forEach(function (c) {
                        var d = 0;
                        e[c].forEach(function (e) {
                            a = e.options;
                            if (f[c] === d && !a.isInternal || "undefined" !== typeof f[c] && f[c] === a.id || "undefined" === typeof f[c] && 0 === a.index)
                                b.insert(e.series), b[c] = e,
                                    e.isDirty = !0;
                            a.isInternal || d++;
                        });
                        b[c] || b.optionalAxis === c || n(18, !0, e);
                    });
                });
                D(this, "afterBindAxes");
            };
            d.prototype.updateParallelArrays = function (b, f) { var e = b.series, a = arguments, c = u(f) ? function (a) { var c = "y" === a && e.toYData ? e.toYData(b) : b[a]; e[a + "Data"][f] = c; } : function (b) { Array.prototype[f].apply(e[b + "Data"], Array.prototype.slice.call(a, 2)); }; e.parallelArrays.forEach(c); };
            d.prototype.hasData = function () {
                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible &&
                    this.yData && 0 < this.yData.length;
            };
            d.prototype.autoIncrement = function (b) { var f = this.options, e = f.pointIntervalUnit, a = f.relativeXValue, c = this.chart.time, d = this.xIncrement, h; d = O(d, f.pointStart, 0); this.pointInterval = h = O(this.pointInterval, f.pointInterval, 1); a && u(b) && (h *= b); e && (f = new c.Date(d), "day" === e ? c.set("Date", f, c.get("Date", f) + h) : "month" === e ? c.set("Month", f, c.get("Month", f) + h) : "year" === e && c.set("FullYear", f, c.get("FullYear", f) + h), h = f.getTime() - d); if (a && u(b))
                return d + h; this.xIncrement = d + h; return d; };
            d.prototype.setDataSortingOptions = function () { var b = this.options; f(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }); r(b.pointRange) || (b.pointRange = 1); };
            d.prototype.setOptions = function (b) {
                var f = this.chart, e = f.options, c = e.plotOptions, d = f.userOptions || {};
                b = T(b);
                f = f.styledMode;
                var h = { plotOptions: c, userOptions: b };
                D(this, "setOptions", h);
                var p = h.plotOptions[this.type], n = d.plotOptions || {};
                this.userOptions = h.userOptions;
                d = T(p, c.series, d.plotOptions && d.plotOptions[this.type], b);
                this.tooltipOptions =
                    T(a.tooltip, a.plotOptions.series && a.plotOptions.series.tooltip, a.plotOptions[this.type].tooltip, e.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, b.tooltip);
                this.stickyTracking = O(b.stickyTracking, n[this.type] && n[this.type].stickyTracking, n.series && n.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : d.stickyTracking);
                null === p.marker && delete d.marker;
                this.zoneAxis = d.zoneAxis;
                c = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones ||
                    (e = { value: d[this.zoneAxis + "Threshold"] || d.threshold || 0, className: "highcharts-negative" }, f || (e.color = d.negativeColor, e.fillColor = d.negativeFillColor), c.push(e));
                c.length && r(c[c.length - 1].value) && c.push(f ? {} : { color: this.color, fillColor: this.fillColor });
                D(this, "afterSetOptions", { options: d });
                return d;
            };
            d.prototype.getName = function () { return O(this.options.name, "Series " + (this.index + 1)); };
            d.prototype.getCyclic = function (b, f, e) {
                var a = this.chart, c = this.userOptions, d = b + "Index", h = b + "Counter", p = e ? e.length : O(a.options.chart[b +
                    "Count"], a[b + "Count"]);
                if (!f) {
                    var n = O(c[d], c["_" + d]);
                    r(n) || (a.series.length || (a[h] = 0), c["_" + d] = n = a[h] % p, a[h] += 1);
                    e && (f = e[n]);
                }
                "undefined" !== typeof n && (this[d] = n);
                this[b] = f;
            };
            d.prototype.getColor = function () { this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || a.plotOptions[this.type].color, this.chart.options.colors); };
            d.prototype.getPointsCollection = function () { return (this.hasGroupedData ? this.points : this.data) || []; };
            d.prototype.getSymbol =
                function () { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols); };
            d.prototype.findPointIndex = function (f, e) {
                var a = f.id, c = f.x, d = this.points, h = this.options.dataSorting, p, n;
                if (a)
                    h = this.chart.get(a), h instanceof G && (p = h);
                else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
                    if (p = function (b) { return !b.touched && b.index === f.index; }, h && h.matchByName ? p = function (b) { return !b.touched && b.name === f.name; } : this.options.relativeXValue && (p = function (b) {
                        return !b.touched &&
                            b.options.x === f.x;
                    }), p = b(d, p), !p)
                        return;
                if (p) {
                    var k = p && p.index;
                    "undefined" !== typeof k && (n = !0);
                }
                "undefined" === typeof k && u(c) && (k = this.xData.indexOf(c, e));
                -1 !== k && "undefined" !== typeof k && this.cropped && (k = k >= this.cropStart ? k - this.cropStart : k);
                !n && u(k) && d[k] && d[k].touched && (k = void 0);
                return k;
            };
            d.prototype.updateData = function (b, f) {
                var e = this.options, a = e.dataSorting, c = this.points, d = [], h = this.requireSorting, p = b.length === c.length, n, k, m, l = !0;
                this.xIncrement = null;
                b.forEach(function (b, f) {
                    var k = r(b) && this.pointClass.prototype.optionsToObject.call({ series: this }, b) || {}, l = k.x;
                    if (k.id || u(l)) {
                        if (k = this.findPointIndex(k, m), -1 === k || "undefined" === typeof k ? d.push(b) : c[k] && b !== e.data[k] ? (c[k].update(b, !1, null, !1), c[k].touched = !0, h && (m = k + 1)) : c[k] && (c[k].touched = !0), !p || f !== k || a && a.enabled || this.hasDerivedData)
                            n = !0;
                    }
                    else
                        d.push(b);
                }, this);
                if (n)
                    for (b = c.length; b--;)
                        (k = c[b]) && !k.touched && k.remove && k.remove(!1, f);
                else
                    !p || a && a.enabled ? l = !1 : (b.forEach(function (b, f) { b !== c[f].y && c[f].update && c[f].update(b, !1, null, !1); }), d.length = 0);
                c.forEach(function (b) { b && (b.touched = !1); });
                if (!l)
                    return !1;
                d.forEach(function (b) { this.addPoint(b, !1, null, null, !1); }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = J(this.xData), this.autoIncrement());
                return !0;
            };
            d.prototype.setData = function (b, f, e, a) {
                var c = this, d = c.points, h = d && d.length || 0, k = c.options, m = c.chart, r = k.dataSorting, l = c.xAxis, g = k.turboThreshold, q = this.xData, w = this.yData, D = c.pointArrayMap;
                D = D && D.length;
                var H = k.keys, y, t = 0, z = 1, v = null;
                if (!m.options.chart.allowMutatingData) {
                    k.data && delete c.options.data;
                    c.userOptions.data &&
                        delete c.userOptions.data;
                    var Q = T(!0, b);
                }
                b = Q || b || [];
                Q = b.length;
                f = O(f, !0);
                r && r.enabled && (b = this.sortData(b));
                m.options.chart.allowMutatingData && !1 !== a && Q && h && !c.cropped && !c.hasGroupedData && c.visible && !c.isSeriesBoosting && (y = this.updateData(b, e));
                if (!y) {
                    c.xIncrement = null;
                    c.colorCounter = 0;
                    this.parallelArrays.forEach(function (b) { c[b + "Data"].length = 0; });
                    if (g && Q > g)
                        if (v = c.getFirstValidPoint(b), u(v))
                            for (e = 0; e < Q; e++)
                                q[e] = this.autoIncrement(), w[e] = b[e];
                        else if (p(v))
                            if (D)
                                if (v.length === D)
                                    for (e = 0; e < Q; e++)
                                        q[e] = this.autoIncrement(),
                                            w[e] = b[e];
                                else
                                    for (e = 0; e < Q; e++)
                                        a = b[e], q[e] = a[0], w[e] = a.slice(1, D + 1);
                            else if (H && (t = H.indexOf("x"), z = H.indexOf("y"), t = 0 <= t ? t : 0, z = 0 <= z ? z : 1), 1 === v.length && (z = 0), t === z)
                                for (e = 0; e < Q; e++)
                                    q[e] = this.autoIncrement(), w[e] = b[e][z];
                            else
                                for (e = 0; e < Q; e++)
                                    a = b[e], q[e] = a[t], w[e] = a[z];
                        else
                            n(12, !1, m);
                    else
                        for (e = 0; e < Q; e++)
                            "undefined" !== typeof b[e] && (a = { series: c }, c.pointClass.prototype.applyOptions.apply(a, [b[e]]), c.updateParallelArrays(a, e));
                    w && K(w[0]) && n(14, !0, m);
                    c.data = [];
                    c.options.data = c.userOptions.data = b;
                    for (e = h; e--;)
                        d[e] &&
                            d[e].destroy && d[e].destroy();
                    l && (l.minRange = l.userMinRange);
                    c.isDirty = m.isDirtyBox = !0;
                    c.isDirtyData = !!d;
                    e = !1;
                }
                "point" === k.legendType && (this.processData(), this.generatePoints());
                f && m.redraw(e);
            };
            d.prototype.sortData = function (b) {
                var f = this, e = f.options.dataSorting.sortKey || "y", a = function (b, f) { return r(f) && b.pointClass.prototype.optionsToObject.call({ series: b }, f) || {}; };
                b.forEach(function (e, c) { b[c] = a(f, e); b[c].index = c; }, this);
                b.concat().sort(function (b, f) { b = H(e, b); f = H(e, f); return f < b ? -1 : f > b ? 1 : 0; }).forEach(function (b, f) { b.x = f; }, this);
                f.linkedSeries && f.linkedSeries.forEach(function (f) { var e = f.options, c = e.data; e.dataSorting && e.dataSorting.enabled || !c || (c.forEach(function (e, d) { c[d] = a(f, e); b[d] && (c[d].x = b[d].x, c[d].index = d); }), f.setData(c, !1)); });
                return b;
            };
            d.prototype.getProcessedData = function (b) {
                var f = this.xAxis, e = this.options, a = e.cropThreshold, c = b || this.getExtremesFromAll || e.getExtremesFromAll, d = this.isCartesian;
                b = f && f.val2lin;
                e = !(!f || !f.logarithmic);
                var h = 0, p = this.xData, k = this.yData, u = this.requireSorting;
                var m = !1;
                var r = p.length;
                if (f) {
                    m = f.getExtremes();
                    var l = m.min;
                    var g = m.max;
                    m = !(!f.categories || f.names.length);
                }
                if (d && this.sorted && !c && (!a || r > a || this.forceCrop))
                    if (p[r - 1] < l || p[0] > g)
                        p = [], k = [];
                    else if (this.yData && (p[0] < l || p[r - 1] > g)) {
                        var q = this.cropData(this.xData, this.yData, l, g);
                        p = q.xData;
                        k = q.yData;
                        h = q.start;
                        q = !0;
                    }
                for (a = p.length || 1; --a;)
                    if (f = e ? b(p[a]) - b(p[a - 1]) : p[a] - p[a - 1], 0 < f && ("undefined" === typeof w || f < w))
                        var w = f;
                    else
                        0 > f && u && !m && (n(15, !1, this.chart), u = !1);
                return { xData: p, yData: k, cropped: q, cropStart: h, closestPointRange: w };
            };
            d.prototype.processData = function (b) { var f = this.xAxis; if (this.isCartesian && !this.isDirty && !f.isDirty && !this.yAxis.isDirty && !b)
                return !1; b = this.getProcessedData(); this.cropped = b.cropped; this.cropStart = b.cropStart; this.processedXData = b.xData; this.processedYData = b.yData; this.closestPointRange = this.basePointRange = b.closestPointRange; D(this, "afterProcessData"); };
            d.prototype.cropData = function (b, f, e, a, c) {
                var d = b.length, h, p = 0, n = d;
                c = O(c, this.cropShoulder);
                for (h = 0; h < d; h++)
                    if (b[h] >= e) {
                        p = Math.max(0, h - c);
                        break;
                    }
                for (e =
                    h; e < d; e++)
                    if (b[e] > a) {
                        n = e + c;
                        break;
                    }
                return { xData: b.slice(p, n), yData: f.slice(p, n), start: p, end: n };
            };
            d.prototype.generatePoints = function () {
                var b = this.options, e = this.processedData || b.data, a = this.processedXData, c = this.processedYData, d = this.pointClass, h = a.length, p = this.cropStart || 0, n = this.hasGroupedData, k = b.keys, u = [];
                b = b.dataGrouping && b.dataGrouping.groupAll ? p : 0;
                var m, r, l = this.data;
                if (!l && !n) {
                    var g = [];
                    g.length = e.length;
                    l = this.data = g;
                }
                k && n && (this.options.keys = !1);
                for (r = 0; r < h; r++) {
                    g = p + r;
                    if (n) {
                        var q = (new d).init(this, [a[r]].concat(Z(c[r])));
                        q.dataGroup = this.groupMap[b + r];
                        q.dataGroup.options && (q.options = q.dataGroup.options, f(q, q.dataGroup.options), delete q.dataLabels);
                    }
                    else
                        (q = l[g]) || "undefined" === typeof e[g] || (l[g] = q = (new d).init(this, e[g], a[r]));
                    q && (q.index = n ? b + r : g, u[r] = q);
                }
                this.options.keys = k;
                if (l && (h !== (m = l.length) || n))
                    for (r = 0; r < m; r++)
                        r !== p || n || (r += h), l[r] && (l[r].destroyElements(), l[r].plotX = void 0);
                this.data = l;
                this.points = u;
                D(this, "afterGeneratePoints");
            };
            d.prototype.getXExtremes = function (b) { return { min: y(b), max: J(b) }; };
            d.prototype.getExtremes = function (b, f) {
                var e = this.xAxis, a = this.yAxis, c = this.processedXData || this.xData, d = [], h = this.requireSorting ? this.cropShoulder : 0;
                a = a ? a.positiveValuesOnly : !1;
                var n, k = 0, r = 0, m = 0;
                b = b || this.stackedYData || this.processedYData || [];
                var l = b.length;
                if (e) {
                    var g = e.getExtremes();
                    k = g.min;
                    r = g.max;
                }
                for (n = 0; n < l; n++) {
                    var q = c[n];
                    g = b[n];
                    var w = (u(g) || p(g)) && (g.length || 0 < g || !a);
                    q = f || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !e || (c[n + h] || q) >= k && (c[n - h] || q) <= r;
                    if (w && q)
                        if (w =
                            g.length)
                            for (; w--;)
                                u(g[w]) && (d[m++] = g[w]);
                        else
                            d[m++] = g;
                }
                b = { activeYData: d, dataMin: y(d), dataMax: J(d) };
                D(this, "afterGetExtremes", { dataExtremes: b });
                return b;
            };
            d.prototype.applyExtremes = function () { var b = this.getExtremes(); this.dataMin = b.dataMin; this.dataMax = b.dataMax; return b; };
            d.prototype.getFirstValidPoint = function (b) { for (var f = b.length, e = 0, a = null; null === a && e < f;)
                a = b[e], e++; return a; };
            d.prototype.translate = function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var b = this.options, f = b.stacking, a = this.xAxis, c = a.categories, d = this.enabledDataSorting, h = this.yAxis, n = this.points, k = n.length, m = this.pointPlacementToXValue(), l = !!m, g = b.threshold, q = b.startFromThreshold ? g : 0, w = this.zoneAxis || "y", H, y, t = Number.MAX_VALUE;
                for (H = 0; H < k; H++) {
                    var v = n[H], K = v.x, F = void 0, L = void 0, J = v.y, N = v.low, M = f && h.stacking && h.stacking.stacks[(this.negStacks && J < (q ? 0 : g) ? "-" : "") + this.stackKey];
                    if (h.positiveValuesOnly && !h.validatePositiveValue(J) || a.positiveValuesOnly && !a.validatePositiveValue(K))
                        v.isNull = !0;
                    v.plotX = y = e(z(a.translate(K, 0, 0, 0, 1, m, "flags" === this.type), -1E5, 1E5));
                    if (f && this.visible && M && M[K]) {
                        var x = this.getStackIndicator(x, K, this.index);
                        v.isNull || (F = M[K], L = F.points[x.key]);
                    }
                    p(L) && (N = L[0], J = L[1], N === q && x.key === M[K].base && (N = O(u(g) && g, h.min)), h.positiveValuesOnly && 0 >= N && (N = null), v.total = v.stackTotal = F.total, v.percentage = F.total && v.y / F.total * 100, v.stackY = J, this.irregularWidths || F.setOffset(this.pointXOffset || 0, this.barW || 0));
                    v.yBottom = r(N) ? z(h.translate(N, 0, 1, 0, 1), -1E5, 1E5) : null;
                    this.dataModify && (J = this.dataModify.modifyValue(J, H));
                    v.plotY = void 0;
                    u(J) && (F = h.translate(J, !1, !0, !1, !0), "undefined" !== typeof F && (v.plotY = z(F, -1E5, 1E5)));
                    v.isInside = this.isPointInside(v);
                    v.clientX = l ? e(a.translate(K, 0, 0, 0, 1, m)) : y;
                    v.negative = v[w] < (b[w + "Threshold"] || g || 0);
                    v.category = O(c && c[v.x], v.x);
                    if (!v.isNull && !1 !== v.visible) {
                        "undefined" !== typeof A && (t = Math.min(t, Math.abs(y - A)));
                        var A = y;
                    }
                    v.zone = this.zones.length ? v.getZone() : void 0;
                    !v.graphic && this.group && d && (v.isNew = !0);
                }
                this.closestPointRangePx = t;
                D(this, "afterTranslate");
            };
            d.prototype.getValidPoints =
                function (b, f, e) { var a = this.chart; return (b || this.points || []).filter(function (b) { return f && !a.isInsidePlot(b.plotX, b.plotY, { inverted: a.inverted }) ? !1 : !1 !== b.visible && (e || !b.isNull); }); };
            d.prototype.getClipBox = function () { var b = this.chart, f = this.xAxis, e = this.yAxis, a = T(b.clipBox); f && f.len !== b.plotSizeX && (a.width = f.len); e && e.len !== b.plotSizeY && (a.height = e.len); return a; };
            d.prototype.getSharedClipKey = function () { return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0); };
            d.prototype.setClip =
                function () { var b = this.chart, f = this.group, e = this.markerGroup, a = b.sharedClips; b = b.renderer; var c = this.getClipBox(), d = this.getSharedClipKey(), h = a[d]; h ? h.animate(c) : a[d] = h = b.clipRect(c); f && f.clip(!1 === this.options.clip ? void 0 : h); e && e.clip(); };
            d.prototype.animate = function (b) {
                var f = this.chart, e = this.group, a = this.markerGroup, d = f.inverted, h = c(this.options.animation), p = [this.getSharedClipKey(), h.duration, h.easing, h.defer].join(), n = f.sharedClips[p], k = f.sharedClips[p + "m"];
                if (b && e)
                    h = this.getClipBox(), n ? n.attr("height", h.height) : (h.width = 0, d && (h.x = f.plotHeight), n = f.renderer.clipRect(h), f.sharedClips[p] = n, k = f.renderer.clipRect({ x: d ? (f.plotSizeX || 0) + 99 : -99, y: d ? -f.plotLeft : -f.plotTop, width: 99, height: d ? f.chartWidth : f.chartHeight }), f.sharedClips[p + "m"] = k), e.clip(n), a && a.clip(k);
                else if (n && !n.hasClass("highcharts-animating")) {
                    f = this.getClipBox();
                    var u = h.step;
                    a && a.element.childNodes.length && (h.step = function (b, f) { u && u.apply(f, arguments); k && k.element && k.attr(f.prop, "width" === f.prop ? b + 99 : b); });
                    n.addClass("highcharts-animating").animate(f, h);
                }
            };
            d.prototype.afterAnimate = function () { var b = this; this.setClip(); M(this.chart.sharedClips, function (f, e, a) { f && !b.chart.container.querySelector('[clip-path="url(#'.concat(f.id, ')"]')) && (f.destroy(), delete a[e]); }); this.finishedAnimating = !0; D(this, "afterAnimate"); };
            d.prototype.drawPoints = function () {
                var b = this.points, f = this.chart, e = this.options.marker, a = this[this.specialGroup] || this.markerGroup, c = this.xAxis, d = O(e.enabled, !c || c.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius), h, p;
                if (!1 !== e.enabled || this._hasPointMarkers)
                    for (h = 0; h < b.length; h++) {
                        var n = b[h];
                        var k = (p = n.graphic) ? "animate" : "attr";
                        var u = n.marker || {};
                        var r = !!n.marker;
                        if ((d && "undefined" === typeof u.enabled || u.enabled) && !n.isNull && !1 !== n.visible) {
                            var m = O(u.symbol, this.symbol, "rect");
                            var l = this.markerAttribs(n, n.selected && "select");
                            this.enabledDataSorting && (n.startXPos = c.reversed ? -(l.width || 0) : c.width);
                            var g = !1 !== n.isInside;
                            p ? p[g ? "show" : "hide"](g).animate(l) : g && (0 < (l.width || 0) || n.hasImage) && (n.graphic = p = f.renderer.symbol(m, l.x, l.y, l.width, l.height, r ? u : e).add(a), this.enabledDataSorting && f.hasRendered && (p.attr({ x: n.startXPos }), k = "animate"));
                            p && "animate" === k && p[g ? "show" : "hide"](g).animate(l);
                            if (p && !f.styledMode)
                                p[k](this.pointAttribs(n, n.selected && "select"));
                            p && p.addClass(n.getClassName(), !0);
                        }
                        else
                            p && (n.graphic = p.destroy());
                    }
            };
            d.prototype.markerAttribs = function (b, f) {
                var e = this.options, a = e.marker, c = b.marker || {}, d = c.symbol || a.symbol, h = O(c.radius, a && a.radius);
                f && (a = a.states[f], f = c.states && c.states[f], h = O(f && f.radius, a && a.radius, h && h + (a && a.radiusPlus || 0)));
                b.hasImage = d && 0 === d.indexOf("url");
                b.hasImage && (h = 0);
                b = u(h) ? { x: e.crisp ? Math.floor(b.plotX - h) : b.plotX - h, y: b.plotY - h } : {};
                h && (b.width = b.height = 2 * h);
                return b;
            };
            d.prototype.pointAttribs = function (b, f) {
                var e = this.options.marker, a = b && b.options, c = a && a.marker || {}, d = a && a.color, h = b && b.color, p = b && b.zone && b.zone.color, n = this.color;
                b = O(c.lineWidth, e.lineWidth);
                a = 1;
                n = d || p || h || n;
                d = c.fillColor || e.fillColor || n;
                h = c.lineColor || e.lineColor || n;
                f = f || "normal";
                e = e.states[f] || {};
                f = c.states && c.states[f] ||
                    {};
                b = O(f.lineWidth, e.lineWidth, b + O(f.lineWidthPlus, e.lineWidthPlus, 0));
                d = f.fillColor || e.fillColor || d;
                h = f.lineColor || e.lineColor || h;
                a = O(f.opacity, e.opacity, a);
                return { stroke: h, "stroke-width": b, fill: d, opacity: a };
            };
            d.prototype.destroy = function (b) {
                var f = this, e = f.chart, a = /AppleWebKit\/533/.test(N.navigator.userAgent), c = f.data || [], d, p, n, k;
                D(f, "destroy", { keepEventsForUpdate: b });
                this.removeEvents(b);
                (f.axisTypes || []).forEach(function (b) { (k = f[b]) && k.series && (h(k.series, f), k.isDirty = k.forceRedraw = !0); });
                f.legendItem &&
                    f.chart.legend.destroyItem(f);
                for (p = c.length; p--;)
                    (n = c[p]) && n.destroy && n.destroy();
                f.clips && f.clips.forEach(function (b) { return b.destroy(); });
                q.clearTimeout(f.animationTimeout);
                M(f, function (b, f) { b instanceof t && !b.survive && (d = a && "group" === f ? "hide" : "destroy", b[d]()); });
                e.hoverSeries === f && (e.hoverSeries = void 0);
                h(e.series, f);
                e.orderSeries();
                M(f, function (e, a) { b && "hcEvents" === a || delete f[a]; });
            };
            d.prototype.applyZones = function () {
                var b = this, f = this.chart, e = f.renderer, a = this.zones, c = this.clips || [], d = this.graph, h = this.area, p = Math.max(f.chartWidth, f.chartHeight), n = this[(this.zoneAxis || "y") + "Axis"], k = f.inverted, u, r, m, l, g, q, w, D, H = !1;
                if (a.length && (d || h) && n && "undefined" !== typeof n.min) {
                    var y = n.reversed;
                    var t = n.horiz;
                    d && !this.showLine && d.hide();
                    h && h.hide();
                    var v = n.getExtremes();
                    a.forEach(function (a, K) {
                        u = y ? t ? f.plotWidth : 0 : t ? 0 : n.toPixels(v.min) || 0;
                        u = z(O(r, u), 0, p);
                        r = z(Math.round(n.toPixels(O(a.value, v.max), !0) || 0), 0, p);
                        H && (u = r = n.toPixels(v.max));
                        l = Math.abs(u - r);
                        g = Math.min(u, r);
                        q = Math.max(u, r);
                        n.isXAxis ? (m = { x: k ? q :
                                g, y: 0, width: l, height: p }, t || (m.x = f.plotHeight - m.x)) : (m = { x: 0, y: k ? q : g, width: p, height: l }, t && (m.y = f.plotWidth - m.y));
                        k && e.isVML && (m = n.isXAxis ? { x: 0, y: y ? g : q, height: m.width, width: f.chartWidth } : { x: m.y - f.plotLeft - f.spacingBox.x, y: 0, width: m.height, height: f.chartHeight });
                        c[K] ? c[K].animate(m) : c[K] = e.clipRect(m);
                        w = b["zone-area-" + K];
                        D = b["zone-graph-" + K];
                        d && D && D.clip(c[K]);
                        h && w && w.clip(c[K]);
                        H = a.value > v.max;
                        b.resetZones && 0 === r && (r = void 0);
                    });
                    this.clips = c;
                }
                else
                    b.visible && (d && d.show(), h && h.show());
            };
            d.prototype.invertGroups =
                function (b) { function f() { ["group", "markerGroup"].forEach(function (f) { e[f] && (a.renderer.isVML && e[f].attr({ width: e.yAxis.len, height: e.xAxis.len }), e[f].width = e.yAxis.len, e[f].height = e.xAxis.len, e[f].invert(e.isRadialSeries ? !1 : b)); }); } var e = this, a = e.chart; e.xAxis && (e.eventsToUnbind.push(L(a, "resize", f)), f(), e.invertGroups = f); };
            d.prototype.plotGroup = function (b, f, e, a, c) {
                var d = this[b], h = !d;
                e = { visibility: e, zIndex: a || .1 };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (e.opacity =
                    this.opacity);
                h && (this[b] = d = this.chart.renderer.g().add(c));
                d.addClass("highcharts-" + f + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (r(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                d.attr(e)[h ? "attr" : "animate"](this.getPlotBox());
                return d;
            };
            d.prototype.getPlotBox = function () {
                var b = this.chart, f = this.xAxis, e = this.yAxis;
                b.inverted && (f = e, e = this.xAxis);
                return { translateX: f ? f.left :
                        b.plotLeft, translateY: e ? e.top : b.plotTop, scaleX: 1, scaleY: 1 };
            };
            d.prototype.removeEvents = function (b) { b || C(this); this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (b) { b(); }), this.eventsToUnbind.length = 0); };
            d.prototype.render = function () {
                var b = this, f = b.chart, e = b.options, a = c(e.animation), d = b.visible ? "inherit" : "hidden", h = e.zIndex, p = b.hasRendered, n = f.seriesGroup, k = f.inverted;
                f = !b.finishedAnimating && f.renderer.isSVG ? a.duration : 0;
                D(this, "render");
                var u = b.plotGroup("group", "series", d, h, n);
                b.markerGroup =
                    b.plotGroup("markerGroup", "markers", d, h, n);
                !1 !== e.clip && b.setClip();
                b.animate && f && b.animate(!0);
                u.inverted = O(b.invertible, b.isCartesian) ? k : !1;
                b.drawGraph && (b.drawGraph(), b.applyZones());
                b.visible && b.drawPoints();
                b.drawDataLabels && b.drawDataLabels();
                b.redrawPoints && b.redrawPoints();
                b.drawTracker && !1 !== b.options.enableMouseTracking && b.drawTracker();
                b.invertGroups(k);
                b.animate && f && b.animate();
                p || (f && a.defer && (f += a.defer), b.animationTimeout = ha(function () { b.afterAnimate(); }, f || 0));
                b.isDirty = !1;
                b.hasRendered =
                    !0;
                D(b, "afterRender");
            };
            d.prototype.redraw = function () { var b = this.chart, f = this.isDirty || this.isDirtyData, e = this.group, a = this.xAxis, c = this.yAxis; e && (b.inverted && e.attr({ width: b.plotWidth, height: b.plotHeight }), e.animate({ translateX: O(a && a.left, b.plotLeft), translateY: O(c && c.top, b.plotTop) })); this.translate(); this.render(); f && delete this.kdTree; };
            d.prototype.searchPoint = function (b, f) {
                var e = this.xAxis, a = this.yAxis, c = this.chart.inverted;
                return this.searchKDTree({ clientX: c ? e.len - b.chartY + e.pos : b.chartX - e.pos,
                    plotY: c ? a.len - b.chartX + a.pos : b.chartY - a.pos }, f, b);
            };
            d.prototype.buildKDTree = function (b) {
                function f(b, a, c) { var d = b && b.length; if (d) {
                    var h = e.kdAxisArray[a % c];
                    b.sort(function (b, f) { return b[h] - f[h]; });
                    d = Math.floor(d / 2);
                    return { point: b[d], left: f(b.slice(0, d), a + 1, c), right: f(b.slice(d + 1), a + 1, c) };
                } }
                this.buildingKdTree = !0;
                var e = this, a = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete e.kdTree;
                ha(function () { e.kdTree = f(e.getValidPoints(null, !e.directTouch), a, a); e.buildingKdTree = !1; }, e.options.kdNow || b && "touchstart" ===
                    b.type ? 0 : 1);
            };
            d.prototype.searchKDTree = function (b, f, e) {
                function a(b, f, e, n) { var k = f.point, u = c.kdAxisArray[e % n], m = k, l = r(b[d]) && r(k[d]) ? Math.pow(b[d] - k[d], 2) : null; var g = r(b[h]) && r(k[h]) ? Math.pow(b[h] - k[h], 2) : null; g = (l || 0) + (g || 0); k.dist = r(g) ? Math.sqrt(g) : Number.MAX_VALUE; k.distX = r(l) ? Math.sqrt(l) : Number.MAX_VALUE; u = b[u] - k[u]; g = 0 > u ? "left" : "right"; l = 0 > u ? "right" : "left"; f[g] && (g = a(b, f[g], e + 1, n), m = g[p] < m[p] ? g : k); f[l] && Math.sqrt(u * u) < m[p] && (b = a(b, f[l], e + 1, n), m = b[p] < m[p] ? b : m); return m; }
                var c = this, d = this.kdAxisArray[0], h = this.kdAxisArray[1], p = f ? "distX" : "dist";
                f = -1 < c.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(e);
                if (this.kdTree)
                    return a(b, this.kdTree, f, f);
            };
            d.prototype.pointPlacementToXValue = function () { var b = this.options, f = b.pointRange, e = this.xAxis; b = b.pointPlacement; "between" === b && (b = e.reversed ? -.5 : .5); return u(b) ? b * (f || e.pointRange) : 0; };
            d.prototype.isPointInside = function (b) {
                var f = this.chart, e = this.xAxis, a = this.yAxis;
                return "undefined" !== typeof b.plotY && "undefined" !==
                    typeof b.plotX && 0 <= b.plotY && b.plotY <= (a ? a.len : f.plotHeight) && 0 <= b.plotX && b.plotX <= (e ? e.len : f.plotWidth);
            };
            d.prototype.drawTracker = function () {
                var b = this, f = b.options, e = f.trackByArea, a = [].concat(e ? b.areaPath : b.graphPath), c = b.chart, d = c.pointer, h = c.renderer, p = c.options.tooltip.snap, n = b.tracker, k = function (f) { if (c.hoverSeries !== b)
                    b.onMouseOver(); }, u = "rgba(192,192,192," + (m ? .0001 : .002) + ")";
                n ? n.attr({ d: a }) : b.graph && (b.tracker = h.path(a).attr({ visibility: b.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(e ? "highcharts-tracker-area" :
                    "highcharts-tracker-line").add(b.group), c.styledMode || b.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: u, fill: e ? u : "none", "stroke-width": b.graph.strokeWidth() + (e ? 0 : 2 * p) }), [b.tracker, b.markerGroup, b.dataLabelsGroup].forEach(function (b) { if (b && (b.addClass("highcharts-tracker").on("mouseover", k).on("mouseout", function (b) { d.onTrackerMouseOut(b); }), f.cursor && !c.styledMode && b.css({ cursor: f.cursor }), v))
                    b.on("touchstart", k); }));
                D(this, "afterDrawTracker");
            };
            d.prototype.addPoint = function (b, f, e, a, c) {
                var d = this.options, h = this.data, p = this.chart, n = this.xAxis;
                n = n && n.hasNames && n.names;
                var k = d.data, u = this.xData, m;
                f = O(f, !0);
                var r = { series: this };
                this.pointClass.prototype.applyOptions.apply(r, [b]);
                var l = r.x;
                var g = u.length;
                if (this.requireSorting && l < u[g - 1])
                    for (m = !0; g && u[g - 1] > l;)
                        g--;
                this.updateParallelArrays(r, "splice", g, 0, 0);
                this.updateParallelArrays(r, g);
                n && r.name && (n[l] = r.name);
                k.splice(g, 0, b);
                if (m || this.processedData)
                    this.data.splice(g, 0, null), this.processData();
                "point" === d.legendType && this.generatePoints();
                e && (h[0] && h[0].remove ? h[0].remove(!1) : (h.shift(), this.updateParallelArrays(r, "shift"), k.shift()));
                !1 !== c && D(this, "addPoint", { point: r });
                this.isDirtyData = this.isDirty = !0;
                f && p.redraw(a);
            };
            d.prototype.removePoint = function (b, f, e) {
                var a = this, c = a.data, d = c[b], h = a.points, p = a.chart, n = function () { h && h.length === c.length && h.splice(b, 1); c.splice(b, 1); a.options.data.splice(b, 1); a.updateParallelArrays(d || { series: a }, "splice", b, 1); d && d.destroy(); a.isDirty = !0; a.isDirtyData = !0; f && p.redraw(); };
                l(e, p);
                f = O(f, !0);
                d ? d.firePointEvent("remove", null, n) : n();
            };
            d.prototype.remove = function (b, f, e, a) { function c() { d.destroy(a); h.isDirtyLegend = h.isDirtyBox = !0; h.linkSeries(); O(b, !0) && h.redraw(f); } var d = this, h = d.chart; !1 !== e ? D(d, "remove", null, c) : c(); };
            d.prototype.update = function (b, e) {
                b = w(b, this.userOptions);
                D(this, "update", { options: b });
                var a = this, c = a.chart, d = a.userOptions, h = a.initialType || a.type, p = c.options.plotOptions, k = F[h].prototype, u = a.finishedAnimating && { animation: !1 }, m = {}, r, l = ["eventOptions", "navigatorSeries", "baseSeries"], g = b.type || d.type || c.options.chart.type, q = !(this.hasDerivedData || g && g !== this.type || "undefined" !== typeof b.pointStart || "undefined" !== typeof b.pointInterval || "undefined" !== typeof b.relativeXValue || b.joinBy || b.mapData || a.hasOptionChanged("dataGrouping") || a.hasOptionChanged("pointStart") || a.hasOptionChanged("pointInterval") || a.hasOptionChanged("pointIntervalUnit") || a.hasOptionChanged("keys"));
                g = g || h;
                q && (l.push("data", "isDirtyData", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== b.visible && l.push("area", "graph"), a.parallelArrays.forEach(function (b) { l.push(b + "Data"); }), b.data && (b.dataSorting && f(a.options.dataSorting, b.dataSorting), this.setData(b.data, !1)));
                b = T(d, u, { index: "undefined" === typeof d.index ? a.index : d.index, pointStart: O(p && p.series && p.series.pointStart, d.pointStart, a.xData[0]) }, !q && { data: a.options.data }, b);
                q && b.data && (b.data = a.options.data);
                l = ["group", "markerGroup", "dataLabelsGroup",
                    "transformGroup"].concat(l);
                l.forEach(function (b) { l[b] = a[b]; delete a[b]; });
                p = !1;
                if (F[g]) {
                    if (p = g !== a.type, a.remove(!1, !1, !1, !0), p)
                        if (Object.setPrototypeOf)
                            Object.setPrototypeOf(a, F[g].prototype);
                        else {
                            u = Object.hasOwnProperty.call(a, "hcEvents") && a.hcEvents;
                            for (r in k)
                                a[r] = void 0;
                            f(a, F[g].prototype);
                            u ? a.hcEvents = u : delete a.hcEvents;
                        }
                }
                else
                    n(17, !0, c, { missingModuleFor: g });
                l.forEach(function (b) { a[b] = l[b]; });
                a.init(c, b);
                if (q && this.points) {
                    var H = a.options;
                    !1 === H.visible ? (m.graphic = 1, m.dataLabel = 1) : a._hasPointLabels ||
                        (b = H.marker, k = H.dataLabels, !b || !1 !== b.enabled && (d.marker && d.marker.symbol) === b.symbol || (m.graphic = 1), k && !1 === k.enabled && (m.dataLabel = 1));
                    this.points.forEach(function (b) { b && b.series && (b.resolveColor(), Object.keys(m).length && b.destroyElements(m), !1 === H.showInLegend && b.legendItem && c.legend.destroyItem(b)); }, this);
                }
                a.initialType = h;
                c.linkSeries();
                p && a.linkedSeries.length && (a.isDirtyData = !0);
                D(this, "afterUpdate");
                O(e, !0) && c.redraw(q ? void 0 : !1);
            };
            d.prototype.setName = function (b) {
                this.name = this.options.name =
                    this.userOptions.name = b;
                this.chart.isDirtyLegend = !0;
            };
            d.prototype.hasOptionChanged = function (b) { var f = this.options[b], e = this.chart.options.plotOptions, a = this.userOptions[b]; return a ? f !== a : f !== O(e && e[this.type] && e[this.type][b], e && e.series && e.series[b], f); };
            d.prototype.onMouseOver = function () { var b = this.chart, f = b.hoverSeries; b.pointer.setHoverChartIndex(); if (f && f !== this)
                f.onMouseOut(); this.options.events.mouseOver && D(this, "mouseOver"); this.setState("hover"); b.hoverSeries = this; };
            d.prototype.onMouseOut = function () {
                var b = this.options, f = this.chart, e = f.tooltip, a = f.hoverPoint;
                f.hoverSeries = null;
                if (a)
                    a.onMouseOut();
                this && b.events.mouseOut && D(this, "mouseOut");
                !e || this.stickyTracking || e.shared && !this.noSharedTooltip || e.hide();
                f.series.forEach(function (b) { b.setState("", !0); });
            };
            d.prototype.setState = function (b, f) {
                var e = this, a = e.options, c = e.graph, d = a.inactiveOtherPoints, h = a.states, p = O(h[b || "normal"] && h[b || "normal"].animation, e.chart.options.chart.animation), n = a.lineWidth, k = 0, u = a.opacity;
                b = b || "";
                if (e.state !== b && ([e.group, e.markerGroup,
                    e.dataLabelsGroup].forEach(function (f) { f && (e.state && f.removeClass("highcharts-series-" + e.state), b && f.addClass("highcharts-series-" + b)); }), e.state = b, !e.chart.styledMode)) {
                    if (h[b] && !1 === h[b].enabled)
                        return;
                    b && (n = h[b].lineWidth || n + (h[b].lineWidthPlus || 0), u = O(h[b].opacity, u));
                    if (c && !c.dashstyle)
                        for (a = { "stroke-width": n }, c.animate(a, p); e["zone-graph-" + k];)
                            e["zone-graph-" + k].animate(a, p), k += 1;
                    d || [e.group, e.markerGroup, e.dataLabelsGroup, e.labelBySeries].forEach(function (b) { b && b.animate({ opacity: u }, p); });
                }
                f &&
                    d && e.points && e.setAllPointsToState(b || void 0);
            };
            d.prototype.setAllPointsToState = function (b) { this.points.forEach(function (f) { f.setState && f.setState(b); }); };
            d.prototype.setVisible = function (b, f) {
                var e = this, a = e.chart, c = e.legendItem, d = a.options.chart.ignoreHiddenSeries, h = e.visible, p = (e.visible = b = e.options.visible = e.userOptions.visible = "undefined" === typeof b ? !h : b) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (b) { if (e[b])
                    e[b][p](); });
                if (a.hoverSeries === e || (a.hoverPoint &&
                    a.hoverPoint.series) === e)
                    e.onMouseOut();
                c && a.legend.colorizeItem(e, b);
                e.isDirty = !0;
                e.options.stacking && a.series.forEach(function (b) { b.options.stacking && b.visible && (b.isDirty = !0); });
                e.linkedSeries.forEach(function (f) { f.setVisible(b, !1); });
                d && (a.isDirtyBox = !0);
                D(e, p);
                !1 !== f && a.redraw();
            };
            d.prototype.show = function () { this.setVisible(!0); };
            d.prototype.hide = function () { this.setVisible(!1); };
            d.prototype.select = function (b) {
                this.selected = b = this.options.selected = "undefined" === typeof b ? !this.selected : b;
                this.checkbox &&
                    (this.checkbox.checked = b);
                D(this, b ? "select" : "unselect");
            };
            d.prototype.shouldShowTooltip = function (b, f, e) { void 0 === e && (e = {}); e.series = this; e.visiblePlotOnly = !0; return this.chart.isInsidePlot(b, f, e); };
            d.defaultOptions = I;
            return d;
        }();
        f(d.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, cropShoulder: 1, directTouch: !1, drawLegendSymbol: x.drawLineMarker, isCartesian: !0, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: G, requireSorting: !0, sorted: !0 });
        A.series = d;
        "";
        "";
        return d;
    });
    P(g, "Extensions/ScrollablePlotArea.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/Series/Series.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G) {
        var C = d.stop, A = G.addEvent, t = G.createElement, q = G.defined, c = G.merge, l = G.pick;
        A(B, "afterSetChartSize", function (a) {
            var d = this.options.chart.scrollablePlotArea, l = d && d.minWidth;
            d = d && d.minHeight;
            if (!this.renderer.forExport) {
                if (l) {
                    if (this.scrollablePixelsX = l = Math.max(0, l - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = c(this.plotBox);
                        this.plotBox.width = this.plotWidth += l;
                        this.inverted ? this.clipBox.height += l : this.clipBox.width += l;
                        var m = { 1: { name: "right", value: l } };
                    }
                }
                else
                    d && (this.scrollablePixelsY = l = Math.max(0, d - this.chartHeight), q(l) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = c(this.plotBox), this.plotBox.height = this.plotHeight += l, this.inverted ? this.clipBox.width += l : this.clipBox.height += l, m = { 2: { name: "bottom", value: l } }));
                m && !a.skipAxes &&
                    this.axes.forEach(function (a) { m[a.side] ? a.getPlotLinePath = function () { var c = m[a.side].name, d = this[c]; this[c] = d - m[a.side].value; var k = g.prototype.getPlotLinePath.apply(this, arguments); this[c] = d; return k; } : (a.setAxisSize(), a.setAxisTranslation()); });
            }
        });
        A(B, "render", function () { this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed(); });
        B.prototype.setUpScrolling = function () {
            var a = this, c = { WebkitOverflowScrolling: "touch",
                overflowX: "hidden", overflowY: "hidden" };
            this.scrollablePixelsX && (c.overflowX = "auto");
            this.scrollablePixelsY && (c.overflowY = "auto");
            this.scrollingParent = t("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, this.renderTo);
            this.scrollingContainer = t("div", { className: "highcharts-scrolling" }, c, this.scrollingParent);
            A(this.scrollingContainer, "scroll", function () { a.pointer && delete a.pointer.chartPosition; });
            this.innerContainer = t("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null;
        };
        B.prototype.moveFixedElements = function () {
            var a = this.container, c = this.fixedRenderer, d = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), m;
            this.scrollablePixelsX &&
                !this.inverted ? m = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? m = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? m = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (m = ".highcharts-yaxis");
            m && d.push("" + m + ":not(.highcharts-radial-axis)", "" + m + "-labels:not(.highcharts-radial-axis-labels)");
            d.forEach(function (d) { [].forEach.call(a.querySelectorAll(d), function (a) { (a.namespaceURI === c.SVG_NS ? c.box : c.box.parentNode).appendChild(a); a.style.pointerEvents = "auto"; }); });
        };
        B.prototype.applyFixed =
            function () {
                var a = !this.fixedDiv, c = this.options.chart, d = c.scrollablePlotArea, m = x.getRendererType();
                a ? (this.fixedDiv = t("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (c.style && c.style.zIndex || 0) + 2, top: 0 }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = c = new m(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style),
                    this.scrollableMask = c.path().attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": l(d.opacity, .85), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), A(this, "afterShowResetZoom", this.moveFixedElements), A(this, "afterApplyDrilldown", this.moveFixedElements), A(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                if (this.scrollableDirty || a)
                    this.scrollableDirty = !1, this.moveFixedElements();
                c = this.chartWidth + (this.scrollablePixelsX ||
                    0);
                m = this.chartHeight + (this.scrollablePixelsY || 0);
                C(this.container);
                this.container.style.width = c + "px";
                this.container.style.height = m + "px";
                this.renderer.boxWrapper.attr({ width: c, height: m, viewBox: [0, 0, c, m].join(" ") });
                this.chartBackground.attr({ width: c, height: m });
                this.scrollingContainer.style.height = this.chartHeight + "px";
                a && (d.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * d.scrollPositionX), d.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * d.scrollPositionY));
                m = this.axisOffset;
                a = this.plotTop - m[0] - 1;
                d = this.plotLeft - m[3] - 1;
                c = this.plotTop + this.plotHeight + m[2] + 1;
                m = this.plotLeft + this.plotWidth + m[1] + 1;
                var g = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), q = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                a = this.scrollablePixelsX ? [["M", 0, a], ["L", this.plotLeft - 1, a], ["L", this.plotLeft - 1, c], ["L", 0, c], ["Z"], ["M", g, a], ["L", this.chartWidth, a], ["L", this.chartWidth, c], ["L", g, c], ["Z"]] : this.scrollablePixelsY ? [["M", d, 0], ["L", d, this.plotTop - 1], ["L", m, this.plotTop -
                            1], ["L", m, 0], ["Z"], ["M", d, q], ["L", d, this.chartHeight], ["L", m, this.chartHeight], ["L", m, q], ["Z"]] : [["M", 0, 0]];
                "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: a });
            };
        A(g, "afterInit", function () { this.chart.scrollableDirty = !0; });
        A(E, "show", function () { this.chart.scrollableDirty = !0; });
        "";
    });
    P(g, "Core/Axis/StackingAxis.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = d.getDeferredAnimation, x = B.addEvent, G = B.destroyObjectProperties, I = B.fireEvent, A = B.isNumber, t = B.objectEach, q;
        (function (c) {
            function d() { var a = this.stacking; if (a) {
                var c = a.stacks;
                t(c, function (a, d) { G(a); c[d] = null; });
                a && a.stackTotalGroup && a.stackTotalGroup.destroy();
            } }
            function a() { this.stacking || (this.stacking = new g(this)); }
            var k = [];
            c.compose = function (c) { -1 === k.indexOf(c) && (k.push(c), x(c, "init", a), x(c, "destroy", d)); return c; };
            var g = function () {
                function a(a) { this.oldStacks = {}; this.stacks = {}; this.stacksTouched = 0; this.axis = a; }
                a.prototype.buildStacks = function () {
                    var a = this.axis, c = a.series, d = a.options.reversedStacks, k = c.length, m;
                    if (!a.isXAxis) {
                        this.usePercentage = !1;
                        for (m = k; m--;) {
                            var l = c[d ? m : k - m - 1];
                            l.setStackedPoints();
                            l.setGroupedPoints();
                        }
                        for (m = 0; m < k; m++)
                            c[m].modifyStacks();
                        I(a, "afterBuildStacks");
                    }
                };
                a.prototype.cleanStacks = function () { if (!this.axis.isXAxis) {
                    if (this.oldStacks)
                        var a = this.stacks = this.oldStacks;
                    t(a, function (a) { t(a, function (a) { a.cumulative = a.total; }); });
                } };
                a.prototype.resetStacks = function () {
                    var a = this, c = a.stacks;
                    a.axis.isXAxis || t(c, function (c) {
                        t(c, function (d, k) {
                            A(d.touched) &&
                                d.touched < a.stacksTouched ? (d.destroy(), delete c[k]) : (d.total = null, d.cumulative = null);
                        });
                    });
                };
                a.prototype.renderStackTotals = function () { var a = this.axis, c = a.chart, d = c.renderer, k = this.stacks; a = C(c, a.options.stackLabels && a.options.stackLabels.animation || !1); var m = this.stackTotalGroup = this.stackTotalGroup || d.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add(); m.translate(c.plotLeft, c.plotTop); t(k, function (a) { t(a, function (a) { a.render(m); }); }); m.animate({ opacity: 1 }, a); };
                return a;
            }();
            c.Additions = g;
        })(q || (q = {}));
        return q;
    });
    P(g, "Extensions/Stacking.js", [g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Series/Series.js"], g["Core/Axis/StackingAxis.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I) {
        var A = B.format, t = I.correctFloat, q = I.defined, c = I.destroyObjectProperties, l = I.isArray, a = I.isNumber, k = I.objectEach, v = I.pick, m = function () {
            function d(a, c, d, k, m) {
                var l = a.chart.inverted;
                this.axis = a;
                this.isNegative = d;
                this.options = c = c || {};
                this.x = k;
                this.total = null;
                this.points =
                    {};
                this.hasValidPoints = !1;
                this.stack = m;
                this.rightCliff = this.leftCliff = 0;
                this.alignOptions = { align: c.align || (l ? d ? "left" : "right" : "center"), verticalAlign: c.verticalAlign || (l ? "middle" : d ? "bottom" : "top"), y: c.y, x: c.x };
                this.textAlign = c.textAlign || (l ? d ? "right" : "left" : "center");
            }
            d.prototype.destroy = function () { c(this, this.axis); };
            d.prototype.render = function (a) {
                var c = this.axis.chart, d = this.options, k = d.format;
                k = k ? A(k, this, c) : d.formatter.call(this);
                this.label ? this.label.attr({ text: k, visibility: "hidden" }) : (this.label =
                    c.renderer.label(k, null, null, d.shape, null, null, d.useHTML, !1, "stack-labels"), k = { r: d.borderRadius || 0, text: k, rotation: d.rotation, padding: v(d.padding, 5), visibility: "hidden" }, c.styledMode || (k.fill = d.backgroundColor, k.stroke = d.borderColor, k["stroke-width"] = d.borderWidth, this.label.css(d.style)), this.label.attr(k), this.label.added || this.label.add(a));
                this.label.labelrank = c.plotSizeY;
            };
            d.prototype.setOffset = function (c, d, k, m, l) {
                var g = this.axis, e = g.chart;
                m = g.translate(g.stacking.usePercentage ? 100 : m ? m : this.total, 0, 0, 0, 1);
                k = g.translate(k ? k : 0);
                k = q(m) && Math.abs(m - k);
                c = v(l, e.xAxis[0].translate(this.x)) + c;
                g = q(m) && this.getStackBox(e, this, c, m, d, k, g);
                d = this.label;
                k = this.isNegative;
                c = "justify" === v(this.options.overflow, "justify");
                var r = this.textAlign;
                d && g && (l = d.getBBox(), m = d.padding, r = "left" === r ? e.inverted ? -m : m : "right" === r ? l.width : e.inverted && "center" === r ? l.width / 2 : e.inverted ? k ? l.width + m : -m : l.width / 2, k = e.inverted ? l.height / 2 : k ? -m : l.height, this.alignOptions.x = v(this.options.x, 0), this.alignOptions.y = v(this.options.y, 0), g.x -= r, g.y -= k, d.align(this.alignOptions, null, g), e.isInsidePlot(d.alignAttr.x + r - this.alignOptions.x, d.alignAttr.y + k - this.alignOptions.y) ? d.show() : (d.hide(), c = !1), c && x.prototype.justifyDataLabel.call(this.axis, d, this.alignOptions, d.alignAttr, l, g), d.attr({ x: d.alignAttr.x, y: d.alignAttr.y }), v(!c && this.options.crop, !0) && ((e = a(d.x) && a(d.y) && e.isInsidePlot(d.x - m + d.width, d.y) && e.isInsidePlot(d.x + m, d.y)) || d.hide()));
            };
            d.prototype.getStackBox = function (a, c, d, k, m, l, e) {
                var r = c.axis.reversed, h = a.inverted, n = e.height +
                    e.pos - (h ? a.plotLeft : a.plotTop);
                c = c.isNegative && !r || !c.isNegative && r;
                return { x: h ? c ? k - e.right : k - l + e.pos - a.plotLeft : d + a.xAxis[0].transB - a.plotLeft, y: h ? e.height - d - m : c ? n - k - l : n - k, width: h ? l : m, height: h ? m : l };
            };
            return d;
        }();
        g.prototype.getStacks = function () {
            var a = this, c = a.inverted;
            a.yAxis.forEach(function (a) { a.stacking && a.stacking.stacks && a.hasVisibleSeries && (a.stacking.oldStacks = a.stacking.stacks); });
            a.series.forEach(function (d) {
                var k = d.xAxis && d.xAxis.options || {};
                !d.options.stacking || !0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries ||
                    (d.stackKey = [d.type, v(d.options.stack, ""), c ? k.top : k.left, c ? k.height : k.width].join());
            });
        };
        G.compose(d);
        x.prototype.setGroupedPoints = function () { var a = this.yAxis.stacking; this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? x.prototype.setStackedPoints.call(this, "group") : a && k(a.stacks, function (c, d) { "group" === d.slice(-5) && (k(c, function (a) { return a.destroy(); }), delete a.stacks[d]); }); };
        x.prototype.setStackedPoints = function (a) {
            var c = a || this.options.stacking;
            if (c && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var d = this.processedXData, k = this.processedYData, g = [], z = k.length, w = this.options, e = w.threshold, r = v(w.startFromThreshold && e, 0);
                w = w.stack;
                a = a ? "" + this.type + ",".concat(c) : this.stackKey;
                var h = "-" + a, n = this.negStacks, f = this.yAxis, b = f.stacking.stacks, D = f.stacking.oldStacks, H, p;
                f.stacking.stacksTouched += 1;
                for (p = 0; p < z; p++) {
                    var u = d[p];
                    var K = k[p];
                    var x = this.getStackIndicator(x, u, this.index);
                    var M = x.key;
                    var O = (H =
                        n && K < (r ? 0 : e)) ? h : a;
                    b[O] || (b[O] = {});
                    b[O][u] || (D[O] && D[O][u] ? (b[O][u] = D[O][u], b[O][u].total = null) : b[O][u] = new m(f, f.options.stackLabels, H, u, w));
                    O = b[O][u];
                    null !== K ? (O.points[M] = O.points[this.index] = [v(O.cumulative, r)], q(O.cumulative) || (O.base = M), O.touched = f.stacking.stacksTouched, 0 < x.index && !1 === this.singleStacks && (O.points[M][0] = O.points[this.index + "," + u + ",0"][0])) : O.points[M] = O.points[this.index] = null;
                    "percent" === c ? (H = H ? a : h, n && b[H] && b[H][u] ? (H = b[H][u], O.total = H.total = Math.max(H.total, O.total) + Math.abs(K) ||
                        0) : O.total = t(O.total + (Math.abs(K) || 0))) : "group" === c ? (l(K) && (K = K[0]), null !== K && (O.total = (O.total || 0) + 1)) : O.total = t(O.total + (K || 0));
                    O.cumulative = "group" === c ? (O.total || 1) - 1 : v(O.cumulative, r) + (K || 0);
                    null !== K && (O.points[M].push(O.cumulative), g[p] = O.cumulative, O.hasValidPoints = !0);
                }
                "percent" === c && (f.stacking.usePercentage = !0);
                "group" !== c && (this.stackedYData = g);
                f.stacking.oldStacks = {};
            }
        };
        x.prototype.modifyStacks = function () {
            var a = this, c = a.stackKey, d = a.yAxis.stacking.stacks, k = a.processedXData, m, l = a.options.stacking;
            a[l + "Stacker"] && [c, "-" + c].forEach(function (c) { for (var e = k.length, r, h; e--;)
                if (r = k[e], m = a.getStackIndicator(m, r, a.index, c), h = (r = d[c] && d[c][r]) && r.points[m.key])
                    a[l + "Stacker"](h, r, e); });
        };
        x.prototype.percentStacker = function (a, c, d) { c = c.total ? 100 / c.total : 0; a[0] = t(a[0] * c); a[1] = t(a[1] * c); this.stackedYData[d] = a[1]; };
        x.prototype.getStackIndicator = function (a, c, d, k) { !q(a) || a.x !== c || k && a.stackKey !== k ? a = { x: c, index: 0, key: k, stackKey: k } : a.index++; a.key = [d, c, a.index].join(); return a; };
        E.StackItem = m;
        "";
        return E.StackItem;
    });
    P(g, "Series/Line/LineSeries.js", [g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () { var d = function (g, t) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, c) { d.__proto__ = c; } || function (d, c) { for (var l in c)
            c.hasOwnProperty(l) && (d[l] = c[l]); }; return d(g, t); }; return function (g, t) { function q() { this.constructor = g; } d(g, t); g.prototype = null === t ? Object.create(t) : (q.prototype = t.prototype, new q); }; }(), x = B.defined, G = B.merge;
        B = function (g) {
            function A() { var d = null !== g && g.apply(this, arguments) || this; d.data = void 0; d.options = void 0; d.points = void 0; return d; }
            C(A, g);
            A.prototype.drawGraph = function () {
                var d = this, g = this.options, c = (this.gappedPath || this.getGraphPath).call(this), l = this.chart.styledMode, a = [["graph", "highcharts-graph"]];
                l || a[0].push(g.lineColor || this.color || "#cccccc", g.dashStyle);
                a = d.getZonesGraphs(a);
                a.forEach(function (a, q) {
                    var k = a[0], t = d[k], v = t ? "animate" : "attr";
                    t ? (t.endX = d.preventGraphAnimation ? null : c.xMap,
                        t.animate({ d: c })) : c.length && (d[k] = t = d.chart.renderer.path(c).addClass(a[1]).attr({ zIndex: 1 }).add(d.group));
                    t && !l && (k = { stroke: a[2], "stroke-width": g.lineWidth, fill: d.fillGraph && d.color || "none" }, a[3] ? k.dashstyle = a[3] : "square" !== g.linecap && (k["stroke-linecap"] = k["stroke-linejoin"] = "round"), t[v](k).shadow(2 > q && g.shadow));
                    t && (t.startX = c.xMap, t.isArea = c.isArea);
                });
            };
            A.prototype.getGraphPath = function (d, g, c) {
                var l = this, a = l.options, k = [], q = [], m, t = a.step;
                d = d || l.points;
                var F = d.reversed;
                F && d.reverse();
                (t = { right: 1,
                    center: 2 }[t] || t && 3) && F && (t = 4 - t);
                d = this.getValidPoints(d, !1, !(a.connectNulls && !g && !c));
                d.forEach(function (v, F) {
                    var y = v.plotX, z = v.plotY, w = d[F - 1];
                    (v.leftCliff || w && w.rightCliff) && !c && (m = !0);
                    v.isNull && !x(g) && 0 < F ? m = !a.connectNulls : v.isNull && !g ? m = !0 : (0 === F || m ? F = [["M", v.plotX, v.plotY]] : l.getPointSpline ? F = [l.getPointSpline(d, v, F)] : t ? (F = 1 === t ? [["L", w.plotX, z]] : 2 === t ? [["L", (w.plotX + y) / 2, w.plotY], ["L", (w.plotX + y) / 2, z]] : [["L", y, w.plotY]], F.push(["L", y, z])) : F = [["L", y, z]], q.push(v.x), t && (q.push(v.x), 2 === t && q.push(v.x)),
                        k.push.apply(k, F), m = !1);
                });
                k.xMap = q;
                return l.graphPath = k;
            };
            A.prototype.getZonesGraphs = function (d) { this.zones.forEach(function (g, c) { c = ["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (g.className || "")]; this.chart.styledMode || c.push(g.color || this.color, g.dashStyle || this.options.dashStyle); d.push(c); }, this); return d; };
            A.defaultOptions = G(d.defaultOptions, {});
            return A;
        }(d);
        g.registerSeriesType("line", B);
        "";
        return B;
    });
    P(g, "Series/Area/AreaSeries.js", [g["Core/Color/Color.js"], g["Core/Legend/LegendSymbol.js"],
        g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = this && this.__extends || function () { var c = function (d, a) { c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return c(d, a); }; return function (d, a) { function k() { this.constructor = d; } c(d, a); d.prototype = null === a ? Object.create(a) : (k.prototype = a.prototype, new k); }; }(), C = d.parse, I = B.seriesTypes.line;
        d = E.extend;
        var A = E.merge, t = E.objectEach, q = E.pick;
        E = function (c) {
            function d() { var a = null !== c && c.apply(this, arguments) || this; a.data = void 0; a.options = void 0; a.points = void 0; return a; }
            x(d, c);
            d.prototype.drawGraph = function () {
                this.areaPath = [];
                c.prototype.drawGraph.apply(this);
                var a = this, d = this.areaPath, l = this.options, m = [["area", "highcharts-area", this.color, l.fillColor]];
                this.zones.forEach(function (c, d) { m.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + c.className, c.color || a.color, c.fillColor || l.fillColor]); });
                m.forEach(function (c) {
                    var k = c[0], m = {}, g = a[k], t = g ? "animate" : "attr";
                    g ? (g.endX = a.preventGraphAnimation ? null : d.xMap, g.animate({ d: d })) : (m.zIndex = 0, g = a[k] = a.chart.renderer.path(d).addClass(c[1]).add(a.group), g.isArea = !0);
                    a.chart.styledMode || (m.fill = q(c[3], C(c[2]).setOpacity(q(l.fillOpacity, .75)).get()));
                    g[t](m);
                    g.startX = d.xMap;
                    g.shiftUnit = l.step ? 2 : 1;
                });
            };
            d.prototype.getGraphPath = function (a) {
                var c = I.prototype.getGraphPath, d = this.options, m = d.stacking, l = this.yAxis, g = [], t = [], x = this.index, y = l.stacking.stacks[this.stackKey], z = d.threshold, w = Math.round(l.getThreshold(d.threshold));
                d = q(d.connectNulls, "percent" === m);
                var e = function (b, e, c) { var d = a[b]; b = m && y[d.x].points[x]; var h = d[c + "Null"] || 0; c = d[c + "Cliff"] || 0; d = !0; if (c || h) {
                    var p = (h ? b[0] : b[1]) + c;
                    var n = b[0] + c;
                    d = !!h;
                }
                else
                    !m && a[e] && a[e].isNull && (p = n = z); "undefined" !== typeof p && (t.push({ plotX: f, plotY: null === p ? w : l.getThreshold(p), isNull: d, isCliff: !0 }), g.push({ plotX: f, plotY: null === n ? w : l.getThreshold(n), doCurve: !1 })); };
                a = a || this.points;
                m && (a = this.getStackPoints(a));
                for (var r = 0, h = a.length; r < h; ++r) {
                    m ||
                        (a[r].leftCliff = a[r].rightCliff = a[r].leftNull = a[r].rightNull = void 0);
                    var n = a[r].isNull;
                    var f = q(a[r].rectPlotX, a[r].plotX);
                    var b = m ? q(a[r].yBottom, w) : w;
                    if (!n || d)
                        d || e(r, r - 1, "left"), n && !m && d || (t.push(a[r]), g.push({ x: r, plotX: f, plotY: b })), d || e(r, r + 1, "right");
                }
                e = c.call(this, t, !0, !0);
                g.reversed = !0;
                n = c.call(this, g, !0, !0);
                (b = n[0]) && "M" === b[0] && (n[0] = ["L", b[1], b[2]]);
                n = e.concat(n);
                n.length && n.push(["Z"]);
                c = c.call(this, t, !1, d);
                n.xMap = e.xMap;
                this.areaPath = n;
                return c;
            };
            d.prototype.getStackPoints = function (a) {
                var c = this, d = [], m = [], l = this.xAxis, g = this.yAxis, x = g.stacking.stacks[this.stackKey], J = {}, y = g.series, z = y.length, w = g.options.reversedStacks ? 1 : -1, e = y.indexOf(c);
                a = a || this.points;
                if (this.options.stacking) {
                    for (var r = 0; r < a.length; r++)
                        a[r].leftNull = a[r].rightNull = void 0, J[a[r].x] = a[r];
                    t(x, function (e, f) { null !== e.total && m.push(f); });
                    m.sort(function (e, f) { return e - f; });
                    var h = y.map(function (e) { return e.visible; });
                    m.forEach(function (a, f) {
                        var b = 0, n, k;
                        if (J[a] && !J[a].isNull)
                            d.push(J[a]), [-1, 1].forEach(function (b) {
                                var d = 1 ===
                                    b ? "rightNull" : "leftNull", p = x[m[f + b]], u = 0;
                                if (p)
                                    for (var l = e; 0 <= l && l < z;) {
                                        var r = y[l].index;
                                        n = p.points[r];
                                        n || (r === c.index ? J[a][d] = !0 : h[l] && (k = x[a].points[r]) && (u -= k[1] - k[0]));
                                        l += w;
                                    }
                                J[a][1 === b ? "rightCliff" : "leftCliff"] = u;
                            });
                        else {
                            for (var p = e; 0 <= p && p < z;) {
                                if (n = x[a].points[y[p].index]) {
                                    b = n[1];
                                    break;
                                }
                                p += w;
                            }
                            b = q(b, 0);
                            b = g.translate(b, 0, 1, 0, 1);
                            d.push({ isNull: !0, plotX: l.translate(a, 0, 0, 0, 1), x: a, plotY: b, yBottom: b });
                        }
                    });
                }
                return d;
            };
            d.defaultOptions = A(I.defaultOptions, { threshold: 0 });
            return d;
        }(I);
        d(E.prototype, { singleStacks: !1,
            drawLegendSymbol: g.drawRectangle });
        B.registerSeriesType("area", E);
        "";
        return E;
    });
    P(g, "Series/Spline/SplineSeries.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = this && this.__extends || function () {
            var d = function (g, t) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, c) { d.__proto__ = c; } || function (d, c) { for (var l in c)
                c.hasOwnProperty(l) && (d[l] = c[l]); }; return d(g, t); };
            return function (g, t) {
                function q() { this.constructor = g; }
                d(g, t);
                g.prototype = null === t ? Object.create(t) :
                    (q.prototype = t.prototype, new q);
            };
        }(), E = d.seriesTypes.line, x = g.merge, G = g.pick;
        g = function (d) {
            function g() { var g = null !== d && d.apply(this, arguments) || this; g.data = void 0; g.options = void 0; g.points = void 0; return g; }
            C(g, d);
            g.prototype.getPointSpline = function (d, g, c) {
                var l = g.plotX || 0, a = g.plotY || 0, k = d[c - 1];
                c = d[c + 1];
                if (k && !k.isNull && !1 !== k.doCurve && !g.isCliff && c && !c.isNull && !1 !== c.doCurve && !g.isCliff) {
                    d = k.plotY || 0;
                    var q = c.plotX || 0;
                    c = c.plotY || 0;
                    var m = 0;
                    var t = (1.5 * l + (k.plotX || 0)) / 2.5;
                    var x = (1.5 * a + d) / 2.5;
                    q = (1.5 * l +
                        q) / 2.5;
                    var A = (1.5 * a + c) / 2.5;
                    q !== t && (m = (A - x) * (q - l) / (q - t) + a - A);
                    x += m;
                    A += m;
                    x > d && x > a ? (x = Math.max(d, a), A = 2 * a - x) : x < d && x < a && (x = Math.min(d, a), A = 2 * a - x);
                    A > c && A > a ? (A = Math.max(c, a), x = 2 * a - A) : A < c && A < a && (A = Math.min(c, a), x = 2 * a - A);
                    g.rightContX = q;
                    g.rightContY = A;
                }
                g = ["C", G(k.rightContX, k.plotX, 0), G(k.rightContY, k.plotY, 0), G(t, l, 0), G(x, a, 0), l, a];
                k.rightContX = k.rightContY = void 0;
                return g;
            };
            g.defaultOptions = x(E.defaultOptions);
            return g;
        }(E);
        d.registerSeriesType("spline", g);
        "";
        return g;
    });
    P(g, "Series/AreaSpline/AreaSplineSeries.js", [g["Series/Spline/SplineSeries.js"], g["Core/Legend/LegendSymbol.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = this && this.__extends || function () { var d = function (c, g) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return d(c, g); }; return function (c, g) { function a() { this.constructor = c; } d(c, g); c.prototype = null === g ? Object.create(g) : (a.prototype = g.prototype, new a); }; }(), C = B.seriesTypes, I = C.area;
        C = C.area.prototype;
        var A = E.extend, t = E.merge;
        E = function (g) { function c() { var c = null !== g && g.apply(this, arguments) || this; c.data = void 0; c.points = void 0; c.options = void 0; return c; } x(c, g); c.defaultOptions = t(d.defaultOptions, I.defaultOptions); return c; }(d);
        A(E.prototype, { getGraphPath: C.getGraphPath, getStackPoints: C.getStackPoints, drawGraph: C.drawGraph, drawLegendSymbol: g.drawRectangle });
        B.registerSeriesType("areaspline", E);
        "";
        return E;
    });
    P(g, "Series/Column/ColumnSeries.js", [g["Core/Animation/AnimationUtilities.js"],
        g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Legend/LegendSymbol.js"], g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I) {
        var A = this && this.__extends || function () {
            var a = function (c, e) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, a) { e.__proto__ = a; } || function (e, a) { for (var c in a)
                a.hasOwnProperty(c) && (e[c] = a[c]); }; return a(c, e); };
            return function (c, e) {
                function d() { this.constructor = c; }
                a(c, e);
                c.prototype = null === e ? Object.create(e) :
                    (d.prototype = e.prototype, new d);
            };
        }(), t = d.animObject, q = g.parse, c = B.hasTouch;
        d = B.noop;
        var l = I.clamp, a = I.css, k = I.defined, v = I.extend, m = I.fireEvent, C = I.isArray, F = I.isNumber, L = I.merge, J = I.pick, y = I.objectEach;
        I = function (d) {
            function g() { var e = null !== d && d.apply(this, arguments) || this; e.borderWidth = void 0; e.data = void 0; e.group = void 0; e.options = void 0; e.points = void 0; return e; }
            A(g, d);
            g.prototype.animate = function (e) {
                var a = this, c = this.yAxis, d = a.options, f = this.chart.inverted, b = {}, k = f ? "translateX" : "translateY";
                if (e)
                    b.scaleY =
                        .001, e = l(c.toPixels(d.threshold), c.pos, c.pos + c.len), f ? b.translateX = e - c.len : b.translateY = e, a.clipBox && a.setClip(), a.group.attr(b);
                else {
                    var g = Number(a.group.attr(k));
                    a.group.animate({ scaleY: 1 }, v(t(a.options.animation), { step: function (f, e) { a.group && (b[k] = g + e.pos * (c.pos - g), a.group.attr(b)); } }));
                }
            };
            g.prototype.init = function (e, a) { d.prototype.init.apply(this, arguments); var c = this; e = c.chart; e.hasRendered && e.series.forEach(function (e) { e.type === c.type && (e.isDirty = !0); }); };
            g.prototype.getColumnMetrics = function () {
                var e = this, a = e.options, c = e.xAxis, d = e.yAxis, f = c.options.reversedStacks;
                f = c.reversed && !f || !c.reversed && f;
                var b = {}, k, g = 0;
                !1 === a.grouping ? g = 1 : e.chart.series.forEach(function (f) { var a = f.yAxis, c = f.options; if (f.type === e.type && (f.visible || !e.chart.options.chart.ignoreHiddenSeries) && d.len === a.len && d.pos === a.pos) {
                    if (c.stacking && "group" !== c.stacking) {
                        k = f.stackKey;
                        "undefined" === typeof b[k] && (b[k] = g++);
                        var h = b[k];
                    }
                    else
                        !1 !== c.grouping && (h = g++);
                    f.columnIndex = h;
                } });
                var p = Math.min(Math.abs(c.transA) * (c.ordinal && c.ordinal.slope ||
                    a.pointRange || c.closestPointRange || c.tickInterval || 1), c.len), u = p * a.groupPadding, m = (p - 2 * u) / (g || 1);
                a = Math.min(a.maxPointWidth || c.len, J(a.pointWidth, m * (1 - 2 * a.pointPadding)));
                e.columnMetrics = { width: a, offset: (m - a) / 2 + (u + ((e.columnIndex || 0) + (f ? 1 : 0)) * m - p / 2) * (f ? -1 : 1), paddedWidth: m, columnCount: g };
                return e.columnMetrics;
            };
            g.prototype.crispCol = function (e, a, c, d) {
                var f = this.chart, b = this.borderWidth, h = -(b % 2 ? .5 : 0);
                b = b % 2 ? .5 : 1;
                f.inverted && f.renderer.isVML && (b += 1);
                this.options.crisp && (c = Math.round(e + c) + h, e = Math.round(e) +
                    h, c -= e);
                d = Math.round(a + d) + b;
                h = .5 >= Math.abs(a) && .5 < d;
                a = Math.round(a) + b;
                d -= a;
                h && d && (--a, d += 1);
                return { x: e, y: a, width: c, height: d };
            };
            g.prototype.adjustForMissingColumns = function (e, a, c, d) {
                var f = this, b = this.options.stacking;
                if (!c.isNull && 1 < d.columnCount) {
                    var h = this.yAxis.options.reversedStacks, n = 0, p = h ? 0 : -d.columnCount;
                    y(this.yAxis.stacking && this.yAxis.stacking.stacks, function (e) {
                        if ("number" === typeof c.x && (e = e[c.x.toString()])) {
                            var a = e.points[f.index], d = e.total;
                            b ? (a && (n = p), e.hasValidPoints && (h ? p++ : p--)) : C(a) &&
                                (n = a[1], p = d || 0);
                        }
                    });
                    e = (c.plotX || 0) + ((p - 1) * d.paddedWidth + a) / 2 - a - n * d.paddedWidth;
                }
                return e;
            };
            g.prototype.translate = function () {
                var e = this, a = e.chart, c = e.options, d = e.dense = 2 > e.closestPointRange * e.xAxis.transA;
                d = e.borderWidth = J(c.borderWidth, d ? 0 : 1);
                var f = e.xAxis, b = e.yAxis, g = c.threshold, m = e.translatedThreshold = b.getThreshold(g), p = J(c.minPointLength, 5), u = e.getColumnMetrics(), q = u.width, w = e.pointXOffset = u.offset, t = e.dataMin, y = e.dataMax, z = e.barW = Math.max(q, 1 + 2 * d);
                a.inverted && (m -= .5);
                c.pointPadding && (z = Math.ceil(z));
                x.prototype.translate.apply(e);
                e.points.forEach(function (d) {
                    var h = J(d.yBottom, m), n = 999 + Math.abs(h), r = d.plotX || 0;
                    n = l(d.plotY, -n, b.len + n);
                    var H = Math.min(n, h), D = Math.max(n, h) - H, K = q, v = r + w, x = z;
                    p && Math.abs(D) < p && (D = p, r = !b.reversed && !d.negative || b.reversed && d.negative, F(g) && F(y) && d.y === g && y <= g && (b.min || 0) < g && (t !== y || (b.max || 0) <= g) && (r = !r), H = Math.abs(H - m) > p ? h - p : m - (r ? p : 0));
                    k(d.options.pointWidth) && (K = x = Math.ceil(d.options.pointWidth), v -= Math.round((K - q) / 2));
                    c.centerInCategory && (v = e.adjustForMissingColumns(v, K, d, u));
                    d.barX = v;
                    d.pointWidth = K;
                    d.tooltipPos = a.inverted ? [l(b.len + b.pos - a.plotLeft - n, b.pos - a.plotLeft, b.len + b.pos - a.plotLeft), f.len + f.pos - a.plotTop - v - x / 2, D] : [f.left - a.plotLeft + v + x / 2, l(n + b.pos - a.plotTop, b.pos - a.plotTop, b.len + b.pos - a.plotTop), D];
                    d.shapeType = e.pointClass.prototype.shapeType || "rect";
                    d.shapeArgs = e.crispCol.apply(e, d.isNull ? [v, m, x, 0] : [v, H, x, D]);
                });
            };
            g.prototype.drawGraph = function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data"); };
            g.prototype.pointAttribs = function (e, a) {
                var c = this.options, d = this.pointAttrToOptions || {}, f = d.stroke || "borderColor", b = d["stroke-width"] || "borderWidth", k = e && e.color || this.color, g = e && e[f] || c[f] || k;
                d = e && e.options.dashStyle || c.dashStyle;
                var p = e && e[b] || c[b] || this[b] || 0, u = J(e && e.opacity, c.opacity, 1);
                if (e && this.zones.length) {
                    var m = e.getZone();
                    k = e.options.color || m && (m.color || e.nonZonedColor) || this.color;
                    m && (g = m.borderColor || g, d = m.dashStyle || d, p = m.borderWidth || p);
                }
                a && e && (e = L(c.states[a], e.options.states && e.options.states[a] || {}), a = e.brightness,
                    k = e.color || "undefined" !== typeof a && q(k).brighten(e.brightness).get() || k, g = e[f] || g, p = e[b] || p, d = e.dashStyle || d, u = J(e.opacity, u));
                f = { fill: k, stroke: g, "stroke-width": p, opacity: u };
                d && (f.dashstyle = d);
                return f;
            };
            g.prototype.drawPoints = function () {
                var e = this, a = this.chart, c = e.options, d = a.renderer, f = c.animationLimit || 250, b;
                e.points.forEach(function (h) {
                    var n = h.graphic, p = !!n, k = n && a.pointCount < f ? "animate" : "attr";
                    if (F(h.plotY) && null !== h.y) {
                        b = h.shapeArgs;
                        n && h.hasNewShapeType() && (n = n.destroy());
                        e.enabledDataSorting &&
                            (h.startXPos = e.xAxis.reversed ? -(b ? b.width || 0 : 0) : e.xAxis.width);
                        n || (h.graphic = n = d[h.shapeType](b).add(h.group || e.group)) && e.enabledDataSorting && a.hasRendered && a.pointCount < f && (n.attr({ x: h.startXPos }), p = !0, k = "animate");
                        if (n && p)
                            n[k](L(b));
                        if (c.borderRadius)
                            n[k]({ r: c.borderRadius });
                        a.styledMode || n[k](e.pointAttribs(h, h.selected && "select")).shadow(!1 !== h.allowShadow && c.shadow, null, c.stacking && !c.borderRadius);
                        n && (n.addClass(h.getClassName(), !0), n.attr({ visibility: h.visible ? "inherit" : "hidden" }));
                    }
                    else
                        n &&
                            (h.graphic = n.destroy());
                });
            };
            g.prototype.drawTracker = function () {
                var e = this, d = e.chart, h = d.pointer, n = function (b) { var f = h.getPointFromEvent(b); "undefined" !== typeof f && (h.isDirectTouch = !0, f.onMouseOver(b)); }, f;
                e.points.forEach(function (b) { f = C(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []; b.graphic && (b.graphic.element.point = b); f.forEach(function (f) { f.div ? f.div.point = b : f.element.point = b; }); });
                e._hasTracking || (e.trackerGroups.forEach(function (b) {
                    if (e[b]) {
                        e[b].addClass("highcharts-tracker").on("mouseover", n).on("mouseout", function (b) { h.onTrackerMouseOut(b); });
                        if (c)
                            e[b].on("touchstart", n);
                        !d.styledMode && e.options.cursor && e[b].css(a).css({ cursor: e.options.cursor });
                    }
                }), e._hasTracking = !0);
                m(this, "afterDrawTracker");
            };
            g.prototype.remove = function () { var e = this, a = e.chart; a.hasRendered && a.series.forEach(function (a) { a.type === e.type && (a.isDirty = !0); }); x.prototype.remove.apply(e, arguments); };
            g.defaultOptions = L(x.defaultOptions, { borderRadius: 0, centerInCategory: !1, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0,
                cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" });
            return g;
        }(x);
        v(I.prototype, { cropShoulder: 0, directTouch: !0, drawLegendSymbol: E.drawRectangle, getSymbol: d, negStacks: !0, trackerGroups: ["group", "dataLabelsGroup"] });
        G.registerSeriesType("column", I);
        "";
        "";
        return I;
    });
    P(g, "Core/Series/DataLabel.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = d.getDeferredAnimation, x = g.format, G = B.defined, I = B.extend, A = B.fireEvent, t = B.isArray, q = B.merge, c = B.objectEach, l = B.pick, a = B.splat, k;
        (function (d) {
            function k(a, e, c, d, n) {
                var f = this, b = this.chart, h = this.isCartesian && b.inverted, k = this.enabledDataSorting, p = l(a.dlBox && a.dlBox.centerX, a.plotX), g = a.plotY, m = c.rotation, r = c.align, q = G(p) && G(g) && b.isInsidePlot(p, Math.round(g), { inverted: h, paneCoordinates: !0,
                    series: f }), w = function (b) { k && f.xAxis && !t && f.setDataLabelStartPos(a, e, n, q, b); }, t = "justify" === l(c.overflow, k ? "none" : "justify"), y = this.visible && !1 !== a.visible && (a.series.forceDL || k && !t || q || l(c.inside, !!this.options.stacking) && d && b.isInsidePlot(p, h ? d.x + 1 : d.y + d.height - 1, { inverted: h, paneCoordinates: !0, series: f }));
                if (y && G(p) && G(g)) {
                    m && e.attr({ align: r });
                    r = e.getBBox(!0);
                    var z = [0, 0];
                    var v = b.renderer.fontMetrics(b.styledMode ? void 0 : c.style.fontSize, e).b;
                    d = I({ x: h ? this.yAxis.len - g : p, y: Math.round(h ? this.xAxis.len -
                            p : g), width: 0, height: 0 }, d);
                    I(c, { width: r.width, height: r.height });
                    m ? (t = !1, z = b.renderer.rotCorr(v, m), p = { x: d.x + (c.x || 0) + d.width / 2 + z.x, y: d.y + (c.y || 0) + { top: 0, middle: .5, bottom: 1 }[c.verticalAlign] * d.height }, z = [r.x - Number(e.attr("x")), r.y - Number(e.attr("y"))], w(p), e[n ? "attr" : "animate"](p)) : (w(d), e.align(c, void 0, d), p = e.alignAttr);
                    t && 0 <= d.height ? this.justifyDataLabel(e, c, p, r, d, n) : l(c.crop, !0) && (d = p.x, w = p.y, d += z[0], w += z[1], y = b.isInsidePlot(d, w, { paneCoordinates: !0, series: f }) && b.isInsidePlot(d + r.width, w + r.height, { paneCoordinates: !0, series: f }));
                    if (c.shape && !m)
                        e[n ? "attr" : "animate"]({ anchorX: h ? b.plotWidth - a.plotY : a.plotX, anchorY: h ? b.plotHeight - a.plotX : a.plotY });
                }
                n && k && (e.placed = !1);
                y || k && !t ? e.show() : (e.hide(), e.placed = !1);
            }
            function g(a, e) { var c = e.filter; return c ? (e = c.operator, a = a[c.property], c = c.value, ">" === e && a > c || "<" === e && a < c || ">=" === e && a >= c || "<=" === e && a <= c || "==" === e && a == c || "===" === e && a === c ? !0 : !1) : !0; }
            function v() {
                var d = this, e = d.chart, k = d.options, h = d.points, n = d.hasRendered || 0, f = e.renderer, b = k.dataLabels, m, q = b.animation;
                q = b.defer ? C(e, q, d) : { defer: 0, duration: 0 };
                b = J(J(e.options.plotOptions && e.options.plotOptions.series && e.options.plotOptions.series.dataLabels, e.options.plotOptions && e.options.plotOptions[d.type] && e.options.plotOptions[d.type].dataLabels), b);
                A(this, "drawDataLabels");
                if (t(b) || b.enabled || d._hasPointLabels) {
                    var p = d.plotGroup("dataLabelsGroup", "data-labels", n ? "inherit" : "hidden", b.zIndex || 6);
                    p.attr({ opacity: +n });
                    !n && (n = d.dataLabelsGroup) && (d.visible && p.show(), n[k.animation ? "animate" : "attr"]({ opacity: 1 }, q));
                    h.forEach(function (h) {
                        m = a(J(b, h.dlOptions || h.options && h.options.dataLabels));
                        m.forEach(function (b, a) {
                            var n = b.enabled && (!h.isNull || h.dataLabelOnNull) && g(h, b), m = h.connectors ? h.connectors[a] : h.connector, u = h.dataLabels ? h.dataLabels[a] : h.dataLabel, r = !u, q = l(b.distance, h.labelDistance);
                            if (n) {
                                var w = h.getLabelConfig();
                                var t = l(b[h.formatPrefix + "Format"], b.format);
                                w = G(t) ? x(t, w, e) : (b[h.formatPrefix + "Formatter"] || b.formatter).call(w, b);
                                t = b.style;
                                var H = b.rotation;
                                e.styledMode || (t.color = l(b.color, t.color, d.color, "#000000"), "contrast" === t.color ? (h.contrastColor = f.getContrast(h.color || d.color), t.color = !G(q) && b.inside || 0 > q || k.stacking ? h.contrastColor : "#000000") : delete h.contrastColor, k.cursor && (t.cursor = k.cursor));
                                var D = { r: b.borderRadius || 0, rotation: H, padding: b.padding, zIndex: 1 };
                                e.styledMode || (D.fill = b.backgroundColor, D.stroke = b.borderColor, D["stroke-width"] = b.borderWidth);
                                c(D, function (b, f) { "undefined" === typeof b && delete D[f]; });
                            }
                            !u || n && G(w) && !!u.div === !!b.useHTML && (u.rotation && b.rotation || u.rotation === b.rotation) ||
                                (r = !0, h.dataLabel = u = h.dataLabel && h.dataLabel.destroy(), h.dataLabels && (1 === h.dataLabels.length ? delete h.dataLabels : delete h.dataLabels[a]), a || delete h.dataLabel, m && (h.connector = h.connector.destroy(), h.connectors && (1 === h.connectors.length ? delete h.connectors : delete h.connectors[a])));
                            n && G(w) ? (u ? D.text = w : (h.dataLabels = h.dataLabels || [], u = h.dataLabels[a] = H ? f.text(w, 0, 0, b.useHTML).addClass("highcharts-data-label") : f.label(w, 0, 0, b.shape, null, null, b.useHTML, null, "data-label"), a || (h.dataLabel = u), u.addClass(" highcharts-data-label-color-" +
                                h.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), u.options = b, u.attr(D), e.styledMode || u.css(t).shadow(b.shadow), u.added || u.add(p), b.textPath && !b.useHTML && (u.setTextPath(h.getDataLabelPath && h.getDataLabelPath(u) || h.graphic, b.textPath), h.dataLabelPath && !b.textPath.enabled && (h.dataLabelPath = h.dataLabelPath.destroy())), d.alignDataLabel(h, u, b, null, r)) : u && u.hide();
                        });
                    });
                }
                A(this, "afterDrawDataLabels");
            }
            function L(a, e, c, d, n, f) {
                var b = this.chart, h = e.align, k = e.verticalAlign, p = a.box ? 0 : a.padding ||
                    0, g = e.x;
                g = void 0 === g ? 0 : g;
                var m = e.y;
                m = void 0 === m ? 0 : m;
                var l = (c.x || 0) + p;
                if (0 > l) {
                    "right" === h && 0 <= g ? (e.align = "left", e.inside = !0) : g -= l;
                    var r = !0;
                }
                l = (c.x || 0) + d.width - p;
                l > b.plotWidth && ("left" === h && 0 >= g ? (e.align = "right", e.inside = !0) : g += b.plotWidth - l, r = !0);
                l = c.y + p;
                0 > l && ("bottom" === k && 0 <= m ? (e.verticalAlign = "top", e.inside = !0) : m -= l, r = !0);
                l = (c.y || 0) + d.height - p;
                l > b.plotHeight && ("top" === k && 0 >= m ? (e.verticalAlign = "bottom", e.inside = !0) : m += b.plotHeight - l, r = !0);
                r && (e.x = g, e.y = m, a.placed = !f, a.align(e, void 0, n));
                return r;
            }
            function J(a, e) { var c = [], d; if (t(a) && !t(e))
                c = a.map(function (a) { return q(a, e); });
            else if (t(e) && !t(a))
                c = e.map(function (e) { return q(a, e); });
            else if (t(a) || t(e))
                for (d = Math.max(a.length, e.length); d--;)
                    c[d] = q(a[d], e[d]);
            else
                c = q(a, e); return c; }
            function y(a, e, c, d, n) {
                var f = this.chart, b = f.inverted, h = this.xAxis, k = h.reversed, p = b ? e.height / 2 : e.width / 2;
                a = (a = a.pointWidth) ? a / 2 : 0;
                e.startXPos = b ? n.x : k ? -p - a : h.width - p + a;
                e.startYPos = b ? k ? this.yAxis.height - p + a : -p - a : n.y;
                d ? "hidden" === e.visibility && (e.show(), e.attr({ opacity: 0 }).animate({ opacity: 1 })) :
                    e.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, e.hide);
                f.hasRendered && (c && e.attr({ x: e.startXPos, y: e.startYPos }), e.placed = !0);
            }
            var z = [];
            d.compose = function (a) { if (-1 === z.indexOf(a)) {
                var e = a.prototype;
                z.push(a);
                e.alignDataLabel = k;
                e.drawDataLabels = v;
                e.justifyDataLabel = L;
                e.setDataLabelStartPos = y;
            } };
        })(k || (k = {}));
        "";
        return k;
    });
    P(g, "Series/Column/ColumnDataLabel.js", [g["Core/Series/DataLabel.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = g.series, x = B.merge, G = B.pick, I;
        (function (g) {
            function t(c, d, a, k, g) {
                var m = this.chart.inverted, l = c.series, q = (l.xAxis ? l.xAxis.len : this.chart.plotSizeX) || 0;
                l = (l.yAxis ? l.yAxis.len : this.chart.plotSizeY) || 0;
                var t = c.dlBox || c.shapeArgs, v = G(c.below, c.plotY > G(this.translatedThreshold, l)), y = G(a.inside, !!this.options.stacking);
                t && (k = x(t), 0 > k.y && (k.height += k.y, k.y = 0), t = k.y + k.height - l, 0 < t && t < k.height && (k.height -= t), m && (k = { x: l - k.y - k.height, y: q - k.x - k.width, width: k.height, height: k.width }), y || (m ? (k.x += v ? 0 : k.width, k.width = 0) : (k.y += v ? k.height : 0, k.height = 0)));
                a.align = G(a.align, !m || y ? "center" : v ? "right" : "left");
                a.verticalAlign = G(a.verticalAlign, m || y ? "middle" : v ? "top" : "bottom");
                C.prototype.alignDataLabel.call(this, c, d, a, k, g);
                a.inside && c.contrastColor && d.css({ color: c.contrastColor });
            }
            var q = [];
            g.compose = function (c) { d.compose(C); -1 === q.indexOf(c) && (q.push(c), c.prototype.alignDataLabel = t); };
        })(I || (I = {}));
        return I;
    });
    P(g, "Series/Bar/BarSeries.js", [g["Series/Column/ColumnSeries.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends ||
            function () { var d = function (g, t) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, c) { d.__proto__ = c; } || function (d, c) { for (var g in c)
                c.hasOwnProperty(g) && (d[g] = c[g]); }; return d(g, t); }; return function (g, t) { function q() { this.constructor = g; } d(g, t); g.prototype = null === t ? Object.create(t) : (q.prototype = t.prototype, new q); }; }(), x = B.extend, G = B.merge;
        B = function (g) {
            function x() { var d = null !== g && g.apply(this, arguments) || this; d.data = void 0; d.options = void 0; d.points = void 0; return d; }
            C(x, g);
            x.defaultOptions =
                G(d.defaultOptions, {});
            return x;
        }(d);
        x(B.prototype, { inverted: !0 });
        g.registerSeriesType("bar", B);
        "";
        return B;
    });
    P(g, "Series/Scatter/ScatterSeries.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g) {
        var C = this && this.__extends || function () {
            var d = function (g, c) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (c, a) { c.__proto__ = a; } || function (c, a) { for (var d in a)
                a.hasOwnProperty(d) && (c[d] = a[d]); }; return d(g, c); };
            return function (g, c) {
                function l() { this.constructor = g; }
                d(g, c);
                g.prototype = null === c ? Object.create(c) : (l.prototype = c.prototype, new l);
            };
        }(), E = d.seriesTypes, x = E.column, G = E.line;
        E = g.addEvent;
        var I = g.extend, A = g.merge;
        g = function (d) {
            function g() { var c = null !== d && d.apply(this, arguments) || this; c.data = void 0; c.options = void 0; c.points = void 0; return c; }
            C(g, d);
            g.prototype.applyJitter = function () {
                var c = this, d = this.options.jitter, a = this.points.length;
                d && this.points.forEach(function (k, g) {
                    ["x", "y"].forEach(function (m, l) {
                        var q = "plot" + m.toUpperCase();
                        if (d[m] && !k.isNull) {
                            var t = c[m +
                                "Axis"];
                            var v = d[m] * t.transA;
                            if (t && !t.isLog) {
                                var y = Math.max(0, k[q] - v);
                                t = Math.min(t.len, k[q] + v);
                                l = 1E4 * Math.sin(g + l * a);
                                k[q] = y + (t - y) * (l - Math.floor(l));
                                "x" === m && (k.clientX = k.plotX);
                            }
                        }
                    });
                });
            };
            g.prototype.drawGraph = function () { this.options.lineWidth ? d.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy()); };
            g.defaultOptions = A(G.defaultOptions, { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: { headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } });
            return g;
        }(G);
        I(g.prototype, { drawTracker: x.prototype.drawTracker, sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1 });
        E(g, "afterTranslate", function () { this.applyJitter(); });
        d.registerSeriesType("scatter", g);
        "";
        return g;
    });
    P(g, "Series/CenteredUtilities.js", [g["Core/Globals.js"], g["Core/Series/Series.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = d.deg2rad, x = B.fireEvent, G = B.isNumber, I = B.pick, A = B.relativeLength, t;
        (function (d) {
            d.getCenter = function () {
                var c = this.options, d = this.chart, a = 2 * (c.slicedOffset || 0), k = d.plotWidth - 2 * a, q = d.plotHeight - 2 * a, m = c.center, t = Math.min(k, q), F = c.thickness, C = c.size, J = c.innerSize || 0;
                "string" === typeof C && (C = parseFloat(C));
                "string" === typeof J && (J = parseFloat(J));
                c = [I(m[0], "50%"), I(m[1], "50%"), I(C && 0 > C ? void 0 : c.size, "100%"), I(J && 0 > J ? void 0 : c.innerSize || 0, "0%")];
                !d.angular || this instanceof g || (c[3] = 0);
                for (m = 0; 4 > m; ++m)
                    C = c[m], d = 2 > m || 2 === m && /%$/.test(C),
                        c[m] = A(C, [k, q, t, c[2]][m]) + (d ? a : 0);
                c[3] > c[2] && (c[3] = c[2]);
                G(F) && 2 * F < c[2] && 0 < F && (c[3] = c[2] - 2 * F);
                x(this, "afterGetCenter", { positions: c });
                return c;
            };
            d.getStartAndEndRadians = function (c, d) { c = G(c) ? c : 0; d = G(d) && d > c && 360 > d - c ? d : c + 360; return { start: C * (c + -90), end: C * (d + -90) }; };
        })(t || (t = {}));
        "";
        return t;
    });
    P(g, "Series/Pie/PiePoint.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Series/Point.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () {
            var c = function (d, a) {
                c = Object.setPrototypeOf ||
                    { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
                    c.hasOwnProperty(d) && (a[d] = c[d]); };
                return c(d, a);
            };
            return function (d, a) { function k() { this.constructor = d; } c(d, a); d.prototype = null === a ? Object.create(a) : (k.prototype = a.prototype, new k); };
        }(), x = d.setAnimation, G = B.addEvent, I = B.defined;
        d = B.extend;
        var A = B.isNumber, t = B.pick, q = B.relativeLength;
        g = function (c) {
            function d() {
                var a = null !== c && c.apply(this, arguments) || this;
                a.labelDistance = void 0;
                a.options = void 0;
                a.series = void 0;
                return a;
            }
            C(d, c);
            d.prototype.getConnectorPath = function () { var a = this.labelPosition, c = this.series.options.dataLabels, d = this.connectorShapes, g = c.connectorShape; d[g] && (g = d[g]); return g.call(this, { x: a.final.x, y: a.final.y, alignment: a.alignment }, a.connectorPosition, c); };
            d.prototype.getTranslate = function () { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 }; };
            d.prototype.haloPath = function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, { innerR: c.r - 1, start: c.start, end: c.end });
            };
            d.prototype.init = function () { var a = this; c.prototype.init.apply(this, arguments); this.name = t(this.name, "Slice"); var d = function (c) { a.slice("select" === c.type); }; G(this, "select", d); G(this, "unselect", d); return this; };
            d.prototype.isValid = function () { return A(this.y) && 0 <= this.y; };
            d.prototype.setVisible = function (a, c) {
                var d = this, g = this.series, k = g.chart, l = g.options.ignoreHiddenPoint;
                c = t(c, l);
                a !== this.visible && (this.visible = this.options.visible = a = "undefined" ===
                    typeof a ? !this.visible : a, g.options.data[g.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (c) { if (d[c])
                    d[c][a ? "show" : "hide"](a); }), this.legendItem && k.legend.colorizeItem(this, a), a || "hover" !== this.state || this.setState(""), l && (g.isDirty = !0), c && k.redraw());
            };
            d.prototype.slice = function (a, c, d) {
                var g = this.series;
                x(d, g.chart);
                t(c, !0);
                this.sliced = this.options.sliced = I(a) ? a : !this.sliced;
                g.options.data[g.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
            };
            return d;
        }(g);
        d(g.prototype, { connectorShapes: { fixedOffset: function (c, d, a) { var g = d.breakAt; d = d.touchingSliceAt; return [["M", c.x, c.y], a.softConnector ? ["C", c.x + ("left" === c.alignment ? -5 : 5), c.y, 2 * g.x - d.x, 2 * g.y - d.y, g.x, g.y] : ["L", g.x, g.y], ["L", d.x, d.y]]; }, straight: function (c, d) { d = d.touchingSliceAt; return [["M", c.x, c.y], ["L", d.x, d.y]]; }, crookedLine: function (c, d, a) {
                    d = d.touchingSliceAt;
                    var g = this.series, l = g.center[0], m = g.chart.plotWidth, t = g.chart.plotLeft;
                    g = c.alignment;
                    var x = this.shapeArgs.r;
                    a = q(a.crookDistance, 1);
                    m = "left" === g ? l + x + (m + t - l - x) * (1 - a) : t + (l - x) * a;
                    a = ["L", m, c.y];
                    l = !0;
                    if ("left" === g ? m > c.x || m < d.x : m < c.x || m > d.x)
                        l = !1;
                    c = [["M", c.x, c.y]];
                    l && c.push(a);
                    c.push(["L", d.x, d.y]);
                    return c;
                } } });
        return g;
    });
    P(g, "Series/Pie/PieSeries.js", [g["Series/CenteredUtilities.js"], g["Series/Column/ColumnSeries.js"], g["Core/Globals.js"], g["Core/Legend/LegendSymbol.js"], g["Series/Pie/PiePoint.js"], g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Renderer/SVG/Symbols.js"],
        g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A, t) {
        var q = this && this.__extends || function () { var a = function (c, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return a(c, d); }; return function (c, d) { function g() { this.constructor = c; } a(c, d); c.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype, new g); }; }(), c = d.getStartAndEndRadians;
        B = B.noop;
        var l = t.clamp, a = t.extend, k = t.fireEvent, v = t.merge, m = t.pick, C = t.relativeLength;
        t = function (a) {
            function d() { var c = null !== a && a.apply(this, arguments) || this; c.center = void 0; c.data = void 0; c.maxLabelDistance = void 0; c.options = void 0; c.points = void 0; return c; }
            q(d, a);
            d.prototype.animate = function (a) { var c = this, d = c.points, g = c.startAngleRad; a || d.forEach(function (a) { var e = a.graphic, d = a.shapeArgs; e && d && (e.attr({ r: m(a.startR, c.center && c.center[3] / 2), start: g, end: g }), e.animate({ r: d.r, start: d.start, end: d.end }, c.options.animation)); }); };
            d.prototype.drawEmpty = function () {
                var a = this.startAngleRad, c = this.endAngleRad, d = this.options;
                if (0 === this.total && this.center) {
                    var g = this.center[0];
                    var e = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(g, e, this.center[1] / 2, 0, a, c).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({ d: A.arc(g, e, this.center[2] / 2, 0, { start: a, end: c, innerR: this.center[3] / 2 }) });
                    this.chart.styledMode || this.graph.attr({ "stroke-width": d.borderWidth, fill: d.fillColor || "none", stroke: d.color || "#cccccc" });
                }
                else
                    this.graph && (this.graph = this.graph.destroy());
            };
            d.prototype.drawPoints = function () { var a = this.chart.renderer; this.points.forEach(function (c) { c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy()); c.graphic || (c.graphic = a[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = !0); }); };
            d.prototype.generatePoints = function () { a.prototype.generatePoints.call(this); this.updateTotals(); };
            d.prototype.getX = function (a, c, d) {
                var g = this.center, e = this.radii ? this.radii[d.index] || 0 : g[2] / 2;
                a = Math.asin(l((a - g[1]) / (e + d.labelDistance), -1, 1));
                return g[0] +
                    (c ? -1 : 1) * Math.cos(a) * (e + d.labelDistance) + (0 < d.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0);
            };
            d.prototype.hasData = function () { return !!this.processedXData.length; };
            d.prototype.redrawPoints = function () {
                var a = this, c = a.chart, d = c.renderer, g = a.options.shadow, e, k, h, n;
                this.drawEmpty();
                !g || a.shadowGroup || c.styledMode || (a.shadowGroup = d.g("shadow").attr({ zIndex: -1 }).add(a.group));
                a.points.forEach(function (f) {
                    var b = {};
                    k = f.graphic;
                    if (!f.isNull && k) {
                        var m = void 0;
                        n = f.shapeArgs;
                        e = f.getTranslate();
                        c.styledMode ||
                            (m = f.shadowGroup, g && !m && (m = f.shadowGroup = d.g("shadow").add(a.shadowGroup)), m && m.attr(e), h = a.pointAttribs(f, f.selected && "select"));
                        f.delayedRendering ? (k.setRadialReference(a.center).attr(n).attr(e), c.styledMode || k.attr(h).attr({ "stroke-linejoin": "round" }).shadow(g, m), f.delayedRendering = !1) : (k.setRadialReference(a.center), c.styledMode || v(!0, b, h), v(!0, b, n, e), k.animate(b));
                        k.attr({ visibility: f.visible ? "inherit" : "hidden" });
                        k.addClass(f.getClassName(), !0);
                    }
                    else
                        k && (f.graphic = k.destroy());
                });
            };
            d.prototype.sortByAngle =
                function (a, c) { a.sort(function (a, d) { return "undefined" !== typeof a.angle && (d.angle - a.angle) * c; }); };
            d.prototype.translate = function (a) {
                k(this, "translate");
                this.generatePoints();
                var d = this.options, g = d.slicedOffset, l = g + (d.borderWidth || 0), e = c(d.startAngle, d.endAngle), r = this.startAngleRad = e.start;
                e = (this.endAngleRad = e.end) - r;
                var h = this.points, n = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var f = h.length, b, q = 0;
                a || (this.center = a = this.getCenter());
                for (b = 0; b < f; b++) {
                    var t = h[b];
                    var p = r + q * e;
                    !t.isValid() || d && !t.visible ||
                        (q += t.percentage / 100);
                    var u = r + q * e;
                    var v = { x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2, start: Math.round(1E3 * p) / 1E3, end: Math.round(1E3 * u) / 1E3 };
                    t.shapeType = "arc";
                    t.shapeArgs = v;
                    t.labelDistance = m(t.options.dataLabels && t.options.dataLabels.distance, n);
                    t.labelDistance = C(t.labelDistance, v.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, t.labelDistance);
                    u = (u + p) / 2;
                    u > 1.5 * Math.PI ? u -= 2 * Math.PI : u < -Math.PI / 2 && (u += 2 * Math.PI);
                    t.slicedTranslation = { translateX: Math.round(Math.cos(u) * g), translateY: Math.round(Math.sin(u) *
                            g) };
                    v = Math.cos(u) * a[2] / 2;
                    var x = Math.sin(u) * a[2] / 2;
                    t.tooltipPos = [a[0] + .7 * v, a[1] + .7 * x];
                    t.half = u < -Math.PI / 2 || u > Math.PI / 2 ? 1 : 0;
                    t.angle = u;
                    p = Math.min(l, t.labelDistance / 5);
                    t.labelPosition = { natural: { x: a[0] + v + Math.cos(u) * t.labelDistance, y: a[1] + x + Math.sin(u) * t.labelDistance }, "final": {}, alignment: 0 > t.labelDistance ? "center" : t.half ? "right" : "left", connectorPosition: { breakAt: { x: a[0] + v + Math.cos(u) * p, y: a[1] + x + Math.sin(u) * p }, touchingSliceAt: { x: a[0] + v, y: a[1] + x } } };
                }
                k(this, "afterTranslate");
            };
            d.prototype.updateTotals = function () {
                var a = this.points, c = a.length, d = this.options.ignoreHiddenPoint, g, e = 0;
                for (g = 0; g < c; g++) {
                    var k = a[g];
                    !k.isValid() || d && !k.visible || (e += k.y);
                }
                this.total = e;
                for (g = 0; g < c; g++)
                    k = a[g], k.percentage = 0 < e && (k.visible || !d) ? k.y / e * 100 : 0, k.total = e;
            };
            d.defaultOptions = v(G.defaultOptions, { center: [null, null], clip: !1, colorByPoint: !0, dataLabels: { allowOverlap: !0, connectorPadding: 5, connectorShape: "fixedOffset", crookDistance: "70%", distance: 30, enabled: !0, formatter: function () { return this.point.isNull ? void 0 : this.point.name; }, softConnector: !0,
                    x: 0 }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: .1 } } });
            return d;
        }(G);
        a(t.prototype, { axisTypes: [], directTouch: !0, drawGraph: void 0, drawLegendSymbol: E.drawRectangle, drawTracker: g.prototype.drawTracker, getCenter: d.getCenter, getSymbol: B, isCartesian: !1, noSharedTooltip: !0, pointAttribs: g.prototype.pointAttribs,
            pointClass: x, requireSorting: !1, searchPoint: B, trackerGroups: ["group", "dataLabelsGroup"] });
        I.registerSeriesType("pie", t);
        "";
        return t;
    });
    P(g, "Series/Pie/PieDataLabel.js", [g["Core/Series/DataLabel.js"], g["Core/Globals.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E, x) {
        var C = g.noop, I = B.distribute, A = E.series, t = x.arrayMax, q = x.clamp, c = x.defined, l = x.merge, a = x.pick, k = x.relativeLength, v;
        (function (g) {
            function m() {
                var d = this, g = d.data, e = d.chart, k = d.options.dataLabels || {}, h = k.connectorPadding, n = e.plotWidth, f = e.plotHeight, b = e.plotLeft, m = Math.round(e.chartWidth / 3), q = d.center, p = q[2] / 2, u = q[1], v = [[], []], y = [0, 0, 0, 0], x = d.dataLabelPositioners, O, F, C, B, N, J, E, G, L, P, V, R;
                d.visible && (k.enabled || d._hasPointLabels) && (g.forEach(function (b) { b.dataLabel && b.visible && b.dataLabel.shortened && (b.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), b.dataLabel.shortened = !1); }), A.prototype.drawDataLabels.apply(d), g.forEach(function (b) {
                    b.dataLabel &&
                        (b.visible ? (v[b.half].push(b), b.dataLabel._pos = null, !c(k.style.width) && !c(b.options.dataLabels && b.options.dataLabels.style && b.options.dataLabels.style.width) && b.dataLabel.getBBox().width > m && (b.dataLabel.css({ width: Math.round(.7 * m) + "px" }), b.dataLabel.shortened = !0)) : (b.dataLabel = b.dataLabel.destroy(), b.dataLabels && 1 === b.dataLabels.length && delete b.dataLabels));
                }), v.forEach(function (g, m) {
                    var l = g.length, r = [], t;
                    if (l) {
                        d.sortByAngle(g, m - .5);
                        if (0 < d.maxLabelDistance) {
                            var w = Math.max(0, u - p - d.maxLabelDistance);
                            var D = Math.min(u + p + d.maxLabelDistance, e.plotHeight);
                            g.forEach(function (b) { 0 < b.labelDistance && b.dataLabel && (b.top = Math.max(0, u - p - b.labelDistance), b.bottom = Math.min(u + p + b.labelDistance, e.plotHeight), t = b.dataLabel.getBBox().height || 21, b.distributeBox = { target: b.labelPosition.natural.y - b.top + t / 2, size: t, rank: b.y }, r.push(b.distributeBox)); });
                            w = D + t - w;
                            I(r, w, w / 5);
                        }
                        for (V = 0; V < l; V++) {
                            O = g[V];
                            J = O.labelPosition;
                            B = O.dataLabel;
                            P = !1 === O.visible ? "hidden" : "inherit";
                            L = w = J.natural.y;
                            r && c(O.distributeBox) && ("undefined" ===
                                typeof O.distributeBox.pos ? P = "hidden" : (E = O.distributeBox.size, L = x.radialDistributionY(O)));
                            delete O.positionIndex;
                            if (k.justify)
                                G = x.justify(O, p, q);
                            else
                                switch (k.alignTo) {
                                    case "connectors":
                                        G = x.alignToConnectors(g, m, n, b);
                                        break;
                                    case "plotEdges":
                                        G = x.alignToPlotEdges(B, m, n, b);
                                        break;
                                    default: G = x.radialDistributionX(d, O, L, w);
                                }
                            B._attr = { visibility: P, align: J.alignment };
                            R = O.options.dataLabels || {};
                            B._pos = { x: G + a(R.x, k.x) + ({ left: h, right: -h }[J.alignment] || 0), y: L + a(R.y, k.y) - 10 };
                            J.final.x = G;
                            J.final.y = L;
                            a(k.crop, !0) &&
                                (N = B.getBBox().width, w = null, G - N < h && 1 === m ? (w = Math.round(N - G + h), y[3] = Math.max(w, y[3])) : G + N > n - h && 0 === m && (w = Math.round(G + N - n + h), y[1] = Math.max(w, y[1])), 0 > L - E / 2 ? y[0] = Math.max(Math.round(-L + E / 2), y[0]) : L + E / 2 > f && (y[2] = Math.max(Math.round(L + E / 2 - f), y[2])), B.sideOverflow = w);
                        }
                    }
                }), 0 === t(y) || this.verifyDataLabelOverflow(y)) && (this.placeDataLabels(), this.points.forEach(function (b) {
                    R = l(k, b.options.dataLabels);
                    if (F = a(R.connectorWidth, 1)) {
                        var f;
                        C = b.connector;
                        if ((B = b.dataLabel) && B._pos && b.visible && 0 < b.labelDistance) {
                            P =
                                B._attr.visibility;
                            if (f = !C)
                                b.connector = C = e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b.colorIndex + (b.className ? " " + b.className : "")).add(d.dataLabelsGroup), e.styledMode || C.attr({ "stroke-width": F, stroke: R.connectorColor || b.color || "#666666" });
                            C[f ? "attr" : "animate"]({ d: b.getConnectorPath() });
                            C.attr("visibility", P);
                        }
                        else
                            C && (b.connector = C.destroy());
                    }
                }));
            }
            function v() {
                this.points.forEach(function (a) {
                    var c = a.dataLabel, e;
                    c && a.visible && ((e = c._pos) ? (c.sideOverflow && (c._attr.width =
                        Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({ width: c._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), c.shortened = !0), c.attr(c._attr), c[c.moved ? "animate" : "attr"](e), c.moved = !0) : c && c.attr({ y: -9999 }));
                    delete a.distributeBox;
                }, this);
            }
            function x(a) {
                var c = this.center, e = this.options, d = e.center, h = e.minSize || 80, g = null !== e.size;
                if (!g) {
                    if (null !== d[0])
                        var f = Math.max(c[2] - Math.max(a[1], a[3]), h);
                    else
                        f = Math.max(c[2] - a[1] - a[3], h), c[0] += (a[3] - a[1]) / 2;
                    null !== d[1] ?
                        f = q(f, h, c[2] - Math.max(a[0], a[2])) : (f = q(f, h, c[2] - a[0] - a[2]), c[1] += (a[0] - a[2]) / 2);
                    f < c[2] ? (c[2] = f, c[3] = Math.min(e.thickness ? Math.max(0, f - 2 * e.thickness) : Math.max(0, k(e.innerSize || 0, f)), f), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : g = !0;
                }
                return g;
            }
            var B = [], y = { radialDistributionY: function (a) { return a.top + a.distributeBox.pos; }, radialDistributionX: function (a, c, e, d) { return a.getX(e < c.top + 2 || e > c.bottom - 2 ? d : e, c.half, c); }, justify: function (a, c, e) { return e[0] + (a.half ? -1 : 1) * (c + a.labelDistance); }, alignToPlotEdges: function (a, c, e, d) { a = a.getBBox().width; return c ? a + d : e - a - d; }, alignToConnectors: function (a, c, e, d) { var h = 0, g; a.forEach(function (f) { g = f.dataLabel.getBBox().width; g > h && (h = g); }); return c ? h + d : e - h - d; } };
            g.compose = function (a) { d.compose(A); -1 === B.indexOf(a) && (B.push(a), a = a.prototype, a.dataLabelPositioners = y, a.alignDataLabel = C, a.drawDataLabels = m, a.placeDataLabels = v, a.verifyDataLabelOverflow = x); };
        })(v || (v = {}));
        return v;
    });
    P(g, "Extensions/OverlappingDataLabels.js", [g["Core/Chart/Chart.js"], g["Core/Utilities.js"]], function (d, g) {
        function C(d, c) { var g = !1; if (d) {
            var a = d.newOpacity;
            d.oldOpacity !== a && (d.alignAttr && d.placed ? (d[a ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), g = !0, d.alignAttr.opacity = a, d[d.isOld ? "animate" : "attr"](d.alignAttr, null, function () { c.styledMode || d.css({ pointerEvents: a ? "auto" : "none" }); }), x(c, "afterHideOverlappingLabel")) : d.attr({ opacity: a }));
            d.isOld = !0;
        } return g; }
        var E = g.addEvent, x = g.fireEvent, G = g.isArray, I = g.isNumber, A = g.objectEach, t = g.pick;
        E(d, "render", function () {
            var d = this, c = [];
            (this.labelCollectors || []).forEach(function (d) {
                c =
                    c.concat(d());
            });
            (this.yAxis || []).forEach(function (d) { d.stacking && d.options.stackLabels && !d.options.stackLabels.allowOverlap && A(d.stacking.stacks, function (a) { A(a, function (a) { a.label && c.push(a.label); }); }); });
            (this.series || []).forEach(function (g) {
                var a = g.options.dataLabels;
                g.visible && (!1 !== a.enabled || g._hasPointLabels) && (a = function (a) {
                    return a.forEach(function (a) {
                        a.visible && (G(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []).forEach(function (g) {
                            var k = g.options;
                            g.labelrank = t(k.labelrank, a.labelrank, a.shapeArgs && a.shapeArgs.height);
                            k.allowOverlap ? (g.oldOpacity = g.opacity, g.newOpacity = 1, C(g, d)) : c.push(g);
                        });
                    });
                }, a(g.nodes || []), a(g.points));
            });
            this.hideOverlappingLabels(c);
        });
        d.prototype.hideOverlappingLabels = function (d) {
            var c = this, g = d.length, a = c.renderer, k, q, m, t = !1;
            var F = function (c) {
                var d, g = c.box ? 0 : c.padding || 0, e = d = 0, k;
                if (c && (!c.alignAttr || c.placed)) {
                    var h = c.alignAttr || { x: c.attr("x"), y: c.attr("y") };
                    var n = c.parentGroup;
                    c.width || (d = c.getBBox(), c.width = d.width, c.height = d.height, d = a.fontMetrics(null, c.element).h);
                    var f = c.width - 2 * g;
                    (k = { left: "0", center: "0.5", right: "1" }[c.alignValue]) ? e = +k * f : I(c.x) && Math.round(c.x) !== c.translateX && (e = c.x - c.translateX);
                    return { x: h.x + (n.translateX || 0) + g - (e || 0), y: h.y + (n.translateY || 0) + g - d, width: c.width - 2 * g, height: c.height - 2 * g };
                }
            };
            for (q = 0; q < g; q++)
                if (k = d[q])
                    k.oldOpacity = k.opacity, k.newOpacity = 1, k.absoluteBox = F(k);
            d.sort(function (a, c) { return (c.labelrank || 0) - (a.labelrank || 0); });
            for (q = 0; q < g; q++) {
                var A = (F = d[q]) && F.absoluteBox;
                for (k = q + 1; k < g; ++k) {
                    var B = (m = d[k]) && m.absoluteBox;
                    !A || !B || F ===
                        m || 0 === F.newOpacity || 0 === m.newOpacity || "hidden" === F.visibility || "hidden" === m.visibility || B.x >= A.x + A.width || B.x + B.width <= A.x || B.y >= A.y + A.height || B.y + B.height <= A.y || ((F.labelrank < m.labelrank ? F : m).newOpacity = 0);
                }
            }
            d.forEach(function (a) { C(a, c) && (t = !0); });
            t && x(c, "afterHideAllOverlappingLabels");
        };
    });
    P(g, "Core/Responsive.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.extend, B = d.find, E = d.isArray, x = d.isObject, G = d.merge, I = d.objectEach, A = d.pick, t = d.splat, q = d.uniqueKey, c;
        (function (c) {
            var a = [];
            c.compose = function (c) {
                -1 ===
                    a.indexOf(c) && (a.push(c), g(c.prototype, d.prototype));
                return c;
            };
            var d = function () {
                function a() { }
                a.prototype.currentOptions = function (a) {
                    function c(a, g, k, m) { var e; I(a, function (a, h) { if (!m && -1 < d.collectionsWithUpdate.indexOf(h) && g[h])
                        for (a = t(a), k[h] = [], e = 0; e < Math.max(a.length, g[h].length); e++)
                            g[h][e] && (void 0 === a[e] ? k[h][e] = g[h][e] : (k[h][e] = {}, c(a[e], g[h][e], k[h][e], m + 1)));
                    else
                        x(a) ? (k[h] = E(a) ? [] : {}, c(a, g[h] || {}, k[h], m + 1)) : k[h] = "undefined" === typeof g[h] ? null : g[h]; }); }
                    var d = this, g = {};
                    c(a, this.options, g, 0);
                    return g;
                };
                a.prototype.matchResponsiveRule = function (a, c) { var d = a.condition; (d.callback || function () { return this.chartWidth <= A(d.maxWidth, Number.MAX_VALUE) && this.chartHeight <= A(d.maxHeight, Number.MAX_VALUE) && this.chartWidth >= A(d.minWidth, 0) && this.chartHeight >= A(d.minHeight, 0); }).call(this) && c.push(a._id); };
                a.prototype.setResponsive = function (a, c) {
                    var d = this, g = this.options.responsive, k = this.currentResponsive, m = [];
                    !c && g && g.rules && g.rules.forEach(function (a) {
                        "undefined" === typeof a._id && (a._id = q());
                        d.matchResponsiveRule(a, m);
                    }, this);
                    c = G.apply(void 0, m.map(function (a) { return B((g || {}).rules || [], function (c) { return c._id === a; }); }).map(function (a) { return a && a.chartOptions; }));
                    c.isResponsiveOptions = !0;
                    m = m.toString() || void 0;
                    m !== (k && k.ruleIds) && (k && this.update(k.undoOptions, a, !0), m ? (k = this.currentOptions(c), k.isResponsiveOptions = !0, this.currentResponsive = { ruleIds: m, mergedOptions: c, undoOptions: k }, this.update(c, a, !0)) : this.currentResponsive = void 0);
                };
                return a;
            }();
        })(c || (c = {}));
        "";
        "";
        return c;
    });
    P(g, "masters/highcharts.src.js", [g["Core/Globals.js"],
        g["Core/Utilities.js"], g["Core/DefaultOptions.js"], g["Core/Animation/Fx.js"], g["Core/Animation/AnimationUtilities.js"], g["Core/Renderer/HTML/AST.js"], g["Core/FormatUtilities.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGRenderer.js"], g["Core/Renderer/HTML/HTMLElement.js"], g["Core/Renderer/HTML/HTMLRenderer.js"], g["Core/Axis/Axis.js"], g["Core/Axis/DateTimeAxis.js"], g["Core/Axis/LogarithmicAxis.js"], g["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
        g["Core/Axis/Tick.js"], g["Core/Tooltip.js"], g["Core/Series/Point.js"], g["Core/Pointer.js"], g["Core/MSPointer.js"], g["Core/Legend/Legend.js"], g["Core/Chart/Chart.js"], g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Series/Column/ColumnSeries.js"], g["Series/Column/ColumnDataLabel.js"], g["Series/Pie/PieSeries.js"], g["Series/Pie/PieDataLabel.js"], g["Core/Series/DataLabel.js"], g["Core/Responsive.js"], g["Core/Color/Color.js"], g["Core/Time.js"]], function (d, g, B, E, x, G, I, A, t, q, c, l, a, k, v, m, N, F, L, J, y, z, w, e, r, h, n, f, b, D, H, p, u) {
        d.animate = x.animate;
        d.animObject = x.animObject;
        d.getDeferredAnimation = x.getDeferredAnimation;
        d.setAnimation = x.setAnimation;
        d.stop = x.stop;
        d.timers = E.timers;
        d.AST = G;
        d.Axis = a;
        d.Chart = w;
        d.chart = w.chart;
        d.Fx = E;
        d.Legend = z;
        d.PlotLineOrBand = m;
        d.Point = L;
        d.Pointer = y.isRequired() ? y : J;
        d.Series = e;
        d.SVGElement = t;
        d.SVGRenderer = q;
        d.Tick = N;
        d.Time = u;
        d.Tooltip = F;
        d.Color = p;
        d.color = p.parse;
        l.compose(q);
        c.compose(t);
        d.defaultOptions = B.defaultOptions;
        d.getOptions = B.getOptions;
        d.time = B.defaultTime;
        d.setOptions = B.setOptions;
        d.dateFormat = I.dateFormat;
        d.format = I.format;
        d.numberFormat = I.numberFormat;
        d.addEvent = g.addEvent;
        d.arrayMax = g.arrayMax;
        d.arrayMin = g.arrayMin;
        d.attr = g.attr;
        d.clearTimeout = g.clearTimeout;
        d.correctFloat = g.correctFloat;
        d.createElement = g.createElement;
        d.css = g.css;
        d.defined = g.defined;
        d.destroyObjectProperties = g.destroyObjectProperties;
        d.discardElement = g.discardElement;
        d.distribute = A.distribute;
        d.erase = g.erase;
        d.error = g.error;
        d.extend = g.extend;
        d.extendClass = g.extendClass;
        d.find =
            g.find;
        d.fireEvent = g.fireEvent;
        d.getMagnitude = g.getMagnitude;
        d.getStyle = g.getStyle;
        d.inArray = g.inArray;
        d.isArray = g.isArray;
        d.isClass = g.isClass;
        d.isDOMElement = g.isDOMElement;
        d.isFunction = g.isFunction;
        d.isNumber = g.isNumber;
        d.isObject = g.isObject;
        d.isString = g.isString;
        d.keys = g.keys;
        d.merge = g.merge;
        d.normalizeTickInterval = g.normalizeTickInterval;
        d.objectEach = g.objectEach;
        d.offset = g.offset;
        d.pad = g.pad;
        d.pick = g.pick;
        d.pInt = g.pInt;
        d.relativeLength = g.relativeLength;
        d.removeEvent = g.removeEvent;
        d.seriesType =
            r.seriesType;
        d.splat = g.splat;
        d.stableSort = g.stableSort;
        d.syncTimeout = g.syncTimeout;
        d.timeUnits = g.timeUnits;
        d.uniqueKey = g.uniqueKey;
        d.useSerialIds = g.useSerialIds;
        d.wrap = g.wrap;
        n.compose(h);
        D.compose(e);
        k.compose(a);
        v.compose(a);
        b.compose(f);
        m.compose(a);
        H.compose(w);
        return d;
    });
    P(g, "Core/Axis/OrdinalAxis.js", [g["Core/Axis/Axis.js"], g["Core/Globals.js"], g["Core/Series/Series.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = E.addEvent, C = E.correctFloat, I = E.css, A = E.defined, t = E.error, q = E.pick, c = E.timeUnits, l = [], a;
        (function (a) {
            function d(a, f, b, e, d, h, g) {
                void 0 === d && (d = []);
                void 0 === h && (h = 0);
                var p = {}, n = this.options.tickPixelInterval, k = this.chart.time, m = [], u, l, r = 0, q = [], D = -Number.MAX_VALUE;
                if (!this.options.ordinal && !this.options.breaks || !d || 3 > d.length || "undefined" === typeof f)
                    return k.getTimeTicks.apply(k, arguments);
                var H = d.length;
                for (u = 0; u < H; u++) {
                    var w = u && d[u - 1] > b;
                    d[u] < f && (r = u);
                    if (u === H - 1 || d[u + 1] - d[u] > 5 * h || w) {
                        if (d[u] > D) {
                            for (l = k.getTimeTicks(a, d[r], d[u], e); l.length && l[0] <= D;)
                                l.shift();
                            l.length && (D = l[l.length -
                                1]);
                            m.push(q.length);
                            q = q.concat(l);
                        }
                        r = u + 1;
                    }
                    if (w)
                        break;
                }
                if (l) {
                    l = l.info;
                    if (g && l.unitRange <= c.hour) {
                        u = q.length - 1;
                        for (r = 1; r < u; r++)
                            if (k.dateFormat("%d", q[r]) !== k.dateFormat("%d", q[r - 1])) {
                                p[q[r]] = "day";
                                var v = !0;
                            }
                        v && (p[q[0]] = "day");
                        l.higherRanks = p;
                    }
                    l.segmentStarts = m;
                    q.info = l;
                }
                else
                    t(12, !1, this.chart);
                if (g && A(n)) {
                    l = q.length;
                    k = [];
                    r = [];
                    u = void 0;
                    for (v = l; v--;)
                        m = this.translate(q[v]), u && (r[v] = u - m), k[v] = u = m;
                    r.sort();
                    r = r[Math.floor(r.length / 2)];
                    r < .6 * n && (r = null);
                    v = q[l - 1] > b ? l - 1 : l;
                    for (u = void 0; v--;)
                        m = k[v], l = Math.abs(u - m),
                            u && l < .8 * n && (null === r || l < .8 * r) ? (p[q[v]] && !p[q[v + 1]] ? (l = v + 1, u = m) : l = v, q.splice(l, 1)) : u = m;
                }
                return q;
            }
            function k(a) { var f = this.ordinal.positions; if (!f)
                return a; var b = f.length - 1; if (0 > a)
                a = f[0];
            else if (a > b)
                a = f[b];
            else {
                b = Math.floor(a);
                var e = a - b;
            } return "undefined" !== typeof e && "undefined" !== typeof f[b] ? f[b] + (e ? e * (f[b + 1] - f[b]) : 0) : a; }
            function G(a) {
                var f = this.ordinal, b = f.positions;
                if (!b)
                    return a;
                var e = (a - (this.old ? this.old.min : this.min)) * (this.old ? this.old.transA : this.transA) + this.minPixelPadding;
                0 < e && e < this.left +
                    this.len || (f.extendedOrdinalPositions || (f.extendedOrdinalPositions = f.getExtendedPositions()), b = f.extendedOrdinalPositions);
                if (b && b.length) {
                    a = f.getIndexOfPoint(e, b);
                    f = C(a % 1);
                    if (0 <= a && a < b.length - 1)
                        return b[Math.floor(a)] + f * (b[Math.ceil(a)] - b[Math.floor(a)]);
                    f = b.length;
                    e = b[0];
                    b = b[f - 1];
                    var c = (b - e) / (f - 1);
                    return 0 > a ? e + c * a : b + c * (a - f);
                }
                return a;
            }
            function F(e, f) { var b = a.Additions.findIndexOf(e, f, !0); return e[b] === f ? b : b + (f - e[b]) / (e[b + 1] - e[b]); }
            function E() { this.ordinal || (this.ordinal = new a.Additions(this)); }
            function J() {
                this.isXAxis &&
                    A(this.options.overscroll) && this.max === this.dataMax && (!this.chart.mouseIsDown || this.isInternal) && (!this.eventArgs || this.eventArgs && "navigator" !== this.eventArgs.trigger) && (this.max += this.options.overscroll, !this.isInternal && A(this.userMin) && (this.min += this.options.overscroll));
            }
            function y() { this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData); }
            function z() { this.ordinal && (this.ordinal.beforeSetTickPositions(), this.tickInterval = this.ordinal.postProcessTickInterval(this.tickInterval)); }
            function w(a) {
                var f = this.xAxis[0], b = f.options.overscroll, e = a.originalEvent.chartX, c = this.options.chart.panning, d = !1;
                if (c && "y" !== c.type && f.options.ordinal && f.series.length) {
                    var h = this.mouseDownX, g = f.getExtremes(), k = g.dataMax, n = g.min, m = g.max, l = this.hoverPoints, r = f.closestPointRange || f.ordinal && f.ordinal.overscrollPointsRange;
                    h = (h - e) / (f.translationSlope * (f.ordinal.slope || r));
                    r = f.ordinal.getExtendedPositions();
                    r = { ordinal: { positions: r, extendedOrdinalPositions: r } };
                    var q = f.index2val, t = f.val2lin, w = void 0, v = w = void 0, y = void 0;
                    r.ordinal.positions ? 1 < Math.abs(h) && (l && l.forEach(function (b) { b.setState(); }), 0 > h ? (v = r, y = f.ordinal.positions ? f : r) : (v = f.ordinal.positions ? f : r, y = r), w = y.ordinal.positions, k > w[w.length - 1] && w.push(k), this.fixedRange = m - n, w = f.navigatorAxis.toFixedRange(void 0, void 0, q.apply(v, [t.apply(v, [n, !0]) + h]), q.apply(y, [t.apply(y, [m, !0]) + h])), w.min >= Math.min(g.dataMin, n) && w.max <= Math.max(k, m) + b && f.setExtremes(w.min, w.max, !0, !1, { trigger: "pan" }), this.mouseDownX = e, I(this.container, { cursor: "move" })) :
                        d = !0;
                }
                else
                    d = !0;
                d || c && /y/.test(c.type) ? b && (f.max = f.dataMax + b) : a.preventDefault();
            }
            function e() { var a = this.xAxis; a && a.options.ordinal && (delete a.ordinal.index, delete a.ordinal.extendedOrdinalPositions); }
            function r(a, f) {
                var b = this.ordinal, e = b.positions, c = b.slope, d = b.extendedOrdinalPositions;
                if (!e)
                    return a;
                var h = e.length;
                if (e[0] <= a && e[h - 1] >= a)
                    a = F(e, a);
                else {
                    d || (d = b.getExtendedPositions && b.getExtendedPositions(), b.extendedOrdinalPositions = d);
                    if (!d || !d.length)
                        return a;
                    h = d.length;
                    c || (c = (d[h - 1] - d[0]) / h);
                    e = F(d, e[0]);
                    a >= d[0] && a <= d[h - 1] ? a = F(d, a) - e : a < d[0] ? (a = d[0] - a, a = -e - a / c) : (a -= d[h - 1], a = a / c + h - e);
                }
                return f ? a : c * (a || 0) + b.offset;
            }
            a.compose = function (a, f, b) { if (-1 === l.indexOf(a)) {
                l.push(a);
                var c = a.prototype;
                c.getTimeTicks = d;
                c.index2val = k;
                c.lin2val = G;
                c.val2lin = r;
                c.ordinal2lin = c.val2lin;
                x(a, "afterInit", E);
                x(a, "foundExtremes", J);
                x(a, "afterSetScale", y);
                x(a, "initialAxisTranslation", z);
            } -1 === l.indexOf(b) && (l.push(b), x(b, "pan", w)); -1 === l.indexOf(f) && (l.push(f), x(f, "updatedData", e)); return a; };
            var h = function () {
                function a(a) {
                    this.index =
                        {};
                    this.axis = a;
                }
                a.prototype.beforeSetTickPositions = function () {
                    var a = this.axis, b = a.ordinal, e = a.getExtremes(), c = e.min, d = e.max, h = a.isXAxis && !!a.options.breaks;
                    e = a.options.ordinal;
                    var g = a.chart.options.chart.ignoreHiddenSeries, k, n, m = [], l = Number.MAX_VALUE, r = !1, t = !1, w = !1;
                    if (e || h) {
                        var v = 0;
                        a.series.forEach(function (b, a) {
                            k = [];
                            0 < a && "highcharts-navigator-series" !== b.options.id && (t = v !== b.processedXData[1] - b.processedXData[0]);
                            v = b.processedXData[1] - b.processedXData[0];
                            b.isSeriesBoosting && (w = b.isSeriesBoosting);
                            if (!(g && !1 === b.visible || !1 === b.takeOrdinalPosition && !h) && (m = m.concat(b.processedXData), y = m.length, m.sort(function (b, a) { return b - a; }), l = Math.min(l, q(b.closestPointRange, l)), y)) {
                                for (a = 0; a < y - 1;)
                                    m[a] !== m[a + 1] && k.push(m[a + 1]), a++;
                                k[0] !== m[0] && k.unshift(m[0]);
                                m = k;
                            }
                        });
                        t && w && (m.pop(), m.shift());
                        var y = m.length;
                        if (2 < y) {
                            var z = m[1] - m[0];
                            for (n = y - 1; n-- && !r;)
                                m[n + 1] - m[n] !== z && (r = !0);
                            !a.options.keepOrdinalPadding && (m[0] - c > z || d - m[m.length - 1] > z) && (r = !0);
                        }
                        else
                            a.options.overscroll && (2 === y ? l = m[1] - m[0] : 1 === y ? (l = a.options.overscroll,
                                m = [m[0], m[0] + l]) : l = b.overscrollPointsRange);
                        r || a.forceOrdinal ? (a.options.overscroll && (b.overscrollPointsRange = l, m = m.concat(b.getOverscrollPositions())), b.positions = m, z = a.ordinal2lin(Math.max(c, m[0]), !0), n = Math.max(a.ordinal2lin(Math.min(d, m[m.length - 1]), !0), 1), b.slope = d = (d - c) / (n - z), b.offset = c - z * d) : (b.overscrollPointsRange = q(a.closestPointRange, b.overscrollPointsRange), b.positions = a.ordinal.slope = b.offset = void 0);
                    }
                    a.isOrdinal = e && r;
                    b.groupIntervalFactor = null;
                };
                a.findIndexOf = function (a, b, e) {
                    for (var f = 0, c = a.length - 1, d; f < c;)
                        d = Math.ceil((f + c) / 2), a[d] <= b ? f = d : c = d - 1;
                    return a[f] === b ? f : e ? f : -1;
                };
                a.prototype.getExtendedPositions = function () {
                    var a = this, b = a.axis, e = b.constructor.prototype, c = b.chart, d = b.series[0].currentDataGrouping, h = d ? d.count + d.unitName : "raw", k = b.options.overscroll, n = b.getExtremes(), m = void 0, l = a.index;
                    l || (l = a.index = {});
                    if (!l[h]) {
                        var r = { series: [], chart: c, forceOrdinal: !1, getExtremes: function () { return { min: n.dataMin, max: n.dataMax + k }; }, getGroupPixelWidth: e.getGroupPixelWidth, getTimeTicks: e.getTimeTicks,
                            options: { ordinal: !0 }, ordinal: { getGroupIntervalFactor: this.getGroupIntervalFactor }, ordinal2lin: e.ordinal2lin, getIndexOfPoint: e.getIndexOfPoint, val2lin: e.val2lin };
                        r.ordinal.axis = r;
                        b.series.forEach(function (b) {
                            m = { xAxis: r, xData: b.xData.slice(), chart: c, destroyGroupedData: g.noop, getProcessedData: B.prototype.getProcessedData, applyGrouping: B.prototype.applyGrouping };
                            m.xData = m.xData.concat(a.getOverscrollPositions());
                            m.options = { dataGrouping: d ? { firstAnchor: "firstPoint", anchor: "middle", lastAnchor: "lastPoint",
                                    enabled: !0, forced: !0, approximation: "open", units: [[d.unitName, [d.count]]] } : { enabled: !1 } };
                            r.series.push(m);
                            b.processData.apply(m);
                        });
                        m.closestPointRange !== m.basePointRange && m.currentDataGrouping && (r.forceOrdinal = !0);
                        b.ordinal.beforeSetTickPositions.apply({ axis: r });
                        l[h] = r.ordinal.positions;
                    }
                    return l[h];
                };
                a.prototype.getGroupIntervalFactor = function (a, b, e) {
                    e = e.processedXData;
                    var f = e.length, c = [];
                    var d = this.groupIntervalFactor;
                    if (!d) {
                        for (d = 0; d < f - 1; d++)
                            c[d] = e[d + 1] - e[d];
                        c.sort(function (b, a) { return b - a; });
                        c = c[Math.floor(f /
                            2)];
                        a = Math.max(a, e[0]);
                        b = Math.min(b, e[f - 1]);
                        this.groupIntervalFactor = d = f * c / (b - a);
                    }
                    return d;
                };
                a.prototype.getIndexOfPoint = function (f, b) {
                    var e = this.axis, c = this.positions ? this.positions[0] : 0, d = e.series[0].points && e.series[0].points[0] && e.series[0].points[0].plotX || e.minPixelPadding;
                    1 < e.series.length && e.series.forEach(function (b) { b.points && A(b.points[0]) && A(b.points[0].plotX) && b.points[0].plotX < d && (d = b.points[0].plotX); });
                    f = (f - d) / (e.translationSlope * (this.slope || e.closestPointRange || this.overscrollPointsRange));
                    return a.findIndexOf(b, c) + f;
                };
                a.prototype.getOverscrollPositions = function () { var a = this.axis, b = a.options.overscroll, e = this.overscrollPointsRange, c = [], d = a.dataMax; if (A(e))
                    for (; d <= a.dataMax + b;)
                        d += e, c.push(d); return c; };
                a.prototype.postProcessTickInterval = function (a) { var b = this.axis, f = this.slope; return f ? b.options.breaks ? b.closestPointRange || a : a / (f / b.closestPointRange) : a; };
                return a;
            }();
            a.Additions = h;
        })(a || (a = {}));
        return a;
    });
    P(g, "Series/DataModifyComposition.js", [g["Core/Axis/Axis.js"], g["Core/Series/Point.js"],
        g["Core/Series/Series.js"], g["Core/Utilities.js"]], function (d, g, B, E) {
        var x = g.prototype.tooltipFormatter, C = E.addEvent, I = E.arrayMax, A = E.arrayMin, t = E.correctFloat, q = E.defined, c = E.isArray, l = E.isNumber, a = E.isString, k = E.pick, v;
        (function (d) {
            function g(f, b, e) { this.isXAxis || (this.series.forEach(function (e) { "compare" === f && "boolean" !== typeof b ? e.setCompare(b, !1) : "cumulative" !== f || a(b) || e.setCumulative(b, !1); }), k(e, !0) && this.chart.redraw()); }
            function m(a) {
                var b = this, f = b.series.chart.numberFormatter, e = function (e) {
                    a =
                        a.replace("{point." + e + "}", (0 < b[e] && "change" === e ? "+" : "") + f(b[e], k(b.series.tooltipOptions.changeDecimals, 2)));
                };
                q(b.change) && e("change");
                q(b.cumulativeSum) && e("cumulativeSum");
                return x.apply(this, [a]);
            }
            function v() { var a = this.options.compare; if ("percent" === a || "value" === a || this.options.cumulative) {
                var b = new n(this);
                "percent" === a || "value" === a ? b.initCompare(a) : b.initCumulative();
            } this.dataModify = b; }
            function B(a) {
                a = a.dataExtremes;
                var b = a.activeYData;
                if (this.dataModify && a) {
                    var f = void 0;
                    this.options.compare ?
                        f = [this.dataModify.modifyValue(a.dataMin), this.dataModify.modifyValue(a.dataMax)] : this.options.cumulative && c(b) && 2 <= b.length && (f = n.getCumulativeExtremes(b));
                    f && (a.dataMin = A(f), a.dataMax = I(f));
                }
            }
            function y(a, b) { this.options.compare = this.userOptions.compare = a; this.update({}, k(b, !0)); !this.dataModify || "value" !== a && "percent" !== a ? this.points.forEach(function (b) { delete b.change; }) : this.dataModify.initCompare(a); }
            function z() {
                if (this.xAxis && this.processedYData && this.dataModify) {
                    var a = this.processedXData, b = this.processedYData, e = b.length, c = !0 === this.options.compareStart ? 0 : 1, d = -1, h;
                    this.pointArrayMap && (d = this.pointArrayMap.indexOf(this.options.pointValKey || this.pointValKey || "y"));
                    for (h = 0; h < e - c; h++) {
                        var g = b[h] && -1 < d ? b[h][d] : b[h];
                        if (l(g) && 0 !== g && a[h + c] >= (this.xAxis.min || 0)) {
                            this.dataModify.compareValue = g;
                            break;
                        }
                    }
                }
            }
            function w(a, b) { this.setModifier("compare", a, b); }
            function e(a, b) {
                a = k(a, !1);
                this.options.cumulative = this.userOptions.cumulative = a;
                this.update({}, k(b, !0));
                this.dataModify ? this.dataModify.initCumulative() :
                    this.points.forEach(function (b) { delete b.cumulativeSum; });
            }
            function r(a, b) { this.setModifier("cumulative", a, b); }
            var h = [];
            d.compose = function (a, b, c) { if (-1 === h.indexOf(a)) {
                h.push(a);
                var f = a.prototype;
                f.setCompare = y;
                f.setCumulative = e;
                C(a, "afterInit", v);
                C(a, "afterGetExtremes", B);
                C(a, "afterProcessData", z);
            } -1 === h.indexOf(b) && (h.push(b), b = b.prototype, b.setCompare = w, b.setModifier = g, b.setCumulative = r); -1 === h.indexOf(c) && (h.push(c), c.prototype.tooltipFormatter = m); return a; };
            var n = function () {
                function a(b) {
                    this.series =
                        b;
                }
                a.prototype.modifyValue = function () { return 0; };
                a.getCumulativeExtremes = function (b) { var a = Infinity, f = -Infinity; b.reduce(function (b, e) { e = b + e; a = Math.min(a, e, b); f = Math.max(f, e, b); return e; }); return [a, f]; };
                a.prototype.initCompare = function (b) { this.modifyValue = function (a, f) { null === a && (a = 0); var e = this.compareValue; return "undefined" !== typeof a && "undefined" !== typeof e ? (a = "value" === b ? a - e : a / e * 100 - (100 === this.series.options.compareBase ? 0 : 100), "undefined" !== typeof f && (f = this.series.points[f]) && (f.change = a), a) : 0; }; };
                a.prototype.initCumulative = function () { this.modifyValue = function (b, a) { null === b && (b = 0); if (void 0 !== b && void 0 !== a) {
                    var f = 0 < a ? this.series.points[a - 1] : null;
                    f && f.cumulativeSum && (b = t(f.cumulativeSum + b));
                    if (a = this.series.points[a])
                        a.cumulativeSum = b;
                    return b;
                } return 0; }; };
                return a;
            }();
            d.Additions = n;
        })(v || (v = {}));
        "";
        return v;
    });
    P(g, "Core/Axis/BrokenAxis.js", [g["Extensions/Stacking.js"], g["Core/Utilities.js"]], function (d, g) {
        var B = g.addEvent, C = g.find, x = g.fireEvent, G = g.isArray, I = g.isNumber, A = g.pick, t;
        (function (g) {
            function c() {
                "undefined" !==
                    typeof this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1);
            }
            function l() { this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1); }
            function a() { var a = this.brokenAxis; if (a && a.hasBreaks) {
                for (var c = this.tickPositions, d = this.tickPositions.info, e = [], g = 0; g < c.length; g++)
                    a.isInAnyBreak(c[g]) || e.push(c[g]);
                this.tickPositions = e;
                this.tickPositions.info = d;
            } }
            function k() { this.brokenAxis || (this.brokenAxis = new J(this)); }
            function q() {
                var a = this.options.connectNulls, c = this.points, d = this.xAxis, e = this.yAxis;
                if (this.isDirty)
                    for (var g = c.length; g--;) {
                        var h = c[g], k = !(null === h.y && !1 === a) && (d && d.brokenAxis && d.brokenAxis.isInAnyBreak(h.x, !0) || e && e.brokenAxis && e.brokenAxis.isInAnyBreak(h.y, !0));
                        h.visible = k ? !1 : !1 !== h.options.visible;
                    }
            }
            function m() { this.drawBreaks(this.xAxis, ["x"]); this.drawBreaks(this.yAxis, A(this.pointArrayMap, ["y"])); }
            function t(a, c) {
                var d = this, e = d.points, g, h, k, f;
                if (a && a.brokenAxis && a.brokenAxis.hasBreaks) {
                    var b = a.brokenAxis;
                    c.forEach(function (c) {
                        g = b && b.breakArray || [];
                        h = a.isXAxis ?
                            a.min : A(d.options.threshold, a.min);
                        e.forEach(function (b) { f = A(b["stack" + c.toUpperCase()], b[c]); g.forEach(function (e) { if (I(h) && I(f)) {
                            k = !1;
                            if (h < e.from && f > e.to || h > e.from && f < e.from)
                                k = "pointBreak";
                            else if (h < e.from && f > e.from && f < e.to || h > e.from && f > e.to && f < e.from)
                                k = "pointInBreak";
                            k && x(a, k, { point: b, brk: e });
                        } }); });
                    });
                }
            }
            function F() {
                var a = this.currentDataGrouping, c = a && a.gapSize;
                a = this.points.slice();
                var g = this.yAxis, e = this.options.gapSize, k = a.length - 1, h;
                if (e && 0 < k)
                    for ("value" !== this.options.gapUnit && (e *= this.basePointRange),
                        c && c > e && c >= this.basePointRange && (e = c), h = void 0; k--;)
                        h && !1 !== h.visible || (h = a[k + 1]), c = a[k], !1 !== h.visible && !1 !== c.visible && (h.x - c.x > e && (h = (c.x + h.x) / 2, a.splice(k + 1, 0, { isNull: !0, x: h }), g.stacking && this.options.stacking && (h = g.stacking.stacks[this.stackKey][h] = new d(g, g.options.stackLabels, !1, h, this.stack), h.total = 0)), h = c);
                return this.getGraphPath(a);
            }
            var E = [];
            g.compose = function (d, g) {
                -1 === E.indexOf(d) && (E.push(d), d.keepProps.push("brokenAxis"), B(d, "init", k), B(d, "afterInit", c), B(d, "afterSetTickPositions", a), B(d, "afterSetOptions", l));
                if (-1 === E.indexOf(g)) {
                    E.push(g);
                    var w = g.prototype;
                    w.drawBreaks = t;
                    w.gappedPath = F;
                    B(g, "afterGeneratePoints", q);
                    B(g, "afterRender", m);
                }
                return d;
            };
            var J = function () {
                function a(a) { this.hasBreaks = !1; this.axis = a; }
                a.isInBreak = function (a, c) { var e = a.repeat || Infinity, d = a.from, h = a.to - a.from; c = c >= d ? (c - d) % e : e - (d - c) % e; return a.inclusive ? c <= h : c < h && 0 !== c; };
                a.lin2Val = function (c) {
                    var d = this.brokenAxis;
                    d = d && d.breakArray;
                    if (!d || !I(c))
                        return c;
                    var e;
                    for (e = 0; e < d.length; e++) {
                        var g = d[e];
                        if (g.from >=
                            c)
                            break;
                        else
                            g.to < c ? c += g.len : a.isInBreak(g, c) && (c += g.len);
                    }
                    return c;
                };
                a.val2Lin = function (c) { var d = this.brokenAxis; d = d && d.breakArray; if (!d || !I(c))
                    return c; var e = c, g; for (g = 0; g < d.length; g++) {
                    var h = d[g];
                    if (h.to <= c)
                        e -= h.len;
                    else if (h.from >= c)
                        break;
                    else if (a.isInBreak(h, c)) {
                        e -= c - h.from;
                        break;
                    }
                } return e; };
                a.prototype.findBreakAt = function (a, c) { return C(c, function (e) { return e.from < a && a < e.to; }); };
                a.prototype.isInAnyBreak = function (c, d) {
                    var e = this.axis, g = e.options.breaks || [], h = g.length, k;
                    if (h && I(c)) {
                        for (; h--;)
                            if (a.isInBreak(g[h], c)) {
                                var f = !0;
                                k || (k = A(g[h].showPoints, !e.isXAxis));
                            }
                        var b = f && d ? f && !k : f;
                    }
                    return b;
                };
                a.prototype.setBreaks = function (c, d) {
                    var e = this, g = e.axis, h = G(c) && !!c.length;
                    g.isDirty = e.hasBreaks !== h;
                    e.hasBreaks = h;
                    g.options.breaks = g.userOptions.breaks = c;
                    g.forceRedraw = !0;
                    g.series.forEach(function (a) { a.isDirty = !0; });
                    h || g.val2lin !== a.val2Lin || (delete g.val2lin, delete g.lin2val);
                    h && (g.userOptions.ordinal = !1, g.lin2val = a.lin2Val, g.val2lin = a.val2Lin, g.setExtremes = function (a, c, b, d, h) {
                        if (e.hasBreaks) {
                            for (var f = this.options.breaks ||
                                [], k; k = e.findBreakAt(a, f);)
                                a = k.to;
                            for (; k = e.findBreakAt(c, f);)
                                c = k.from;
                            c < a && (c = a);
                        }
                        g.constructor.prototype.setExtremes.call(this, a, c, b, d, h);
                    }, g.setAxisTranslation = function () {
                        g.constructor.prototype.setAxisTranslation.call(this);
                        e.unitLength = void 0;
                        if (e.hasBreaks) {
                            var c = g.options.breaks || [], f = [], b = [], d = A(g.pointRangePadding, 0), h = 0, p, k = g.userMin || g.min, m = g.userMax || g.max, l;
                            c.forEach(function (b) { p = b.repeat || Infinity; I(k) && I(m) && (a.isInBreak(b, k) && (k += b.to % p - k % p), a.isInBreak(b, m) && (m -= m % p - b.from % p)); });
                            c.forEach(function (b) {
                                r =
                                    b.from;
                                p = b.repeat || Infinity;
                                if (I(k) && I(m)) {
                                    for (; r - p > k;)
                                        r -= p;
                                    for (; r < k;)
                                        r += p;
                                    for (l = r; l < m; l += p)
                                        f.push({ value: l, move: "in" }), f.push({ value: l + b.to - b.from, move: "out", size: b.breakSize });
                                }
                            });
                            f.sort(function (b, a) { return b.value === a.value ? ("in" === b.move ? 0 : 1) - ("in" === a.move ? 0 : 1) : b.value - a.value; });
                            var q = 0;
                            var r = k;
                            f.forEach(function (a) { q += "in" === a.move ? 1 : -1; 1 === q && "in" === a.move && (r = a.value); 0 === q && I(r) && (b.push({ from: r, to: a.value, len: a.value - r - (a.size || 0) }), h += a.value - r - (a.size || 0)); });
                            e.breakArray = b;
                            I(k) && I(m) &&
                                I(g.min) && (e.unitLength = m - k - h + d, x(g, "afterBreaks"), g.staticScale ? g.transA = g.staticScale : e.unitLength && (g.transA *= (m - g.min + d) / e.unitLength), d && (g.minPixelPadding = g.transA * (g.minPointOffset || 0)), g.min = k, g.max = m);
                        }
                    });
                    A(d, !0) && g.chart.redraw();
                };
                return a;
            }();
            g.Additions = J;
        })(t || (t = {}));
        return t;
    });
    P(g, "masters/modules/broken-axis.src.js", [g["Core/Globals.js"], g["Core/Axis/BrokenAxis.js"]], function (d, g) { g.compose(d.Axis, d.Series); });
    P(g, "Extensions/DataGrouping.js", [g["Core/Axis/Axis.js"], g["Core/Axis/DateTimeAxis.js"],
        g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Series/Point.js"], g["Core/Series/Series.js"], g["Core/Tooltip.js"], g["Core/DefaultOptions.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A, t) {
        var q = B.format, c = G.prototype;
        B = t.addEvent;
        var l = t.arrayMax, a = t.arrayMin, k = t.correctFloat, v = t.defined, m = t.error, C = t.extend, F = t.isNumber, L = t.merge, J = t.pick;
        "";
        var y = E.approximations = { sum: function (a) { var c = a.length; if (!c && a.hasNulls)
                var b = null;
            else if (c)
                for (b = 0; c--;)
                    b += a[c]; return b; }, average: function (a) {
                var c = a.length;
                a = y.sum(a);
                F(a) && c && (a = k(a / c));
                return a;
            }, averages: function () { var a = []; [].forEach.call(arguments, function (c) { a.push(y.average(c)); }); return "undefined" === typeof a[0] ? void 0 : a; }, open: function (a) { return a.length ? a[0] : a.hasNulls ? null : void 0; }, high: function (a) { return a.length ? l(a) : a.hasNulls ? null : void 0; }, low: function (c) { return c.length ? a(c) : c.hasNulls ? null : void 0; }, close: function (a) { return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0; }, hlc: function (a, c, b) {
                a = y.high(a);
                c = y.low(c);
                b = y.close(b);
                if (F(a) ||
                    F(c) || F(b))
                    return [a, c, b];
            }, ohlc: function (a, c, b, e) { a = y.open(a); c = y.high(c); b = y.low(b); e = y.close(e); if (F(a) || F(c) || F(b) || F(e))
                return [a, c, b, e]; }, range: function (a, c) { a = y.low(a); c = y.high(c); if (F(a) || F(c))
                return [a, c]; if (null === a && null === c)
                return null; } };
        t = function (a, c, b, e) {
            var f = this, d = f.data, h = f.options && f.options.data, g = [], k = [], m = [], n = a.length, l = !!c, q = [], r = f.pointArrayMap, t = r && r.length, w = ["x"].concat(r || ["y"]), D = this.options.dataGrouping && this.options.dataGrouping.groupAll, x = 0, z = 0, A;
            e = "function" === typeof e ?
                e : y[e] ? y[e] : y[f.getDGApproximation && f.getDGApproximation() || "average"];
            t ? r.forEach(function () { q.push([]); }) : q.push([]);
            var B = t || 1;
            for (A = 0; A <= n && !(a[A] >= b[0]); A++)
                ;
            for (A; A <= n; A++) {
                for (; "undefined" !== typeof b[x + 1] && a[A] >= b[x + 1] || A === n;) {
                    var C = b[x];
                    f.dataGroupInfo = { start: D ? z : f.cropStart + z, length: q[0].length };
                    var E = e.apply(f, q);
                    f.pointClass && !v(f.dataGroupInfo.options) && (f.dataGroupInfo.options = L(f.pointClass.prototype.optionsToObject.call({ series: f }, f.options.data[f.cropStart + z])), w.forEach(function (b) { delete f.dataGroupInfo.options[b]; }));
                    "undefined" !== typeof E && (g.push(C), k.push(E), m.push(f.dataGroupInfo));
                    z = A;
                    for (C = 0; C < B; C++)
                        q[C].length = 0, q[C].hasNulls = !1;
                    x += 1;
                    if (A === n)
                        break;
                }
                if (A === n)
                    break;
                if (r) {
                    C = f.options.dataGrouping && f.options.dataGrouping.groupAll ? A : f.cropStart + A;
                    E = d && d[C] || f.pointClass.prototype.applyOptions.apply({ series: f }, [h[C]]);
                    var G = void 0;
                    for (C = 0; C < t; C++)
                        G = E[r[C]], F(G) ? q[C].push(G) : null === G && (q[C].hasNulls = !0);
                }
                else
                    C = l ? c[A] : null, F(C) ? q[0].push(C) : null === C && (q[0].hasNulls = !0);
            }
            return { groupedXData: g, groupedYData: k, groupMap: m };
        };
        var z = { approximations: y, groupData: t }, w = c.generatePoints, e = { groupPixelWidth: 2, dateTimeLabelFormats: { millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"], second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"], minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"], day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"], month: ["%B %Y", "%B", "-%B %Y"], year: ["%Y",
                    "%Y", "-%Y"] } }, r = { line: {}, spline: {}, area: {}, areaspline: {}, arearange: {}, column: { groupPixelWidth: 10 }, columnrange: { groupPixelWidth: 10 }, candlestick: { groupPixelWidth: 10 }, ohlc: { groupPixelWidth: 5 }, hlc: { groupPixelWidth: 5 }, heikinashi: { groupPixelWidth: 10 } }, h = E.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]];
        c.getDGApproximation = function () {
            return this.is("arearange") ?
                "range" : this.is("ohlc") ? "ohlc" : this.is("hlc") ? "hlc" : this.is("column") ? "sum" : "average";
        };
        c.groupData = t;
        c.applyGrouping = function (a) {
            var e = this.chart, b = this.options.dataGrouping, d = !1 !== this.allowDG && b && J(b.enabled, e.options.isStock), k = this.visible || !e.options.chart.ignoreHiddenSeries, p, n = this.currentDataGrouping, l = !1;
            d && !this.requireSorting && (this.requireSorting = l = !0);
            a = !1 === !(this.isCartesian && !this.isDirty && !this.xAxis.isDirty && !this.yAxis.isDirty && !a) || !d;
            l && (this.requireSorting = !1);
            if (!a) {
                this.destroyGroupedData();
                d = b.groupAll ? this.xData : this.processedXData;
                var q = b.groupAll ? this.yData : this.processedYData;
                a = e.plotSizeX;
                l = this.xAxis;
                var r = l.options.ordinal, t = this.groupPixelWidth;
                if (t && d && d.length) {
                    this.isDirty = p = !0;
                    this.points = null;
                    var w = l.getExtremes();
                    var y = w.min;
                    w = w.max;
                    r = r && l.ordinal && l.ordinal.getGroupIntervalFactor(y, w, this) || 1;
                    a = l.getTimeTicks(g.Additions.prototype.normalizeTimeTickInterval(t * (w - y) / a * r, b.units || h), Math.min(y, d[0]), Math.max(w, d[d.length - 1]), l.options.startOfWeek, d, this.closestPointRange);
                    t = c.groupData.apply(this, [d, q, a, b.approximation]);
                    d = t.groupedXData;
                    q = t.groupedYData;
                    r = 0;
                    b && b.smoothed && d.length && (b.firstAnchor = "firstPoint", b.anchor = "middle", b.lastAnchor = "lastPoint", m(32, !1, e, { "dataGrouping.smoothed": "use dataGrouping.anchor" }));
                    e = d;
                    var x = this.options.dataGrouping;
                    y = this.currentDataGrouping && this.currentDataGrouping.gapSize;
                    if (x && this.xData && y && this.groupMap) {
                        var z = e.length - 1;
                        var A = x.anchor;
                        var B = J(x.firstAnchor, A);
                        x = J(x.lastAnchor, A);
                        if (A && "start" !== A) {
                            var C = y * { middle: .5, end: 1 }[A];
                            for (A = e.length - 1; A-- && 0 < A;)
                                e[A] += C;
                        }
                        if (B && "start" !== B && this.xData[0] >= e[0]) {
                            A = this.groupMap[0].start;
                            C = this.groupMap[0].length;
                            var E = void 0;
                            F(A) && F(C) && (E = A + (C - 1));
                            e[0] = { middle: e[0] + .5 * y, end: e[0] + y, firstPoint: this.xData[0], lastPoint: E && this.xData[E] }[B];
                        }
                        x && "start" !== x && y && e[z] >= w - y && (w = this.groupMap[this.groupMap.length - 1].start, e[z] = { middle: e[z] + .5 * y, end: e[z] + y, firstPoint: w && this.xData[w], lastPoint: this.xData[this.xData.length - 1] }[x]);
                    }
                    for (w = 1; w < a.length; w++)
                        a.info.segmentStarts && -1 !== a.info.segmentStarts.indexOf(w) ||
                            (r = Math.max(a[w] - a[w - 1], r));
                    w = a.info;
                    w.gapSize = r;
                    this.closestPointRange = a.info.totalRange;
                    this.groupMap = t.groupMap;
                    if (k) {
                        k = d;
                        if (v(k[0]) && F(l.min) && F(l.dataMin) && k[0] < l.min) {
                            if (!v(l.options.min) && l.min <= l.dataMin || l.min === l.dataMin)
                                l.min = Math.min(k[0], l.min);
                            l.dataMin = Math.min(k[0], l.dataMin);
                        }
                        if (v(k[k.length - 1]) && F(l.max) && F(l.dataMax) && k[k.length - 1] > l.max) {
                            if (!v(l.options.max) && F(l.dataMax) && l.max >= l.dataMax || l.max === l.dataMax)
                                l.max = Math.max(k[k.length - 1], l.max);
                            l.dataMax = Math.max(k[k.length - 1], l.dataMax);
                        }
                    }
                    b.groupAll &&
                        (this.allGroupedData = q, b = this.cropData(d, q, l.min, l.max, 1), d = b.xData, q = b.yData, this.cropStart = b.start);
                    this.processedXData = d;
                    this.processedYData = q;
                }
                else
                    this.groupMap = null;
                this.hasGroupedData = p;
                this.currentDataGrouping = w;
                this.preventGraphAnimation = (n && n.totalRange) !== (w && w.totalRange);
            }
        };
        c.destroyGroupedData = function () { this.groupedData && (this.groupedData.forEach(function (a, c) { a && (this.groupedData[c] = a.destroy ? a.destroy() : null); }, this), this.groupedData.length = 0); };
        c.generatePoints = function () {
            w.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null;
        };
        d.prototype.applyGrouping = function (a) { var c = this, b = c.series; b.forEach(function (b) { b.groupPixelWidth = void 0; }); b.forEach(function (b) { b.groupPixelWidth = c.getGroupPixelWidth && c.getGroupPixelWidth(); b.groupPixelWidth && (b.hasProcessed = !0); b.applyGrouping(!!a.hasExtemesChanged); }); };
        d.prototype.getGroupPixelWidth = function () {
            var a = this.series, c = a.length, b, d = 0, h = !1, g;
            for (b = c; b--;)
                (g = a[b].options.dataGrouping) && (d = Math.max(d, J(g.groupPixelWidth, e.groupPixelWidth)));
            for (b = c; b--;)
                if (g = a[b].options.dataGrouping)
                    if (c = (a[b].processedXData || a[b].data).length, a[b].groupPixelWidth || c > this.chart.plotSizeX / d || c && g.forced)
                        h = !0;
            return h ? d : 0;
        };
        d.prototype.setDataGrouping = function (a, c) {
            var b;
            c = J(c, !0);
            a || (a = { forced: !1, units: null });
            if (this instanceof d)
                for (b = this.series.length; b--;)
                    this.series[b].update({ dataGrouping: a }, !1);
            else
                this.chart.options.series.forEach(function (b) { b.dataGrouping = "boolean" === typeof a ? a : L(a, b.dataGrouping); });
            this.ordinal && (this.ordinal.slope =
                void 0);
            c && this.chart.redraw();
        };
        B(d, "postProcessData", d.prototype.applyGrouping);
        B(x, "update", function () { if (this.dataGroup)
            return m(24, !1, this.series.chart), !1; });
        B(I, "headerFormatter", function (a) {
            var c = this.chart, b = c.time, d = a.labelConfig, h = d.series, g = h.tooltipOptions, k = h.options.dataGrouping, m = g.xDateFormat, l = h.xAxis, n = g[a.isFooter ? "footerFormat" : "headerFormat"];
            if (l && "datetime" === l.options.type && k && F(d.key)) {
                var r = h.currentDataGrouping;
                k = k.dateTimeLabelFormats || e.dateTimeLabelFormats;
                if (r)
                    if (g = k[r.unitName],
                        1 === r.count)
                        m = g[0];
                    else {
                        m = g[1];
                        var t = g[2];
                    }
                else
                    !m && k && l.dateTime && (m = l.dateTime.getXDateFormat(d.x, g.dateTimeLabelFormats));
                m = b.dateFormat(m, d.key);
                t && (m += b.dateFormat(t, d.key + r.totalRange - 1));
                h.chart.styledMode && (n = this.styledModeFormat(n));
                a.text = q(n, { point: C(d.point, { key: m }), series: h }, c);
                a.preventDefault();
            }
        });
        B(G, "destroy", c.destroyGroupedData);
        B(G, "afterSetOptions", function (a) {
            a = a.options;
            var c = this.type, b = this.chart.options.plotOptions, d = A.defaultOptions.plotOptions[c].dataGrouping, h = this.useCommonDataGrouping &&
                e;
            if (b && (r[c] || h)) {
                d || (d = L(e, r[c]));
                var g = this.chart.rangeSelector;
                a.dataGrouping = L(h, d, b.series && b.series.dataGrouping, b[c].dataGrouping, this.userOptions.dataGrouping, !a.isInternal && g && F(g.selected) && g.buttonOptions[g.selected].dataGrouping);
            }
        });
        B(d, "afterSetScale", function () { this.series.forEach(function (a) { a.hasProcessed = !1; }); });
        E.dataGrouping = z;
        "";
        return z;
    });
    P(g, "Series/HLC/HLCPoint.js", [g["Core/Series/SeriesRegistry.js"]], function (d) {
        var g = this && this.__extends || function () {
            var d = function (g, x) {
                d =
                    Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, g) { d.__proto__ = g; } || function (d, g) { for (var x in g)
                        g.hasOwnProperty(x) && (d[x] = g[x]); };
                return d(g, x);
            };
            return function (g, x) { function B() { this.constructor = g; } d(g, x); g.prototype = null === x ? Object.create(x) : (B.prototype = x.prototype, new B); };
        }();
        return function (d) { function B() { var g = null !== d && d.apply(this, arguments) || this; g.close = void 0; g.high = void 0; g.low = void 0; g.options = void 0; g.plotClose = void 0; g.series = void 0; return g; } g(B, d); return B; }(d.seriesTypes.column.prototype.pointClass);
    });
    P(g, "Series/HLC/HLCSeries.js", [g["Series/HLC/HLCPoint.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () { var d = function (g, q) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (c, d) { c.__proto__ = d; } || function (c, d) { for (var a in d)
            d.hasOwnProperty(a) && (c[a] = d[a]); }; return d(g, q); }; return function (g, q) { function c() { this.constructor = g; } d(g, q); g.prototype = null === q ? Object.create(q) : (c.prototype = q.prototype, new c); }; }(), x = g.seriesTypes.column, G = B.extend, I = B.merge;
        B = function (d) {
            function g() { var g = null !== d && d.apply(this, arguments) || this; g.data = void 0; g.options = void 0; g.points = void 0; g.yData = void 0; return g; }
            C(g, d);
            g.prototype.extendStem = function (d, c, g) { var a = d[0]; d = d[1]; "number" === typeof a[2] && (a[2] = Math.max(g + c, a[2])); "number" === typeof d[2] && (d[2] = Math.min(g - c, d[2])); };
            g.prototype.getPointPath = function (d, c) {
                c = c.strokeWidth();
                var g = d.series, a = c % 2 / 2, k = Math.round(d.plotX) - a, q = Math.round(d.shapeArgs.width / 2);
                var m = [["M", k, Math.round(d.yBottom)],
                    ["L", k, Math.round(d.plotHigh)]];
                null !== d.close && (d = Math.round(d.plotClose) + a, m.push(["M", k, d], ["L", k + q, d]), g.extendStem(m, c / 2, d));
                return m;
            };
            g.prototype.drawSinglePoint = function (d) { var c = d.series, g = c.chart, a = d.graphic, k = !a; "undefined" !== typeof d.plotY && (a || (d.graphic = a = g.renderer.path().add(c.group)), g.styledMode || a.attr(c.pointAttribs(d, d.selected && "select")), c = c.getPointPath(d, a), a[k ? "attr" : "animate"]({ d: c }).addClass(d.getClassName(), !0)); };
            g.prototype.drawPoints = function () { this.points.forEach(this.drawSinglePoint); };
            g.prototype.init = function () { d.prototype.init.apply(this, arguments); this.options.stacking = void 0; };
            g.prototype.pointAttribs = function (g, c) { g = d.prototype.pointAttribs.call(this, g, c); delete g.fill; return g; };
            g.prototype.toYData = function (d) { return [d.high, d.low, d.close]; };
            g.prototype.translate = function () {
                var g = this, c = g.yAxis, l = this.pointArrayMap && this.pointArrayMap.slice() || [], a = l.map(function (a) { return "plot".concat(a.charAt(0).toUpperCase() + a.slice(1)); });
                a.push("yBottom");
                l.push("low");
                d.prototype.translate.apply(g);
                g.points.forEach(function (d) { l.forEach(function (k, m) { k = d[k]; null !== k && (g.dataModify && (k = g.dataModify.modifyValue(k)), d[a[m]] = c.toPixels(k, !0)); }); d.tooltipPos[1] = d.plotHigh + c.pos - g.chart.plotTop; });
            };
            g.defaultOptions = I(x.defaultOptions, { lineWidth: 1, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' }, threshold: null, states: { hover: { lineWidth: 3 } }, stickyTracking: !0 });
            return g;
        }(x);
        G(B.prototype, { animate: null, directTouch: !1, pointArrayMap: ["high", "low", "close"], pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointValKey: "close" });
        B.prototype.pointClass = d;
        g.registerSeriesType("hlc", B);
        "";
        return B;
    });
    P(g, "Series/OHLC/OHLCPoint.js", [g["Core/Series/SeriesRegistry.js"]], function (d) {
        var g = this && this.__extends || function () {
            var d = function (g, x) {
                d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, g) { d.__proto__ = g; } || function (d, g) {
                    for (var x in g)
                        g.hasOwnProperty(x) && (d[x] =
                            g[x]);
                };
                return d(g, x);
            };
            return function (g, x) { function B() { this.constructor = g; } d(g, x); g.prototype = null === x ? Object.create(x) : (B.prototype = x.prototype, new B); };
        }();
        return function (d) {
            function B() { var g = null !== d && d.apply(this, arguments) || this; g.open = void 0; g.options = void 0; g.plotOpen = void 0; g.series = void 0; return g; }
            g(B, d);
            B.prototype.getClassName = function () { return d.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down"); };
            B.prototype.resolveUpColor = function () {
                this.open <
                    this.close && !this.options.color && this.series.options.upColor && (this.color = this.series.options.upColor);
            };
            B.prototype.resolveColor = function () { d.prototype.resolveColor.call(this); this.resolveUpColor(); };
            B.prototype.getZone = function () { var g = d.prototype.getZone.call(this); this.resolveUpColor(); return g; };
            B.prototype.applyOptions = function () { d.prototype.applyOptions.apply(this, arguments); this.resolveColor && this.resolveColor(); return this; };
            return B;
        }(d.seriesTypes.hlc.prototype.pointClass);
    });
    P(g, "Series/OHLC/OHLCSeries.js", [g["Series/OHLC/OHLCPoint.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () { var c = function (d, a) { c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return c(d, a); }; return function (d, a) { function g() { this.constructor = d; } c(d, a); d.prototype = null === a ? Object.create(a) : (g.prototype = a.prototype, new g); }; }(), x = g.series, G = g.seriesTypes.hlc, I = B.addEvent, A = B.extend, t = B.merge, q = function (c) {
            function d() { var a = null !== c && c.apply(this, arguments) || this; a.data = void 0; a.options = void 0; a.points = void 0; return a; }
            C(d, c);
            d.prototype.getPointPath = function (a, d) { var g = c.prototype.getPointPath.call(this, a, d); d = d.strokeWidth(); var k = d % 2 / 2, l = Math.round(a.plotX) - k, q = Math.round(a.shapeArgs.width / 2); null !== a.open && (a = Math.round(a.plotOpen) + k, g.push(["M", l, a], ["L", l - q, a]), c.prototype.extendStem.call(this, g, d / 2, a)); return g; };
            d.prototype.pointAttribs = function (a, d) {
                d = c.prototype.pointAttribs.call(this, a, d);
                var g = this.options;
                delete d.fill;
                !a.options.color && g.upColor && a.open < a.close && (d.stroke = g.upColor);
                return d;
            };
            d.prototype.toYData = function (a) { return [a.open, a.high, a.low, a.close]; };
            d.defaultOptions = t(G.defaultOptions, { tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>' } });
            return d;
        }(G);
        A(q.prototype, { pointArrayMap: ["open", "high", "low", "close"] });
        q.prototype.pointClass =
            d;
        g.registerSeriesType("ohlc", q);
        I(x, "init", function (c) { c = c.options; c.useOhlcData && "highcharts-navigator-series" !== c.id && A(this, { pointValKey: q.prototype.pointValKey, pointArrayMap: q.prototype.pointArrayMap, toYData: q.prototype.toYData }); });
        I(x, "afterSetOptions", function (c) { c = c.options; var d = c.dataGrouping; d && c.useOhlcData && "highcharts-navigator-series" !== c.id && (d.approximation = "ohlc"); });
        "";
        return q;
    });
    P(g, "Series/Candlestick/CandlestickSeries.js", [g["Core/DefaultOptions.js"], g["Core/Series/SeriesRegistry.js"],
        g["Core/Utilities.js"]], function (d, g, B) {
        var C = this && this.__extends || function () { var d = function (g, c) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (c, a) { c.__proto__ = a; } || function (c, a) { for (var d in a)
            a.hasOwnProperty(d) && (c[d] = a[d]); }; return d(g, c); }; return function (g, c) { function l() { this.constructor = g; } d(g, c); g.prototype = null === c ? Object.create(c) : (l.prototype = c.prototype, new l); }; }(), x = d.defaultOptions;
        d = g.seriesTypes;
        var G = d.column, I = d.ohlc, A = B.merge;
        B = function (d) {
            function g() {
                var c = null !==
                    d && d.apply(this, arguments) || this;
                c.data = void 0;
                c.options = void 0;
                c.points = void 0;
                return c;
            }
            C(g, d);
            g.prototype.pointAttribs = function (c, d) {
                var a = G.prototype.pointAttribs.call(this, c, d), g = this.options, l = c.open < c.close, m = g.lineColor || this.color, q = c.color || this.color;
                a["stroke-width"] = g.lineWidth;
                a.fill = c.options.color || (l ? g.upColor || q : q);
                a.stroke = c.options.lineColor || (l ? g.upLineColor || m : m);
                d && (c = g.states[d], a.fill = c.color || a.fill, a.stroke = c.lineColor || a.stroke, a["stroke-width"] = c.lineWidth || a["stroke-width"]);
                return a;
            };
            g.prototype.drawPoints = function () {
                var c = this, d = c.chart, a = c.yAxis.reversed;
                c.points.forEach(function (g) {
                    var k = g.graphic, m = !k;
                    if ("undefined" !== typeof g.plotY) {
                        k || (g.graphic = k = d.renderer.path().add(c.group));
                        c.chart.styledMode || k.attr(c.pointAttribs(g, g.selected && "select")).shadow(c.options.shadow);
                        var l = k.strokeWidth() % 2 / 2;
                        var q = Math.round(g.plotX) - l;
                        var t = g.plotOpen;
                        var x = g.plotClose;
                        var y = Math.min(t, x);
                        t = Math.max(t, x);
                        var z = Math.round(g.shapeArgs.width / 2);
                        x = a ? t !== g.yBottom : Math.round(y) !==
                            Math.round(g.plotHigh);
                        var w = a ? Math.round(y) !== Math.round(g.plotHigh) : t !== g.yBottom;
                        y = Math.round(y) + l;
                        t = Math.round(t) + l;
                        l = [];
                        l.push(["M", q - z, t], ["L", q - z, y], ["L", q + z, y], ["L", q + z, t], ["Z"], ["M", q, y], ["L", q, x ? Math.round(a ? g.yBottom : g.plotHigh) : y], ["M", q, t], ["L", q, w ? Math.round(a ? g.plotHigh : g.yBottom) : t]);
                        k[m ? "attr" : "animate"]({ d: l }).addClass(g.getClassName(), !0);
                    }
                });
            };
            g.defaultOptions = A(I.defaultOptions, x.plotOptions, { states: { hover: { lineWidth: 2 } }, tooltip: x.plotOptions.ohlc.tooltip, threshold: null, lineColor: "#000000",
                lineWidth: 1, upColor: "#ffffff", stickyTracking: !0 });
            return g;
        }(I);
        g.registerSeriesType("candlestick", B);
        "";
        return B;
    });
    P(g, "Series/Flags/FlagsPoint.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g) {
        var B = this && this.__extends || function () {
            var d = function (g, x) { d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, g) { d.__proto__ = g; } || function (d, g) { for (var q in g)
                g.hasOwnProperty(q) && (d[q] = g[q]); }; return d(g, x); };
            return function (g, x) {
                function A() { this.constructor = g; }
                d(g, x);
                g.prototype = null === x ? Object.create(x) : (A.prototype = x.prototype, new A);
            };
        }(), C = g.isNumber;
        return function (d) { function g() { var g = null !== d && d.apply(this, arguments) || this; g.options = void 0; g.series = void 0; g.ttBelow = !1; return g; } B(g, d); g.prototype.isValid = function () { return C(this.y) || "undefined" === typeof this.y; }; g.prototype.hasNewShapeType = function () { var d = this.options.shape || this.series.options.shape; return this.graphic && d && d !== this.graphic.symbolKey; }; return g; }(d.seriesTypes.column.prototype.pointClass);
    });
    P(g, "Series/OnSeriesComposition.js", [g["Series/Column/ColumnSeries.js"], g["Core/Series/Series.js"], g["Core/Utilities.js"]], function (d, g, B) {
        var C = d.prototype, x = g.prototype, G = B.defined, I = B.stableSort, A;
        (function (d) {
            function g() { return x.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this); }
            function c() {
                C.translate.apply(this);
                var a = this, c = a.options, d = a.chart, g = a.points, l = c.onSeries, q = (l = l && d.get(l)) && l.options.step, t = l && l.points, x = d.inverted, y = a.xAxis, z = a.yAxis;
                d = g.length -
                    1;
                var w;
                c = c.onKey || "y";
                var e = t && t.length, r = 0, h;
                if (l && l.visible && e) {
                    r = (l.pointXOffset || 0) + (l.barW || 0) / 2;
                    var n = l.currentDataGrouping;
                    var f = t[e - 1].x + (n ? n.totalRange : 0);
                    I(g, function (b, a) { return b.x - a.x; });
                    for (c = "plot" + c[0].toUpperCase() + c.substr(1); e-- && g[d];) {
                        var b = t[e];
                        n = g[d];
                        n.y = b.y;
                        if (b.x <= n.x && "undefined" !== typeof b[c]) {
                            if (n.x <= f && (n.plotY = b[c], b.x < n.x && !q && (h = t[e + 1]) && "undefined" !== typeof h[c])) {
                                var D = (n.x - b.x) / (h.x - b.x);
                                n.plotY += D * (h[c] - b[c]);
                                n.y += D * (h.y - b.y);
                            }
                            d--;
                            e++;
                            if (0 > d)
                                break;
                        }
                    }
                }
                g.forEach(function (b, c) { b.plotX += r; if ("undefined" === typeof b.plotY || x)
                    0 <= b.plotX && b.plotX <= y.len ? x ? (b.plotY = y.translate(b.x, 0, 1, 0, 1), b.plotX = G(b.y) ? z.translate(b.y, 0, 0, 0, 1) : 0) : b.plotY = (y.opposite ? 0 : a.yAxis.len) + y.offset : b.shapeArgs = {}; if ((w = g[c - 1]) && w.plotX === b.plotX) {
                    "undefined" === typeof w.stackIndex && (w.stackIndex = 0);
                    var e = w.stackIndex + 1;
                } b.stackIndex = e; });
                this.onSeries = l;
            }
            var l = [];
            d.compose = function (a) { if (-1 === l.indexOf(a)) {
                l.push(a);
                var d = a.prototype;
                d.getPlotBox = g;
                d.translate = c;
            } return a; };
            d.getPlotBox = g;
            d.translate =
                c;
        })(A || (A = {}));
        return A;
    });
    P(g, "Series/Flags/FlagsSymbols.js", [g["Core/Renderer/RendererRegistry.js"], g["Core/Renderer/SVG/SVGRenderer.js"]], function (d, g) {
        function B(d) { C[d + "pin"] = function (g, x, A, t, q) { var c = q && q.anchorX; q = q && q.anchorY; "circle" === d && t > A && (g -= Math.round((t - A) / 2), A = t); var l = C[d](g, x, A, t); if (c && q) {
            var a = c;
            "circle" === d ? a = g + A / 2 : (g = l[0], A = l[1], "M" === g[0] && "L" === A[0] && (a = (g[1] + A[1]) / 2));
            l.push(["M", a, x > q ? x : x + t], ["L", c, q]);
            l = l.concat(C.circle(c - 1, q - 1, 2, 2));
        } return l; }; }
        var C = g.prototype.symbols;
        C.flag = function (d, g, B, A, t) { var q = t && t.anchorX || d; t = t && t.anchorY || g; var c = C.circle(q - 1, t - 1, 2, 2); c.push(["M", q, t], ["L", d, g + A], ["L", d, g], ["L", d + B, g], ["L", d + B, g + A], ["L", d, g + A], ["Z"]); return c; };
        B("circle");
        B("square");
        d = d.getRendererType();
        d !== g && (d.prototype.symbols.circlepin = C.circlepin, d.prototype.symbols.flag = C.flag, d.prototype.symbols.squarepin = C.squarepin);
        return C;
    });
    P(g, "Series/Flags/FlagsSeries.js", [g["Series/Flags/FlagsPoint.js"], g["Core/Globals.js"], g["Series/OnSeriesComposition.js"], g["Core/Renderer/RendererUtilities.js"],
        g["Core/Series/SeriesRegistry.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I) {
        var A = this && this.__extends || function () { var a = function (c, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return a(c, d); }; return function (c, d) { function g() { this.constructor = c; } a(c, d); c.prototype = null === d ? Object.create(d) : (g.prototype = d.prototype, new g); }; }();
        g = g.noop;
        var t = E.distribute, q = x.series, c = x.seriesTypes.column, l = I.addEvent, a = I.defined;
        E = I.extend;
        var k = I.merge, v = I.objectEach, m = I.wrap;
        I = function (d) {
            function g() { var a = null !== d && d.apply(this, arguments) || this; a.data = void 0; a.options = void 0; a.points = void 0; return a; }
            A(g, d);
            g.prototype.animate = function (a) { a && this.setClip(); };
            g.prototype.drawPoints = function () {
                var c = this.points, d = this.chart, g = d.renderer, l = d.inverted, q = this.options, e = q.y, r, h = this.yAxis, n = {}, f = [];
                for (r = c.length; r--;) {
                    var b = c[r];
                    var x = (l ? b.plotY : b.plotX) > this.xAxis.len;
                    var H = b.plotX;
                    var p = b.stackIndex;
                    var u = b.options.shape || q.shape;
                    var K = b.plotY;
                    "undefined" !== typeof K && (K = b.plotY + e - ("undefined" !== typeof p && p * q.stackDistance));
                    b.anchorX = p ? void 0 : b.plotX;
                    var A = p ? void 0 : b.plotY;
                    var B = "flag" !== u;
                    p = b.graphic;
                    "undefined" !== typeof K && 0 <= H && !x ? (p && b.hasNewShapeType() && (p = p.destroy()), p || (p = b.graphic = g.label("", null, null, u, null, null, q.useHTML).addClass("highcharts-point").add(this.markerGroup), b.graphic.div && (b.graphic.div.point = b), p.isNew = !0), p.attr({ align: B ? "center" : "left",
                        width: q.width, height: q.height, "text-align": q.textAlign }), d.styledMode || p.attr(this.pointAttribs(b)).css(k(q.style, b.style)).shadow(q.shadow), 0 < H && (H -= p.strokeWidth() % 2), u = { y: K, anchorY: A }, q.allowOverlapX && (u.x = H, u.anchorX = b.anchorX), p.attr({ text: b.options.title || q.title || "A" })[p.isNew ? "attr" : "animate"](u), q.allowOverlapX || (n[b.plotX] ? n[b.plotX].size = Math.max(n[b.plotX].size, p.width) : n[b.plotX] = { align: B ? .5 : 0, size: p.width, target: H, anchorX: H }), b.tooltipPos = [H, K + h.pos - d.plotTop]) : p && (b.graphic = p.destroy());
                }
                if (!q.allowOverlapX) {
                    var C = 100;
                    v(n, function (b) { b.plotX = b.anchorX; f.push(b); C = Math.max(b.size, C); });
                    t(f, l ? h.len : this.xAxis.len, C);
                    c.forEach(function (b) { var c = b.plotX, e = b.graphic; (c = e && n[c]) && e && (a(c.pos) ? e[e.isNew ? "attr" : "animate"]({ x: c.pos + (c.align || 0) * c.size, anchorX: b.anchorX }).show().isNew = !1 : e.hide().isNew = !0); });
                }
                q.useHTML && m(this.markerGroup, "on", function (b) { return G.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1)); });
            };
            g.prototype.drawTracker = function () {
                var a = this.points;
                d.prototype.drawTracker.call(this);
                a.forEach(function (c) { var d = c.graphic; d && (c.unbindMouseOver && c.unbindMouseOver(), c.unbindMouseOver = l(d.element, "mouseover", function () { 0 < c.stackIndex && !c.raised && (c._y = d.y, d.attr({ y: c._y - 8 }), c.raised = !0); a.forEach(function (a) { a !== c && a.raised && a.graphic && (a.graphic.attr({ y: a._y }), a.raised = !1); }); })); });
            };
            g.prototype.pointAttribs = function (a, c) {
                var d = this.options, g = a && a.color || this.color, k = d.lineColor, e = a && a.lineWidth;
                a = a && a.fillColor || d.fillColor;
                c && (a = d.states[c].fillColor, k = d.states[c].lineColor, e = d.states[c].lineWidth);
                return { fill: a || g, stroke: k || g, "stroke-width": e || d.lineWidth || 0 };
            };
            g.prototype.setClip = function () { q.prototype.setClip.apply(this, arguments); !1 !== this.options.clip && this.sharedClipKey && this.markerGroup && this.markerGroup.clip(this.chart.sharedClips[this.sharedClipKey]); };
            g.defaultOptions = k(c.defaultOptions, { pointRange: 0, allowOverlapX: !1, shape: "flag", stackDistance: 12, textAlign: "center", tooltip: { pointFormat: "{point.text}" }, threshold: null, y: -30, fillColor: "#ffffff", lineWidth: 1, states: { hover: { lineColor: "#000000",
                        fillColor: "#ccd6eb" } }, style: { fontSize: "11px", fontWeight: "bold" } });
            return g;
        }(c);
        B.compose(I);
        E(I.prototype, { allowDG: !1, forceCrop: !0, invertible: !1, noSharedTooltip: !0, pointClass: d, sorted: !1, takeOrdinalPosition: !1, trackerGroups: ["markerGroup"], buildKDTree: g, init: q.prototype.init, invertGroups: g });
        x.registerSeriesType("flags", I);
        "";
        "";
        return I;
    });
    P(g, "Core/Axis/ScrollbarAxis.js", [g["Core/Utilities.js"]], function (d) {
        var g = d.addEvent, B = d.defined, E = d.pick;
        return function () {
            function d() { }
            d.compose = function (x, C) {
                if (-1 === d.composed.indexOf(x))
                    d.composed.push(x);
                else
                    return x;
                var A = function (d) { var g = E(d.options && d.options.min, d.min), c = E(d.options && d.options.max, d.max); return { axisMin: g, axisMax: c, scrollMin: B(d.dataMin) ? Math.min(g, d.min, d.dataMin, E(d.threshold, Infinity)) : g, scrollMax: B(d.dataMax) ? Math.max(c, d.max, d.dataMax, E(d.threshold, -Infinity)) : c }; };
                g(x, "afterInit", function () {
                    var d = this;
                    d.options && d.options.scrollbar && d.options.scrollbar.enabled && (d.options.scrollbar.vertical = !d.horiz, d.options.startOnTick =
                        d.options.endOnTick = !1, d.scrollbar = new C(d.chart.renderer, d.options.scrollbar, d.chart), g(d.scrollbar, "changed", function (g) { var c = A(d), l = c.axisMax, a = c.scrollMin, k = c.scrollMax - a; B(c.axisMin) && B(l) && (d.horiz && !d.reversed || !d.horiz && d.reversed ? (c = a + k * this.to, a += k * this.from) : (c = a + k * (1 - this.from), a += k * (1 - this.to)), this.shouldUpdateExtremes(g.DOMType) ? d.setExtremes(a, c, !0, "mousemove" !== g.DOMType && "touchmove" !== g.DOMType, g) : this.setRange(this.from, this.to)); }));
                });
                g(x, "afterRender", function () {
                    var d = A(this), g = d.scrollMin, c = d.scrollMax;
                    d = this.scrollbar;
                    var l = this.axisTitleMargin + (this.titleOffset || 0), a = this.chart.scrollbarsOffsets, k = this.options.margin || 0;
                    d && (this.horiz ? (this.opposite || (a[1] += l), d.position(this.left, this.top + this.height + 2 + a[1] - (this.opposite ? k : 0), this.width, this.height), this.opposite || (a[1] += k), l = 1) : (this.opposite && (a[0] += l), d.position(d.options.opposite ? this.left + this.width + 2 + a[0] - (this.opposite ? 0 : k) : this.opposite ? 0 : k, this.top, this.width, this.height), this.opposite && (a[0] += k), l = 0), a[l] +=
                        d.size + d.options.margin, isNaN(g) || isNaN(c) || !B(this.min) || !B(this.max) || this.min === this.max ? d.setRange(0, 1) : (a = (this.min - g) / (c - g), g = (this.max - g) / (c - g), this.horiz && !this.reversed || !this.horiz && this.reversed ? d.setRange(a, g) : d.setRange(1 - g, 1 - a)));
                });
                g(x, "afterGetOffset", function () { var d = this.scrollbar && !this.scrollbar.options.opposite; d = this.horiz ? 2 : d ? 3 : 1; var g = this.scrollbar; g && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[d] += g.size + g.options.margin); });
                return x;
            };
            d.composed = [];
            return d;
        }();
    });
    P(g, "Core/ScrollbarDefaults.js", [g["Core/Globals.js"]], function (d) { return { height: d.isTouchDevice ? 20 : 14, barBorderRadius: 0, buttonBorderRadius: 0, liveRedraw: void 0, margin: 10, minWidth: 6, opposite: !0, step: .2, zIndex: 3, barBackgroundColor: "#cccccc", barBorderWidth: 1, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc", buttonBorderWidth: 1, rifleColor: "#333333", trackBackgroundColor: "#f2f2f2", trackBorderColor: "#f2f2f2", trackBorderWidth: 1 }; });
    P(g, "Core/Scrollbar.js", [g["Core/DefaultOptions.js"], g["Core/Globals.js"], g["Core/Axis/ScrollbarAxis.js"], g["Core/ScrollbarDefaults.js"], g["Core/Utilities.js"]], function (d, g, B, E, x) {
        var C = d.defaultOptions, I = x.addEvent, A = x.correctFloat, t = x.defined, q = x.destroyObjectProperties, c = x.fireEvent, l = x.merge, a = x.pick, k = x.removeEvent;
        d = function () {
            function d(a, c, d) {
                this._events = [];
                this.chart = void 0;
                this.from = this.chartY = this.chartX = 0;
                this.scrollbar = this.renderer = this.options = this.group = void 0;
                this.scrollbarButtons = [];
                this.scrollbarGroup =
                    void 0;
                this.scrollbarLeft = 0;
                this.scrollbarRifles = void 0;
                this.scrollbarStrokeWidth = 1;
                this.to = this.size = this.scrollbarTop = 0;
                this.track = void 0;
                this.trackBorderWidth = 1;
                this.userOptions = void 0;
                this.y = this.x = 0;
                this.init(a, c, d);
            }
            d.compose = function (a) { B.compose(a, d); };
            d.swapXY = function (a, c) { c && a.forEach(function (a) { for (var c = a.length, d, g = 0; g < c; g += 2)
                d = a[g + 1], "number" === typeof d && (a[g + 1] = a[g + 2], a[g + 2] = d); }); return a; };
            d.prototype.addEvents = function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], c = this.scrollbarButtons, d = this.scrollbarGroup.element, k = this.track.element, l = this.mouseDownHandler.bind(this), q = this.mouseMoveHandler.bind(this), t = this.mouseUpHandler.bind(this);
                a = [[c[a[0]].element, "click", this.buttonToMinClick.bind(this)], [c[a[1]].element, "click", this.buttonToMaxClick.bind(this)], [k, "click", this.trackClick.bind(this)], [d, "mousedown", l], [d.ownerDocument, "mousemove", q], [d.ownerDocument, "mouseup", t]];
                g.hasTouch && a.push([d, "touchstart", l], [d.ownerDocument, "touchmove", q], [d.ownerDocument, "touchend", t]);
                a.forEach(function (a) {
                    I.apply(null, a);
                });
                this._events = a;
            };
            d.prototype.buttonToMaxClick = function (d) { var g = (this.to - this.from) * a(this.options.step, .2); this.updatePosition(this.from + g, this.to + g); c(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: d }); };
            d.prototype.buttonToMinClick = function (d) { var g = A(this.to - this.from) * a(this.options.step, .2); this.updatePosition(A(this.from - g), A(this.to - g)); c(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: d }); };
            d.prototype.cursorToScrollbarPosition = function (a) {
                var c = this.options;
                c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
                return { chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c), chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c) };
            };
            d.prototype.destroy = function () { var a = this, c = a.chart.scroller; a.removeEvents(); ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function (c) { a[c] && a[c].destroy && (a[c] = a[c].destroy()); }); c && a === c.scrollbar && (c.scrollbar = null, q(c.scrollbarButtons)); };
            d.prototype.drawScrollbarButton = function (a) {
                var c = this.renderer, g = this.scrollbarButtons, k = this.options, m = this.size, l = c.g().add(this.group);
                g.push(l);
                l = c.rect().addClass("highcharts-scrollbar-button").add(l);
                this.chart.styledMode || l.attr({ stroke: k.buttonBorderColor, "stroke-width": k.buttonBorderWidth, fill: k.buttonBackgroundColor });
                l.attr(l.crisp({ x: -.5, y: -.5, width: m + 1, height: m + 1, r: k.buttonBorderRadius }, l.strokeWidth()));
                l = c.path(d.swapXY([["M", m / 2 + (a ? -1 : 1), m / 2 - 3], ["L", m / 2 + (a ? -1 : 1), m / 2 + 3], ["L", m / 2 + (a ? 2 : -2), m / 2]], k.vertical)).addClass("highcharts-scrollbar-arrow").add(g[a]);
                this.chart.styledMode || l.attr({ fill: k.buttonArrowColor });
            };
            d.prototype.init = function (c, d, g) { this.scrollbarButtons = []; this.renderer = c; this.userOptions = d; this.options = l(E, C.scrollbar, d); this.chart = g; this.size = a(this.options.size, this.options.height); d.enabled && (this.render(), this.addEvents()); };
            d.prototype.mouseDownHandler = function (a) {
                a = this.chart.pointer.normalize(a);
                a = this.cursorToScrollbarPosition(a);
                this.chartX = a.chartX;
                this.chartY = a.chartY;
                this.initPositions = [this.from, this.to];
                this.grabbedCenter =
                    !0;
            };
            d.prototype.mouseMoveHandler = function (a) { var d = this.chart.pointer.normalize(a), g = this.options.vertical ? "chartY" : "chartX", k = this.initPositions || []; !this.grabbedCenter || a.touches && 0 === a.touches[0][g] || (d = this.cursorToScrollbarPosition(d)[g], g = this[g], g = d - g, this.hasDragged = !0, this.updatePosition(k[0] + g, k[1] + g), this.hasDragged && c(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: a.type, DOMEvent: a })); };
            d.prototype.mouseUpHandler = function (a) {
                this.hasDragged && c(this, "changed", { from: this.from,
                    to: this.to, trigger: "scrollbar", DOMType: a.type, DOMEvent: a });
                this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
            };
            d.prototype.position = function (a, c, d, g) {
                var k = this.options.vertical, m = this.rendered ? "animate" : "attr", l = g, q = 0;
                this.group.show();
                this.x = a;
                this.y = c + this.trackBorderWidth;
                this.width = d;
                this.height = g;
                this.xOffset = l;
                this.yOffset = q;
                k ? (this.width = this.yOffset = d = q = this.size, this.xOffset = l = 0, this.barWidth = g - 2 * d, this.x = a += this.options.margin) : (this.height = this.xOffset = g = l = this.size, this.barWidth =
                    d - 2 * g, this.y += this.options.margin);
                this.group[m]({ translateX: a, translateY: this.y });
                this.track[m]({ width: d, height: g });
                this.scrollbarButtons[1][m]({ translateX: k ? 0 : d - l, translateY: k ? g - q : 0 });
            };
            d.prototype.removeEvents = function () { this._events.forEach(function (a) { k.apply(null, a); }); this._events.length = 0; };
            d.prototype.render = function () {
                var a = this.renderer, c = this.options, g = this.size, k = this.chart.styledMode, l = a.g("scrollbar").attr({ zIndex: c.zIndex }).hide().add();
                this.group = l;
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({ x: 0,
                    r: c.trackBorderRadius || 0, height: g, width: g }).add(l);
                k || this.track.attr({ fill: c.trackBackgroundColor, stroke: c.trackBorderColor, "stroke-width": c.trackBorderWidth });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({ y: -this.trackBorderWidth % 2 / 2 });
                this.scrollbarGroup = a.g().add(l);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({ height: g, width: g, r: c.barBorderRadius || 0 }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(d.swapXY([["M", -3, g / 4], ["L", -3, 2 * g / 3], ["M", 0, g / 4],
                    ["L", 0, 2 * g / 3], ["M", 3, g / 4], ["L", 3, 2 * g / 3]], c.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                k || (this.scrollbar.attr({ fill: c.barBackgroundColor, stroke: c.barBorderColor, "stroke-width": c.barBorderWidth }), this.scrollbarRifles.attr({ stroke: c.rifleColor, "stroke-width": 1 }));
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1);
            };
            d.prototype.setRange =
                function (a, c) {
                    var d = this.options, g = d.vertical, k = d.minWidth, l = this.barWidth, m = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                    if (t(l)) {
                        var q = l * Math.min(c, 1);
                        a = Math.max(a, 0);
                        var e = Math.ceil(l * a);
                        this.calculatedWidth = q = A(q - e);
                        q < k && (e = (l - k + q) * a, q = k);
                        k = Math.floor(e + this.xOffset + this.yOffset);
                        l = q / 2 - .5;
                        this.from = a;
                        this.to = c;
                        g ? (this.scrollbarGroup[m]({ translateY: k }), this.scrollbar[m]({ height: q }), this.scrollbarRifles[m]({ translateY: l }), this.scrollbarTop =
                            k, this.scrollbarLeft = 0) : (this.scrollbarGroup[m]({ translateX: k }), this.scrollbar[m]({ width: q }), this.scrollbarRifles[m]({ translateX: l }), this.scrollbarLeft = k, this.scrollbarTop = 0);
                        12 >= q ? this.scrollbarRifles.hide() : this.scrollbarRifles.show();
                        !1 === d.showFull && (0 >= a && 1 <= c ? this.group.hide() : this.group.show());
                        this.rendered = !0;
                    }
                };
            d.prototype.shouldUpdateExtremes = function (c) { return a(this.options.liveRedraw, g.svg && !g.isTouchDevice && !this.chart.isBoosting) || "mouseup" === c || "touchend" === c || !t(c); };
            d.prototype.trackClick =
                function (a) { var d = this.chart.pointer.normalize(a), g = this.to - this.from, k = this.y + this.scrollbarTop, l = this.x + this.scrollbarLeft; this.options.vertical && d.chartY > k || !this.options.vertical && d.chartX > l ? this.updatePosition(this.from + g, this.to + g) : this.updatePosition(this.from - g, this.to - g); c(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: a }); };
            d.prototype.update = function (a) { this.destroy(); this.init(this.chart.renderer, l(!0, this.options, a), this.chart); };
            d.prototype.updatePosition = function (a, c) { 1 < c && (a = A(1 - A(c - a)), c = 1); 0 > a && (c = A(c - a), a = 0); this.from = a; this.to = c; };
            d.defaultOptions = E;
            return d;
        }();
        C.scrollbar = l(!0, d.defaultOptions, C.scrollbar);
        return d;
    });
    P(g, "Core/Axis/NavigatorAxis.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function (d, g) {
        var B = d.isTouchDevice, C = g.addEvent, x = g.correctFloat, G = g.defined, I = g.isNumber, A = g.pick, t = function () {
            function d(c) { this.axis = c; }
            d.prototype.destroy = function () { this.axis = void 0; };
            d.prototype.toFixedRange = function (c, d, a, g) {
                var k = this.axis, l = k.chart;
                l = l &&
                    l.fixedRange;
                var q = (k.pointRange || 0) / 2;
                c = A(a, k.translate(c, !0, !k.horiz));
                d = A(g, k.translate(d, !0, !k.horiz));
                k = l && (d - c) / l;
                G(a) || (c = x(c + q));
                G(g) || (d = x(d - q));
                .7 < k && 1.3 > k && (g ? c = d - l : d = c + l);
                I(c) && I(d) || (c = d = void 0);
                return { min: c, max: d };
            };
            return d;
        }();
        return function () {
            function d() { }
            d.compose = function (c) {
                c.keepProps.push("navigatorAxis");
                C(c, "init", function () { this.navigatorAxis || (this.navigatorAxis = new t(this)); });
                C(c, "zoom", function (c) {
                    var a = this.chart.options, d = a.navigator, g = this.navigatorAxis, l = a.chart.pinchType, q = a.rangeSelector;
                    a = a.chart.zoomType;
                    this.isXAxis && (d && d.enabled || q && q.enabled) && ("y" === a ? c.zoomed = !1 : (!B && "xy" === a || B && "xy" === l) && this.options.range && (d = g.previousZoom, G(c.newMin) ? g.previousZoom = [this.min, this.max] : d && (c.newMin = d[0], c.newMax = d[1], g.previousZoom = void 0)));
                    "undefined" !== typeof c.zoomed && c.preventDefault();
                });
            };
            d.AdditionsClass = t;
            return d;
        }();
    });
    P(g, "Core/Navigator.js", [g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Axis/NavigatorAxis.js"],
        g["Core/DefaultOptions.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Scrollbar.js"], g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A, t, q, c) {
        B = B.parse;
        var l = E.hasTouch, a = E.isTouchDevice, k = G.defaultOptions, v = c.addEvent, m = c.clamp, C = c.correctFloat, F = c.defined, L = c.destroyObjectProperties, J = c.erase, y = c.extend, z = c.find, w = c.isArray, e = c.isNumber, r = c.merge, h = c.pick, n = c.removeEvent, f = c.splat, b = function (b) {
            for (var a = [], c = 1; c < arguments.length; c++)
                a[c -
                    1] = arguments[c];
            a = [].filter.call(a, e);
            if (a.length)
                return Math[b].apply(0, a);
        };
        G = "undefined" === typeof q.seriesTypes.areaspline ? "line" : "areaspline";
        y(k, { navigator: { height: 40, margin: 25, maskInside: !0, handles: { width: 7, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: !0, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" }, maskFill: B("#6685c2").setOpacity(.3).get(), outlineColor: "#cccccc", outlineWidth: 1, series: { type: G, fillOpacity: .05, lineWidth: 1, compare: null, dataGrouping: { approximation: "average",
                        enabled: !0, groupPixelWidth: 2, firstAnchor: "firstPoint", anchor: "middle", lastAnchor: "lastPoint", units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]] }, dataLabels: { enabled: !1, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: !1 }, threshold: null }, xAxis: { overscroll: 0, className: "highcharts-navigator-xaxis",
                    tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", gridLineWidth: 1, tickPixelInterval: 200, labels: { align: "left", style: { color: "#999999" }, x: 3, y: -4 }, crosshair: !1 }, yAxis: { className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: !1, endOnTick: !1, minPadding: .1, maxPadding: .1, labels: { enabled: !1 }, crosshair: !1, title: { text: null }, tickLength: 0, tickWidth: 0 } } });
        I.getRendererType().prototype.symbols["navigator-handle"] = function (b, a, c, d, e) {
            b = (e && e.width || 0) / 2;
            a = Math.round(b / 3) + .5;
            e = e && e.height || 0;
            return [["M",
                    -b - 1, .5], ["L", b, .5], ["L", b, e + .5], ["L", -b - 1, e + .5], ["L", -b - 1, .5], ["M", -a, 4], ["L", -a, e - 3], ["M", a - 1, 4], ["L", a - 1, e - 3]];
        };
        var D = function () {
            function c(b) { this.zoomedMin = this.zoomedMax = this.yAxis = this.xAxis = this.top = this.size = this.shades = this.rendered = this.range = this.outlineHeight = this.outline = this.opposite = this.navigatorSize = this.navigatorSeries = this.navigatorOptions = this.navigatorGroup = this.navigatorEnabled = this.left = this.height = this.handles = this.chart = this.baseSeries = void 0; this.init(b); }
            c.prototype.drawHandle =
                function (b, a, c, d) { var e = this.navigatorOptions.handles.height; this.handles[a][d](c ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(b, 10) + .5 - e) } : { translateX: Math.round(this.left + parseInt(b, 10)), translateY: Math.round(this.top + this.height / 2 - e / 2 - 1) }); };
            c.prototype.drawOutline = function (b, a, c, d) {
                var e = this.navigatorOptions.maskInside, f = this.outline.strokeWidth(), g = f / 2, h = f % 2 / 2;
                f = this.outlineHeight;
                var k = this.scrollbarHeight || 0, p = this.size, l = this.left - k, m = this.top;
                c ?
                    (l -= g, c = m + a + h, a = m + b + h, h = [["M", l + f, m - k - h], ["L", l + f, c], ["L", l, c], ["L", l, a], ["L", l + f, a], ["L", l + f, m + p + k]], e && h.push(["M", l + f, c - g], ["L", l + f, a + g])) : (b += l + k - h, a += l + k - h, m += g, h = [["M", l, m], ["L", b, m], ["L", b, m + f], ["L", a, m + f], ["L", a, m], ["L", l + p + 2 * k, m]], e && h.push(["M", b - g, m], ["L", a + g, m]));
                this.outline[d]({ d: h });
            };
            c.prototype.drawMasks = function (b, a, c, d) {
                var e = this.left, f = this.top, g = this.height;
                if (c) {
                    var h = [e, e, e];
                    var k = [f, f + b, f + a];
                    var p = [g, g, g];
                    var l = [b, a - b, this.size - a];
                }
                else
                    h = [e, e + b, e + a], k = [f, f, f], p = [b, a - b, this.size -
                            a], l = [g, g, g];
                this.shades.forEach(function (b, a) { b[d]({ x: h[a], y: k[a], width: p[a], height: l[a] }); });
            };
            c.prototype.renderElements = function () {
                var b = this, a = b.navigatorOptions, c = a.maskInside, d = b.chart, e = d.renderer, f, g = { cursor: d.inverted ? "ns-resize" : "ew-resize" };
                b.navigatorGroup = f = e.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
                [!c, c, !c].forEach(function (c, h) {
                    var k = e.rect().addClass("highcharts-navigator-mask" + (1 === h ? "-inside" : "-outside")).add(f);
                    d.styledMode || (k.attr({ fill: c ? a.maskFill : "rgba(0,0,0,0)" }),
                        1 === h && k.css(g));
                    b.shades[h] = k;
                });
                b.outline = e.path().addClass("highcharts-navigator-outline").add(f);
                d.styledMode || b.outline.attr({ "stroke-width": a.outlineWidth, stroke: a.outlineColor });
                a.handles.enabled && [0, 1].forEach(function (c) {
                    a.handles.inverted = d.inverted;
                    b.handles[c] = e.symbol(a.handles.symbols[c], -a.handles.width / 2 - 1, 0, a.handles.width, a.handles.height, a.handles);
                    b.handles[c].attr({ zIndex: 7 - c }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(f);
                    if (!d.styledMode) {
                        var h = a.handles;
                        b.handles[c].attr({ fill: h.backgroundColor, stroke: h.borderColor, "stroke-width": h.lineWidth }).css(g);
                    }
                });
            };
            c.prototype.update = function (b) { (this.series || []).forEach(function (b) { b.baseSeries && delete b.baseSeries.navigatorSeries; }); this.destroy(); r(!0, this.chart.options.navigator, this.options, b); this.init(this.chart); };
            c.prototype.render = function (b, a, c, d) {
                var f = this.chart, g = this.scrollbarHeight, k, p = this.xAxis, l = p.pointRange || 0;
                var n = p.navigatorAxis.fake ? f.xAxis[0] : p;
                var u = this.navigatorEnabled, r, q = this.rendered;
                var t = f.inverted;
                var w = f.xAxis[0].minRange, v = f.xAxis[0].options.maxRange;
                if (!this.hasDragged || F(c)) {
                    b = C(b - l / 2);
                    a = C(a + l / 2);
                    if (!e(b) || !e(a))
                        if (q)
                            c = 0, d = h(p.width, n.width);
                        else
                            return;
                    this.left = h(p.left, f.plotLeft + g + (t ? f.plotWidth : 0));
                    this.size = r = k = h(p.len, (t ? f.plotHeight : f.plotWidth) - 2 * g);
                    f = t ? g : k + 2 * g;
                    c = h(c, p.toPixels(b, !0));
                    d = h(d, p.toPixels(a, !0));
                    e(c) && Infinity !== Math.abs(c) || (c = 0, d = f);
                    b = p.toValue(c, !0);
                    a = p.toValue(d, !0);
                    var x = Math.abs(C(a - b));
                    x < w ? this.grabbedLeft ? c = p.toPixels(a - w - l, !0) : this.grabbedRight && (d = p.toPixels(b + w + l, !0)) : F(v) && C(x - l) > v && (this.grabbedLeft ? c = p.toPixels(a - v - l, !0) : this.grabbedRight && (d = p.toPixels(b + v + l, !0)));
                    this.zoomedMax = m(Math.max(c, d), 0, r);
                    this.zoomedMin = m(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d), 0, r);
                    this.range = this.zoomedMax - this.zoomedMin;
                    r = Math.round(this.zoomedMax);
                    c = Math.round(this.zoomedMin);
                    u && (this.navigatorGroup.attr({ visibility: "inherit" }), q = q && !this.hasDragged ? "animate" : "attr", this.drawMasks(c, r, t, q), this.drawOutline(c, r, t, q), this.navigatorOptions.handles.enabled && (this.drawHandle(c, 0, t, q), this.drawHandle(r, 1, t, q)));
                    this.scrollbar && (t ? (t = this.top - g, n = this.left - g + (u || !n.opposite ? 0 : (n.titleOffset || 0) + n.axisTitleMargin), g = k + 2 * g) : (t = this.top + (u ? this.height : -g), n = this.left - g), this.scrollbar.position(n, t, f, g), this.scrollbar.setRange(this.zoomedMin / (k || 1), this.zoomedMax / (k || 1)));
                    this.rendered = !0;
                }
            };
            c.prototype.addMouseEvents = function () {
                var b = this, a = b.chart, c = a.container, d = [], e, f;
                b.mouseMoveHandler = e = function (a) { b.onMouseMove(a); };
                b.mouseUpHandler = f = function (a) { b.onMouseUp(a); };
                d = b.getPartsEvents("mousedown");
                d.push(v(a.renderTo, "mousemove", e), v(c.ownerDocument, "mouseup", f));
                l && (d.push(v(a.renderTo, "touchmove", e), v(c.ownerDocument, "touchend", f)), d.concat(b.getPartsEvents("touchstart")));
                b.eventsToUnbind = d;
                b.series && b.series[0] && d.push(v(b.series[0].xAxis, "foundExtremes", function () { a.navigator.modifyNavigatorAxisExtremes(); }));
            };
            c.prototype.getPartsEvents = function (b) {
                var a = this, c = [];
                ["shades", "handles"].forEach(function (d) {
                    a[d].forEach(function (e, f) { c.push(v(e.element, b, function (b) { a[d + "Mousedown"](b, f); })); });
                });
                return c;
            };
            c.prototype.shadesMousedown = function (b, a) {
                b = this.chart.pointer.normalize(b);
                var c = this.chart, d = this.xAxis, e = this.zoomedMin, f = this.left, g = this.size, h = this.range, k = b.chartX;
                c.inverted && (k = b.chartY, f = this.top);
                if (1 === a)
                    this.grabbedCenter = k, this.fixedWidth = h, this.dragOffset = k - e;
                else {
                    b = k - f - h / 2;
                    if (0 === a)
                        b = Math.max(0, b);
                    else if (2 === a && b + h >= g)
                        if (b = g - h, this.reversedExtremes) {
                            b -= h;
                            var p = this.getUnionExtremes().dataMin;
                        }
                        else
                            var l = this.getUnionExtremes().dataMax;
                    b !== e && (this.fixedWidth = h, a = d.navigatorAxis.toFixedRange(b, b + h, p, l), F(a.min) && c.xAxis[0].setExtremes(Math.min(a.min, a.max), Math.max(a.min, a.max), !0, null, { trigger: "navigator" }));
                }
            };
            c.prototype.handlesMousedown = function (b, a) {
                this.chart.pointer.normalize(b);
                b = this.chart;
                var c = b.xAxis[0], d = this.reversedExtremes;
                0 === a ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                b.fixedRange =
                    null;
            };
            c.prototype.onMouseMove = function (b) {
                var c = this, d = c.chart, e = c.left, f = c.navigatorSize, g = c.range, k = c.dragOffset, p = d.inverted;
                b.touches && 0 === b.touches[0].pageX || (b = d.pointer.normalize(b), d = b.chartX, p && (e = c.top, d = b.chartY), c.grabbedLeft ? (c.hasDragged = !0, c.render(0, 0, d - e, c.otherHandlePos)) : c.grabbedRight ? (c.hasDragged = !0, c.render(0, 0, c.otherHandlePos, d - e)) : c.grabbedCenter && (c.hasDragged = !0, d < k ? d = k : d > f + k - g && (d = f + k - g), c.render(0, 0, d - k, d - k + g)), c.hasDragged && c.scrollbar && h(c.scrollbar.options.liveRedraw, E.svg && !a && !this.chart.isBoosting) && (b.DOMType = b.type, setTimeout(function () { c.onMouseUp(b); }, 0)));
            };
            c.prototype.onMouseUp = function (b) {
                var a = this.chart, c = this.xAxis, d = this.scrollbar, f = b.DOMEvent || b, g = a.inverted, h = this.rendered && !this.hasDragged ? "animate" : "attr";
                if (this.hasDragged && (!d || !d.hasDragged) || "scrollbar" === b.trigger) {
                    d = this.getUnionExtremes();
                    if (this.zoomedMin === this.otherHandlePos)
                        var k = this.fixedExtreme;
                    else if (this.zoomedMax === this.otherHandlePos)
                        var p = this.fixedExtreme;
                    this.zoomedMax ===
                        this.size && (p = this.reversedExtremes ? d.dataMin : d.dataMax);
                    0 === this.zoomedMin && (k = this.reversedExtremes ? d.dataMax : d.dataMin);
                    c = c.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, k, p);
                    F(c.min) && a.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: f });
                }
                "mousemove" !== b.DOMType && "touchmove" !== b.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos =
                    this.hasDragged = this.dragOffset = null);
                this.navigatorEnabled && e(this.zoomedMin) && e(this.zoomedMax) && (a = Math.round(this.zoomedMin), b = Math.round(this.zoomedMax), this.shades && this.drawMasks(a, b, g, h), this.outline && this.drawOutline(a, b, g, h), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(a, 0, g, h), this.drawHandle(b, 1, g, h)));
            };
            c.prototype.removeEvents = function () {
                this.eventsToUnbind && (this.eventsToUnbind.forEach(function (b) { b(); }), this.eventsToUnbind =
                    void 0);
                this.removeBaseSeriesEvents();
            };
            c.prototype.removeBaseSeriesEvents = function () { var b = this.baseSeries || []; this.navigatorEnabled && b[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && b.forEach(function (b) { n(b, "updatedData", this.updatedDataHandler); }, this), b[0].xAxis && n(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)); };
            c.prototype.init = function (a) {
                var c = a.options, e = c.navigator, f = e.enabled, g = c.scrollbar, k = g.enabled;
                c = f ? e.height : 0;
                var p = k ? g.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart =
                    a;
                this.setBaseSeries();
                this.height = c;
                this.scrollbarHeight = p;
                this.scrollbarEnabled = k;
                this.navigatorEnabled = f;
                this.navigatorOptions = e;
                this.scrollbarOptions = g;
                this.outlineHeight = c + p;
                this.opposite = h(e.opposite, !(f || !a.inverted));
                var l = this;
                f = l.baseSeries;
                g = a.xAxis.length;
                k = a.yAxis.length;
                var m = f && f[0] && f[0].xAxis || a.xAxis[0] || { options: {} };
                a.isDirtyBox = !0;
                l.navigatorEnabled ? (l.xAxis = new d(a, r({ breaks: m.options.breaks, ordinal: m.options.ordinal }, e.xAxis, { id: "navigator-x-axis", yAxis: "navigator-y-axis", isX: !0,
                    type: "datetime", index: g, isInternal: !0, offset: 0, keepOrdinalPadding: !0, startOnTick: !1, endOnTick: !1, minPadding: 0, maxPadding: 0, zoomEnabled: !1 }, a.inverted ? { offsets: [p, 0, -p, 0], width: c } : { offsets: [0, -p, 0, p], height: c })), l.yAxis = new d(a, r(e.yAxis, { id: "navigator-y-axis", alignTicks: !1, offset: 0, index: k, isInternal: !0, reversed: h(e.yAxis && e.yAxis.reversed, a.yAxis[0] && a.yAxis[0].reversed, !1), zoomEnabled: !1 }, a.inverted ? { width: c } : { height: c })), f || e.series.data ? l.updateNavigatorSeries(!1) : 0 === a.series.length && (l.unbindRedraw =
                    v(a, "beforeRedraw", function () { 0 < a.series.length && !l.series && (l.setBaseSeries(), l.unbindRedraw()); })), l.reversedExtremes = a.inverted && !l.xAxis.reversed || !a.inverted && l.xAxis.reversed, l.renderElements(), l.addMouseEvents()) : (l.xAxis = { chart: a, navigatorAxis: { fake: !0 }, translate: function (c, d) { var e = a.xAxis[0], f = e.getExtremes(), g = e.len - 2 * p, h = b("min", e.options.min, f.dataMin); e = b("max", e.options.max, f.dataMax) - h; return d ? c * e / g + h : g * (c - h) / e; }, toPixels: function (b) { return this.translate(b); }, toValue: function (b) {
                        return this.translate(b, !0);
                    } }, l.xAxis.navigatorAxis.axis = l.xAxis, l.xAxis.navigatorAxis.toFixedRange = x.AdditionsClass.prototype.toFixedRange.bind(l.xAxis.navigatorAxis));
                a.options.scrollbar.enabled && (a.scrollbar = l.scrollbar = new A(a.renderer, r(a.options.scrollbar, { margin: l.navigatorEnabled ? 0 : 10, vertical: a.inverted }), a), v(l.scrollbar, "changed", function (b) { var a = l.size, c = a * this.to; a *= this.from; l.hasDragged = l.scrollbar.hasDragged; l.render(0, 0, a, c); this.shouldUpdateExtremes(b.DOMType) && setTimeout(function () { l.onMouseUp(b); }); }));
                l.addBaseSeriesEvents();
                l.addChartEvents();
            };
            c.prototype.getUnionExtremes = function (a) { var c = this.chart.xAxis[0], d = this.xAxis, e = d.options, f = c.options, g; a && null === c.dataMin || (g = { dataMin: h(e && e.min, b("min", f.min, c.dataMin, d.dataMin, d.min)), dataMax: h(e && e.max, b("max", f.max, c.dataMax, d.dataMax, d.max)) }); return g; };
            c.prototype.setBaseSeries = function (b, a) {
                var c = this.chart, d = this.baseSeries = [];
                b = b || c.options && c.options.navigator.baseSeries || (c.series.length ? z(c.series, function (b) { return !b.options.isInternal; }).index :
                    0);
                (c.series || []).forEach(function (a, c) { a.options.isInternal || !a.options.showInNavigator && (c !== b && a.options.id !== b || !1 === a.options.showInNavigator) || d.push(a); });
                this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, a);
            };
            c.prototype.updateNavigatorSeries = function (b, a) {
                var c = this, d = c.chart, e = c.baseSeries, g, p, l = c.navigatorOptions.series, m, q = { enableMouseTracking: !1, index: null, linkedTo: null, group: "nav", padXAxis: !1, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: !1, stacking: void 0,
                    isInternal: !0, states: { inactive: { opacity: 1 } } }, u = c.series = (c.series || []).filter(function (b) { var a = b.baseSeries; return 0 > e.indexOf(a) ? (a && (n(a, "updatedData", c.updatedDataHandler), delete a.navigatorSeries), b.chart && b.destroy(), !1) : !0; });
                e && e.length && e.forEach(function (b) {
                    var n = b.navigatorSeries, t = y({ color: b.color, visible: b.visible }, w(l) ? k.navigator.series : l);
                    n && !1 === c.navigatorOptions.adaptToUpdatedData || (q.name = "Navigator " + e.length, g = b.options || {}, m = g.navigatorOptions || {}, t.dataLabels = f(t.dataLabels),
                        p = r(g, q, t, m), p.pointRange = h(t.pointRange, m.pointRange, k.plotOptions[p.type || "line"].pointRange), t = m.data || t.data, c.hasNavigatorData = c.hasNavigatorData || !!t, p.data = t || g.data && g.data.slice(0), n && n.options ? n.update(p, a) : (b.navigatorSeries = d.initSeries(p), b.navigatorSeries.baseSeries = b, u.push(b.navigatorSeries)));
                });
                if (l.data && (!e || !e.length) || w(l))
                    c.hasNavigatorData = !1, l = f(l), l.forEach(function (b, a) {
                        q.name = "Navigator " + (u.length + 1);
                        p = r(k.navigator.series, { color: d.series[a] && !d.series[a].options.isInternal &&
                                d.series[a].color || d.options.colors[a] || d.options.colors[0] }, q, b);
                        p.data = b.data;
                        p.data && (c.hasNavigatorData = !0, u.push(d.initSeries(p)));
                    });
                b && this.addBaseSeriesEvents();
            };
            c.prototype.addBaseSeriesEvents = function () {
                var b = this, a = b.baseSeries || [];
                a[0] && a[0].xAxis && a[0].eventsToUnbind.push(v(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
                a.forEach(function (a) {
                    a.eventsToUnbind.push(v(a, "show", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1); }));
                    a.eventsToUnbind.push(v(a, "hide", function () { this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1); }));
                    !1 !== this.navigatorOptions.adaptToUpdatedData && a.xAxis && a.eventsToUnbind.push(v(a, "updatedData", this.updatedDataHandler));
                    a.eventsToUnbind.push(v(a, "remove", function () { this.navigatorSeries && (J(b.series, this.navigatorSeries), F(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries); }));
                }, this);
            };
            c.prototype.getBaseSeriesMin = function (b) {
                return this.baseSeries.reduce(function (b, a) {
                    return Math.min(b, a.xData && a.xData.length ? a.xData[0] : b);
                }, b);
            };
            c.prototype.modifyNavigatorAxisExtremes = function () { var b = this.xAxis, a; "undefined" !== typeof b.getExtremes && (!(a = this.getUnionExtremes(!0)) || a.dataMin === b.min && a.dataMax === b.max || (b.min = a.dataMin, b.max = a.dataMax)); };
            c.prototype.modifyBaseAxisExtremes = function () {
                var b = this.chart.navigator, a = this.getExtremes(), c = a.dataMin, d = a.dataMax;
                a = a.max - a.min;
                var f = b.stickToMin, g = b.stickToMax, k = h(this.options.overscroll, 0), l = b.series && b.series[0], m = !!this.setExtremes;
                if (!this.eventArgs ||
                    "rangeSelectorButton" !== this.eventArgs.trigger) {
                    if (f) {
                        var n = c;
                        var r = n + a;
                    }
                    g && (r = d + k, f || (n = Math.max(c, r - a, b.getBaseSeriesMin(l && l.xData ? l.xData[0] : -Number.MAX_VALUE))));
                    m && (f || g) && e(n) && (this.min = this.userMin = n, this.max = this.userMax = r);
                }
                b.stickToMin = b.stickToMax = null;
            };
            c.prototype.updatedDataHandler = function () {
                var b = this.chart.navigator, a = this.navigatorSeries;
                b.stickToMax = b.reversedExtremes ? 0 === Math.round(b.zoomedMin) : Math.round(b.zoomedMax) >= Math.round(b.size);
                b.stickToMin = b.shouldStickToMin(this, b);
                a && !b.hasNavigatorData && (a.options.pointStart = this.xData[0], a.setData(this.options.data, !1, null, !1));
            };
            c.prototype.shouldStickToMin = function (b, a) { a = a.getBaseSeriesMin(b.xData[0]); var c = b.xAxis; b = c.max; var d = c.min; c = c.options.range; return e(b) && e(d) ? c && 0 < b - a ? b - a < c : d <= a : !1; };
            c.prototype.addChartEvents = function () {
                this.eventsToUnbind || (this.eventsToUnbind = []);
                this.eventsToUnbind.push(v(this.chart, "redraw", function () {
                    var b = this.navigator, a = b && (b.baseSeries && b.baseSeries[0] && b.baseSeries[0].xAxis || this.xAxis[0]);
                    a && b.render(a.min, a.max);
                }), v(this.chart, "getMargins", function () { var b = this.navigator, a = b.opposite ? "plotTop" : "marginBottom"; this.inverted && (a = b.opposite ? "marginRight" : "plotLeft"); this[a] = (this[a] || 0) + (b.navigatorEnabled || !this.inverted ? b.outlineHeight : 0) + b.navigatorOptions.margin; }));
            };
            c.prototype.destroy = function () {
                this.removeEvents();
                this.xAxis && (J(this.chart.xAxis, this.xAxis), J(this.chart.axes, this.xAxis));
                this.yAxis && (J(this.chart.yAxis, this.yAxis), J(this.chart.axes, this.yAxis));
                (this.series || []).forEach(function (b) {
                    b.destroy &&
                        b.destroy();
                });
                "series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" ").forEach(function (b) { this[b] && this[b].destroy && this[b].destroy(); this[b] = null; }, this);
                [this.handles].forEach(function (b) { L(b); }, this);
            };
            return c;
        }();
        E.Navigator || (E.Navigator = D, x.compose(d), v(g, "beforeShowResetZoom", function () { var b = this.options, c = b.navigator, d = b.rangeSelector; if ((c && c.enabled || d && d.enabled) && (!a && "x" === b.chart.zoomType || a && "x" === b.chart.pinchType))
            return !1; }),
            v(g, "beforeRender", function () { var b = this.options; if (b.navigator.enabled || b.scrollbar.enabled)
                this.scroller = this.navigator = new D(this); }), v(g, "afterSetChartSize", function () {
            var b = this.legend, a = this.navigator;
            if (a) {
                var c = b && b.options;
                var d = a.xAxis;
                var e = a.yAxis;
                var f = a.scrollbarHeight;
                this.inverted ? (a.left = a.opposite ? this.chartWidth - f - a.height : this.spacing[3] + f, a.top = this.plotTop + f) : (a.left = h(d.left, this.plotLeft + f), a.top = a.navigatorOptions.top || this.chartHeight - a.height - f - this.spacing[2] - (this.rangeSelector &&
                    this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (c && "bottom" === c.verticalAlign && "proximate" !== c.layout && c.enabled && !c.floating ? b.legendHeight + h(c.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0));
                d && e && (this.inverted ? d.options.left = e.options.left = a.left : d.options.top = e.options.top = a.top, d.setAxisSize(), e.setAxisSize());
            }
        }), v(g, "update", function (b) {
            var a = b.options.navigator || {}, c = b.options.scrollbar || {};
            this.navigator || this.scroller || !a.enabled && !c.enabled || (r(!0, this.options.navigator, a), r(!0, this.options.scrollbar, c), delete b.options.navigator, delete b.options.scrollbar);
        }), v(g, "afterUpdate", function (b) { this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new D(this), h(b.redraw, !0) && this.redraw(b.animation)); }), v(g, "afterAddSeries", function () { this.navigator && this.navigator.setBaseSeries(null, !1); }), v(t, "afterUpdate", function () {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1);
        }), g.prototype.callbacks.push(function (b) { var a = b.navigator; a && b.xAxis[0] && (b = b.xAxis[0].getExtremes(), a.render(b.min, b.max)); }));
        E.Navigator = D;
        return E.Navigator;
    });
    P(g, "Extensions/RangeSelector.js", [g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/Globals.js"], g["Core/DefaultOptions.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G) {
        function C(a) {
            if (-1 !== a.indexOf("%L"))
                return "text";
            var b = "aAdewbBmoyY".split("").some(function (b) {
                return -1 !== a.indexOf("%" +
                    b);
            }), c = "HkIlMS".split("").some(function (b) { return -1 !== a.indexOf("%" + b); });
            return b && c ? "datetime-local" : b ? "date" : c ? "time" : "text";
        }
        var A = E.defaultOptions, t = G.addEvent, q = G.createElement, c = G.css, l = G.defined, a = G.destroyObjectProperties, k = G.discardElement, v = G.extend, m = G.find, N = G.fireEvent, F = G.isNumber, L = G.merge, J = G.objectEach, y = G.pad, z = G.pick, w = G.pInt, e = G.splat;
        v(A, { rangeSelector: { allButtonsEnabled: !1, buttons: void 0, buttonSpacing: 5, dropdown: "responsive", enabled: void 0, verticalAlign: "top", buttonTheme: { width: 28,
                    height: 18, padding: 2, zIndex: 7 }, floating: !1, x: 0, y: 0, height: void 0, inputBoxBorderColor: "none", inputBoxHeight: 17, inputBoxWidth: void 0, inputDateFormat: "%b %e, %Y", inputDateParser: void 0, inputEditDateFormat: "%Y-%m-%d", inputEnabled: !0, inputPosition: { align: "right", x: 0, y: 0 }, inputSpacing: 5, selected: void 0, buttonPosition: { align: "left", x: 0, y: 0 }, inputStyle: { color: "#335cad", cursor: "pointer" }, labelStyle: { color: "#666666" } } });
        v(A.lang, { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "", rangeSelectorTo: "\u2192" });
        var r = function () {
            function f(b) { this.buttons = void 0; this.buttonOptions = f.prototype.defaultButtons; this.initialButtonGroupWidth = 0; this.options = void 0; this.chart = b; this.init(b); }
            f.prototype.clickButton = function (b, a) {
                var c = this.chart, f = this.buttonOptions[b], g = c.xAxis[0], h = c.scroller && c.scroller.getUnionExtremes() || g || {}, k = h.dataMin, m = h.dataMax, n = g && Math.round(Math.min(g.max, z(m, g.max))), r = f.type;
                h = f._range;
                var q, w = f.dataGrouping;
                var v = !0;
                if (null !== k && null !== m) {
                    c.fixedRange = h;
                    this.setSelected(b);
                    w && (this.forcedDataGrouping =
                        !0, d.prototype.setDataGrouping.call(g || { chart: this.chart }, w, !1), this.frozenStates = f.preserveDataGrouping);
                    if ("month" === r || "year" === r)
                        if (g) {
                            v = { range: f, max: n, chart: c, dataMin: k, dataMax: m };
                            var x = g.minFromRange.call(v);
                            F(v.newMax) && (n = v.newMax);
                            v = !1;
                        }
                        else
                            h = f;
                    else if (h)
                        x = Math.max(n - h, k), n = Math.min(x + h, m), v = !1;
                    else if ("ytd" === r)
                        if (g) {
                            if ("undefined" === typeof m || "undefined" === typeof k)
                                k = Number.MAX_VALUE, m = Number.MIN_VALUE, c.series.forEach(function (b) {
                                    if (b = b.xData)
                                        k = Math.min(b[0], k), m = Math.max(b[b.length - 1], m);
                                }), a = !1;
                            n = this.getYTDExtremes(m, k, c.time.useUTC);
                            x = q = n.min;
                            n = n.max;
                        }
                        else {
                            this.deferredYTDClick = b;
                            return;
                        }
                    else
                        "all" === r && g && (c.navigator && c.navigator.baseSeries[0] && (c.navigator.baseSeries[0].xAxis.options.range = void 0), x = k, n = m);
                    v && f._offsetMin && l(x) && (x += f._offsetMin);
                    f._offsetMax && l(n) && (n += f._offsetMax);
                    this.dropdown && (this.dropdown.selectedIndex = b + 1);
                    if (g)
                        g.setExtremes(x, n, z(a, !0), void 0, { trigger: "rangeSelectorButton", rangeSelectorButton: f });
                    else {
                        var y = e(c.options.xAxis)[0];
                        var D = y.range;
                        y.range =
                            h;
                        var A = y.min;
                        y.min = q;
                        t(c, "load", function () { y.range = D; y.min = A; });
                    }
                    N(this, "afterBtnClick");
                }
            };
            f.prototype.setSelected = function (b) { this.selected = this.options.selected = b; };
            f.prototype.init = function (b) {
                var a = this, c = b.options.rangeSelector, d = c.buttons || a.defaultButtons.slice(), e = c.selected, f = function () { var b = a.minInput, c = a.maxInput; b && b.blur && N(b, "blur"); c && c.blur && N(c, "blur"); };
                a.chart = b;
                a.options = c;
                a.buttons = [];
                a.buttonOptions = d;
                this.eventsToUnbind = [];
                this.eventsToUnbind.push(t(b.container, "mousedown", f));
                this.eventsToUnbind.push(t(b, "resize", f));
                d.forEach(a.computeButtonRange);
                "undefined" !== typeof e && d[e] && this.clickButton(e, !1);
                this.eventsToUnbind.push(t(b, "load", function () { b.xAxis && b.xAxis[0] && t(b.xAxis[0], "setExtremes", function (c) { this.max - this.min !== b.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && a.forcedDataGrouping && !a.frozenStates && this.setDataGrouping(!1, !1); }); }));
            };
            f.prototype.updateButtonStates = function () {
                var b = this, a = this.chart, c = this.dropdown, d = a.xAxis[0], e = Math.round(d.max -
                    d.min), f = !d.hasVisibleSeries, g = a.scroller && a.scroller.getUnionExtremes() || d, h = g.dataMin, k = g.dataMax;
                a = b.getYTDExtremes(k, h, a.time.useUTC);
                var l = a.min, m = a.max, n = b.selected, r = F(n), q = b.options.allButtonsEnabled, t = b.buttons;
                b.buttonOptions.forEach(function (a, g) {
                    var p = a._range, u = a.type, w = a.count || 1, v = t[g], x = 0, y = a._offsetMax - a._offsetMin;
                    a = g === n;
                    var D = p > k - h, z = p < d.minRange, A = !1, H = !1;
                    p = p === e;
                    ("month" === u || "year" === u) && e + 36E5 >= 864E5 * { month: 28, year: 365 }[u] * w - y && e - 36E5 <= 864E5 * { month: 31, year: 366 }[u] * w + y ? p = !0 :
                        "ytd" === u ? (p = m - l + y === e, A = !a) : "all" === u && (p = d.max - d.min >= k - h, H = !a && r && p);
                    u = !q && (D || z || H || f);
                    w = a && p || p && !r && !A || a && b.frozenStates;
                    u ? x = 3 : w && (r = !0, x = 2);
                    v.state !== x && (v.setState(x), c && (c.options[g + 1].disabled = u, 2 === x && (c.selectedIndex = g + 1)), 0 === x && n === g && b.setSelected());
                });
            };
            f.prototype.computeButtonRange = function (b) {
                var a = b.type, c = b.count || 1, d = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5 };
                if (d[a])
                    b._range = d[a] * c;
                else if ("month" === a || "year" === a)
                    b._range = 864E5 * { month: 30, year: 365 }[a] *
                        c;
                b._offsetMin = z(b.offsetMin, 0);
                b._offsetMax = z(b.offsetMax, 0);
                b._range += b._offsetMax - b._offsetMin;
            };
            f.prototype.getInputValue = function (b) { b = "min" === b ? this.minInput : this.maxInput; var a = this.chart.options.rangeSelector, c = this.chart.time; return b ? ("text" === b.type && a.inputDateParser || this.defaultInputDateParser)(b.value, c.useUTC, c) : 0; };
            f.prototype.setInputValue = function (b, a) {
                var c = this.options, d = this.chart.time, e = "min" === b ? this.minInput : this.maxInput;
                b = "min" === b ? this.minDateBox : this.maxDateBox;
                if (e) {
                    var f = e.getAttribute("data-hc-time");
                    f = l(f) ? Number(f) : void 0;
                    l(a) && (l(f) && e.setAttribute("data-hc-time-previous", f), e.setAttribute("data-hc-time", a), f = a);
                    e.value = d.dateFormat(this.inputTypeFormats[e.type] || c.inputEditDateFormat, f);
                    b && b.attr({ text: d.dateFormat(c.inputDateFormat, f) });
                }
            };
            f.prototype.setInputExtremes = function (b, a, c) {
                if (b = "min" === b ? this.minInput : this.maxInput) {
                    var d = this.inputTypeFormats[b.type], e = this.chart.time;
                    d && (a = e.dateFormat(d, a), b.min !== a && (b.min = a), c = e.dateFormat(d, c), b.max !== c && (b.max =
                        c));
                }
            };
            f.prototype.showInput = function (b) {
                var a = "min" === b ? this.minDateBox : this.maxDateBox;
                if ((b = "min" === b ? this.minInput : this.maxInput) && a && this.inputGroup) {
                    var d = "text" === b.type, e = this.inputGroup, f = e.translateX;
                    e = e.translateY;
                    var g = this.options.inputBoxWidth;
                    c(b, { width: d ? a.width + (g ? -2 : 20) + "px" : "auto", height: d ? a.height - 2 + "px" : "auto", border: "2px solid silver" });
                    d && g ? c(b, { left: f + a.x + "px", top: e + "px" }) : c(b, { left: Math.min(Math.round(a.x + f - (b.offsetWidth - a.width) / 2), this.chart.chartWidth - b.offsetWidth) + "px",
                        top: e - (b.offsetHeight - a.height) / 2 + "px" });
                }
            };
            f.prototype.hideInput = function (b) { (b = "min" === b ? this.minInput : this.maxInput) && c(b, { top: "-9999em", border: 0, width: "1px", height: "1px" }); };
            f.prototype.defaultInputDateParser = function (b, a, c) {
                var d = b.split("/").join("-").split(" ").join("T");
                -1 === d.indexOf("T") && (d += "T00:00");
                if (a)
                    d += "Z";
                else {
                    var e;
                    if (e = B.isSafari)
                        e = d, e = !(6 < e.length && (e.lastIndexOf("-") === e.length - 6 || e.lastIndexOf("+") === e.length - 6));
                    e && (e = (new Date(d)).getTimezoneOffset() / 60, d += 0 >= e ? "+".concat(y(-e), ":00") : "-".concat(y(e), ":00"));
                }
                d = Date.parse(d);
                F(d) || (b = b.split("-"), d = Date.UTC(w(b[0]), w(b[1]) - 1, w(b[2])));
                c && a && F(d) && (d += c.getTimezoneOffset(d));
                return d;
            };
            f.prototype.drawInput = function (b) {
                function a() {
                    var a = g.getInputValue(b), c = d.xAxis[0], e = d.scroller && d.scroller.xAxis ? d.scroller.xAxis : c, f = e.dataMin;
                    e = e.dataMax;
                    var h = g.maxInput, k = g.minInput;
                    a !== Number(r.getAttribute("data-hc-time-previous")) && F(a) && (r.setAttribute("data-hc-time-previous", a), m && h && F(f) ? a > Number(h.getAttribute("data-hc-time")) ?
                        a = void 0 : a < f && (a = f) : k && F(e) && (a < Number(k.getAttribute("data-hc-time")) ? a = void 0 : a > e && (a = e)), "undefined" !== typeof a && c.setExtremes(m ? a : c.min, m ? c.max : a, void 0, void 0, { trigger: "rangeSelectorInput" }));
                }
                var d = this.chart, e = this.div, f = this.inputGroup, g = this, h = d.renderer.style || {}, k = d.renderer, l = d.options.rangeSelector, m = "min" === b, n = A.lang[m ? "rangeSelectorFrom" : "rangeSelectorTo"] || "";
                n = k.label(n, 0).addClass("highcharts-range-label").attr({ padding: n ? 2 : 0, height: n ? l.inputBoxHeight : 0 }).add(f);
                k = k.label("", 0).addClass("highcharts-range-input").attr({ padding: 2,
                    width: l.inputBoxWidth, height: l.inputBoxHeight, "text-align": "center" }).on("click", function () { g.showInput(b); g[b + "Input"].focus(); });
                d.styledMode || k.attr({ stroke: l.inputBoxBorderColor, "stroke-width": 1 });
                k.add(f);
                var r = q("input", { name: b, className: "highcharts-range-selector" }, void 0, e);
                r.setAttribute("type", C(l.inputDateFormat || "%b %e, %Y"));
                d.styledMode || (n.css(L(h, l.labelStyle)), k.css(L({ color: "#333333" }, h, l.inputStyle)), c(r, v({ position: "absolute", border: 0, boxShadow: "0 0 15px rgba(0,0,0,0.3)", width: "1px",
                    height: "1px", padding: 0, textAlign: "center", fontSize: h.fontSize, fontFamily: h.fontFamily, top: "-9999em" }, l.inputStyle)));
                r.onfocus = function () { g.showInput(b); };
                r.onblur = function () { r === B.doc.activeElement && a(); g.hideInput(b); g.setInputValue(b); r.blur(); };
                var t = !1;
                r.onchange = function () { t || (a(), g.hideInput(b), r.blur()); };
                r.onkeypress = function (b) { 13 === b.keyCode && a(); };
                r.onkeydown = function (b) { t = !0; 38 !== b.keyCode && 40 !== b.keyCode || a(); };
                r.onkeyup = function () { t = !1; };
                return { dateBox: k, input: r, label: n };
            };
            f.prototype.getPosition =
                function () { var b = this.chart, a = b.options.rangeSelector; b = "top" === a.verticalAlign ? b.plotTop - b.axisOffset[0] : 0; return { buttonTop: b + a.buttonPosition.y, inputTop: b + a.inputPosition.y - 10 }; };
            f.prototype.getYTDExtremes = function (b, a, c) { var d = this.chart.time, e = new d.Date(b), f = d.get("FullYear", e); c = c ? d.Date.UTC(f, 0, 1) : +new d.Date(f, 0, 1); a = Math.max(a, c); e = e.getTime(); return { max: Math.min(b || e, e), min: a }; };
            f.prototype.render = function (b, a) {
                var c = this.chart, d = c.renderer, e = c.container, f = c.options, g = f.rangeSelector, h = z(f.chart.style &&
                    f.chart.style.zIndex, 0) + 1;
                f = g.inputEnabled;
                if (!1 !== g.enabled) {
                    this.rendered || (this.group = d.g("range-selector-group").attr({ zIndex: 7 }).add(), this.div = q("div", void 0, { position: "relative", height: 0, zIndex: h }), this.buttonOptions.length && this.renderButtons(), e.parentNode && e.parentNode.insertBefore(this.div, e), f && (this.inputGroup = d.g("input-group").add(this.group), d = this.drawInput("min"), this.minDateBox = d.dateBox, this.minLabel = d.label, this.minInput = d.input, d = this.drawInput("max"), this.maxDateBox = d.dateBox,
                        this.maxLabel = d.label, this.maxInput = d.input));
                    if (f && (this.setInputValue("min", b), this.setInputValue("max", a), b = c.scroller && c.scroller.getUnionExtremes() || c.xAxis[0] || {}, l(b.dataMin) && l(b.dataMax) && (c = c.xAxis[0].minRange || 0, this.setInputExtremes("min", b.dataMin, Math.min(b.dataMax, this.getInputValue("max")) - c), this.setInputExtremes("max", Math.max(b.dataMin, this.getInputValue("min")) + c, b.dataMax)), this.inputGroup)) {
                        var k = 0;
                        [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach(function (b) {
                            if (b) {
                                var a = b.getBBox().width;
                                a && (b.attr({ x: k }), k += a + g.inputSpacing);
                            }
                        });
                    }
                    this.alignElements();
                    this.rendered = !0;
                }
            };
            f.prototype.renderButtons = function () {
                var b = this, a = this.buttons, c = this.options, d = A.lang, e = this.chart.renderer, f = L(c.buttonTheme), g = f && f.states, h = f.width || 28;
                delete f.width;
                delete f.states;
                this.buttonGroup = e.g("range-selector-buttons").add(this.group);
                var k = this.dropdown = q("select", void 0, { position: "absolute", width: "1px", height: "1px", padding: 0, border: 0, top: "-9999em", cursor: "pointer", opacity: .0001 }, this.div);
                t(k, "touchstart", function () { k.style.fontSize = "16px"; });
                [[B.isMS ? "mouseover" : "mouseenter"], [B.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach(function (c) { var d = c[0], e = c[1]; t(k, d, function () { var c = a[b.currentButtonIndex()]; c && N(c.element, e || d); }); });
                this.zoomText = e.label(d && d.rangeSelectorZoom || "", 0).attr({ padding: c.buttonTheme.padding, height: c.buttonTheme.height, paddingLeft: 0, paddingRight: 0 }).add(this.buttonGroup);
                this.chart.styledMode || (this.zoomText.css(c.labelStyle), f["stroke-width"] = z(f["stroke-width"], 0));
                q("option", { textContent: this.zoomText.textStr, disabled: !0 }, void 0, k);
                this.buttonOptions.forEach(function (c, d) { q("option", { textContent: c.title || c.text }, void 0, k); a[d] = e.button(c.text, 0, 0, function (a) { var e = c.events && c.events.click, f; e && (f = e.call(c, a)); !1 !== f && b.clickButton(d); b.isActive = !0; }, f, g && g.hover, g && g.select, g && g.disabled).attr({ "text-align": "center", width: h }).add(b.buttonGroup); c.title && a[d].attr("title", c.title); });
            };
            f.prototype.alignElements = function () {
                var a = this, c = this.buttonGroup, d = this.buttons, e = this.chart, f = this.group, g = this.inputGroup, h = this.options, k = this.zoomText, l = e.options, m = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions;
                l = h.buttonPosition;
                var n = h.inputPosition, r = h.verticalAlign, q = function (b, c) { return m && a.titleCollision(e) && "top" === r && "right" === c.align && c.y - b.getBBox().height - 12 < (m.y || 0) + (m.height || 0) + e.spacing[0] ? -40 : 0; }, t = e.plotLeft;
                if (f && l && n) {
                    var w = l.x - e.spacing[3];
                    if (c) {
                        this.positionButtons();
                        if (!this.initialButtonGroupWidth) {
                            var v = 0;
                            k && (v += k.getBBox().width +
                                5);
                            d.forEach(function (a, b) { v += a.width; b !== d.length - 1 && (v += h.buttonSpacing); });
                            this.initialButtonGroupWidth = v;
                        }
                        t -= e.spacing[3];
                        this.updateButtonStates();
                        k = q(c, l);
                        this.alignButtonGroup(k);
                        f.placed = c.placed = e.hasLoaded;
                    }
                    c = 0;
                    g && (c = q(g, n), "left" === n.align ? w = t : "right" === n.align && (w = -Math.max(e.axisOffset[1], -c)), g.align({ y: n.y, width: g.getBBox().width, align: n.align, x: n.x + w - 2 }, !0, e.spacingBox), g.placed = e.hasLoaded);
                    this.handleCollision(c);
                    f.align({ verticalAlign: r }, !0, e.spacingBox);
                    g = f.alignAttr.translateY;
                    c =
                        f.getBBox().height + 20;
                    q = 0;
                    "bottom" === r && (q = (q = e.legend && e.legend.options) && "bottom" === q.verticalAlign && q.enabled && !q.floating ? e.legend.legendHeight + z(q.margin, 10) : 0, c = c + q - 20, q = g - c - (h.floating ? 0 : h.y) - (e.titleOffset ? e.titleOffset[2] : 0) - 10);
                    if ("top" === r)
                        h.floating && (q = 0), e.titleOffset && e.titleOffset[0] && (q = e.titleOffset[0]), q += e.margin[0] - e.spacing[0] || 0;
                    else if ("middle" === r)
                        if (n.y === l.y)
                            q = g;
                        else if (n.y || l.y)
                            q = 0 > n.y || 0 > l.y ? q - Math.min(n.y, l.y) : g - c;
                    f.translate(h.x, h.y + Math.floor(q));
                    l = this.minInput;
                    n =
                        this.maxInput;
                    g = this.dropdown;
                    h.inputEnabled && l && n && (l.style.marginTop = f.translateY + "px", n.style.marginTop = f.translateY + "px");
                    g && (g.style.marginTop = f.translateY + "px");
                }
            };
            f.prototype.alignButtonGroup = function (a, c) { var b = this.chart, d = this.buttonGroup, e = this.options.buttonPosition, f = b.plotLeft - b.spacing[3], g = e.x - b.spacing[3]; "right" === e.align ? g += a - f : "center" === e.align && (g -= f / 2); d && d.align({ y: e.y, width: z(c, this.initialButtonGroupWidth), align: e.align, x: g }, !0, b.spacingBox); };
            f.prototype.positionButtons = function () {
                var a = this.buttons, c = this.chart, d = this.options, e = this.zoomText, f = c.hasLoaded ? "animate" : "attr", g = d.buttonPosition, h = c.plotLeft, k = h;
                e && "hidden" !== e.visibility && (e[f]({ x: z(h + g.x, h) }), k += g.x + e.getBBox().width + 5);
                this.buttonOptions.forEach(function (b, c) { if ("hidden" !== a[c].visibility)
                    a[c][f]({ x: k }), k += a[c].width + d.buttonSpacing;
                else
                    a[c][f]({ x: h }); });
            };
            f.prototype.handleCollision = function (a) {
                var b = this, c = this.chart, d = this.buttonGroup, e = this.inputGroup, f = this.options, g = f.buttonPosition, h = f.dropdown, k = f.inputPosition;
                f = function () { var a = 0; b.buttons.forEach(function (b) { b = b.getBBox(); b.width > a && (a = b.width); }); return a; };
                var l = function (b) { if (e && d) {
                    var c = e.alignAttr.translateX + e.alignOptions.x - a + e.getBBox().x + 2, f = e.alignOptions.width, h = d.alignAttr.translateX + d.getBBox().x;
                    return h + b > c && c + f > h && g.y < k.y + e.getBBox().height;
                } return !1; }, m = function () { e && d && e.attr({ translateX: e.alignAttr.translateX + (c.axisOffset[1] >= -a ? 0 : -a), translateY: e.alignAttr.translateY + d.getBBox().height + 10 }); };
                if (d) {
                    if ("always" === h) {
                        this.collapseButtons(a);
                        l(f()) && m();
                        return;
                    }
                    "never" === h && this.expandButtons();
                }
                e && d ? k.align === g.align || l(this.initialButtonGroupWidth + 20) ? "responsive" === h ? (this.collapseButtons(a), l(f()) && m()) : m() : "responsive" === h && this.expandButtons() : d && "responsive" === h && (this.initialButtonGroupWidth > c.plotWidth ? this.collapseButtons(a) : this.expandButtons());
            };
            f.prototype.collapseButtons = function (a) {
                var b = this.buttons, c = this.buttonOptions, d = this.chart, e = this.dropdown, f = this.options, g = this.zoomText, h = d.userOptions.rangeSelector && d.userOptions.rangeSelector.buttonTheme ||
                    {}, k = function (a) { return { text: a ? "" + a + " \u25be" : "\u25be", width: "auto", paddingLeft: z(f.buttonTheme.paddingLeft, h.padding, 8), paddingRight: z(f.buttonTheme.paddingRight, h.padding, 8) }; };
                g && g.hide();
                var l = !1;
                c.forEach(function (a, c) { c = b[c]; 2 !== c.state ? c.hide() : (c.show(), c.attr(k(a.text)), l = !0); });
                l || (e && (e.selectedIndex = 0), b[0].show(), b[0].attr(k(this.zoomText && this.zoomText.textStr)));
                c = f.buttonPosition.align;
                this.positionButtons();
                "right" !== c && "center" !== c || this.alignButtonGroup(a, b[this.currentButtonIndex()].getBBox().width);
                this.showDropdown();
            };
            f.prototype.expandButtons = function () { var a = this.buttons, c = this.buttonOptions, d = this.options, e = this.zoomText; this.hideDropdown(); e && e.show(); c.forEach(function (b, c) { c = a[c]; c.show(); c.attr({ text: b.text, width: d.buttonTheme.width || 28, paddingLeft: z(d.buttonTheme.paddingLeft, "unset"), paddingRight: z(d.buttonTheme.paddingRight, "unset") }); 2 > c.state && c.setState(0); }); this.positionButtons(); };
            f.prototype.currentButtonIndex = function () {
                var a = this.dropdown;
                return a && 0 < a.selectedIndex ? a.selectedIndex -
                    1 : 0;
            };
            f.prototype.showDropdown = function () { var a = this.buttonGroup, d = this.buttons, e = this.chart, f = this.dropdown; if (a && f) {
                var g = a.translateX;
                a = a.translateY;
                d = d[this.currentButtonIndex()].getBBox();
                c(f, { left: e.plotLeft + g + "px", top: a + .5 + "px", width: d.width + "px", height: d.height + "px" });
                this.hasVisibleDropdown = !0;
            } };
            f.prototype.hideDropdown = function () { var a = this.dropdown; a && (c(a, { top: "-9999em", width: "1px", height: "1px" }), this.hasVisibleDropdown = !1); };
            f.prototype.getHeight = function () {
                var a = this.options, c = this.group, d = a.y, e = a.buttonPosition.y, f = a.inputPosition.y;
                if (a.height)
                    return a.height;
                this.alignElements();
                a = c ? c.getBBox(!0).height + 13 + d : 0;
                c = Math.min(f, e);
                if (0 > f && 0 > e || 0 < f && 0 < e)
                    a += Math.abs(c);
                return a;
            };
            f.prototype.titleCollision = function (a) { return !(a.options.title.text || a.options.subtitle.text); };
            f.prototype.update = function (a) { var b = this.chart; L(!0, b.options.rangeSelector, a); this.destroy(); this.init(b); this.render(); };
            f.prototype.destroy = function () {
                var b = this, c = b.minInput, d = b.maxInput;
                b.eventsToUnbind && (b.eventsToUnbind.forEach(function (a) { return a(); }),
                    b.eventsToUnbind = void 0);
                a(b.buttons);
                c && (c.onfocus = c.onblur = c.onchange = null);
                d && (d.onfocus = d.onblur = d.onchange = null);
                J(b, function (a, c) { a && "chart" !== c && (a instanceof x ? a.destroy() : a instanceof U.HTMLElement && k(a)); a !== f.prototype[c] && (b[c] = null); }, this);
            };
            return f;
        }();
        r.prototype.defaultButtons = [{ type: "month", count: 1, text: "1m", title: "View 1 month" }, { type: "month", count: 3, text: "3m", title: "View 3 months" }, { type: "month", count: 6, text: "6m", title: "View 6 months" }, { type: "ytd", text: "YTD", title: "View year to date" },
            { type: "year", count: 1, text: "1y", title: "View 1 year" }, { type: "all", text: "All", title: "View all" }];
        r.prototype.inputTypeFormats = { "datetime-local": "%Y-%m-%dT%H:%M:%S", date: "%Y-%m-%d", time: "%H:%M:%S" };
        d.prototype.minFromRange = function () {
            var a = this.range, b = a.type, c = this.max, d = this.chart.time, e = function (a, c) { var e = "year" === b ? "FullYear" : "Month", f = new d.Date(a), g = d.get(e, f); d.set(e, f, g + c); g === d.get(e, f) && d.set("Date", f, 0); return f.getTime() - a; };
            if (F(a)) {
                var g = c - a;
                var h = a;
            }
            else
                a && (g = c + e(c, -(a.count || 1)), this.chart &&
                    (this.chart.fixedRange = c - g));
            var k = z(this.dataMin, Number.MIN_VALUE);
            F(g) || (g = k);
            g <= k && (g = k, "undefined" === typeof h && (h = e(g, a.count)), this.newMax = Math.min(g + h, z(this.dataMax, Number.MAX_VALUE)));
            F(c) ? !F(a) && a && a._offsetMin && (g += a._offsetMin) : g = void 0;
            return g;
        };
        if (!B.RangeSelector) {
            var h = [], n = function (a) {
                function b() {
                    d && (c = a.xAxis[0].getExtremes(), e = a.legend, g = d && d.options.verticalAlign, F(c.min) && d.render(c.min, c.max), e.display && "top" === g && g === e.options.verticalAlign && (f = L(a.spacingBox), f.y = "vertical" ===
                        e.options.layout ? a.plotTop : f.y + d.getHeight(), e.group.placed = !1, e.align(f)));
                }
                var c, d = a.rangeSelector, e, f, g;
                d && (m(h, function (b) { return b[0] === a; }) || h.push([a, [t(a.xAxis[0], "afterSetExtremes", function (a) { d && d.render(a.min, a.max); }), t(a, "redraw", b)]]), b());
            };
            t(g, "afterGetContainer", function () { this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new r(this)); });
            t(g, "beforeRender", function () {
                var a = this.axes, b = this.rangeSelector;
                b && (F(b.deferredYTDClick) && (b.clickButton(b.deferredYTDClick),
                    delete b.deferredYTDClick), a.forEach(function (a) { a.updateNames(); a.setScale(); }), this.getAxisMargins(), b.render(), a = b.options.verticalAlign, b.options.floating || ("bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)));
            });
            t(g, "update", function (a) {
                var b = a.options.rangeSelector;
                a = this.rangeSelector;
                var c = this.extraBottomMargin, d = this.extraTopMargin;
                b && b.enabled && !l(a) && this.options.rangeSelector && (this.options.rangeSelector.enabled = !0, this.rangeSelector = a = new r(this));
                this.extraTopMargin =
                    this.extraBottomMargin = !1;
                a && (n(this), b = b && b.verticalAlign || a.options && a.options.verticalAlign, a.options.floating || ("bottom" === b ? this.extraBottomMargin = !0 : "middle" !== b && (this.extraTopMargin = !0)), this.extraBottomMargin !== c || this.extraTopMargin !== d) && (this.isDirtyBox = !0);
            });
            t(g, "render", function () { var a = this.rangeSelector; a && !a.options.floating && (a.render(), a = a.options.verticalAlign, "bottom" === a ? this.extraBottomMargin = !0 : "middle" !== a && (this.extraTopMargin = !0)); });
            t(g, "getMargins", function () {
                var a = this.rangeSelector;
                a && (a = a.getHeight(), this.extraTopMargin && (this.plotTop += a), this.extraBottomMargin && (this.marginBottom += a));
            });
            g.prototype.callbacks.push(n);
            t(g, "destroy", function () { for (var a = 0; a < h.length; a++) {
                var b = h[a];
                if (b[0] === this) {
                    b[1].forEach(function (a) { return a(); });
                    h.splice(a, 1);
                    break;
                }
            } });
            B.RangeSelector = r;
        }
        return r;
    });
    P(g, "Core/Chart/StockChart.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g["Core/Chart/Chart.js"], g["Core/FormatUtilities.js"], g["Core/DefaultOptions.js"], g["Core/Series/Series.js"],
        g["Core/Renderer/SVG/SVGRenderer.js"], g["Core/Utilities.js"]], function (d, g, B, E, x, G, I, A) {
        function t(a, c) { return "xAxis" === a ? { minPadding: 0, maxPadding: 0, overscroll: 0, ordinal: !0, title: { text: null }, labels: { overflow: "justify" }, showLastLabel: !0 } : "yAxis" === a ? { labels: { y: -2 }, opposite: y(c.opposite, !0), showLastLabel: !(!c.categories && "category" !== c.type), title: { text: null } } : {}; }
        function q(c, d) {
            if ("xAxis" === c) {
                c = a();
                var e = { type: "datetime", categories: void 0 };
                y(d.navigator && d.navigator.enabled, c.navigator.enabled, !0) &&
                    (e.startOnTick = !1, e.endOnTick = !1);
                return e;
            }
            return {};
        }
        var c = this && this.__extends || function () { var a = function (c, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c; } || function (a, c) { for (var d in c)
            c.hasOwnProperty(d) && (a[d] = c[d]); }; return a(c, d); }; return function (c, d) { function e() { this.constructor = c; } a(c, d); c.prototype = null === d ? Object.create(d) : (e.prototype = d.prototype, new e); }; }(), l = E.format, a = x.getOptions;
        d = A.addEvent;
        var k = A.clamp, v = A.defined, m = A.extend, C = A.find, F = A.isNumber, L = A.isString, J = A.merge, y = A.pick, z = A.splat;
        A = function (d) {
            function e() { return null !== d && d.apply(this, arguments) || this; }
            c(e, d);
            e.prototype.init = function (c, e) {
                var g = a(), f = c.xAxis, b = c.yAxis, h = y(c.navigator && c.navigator.enabled, g.navigator.enabled, !0);
                c.xAxis = c.yAxis = void 0;
                h = J({ chart: { panning: { enabled: !0, type: "x" }, pinchType: "x" }, navigator: { enabled: h }, scrollbar: { enabled: y(g.scrollbar && g.scrollbar.enabled, !0) }, rangeSelector: { enabled: y(g.rangeSelector.enabled, !0) }, title: { text: null }, tooltip: { split: y(g.tooltip.split, !0), crosshairs: !0 }, legend: { enabled: !1 } }, c, { isStock: !0 });
                c.xAxis = f;
                c.yAxis = b;
                h.xAxis = z(c.xAxis || {}).map(function (a, b) { return J(t("xAxis", a), g.xAxis, g.xAxis && g.xAxis[b], a, q("xAxis", c)); });
                h.yAxis = z(c.yAxis || {}).map(function (a, b) { return J(t("yAxis", a), g.yAxis, g.yAxis && g.yAxis[b], a); });
                d.prototype.init.call(this, h, e);
            };
            e.prototype.createAxis = function (a, c) { c.axis = J(t(a, c.axis), c.axis, q(a, this.userOptions)); return d.prototype.createAxis.call(this, a, c); };
            return e;
        }(B);
        (function (a) {
            a.stockChart = function (c, d, g) {
                return new a(c, d, g);
            };
        })(A || (A = {}));
        d(G, "setOptions", function (a) { var c; this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? c = { borderWidth: 0, shadow: !1 } : this.is("scatter") || this.is("sma") || (c = { marker: { enabled: !1, radius: 2 } }), c && (a.plotOptions[this.type] = J(a.plotOptions[this.type], c))); });
        d(g, "autoLabelAlign", function (a) {
            var c = this.chart, d = this.options;
            c = c._labelPanes = c._labelPanes || {};
            var g = this.options.labels;
            this.chart.options.isStock && "yAxis" === this.coll && (d = d.top + "," + d.height, !c[d] && g.enabled &&
                (15 === g.x && (g.x = 0), "undefined" === typeof g.align && (g.align = "right"), c[d] = this, a.align = "right", a.preventDefault()));
        });
        d(g, "destroy", function () { var a = this.chart, c = this.options && this.options.top + "," + this.options.height; c && a._labelPanes && a._labelPanes[c] === this && delete a._labelPanes[c]; });
        d(g, "getPlotLinePath", function (a) {
            function c(a) { var b = "xAxis" === a ? "yAxis" : "xAxis"; a = d.options[b]; return F(a) ? [l[b][a]] : L(a) ? [l.get(a)] : g.map(function (a) { return a[b]; }); }
            var d = this, g = this.isLinked && !this.series ? this.linkedParent.series :
                this.series, l = d.chart, f = l.renderer, b = d.left, m = d.top, q, p, t, w, x = [], z = [], A = a.translatedValue, B = a.value, E = a.force;
            if (l.options.isStock && !1 !== a.acrossPanes && "xAxis" === d.coll || "yAxis" === d.coll) {
                a.preventDefault();
                z = c(d.coll);
                var G = d.isXAxis ? l.yAxis : l.xAxis;
                G.forEach(function (a) { if (v(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis";
                    b = v(a.options[b]) ? l[b][a.options[b]] : l[b][0];
                    d === b && z.push(a);
                } });
                var I = z.length ? [] : [d.isXAxis ? l.yAxis[0] : l.xAxis[0]];
                z.forEach(function (a) {
                    -1 !==
                        I.indexOf(a) || C(I, function (b) { return b.pos === a.pos && b.len === a.len; }) || I.push(a);
                });
                var J = y(A, d.translate(B, void 0, void 0, a.old));
                F(J) && (d.horiz ? I.forEach(function (a) { var c; p = a.pos; w = p + a.len; q = t = Math.round(J + d.transB); "pass" !== E && (q < b || q > b + d.width) && (E ? q = t = k(q, b, b + d.width) : c = !0); c || x.push(["M", q, p], ["L", t, w]); }) : I.forEach(function (a) { var b; q = a.pos; t = q + a.len; p = w = Math.round(m + d.height - J); "pass" !== E && (p < m || p > m + d.height) && (E ? p = w = k(p, m, m + d.height) : b = !0); b || x.push(["M", q, p], ["L", t, w]); }));
                a.path = 0 < x.length ?
                    f.crispPolyLine(x, a.lineWidth || 1) : null;
            }
        });
        I.prototype.crispPolyLine = function (a, c) { for (var d = 0; d < a.length; d += 2) {
            var e = a[d], g = a[d + 1];
            e[1] === g[1] && (e[1] = g[1] = Math.round(e[1]) - c % 2 / 2);
            e[2] === g[2] && (e[2] = g[2] = Math.round(e[2]) + c % 2 / 2);
        } return a; };
        d(g, "afterHideCrosshair", function () { this.crossLabel && (this.crossLabel = this.crossLabel.hide()); });
        d(g, "afterDrawCrosshair", function (a) {
            var c, d;
            if (this.crosshair && this.crosshair.label && this.crosshair.label.enabled && this.cross && F(this.min) && F(this.max)) {
                var g = this.chart, k = this.logarithmic, f = this.crosshair.label, b = this.horiz, q = this.opposite, t = this.left, p = this.top, u = this.crossLabel, v = f.format, w = "", x = "inside" === this.options.tickPosition, z = !1 !== this.crosshair.snap, A = 0, B = a.e || this.cross && this.cross.e;
                a = a.point;
                var C = this.min, E = this.max;
                k && (C = k.lin2log(C), E = k.lin2log(E));
                k = b ? "center" : q ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                u || (u = this.crossLabel = g.renderer.label("", 0, void 0, f.shape || "callout").addClass("highcharts-crosshair-label highcharts-color-" +
                    (a ? a.series.colorIndex : this.series[0] && this.series[0].colorIndex)).attr({ align: f.align || k, padding: y(f.padding, 8), r: y(f.borderRadius, 3), zIndex: 2 }).add(this.labelGroup), g.styledMode || u.attr({ fill: f.backgroundColor || a && a.series && a.series.color || "#666666", stroke: f.borderColor || "", "stroke-width": f.borderWidth || 0 }).css(m({ color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center" }, f.style || {})));
                b ? (k = z ? (a.plotX || 0) + t : B.chartX, p += q ? 0 : this.height) : (k = q ? this.width + t : 0, p = z ? (a.plotY || 0) + p : B.chartY);
                v || f.formatter || (this.dateTime && (w = "%b %d, %Y"), v = "{value" + (w ? ":" + w : "") + "}");
                w = z ? this.isXAxis ? a.x : a.y : this.toValue(b ? B.chartX : B.chartY);
                z = a ? a.series.isPointInside(a) : F(w) && w > C && w < E;
                B = "";
                v ? B = l(v, { value: w }, g) : f.formatter && F(w) && (B = f.formatter.call(this, w));
                u.attr({ text: B, x: k, y: p, visibility: z ? "inherit" : "hidden" });
                f = u.getBBox();
                if (F(u.y))
                    if (b) {
                        if (x && !q || !x && q)
                            p = u.y - f.height;
                    }
                    else
                        p = u.y - f.height / 2;
                b ? (c = t - f.x, d = t + this.width - f.x) : (c = "left" === this.labelAlign ? t : 0, d = "right" === this.labelAlign ? t + this.width : g.chartWidth);
                u.translateX < c && (A = c - u.translateX);
                u.translateX + f.width >= d && (A = -(u.translateX + f.width - d));
                u.attr({ x: k + A, y: p, anchorX: b ? k : this.opposite ? 0 : g.chartWidth, anchorY: b ? this.opposite ? g.chartHeight : 0 : p + f.height / 2 });
            }
        });
        G.prototype.forceCropping = function () { var a = this.chart, c = this.options.dataGrouping; return !1 !== this.allowDG && c && y(c.enabled, a.options.isStock); };
        d(B, "update", function (a) { a = a.options; "scrollbar" in a && this.navigator && (J(!0, this.options.scrollbar, a.scrollbar), this.navigator.update({}, !1), delete a.scrollbar); });
        return A;
    });
    P(g, "masters/modules/stock.src.js", [g["Core/Globals.js"], g["Core/Axis/OrdinalAxis.js"], g["Series/DataModifyComposition.js"], g["Core/Scrollbar.js"], g["Core/Chart/StockChart.js"]], function (d, g, B, E, x) { d.Scrollbar = E; d.StockChart = d.stockChart = x.stockChart; E.compose(d.Axis); g.compose(d.Axis, d.Series, d.Chart); B.compose(d.Series, d.Axis, d.Point); });
    P(g, "masters/highstock.src.js", [g["masters/highcharts.src.js"]], function (d) { d.product = "Highstock"; return d; });
    g["masters/highstock.src.js"]._modules = g;
    return g["masters/highstock.src.js"];
});
//# sourceMappingURL=highstock.js.map
//# sourceMappingURL=highstock.js.map