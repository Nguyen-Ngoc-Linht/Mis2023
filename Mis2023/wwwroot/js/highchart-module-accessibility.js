﻿/*
 Highcharts JS v8.0.4 (2020-03-10)

 Accessibility module

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/accessibility", ["highcharts"], function (t) { a(t); a.Highcharts = t; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function t(a, f, l, m) { a.hasOwnProperty(f) || (a[f] = m.apply(null, l)) } a = a ? a._modules : {}; t(a, "modules/accessibility/utils/htmlUtilities.js", [a["parts/Utilities.js"], a["parts/Globals.js"]], function (a, f) {
        function q(a) {
            return a.replace(/&/g,
                "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
        } var m = a.merge, p = f.win, e = p.document; return {
            addClass: function (a, g) { a.classList ? a.classList.add(g) : 0 > a.className.indexOf(g) && (a.className += g) }, escapeStringForHTML: q, getElement: function (a) { return e.getElementById(a) }, getFakeMouseEvent: function (a) {
                if ("function" === typeof p.MouseEvent) return new p.MouseEvent(a); if (e.createEvent) {
                    var g = e.createEvent("MouseEvent"); if (g.initMouseEvent) return g.initMouseEvent(a,
                        !0, !0, p, "click" === a ? 1 : 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), g
                } return { type: a }
            }, removeElement: function (a) { a && a.parentNode && a.parentNode.removeChild(a) }, reverseChildNodes: function (a) { for (var g = a.childNodes.length; g--;)a.appendChild(a.childNodes[g]) }, setElAttrs: function (a, g) { Object.keys(g).forEach(function (e) { var c = g[e]; null === c ? a.removeAttribute(e) : (c = q("" + c), a.setAttribute(e, c)) }) }, stripHTMLTagsFromString: function (a) { return "string" === typeof a ? a.replace(/<\/?[^>]+(>|$)/g, "") : a }, visuallyHideElement: function (a) {
                m(!0,
                    a.style, { position: "absolute", width: "1px", height: "1px", overflow: "hidden", whiteSpace: "nowrap", clip: "rect(1px, 1px, 1px, 1px)", marginTop: "-3px", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)", filter: "alpha(opacity=1)", opacity: "0.01" })
            }
        }
    }); t(a, "modules/accessibility/utils/chartUtilities.js", [a["modules/accessibility/utils/htmlUtilities.js"], a["parts/Utilities.js"]], function (a, f) {
        function q(a) { if (a.points && a.points.length && a.points[0].graphic) return a.points[0].graphic.element } function m(a) {
            var g =
                q(a); return g && g.parentNode || a.graph && a.graph.element || a.group && a.group.element
        } function p(a, e) { e.setAttribute("aria-hidden", !1); e !== a.renderTo && e.parentNode && (Array.prototype.forEach.call(e.parentNode.childNodes, function (a) { a.hasAttribute("aria-hidden") || a.setAttribute("aria-hidden", !0) }), p(a, e.parentNode)) } var e = a.stripHTMLTagsFromString, h = f.find; return {
            getChartTitle: function (a) { return e(a.options.title.text || a.langFormat("accessibility.defaultChartTitle", { chart: a })) }, getAxisDescription: function (a) {
                return e(a &&
                    (a.userOptions && a.userOptions.accessibility && a.userOptions.accessibility.description || a.axisTitle && a.axisTitle.textStr || a.options.id || a.categories && "categories" || a.isDatetimeAxis && "Time" || "values"))
            }, getPointFromXY: function (a, e, c) { for (var d = a.length, b; d--;)if (b = h(a[d].points || [], function (b) { return b.x === e && b.y === c })) return b }, getSeriesFirstPointElement: q, getSeriesFromName: function (a, e) { return e ? (a.series || []).filter(function (a) { return a.name === e }) : a.series }, getSeriesA11yElement: m, unhideChartElementFromAT: p,
            hideSeriesFromAT: function (a) { (a = m(a)) && a.setAttribute("aria-hidden", !0) }
        }
    }); t(a, "modules/accessibility/KeyboardNavigationHandler.js", [a["parts/Utilities.js"]], function (a) {
        function q(a, q) { this.chart = a; this.keyCodeMap = q.keyCodeMap || []; this.validate = q.validate; this.init = q.init; this.terminate = q.terminate; this.response = { success: 1, prev: 2, next: 3, noHandler: 4, fail: 5 } } var l = a.find; q.prototype = {
            run: function (a) {
                var q = a.which || a.keyCode, e = this.response.noHandler, h = l(this.keyCodeMap, function (a) { return -1 < a[0].indexOf(q) });
                h ? e = h[1].call(this, q, a) : 9 === q && (e = this.response[a.shiftKey ? "prev" : "next"]); return e
            }
        }; return q
    }); t(a, "modules/accessibility/utils/EventProvider.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, f) { var q = f.addEvent; f = f.extend; var m = function () { this.eventRemovers = [] }; f(m.prototype, { addEvent: function () { var f = q.apply(a, arguments); this.eventRemovers.push(f); return f }, removeAddedEvents: function () { this.eventRemovers.forEach(function (a) { a() }); this.eventRemovers = [] } }); return m }); t(a, "modules/accessibility/utils/DOMElementProvider.js",
        [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l) { var q = a.win.document; a = f.extend; var p = l.removeElement; l = function () { this.elements = [] }; a(l.prototype, { createElement: function () { var a = q.createElement.apply(q, arguments); this.elements.push(a); return a }, destroyCreatedElements: function () { this.elements.forEach(function (a) { p(a) }); this.elements = [] } }); return l }); t(a, "modules/accessibility/AccessibilityComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"],
        a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/EventProvider.js"], a["modules/accessibility/utils/DOMElementProvider.js"]], function (a, f, l, m, p, e) {
            function h() { } var g = a.win, n = g.document, c = a.fireEvent; a = f.extend; var d = f.merge, b = l.removeElement, r = l.getFakeMouseEvent, k = m.unhideChartElementFromAT; h.prototype = {
                initBase: function (b) {
                this.chart = b; this.eventProvider = new p; this.domElementProvider = new e; this.keyCodes = {
                    left: 37,
                    right: 39, up: 38, down: 40, enter: 13, space: 32, esc: 27, tab: 9
                }
                }, addEvent: function () { return this.eventProvider.addEvent.apply(this.eventProvider, arguments) }, createElement: function () { return this.domElementProvider.createElement.apply(this.domElementProvider, arguments) }, fireEventOnWrappedOrUnwrappedElement: function (b, a) { var d = a.type; n.createEvent && (b.dispatchEvent || b.fireEvent) ? b.dispatchEvent ? b.dispatchEvent(a) : b.fireEvent(d, a) : c(b, d, a) }, fakeClickEvent: function (b) {
                    if (b) {
                        var a = r("click"); this.fireEventOnWrappedOrUnwrappedElement(b,
                            a)
                    }
                }, addProxyGroup: function (b) { this.createOrUpdateProxyContainer(); var a = this.createElement("div"); Object.keys(b || {}).forEach(function (d) { null !== b[d] && a.setAttribute(d, b[d]) }); this.chart.a11yProxyContainer.appendChild(a); return a }, createOrUpdateProxyContainer: function () { var b = this.chart, a = b.renderer.box; b.a11yProxyContainer = b.a11yProxyContainer || this.createProxyContainerElement(); a.nextSibling !== b.a11yProxyContainer && b.container.insertBefore(b.a11yProxyContainer, a.nextSibling) }, createProxyContainerElement: function () {
                    var b =
                        n.createElement("div"); b.className = "highcharts-a11y-proxy-container"; return b
                }, createProxyButton: function (b, a, r, c, e) {
                    var x = b.element, v = this.createElement("button"), u = d({ "aria-label": x.getAttribute("aria-label") }, r); b = this.getElementPosition(c || b); Object.keys(u).forEach(function (b) { null !== u[b] && v.setAttribute(b, u[b]) }); v.className = "highcharts-a11y-proxy-button"; e && this.addEvent(v, "click", e); this.setProxyButtonStyle(v, b); this.proxyMouseEventsForButton(x, v); a.appendChild(v); u["aria-hidden"] || k(this.chart,
                        v); return v
                }, getElementPosition: function (b) { var a = b.element; return (b = this.chart.renderTo) && a && a.getBoundingClientRect ? (a = a.getBoundingClientRect(), b = b.getBoundingClientRect(), { x: a.left - b.left, y: a.top - b.top, width: a.right - a.left, height: a.bottom - a.top }) : { x: 0, y: 0, width: 1, height: 1 } }, setProxyButtonStyle: function (b, a) {
                    d(!0, b.style, {
                        "border-width": 0, "background-color": "transparent", cursor: "pointer", outline: "none", opacity: .001, filter: "alpha(opacity=1)", "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)",
                        zIndex: 999, overflow: "hidden", padding: 0, margin: 0, display: "block", position: "absolute", width: (a.width || 1) + "px", height: (a.height || 1) + "px", left: (a.x || 0) + "px", top: (a.y || 0) + "px"
                    })
                }, proxyMouseEventsForButton: function (b, a) { var d = this; "click touchstart touchend touchcancel touchmove mouseover mouseenter mouseleave mouseout".split(" ").forEach(function (r) { d.addEvent(a, r, function (a) { var r = d.cloneMouseEvent(a); b && d.fireEventOnWrappedOrUnwrappedElement(b, r); a.stopPropagation(); a.preventDefault() }) }) }, cloneMouseEvent: function (b) {
                    if ("function" ===
                        typeof g.MouseEvent) return new g.MouseEvent(b.type, b); if (n.createEvent) { var a = n.createEvent("MouseEvent"); if (a.initMouseEvent) return a.initMouseEvent(b.type, b.bubbles, b.cancelable, b.view || g, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget), a } return r(b.type)
                }, destroyBase: function () { b(this.chart.a11yProxyContainer); this.domElementProvider.destroyCreatedElements(); this.eventProvider.removeAddedEvents() }
            }; a(h.prototype, {
                init: function () { },
                getKeyboardNavigation: function () { }, onChartUpdate: function () { }, onChartRender: function () { }, destroy: function () { }
            }); return h
        }); t(a, "modules/accessibility/KeyboardNavigation.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/EventProvider.js"]], function (a, f, l, m) {
            function q(a, b) { this.init(a, b) } var e = a.win, h = e.document, g = f.addEvent, n = f.fireEvent, c = l.getElement; g(h, "keydown", function (d) {
            27 === (d.which || d.keyCode) && a.charts && a.charts.forEach(function (b) {
            b &&
                b.dismissPopupContent && b.dismissPopupContent()
            })
            }); a.Chart.prototype.dismissPopupContent = function () { var a = this; n(this, "dismissPopupContent", {}, function () { a.tooltip && a.tooltip.hide(0); a.hideExportMenu() }) }; q.prototype = {
                init: function (a, b) {
                    var d = this, k = this.eventProvider = new m; this.chart = a; this.components = b; this.modules = []; this.currentModuleIx = 0; k.addEvent(a.renderTo, "keydown", function (b) { return d.onKeydown(b) }); k.addEvent(a.container, "focus", function (b) { return d.onFocus(b) }); k.addEvent(h, "mouseup",
                        function () { return d.onMouseUp() }); k.addEvent(a.renderTo, "mouseover", function () { d.pointerIsOverChart = !0 }); k.addEvent(a.renderTo, "mouseout", function () { d.pointerIsOverChart = !1 }); this.update(); this.modules.length && this.modules[0].init(1)
                }, update: function (a) {
                    var b = this.chart.options.accessibility; b = b && b.keyboardNavigation; var d = this.components; this.updateContainerTabindex(); b && b.enabled && a && a.length ? (this.modules = a.reduce(function (b, a) { a = d[a].getKeyboardNavigation(); return b.concat(a) }, []), this.updateExitAnchor()) :
                        (this.modules = [], this.currentModuleIx = 0, this.removeExitAnchor())
                }, onFocus: function (a) { var b, d = this.chart; a.relatedTarget && d.container.contains(a.relatedTarget) || (null === (b = this.modules[0]) || void 0 === b ? void 0 : b.init(1)) }, onMouseUp: function () { if (!this.keyboardReset && !this.pointerIsOverChart) { var a = this.chart, b = this.modules && this.modules[this.currentModuleIx || 0]; b && b.terminate && b.terminate(); a.focusElement && a.focusElement.removeFocusBorder(); this.currentModuleIx = 0; this.keyboardReset = !0 } }, onKeydown: function (a) {
                    a =
                    a || e.event; var b, d = this.modules && this.modules.length && this.modules[this.currentModuleIx]; this.keyboardReset = !1; if (d) { var k = d.run(a); k === d.response.success ? b = !0 : k === d.response.prev ? b = this.prev() : k === d.response.next && (b = this.next()); b && (a.preventDefault(), a.stopPropagation()) }
                }, prev: function () { return this.move(-1) }, next: function () { return this.move(1) }, move: function (a) {
                    var b = this.modules && this.modules[this.currentModuleIx]; b && b.terminate && b.terminate(a); this.chart.focusElement && this.chart.focusElement.removeFocusBorder();
                    this.currentModuleIx += a; if (b = this.modules && this.modules[this.currentModuleIx]) { if (b.validate && !b.validate()) return this.move(a); if (b.init) return b.init(a), !0 } this.currentModuleIx = 0; 0 < a ? (this.exiting = !0, this.exitAnchor.focus()) : this.chart.container.focus(); return !1
                }, updateExitAnchor: function () { var a = c("highcharts-end-of-chart-marker-" + this.chart.index); this.removeExitAnchor(); a ? (this.makeElementAnExitAnchor(a), this.exitAnchor = a) : this.createExitAnchor() }, updateContainerTabindex: function () {
                    var a = this.chart.options.accessibility;
                    a = a && a.keyboardNavigation; a = !(a && !1 === a.enabled); var b = this.chart.container, r = b.getAttribute("tabIndex"); a && !r ? b.setAttribute("tabindex", "0") : a || "0" !== r || b.removeAttribute("tabindex")
                }, makeElementAnExitAnchor: function (a) { a.setAttribute("class", "highcharts-exit-anchor"); a.setAttribute("tabindex", "0"); a.setAttribute("aria-hidden", !1); this.addExitAnchorEventsToEl(a) }, createExitAnchor: function () { var a = this.chart, b = this.exitAnchor = h.createElement("div"); a.renderTo.appendChild(b); this.makeElementAnExitAnchor(b) },
                removeExitAnchor: function () { this.exitAnchor && this.exitAnchor.parentNode && (this.exitAnchor.parentNode.removeChild(this.exitAnchor), delete this.exitAnchor) }, addExitAnchorEventsToEl: function (a) {
                    var b = this.chart, d = this; this.eventProvider.addEvent(a, "focus", function (a) {
                        a = a || e.event; a.relatedTarget && b.container.contains(a.relatedTarget) || d.exiting ? d.exiting = !1 : (b.renderTo.focus(), a.preventDefault(), d.modules && d.modules.length && (d.currentModuleIx = d.modules.length - 1, (a = d.modules[d.currentModuleIx]) && a.validate &&
                            !a.validate() ? d.prev() : a && a.init(-1)))
                    })
                }, destroy: function () { this.removeExitAnchor(); this.eventProvider.removeAddedEvents(); "0" === this.chart.container.getAttribute("tabindex") && this.chart.container.removeAttribute("tabindex") }
            }; return q
        }); t(a, "modules/accessibility/components/LegendComponent.js", [a["parts/Globals.js"], a["parts/Legend.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/htmlUtilities.js"]],
            function (a, f, l, m, p, e) {
                var h = l.addEvent, g = l.extend, n = l.fireEvent, c = e.stripHTMLTagsFromString, d = e.removeElement; a.Chart.prototype.highlightLegendItem = function (b) { var a = this.legend.allItems, d = this.highlightedLegendItemIx; if (a[b]) { a[d] && n(a[d].legendGroup.element, "mouseout"); d = this.legend; var c = d.allItems[b].pageIx, e = d.currentPage; "undefined" !== typeof c && c + 1 !== e && d.scroll(1 + c - e); this.setFocusToElement(a[b].legendItem, a[b].a11yProxyElement); n(a[b].legendGroup.element, "mouseover"); return !0 } return !1 }; h(f,
                    "afterColorizeItem", function (a) { var b = a.item; this.chart.options.accessibility.enabled && b && b.a11yProxyElement && b.a11yProxyElement.setAttribute("aria-pressed", a.visible ? "false" : "true") }); a = function () { }; a.prototype = new m; g(a.prototype, {
                        init: function () { var a = this; this.addEvent(f, "afterScroll", function () { this.chart === a.chart && a.updateProxies() }) }, updateLegendItemProxyVisibility: function () {
                            var a = this.chart.legend, d = a.currentPage || 1; (a.allItems || []).forEach(function (a) {
                                var b = (a.pageIx || 0) !== d - 1; a.a11yProxyElement &&
                                    (a.a11yProxyElement.style.visibility = b ? "hidden" : "visible")
                            })
                        }, onChartRender: function () { this.legendProxyButtonClicked ? delete this.legendProxyButtonClicked : this.updateProxies() }, updateProxies: function () { d(this.legendProxyGroup); var a = this.chart, c = a.legend && a.legend.allItems, k = a.options.legend.accessibility || {}; !c || !c.length || a.colorAxis && a.colorAxis.length || !1 === k.enabled || (this.addLegendProxyGroup(), this.proxyLegendItems(), this.updateLegendItemProxyVisibility()) }, addLegendProxyGroup: function () {
                            var a =
                                this.chart.options.accessibility, d = this.chart.langFormat("accessibility.legend.legendLabel", {}); this.legendProxyGroup = this.addProxyGroup({ "aria-label": d, role: "all" === a.landmarkVerbosity ? "region" : null })
                        }, proxyLegendItems: function () { var a = this; (this.chart.legend && this.chart.legend.allItems || []).forEach(function (b) { b.legendItem && b.legendItem.element && a.proxyLegendItem(b) }) }, proxyLegendItem: function (a) {
                            var b = this, d = this.chart.langFormat("accessibility.legend.legendItem", { chart: this.chart, itemName: c(a.name) });
                            a.a11yProxyElement = this.createProxyButton(a.legendItem, this.legendProxyGroup, { tabindex: -1, "aria-pressed": !a.visible, "aria-label": d }, a.legendGroup.div ? a.legendItem : a.legendGroup, function () { b.legendProxyButtonClicked = !0 })
                        }, getKeyboardNavigation: function () {
                            var a = this.keyCodes, d = this; return new p(this.chart, {
                                keyCodeMap: [[[a.left, a.right, a.up, a.down], function (a) { return d.onKbdArrowKey(this, a) }], [[a.enter, a.space], function () { return d.onKbdClick(this) }]], validate: function () { return d.shouldHaveLegendNavigation() },
                                init: function (a) { return d.onKbdNavigationInit(a) }
                            })
                        }, onKbdArrowKey: function (a, d) { var b = this.keyCodes, c = a.response, r = this.chart, v = r.options.accessibility, e = r.legend.allItems.length; d = d === b.left || d === b.up ? -1 : 1; return r.highlightLegendItem(this.highlightedLegendItemIx + d) ? (this.highlightedLegendItemIx += d, c.success) : 1 < e && v.keyboardNavigation.wrapAround ? (a.init(d), c.success) : c[0 < d ? "next" : "prev"] }, onKbdClick: function (a) {
                            var b = this.chart.legend.allItems[this.highlightedLegendItemIx]; b && b.a11yProxyElement &&
                                n(b.a11yProxyElement, "click"); return a.response.success
                        }, shouldHaveLegendNavigation: function () { var a = this.chart, d = a.colorAxis && a.colorAxis.length, c = (a.options.legend || {}).accessibility || {}; return !!(a.legend && a.legend.allItems && a.legend.display && !d && c.enabled && c.keyboardNavigation && c.keyboardNavigation.enabled) }, onKbdNavigationInit: function (a) { var b = this.chart, d = b.legend.allItems.length - 1; a = 0 < a ? 0 : d; b.highlightLegendItem(a); this.highlightedLegendItemIx = a }
                    }); return a
            }); t(a, "modules/accessibility/components/MenuComponent.js",
                [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l, m, p, e) {
                    function h(a) { return a.exportSVGElements && a.exportSVGElements[0] } f = f.extend; var g = p.unhideChartElementFromAT, n = e.removeElement, c = e.getFakeMouseEvent; a.Chart.prototype.showExportMenu = function () {
                        var a = h(this); if (a && (a = a.element,
                            a.onclick)) a.onclick(c("click"))
                    }; a.Chart.prototype.hideExportMenu = function () { var a = this.exportDivElements; a && this.exportContextMenu && (a.forEach(function (a) { if ("highcharts-menu-item" === a.className && a.onmouseout) a.onmouseout(c("mouseout")) }), this.highlightedExportItemIx = 0, this.exportContextMenu.hideMenu(), this.container.focus()) }; a.Chart.prototype.highlightExportItem = function (a) {
                        var b = this.exportDivElements && this.exportDivElements[a], d = this.exportDivElements && this.exportDivElements[this.highlightedExportItemIx];
                        if (b && "LI" === b.tagName && (!b.children || !b.children.length)) { var k = !!(this.renderTo.getElementsByTagName("g")[0] || {}).focus; b.focus && k && b.focus(); if (d && d.onmouseout) d.onmouseout(c("mouseout")); if (b.onmouseover) b.onmouseover(c("mouseover")); this.highlightedExportItemIx = a; return !0 } return !1
                    }; a.Chart.prototype.highlightLastExportItem = function () { var a; if (this.exportDivElements) for (a = this.exportDivElements.length; a--;)if (this.highlightExportItem(a)) return !0; return !1 }; a = function () { }; a.prototype = new l; f(a.prototype,
                        {
                            init: function () { var a = this.chart, b = this; this.addEvent(a, "exportMenuShown", function () { b.onMenuShown() }); this.addEvent(a, "exportMenuHidden", function () { b.onMenuHidden() }) }, onMenuHidden: function () { var a = this.chart.exportContextMenu; a && a.setAttribute("aria-hidden", "true"); this.isExportMenuShown = !1; this.setExportButtonExpandedState("false") }, onMenuShown: function () { var a = this.chart, b = a.exportContextMenu; b && (this.addAccessibleContextMenuAttribs(), g(a, b)); this.isExportMenuShown = !0; this.setExportButtonExpandedState("true") },
                            setExportButtonExpandedState: function (a) { var b = this.exportButtonProxy; b && b.setAttribute("aria-expanded", a) }, onChartRender: function () {
                                var a = this.chart, b = a.options.accessibility; n(this.exportProxyGroup); var c = a.options.exporting, k = h(a); c && !1 !== c.enabled && c.accessibility && c.accessibility.enabled && k && k.element && (this.exportProxyGroup = this.addProxyGroup("all" === b.landmarkVerbosity ? { "aria-label": a.langFormat("accessibility.exporting.exportRegionLabel", { chart: a }), role: "region" } : {}), b = h(this.chart), this.exportButtonProxy =
                                    this.createProxyButton(b, this.exportProxyGroup, { "aria-label": a.langFormat("accessibility.exporting.menuButtonLabel", { chart: a }), "aria-expanded": "false" }))
                            }, addAccessibleContextMenuAttribs: function () {
                                var a = this.chart, b = a.exportDivElements; b && b.length && (b.forEach(function (a) { "LI" !== a.tagName || a.children && a.children.length ? a.setAttribute("aria-hidden", "true") : a.setAttribute("tabindex", -1) }), b = b[0].parentNode, b.removeAttribute("aria-hidden"), b.setAttribute("aria-label", a.langFormat("accessibility.exporting.chartMenuLabel",
                                    { chart: a })))
                            }, getKeyboardNavigation: function () {
                                var a = this.keyCodes, b = this.chart, c = this; return new m(b, {
                                    keyCodeMap: [[[a.left, a.up], function () { return c.onKbdPrevious(this) }], [[a.right, a.down], function () { return c.onKbdNext(this) }], [[a.enter, a.space], function () { return c.onKbdClick(this) }], [[a.esc], function () { return this.response.prev }]], validate: function () { return b.exportChart && !1 !== b.options.exporting.enabled && !1 !== b.options.exporting.accessibility.enabled }, init: function () {
                                        var a = c.exportButtonProxy,
                                        d = b.exportingGroup; d && a && b.setFocusToElement(d, a)
                                    }, terminate: function () { b.hideExportMenu() }
                                })
                            }, onKbdPrevious: function (a) { var b = this.chart, d = b.options.accessibility; a = a.response; for (var c = b.highlightedExportItemIx || 0; c--;)if (b.highlightExportItem(c)) return a.success; return d.keyboardNavigation.wrapAround ? (b.highlightLastExportItem(), a.success) : a.prev }, onKbdNext: function (a) {
                                var b = this.chart, c = b.options.accessibility; a = a.response; for (var d = (b.highlightedExportItemIx || 0) + 1; d < b.exportDivElements.length; ++d)if (b.highlightExportItem(d)) return a.success;
                                return c.keyboardNavigation.wrapAround ? (b.highlightExportItem(0), a.success) : a.next
                            }, onKbdClick: function (a) { var b = this.chart, c = b.exportDivElements[b.highlightedExportItemIx], d = h(b).element; this.isExportMenuShown ? this.fakeClickEvent(c) : (this.fakeClickEvent(d), b.highlightExportItem(0)); return a.response.success }
                        }); return a
                }); t(a, "modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js", [a["parts/Globals.js"], a["parts/Point.js"], a["parts/Utilities.js"], a["modules/accessibility/KeyboardNavigationHandler.js"],
                a["modules/accessibility/utils/EventProvider.js"], a["modules/accessibility/utils/chartUtilities.js"]], function (a, f, l, m, p, e) {
                    function h(a) { var b = a.index, c = a.series.points, d = c.length; if (c[b] !== a) for (; d--;) { if (c[d] === a) return d } else return b } function g(a) {
                        var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation, c = a.options.accessibility || {}, d = c.keyboardNavigation; return d && !1 === d.enabled || !1 === c.enabled || !1 === a.options.enableMouseTracking || !a.visible || b.pointNavigationEnabledThreshold &&
                            b.pointNavigationEnabledThreshold <= a.points.length
                    } function n(a) { var b = a.series.chart.options.accessibility; return a.isNull && b.keyboardNavigation.seriesNavigation.skipNullPoints || !1 === a.visible || g(a.series) } function c(a, b, c, d) { var e = Infinity, v = b.points.length, w = function (a) { return !(k(a.plotX) && k(a.plotY)) }; if (!w(a)) { for (; v--;) { var u = b.points[v]; if (!w(u) && (u = (a.plotX - u.plotX) * (a.plotX - u.plotX) * (c || 1) + (a.plotY - u.plotY) * (a.plotY - u.plotY) * (d || 1), u < e)) { e = u; var r = v } } return k(r) ? b.points[r] : void 0 } } function d(a) {
                        var b =
                            !1; delete a.highlightedPoint; return b = a.series.reduce(function (a, b) { return a || b.highlightFirstValidPoint() }, !1)
                    } function b(a, b) { this.keyCodes = b; this.chart = a } var r = l.extend, k = l.defined, x = e.getPointFromXY, q = e.getSeriesFromName; a.Series.prototype.keyboardMoveVertical = !0;["column", "pie"].forEach(function (b) { a.seriesTypes[b] && (a.seriesTypes[b].prototype.keyboardMoveVertical = !1) }); f.prototype.highlight = function () {
                        var a = this.series.chart; if (this.isNull) a.tooltip && a.tooltip.hide(0); else this.onMouseOver();
                        this.graphic && a.setFocusToElement(this.graphic); a.highlightedPoint = this; return this
                    }; a.Chart.prototype.highlightAdjacentPoint = function (a) {
                        var b = this.series, c = this.highlightedPoint, d = c && h(c) || 0, k = c && c.series.points, e = this.series && this.series[this.series.length - 1]; e = e && e.points && e.points[e.points.length - 1]; if (!b[0] || !b[0].points) return !1; if (c) { if (b = b[c.series.index + (a ? 1 : -1)], d = k[d + (a ? 1 : -1)], !d && b && (d = b.points[a ? 0 : b.points.length - 1]), !d) return !1 } else d = a ? b[0].points[0] : e; return n(d) ? (b = d.series, g(b) ?
                            this.highlightedPoint = a ? b.points[b.points.length - 1] : b.points[0] : this.highlightedPoint = d, this.highlightAdjacentPoint(a)) : d.highlight()
                    }; a.Series.prototype.highlightFirstValidPoint = function () { var a = this.chart.highlightedPoint, b = (a && a.series) === this ? h(a) : 0; a = this.points; var c = a.length; if (a && c) { for (var d = b; d < c; ++d)if (!n(a[d])) return a[d].highlight(); for (; 0 <= b; --b)if (!n(a[b])) return a[b].highlight() } return !1 }; a.Chart.prototype.highlightAdjacentSeries = function (a) {
                        var b, d = this.highlightedPoint; var e = (b =
                            this.series && this.series[this.series.length - 1]) && b.points && b.points[b.points.length - 1]; if (!this.highlightedPoint) return b = a ? this.series && this.series[0] : b, (e = a ? b && b.points && b.points[0] : e) ? e.highlight() : !1; b = this.series[d.series.index + (a ? -1 : 1)]; if (!b) return !1; e = c(d, b, 4); if (!e) return !1; if (g(b)) return e.highlight(), a = this.highlightAdjacentSeries(a), a ? a : (d.highlight(), !1); e.highlight(); return e.series.highlightFirstValidPoint()
                    }; a.Chart.prototype.highlightAdjacentPointVertical = function (a) {
                        var b = this.highlightedPoint,
                        d = Infinity, c; if (!k(b.plotX) || !k(b.plotY)) return !1; this.series.forEach(function (e) { g(e) || e.points.forEach(function (r) { if (k(r.plotY) && k(r.plotX) && r !== b) { var w = r.plotY - b.plotY, g = Math.abs(r.plotX - b.plotX); g = Math.abs(w) * Math.abs(w) + g * g * 4; e.yAxis && e.yAxis.reversed && (w *= -1); !(0 >= w && a || 0 <= w && !a || 5 > g || n(r)) && g < d && (d = g, c = r) } }) }); return c ? c.highlight() : !1
                    }; r(b.prototype, {
                        init: function () {
                            var b = this, c = this.chart, e = this.eventProvider = new p; e.addEvent(a.Series, "destroy", function () { return b.onSeriesDestroy(this) });
                            e.addEvent(c, "afterDrilldown", function () { d(this); this.focusElement && this.focusElement.removeFocusBorder() }); e.addEvent(c, "drilldown", function (a) { a = a.point; var d = a.series; b.lastDrilledDownPoint = { x: a.x, y: a.y, seriesName: d ? d.name : "" } }); e.addEvent(c, "drillupall", function () { setTimeout(function () { b.onDrillupAll() }, 10) })
                        }, onDrillupAll: function () {
                            var a = this.lastDrilledDownPoint, b = this.chart, d = a && q(b, a.seriesName), c; a && d && k(a.x) && k(a.y) && (c = x(d, a.x, a.y)); b.container && b.container.focus(); c && c.highlight && c.highlight();
                            b.focusElement && b.focusElement.removeFocusBorder()
                        }, getKeyboardNavigationHandler: function () {
                            var a = this, b = this.keyCodes, d = this.chart, c = d.inverted; return new m(d, {
                                keyCodeMap: [[c ? [b.up, b.down] : [b.left, b.right], function (b) { return a.onKbdSideways(this, b) }], [c ? [b.left, b.right] : [b.up, b.down], function (b) { return a.onKbdVertical(this, b) }], [[b.enter, b.space], function () { d.highlightedPoint && d.highlightedPoint.firePointEvent("click"); return this.response.success }]], init: function (b) {
                                    return a.onHandlerInit(this,
                                        b)
                                }, terminate: function () { return a.onHandlerTerminate() }
                            })
                        }, onKbdSideways: function (a, b) { var d = this.keyCodes; return this.attemptHighlightAdjacentPoint(a, b === d.right || b === d.down) }, onKbdVertical: function (a, b) {
                            var d = this.chart, c = this.keyCodes; b = b === c.down || b === c.right; c = d.options.accessibility.keyboardNavigation.seriesNavigation; if (c.mode && "serialize" === c.mode) return this.attemptHighlightAdjacentPoint(a, b); d[d.highlightedPoint && d.highlightedPoint.series.keyboardMoveVertical ? "highlightAdjacentPointVertical" :
                                "highlightAdjacentSeries"](b); return a.response.success
                        }, onHandlerInit: function (a, b) { var c = this.chart; if (0 < b) d(c); else { b = c.series.length; for (var e; b-- && !(c.highlightedPoint = c.series[b].points[c.series[b].points.length - 1], e = c.series[b].highlightFirstValidPoint());); } return a.response.success }, onHandlerTerminate: function () { var a = this.chart, b = a.highlightedPoint; a.tooltip && a.tooltip.hide(0); b && (b.onMouseOut(), delete a.highlightedPoint) }, attemptHighlightAdjacentPoint: function (a, b) {
                            var c = this.chart, d = c.options.accessibility.keyboardNavigation.wrapAround;
                            return c.highlightAdjacentPoint(b) ? a.response.success : d ? a.init(b ? 1 : -1) : a.response[b ? "next" : "prev"]
                        }, onSeriesDestroy: function (a) { var b = this.chart; b.highlightedPoint && b.highlightedPoint.series === a && (delete b.highlightedPoint, b.focusElement && b.focusElement.removeFocusBorder()) }, destroy: function () { this.eventProvider.removeAddedEvents() }
                    }); return b
                }); t(a, "modules/accessibility/components/AnnotationsA11y.js", [a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f) {
                    function q(a) {
                        return (a.annotations ||
                            []).reduce(function (a, b) { var c; !1 !== (null === (c = b.options) || void 0 === c ? void 0 : c.visible) && (a = a.concat(b.labels)); return a }, [])
                    } function m(a) { var c, b, e, k, g = null === (b = null === (c = a.options) || void 0 === c ? void 0 : c.accessibility) || void 0 === b ? void 0 : b.description; return g ? g : (null === (k = null === (e = a.graphic) || void 0 === e ? void 0 : e.text) || void 0 === k ? void 0 : k.textStr) || "" } function p(a) {
                        var c, b, e = null === (b = null === (c = a.options) || void 0 === c ? void 0 : c.accessibility) || void 0 === b ? void 0 : b.description; if (e) return e; c = a.chart;
                        b = m(a); e = a.points.filter(function (a) { return !!a.graphic }).map(function (a) { var b, c; if (!(c = null === (b = null === a || void 0 === a ? void 0 : a.accessibility) || void 0 === b ? void 0 : b.valueDescription)) { var d, e; c = (null === (e = null === (d = null === a || void 0 === a ? void 0 : a.graphic) || void 0 === d ? void 0 : d.element) || void 0 === e ? void 0 : e.getAttribute("aria-label")) || "" } a = (null === a || void 0 === a ? void 0 : a.series.name) || ""; return (a ? a + ", " : "") + "data point " + c }).filter(function (a) { return !!a }); var k = e.length; a = "accessibility.screenReaderSection.annotations.description" +
                            (1 < k ? "MultiplePoints" : k ? "SinglePoint" : "NoPoints"); b = { annotationText: b, numPoints: k, annotationPoint: e[0], additionalAnnotationPoints: e.slice(1) }; return c.langFormat(a, b)
                    } function e(a) { return q(a).map(function (a) { return (a = g(n(p(a)))) ? "<li>" + a + "</li>" : "" }) } var h = a.inArray, g = f.escapeStringForHTML, n = f.stripHTMLTagsFromString; return {
                        getAnnotationsInfoHTML: function (a) { var c = a.annotations; return c && c.length ? "<ul>" + e(a).join(" ") + "</ul>" : "" }, getAnnotationLabelDescription: p, getAnnotationListItems: e, getPointAnnotationTexts: function (a) {
                            var c =
                                q(a.series.chart).filter(function (b) { return -1 < h(a, b.points) }); return c.length ? c.map(function (a) { return "" + m(a) }) : []
                        }
                    }
                }); t(a, "modules/accessibility/components/SeriesComponent/SeriesDescriber.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/components/AnnotationsA11y.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["parts/Tooltip.js"]], function (a, f, l, m, p, e) {
                    function h(a) {
                        var b = a.index; return a.series && a.series.data &&
                            F(b) ? D(a.series.data, function (a) { return !!(a && "undefined" !== typeof a.index && a.index > b && a.graphic && a.graphic.element) }) || null : null
                    } function g(a) { var b = a.chart.options.accessibility.series.pointDescriptionEnabledThreshold; return !!(!1 !== b && a.points && a.points.length >= b) } function n(a) { var b = a.options.accessibility || {}; return !g(a) && !b.exposeAsGroupOnly } function c(a) {
                        var b = a.chart.options.accessibility.keyboardNavigation.seriesNavigation; return !(!a.points || !(a.points.length < b.pointNavigationEnabledThreshold ||
                            !1 === b.pointNavigationEnabledThreshold))
                    } function d(a, b) { var c = a.series.chart, d = c.options.accessibility.point || {}; a = a.series.tooltipOptions || {}; c = c.options.lang; return E(b) ? A(b, d.valueDecimals || a.valueDecimals || -1, c.decimalPoint, c.accessibility.thousandsSep || c.thousandsSep) : b } function b(a) { var b = (a.options.accessibility || {}).description; return b && a.chart.langFormat("accessibility.series.description", { description: b, series: a }) || "" } function r(a, b) {
                        return a.chart.langFormat("accessibility.series." + b +
                            "Description", { name: J(a[b]), series: a })
                    } function k(a) { var b = a.series, c = b.chart, d = c.options.accessibility.point || {}; if (b.xAxis && b.xAxis.isDatetimeAxis) return b = e.prototype.getXDateFormat.call({ getDateFormat: e.prototype.getDateFormat, chart: c }, a, c.options.tooltip, b.xAxis), d = d.dateFormatter && d.dateFormatter(a) || d.dateFormat || b, c.time.dateFormat(d, a.x, void 0) } function x(a) {
                        var b = k(a), c = (a.series.xAxis || {}).categories && F(a.category) && ("" + a.category).replace("<br/>", " "), d = a.id && 0 > a.id.indexOf("highcharts-"),
                        e = "x, " + a.x; return a.name || b || c || (d ? a.id : e)
                    } function q(a, b, c) { var e = b || "", k = c || ""; return a.series.pointArrayMap.reduce(function (b, c) { b += b.length ? ", " : ""; var w = d(a, z(a[c], a.options[c])); return b + (c + ": " + e + w + k) }, "") } function v(a) {
                        var b = a.series, c = b.chart.options.accessibility.point || {}, e = b.tooltipOptions || {}, k = c.valuePrefix || e.valuePrefix || ""; c = c.valueSuffix || e.valueSuffix || ""; e = d(a, a["undefined" !== typeof a.value ? "value" : "y"]); return a.isNull ? b.chart.langFormat("accessibility.series.nullPointValue",
                            { point: a }) : b.pointArrayMap ? q(a, k, c) : k + e + c
                    } function u(a) { var b = a.series, c = b.chart, d = c.options.accessibility.point.valueDescriptionFormat, e = (b = z(b.xAxis && b.xAxis.options.accessibility && b.xAxis.options.accessibility.enabled, !c.angular)) ? x(a) : ""; a = { point: a, index: F(a.index) ? a.index + 1 : "", xDescription: e, value: v(a), separator: b ? ", " : "" }; return w(d, a, c) } function t(a) {
                        var b = a.series, c = b.chart, d = u(a), e = a.options && a.options.accessibility && a.options.accessibility.description; e = e ? " " + e : ""; b = 1 < c.series.length && b.name ?
                            " " + b.name + "." : ""; c = a.series.chart; var k = K(a), w = { point: a, annotations: k }; c = k.length ? c.langFormat("accessibility.series.pointAnnotationsDescription", w) : ""; a.accessibility = a.accessibility || {}; a.accessibility.valueDescription = d; return d + e + b + (c ? " " + c : "")
                    } function C(a) {
                        var b = n(a), d = c(a); (b || d) && a.points.forEach(function (a) {
                            var c; if (!(c = a.graphic && a.graphic.element) && (c = a.series && a.series.is("sunburst"), c = a.isNull && !c)) {
                                var d = a.series, e = h(a); d = (c = e && e.graphic) ? c.parentGroup : d.graph || d.group; e = e ? {
                                    x: z(a.plotX,
                                        e.plotX, 0), y: z(a.plotY, e.plotY, 0)
                                } : { x: z(a.plotX, 0), y: z(a.plotY, 0) }; e = a.series.chart.renderer.rect(e.x, e.y, 1, 1); e.attr({ "class": "highcharts-a11y-dummy-point", fill: "none", opacity: 0, "fill-opacity": 0, "stroke-opacity": 0 }); d && d.element ? (a.graphic = e, a.hasDummyGraphic = !0, e.add(d), d.element.insertBefore(e.element, c ? c.element : null), c = e.element) : c = void 0
                            } c && (c.setAttribute("tabindex", "-1"), b ? (e = a.series, d = e.chart.options.accessibility.point || {}, e = e.options.accessibility || {}, a = G(H(e.pointDescriptionFormatter &&
                                e.pointDescriptionFormatter(a) || d.descriptionFormatter && d.descriptionFormatter(a) || t(a))), c.setAttribute("role", "img"), c.setAttribute("aria-label", a)) : c.setAttribute("aria-hidden", !0))
                        })
                    } function y(a) {
                        var c = a.chart, d = c.types || [], e = b(a), k = function (b) { return c[b] && 1 < c[b].length && a[b] }, w = r(a, "xAxis"), g = r(a, "yAxis"), n = { name: a.name || "", ix: a.index + 1, numSeries: c.series && c.series.length, numPoints: a.points && a.points.length, series: a }; d = 1 < d.length ? "Combination" : ""; return (c.langFormat("accessibility.series.summary." +
                            a.type + d, n) || c.langFormat("accessibility.series.summary.default" + d, n)) + (e ? " " + e : "") + (k("yAxis") ? " " + g : "") + (k("xAxis") ? " " + w : "")
                    } var A = a.numberFormat, w = a.format, D = f.find, E = f.isNumber, z = f.pick, F = f.defined, K = l.getPointAnnotationTexts, G = m.escapeStringForHTML, L = m.reverseChildNodes, H = m.stripHTMLTagsFromString, J = p.getAxisDescription, M = p.getSeriesFirstPointElement, N = p.getSeriesA11yElement, O = p.unhideChartElementFromAT; return {
                        describeSeries: function (a) {
                            var b = a.chart, c = M(a), d = N(a), e = b.is3d && b.is3d(); if (d) {
                            d.lastChild !==
                                c || e || L(d); C(a); O(b, d); e = a.chart; b = e.options.chart || {}; c = 1 < e.series.length; e = e.options.accessibility.series.describeSingleSeries; var k = (a.options.accessibility || {}).exposeAsGroupOnly; b.options3d && b.options3d.enabled && c || !(c || e || k || g(a)) ? d.setAttribute("aria-label", "") : (b = a.chart.options.accessibility, c = b.landmarkVerbosity, (a.options.accessibility || {}).exposeAsGroupOnly ? d.setAttribute("role", "img") : "all" === c && d.setAttribute("role", "region"), d.setAttribute("tabindex", "-1"), d.setAttribute("aria-label",
                                    G(H(b.series.descriptionFormatter && b.series.descriptionFormatter(a) || y(a)))))
                            }
                        }, defaultPointDescriptionFormatter: t, defaultSeriesDescriptionFormatter: y, getPointA11yTimeDescription: k, getPointXDescription: x, getPointValue: v, getPointValueDescription: u
                    }
                }); t(a, "modules/accessibility/utils/Announcer.js", [a["parts/Globals.js"], a["modules/accessibility/utils/DOMElementProvider.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l) {
                    var q = l.visuallyHideElement; l = function () {
                        function a(a, h) {
                        this.chart =
                            a; this.domElementProvider = new f; this.announceRegion = this.addAnnounceRegion(h)
                        } a.prototype.destroy = function () { this.domElementProvider.destroyCreatedElements() }; a.prototype.announce = function (a) { var e = this; this.announceRegion.innerHTML = a; this.clearAnnouncementRegionTimer && clearTimeout(this.clearAnnouncementRegionTimer); this.clearAnnouncementRegionTimer = setTimeout(function () { e.announceRegion.innerHTML = ""; delete e.clearAnnouncementRegionTimer }, 1E3) }; a.prototype.addAnnounceRegion = function (a) {
                            var e = this.chart.renderTo,
                            g = this.domElementProvider.createElement("div"); g.setAttribute("aria-hidden", !1); g.setAttribute("aria-live", a); q(g); e.insertBefore(g, e.firstChild); return g
                        }; return a
                    }(); return a.Announcer = l
                }); t(a, "modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/components/SeriesComponent/SeriesDescriber.js"], a["modules/accessibility/utils/Announcer.js"], a["modules/accessibility/utils/EventProvider.js"]],
                    function (a, f, l, m, p, e) {
                        function h(a) { var b = a.series.data.filter(function (b) { return a.x === b.x && a.y === b.y }); return 1 === b.length ? b[0] : a } function g(a, b) { var c = (a || []).concat(b || []).reduce(function (a, b) { a[b.name + b.index] = b; return a }, {}); return Object.keys(c).map(function (a) { return c[a] }) } var n = f.extend, c = f.defined, d = l.getChartTitle, b = m.defaultPointDescriptionFormatter, r = m.defaultSeriesDescriptionFormatter; f = function (a) { this.chart = a }; n(f.prototype, {
                            init: function () {
                                var a = this.chart, b = a.options.accessibility.announceNewData.interruptUser ?
                                    "assertive" : "polite"; this.lastAnnouncementTime = 0; this.dirty = { allSeries: {} }; this.eventProvider = new e; this.announcer = new p(a, b); this.addEventListeners()
                            }, destroy: function () { this.eventProvider.removeAddedEvents(); this.announcer.destroy() }, addEventListeners: function () {
                                var b = this, c = this.chart, d = this.eventProvider; d.addEvent(c, "afterDrilldown", function () { b.lastAnnouncementTime = 0 }); d.addEvent(a.Series, "updatedData", function () { b.onSeriesUpdatedData(this) }); d.addEvent(c, "afterAddSeries", function (a) { b.onSeriesAdded(a.series) });
                                d.addEvent(a.Series, "addPoint", function (a) { b.onPointAdded(a.point) }); d.addEvent(c, "redraw", function () { b.announceDirtyData() })
                            }, onSeriesUpdatedData: function (a) { var b = this.chart; a.chart === b && b.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a) }, onSeriesAdded: function (a) {
                                this.chart.options.accessibility.announceNewData.enabled && (this.dirty.hasDirty = !0, this.dirty.allSeries[a.name + a.index] = a, this.dirty.newSeries = c(this.dirty.newSeries) ? void 0 :
                                    a)
                            }, onPointAdded: function (a) { var b = a.series.chart; this.chart === b && b.options.accessibility.announceNewData.enabled && (this.dirty.newPoint = c(this.dirty.newPoint) ? void 0 : a) }, announceDirtyData: function () { var a = this; if (this.chart.options.accessibility.announceNewData && this.dirty.hasDirty) { var b = this.dirty.newPoint; b && (b = h(b)); this.queueAnnouncement(Object.keys(this.dirty.allSeries).map(function (b) { return a.dirty.allSeries[b] }), this.dirty.newSeries, b); this.dirty = { allSeries: {} } } }, queueAnnouncement: function (a,
                                b, c) {
                                    var d = this, e = this.chart.options.accessibility.announceNewData; if (e.enabled) {
                                        var k = +new Date; e = Math.max(0, e.minAnnounceInterval - (k - this.lastAnnouncementTime)); a = g(this.queuedAnnouncement && this.queuedAnnouncement.series, a); if (b = this.buildAnnouncementMessage(a, b, c)) this.queuedAnnouncement && clearTimeout(this.queuedAnnouncementTimer), this.queuedAnnouncement = { time: k, message: b, series: a }, this.queuedAnnouncementTimer = setTimeout(function () {
                                        d && d.announcer && (d.lastAnnouncementTime = +new Date, d.announcer.announce(d.queuedAnnouncement.message),
                                            delete d.queuedAnnouncement, delete d.queuedAnnouncementTimer)
                                        }, e)
                                    }
                            }, buildAnnouncementMessage: function (c, e, g) {
                                var k = this.chart, n = k.options.accessibility.announceNewData; if (n.announcementFormatter && (c = n.announcementFormatter(c, e, g), !1 !== c)) return c.length ? c : null; c = a.charts && 1 < a.charts.length ? "Multiple" : "Single"; c = e ? "newSeriesAnnounce" + c : g ? "newPointAnnounce" + c : "newDataAnnounce"; n = d(k); return k.langFormat("accessibility.announceNewData." + c, {
                                    chartTitle: n, seriesDesc: e ? r(e) : null, pointDesc: g ? b(g) : null, point: g,
                                    series: e
                                })
                            }
                        }); return f
                    }); t(a, "modules/accessibility/components/SeriesComponent/forcedMarkers.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, f) {
                        function q(a) { p(!0, a, { marker: { enabled: !0, states: { normal: { opacity: 0 } } } }) } var m = f.addEvent, p = f.merge; return function () {
                            m(a.Series, "render", function () {
                                var a = this.options, h = this.chart.options.accessibility.enabled, g = !1 !== (this.options.accessibility && this.options.accessibility.enabled); var n = this.chart.options.accessibility; n = this.points.length <
                                    n.series.pointDescriptionEnabledThreshold || !1 === n.series.pointDescriptionEnabledThreshold; var c = this.chart.options.accessibility.keyboardNavigation.seriesNavigation; c = this.points.length < c.pointNavigationEnabledThreshold || !1 === c.pointNavigationEnabledThreshold; if (h && g && (n || c)) {
                                        if (a.marker && !1 === a.marker.enabled && (this.a11yMarkersForced = !0, q(this.options)), this._hasPointMarkers && this.points && this.points.length) for (a = this.points, h = a.length; h--;)g = a[h].options, g.marker && (g.marker.enabled ? p(!0, g.marker,
                                            { states: { normal: { opacity: g.marker.states && g.marker.states.normal && g.marker.states.normal.opacity || 1 } } }) : q(g))
                                    } else this.a11yMarkersForced && this.resetMarkerOptions && (delete this.a11yMarkersForced, a = this.resetA11yMarkerOptions, p(!0, this.options, { marker: { enabled: a.enabled, states: { normal: { opacity: a.states && a.states.normal && a.states.normal.opacity } } } }))
                            }); m(a.Series, "afterSetOptions", function (a) { this.resetA11yMarkerOptions = p(a.options.marker || {}, this.userOptions.marker || {}) })
                        }
                    }); t(a, "modules/accessibility/components/SeriesComponent/SeriesComponent.js",
                        [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/components/SeriesComponent/SeriesKeyboardNavigation.js"], a["modules/accessibility/components/SeriesComponent/NewDataAnnouncer.js"], a["modules/accessibility/components/SeriesComponent/forcedMarkers.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/components/SeriesComponent/SeriesDescriber.js"], a["parts/Tooltip.js"]], function (a, f, l, m, p, e, h, g, n) {
                            f =
                            f.extend; var c = h.hideSeriesFromAT, d = g.describeSeries; a.SeriesAccessibilityDescriber = g; e(); a = function () { }; a.prototype = new l; f(a.prototype, {
                                init: function () { this.newDataAnnouncer = new p(this.chart); this.newDataAnnouncer.init(); this.keyboardNavigation = new m(this.chart, this.keyCodes); this.keyboardNavigation.init(); this.hideTooltipFromATWhenShown(); this.hideSeriesLabelsFromATWhenShown() }, hideTooltipFromATWhenShown: function () {
                                    var a = this; this.addEvent(n, "refresh", function () {
                                    this.chart === a.chart && this.label &&
                                        this.label.element && this.label.element.setAttribute("aria-hidden", !0)
                                    })
                                }, hideSeriesLabelsFromATWhenShown: function () { this.addEvent(this.chart, "afterDrawSeriesLabels", function () { this.series.forEach(function (a) { a.labelBySeries && a.labelBySeries.attr("aria-hidden", !0) }) }) }, onChartRender: function () { this.chart.series.forEach(function (a) { !1 !== (a.options.accessibility && a.options.accessibility.enabled) && a.visible ? d(a) : c(a) }) }, getKeyboardNavigation: function () { return this.keyboardNavigation.getKeyboardNavigationHandler() },
                                destroy: function () { this.newDataAnnouncer.destroy(); this.keyboardNavigation.destroy() }
                            }); return a
                        }); t(a, "modules/accessibility/components/ZoomComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l, m, p, e) {
                            var h = f.extend, g = f.pick, n = p.unhideChartElementFromAT, c = e.setElAttrs,
                            d = e.removeElement; a.Axis.prototype.panStep = function (a, c) { var b = c || 3; c = this.getExtremes(); var d = (c.max - c.min) / b * a; b = c.max + d; d = c.min + d; var e = b - d; 0 > a && d < c.dataMin ? (d = c.dataMin, b = d + e) : 0 < a && b > c.dataMax && (b = c.dataMax, d = b - e); this.setExtremes(d, b) }; a = function () { }; a.prototype = new l; h(a.prototype, {
                                init: function () { var a = this, c = this.chart;["afterShowResetZoom", "afterDrilldown", "drillupall"].forEach(function (b) { a.addEvent(c, b, function () { a.updateProxyOverlays() }) }) }, onChartUpdate: function () {
                                    var a = this.chart, c =
                                        this; a.mapNavButtons && a.mapNavButtons.forEach(function (b, d) { n(a, b.element); c.setMapNavButtonAttrs(b.element, "accessibility.zoom.mapZoom" + (d ? "Out" : "In")) })
                                }, setMapNavButtonAttrs: function (a, d) { var b = this.chart; d = b.langFormat(d, { chart: b }); c(a, { tabindex: -1, role: "button", "aria-label": d }) }, onChartRender: function () { this.updateProxyOverlays() }, updateProxyOverlays: function () {
                                    var a = this.chart; d(this.drillUpProxyGroup); d(this.resetZoomProxyGroup); a.resetZoomButton && this.recreateProxyButtonAndGroup(a.resetZoomButton,
                                        "resetZoomProxyButton", "resetZoomProxyGroup", a.langFormat("accessibility.zoom.resetZoomButton", { chart: a })); a.drillUpButton && this.recreateProxyButtonAndGroup(a.drillUpButton, "drillUpProxyButton", "drillUpProxyGroup", a.langFormat("accessibility.drillUpButton", { chart: a, buttonText: a.getDrilldownBackText() }))
                                }, recreateProxyButtonAndGroup: function (a, c, e, g) { d(this[e]); this[e] = this.addProxyGroup(); this[c] = this.createProxyButton(a, this[e], { "aria-label": g, tabindex: -1 }) }, getMapZoomNavigation: function () {
                                    var a =
                                        this.keyCodes, c = this.chart, d = this; return new m(c, { keyCodeMap: [[[a.up, a.down, a.left, a.right], function (a) { return d.onMapKbdArrow(this, a) }], [[a.tab], function (a, b) { return d.onMapKbdTab(this, b) }], [[a.space, a.enter], function () { return d.onMapKbdClick(this) }]], validate: function () { return !!(c.mapZoom && c.mapNavButtons && c.mapNavButtons.length) }, init: function (a) { return d.onMapNavInit(a) } })
                                }, onMapKbdArrow: function (a, c) {
                                    var b = this.keyCodes; this.chart[c === b.up || c === b.down ? "yAxis" : "xAxis"][0].panStep(c === b.left ||
                                        c === b.up ? -1 : 1); return a.response.success
                                }, onMapKbdTab: function (a, c) { var b = this.chart; a = a.response; var d = (c = c.shiftKey) && !this.focusedMapNavButtonIx || !c && this.focusedMapNavButtonIx; b.mapNavButtons[this.focusedMapNavButtonIx].setState(0); if (d) return b.mapZoom(), a[c ? "prev" : "next"]; this.focusedMapNavButtonIx += c ? -1 : 1; c = b.mapNavButtons[this.focusedMapNavButtonIx]; b.setFocusToElement(c.box, c.element); c.setState(2); return a.success }, onMapKbdClick: function (a) {
                                    this.fakeClickEvent(this.chart.mapNavButtons[this.focusedMapNavButtonIx].element);
                                    return a.response.success
                                }, onMapNavInit: function (a) { var b = this.chart, c = b.mapNavButtons[0], d = b.mapNavButtons[1]; c = 0 < a ? c : d; b.setFocusToElement(c.box, c.element); c.setState(2); this.focusedMapNavButtonIx = 0 < a ? 0 : 1 }, simpleButtonNavigation: function (a, c, d) {
                                    var b = this.keyCodes, e = this, n = this.chart; return new m(n, {
                                        keyCodeMap: [[[b.tab, b.up, b.down, b.left, b.right], function (a, c) { return this.response[a === b.tab && c.shiftKey || a === b.left || a === b.up ? "prev" : "next"] }], [[b.space, b.enter], function () {
                                            var a = d(this, n); return g(a,
                                                this.response.success)
                                        }]], validate: function () { return n[a] && n[a].box && e[c] }, init: function () { n.setFocusToElement(n[a].box, e[c]) }
                                    })
                                }, getKeyboardNavigation: function () { return [this.simpleButtonNavigation("resetZoomButton", "resetZoomProxyButton", function (a, c) { c.zoomOut() }), this.simpleButtonNavigation("drillUpButton", "drillUpProxyButton", function (a, c) { c.drillUp(); return a.response.prev }), this.getMapZoomNavigation()] }
                            }); return a
                        }); t(a, "modules/accessibility/components/RangeSelectorComponent.js", [a["parts/Globals.js"],
                        a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l, m, p, e) {
                            f = f.extend; var h = p.unhideChartElementFromAT, g = e.setElAttrs; a.Chart.prototype.highlightRangeSelectorButton = function (a) {
                                var c = this.rangeSelector.buttons, d = this.highlightedRangeSelectorItemIx; "undefined" !== typeof d && c[d] && c[d].setState(this.oldRangeSelectorItemState ||
                                    0); this.highlightedRangeSelectorItemIx = a; return c[a] ? (this.setFocusToElement(c[a].box, c[a].element), this.oldRangeSelectorItemState = c[a].state, c[a].setState(2), !0) : !1
                            }; a = function () { }; a.prototype = new l; f(a.prototype, {
                                onChartUpdate: function () {
                                    var a = this.chart, c = this, d = a.rangeSelector; d && (d.buttons && d.buttons.length && d.buttons.forEach(function (b) { h(a, b.element); c.setRangeButtonAttrs(b) }), d.maxInput && d.minInput && ["minInput", "maxInput"].forEach(function (b, e) {
                                        if (b = d[b]) h(a, b), c.setRangeInputAttrs(b, "accessibility.rangeSelector." +
                                            (e ? "max" : "min") + "InputLabel")
                                    }))
                                }, setRangeButtonAttrs: function (a) { var c = this.chart; c = c.langFormat("accessibility.rangeSelector.buttonText", { chart: c, buttonText: a.text && a.text.textStr }); g(a.element, { tabindex: -1, role: "button", "aria-label": c }) }, setRangeInputAttrs: function (a, c) { var d = this.chart; g(a, { tabindex: -1, role: "textbox", "aria-label": d.langFormat(c, { chart: d }) }) }, getRangeSelectorButtonNavigation: function () {
                                    var a = this.chart, c = this.keyCodes, d = this; return new m(a, {
                                        keyCodeMap: [[[c.left, c.right, c.up, c.down],
                                        function (a) { return d.onButtonNavKbdArrowKey(this, a) }], [[c.enter, c.space], function () { return d.onButtonNavKbdClick(this) }]], validate: function () { return a.rangeSelector && a.rangeSelector.buttons && a.rangeSelector.buttons.length }, init: function (b) { var c = a.rangeSelector.buttons.length - 1; a.highlightRangeSelectorButton(0 < b ? 0 : c) }
                                    })
                                }, onButtonNavKbdArrowKey: function (a, c) {
                                    var d = a.response, b = this.keyCodes, e = this.chart, g = e.options.accessibility.keyboardNavigation.wrapAround; c = c === b.left || c === b.up ? -1 : 1; return e.highlightRangeSelectorButton(e.highlightedRangeSelectorItemIx +
                                        c) ? d.success : g ? (a.init(c), d.success) : d[0 < c ? "next" : "prev"]
                                }, onButtonNavKbdClick: function (a) { a = a.response; var c = this.chart; 3 !== c.oldRangeSelectorItemState && this.fakeClickEvent(c.rangeSelector.buttons[c.highlightedRangeSelectorItemIx].element); return a.success }, getRangeSelectorInputNavigation: function () {
                                    var a = this.chart, c = this.keyCodes, d = this; return new m(a, {
                                        keyCodeMap: [[[c.tab, c.up, c.down], function (a, e) { return d.onInputKbdMove(this, a === c.tab && e.shiftKey || a === c.up ? -1 : 1) }]], validate: function () {
                                            return a.rangeSelector &&
                                                a.rangeSelector.inputGroup && "hidden" !== a.rangeSelector.inputGroup.element.getAttribute("visibility") && !1 !== a.options.rangeSelector.inputEnabled && a.rangeSelector.minInput && a.rangeSelector.maxInput
                                        }, init: function (a) { d.onInputNavInit(a) }, terminate: function () { d.onInputNavTerminate() }
                                    })
                                }, onInputKbdMove: function (a, c) { var d = this.chart; a = a.response; var b = d.highlightedInputRangeIx += c; if (1 < b || 0 > b) return a[0 < c ? "next" : "prev"]; d.rangeSelector[b ? "maxInput" : "minInput"].focus(); return a.success }, onInputNavInit: function (a) {
                                    var c =
                                        this.chart; a = 0 < a ? 0 : 1; c.highlightedInputRangeIx = a; c.rangeSelector[a ? "maxInput" : "minInput"].focus()
                                }, onInputNavTerminate: function () { var a = this.chart.rangeSelector || {}; a.maxInput && a.hideInput("max"); a.minInput && a.hideInput("min") }, getKeyboardNavigation: function () { return [this.getRangeSelectorButtonNavigation(), this.getRangeSelectorInputNavigation()] }
                            }); return a
                        }); t(a, "modules/accessibility/components/InfoRegionsComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"],
                        a["modules/accessibility/utils/Announcer.js"], a["modules/accessibility/components/AnnotationsA11y.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/utils/htmlUtilities.js"]], function (a, f, l, m, p, e, h) {
                            function g(a) { return a.replace(/&lt;(h[1-7]|p|div|ul|ol|li)&gt;/g, "<$1>").replace(/&lt;&#x2F;(h[1-7]|p|div|ul|ol|li|a|button)&gt;/g, "</$1>").replace(/&lt;(div|a|button) id=&quot;([a-zA-Z\-0-9#]*?)&quot;&gt;/g, '<$1 id="$2">') } var n = a.win.document, c = f.extend, d = f.format, b = f.pick,
                                r = p.getAnnotationsInfoHTML, k = e.unhideChartElementFromAT, q = e.getChartTitle, t = e.getAxisDescription, v = h.addClass, u = h.setElAttrs, B = h.escapeStringForHTML, C = h.stripHTMLTagsFromString, y = h.getElement, A = h.visuallyHideElement; a.Chart.prototype.getTypeDescription = function (a) {
                                    var b = a[0], c = this.series && this.series[0] || {}; c = { numSeries: this.series.length, numPoints: c.points && c.points.length, chart: this, mapTitle: c.mapTitle }; if (!b) return this.langFormat("accessibility.chartTypes.emptyChart", c); if ("map" === b) return c.mapTitle ?
                                        this.langFormat("accessibility.chartTypes.mapTypeDescription", c) : this.langFormat("accessibility.chartTypes.unknownMap", c); if (1 < this.types.length) return this.langFormat("accessibility.chartTypes.combinationChart", c); a = a[0]; b = this.langFormat("accessibility.seriesTypeDescriptions." + a, c); var d = this.series && 2 > this.series.length ? "Single" : "Multiple"; return (this.langFormat("accessibility.chartTypes." + a + d, c) || this.langFormat("accessibility.chartTypes.default" + d, c)) + (b ? " " + b : "")
                                }; f = function () { }; f.prototype =
                                    new l; c(f.prototype, {
                                        init: function () { var a = this.chart, b = this; this.initRegionsDefinitions(); this.addEvent(a, "afterGetTable", function (a) { b.onDataTableCreated(a) }); this.addEvent(a, "afterViewData", function (a) { b.dataTableDiv = a; setTimeout(function () { b.focusDataTable() }, 300) }); this.announcer = new m(a, "assertive") }, initRegionsDefinitions: function () {
                                            var a = this; this.screenReaderSections = {
                                                before: {
                                                    element: null, buildContent: function (b) {
                                                        var c = b.options.accessibility.screenReaderSection.beforeChartFormatter; return c ?
                                                            c(b) : a.defaultBeforeChartFormatter(b)
                                                    }, insertIntoDOM: function (a, b) { b.renderTo.insertBefore(a, b.renderTo.firstChild) }, afterInserted: function () { "undefined" !== typeof a.sonifyButtonId && a.initSonifyButton(a.sonifyButtonId); "undefined" !== typeof a.dataTableButtonId && a.initDataTableButton(a.dataTableButtonId) }
                                                }, after: {
                                                    element: null, buildContent: function (b) { var c = b.options.accessibility.screenReaderSection.afterChartFormatter; return c ? c(b) : a.defaultAfterChartFormatter() }, insertIntoDOM: function (a, b) {
                                                        b.renderTo.insertBefore(a,
                                                            b.container.nextSibling)
                                                    }
                                                }
                                            }
                                        }, onChartRender: function () { var a = this; this.linkedDescriptionElement = this.getLinkedDescriptionElement(); this.setLinkedDescriptionAttrs(); Object.keys(this.screenReaderSections).forEach(function (b) { a.updateScreenReaderSection(b) }) }, getLinkedDescriptionElement: function () { var a = this.chart.options.accessibility.linkedDescription; if (a) { if ("string" !== typeof a) return a; a = d(a, this.chart); a = n.querySelectorAll(a); if (1 === a.length) return a[0] } }, setLinkedDescriptionAttrs: function () {
                                            var a =
                                                this.linkedDescriptionElement; a && (a.setAttribute("aria-hidden", "true"), v(a, "highcharts-linked-description"))
                                        }, updateScreenReaderSection: function (a) { var b = this.chart, c = this.screenReaderSections[a], d = c.buildContent(b), e = c.element = c.element || this.createElement("div"), g = e.firstChild || this.createElement("div"); this.setScreenReaderSectionAttribs(e, a); g.innerHTML = d; e.appendChild(g); c.insertIntoDOM(e, b); A(g); k(b, g); c.afterInserted && c.afterInserted() }, setScreenReaderSectionAttribs: function (a, b) {
                                            var c = this.chart,
                                            d = c.langFormat("accessibility.screenReaderSection." + b + "RegionLabel", { chart: c }); u(a, { id: "highcharts-screen-reader-region-" + b + "-" + c.index, "aria-label": d }); a.style.position = "relative"; "all" === c.options.accessibility.landmarkVerbosity && d && a.setAttribute("role", "region")
                                        }, defaultBeforeChartFormatter: function () {
                                            var b = this.chart, c = b.options.accessibility.screenReaderSection.beforeChartFormat, d = this.getAxesDescription(), e = "highcharts-a11y-sonify-data-btn-" + b.index, h = "hc-linkto-highcharts-data-table-" + b.index,
                                            f = r(b), k = b.langFormat("accessibility.screenReaderSection.annotations.heading", { chart: b }); d = { chartTitle: q(b), typeDescription: this.getTypeDescriptionText(), chartSubtitle: this.getSubtitleText(), chartLongdesc: this.getLongdescText(), xAxisDescription: d.xAxis, yAxisDescription: d.yAxis, playAsSoundButton: b.sonify ? this.getSonifyButtonText(e) : "", viewTableButton: b.getCSV ? this.getDataTableButtonText(h) : "", annotationsTitle: f ? k : "", annotationsList: f }; b = a.i18nFormat(c, d, b); this.dataTableButtonId = h; this.sonifyButtonId =
                                                e; return g(B(b)).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "")
                                        }, defaultAfterChartFormatter: function () { var b = this.chart, c = b.options.accessibility.screenReaderSection.afterChartFormat, d = { endOfChartMarker: this.getEndOfChartMarkerText() }; b = a.i18nFormat(c, d, b); return g(B(b)).replace(/<(\w+)[^>]*?>\s*<\/\1>/g, "") }, getLinkedDescription: function () { var a = this.linkedDescriptionElement; return C(a && a.innerHTML || "") }, getLongdescText: function () {
                                            var a = this.chart.options, b = a.caption; b = b && b.text; var c = this.getLinkedDescription();
                                            return a.accessibility.description || c || b || ""
                                        }, getTypeDescriptionText: function () { var a = this.chart; return a.types ? a.options.accessibility.typeDescription || a.getTypeDescription(a.types) : "" }, getDataTableButtonText: function (a) { var b = this.chart; b = b.langFormat("accessibility.table.viewAsDataTableButtonText", { chart: b, chartTitle: q(b) }); return '<a id="' + a + '">' + b + "</a>" }, getSonifyButtonText: function (a) {
                                            var b, c = this.chart; if (!1 === (null === (b = c.options.sonification) || void 0 === b ? void 0 : b.enabled)) return ""; b = c.langFormat("accessibility.sonification.playAsSoundButtonText",
                                                { chart: c, chartTitle: q(c) }); return '<button id="' + a + '">' + b + "</button>"
                                        }, getSubtitleText: function () { var a = this.chart.options.subtitle; return C(a && a.text || "") }, getEndOfChartMarkerText: function () { var a = this.chart, b = a.langFormat("accessibility.screenReaderSection.endOfChartMarker", { chart: a }); return '<div id="highcharts-end-of-chart-marker-' + a.index + '">' + b + "</div>" }, onDataTableCreated: function (a) {
                                            var b = this.chart; b.options.accessibility.enabled && (this.viewDataTableButton && this.viewDataTableButton.setAttribute("aria-expanded",
                                                "true"), a.html = a.html.replace("<table ", '<table tabindex="0" summary="' + b.langFormat("accessibility.table.tableSummary", { chart: b }) + '"'))
                                        }, focusDataTable: function () { var a = this.dataTableDiv; (a = a && a.getElementsByTagName("table")[0]) && a.focus && a.focus() }, initSonifyButton: function (a) {
                                            var b = this, c = this.sonifyButton = y(a), d = this.chart, e = function (a) {
                                            null === c || void 0 === c ? void 0 : c.setAttribute("aria-hidden", "true"); null === c || void 0 === c ? void 0 : c.setAttribute("aria-label", ""); a.preventDefault(); a.stopPropagation();
                                                a = d.langFormat("accessibility.sonification.playAsSoundClickAnnouncement", { chart: d }); b.announcer.announce(a); setTimeout(function () { null === c || void 0 === c ? void 0 : c.removeAttribute("aria-hidden"); null === c || void 0 === c ? void 0 : c.removeAttribute("aria-label"); d.sonify && d.sonify() }, 1E3)
                                            }; c && d && (u(c, { tabindex: "-1" }), c.onclick = function (a) { var b; ((null === (b = d.options.accessibility) || void 0 === b ? void 0 : b.screenReaderSection.onPlayAsSoundClick) || e).call(this, a, d) })
                                        }, initDataTableButton: function (a) {
                                            var b = this.viewDataTableButton =
                                                y(a), c = this.chart; a = a.replace("hc-linkto-", ""); b && (u(b, { role: "button", tabindex: "-1", "aria-expanded": !!y(a), href: "#" + a }), b.onclick = c.options.accessibility.screenReaderSection.onViewDataTableClick || function () { c.viewData() })
                                        }, getAxesDescription: function () {
                                            var a = this.chart, c = function (c, d) { c = a[c]; return 1 < c.length || c[0] && b(c[0].options.accessibility && c[0].options.accessibility.enabled, d) }, d = !!a.types && 0 > a.types.indexOf("map"), e = !!a.hasCartesianSeries, g = c("xAxis", !a.angular && e && d); c = c("yAxis", e && d); d = {};
                                            g && (d.xAxis = this.getAxisDescriptionText("xAxis")); c && (d.yAxis = this.getAxisDescriptionText("yAxis")); return d
                                        }, getAxisDescriptionText: function (a) { var b = this, c = this.chart, d = c[a]; return c.langFormat("accessibility.axis." + a + "Description" + (1 < d.length ? "Plural" : "Singular"), { chart: c, names: d.map(function (a) { return t(a) }), ranges: d.map(function (a) { return b.getAxisRangeDescription(a) }), numAxes: d.length }) }, getAxisRangeDescription: function (a) {
                                            var b = a.options || {}; return b.accessibility && "undefined" !== typeof b.accessibility.rangeDescription ?
                                                b.accessibility.rangeDescription : a.categories ? this.getCategoryAxisRangeDesc(a) : !a.isDatetimeAxis || 0 !== a.min && 0 !== a.dataMin ? this.getAxisFromToDescription(a) : this.getAxisTimeLengthDesc(a)
                                        }, getCategoryAxisRangeDesc: function (a) { var b = this.chart; return a.dataMax && a.dataMin ? b.langFormat("accessibility.axis.rangeCategories", { chart: b, axis: a, numCategories: a.dataMax - a.dataMin + 1 }) : "" }, getAxisTimeLengthDesc: function (a) {
                                            var b = this.chart, c = {}, d = "Seconds"; c.Seconds = ((a.max || 0) - (a.min || 0)) / 1E3; c.Minutes = c.Seconds /
                                                60; c.Hours = c.Minutes / 60; c.Days = c.Hours / 24;["Minutes", "Hours", "Days"].forEach(function (a) { 2 < c[a] && (d = a) }); var e = c[d].toFixed("Seconds" !== d && "Minutes" !== d ? 1 : 0); return b.langFormat("accessibility.axis.timeRange" + d, { chart: b, axis: a, range: e.replace(".0", "") })
                                        }, getAxisFromToDescription: function (a) {
                                            var b = this.chart, c = b.options.accessibility.screenReaderSection.axisRangeDateFormat, d = function (d) { return a.isDatetimeAxis ? b.time.dateFormat(c, a[d]) : a[d] }; return b.langFormat("accessibility.axis.rangeFromTo", {
                                                chart: b,
                                                axis: a, rangeFrom: d("min"), rangeTo: d("max")
                                            })
                                        }, destroy: function () { var a; null === (a = this.announcer) || void 0 === a ? void 0 : a.destroy() }
                                    }); return f
                        }); t(a, "modules/accessibility/components/ContainerComponent.js", [a["parts/Globals.js"], a["parts/Utilities.js"], a["modules/accessibility/utils/htmlUtilities.js"], a["modules/accessibility/utils/chartUtilities.js"], a["modules/accessibility/AccessibilityComponent.js"]], function (a, f, l, m, p) {
                            var e = a.win.document; a = f.extend; var h = l.stripHTMLTagsFromString, g = m.unhideChartElementFromAT,
                                n = m.getChartTitle; l = function () { }; l.prototype = new p; a(l.prototype, {
                                    onChartUpdate: function () { this.handleSVGTitleElement(); this.setSVGContainerLabel(); this.setGraphicContainerAttrs(); this.setRenderToAttrs(); this.makeCreditsAccessible() }, handleSVGTitleElement: function () {
                                        var a = this.chart, d = "highcharts-title-" + a.index, b = h(a.langFormat("accessibility.svgContainerTitle", { chartTitle: n(a) })); if (b.length) {
                                            var g = this.svgTitleElement = this.svgTitleElement || e.createElementNS("http://www.w3.org/2000/svg", "title");
                                            g.textContent = b; g.id = d; a.renderTo.insertBefore(g, a.renderTo.firstChild)
                                        }
                                    }, setSVGContainerLabel: function () { var a = this.chart, d = h(a.langFormat("accessibility.svgContainerLabel", { chartTitle: n(a) })); a.renderer.box && d.length && a.renderer.box.setAttribute("aria-label", d) }, setGraphicContainerAttrs: function () { var a = this.chart, d = a.langFormat("accessibility.graphicContainerLabel", { chartTitle: n(a) }); d.length && a.container.setAttribute("aria-label", d) }, setRenderToAttrs: function () {
                                        var a = this.chart; "disabled" !== a.options.accessibility.landmarkVerbosity ?
                                            a.renderTo.setAttribute("role", "region") : a.renderTo.removeAttribute("role"); a.renderTo.setAttribute("aria-label", a.langFormat("accessibility.chartContainerLabel", { title: n(a), chart: a }))
                                    }, makeCreditsAccessible: function () { var a = this.chart, d = a.credits; d && (d.textStr && d.element.setAttribute("aria-label", h(a.langFormat("accessibility.credits", { creditsStr: d.textStr }))), g(a, d.element)) }, destroy: function () { this.chart.renderTo.setAttribute("aria-hidden", !0) }
                                }); return l
                        }); t(a, "modules/accessibility/high-contrast-mode.js",
                            [a["parts/Globals.js"]], function (a) {
                                var f = a.isMS, l = a.win, m = l.document; return {
                                    isHighContrastModeActive: function () { var a = /(Edg)/.test(l.navigator.userAgent); if (l.matchMedia && a) return l.matchMedia("(-ms-high-contrast: active)").matches; if (f && l.getComputedStyle) { a = m.createElement("div"); a.style.backgroundImage = "url(#)"; m.body.appendChild(a); var e = (a.currentStyle || l.getComputedStyle(a)).backgroundImage; m.body.removeChild(a); return "none" === e } return !1 }, setHighContrastTheme: function (a) {
                                    a.highContrastModeActive =
                                        !0; var e = a.options.accessibility.highContrastTheme; a.update(e, !1); a.series.forEach(function (a) { var g = e.plotOptions[a.type] || {}; a.update({ color: g.color || "windowText", colors: [g.color || "windowText"], borderColor: g.borderColor || "window" }); a.points.forEach(function (a) { a.options && a.options.color && a.update({ color: g.color || "windowText", borderColor: g.borderColor || "window" }, !1) }) }); a.redraw()
                                    }
                                }
                            }); t(a, "modules/accessibility/high-contrast-theme.js", [], function () {
                                return {
                                    chart: { backgroundColor: "window" }, title: { style: { color: "windowText" } },
                                    subtitle: { style: { color: "windowText" } }, colorAxis: { minColor: "windowText", maxColor: "windowText", stops: [] }, colors: ["windowText"], xAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, yAxis: { gridLineColor: "windowText", labels: { style: { color: "windowText" } }, lineColor: "windowText", minorGridLineColor: "windowText", tickColor: "windowText", title: { style: { color: "windowText" } } }, tooltip: {
                                        backgroundColor: "window",
                                        borderColor: "windowText", style: { color: "windowText" }
                                    }, plotOptions: {
                                        series: { lineColor: "windowText", fillColor: "window", borderColor: "windowText", edgeColor: "windowText", borderWidth: 1, dataLabels: { connectorColor: "windowText", color: "windowText", style: { color: "windowText", textOutline: "none" } }, marker: { lineColor: "windowText", fillColor: "windowText" } }, pie: { color: "window", colors: ["window"], borderColor: "windowText", borderWidth: 1 }, boxplot: { fillColor: "window" }, candlestick: { lineColor: "windowText", fillColor: "window" },
                                        errorbar: { fillColor: "window" }
                                    }, legend: { backgroundColor: "window", itemStyle: { color: "windowText" }, itemHoverStyle: { color: "windowText" }, itemHiddenStyle: { color: "#555" }, title: { style: { color: "windowText" } } }, credits: { style: { color: "windowText" } }, labels: { style: { color: "windowText" } }, drilldown: { activeAxisLabelStyle: { color: "windowText" }, activeDataLabelStyle: { color: "windowText" } }, navigation: { buttonOptions: { symbolStroke: "windowText", theme: { fill: "window" } } }, rangeSelector: {
                                        buttonTheme: {
                                            fill: "window", stroke: "windowText",
                                            style: { color: "windowText" }, states: { hover: { fill: "window", stroke: "windowText", style: { color: "windowText" } }, select: { fill: "#444", stroke: "windowText", style: { color: "windowText" } } }
                                        }, inputBoxBorderColor: "windowText", inputStyle: { backgroundColor: "window", color: "windowText" }, labelStyle: { color: "windowText" }
                                    }, navigator: { handles: { backgroundColor: "window", borderColor: "windowText" }, outlineColor: "windowText", maskFill: "transparent", series: { color: "windowText", lineColor: "windowText" }, xAxis: { gridLineColor: "windowText" } },
                                    scrollbar: { barBackgroundColor: "#444", barBorderColor: "windowText", buttonArrowColor: "windowText", buttonBackgroundColor: "window", buttonBorderColor: "windowText", rifleColor: "windowText", trackBackgroundColor: "window", trackBorderColor: "windowText" }
                                }
                            }); t(a, "modules/accessibility/options/options.js", [], function () {
                                return {
                                    accessibility: {
                                        enabled: !0, screenReaderSection: {
                                            beforeChartFormat: "<h5>{chartTitle}</h5><div>{typeDescription}</div><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{playAsSoundButton}</div><div>{viewTableButton}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div><div>{annotationsTitle}{annotationsList}</div>",
                                            afterChartFormat: "{endOfChartMarker}", axisRangeDateFormat: "%Y-%m-%d %H:%M:%S"
                                        }, series: { describeSingleSeries: !1, pointDescriptionEnabledThreshold: 200 }, point: { valueDescriptionFormat: "{index}. {xDescription}{separator}{value}." }, landmarkVerbosity: "all", linkedDescription: '*[data-highcharts-chart="{index}"] + .highcharts-description', keyboardNavigation: {
                                            enabled: !0, focusBorder: { enabled: !0, hideBrowserFocusOutline: !0, style: { color: "#335cad", lineWidth: 2, borderRadius: 3 }, margin: 2 }, order: ["series", "zoom", "rangeSelector",
                                                "legend", "chartMenu"], wrapAround: !0, seriesNavigation: { skipNullPoints: !0, pointNavigationEnabledThreshold: !1 }
                                        }, announceNewData: { enabled: !1, minAnnounceInterval: 5E3, interruptUser: !1 }
                                    }, legend: { accessibility: { enabled: !0, keyboardNavigation: { enabled: !0 } } }, exporting: { accessibility: { enabled: !0 } }
                                }
                            }); t(a, "modules/accessibility/options/langOptions.js", [], function () {
                                return {
                                    accessibility: {
                                        defaultChartTitle: "Chart", chartContainerLabel: "{title}. Highcharts interactive chart.", svgContainerLabel: "Interactive chart",
                                        drillUpButton: "{buttonText}", credits: "Chart credits: {creditsStr}", thousandsSep: ",", svgContainerTitle: "", graphicContainerLabel: "", screenReaderSection: {
                                            beforeRegionLabel: "Chart screen reader information.", afterRegionLabel: "", annotations: { heading: "Chart annotations summary", descriptionSinglePoint: "{annotationText}. Related to {annotationPoint}", descriptionMultiplePoints: "{annotationText}. Related to {annotationPoint}{ Also related to, #each(additionalAnnotationPoints)}", descriptionNoPoints: "{annotationText}" },
                                            endOfChartMarker: "End of interactive chart."
                                        }, sonification: { playAsSoundButtonText: "Play as sound, {chartTitle}", playAsSoundClickAnnouncement: "Play" }, legend: { legendLabel: "Toggle series visibility", legendItem: "Toggle visibility of {itemName}" }, zoom: { mapZoomIn: "Zoom chart", mapZoomOut: "Zoom out chart", resetZoomButton: "Reset zoom" }, rangeSelector: { minInputLabel: "Select start date.", maxInputLabel: "Select end date.", buttonText: "Select range {buttonText}" }, table: {
                                            viewAsDataTableButtonText: "View as data table, {chartTitle}",
                                            tableSummary: "Table representation of chart."
                                        }, announceNewData: { newDataAnnounce: "Updated data for chart {chartTitle}", newSeriesAnnounceSingle: "New data series: {seriesDesc}", newPointAnnounceSingle: "New data point: {pointDesc}", newSeriesAnnounceMultiple: "New data series in chart {chartTitle}: {seriesDesc}", newPointAnnounceMultiple: "New data point in chart {chartTitle}: {pointDesc}" }, seriesTypeDescriptions: {
                                            boxplot: "Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",
                                            arearange: "Arearange charts are line charts displaying a range between a lower and higher value for each point.", areasplinerange: "These charts are line charts displaying a range between a lower and higher value for each point.", bubble: "Bubble charts are scatter charts where each data point also has a size value.", columnrange: "Columnrange charts are column charts displaying a range between a lower and higher value for each point.", errorbar: "Errorbar series are used to display the variability of the data.",
                                            funnel: "Funnel charts are used to display reduction of data in stages.", pyramid: "Pyramid charts consist of a single pyramid with item heights corresponding to each point value.", waterfall: "A waterfall chart is a column chart where each column contributes towards a total end value."
                                        }, chartTypes: {
                                            emptyChart: "Empty chart", mapTypeDescription: "Map of {mapTitle} with {numSeries} data series.", unknownMap: "Map of unspecified region with {numSeries} data series.", combinationChart: "Combination chart with {numSeries} data series.",
                                            defaultSingle: "Chart with {numPoints} data {#plural(numPoints, points, point)}.", defaultMultiple: "Chart with {numSeries} data series.", splineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.", splineMultiple: "Line chart with {numSeries} lines.", lineSingle: "Line chart with {numPoints} data {#plural(numPoints, points, point)}.", lineMultiple: "Line chart with {numSeries} lines.", columnSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", columnMultiple: "Bar chart with {numSeries} data series.",
                                            barSingle: "Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.", barMultiple: "Bar chart with {numSeries} data series.", pieSingle: "Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.", pieMultiple: "Pie chart with {numSeries} pies.", scatterSingle: "Scatter chart with {numPoints} {#plural(numPoints, points, point)}.", scatterMultiple: "Scatter chart with {numSeries} data series.", boxplotSingle: "Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotMultiple: "Boxplot with {numSeries} data series.",
                                            bubbleSingle: "Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.", bubbleMultiple: "Bubble chart with {numSeries} data series."
                                        }, axis: {
                                            xAxisDescriptionSingular: "The chart has 1 X axis displaying {names[0]}. {ranges[0]}", xAxisDescriptionPlural: "The chart has {numAxes} X axes displaying {#each(names, -1) }and {names[-1]}.", yAxisDescriptionSingular: "The chart has 1 Y axis displaying {names[0]}. {ranges[0]}", yAxisDescriptionPlural: "The chart has {numAxes} Y axes displaying {#each(names, -1) }and {names[-1]}.",
                                            timeRangeDays: "Range: {range} days.", timeRangeHours: "Range: {range} hours.", timeRangeMinutes: "Range: {range} minutes.", timeRangeSeconds: "Range: {range} seconds.", rangeFromTo: "Range: {rangeFrom} to {rangeTo}.", rangeCategories: "Range: {numCategories} categories."
                                        }, exporting: { chartMenuLabel: "Chart menu", menuButtonLabel: "View chart menu", exportRegionLabel: "Chart menu" }, series: {
                                            summary: {
                                                "default": "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", defaultCombination: "{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
                                                line: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", lineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", spline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", splineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.", column: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
                                                columnCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", bar: "{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.", barCombination: "{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.", pie: "{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.", pieCombination: "{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.",
                                                scatter: "{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.", scatterCombination: "{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.", boxplot: "{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.", boxplotCombination: "{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.", bubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
                                                bubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.", map: "{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.", mapCombination: "{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.", mapline: "{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.", maplineCombination: "{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
                                                mapbubble: "{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.", mapbubbleCombination: "{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."
                                            }, description: "{description}", xAxisDescription: "X axis, {name}", yAxisDescription: "Y axis, {name}", nullPointValue: "No value", pointAnnotationsDescription: "{Annotation: #each(annotations). }"
                                        }
                                    }
                                }
                            }); t(a, "modules/accessibility/options/deprecatedOptions.js", [a["parts/Utilities.js"]],
                                function (a) {
                                    function f(a, d, b) { g("Highcharts: Deprecated option " + d + " used. This will be removed from future versions of Highcharts. Use " + b + " instead.", !1, a) } function l(a, d, b) { for (var c, e = 0; e < d.length - 1; ++e)c = d[e], a = a[c] = n(a[c], {}); a[d[d.length - 1]] = b } function m(a, d, b, e) { function c(a, b) { return b.reduce(function (a, b) { return a[b] }, a) } var g = c(a.options, d), h = c(a.options, b); Object.keys(e).forEach(function (c) { var k = g[c]; "undefined" !== typeof k && (l(h, e[c], k), f(a, d.join(".") + "." + c, b.join(".") + "." + e[c].join("."))) }) }
                                    function p(a) { var c = a.options.chart || {}, b = a.options.accessibility || {};["description", "typeDescription"].forEach(function (d) { c[d] && (b[d] = c[d], f(a, "chart." + d, "accessibility." + d)) }) } function e(a) { a.axes.forEach(function (c) { (c = c.options) && c.description && (c.accessibility = c.accessibility || {}, c.accessibility.description = c.description, f(a, "axis.description", "axis.accessibility.description")) }) } function h(a) {
                                        var c = {
                                            description: ["accessibility", "description"], exposeElementToA11y: ["accessibility", "exposeAsGroupOnly"],
                                            pointDescriptionFormatter: ["accessibility", "pointDescriptionFormatter"], skipKeyboardNavigation: ["accessibility", "keyboardNavigation", "enabled"]
                                        }; a.series.forEach(function (b) { Object.keys(c).forEach(function (d) { var e = b.options[d]; "undefined" !== typeof e && (l(b.options, c[d], "skipKeyboardNavigation" === d ? !e : e), f(a, "series." + d, "series." + c[d].join("."))) }) })
                                    } var g = a.error, n = a.pick; return function (a) {
                                        p(a); e(a); a.series && h(a); m(a, ["accessibility"], ["accessibility"], {
                                            pointDateFormat: ["point", "dateFormat"], pointDateFormatter: ["point",
                                                "dateFormatter"], pointDescriptionFormatter: ["point", "descriptionFormatter"], pointDescriptionThreshold: ["series", "pointDescriptionEnabledThreshold"], pointNavigationThreshold: ["keyboardNavigation", "seriesNavigation", "pointNavigationEnabledThreshold"], pointValueDecimals: ["point", "valueDecimals"], pointValuePrefix: ["point", "valuePrefix"], pointValueSuffix: ["point", "valueSuffix"], screenReaderSectionFormatter: ["screenReaderSection", "beforeChartFormatter"], describeSingleSeries: ["series", "describeSingleSeries"],
                                            seriesDescriptionFormatter: ["series", "descriptionFormatter"], onTableAnchorClick: ["screenReaderSection", "onViewDataTableClick"], axisRangeDateFormat: ["screenReaderSection", "axisRangeDateFormat"]
                                        }); m(a, ["accessibility", "keyboardNavigation"], ["accessibility", "keyboardNavigation", "seriesNavigation"], { skipNullPoints: ["skipNullPoints"], mode: ["mode"] }); m(a, ["lang", "accessibility"], ["lang", "accessibility"], {
                                            legendItem: ["legend", "legendItem"], legendLabel: ["legend", "legendLabel"], mapZoomIn: ["zoom", "mapZoomIn"],
                                            mapZoomOut: ["zoom", "mapZoomOut"], resetZoomButton: ["zoom", "resetZoomButton"], screenReaderRegionLabel: ["screenReaderSection", "beforeRegionLabel"], rangeSelectorButton: ["rangeSelector", "buttonText"], rangeSelectorMaxInput: ["rangeSelector", "maxInputLabel"], rangeSelectorMinInput: ["rangeSelector", "minInputLabel"], svgContainerEnd: ["screenReaderSection", "endOfChartMarker"], viewAsDataTable: ["table", "viewAsDataTableButtonText"], tableSummary: ["table", "tableSummary"]
                                        })
                                    }
                                }); t(a, "modules/accessibility/a11y-i18n.js",
                                    [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, f) {
                                        function l(a, h) {
                                            var e = a.indexOf("#each("), f = a.indexOf("#plural("), c = a.indexOf("["), d = a.indexOf("]"); if (-1 < e) { c = a.slice(e).indexOf(")") + e; var b = a.substring(0, e); f = a.substring(c + 1); c = a.substring(e + 6, c).split(","); e = Number(c[1]); a = ""; if (h = h[c[0]]) for (e = isNaN(e) ? h.length : e, e = 0 > e ? h.length + e : Math.min(e, h.length), c = 0; c < e; ++c)a += b + h[c] + f; return a.length ? a : "" } if (-1 < f) {
                                                b = a.slice(f).indexOf(")") + f; a = a.substring(f + 8, b).split(","); switch (Number(h[a[0]])) {
                                                    case 0: a =
                                                        p(a[4], a[1]); break; case 1: a = p(a[2], a[1]); break; case 2: a = p(a[3], a[1]); break; default: a = a[1]
                                                }a ? (h = a, h = h.trim && h.trim() || h.replace(/^\s+|\s+$/g, "")) : h = ""; return h
                                            } return -1 < c ? (f = a.substring(0, c), a = Number(a.substring(c + 1, d)), h = h[f], !isNaN(a) && h && (0 > a ? (b = h[h.length + a], "undefined" === typeof b && (b = h[0])) : (b = h[a], "undefined" === typeof b && (b = h[h.length - 1]))), "undefined" !== typeof b ? b : "") : "{" + a + "}"
                                        } var m = f.format, p = f.pick; a.i18nFormat = function (a, f, g) {
                                            var e = function (a, b) {
                                                a = a.slice(b || 0); var c = a.indexOf("{"), d = a.indexOf("}");
                                                if (-1 < c && d > c) return { statement: a.substring(c + 1, d), begin: b + c + 1, end: b + d }
                                            }, c = [], d = 0; do { var b = e(a, d); var h = a.substring(d, b && b.begin - 1); h.length && c.push({ value: h, type: "constant" }); b && c.push({ value: b.statement, type: "statement" }); d = b ? b.end + 1 : d + 1 } while (b); c.forEach(function (a) { "statement" === a.type && (a.value = l(a.value, f)) }); return m(c.reduce(function (a, b) { return a + b.value }, ""), f, g)
                                        }; a.Chart.prototype.langFormat = function (e, f) {
                                            e = e.split("."); for (var g = this.options.lang, h = 0; h < e.length; ++h)g = g && g[e[h]]; return "string" ===
                                                typeof g ? a.i18nFormat(g, f, this) : ""
                                        }
                                    }); t(a, "modules/accessibility/focusBorder.js", [a["parts/Globals.js"], a["parts/Utilities.js"]], function (a, f) {
                                        var l = f.addEvent, m = f.extend, p = f.pick; m(a.SVGElement.prototype, {
                                            addFocusBorder: function (a, f) {
                                            this.focusBorder && this.removeFocusBorder(); var e = this.getBBox(); a = p(a, 3); e.x += this.translateX ? this.translateX : 0; e.y += this.translateY ? this.translateY : 0; this.focusBorder = this.renderer.rect(e.x - a, e.y - a, e.width + 2 * a, e.height + 2 * a, parseInt((f && f.borderRadius || 0).toString(),
                                                10)).addClass("highcharts-focus-border").attr({ zIndex: 99 }).add(this.parentGroup); this.renderer.styledMode || this.focusBorder.attr({ stroke: f && f.stroke, "stroke-width": f && f.strokeWidth })
                                            }, removeFocusBorder: function () { this.focusBorder && (this.focusBorder.destroy(), delete this.focusBorder) }
                                        }); a.Chart.prototype.setFocusToElement = function (a, f) {
                                            var e = this.options.accessibility.keyboardNavigation.focusBorder; (f = f || a.element) && f.focus && (f.hcEvents && f.hcEvents.focusin || l(f, "focusin", function () { }), f.focus(), e.hideBrowserFocusOutline &&
                                                (f.style.outline = "none")); e.enabled && (this.focusElement && this.focusElement.removeFocusBorder(), a.addFocusBorder(e.margin, { stroke: e.style.color, strokeWidth: e.style.lineWidth, borderRadius: e.style.borderRadius }), this.focusElement = a)
                                        }
                                    }); t(a, "modules/accessibility/accessibility.js", [a["modules/accessibility/utils/chartUtilities.js"], a["parts/Globals.js"], a["modules/accessibility/KeyboardNavigationHandler.js"], a["parts/Point.js"], a["parts/Utilities.js"], a["modules/accessibility/AccessibilityComponent.js"],
                                    a["modules/accessibility/KeyboardNavigation.js"], a["modules/accessibility/components/LegendComponent.js"], a["modules/accessibility/components/MenuComponent.js"], a["modules/accessibility/components/SeriesComponent/SeriesComponent.js"], a["modules/accessibility/components/ZoomComponent.js"], a["modules/accessibility/components/RangeSelectorComponent.js"], a["modules/accessibility/components/InfoRegionsComponent.js"], a["modules/accessibility/components/ContainerComponent.js"], a["modules/accessibility/high-contrast-mode.js"],
                                    a["modules/accessibility/high-contrast-theme.js"], a["modules/accessibility/options/options.js"], a["modules/accessibility/options/langOptions.js"], a["modules/accessibility/options/deprecatedOptions.js"]], function (a, f, l, m, p, e, h, g, n, c, d, b, t, k, x, I, v, u, B) {
                                        function q(a) { this.init(a) } var r = p.addEvent, A = p.extend, w = p.fireEvent, D = p.merge, E = f.win.document; D(!0, f.defaultOptions, v, { accessibility: { highContrastTheme: I }, lang: u }); f.A11yChartUtilities = a; f.KeyboardNavigationHandler = l; f.AccessibilityComponent = e; q.prototype =
                                            {
                                                init: function (a) { this.chart = a; E.addEventListener && a.renderer.isSVG ? (B(a), this.initComponents(), this.keyboardNavigation = new h(a, this.components), this.update()) : a.renderTo.setAttribute("aria-hidden", !0) }, initComponents: function () {
                                                    var a = this.chart, e = a.options.accessibility; this.components = { container: new k, infoRegions: new t, legend: new g, chartMenu: new n, rangeSelector: new b, series: new c, zoom: new d }; e.customComponents && A(this.components, e.customComponents); var f = this.components; this.getComponentOrder().forEach(function (b) {
                                                        f[b].initBase(a);
                                                        f[b].init()
                                                    })
                                                }, getComponentOrder: function () { if (!this.components) return []; if (!this.components.series) return Object.keys(this.components); var a = Object.keys(this.components).filter(function (a) { return "series" !== a }); return ["series"].concat(a) }, update: function () {
                                                    var a = this.components, b = this.chart, c = b.options.accessibility; w(b, "beforeA11yUpdate"); b.types = this.getChartTypes(); this.getComponentOrder().forEach(function (c) { a[c].onChartUpdate(); w(b, "afterA11yComponentUpdate", { name: c, component: a[c] }) }); this.keyboardNavigation.update(c.keyboardNavigation.order);
                                                    !b.highContrastModeActive && x.isHighContrastModeActive() && x.setHighContrastTheme(b); w(b, "afterA11yUpdate", { accessibility: this })
                                                }, destroy: function () { var a = this.chart || {}, b = this.components; Object.keys(b).forEach(function (a) { b[a].destroy(); b[a].destroyBase() }); this.keyboardNavigation && this.keyboardNavigation.destroy(); a.renderTo && a.renderTo.setAttribute("aria-hidden", !0); a.focusElement && a.focusElement.removeFocusBorder() }, getChartTypes: function () {
                                                    var a = {}; this.chart.series.forEach(function (b) {
                                                    a[b.type] =
                                                        1
                                                    }); return Object.keys(a)
                                                }
                                            }; f.Chart.prototype.updateA11yEnabled = function () { var a = this.accessibility, b = this.options.accessibility; b && b.enabled ? a ? a.update() : this.accessibility = new q(this) : a ? (a.destroy && a.destroy(), delete this.accessibility) : this.renderTo.setAttribute("aria-hidden", !0) }; r(f.Chart, "render", function (a) { this.a11yDirty && this.renderTo && (delete this.a11yDirty, this.updateA11yEnabled()); var b = this.accessibility; b && b.getComponentOrder().forEach(function (a) { b.components[a].onChartRender() }) });
                                        r(f.Chart, "update", function (a) { if (a = a.options.accessibility) a.customComponents && (this.options.accessibility.customComponents = a.customComponents, delete a.customComponents), D(!0, this.options.accessibility, a), this.accessibility && this.accessibility.destroy && (this.accessibility.destroy(), delete this.accessibility); this.a11yDirty = !0 }); r(m, "update", function () { this.series.chart.accessibility && (this.series.chart.a11yDirty = !0) });["addSeries", "init"].forEach(function (a) {
                                            r(f.Chart, a, function () {
                                            this.a11yDirty =
                                                !0
                                            })
                                        });["update", "updatedData", "remove"].forEach(function (a) { r(f.Series, a, function () { this.chart.accessibility && (this.chart.a11yDirty = !0) }) });["afterDrilldown", "drillupall"].forEach(function (a) { r(f.Chart, a, function () { this.accessibility && this.accessibility.update() }) }); r(f.Chart, "destroy", function () { this.accessibility && this.accessibility.destroy() })
                                    }); t(a, "masters/modules/accessibility.src.js", [], function () { })
});
//# sourceMappingURL=accessibility.js.map