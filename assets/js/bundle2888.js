!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {})
}(this, (function(e) {
    "use strict";
    function t(e) {
        if (null == e)
            return window;
        if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return t && t.defaultView || window
        }
        return e
    }
    function n(e) {
        return e instanceof t(e).Element || e instanceof Element
    }
    function i(e) {
        return e instanceof t(e).HTMLElement || e instanceof HTMLElement
    }
    function r(e) {
        return "undefined" != typeof ShadowRoot && (e instanceof t(e).ShadowRoot || e instanceof ShadowRoot)
    }
    var s = Math.max
      , o = Math.min
      , a = Math.round;
    function l() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map((function(e) {
            return e.brand + "/" + e.version
        }
        )).join(" ") : navigator.userAgent
    }
    function c() {
        return !/^((?!chrome|android).)*safari/i.test(l())
    }
    function d(e, r, s) {
        void 0 === r && (r = !1),
        void 0 === s && (s = !1);
        var o = e.getBoundingClientRect()
          , l = 1
          , d = 1;
        r && i(e) && (l = e.offsetWidth > 0 && a(o.width) / e.offsetWidth || 1,
        d = e.offsetHeight > 0 && a(o.height) / e.offsetHeight || 1);
        var u = (n(e) ? t(e) : window).visualViewport
          , p = !c() && s
          , f = (o.left + (p && u ? u.offsetLeft : 0)) / l
          , h = (o.top + (p && u ? u.offsetTop : 0)) / d
          , m = o.width / l
          , g = o.height / d;
        return {
            width: m,
            height: g,
            top: h,
            right: f + m,
            bottom: h + g,
            left: f,
            x: f,
            y: h
        }
    }
    function u(e) {
        var n = t(e);
        return {
            scrollLeft: n.pageXOffset,
            scrollTop: n.pageYOffset
        }
    }
    function p(e) {
        return e ? (e.nodeName || "").toLowerCase() : null
    }
    function f(e) {
        return ((n(e) ? e.ownerDocument : e.document) || window.document).documentElement
    }
    function h(e) {
        return d(f(e)).left + u(e).scrollLeft
    }
    function m(e) {
        return t(e).getComputedStyle(e)
    }
    function g(e) {
        var t = m(e)
          , n = t.overflow
          , i = t.overflowX
          , r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + i)
    }
    function v(e, n, r) {
        void 0 === r && (r = !1);
        var s, o, l = i(n), c = i(n) && function(e) {
            var t = e.getBoundingClientRect()
              , n = a(t.width) / e.offsetWidth || 1
              , i = a(t.height) / e.offsetHeight || 1;
            return 1 !== n || 1 !== i
        }(n), m = f(n), v = d(e, c, r), b = {
            scrollLeft: 0,
            scrollTop: 0
        }, y = {
            x: 0,
            y: 0
        };
        return (l || !l && !r) && (("body" !== p(n) || g(m)) && (b = (s = n) !== t(s) && i(s) ? {
            scrollLeft: (o = s).scrollLeft,
            scrollTop: o.scrollTop
        } : u(s)),
        i(n) ? ((y = d(n, !0)).x += n.clientLeft,
        y.y += n.clientTop) : m && (y.x = h(m))),
        {
            x: v.left + b.scrollLeft - y.x,
            y: v.top + b.scrollTop - y.y,
            width: v.width,
            height: v.height
        }
    }
    function b(e) {
        var t = d(e)
          , n = e.offsetWidth
          , i = e.offsetHeight;
        return Math.abs(t.width - n) <= 1 && (n = t.width),
        Math.abs(t.height - i) <= 1 && (i = t.height),
        {
            x: e.offsetLeft,
            y: e.offsetTop,
            width: n,
            height: i
        }
    }
    function y(e) {
        return "html" === p(e) ? e : e.assignedSlot || e.parentNode || (r(e) ? e.host : null) || f(e)
    }
    function w(e) {
        return ["html", "body", "#document"].indexOf(p(e)) >= 0 ? e.ownerDocument.body : i(e) && g(e) ? e : w(y(e))
    }
    function x(e, n) {
        var i;
        void 0 === n && (n = []);
        var r = w(e)
          , s = r === (null == (i = e.ownerDocument) ? void 0 : i.body)
          , o = t(r)
          , a = s ? [o].concat(o.visualViewport || [], g(r) ? r : []) : r
          , l = n.concat(a);
        return s ? l : l.concat(x(y(a)))
    }
    function E(e) {
        return ["table", "td", "th"].indexOf(p(e)) >= 0
    }
    function _(e) {
        return i(e) && "fixed" !== m(e).position ? e.offsetParent : null
    }
    function S(e) {
        for (var n = t(e), s = _(e); s && E(s) && "static" === m(s).position; )
            s = _(s);
        return s && ("html" === p(s) || "body" === p(s) && "static" === m(s).position) ? n : s || function(e) {
            var t = /firefox/i.test(l());
            if (/Trident/i.test(l()) && i(e) && "fixed" === m(e).position)
                return null;
            var n = y(e);
            for (r(n) && (n = n.host); i(n) && ["html", "body"].indexOf(p(n)) < 0; ) {
                var s = m(n);
                if ("none" !== s.transform || "none" !== s.perspective || "paint" === s.contain || -1 !== ["transform", "perspective"].indexOf(s.willChange) || t && "filter" === s.willChange || t && s.filter && "none" !== s.filter)
                    return n;
                n = n.parentNode
            }
            return null
        }(e) || n
    }
    var T = "top"
      , C = "bottom"
      , A = "right"
      , M = "left"
      , k = "auto"
      , O = [T, C, A, M]
      , P = "start"
      , L = "end"
      , I = "viewport"
      , $ = "popper"
      , z = O.reduce((function(e, t) {
        return e.concat([t + "-" + P, t + "-" + L])
    }
    ), [])
      , D = [].concat(O, [k]).reduce((function(e, t) {
        return e.concat([t, t + "-" + P, t + "-" + L])
    }
    ), [])
      , j = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
    function N(e) {
        var t = new Map
          , n = new Set
          , i = [];
        return e.forEach((function(e) {
            t.set(e.name, e)
        }
        )),
        e.forEach((function(e) {
            n.has(e.name) || function e(r) {
                n.add(r.name),
                [].concat(r.requires || [], r.requiresIfExists || []).forEach((function(i) {
                    if (!n.has(i)) {
                        var r = t.get(i);
                        r && e(r)
                    }
                }
                )),
                i.push(r)
            }(e)
        }
        )),
        i
    }
    function H(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t))
            return !0;
        if (n && r(n)) {
            var i = t;
            do {
                if (i && e.isSameNode(i))
                    return !0;
                i = i.parentNode || i.host
            } while (i)
        }
        return !1
    }
    function F(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height
        })
    }
    function R(e, i, r) {
        return i === I ? F(function(e, n) {
            var i = t(e)
              , r = f(e)
              , s = i.visualViewport
              , o = r.clientWidth
              , a = r.clientHeight
              , l = 0
              , d = 0;
            if (s) {
                o = s.width,
                a = s.height;
                var u = c();
                (u || !u && "fixed" === n) && (l = s.offsetLeft,
                d = s.offsetTop)
            }
            return {
                width: o,
                height: a,
                x: l + h(e),
                y: d
            }
        }(e, r)) : n(i) ? function(e, t) {
            var n = d(e, !1, "fixed" === t);
            return n.top = n.top + e.clientTop,
            n.left = n.left + e.clientLeft,
            n.bottom = n.top + e.clientHeight,
            n.right = n.left + e.clientWidth,
            n.width = e.clientWidth,
            n.height = e.clientHeight,
            n.x = n.left,
            n.y = n.top,
            n
        }(i, r) : F(function(e) {
            var t, n = f(e), i = u(e), r = null == (t = e.ownerDocument) ? void 0 : t.body, o = s(n.scrollWidth, n.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = s(n.scrollHeight, n.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), l = -i.scrollLeft + h(e), c = -i.scrollTop;
            return "rtl" === m(r || n).direction && (l += s(n.clientWidth, r ? r.clientWidth : 0) - o),
            {
                width: o,
                height: a,
                x: l,
                y: c
            }
        }(f(e)))
    }
    function W(e, t, r, a) {
        var l = "clippingParents" === t ? function(e) {
            var t = x(y(e))
              , r = ["absolute", "fixed"].indexOf(m(e).position) >= 0 && i(e) ? S(e) : e;
            return n(r) ? t.filter((function(e) {
                return n(e) && H(e, r) && "body" !== p(e)
            }
            )) : []
        }(e) : [].concat(t)
          , c = [].concat(l, [r])
          , d = c[0]
          , u = c.reduce((function(t, n) {
            var i = R(e, n, a);
            return t.top = s(i.top, t.top),
            t.right = o(i.right, t.right),
            t.bottom = o(i.bottom, t.bottom),
            t.left = s(i.left, t.left),
            t
        }
        ), R(e, d, a));
        return u.width = u.right - u.left,
        u.height = u.bottom - u.top,
        u.x = u.left,
        u.y = u.top,
        u
    }
    function B(e) {
        return e.split("-")[0]
    }
    function q(e) {
        return e.split("-")[1]
    }
    function V(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
    }
    function X(e) {
        var t, n = e.reference, i = e.element, r = e.placement, s = r ? B(r) : null, o = r ? q(r) : null, a = n.x + n.width / 2 - i.width / 2, l = n.y + n.height / 2 - i.height / 2;
        switch (s) {
        case T:
            t = {
                x: a,
                y: n.y - i.height
            };
            break;
        case C:
            t = {
                x: a,
                y: n.y + n.height
            };
            break;
        case A:
            t = {
                x: n.x + n.width,
                y: l
            };
            break;
        case M:
            t = {
                x: n.x - i.width,
                y: l
            };
            break;
        default:
            t = {
                x: n.x,
                y: n.y
            }
        }
        var c = s ? V(s) : null;
        if (null != c) {
            var d = "y" === c ? "height" : "width";
            switch (o) {
            case P:
                t[c] = t[c] - (n[d] / 2 - i[d] / 2);
                break;
            case L:
                t[c] = t[c] + (n[d] / 2 - i[d] / 2)
            }
        }
        return t
    }
    function G(e) {
        return Object.assign({}, {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }, e)
    }
    function Y(e, t) {
        return t.reduce((function(t, n) {
            return t[n] = e,
            t
        }
        ), {})
    }
    function U(e, t) {
        void 0 === t && (t = {});
        var i = t
          , r = i.placement
          , s = void 0 === r ? e.placement : r
          , o = i.strategy
          , a = void 0 === o ? e.strategy : o
          , l = i.boundary
          , c = void 0 === l ? "clippingParents" : l
          , u = i.rootBoundary
          , p = void 0 === u ? I : u
          , h = i.elementContext
          , m = void 0 === h ? $ : h
          , g = i.altBoundary
          , v = void 0 !== g && g
          , b = i.padding
          , y = void 0 === b ? 0 : b
          , w = G("number" != typeof y ? y : Y(y, O))
          , x = m === $ ? "reference" : $
          , E = e.rects.popper
          , _ = e.elements[v ? x : m]
          , S = W(n(_) ? _ : _.contextElement || f(e.elements.popper), c, p, a)
          , M = d(e.elements.reference)
          , k = X({
            reference: M,
            element: E,
            strategy: "absolute",
            placement: s
        })
          , P = F(Object.assign({}, E, k))
          , L = m === $ ? P : M
          , z = {
            top: S.top - L.top + w.top,
            bottom: L.bottom - S.bottom + w.bottom,
            left: S.left - L.left + w.left,
            right: L.right - S.right + w.right
        }
          , D = e.modifiersData.offset;
        if (m === $ && D) {
            var j = D[s];
            Object.keys(z).forEach((function(e) {
                var t = [A, C].indexOf(e) >= 0 ? 1 : -1
                  , n = [T, C].indexOf(e) >= 0 ? "y" : "x";
                z[e] += j[n] * t
            }
            ))
        }
        return z
    }
    var K = {
        placement: "bottom",
        modifiers: [],
        strategy: "absolute"
    };
    function Q() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return !t.some((function(e) {
            return !(e && "function" == typeof e.getBoundingClientRect)
        }
        ))
    }
    function Z(e) {
        void 0 === e && (e = {});
        var t = e
          , i = t.defaultModifiers
          , r = void 0 === i ? [] : i
          , s = t.defaultOptions
          , o = void 0 === s ? K : s;
        return function(e, t, i) {
            void 0 === i && (i = o);
            var s, a, l = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, K, o),
                modifiersData: {},
                elements: {
                    reference: e,
                    popper: t
                },
                attributes: {},
                styles: {}
            }, c = [], d = !1, u = {
                state: l,
                setOptions: function(i) {
                    var s = "function" == typeof i ? i(l.options) : i;
                    p(),
                    l.options = Object.assign({}, o, l.options, s),
                    l.scrollParents = {
                        reference: n(e) ? x(e) : e.contextElement ? x(e.contextElement) : [],
                        popper: x(t)
                    };
                    var a, d, f = function(e) {
                        var t = N(e);
                        return j.reduce((function(e, n) {
                            return e.concat(t.filter((function(e) {
                                return e.phase === n
                            }
                            )))
                        }
                        ), [])
                    }((a = [].concat(r, l.options.modifiers),
                    d = a.reduce((function(e, t) {
                        var n = e[t.name];
                        return e[t.name] = n ? Object.assign({}, n, t, {
                            options: Object.assign({}, n.options, t.options),
                            data: Object.assign({}, n.data, t.data)
                        }) : t,
                        e
                    }
                    ), {}),
                    Object.keys(d).map((function(e) {
                        return d[e]
                    }
                    ))));
                    return l.orderedModifiers = f.filter((function(e) {
                        return e.enabled
                    }
                    )),
                    l.orderedModifiers.forEach((function(e) {
                        var t = e.name
                          , n = e.options
                          , i = void 0 === n ? {} : n
                          , r = e.effect;
                        if ("function" == typeof r) {
                            var s = r({
                                state: l,
                                name: t,
                                instance: u,
                                options: i
                            });
                            c.push(s || function() {}
                            )
                        }
                    }
                    )),
                    u.update()
                },
                forceUpdate: function() {
                    if (!d) {
                        var e = l.elements
                          , t = e.reference
                          , n = e.popper;
                        if (Q(t, n)) {
                            l.rects = {
                                reference: v(t, S(n), "fixed" === l.options.strategy),
                                popper: b(n)
                            },
                            l.reset = !1,
                            l.placement = l.options.placement,
                            l.orderedModifiers.forEach((function(e) {
                                return l.modifiersData[e.name] = Object.assign({}, e.data)
                            }
                            ));
                            for (var i = 0; i < l.orderedModifiers.length; i++)
                                if (!0 !== l.reset) {
                                    var r = l.orderedModifiers[i]
                                      , s = r.fn
                                      , o = r.options
                                      , a = void 0 === o ? {} : o
                                      , c = r.name;
                                    "function" == typeof s && (l = s({
                                        state: l,
                                        options: a,
                                        name: c,
                                        instance: u
                                    }) || l)
                                } else
                                    l.reset = !1,
                                    i = -1
                        }
                    }
                },
                update: (s = function() {
                    return new Promise((function(e) {
                        u.forceUpdate(),
                        e(l)
                    }
                    ))
                }
                ,
                function() {
                    return a || (a = new Promise((function(e) {
                        Promise.resolve().then((function() {
                            a = void 0,
                            e(s())
                        }
                        ))
                    }
                    ))),
                    a
                }
                ),
                destroy: function() {
                    p(),
                    d = !0
                }
            };
            if (!Q(e, t))
                return u;
            function p() {
                c.forEach((function(e) {
                    return e()
                }
                )),
                c = []
            }
            return u.setOptions(i).then((function(e) {
                !d && i.onFirstUpdate && i.onFirstUpdate(e)
            }
            )),
            u
        }
    }
    var J = {
        passive: !0
    }
      , ee = {
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var n = e.state
              , i = e.instance
              , r = e.options
              , s = r.scroll
              , o = void 0 === s || s
              , a = r.resize
              , l = void 0 === a || a
              , c = t(n.elements.popper)
              , d = [].concat(n.scrollParents.reference, n.scrollParents.popper);
            return o && d.forEach((function(e) {
                e.addEventListener("scroll", i.update, J)
            }
            )),
            l && c.addEventListener("resize", i.update, J),
            function() {
                o && d.forEach((function(e) {
                    e.removeEventListener("scroll", i.update, J)
                }
                )),
                l && c.removeEventListener("resize", i.update, J)
            }
        },
        data: {}
    }
      , te = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state
              , n = e.name;
            t.modifiersData[n] = X({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            })
        },
        data: {}
    }
      , ne = {
        top: "auto",
        right: "auto",
        bottom: "auto",
        left: "auto"
    };
    function ie(e) {
        var n, i = e.popper, r = e.popperRect, s = e.placement, o = e.variation, l = e.offsets, c = e.position, d = e.gpuAcceleration, u = e.adaptive, p = e.roundOffsets, h = e.isFixed, g = l.x, v = void 0 === g ? 0 : g, b = l.y, y = void 0 === b ? 0 : b, w = "function" == typeof p ? p({
            x: v,
            y: y
        }) : {
            x: v,
            y: y
        };
        v = w.x,
        y = w.y;
        var x = l.hasOwnProperty("x")
          , E = l.hasOwnProperty("y")
          , _ = M
          , k = T
          , O = window;
        if (u) {
            var P = S(i)
              , I = "clientHeight"
              , $ = "clientWidth";
            P === t(i) && "static" !== m(P = f(i)).position && "absolute" === c && (I = "scrollHeight",
            $ = "scrollWidth"),
            P = P,
            (s === T || (s === M || s === A) && o === L) && (k = C,
            y -= (h && P === O && O.visualViewport ? O.visualViewport.height : P[I]) - r.height,
            y *= d ? 1 : -1),
            s !== M && (s !== T && s !== C || o !== L) || (_ = A,
            v -= (h && P === O && O.visualViewport ? O.visualViewport.width : P[$]) - r.width,
            v *= d ? 1 : -1)
        }
        var z, D = Object.assign({
            position: c
        }, u && ne), j = !0 === p ? function(e, t) {
            var n = e.x
              , i = e.y
              , r = t.devicePixelRatio || 1;
            return {
                x: a(n * r) / r || 0,
                y: a(i * r) / r || 0
            }
        }({
            x: v,
            y: y
        }, t(i)) : {
            x: v,
            y: y
        };
        return v = j.x,
        y = j.y,
        d ? Object.assign({}, D, ((z = {})[k] = E ? "0" : "",
        z[_] = x ? "0" : "",
        z.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + y + "px)" : "translate3d(" + v + "px, " + y + "px, 0)",
        z)) : Object.assign({}, D, ((n = {})[k] = E ? y + "px" : "",
        n[_] = x ? v + "px" : "",
        n.transform = "",
        n))
    }
    var re = {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state
              , n = e.options
              , i = n.gpuAcceleration
              , r = void 0 === i || i
              , s = n.adaptive
              , o = void 0 === s || s
              , a = n.roundOffsets
              , l = void 0 === a || a
              , c = {
                placement: B(t.placement),
                variation: q(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, ie(Object.assign({}, c, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: o,
                roundOffsets: l
            })))),
            null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, ie(Object.assign({}, c, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: l
            })))),
            t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            })
        },
        data: {}
    }
      , se = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}
                  , r = t.attributes[e] || {}
                  , s = t.elements[e];
                i(s) && p(s) && (Object.assign(s.style, n),
                Object.keys(r).forEach((function(e) {
                    var t = r[e];
                    !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t)
                }
                )))
            }
            ))
        },
        effect: function(e) {
            var t = e.state
              , n = {
                popper: {
                    position: t.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            return Object.assign(t.elements.popper.style, n.popper),
            t.styles = n,
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function() {
                Object.keys(t.elements).forEach((function(e) {
                    var r = t.elements[e]
                      , s = t.attributes[e] || {}
                      , o = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                        return e[t] = "",
                        e
                    }
                    ), {});
                    i(r) && p(r) && (Object.assign(r.style, o),
                    Object.keys(s).forEach((function(e) {
                        r.removeAttribute(e)
                    }
                    )))
                }
                ))
            }
        },
        requires: ["computeStyles"]
    }
      , oe = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function(e) {
            var t = e.state
              , n = e.options
              , i = e.name
              , r = n.offset
              , s = void 0 === r ? [0, 0] : r
              , o = D.reduce((function(e, n) {
                return e[n] = function(e, t, n) {
                    var i = B(e)
                      , r = [M, T].indexOf(i) >= 0 ? -1 : 1
                      , s = "function" == typeof n ? n(Object.assign({}, t, {
                        placement: e
                    })) : n
                      , o = s[0]
                      , a = s[1];
                    return o = o || 0,
                    a = (a || 0) * r,
                    [M, A].indexOf(i) >= 0 ? {
                        x: a,
                        y: o
                    } : {
                        x: o,
                        y: a
                    }
                }(n, t.rects, s),
                e
            }
            ), {})
              , a = o[t.placement]
              , l = a.x
              , c = a.y;
            null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += l,
            t.modifiersData.popperOffsets.y += c),
            t.modifiersData[i] = o
        }
    }
      , ae = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    };
    function le(e) {
        return e.replace(/left|right|bottom|top/g, (function(e) {
            return ae[e]
        }
        ))
    }
    var ce = {
        start: "end",
        end: "start"
    };
    function de(e) {
        return e.replace(/start|end/g, (function(e) {
            return ce[e]
        }
        ))
    }
    function ue(e, t) {
        void 0 === t && (t = {});
        var n = t
          , i = n.placement
          , r = n.boundary
          , s = n.rootBoundary
          , o = n.padding
          , a = n.flipVariations
          , l = n.allowedAutoPlacements
          , c = void 0 === l ? D : l
          , d = q(i)
          , u = d ? a ? z : z.filter((function(e) {
            return q(e) === d
        }
        )) : O
          , p = u.filter((function(e) {
            return c.indexOf(e) >= 0
        }
        ));
        0 === p.length && (p = u);
        var f = p.reduce((function(t, n) {
            return t[n] = U(e, {
                placement: n,
                boundary: r,
                rootBoundary: s,
                padding: o
            })[B(n)],
            t
        }
        ), {});
        return Object.keys(f).sort((function(e, t) {
            return f[e] - f[t]
        }
        ))
    }
    var pe = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state
              , n = e.options
              , i = e.name;
            if (!t.modifiersData[i]._skip) {
                for (var r = n.mainAxis, s = void 0 === r || r, o = n.altAxis, a = void 0 === o || o, l = n.fallbackPlacements, c = n.padding, d = n.boundary, u = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, h = void 0 === f || f, m = n.allowedAutoPlacements, g = t.options.placement, v = B(g), b = l || (v !== g && h ? function(e) {
                    if (B(e) === k)
                        return [];
                    var t = le(e);
                    return [de(e), t, de(t)]
                }(g) : [le(g)]), y = [g].concat(b).reduce((function(e, n) {
                    return e.concat(B(n) === k ? ue(t, {
                        placement: n,
                        boundary: d,
                        rootBoundary: u,
                        padding: c,
                        flipVariations: h,
                        allowedAutoPlacements: m
                    }) : n)
                }
                ), []), w = t.rects.reference, x = t.rects.popper, E = new Map, _ = !0, S = y[0], O = 0; O < y.length; O++) {
                    var L = y[O]
                      , I = B(L)
                      , $ = q(L) === P
                      , z = [T, C].indexOf(I) >= 0
                      , D = z ? "width" : "height"
                      , j = U(t, {
                        placement: L,
                        boundary: d,
                        rootBoundary: u,
                        altBoundary: p,
                        padding: c
                    })
                      , N = z ? $ ? A : M : $ ? C : T;
                    w[D] > x[D] && (N = le(N));
                    var H = le(N)
                      , F = [];
                    if (s && F.push(j[I] <= 0),
                    a && F.push(j[N] <= 0, j[H] <= 0),
                    F.every((function(e) {
                        return e
                    }
                    ))) {
                        S = L,
                        _ = !1;
                        break
                    }
                    E.set(L, F)
                }
                if (_)
                    for (var R = function(e) {
                        var t = y.find((function(t) {
                            var n = E.get(t);
                            if (n)
                                return n.slice(0, e).every((function(e) {
                                    return e
                                }
                                ))
                        }
                        ));
                        if (t)
                            return S = t,
                            "break"
                    }, W = h ? 3 : 1; W > 0 && "break" !== R(W); W--)
                        ;
                t.placement !== S && (t.modifiersData[i]._skip = !0,
                t.placement = S,
                t.reset = !0)
            }
        },
        requiresIfExists: ["offset"],
        data: {
            _skip: !1
        }
    };
    function fe(e, t, n) {
        return s(e, o(t, n))
    }
    var he = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t = e.state
              , n = e.options
              , i = e.name
              , r = n.mainAxis
              , a = void 0 === r || r
              , l = n.altAxis
              , c = void 0 !== l && l
              , d = n.boundary
              , u = n.rootBoundary
              , p = n.altBoundary
              , f = n.padding
              , h = n.tether
              , m = void 0 === h || h
              , g = n.tetherOffset
              , v = void 0 === g ? 0 : g
              , y = U(t, {
                boundary: d,
                rootBoundary: u,
                padding: f,
                altBoundary: p
            })
              , w = B(t.placement)
              , x = q(t.placement)
              , E = !x
              , _ = V(w)
              , k = "x" === _ ? "y" : "x"
              , O = t.modifiersData.popperOffsets
              , L = t.rects.reference
              , I = t.rects.popper
              , $ = "function" == typeof v ? v(Object.assign({}, t.rects, {
                placement: t.placement
            })) : v
              , z = "number" == typeof $ ? {
                mainAxis: $,
                altAxis: $
            } : Object.assign({
                mainAxis: 0,
                altAxis: 0
            }, $)
              , D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null
              , j = {
                x: 0,
                y: 0
            };
            if (O) {
                if (a) {
                    var N, H = "y" === _ ? T : M, F = "y" === _ ? C : A, R = "y" === _ ? "height" : "width", W = O[_], X = W + y[H], G = W - y[F], Y = m ? -I[R] / 2 : 0, K = x === P ? L[R] : I[R], Q = x === P ? -I[R] : -L[R], Z = t.elements.arrow, J = m && Z ? b(Z) : {
                        width: 0,
                        height: 0
                    }, ee = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }, te = ee[H], ne = ee[F], ie = fe(0, L[R], J[R]), re = E ? L[R] / 2 - Y - ie - te - z.mainAxis : K - ie - te - z.mainAxis, se = E ? -L[R] / 2 + Y + ie + ne + z.mainAxis : Q + ie + ne + z.mainAxis, oe = t.elements.arrow && S(t.elements.arrow), ae = oe ? "y" === _ ? oe.clientTop || 0 : oe.clientLeft || 0 : 0, le = null != (N = null == D ? void 0 : D[_]) ? N : 0, ce = W + se - le, de = fe(m ? o(X, W + re - le - ae) : X, W, m ? s(G, ce) : G);
                    O[_] = de,
                    j[_] = de - W
                }
                if (c) {
                    var ue, pe = "x" === _ ? T : M, he = "x" === _ ? C : A, me = O[k], ge = "y" === k ? "height" : "width", ve = me + y[pe], be = me - y[he], ye = -1 !== [T, M].indexOf(w), we = null != (ue = null == D ? void 0 : D[k]) ? ue : 0, xe = ye ? ve : me - L[ge] - I[ge] - we + z.altAxis, Ee = ye ? me + L[ge] + I[ge] - we - z.altAxis : be, _e = m && ye ? function(e, t, n) {
                        var i = fe(e, t, n);
                        return i > n ? n : i
                    }(xe, me, Ee) : fe(m ? xe : ve, me, m ? Ee : be);
                    O[k] = _e,
                    j[k] = _e - me
                }
                t.modifiersData[i] = j
            }
        },
        requiresIfExists: ["offset"]
    }
      , me = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function(e) {
            var t, n = e.state, i = e.name, r = e.options, s = n.elements.arrow, o = n.modifiersData.popperOffsets, a = B(n.placement), l = V(a), c = [M, A].indexOf(a) >= 0 ? "height" : "width";
            if (s && o) {
                var d = function(e, t) {
                    return G("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, t.rects, {
                        placement: t.placement
                    })) : e) ? e : Y(e, O))
                }(r.padding, n)
                  , u = b(s)
                  , p = "y" === l ? T : M
                  , f = "y" === l ? C : A
                  , h = n.rects.reference[c] + n.rects.reference[l] - o[l] - n.rects.popper[c]
                  , m = o[l] - n.rects.reference[l]
                  , g = S(s)
                  , v = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0
                  , y = h / 2 - m / 2
                  , w = d[p]
                  , x = v - u[c] - d[f]
                  , E = v / 2 - u[c] / 2 + y
                  , _ = fe(w, E, x)
                  , k = l;
                n.modifiersData[i] = ((t = {})[k] = _,
                t.centerOffset = _ - E,
                t)
            }
        },
        effect: function(e) {
            var t = e.state
              , n = e.options.element
              , i = void 0 === n ? "[data-popper-arrow]" : n;
            null != i && ("string" != typeof i || (i = t.elements.popper.querySelector(i))) && H(t.elements.popper, i) && (t.elements.arrow = i)
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"]
    };
    function ge(e, t, n) {
        return void 0 === n && (n = {
            x: 0,
            y: 0
        }),
        {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x
        }
    }
    function ve(e) {
        return [T, A, C, M].some((function(t) {
            return e[t] >= 0
        }
        ))
    }
    var be = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function(e) {
            var t = e.state
              , n = e.name
              , i = t.rects.reference
              , r = t.rects.popper
              , s = t.modifiersData.preventOverflow
              , o = U(t, {
                elementContext: "reference"
            })
              , a = U(t, {
                altBoundary: !0
            })
              , l = ge(o, i)
              , c = ge(a, r, s)
              , d = ve(l)
              , u = ve(c);
            t.modifiersData[n] = {
                referenceClippingOffsets: l,
                popperEscapeOffsets: c,
                isReferenceHidden: d,
                hasPopperEscaped: u
            },
            t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": d,
                "data-popper-escaped": u
            })
        }
    }
      , ye = Z({
        defaultModifiers: [ee, te, re, se]
    })
      , we = [ee, te, re, se, oe, pe, he, me, be]
      , xe = Z({
        defaultModifiers: we
    });
    e.applyStyles = se,
    e.arrow = me,
    e.computeStyles = re,
    e.createPopper = xe,
    e.createPopperLite = ye,
    e.defaultModifiers = we,
    e.detectOverflow = U,
    e.eventListeners = ee,
    e.flip = pe,
    e.hide = be,
    e.offset = oe,
    e.popperGenerator = Z,
    e.popperOffsets = te,
    e.preventOverflow = he,
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
}
)),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t(e.Popper)
}(this, (function(e) {
    "use strict";
    const t = function(e) {
        const t = Object.create(null, {
            [Symbol.toStringTag]: {
                value: "Module"
            }
        });
        if (e)
            for (const n in e)
                if ("default" !== n) {
                    const i = Object.getOwnPropertyDescriptor(e, n);
                    Object.defineProperty(t, n, i.get ? i : {
                        enumerable: !0,
                        get: () => e[n]
                    })
                }
        return t.default = e,
        Object.freeze(t)
    }(e)
      , n = new Map
      , i = {
        set(e, t, i) {
            n.has(e) || n.set(e, new Map);
            const r = n.get(e);
            r.has(t) || 0 === r.size ? r.set(t, i) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`)
        },
        get: (e, t) => n.has(e) && n.get(e).get(t) || null,
        remove(e, t) {
            if (!n.has(e))
                return;
            const i = n.get(e);
            i.delete(t),
            0 === i.size && n.delete(e)
        }
    }
      , r = "transitionend"
      , s = e => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t))),
    e)
      , o = e => {
        e.dispatchEvent(new Event(r))
    }
      , a = e => !(!e || "object" != typeof e) && (void 0 !== e.jquery && (e = e[0]),
    void 0 !== e.nodeType)
      , l = e => a(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(s(e)) : null
      , c = e => {
        if (!a(e) || 0 === e.getClientRects().length)
            return !1;
        const t = "visible" === getComputedStyle(e).getPropertyValue("visibility")
          , n = e.closest("details:not([open])");
        if (!n)
            return t;
        if (n !== e) {
            const t = e.closest("summary");
            if (t && t.parentNode !== n)
                return !1;
            if (null === t)
                return !1
        }
        return t
    }
      , d = e => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled"))
      , u = e => {
        if (!document.documentElement.attachShadow)
            return null;
        if ("function" == typeof e.getRootNode) {
            const t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null
        }
        return e instanceof ShadowRoot ? e : e.parentNode ? u(e.parentNode) : null
    }
      , p = () => {}
      , f = e => {
        e.offsetHeight
    }
      , h = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null
      , m = []
      , g = () => "rtl" === document.documentElement.dir
      , v = e => {
        var t;
        t = () => {
            const t = h();
            if (t) {
                const n = e.NAME
                  , i = t.fn[n];
                t.fn[n] = e.jQueryInterface,
                t.fn[n].Constructor = e,
                t.fn[n].noConflict = () => (t.fn[n] = i,
                e.jQueryInterface)
            }
        }
        ,
        "loading" === document.readyState ? (m.length || document.addEventListener("DOMContentLoaded", () => {
            for (const e of m)
                e()
        }
        ),
        m.push(t)) : t()
    }
      , b = (e, t=[], n=e) => "function" == typeof e ? e(...t) : n
      , y = (e, t, n=!0) => {
        if (!n)
            return void b(e);
        const i = (e => {
            if (!e)
                return 0;
            let {transitionDuration: t, transitionDelay: n} = window.getComputedStyle(e);
            const i = Number.parseFloat(t)
              , r = Number.parseFloat(n);
            return i || r ? (t = t.split(",")[0],
            n = n.split(",")[0],
            1e3 * (Number.parseFloat(t) + Number.parseFloat(n))) : 0
        }
        )(t) + 5;
        let s = !1;
        const a = ({target: n}) => {
            n === t && (s = !0,
            t.removeEventListener(r, a),
            b(e))
        }
        ;
        t.addEventListener(r, a),
        setTimeout( () => {
            s || o(t)
        }
        , i)
    }
      , w = (e, t, n, i) => {
        const r = e.length;
        let s = e.indexOf(t);
        return -1 === s ? !n && i ? e[r - 1] : e[0] : (s += n ? 1 : -1,
        i && (s = (s + r) % r),
        e[Math.max(0, Math.min(s, r - 1))])
    }
      , x = /[^.]*(?=\..*)\.|.*/
      , E = /\..*/
      , _ = /::\d+$/
      , S = {};
    let T = 1;
    const C = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }
      , A = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
    function M(e, t) {
        return t && `${t}::${T++}` || e.uidEvent || T++
    }
    function k(e) {
        const t = M(e);
        return e.uidEvent = t,
        S[t] = S[t] || {},
        S[t]
    }
    function O(e, t, n=null) {
        return Object.values(e).find(e => e.callable === t && e.delegationSelector === n)
    }
    function P(e, t, n) {
        const i = "string" == typeof t
          , r = i ? n : t || n;
        let s = z(e);
        return A.has(s) || (s = e),
        [i, r, s]
    }
    function L(e, t, n, i, r) {
        if ("string" != typeof t || !e)
            return;
        let[s,o,a] = P(t, n, i);
        if (t in C) {
            o = (e => function(t) {
                if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget))
                    return e.call(this, t)
            }
            )(o)
        }
        const l = k(e)
          , c = l[a] || (l[a] = {})
          , d = O(c, o, s ? n : null);
        if (d)
            return void (d.oneOff = d.oneOff && r);
        const u = M(o, t.replace(x, ""))
          , p = s ? function(e, t, n) {
            return function i(r) {
                const s = e.querySelectorAll(t);
                for (let {target: o} = r; o && o !== this; o = o.parentNode)
                    for (const a of s)
                        if (a === o)
                            return j(r, {
                                delegateTarget: o
                            }),
                            i.oneOff && D.off(e, r.type, t, n),
                            n.apply(o, [r])
            }
        }(e, n, o) : function(e, t) {
            return function n(i) {
                return j(i, {
                    delegateTarget: e
                }),
                n.oneOff && D.off(e, i.type, t),
                t.apply(e, [i])
            }
        }(e, o);
        p.delegationSelector = s ? n : null,
        p.callable = o,
        p.oneOff = r,
        p.uidEvent = u,
        c[u] = p,
        e.addEventListener(a, p, s)
    }
    function I(e, t, n, i, r) {
        const s = O(t[n], i, r);
        s && (e.removeEventListener(n, s, Boolean(r)),
        delete t[n][s.uidEvent])
    }
    function $(e, t, n, i) {
        const r = t[n] || {};
        for (const [s,o] of Object.entries(r))
            s.includes(i) && I(e, t, n, o.callable, o.delegationSelector)
    }
    function z(e) {
        return e = e.replace(E, ""),
        C[e] || e
    }
    const D = {
        on(e, t, n, i) {
            L(e, t, n, i, !1)
        },
        one(e, t, n, i) {
            L(e, t, n, i, !0)
        },
        off(e, t, n, i) {
            if ("string" != typeof t || !e)
                return;
            const [r,s,o] = P(t, n, i)
              , a = o !== t
              , l = k(e)
              , c = l[o] || {}
              , d = t.startsWith(".");
            if (void 0 === s) {
                if (d)
                    for (const n of Object.keys(l))
                        $(e, l, n, t.slice(1));
                for (const [n,i] of Object.entries(c)) {
                    const r = n.replace(_, "");
                    a && !t.includes(r) || I(e, l, o, i.callable, i.delegationSelector)
                }
            } else {
                if (!Object.keys(c).length)
                    return;
                I(e, l, o, s, r ? n : null)
            }
        },
        trigger(e, t, n) {
            if ("string" != typeof t || !e)
                return null;
            const i = h();
            let r = null
              , s = !0
              , o = !0
              , a = !1;
            t !== z(t) && i && (r = i.Event(t, n),
            i(e).trigger(r),
            s = !r.isPropagationStopped(),
            o = !r.isImmediatePropagationStopped(),
            a = r.isDefaultPrevented());
            const l = j(new Event(t,{
                bubbles: s,
                cancelable: !0
            }), n);
            return a && l.preventDefault(),
            o && e.dispatchEvent(l),
            l.defaultPrevented && r && r.preventDefault(),
            l
        }
    };
    function j(e, t={}) {
        for (const [n,i] of Object.entries(t))
            try {
                e[n] = i
            } catch (t) {
                Object.defineProperty(e, n, {
                    configurable: !0,
                    get: () => i
                })
            }
        return e
    }
    function N(e) {
        if ("true" === e)
            return !0;
        if ("false" === e)
            return !1;
        if (e === Number(e).toString())
            return Number(e);
        if ("" === e || "null" === e)
            return null;
        if ("string" != typeof e)
            return e;
        try {
            return JSON.parse(decodeURIComponent(e))
        } catch (t) {
            return e
        }
    }
    function H(e) {
        return e.replace(/[A-Z]/g, e => "-" + e.toLowerCase())
    }
    const F = {
        setDataAttribute(e, t, n) {
            e.setAttribute("data-bs-" + H(t), n)
        },
        removeDataAttribute(e, t) {
            e.removeAttribute("data-bs-" + H(t))
        },
        getDataAttributes(e) {
            if (!e)
                return {};
            const t = {}
              , n = Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"));
            for (const i of n) {
                let n = i.replace(/^bs/, "");
                n = n.charAt(0).toLowerCase() + n.slice(1, n.length),
                t[n] = N(e.dataset[i])
            }
            return t
        },
        getDataAttribute: (e, t) => N(e.getAttribute("data-bs-" + H(t)))
    };
    class R {
        static get Default() {
            return {}
        }
        static get DefaultType() {
            return {}
        }
        static get NAME() {
            throw new Error('You have to implement the static method "NAME", for each component!')
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e),
            e = this._configAfterMerge(e),
            this._typeCheckConfig(e),
            e
        }
        _configAfterMerge(e) {
            return e
        }
        _mergeConfigObj(e, t) {
            const n = a(t) ? F.getDataAttribute(t, "config") : {};
            return {
                ...this.constructor.Default,
                ..."object" == typeof n ? n : {},
                ...a(t) ? F.getDataAttributes(t) : {},
                ..."object" == typeof e ? e : {}
            }
        }
        _typeCheckConfig(e, t=this.constructor.DefaultType) {
            for (const [i,r] of Object.entries(t)) {
                const t = e[i]
                  , s = a(t) ? "element" : null == (n = t) ? "" + n : Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase();
                if (!new RegExp(r).test(s))
                    throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${s}" but expected type "${r}".`)
            }
            var n
        }
    }
    class W extends R {
        constructor(e, t) {
            super(),
            (e = l(e)) && (this._element = e,
            this._config = this._getConfig(t),
            i.set(this._element, this.constructor.DATA_KEY, this))
        }
        dispose() {
            i.remove(this._element, this.constructor.DATA_KEY),
            D.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this))
                this[e] = null
        }
        _queueCallback(e, t, n=!0) {
            y(e, t, n)
        }
        _getConfig(e) {
            return e = this._mergeConfigObj(e, this._element),
            e = this._configAfterMerge(e),
            this._typeCheckConfig(e),
            e
        }
        static getInstance(e) {
            return i.get(l(e), this.DATA_KEY)
        }
        static getOrCreateInstance(e, t={}) {
            return this.getInstance(e) || new this(e,"object" == typeof t ? t : null)
        }
        static get VERSION() {
            return "5.3.0"
        }
        static get DATA_KEY() {
            return "bs." + this.NAME
        }
        static get EVENT_KEY() {
            return "." + this.DATA_KEY
        }
        static eventName(e) {
            return `${e}${this.EVENT_KEY}`
        }
    }
    const B = e => {
        let t = e.getAttribute("data-bs-target");
        if (!t || "#" === t) {
            let n = e.getAttribute("href");
            if (!n || !n.includes("#") && !n.startsWith("."))
                return null;
            n.includes("#") && !n.startsWith("#") && (n = "#" + n.split("#")[1]),
            t = n && "#" !== n ? n.trim() : null
        }
        return s(t)
    }
      , q = {
        find: (e, t=document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
        findOne: (e, t=document.documentElement) => Element.prototype.querySelector.call(t, e),
        children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
        parents(e, t) {
            const n = [];
            let i = e.parentNode.closest(t);
            for (; i; )
                n.push(i),
                i = i.parentNode.closest(t);
            return n
        },
        prev(e, t) {
            let n = e.previousElementSibling;
            for (; n; ) {
                if (n.matches(t))
                    return [n];
                n = n.previousElementSibling
            }
            return []
        },
        next(e, t) {
            let n = e.nextElementSibling;
            for (; n; ) {
                if (n.matches(t))
                    return [n];
                n = n.nextElementSibling
            }
            return []
        },
        focusableChildren(e) {
            const t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => e + ':not([tabindex^="-"])').join(",");
            return this.find(t, e).filter(e => !d(e) && c(e))
        },
        getSelectorFromElement(e) {
            const t = B(e);
            return t && q.findOne(t) ? t : null
        },
        getElementFromSelector(e) {
            const t = B(e);
            return t ? q.findOne(t) : null
        },
        getMultipleElementsFromSelector(e) {
            const t = B(e);
            return t ? q.find(t) : []
        }
    }
      , V = (e, t="hide") => {
        const n = "click.dismiss" + e.EVENT_KEY
          , i = e.NAME;
        D.on(document, n, `[data-bs-dismiss="${i}"]`, (function(n) {
            if (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
            d(this))
                return;
            const r = q.getElementFromSelector(this) || this.closest("." + i);
            e.getOrCreateInstance(r)[t]()
        }
        ))
    }
    ;
    class X extends W {
        static get NAME() {
            return "alert"
        }
        close() {
            if (D.trigger(this._element, "close.bs.alert").defaultPrevented)
                return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback( () => this._destroyElement(), this._element, e)
        }
        _destroyElement() {
            this._element.remove(),
            D.trigger(this._element, "closed.bs.alert"),
            this.dispose()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = X.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                        throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }
            ))
        }
    }
    V(X, "close"),
    v(X);
    const G = '[data-bs-toggle="button"]';
    class Y extends W {
        static get NAME() {
            return "button"
        }
        toggle() {
            this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Y.getOrCreateInstance(this);
                "toggle" === e && t[e]()
            }
            ))
        }
    }
    D.on(document, "click.bs.button.data-api", G, e => {
        e.preventDefault();
        const t = e.target.closest(G);
        Y.getOrCreateInstance(t).toggle()
    }
    ),
    v(Y);
    const U = {
        endCallback: null,
        leftCallback: null,
        rightCallback: null
    }
      , K = {
        endCallback: "(function|null)",
        leftCallback: "(function|null)",
        rightCallback: "(function|null)"
    };
    class Q extends R {
        constructor(e, t) {
            super(),
            this._element = e,
            e && Q.isSupported() && (this._config = this._getConfig(t),
            this._deltaX = 0,
            this._supportPointerEvents = Boolean(window.PointerEvent),
            this._initEvents())
        }
        static get Default() {
            return U
        }
        static get DefaultType() {
            return K
        }
        static get NAME() {
            return "swipe"
        }
        dispose() {
            D.off(this._element, ".bs.swipe")
        }
        _start(e) {
            this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : this._deltaX = e.touches[0].clientX
        }
        _end(e) {
            this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
            this._handleSwipe(),
            b(this._config.endCallback)
        }
        _move(e) {
            this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
        }
        _handleSwipe() {
            const e = Math.abs(this._deltaX);
            if (e <= 40)
                return;
            const t = e / this._deltaX;
            this._deltaX = 0,
            t && b(t > 0 ? this._config.rightCallback : this._config.leftCallback)
        }
        _initEvents() {
            this._supportPointerEvents ? (D.on(this._element, "pointerdown.bs.swipe", e => this._start(e)),
            D.on(this._element, "pointerup.bs.swipe", e => this._end(e)),
            this._element.classList.add("pointer-event")) : (D.on(this._element, "touchstart.bs.swipe", e => this._start(e)),
            D.on(this._element, "touchmove.bs.swipe", e => this._move(e)),
            D.on(this._element, "touchend.bs.swipe", e => this._end(e)))
        }
        _eventIsPointerPenTouch(e) {
            return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
        }
        static isSupported() {
            return "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0
        }
    }
    const Z = "next"
      , J = "prev"
      , ee = "left"
      , te = "right"
      , ne = "slid.bs.carousel"
      , ie = "carousel"
      , re = "active"
      , se = {
        ArrowLeft: te,
        ArrowRight: ee
    }
      , oe = {
        interval: 5e3,
        keyboard: !0,
        pause: "hover",
        ride: !1,
        touch: !0,
        wrap: !0
    }
      , ae = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        pause: "(string|boolean)",
        ride: "(boolean|string)",
        touch: "boolean",
        wrap: "boolean"
    };
    class le extends W {
        constructor(e, t) {
            super(e, t),
            this._interval = null,
            this._activeElement = null,
            this._isSliding = !1,
            this.touchTimeout = null,
            this._swipeHelper = null,
            this._indicatorsElement = q.findOne(".carousel-indicators", this._element),
            this._addEventListeners(),
            this._config.ride === ie && this.cycle()
        }
        static get Default() {
            return oe
        }
        static get DefaultType() {
            return ae
        }
        static get NAME() {
            return "carousel"
        }
        next() {
            this._slide(Z)
        }
        nextWhenVisible() {
            !document.hidden && c(this._element) && this.next()
        }
        prev() {
            this._slide(J)
        }
        pause() {
            this._isSliding && o(this._element),
            this._clearInterval()
        }
        cycle() {
            this._clearInterval(),
            this._updateInterval(),
            this._interval = setInterval( () => this.nextWhenVisible(), this._config.interval)
        }
        _maybeEnableCycle() {
            this._config.ride && (this._isSliding ? D.one(this._element, ne, () => this.cycle()) : this.cycle())
        }
        to(e) {
            const t = this._getItems();
            if (e > t.length - 1 || e < 0)
                return;
            if (this._isSliding)
                return void D.one(this._element, ne, () => this.to(e));
            const n = this._getItemIndex(this._getActive());
            if (n === e)
                return;
            const i = e > n ? Z : J;
            this._slide(i, t[e])
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(),
            super.dispose()
        }
        _configAfterMerge(e) {
            return e.defaultInterval = e.interval,
            e
        }
        _addEventListeners() {
            this._config.keyboard && D.on(this._element, "keydown.bs.carousel", e => this._keydown(e)),
            "hover" === this._config.pause && (D.on(this._element, "mouseenter.bs.carousel", () => this.pause()),
            D.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())),
            this._config.touch && Q.isSupported() && this._addTouchEventListeners()
        }
        _addTouchEventListeners() {
            for (const e of q.find(".carousel-item img", this._element))
                D.on(e, "dragstart.bs.carousel", e => e.preventDefault());
            const e = {
                leftCallback: () => this._slide(this._directionToOrder(ee)),
                rightCallback: () => this._slide(this._directionToOrder(te)),
                endCallback: () => {
                    "hover" === this._config.pause && (this.pause(),
                    this.touchTimeout && clearTimeout(this.touchTimeout),
                    this.touchTimeout = setTimeout( () => this._maybeEnableCycle(), 500 + this._config.interval))
                }
            };
            this._swipeHelper = new Q(this._element,e)
        }
        _keydown(e) {
            if (/input|textarea/i.test(e.target.tagName))
                return;
            const t = se[e.key];
            t && (e.preventDefault(),
            this._slide(this._directionToOrder(t)))
        }
        _getItemIndex(e) {
            return this._getItems().indexOf(e)
        }
        _setActiveIndicatorElement(e) {
            if (!this._indicatorsElement)
                return;
            const t = q.findOne(".active", this._indicatorsElement);
            t.classList.remove(re),
            t.removeAttribute("aria-current");
            const n = q.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
            n && (n.classList.add(re),
            n.setAttribute("aria-current", "true"))
        }
        _updateInterval() {
            const e = this._activeElement || this._getActive();
            if (!e)
                return;
            const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            this._config.interval = t || this._config.defaultInterval
        }
        _slide(e, t=null) {
            if (this._isSliding)
                return;
            const n = this._getActive()
              , i = e === Z
              , r = t || w(this._getItems(), n, i, this._config.wrap);
            if (r === n)
                return;
            const s = this._getItemIndex(r)
              , o = t => D.trigger(this._element, t, {
                relatedTarget: r,
                direction: this._orderToDirection(e),
                from: this._getItemIndex(n),
                to: s
            });
            if (o("slide.bs.carousel").defaultPrevented)
                return;
            if (!n || !r)
                return;
            const a = Boolean(this._interval);
            this.pause(),
            this._isSliding = !0,
            this._setActiveIndicatorElement(s),
            this._activeElement = r;
            const l = i ? "carousel-item-start" : "carousel-item-end"
              , c = i ? "carousel-item-next" : "carousel-item-prev";
            r.classList.add(c),
            f(r),
            n.classList.add(l),
            r.classList.add(l),
            this._queueCallback( () => {
                r.classList.remove(l, c),
                r.classList.add(re),
                n.classList.remove(re, c, l),
                this._isSliding = !1,
                o(ne)
            }
            , n, this._isAnimated()),
            a && this.cycle()
        }
        _isAnimated() {
            return this._element.classList.contains("slide")
        }
        _getActive() {
            return q.findOne(".active.carousel-item", this._element)
        }
        _getItems() {
            return q.find(".carousel-item", this._element)
        }
        _clearInterval() {
            this._interval && (clearInterval(this._interval),
            this._interval = null)
        }
        _directionToOrder(e) {
            return g() ? e === ee ? J : Z : e === ee ? Z : J
        }
        _orderToDirection(e) {
            return g() ? e === J ? ee : te : e === J ? te : ee
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = le.getOrCreateInstance(this, e);
                if ("number" != typeof e) {
                    if ("string" == typeof e) {
                        if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                            throw new TypeError(`No method named "${e}"`);
                        t[e]()
                    }
                } else
                    t.to(e)
            }
            ))
        }
    }
    D.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", (function(e) {
        const t = q.getElementFromSelector(this);
        if (!t || !t.classList.contains(ie))
            return;
        e.preventDefault();
        const n = le.getOrCreateInstance(t)
          , i = this.getAttribute("data-bs-slide-to");
        return i ? (n.to(i),
        void n._maybeEnableCycle()) : "next" === F.getDataAttribute(this, "slide") ? (n.next(),
        void n._maybeEnableCycle()) : (n.prev(),
        void n._maybeEnableCycle())
    }
    )),
    D.on(window, "load.bs.carousel.data-api", () => {
        const e = q.find('[data-bs-ride="carousel"]');
        for (const t of e)
            le.getOrCreateInstance(t)
    }
    ),
    v(le);
    const ce = "show"
      , de = "collapse"
      , ue = "collapsing"
      , pe = '[data-bs-toggle="collapse"]'
      , fe = {
        parent: null,
        toggle: !0
    }
      , he = {
        parent: "(null|element)",
        toggle: "boolean"
    };
    class me extends W {
        constructor(e, t) {
            super(e, t),
            this._isTransitioning = !1,
            this._triggerArray = [];
            const n = q.find(pe);
            for (const e of n) {
                const t = q.getSelectorFromElement(e)
                  , n = q.find(t).filter(e => e === this._element);
                null !== t && n.length && this._triggerArray.push(e)
            }
            this._initializeChildren(),
            this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
            this._config.toggle && this.toggle()
        }
        static get Default() {
            return fe
        }
        static get DefaultType() {
            return he
        }
        static get NAME() {
            return "collapse"
        }
        toggle() {
            this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (this._isTransitioning || this._isShown())
                return;
            let e = [];
            if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => me.getOrCreateInstance(e, {
                toggle: !1
            }))),
            e.length && e[0]._isTransitioning)
                return;
            if (D.trigger(this._element, "show.bs.collapse").defaultPrevented)
                return;
            for (const t of e)
                t.hide();
            const t = this._getDimension();
            this._element.classList.remove(de),
            this._element.classList.add(ue),
            this._element.style[t] = 0,
            this._addAriaAndCollapsedClass(this._triggerArray, !0),
            this._isTransitioning = !0;
            const n = "scroll" + (t[0].toUpperCase() + t.slice(1));
            this._queueCallback( () => {
                this._isTransitioning = !1,
                this._element.classList.remove(ue),
                this._element.classList.add(de, ce),
                this._element.style[t] = "",
                D.trigger(this._element, "shown.bs.collapse")
            }
            , this._element, !0),
            this._element.style[t] = this._element[n] + "px"
        }
        hide() {
            if (this._isTransitioning || !this._isShown())
                return;
            if (D.trigger(this._element, "hide.bs.collapse").defaultPrevented)
                return;
            const e = this._getDimension();
            this._element.style[e] = this._element.getBoundingClientRect()[e] + "px",
            f(this._element),
            this._element.classList.add(ue),
            this._element.classList.remove(de, ce);
            for (const e of this._triggerArray) {
                const t = q.getElementFromSelector(e);
                t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1)
            }
            this._isTransitioning = !0,
            this._element.style[e] = "",
            this._queueCallback( () => {
                this._isTransitioning = !1,
                this._element.classList.remove(ue),
                this._element.classList.add(de),
                D.trigger(this._element, "hidden.bs.collapse")
            }
            , this._element, !0)
        }
        _isShown(e=this._element) {
            return e.classList.contains(ce)
        }
        _configAfterMerge(e) {
            return e.toggle = Boolean(e.toggle),
            e.parent = l(e.parent),
            e
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
        }
        _initializeChildren() {
            if (!this._config.parent)
                return;
            const e = this._getFirstLevelChildren(pe);
            for (const t of e) {
                const e = q.getElementFromSelector(t);
                e && this._addAriaAndCollapsedClass([t], this._isShown(e))
            }
        }
        _getFirstLevelChildren(e) {
            const t = q.find(":scope .collapse .collapse", this._config.parent);
            return q.find(e, this._config.parent).filter(e => !t.includes(e))
        }
        _addAriaAndCollapsedClass(e, t) {
            if (e.length)
                for (const n of e)
                    n.classList.toggle("collapsed", !t),
                    n.setAttribute("aria-expanded", t)
        }
        static jQueryInterface(e) {
            const t = {};
            return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
            this.each((function() {
                const n = me.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                    if (void 0 === n[e])
                        throw new TypeError(`No method named "${e}"`);
                    n[e]()
                }
            }
            ))
        }
    }
    D.on(document, "click.bs.collapse.data-api", pe, (function(e) {
        ("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault();
        for (const e of q.getMultipleElementsFromSelector(this))
            me.getOrCreateInstance(e, {
                toggle: !1
            }).toggle()
    }
    )),
    v(me);
    const ge = "dropdown"
      , ve = "ArrowUp"
      , be = "ArrowDown"
      , ye = "click.bs.dropdown.data-api"
      , we = "keydown.bs.dropdown.data-api"
      , xe = "show"
      , Ee = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'
      , _e = ".dropdown-menu"
      , Se = g() ? "top-end" : "top-start"
      , Te = g() ? "top-start" : "top-end"
      , Ce = g() ? "bottom-end" : "bottom-start"
      , Ae = g() ? "bottom-start" : "bottom-end"
      , Me = g() ? "left-start" : "right-start"
      , ke = g() ? "right-start" : "left-start"
      , Oe = {
        autoClose: !0,
        boundary: "clippingParents",
        display: "dynamic",
        offset: [0, 2],
        popperConfig: null,
        reference: "toggle"
    }
      , Pe = {
        autoClose: "(boolean|string)",
        boundary: "(string|element)",
        display: "string",
        offset: "(array|string|function)",
        popperConfig: "(null|object|function)",
        reference: "(string|element|object)"
    };
    class Le extends W {
        constructor(e, t) {
            super(e, t),
            this._popper = null,
            this._parent = this._element.parentNode,
            this._menu = q.next(this._element, _e)[0] || q.prev(this._element, _e)[0] || q.findOne(_e, this._parent),
            this._inNavbar = this._detectNavbar()
        }
        static get Default() {
            return Oe
        }
        static get DefaultType() {
            return Pe
        }
        static get NAME() {
            return ge
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show()
        }
        show() {
            if (d(this._element) || this._isShown())
                return;
            const e = {
                relatedTarget: this._element
            };
            if (!D.trigger(this._element, "show.bs.dropdown", e).defaultPrevented) {
                if (this._createPopper(),
                "ontouchstart"in document.documentElement && !this._parent.closest(".navbar-nav"))
                    for (const e of [].concat(...document.body.children))
                        D.on(e, "mouseover", p);
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                this._menu.classList.add(xe),
                this._element.classList.add(xe),
                D.trigger(this._element, "shown.bs.dropdown", e)
            }
        }
        hide() {
            if (d(this._element) || !this._isShown())
                return;
            const e = {
                relatedTarget: this._element
            };
            this._completeHide(e)
        }
        dispose() {
            this._popper && this._popper.destroy(),
            super.dispose()
        }
        update() {
            this._inNavbar = this._detectNavbar(),
            this._popper && this._popper.update()
        }
        _completeHide(e) {
            if (!D.trigger(this._element, "hide.bs.dropdown", e).defaultPrevented) {
                if ("ontouchstart"in document.documentElement)
                    for (const e of [].concat(...document.body.children))
                        D.off(e, "mouseover", p);
                this._popper && this._popper.destroy(),
                this._menu.classList.remove(xe),
                this._element.classList.remove(xe),
                this._element.setAttribute("aria-expanded", "false"),
                F.removeDataAttribute(this._menu, "popper"),
                D.trigger(this._element, "hidden.bs.dropdown", e)
            }
        }
        _getConfig(e) {
            if ("object" == typeof (e = super._getConfig(e)).reference && !a(e.reference) && "function" != typeof e.reference.getBoundingClientRect)
                throw new TypeError(ge.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
            return e
        }
        _createPopper() {
            if (void 0 === t)
                throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
            let e = this._element;
            "parent" === this._config.reference ? e = this._parent : a(this._config.reference) ? e = l(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
            const n = this._getPopperConfig();
            this._popper = t.createPopper(e, this._menu, n)
        }
        _isShown() {
            return this._menu.classList.contains(xe)
        }
        _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend"))
                return Me;
            if (e.classList.contains("dropstart"))
                return ke;
            if (e.classList.contains("dropup-center"))
                return "top";
            if (e.classList.contains("dropdown-center"))
                return "bottom";
            const t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
            return e.classList.contains("dropup") ? t ? Te : Se : t ? Ae : Ce
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar")
        }
        _getOffset() {
            const {offset: e} = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _getPopperConfig() {
            const e = {
                placement: this._getPlacement(),
                modifiers: [{
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }]
            };
            return (this._inNavbar || "static" === this._config.display) && (F.setDataAttribute(this._menu, "popper", "static"),
            e.modifiers = [{
                name: "applyStyles",
                enabled: !1
            }]),
            {
                ...e,
                ...b(this._config.popperConfig, [e])
            }
        }
        _selectMenuItem({key: e, target: t}) {
            const n = q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => c(e));
            n.length && w(n, t, e === be, !n.includes(t)).focus()
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Le.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e])
                        throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }
            ))
        }
        static clearMenus(e) {
            if (2 === e.button || "keyup" === e.type && "Tab" !== e.key)
                return;
            const t = q.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show');
            for (const n of t) {
                const t = Le.getInstance(n);
                if (!t || !1 === t._config.autoClose)
                    continue;
                const i = e.composedPath()
                  , r = i.includes(t._menu);
                if (i.includes(t._element) || "inside" === t._config.autoClose && !r || "outside" === t._config.autoClose && r)
                    continue;
                if (t._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName)))
                    continue;
                const s = {
                    relatedTarget: t._element
                };
                "click" === e.type && (s.clickEvent = e),
                t._completeHide(s)
            }
        }
        static dataApiKeydownHandler(e) {
            const t = /input|textarea/i.test(e.target.tagName)
              , n = "Escape" === e.key
              , i = [ve, be].includes(e.key);
            if (!i && !n)
                return;
            if (t && !n)
                return;
            e.preventDefault();
            const r = this.matches(Ee) ? this : q.prev(this, Ee)[0] || q.next(this, Ee)[0] || q.findOne(Ee, e.delegateTarget.parentNode)
              , s = Le.getOrCreateInstance(r);
            if (i)
                return e.stopPropagation(),
                s.show(),
                void s._selectMenuItem(e);
            s._isShown() && (e.stopPropagation(),
            s.hide(),
            r.focus())
        }
    }
    D.on(document, we, Ee, Le.dataApiKeydownHandler),
    D.on(document, we, _e, Le.dataApiKeydownHandler),
    D.on(document, ye, Le.clearMenus),
    D.on(document, "keyup.bs.dropdown.data-api", Le.clearMenus),
    D.on(document, ye, Ee, (function(e) {
        e.preventDefault(),
        Le.getOrCreateInstance(this).toggle()
    }
    )),
    v(Le);
    const Ie = "mousedown.bs.backdrop"
      , $e = {
        className: "modal-backdrop",
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: "body"
    }
      , ze = {
        className: "string",
        clickCallback: "(function|null)",
        isAnimated: "boolean",
        isVisible: "boolean",
        rootElement: "(element|string)"
    };
    class De extends R {
        constructor(e) {
            super(),
            this._config = this._getConfig(e),
            this._isAppended = !1,
            this._element = null
        }
        static get Default() {
            return $e
        }
        static get DefaultType() {
            return ze
        }
        static get NAME() {
            return "backdrop"
        }
        show(e) {
            if (!this._config.isVisible)
                return void b(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && f(t),
            t.classList.add("show"),
            this._emulateAnimation( () => {
                b(e)
            }
            )
        }
        hide(e) {
            this._config.isVisible ? (this._getElement().classList.remove("show"),
            this._emulateAnimation( () => {
                this.dispose(),
                b(e)
            }
            )) : b(e)
        }
        dispose() {
            this._isAppended && (D.off(this._element, Ie),
            this._element.remove(),
            this._isAppended = !1)
        }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                e.className = this._config.className,
                this._config.isAnimated && e.classList.add("fade"),
                this._element = e
            }
            return this._element
        }
        _configAfterMerge(e) {
            return e.rootElement = l(e.rootElement),
            e
        }
        _append() {
            if (this._isAppended)
                return;
            const e = this._getElement();
            this._config.rootElement.append(e),
            D.on(e, Ie, () => {
                b(this._config.clickCallback)
            }
            ),
            this._isAppended = !0
        }
        _emulateAnimation(e) {
            y(e, this._getElement(), this._config.isAnimated)
        }
    }
    const je = ".bs.focustrap"
      , Ne = "backward"
      , He = {
        autofocus: !0,
        trapElement: null
    }
      , Fe = {
        autofocus: "boolean",
        trapElement: "element"
    };
    class Re extends R {
        constructor(e) {
            super(),
            this._config = this._getConfig(e),
            this._isActive = !1,
            this._lastTabNavDirection = null
        }
        static get Default() {
            return He
        }
        static get DefaultType() {
            return Fe
        }
        static get NAME() {
            return "focustrap"
        }
        activate() {
            this._isActive || (this._config.autofocus && this._config.trapElement.focus(),
            D.off(document, je),
            D.on(document, "focusin.bs.focustrap", e => this._handleFocusin(e)),
            D.on(document, "keydown.tab.bs.focustrap", e => this._handleKeydown(e)),
            this._isActive = !0)
        }
        deactivate() {
            this._isActive && (this._isActive = !1,
            D.off(document, je))
        }
        _handleFocusin(e) {
            const {trapElement: t} = this._config;
            if (e.target === document || e.target === t || t.contains(e.target))
                return;
            const n = q.focusableChildren(t);
            0 === n.length ? t.focus() : this._lastTabNavDirection === Ne ? n[n.length - 1].focus() : n[0].focus()
        }
        _handleKeydown(e) {
            "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? Ne : "forward")
        }
    }
    const We = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
      , Be = ".sticky-top"
      , qe = "padding-right"
      , Ve = "margin-right";
    class Xe {
        constructor() {
            this._element = document.body
        }
        getWidth() {
            const e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e)
        }
        hide() {
            const e = this.getWidth();
            this._disableOverFlow(),
            this._setElementAttributes(this._element, qe, t => t + e),
            this._setElementAttributes(We, qe, t => t + e),
            this._setElementAttributes(Be, Ve, t => t - e)
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"),
            this._resetElementAttributes(this._element, qe),
            this._resetElementAttributes(We, qe),
            this._resetElementAttributes(Be, Ve)
        }
        isOverflowing() {
            return this.getWidth() > 0
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"),
            this._element.style.overflow = "hidden"
        }
        _setElementAttributes(e, t, n) {
            const i = this.getWidth();
            this._applyManipulationCallback(e, e => {
                if (e !== this._element && window.innerWidth > e.clientWidth + i)
                    return;
                this._saveInitialAttribute(e, t);
                const r = window.getComputedStyle(e).getPropertyValue(t);
                e.style.setProperty(t, n(Number.parseFloat(r)) + "px")
            }
            )
        }
        _saveInitialAttribute(e, t) {
            const n = e.style.getPropertyValue(t);
            n && F.setDataAttribute(e, t, n)
        }
        _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, e => {
                const n = F.getDataAttribute(e, t);
                null !== n ? (F.removeDataAttribute(e, t),
                e.style.setProperty(t, n)) : e.style.removeProperty(t)
            }
            )
        }
        _applyManipulationCallback(e, t) {
            if (a(e))
                t(e);
            else
                for (const n of q.find(e, this._element))
                    t(n)
        }
    }
    const Ge = ".bs.modal"
      , Ye = "hidden.bs.modal"
      , Ue = "show.bs.modal"
      , Ke = "modal-open"
      , Qe = "modal-static"
      , Ze = {
        backdrop: !0,
        focus: !0,
        keyboard: !0
    }
      , Je = {
        backdrop: "(boolean|string)",
        focus: "boolean",
        keyboard: "boolean"
    };
    class et extends W {
        constructor(e, t) {
            super(e, t),
            this._dialog = q.findOne(".modal-dialog", this._element),
            this._backdrop = this._initializeBackDrop(),
            this._focustrap = this._initializeFocusTrap(),
            this._isShown = !1,
            this._isTransitioning = !1,
            this._scrollBar = new Xe,
            this._addEventListeners()
        }
        static get Default() {
            return Ze
        }
        static get DefaultType() {
            return Je
        }
        static get NAME() {
            return "modal"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || this._isTransitioning || D.trigger(this._element, Ue, {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0,
            this._isTransitioning = !0,
            this._scrollBar.hide(),
            document.body.classList.add(Ke),
            this._adjustDialog(),
            this._backdrop.show( () => this._showElement(e)))
        }
        hide() {
            this._isShown && !this._isTransitioning && (D.trigger(this._element, "hide.bs.modal").defaultPrevented || (this._isShown = !1,
            this._isTransitioning = !0,
            this._focustrap.deactivate(),
            this._element.classList.remove("show"),
            this._queueCallback( () => this._hideModal(), this._element, this._isAnimated())))
        }
        dispose() {
            D.off(window, Ge),
            D.off(this._dialog, Ge),
            this._backdrop.dispose(),
            this._focustrap.deactivate(),
            super.dispose()
        }
        handleUpdate() {
            this._adjustDialog()
        }
        _initializeBackDrop() {
            return new De({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated()
            })
        }
        _initializeFocusTrap() {
            return new Re({
                trapElement: this._element
            })
        }
        _showElement(e) {
            document.body.contains(this._element) || document.body.append(this._element),
            this._element.style.display = "block",
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            this._element.scrollTop = 0;
            const t = q.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0),
            f(this._element),
            this._element.classList.add("show"),
            this._queueCallback( () => {
                this._config.focus && this._focustrap.activate(),
                this._isTransitioning = !1,
                D.trigger(this._element, "shown.bs.modal", {
                    relatedTarget: e
                })
            }
            , this._dialog, this._isAnimated())
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.modal", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition())
            }
            ),
            D.on(window, "resize.bs.modal", () => {
                this._isShown && !this._isTransitioning && this._adjustDialog()
            }
            ),
            D.on(this._element, "mousedown.dismiss.bs.modal", e => {
                D.one(this._element, "click.dismiss.bs.modal", t => {
                    this._element === e.target && this._element === t.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition())
                }
                )
            }
            )
        }
        _hideModal() {
            this._element.style.display = "none",
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            this._isTransitioning = !1,
            this._backdrop.hide( () => {
                document.body.classList.remove(Ke),
                this._resetAdjustments(),
                this._scrollBar.reset(),
                D.trigger(this._element, Ye)
            }
            )
        }
        _isAnimated() {
            return this._element.classList.contains("fade")
        }
        _triggerBackdropTransition() {
            if (D.trigger(this._element, "hidePrevented.bs.modal").defaultPrevented)
                return;
            const e = this._element.scrollHeight > document.documentElement.clientHeight
              , t = this._element.style.overflowY;
            "hidden" === t || this._element.classList.contains(Qe) || (e || (this._element.style.overflowY = "hidden"),
            this._element.classList.add(Qe),
            this._queueCallback( () => {
                this._element.classList.remove(Qe),
                this._queueCallback( () => {
                    this._element.style.overflowY = t
                }
                , this._dialog)
            }
            , this._dialog),
            this._element.focus())
        }
        _adjustDialog() {
            const e = this._element.scrollHeight > document.documentElement.clientHeight
              , t = this._scrollBar.getWidth()
              , n = t > 0;
            if (n && !e) {
                const e = g() ? "paddingLeft" : "paddingRight";
                this._element.style[e] = t + "px"
            }
            if (!n && e) {
                const e = g() ? "paddingRight" : "paddingLeft";
                this._element.style[e] = t + "px"
            }
        }
        _resetAdjustments() {
            this._element.style.paddingLeft = "",
            this._element.style.paddingRight = ""
        }
        static jQueryInterface(e, t) {
            return this.each((function() {
                const n = et.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === n[e])
                        throw new TypeError(`No method named "${e}"`);
                    n[e](t)
                }
            }
            ))
        }
    }
    D.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', (function(e) {
        const t = q.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        D.one(t, Ue, e => {
            e.defaultPrevented || D.one(t, Ye, () => {
                c(this) && this.focus()
            }
            )
        }
        );
        const n = q.findOne(".modal.show");
        n && et.getInstance(n).hide(),
        et.getOrCreateInstance(t).toggle(this)
    }
    )),
    V(et),
    v(et);
    const tt = "showing"
      , nt = ".offcanvas.show"
      , it = "hidePrevented.bs.offcanvas"
      , rt = "hidden.bs.offcanvas"
      , st = {
        backdrop: !0,
        keyboard: !0,
        scroll: !1
    }
      , ot = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        scroll: "boolean"
    };
    class at extends W {
        constructor(e, t) {
            super(e, t),
            this._isShown = !1,
            this._backdrop = this._initializeBackDrop(),
            this._focustrap = this._initializeFocusTrap(),
            this._addEventListeners()
        }
        static get Default() {
            return st
        }
        static get DefaultType() {
            return ot
        }
        static get NAME() {
            return "offcanvas"
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e)
        }
        show(e) {
            this._isShown || D.trigger(this._element, "show.bs.offcanvas", {
                relatedTarget: e
            }).defaultPrevented || (this._isShown = !0,
            this._backdrop.show(),
            this._config.scroll || (new Xe).hide(),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            this._element.classList.add(tt),
            this._queueCallback( () => {
                this._config.scroll && !this._config.backdrop || this._focustrap.activate(),
                this._element.classList.add("show"),
                this._element.classList.remove(tt),
                D.trigger(this._element, "shown.bs.offcanvas", {
                    relatedTarget: e
                })
            }
            , this._element, !0))
        }
        hide() {
            this._isShown && (D.trigger(this._element, "hide.bs.offcanvas").defaultPrevented || (this._focustrap.deactivate(),
            this._element.blur(),
            this._isShown = !1,
            this._element.classList.add("hiding"),
            this._backdrop.hide(),
            this._queueCallback( () => {
                this._element.classList.remove("show", "hiding"),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                this._config.scroll || (new Xe).reset(),
                D.trigger(this._element, rt)
            }
            , this._element, !0)))
        }
        dispose() {
            this._backdrop.dispose(),
            this._focustrap.deactivate(),
            super.dispose()
        }
        _initializeBackDrop() {
            const e = Boolean(this._config.backdrop);
            return new De({
                className: "offcanvas-backdrop",
                isVisible: e,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: e ? () => {
                    "static" !== this._config.backdrop ? this.hide() : D.trigger(this._element, it)
                }
                : null
            })
        }
        _initializeFocusTrap() {
            return new Re({
                trapElement: this._element
            })
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.offcanvas", e => {
                "Escape" === e.key && (this._config.keyboard ? this.hide() : D.trigger(this._element, it))
            }
            )
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = at.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                        throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }
            ))
        }
    }
    D.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', (function(e) {
        const t = q.getElementFromSelector(this);
        if (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        d(this))
            return;
        D.one(t, rt, () => {
            c(this) && this.focus()
        }
        );
        const n = q.findOne(nt);
        n && n !== t && at.getInstance(n).hide(),
        at.getOrCreateInstance(t).toggle(this)
    }
    )),
    D.on(window, "load.bs.offcanvas.data-api", () => {
        for (const e of q.find(nt))
            at.getOrCreateInstance(e).show()
    }
    ),
    D.on(window, "resize.bs.offcanvas", () => {
        for (const e of q.find("[aria-modal][class*=show][class*=offcanvas-]"))
            "fixed" !== getComputedStyle(e).position && at.getOrCreateInstance(e).hide()
    }
    ),
    V(at),
    v(at);
    const lt = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    }
      , ct = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"])
      , dt = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i
      , ut = (e, t) => {
        const n = e.nodeName.toLowerCase();
        return t.includes(n) ? !ct.has(n) || Boolean(dt.test(e.nodeValue)) : t.filter(e => e instanceof RegExp).some(e => e.test(n))
    }
      , pt = {
        allowList: lt,
        content: {},
        extraClass: "",
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: "<div></div>"
    }
      , ft = {
        allowList: "object",
        content: "object",
        extraClass: "(string|function)",
        html: "boolean",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        template: "string"
    }
      , ht = {
        entry: "(string|element|function|null)",
        selector: "(string|element)"
    };
    class mt extends R {
        constructor(e) {
            super(),
            this._config = this._getConfig(e)
        }
        static get Default() {
            return pt
        }
        static get DefaultType() {
            return ft
        }
        static get NAME() {
            return "TemplateFactory"
        }
        getContent() {
            return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
        }
        hasContent() {
            return this.getContent().length > 0
        }
        changeContent(e) {
            return this._checkContent(e),
            this._config.content = {
                ...this._config.content,
                ...e
            },
            this
        }
        toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (const [t,n] of Object.entries(this._config.content))
                this._setContent(e, n, t);
            const t = e.children[0]
              , n = this._resolvePossibleFunction(this._config.extraClass);
            return n && t.classList.add(...n.split(" ")),
            t
        }
        _typeCheckConfig(e) {
            super._typeCheckConfig(e),
            this._checkContent(e.content)
        }
        _checkContent(e) {
            for (const [t,n] of Object.entries(e))
                super._typeCheckConfig({
                    selector: t,
                    entry: n
                }, ht)
        }
        _setContent(e, t, n) {
            const i = q.findOne(n, e);
            i && ((t = this._resolvePossibleFunction(t)) ? a(t) ? this._putElementInTemplate(l(t), i) : this._config.html ? i.innerHTML = this._maybeSanitize(t) : i.textContent = t : i.remove())
        }
        _maybeSanitize(e) {
            return this._config.sanitize ? function(e, t, n) {
                if (!e.length)
                    return e;
                if (n && "function" == typeof n)
                    return n(e);
                const i = (new window.DOMParser).parseFromString(e, "text/html")
                  , r = [].concat(...i.body.querySelectorAll("*"));
                for (const e of r) {
                    const n = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(n)) {
                        e.remove();
                        continue
                    }
                    const i = [].concat(...e.attributes)
                      , r = [].concat(t["*"] || [], t[n] || []);
                    for (const t of i)
                        ut(t, r) || e.removeAttribute(t.nodeName)
                }
                return i.body.innerHTML
            }(e, this._config.allowList, this._config.sanitizeFn) : e
        }
        _resolvePossibleFunction(e) {
            return b(e, [this])
        }
        _putElementInTemplate(e, t) {
            if (this._config.html)
                return t.innerHTML = "",
                void t.append(e);
            t.textContent = e.textContent
        }
    }
    const gt = new Set(["sanitize", "allowList", "sanitizeFn"])
      , vt = "fade"
      , bt = "show"
      , yt = "hide.bs.modal"
      , wt = "hover"
      , xt = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: g() ? "left" : "right",
        BOTTOM: "bottom",
        LEFT: g() ? "right" : "left"
    }
      , Et = {
        allowList: lt,
        animation: !0,
        boundary: "clippingParents",
        container: !1,
        customClass: "",
        delay: 0,
        fallbackPlacements: ["top", "right", "bottom", "left"],
        html: !1,
        offset: [0, 6],
        placement: "top",
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        title: "",
        trigger: "hover focus"
    }
      , _t = {
        allowList: "object",
        animation: "boolean",
        boundary: "(string|element)",
        container: "(string|element|boolean)",
        customClass: "(string|function)",
        delay: "(number|object)",
        fallbackPlacements: "array",
        html: "boolean",
        offset: "(array|string|function)",
        placement: "(string|function)",
        popperConfig: "(null|object|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        selector: "(string|boolean)",
        template: "string",
        title: "(string|element|function)",
        trigger: "string"
    };
    class St extends W {
        constructor(e, n) {
            if (void 0 === t)
                throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
            super(e, n),
            this._isEnabled = !0,
            this._timeout = 0,
            this._isHovered = null,
            this._activeTrigger = {},
            this._popper = null,
            this._templateFactory = null,
            this._newContent = null,
            this.tip = null,
            this._setListeners(),
            this._config.selector || this._fixTitle()
        }
        static get Default() {
            return Et
        }
        static get DefaultType() {
            return _t
        }
        static get NAME() {
            return "tooltip"
        }
        enable() {
            this._isEnabled = !0
        }
        disable() {
            this._isEnabled = !1
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled
        }
        toggle() {
            this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click,
            this._isShown() ? this._leave() : this._enter())
        }
        dispose() {
            clearTimeout(this._timeout),
            D.off(this._element.closest(".modal"), yt, this._hideModalHandler),
            this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
            this._disposePopper(),
            super.dispose()
        }
        show() {
            if ("none" === this._element.style.display)
                throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled)
                return;
            const e = D.trigger(this._element, this.constructor.eventName("show"))
              , t = (u(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
            if (e.defaultPrevented || !t)
                return;
            this._disposePopper();
            const n = this._getTipElement();
            this._element.setAttribute("aria-describedby", n.getAttribute("id"));
            const {container: i} = this._config;
            if (this._element.ownerDocument.documentElement.contains(this.tip) || (i.append(n),
            D.trigger(this._element, this.constructor.eventName("inserted"))),
            this._popper = this._createPopper(n),
            n.classList.add(bt),
            "ontouchstart"in document.documentElement)
                for (const e of [].concat(...document.body.children))
                    D.on(e, "mouseover", p);
            this._queueCallback( () => {
                D.trigger(this._element, this.constructor.eventName("shown")),
                !1 === this._isHovered && this._leave(),
                this._isHovered = !1
            }
            , this.tip, this._isAnimated())
        }
        hide() {
            if (this._isShown() && !D.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                if (this._getTipElement().classList.remove(bt),
                "ontouchstart"in document.documentElement)
                    for (const e of [].concat(...document.body.children))
                        D.off(e, "mouseover", p);
                this._activeTrigger.click = !1,
                this._activeTrigger.focus = !1,
                this._activeTrigger.hover = !1,
                this._isHovered = null,
                this._queueCallback( () => {
                    this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(),
                    this._element.removeAttribute("aria-describedby"),
                    D.trigger(this._element, this.constructor.eventName("hidden")))
                }
                , this.tip, this._isAnimated())
            }
        }
        update() {
            this._popper && this._popper.update()
        }
        _isWithContent() {
            return Boolean(this._getTitle())
        }
        _getTipElement() {
            return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
            this.tip
        }
        _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t)
                return null;
            t.classList.remove(vt, bt),
            t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const n = (e => {
                do {
                    e += Math.floor(1e6 * Math.random())
                } while (document.getElementById(e));
                return e
            }
            )(this.constructor.NAME).toString();
            return t.setAttribute("id", n),
            this._isAnimated() && t.classList.add(vt),
            t
        }
        setContent(e) {
            this._newContent = e,
            this._isShown() && (this._disposePopper(),
            this.show())
        }
        _getTemplateFactory(e) {
            return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new mt({
                ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(this._config.customClass)
            }),
            this._templateFactory
        }
        _getContentForTemplate() {
            return {
                ".tooltip-inner": this._getTitle()
            }
        }
        _getTitle() {
            return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
        }
        _initializeOnDelegatedTarget(e) {
            return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
        }
        _isAnimated() {
            return this._config.animation || this.tip && this.tip.classList.contains(vt)
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(bt)
        }
        _createPopper(e) {
            const n = b(this._config.placement, [this, e, this._element])
              , i = xt[n.toUpperCase()];
            return t.createPopper(this._element, e, this._getPopperConfig(i))
        }
        _getOffset() {
            const {offset: e} = this._config;
            return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
        }
        _resolvePossibleFunction(e) {
            return b(e, [this._element])
        }
        _getPopperConfig(e) {
            const t = {
                placement: e,
                modifiers: [{
                    name: "flip",
                    options: {
                        fallbackPlacements: this._config.fallbackPlacements
                    }
                }, {
                    name: "offset",
                    options: {
                        offset: this._getOffset()
                    }
                }, {
                    name: "preventOverflow",
                    options: {
                        boundary: this._config.boundary
                    }
                }, {
                    name: "arrow",
                    options: {
                        element: `.${this.constructor.NAME}-arrow`
                    }
                }, {
                    name: "preSetPlacement",
                    enabled: !0,
                    phase: "beforeMain",
                    fn: e => {
                        this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                    }
                }]
            };
            return {
                ...t,
                ...b(this._config.popperConfig, [t])
            }
        }
        _setListeners() {
            const e = this._config.trigger.split(" ");
            for (const t of e)
                if ("click" === t)
                    D.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
                        this._initializeOnDelegatedTarget(e).toggle()
                    }
                    );
                else if ("manual" !== t) {
                    const e = t === wt ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin")
                      , n = t === wt ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                    D.on(this._element, e, this._config.selector, e => {
                        const t = this._initializeOnDelegatedTarget(e);
                        t._activeTrigger["focusin" === e.type ? "focus" : wt] = !0,
                        t._enter()
                    }
                    ),
                    D.on(this._element, n, this._config.selector, e => {
                        const t = this._initializeOnDelegatedTarget(e);
                        t._activeTrigger["focusout" === e.type ? "focus" : wt] = t._element.contains(e.relatedTarget),
                        t._leave()
                    }
                    )
                }
            this._hideModalHandler = () => {
                this._element && this.hide()
            }
            ,
            D.on(this._element.closest(".modal"), yt, this._hideModalHandler)
        }
        _fixTitle() {
            const e = this._element.getAttribute("title");
            e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e),
            this._element.setAttribute("data-bs-original-title", e),
            this._element.removeAttribute("title"))
        }
        _enter() {
            this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0,
            this._setTimeout( () => {
                this._isHovered && this.show()
            }
            , this._config.delay.show))
        }
        _leave() {
            this._isWithActiveTrigger() || (this._isHovered = !1,
            this._setTimeout( () => {
                this._isHovered || this.hide()
            }
            , this._config.delay.hide))
        }
        _setTimeout(e, t) {
            clearTimeout(this._timeout),
            this._timeout = setTimeout(e, t)
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0)
        }
        _getConfig(e) {
            const t = F.getDataAttributes(this._element);
            for (const e of Object.keys(t))
                gt.has(e) && delete t[e];
            return e = {
                ...t,
                ..."object" == typeof e && e ? e : {}
            },
            e = this._mergeConfigObj(e),
            e = this._configAfterMerge(e),
            this._typeCheckConfig(e),
            e
        }
        _configAfterMerge(e) {
            return e.container = !1 === e.container ? document.body : l(e.container),
            "number" == typeof e.delay && (e.delay = {
                show: e.delay,
                hide: e.delay
            }),
            "number" == typeof e.title && (e.title = e.title.toString()),
            "number" == typeof e.content && (e.content = e.content.toString()),
            e
        }
        _getDelegateConfig() {
            const e = {};
            for (const [t,n] of Object.entries(this._config))
                this.constructor.Default[t] !== n && (e[t] = n);
            return e.selector = !1,
            e.trigger = "manual",
            e
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(),
            this._popper = null),
            this.tip && (this.tip.remove(),
            this.tip = null)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = St.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e])
                        throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }
            ))
        }
    }
    v(St);
    const Tt = {
        ...St.Default,
        content: "",
        offset: [0, 8],
        placement: "right",
        template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        trigger: "click"
    }
      , Ct = {
        ...St.DefaultType,
        content: "(null|string|element|function)"
    };
    class At extends St {
        static get Default() {
            return Tt
        }
        static get DefaultType() {
            return Ct
        }
        static get NAME() {
            return "popover"
        }
        _isWithContent() {
            return this._getTitle() || this._getContent()
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent()
            }
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = At.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e])
                        throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }
            ))
        }
    }
    v(At);
    const Mt = "click.bs.scrollspy"
      , kt = "active"
      , Ot = {
        offset: null,
        rootMargin: "0px 0px -25%",
        smoothScroll: !1,
        target: null,
        threshold: [.1, .5, 1]
    }
      , Pt = {
        offset: "(number|null)",
        rootMargin: "string",
        smoothScroll: "boolean",
        target: "element",
        threshold: "array"
    };
    class Lt extends W {
        constructor(e, t) {
            super(e, t),
            this._targetLinks = new Map,
            this._observableSections = new Map,
            this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element,
            this._activeTarget = null,
            this._observer = null,
            this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0
            },
            this.refresh()
        }
        static get Default() {
            return Ot
        }
        static get DefaultType() {
            return Pt
        }
        static get NAME() {
            return "scrollspy"
        }
        refresh() {
            this._initializeTargetsAndObservables(),
            this._maybeEnableSmoothScroll(),
            this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
            for (const e of this._observableSections.values())
                this._observer.observe(e)
        }
        dispose() {
            this._observer.disconnect(),
            super.dispose()
        }
        _configAfterMerge(e) {
            return e.target = l(e.target) || document.body,
            e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin,
            "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))),
            e
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll && (D.off(this._config.target, Mt),
            D.on(this._config.target, Mt, "[href]", e => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                    e.preventDefault();
                    const n = this._rootElement || window
                      , i = t.offsetTop - this._element.offsetTop;
                    if (n.scrollTo)
                        return void n.scrollTo({
                            top: i,
                            behavior: "smooth"
                        });
                    n.scrollTop = i
                }
            }
            ))
        }
        _getNewObserver() {
            const e = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin
            };
            return new IntersectionObserver(e => this._observerCallback(e),e)
        }
        _observerCallback(e) {
            const t = e => this._targetLinks.get("#" + e.target.id)
              , n = e => {
                this._previousScrollData.visibleEntryTop = e.target.offsetTop,
                this._process(t(e))
            }
              , i = (this._rootElement || document.documentElement).scrollTop
              , r = i >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = i;
            for (const s of e) {
                if (!s.isIntersecting) {
                    this._activeTarget = null,
                    this._clearActiveClass(t(s));
                    continue
                }
                const e = s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                if (r && e) {
                    if (n(s),
                    !i)
                        return
                } else
                    r || e || n(s)
            }
        }
        _initializeTargetsAndObservables() {
            this._targetLinks = new Map,
            this._observableSections = new Map;
            const e = q.find("[href]", this._config.target);
            for (const t of e) {
                if (!t.hash || d(t))
                    continue;
                const e = q.findOne(decodeURI(t.hash), this._element);
                c(e) && (this._targetLinks.set(decodeURI(t.hash), t),
                this._observableSections.set(t.hash, e))
            }
        }
        _process(e) {
            this._activeTarget !== e && (this._clearActiveClass(this._config.target),
            this._activeTarget = e,
            e.classList.add(kt),
            this._activateParents(e),
            D.trigger(this._element, "activate.bs.scrollspy", {
                relatedTarget: e
            }))
        }
        _activateParents(e) {
            if (e.classList.contains("dropdown-item"))
                q.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(kt);
            else
                for (const t of q.parents(e, ".nav, .list-group"))
                    for (const e of q.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item"))
                        e.classList.add(kt)
        }
        _clearActiveClass(e) {
            e.classList.remove(kt);
            const t = q.find("[href].active", e);
            for (const e of t)
                e.classList.remove(kt)
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Lt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                        throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }
            ))
        }
    }
    D.on(window, "load.bs.scrollspy.data-api", () => {
        for (const e of q.find('[data-bs-spy="scroll"]'))
            Lt.getOrCreateInstance(e)
    }
    ),
    v(Lt);
    const It = "ArrowLeft"
      , $t = "ArrowRight"
      , zt = "ArrowUp"
      , Dt = "ArrowDown"
      , jt = "active"
      , Nt = "show"
      , Ht = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
      , Ft = '.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ' + Ht;
    class Rt extends W {
        constructor(e) {
            super(e),
            this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'),
            this._parent && (this._setInitialAttributes(this._parent, this._getChildren()),
            D.on(this._element, "keydown.bs.tab", e => this._keydown(e)))
        }
        static get NAME() {
            return "tab"
        }
        show() {
            const e = this._element;
            if (this._elemIsActive(e))
                return;
            const t = this._getActiveElem()
              , n = t ? D.trigger(t, "hide.bs.tab", {
                relatedTarget: e
            }) : null;
            D.trigger(e, "show.bs.tab", {
                relatedTarget: t
            }).defaultPrevented || n && n.defaultPrevented || (this._deactivate(t, e),
            this._activate(e, t))
        }
        _activate(e, t) {
            e && (e.classList.add(jt),
            this._activate(q.getElementFromSelector(e)),
            this._queueCallback( () => {
                "tab" === e.getAttribute("role") ? (e.removeAttribute("tabindex"),
                e.setAttribute("aria-selected", !0),
                this._toggleDropDown(e, !0),
                D.trigger(e, "shown.bs.tab", {
                    relatedTarget: t
                })) : e.classList.add(Nt)
            }
            , e, e.classList.contains("fade")))
        }
        _deactivate(e, t) {
            e && (e.classList.remove(jt),
            e.blur(),
            this._deactivate(q.getElementFromSelector(e)),
            this._queueCallback( () => {
                "tab" === e.getAttribute("role") ? (e.setAttribute("aria-selected", !1),
                e.setAttribute("tabindex", "-1"),
                this._toggleDropDown(e, !1),
                D.trigger(e, "hidden.bs.tab", {
                    relatedTarget: t
                })) : e.classList.remove(Nt)
            }
            , e, e.classList.contains("fade")))
        }
        _keydown(e) {
            if (![It, $t, zt, Dt].includes(e.key))
                return;
            e.stopPropagation(),
            e.preventDefault();
            const t = [$t, Dt].includes(e.key)
              , n = w(this._getChildren().filter(e => !d(e)), e.target, t, !0);
            n && (n.focus({
                preventScroll: !0
            }),
            Rt.getOrCreateInstance(n).show())
        }
        _getChildren() {
            return q.find(Ft, this._parent)
        }
        _getActiveElem() {
            return this._getChildren().find(e => this._elemIsActive(e)) || null
        }
        _setInitialAttributes(e, t) {
            this._setAttributeIfNotExists(e, "role", "tablist");
            for (const e of t)
                this._setInitialAttributesOnChild(e)
        }
        _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            const t = this._elemIsActive(e)
              , n = this._getOuterElement(e);
            e.setAttribute("aria-selected", t),
            n !== e && this._setAttributeIfNotExists(n, "role", "presentation"),
            t || e.setAttribute("tabindex", "-1"),
            this._setAttributeIfNotExists(e, "role", "tab"),
            this._setInitialAttributesOnTargetPanel(e)
        }
        _setInitialAttributesOnTargetPanel(e) {
            const t = q.getElementFromSelector(e);
            t && (this._setAttributeIfNotExists(t, "role", "tabpanel"),
            e.id && this._setAttributeIfNotExists(t, "aria-labelledby", "" + e.id))
        }
        _toggleDropDown(e, t) {
            const n = this._getOuterElement(e);
            if (!n.classList.contains("dropdown"))
                return;
            const i = (e, i) => {
                const r = q.findOne(e, n);
                r && r.classList.toggle(i, t)
            }
            ;
            i(".dropdown-toggle", jt),
            i(".dropdown-menu", Nt),
            n.setAttribute("aria-expanded", t)
        }
        _setAttributeIfNotExists(e, t, n) {
            e.hasAttribute(t) || e.setAttribute(t, n)
        }
        _elemIsActive(e) {
            return e.classList.contains(jt)
        }
        _getInnerElement(e) {
            return e.matches(Ft) ? e : q.findOne(Ft, e)
        }
        _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Rt.getOrCreateInstance(this);
                if ("string" == typeof e) {
                    if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                        throw new TypeError(`No method named "${e}"`);
                    t[e]()
                }
            }
            ))
        }
    }
    D.on(document, "click.bs.tab", Ht, (function(e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
        d(this) || Rt.getOrCreateInstance(this).show()
    }
    )),
    D.on(window, "load.bs.tab", () => {
        for (const e of q.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'))
            Rt.getOrCreateInstance(e)
    }
    ),
    v(Rt);
    const Wt = "show"
      , Bt = "showing"
      , qt = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    }
      , Vt = {
        animation: !0,
        autohide: !0,
        delay: 5e3
    };
    class Xt extends W {
        constructor(e, t) {
            super(e, t),
            this._timeout = null,
            this._hasMouseInteraction = !1,
            this._hasKeyboardInteraction = !1,
            this._setListeners()
        }
        static get Default() {
            return Vt
        }
        static get DefaultType() {
            return qt
        }
        static get NAME() {
            return "toast"
        }
        show() {
            D.trigger(this._element, "show.bs.toast").defaultPrevented || (this._clearTimeout(),
            this._config.animation && this._element.classList.add("fade"),
            this._element.classList.remove("hide"),
            f(this._element),
            this._element.classList.add(Wt, Bt),
            this._queueCallback( () => {
                this._element.classList.remove(Bt),
                D.trigger(this._element, "shown.bs.toast"),
                this._maybeScheduleHide()
            }
            , this._element, this._config.animation))
        }
        hide() {
            this.isShown() && (D.trigger(this._element, "hide.bs.toast").defaultPrevented || (this._element.classList.add(Bt),
            this._queueCallback( () => {
                this._element.classList.add("hide"),
                this._element.classList.remove(Bt, Wt),
                D.trigger(this._element, "hidden.bs.toast")
            }
            , this._element, this._config.animation)))
        }
        dispose() {
            this._clearTimeout(),
            this.isShown() && this._element.classList.remove(Wt),
            super.dispose()
        }
        isShown() {
            return this._element.classList.contains(Wt)
        }
        _maybeScheduleHide() {
            this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout( () => {
                this.hide()
            }
            , this._config.delay)))
        }
        _onInteraction(e, t) {
            switch (e.type) {
            case "mouseover":
            case "mouseout":
                this._hasMouseInteraction = t;
                break;
            case "focusin":
            case "focusout":
                this._hasKeyboardInteraction = t
            }
            if (t)
                return void this._clearTimeout();
            const n = e.relatedTarget;
            this._element === n || this._element.contains(n) || this._maybeScheduleHide()
        }
        _setListeners() {
            D.on(this._element, "mouseover.bs.toast", e => this._onInteraction(e, !0)),
            D.on(this._element, "mouseout.bs.toast", e => this._onInteraction(e, !1)),
            D.on(this._element, "focusin.bs.toast", e => this._onInteraction(e, !0)),
            D.on(this._element, "focusout.bs.toast", e => this._onInteraction(e, !1))
        }
        _clearTimeout() {
            clearTimeout(this._timeout),
            this._timeout = null
        }
        static jQueryInterface(e) {
            return this.each((function() {
                const t = Xt.getOrCreateInstance(this, e);
                if ("string" == typeof e) {
                    if (void 0 === t[e])
                        throw new TypeError(`No method named "${e}"`);
                    t[e](this)
                }
            }
            ))
        }
    }
    return V(Xt),
    v(Xt),
    {
        Alert: X,
        Button: Y,
        Carousel: le,
        Collapse: me,
        Dropdown: Le,
        Modal: et,
        Offcanvas: at,
        Popover: At,
        ScrollSpy: Lt,
        Tab: Rt,
        Toast: Xt,
        Tooltip: St
    }
}
)),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";
    function e(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function t(n, i) {
        void 0 === n && (n = {}),
        void 0 === i && (i = {}),
        Object.keys(i).forEach(r => {
            void 0 === n[r] ? n[r] = i[r] : e(i[r]) && e(n[r]) && Object.keys(i[r]).length > 0 && t(n[r], i[r])
        }
        )
    }
    const n = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({
            initEvent() {}
        }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => []
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function i() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, n),
        e
    }
    const r = {
        document: n,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({
            getPropertyValue: () => ""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function s() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, r),
        e
    }
    class o extends Array {
        constructor(e) {
            "number" == typeof e ? super(e) : (super(...e || []),
            function(e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                    get: () => t,
                    set(e) {
                        t.__proto__ = e
                    }
                })
            }(this))
        }
    }
    function a(e) {
        void 0 === e && (e = []);
        const t = [];
        return e.forEach(e => {
            Array.isArray(e) ? t.push(...a(e)) : t.push(e)
        }
        ),
        t
    }
    function l(e, t) {
        return Array.prototype.filter.call(e, t)
    }
    function c(e, t) {
        const n = s()
          , r = i();
        let a = [];
        if (!t && e instanceof o)
            return e;
        if (!e)
            return new o(a);
        if ("string" == typeof e) {
            const n = e.trim();
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                let e = "div";
                0 === n.indexOf("<li") && (e = "ul"),
                0 === n.indexOf("<tr") && (e = "tbody"),
                0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (e = "tr"),
                0 === n.indexOf("<tbody") && (e = "table"),
                0 === n.indexOf("<option") && (e = "select");
                const t = r.createElement(e);
                t.innerHTML = n;
                for (let e = 0; e < t.childNodes.length; e += 1)
                    a.push(t.childNodes[e])
            } else
                a = function(e, t) {
                    if ("string" != typeof e)
                        return [e];
                    const n = []
                      , i = t.querySelectorAll(e);
                    for (let e = 0; e < i.length; e += 1)
                        n.push(i[e]);
                    return n
                }(e.trim(), t || r)
        } else if (e.nodeType || e === n || e === r)
            a.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof o)
                return e;
            a = e
        }
        return new o(function(e) {
            const t = [];
            for (let n = 0; n < e.length; n += 1)
                -1 === t.indexOf(e[n]) && t.push(e[n]);
            return t
        }(a))
    }
    c.fn = o.prototype;
    const d = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            const i = a(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.add(...i)
            }
            ),
            this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            const i = a(t.map(e => e.split(" ")));
            return this.forEach(e => {
                e.classList.remove(...i)
            }
            ),
            this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            const i = a(t.map(e => e.split(" ")));
            return l(this, e => i.filter(t => e.classList.contains(t)).length > 0).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            const i = a(t.map(e => e.split(" ")));
            this.forEach(e => {
                i.forEach(t => {
                    e.classList.toggle(t)
                }
                )
            }
            )
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (let n = 0; n < this.length; n += 1)
                if (2 === arguments.length)
                    this[n].setAttribute(e, t);
                else
                    for (const t in e)
                        this[n][t] = e[t],
                        this[n].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            let[i,r,s,o] = t;
            function a(e) {
                const t = e.target;
                if (!t)
                    return;
                const n = e.target.dom7EventData || [];
                if (n.indexOf(e) < 0 && n.unshift(e),
                c(t).is(r))
                    s.apply(t, n);
                else {
                    const e = c(t).parents();
                    for (let t = 0; t < e.length; t += 1)
                        c(e[t]).is(r) && s.apply(e[t], n)
                }
            }
            function l(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                s.apply(this, t)
            }
            "function" == typeof t[1] && ([i,s,o] = t,
            r = void 0),
            o || (o = !1);
            const d = i.split(" ");
            let u;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (r)
                    for (u = 0; u < d.length; u += 1) {
                        const e = d[u];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                        t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                        t.dom7LiveListeners[e].push({
                            listener: s,
                            proxyListener: a
                        }),
                        t.addEventListener(e, a, o)
                    }
                else
                    for (u = 0; u < d.length; u += 1) {
                        const e = d[u];
                        t.dom7Listeners || (t.dom7Listeners = {}),
                        t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                        t.dom7Listeners[e].push({
                            listener: s,
                            proxyListener: l
                        }),
                        t.addEventListener(e, l, o)
                    }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                t[n] = arguments[n];
            let[i,r,s,o] = t;
            "function" == typeof t[1] && ([i,s,o] = t,
            r = void 0),
            o || (o = !1);
            const a = i.split(" ");
            for (let e = 0; e < a.length; e += 1) {
                const t = a[e];
                for (let e = 0; e < this.length; e += 1) {
                    const n = this[e];
                    let i;
                    if (!r && n.dom7Listeners ? i = n.dom7Listeners[t] : r && n.dom7LiveListeners && (i = n.dom7LiveListeners[t]),
                    i && i.length)
                        for (let e = i.length - 1; e >= 0; e -= 1) {
                            const r = i[e];
                            s && r.listener === s || s && r.listener && r.listener.dom7proxy && r.listener.dom7proxy === s ? (n.removeEventListener(t, r.proxyListener, o),
                            i.splice(e, 1)) : s || (n.removeEventListener(t, r.proxyListener, o),
                            i.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function() {
            const e = s();
            for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++)
                n[i] = arguments[i];
            const r = n[0].split(" ")
              , o = n[1];
            for (let t = 0; t < r.length; t += 1) {
                const i = r[t];
                for (let t = 0; t < this.length; t += 1) {
                    const r = this[t];
                    if (e.CustomEvent) {
                        const t = new e.CustomEvent(i,{
                            detail: o,
                            bubbles: !0,
                            cancelable: !0
                        });
                        r.dom7EventData = n.filter( (e, t) => t > 0),
                        r.dispatchEvent(t),
                        r.dom7EventData = [],
                        delete r.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function(e) {
            const t = this;
            return e && t.on("transitionend", (function n(i) {
                i.target === this && (e.call(this, i),
                t.off("transitionend", n))
            }
            )),
            this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            const e = s();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                const e = s()
                  , t = i()
                  , n = this[0]
                  , r = n.getBoundingClientRect()
                  , o = t.body
                  , a = n.clientTop || o.clientTop || 0
                  , l = n.clientLeft || o.clientLeft || 0
                  , c = n === e ? e.scrollY : n.scrollTop
                  , d = n === e ? e.scrollX : n.scrollLeft;
                return {
                    top: r.top + c - a,
                    left: r.left + d - l
                }
            }
            return null
        },
        css: function(e, t) {
            const n = s();
            let i;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (const t in e)
                            this[i].style[t] = e[t];
                    return this
                }
                if (this[0])
                    return n.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1)
                    this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach( (t, n) => {
                e.apply(t, [t, n])
            }
            ),
            this) : this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            const t = s()
              , n = i()
              , r = this[0];
            let a, l;
            if (!r || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (r.matches)
                    return r.matches(e);
                if (r.webkitMatchesSelector)
                    return r.webkitMatchesSelector(e);
                if (r.msMatchesSelector)
                    return r.msMatchesSelector(e);
                for (a = c(e),
                l = 0; l < a.length; l += 1)
                    if (a[l] === r)
                        return !0;
                return !1
            }
            if (e === n)
                return r === n;
            if (e === t)
                return r === t;
            if (e.nodeType || e instanceof o) {
                for (a = e.nodeType ? [e] : e,
                l = 0; l < a.length; l += 1)
                    if (a[l] === r)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            let e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            const t = this.length;
            if (e > t - 1)
                return c([]);
            if (e < 0) {
                const n = t + e;
                return c(n < 0 ? [] : [this[n]])
            }
            return c([this[e]])
        },
        append: function() {
            let e;
            const t = i();
            for (let n = 0; n < arguments.length; n += 1) {
                e = n < 0 || arguments.length <= n ? void 0 : arguments[n];
                for (let n = 0; n < this.length; n += 1)
                    if ("string" == typeof e) {
                        const i = t.createElement("div");
                        for (i.innerHTML = e; i.firstChild; )
                            this[n].appendChild(i.firstChild)
                    } else if (e instanceof o)
                        for (let t = 0; t < e.length; t += 1)
                            this[n].appendChild(e[t]);
                    else
                        this[n].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            const t = i();
            let n, r;
            for (n = 0; n < this.length; n += 1)
                if ("string" == typeof e) {
                    const i = t.createElement("div");
                    for (i.innerHTML = e,
                    r = i.childNodes.length - 1; r >= 0; r -= 1)
                        this[n].insertBefore(i.childNodes[r], this[n].childNodes[0])
                } else if (e instanceof o)
                    for (r = 0; r < e.length; r += 1)
                        this[n].insertBefore(e[r], this[n].childNodes[0]);
                else
                    this[n].insertBefore(e, this[n].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && c(this[0].nextElementSibling).is(e) ? c([this[0].nextElementSibling]) : c([]) : this[0].nextElementSibling ? c([this[0].nextElementSibling]) : c([]) : c([])
        },
        nextAll: function(e) {
            const t = [];
            let n = this[0];
            if (!n)
                return c([]);
            for (; n.nextElementSibling; ) {
                const i = n.nextElementSibling;
                e ? c(i).is(e) && t.push(i) : t.push(i),
                n = i
            }
            return c(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && c(t.previousElementSibling).is(e) ? c([t.previousElementSibling]) : c([]) : t.previousElementSibling ? c([t.previousElementSibling]) : c([])
            }
            return c([])
        },
        prevAll: function(e) {
            const t = [];
            let n = this[0];
            if (!n)
                return c([]);
            for (; n.previousElementSibling; ) {
                const i = n.previousElementSibling;
                e ? c(i).is(e) && t.push(i) : t.push(i),
                n = i
            }
            return c(t)
        },
        parent: function(e) {
            const t = [];
            for (let n = 0; n < this.length; n += 1)
                null !== this[n].parentNode && (e ? c(this[n].parentNode).is(e) && t.push(this[n].parentNode) : t.push(this[n].parentNode));
            return c(t)
        },
        parents: function(e) {
            const t = [];
            for (let n = 0; n < this.length; n += 1) {
                let i = this[n].parentNode;
                for (; i; )
                    e ? c(i).is(e) && t.push(i) : t.push(i),
                    i = i.parentNode
            }
            return c(t)
        },
        closest: function(e) {
            let t = this;
            return void 0 === e ? c([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            const t = [];
            for (let n = 0; n < this.length; n += 1) {
                const i = this[n].querySelectorAll(e);
                for (let e = 0; e < i.length; e += 1)
                    t.push(i[e])
            }
            return c(t)
        },
        children: function(e) {
            const t = [];
            for (let n = 0; n < this.length; n += 1) {
                const i = this[n].children;
                for (let n = 0; n < i.length; n += 1)
                    e && !c(i[n]).is(e) || t.push(i[n])
            }
            return c(t)
        },
        filter: function(e) {
            return c(l(this, e))
        },
        remove: function() {
            for (let e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };
    function u(e, t) {
        return void 0 === t && (t = 0),
        setTimeout(e, t)
    }
    function p() {
        return Date.now()
    }
    function f(e, t) {
        void 0 === t && (t = "x");
        const n = s();
        let i, r, o;
        const a = function(e) {
            const t = s();
            let n;
            return t.getComputedStyle && (n = t.getComputedStyle(e, null)),
            !n && e.currentStyle && (n = e.currentStyle),
            n || (n = e.style),
            n
        }(e);
        return n.WebKitCSSMatrix ? (r = a.transform || a.webkitTransform,
        r.split(",").length > 6 && (r = r.split(", ").map(e => e.replace(",", ".")).join(", ")),
        o = new n.WebKitCSSMatrix("none" === r ? "" : r)) : (o = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        i = o.toString().split(",")),
        "x" === t && (r = n.WebKitCSSMatrix ? o.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (r = n.WebKitCSSMatrix ? o.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        r || 0
    }
    function h(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function m(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
    }
    function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
          , t = ["__proto__", "constructor", "prototype"];
        for (let n = 1; n < arguments.length; n += 1) {
            const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
            if (null != i && !m(i)) {
                const n = Object.keys(Object(i)).filter(e => t.indexOf(e) < 0);
                for (let t = 0, r = n.length; t < r; t += 1) {
                    const r = n[t]
                      , s = Object.getOwnPropertyDescriptor(i, r);
                    void 0 !== s && s.enumerable && (h(e[r]) && h(i[r]) ? i[r].__swiper__ ? e[r] = i[r] : g(e[r], i[r]) : !h(e[r]) && h(i[r]) ? (e[r] = {},
                    i[r].__swiper__ ? e[r] = i[r] : g(e[r], i[r])) : e[r] = i[r])
                }
            }
        }
        return e
    }
    function v(e, t, n) {
        e.style.setProperty(t, n)
    }
    function b(e) {
        let {swiper: t, targetPosition: n, side: i} = e;
        const r = s()
          , o = -t.translate;
        let a, l = null;
        const c = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none",
        r.cancelAnimationFrame(t.cssModeFrameID);
        const d = n > o ? "next" : "prev"
          , u = (e, t) => "next" === d && e >= t || "prev" === d && e <= t
          , p = () => {
            a = (new Date).getTime(),
            null === l && (l = a);
            const e = Math.max(Math.min((a - l) / c, 1), 0)
              , s = .5 - Math.cos(e * Math.PI) / 2;
            let d = o + s * (n - o);
            if (u(d, n) && (d = n),
            t.wrapperEl.scrollTo({
                [i]: d
            }),
            u(d, n))
                return t.wrapperEl.style.overflow = "hidden",
                t.wrapperEl.style.scrollSnapType = "",
                setTimeout( () => {
                    t.wrapperEl.style.overflow = "",
                    t.wrapperEl.scrollTo({
                        [i]: d
                    })
                }
                ),
                void r.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = r.requestAnimationFrame(p)
        }
        ;
        p()
    }
    let y, w, x;
    function E() {
        return y || (y = function() {
            const e = s()
              , t = i();
            return {
                smoothScroll: t.documentElement && "scrollBehavior"in t.documentElement.style,
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function() {
                    let t = !1;
                    try {
                        const n = Object.defineProperty({}, "passive", {
                            get() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, n)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart"in e
            }
        }()),
        y
    }
    function _(e) {
        return void 0 === e && (e = {}),
        w || (w = function(e) {
            let {userAgent: t} = void 0 === e ? {} : e;
            const n = E()
              , i = s()
              , r = i.navigator.platform
              , o = t || i.navigator.userAgent
              , a = {
                ios: !1,
                android: !1
            }
              , l = i.screen.width
              , c = i.screen.height
              , d = o.match(/(Android);?[\s\/]+([\d.]+)?/);
            let u = o.match(/(iPad).*OS\s([\d_]+)/);
            const p = o.match(/(iPod)(.*OS\s([\d_]+))?/)
              , f = !u && o.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , h = "Win32" === r;
            let m = "MacIntel" === r;
            return !u && m && n.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${l}x${c}`) >= 0 && (u = o.match(/(Version)\/([\d.]+)/),
            u || (u = [0, 1, "13_0_0"]),
            m = !1),
            d && !h && (a.os = "android",
            a.android = !0),
            (u || f || p) && (a.os = "ios",
            a.ios = !0),
            a
        }(e)),
        w
    }
    function S() {
        return x || (x = function() {
            const e = s();
            return {
                isSafari: function() {
                    const t = e.navigator.userAgent.toLowerCase();
                    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                }(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()),
        x
    }
    function T(e) {
        let {swiper: t, runCallbacks: n, direction: i, step: r} = e;
        const {activeIndex: s, previousIndex: o} = t;
        let a = i;
        if (a || (a = s > o ? "next" : s < o ? "prev" : "reset"),
        t.emit("transition" + r),
        n && s !== o) {
            if ("reset" === a)
                return void t.emit("slideResetTransition" + r);
            t.emit("slideChangeTransition" + r),
            "next" === a ? t.emit("slideNextTransition" + r) : t.emit("slidePrevTransition" + r)
        }
    }
    function C(e) {
        const t = this
          , n = i()
          , r = s()
          , o = t.touchEventsData
          , {params: a, touches: l, enabled: d} = t;
        if (!d)
            return;
        if (t.animating && a.preventInteractionOnTransition)
            return;
        !t.animating && a.cssMode && a.loop && t.loopFix();
        let u = e;
        u.originalEvent && (u = u.originalEvent);
        let f = c(u.target);
        if ("wrapper" === a.touchEventsTarget && !f.closest(t.wrapperEl).length)
            return;
        if (o.isTouchEvent = "touchstart" === u.type,
        !o.isTouchEvent && "which"in u && 3 === u.which)
            return;
        if (!o.isTouchEvent && "button"in u && u.button > 0)
            return;
        if (o.isTouched && o.isMoved)
            return;
        const h = !!a.noSwipingClass && "" !== a.noSwipingClass
          , m = e.composedPath ? e.composedPath() : e.path;
        h && u.target && u.target.shadowRoot && m && (f = c(m[0]));
        const g = a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass
          , v = !(!u.target || !u.target.shadowRoot);
        if (a.noSwiping && (v ? function(e, t) {
            return void 0 === t && (t = this),
            function t(n) {
                if (!n || n === i() || n === s())
                    return null;
                n.assignedSlot && (n = n.assignedSlot);
                const r = n.closest(e);
                return r || n.getRootNode ? r || t(n.getRootNode().host) : null
            }(t)
        }(g, f[0]) : f.closest(g)[0]))
            return void (t.allowClick = !0);
        if (a.swipeHandler && !f.closest(a.swipeHandler)[0])
            return;
        l.currentX = "touchstart" === u.type ? u.targetTouches[0].pageX : u.pageX,
        l.currentY = "touchstart" === u.type ? u.targetTouches[0].pageY : u.pageY;
        const b = l.currentX
          , y = l.currentY
          , w = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection
          , x = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
        if (w && (b <= x || b >= r.innerWidth - x)) {
            if ("prevent" !== w)
                return;
            e.preventDefault()
        }
        if (Object.assign(o, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
        }),
        l.startX = b,
        l.startY = y,
        o.touchStartTime = p(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        a.threshold > 0 && (o.allowThresholdMove = !1),
        "touchstart" !== u.type) {
            let e = !0;
            f.is(o.focusableElements) && (e = !1,
            "SELECT" === f[0].nodeName && (o.isTouched = !1)),
            n.activeElement && c(n.activeElement).is(o.focusableElements) && n.activeElement !== f[0] && n.activeElement.blur();
            const i = e && t.allowTouchMove && a.touchStartPreventDefault;
            !a.touchStartForcePreventDefault && !i || f[0].isContentEditable || u.preventDefault()
        }
        t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !a.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", u)
    }
    function A(e) {
        const t = i()
          , n = this
          , r = n.touchEventsData
          , {params: s, touches: o, rtlTranslate: a, enabled: l} = n;
        if (!l)
            return;
        let d = e;
        if (d.originalEvent && (d = d.originalEvent),
        !r.isTouched)
            return void (r.startMoving && r.isScrolling && n.emit("touchMoveOpposite", d));
        if (r.isTouchEvent && "touchmove" !== d.type)
            return;
        const u = "touchmove" === d.type && d.targetTouches && (d.targetTouches[0] || d.changedTouches[0])
          , f = "touchmove" === d.type ? u.pageX : d.pageX
          , h = "touchmove" === d.type ? u.pageY : d.pageY;
        if (d.preventedByNestedSwiper)
            return o.startX = f,
            void (o.startY = h);
        if (!n.allowTouchMove)
            return c(d.target).is(r.focusableElements) || (n.allowClick = !1),
            void (r.isTouched && (Object.assign(o, {
                startX: f,
                startY: h,
                currentX: f,
                currentY: h
            }),
            r.touchStartTime = p()));
        if (r.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
            if (n.isVertical()) {
                if (h < o.startY && n.translate <= n.maxTranslate() || h > o.startY && n.translate >= n.minTranslate())
                    return r.isTouched = !1,
                    void (r.isMoved = !1)
            } else if (f < o.startX && n.translate <= n.maxTranslate() || f > o.startX && n.translate >= n.minTranslate())
                return;
        if (r.isTouchEvent && t.activeElement && d.target === t.activeElement && c(d.target).is(r.focusableElements))
            return r.isMoved = !0,
            void (n.allowClick = !1);
        if (r.allowTouchCallbacks && n.emit("touchMove", d),
        d.targetTouches && d.targetTouches.length > 1)
            return;
        o.currentX = f,
        o.currentY = h;
        const m = o.currentX - o.startX
          , g = o.currentY - o.startY;
        if (n.params.threshold && Math.sqrt(m ** 2 + g ** 2) < n.params.threshold)
            return;
        if (void 0 === r.isScrolling) {
            let e;
            n.isHorizontal() && o.currentY === o.startY || n.isVertical() && o.currentX === o.startX ? r.isScrolling = !1 : m * m + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(m)) / Math.PI,
            r.isScrolling = n.isHorizontal() ? e > s.touchAngle : 90 - e > s.touchAngle)
        }
        if (r.isScrolling && n.emit("touchMoveOpposite", d),
        void 0 === r.startMoving && (o.currentX === o.startX && o.currentY === o.startY || (r.startMoving = !0)),
        r.isScrolling)
            return void (r.isTouched = !1);
        if (!r.startMoving)
            return;
        n.allowClick = !1,
        !s.cssMode && d.cancelable && d.preventDefault(),
        s.touchMoveStopPropagation && !s.nested && d.stopPropagation(),
        r.isMoved || (s.loop && !s.cssMode && n.loopFix(),
        r.startTranslate = n.getTranslate(),
        n.setTransition(0),
        n.animating && n.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        r.allowMomentumBounce = !1,
        !s.grabCursor || !0 !== n.allowSlideNext && !0 !== n.allowSlidePrev || n.setGrabCursor(!0),
        n.emit("sliderFirstMove", d)),
        n.emit("sliderMove", d),
        r.isMoved = !0;
        let v = n.isHorizontal() ? m : g;
        o.diff = v,
        v *= s.touchRatio,
        a && (v = -v),
        n.swipeDirection = v > 0 ? "prev" : "next",
        r.currentTranslate = v + r.startTranslate;
        let b = !0
          , y = s.resistanceRatio;
        if (s.touchReleaseOnEdges && (y = 0),
        v > 0 && r.currentTranslate > n.minTranslate() ? (b = !1,
        s.resistance && (r.currentTranslate = n.minTranslate() - 1 + (-n.minTranslate() + r.startTranslate + v) ** y)) : v < 0 && r.currentTranslate < n.maxTranslate() && (b = !1,
        s.resistance && (r.currentTranslate = n.maxTranslate() + 1 - (n.maxTranslate() - r.startTranslate - v) ** y)),
        b && (d.preventedByNestedSwiper = !0),
        !n.allowSlideNext && "next" === n.swipeDirection && r.currentTranslate < r.startTranslate && (r.currentTranslate = r.startTranslate),
        !n.allowSlidePrev && "prev" === n.swipeDirection && r.currentTranslate > r.startTranslate && (r.currentTranslate = r.startTranslate),
        n.allowSlidePrev || n.allowSlideNext || (r.currentTranslate = r.startTranslate),
        s.threshold > 0) {
            if (!(Math.abs(v) > s.threshold || r.allowThresholdMove))
                return void (r.currentTranslate = r.startTranslate);
            if (!r.allowThresholdMove)
                return r.allowThresholdMove = !0,
                o.startX = o.currentX,
                o.startY = o.currentY,
                r.currentTranslate = r.startTranslate,
                void (o.diff = n.isHorizontal() ? o.currentX - o.startX : o.currentY - o.startY)
        }
        s.followFinger && !s.cssMode && ((s.freeMode && s.freeMode.enabled && n.freeMode || s.watchSlidesProgress) && (n.updateActiveIndex(),
        n.updateSlidesClasses()),
        n.params.freeMode && s.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
        n.updateProgress(r.currentTranslate),
        n.setTranslate(r.currentTranslate))
    }
    function M(e) {
        const t = this
          , n = t.touchEventsData
          , {params: i, touches: r, rtlTranslate: s, slidesGrid: o, enabled: a} = t;
        if (!a)
            return;
        let l = e;
        if (l.originalEvent && (l = l.originalEvent),
        n.allowTouchCallbacks && t.emit("touchEnd", l),
        n.allowTouchCallbacks = !1,
        !n.isTouched)
            return n.isMoved && i.grabCursor && t.setGrabCursor(!1),
            n.isMoved = !1,
            void (n.startMoving = !1);
        i.grabCursor && n.isMoved && n.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const c = p()
          , d = c - n.touchStartTime;
        if (t.allowClick) {
            const e = l.path || l.composedPath && l.composedPath();
            t.updateClickedSlide(e && e[0] || l.target),
            t.emit("tap click", l),
            d < 300 && c - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", l)
        }
        if (n.lastClickTime = p(),
        u( () => {
            t.destroyed || (t.allowClick = !0)
        }
        ),
        !n.isTouched || !n.isMoved || !t.swipeDirection || 0 === r.diff || n.currentTranslate === n.startTranslate)
            return n.isTouched = !1,
            n.isMoved = !1,
            void (n.startMoving = !1);
        let f;
        if (n.isTouched = !1,
        n.isMoved = !1,
        n.startMoving = !1,
        f = i.followFinger ? s ? t.translate : -t.translate : -n.currentTranslate,
        i.cssMode)
            return;
        if (t.params.freeMode && i.freeMode.enabled)
            return void t.freeMode.onTouchEnd({
                currentPos: f
            });
        let h = 0
          , m = t.slidesSizesGrid[0];
        for (let e = 0; e < o.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
            const t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
            void 0 !== o[e + t] ? f >= o[e] && f < o[e + t] && (h = e,
            m = o[e + t] - o[e]) : f >= o[e] && (h = e,
            m = o[o.length - 1] - o[o.length - 2])
        }
        let g = null
          , v = null;
        i.rewind && (t.isBeginning ? v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
        const b = (f - o[h]) / m
          , y = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (d > i.longSwipesMs) {
            if (!i.longSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (b >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? g : h + y) : t.slideTo(h)),
            "prev" === t.swipeDirection && (b > 1 - i.longSwipesRatio ? t.slideTo(h + y) : null !== v && b < 0 && Math.abs(b) > i.longSwipesRatio ? t.slideTo(v) : t.slideTo(h))
        } else {
            if (!i.shortSwipes)
                return void t.slideTo(t.activeIndex);
            !t.navigation || l.target !== t.navigation.nextEl && l.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo(null !== g ? g : h + y),
            "prev" === t.swipeDirection && t.slideTo(null !== v ? v : h)) : l.target === t.navigation.nextEl ? t.slideTo(h + y) : t.slideTo(h)
        }
    }
    function k() {
        const e = this
          , {params: t, el: n} = e;
        if (n && 0 === n.offsetWidth)
            return;
        t.breakpoints && e.setBreakpoint();
        const {allowSlideNext: i, allowSlidePrev: r, snapGrid: s} = e;
        e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
        e.allowSlidePrev = r,
        e.allowSlideNext = i,
        e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow()
    }
    function O(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
    }
    function P() {
        const e = this
          , {wrapperEl: t, rtlTranslate: n, enabled: i} = e;
        if (!i)
            return;
        let r;
        e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
        const s = e.maxTranslate() - e.minTranslate();
        r = 0 === s ? 0 : (e.translate - e.minTranslate()) / s,
        r !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
    }
    Object.keys(d).forEach(e => {
        Object.defineProperty(c.fn, e, {
            value: d[e],
            writable: !0
        })
    }
    );
    let L = !1;
    function I() {}
    const $ = (e, t) => {
        const n = i()
          , {params: r, touchEvents: s, el: o, wrapperEl: a, device: l, support: c} = e
          , d = !!r.nested
          , u = "on" === t ? "addEventListener" : "removeEventListener"
          , p = t;
        if (c.touch) {
            const t = !("touchstart" !== s.start || !c.passiveListener || !r.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            o[u](s.start, e.onTouchStart, t),
            o[u](s.move, e.onTouchMove, c.passiveListener ? {
                passive: !1,
                capture: d
            } : d),
            o[u](s.end, e.onTouchEnd, t),
            s.cancel && o[u](s.cancel, e.onTouchEnd, t)
        } else
            o[u](s.start, e.onTouchStart, !1),
            n[u](s.move, e.onTouchMove, d),
            n[u](s.end, e.onTouchEnd, !1);
        (r.preventClicks || r.preventClicksPropagation) && o[u]("click", e.onClick, !0),
        r.cssMode && a[u]("scroll", e.onScroll),
        r.updateOnWindowResize ? e[p](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", k, !0) : e[p]("observerUpdate", k, !0)
    }
    ;
    const z = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var D = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopedSlidesLimit: !0,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    function j(e, t) {
        return function(n) {
            void 0 === n && (n = {});
            const i = Object.keys(n)[0]
              , r = n[i];
            "object" == typeof r && null !== r ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 && !0 === e[i] && (e[i] = {
                auto: !0
            }),
            i in e && "enabled"in r ? (!0 === e[i] && (e[i] = {
                enabled: !0
            }),
            "object" != typeof e[i] || "enabled"in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = {
                enabled: !1
            }),
            g(t, n)) : g(t, n)) : g(t, n)
        }
    }
    const N = {
        eventsEmitter: {
            on(e, t, n) {
                const i = this;
                if (!i.eventsListeners || i.destroyed)
                    return i;
                if ("function" != typeof t)
                    return i;
                const r = n ? "unshift" : "push";
                return e.split(" ").forEach(e => {
                    i.eventsListeners[e] || (i.eventsListeners[e] = []),
                    i.eventsListeners[e][r](t)
                }
                ),
                i
            },
            once(e, t, n) {
                const i = this;
                if (!i.eventsListeners || i.destroyed)
                    return i;
                if ("function" != typeof t)
                    return i;
                function r() {
                    i.off(e, r),
                    r.__emitterProxy && delete r.__emitterProxy;
                    for (var n = arguments.length, s = new Array(n), o = 0; o < n; o++)
                        s[o] = arguments[o];
                    t.apply(i, s)
                }
                return r.__emitterProxy = t,
                i.on(e, r, n)
            },
            onAny(e, t) {
                const n = this;
                if (!n.eventsListeners || n.destroyed)
                    return n;
                if ("function" != typeof e)
                    return n;
                const i = t ? "unshift" : "push";
                return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e),
                n
            },
            offAny(e) {
                const t = this;
                if (!t.eventsListeners || t.destroyed)
                    return t;
                if (!t.eventsAnyListeners)
                    return t;
                const n = t.eventsAnyListeners.indexOf(e);
                return n >= 0 && t.eventsAnyListeners.splice(n, 1),
                t
            },
            off(e, t) {
                const n = this;
                return !n.eventsListeners || n.destroyed ? n : n.eventsListeners ? (e.split(" ").forEach(e => {
                    void 0 === t ? n.eventsListeners[e] = [] : n.eventsListeners[e] && n.eventsListeners[e].forEach( (i, r) => {
                        (i === t || i.__emitterProxy && i.__emitterProxy === t) && n.eventsListeners[e].splice(r, 1)
                    }
                    )
                }
                ),
                n) : n
            },
            emit() {
                const e = this;
                if (!e.eventsListeners || e.destroyed)
                    return e;
                if (!e.eventsListeners)
                    return e;
                let t, n, i;
                for (var r = arguments.length, s = new Array(r), o = 0; o < r; o++)
                    s[o] = arguments[o];
                return "string" == typeof s[0] || Array.isArray(s[0]) ? (t = s[0],
                n = s.slice(1, s.length),
                i = e) : (t = s[0].events,
                n = s[0].data,
                i = s[0].context || e),
                n.unshift(i),
                (Array.isArray(t) ? t : t.split(" ")).forEach(t => {
                    e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach(e => {
                        e.apply(i, [t, ...n])
                    }
                    ),
                    e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach(e => {
                        e.apply(i, n)
                    }
                    )
                }
                ),
                e
            }
        },
        update: {
            updateSize: function() {
                const e = this;
                let t, n;
                const i = e.$el;
                t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth,
                n = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight,
                0 === t && e.isHorizontal() || 0 === n && e.isVertical() || (t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10),
                n = n - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10),
                Number.isNaN(t) && (t = 0),
                Number.isNaN(n) && (n = 0),
                Object.assign(e, {
                    width: t,
                    height: n,
                    size: e.isHorizontal() ? t : n
                }))
            },
            updateSlides: function() {
                const e = this;
                function t(t) {
                    return e.isHorizontal() ? t : {
                        width: "height",
                        "margin-top": "margin-left",
                        "margin-bottom ": "margin-right",
                        "margin-left": "margin-top",
                        "margin-right": "margin-bottom",
                        "padding-left": "padding-top",
                        "padding-right": "padding-bottom",
                        marginRight: "marginBottom"
                    }[t]
                }
                function n(e, n) {
                    return parseFloat(e.getPropertyValue(t(n)) || 0)
                }
                const i = e.params
                  , {$wrapperEl: r, size: s, rtlTranslate: o, wrongRTL: a} = e
                  , l = e.virtual && i.virtual.enabled
                  , c = l ? e.virtual.slides.length : e.slides.length
                  , d = r.children("." + e.params.slideClass)
                  , u = l ? e.virtual.slides.length : d.length;
                let p = [];
                const f = []
                  , h = [];
                let m = i.slidesOffsetBefore;
                "function" == typeof m && (m = i.slidesOffsetBefore.call(e));
                let g = i.slidesOffsetAfter;
                "function" == typeof g && (g = i.slidesOffsetAfter.call(e));
                const b = e.snapGrid.length
                  , y = e.slidesGrid.length;
                let w = i.spaceBetween
                  , x = -m
                  , E = 0
                  , _ = 0;
                if (void 0 === s)
                    return;
                "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s),
                e.virtualSize = -w,
                o ? d.css({
                    marginLeft: "",
                    marginBottom: "",
                    marginTop: ""
                }) : d.css({
                    marginRight: "",
                    marginBottom: "",
                    marginTop: ""
                }),
                i.centeredSlides && i.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
                v(e.wrapperEl, "--swiper-centered-offset-after", ""));
                const S = i.grid && i.grid.rows > 1 && e.grid;
                let T;
                S && e.grid.initSlides(u);
                const C = "auto" === i.slidesPerView && i.breakpoints && Object.keys(i.breakpoints).filter(e => void 0 !== i.breakpoints[e].slidesPerView).length > 0;
                for (let r = 0; r < u; r += 1) {
                    T = 0;
                    const o = d.eq(r);
                    if (S && e.grid.updateSlide(r, o, u, t),
                    "none" !== o.css("display")) {
                        if ("auto" === i.slidesPerView) {
                            C && (d[r].style[t("width")] = "");
                            const s = getComputedStyle(o[0])
                              , a = o[0].style.transform
                              , l = o[0].style.webkitTransform;
                            if (a && (o[0].style.transform = "none"),
                            l && (o[0].style.webkitTransform = "none"),
                            i.roundLengths)
                                T = e.isHorizontal() ? o.outerWidth(!0) : o.outerHeight(!0);
                            else {
                                const e = n(s, "width")
                                  , t = n(s, "padding-left")
                                  , i = n(s, "padding-right")
                                  , r = n(s, "margin-left")
                                  , a = n(s, "margin-right")
                                  , l = s.getPropertyValue("box-sizing");
                                if (l && "border-box" === l)
                                    T = e + r + a;
                                else {
                                    const {clientWidth: n, offsetWidth: s} = o[0];
                                    T = e + t + i + r + a + (s - n)
                                }
                            }
                            a && (o[0].style.transform = a),
                            l && (o[0].style.webkitTransform = l),
                            i.roundLengths && (T = Math.floor(T))
                        } else
                            T = (s - (i.slidesPerView - 1) * w) / i.slidesPerView,
                            i.roundLengths && (T = Math.floor(T)),
                            d[r] && (d[r].style[t("width")] = T + "px");
                        d[r] && (d[r].swiperSlideSize = T),
                        h.push(T),
                        i.centeredSlides ? (x = x + T / 2 + E / 2 + w,
                        0 === E && 0 !== r && (x = x - s / 2 - w),
                        0 === r && (x = x - s / 2 - w),
                        Math.abs(x) < .001 && (x = 0),
                        i.roundLengths && (x = Math.floor(x)),
                        _ % i.slidesPerGroup == 0 && p.push(x),
                        f.push(x)) : (i.roundLengths && (x = Math.floor(x)),
                        (_ - Math.min(e.params.slidesPerGroupSkip, _)) % e.params.slidesPerGroup == 0 && p.push(x),
                        f.push(x),
                        x = x + T + w),
                        e.virtualSize += T + w,
                        E = T,
                        _ += 1
                    }
                }
                if (e.virtualSize = Math.max(e.virtualSize, s) + g,
                o && a && ("slide" === i.effect || "coverflow" === i.effect) && r.css({
                    width: e.virtualSize + i.spaceBetween + "px"
                }),
                i.setWrapperSize && r.css({
                    [t("width")]: e.virtualSize + i.spaceBetween + "px"
                }),
                S && e.grid.updateWrapperSize(T, p, t),
                !i.centeredSlides) {
                    const t = [];
                    for (let n = 0; n < p.length; n += 1) {
                        let r = p[n];
                        i.roundLengths && (r = Math.floor(r)),
                        p[n] <= e.virtualSize - s && t.push(r)
                    }
                    p = t,
                    Math.floor(e.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(e.virtualSize - s)
                }
                if (0 === p.length && (p = [0]),
                0 !== i.spaceBetween) {
                    const n = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
                    d.filter( (e, t) => !i.cssMode || t !== d.length - 1).css({
                        [n]: w + "px"
                    })
                }
                if (i.centeredSlides && i.centeredSlidesBounds) {
                    let e = 0;
                    h.forEach(t => {
                        e += t + (i.spaceBetween ? i.spaceBetween : 0)
                    }
                    ),
                    e -= i.spaceBetween;
                    const t = e - s;
                    p = p.map(e => e < 0 ? -m : e > t ? t + g : e)
                }
                if (i.centerInsufficientSlides) {
                    let e = 0;
                    if (h.forEach(t => {
                        e += t + (i.spaceBetween ? i.spaceBetween : 0)
                    }
                    ),
                    e -= i.spaceBetween,
                    e < s) {
                        const t = (s - e) / 2;
                        p.forEach( (e, n) => {
                            p[n] = e - t
                        }
                        ),
                        f.forEach( (e, n) => {
                            f[n] = e + t
                        }
                        )
                    }
                }
                if (Object.assign(e, {
                    slides: d,
                    snapGrid: p,
                    slidesGrid: f,
                    slidesSizesGrid: h
                }),
                i.centeredSlides && i.cssMode && !i.centeredSlidesBounds) {
                    v(e.wrapperEl, "--swiper-centered-offset-before", -p[0] + "px"),
                    v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - h[h.length - 1] / 2 + "px");
                    const t = -e.snapGrid[0]
                      , n = -e.slidesGrid[0];
                    e.snapGrid = e.snapGrid.map(e => e + t),
                    e.slidesGrid = e.slidesGrid.map(e => e + n)
                }
                if (u !== c && e.emit("slidesLengthChange"),
                p.length !== b && (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
                f.length !== y && e.emit("slidesGridLengthChange"),
                i.watchSlidesProgress && e.updateSlidesOffset(),
                !(l || i.cssMode || "slide" !== i.effect && "fade" !== i.effect)) {
                    const t = i.containerModifierClass + "backface-hidden"
                      , n = e.$el.hasClass(t);
                    u <= i.maxBackfaceHiddenSlides ? n || e.$el.addClass(t) : n && e.$el.removeClass(t)
                }
            },
            updateAutoHeight: function(e) {
                const t = this
                  , n = []
                  , i = t.virtual && t.params.virtual.enabled;
                let r, s = 0;
                "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
                const o = e => i ? t.slides.filter(t => parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e)[0] : t.slides.eq(e)[0];
                if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                    if (t.params.centeredSlides)
                        (t.visibleSlides || c([])).each(e => {
                            n.push(e)
                        }
                        );
                    else
                        for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
                            const e = t.activeIndex + r;
                            if (e > t.slides.length && !i)
                                break;
                            n.push(o(e))
                        }
                else
                    n.push(o(t.activeIndex));
                for (r = 0; r < n.length; r += 1)
                    if (void 0 !== n[r]) {
                        const e = n[r].offsetHeight;
                        s = e > s ? e : s
                    }
                (s || 0 === s) && t.$wrapperEl.css("height", s + "px")
            },
            updateSlidesOffset: function() {
                const e = this
                  , t = e.slides;
                for (let n = 0; n < t.length; n += 1)
                    t[n].swiperSlideOffset = e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                const t = this
                  , n = t.params
                  , {slides: i, rtlTranslate: r, snapGrid: s} = t;
                if (0 === i.length)
                    return;
                void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
                let o = -e;
                r && (o = e),
                i.removeClass(n.slideVisibleClass),
                t.visibleSlidesIndexes = [],
                t.visibleSlides = [];
                for (let e = 0; e < i.length; e += 1) {
                    const a = i[e];
                    let l = a.swiperSlideOffset;
                    n.cssMode && n.centeredSlides && (l -= i[0].swiperSlideOffset);
                    const c = (o + (n.centeredSlides ? t.minTranslate() : 0) - l) / (a.swiperSlideSize + n.spaceBetween)
                      , d = (o - s[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) / (a.swiperSlideSize + n.spaceBetween)
                      , u = -(o - l)
                      , p = u + t.slidesSizesGrid[e];
                    (u >= 0 && u < t.size - 1 || p > 1 && p <= t.size || u <= 0 && p >= t.size) && (t.visibleSlides.push(a),
                    t.visibleSlidesIndexes.push(e),
                    i.eq(e).addClass(n.slideVisibleClass)),
                    a.progress = r ? -c : c,
                    a.originalProgress = r ? -d : d
                }
                t.visibleSlides = c(t.visibleSlides)
            },
            updateProgress: function(e) {
                const t = this;
                if (void 0 === e) {
                    const n = t.rtlTranslate ? -1 : 1;
                    e = t && t.translate && t.translate * n || 0
                }
                const n = t.params
                  , i = t.maxTranslate() - t.minTranslate();
                let {progress: r, isBeginning: s, isEnd: o} = t;
                const a = s
                  , l = o;
                0 === i ? (r = 0,
                s = !0,
                o = !0) : (r = (e - t.minTranslate()) / i,
                s = r <= 0,
                o = r >= 1),
                Object.assign(t, {
                    progress: r,
                    isBeginning: s,
                    isEnd: o
                }),
                (n.watchSlidesProgress || n.centeredSlides && n.autoHeight) && t.updateSlidesProgress(e),
                s && !a && t.emit("reachBeginning toEdge"),
                o && !l && t.emit("reachEnd toEdge"),
                (a && !s || l && !o) && t.emit("fromEdge"),
                t.emit("progress", r)
            },
            updateSlidesClasses: function() {
                const e = this
                  , {slides: t, params: n, $wrapperEl: i, activeIndex: r, realIndex: s} = e
                  , o = e.virtual && n.virtual.enabled;
                let a;
                t.removeClass(`${n.slideActiveClass} ${n.slideNextClass} ${n.slidePrevClass} ${n.slideDuplicateActiveClass} ${n.slideDuplicateNextClass} ${n.slideDuplicatePrevClass}`),
                a = o ? e.$wrapperEl.find(`.${n.slideClass}[data-swiper-slide-index="${r}"]`) : t.eq(r),
                a.addClass(n.slideActiveClass),
                n.loop && (a.hasClass(n.slideDuplicateClass) ? i.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${s}"]`).addClass(n.slideDuplicateActiveClass) : i.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${s}"]`).addClass(n.slideDuplicateActiveClass));
                let l = a.nextAll("." + n.slideClass).eq(0).addClass(n.slideNextClass);
                n.loop && 0 === l.length && (l = t.eq(0),
                l.addClass(n.slideNextClass));
                let c = a.prevAll("." + n.slideClass).eq(0).addClass(n.slidePrevClass);
                n.loop && 0 === c.length && (c = t.eq(-1),
                c.addClass(n.slidePrevClass)),
                n.loop && (l.hasClass(n.slideDuplicateClass) ? i.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicateNextClass) : i.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${l.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicateNextClass),
                c.hasClass(n.slideDuplicateClass) ? i.children(`.${n.slideClass}:not(.${n.slideDuplicateClass})[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicatePrevClass) : i.children(`.${n.slideClass}.${n.slideDuplicateClass}[data-swiper-slide-index="${c.attr("data-swiper-slide-index")}"]`).addClass(n.slideDuplicatePrevClass)),
                e.emitSlidesClasses()
            },
            updateActiveIndex: function(e) {
                const t = this
                  , n = t.rtlTranslate ? t.translate : -t.translate
                  , {slidesGrid: i, snapGrid: r, params: s, activeIndex: o, realIndex: a, snapIndex: l} = t;
                let c, d = e;
                if (void 0 === d) {
                    for (let e = 0; e < i.length; e += 1)
                        void 0 !== i[e + 1] ? n >= i[e] && n < i[e + 1] - (i[e + 1] - i[e]) / 2 ? d = e : n >= i[e] && n < i[e + 1] && (d = e + 1) : n >= i[e] && (d = e);
                    s.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                }
                if (r.indexOf(n) >= 0)
                    c = r.indexOf(n);
                else {
                    const e = Math.min(s.slidesPerGroupSkip, d);
                    c = e + Math.floor((d - e) / s.slidesPerGroup)
                }
                if (c >= r.length && (c = r.length - 1),
                d === o)
                    return void (c !== l && (t.snapIndex = c,
                    t.emit("snapIndexChange")));
                const u = parseInt(t.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                Object.assign(t, {
                    snapIndex: c,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: d
                }),
                t.emit("activeIndexChange"),
                t.emit("snapIndexChange"),
                a !== u && t.emit("realIndexChange"),
                (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
            },
            updateClickedSlide: function(e) {
                const t = this
                  , n = t.params
                  , i = c(e).closest("." + n.slideClass)[0];
                let r, s = !1;
                if (i)
                    for (let e = 0; e < t.slides.length; e += 1)
                        if (t.slides[e] === i) {
                            s = !0,
                            r = e;
                            break
                        }
                if (!i || !s)
                    return t.clickedSlide = void 0,
                    void (t.clickedIndex = void 0);
                t.clickedSlide = i,
                t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(c(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = r,
                n.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
            }
        },
        translate: {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                const {params: t, rtlTranslate: n, translate: i, $wrapperEl: r} = this;
                if (t.virtualTranslate)
                    return n ? -i : i;
                if (t.cssMode)
                    return i;
                let s = f(r[0], e);
                return n && (s = -s),
                s || 0
            },
            setTranslate: function(e, t) {
                const n = this
                  , {rtlTranslate: i, params: r, $wrapperEl: s, wrapperEl: o, progress: a} = n;
                let l, c = 0, d = 0;
                n.isHorizontal() ? c = i ? -e : e : d = e,
                r.roundLengths && (c = Math.floor(c),
                d = Math.floor(d)),
                r.cssMode ? o[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal() ? -c : -d : r.virtualTranslate || s.transform(`translate3d(${c}px, ${d}px, 0px)`),
                n.previousTranslate = n.translate,
                n.translate = n.isHorizontal() ? c : d;
                const u = n.maxTranslate() - n.minTranslate();
                l = 0 === u ? 0 : (e - n.minTranslate()) / u,
                l !== a && n.updateProgress(e),
                n.emit("setTranslate", n.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, n, i, r) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0),
                void 0 === i && (i = !0);
                const s = this
                  , {params: o, wrapperEl: a} = s;
                if (s.animating && o.preventInteractionOnTransition)
                    return !1;
                const l = s.minTranslate()
                  , c = s.maxTranslate();
                let d;
                if (d = i && e > l ? l : i && e < c ? c : e,
                s.updateProgress(d),
                o.cssMode) {
                    const e = s.isHorizontal();
                    if (0 === t)
                        a[e ? "scrollLeft" : "scrollTop"] = -d;
                    else {
                        if (!s.support.smoothScroll)
                            return b({
                                swiper: s,
                                targetPosition: -d,
                                side: e ? "left" : "top"
                            }),
                            !0;
                        a.scrollTo({
                            [e ? "left" : "top"]: -d,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return 0 === t ? (s.setTransition(0),
                s.setTranslate(d),
                n && (s.emit("beforeTransitionStart", t, r),
                s.emit("transitionEnd"))) : (s.setTransition(t),
                s.setTranslate(d),
                n && (s.emit("beforeTransitionStart", t, r),
                s.emit("transitionStart")),
                s.animating || (s.animating = !0,
                s.onTranslateToWrapperTransitionEnd || (s.onTranslateToWrapperTransitionEnd = function(e) {
                    s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
                    s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd),
                    s.onTranslateToWrapperTransitionEnd = null,
                    delete s.onTranslateToWrapperTransitionEnd,
                    n && s.emit("transitionEnd"))
                }
                ),
                s.$wrapperEl[0].addEventListener("transitionend", s.onTranslateToWrapperTransitionEnd),
                s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onTranslateToWrapperTransitionEnd))),
                !0
            }
        },
        transition: {
            setTransition: function(e, t) {
                const n = this;
                n.params.cssMode || n.$wrapperEl.transition(e),
                n.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                const n = this
                  , {params: i} = n;
                i.cssMode || (i.autoHeight && n.updateAutoHeight(),
                T({
                    swiper: n,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                const n = this
                  , {params: i} = n;
                n.animating = !1,
                i.cssMode || (n.setTransition(0),
                T({
                    swiper: n,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: {
            slideTo: function(e, t, n, i, r) {
                if (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0),
                "number" != typeof e && "string" != typeof e)
                    throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
                if ("string" == typeof e) {
                    const t = parseInt(e, 10);
                    if (!isFinite(t))
                        throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                    e = t
                }
                const s = this;
                let o = e;
                o < 0 && (o = 0);
                const {params: a, snapGrid: l, slidesGrid: c, previousIndex: d, activeIndex: u, rtlTranslate: p, wrapperEl: f, enabled: h} = s;
                if (s.animating && a.preventInteractionOnTransition || !h && !i && !r)
                    return !1;
                const m = Math.min(s.params.slidesPerGroupSkip, o);
                let g = m + Math.floor((o - m) / s.params.slidesPerGroup);
                g >= l.length && (g = l.length - 1);
                const v = -l[g];
                if (a.normalizeSlideIndex)
                    for (let e = 0; e < c.length; e += 1) {
                        const t = -Math.floor(100 * v)
                          , n = Math.floor(100 * c[e])
                          , i = Math.floor(100 * c[e + 1]);
                        void 0 !== c[e + 1] ? t >= n && t < i - (i - n) / 2 ? o = e : t >= n && t < i && (o = e + 1) : t >= n && (o = e)
                    }
                if (s.initialized && o !== u) {
                    if (!s.allowSlideNext && v < s.translate && v < s.minTranslate())
                        return !1;
                    if (!s.allowSlidePrev && v > s.translate && v > s.maxTranslate() && (u || 0) !== o)
                        return !1
                }
                let y;
                if (o !== (d || 0) && n && s.emit("beforeSlideChangeStart"),
                s.updateProgress(v),
                y = o > u ? "next" : o < u ? "prev" : "reset",
                p && -v === s.translate || !p && v === s.translate)
                    return s.updateActiveIndex(o),
                    a.autoHeight && s.updateAutoHeight(),
                    s.updateSlidesClasses(),
                    "slide" !== a.effect && s.setTranslate(v),
                    "reset" !== y && (s.transitionStart(n, y),
                    s.transitionEnd(n, y)),
                    !1;
                if (a.cssMode) {
                    const e = s.isHorizontal()
                      , n = p ? v : -v;
                    if (0 === t) {
                        const t = s.virtual && s.params.virtual.enabled;
                        t && (s.wrapperEl.style.scrollSnapType = "none",
                        s._immediateVirtual = !0),
                        f[e ? "scrollLeft" : "scrollTop"] = n,
                        t && requestAnimationFrame( () => {
                            s.wrapperEl.style.scrollSnapType = "",
                            s._swiperImmediateVirtual = !1
                        }
                        )
                    } else {
                        if (!s.support.smoothScroll)
                            return b({
                                swiper: s,
                                targetPosition: n,
                                side: e ? "left" : "top"
                            }),
                            !0;
                        f.scrollTo({
                            [e ? "left" : "top"]: n,
                            behavior: "smooth"
                        })
                    }
                    return !0
                }
                return s.setTransition(t),
                s.setTranslate(v),
                s.updateActiveIndex(o),
                s.updateSlidesClasses(),
                s.emit("beforeTransitionStart", t, i),
                s.transitionStart(n, y),
                0 === t ? s.transitionEnd(n, y) : s.animating || (s.animating = !0,
                s.onSlideToWrapperTransitionEnd || (s.onSlideToWrapperTransitionEnd = function(e) {
                    s && !s.destroyed && e.target === this && (s.$wrapperEl[0].removeEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                    s.$wrapperEl[0].removeEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd),
                    s.onSlideToWrapperTransitionEnd = null,
                    delete s.onSlideToWrapperTransitionEnd,
                    s.transitionEnd(n, y))
                }
                ),
                s.$wrapperEl[0].addEventListener("transitionend", s.onSlideToWrapperTransitionEnd),
                s.$wrapperEl[0].addEventListener("webkitTransitionEnd", s.onSlideToWrapperTransitionEnd)),
                !0
            },
            slideToLoop: function(e, t, n, i) {
                if (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === n && (n = !0),
                "string" == typeof e) {
                    const t = parseInt(e, 10);
                    if (!isFinite(t))
                        throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                    e = t
                }
                const r = this;
                let s = e;
                return r.params.loop && (s += r.loopedSlides),
                r.slideTo(s, t, n, i)
            },
            slideNext: function(e, t, n) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                const i = this
                  , {animating: r, enabled: s, params: o} = i;
                if (!s)
                    return i;
                let a = o.slidesPerGroup;
                "auto" === o.slidesPerView && 1 === o.slidesPerGroup && o.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
                const l = i.activeIndex < o.slidesPerGroupSkip ? 1 : a;
                if (o.loop) {
                    if (r && o.loopPreventsSlide)
                        return !1;
                    i.loopFix(),
                    i._clientLeft = i.$wrapperEl[0].clientLeft
                }
                return o.rewind && i.isEnd ? i.slideTo(0, e, t, n) : i.slideTo(i.activeIndex + l, e, t, n)
            },
            slidePrev: function(e, t, n) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                const i = this
                  , {params: r, animating: s, snapGrid: o, slidesGrid: a, rtlTranslate: l, enabled: c} = i;
                if (!c)
                    return i;
                if (r.loop) {
                    if (s && r.loopPreventsSlide)
                        return !1;
                    i.loopFix(),
                    i._clientLeft = i.$wrapperEl[0].clientLeft
                }
                function d(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                const u = d(l ? i.translate : -i.translate)
                  , p = o.map(e => d(e));
                let f = o[p.indexOf(u) - 1];
                if (void 0 === f && r.cssMode) {
                    let e;
                    o.forEach( (t, n) => {
                        u >= t && (e = n)
                    }
                    ),
                    void 0 !== e && (f = o[e > 0 ? e - 1 : e])
                }
                let h = 0;
                if (void 0 !== f && (h = a.indexOf(f),
                h < 0 && (h = i.activeIndex - 1),
                "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1,
                h = Math.max(h, 0))),
                r.rewind && i.isBeginning) {
                    const r = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                    return i.slideTo(r, e, t, n)
                }
                return i.slideTo(h, e, t, n)
            },
            slideReset: function(e, t, n) {
                return void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                this.slideTo(this.activeIndex, e, t, n)
            },
            slideToClosest: function(e, t, n, i) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === i && (i = .5);
                const r = this;
                let s = r.activeIndex;
                const o = Math.min(r.params.slidesPerGroupSkip, s)
                  , a = o + Math.floor((s - o) / r.params.slidesPerGroup)
                  , l = r.rtlTranslate ? r.translate : -r.translate;
                if (l >= r.snapGrid[a]) {
                    const e = r.snapGrid[a];
                    l - e > (r.snapGrid[a + 1] - e) * i && (s += r.params.slidesPerGroup)
                } else {
                    const e = r.snapGrid[a - 1];
                    l - e <= (r.snapGrid[a] - e) * i && (s -= r.params.slidesPerGroup)
                }
                return s = Math.max(s, 0),
                s = Math.min(s, r.slidesGrid.length - 1),
                r.slideTo(s, e, t, n)
            },
            slideToClickedSlide: function() {
                const e = this
                  , {params: t, $wrapperEl: n} = e
                  , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
                let r, s = e.clickedIndex;
                if (t.loop) {
                    if (e.animating)
                        return;
                    r = parseInt(c(e.clickedSlide).attr("data-swiper-slide-index"), 10),
                    t.centeredSlides ? s < e.loopedSlides - i / 2 || s > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                    s = n.children(`.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),
                    u( () => {
                        e.slideTo(s)
                    }
                    )) : e.slideTo(s) : s > e.slides.length - i ? (e.loopFix(),
                    s = n.children(`.${t.slideClass}[data-swiper-slide-index="${r}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),
                    u( () => {
                        e.slideTo(s)
                    }
                    )) : e.slideTo(s)
                } else
                    e.slideTo(s)
            }
        },
        loop: {
            loopCreate: function() {
                const e = this
                  , t = i()
                  , {params: n, $wrapperEl: r} = e
                  , s = r.children().length > 0 ? c(r.children()[0].parentNode) : r;
                s.children(`.${n.slideClass}.${n.slideDuplicateClass}`).remove();
                let o = s.children("." + n.slideClass);
                if (n.loopFillGroupWithBlank) {
                    const e = n.slidesPerGroup - o.length % n.slidesPerGroup;
                    if (e !== n.slidesPerGroup) {
                        for (let i = 0; i < e; i += 1) {
                            const e = c(t.createElement("div")).addClass(`${n.slideClass} ${n.slideBlankClass}`);
                            s.append(e)
                        }
                        o = s.children("." + n.slideClass)
                    }
                }
                "auto" !== n.slidesPerView || n.loopedSlides || (n.loopedSlides = o.length),
                e.loopedSlides = Math.ceil(parseFloat(n.loopedSlides || n.slidesPerView, 10)),
                e.loopedSlides += n.loopAdditionalSlides,
                e.loopedSlides > o.length && e.params.loopedSlidesLimit && (e.loopedSlides = o.length);
                const a = []
                  , l = [];
                o.each( (e, t) => {
                    c(e).attr("data-swiper-slide-index", t)
                }
                );
                for (let t = 0; t < e.loopedSlides; t += 1) {
                    const e = t - Math.floor(t / o.length) * o.length;
                    l.push(o.eq(e)[0]),
                    a.unshift(o.eq(o.length - e - 1)[0])
                }
                for (let e = 0; e < l.length; e += 1)
                    s.append(c(l[e].cloneNode(!0)).addClass(n.slideDuplicateClass));
                for (let e = a.length - 1; e >= 0; e -= 1)
                    s.prepend(c(a[e].cloneNode(!0)).addClass(n.slideDuplicateClass))
            },
            loopFix: function() {
                const e = this;
                e.emit("beforeLoopFix");
                const {activeIndex: t, slides: n, loopedSlides: i, allowSlidePrev: r, allowSlideNext: s, snapGrid: o, rtlTranslate: a} = e;
                let l;
                e.allowSlidePrev = !0,
                e.allowSlideNext = !0;
                const c = -o[t] - e.getTranslate();
                t < i ? (l = n.length - 3 * i + t,
                l += i,
                e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((a ? -e.translate : e.translate) - c)) : t >= n.length - i && (l = -n.length + t + i,
                l += i,
                e.slideTo(l, 0, !1, !0) && 0 !== c && e.setTranslate((a ? -e.translate : e.translate) - c)),
                e.allowSlidePrev = r,
                e.allowSlideNext = s,
                e.emit("loopFix")
            },
            loopDestroy: function() {
                const {$wrapperEl: e, params: t, slides: n} = this;
                e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
                n.removeAttr("data-swiper-slide-index")
            }
        },
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                    return;
                const n = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                n.style.cursor = "move",
                n.style.cursor = e ? "grabbing" : "grab"
            },
            unsetGrabCursor: function() {
                const e = this;
                e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
            }
        },
        events: {
            attachEvents: function() {
                const e = this
                  , t = i()
                  , {params: n, support: r} = e;
                e.onTouchStart = C.bind(e),
                e.onTouchMove = A.bind(e),
                e.onTouchEnd = M.bind(e),
                n.cssMode && (e.onScroll = P.bind(e)),
                e.onClick = O.bind(e),
                r.touch && !L && (t.addEventListener("touchstart", I),
                L = !0),
                $(e, "on")
            },
            detachEvents: function() {
                $(this, "off")
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                const e = this
                  , {activeIndex: t, initialized: n, loopedSlides: i=0, params: r, $el: s} = e
                  , o = r.breakpoints;
                if (!o || o && 0 === Object.keys(o).length)
                    return;
                const a = e.getBreakpoint(o, e.params.breakpointsBase, e.el);
                if (!a || e.currentBreakpoint === a)
                    return;
                const l = (a in o ? o[a] : void 0) || e.originalParams
                  , c = z(e, r)
                  , d = z(e, l)
                  , u = r.enabled;
                c && !d ? (s.removeClass(`${r.containerModifierClass}grid ${r.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !c && d && (s.addClass(r.containerModifierClass + "grid"),
                (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === r.grid.fill) && s.addClass(r.containerModifierClass + "grid-column"),
                e.emitContainerClasses()),
                ["navigation", "pagination", "scrollbar"].forEach(t => {
                    const n = r[t] && r[t].enabled
                      , i = l[t] && l[t].enabled;
                    n && !i && e[t].disable(),
                    !n && i && e[t].enable()
                }
                );
                const p = l.direction && l.direction !== r.direction
                  , f = r.loop && (l.slidesPerView !== r.slidesPerView || p);
                p && n && e.changeDirection(),
                g(e.params, l);
                const h = e.params.enabled;
                Object.assign(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev
                }),
                u && !h ? e.disable() : !u && h && e.enable(),
                e.currentBreakpoint = a,
                e.emit("_beforeBreakpoint", l),
                f && n && (e.loopDestroy(),
                e.loopCreate(),
                e.updateSlides(),
                e.slideTo(t - i + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", l)
            },
            getBreakpoint: function(e, t, n) {
                if (void 0 === t && (t = "window"),
                !e || "container" === t && !n)
                    return;
                let i = !1;
                const r = s()
                  , o = "window" === t ? r.innerHeight : n.clientHeight
                  , a = Object.keys(e).map(e => {
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: o * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
                );
                a.sort( (e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
                for (let e = 0; e < a.length; e += 1) {
                    const {point: s, value: o} = a[e];
                    "window" === t ? r.matchMedia(`(min-width: ${o}px)`).matches && (i = s) : o <= n.clientWidth && (i = s)
                }
                return i || "max"
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                const e = this
                  , {isLocked: t, params: n} = e
                  , {slidesOffsetBefore: i} = n;
                if (i) {
                    const t = e.slides.length - 1
                      , n = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                    e.isLocked = e.size > n
                } else
                    e.isLocked = 1 === e.snapGrid.length;
                !0 === n.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === n.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                const e = this
                  , {classNames: t, params: n, rtl: i, $el: r, device: s, support: o} = e
                  , a = function(e, t) {
                    const n = [];
                    return e.forEach(e => {
                        "object" == typeof e ? Object.keys(e).forEach(i => {
                            e[i] && n.push(t + i)
                        }
                        ) : "string" == typeof e && n.push(t + e)
                    }
                    ),
                    n
                }(["initialized", n.direction, {
                    "pointer-events": !o.touch
                }, {
                    "free-mode": e.params.freeMode && n.freeMode.enabled
                }, {
                    autoheight: n.autoHeight
                }, {
                    rtl: i
                }, {
                    grid: n.grid && n.grid.rows > 1
                }, {
                    "grid-column": n.grid && n.grid.rows > 1 && "column" === n.grid.fill
                }, {
                    android: s.android
                }, {
                    ios: s.ios
                }, {
                    "css-mode": n.cssMode
                }, {
                    centered: n.cssMode && n.centeredSlides
                }, {
                    "watch-progress": n.watchSlidesProgress
                }], n.containerModifierClass);
                t.push(...a),
                r.addClass([...t].join(" ")),
                e.emitContainerClasses()
            },
            removeClasses: function() {
                const {$el: e, classNames: t} = this;
                e.removeClass(t.join(" ")),
                this.emitContainerClasses()
            }
        },
        images: {
            loadImage: function(e, t, n, i, r, o) {
                const a = s();
                let l;
                function d() {
                    o && o()
                }
                c(e).parent("picture")[0] || e.complete && r ? d() : t ? (l = new a.Image,
                l.onload = d,
                l.onerror = d,
                i && (l.sizes = i),
                n && (l.srcset = n),
                t && (l.src = t)) : d()
            },
            preloadImages: function() {
                const e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (let n = 0; n < e.imagesToLoad.length; n += 1) {
                    const i = e.imagesToLoad[n];
                    e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , H = {};
    class F {
        constructor() {
            let e, t;
            for (var n = arguments.length, i = new Array(n), r = 0; r < n; r++)
                i[r] = arguments[r];
            if (1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? t = i[0] : [e,t] = i,
            t || (t = {}),
            t = g({}, t),
            e && !t.el && (t.el = e),
            t.el && c(t.el).length > 1) {
                const e = [];
                return c(t.el).each(n => {
                    const i = g({}, t, {
                        el: n
                    });
                    e.push(new F(i))
                }
                ),
                e
            }
            const s = this;
            s.__swiper__ = !0,
            s.support = E(),
            s.device = _({
                userAgent: t.userAgent
            }),
            s.browser = S(),
            s.eventsListeners = {},
            s.eventsAnyListeners = [],
            s.modules = [...s.__modules__],
            t.modules && Array.isArray(t.modules) && s.modules.push(...t.modules);
            const o = {};
            s.modules.forEach(e => {
                e({
                    swiper: s,
                    extendParams: j(t, o),
                    on: s.on.bind(s),
                    once: s.once.bind(s),
                    off: s.off.bind(s),
                    emit: s.emit.bind(s)
                })
            }
            );
            const a = g({}, D, o);
            return s.params = g({}, a, H, t),
            s.originalParams = g({}, s.params),
            s.passedParams = g({}, t),
            s.params && s.params.on && Object.keys(s.params.on).forEach(e => {
                s.on(e, s.params.on[e])
            }
            ),
            s.params && s.params.onAny && s.onAny(s.params.onAny),
            s.$ = c,
            Object.assign(s, {
                enabled: s.params.enabled,
                el: e,
                classNames: [],
                slides: c(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === s.params.direction,
                isVertical: () => "vertical" === s.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: s.params.allowSlideNext,
                allowSlidePrev: s.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"]
                      , t = ["pointerdown", "pointermove", "pointerup"];
                    return s.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2],
                        cancel: e[3]
                    },
                    s.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    },
                    s.support.touch || !s.params.simulateTouch ? s.touchEventsTouch : s.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: s.params.focusableElements,
                    lastClickTime: p(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: s.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            s.emit("_swiper"),
            s.params.init && s.init(),
            s
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        setProgress(e, t) {
            const n = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = n.minTranslate()
              , r = (n.maxTranslate() - i) * e + i;
            n.translateTo(r, void 0 === t ? 0 : t),
            n.updateActiveIndex(),
            n.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = [];
            e.slides.each(n => {
                const i = e.getSlideClasses(n);
                t.push({
                    slideEl: n,
                    classNames: i
                }),
                e.emit("_slideClass", n, i)
            }
            ),
            e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
            const {params: n, slides: i, slidesGrid: r, slidesSizesGrid: s, size: o, activeIndex: a} = this;
            let l = 1;
            if (n.centeredSlides) {
                let e, t = i[a].swiperSlideSize;
                for (let n = a + 1; n < i.length; n += 1)
                    i[n] && !e && (t += i[n].swiperSlideSize,
                    l += 1,
                    t > o && (e = !0));
                for (let n = a - 1; n >= 0; n -= 1)
                    i[n] && !e && (t += i[n].swiperSlideSize,
                    l += 1,
                    t > o && (e = !0))
            } else if ("current" === e)
                for (let e = a + 1; e < i.length; e += 1)
                    (t ? r[e] + s[e] - r[a] < o : r[e] - r[a] < o) && (l += 1);
            else
                for (let e = a - 1; e >= 0; e -= 1)
                    r[a] - r[e] < o && (l += 1);
            return l
        }
        update() {
            const e = this;
            if (!e || e.destroyed)
                return;
            const {snapGrid: t, params: n} = e;
            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(n),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            let r;
            n.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled ? (i(),
            e.params.autoHeight && e.updateAutoHeight()) : (r = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
            r || i()),
            n.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const n = this
              , i = n.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (n.$el.removeClass(`${n.params.containerModifierClass}${i}`).addClass(`${n.params.containerModifierClass}${e}`),
            n.emitContainerClasses(),
            n.params.direction = e,
            n.slides.each(t => {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }
            ),
            n.emit("changeDirection"),
            t && n.update()),
            n
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"),
            t.el.dir = "rtl") : (t.$el.removeClass(t.params.containerModifierClass + "rtl"),
            t.el.dir = "ltr"),
            t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted)
                return !0;
            const n = c(e || t.params.el);
            if (!(e = n[0]))
                return !1;
            e.swiper = t;
            const r = () => "." + (t.params.wrapperClass || "").trim().split(" ").join(".");
            let s = ( () => {
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = c(e.shadowRoot.querySelector(r()));
                    return t.children = e => n.children(e),
                    t
                }
                return n.children ? n.children(r()) : c(n).children(r())
            }
            )();
            if (0 === s.length && t.params.createElements) {
                const e = i().createElement("div");
                s = c(e),
                e.className = t.params.wrapperClass,
                n.append(e),
                n.children("." + t.params.slideClass).each(e => {
                    s.append(e)
                }
                )
            }
            return Object.assign(t, {
                $el: n,
                el: e,
                $wrapperEl: s,
                wrapperEl: s[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === n.css("direction")),
                wrongRTL: "-webkit-box" === s.css("display")
            }),
            !0
        }
        init(e) {
            const t = this;
            return t.initialized || !1 === t.mount(e) || (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.attachEvents(),
            t.initialized = !0,
            t.emit("init"),
            t.emit("afterInit")),
            t
        }
        destroy(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            const n = this
              , {params: i, $el: r, $wrapperEl: s, slides: o} = n;
            return void 0 === n.params || n.destroyed || (n.emit("beforeDestroy"),
            n.initialized = !1,
            n.detachEvents(),
            i.loop && n.loopDestroy(),
            t && (n.removeClasses(),
            r.removeAttr("style"),
            s.removeAttr("style"),
            o && o.length && o.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
            n.emit("destroy"),
            Object.keys(n.eventsListeners).forEach(e => {
                n.off(e)
            }
            ),
            !1 !== e && (n.$el[0].swiper = null,
            function(e) {
                const t = e;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                }
                )
            }(n)),
            n.destroyed = !0),
            null
        }
        static extendDefaults(e) {
            g(H, e)
        }
        static get extendedDefaults() {
            return H
        }
        static get defaults() {
            return D
        }
        static installModule(e) {
            F.prototype.__modules__ || (F.prototype.__modules__ = []);
            const t = F.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach(e => F.installModule(e)),
            F) : (F.installModule(e),
            F)
        }
    }
    function R(e, t, n, r) {
        const s = i();
        return e.params.createElements && Object.keys(r).forEach(i => {
            if (!n[i] && !0 === n.auto) {
                let o = e.$el.children("." + r[i])[0];
                o || (o = s.createElement("div"),
                o.className = r[i],
                e.$el.append(o)),
                n[i] = o,
                t[i] = o
            }
        }
        ),
        n
    }
    function W(e) {
        return void 0 === e && (e = ""),
        "." + e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")
    }
    function B(e) {
        const t = this
          , {$wrapperEl: n, params: i} = t;
        if (i.loop && t.loopDestroy(),
        "object" == typeof e && "length"in e)
            for (let t = 0; t < e.length; t += 1)
                e[t] && n.append(e[t]);
        else
            n.append(e);
        i.loop && t.loopCreate(),
        i.observer || t.update()
    }
    function q(e) {
        const t = this
          , {params: n, $wrapperEl: i, activeIndex: r} = t;
        n.loop && t.loopDestroy();
        let s = r + 1;
        if ("object" == typeof e && "length"in e) {
            for (let t = 0; t < e.length; t += 1)
                e[t] && i.prepend(e[t]);
            s = r + e.length
        } else
            i.prepend(e);
        n.loop && t.loopCreate(),
        n.observer || t.update(),
        t.slideTo(s, 0, !1)
    }
    function V(e, t) {
        const n = this
          , {$wrapperEl: i, params: r, activeIndex: s} = n;
        let o = s;
        r.loop && (o -= n.loopedSlides,
        n.loopDestroy(),
        n.slides = i.children("." + r.slideClass));
        const a = n.slides.length;
        if (e <= 0)
            return void n.prependSlide(t);
        if (e >= a)
            return void n.appendSlide(t);
        let l = o > e ? o + 1 : o;
        const c = [];
        for (let t = a - 1; t >= e; t -= 1) {
            const e = n.slides.eq(t);
            e.remove(),
            c.unshift(e)
        }
        if ("object" == typeof t && "length"in t) {
            for (let e = 0; e < t.length; e += 1)
                t[e] && i.append(t[e]);
            l = o > e ? o + t.length : o
        } else
            i.append(t);
        for (let e = 0; e < c.length; e += 1)
            i.append(c[e]);
        r.loop && n.loopCreate(),
        r.observer || n.update(),
        r.loop ? n.slideTo(l + n.loopedSlides, 0, !1) : n.slideTo(l, 0, !1)
    }
    function X(e) {
        const t = this
          , {params: n, $wrapperEl: i, activeIndex: r} = t;
        let s = r;
        n.loop && (s -= t.loopedSlides,
        t.loopDestroy(),
        t.slides = i.children("." + n.slideClass));
        let o, a = s;
        if ("object" == typeof e && "length"in e) {
            for (let n = 0; n < e.length; n += 1)
                o = e[n],
                t.slides[o] && t.slides.eq(o).remove(),
                o < a && (a -= 1);
            a = Math.max(a, 0)
        } else
            o = e,
            t.slides[o] && t.slides.eq(o).remove(),
            o < a && (a -= 1),
            a = Math.max(a, 0);
        n.loop && t.loopCreate(),
        n.observer || t.update(),
        n.loop ? t.slideTo(a + t.loopedSlides, 0, !1) : t.slideTo(a, 0, !1)
    }
    function G() {
        const e = this
          , t = [];
        for (let n = 0; n < e.slides.length; n += 1)
            t.push(n);
        e.removeSlide(t)
    }
    function Y(e) {
        const {effect: t, swiper: n, on: i, setTranslate: r, setTransition: s, overwriteParams: o, perspective: a, recreateShadows: l, getEffectParams: c} = e;
        let d;
        i("beforeInit", () => {
            if (n.params.effect !== t)
                return;
            n.classNames.push(`${n.params.containerModifierClass}${t}`),
            a && a() && n.classNames.push(n.params.containerModifierClass + "3d");
            const e = o ? o() : {};
            Object.assign(n.params, e),
            Object.assign(n.originalParams, e)
        }
        ),
        i("setTranslate", () => {
            n.params.effect === t && r()
        }
        ),
        i("setTransition", (e, i) => {
            n.params.effect === t && s(i)
        }
        ),
        i("transitionEnd", () => {
            if (n.params.effect === t && l) {
                if (!c || !c().slideShadows)
                    return;
                n.slides.each(e => {
                    n.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove()
                }
                ),
                l()
            }
        }
        ),
        i("virtualUpdate", () => {
            n.params.effect === t && (n.slides.length || (d = !0),
            requestAnimationFrame( () => {
                d && n.slides && n.slides.length && (r(),
                d = !1)
            }
            ))
        }
        )
    }
    function U(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }) : t
    }
    function K(e) {
        let {swiper: t, duration: n, transformEl: i, allSlides: r} = e;
        const {slides: s, activeIndex: o, $wrapperEl: a} = t;
        if (t.params.virtualTranslate && 0 !== n) {
            let e, n = !1;
            e = r ? i ? s.find(i) : s : i ? s.eq(o).find(i) : s.eq(o),
            e.transitionEnd( () => {
                if (n)
                    return;
                if (!t || t.destroyed)
                    return;
                n = !0,
                t.animating = !1;
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1)
                    a.trigger(e[t])
            }
            )
        }
    }
    function Q(e, t, n) {
        const i = "swiper-slide-shadow" + (n ? "-" + n : "")
          , r = e.transformEl ? t.find(e.transformEl) : t;
        let s = r.children("." + i);
        return s.length || (s = c(`<div class="swiper-slide-shadow${n ? "-" + n : ""}"></div>`),
        r.append(s)),
        s
    }
    Object.keys(N).forEach(e => {
        Object.keys(N[e]).forEach(t => {
            F.prototype[t] = N[e][t]
        }
        )
    }
    ),
    F.use([function(e) {
        let {swiper: t, on: n, emit: i} = e;
        const r = s();
        let o = null
          , a = null;
        const l = () => {
            t && !t.destroyed && t.initialized && (i("beforeResize"),
            i("resize"))
        }
          , c = () => {
            t && !t.destroyed && t.initialized && i("orientationchange")
        }
        ;
        n("init", () => {
            t.params.resizeObserver && void 0 !== r.ResizeObserver ? t && !t.destroyed && t.initialized && (o = new ResizeObserver(e => {
                a = r.requestAnimationFrame( () => {
                    const {width: n, height: i} = t;
                    let r = n
                      , s = i;
                    e.forEach(e => {
                        let {contentBoxSize: n, contentRect: i, target: o} = e;
                        o && o !== t.el || (r = i ? i.width : (n[0] || n).inlineSize,
                        s = i ? i.height : (n[0] || n).blockSize)
                    }
                    ),
                    r === n && s === i || l()
                }
                )
            }
            ),
            o.observe(t.el)) : (r.addEventListener("resize", l),
            r.addEventListener("orientationchange", c))
        }
        ),
        n("destroy", () => {
            a && r.cancelAnimationFrame(a),
            o && o.unobserve && t.el && (o.unobserve(t.el),
            o = null),
            r.removeEventListener("resize", l),
            r.removeEventListener("orientationchange", c)
        }
        )
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        const o = []
          , a = s()
          , l = function(e, t) {
            void 0 === t && (t = {});
            const n = new (a.MutationObserver || a.WebkitMutationObserver)(e => {
                if (1 === e.length)
                    return void r("observerUpdate", e[0]);
                const t = function() {
                    r("observerUpdate", e[0])
                };
                a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
            }
            );
            n.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            o.push(n)
        };
        n({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }),
        i("init", () => {
            if (t.params.observer) {
                if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1)
                        l(e[t])
                }
                l(t.$el[0], {
                    childList: t.params.observeSlideChildren
                }),
                l(t.$wrapperEl[0], {
                    attributes: !1
                })
            }
        }
        ),
        i("destroy", () => {
            o.forEach(e => {
                e.disconnect()
            }
            ),
            o.splice(0, o.length)
        }
        )
    }
    ]);
    const Z = [function(e) {
        let t, {swiper: n, extendParams: i, on: r, emit: s} = e;
        function o(e, t) {
            const i = n.params.virtual;
            if (i.cache && n.virtual.cache[t])
                return n.virtual.cache[t];
            const r = i.renderSlide ? c(i.renderSlide.call(n, e, t)) : c(`<div class="${n.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
            return r.attr("data-swiper-slide-index") || r.attr("data-swiper-slide-index", t),
            i.cache && (n.virtual.cache[t] = r),
            r
        }
        function a(e) {
            const {slidesPerView: t, slidesPerGroup: i, centeredSlides: r} = n.params
              , {addSlidesBefore: a, addSlidesAfter: l} = n.params.virtual
              , {from: c, to: d, slides: u, slidesGrid: p, offset: f} = n.virtual;
            n.params.cssMode || n.updateActiveIndex();
            const h = n.activeIndex || 0;
            let m, g, v;
            m = n.rtlTranslate ? "right" : n.isHorizontal() ? "left" : "top",
            r ? (g = Math.floor(t / 2) + i + l,
            v = Math.floor(t / 2) + i + a) : (g = t + (i - 1) + l,
            v = i + a);
            const b = Math.max((h || 0) - v, 0)
              , y = Math.min((h || 0) + g, u.length - 1)
              , w = (n.slidesGrid[b] || 0) - (n.slidesGrid[0] || 0);
            function x() {
                n.updateSlides(),
                n.updateProgress(),
                n.updateSlidesClasses(),
                n.lazy && n.params.lazy.enabled && n.lazy.load(),
                s("virtualUpdate")
            }
            if (Object.assign(n.virtual, {
                from: b,
                to: y,
                offset: w,
                slidesGrid: n.slidesGrid
            }),
            c === b && d === y && !e)
                return n.slidesGrid !== p && w !== f && n.slides.css(m, w + "px"),
                n.updateProgress(),
                void s("virtualUpdate");
            if (n.params.virtual.renderExternal)
                return n.params.virtual.renderExternal.call(n, {
                    offset: w,
                    from: b,
                    to: y,
                    slides: function() {
                        const e = [];
                        for (let t = b; t <= y; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                void (n.params.virtual.renderExternalUpdate ? x() : s("virtualUpdate"));
            const E = []
              , _ = [];
            if (e)
                n.$wrapperEl.find("." + n.params.slideClass).remove();
            else
                for (let e = c; e <= d; e += 1)
                    (e < b || e > y) && n.$wrapperEl.find(`.${n.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < u.length; t += 1)
                t >= b && t <= y && (void 0 === d || e ? _.push(t) : (t > d && _.push(t),
                t < c && E.push(t)));
            _.forEach(e => {
                n.$wrapperEl.append(o(u[e], e))
            }
            ),
            E.sort( (e, t) => t - e).forEach(e => {
                n.$wrapperEl.prepend(o(u[e], e))
            }
            ),
            n.$wrapperEl.children(".swiper-slide").css(m, w + "px"),
            x()
        }
        i({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        }),
        n.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        },
        r("beforeInit", () => {
            n.params.virtual.enabled && (n.virtual.slides = n.params.virtual.slides,
            n.classNames.push(n.params.containerModifierClass + "virtual"),
            n.params.watchSlidesProgress = !0,
            n.originalParams.watchSlidesProgress = !0,
            n.params.initialSlide || a())
        }
        ),
        r("setTranslate", () => {
            n.params.virtual.enabled && (n.params.cssMode && !n._immediateVirtual ? (clearTimeout(t),
            t = setTimeout( () => {
                a()
            }
            , 100)) : a())
        }
        ),
        r("init update resize", () => {
            n.params.virtual.enabled && n.params.cssMode && v(n.wrapperEl, "--swiper-virtual-size", n.virtualSize + "px")
        }
        ),
        Object.assign(n.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length"in e)
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && n.virtual.slides.push(e[t]);
                else
                    n.virtual.slides.push(e);
                a(!0)
            },
            prependSlide: function(e) {
                const t = n.activeIndex;
                let i = t + 1
                  , r = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && n.virtual.slides.unshift(e[t]);
                    i = t + e.length,
                    r = e.length
                } else
                    n.virtual.slides.unshift(e);
                if (n.params.virtual.cache) {
                    const e = n.virtual.cache
                      , t = {};
                    Object.keys(e).forEach(n => {
                        const i = e[n]
                          , s = i.attr("data-swiper-slide-index");
                        s && i.attr("data-swiper-slide-index", parseInt(s, 10) + r),
                        t[parseInt(n, 10) + r] = i
                    }
                    ),
                    n.virtual.cache = t
                }
                a(!0),
                n.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null == e)
                    return;
                let t = n.activeIndex;
                if (Array.isArray(e))
                    for (let i = e.length - 1; i >= 0; i -= 1)
                        n.virtual.slides.splice(e[i], 1),
                        n.params.virtual.cache && delete n.virtual.cache[e[i]],
                        e[i] < t && (t -= 1),
                        t = Math.max(t, 0);
                else
                    n.virtual.slides.splice(e, 1),
                    n.params.virtual.cache && delete n.virtual.cache[e],
                    e < t && (t -= 1),
                    t = Math.max(t, 0);
                a(!0),
                n.slideTo(t, 0)
            },
            removeAllSlides: function() {
                n.virtual.slides = [],
                n.params.virtual.cache && (n.virtual.cache = {}),
                a(!0),
                n.slideTo(0, 0)
            },
            update: a
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: r, emit: o} = e;
        const a = i()
          , l = s();
        function d(e) {
            if (!t.enabled)
                return;
            const {rtlTranslate: n} = t;
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const r = i.keyCode || i.charCode
              , s = t.params.keyboard.pageUpDown
              , c = s && 33 === r
              , d = s && 34 === r
              , u = 37 === r
              , p = 39 === r
              , f = 38 === r
              , h = 40 === r;
            if (!t.allowSlideNext && (t.isHorizontal() && p || t.isVertical() && h || d))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && u || t.isVertical() && f || c))
                return !1;
            if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || a.activeElement && a.activeElement.nodeName && ("input" === a.activeElement.nodeName.toLowerCase() || "textarea" === a.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (c || d || u || p || f || h)) {
                    let e = !1;
                    if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length)
                        return;
                    const i = t.$el
                      , r = i[0].clientWidth
                      , s = i[0].clientHeight
                      , o = l.innerWidth
                      , a = l.innerHeight
                      , c = t.$el.offset();
                    n && (c.left -= t.$el[0].scrollLeft);
                    const d = [[c.left, c.top], [c.left + r, c.top], [c.left, c.top + s], [c.left + r, c.top + s]];
                    for (let t = 0; t < d.length; t += 1) {
                        const n = d[t];
                        if (n[0] >= 0 && n[0] <= o && n[1] >= 0 && n[1] <= a) {
                            if (0 === n[0] && 0 === n[1])
                                continue;
                            e = !0
                        }
                    }
                    if (!e)
                        return
                }
                t.isHorizontal() ? ((c || d || u || p) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                ((d || p) && !n || (c || u) && n) && t.slideNext(),
                ((c || u) && !n || (d || p) && n) && t.slidePrev()) : ((c || d || f || h) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                (d || h) && t.slideNext(),
                (c || f) && t.slidePrev()),
                o("keyPress", r)
            }
        }
        function u() {
            t.keyboard.enabled || (c(a).on("keydown", d),
            t.keyboard.enabled = !0)
        }
        function p() {
            t.keyboard.enabled && (c(a).off("keydown", d),
            t.keyboard.enabled = !1)
        }
        t.keyboard = {
            enabled: !1
        },
        n({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }),
        r("init", () => {
            t.params.keyboard.enabled && u()
        }
        ),
        r("destroy", () => {
            t.keyboard.enabled && p()
        }
        ),
        Object.assign(t.keyboard, {
            enable: u,
            disable: p
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        const o = s();
        let a;
        n({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        }),
        t.mousewheel = {
            enabled: !1
        };
        let l, d = p();
        const f = [];
        function h() {
            t.enabled && (t.mouseEntered = !0)
        }
        function m() {
            t.enabled && (t.mouseEntered = !1)
        }
        function g(e) {
            return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta || t.params.mousewheel.thresholdTime && p() - d < t.params.mousewheel.thresholdTime || !(e.delta >= 6 && p() - d < 60) && (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(),
            r("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(),
            r("scroll", e.raw)),
            d = (new o.Date).getTime(),
            1))
        }
        function v(e) {
            let n = e
              , i = !0;
            if (!t.enabled)
                return;
            const s = t.params.mousewheel;
            t.params.cssMode && n.preventDefault();
            let o = t.$el;
            if ("container" !== t.params.mousewheel.eventsTarget && (o = c(t.params.mousewheel.eventsTarget)),
            !t.mouseEntered && !o[0].contains(n.target) && !s.releaseOnEdges)
                return !0;
            n.originalEvent && (n = n.originalEvent);
            let d = 0;
            const h = t.rtlTranslate ? -1 : 1
              , m = function(e) {
                let t = 0
                  , n = 0
                  , i = 0
                  , r = 0;
                return "detail"in e && (n = e.detail),
                "wheelDelta"in e && (n = -e.wheelDelta / 120),
                "wheelDeltaY"in e && (n = -e.wheelDeltaY / 120),
                "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
                "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = n,
                n = 0),
                i = 10 * t,
                r = 10 * n,
                "deltaY"in e && (r = e.deltaY),
                "deltaX"in e && (i = e.deltaX),
                e.shiftKey && !i && (i = r,
                r = 0),
                (i || r) && e.deltaMode && (1 === e.deltaMode ? (i *= 40,
                r *= 40) : (i *= 800,
                r *= 800)),
                i && !t && (t = i < 1 ? -1 : 1),
                r && !n && (n = r < 1 ? -1 : 1),
                {
                    spinX: t,
                    spinY: n,
                    pixelX: i,
                    pixelY: r
                }
            }(n);
            if (s.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(m.pixelX) > Math.abs(m.pixelY)))
                        return !0;
                    d = -m.pixelX * h
                } else {
                    if (!(Math.abs(m.pixelY) > Math.abs(m.pixelX)))
                        return !0;
                    d = -m.pixelY
                }
            else
                d = Math.abs(m.pixelX) > Math.abs(m.pixelY) ? -m.pixelX * h : -m.pixelY;
            if (0 === d)
                return !0;
            s.invert && (d = -d);
            let v = t.getTranslate() + d * s.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()),
            v <= t.maxTranslate() && (v = t.maxTranslate()),
            i = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()),
            i && t.params.nested && n.stopPropagation(),
            t.params.freeMode && t.params.freeMode.enabled) {
                const e = {
                    time: p(),
                    delta: Math.abs(d),
                    direction: Math.sign(d)
                }
                  , i = l && e.time < l.time + 500 && e.delta <= l.delta && e.direction === l.direction;
                if (!i) {
                    l = void 0,
                    t.params.loop && t.loopFix();
                    let o = t.getTranslate() + d * s.sensitivity;
                    const c = t.isBeginning
                      , p = t.isEnd;
                    if (o >= t.minTranslate() && (o = t.minTranslate()),
                    o <= t.maxTranslate() && (o = t.maxTranslate()),
                    t.setTransition(0),
                    t.setTranslate(o),
                    t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses(),
                    (!c && t.isBeginning || !p && t.isEnd) && t.updateSlidesClasses(),
                    t.params.freeMode.sticky) {
                        clearTimeout(a),
                        a = void 0,
                        f.length >= 15 && f.shift();
                        const n = f.length ? f[f.length - 1] : void 0
                          , i = f[0];
                        if (f.push(e),
                        n && (e.delta > n.delta || e.direction !== n.direction))
                            f.splice(0);
                        else if (f.length >= 15 && e.time - i.time < 500 && i.delta - e.delta >= 1 && e.delta <= 6) {
                            const n = d > 0 ? .8 : .2;
                            l = e,
                            f.splice(0),
                            a = u( () => {
                                t.slideToClosest(t.params.speed, !0, void 0, n)
                            }
                            , 0)
                        }
                        a || (a = u( () => {
                            l = e,
                            f.splice(0),
                            t.slideToClosest(t.params.speed, !0, void 0, .5)
                        }
                        , 500))
                    }
                    if (i || r("scroll", n),
                    t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(),
                    o === t.minTranslate() || o === t.maxTranslate())
                        return !0
                }
            } else {
                const n = {
                    time: p(),
                    delta: Math.abs(d),
                    direction: Math.sign(d),
                    raw: e
                };
                f.length >= 2 && f.shift();
                const i = f.length ? f[f.length - 1] : void 0;
                if (f.push(n),
                i ? (n.direction !== i.direction || n.delta > i.delta || n.time > i.time + 150) && g(n) : g(n),
                function(e) {
                    const n = t.params.mousewheel;
                    if (e.direction < 0) {
                        if (t.isEnd && !t.params.loop && n.releaseOnEdges)
                            return !0
                    } else if (t.isBeginning && !t.params.loop && n.releaseOnEdges)
                        return !0;
                    return !1
                }(n))
                    return !0
            }
            return n.preventDefault ? n.preventDefault() : n.returnValue = !1,
            !1
        }
        function b(e) {
            let n = t.$el;
            "container" !== t.params.mousewheel.eventsTarget && (n = c(t.params.mousewheel.eventsTarget)),
            n[e]("mouseenter", h),
            n[e]("mouseleave", m),
            n[e]("wheel", v)
        }
        function y() {
            return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v),
            !0) : !t.mousewheel.enabled && (b("on"),
            t.mousewheel.enabled = !0,
            !0)
        }
        function w() {
            return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v),
            !0) : !!t.mousewheel.enabled && (b("off"),
            t.mousewheel.enabled = !1,
            !0)
        }
        i("init", () => {
            !t.params.mousewheel.enabled && t.params.cssMode && w(),
            t.params.mousewheel.enabled && y()
        }
        ),
        i("destroy", () => {
            t.params.cssMode && y(),
            t.mousewheel.enabled && w()
        }
        ),
        Object.assign(t.mousewheel, {
            enable: y,
            disable: w
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        function s(e) {
            let n;
            return e && (n = c(e),
            t.params.uniqueNavElements && "string" == typeof e && n.length > 1 && 1 === t.$el.find(e).length && (n = t.$el.find(e))),
            n
        }
        function o(e, n) {
            const i = t.params.navigation;
            e && e.length > 0 && (e[n ? "addClass" : "removeClass"](i.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = n),
            t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](i.lockClass))
        }
        function a() {
            if (t.params.loop)
                return;
            const {$nextEl: e, $prevEl: n} = t.navigation;
            o(n, t.isBeginning && !t.params.rewind),
            o(e, t.isEnd && !t.params.rewind)
        }
        function l(e) {
            e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(),
            r("navigationPrev"))
        }
        function d(e) {
            e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(),
            r("navigationNext"))
        }
        function u() {
            const e = t.params.navigation;
            if (t.params.navigation = R(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }),
            !e.nextEl && !e.prevEl)
                return;
            const n = s(e.nextEl)
              , i = s(e.prevEl);
            n && n.length > 0 && n.on("click", d),
            i && i.length > 0 && i.on("click", l),
            Object.assign(t.navigation, {
                $nextEl: n,
                nextEl: n && n[0],
                $prevEl: i,
                prevEl: i && i[0]
            }),
            t.enabled || (n && n.addClass(e.lockClass),
            i && i.addClass(e.lockClass))
        }
        function p() {
            const {$nextEl: e, $prevEl: n} = t.navigation;
            e && e.length && (e.off("click", d),
            e.removeClass(t.params.navigation.disabledClass)),
            n && n.length && (n.off("click", l),
            n.removeClass(t.params.navigation.disabledClass))
        }
        n({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }),
        t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        },
        i("init", () => {
            !1 === t.params.navigation.enabled ? f() : (u(),
            a())
        }
        ),
        i("toEdge fromEdge lock unlock", () => {
            a()
        }
        ),
        i("destroy", () => {
            p()
        }
        ),
        i("enable disable", () => {
            const {$nextEl: e, $prevEl: n} = t.navigation;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass),
            n && n[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass)
        }
        ),
        i("click", (e, n) => {
            const {$nextEl: i, $prevEl: s} = t.navigation
              , o = n.target;
            if (t.params.navigation.hideOnClick && !c(o).is(s) && !c(o).is(i)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === o || t.pagination.el.contains(o)))
                    return;
                let e;
                i ? e = i.hasClass(t.params.navigation.hiddenClass) : s && (e = s.hasClass(t.params.navigation.hiddenClass)),
                r(!0 === e ? "navigationShow" : "navigationHide"),
                i && i.toggleClass(t.params.navigation.hiddenClass),
                s && s.toggleClass(t.params.navigation.hiddenClass)
            }
        }
        );
        const f = () => {
            t.$el.addClass(t.params.navigation.navigationDisabledClass),
            p()
        }
        ;
        Object.assign(t.navigation, {
            enable: () => {
                t.$el.removeClass(t.params.navigation.navigationDisabledClass),
                u(),
                a()
            }
            ,
            disable: f,
            update: a,
            init: u,
            destroy: p
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        const s = "swiper-pagination";
        let o;
        n({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: s + "-bullet",
                bulletActiveClass: s + "-bullet-active",
                modifierClass: s + "-",
                currentClass: s + "-current",
                totalClass: s + "-total",
                hiddenClass: s + "-hidden",
                progressbarFillClass: s + "-progressbar-fill",
                progressbarOppositeClass: s + "-progressbar-opposite",
                clickableClass: s + "-clickable",
                lockClass: s + "-lock",
                horizontalClass: s + "-horizontal",
                verticalClass: s + "-vertical",
                paginationDisabledClass: s + "-disabled"
            }
        }),
        t.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let a = 0;
        function l() {
            return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length
        }
        function d(e, n) {
            const {bulletActiveClass: i} = t.params.pagination;
            e[n]().addClass(`${i}-${n}`)[n]().addClass(`${i}-${n}-${n}`)
        }
        function u() {
            const e = t.rtl
              , n = t.params.pagination;
            if (l())
                return;
            const i = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
              , s = t.pagination.$el;
            let u;
            const p = t.params.loop ? Math.ceil((i - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (u = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup),
            u > i - 1 - 2 * t.loopedSlides && (u -= i - 2 * t.loopedSlides),
            u > p - 1 && (u -= p),
            u < 0 && "bullets" !== t.params.paginationType && (u = p + u)) : u = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0,
            "bullets" === n.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const i = t.pagination.bullets;
                let r, l, p;
                if (n.dynamicBullets && (o = i.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                s.css(t.isHorizontal() ? "width" : "height", o * (n.dynamicMainBullets + 4) + "px"),
                n.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (a += u - (t.previousIndex - t.loopedSlides || 0),
                a > n.dynamicMainBullets - 1 ? a = n.dynamicMainBullets - 1 : a < 0 && (a = 0)),
                r = Math.max(u - a, 0),
                l = r + (Math.min(i.length, n.dynamicMainBullets) - 1),
                p = (l + r) / 2),
                i.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${n.bulletActiveClass}${e}`).join(" ")),
                s.length > 1)
                    i.each(e => {
                        const t = c(e)
                          , i = t.index();
                        i === u && t.addClass(n.bulletActiveClass),
                        n.dynamicBullets && (i >= r && i <= l && t.addClass(n.bulletActiveClass + "-main"),
                        i === r && d(t, "prev"),
                        i === l && d(t, "next"))
                    }
                    );
                else {
                    const e = i.eq(u)
                      , s = e.index();
                    if (e.addClass(n.bulletActiveClass),
                    n.dynamicBullets) {
                        const e = i.eq(r)
                          , o = i.eq(l);
                        for (let e = r; e <= l; e += 1)
                            i.eq(e).addClass(n.bulletActiveClass + "-main");
                        if (t.params.loop)
                            if (s >= i.length) {
                                for (let e = n.dynamicMainBullets; e >= 0; e -= 1)
                                    i.eq(i.length - e).addClass(n.bulletActiveClass + "-main");
                                i.eq(i.length - n.dynamicMainBullets - 1).addClass(n.bulletActiveClass + "-prev")
                            } else
                                d(e, "prev"),
                                d(o, "next");
                        else
                            d(e, "prev"),
                            d(o, "next")
                    }
                }
                if (n.dynamicBullets) {
                    const r = Math.min(i.length, n.dynamicMainBullets + 4)
                      , s = (o * r - o) / 2 - p * o
                      , a = e ? "right" : "left";
                    i.css(t.isHorizontal() ? a : "top", s + "px")
                }
            }
            if ("fraction" === n.type && (s.find(W(n.currentClass)).text(n.formatFractionCurrent(u + 1)),
            s.find(W(n.totalClass)).text(n.formatFractionTotal(p))),
            "progressbar" === n.type) {
                let e;
                e = n.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const i = (u + 1) / p;
                let r = 1
                  , o = 1;
                "horizontal" === e ? r = i : o = i,
                s.find(W(n.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${r}) scaleY(${o})`).transition(t.params.speed)
            }
            "custom" === n.type && n.renderCustom ? (s.html(n.renderCustom(t, u + 1, p)),
            r("paginationRender", s[0])) : r("paginationUpdate", s[0]),
            t.params.watchOverflow && t.enabled && s[t.isLocked ? "addClass" : "removeClass"](n.lockClass)
        }
        function p() {
            const e = t.params.pagination;
            if (l())
                return;
            const n = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
              , i = t.pagination.$el;
            let s = "";
            if ("bullets" === e.type) {
                let r = t.params.loop ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && r > n && (r = n);
                for (let n = 0; n < r; n += 1)
                    e.renderBullet ? s += e.renderBullet.call(t, n, e.bulletClass) : s += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;
                i.html(s),
                t.pagination.bullets = i.find(W(e.bulletClass))
            }
            "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,
            i.html(s)),
            "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`,
            i.html(s)),
            "custom" !== e.type && r("paginationRender", t.pagination.$el[0])
        }
        function f() {
            t.params.pagination = R(t, t.originalParams.pagination, t.params.pagination, {
                el: "swiper-pagination"
            });
            const e = t.params.pagination;
            if (!e.el)
                return;
            let n = c(e.el);
            0 !== n.length && (t.params.uniqueNavElements && "string" == typeof e.el && n.length > 1 && (n = t.$el.find(e.el),
            n.length > 1 && (n = n.filter(e => c(e).parents(".swiper")[0] === t.el))),
            "bullets" === e.type && e.clickable && n.addClass(e.clickableClass),
            n.addClass(e.modifierClass + e.type),
            n.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            "bullets" === e.type && e.dynamicBullets && (n.addClass(`${e.modifierClass}${e.type}-dynamic`),
            a = 0,
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type && e.progressbarOpposite && n.addClass(e.progressbarOppositeClass),
            e.clickable && n.on("click", W(e.bulletClass), (function(e) {
                e.preventDefault();
                let n = c(this).index() * t.params.slidesPerGroup;
                t.params.loop && (n += t.loopedSlides),
                t.slideTo(n)
            }
            )),
            Object.assign(t.pagination, {
                $el: n,
                el: n[0]
            }),
            t.enabled || n.addClass(e.lockClass))
        }
        function h() {
            const e = t.params.pagination;
            if (l())
                return;
            const n = t.pagination.$el;
            n.removeClass(e.hiddenClass),
            n.removeClass(e.modifierClass + e.type),
            n.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && n.off("click", W(e.bulletClass))
        }
        i("init", () => {
            !1 === t.params.pagination.enabled ? m() : (f(),
            p(),
            u())
        }
        ),
        i("activeIndexChange", () => {
            (t.params.loop || void 0 === t.snapIndex) && u()
        }
        ),
        i("snapIndexChange", () => {
            t.params.loop || u()
        }
        ),
        i("slidesLengthChange", () => {
            t.params.loop && (p(),
            u())
        }
        ),
        i("snapGridLengthChange", () => {
            t.params.loop || (p(),
            u())
        }
        ),
        i("destroy", () => {
            h()
        }
        ),
        i("enable disable", () => {
            const {$el: e} = t.pagination;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass)
        }
        ),
        i("lock unlock", () => {
            u()
        }
        ),
        i("click", (e, n) => {
            const i = n.target
              , {$el: s} = t.pagination;
            if (t.params.pagination.el && t.params.pagination.hideOnClick && s && s.length > 0 && !c(i).hasClass(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl))
                    return;
                const e = s.hasClass(t.params.pagination.hiddenClass);
                r(!0 === e ? "paginationShow" : "paginationHide"),
                s.toggleClass(t.params.pagination.hiddenClass)
            }
        }
        );
        const m = () => {
            t.$el.addClass(t.params.pagination.paginationDisabledClass),
            t.pagination.$el && t.pagination.$el.addClass(t.params.pagination.paginationDisabledClass),
            h()
        }
        ;
        Object.assign(t.pagination, {
            enable: () => {
                t.$el.removeClass(t.params.pagination.paginationDisabledClass),
                t.pagination.$el && t.pagination.$el.removeClass(t.params.pagination.paginationDisabledClass),
                f(),
                p(),
                u()
            }
            ,
            disable: m,
            render: p,
            update: u,
            init: f,
            destroy: h
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: r, emit: s} = e;
        const o = i();
        let a, l, d, p, f = !1, h = null, m = null;
        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e, rtlTranslate: n, progress: i} = t
              , {$dragEl: r, $el: s} = e
              , o = t.params.scrollbar;
            let a = l
              , c = (d - l) * i;
            n ? (c = -c,
            c > 0 ? (a = l - c,
            c = 0) : -c + l > d && (a = d + c)) : c < 0 ? (a = l + c,
            c = 0) : c + l > d && (a = d - c),
            t.isHorizontal() ? (r.transform(`translate3d(${c}px, 0, 0)`),
            r[0].style.width = a + "px") : (r.transform(`translate3d(0px, ${c}px, 0)`),
            r[0].style.height = a + "px"),
            o.hide && (clearTimeout(h),
            s[0].style.opacity = 1,
            h = setTimeout( () => {
                s[0].style.opacity = 0,
                s.transition(400)
            }
            , 1e3))
        }
        function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e} = t
              , {$dragEl: n, $el: i} = e;
            n[0].style.width = "",
            n[0].style.height = "",
            d = t.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
            p = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)),
            l = "auto" === t.params.scrollbar.dragSize ? d * p : parseInt(t.params.scrollbar.dragSize, 10),
            t.isHorizontal() ? n[0].style.width = l + "px" : n[0].style.height = l + "px",
            i[0].style.display = p >= 1 ? "none" : "",
            t.params.scrollbar.hide && (i[0].style.opacity = 0),
            t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass)
        }
        function b(e) {
            return t.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        }
        function y(e) {
            const {scrollbar: n, rtlTranslate: i} = t
              , {$el: r} = n;
            let s;
            s = (b(e) - r.offset()[t.isHorizontal() ? "left" : "top"] - (null !== a ? a : l / 2)) / (d - l),
            s = Math.max(Math.min(s, 1), 0),
            i && (s = 1 - s);
            const o = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * s;
            t.updateProgress(o),
            t.setTranslate(o),
            t.updateActiveIndex(),
            t.updateSlidesClasses()
        }
        function w(e) {
            const n = t.params.scrollbar
              , {scrollbar: i, $wrapperEl: r} = t
              , {$el: o, $dragEl: l} = i;
            f = !0,
            a = e.target === l[0] || e.target === l ? b(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            r.transition(100),
            l.transition(100),
            y(e),
            clearTimeout(m),
            o.transition(0),
            n.hide && o.css("opacity", 1),
            t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
            s("scrollbarDragStart", e)
        }
        function x(e) {
            const {scrollbar: n, $wrapperEl: i} = t
              , {$el: r, $dragEl: o} = n;
            f && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            y(e),
            i.transition(0),
            r.transition(0),
            o.transition(0),
            s("scrollbarDragMove", e))
        }
        function E(e) {
            const n = t.params.scrollbar
              , {scrollbar: i, $wrapperEl: r} = t
              , {$el: o} = i;
            f && (f = !1,
            t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""),
            r.transition("")),
            n.hide && (clearTimeout(m),
            m = u( () => {
                o.css("opacity", 0),
                o.transition(400)
            }
            , 1e3)),
            s("scrollbarDragEnd", e),
            n.snapOnRelease && t.slideToClosest())
        }
        function _(e) {
            const {scrollbar: n, touchEventsTouch: i, touchEventsDesktop: r, params: s, support: a} = t
              , l = n.$el;
            if (!l)
                return;
            const c = l[0]
              , d = !(!a.passiveListener || !s.passiveListeners) && {
                passive: !1,
                capture: !1
            }
              , u = !(!a.passiveListener || !s.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            if (!c)
                return;
            const p = "on" === e ? "addEventListener" : "removeEventListener";
            a.touch ? (c[p](i.start, w, d),
            c[p](i.move, x, d),
            c[p](i.end, E, u)) : (c[p](r.start, w, d),
            o[p](r.move, x, d),
            o[p](r.end, E, u))
        }
        function S() {
            const {scrollbar: e, $el: n} = t;
            t.params.scrollbar = R(t, t.originalParams.scrollbar, t.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const i = t.params.scrollbar;
            if (!i.el)
                return;
            let r = c(i.el);
            t.params.uniqueNavElements && "string" == typeof i.el && r.length > 1 && 1 === n.find(i.el).length && (r = n.find(i.el)),
            r.addClass(t.isHorizontal() ? i.horizontalClass : i.verticalClass);
            let s = r.find("." + t.params.scrollbar.dragClass);
            0 === s.length && (s = c(`<div class="${t.params.scrollbar.dragClass}"></div>`),
            r.append(s)),
            Object.assign(e, {
                $el: r,
                el: r[0],
                $dragEl: s,
                dragEl: s[0]
            }),
            i.draggable && t.params.scrollbar.el && t.scrollbar.el && _("on"),
            r && r[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }
        function T() {
            const e = t.params.scrollbar
              , n = t.scrollbar.$el;
            n && n.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            t.params.scrollbar.el && t.scrollbar.el && _("off")
        }
        n({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical"
            }
        }),
        t.scrollbar = {
            el: null,
            dragEl: null,
            $el: null,
            $dragEl: null
        },
        r("init", () => {
            !1 === t.params.scrollbar.enabled ? C() : (S(),
            v(),
            g())
        }
        ),
        r("update resize observerUpdate lock unlock", () => {
            v()
        }
        ),
        r("setTranslate", () => {
            g()
        }
        ),
        r("setTransition", (e, n) => {
            !function(e) {
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            }(n)
        }
        ),
        r("enable disable", () => {
            const {$el: e} = t.scrollbar;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }
        ),
        r("destroy", () => {
            T()
        }
        );
        const C = () => {
            t.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
            t.scrollbar.$el && t.scrollbar.$el.addClass(t.params.scrollbar.scrollbarDisabledClass),
            T()
        }
        ;
        Object.assign(t.scrollbar, {
            enable: () => {
                t.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
                t.scrollbar.$el && t.scrollbar.$el.removeClass(t.params.scrollbar.scrollbarDisabledClass),
                S(),
                v(),
                g()
            }
            ,
            disable: C,
            updateSize: v,
            setTranslate: g,
            init: S,
            destroy: T
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            parallax: {
                enabled: !1
            }
        });
        const r = (e, n) => {
            const {rtl: i} = t
              , r = c(e)
              , s = i ? -1 : 1
              , o = r.attr("data-swiper-parallax") || "0";
            let a = r.attr("data-swiper-parallax-x")
              , l = r.attr("data-swiper-parallax-y");
            const d = r.attr("data-swiper-parallax-scale")
              , u = r.attr("data-swiper-parallax-opacity");
            if (a || l ? (a = a || "0",
            l = l || "0") : t.isHorizontal() ? (a = o,
            l = "0") : (l = o,
            a = "0"),
            a = a.indexOf("%") >= 0 ? parseInt(a, 10) * n * s + "%" : a * n * s + "px",
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * n + "%" : l * n + "px",
            null != u) {
                const e = u - (u - 1) * (1 - Math.abs(n));
                r[0].style.opacity = e
            }
            if (null == d)
                r.transform(`translate3d(${a}, ${l}, 0px)`);
            else {
                const e = d - (d - 1) * (1 - Math.abs(n));
                r.transform(`translate3d(${a}, ${l}, 0px) scale(${e})`)
            }
        }
          , s = () => {
            const {$el: e, slides: n, progress: i, snapGrid: s} = t;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                r(e, i)
            }
            ),
            n.each( (e, n) => {
                let o = e.progress;
                t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (o += Math.ceil(n / 2) - i * (s.length - 1)),
                o = Math.min(Math.max(o, -1), 1),
                c(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(e => {
                    r(e, o)
                }
                )
            }
            )
        }
        ;
        i("beforeInit", () => {
            t.params.parallax.enabled && (t.params.watchSlidesProgress = !0,
            t.originalParams.watchSlidesProgress = !0)
        }
        ),
        i("init", () => {
            t.params.parallax.enabled && s()
        }
        ),
        i("setTranslate", () => {
            t.params.parallax.enabled && s()
        }
        ),
        i("setTransition", (e, n) => {
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const {$el: n} = t;
                n.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(t => {
                    const n = c(t);
                    let i = parseInt(n.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (i = 0),
                    n.transition(i)
                }
                )
            }(n)
        }
        )
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        const o = s();
        n({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }),
        t.zoom = {
            enabled: !1
        };
        let a, l, d, u = 1, p = !1;
        const h = {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
        }
          , m = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        }
          , g = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
        let v = 1;
        function b(e) {
            if (e.targetTouches.length < 2)
                return 1;
            const t = e.targetTouches[0].pageX
              , n = e.targetTouches[0].pageY
              , i = e.targetTouches[1].pageX
              , r = e.targetTouches[1].pageY;
            return Math.sqrt((i - t) ** 2 + (r - n) ** 2)
        }
        function y(e) {
            const n = t.support
              , i = t.params.zoom;
            if (l = !1,
            d = !1,
            !n.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                l = !0,
                h.scaleStart = b(e)
            }
            h.$slideEl && h.$slideEl.length || (h.$slideEl = c(e.target).closest("." + t.params.slideClass),
            0 === h.$slideEl.length && (h.$slideEl = t.slides.eq(t.activeIndex)),
            h.$imageEl = h.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            h.$imageWrapEl = h.$imageEl.parent("." + i.containerClass),
            h.maxRatio = h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            0 !== h.$imageWrapEl.length) ? (h.$imageEl && h.$imageEl.transition(0),
            p = !0) : h.$imageEl = void 0
        }
        function w(e) {
            const n = t.support
              , i = t.params.zoom
              , r = t.zoom;
            if (!n.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                d = !0,
                h.scaleMove = b(e)
            }
            h.$imageEl && 0 !== h.$imageEl.length ? (n.gestures ? r.scale = e.scale * u : r.scale = h.scaleMove / h.scaleStart * u,
            r.scale > h.maxRatio && (r.scale = h.maxRatio - 1 + (r.scale - h.maxRatio + 1) ** .5),
            r.scale < i.minRatio && (r.scale = i.minRatio + 1 - (i.minRatio - r.scale + 1) ** .5),
            h.$imageEl.transform(`translate3d(0,0,0) scale(${r.scale})`)) : "gesturechange" === e.type && y(e)
        }
        function x(e) {
            const n = t.device
              , i = t.support
              , r = t.params.zoom
              , s = t.zoom;
            if (!i.gestures) {
                if (!l || !d)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !n.android)
                    return;
                l = !1,
                d = !1
            }
            h.$imageEl && 0 !== h.$imageEl.length && (s.scale = Math.max(Math.min(s.scale, h.maxRatio), r.minRatio),
            h.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${s.scale})`),
            u = s.scale,
            p = !1,
            1 === s.scale && (h.$slideEl = void 0))
        }
        function E(e) {
            const n = t.zoom;
            if (!h.$imageEl || 0 === h.$imageEl.length)
                return;
            if (t.allowClick = !1,
            !m.isTouched || !h.$slideEl)
                return;
            m.isMoved || (m.width = h.$imageEl[0].offsetWidth,
            m.height = h.$imageEl[0].offsetHeight,
            m.startX = f(h.$imageWrapEl[0], "x") || 0,
            m.startY = f(h.$imageWrapEl[0], "y") || 0,
            h.slideWidth = h.$slideEl[0].offsetWidth,
            h.slideHeight = h.$slideEl[0].offsetHeight,
            h.$imageWrapEl.transition(0));
            const i = m.width * n.scale
              , r = m.height * n.scale;
            if (!(i < h.slideWidth && r < h.slideHeight)) {
                if (m.minX = Math.min(h.slideWidth / 2 - i / 2, 0),
                m.maxX = -m.minX,
                m.minY = Math.min(h.slideHeight / 2 - r / 2, 0),
                m.maxY = -m.minY,
                m.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                m.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                !m.isMoved && !p) {
                    if (t.isHorizontal() && (Math.floor(m.minX) === Math.floor(m.startX) && m.touchesCurrent.x < m.touchesStart.x || Math.floor(m.maxX) === Math.floor(m.startX) && m.touchesCurrent.x > m.touchesStart.x))
                        return void (m.isTouched = !1);
                    if (!t.isHorizontal() && (Math.floor(m.minY) === Math.floor(m.startY) && m.touchesCurrent.y < m.touchesStart.y || Math.floor(m.maxY) === Math.floor(m.startY) && m.touchesCurrent.y > m.touchesStart.y))
                        return void (m.isTouched = !1)
                }
                e.cancelable && e.preventDefault(),
                e.stopPropagation(),
                m.isMoved = !0,
                m.currentX = m.touchesCurrent.x - m.touchesStart.x + m.startX,
                m.currentY = m.touchesCurrent.y - m.touchesStart.y + m.startY,
                m.currentX < m.minX && (m.currentX = m.minX + 1 - (m.minX - m.currentX + 1) ** .8),
                m.currentX > m.maxX && (m.currentX = m.maxX - 1 + (m.currentX - m.maxX + 1) ** .8),
                m.currentY < m.minY && (m.currentY = m.minY + 1 - (m.minY - m.currentY + 1) ** .8),
                m.currentY > m.maxY && (m.currentY = m.maxY - 1 + (m.currentY - m.maxY + 1) ** .8),
                g.prevPositionX || (g.prevPositionX = m.touchesCurrent.x),
                g.prevPositionY || (g.prevPositionY = m.touchesCurrent.y),
                g.prevTime || (g.prevTime = Date.now()),
                g.x = (m.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2,
                g.y = (m.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2,
                Math.abs(m.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
                Math.abs(m.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
                g.prevPositionX = m.touchesCurrent.x,
                g.prevPositionY = m.touchesCurrent.y,
                g.prevTime = Date.now(),
                h.$imageWrapEl.transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }
        }
        function _() {
            const e = t.zoom;
            h.$slideEl && t.previousIndex !== t.activeIndex && (h.$imageEl && h.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            h.$imageWrapEl && h.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            u = 1,
            h.$slideEl = void 0,
            h.$imageEl = void 0,
            h.$imageWrapEl = void 0)
        }
        function S(e) {
            const n = t.zoom
              , i = t.params.zoom;
            if (h.$slideEl || (e && e.target && (h.$slideEl = c(e.target).closest("." + t.params.slideClass)),
            h.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? h.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : h.$slideEl = t.slides.eq(t.activeIndex)),
            h.$imageEl = h.$slideEl.find("." + i.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            h.$imageWrapEl = h.$imageEl.parent("." + i.containerClass)),
            !h.$imageEl || 0 === h.$imageEl.length || !h.$imageWrapEl || 0 === h.$imageWrapEl.length)
                return;
            let r, s, a, l, d, p, f, g, v, b, y, w, x, E, _, S, T, C;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden",
            t.wrapperEl.style.touchAction = "none"),
            h.$slideEl.addClass("" + i.zoomedSlideClass),
            void 0 === m.touchesStart.x && e ? (r = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            s = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (r = m.touchesStart.x,
            s = m.touchesStart.y),
            n.scale = h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            u = h.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            e ? (T = h.$slideEl[0].offsetWidth,
            C = h.$slideEl[0].offsetHeight,
            a = h.$slideEl.offset().left + o.scrollX,
            l = h.$slideEl.offset().top + o.scrollY,
            d = a + T / 2 - r,
            p = l + C / 2 - s,
            v = h.$imageEl[0].offsetWidth,
            b = h.$imageEl[0].offsetHeight,
            y = v * n.scale,
            w = b * n.scale,
            x = Math.min(T / 2 - y / 2, 0),
            E = Math.min(C / 2 - w / 2, 0),
            _ = -x,
            S = -E,
            f = d * n.scale,
            g = p * n.scale,
            f < x && (f = x),
            f > _ && (f = _),
            g < E && (g = E),
            g > S && (g = S)) : (f = 0,
            g = 0),
            h.$imageWrapEl.transition(300).transform(`translate3d(${f}px, ${g}px,0)`),
            h.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${n.scale})`)
        }
        function T() {
            const e = t.zoom
              , n = t.params.zoom;
            h.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? h.$slideEl = t.$wrapperEl.children("." + t.params.slideActiveClass) : h.$slideEl = t.slides.eq(t.activeIndex),
            h.$imageEl = h.$slideEl.find("." + n.containerClass).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            h.$imageWrapEl = h.$imageEl.parent("." + n.containerClass)),
            h.$imageEl && 0 !== h.$imageEl.length && h.$imageWrapEl && 0 !== h.$imageWrapEl.length && (t.params.cssMode && (t.wrapperEl.style.overflow = "",
            t.wrapperEl.style.touchAction = ""),
            e.scale = 1,
            u = 1,
            h.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            h.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            h.$slideEl.removeClass("" + n.zoomedSlideClass),
            h.$slideEl = void 0)
        }
        function C(e) {
            const n = t.zoom;
            n.scale && 1 !== n.scale ? T() : S(e)
        }
        function A() {
            const e = t.support;
            return {
                passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }
            }
        }
        function M() {
            return "." + t.params.slideClass
        }
        function k(e) {
            const {passiveListener: n} = A()
              , i = M();
            t.$wrapperEl[e]("gesturestart", i, y, n),
            t.$wrapperEl[e]("gesturechange", i, w, n),
            t.$wrapperEl[e]("gestureend", i, x, n)
        }
        function O() {
            a || (a = !0,
            k("on"))
        }
        function P() {
            a && (a = !1,
            k("off"))
        }
        function L() {
            const e = t.zoom;
            if (e.enabled)
                return;
            e.enabled = !0;
            const n = t.support
              , {passiveListener: i, activeListenerWithCapture: r} = A()
              , s = M();
            n.gestures ? (t.$wrapperEl.on(t.touchEvents.start, O, i),
            t.$wrapperEl.on(t.touchEvents.end, P, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.on(t.touchEvents.start, s, y, i),
            t.$wrapperEl.on(t.touchEvents.move, s, w, r),
            t.$wrapperEl.on(t.touchEvents.end, s, x, i),
            t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, s, x, i)),
            t.$wrapperEl.on(t.touchEvents.move, "." + t.params.zoom.containerClass, E, r)
        }
        function I() {
            const e = t.zoom;
            if (!e.enabled)
                return;
            const n = t.support;
            e.enabled = !1;
            const {passiveListener: i, activeListenerWithCapture: r} = A()
              , s = M();
            n.gestures ? (t.$wrapperEl.off(t.touchEvents.start, O, i),
            t.$wrapperEl.off(t.touchEvents.end, P, i)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, s, y, i),
            t.$wrapperEl.off(t.touchEvents.move, s, w, r),
            t.$wrapperEl.off(t.touchEvents.end, s, x, i),
            t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, s, x, i)),
            t.$wrapperEl.off(t.touchEvents.move, "." + t.params.zoom.containerClass, E, r)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: () => v,
            set(e) {
                if (v !== e) {
                    const t = h.$imageEl ? h.$imageEl[0] : void 0
                      , n = h.$slideEl ? h.$slideEl[0] : void 0;
                    r("zoomChange", e, t, n)
                }
                v = e
            }
        }),
        i("init", () => {
            t.params.zoom.enabled && L()
        }
        ),
        i("destroy", () => {
            I()
        }
        ),
        i("touchStart", (e, n) => {
            t.zoom.enabled && function(e) {
                const n = t.device;
                h.$imageEl && 0 !== h.$imageEl.length && (m.isTouched || (n.android && e.cancelable && e.preventDefault(),
                m.isTouched = !0,
                m.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                m.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }(n)
        }
        ),
        i("touchEnd", (e, n) => {
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!h.$imageEl || 0 === h.$imageEl.length)
                    return;
                if (!m.isTouched || !m.isMoved)
                    return m.isTouched = !1,
                    void (m.isMoved = !1);
                m.isTouched = !1,
                m.isMoved = !1;
                let n = 300
                  , i = 300;
                const r = g.x * n
                  , s = m.currentX + r
                  , o = g.y * i
                  , a = m.currentY + o;
                0 !== g.x && (n = Math.abs((s - m.currentX) / g.x)),
                0 !== g.y && (i = Math.abs((a - m.currentY) / g.y));
                const l = Math.max(n, i);
                m.currentX = s,
                m.currentY = a;
                const c = m.width * e.scale
                  , d = m.height * e.scale;
                m.minX = Math.min(h.slideWidth / 2 - c / 2, 0),
                m.maxX = -m.minX,
                m.minY = Math.min(h.slideHeight / 2 - d / 2, 0),
                m.maxY = -m.minY,
                m.currentX = Math.max(Math.min(m.currentX, m.maxX), m.minX),
                m.currentY = Math.max(Math.min(m.currentY, m.maxY), m.minY),
                h.$imageWrapEl.transition(l).transform(`translate3d(${m.currentX}px, ${m.currentY}px,0)`)
            }()
        }
        ),
        i("doubleTap", (e, n) => {
            !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && C(n)
        }
        ),
        i("transitionEnd", () => {
            t.zoom.enabled && t.params.zoom.enabled && _()
        }
        ),
        i("slideChange", () => {
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && _()
        }
        ),
        Object.assign(t.zoom, {
            enable: L,
            disable: I,
            in: S,
            out: T,
            toggle: C
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i, emit: r} = e;
        n({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        }),
        t.lazy = {};
        let o = !1
          , a = !1;
        function l(e, n) {
            void 0 === n && (n = !0);
            const i = t.params.lazy;
            if (void 0 === e)
                return;
            if (0 === t.slides.length)
                return;
            const s = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e)
              , o = s.find(`.${i.elementClass}:not(.${i.loadedClass}):not(.${i.loadingClass})`);
            !s.hasClass(i.elementClass) || s.hasClass(i.loadedClass) || s.hasClass(i.loadingClass) || o.push(s[0]),
            0 !== o.length && o.each(e => {
                const o = c(e);
                o.addClass(i.loadingClass);
                const a = o.attr("data-background")
                  , d = o.attr("data-src")
                  , u = o.attr("data-srcset")
                  , p = o.attr("data-sizes")
                  , f = o.parent("picture");
                t.loadImage(o[0], d || a, u, p, !1, () => {
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (a ? (o.css("background-image", `url("${a}")`),
                        o.removeAttr("data-background")) : (u && (o.attr("srcset", u),
                        o.removeAttr("data-srcset")),
                        p && (o.attr("sizes", p),
                        o.removeAttr("data-sizes")),
                        f.length && f.children("source").each(e => {
                            const t = c(e);
                            t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")),
                            t.removeAttr("data-srcset"))
                        }
                        ),
                        d && (o.attr("src", d),
                        o.removeAttr("data-src"))),
                        o.addClass(i.loadedClass).removeClass(i.loadingClass),
                        s.find("." + i.preloaderClass).remove(),
                        t.params.loop && n) {
                            const e = s.attr("data-swiper-slide-index");
                            s.hasClass(t.params.slideDuplicateClass) ? l(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1) : l(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)
                        }
                        r("lazyImageReady", s[0], o[0]),
                        t.params.autoHeight && t.updateAutoHeight()
                    }
                }
                ),
                r("lazyImageLoad", s[0], o[0])
            }
            )
        }
        function d() {
            const {$wrapperEl: e, params: n, slides: i, activeIndex: r} = t
              , s = t.virtual && n.virtual.enabled
              , o = n.lazy;
            let d = n.slidesPerView;
            function u(t) {
                if (s) {
                    if (e.children(`.${n.slideClass}[data-swiper-slide-index="${t}"]`).length)
                        return !0
                } else if (i[t])
                    return !0;
                return !1
            }
            function p(e) {
                return s ? c(e).attr("data-swiper-slide-index") : c(e).index()
            }
            if ("auto" === d && (d = 0),
            a || (a = !0),
            t.params.watchSlidesProgress)
                e.children("." + n.slideVisibleClass).each(e => {
                    l(s ? c(e).attr("data-swiper-slide-index") : c(e).index())
                }
                );
            else if (d > 1)
                for (let e = r; e < r + d; e += 1)
                    u(e) && l(e);
            else
                l(r);
            if (o.loadPrevNext)
                if (d > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                    const e = o.loadPrevNextAmount
                      , t = Math.ceil(d)
                      , n = Math.min(r + t + Math.max(e, t), i.length)
                      , s = Math.max(r - Math.max(t, e), 0);
                    for (let e = r + t; e < n; e += 1)
                        u(e) && l(e);
                    for (let e = s; e < r; e += 1)
                        u(e) && l(e)
                } else {
                    const t = e.children("." + n.slideNextClass);
                    t.length > 0 && l(p(t));
                    const i = e.children("." + n.slidePrevClass);
                    i.length > 0 && l(p(i))
                }
        }
        function u() {
            const e = s();
            if (!t || t.destroyed)
                return;
            const n = t.params.lazy.scrollingElement ? c(t.params.lazy.scrollingElement) : c(e)
              , i = n[0] === e
              , r = i ? e.innerWidth : n[0].offsetWidth
              , a = i ? e.innerHeight : n[0].offsetHeight
              , l = t.$el.offset()
              , {rtlTranslate: p} = t;
            let f = !1;
            p && (l.left -= t.$el[0].scrollLeft);
            const h = [[l.left, l.top], [l.left + t.width, l.top], [l.left, l.top + t.height], [l.left + t.width, l.top + t.height]];
            for (let e = 0; e < h.length; e += 1) {
                const t = h[e];
                if (t[0] >= 0 && t[0] <= r && t[1] >= 0 && t[1] <= a) {
                    if (0 === t[0] && 0 === t[1])
                        continue;
                    f = !0
                }
            }
            const m = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            f ? (d(),
            n.off("scroll", u, m)) : o || (o = !0,
            n.on("scroll", u, m))
        }
        i("beforeInit", () => {
            t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1)
        }
        ),
        i("init", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : d())
        }
        ),
        i("scroll", () => {
            t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && d()
        }
        ),
        i("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
            t.params.lazy.enabled && (t.params.lazy.checkInView ? u() : d())
        }
        ),
        i("transitionStart", () => {
            t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || !t.params.lazy.loadOnTransitionStart && !a) && (t.params.lazy.checkInView ? u() : d())
        }
        ),
        i("transitionEnd", () => {
            t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? u() : d())
        }
        ),
        i("slideChange", () => {
            const {lazy: e, cssMode: n, watchSlidesProgress: i, touchReleaseOnEdges: r, resistanceRatio: s} = t.params;
            e.enabled && (n || i && (r || 0 === s)) && d()
        }
        ),
        i("destroy", () => {
            t.$el && t.$el.find("." + t.params.lazy.loadingClass).removeClass(t.params.lazy.loadingClass)
        }
        ),
        Object.assign(t.lazy, {
            load: d,
            loadInSlide: l
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        function r(e, t) {
            const n = function() {
                let e, t, n;
                return (i, r) => {
                    for (t = -1,
                    e = i.length; e - t > 1; )
                        n = e + t >> 1,
                        i[n] <= r ? t = n : e = n;
                    return e
                }
            }();
            let i, r;
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (r = n(this.x, e),
                i = r - 1,
                (e - this.x[i]) * (this.y[r] - this.y[i]) / (this.x[r] - this.x[i]) + this.y[i]) : 0
            }
            ,
            this
        }
        function s() {
            t.controller.control && t.controller.spline && (t.controller.spline = void 0,
            delete t.controller.spline)
        }
        n({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }),
        t.controller = {
            control: void 0
        },
        i("beforeInit", () => {
            t.controller.control = t.params.controller.control
        }
        ),
        i("update", () => {
            s()
        }
        ),
        i("resize", () => {
            s()
        }
        ),
        i("observerUpdate", () => {
            s()
        }
        ),
        i("setTranslate", (e, n, i) => {
            t.controller.control && t.controller.setTranslate(n, i)
        }
        ),
        i("setTransition", (e, n, i) => {
            t.controller.control && t.controller.setTransition(n, i)
        }
        ),
        Object.assign(t.controller, {
            setTranslate: function(e, n) {
                const i = t.controller.control;
                let s, o;
                const a = t.constructor;
                function l(e) {
                    const n = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by && (function(e) {
                        t.controller.spline || (t.controller.spline = t.params.loop ? new r(t.slidesGrid,e.slidesGrid) : new r(t.snapGrid,e.snapGrid))
                    }(e),
                    o = -t.controller.spline.interpolate(-n)),
                    o && "container" !== t.params.controller.by || (s = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()),
                    o = (n - t.minTranslate()) * s + e.minTranslate()),
                    t.params.controller.inverse && (o = e.maxTranslate() - o),
                    e.updateProgress(o),
                    e.setTranslate(o, t),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses()
                }
                if (Array.isArray(i))
                    for (let e = 0; e < i.length; e += 1)
                        i[e] !== n && i[e]instanceof a && l(i[e]);
                else
                    i instanceof a && n !== i && l(i)
            },
            setTransition: function(e, n) {
                const i = t.constructor
                  , r = t.controller.control;
                let s;
                function o(n) {
                    n.setTransition(e, t),
                    0 !== e && (n.transitionStart(),
                    n.params.autoHeight && u( () => {
                        n.updateAutoHeight()
                    }
                    ),
                    n.$wrapperEl.transitionEnd( () => {
                        r && (n.params.loop && "slide" === t.params.controller.by && n.loopFix(),
                        n.transitionEnd())
                    }
                    ))
                }
                if (Array.isArray(r))
                    for (s = 0; s < r.length; s += 1)
                        r[s] !== n && r[s]instanceof i && o(r[s]);
                else
                    r instanceof i && n !== r && o(r)
            }
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        }),
        t.a11y = {
            clicked: !1
        };
        let r = null;
        function s(e) {
            const t = r;
            0 !== t.length && (t.html(""),
            t.html(e))
        }
        function o(e) {
            e.attr("tabIndex", "0")
        }
        function a(e) {
            e.attr("tabIndex", "-1")
        }
        function l(e, t) {
            e.attr("role", t)
        }
        function d(e, t) {
            e.attr("aria-roledescription", t)
        }
        function u(e, t) {
            e.attr("aria-label", t)
        }
        function p(e) {
            e.attr("aria-disabled", !0)
        }
        function f(e) {
            e.attr("aria-disabled", !1)
        }
        function h(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode)
                return;
            const n = t.params.a11y
              , i = c(e.target);
            t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
            t.isEnd ? s(n.lastSlideMessage) : s(n.nextSlideMessage)),
            t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
            t.isBeginning ? s(n.firstSlideMessage) : s(n.prevSlideMessage)),
            t.pagination && i.is(W(t.params.pagination.bulletClass)) && i[0].click()
        }
        function m() {
            return t.pagination && t.pagination.bullets && t.pagination.bullets.length
        }
        function g() {
            return m() && t.params.pagination.clickable
        }
        const v = (e, t, n) => {
            o(e),
            "BUTTON" !== e[0].tagName && (l(e, "button"),
            e.on("keydown", h)),
            u(e, n),
            function(e, t) {
                e.attr("aria-controls", t)
            }(e, t)
        }
          , b = () => {
            t.a11y.clicked = !0
        }
          , y = () => {
            requestAnimationFrame( () => {
                requestAnimationFrame( () => {
                    t.destroyed || (t.a11y.clicked = !1)
                }
                )
            }
            )
        }
          , w = e => {
            if (t.a11y.clicked)
                return;
            const n = e.target.closest("." + t.params.slideClass);
            if (!n || !t.slides.includes(n))
                return;
            const i = t.slides.indexOf(n) === t.activeIndex
              , r = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(n);
            i || r || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0,
            t.slideTo(t.slides.indexOf(n), 0))
        }
          , x = () => {
            const e = t.params.a11y;
            e.itemRoleDescriptionMessage && d(c(t.slides), e.itemRoleDescriptionMessage),
            e.slideRole && l(c(t.slides), e.slideRole);
            const n = t.params.loop ? t.slides.filter(e => !e.classList.contains(t.params.slideDuplicateClass)).length : t.slides.length;
            e.slideLabelMessage && t.slides.each( (i, r) => {
                const s = c(i)
                  , o = t.params.loop ? parseInt(s.attr("data-swiper-slide-index"), 10) : r;
                u(s, e.slideLabelMessage.replace(/\{\{index\}\}/, o + 1).replace(/\{\{slidesLength\}\}/, n))
            }
            )
        }
        ;
        i("beforeInit", () => {
            r = c(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
        }
        ),
        i("afterInit", () => {
            t.params.a11y.enabled && ( () => {
                const e = t.params.a11y;
                t.$el.append(r);
                const n = t.$el;
                e.containerRoleDescriptionMessage && d(n, e.containerRoleDescriptionMessage),
                e.containerMessage && u(n, e.containerMessage);
                const i = t.$wrapperEl
                  , s = e.id || i.attr("id") || "swiper-wrapper-" + (void 0 === (o = 16) && (o = 16),
                "x".repeat(o).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)));
                var o;
                const a = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
                var l;
                let c, p;
                l = s,
                i.attr("id", l),
                function(e, t) {
                    e.attr("aria-live", t)
                }(i, a),
                x(),
                t.navigation && t.navigation.$nextEl && (c = t.navigation.$nextEl),
                t.navigation && t.navigation.$prevEl && (p = t.navigation.$prevEl),
                c && c.length && v(c, s, e.nextSlideMessage),
                p && p.length && v(p, s, e.prevSlideMessage),
                g() && t.pagination.$el.on("keydown", W(t.params.pagination.bulletClass), h),
                t.$el.on("focus", w, !0),
                t.$el.on("pointerdown", b, !0),
                t.$el.on("pointerup", y, !0)
            }
            )()
        }
        ),
        i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
            t.params.a11y.enabled && x()
        }
        ),
        i("fromEdge toEdge afterInit lock unlock", () => {
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation)
                    return;
                const {$nextEl: e, $prevEl: n} = t.navigation;
                n && n.length > 0 && (t.isBeginning ? (p(n),
                a(n)) : (f(n),
                o(n))),
                e && e.length > 0 && (t.isEnd ? (p(e),
                a(e)) : (f(e),
                o(e)))
            }()
        }
        ),
        i("paginationUpdate", () => {
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                m() && t.pagination.bullets.each(n => {
                    const i = c(n);
                    t.params.pagination.clickable && (o(i),
                    t.params.pagination.renderBullet || (l(i, "button"),
                    u(i, e.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))),
                    i.is("." + t.params.pagination.bulletActiveClass) ? i.attr("aria-current", "true") : i.removeAttr("aria-current")
                }
                )
            }()
        }
        ),
        i("destroy", () => {
            t.params.a11y.enabled && function() {
                let e, n;
                r && r.length > 0 && r.remove(),
                t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl),
                t.navigation && t.navigation.$prevEl && (n = t.navigation.$prevEl),
                e && e.off("keydown", h),
                n && n.off("keydown", h),
                g() && t.pagination.$el.off("keydown", W(t.params.pagination.bulletClass), h),
                t.$el.off("focus", w, !0),
                t.$el.off("pointerdown", b, !0),
                t.$el.off("pointerup", y, !0)
            }()
        }
        )
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1
            }
        });
        let r = !1
          , o = {};
        const a = e => e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          , l = e => {
            const t = s();
            let n;
            n = e ? new URL(e) : t.location;
            const i = n.pathname.slice(1).split("/").filter(e => "" !== e)
              , r = i.length;
            return {
                key: i[r - 2],
                value: i[r - 1]
            }
        }
          , c = (e, n) => {
            const i = s();
            if (!r || !t.params.history.enabled)
                return;
            let o;
            o = t.params.url ? new URL(t.params.url) : i.location;
            const l = t.slides.eq(n);
            let c = a(l.attr("data-history"));
            if (t.params.history.root.length > 0) {
                let n = t.params.history.root;
                "/" === n[n.length - 1] && (n = n.slice(0, n.length - 1)),
                c = `${n}/${e}/${c}`
            } else
                o.pathname.includes(e) || (c = `${e}/${c}`);
            t.params.history.keepQuery && (c += o.search);
            const d = i.history.state;
            d && d.value === c || (t.params.history.replaceState ? i.history.replaceState({
                value: c
            }, null, c) : i.history.pushState({
                value: c
            }, null, c))
        }
          , d = (e, n, i) => {
            if (n)
                for (let r = 0, s = t.slides.length; r < s; r += 1) {
                    const s = t.slides.eq(r);
                    if (a(s.attr("data-history")) === n && !s.hasClass(t.params.slideDuplicateClass)) {
                        const n = s.index();
                        t.slideTo(n, e, i)
                    }
                }
            else
                t.slideTo(0, e, i)
        }
          , u = () => {
            o = l(t.params.url),
            d(t.params.speed, o.value, !1)
        }
        ;
        i("init", () => {
            t.params.history.enabled && ( () => {
                const e = s();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState)
                        return t.params.history.enabled = !1,
                        void (t.params.hashNavigation.enabled = !0);
                    r = !0,
                    o = l(t.params.url),
                    (o.key || o.value) && (d(0, o.value, t.params.runCallbacksOnInit),
                    t.params.history.replaceState || e.addEventListener("popstate", u))
                }
            }
            )()
        }
        ),
        i("destroy", () => {
            t.params.history.enabled && ( () => {
                const e = s();
                t.params.history.replaceState || e.removeEventListener("popstate", u)
            }
            )()
        }
        ),
        i("transitionEnd _freeModeNoMomentumRelease", () => {
            r && c(t.params.history.key, t.activeIndex)
        }
        ),
        i("slideChange", () => {
            r && t.params.cssMode && c(t.params.history.key, t.activeIndex)
        }
        )
    }
    , function(e) {
        let {swiper: t, extendParams: n, emit: r, on: o} = e
          , a = !1;
        const l = i()
          , d = s();
        n({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        });
        const u = () => {
            r("hashChange");
            const e = l.location.hash.replace("#", "");
            if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                const n = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                if (void 0 === n)
                    return;
                t.slideTo(n)
            }
        }
          , p = () => {
            if (a && t.params.hashNavigation.enabled)
                if (t.params.hashNavigation.replaceState && d.history && d.history.replaceState)
                    d.history.replaceState(null, null, "#" + t.slides.eq(t.activeIndex).attr("data-hash") || ""),
                    r("hashSet");
                else {
                    const e = t.slides.eq(t.activeIndex)
                      , n = e.attr("data-hash") || e.attr("data-history");
                    l.location.hash = n || "",
                    r("hashSet")
                }
        }
        ;
        o("init", () => {
            t.params.hashNavigation.enabled && ( () => {
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled)
                    return;
                a = !0;
                const e = l.location.hash.replace("#", "");
                if (e) {
                    const n = 0;
                    for (let i = 0, r = t.slides.length; i < r; i += 1) {
                        const r = t.slides.eq(i);
                        if ((r.attr("data-hash") || r.attr("data-history")) === e && !r.hasClass(t.params.slideDuplicateClass)) {
                            const e = r.index();
                            t.slideTo(e, n, t.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                t.params.hashNavigation.watchState && c(d).on("hashchange", u)
            }
            )()
        }
        ),
        o("destroy", () => {
            t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && c(d).off("hashchange", u)
        }
        ),
        o("transitionEnd _freeModeNoMomentumRelease", () => {
            a && p()
        }
        ),
        o("slideChange", () => {
            a && t.params.cssMode && p()
        }
        )
    }
    , function(e) {
        let t, {swiper: n, extendParams: r, on: s, emit: o} = e;
        function a() {
            if (!n.size)
                return n.autoplay.running = !1,
                void (n.autoplay.paused = !1);
            const e = n.slides.eq(n.activeIndex);
            let i = n.params.autoplay.delay;
            e.attr("data-swiper-autoplay") && (i = e.attr("data-swiper-autoplay") || n.params.autoplay.delay),
            clearTimeout(t),
            t = u( () => {
                let e;
                n.params.autoplay.reverseDirection ? n.params.loop ? (n.loopFix(),
                e = n.slidePrev(n.params.speed, !0, !0),
                o("autoplay")) : n.isBeginning ? n.params.autoplay.stopOnLastSlide ? c() : (e = n.slideTo(n.slides.length - 1, n.params.speed, !0, !0),
                o("autoplay")) : (e = n.slidePrev(n.params.speed, !0, !0),
                o("autoplay")) : n.params.loop ? (n.loopFix(),
                e = n.slideNext(n.params.speed, !0, !0),
                o("autoplay")) : n.isEnd ? n.params.autoplay.stopOnLastSlide ? c() : (e = n.slideTo(0, n.params.speed, !0, !0),
                o("autoplay")) : (e = n.slideNext(n.params.speed, !0, !0),
                o("autoplay")),
                (n.params.cssMode && n.autoplay.running || !1 === e) && a()
            }
            , i)
        }
        function l() {
            return void 0 === t && !n.autoplay.running && (n.autoplay.running = !0,
            o("autoplayStart"),
            a(),
            !0)
        }
        function c() {
            return !!n.autoplay.running && void 0 !== t && (t && (clearTimeout(t),
            t = void 0),
            n.autoplay.running = !1,
            o("autoplayStop"),
            !0)
        }
        function d(e) {
            n.autoplay.running && (n.autoplay.paused || (t && clearTimeout(t),
            n.autoplay.paused = !0,
            0 !== e && n.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach(e => {
                n.$wrapperEl[0].addEventListener(e, f)
            }
            ) : (n.autoplay.paused = !1,
            a())))
        }
        function p() {
            const e = i();
            "hidden" === e.visibilityState && n.autoplay.running && d(),
            "visible" === e.visibilityState && n.autoplay.paused && (a(),
            n.autoplay.paused = !1)
        }
        function f(e) {
            n && !n.destroyed && n.$wrapperEl && e.target === n.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach(e => {
                n.$wrapperEl[0].removeEventListener(e, f)
            }
            ),
            n.autoplay.paused = !1,
            n.autoplay.running ? a() : c())
        }
        function h() {
            n.params.autoplay.disableOnInteraction ? c() : (o("autoplayPause"),
            d()),
            ["transitionend", "webkitTransitionEnd"].forEach(e => {
                n.$wrapperEl[0].removeEventListener(e, f)
            }
            )
        }
        function m() {
            n.params.autoplay.disableOnInteraction || (n.autoplay.paused = !1,
            o("autoplayResume"),
            a())
        }
        n.autoplay = {
            running: !1,
            paused: !1
        },
        r({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        }),
        s("init", () => {
            n.params.autoplay.enabled && (l(),
            i().addEventListener("visibilitychange", p),
            n.params.autoplay.pauseOnMouseEnter && (n.$el.on("mouseenter", h),
            n.$el.on("mouseleave", m)))
        }
        ),
        s("beforeTransitionStart", (e, t, i) => {
            n.autoplay.running && (i || !n.params.autoplay.disableOnInteraction ? n.autoplay.pause(t) : c())
        }
        ),
        s("sliderFirstMove", () => {
            n.autoplay.running && (n.params.autoplay.disableOnInteraction ? c() : d())
        }
        ),
        s("touchEnd", () => {
            n.params.cssMode && n.autoplay.paused && !n.params.autoplay.disableOnInteraction && a()
        }
        ),
        s("destroy", () => {
            n.$el.off("mouseenter", h),
            n.$el.off("mouseleave", m),
            n.autoplay.running && c(),
            i().removeEventListener("visibilitychange", p)
        }
        ),
        Object.assign(n.autoplay, {
            pause: d,
            run: a,
            start: l,
            stop: c
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let r = !1
          , s = !1;
        function o() {
            const e = t.thumbs.swiper;
            if (!e || e.destroyed)
                return;
            const n = e.clickedIndex
              , i = e.clickedSlide;
            if (i && c(i).hasClass(t.params.thumbs.slideThumbActiveClass))
                return;
            if (null == n)
                return;
            let r;
            if (r = e.params.loop ? parseInt(c(e.clickedSlide).attr("data-swiper-slide-index"), 10) : n,
            t.params.loop) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(),
                t._clientLeft = t.$wrapperEl[0].clientLeft,
                e = t.activeIndex);
                const n = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${r}"]`).eq(0).index()
                  , i = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${r}"]`).eq(0).index();
                r = void 0 === n ? i : void 0 === i ? n : i - e < e - n ? i : n
            }
            t.slideTo(r)
        }
        function a() {
            const {thumbs: e} = t.params;
            if (r)
                return !1;
            r = !0;
            const n = t.constructor;
            if (e.swiper instanceof n)
                t.thumbs.swiper = e.swiper,
                Object.assign(t.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                Object.assign(t.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                });
            else if (h(e.swiper)) {
                const i = Object.assign({}, e.swiper);
                Object.assign(i, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                t.thumbs.swiper = new n(i),
                s = !0
            }
            return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
            t.thumbs.swiper.on("tap", o),
            !0
        }
        function l(e) {
            const n = t.thumbs.swiper;
            if (!n || n.destroyed)
                return;
            const i = "auto" === n.params.slidesPerView ? n.slidesPerViewDynamic() : n.params.slidesPerView;
            let r = 1;
            const s = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (r = t.params.slidesPerView),
            t.params.thumbs.multipleActiveThumbs || (r = 1),
            r = Math.floor(r),
            n.slides.removeClass(s),
            n.params.loop || n.params.virtual && n.params.virtual.enabled)
                for (let e = 0; e < r; e += 1)
                    n.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex + e}"]`).addClass(s);
            else
                for (let e = 0; e < r; e += 1)
                    n.slides.eq(t.realIndex + e).addClass(s);
            const o = t.params.thumbs.autoScrollOffset
              , a = o && !n.params.loop;
            if (t.realIndex !== n.realIndex || a) {
                let r, s, l = n.activeIndex;
                if (n.params.loop) {
                    n.slides.eq(l).hasClass(n.params.slideDuplicateClass) && (n.loopFix(),
                    n._clientLeft = n.$wrapperEl[0].clientLeft,
                    l = n.activeIndex);
                    const e = n.slides.eq(l).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index()
                      , i = n.slides.eq(l).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    r = void 0 === e ? i : void 0 === i ? e : i - l == l - e ? n.params.slidesPerGroup > 1 ? i : l : i - l < l - e ? i : e,
                    s = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else
                    r = t.realIndex,
                    s = r > t.previousIndex ? "next" : "prev";
                a && (r += "next" === s ? o : -1 * o),
                n.visibleSlidesIndexes && n.visibleSlidesIndexes.indexOf(r) < 0 && (n.params.centeredSlides ? r = r > l ? r - Math.floor(i / 2) + 1 : r + Math.floor(i / 2) - 1 : r > l && n.params.slidesPerGroup,
                n.slideTo(r, e ? 0 : void 0))
            }
        }
        t.thumbs = {
            swiper: null
        },
        i("beforeInit", () => {
            const {thumbs: e} = t.params;
            e && e.swiper && (a(),
            l(!0))
        }
        ),
        i("slideChange update resize observerUpdate", () => {
            l()
        }
        ),
        i("setTransition", (e, n) => {
            const i = t.thumbs.swiper;
            i && !i.destroyed && i.setTransition(n)
        }
        ),
        i("beforeDestroy", () => {
            const e = t.thumbs.swiper;
            e && !e.destroyed && s && e.destroy()
        }
        ),
        Object.assign(t.thumbs, {
            init: a,
            update: l
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, emit: i, once: r} = e;
        n({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }),
        Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    const e = t.getTranslate();
                    t.setTranslate(e),
                    t.setTransition(0),
                    t.touchEventsData.velocities.length = 0,
                    t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate
                    })
                },
                onTouchMove: function() {
                    const {touchEventsData: e, touches: n} = t;
                    0 === e.velocities.length && e.velocities.push({
                        position: n[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }),
                    e.velocities.push({
                        position: n[t.isHorizontal() ? "currentX" : "currentY"],
                        time: p()
                    })
                },
                onTouchEnd: function(e) {
                    let {currentPos: n} = e;
                    const {params: s, $wrapperEl: o, rtlTranslate: a, snapGrid: l, touchEventsData: c} = t
                      , d = p() - c.touchStartTime;
                    if (n < -t.minTranslate())
                        t.slideTo(t.activeIndex);
                    else if (n > -t.maxTranslate())
                        t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (s.freeMode.momentum) {
                            if (c.velocities.length > 1) {
                                const e = c.velocities.pop()
                                  , n = c.velocities.pop()
                                  , i = e.position - n.position
                                  , r = e.time - n.time;
                                t.velocity = i / r,
                                t.velocity /= 2,
                                Math.abs(t.velocity) < s.freeMode.minimumVelocity && (t.velocity = 0),
                                (r > 150 || p() - e.time > 300) && (t.velocity = 0)
                            } else
                                t.velocity = 0;
                            t.velocity *= s.freeMode.momentumVelocityRatio,
                            c.velocities.length = 0;
                            let e = 1e3 * s.freeMode.momentumRatio;
                            const n = t.velocity * e;
                            let d = t.translate + n;
                            a && (d = -d);
                            let u, f = !1;
                            const h = 20 * Math.abs(t.velocity) * s.freeMode.momentumBounceRatio;
                            let m;
                            if (d < t.maxTranslate())
                                s.freeMode.momentumBounce ? (d + t.maxTranslate() < -h && (d = t.maxTranslate() - h),
                                u = t.maxTranslate(),
                                f = !0,
                                c.allowMomentumBounce = !0) : d = t.maxTranslate(),
                                s.loop && s.centeredSlides && (m = !0);
                            else if (d > t.minTranslate())
                                s.freeMode.momentumBounce ? (d - t.minTranslate() > h && (d = t.minTranslate() + h),
                                u = t.minTranslate(),
                                f = !0,
                                c.allowMomentumBounce = !0) : d = t.minTranslate(),
                                s.loop && s.centeredSlides && (m = !0);
                            else if (s.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < l.length; t += 1)
                                    if (l[t] > -d) {
                                        e = t;
                                        break
                                    }
                                d = Math.abs(l[e] - d) < Math.abs(l[e - 1] - d) || "next" === t.swipeDirection ? l[e] : l[e - 1],
                                d = -d
                            }
                            if (m && r("transitionEnd", () => {
                                t.loopFix()
                            }
                            ),
                            0 !== t.velocity) {
                                if (e = a ? Math.abs((-d - t.translate) / t.velocity) : Math.abs((d - t.translate) / t.velocity),
                                s.freeMode.sticky) {
                                    const n = Math.abs((a ? -d : d) - t.translate)
                                      , i = t.slidesSizesGrid[t.activeIndex];
                                    e = n < i ? s.speed : n < 2 * i ? 1.5 * s.speed : 2.5 * s.speed
                                }
                            } else if (s.freeMode.sticky)
                                return void t.slideToClosest();
                            s.freeMode.momentumBounce && f ? (t.updateProgress(u),
                            t.setTransition(e),
                            t.setTranslate(d),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating = !0,
                            o.transitionEnd( () => {
                                t && !t.destroyed && c.allowMomentumBounce && (i("momentumBounce"),
                                t.setTransition(s.speed),
                                setTimeout( () => {
                                    t.setTranslate(u),
                                    o.transitionEnd( () => {
                                        t && !t.destroyed && t.transitionEnd()
                                    }
                                    )
                                }
                                , 0))
                            }
                            )) : t.velocity ? (i("_freeModeNoMomentumRelease"),
                            t.updateProgress(d),
                            t.setTransition(e),
                            t.setTranslate(d),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating || (t.animating = !0,
                            o.transitionEnd( () => {
                                t && !t.destroyed && t.transitionEnd()
                            }
                            ))) : t.updateProgress(d),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses()
                        } else {
                            if (s.freeMode.sticky)
                                return void t.slideToClosest();
                            s.freeMode && i("_freeModeNoMomentumRelease")
                        }
                        (!s.freeMode.momentum || d >= s.longSwipesMs) && (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses())
                    }
                }
            }
        })
    }
    , function(e) {
        let t, n, i, {swiper: r, extendParams: s} = e;
        s({
            grid: {
                rows: 1,
                fill: "column"
            }
        }),
        r.grid = {
            initSlides: e => {
                const {slidesPerView: s} = r.params
                  , {rows: o, fill: a} = r.params.grid;
                n = t / o,
                i = Math.floor(e / o),
                t = Math.floor(e / o) === e / o ? e : Math.ceil(e / o) * o,
                "auto" !== s && "row" === a && (t = Math.max(t, s * o))
            }
            ,
            updateSlide: (e, s, o, a) => {
                const {slidesPerGroup: l, spaceBetween: c} = r.params
                  , {rows: d, fill: u} = r.params.grid;
                let p, f, h;
                if ("row" === u && l > 1) {
                    const n = Math.floor(e / (l * d))
                      , i = e - d * l * n
                      , r = 0 === n ? l : Math.min(Math.ceil((o - n * d * l) / d), l);
                    h = Math.floor(i / r),
                    f = i - h * r + n * l,
                    p = f + h * t / d,
                    s.css({
                        "-webkit-order": p,
                        order: p
                    })
                } else
                    "column" === u ? (f = Math.floor(e / d),
                    h = e - f * d,
                    (f > i || f === i && h === d - 1) && (h += 1,
                    h >= d && (h = 0,
                    f += 1))) : (h = Math.floor(e / n),
                    f = e - h * n);
                s.css(a("margin-top"), 0 !== h ? c && c + "px" : "")
            }
            ,
            updateWrapperSize: (e, n, i) => {
                const {spaceBetween: s, centeredSlides: o, roundLengths: a} = r.params
                  , {rows: l} = r.params.grid;
                if (r.virtualSize = (e + s) * t,
                r.virtualSize = Math.ceil(r.virtualSize / l) - s,
                r.$wrapperEl.css({
                    [i("width")]: r.virtualSize + s + "px"
                }),
                o) {
                    n.splice(0, n.length);
                    const e = [];
                    for (let t = 0; t < n.length; t += 1) {
                        let i = n[t];
                        a && (i = Math.floor(i)),
                        n[t] < r.virtualSize + n[0] && e.push(i)
                    }
                    n.push(...e)
                }
            }
        }
    }
    , function(e) {
        let {swiper: t} = e;
        Object.assign(t, {
            appendSlide: B.bind(t),
            prependSlide: q.bind(t),
            addSlide: V.bind(t),
            removeSlide: X.bind(t),
            removeAllSlides: G.bind(t)
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            fadeEffect: {
                crossFade: !1,
                transformEl: null
            }
        }),
        Y({
            effect: "fade",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {slides: e} = t
                  , n = t.params.fadeEffect;
                for (let i = 0; i < e.length; i += 1) {
                    const e = t.slides.eq(i);
                    let r = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (r -= t.translate);
                    let s = 0;
                    t.isHorizontal() || (s = r,
                    r = 0);
                    const o = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    U(n, e).css({
                        opacity: o
                    }).transform(`translate3d(${r}px, ${s}px, 0px)`)
                }
            }
            ,
            setTransition: e => {
                const {transformEl: n} = t.params.fadeEffect;
                (n ? t.slides.find(n) : t.slides).transition(e),
                K({
                    swiper: t,
                    duration: e,
                    transformEl: n,
                    allSlides: !0
                })
            }
            ,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const r = (e, t, n) => {
            let i = n ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top")
              , r = n ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === i.length && (i = c(`<div class="swiper-slide-shadow-${n ? "left" : "top"}"></div>`),
            e.append(i)),
            0 === r.length && (r = c(`<div class="swiper-slide-shadow-${n ? "right" : "bottom"}"></div>`),
            e.append(r)),
            i.length && (i[0].style.opacity = Math.max(-t, 0)),
            r.length && (r[0].style.opacity = Math.max(t, 0))
        }
        ;
        Y({
            effect: "cube",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {$el: e, $wrapperEl: n, slides: i, width: s, height: o, rtlTranslate: a, size: l, browser: d} = t
                  , u = t.params.cubeEffect
                  , p = t.isHorizontal()
                  , f = t.virtual && t.params.virtual.enabled;
                let h, m = 0;
                u.shadow && (p ? (h = n.find(".swiper-cube-shadow"),
                0 === h.length && (h = c('<div class="swiper-cube-shadow"></div>'),
                n.append(h)),
                h.css({
                    height: s + "px"
                })) : (h = e.find(".swiper-cube-shadow"),
                0 === h.length && (h = c('<div class="swiper-cube-shadow"></div>'),
                e.append(h))));
                for (let e = 0; e < i.length; e += 1) {
                    const t = i.eq(e);
                    let n = e;
                    f && (n = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let s = 90 * n
                      , o = Math.floor(s / 360);
                    a && (s = -s,
                    o = Math.floor(-s / 360));
                    const c = Math.max(Math.min(t[0].progress, 1), -1);
                    let d = 0
                      , h = 0
                      , g = 0;
                    n % 4 == 0 ? (d = 4 * -o * l,
                    g = 0) : (n - 1) % 4 == 0 ? (d = 0,
                    g = 4 * -o * l) : (n - 2) % 4 == 0 ? (d = l + 4 * o * l,
                    g = l) : (n - 3) % 4 == 0 && (d = -l,
                    g = 3 * l + 4 * l * o),
                    a && (d = -d),
                    p || (h = d,
                    d = 0);
                    const v = `rotateX(${p ? 0 : -s}deg) rotateY(${p ? s : 0}deg) translate3d(${d}px, ${h}px, ${g}px)`;
                    c <= 1 && c > -1 && (m = 90 * n + 90 * c,
                    a && (m = 90 * -n - 90 * c)),
                    t.transform(v),
                    u.slideShadows && r(t, c, p)
                }
                if (n.css({
                    "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                    "transform-origin": `50% 50% -${l / 2}px`
                }),
                u.shadow)
                    if (p)
                        h.transform(`translate3d(0px, ${s / 2 + u.shadowOffset}px, ${-s / 2}px) rotateX(90deg) rotateZ(0deg) scale(${u.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90)
                          , t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2)
                          , n = u.shadowScale
                          , i = u.shadowScale / t
                          , r = u.shadowOffset;
                        h.transform(`scale3d(${n}, 1, ${i}) translate3d(0px, ${o / 2 + r}px, ${-o / 2 / i}px) rotateX(-90deg)`)
                    }
                const g = d.isSafari || d.isWebView ? -l / 2 : 0;
                n.transform(`translate3d(0px,0,${g}px) rotateX(${t.isHorizontal() ? 0 : m}deg) rotateY(${t.isHorizontal() ? -m : 0}deg)`),
                n[0].style.setProperty("--swiper-cube-translate-z", g + "px")
            }
            ,
            setTransition: e => {
                const {$el: n, slides: i} = t;
                i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                t.params.cubeEffect.shadow && !t.isHorizontal() && n.find(".swiper-cube-shadow").transition(e)
            }
            ,
            recreateShadows: () => {
                const e = t.isHorizontal();
                t.slides.each(t => {
                    const n = Math.max(Math.min(t.progress, 1), -1);
                    r(c(t), n, e)
                }
                )
            }
            ,
            getEffectParams: () => t.params.cubeEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null
            }
        });
        const r = (e, n, i) => {
            let r = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top")
              , s = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
            0 === r.length && (r = Q(i, e, t.isHorizontal() ? "left" : "top")),
            0 === s.length && (s = Q(i, e, t.isHorizontal() ? "right" : "bottom")),
            r.length && (r[0].style.opacity = Math.max(-n, 0)),
            s.length && (s[0].style.opacity = Math.max(n, 0))
        }
        ;
        Y({
            effect: "flip",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {slides: e, rtlTranslate: n} = t
                  , i = t.params.flipEffect;
                for (let s = 0; s < e.length; s += 1) {
                    const o = e.eq(s);
                    let a = o[0].progress;
                    t.params.flipEffect.limitRotation && (a = Math.max(Math.min(o[0].progress, 1), -1));
                    const l = o[0].swiperSlideOffset;
                    let c = -180 * a
                      , d = 0
                      , u = t.params.cssMode ? -l - t.translate : -l
                      , p = 0;
                    t.isHorizontal() ? n && (c = -c) : (p = u,
                    u = 0,
                    d = -c,
                    c = 0),
                    o[0].style.zIndex = -Math.abs(Math.round(a)) + e.length,
                    i.slideShadows && r(o, a, i);
                    const f = `translate3d(${u}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${c}deg)`;
                    U(i, o).transform(f)
                }
            }
            ,
            setTransition: e => {
                const {transformEl: n} = t.params.flipEffect;
                (n ? t.slides.find(n) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                K({
                    swiper: t,
                    duration: e,
                    transformEl: n
                })
            }
            ,
            recreateShadows: () => {
                const e = t.params.flipEffect;
                t.slides.each(n => {
                    const i = c(n);
                    let s = i[0].progress;
                    t.params.flipEffect.limitRotation && (s = Math.max(Math.min(n.progress, 1), -1)),
                    r(i, s, e)
                }
                )
            }
            ,
            getEffectParams: () => t.params.flipEffect,
            perspective: () => !0,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null
            }
        }),
        Y({
            effect: "coverflow",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {width: e, height: n, slides: i, slidesSizesGrid: r} = t
                  , s = t.params.coverflowEffect
                  , o = t.isHorizontal()
                  , a = t.translate
                  , l = o ? e / 2 - a : n / 2 - a
                  , c = o ? s.rotate : -s.rotate
                  , d = s.depth;
                for (let e = 0, t = i.length; e < t; e += 1) {
                    const t = i.eq(e)
                      , n = r[e]
                      , a = (l - t[0].swiperSlideOffset - n / 2) / n
                      , u = "function" == typeof s.modifier ? s.modifier(a) : a * s.modifier;
                    let p = o ? c * u : 0
                      , f = o ? 0 : c * u
                      , h = -d * Math.abs(u)
                      , m = s.stretch;
                    "string" == typeof m && -1 !== m.indexOf("%") && (m = parseFloat(s.stretch) / 100 * n);
                    let g = o ? 0 : m * u
                      , v = o ? m * u : 0
                      , b = 1 - (1 - s.scale) * Math.abs(u);
                    Math.abs(v) < .001 && (v = 0),
                    Math.abs(g) < .001 && (g = 0),
                    Math.abs(h) < .001 && (h = 0),
                    Math.abs(p) < .001 && (p = 0),
                    Math.abs(f) < .001 && (f = 0),
                    Math.abs(b) < .001 && (b = 0);
                    const y = `translate3d(${v}px,${g}px,${h}px)  rotateX(${f}deg) rotateY(${p}deg) scale(${b})`;
                    if (U(s, t).transform(y),
                    t[0].style.zIndex = 1 - Math.abs(Math.round(u)),
                    s.slideShadows) {
                        let e = o ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top")
                          , n = o ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = Q(s, t, o ? "left" : "top")),
                        0 === n.length && (n = Q(s, t, o ? "right" : "bottom")),
                        e.length && (e[0].style.opacity = u > 0 ? u : 0),
                        n.length && (n[0].style.opacity = -u > 0 ? -u : 0)
                    }
                }
            }
            ,
            setTransition: e => {
                const {transformEl: n} = t.params.coverflowEffect;
                (n ? t.slides.find(n) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
            ,
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const r = e => "string" == typeof e ? e : e + "px";
        Y({
            effect: "creative",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {slides: e, $wrapperEl: n, slidesSizesGrid: i} = t
                  , s = t.params.creativeEffect
                  , {progressMultiplier: o} = s
                  , a = t.params.centeredSlides;
                if (a) {
                    const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                    n.transform(`translateX(calc(50% - ${e}px))`)
                }
                for (let n = 0; n < e.length; n += 1) {
                    const i = e.eq(n)
                      , l = i[0].progress
                      , c = Math.min(Math.max(i[0].progress, -s.limitProgress), s.limitProgress);
                    let d = c;
                    a || (d = Math.min(Math.max(i[0].originalProgress, -s.limitProgress), s.limitProgress));
                    const u = i[0].swiperSlideOffset
                      , p = [t.params.cssMode ? -u - t.translate : -u, 0, 0]
                      , f = [0, 0, 0];
                    let h = !1;
                    t.isHorizontal() || (p[1] = p[0],
                    p[0] = 0);
                    let m = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    c < 0 ? (m = s.next,
                    h = !0) : c > 0 && (m = s.prev,
                    h = !0),
                    p.forEach( (e, t) => {
                        p[t] = `calc(${e}px + (${r(m.translate[t])} * ${Math.abs(c * o)}))`
                    }
                    ),
                    f.forEach( (e, t) => {
                        f[t] = m.rotate[t] * Math.abs(c * o)
                    }
                    ),
                    i[0].style.zIndex = -Math.abs(Math.round(l)) + e.length;
                    const g = p.join(", ")
                      , v = `rotateX(${f[0]}deg) rotateY(${f[1]}deg) rotateZ(${f[2]}deg)`
                      , b = d < 0 ? `scale(${1 + (1 - m.scale) * d * o})` : `scale(${1 - (1 - m.scale) * d * o})`
                      , y = d < 0 ? 1 + (1 - m.opacity) * d * o : 1 - (1 - m.opacity) * d * o
                      , w = `translate3d(${g}) ${v} ${b}`;
                    if (h && m.shadow || !h) {
                        let e = i.children(".swiper-slide-shadow");
                        if (0 === e.length && m.shadow && (e = Q(s, i)),
                        e.length) {
                            const t = s.shadowPerProgress ? c * (1 / s.limitProgress) : c;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const x = U(s, i);
                    x.transform(w).css({
                        opacity: y
                    }),
                    m.origin && x.css("transform-origin", m.origin)
                }
            }
            ,
            setTransition: e => {
                const {transformEl: n} = t.params.creativeEffect;
                (n ? t.slides.find(n) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e),
                K({
                    swiper: t,
                    duration: e,
                    transformEl: n,
                    allSlides: !0
                })
            }
            ,
            perspective: () => t.params.creativeEffect.perspective,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: n, on: i} = e;
        n({
            cardsEffect: {
                slideShadows: !0,
                transformEl: null,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        }),
        Y({
            effect: "cards",
            swiper: t,
            on: i,
            setTranslate: () => {
                const {slides: e, activeIndex: n} = t
                  , i = t.params.cardsEffect
                  , {startTranslate: r, isTouched: s} = t.touchEventsData
                  , o = t.translate;
                for (let a = 0; a < e.length; a += 1) {
                    const l = e.eq(a)
                      , c = l[0].progress
                      , d = Math.min(Math.max(c, -4), 4);
                    let u = l[0].swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
                    t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset);
                    let p = t.params.cssMode ? -u - t.translate : -u
                      , f = 0;
                    const h = -100 * Math.abs(d);
                    let m = 1
                      , g = -i.perSlideRotate * d
                      , v = i.perSlideOffset - .75 * Math.abs(d);
                    const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + a : a
                      , y = (b === n || b === n - 1) && d > 0 && d < 1 && (s || t.params.cssMode) && o < r
                      , w = (b === n || b === n + 1) && d < 0 && d > -1 && (s || t.params.cssMode) && o > r;
                    if (y || w) {
                        const e = (1 - Math.abs((Math.abs(d) - .5) / .5)) ** .5;
                        g += -28 * d * e,
                        m += -.5 * e,
                        v += 96 * e,
                        f = -25 * e * Math.abs(d) + "%"
                    }
                    if (p = d < 0 ? `calc(${p}px + (${v * Math.abs(d)}%))` : d > 0 ? `calc(${p}px + (-${v * Math.abs(d)}%))` : p + "px",
                    !t.isHorizontal()) {
                        const e = f;
                        f = p,
                        p = e
                    }
                    const x = d < 0 ? "" + (1 + (1 - m) * d) : "" + (1 - (1 - m) * d)
                      , E = `\n        translate3d(${p}, ${f}, ${h}px)\n        rotateZ(${i.rotate ? g : 0}deg)\n        scale(${x})\n      `;
                    if (i.slideShadows) {
                        let e = l.find(".swiper-slide-shadow");
                        0 === e.length && (e = Q(i, l)),
                        e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(d) - .5) / .5, 0), 1))
                    }
                    l[0].style.zIndex = -Math.abs(Math.round(c)) + e.length,
                    U(i, l).transform(E)
                }
            }
            ,
            setTransition: e => {
                const {transformEl: n} = t.params.cardsEffect;
                (n ? t.slides.find(n) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e),
                K({
                    swiper: t,
                    duration: e,
                    transformEl: n
                })
            }
            ,
            perspective: () => !0,
            overwriteParams: () => ({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    ];
    return F.use(Z),
    F
}
)),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("ScrollCarousel", [], t) : "object" == typeof exports ? exports.ScrollCarousel = t() : e.ScrollCarousel = t()
}(this, (function() {
    return function() {
        "use strict";
        var e = {
            d: function(t, n) {
                for (var i in n)
                    e.o(n, i) && !e.o(t, i) && Object.defineProperty(t, i, {
                        enumerable: !0,
                        get: n[i]
                    })
            },
            o: function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }
        }
          , t = {};
        e.d(t, {
            default: function() {
                return T
            }
        });
        var n = "rtl"
          , i = "ltr";
        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function s(e) {
            return function(e) {
                if (Array.isArray(e))
                    return o(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return o(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
                }
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function o(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function a(e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }
        function l(e) {
            return Array.isArray(e) ? e : null == e ? [] : "object" == r(e) && "number" == typeof e.length ? s(e) : [e]
        }
        function c(e) {
            return Object.keys(e).includes("speed") && !Number(e.speed) && (e.speed = 7),
            Number(e.speed) <= 0 && (e.speed = 1),
            Object.keys(e).includes("margin") && !Number(e.margin) && 0 !== Number(e.margin) && (e.margin = 10),
            Object.keys(e).includes("direction") && (e.direction = e.direction.toLowerCase()),
            Object.keys(e).includes("direction") && e.direction !== n && e.direction !== i && (e.direction = n),
            Object.keys(e).includes("autoplaySpeed") && !Number(e.autoplaySpeed) && (e.autoplaySpeed = 5),
            Number(e.autoplaySpeed) <= 0 && (e.autoplaySpeed = 1),
            e
        }
        function d(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function u() {}
        var p = u.prototype;
        function f(e) {
            return function(e) {
                if (Array.isArray(e))
                    return h(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return h(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(e, t) : void 0
                }
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function h(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function m(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(e);
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable
                }
                ))),
                n.push.apply(n, i)
            }
            return n
        }
        function g(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? m(Object(n), !0).forEach((function(t) {
                    v(e, t, n[t])
                }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                }
                ))
            }
            return e
        }
        function v(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n,
            e
        }
        p.on = function(e, t) {
            if (!e || !t)
                return this;
            var n = this._events = this._events || {}
              , i = n[e] = n[e] || [];
            return i.includes(t) || i.push(t),
            this
        }
        ,
        p.once = function(e, t) {
            if (!e || !t)
                return this;
            this.on(e, t);
            var n = this._onceEvents = this._onceEvents || {};
            return (n[e] = n[e] || {})[t] = !0,
            this
        }
        ,
        p.off = function(e, t) {
            var n = this._events && this._events[e];
            if (!n || !n.length)
                return this;
            var i = n.indexOf(t);
            return -1 != i && n.splice(i, 1),
            this
        }
        ,
        p.emitEvent = function(e, t) {
            var n = this._events && this._events[e];
            if (!n || !n.length)
                return this;
            n = n.slice(0),
            t = t || [];
            var i, r = this._onceEvents && this._onceEvents[e], s = function(e, t) {
                var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!n) {
                    if (Array.isArray(e) || (n = function(e, t) {
                        if (e) {
                            if ("string" == typeof e)
                                return d(e, t);
                            var n = Object.prototype.toString.call(e).slice(8, -1);
                            return "Object" === n && e.constructor && (n = e.constructor.name),
                            "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0
                        }
                    }(e)) || t && e && "number" == typeof e.length) {
                        n && (e = n);
                        var i = 0
                          , r = function() {};
                        return {
                            s: r,
                            n: function() {
                                return i >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[i++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: r
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var s, o = !0, a = !1;
                return {
                    s: function() {
                        n = n.call(e)
                    },
                    n: function() {
                        var e = n.next();
                        return o = e.done,
                        e
                    },
                    e: function(e) {
                        a = !0,
                        s = e
                    },
                    f: function() {
                        try {
                            o || null == n.return || n.return()
                        } finally {
                            if (a)
                                throw s
                        }
                    }
                }
            }(n);
            try {
                for (s.s(); !(i = s.n()).done; ) {
                    var o = i.value;
                    r && r[o] && (this.off(e, o),
                    delete r[o]),
                    o.apply(this, t)
                }
            } catch (e) {
                s.e(e)
            } finally {
                s.f()
            }
            return this
        }
        ,
        p.allOff = function() {
            return delete this._events,
            delete this._onceEvents,
            this
        }
        ;
        var b = 0
          , y = {};
        function w(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
              , n = a(e);
            if (n) {
                if (this.element = n,
                this.element.scrollCarouselGUID) {
                    var i = y[this.element.scrollCarouselGUID];
                    return i && i.option(t),
                    i
                }
                this.baseOption = t,
                this.options = g({}, this.constructor.defaults);
                var r = c(t);
                this.option(r),
                this._create()
            } else
                console && console.error("Bad element for Scroll Carousel: ".concat(n || e))
        }
        w.defaults = {
            speed: 7,
            smartSpeed: !1,
            margin: 10,
            autoplay: !1,
            autoplaySpeed: 5,
            slideSelector: null,
            direction: n
        };
        var x, E, _, S = w.prototype;
        Object.assign(S, u.prototype),
        S._create = function() {
            var e = this.guid = ++b;
            for (var t in this.element.scrollCarouselGUID = e,
            y[e] = this,
            this._createViewport(),
            this._createSlider(),
            this.options.on) {
                var n = this.options.on[t];
                this.on(t, n)
            }
            this.activate()
        }
        ,
        S.option = function(e) {
            Object.assign(this.options, e)
        }
        ,
        S.activate = function() {
            var e, t = this;
            if (!this.isActive) {
                this.isActive = !0,
                this.translate = 0,
                this.displacement = 0,
                this.isScrolling = !0,
                this.prevPosition = document.body.scrollTop || document.documentElement.scrollTop,
                this.baseElems = l(this.element.children);
                var n = this._filterFindSlideElements(this.element.children);
                this.slideElems = this._makeSlides(n),
                this.options.direction === i && (this.slideElems = this.slideElems.reverse());
                var r = this.slideElems.map((function(e) {
                    return e.cloneNode(!0)
                }
                ));
                (e = this.slider).append.apply(e, f(this.slideElems).concat(f(r))),
                this.viewport.append(this.slider),
                this.element.append(this.viewport),
                this.options.direction === i && this._supportLtr(),
                this.options.autoplay && this._autoplay(),
                this.emitEvent("ready"),
                window.addEventListener("scroll", (function() {
                    return t._transform()
                }
                ))
            }
        }
        ,
        S._autoplay = function() {
            var e = this;
            this.interval = setInterval((function() {
                e._transform()
            }
            ), 10)
        }
        ,
        S._transform = function() {
            (function(e) {
                if (!e)
                    return !1;
                var t = e.getBoundingClientRect()
                  , n = window.innerHeight || document.documentElement.clientHeight
                  , i = window.innerWidth || document.documentElement.clientWidth
                  , r = t.top <= n && t.top + t.height >= 0
                  , s = t.left <= i && t.left + t.width >= 0;
                return r && s
            }
            )(this.element) && (this.options.autoplay && this._setIsScrolling(),
            this.options.smartSpeed ? this._calcSmartSpeed() : this._calcRegularSpeed(),
            this.emitEvent("move", [this.progress]))
        }
        ,
        S._calcRegularSpeed = function() {
            var e = this.slider.getBoundingClientRect();
            this.slider.style.transform = "translateX(".concat(this.translate, "px)");
            var t = this.isScrolling ? this.options.speed : 1.2;
            this.options.direction === n && (this.translate -= t),
            this.options.direction === i && (this.translate += t),
            this.options.direction === n && this.translate <= -e.width / 2 && (this.translate = 0),
            this.options.direction === i && this.translate >= 0 && (this.translate = -e.width / 2),
            this.progress = 100 * -this.translate / e.width * 2
        }
        ,
        S._calcSmartSpeed = function() {
            var e = document.body.scrollTop || document.documentElement.scrollTop;
            this.displacement -= this.isScrolling ? Math.abs(this.prevPosition - e) : 1.2,
            this.options.direction === i && this.displacement < 0 && (this.displacement = 50 / (10 * this.options.speed / 5500 % 50));
            var t, r = this.displacement / 5500 * (10 * this.options.speed) % 50;
            this.progress = 2 * -r,
            this.options.direction === n && (t = r),
            this.options.direction === i && (t = -r),
            this.slider.style.transform = "translateX(".concat(t, "%)"),
            this.prevPosition = e
        }
        ,
        S._supportLtr = function() {
            var e = this.slider.getBoundingClientRect();
            this.translate = -e.width + Math.min(document.documentElement.clientWidth, window.innerWidth);
            var t = 100 * this.translate / e.width;
            this.displacement = -t / (10 * this.options.speed / 5500 % 50),
            this.options.smartSpeed ? this.slider.style.transform = "translateX(".concat(t, "%)") : this.slider.style.transform = "translateX(".concat(this.translate, "px)")
        }
        ,
        S._setIsScrolling = function() {
            var e = document.body.scrollTop || document.documentElement.scrollTop;
            this.isScrolling = !0,
            this.prevPosition !== e ? this.options.smartSpeed || (this.prevPosition = e) : this.isScrolling = !1
        }
        ,
        S._makeSlide = function(e) {
            var t = document.createElement("div");
            return t.style.marginRight = this.options.margin + "px",
            t.className = "sc-slide",
            this.slideElem = t,
            this.slideElem.append(e),
            this.slideElem
        }
        ,
        S._makeSlides = function(e) {
            var t = this;
            return e.map((function(e) {
                return t._makeSlide(e)
            }
            ))
        }
        ,
        S._createSlider = function() {
            var e = document.createElement("div");
            e.className = "scroll-carousel-slider",
            this.slider = e
        }
        ,
        S._createViewport = function() {
            this.viewport = document.createElement("div"),
            this.viewport.className = "scroll-carousel-viewport"
        }
        ,
        S._filterFindSlideElements = function(e) {
            return function(e, t) {
                return (e = l(e)).filter((function(e) {
                    return e instanceof HTMLElement
                }
                )).reduce((function(e, n) {
                    var i;
                    if (!t)
                        return e.push(n),
                        e;
                    n.matches(t) && e.push(n);
                    var r = n.querySelectorAll(t);
                    return (i = e).concat.apply(i, s(r))
                }
                ), [])
            }(e, this.options.slideSelector)
        }
        ,
        S.destroy = function() {
            var e;
            this.isActive && (this.viewport.remove(),
            (e = this.element).append.apply(e, f(this.baseElems)),
            this.isActive = !1,
            clearInterval(this.interval),
            window.removeEventListener("scroll", this),
            this.emitEvent("destroy"),
            this.allOff(),
            delete this.element.scrollCarouselGUID,
            delete y[this.guid])
        }
        ,
        S.reinit = function() {
            return new w(this.element,this.baseOption)
        }
        ,
        w.data = function(e) {
            if (e = a(e))
                return y[e.scrollCarouselGUID]
        }
        ,
        x = w,
        E = function() {
            var e = "data-" + "carousel".replace(/(.)([A-Z])/g, (function(e, t, n) {
                return t + "-" + n
            }
            )).toLowerCase();
            s(document.querySelectorAll("[".concat(e, "]"))).forEach((function(t) {
                var n, i = t.getAttribute(e);
                try {
                    n = i && JSON.parse(i)
                } catch (n) {
                    return void (console && console.error("Error parsing ".concat(e, " on ").concat(t.className, ": ").concat(n)))
                }
                new x(t,n)
            }
            ))
        }
        ,
        "complete" == (_ = document.readyState) || "interactive" == _ ? setTimeout(E) : document.addEventListener("DOMContentLoaded", E);
        var T = w;
        return t.default
    }()
}
)),
function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var i in n)
            ("object" == typeof exports ? exports : e)[i] = n[i]
    }
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, n),
            r.l = !0,
            r.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (n.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    n.d(i, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return i
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        n.r(t);
        var i, r = "fslightbox-", s = "".concat(r, "styles"), o = "".concat(r, "cursor-grabbing"), a = "".concat(r, "full-dimension"), l = "".concat(r, "flex-centered"), c = "".concat(r, "open"), d = "".concat(r, "transform-transition"), u = "".concat(r, "absoluted"), p = "".concat(r, "slide-btn"), f = "".concat(p, "-container"), h = "".concat(r, "fade-in"), m = "".concat(r, "fade-out"), g = h + "-strong", v = m + "-strong", b = "".concat(r, "opacity-"), y = "".concat(b, "1"), w = "".concat(r, "source");
        function x(e) {
            return (x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            )(e)
        }
        function E(e) {
            var t = e.stageIndexes
              , n = e.core.stageManager
              , i = e.props.sources.length - 1;
            n.getPreviousSlideIndex = function() {
                return 0 === t.current ? i : t.current - 1
            }
            ,
            n.getNextSlideIndex = function() {
                return t.current === i ? 0 : t.current + 1
            }
            ,
            n.updateStageIndexes = 0 === i ? function() {}
            : 1 === i ? function() {
                0 === t.current ? (t.next = 1,
                delete t.previous) : (t.previous = 0,
                delete t.next)
            }
            : function() {
                t.previous = n.getPreviousSlideIndex(),
                t.next = n.getNextSlideIndex()
            }
            ,
            n.i = i <= 2 ? function() {
                return !0
            }
            : function(e) {
                var n = t.current;
                if (0 === n && e === i || n === i && 0 === e)
                    return !0;
                var r = n - e;
                return -1 === r || 0 === r || 1 === r
            }
        }
        function _(e) {
            var t, n = e.props, i = 0, r = {};
            this.getSourceTypeFromLocalStorageByUrl = function(e) {
                return t[e] ? t[e] : s(e)
            }
            ,
            this.handleReceivedSourceTypeForUrl = function(e, n) {
                if (!1 === r[n] && (i--,
                "invalid" !== e ? r[n] = e : delete r[n],
                0 === i)) {
                    !function(e, t) {
                        for (var n in t)
                            e[n] = t[n]
                    }(t, r);
                    try {
                        localStorage.setItem("fslightbox-types", JSON.stringify(t))
                    } catch (e) {}
                }
            }
            ;
            var s = function(e) {
                i++,
                r[e] = !1
            };
            if (n.disableLocalStorage)
                this.getSourceTypeFromLocalStorageByUrl = function() {}
                ,
                this.handleReceivedSourceTypeForUrl = function() {}
                ;
            else {
                try {
                    t = JSON.parse(localStorage.getItem("fslightbox-types"))
                } catch (e) {}
                t || (t = {},
                this.getSourceTypeFromLocalStorageByUrl = s)
            }
        }
        function S(e, t, n, i) {
            var r = e.data
              , s = e.elements.sources
              , o = n / i
              , a = 0;
            this.adjustSize = function() {
                if ((a = r.maxSourceWidth / o) < r.maxSourceHeight)
                    return n < r.maxSourceWidth && (a = i),
                    l();
                a = i > r.maxSourceHeight ? r.maxSourceHeight : i,
                l()
            }
            ;
            var l = function() {
                s[t].style.width = a * o + "px",
                s[t].style.height = a + "px"
            }
        }
        function T(e, t) {
            var n = this
              , i = e.collections.sourceSizers
              , r = e.elements
              , s = r.sourceAnimationWrappers
              , o = r.sources
              , a = e.isl
              , l = e.resolve;
            function c(e, n) {
                i[t] = l(S, [t, e, n]),
                i[t].adjustSize()
            }
            this.runActions = function(e, i) {
                a[t] = !0,
                o[t].classList.add(y),
                s[t].classList.add(g),
                s[t].removeChild(s[t].firstChild),
                c(e, i),
                n.runActions = c
            }
        }
        function C(e, t) {
            var n, i = this, r = e.elements.sources, s = e.props, o = (0,
            e.resolve)(T, [t]);
            this.handleImageLoad = function(e) {
                var t = e.target
                  , n = t.naturalWidth
                  , i = t.naturalHeight;
                o.runActions(n, i)
            }
            ,
            this.handleVideoLoad = function(e) {
                var t = e.target
                  , i = t.videoWidth
                  , r = t.videoHeight;
                n = !0,
                o.runActions(i, r)
            }
            ,
            this.handleNotMetaDatedVideoLoad = function() {
                n || i.handleYoutubeLoad()
            }
            ,
            this.handleYoutubeLoad = function() {
                var e = 1920
                  , t = 1080;
                s.maxYoutubeDimensions && (e = s.maxYoutubeDimensions.width,
                t = s.maxYoutubeDimensions.height),
                o.runActions(e, t)
            }
            ,
            this.handleCustomLoad = function() {
                var e = r[t]
                  , n = e.offsetWidth
                  , s = e.offsetHeight;
                n && s ? o.runActions(n, s) : setTimeout(i.handleCustomLoad)
            }
        }
        function A(e, t, n) {
            var i = e.elements.sources
              , r = e.props.customClasses
              , s = r[t] ? r[t] : "";
            i[t].className = n + " " + s
        }
        function M(e, t) {
            var n = e.elements.sources
              , i = e.props.customAttributes;
            for (var r in i[t])
                n[t].setAttribute(r, i[t][r])
        }
        function k(e, t) {
            var n = e.collections.sourceLoadHandlers
              , i = e.elements
              , r = i.sources
              , s = i.sourceAnimationWrappers
              , o = e.props.sources;
            r[t] = document.createElement("img"),
            A(e, t, w),
            r[t].src = o[t],
            r[t].onload = n[t].handleImageLoad,
            M(e, t),
            s[t].appendChild(r[t])
        }
        function O(e, t) {
            var n = e.collections.sourceLoadHandlers
              , i = e.elements
              , r = i.sources
              , s = i.sourceAnimationWrappers
              , o = e.props
              , a = o.sources
              , l = o.videosPosters;
            r[t] = document.createElement("video"),
            A(e, t, w),
            r[t].src = a[t],
            r[t].onloadedmetadata = function(e) {
                n[t].handleVideoLoad(e)
            }
            ,
            r[t].controls = !0,
            M(e, t),
            l[t] && (r[t].poster = l[t]);
            var c = document.createElement("source");
            c.src = a[t],
            r[t].appendChild(c),
            setTimeout(n[t].handleNotMetaDatedVideoLoad, 3e3),
            s[t].appendChild(r[t])
        }
        function P(e, t) {
            var n = e.collections.sourceLoadHandlers
              , i = e.elements
              , s = i.sources
              , o = i.sourceAnimationWrappers
              , a = e.props.sources;
            s[t] = document.createElement("iframe"),
            A(e, t, "".concat(w, " ").concat(r, "youtube-iframe"));
            var l = a[t]
              , c = l.split("?")[1];
            s[t].src = "https://www.youtube.com/embed/".concat(l.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2], "?").concat(c || ""),
            s[t].allowFullscreen = !0,
            M(e, t),
            o[t].appendChild(s[t]),
            n[t].handleYoutubeLoad()
        }
        function L(e, t) {
            var n = e.collections.sourceLoadHandlers
              , i = e.elements
              , r = i.sources
              , s = i.sourceAnimationWrappers
              , o = e.props.sources;
            r[t] = o[t],
            A(e, t, "".concat(r[t].className, " ").concat(w)),
            s[t].appendChild(r[t]),
            n[t].handleCustomLoad()
        }
        function I(e, t) {
            var n = e.elements
              , i = n.sources
              , s = n.sourceAnimationWrappers;
            e.props.sources,
            i[t] = document.createElement("div"),
            i[t].className = "".concat(r, "invalid-file-wrapper ").concat(l),
            i[t].innerHTML = "Invalid source",
            s[t].classList.add(g),
            s[t].removeChild(s[t].firstChild),
            s[t].appendChild(i[t])
        }
        function $(e) {
            var t = e.collections
              , n = t.sourceLoadHandlers
              , i = t.sourcesRenderFunctions
              , r = e.core.sourceDisplayFacade
              , s = e.resolve;
            this.runActionsForSourceTypeAndIndex = function(t, o) {
                var a;
                switch ("invalid" !== t && (n[o] = s(C, [o])),
                t) {
                case "image":
                    a = k;
                    break;
                case "video":
                    a = O;
                    break;
                case "youtube":
                    a = P;
                    break;
                case "custom":
                    a = L;
                    break;
                default:
                    a = I
                }
                i[o] = function() {
                    return a(e, o)
                }
                ,
                r.displaySourcesWhichShouldBeDisplayed()
            }
        }
        function z() {
            var e, t, n, i = function(e) {
                var t = document.createElement("a");
                return t.href = e,
                "www.youtube.com" === t.hostname || "youtu.be" === t.hostname
            }, r = function(e) {
                return e.slice(0, e.indexOf("/"))
            };
            function s() {
                if (4 !== n.readyState) {
                    if (2 === n.readyState) {
                        var e;
                        switch (r(n.getResponseHeader("content-type"))) {
                        case "image":
                            e = "image";
                            break;
                        case "video":
                            e = "video";
                            break;
                        default:
                            e = "invalid"
                        }
                        n.onreadystatechange = null,
                        n.abort(),
                        t(e)
                    }
                } else
                    t("invalid")
            }
            this.setUrlToCheck = function(t) {
                e = t
            }
            ,
            this.getSourceType = function(r) {
                if (i(e))
                    return r("youtube");
                t = r,
                (n = new XMLHttpRequest).onreadystatechange = s,
                n.open("GET", e, !0),
                n.send()
            }
        }
        function D(e, t, n) {
            var i = e.props
              , r = i.types
              , s = i.type
              , o = i.sources
              , a = e.resolve;
            this.getTypeSetByClientForIndex = function(e) {
                var t;
                return r && r[e] ? t = r[e] : s && (t = s),
                t
            }
            ,
            this.retrieveTypeWithXhrForIndex = function(e) {
                var i = a(z);
                i.setUrlToCheck(o[e]),
                i.getSourceType((function(i) {
                    t.handleReceivedSourceTypeForUrl(i, o[e]),
                    n.runActionsForSourceTypeAndIndex(i, e)
                }
                ))
            }
        }
        function j(e, t) {
            var n = e.core.stageManager
              , i = e.elements
              , r = i.smw
              , s = i.sourceWrappersContainer
              , o = e.props
              , c = 0
              , p = document.createElement("div");
            function f(e) {
                p.style.transform = "translateX(".concat(e + c, "px)"),
                c = 0
            }
            function h() {
                return (1 + o.slideDistance) * innerWidth
            }
            p.className = "".concat(u, " ").concat(a, " ").concat(l),
            p.s = function() {
                p.style.display = "flex"
            }
            ,
            p.h = function() {
                p.style.display = "none"
            }
            ,
            p.a = function() {
                p.classList.add(d)
            }
            ,
            p.d = function() {
                p.classList.remove(d)
            }
            ,
            p.n = function() {
                p.style.removeProperty("transform")
            }
            ,
            p.v = function(e) {
                return c = e,
                p
            }
            ,
            p.ne = function() {
                f(-h())
            }
            ,
            p.z = function() {
                f(0)
            }
            ,
            p.p = function() {
                f(h())
            }
            ,
            n.i(t) || p.h(),
            r[t] = p,
            s.appendChild(p),
            function(e, t) {
                var n = e.elements
                  , i = n.smw
                  , r = n.sourceAnimationWrappers
                  , s = document.createElement("div")
                  , o = document.createElement("div");
                o.className = "fslightboxl";
                for (var a = 0; a < 3; a++) {
                    var l = document.createElement("div");
                    o.appendChild(l)
                }
                s.appendChild(o),
                i[t].appendChild(s),
                r[t] = s
            }(e, t)
        }
        function N(e, t, n, i) {
            var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            s.setAttributeNS(null, "width", t),
            s.setAttributeNS(null, "height", t),
            s.setAttributeNS(null, "viewBox", n);
            var o = document.createElementNS("http://www.w3.org/2000/svg", "path");
            return o.setAttributeNS(null, "class", "".concat(r, "svg-path")),
            o.setAttributeNS(null, "d", i),
            s.appendChild(o),
            e.appendChild(s),
            s
        }
        function H(e, t) {
            var n = document.createElement("div");
            return n.className = "".concat(r, "toolbar-button ").concat(l),
            n.title = t,
            e.appendChild(n),
            n
        }
        function F(e) {
            var t = e.props.sources
              , n = e.elements.container
              , i = document.createElement("div");
            i.className = "".concat(r, "nav"),
            n.appendChild(i),
            function(e, t) {
                var n = document.createElement("div");
                n.className = "".concat(r, "toolbar"),
                t.appendChild(n),
                function(e, t) {
                    var n = e.componentsServices
                      , i = e.data
                      , r = e.fs
                      , s = "M4.5 11H3v4h4v-1.5H4.5V11zM3 7h1.5V4.5H7V3H3v4zm10.5 6.5H11V15h4v-4h-1.5v2.5zM11 3v1.5h2.5V7H15V3h-4z"
                      , o = H(t);
                    o.title = "Enter fullscreen";
                    var a = N(o, "20px", "0 0 18 18", s);
                    n.ofs = function() {
                        i.ifs = !0,
                        o.title = "Exit fullscreen",
                        a.setAttributeNS(null, "width", "24px"),
                        a.setAttributeNS(null, "height", "24px"),
                        a.setAttributeNS(null, "viewBox", "0 0 950 1024"),
                        a.firstChild.setAttributeNS(null, "d", "M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z")
                    }
                    ,
                    n.xfs = function() {
                        i.ifs = !1,
                        o.title = "Enter fullscreen",
                        a.setAttributeNS(null, "width", "20px"),
                        a.setAttributeNS(null, "height", "20px"),
                        a.setAttributeNS(null, "viewBox", "0 0 18 18"),
                        a.firstChild.setAttributeNS(null, "d", s)
                    }
                    ,
                    o.onclick = r.t
                }(e, n),
                function(e, t) {
                    var n = H(t, "Close");
                    n.onclick = e.core.lightboxCloser.closeLightbox,
                    N(n, "20px", "0 0 24 24", "M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z")
                }(e, n)
            }(e, i),
            t.length > 1 && function(e, t) {
                var n = e.componentsServices
                  , i = e.props.sources
                  , s = (e.stageIndexes,
                document.createElement("div"));
                s.className = "".concat(r, "slide-number-container");
                var o = document.createElement("div");
                o.className = l;
                var a = document.createElement("span");
                n.setSlideNumber = function(e) {
                    return a.innerHTML = e
                }
                ;
                var c = document.createElement("span");
                c.className = "".concat(r, "slash");
                var d = document.createElement("div");
                d.innerHTML = i.length,
                s.appendChild(o),
                o.appendChild(a),
                o.appendChild(c),
                o.appendChild(d),
                t.appendChild(s),
                setTimeout((function() {
                    o.offsetWidth > 55 && (s.style.justifyContent = "flex-start")
                }
                ))
            }(e, i)
        }
        function R(e, t, n, i) {
            var r = e.elements.container
              , s = n.charAt(0).toUpperCase() + n.slice(1)
              , o = document.createElement("div");
            o.className = "".concat(f, " ").concat(f, "-").concat(n),
            o.title = "".concat(s, " slide"),
            o.onclick = t,
            function(e, t) {
                var n = document.createElement("div");
                n.className = "".concat(p, " ").concat(l),
                N(n, "20px", "0 0 20 20", t),
                e.appendChild(n)
            }(o, i),
            r.appendChild(o)
        }
        function W(e) {
            var t = e.core
              , n = t.lightboxCloser
              , i = t.slideChangeFacade
              , r = e.fs;
            this.listener = function(e) {
                switch (e.key) {
                case "Escape":
                    n.closeLightbox();
                    break;
                case "ArrowLeft":
                    i.changeToPrevious();
                    break;
                case "ArrowRight":
                    i.changeToNext();
                    break;
                case "F11":
                    e.preventDefault(),
                    r.t()
                }
            }
        }
        function B(e) {
            var t = e.elements
              , n = e.sourcePointerProps
              , i = e.stageIndexes;
            function r(e, i) {
                t.smw[e].v(n.swipedX)[i]()
            }
            this.runActionsForEvent = function(e) {
                var s, a, l;
                t.container.contains(t.slideSwipingHoverer) || t.container.appendChild(t.slideSwipingHoverer),
                s = t.container,
                a = o,
                (l = s.classList).contains(a) || l.add(a),
                n.swipedX = e.screenX - n.downScreenX;
                var c = i.previous
                  , d = i.next;
                r(i.current, "z"),
                void 0 !== c && n.swipedX > 0 ? r(c, "ne") : void 0 !== d && n.swipedX < 0 && r(d, "p")
            }
        }
        function q(e) {
            var t = e.props.sources
              , n = e.resolve
              , i = e.sourcePointerProps
              , r = n(B);
            1 === t.length ? this.listener = function() {
                i.swipedX = 1
            }
            : this.listener = function(e) {
                i.isPointering && r.runActionsForEvent(e)
            }
        }
        function V(e) {
            var t = e.core.slideIndexChanger
              , n = e.elements.smw
              , i = e.stageIndexes
              , r = e.sws;
            function s(e) {
                var t = n[i.current];
                t.a(),
                t[e]()
            }
            function o(e, t) {
                void 0 !== e && (n[e].s(),
                n[e][t]())
            }
            this.runPositiveSwipedXActions = function() {
                var e = i.previous;
                if (void 0 === e)
                    s("z");
                else {
                    s("p");
                    var n = i.next;
                    t.changeTo(e);
                    var a = i.previous;
                    r.d(a),
                    r.b(n),
                    s("z"),
                    o(a, "ne")
                }
            }
            ,
            this.runNegativeSwipedXActions = function() {
                var e = i.next;
                if (void 0 === e)
                    s("z");
                else {
                    s("ne");
                    var n = i.previous;
                    t.changeTo(e);
                    var a = i.next;
                    r.d(a),
                    r.b(n),
                    s("z"),
                    o(a, "p")
                }
            }
        }
        function X(e, t) {
            e.contains(t) && e.removeChild(t)
        }
        function G(e) {
            var t = e.core.lightboxCloser
              , n = e.elements
              , i = e.resolve
              , r = e.sourcePointerProps
              , s = i(V);
            this.runNoSwipeActions = function() {
                X(n.container, n.slideSwipingHoverer),
                r.isSourceDownEventTarget || t.closeLightbox(),
                r.isPointering = !1
            }
            ,
            this.runActions = function() {
                r.swipedX > 0 ? s.runPositiveSwipedXActions() : s.runNegativeSwipedXActions(),
                X(n.container, n.slideSwipingHoverer),
                n.container.classList.remove(o),
                r.isPointering = !1
            }
        }
        function Y(e) {
            var t = e.resolve
              , n = e.sourcePointerProps
              , i = t(G);
            this.listener = function() {
                n.isPointering && (n.swipedX ? i.runActions() : i.runNoSwipeActions())
            }
        }
        function U(e) {
            var t = this
              , n = e.core
              , i = n.eventsDispatcher
              , r = n.globalEventsController
              , s = n.scrollbarRecompensor
              , o = e.data
              , a = e.elements
              , l = e.fs
              , d = e.props
              , u = e.sourcePointerProps;
            this.isLightboxFadingOut = !1,
            this.runActions = function() {
                t.isLightboxFadingOut = !0,
                a.container.classList.add(v),
                r.removeListeners(),
                d.exitFullscreenOnClose && o.ifs && l.x(),
                setTimeout((function() {
                    t.isLightboxFadingOut = !1,
                    u.isPointering = !1,
                    a.container.classList.remove(v),
                    document.documentElement.classList.remove(c),
                    s.removeRecompense(),
                    document.body.removeChild(a.container),
                    i.dispatch("onClose")
                }
                ), 270)
            }
        }
        function K(e, t) {
            var n = e.classList;
            n.contains(t) && n.remove(t)
        }
        function Q(e) {
            var t, n, i;
            n = (t = e).core.eventsDispatcher,
            i = t.props,
            n.dispatch = function(e) {
                i[e] && i[e]()
            }
            ,
            function(e) {
                var t = e.componentsServices
                  , n = e.data
                  , i = e.fs
                  , r = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
                function s(e) {
                    for (var t = 0; t < r.length; t++)
                        document[e](r[t], o)
                }
                function o() {
                    document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement ? t.ofs() : t.xfs()
                }
                i.o = function() {
                    t.ofs();
                    var e = document.documentElement;
                    e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
                }
                ,
                i.x = function() {
                    t.xfs(),
                    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
                }
                ,
                i.t = function() {
                    n.ifs ? i.x() : i.o()
                }
                ,
                i.l = function() {
                    s("addEventListener")
                }
                ,
                i.q = function() {
                    s("removeEventListener")
                }
            }(e),
            function(e) {
                var t = e.core
                  , n = t.globalEventsController
                  , i = t.windowResizeActioner
                  , r = e.fs
                  , s = e.resolve
                  , o = s(W)
                  , a = s(q)
                  , l = s(Y);
                n.attachListeners = function() {
                    document.addEventListener("pointermove", a.listener),
                    document.addEventListener("pointerup", l.listener),
                    addEventListener("resize", i.runActions),
                    document.addEventListener("keydown", o.listener),
                    r.l()
                }
                ,
                n.removeListeners = function() {
                    document.removeEventListener("pointermove", a.listener),
                    document.removeEventListener("pointerup", l.listener),
                    removeEventListener("resize", i.runActions),
                    document.removeEventListener("keydown", o.listener),
                    r.q()
                }
            }(e),
            function(e) {
                var t = e.core.lightboxCloser
                  , n = (0,
                e.resolve)(U);
                t.closeLightbox = function() {
                    n.isLightboxFadingOut || n.runActions()
                }
            }(e),
            function(e) {
                var t = e.data
                  , n = e.core.scrollbarRecompensor;
                function i() {
                    document.body.offsetHeight > innerHeight && (document.body.style.marginRight = t.scrollbarWidth + "px")
                }
                n.addRecompense = function() {
                    "complete" === document.readyState ? i() : addEventListener("load", (function() {
                        i(),
                        n.addRecompense = i
                    }
                    ))
                }
                ,
                n.removeRecompense = function() {
                    document.body.style.removeProperty("margin-right")
                }
            }(e),
            function(e) {
                var t = e.core
                  , n = t.slideChangeFacade
                  , i = t.slideIndexChanger
                  , r = t.stageManager;
                e.props.sources.length > 1 ? (n.changeToPrevious = function() {
                    i.jumpTo(r.getPreviousSlideIndex())
                }
                ,
                n.changeToNext = function() {
                    i.jumpTo(r.getNextSlideIndex())
                }
                ) : (n.changeToPrevious = function() {}
                ,
                n.changeToNext = function() {}
                )
            }(e),
            function(e) {
                var t = e.componentsServices
                  , n = e.core
                  , i = n.slideIndexChanger
                  , r = n.sourceDisplayFacade
                  , s = n.stageManager
                  , o = e.elements
                  , a = o.smw
                  , l = o.sourceAnimationWrappers
                  , c = e.isl
                  , d = e.stageIndexes
                  , u = e.sws;
                i.changeTo = function(e) {
                    d.current = e,
                    s.updateStageIndexes(),
                    t.setSlideNumber(e + 1),
                    r.displaySourcesWhichShouldBeDisplayed()
                }
                ,
                i.jumpTo = function(e) {
                    var t = d.previous
                      , n = d.current
                      , r = d.next
                      , o = c[n]
                      , p = c[e];
                    i.changeTo(e);
                    for (var f = 0; f < a.length; f++)
                        a[f].d();
                    u.d(n),
                    u.c(),
                    requestAnimationFrame((function() {
                        requestAnimationFrame((function() {
                            var e = d.previous
                              , i = d.next;
                            function f() {
                                s.i(n) ? n === d.previous ? a[n].ne() : n === d.next && a[n].p() : (a[n].h(),
                                a[n].n())
                            }
                            o && l[n].classList.add(m),
                            p && l[d.current].classList.add(h),
                            u.a(),
                            void 0 !== e && e !== n && a[e].ne(),
                            a[d.current].n(),
                            void 0 !== i && i !== n && a[i].p(),
                            u.b(t),
                            u.b(r),
                            c[n] ? setTimeout(f, 260) : f()
                        }
                        ))
                    }
                    ))
                }
            }(e),
            function(e) {
                var t = e.core.sourcesPointerDown
                  , n = e.elements
                  , i = n.smw
                  , r = n.sources
                  , s = e.sourcePointerProps
                  , o = e.stageIndexes;
                t.listener = function(e) {
                    "VIDEO" !== e.target.tagName && e.preventDefault(),
                    s.isPointering = !0,
                    s.downScreenX = e.screenX,
                    s.swipedX = 0;
                    var t = r[o.current];
                    t && t.contains(e.target) ? s.isSourceDownEventTarget = !0 : s.isSourceDownEventTarget = !1;
                    for (var n = 0; n < i.length; n++)
                        i[n].d()
                }
            }(e),
            function(e) {
                var t = e.collections.sourcesRenderFunctions
                  , n = e.core.sourceDisplayFacade
                  , i = e.props
                  , r = e.stageIndexes;
                function s(e) {
                    t[e] && (t[e](),
                    delete t[e])
                }
                n.displaySourcesWhichShouldBeDisplayed = function() {
                    if (i.loadOnlyCurrentSource)
                        s(r.current);
                    else
                        for (var e in r)
                            s(r[e])
                }
            }(e),
            function(e) {
                var t = e.core.stageManager
                  , n = e.elements
                  , i = n.smw
                  , r = n.sourceAnimationWrappers
                  , s = e.isl
                  , o = e.stageIndexes
                  , a = e.sws;
                a.a = function() {
                    for (var e in o)
                        i[o[e]].s()
                }
                ,
                a.b = function(e) {
                    void 0 === e || t.i(e) || (i[e].h(),
                    i[e].n())
                }
                ,
                a.c = function() {
                    for (var e in o)
                        a.d(o[e])
                }
                ,
                a.d = function(e) {
                    if (s[e]) {
                        var t = r[e];
                        K(t, g),
                        K(t, h),
                        K(t, m)
                    }
                }
            }(e),
            function(e) {
                var t = e.collections.sourceSizers
                  , n = e.core.windowResizeActioner
                  , i = e.data
                  , r = e.elements.smw
                  , s = e.stageIndexes;
                n.runActions = function() {
                    innerWidth < 992 ? i.maxSourceWidth = innerWidth : i.maxSourceWidth = .9 * innerWidth,
                    i.maxSourceHeight = .9 * innerHeight;
                    for (var e = 0; e < r.length; e++)
                        r[e].d(),
                        t[e] && t[e].adjustSize();
                    var n = s.previous
                      , o = s.next;
                    void 0 !== n && r[n].ne(),
                    void 0 !== o && r[o].p()
                }
            }(e)
        }
        function Z(e, t, n) {
            return (Z = J() ? Reflect.construct.bind() : function(e, t, n) {
                var i = [null];
                i.push.apply(i, t);
                var r = new (Function.bind.apply(e, i));
                return n && ee(r, n.prototype),
                r
            }
            ).apply(null, arguments)
        }
        function J() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
            if (Reflect.construct.sham)
                return !1;
            if ("function" == typeof Proxy)
                return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                ))),
                !0
            } catch (e) {
                return !1
            }
        }
        function ee(e, t) {
            return (ee = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                return e.__proto__ = t,
                e
            }
            )(e, t)
        }
        function te(e) {
            return function(e) {
                if (Array.isArray(e))
                    return ne(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return ne(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name),
                    "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ne(e, t) : void 0
                }
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function ne(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function ie() {
            for (var e = document.getElementsByTagName("a"), t = function(t) {
                if (!e[t].hasAttribute("data-fslightbox"))
                    return "continue";
                var n = e[t].hasAttribute("data-href") ? e[t].getAttribute("data-href") : e[t].getAttribute("href");
                if (!n)
                    return console.warn('The "data-fslightbox" attribute was set without the "href" attribute.'),
                    "continue";
                var i = e[t].getAttribute("data-fslightbox");
                fsLightboxInstances[i] || (fsLightboxInstances[i] = new FsLightbox);
                var r = null;
                "#" === n.charAt(0) ? (r = document.getElementById(n.substring(1)).cloneNode(!0)).removeAttribute("id") : r = n,
                fsLightboxInstances[i].props.sources.push(r),
                fsLightboxInstances[i].elements.a.push(e[t]);
                var s = fsLightboxInstances[i].props.sources.length - 1;
                e[t].onclick = function(e) {
                    e.preventDefault(),
                    fsLightboxInstances[i].open(s)
                }
                ,
                u("types", "data-type"),
                u("videosPosters", "data-video-poster"),
                u("customClasses", "data-class"),
                u("customClasses", "data-custom-class");
                for (var o = ["href", "data-fslightbox", "data-href", "data-type", "data-video-poster", "data-class", "data-custom-class"], a = e[t].attributes, l = fsLightboxInstances[i].props.customAttributes, c = 0; c < a.length; c++)
                    if (-1 === o.indexOf(a[c].name) && "data-" === a[c].name.substr(0, 5)) {
                        l[s] || (l[s] = {});
                        var d = a[c].name.substr(5);
                        l[s][d] = a[c].value
                    }
                function u(n, r) {
                    e[t].hasAttribute(r) && (fsLightboxInstances[i].props[n][s] = e[t].getAttribute(r))
                }
            }, n = 0; n < e.length; n++)
                t(n);
            var i = Object.keys(fsLightboxInstances);
            window.fsLightbox = fsLightboxInstances[i[i.length - 1]]
        }
        "object" === ("undefined" == typeof document ? "undefined" : x(document)) && ((i = document.createElement("style")).className = s,
        i.appendChild(document.createTextNode(".fslightbox-absoluted{position:absolute;top:0;left:0}.fslightbox-fade-in{animation:fslightbox-fade-in .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out{animation:fslightbox-fade-out .3s ease}.fslightbox-fade-in-strong{animation:fslightbox-fade-in-strong .3s cubic-bezier(0,0,.7,1)}.fslightbox-fade-out-strong{animation:fslightbox-fade-out-strong .3s ease}@keyframes fslightbox-fade-in{from{opacity:.65}to{opacity:1}}@keyframes fslightbox-fade-out{from{opacity:.35}to{opacity:0}}@keyframes fslightbox-fade-in-strong{from{opacity:.3}to{opacity:1}}@keyframes fslightbox-fade-out-strong{from{opacity:1}to{opacity:0}}.fslightbox-cursor-grabbing{cursor:grabbing}.fslightbox-full-dimension{width:100%;height:100%}.fslightbox-open{overflow:hidden;height:100%}.fslightbox-flex-centered{display:flex;justify-content:center;align-items:center}.fslightbox-opacity-0{opacity:0!important}.fslightbox-opacity-1{opacity:1!important}.fslightbox-scrollbarfix{padding-right:17px}.fslightbox-transform-transition{transition:transform .3s}.fslightbox-container{font-family:Arial,sans-serif;position:fixed;top:0;left:0;background:linear-gradient(rgba(30,30,30,.9),#000 1810%);touch-action:pinch-zoom;z-index:1000000000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.fslightbox-container *{box-sizing:border-box}.fslightbox-svg-path{transition:fill .15s ease;fill:#ddd}.fslightbox-nav{height:45px;width:100%;position:absolute;top:0;left:0}.fslightbox-slide-number-container{display:flex;justify-content:center;align-items:center;position:relative;height:100%;font-size:15px;color:#d7d7d7;z-index:0;max-width:55px;text-align:left}.fslightbox-slide-number-container .fslightbox-flex-centered{height:100%}.fslightbox-slash{display:block;margin:0 5px;width:1px;height:12px;transform:rotate(15deg);background:#fff}.fslightbox-toolbar{position:absolute;z-index:3;right:0;top:0;height:100%;display:flex;background:rgba(35,35,35,.65)}.fslightbox-toolbar-button{height:100%;width:45px;cursor:pointer}.fslightbox-toolbar-button:hover .fslightbox-svg-path{fill:#fff}.fslightbox-slide-btn-container{display:flex;align-items:center;padding:12px 12px 12px 6px;position:absolute;top:50%;cursor:pointer;z-index:3;transform:translateY(-50%)}@media (min-width:476px){.fslightbox-slide-btn-container{padding:22px 22px 22px 6px}}@media (min-width:768px){.fslightbox-slide-btn-container{padding:30px 30px 30px 6px}}.fslightbox-slide-btn-container:hover .fslightbox-svg-path{fill:#f1f1f1}.fslightbox-slide-btn{padding:9px;font-size:26px;background:rgba(35,35,35,.65)}@media (min-width:768px){.fslightbox-slide-btn{padding:10px}}@media (min-width:1600px){.fslightbox-slide-btn{padding:11px}}.fslightbox-slide-btn-container-previous{left:0}@media (max-width:475.99px){.fslightbox-slide-btn-container-previous{padding-left:3px}}.fslightbox-slide-btn-container-next{right:0;padding-left:12px;padding-right:3px}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-left:22px}}@media (min-width:768px){.fslightbox-slide-btn-container-next{padding-left:30px}}@media (min-width:476px){.fslightbox-slide-btn-container-next{padding-right:6px}}.fslightbox-down-event-detector{position:absolute;z-index:1}.fslightbox-slide-swiping-hoverer{z-index:4}.fslightbox-invalid-file-wrapper{font-size:22px;color:#eaebeb;margin:auto}.fslightbox-video{object-fit:cover}.fslightbox-youtube-iframe{border:0}.fslightboxl{display:block;margin:auto;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:67px;height:67px}.fslightboxl div{box-sizing:border-box;display:block;position:absolute;width:54px;height:54px;margin:6px;border:5px solid;border-color:#999 transparent transparent transparent;border-radius:50%;animation:fslightboxl 1.2s cubic-bezier(.5,0,.5,1) infinite}.fslightboxl div:nth-child(1){animation-delay:-.45s}.fslightboxl div:nth-child(2){animation-delay:-.3s}.fslightboxl div:nth-child(3){animation-delay:-.15s}@keyframes fslightboxl{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.fslightbox-source{position:relative;z-index:2;opacity:0}")),
        document.head.appendChild(i)),
        window.FsLightbox = function() {
            var e = this;
            this.props = {
                sources: [],
                customAttributes: [],
                customClasses: [],
                types: [],
                videosPosters: [],
                slideDistance: .3
            },
            this.data = {
                isFullscreenOpen: !1,
                maxSourceWidth: 0,
                maxSourceHeight: 0,
                scrollbarWidth: 0
            },
            this.isl = [],
            this.sourcePointerProps = {
                downScreenX: null,
                isPointering: !1,
                isSourceDownEventTarget: !1,
                swipedX: 0
            },
            this.stageIndexes = {},
            this.elements = {
                a: [],
                container: null,
                slideSwipingHoverer: null,
                smw: [],
                sourceWrappersContainer: null,
                sources: [],
                sourceAnimationWrappers: []
            },
            this.componentsServices = {
                setSlideNumber: function() {}
            },
            this.resolve = function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                return n.unshift(e),
                Z(t, te(n))
            }
            ,
            this.collections = {
                sourceLoadHandlers: [],
                sourcesRenderFunctions: [],
                sourceSizers: []
            },
            this.core = {
                eventsDispatcher: {},
                globalEventsController: {},
                lightboxCloser: {},
                lightboxUpdater: {},
                scrollbarRecompensor: {},
                slideChangeFacade: {},
                slideIndexChanger: {},
                sourcesPointerDown: {},
                sourceDisplayFacade: {},
                stageManager: {},
                windowResizeActioner: {}
            },
            this.fs = {},
            this.sws = {},
            function(e) {
                var t = e.componentsServices
                  , n = e.core
                  , i = n.eventsDispatcher
                  , s = n.globalEventsController
                  , o = n.scrollbarRecompensor
                  , l = n.sourceDisplayFacade
                  , d = n.stageManager
                  , p = n.windowResizeActioner
                  , f = e.data
                  , h = e.elements
                  , m = (e.props,
                e.stageIndexes)
                  , v = e.sws;
                function b() {
                    var t, n;
                    f.i = !0,
                    f.scrollbarWidth = function() {
                        var e = document.createElement("div")
                          , t = e.style
                          , n = document.createElement("div");
                        t.visibility = "hidden",
                        t.width = "100px",
                        t.msOverflowStyle = "scrollbar",
                        t.overflow = "scroll",
                        n.style.width = "100%",
                        document.body.appendChild(e);
                        var i = e.offsetWidth;
                        e.appendChild(n);
                        var r = n.offsetWidth;
                        return document.body.removeChild(e),
                        i - r
                    }(),
                    Q(e),
                    h.container = document.createElement("div"),
                    h.container.className = "".concat(r, "container ").concat(a, " ").concat(g),
                    function(e) {
                        var t = e.elements;
                        t.slideSwipingHoverer = document.createElement("div"),
                        t.slideSwipingHoverer.className = "".concat(r, "slide-swiping-hoverer ").concat(a, " ").concat(u)
                    }(e),
                    F(e),
                    function(e) {
                        var t = e.core.sourcesPointerDown
                          , n = e.elements
                          , i = e.props.sources
                          , r = document.createElement("div");
                        r.className = "".concat(u, " ").concat(a),
                        n.container.appendChild(r),
                        r.addEventListener("pointerdown", t.listener),
                        n.sourceWrappersContainer = r;
                        for (var s = 0; s < i.length; s++)
                            j(e, s)
                    }(e),
                    e.props.sources.length > 1 && (n = (t = e).core.slideChangeFacade,
                    R(t, n.changeToPrevious, "previous", "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788S18.707,9.212,18.271,9.212z"),
                    R(t, n.changeToNext, "next", "M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788S1.293,9.212,1.729,9.212z")),
                    function(e) {
                        for (var t = e.props.sources, n = e.resolve, i = n(_), r = n($), s = n(D, [i, r]), o = 0; o < t.length; o++)
                            if ("string" == typeof t[o]) {
                                var a = s.getTypeSetByClientForIndex(o);
                                if (a)
                                    r.runActionsForSourceTypeAndIndex(a, o);
                                else {
                                    var l = i.getSourceTypeFromLocalStorageByUrl(t[o]);
                                    l ? r.runActionsForSourceTypeAndIndex(l, o) : s.retrieveTypeWithXhrForIndex(o)
                                }
                            } else
                                r.runActionsForSourceTypeAndIndex("custom", o)
                    }(e),
                    i.dispatch("onInit")
                }
                e.open = function() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
                      , r = m.previous
                      , a = m.current
                      , u = m.next;
                    m.current = n,
                    f.i || E(e),
                    d.updateStageIndexes(),
                    f.i ? (v.c(),
                    v.a(),
                    v.b(r),
                    v.b(a),
                    v.b(u),
                    i.dispatch("onShow")) : b(),
                    l.displaySourcesWhichShouldBeDisplayed(),
                    t.setSlideNumber(n + 1),
                    document.body.appendChild(h.container),
                    document.documentElement.classList.add(c),
                    o.addRecompense(),
                    s.attachListeners(),
                    p.runActions(),
                    h.smw[m.current].n(),
                    i.dispatch("onOpen")
                }
            }(this),
            this.close = function() {
                return e.core.lightboxCloser.closeLightbox()
            }
        }
        ,
        window.fsLightboxInstances = {},
        ie(),
        window.refreshFsLightbox = function() {
            for (var e in fsLightboxInstances) {
                var t = fsLightboxInstances[e].props;
                fsLightboxInstances[e] = new FsLightbox,
                fsLightboxInstances[e].props = t,
                fsLightboxInstances[e].props.sources = [],
                fsLightboxInstances[e].elements.a = []
            }
            ie()
        }
    }
    ])
}
)),
function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("simpleParallax", [], t) : "object" == typeof exports ? exports.simpleParallax = t() : e.simpleParallax = t()
}(window, (function() {
    return function(e) {
        var t = {};
        function n(i) {
            if (t[i])
                return t[i].exports;
            var r = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(r.exports, r, r.exports, n),
            r.l = !0,
            r.exports
        }
        return n.m = e,
        n.c = t,
        n.d = function(e, t, i) {
            n.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        n.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
            Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }
        ,
        n.t = function(e, t) {
            if (1 & t && (e = n(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (n.r(i),
            Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }),
            2 & t && "string" != typeof e)
                for (var r in e)
                    n.d(i, r, function(t) {
                        return e[t]
                    }
                    .bind(null, r));
            return i
        }
        ,
        n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            }
            : function() {
                return e
            }
            ;
            return n.d(t, "a", t),
            t
        }
        ,
        n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        n.p = "",
        n(n.s = 0)
    }([function(e, t, n) {
        "use strict";
        n.r(t),
        n.d(t, "default", (function() {
            return b
        }
        ));
        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var r = new (function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.positions = {
                    top: 0,
                    bottom: 0,
                    height: 0
                }
            }
            var t, n;
            return t = e,
            (n = [{
                key: "setViewportTop",
                value: function(e) {
                    return this.positions.top = e ? e.scrollTop : window.pageYOffset,
                    this.positions
                }
            }, {
                key: "setViewportBottom",
                value: function() {
                    return this.positions.bottom = this.positions.top + this.positions.height,
                    this.positions
                }
            }, {
                key: "setViewportAll",
                value: function(e) {
                    return this.positions.top = e ? e.scrollTop : window.pageYOffset,
                    this.positions.height = e ? e.clientHeight : document.documentElement.clientHeight,
                    this.positions.bottom = this.positions.top + this.positions.height,
                    this.positions
                }
            }]) && i(t.prototype, n),
            e
        }())
          , s = function(e) {
            return NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) ? Array.from(e) : "string" == typeof e || e instanceof String ? document.querySelectorAll(e) : [e]
        }
          , o = function() {
            for (var e, t = "transform webkitTransform mozTransform oTransform msTransform".split(" "), n = 0; void 0 === e; )
                e = void 0 !== document.createElement("div").style[t[n]] ? t[n] : void 0,
                n += 1;
            return e
        }();
        function a(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function l(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var c = function() {
            function e(t, n) {
                var i = this;
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                this.element = t,
                this.elementContainer = t,
                this.settings = n,
                this.isVisible = !0,
                this.isInit = !1,
                this.oldTranslateValue = -1,
                this.init = this.init.bind(this),
                this.customWrapper = this.settings.customWrapper && this.element.closest(this.settings.customWrapper) ? this.element.closest(this.settings.customWrapper) : null,
                function(e) {
                    return "img" !== e.tagName.toLowerCase() && "picture" !== e.tagName.toLowerCase() || !!e && !!e.complete && (void 0 === e.naturalWidth || 0 !== e.naturalWidth)
                }(t) ? this.init() : this.element.addEventListener("load", (function() {
                    setTimeout((function() {
                        i.init(!0)
                    }
                    ), 50)
                }
                ))
            }
            var t, n;
            return t = e,
            (n = [{
                key: "init",
                value: function(e) {
                    var t = this;
                    this.isInit || (e && (this.rangeMax = null),
                    this.element.closest(".simpleParallax") || (!1 === this.settings.overflow && this.wrapElement(this.element),
                    this.setTransformCSS(),
                    this.getElementOffset(),
                    this.intersectionObserver(),
                    this.getTranslateValue(),
                    this.animate(),
                    this.settings.delay > 0 ? setTimeout((function() {
                        t.setTransitionCSS(),
                        t.elementContainer.classList.add("simple-parallax-initialized")
                    }
                    ), 10) : this.elementContainer.classList.add("simple-parallax-initialized"),
                    this.isInit = !0))
                }
            }, {
                key: "wrapElement",
                value: function() {
                    var e = this.element.closest("picture") || this.element
                      , t = this.customWrapper || document.createElement("div");
                    t.classList.add("simpleParallax"),
                    t.style.overflow = "hidden",
                    this.customWrapper || (e.parentNode.insertBefore(t, e),
                    t.appendChild(e)),
                    this.elementContainer = t
                }
            }, {
                key: "unWrapElement",
                value: function() {
                    var e = this.elementContainer;
                    this.customWrapper ? (e.classList.remove("simpleParallax"),
                    e.style.overflow = "") : e.replaceWith.apply(e, function(e) {
                        return function(e) {
                            if (Array.isArray(e))
                                return a(e)
                        }(e) || function(e) {
                            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                                return Array.from(e)
                        }(e) || function(e, t) {
                            if (e) {
                                if ("string" == typeof e)
                                    return a(e, t);
                                var n = Object.prototype.toString.call(e).slice(8, -1);
                                return "Object" === n && e.constructor && (n = e.constructor.name),
                                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? a(e, t) : void 0
                            }
                        }(e) || function() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }()
                    }(e.childNodes))
                }
            }, {
                key: "setTransformCSS",
                value: function() {
                    !1 === this.settings.overflow && (this.element.style[o] = "scale(".concat(this.settings.scale, ")")),
                    this.element.style.willChange = "transform"
                }
            }, {
                key: "setTransitionCSS",
                value: function() {
                    this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition)
                }
            }, {
                key: "unSetStyle",
                value: function() {
                    this.element.style.willChange = "",
                    this.element.style[o] = "",
                    this.element.style.transition = ""
                }
            }, {
                key: "getElementOffset",
                value: function() {
                    var e = this.elementContainer.getBoundingClientRect();
                    if (this.elementHeight = e.height,
                    this.elementTop = e.top + r.positions.top,
                    this.settings.customContainer) {
                        var t = this.settings.customContainer.getBoundingClientRect();
                        this.elementTop = e.top - t.top + r.positions.top
                    }
                    this.elementBottom = this.elementHeight + this.elementTop
                }
            }, {
                key: "buildThresholdList",
                value: function() {
                    for (var e = [], t = 1; t <= this.elementHeight; t++) {
                        var n = t / this.elementHeight;
                        e.push(n)
                    }
                    return e
                }
            }, {
                key: "intersectionObserver",
                value: function() {
                    var e = {
                        root: null,
                        threshold: this.buildThresholdList()
                    };
                    this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this),e),
                    this.observer.observe(this.element)
                }
            }, {
                key: "intersectionObserverCallback",
                value: function(e) {
                    var t = this;
                    e.forEach((function(e) {
                        e.isIntersecting ? t.isVisible = !0 : t.isVisible = !1
                    }
                    ))
                }
            }, {
                key: "checkIfVisible",
                value: function() {
                    return this.elementBottom > r.positions.top && this.elementTop < r.positions.bottom
                }
            }, {
                key: "getRangeMax",
                value: function() {
                    var e = this.element.clientHeight;
                    this.rangeMax = e * this.settings.scale - e
                }
            }, {
                key: "getTranslateValue",
                value: function() {
                    var e = ((r.positions.bottom - this.elementTop) / ((r.positions.height + this.elementHeight) / 100)).toFixed(1);
                    return e = Math.min(100, Math.max(0, e)),
                    0 !== this.settings.maxTransition && e > this.settings.maxTransition && (e = this.settings.maxTransition),
                    this.oldPercentage !== e && (this.rangeMax || this.getRangeMax(),
                    this.translateValue = (e / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0),
                    this.oldTranslateValue !== this.translateValue && (this.oldPercentage = e,
                    this.oldTranslateValue = this.translateValue,
                    !0))
                }
            }, {
                key: "animate",
                value: function() {
                    var e, t = 0, n = 0;
                    (this.settings.orientation.includes("left") || this.settings.orientation.includes("right")) && (n = "".concat(this.settings.orientation.includes("left") ? -1 * this.translateValue : this.translateValue, "px")),
                    (this.settings.orientation.includes("up") || this.settings.orientation.includes("down")) && (t = "".concat(this.settings.orientation.includes("up") ? -1 * this.translateValue : this.translateValue, "px")),
                    e = !1 === this.settings.overflow ? "translate3d(".concat(n, ", ").concat(t, ", 0) scale(").concat(this.settings.scale, ")") : "translate3d(".concat(n, ", ").concat(t, ", 0)"),
                    this.element.style[o] = e
                }
            }]) && l(t.prototype, n),
            e
        }();
        function d(e) {
            return function(e) {
                if (Array.isArray(e))
                    return p(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                    return Array.from(e)
            }(e) || u(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function u(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return p(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(e, t) : void 0
            }
        }
        function p(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, i = new Array(t); n < t; n++)
                i[n] = e[n];
            return i
        }
        function f(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i)
            }
        }
        var h, m, g = !1, v = [], b = function() {
            function e(t, n) {
                if (function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e),
                t && Element.prototype.closest && "IntersectionObserver"in window) {
                    if (this.elements = s(t),
                    this.defaults = {
                        delay: 0,
                        orientation: "up",
                        scale: 1.3,
                        overflow: !1,
                        transition: "cubic-bezier(0,0,0,1)",
                        customContainer: "",
                        customWrapper: "",
                        maxTransition: 0
                    },
                    this.settings = Object.assign(this.defaults, n),
                    this.settings.customContainer) {
                        var i = function(e, t) {
                            return function(e) {
                                if (Array.isArray(e))
                                    return e
                            }(e) || function(e, t) {
                                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                                    var n = []
                                      , i = !0
                                      , r = !1
                                      , s = void 0;
                                    try {
                                        for (var o, a = e[Symbol.iterator](); !(i = (o = a.next()).done) && (n.push(o.value),
                                        !t || n.length !== t); i = !0)
                                            ;
                                    } catch (e) {
                                        r = !0,
                                        s = e
                                    } finally {
                                        try {
                                            i || null == a.return || a.return()
                                        } finally {
                                            if (r)
                                                throw s
                                        }
                                    }
                                    return n
                                }
                            }(e, t) || u(e, t) || function() {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }()
                        }(s(this.settings.customContainer), 1);
                        this.customContainer = i[0]
                    }
                    this.lastPosition = -1,
                    this.resizeIsDone = this.resizeIsDone.bind(this),
                    this.refresh = this.refresh.bind(this),
                    this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this),
                    this.init()
                }
            }
            var t, n;
            return t = e,
            (n = [{
                key: "init",
                value: function() {
                    var e = this;
                    r.setViewportAll(this.customContainer),
                    v = [].concat(d(this.elements.map((function(t) {
                        return new c(t,e.settings)
                    }
                    ))), d(v)),
                    g || (this.proceedRequestAnimationFrame(),
                    window.addEventListener("resize", this.resizeIsDone),
                    g = !0)
                }
            }, {
                key: "resizeIsDone",
                value: function() {
                    clearTimeout(m),
                    m = setTimeout(this.refresh, 200)
                }
            }, {
                key: "proceedRequestAnimationFrame",
                value: function() {
                    var e = this;
                    r.setViewportTop(this.customContainer),
                    this.lastPosition !== r.positions.top ? (r.setViewportBottom(),
                    v.forEach((function(t) {
                        e.proceedElement(t)
                    }
                    )),
                    h = window.requestAnimationFrame(this.proceedRequestAnimationFrame),
                    this.lastPosition = r.positions.top) : h = window.requestAnimationFrame(this.proceedRequestAnimationFrame)
                }
            }, {
                key: "proceedElement",
                value: function(e) {
                    (this.customContainer ? e.checkIfVisible() : e.isVisible) && e.getTranslateValue() && e.animate()
                }
            }, {
                key: "refresh",
                value: function() {
                    r.setViewportAll(this.customContainer),
                    v.forEach((function(e) {
                        e.getElementOffset(),
                        e.getRangeMax()
                    }
                    )),
                    this.lastPosition = -1
                }
            }, {
                key: "destroy",
                value: function() {
                    var e = this
                      , t = [];
                    v = v.filter((function(n) {
                        return e.elements.includes(n.element) ? (t.push(n),
                        !1) : n
                    }
                    )),
                    t.forEach((function(t) {
                        t.unSetStyle(),
                        !1 === e.settings.overflow && t.unWrapElement()
                    }
                    )),
                    v.length || (window.cancelAnimationFrame(h),
                    window.removeEventListener("resize", this.refresh),
                    g = !1)
                }
            }]) && f(t.prototype, n),
            e
        }()
    }
    ]).default
}
)),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Pristine = t()
}(this, (function() {
    "use strict";
    var e = {
        required: "This field is required",
        email: "This field requires a valid e-mail address",
        number: "This field requires a number",
        integer: "This field requires an integer value",
        url: "This field requires a valid website URL",
        tel: "This field requires a valid telephone number",
        maxlength: "This fields length must be < ${1}",
        minlength: "This fields length must be > ${1}",
        min: "Minimum value for this field is ${1}",
        max: "Maximum value for this field is ${1}",
        pattern: "Please match the requested format"
    };
    function t(e) {
        var t = arguments;
        return this.replace(/\${([^{}]*)}/g, (function(e, n) {
            return t[n]
        }
        ))
    }
    function n(e) {
        return e.pristine.self.form.querySelectorAll('input[name="' + e.getAttribute("name") + '"]:checked').length
    }
    var i = {
        classTo: "form-group",
        errorClass: "has-danger",
        successClass: "has-success",
        errorTextParent: "form-group",
        errorTextTag: "div",
        errorTextClass: "text-help"
    }
      , r = ["required", "min", "max", "minlength", "maxlength", "pattern"]
      , s = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      , o = {}
      , a = function(t, n) {
        n.name = t,
        n.msg || (n.msg = e[t]),
        void 0 === n.priority && (n.priority = 1),
        o[t] = n
    };
    function l(e, n, s) {
        var a = this;
        function l(e, t, n, i) {
            var r = o[n];
            if (r && (e.push(r),
            i)) {
                var s = i.split(",");
                s.unshift(null),
                t[n] = s
            }
        }
        function c(e) {
            for (var n, i = [], r = !0, s = 0; e.validators[s]; s++) {
                var o = e.validators[s]
                  , a = e.params[o.name] ? e.params[o.name] : [];
                if (a[0] = e.input.value,
                !o.fn.apply(e.input, a)) {
                    if (r = !1,
                    (n = o.msg) && n.constructor && n.call && n.apply)
                        i.push(o.msg(e.input.value, a));
                    else {
                        var l = e.messages[o.name] || o.msg;
                        i.push(t.apply(l, a))
                    }
                    if (!0 === o.halt)
                        break
                }
            }
            return e.errors = i,
            r
        }
        function d(e) {
            if (e.errorElements)
                return e.errorElements;
            var t = function(e, t) {
                for (; (e = e.parentElement) && !e.classList.contains(t); )
                    ;
                return e
            }(e.input, a.config.classTo)
              , n = null
              , i = null;
            return (n = a.config.classTo === a.config.errorTextParent ? t : t.querySelector("." + a.config.errorTextParent)) && ((i = n.querySelector(".pristine-error")) || ((i = document.createElement(a.config.errorTextTag)).className = "pristine-error " + a.config.errorTextClass,
            n.appendChild(i),
            i.pristineDisplay = i.style.display)),
            e.errorElements = [t, i]
        }
        function u(e) {
            var t = d(e)
              , n = t[0]
              , i = t[1];
            n && (n.classList.remove(a.config.successClass),
            n.classList.add(a.config.errorClass)),
            i && (i.innerHTML = e.errors.join("<br/>"),
            i.style.display = i.pristineDisplay || "")
        }
        function p(e) {
            var t = function(e) {
                var t = d(e)
                  , n = t[0]
                  , i = t[1];
                return n && (n.classList.remove(a.config.errorClass),
                n.classList.remove(a.config.successClass)),
                i && (i.innerHTML = "",
                i.style.display = "none"),
                t
            }(e)[0];
            t && t.classList.add(a.config.successClass)
        }
        return function(e, t, n) {
            e.setAttribute("novalidate", "true"),
            a.form = e,
            a.config = function(e, t) {
                for (var n in t)
                    n in e || (e[n] = t[n]);
                return e
            }(t || {}, i),
            a.live = !(!1 === n),
            a.fields = Array.from(e.querySelectorAll("input:not([type^=hidden]):not([type^=submit]), select, textarea")).map(function(e) {
                var t = []
                  , n = {}
                  , i = {};
                return [].forEach.call(e.attributes, (function(e) {
                    if (/^data-pristine-/.test(e.name)) {
                        var s = e.name.substr(14);
                        if (s.endsWith("-message"))
                            return void (i[s.slice(0, s.length - 8)] = e.value);
                        "type" === s && (s = e.value),
                        l(t, n, s, e.value)
                    } else
                        ~r.indexOf(e.name) ? l(t, n, e.name, e.value) : "type" === e.name && l(t, n, e.value)
                }
                )),
                t.sort((function(e, t) {
                    return t.priority - e.priority
                }
                )),
                a.live && e.addEventListener(~["radio", "checkbox"].indexOf(e.getAttribute("type")) ? "change" : "input", function(e) {
                    a.validate(e.target)
                }
                .bind(a)),
                e.pristine = {
                    input: e,
                    validators: t,
                    params: n,
                    messages: i,
                    self: a
                }
            }
            .bind(a))
        }(e, n, s),
        a.validate = function(e, t) {
            t = e && !0 === t || !0 === e;
            var n = a.fields;
            !0 !== e && !1 !== e && (e instanceof HTMLElement ? n = [e.pristine] : (e instanceof NodeList || e instanceof (window.$ || Array) || e instanceof Array) && (n = Array.from(e).map((function(e) {
                return e.pristine
            }
            ))));
            for (var i = !0, r = 0; n[r]; r++) {
                var s = n[r];
                c(s) ? !t && p(s) : (i = !1,
                !t && u(s))
            }
            return i
        }
        ,
        a.getErrors = function(e) {
            if (!e) {
                for (var t = [], n = 0; n < a.fields.length; n++) {
                    var i = a.fields[n];
                    i.errors.length && t.push({
                        input: i.input,
                        errors: i.errors
                    })
                }
                return t
            }
            return e.tagName && "select" === e.tagName.toLowerCase() ? e.pristine.errors : e.length ? e[0].pristine.errors : e.pristine.errors
        }
        ,
        a.addValidator = function(e, t, n, i, r) {
            e instanceof HTMLElement ? (e.pristine.validators.push({
                fn: t,
                msg: n,
                priority: i,
                halt: r
            }),
            e.pristine.validators.sort((function(e, t) {
                return t.priority - e.priority
            }
            ))) : console.warn("The parameter elem must be a dom element")
        }
        ,
        a.addError = function(e, t) {
            (e = e.length ? e[0] : e).pristine.errors.push(t),
            u(e.pristine)
        }
        ,
        a.reset = function() {
            for (var e = 0; a.fields[e]; e++)
                a.fields[e].errorElements = null;
            Array.from(a.form.querySelectorAll(".pristine-error")).map((function(e) {
                e.parentNode.removeChild(e)
            }
            )),
            Array.from(a.form.querySelectorAll("." + a.config.classTo)).map((function(e) {
                e.classList.remove(a.config.successClass),
                e.classList.remove(a.config.errorClass)
            }
            ))
        }
        ,
        a.destroy = function() {
            a.reset(),
            a.fields.forEach((function(e) {
                delete e.input.pristine
            }
            )),
            a.fields = []
        }
        ,
        a.setGlobalConfig = function(e) {
            i = e
        }
        ,
        a
    }
    return a("text", {
        fn: function(e) {
            return !0
        },
        priority: 0
    }),
    a("required", {
        fn: function(e) {
            return "radio" === this.type || "checkbox" === this.type ? n(this) : void 0 !== e && "" !== e
        },
        priority: 99,
        halt: !0
    }),
    a("email", {
        fn: function(e) {
            return !e || s.test(e)
        }
    }),
    a("number", {
        fn: function(e) {
            return !e || !isNaN(parseFloat(e))
        },
        priority: 2
    }),
    a("integer", {
        fn: function(e) {
            return !e || /^\d+$/.test(e)
        }
    }),
    a("minlength", {
        fn: function(e, t) {
            return !e || e.length >= parseInt(t)
        }
    }),
    a("maxlength", {
        fn: function(e, t) {
            return !e || e.length <= parseInt(t)
        }
    }),
    a("min", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? n(this) >= parseInt(t) : parseFloat(e) >= parseFloat(t))
        }
    }),
    a("max", {
        fn: function(e, t) {
            return !e || ("checkbox" === this.type ? n(this) <= parseInt(t) : parseFloat(e) <= parseFloat(t))
        }
    }),
    a("pattern", {
        fn: function(e, t) {
            var n = t.match(new RegExp("^/(.*?)/([gimy]*)$"));
            return !e || new RegExp(n[1],n[2]).test(e)
        }
    }),
    l.addValidator = function(e, t, n, i, r) {
        a(e, {
            fn: t,
            msg: n,
            priority: i,
            halt: r
        })
    }
    ,
    l
}
));
var Filterizr = function(e) {
    var t = {};
    function n(i) {
        if (t[i])
            return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n),
        r.l = !0,
        r.exports
    }
    return n.m = e,
    n.c = t,
    n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var i = Object.create(null);
        if (n.r(i),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                n.d(i, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return i
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 5)
}([function(e, t, n) {
    "use strict";
    var i = "IDLE"
      , r = "FILTERING"
      , s = "SORTING"
      , o = "SHUFFLING"
      , a = {
        SAME_SIZE: "sameSize",
        SAME_HEIGHT: "sameHeight",
        SAME_WIDTH: "sameWidth",
        PACKED: "packed",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    }
      , l = /(^linear$)|(^ease-in-out$)|(^ease-in$)|(^ease-out$)|(^ease$)|(^step-start$)|(^step-end$)|(^steps\(\d\s*,\s*(end|start)\))$|(^cubic-bezier\((\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\s*,\s*(\d*\.*\d+)\))$/
      , c = function(e, t, n, i, r) {
        if (void 0 !== t) {
            var s = new Error('Filterizr: expected type of option "' + e + '" to be "' + n + '", but its type is: "' + typeof t + '"')
              , o = !1
              , a = !1
              , l = n.includes("array");
            if ((typeof t).match(n) ? o = !0 : !o && l && (a = Array.isArray(t)),
            !o && !l)
                throw s;
            if (!o && l && !a)
                throw s;
            var c = function(e) {
                return e ? " For further help read here: " + e : ""
            };
            if (Array.isArray(i)) {
                var d = !1;
                if (i.forEach((function(e) {
                    e === t && (d = !0)
                }
                )),
                !d)
                    throw new Error('Filterizr: allowed values for option "' + e + '" are: ' + i.map((function(e) {
                        return '"' + e + '"'
                    }
                    )).join(", ") + '. Value received: "' + t + '".' + c(r))
            } else if ("string" == typeof t && i instanceof RegExp && !t.match(i))
                throw new Error('Filterizr: invalid value "' + t + '" for option "' + e + '" received.' + c(r))
        }
    }
      , d = function(e, t, n) {
        var i;
        return function() {
            var r = this
              , s = arguments;
            clearTimeout(i),
            i = window.setTimeout((function() {
                i = null,
                n || e.apply(r, s)
            }
            ), t),
            n && !i && e.apply(r, s)
        }
    }
      , u = function(e, t) {
        return e.length === t.length && e.reduce((function(e, n, i) {
            var r = n.getSortAttribute("index")
              , s = t[i].getSortAttribute("index");
            return e && r === s
        }
        ), !0)
    };
    function p(e) {
        return e && "object" == typeof e && !Array.isArray(e)
    }
    function f(e) {
        for (var t, n, i = [], r = 1; r < arguments.length; r++)
            i[r - 1] = arguments[r];
        if (!i.length)
            return e;
        var s = i.shift();
        if (p(e) && p(s))
            for (var o in s)
                p(s[o]) ? (e[o] || Object.assign(e, ((t = {})[o] = {},
                t)),
                f(e[o], s[o])) : Object.assign(e, ((n = {})[o] = s[o],
                n));
        return f.apply(void 0, [e].concat(i))
    }
    var h = function() {};
    function m(e, t) {
        Object.entries(t).forEach((function(t) {
            var n = t[0]
              , i = t[1];
            e.style[n] = i
        }
        ))
    }
    var g = function(e) {
        for (var t = e.slice(0), n = []; 0 !== t.length; ) {
            var i = Math.floor(t.length * Math.random());
            n.push(t[i]),
            t.splice(i, 1)
        }
        return n
    }
      , v = function() {
        function e(e) {
            this.receiver = e,
            this.eventDictionary = {}
        }
        return e.prototype.on = function(e, t) {
            var n = this.receiver
              , i = n instanceof NodeList;
            !!this.eventDictionary[e] && delete this.eventDictionary[e],
            i && n.length ? (this.eventDictionary[e] = t,
            Array.from(n).forEach((function(n) {
                n.addEventListener(e, t)
            }
            ))) : !i && n && (this.eventDictionary[e] = t,
            n.addEventListener(e, t))
        }
        ,
        e.prototype.off = function(e) {
            var t = this.receiver
              , n = this.eventDictionary[e]
              , i = t instanceof NodeList;
            i && t.length ? Array.from(t).forEach((function(t) {
                t.removeEventListener(e, n)
            }
            )) : !i && t && t.removeEventListener(e, n),
            delete this.eventDictionary[e]
        }
        ,
        e.prototype.destroy = function() {
            var e = this
              , t = this.receiver
              , n = t instanceof NodeList;
            n && t.length ? Array.from(t).forEach((function(t) {
                return e.removeAllEvents(t)
            }
            )) : !n && t && this.removeAllEvents(t)
        }
        ,
        e.prototype.removeAllEvents = function(e) {
            var t = this;
            Object.keys(this.eventDictionary).forEach((function(n) {
                e.removeEventListener(n, t.eventDictionary[n]),
                delete t.eventDictionary[n]
            }
            ))
        }
        ,
        e
    }()
      , b = {
        animationDuration: .5,
        callbacks: {
            onInit: h,
            onFilteringStart: h,
            onFilteringEnd: h,
            onShufflingStart: h,
            onShufflingEnd: h,
            onSortingStart: h,
            onSortingEnd: h
        },
        controlsSelector: "",
        delay: 0,
        delayMode: "progressive",
        easing: "ease-out",
        filter: "all",
        filterOutCss: {
            opacity: 0,
            transform: "scale(0.5)"
        },
        filterInCss: {
            opacity: 1,
            transform: "scale(1)"
        },
        gridItemsSelector: ".filtr-item",
        gutterPixels: 0,
        layout: a.SAME_SIZE,
        multifilterLogicalOperator: "or",
        searchTerm: "",
        setupControls: !0,
        spinner: {
            enabled: !1,
            fillColor: "#2184D0",
            styles: {
                height: "75px",
                margin: "0 auto",
                width: "75px",
                "z-index": 2
            }
        }
    }
      , y = function() {
        function e(e) {
            this.filter = e
        }
        return e.prototype.get = function() {
            return this.filter
        }
        ,
        e.prototype.set = function(e) {
            this.filter = e
        }
        ,
        e.prototype.toggle = function(e) {
            this.filter = this.toggleFilter(this.filter, e)
        }
        ,
        e.prototype.toggleFilter = function(e, t) {
            if ("all" === e)
                return t;
            if (Array.isArray(e)) {
                if (e.includes(t)) {
                    var n = e.filter((function(e) {
                        return e !== t
                    }
                    ));
                    return 1 === n.length ? n[0] : n
                }
                return e.concat([t])
            }
            return e === t ? "all" : [e, t]
        }
        ,
        e
    }()
      , w = function() {
        return (w = Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        ).apply(this, arguments)
    }
      , x = function() {
        function e(e) {
            var t = f({}, b, this.validate(e));
            this.options = this.convertToFilterizrOptions(t)
        }
        return Object.defineProperty(e.prototype, "isSpinnerEnabled", {
            get: function() {
                return this.options.spinner.enabled
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "areControlsEnabled", {
            get: function() {
                return this.options.setupControls
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "controlsSelector", {
            get: function() {
                return this.options.controlsSelector
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "filter", {
            get: function() {
                return this.options.filter.get()
            },
            set: function(e) {
                this.options.filter.set(e)
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.toggleFilter = function(e) {
            this.options.filter.toggle(e)
        }
        ,
        Object.defineProperty(e.prototype, "searchTerm", {
            get: function() {
                return this.options.searchTerm
            },
            set: function(e) {
                this.options.searchTerm = e
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.get = function() {
            return this.options
        }
        ,
        e.prototype.getRaw = function() {
            return this.convertToOptions(this.options)
        }
        ,
        e.prototype.set = function(e) {
            var t = f({}, this.convertToOptions(this.options), this.validate(e));
            this.options = this.convertToFilterizrOptions(t)
        }
        ,
        e.prototype.convertToFilterizrOptions = function(e) {
            return w({}, e, {
                filter: new y(e.filter)
            })
        }
        ,
        e.prototype.convertToOptions = function(e) {
            return w({}, e, {
                filter: e.filter.get()
            })
        }
        ,
        e.prototype.validate = function(e) {
            return c("animationDuration", e.animationDuration, "number"),
            c("callbacks", e.callbacks, "object"),
            c("controlsSelector", e.controlsSelector, "string"),
            c("delay", e.delay, "number"),
            c("easing", e.easing, "string", l, "https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp"),
            c("delayMode", e.delayMode, "string", ["progressive", "alternate"]),
            c("filter", e.filter, "string|number|array"),
            c("filterOutCss", e.filterOutCss, "object"),
            c("filterInCss", e.filterOutCss, "object"),
            c("gridItemsSelector", e.gridItemsSelector, "string"),
            c("gutterPixels", e.gutterPixels, "number"),
            c("layout", e.layout, "string", Object.values(a)),
            c("multifilterLogicalOperator", e.multifilterLogicalOperator, "string", ["and", "or"]),
            c("searchTerm", e.searchTerm, "string"),
            c("setupControls", e.setupControls, "boolean"),
            e
        }
        ,
        e
    }()
      , E = function() {
        function e(e, t) {
            void 0 === t && (t = ""),
            this.filterizr = e,
            this.selector = t,
            this.filterControls = new v(document.querySelectorAll(t + "[data-filter]")),
            this.multiFilterControls = new v(document.querySelectorAll(t + "[data-multifilter]")),
            this.shuffleControls = new v(document.querySelectorAll(t + "[data-shuffle]")),
            this.searchControls = new v(document.querySelectorAll(t + "[data-search]")),
            this.sortAscControls = new v(document.querySelectorAll(t + "[data-sortAsc]")),
            this.sortDescControls = new v(document.querySelectorAll(t + "[data-sortDesc]")),
            this.initialize()
        }
        return e.prototype.destroy = function() {
            this.filterControls.destroy(),
            this.multiFilterControls.destroy(),
            this.shuffleControls.destroy(),
            this.searchControls.destroy(),
            this.sortAscControls.destroy(),
            this.sortDescControls.destroy()
        }
        ,
        e.prototype.initialize = function() {
            var e = this.filterizr
              , t = this.selector;
            this.filterControls.on("click", (function(t) {
                var n = t.currentTarget.getAttribute("data-filter");
                e.filter(n)
            }
            )),
            this.multiFilterControls.on("click", (function(t) {
                var n = t.target.getAttribute("data-multifilter");
                e.toggleFilter(n)
            }
            )),
            this.shuffleControls.on("click", e.shuffle.bind(e)),
            this.searchControls.on("keyup", d((function(t) {
                var n = t.target.value;
                e.search(n)
            }
            ), 250, !1)),
            this.sortAscControls.on("click", (function() {
                var n = document.querySelector(t + "[data-sortOrder]").value;
                e.sort(n, "asc")
            }
            )),
            this.sortDescControls.on("click", (function() {
                var n = document.querySelector(t + "[data-sortOrder]").value;
                e.sort(n, "desc")
            }
            ))
        }
        ,
        e
    }()
      , _ = function() {
        function e(e, t) {
            this.node = e,
            this.options = t,
            this.eventReceiver = new v(this.node)
        }
        return Object.defineProperty(e.prototype, "dimensions", {
            get: function() {
                return {
                    width: this.node.clientWidth,
                    height: this.node.clientHeight
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.destroy = function() {
            this.styles.destroy()
        }
        ,
        e.prototype.trigger = function(e) {
            var t = new Event(e);
            this.node.dispatchEvent(t)
        }
        ,
        e
    }();
    function S(e, t) {
        var n = t.get()
          , i = n.delay;
        return "progressive" === n.delayMode ? i * e : e % 2 == 0 ? i : 0
    }
    var T, C = function(e, t, n, i) {
        return new (n || (n = Promise))((function(r, s) {
            function o(e) {
                try {
                    l(i.next(e))
                } catch (e) {
                    s(e)
                }
            }
            function a(e) {
                try {
                    l(i.throw(e))
                } catch (e) {
                    s(e)
                }
            }
            function l(e) {
                e.done ? r(e.value) : new n((function(t) {
                    t(e.value)
                }
                )).then(o, a)
            }
            l((i = i.apply(e, t || [])).next())
        }
        ))
    }, A = function(e, t) {
        var n, i, r, s, o = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return s = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (s[Symbol.iterator] = function() {
            return this
        }
        ),
        s;
        function a(s) {
            return function(a) {
                return function(s) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; o; )
                        try {
                            if (n = 1,
                            i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                            0) : i.next) && !(r = r.call(i, s[1])).done)
                                return r;
                            switch (i = 0,
                            r && (s = [2 & s[0], r.value]),
                            s[0]) {
                            case 0:
                            case 1:
                                r = s;
                                break;
                            case 4:
                                return o.label++,
                                {
                                    value: s[1],
                                    done: !1
                                };
                            case 5:
                                o.label++,
                                i = s[1],
                                s = [0];
                                continue;
                            case 7:
                                s = o.ops.pop(),
                                o.trys.pop();
                                continue;
                            default:
                                if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                    o = 0;
                                    continue
                                }
                                if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                    o.label = s[1];
                                    break
                                }
                                if (6 === s[0] && o.label < r[1]) {
                                    o.label = r[1],
                                    r = s;
                                    break
                                }
                                if (r && o.label < r[2]) {
                                    o.label = r[2],
                                    o.ops.push(s);
                                    break
                                }
                                r[2] && o.ops.pop(),
                                o.trys.pop();
                                continue
                            }
                            s = t.call(e, o)
                        } catch (e) {
                            s = [6, e],
                            i = 0
                        } finally {
                            n = r = 0
                        }
                    if (5 & s[0])
                        throw s[1];
                    return {
                        value: s[0] ? s[1] : void 0,
                        done: !0
                    }
                }([s, a])
            }
        }
    }, M = function() {
        function e() {}
        return e.animate = function(t, n) {
            return C(this, void 0, void 0, (function() {
                return A(this, (function(i) {
                    switch (i.label) {
                    case 0:
                        return [4, e.process({
                            node: t,
                            targetStyles: n,
                            eventReceiver: new v(t)
                        })];
                    case 1:
                        return i.sent(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.process = function(e) {
            return C(this, void 0, void 0, (function() {
                return A(this, (function(t) {
                    return [2, new Promise((function(t) {
                        e.eventReceiver.on("transitionend", (function() {
                            e.eventReceiver.destroy(),
                            t()
                        }
                        )),
                        setTimeout((function() {
                            m(e.node, e.targetStyles)
                        }
                        ), 10)
                    }
                    ))]
                }
                ))
            }
            ))
        }
        ,
        e
    }().animate, k = function() {
        function e(e, t) {
            this.node = e,
            this.options = t
        }
        return e.prototype.destroy = function() {
            this.node.removeAttribute("style")
        }
        ,
        e.prototype.animate = function(e) {
            return function(e, t, n, i) {
                return new (n || (n = Promise))((function(r, s) {
                    function o(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function a(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function l(e) {
                        e.done ? r(e.value) : new n((function(t) {
                            t(e.value)
                        }
                        )).then(o, a)
                    }
                    l((i = i.apply(e, t || [])).next())
                }
                ))
            }(this, void 0, void 0, (function() {
                return function(e, t) {
                    var n, i, r, s, o = {
                        label: 0,
                        sent: function() {
                            if (1 & r[0])
                                throw r[1];
                            return r[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return s = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    },
                    "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                        return this
                    }
                    ),
                    s;
                    function a(s) {
                        return function(a) {
                            return function(s) {
                                if (n)
                                    throw new TypeError("Generator is already executing.");
                                for (; o; )
                                    try {
                                        if (n = 1,
                                        i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                                        0) : i.next) && !(r = r.call(i, s[1])).done)
                                            return r;
                                        switch (i = 0,
                                        r && (s = [2 & s[0], r.value]),
                                        s[0]) {
                                        case 0:
                                        case 1:
                                            r = s;
                                            break;
                                        case 4:
                                            return o.label++,
                                            {
                                                value: s[1],
                                                done: !1
                                            };
                                        case 5:
                                            o.label++,
                                            i = s[1],
                                            s = [0];
                                            continue;
                                        case 7:
                                            s = o.ops.pop(),
                                            o.trys.pop();
                                            continue;
                                        default:
                                            if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                                o = 0;
                                                continue
                                            }
                                            if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                                o.label = s[1];
                                                break
                                            }
                                            if (6 === s[0] && o.label < r[1]) {
                                                o.label = r[1],
                                                r = s;
                                                break
                                            }
                                            if (r && o.label < r[2]) {
                                                o.label = r[2],
                                                o.ops.push(s);
                                                break
                                            }
                                            r[2] && o.ops.pop(),
                                            o.trys.pop();
                                            continue
                                        }
                                        s = t.call(e, o)
                                    } catch (e) {
                                        s = [6, e],
                                        i = 0
                                    } finally {
                                        n = r = 0
                                    }
                                if (5 & s[0])
                                    throw s[1];
                                return {
                                    value: s[0] ? s[1] : void 0,
                                    done: !0
                                }
                            }([s, a])
                        }
                    }
                }(this, (function(t) {
                    return M(this.node, e),
                    [2]
                }
                ))
            }
            ))
        }
        ,
        e.prototype.set = function(e) {
            m(this.node, e)
        }
        ,
        e.prototype.remove = function(e) {
            this.node.style.removeProperty(e)
        }
        ,
        e
    }(), O = (T = function(e, t) {
        return (T = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(e, t) {
            e.__proto__ = t
        }
        || function(e, t) {
            for (var n in t)
                t.hasOwnProperty(n) && (e[n] = t[n])
        }
        )(e, t)
    }
    ,
    function(e, t) {
        function n() {
            this.constructor = e
        }
        T(e, t),
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
        new n)
    }
    ), P = n(1), L = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t, i) || this;
            return r._index = n,
            r
        }
        return O(t, e),
        t.prototype.initialize = function() {
            var e;
            this.set((e = this.options,
            Object.assign({}, e.get().filterOutCss, {
                "-webkit-backface-visibility": "hidden",
                perspective: "1000px",
                "-webkit-perspective": "1000px",
                "-webkit-transform-style": "preserve-3d",
                position: "absolute"
            })))
        }
        ,
        t.prototype.setFilteredStyles = function(e, t) {
            this.set(function(e, t) {
                return Object.assign({}, t, {
                    transform: (t.transform || "") + " translate3d(" + e.left + "px, " + e.top + "px, 0)"
                })
            }(e, t))
        }
        ,
        t.prototype.updateTransitionStyle = function() {
            var e, t, n;
            this.set((e = this._index,
            {
                transition: "all " + (n = (t = this.options).get()).animationDuration + "s " + n.easing + " " + S(e, t) + "ms, width 1ms"
            }))
        }
        ,
        t.prototype.updateWidth = function() {
            var e = this.options.get().gutterPixels
              , t = this.node.parentElement.clientWidth
              , n = this.node.clientWidth
              , i = n - e * (1 / Math.floor(t / n) + 1) + "px";
            this.set({
                width: i
            })
        }
        ,
        t.prototype.enableTransitions = function() {
            return function(e, t, n, i) {
                return new (n || (n = Promise))((function(r, s) {
                    function o(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function a(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function l(e) {
                        e.done ? r(e.value) : new n((function(t) {
                            t(e.value)
                        }
                        )).then(o, a)
                    }
                    l((i = i.apply(e, t || [])).next())
                }
                ))
            }(this, void 0, void 0, (function() {
                var e = this;
                return function(e, t) {
                    var n, i, r, s, o = {
                        label: 0,
                        sent: function() {
                            if (1 & r[0])
                                throw r[1];
                            return r[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return s = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    },
                    "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                        return this
                    }
                    ),
                    s;
                    function a(s) {
                        return function(a) {
                            return function(s) {
                                if (n)
                                    throw new TypeError("Generator is already executing.");
                                for (; o; )
                                    try {
                                        if (n = 1,
                                        i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                                        0) : i.next) && !(r = r.call(i, s[1])).done)
                                            return r;
                                        switch (i = 0,
                                        r && (s = [2 & s[0], r.value]),
                                        s[0]) {
                                        case 0:
                                        case 1:
                                            r = s;
                                            break;
                                        case 4:
                                            return o.label++,
                                            {
                                                value: s[1],
                                                done: !1
                                            };
                                        case 5:
                                            o.label++,
                                            i = s[1],
                                            s = [0];
                                            continue;
                                        case 7:
                                            s = o.ops.pop(),
                                            o.trys.pop();
                                            continue;
                                        default:
                                            if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                                o = 0;
                                                continue
                                            }
                                            if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                                o.label = s[1];
                                                break
                                            }
                                            if (6 === s[0] && o.label < r[1]) {
                                                o.label = r[1],
                                                r = s;
                                                break
                                            }
                                            if (r && o.label < r[2]) {
                                                o.label = r[2],
                                                o.ops.push(s);
                                                break
                                            }
                                            r[2] && o.ops.pop(),
                                            o.trys.pop();
                                            continue
                                        }
                                        s = t.call(e, o)
                                    } catch (e) {
                                        s = [6, e],
                                        i = 0
                                    } finally {
                                        n = r = 0
                                    }
                                if (5 & s[0])
                                    throw s[1];
                                return {
                                    value: s[0] ? s[1] : void 0,
                                    done: !0
                                }
                            }([s, a])
                        }
                    }
                }(this, (function(t) {
                    return [2, new Promise((function(t) {
                        e.node.querySelectorAll("img").length ? P(e.node, (function() {
                            setTimeout((function() {
                                e.updateTransitionStyle(),
                                t()
                            }
                            ), 10)
                        }
                        )) : setTimeout((function() {
                            e.updateTransitionStyle(),
                            t()
                        }
                        ), 10)
                    }
                    ))]
                }
                ))
            }
            ))
        }
        ,
        t.prototype.disableTransitions = function() {
            this.remove("transition")
        }
        ,
        t.prototype.setZIndex = function(e) {
            this.set({
                "z-index": e
            })
        }
        ,
        t.prototype.removeZIndex = function() {
            this.remove("z-index")
        }
        ,
        t.prototype.removeWidth = function() {
            this.remove("width")
        }
        ,
        t.prototype.setHidden = function() {
            this.set({
                display: "none"
            })
        }
        ,
        t.prototype.setVisible = function() {
            this.remove("display")
        }
        ,
        t
    }(k), I = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function i() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
            new i)
        }
    }(), $ = function() {
        return ($ = Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        ).apply(this, arguments)
    }, z = function(e) {
        function t(t, n, i) {
            var r = e.call(this, t, i) || this;
            return r.filteredOut = !1,
            r.lastPosition = {
                left: 0,
                top: 0
            },
            r.sortData = $({}, function(e) {
                for (var t = {
                    category: "",
                    sort: ""
                }, n = 0, i = e.attributes, r = i.length; n < r; n++) {
                    var s = i[n]
                      , o = s.nodeName
                      , a = s.nodeValue;
                    o.includes("data") && (t[o.slice(5, o.length)] = a)
                }
                return delete t.category,
                delete t.sort,
                t
            }(t), {
                index: n,
                sortData: t.getAttribute("data-sort")
            }),
            r.styledNode = new L(t,n,i),
            r.styles.initialize(),
            r.bindEvents(),
            r
        }
        return I(t, e),
        Object.defineProperty(t.prototype, "styles", {
            get: function() {
                return this.styledNode
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this),
            this.unbindEvents()
        }
        ,
        t.prototype.filterIn = function(e) {
            var t = this.options.get().filterInCss;
            this.styles.setFilteredStyles(e, t),
            this.lastPosition = e,
            this.filteredOut = !1
        }
        ,
        t.prototype.filterOut = function() {
            var e = this.options.get().filterOutCss;
            this.styles.setFilteredStyles(this.lastPosition, e),
            this.filteredOut = !0
        }
        ,
        t.prototype.contentsMatchSearch = function(e) {
            return this.node.textContent.toLowerCase().includes(e)
        }
        ,
        t.prototype.getCategories = function() {
            return this.node.getAttribute("data-category").split(/\s*,\s*/g)
        }
        ,
        t.prototype.getSortAttribute = function(e) {
            return this.sortData[e]
        }
        ,
        t.prototype.bindEvents = function() {
            var e = this;
            this.eventReceiver.on("transitionend", (function() {
                e.filteredOut ? (e.node.classList.add("filteredOut"),
                e.styles.setZIndex(-1e3),
                e.styles.setHidden()) : (e.node.classList.remove("filteredOut"),
                e.styles.removeZIndex())
            }
            ))
        }
        ,
        t.prototype.unbindEvents = function() {
            this.eventReceiver.off("transitionend")
        }
        ,
        t
    }(_), D = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function i() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
            new i)
        }
    }(), j = function(e, t, n, i) {
        return new (n || (n = Promise))((function(r, s) {
            function o(e) {
                try {
                    l(i.next(e))
                } catch (e) {
                    s(e)
                }
            }
            function a(e) {
                try {
                    l(i.throw(e))
                } catch (e) {
                    s(e)
                }
            }
            function l(e) {
                e.done ? r(e.value) : new n((function(t) {
                    t(e.value)
                }
                )).then(o, a)
            }
            l((i = i.apply(e, t || [])).next())
        }
        ))
    }, N = function(e, t) {
        var n, i, r, s, o = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return s = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (s[Symbol.iterator] = function() {
            return this
        }
        ),
        s;
        function a(s) {
            return function(a) {
                return function(s) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; o; )
                        try {
                            if (n = 1,
                            i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                            0) : i.next) && !(r = r.call(i, s[1])).done)
                                return r;
                            switch (i = 0,
                            r && (s = [2 & s[0], r.value]),
                            s[0]) {
                            case 0:
                            case 1:
                                r = s;
                                break;
                            case 4:
                                return o.label++,
                                {
                                    value: s[1],
                                    done: !1
                                };
                            case 5:
                                o.label++,
                                i = s[1],
                                s = [0];
                                continue;
                            case 7:
                                s = o.ops.pop(),
                                o.trys.pop();
                                continue;
                            default:
                                if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                    o = 0;
                                    continue
                                }
                                if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                    o.label = s[1];
                                    break
                                }
                                if (6 === s[0] && o.label < r[1]) {
                                    o.label = r[1],
                                    r = s;
                                    break
                                }
                                if (r && o.label < r[2]) {
                                    o.label = r[2],
                                    o.ops.push(s);
                                    break
                                }
                                r[2] && o.ops.pop(),
                                o.trys.pop();
                                continue
                            }
                            s = t.call(e, o)
                        } catch (e) {
                            s = [6, e],
                            i = 0
                        } finally {
                            n = r = 0
                        }
                    if (5 & s[0])
                        throw s[1];
                    return {
                        value: s[0] ? s[1] : void 0,
                        done: !0
                    }
                }([s, a])
            }
        }
    }, H = function(e) {
        function t(t) {
            var n = e.call(this) || this;
            return n._filterItems = t.map((function(e) {
                return e.styles
            }
            )),
            n
        }
        return D(t, e),
        t.prototype.resetDisplay = function() {
            this._filterItems.forEach((function(e) {
                return e.setVisible()
            }
            ))
        }
        ,
        t.prototype.removeWidth = function() {
            this._filterItems.forEach((function(e) {
                return e.removeWidth()
            }
            ))
        }
        ,
        t.prototype.updateWidth = function() {
            this._filterItems.forEach((function(e) {
                return e.updateWidth()
            }
            ))
        }
        ,
        t.prototype.updateTransitionStyle = function() {
            this._filterItems.forEach((function(e) {
                return e.updateTransitionStyle()
            }
            ))
        }
        ,
        t.prototype.disableTransitions = function() {
            this._filterItems.forEach((function(e) {
                return e.disableTransitions()
            }
            ))
        }
        ,
        t.prototype.enableTransitions = function() {
            return j(this, void 0, void 0, (function() {
                var e = this;
                return N(this, (function(t) {
                    return this._filterItems.forEach((function(t) {
                        return j(e, void 0, void 0, (function() {
                            return N(this, (function(e) {
                                switch (e.label) {
                                case 0:
                                    return [4, t.enableTransitions()];
                                case 1:
                                    return [2, e.sent()]
                                }
                            }
                            ))
                        }
                        ))
                    }
                    )),
                    [2]
                }
                ))
            }
            ))
        }
        ,
        t.prototype.updateWidthWithTransitionsDisabled = function() {
            this.disableTransitions(),
            this.removeWidth(),
            this.updateWidth(),
            this.enableTransitions()
        }
        ,
        t
    }((function() {}
    )), F = function() {
        function e(e, t) {
            this.filterItems = e,
            this.styledFilterItems = new H(e),
            this.options = t
        }
        return Object.defineProperty(e.prototype, "styles", {
            get: function() {
                return this.styledFilterItems
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "length", {
            get: function() {
                return this.filterItems.length
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.getItem = function(e) {
            return this.filterItems[e]
        }
        ,
        e.prototype.destroy = function() {
            this.filterItems.forEach((function(e) {
                return e.destroy()
            }
            ))
        }
        ,
        e.prototype.push = function(e) {
            return this.filterItems.push(e)
        }
        ,
        e.prototype.remove = function(e) {
            this.filterItems = this.filterItems.filter((function(t) {
                return t.node !== e
            }
            ))
        }
        ,
        e.prototype.getFiltered = function(e) {
            var t = this
              , n = this.options.searchTerm
              , i = this.search(this.filterItems, n);
            return "all" === e ? i : i.filter((function(n) {
                return t.shouldBeFiltered(n.getCategories(), e)
            }
            ))
        }
        ,
        e.prototype.getFilteredOut = function(e) {
            var t = this
              , n = this.options.searchTerm;
            return this.filterItems.filter((function(i) {
                var r = i.getCategories()
                  , s = t.shouldBeFiltered(r, e)
                  , o = i.contentsMatchSearch(n);
                return !s || !o
            }
            ))
        }
        ,
        e.prototype.sort = function(e, t) {
            void 0 === e && (e = "index"),
            void 0 === t && (t = "asc");
            var n, i = (n = function(t) {
                return t.getSortAttribute(e)
            }
            ,
            this.filterItems.slice(0).sort(function(e) {
                return function(t, n) {
                    var i = e(t)
                      , r = e(n);
                    return i < r ? -1 : i > r ? 1 : 0
                }
            }(n))), r = "asc" === t ? i : i.reverse();
            this.filterItems = r
        }
        ,
        e.prototype.shuffle = function() {
            var e = this
              , t = this.getFiltered(this.options.filter);
            if (t.length > 1) {
                var n = this.getFiltered(this.options.filter).map((function(t) {
                    return e.filterItems.indexOf(t)
                }
                )).slice()
                  , i = void 0;
                do {
                    i = g(t)
                } while (u(t, i));
                (i = g(t)).forEach((function(t, i) {
                    var r, s = n[i];
                    e.filterItems = Object.assign([], e.filterItems, ((r = {})[s] = t,
                    r))
                }
                ))
            }
        }
        ,
        e.prototype.search = function(e, t) {
            return t ? e.filter((function(e) {
                return e.contentsMatchSearch(t)
            }
            )) : e
        }
        ,
        e.prototype.shouldBeFiltered = function(e, t) {
            var n, i, r = this.options.getRaw().multifilterLogicalOperator;
            return Array.isArray(t) ? "or" === r ? !!(n = e,
            i = t,
            Array.prototype.filter.call(n, (function(e) {
                return i.includes(e)
            }
            ))).length : function(e, t) {
                return e.reduce((function(e, n) {
                    return e && t.includes(n)
                }
                ), !0)
            }(t, e) : e.includes(t)
        }
        ,
        e
    }(), R = function() {
        return (R = Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        ).apply(this, arguments)
    }, W = function(e) {
        return {
            padding: e.get().gutterPixels + "px"
        }
    }, B = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function i() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
            new i)
        }
    }(), q = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return B(t, e),
        t.prototype.initialize = function() {
            var e;
            this.set((e = this.options,
            R({}, W(e), {
                position: "relative",
                width: "100%",
                display: "flex",
                flexWrap: "wrap"
            })))
        }
        ,
        t.prototype.updatePaddings = function() {
            this.set(W(this.options))
        }
        ,
        t.prototype.setHeight = function(e) {
            this.set({
                height: e + "px"
            })
        }
        ,
        t
    }(k), V = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function i() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
            new i)
        }
    }(), X = function(e) {
        function t(t, n) {
            var r = this;
            if (!t)
                throw new Error("Filterizr: could not initialize container, check the selector or node you passed to the constructor exists.");
            return (r = e.call(this, t, n) || this).styledNode = new q(t,n),
            r._filterizrState = i,
            r.styles.initialize(),
            r.filterItems = r.makeFilterItems(r.options),
            r.bindEvents(),
            r
        }
        return V(t, e),
        Object.defineProperty(t.prototype, "styles", {
            get: function() {
                return this.styledNode
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "filterizrState", {
            set: function(e) {
                this._filterizrState = e
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.destroy = function() {
            e.prototype.destroy.call(this),
            this.unbindEvents(),
            this.filterItems.destroy()
        }
        ,
        t.prototype.makeFilterItems = function(e) {
            var t = Array.from(this.node.querySelectorAll(e.get().gridItemsSelector)).map((function(t, n) {
                return new z(t,n,e)
            }
            ))
              , n = new F(t,e);
            if (!n.length)
                throw new Error("Filterizr: cannot initialize empty container. Make sure the gridItemsSelector option corresponds to the selector of your grid's items");
            return n.styles.updateWidth(),
            n
        }
        ,
        t.prototype.insertItem = function(e) {
            var t = e.cloneNode(!0);
            t.removeAttribute("style"),
            this.node.appendChild(t);
            var n = new z(t,this.filterItems.length,this.options);
            n.styles.enableTransitions(),
            n.styles.updateWidth(),
            this.filterItems.push(n)
        }
        ,
        t.prototype.removeItem = function(e) {
            this.filterItems.remove(e),
            this.node.removeChild(e)
        }
        ,
        t.prototype.setHeight = function(e) {
            this.dimensions.height = e,
            this.styles.setHeight(e)
        }
        ,
        t.prototype.bindEvents = function() {
            var e = this
              , t = this.options.get()
              , n = t.animationDuration
              , a = t.callbacks
              , l = t.delay
              , c = t.delayMode
              , u = t.gridItemsSelector
              , p = "progressive" === c ? l * this.filterItems.length : l;
            this.eventReceiver.on("transitionend", d((function(t) {
                if (Array.from(t.target.classList).reduce((function(e, t) {
                    return e || u.includes(t)
                }
                ), !1)) {
                    switch (e._filterizrState) {
                    case r:
                        e.trigger("filteringEnd");
                        break;
                    case s:
                        e.trigger("sortingEnd");
                        break;
                    case o:
                        e.trigger("shufflingEnd")
                    }
                    e.filterizrState = i
                }
            }
            ), 100 * n + p, !1)),
            this.eventReceiver.on("init", a.onInit),
            this.eventReceiver.on("filteringStart", a.onFilteringStart),
            this.eventReceiver.on("filteringEnd", a.onFilteringEnd),
            this.eventReceiver.on("shufflingStart", a.onShufflingStart),
            this.eventReceiver.on("shufflingEnd", a.onShufflingEnd),
            this.eventReceiver.on("sortingStart", a.onSortingStart),
            this.eventReceiver.on("sortingEnd", a.onSortingEnd)
        }
        ,
        t.prototype.unbindEvents = function() {
            this.eventReceiver.off("transitionend"),
            this.eventReceiver.off("init"),
            this.eventReceiver.off("filteringStart"),
            this.eventReceiver.off("filteringEnd"),
            this.eventReceiver.off("shufflingStart"),
            this.eventReceiver.off("shufflingEnd"),
            this.eventReceiver.off("sortingStart"),
            this.eventReceiver.off("sortingEnd")
        }
        ,
        t
    }(_), G = function() {
        var e = function(t, n) {
            return (e = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    t.hasOwnProperty(n) && (e[n] = t[n])
            }
            )(t, n)
        };
        return function(t, n) {
            function i() {
                this.constructor = t
            }
            e(t, n),
            t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
            new i)
        }
    }(), Y = function() {
        return (Y = Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        ).apply(this, arguments)
    }, U = function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return G(t, e),
        t.prototype.initialize = function() {
            var e = this.options.get().spinner.styles;
            this.set(Y({}, e, {
                opacity: 1,
                transition: "all ease-out 500ms"
            }))
        }
        ,
        t.prototype.fadeOut = function() {
            return function(e, t, n, i) {
                return new (n || (n = Promise))((function(r, s) {
                    function o(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function a(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function l(e) {
                        e.done ? r(e.value) : new n((function(t) {
                            t(e.value)
                        }
                        )).then(o, a)
                    }
                    l((i = i.apply(e, t || [])).next())
                }
                ))
            }(this, void 0, void 0, (function() {
                return function(e, t) {
                    var n, i, r, s, o = {
                        label: 0,
                        sent: function() {
                            if (1 & r[0])
                                throw r[1];
                            return r[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return s = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    },
                    "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                        return this
                    }
                    ),
                    s;
                    function a(s) {
                        return function(a) {
                            return function(s) {
                                if (n)
                                    throw new TypeError("Generator is already executing.");
                                for (; o; )
                                    try {
                                        if (n = 1,
                                        i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                                        0) : i.next) && !(r = r.call(i, s[1])).done)
                                            return r;
                                        switch (i = 0,
                                        r && (s = [2 & s[0], r.value]),
                                        s[0]) {
                                        case 0:
                                        case 1:
                                            r = s;
                                            break;
                                        case 4:
                                            return o.label++,
                                            {
                                                value: s[1],
                                                done: !1
                                            };
                                        case 5:
                                            o.label++,
                                            i = s[1],
                                            s = [0];
                                            continue;
                                        case 7:
                                            s = o.ops.pop(),
                                            o.trys.pop();
                                            continue;
                                        default:
                                            if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                                o = 0;
                                                continue
                                            }
                                            if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                                o.label = s[1];
                                                break
                                            }
                                            if (6 === s[0] && o.label < r[1]) {
                                                o.label = r[1],
                                                r = s;
                                                break
                                            }
                                            if (r && o.label < r[2]) {
                                                o.label = r[2],
                                                o.ops.push(s);
                                                break
                                            }
                                            r[2] && o.ops.pop(),
                                            o.trys.pop();
                                            continue
                                        }
                                        s = t.call(e, o)
                                    } catch (e) {
                                        s = [6, e],
                                        i = 0
                                    } finally {
                                        n = r = 0
                                    }
                                if (5 & s[0])
                                    throw s[1];
                                return {
                                    value: s[0] ? s[1] : void 0,
                                    done: !0
                                }
                            }([s, a])
                        }
                    }
                }(this, (function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.animate({
                            opacity: 0
                        })];
                    case 1:
                        return e.sent(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        t
    }(k), K = function() {
        function e(e, t) {
            var n, i;
            this.filterContainer = e,
            this.node = (n = '<?xml version="1.0" encoding="UTF-8"?><svg stroke="' + t.get().spinner.fillColor + '" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>',
            (i = document.createElement("img")).classList.add("Filterizr__spinner"),
            i.src = "data:image/svg+xml;base64," + window.btoa(n),
            i.alt = "Spinner",
            i),
            this.styledNode = new U(this.node,t),
            this.initialize()
        }
        return Object.defineProperty(e.prototype, "styles", {
            get: function() {
                return this.styledNode
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.destroy = function() {
            return function(e, t, n, i) {
                return new (n || (n = Promise))((function(r, s) {
                    function o(e) {
                        try {
                            l(i.next(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function a(e) {
                        try {
                            l(i.throw(e))
                        } catch (e) {
                            s(e)
                        }
                    }
                    function l(e) {
                        e.done ? r(e.value) : new n((function(t) {
                            t(e.value)
                        }
                        )).then(o, a)
                    }
                    l((i = i.apply(e, t || [])).next())
                }
                ))
            }(this, void 0, void 0, (function() {
                return function(e, t) {
                    var n, i, r, s, o = {
                        label: 0,
                        sent: function() {
                            if (1 & r[0])
                                throw r[1];
                            return r[1]
                        },
                        trys: [],
                        ops: []
                    };
                    return s = {
                        next: a(0),
                        throw: a(1),
                        return: a(2)
                    },
                    "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                        return this
                    }
                    ),
                    s;
                    function a(s) {
                        return function(a) {
                            return function(s) {
                                if (n)
                                    throw new TypeError("Generator is already executing.");
                                for (; o; )
                                    try {
                                        if (n = 1,
                                        i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                                        0) : i.next) && !(r = r.call(i, s[1])).done)
                                            return r;
                                        switch (i = 0,
                                        r && (s = [2 & s[0], r.value]),
                                        s[0]) {
                                        case 0:
                                        case 1:
                                            r = s;
                                            break;
                                        case 4:
                                            return o.label++,
                                            {
                                                value: s[1],
                                                done: !1
                                            };
                                        case 5:
                                            o.label++,
                                            i = s[1],
                                            s = [0];
                                            continue;
                                        case 7:
                                            s = o.ops.pop(),
                                            o.trys.pop();
                                            continue;
                                        default:
                                            if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                                o = 0;
                                                continue
                                            }
                                            if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                                o.label = s[1];
                                                break
                                            }
                                            if (6 === s[0] && o.label < r[1]) {
                                                o.label = r[1],
                                                r = s;
                                                break
                                            }
                                            if (r && o.label < r[2]) {
                                                o.label = r[2],
                                                o.ops.push(s);
                                                break
                                            }
                                            r[2] && o.ops.pop(),
                                            o.trys.pop();
                                            continue
                                        }
                                        s = t.call(e, o)
                                    } catch (e) {
                                        s = [6, e],
                                        i = 0
                                    } finally {
                                        n = r = 0
                                    }
                                if (5 & s[0])
                                    throw s[1];
                                return {
                                    value: s[0] ? s[1] : void 0,
                                    done: !0
                                }
                            }([s, a])
                        }
                    }
                }(this, (function(e) {
                    switch (e.label) {
                    case 0:
                        return [4, this.styles.fadeOut()];
                    case 1:
                        return e.sent(),
                        this.filterContainer.node.removeChild(this.node),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.initialize = function() {
            this.styles.initialize(),
            this.filterContainer.node.appendChild(this.node)
        }
        ,
        e
    }(), Q = n(2), Z = n.n(Q);
    function J(e, t) {
        return e.reduce((function(e, n) {
            return e + n.width + t
        }
        ), 0)
    }
    function ee(e, t) {
        return e.length ? e.reduce((function(e, n) {
            return e + n.height + t
        }
        ), 0) : 0
    }
    var te = function() {
        return (te = Object.assign || function(e) {
            for (var t, n = 1, i = arguments.length; n < i; n++)
                for (var r in t = arguments[n])
                    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            return e
        }
        ).apply(this, arguments)
    }
      , ne = function() {
        function e(e) {
            this.init(e)
        }
        return e.prototype.init = function(e) {
            this.root = {
                x: 0,
                y: 0,
                w: e
            }
        }
        ,
        e.prototype.fit = function(e) {
            var t, n, i, r = e.length, s = r > 0 ? e[0].h : 0;
            for (this.root.h = s,
            t = 0; t < r; t++)
                i = e[t],
                (n = this.findNode(this.root, i.w, i.h)) ? i.fit = this.splitNode(n, i.w, i.h) : i.fit = this.growDown(i.w, i.h)
        }
        ,
        e.prototype.findNode = function(e, t, n) {
            return e.used ? this.findNode(e.right, t, n) || this.findNode(e.down, t, n) : t <= e.w && n <= e.h ? e : null
        }
        ,
        e.prototype.splitNode = function(e, t, n) {
            return e.used = !0,
            e.down = {
                x: e.x,
                y: e.y + n,
                w: e.w,
                h: e.h - n
            },
            e.right = {
                x: e.x + t,
                y: e.y,
                w: e.w - t,
                h: n
            },
            e
        }
        ,
        e.prototype.growDown = function(e, t) {
            var n;
            return this.root = {
                used: !0,
                x: 0,
                y: 0,
                w: this.root.w,
                h: this.root.h + t,
                down: {
                    x: 0,
                    y: this.root.h,
                    w: this.root.w,
                    h: t
                },
                right: this.root
            },
            (n = this.findNode(this.root, e, t)) ? this.splitNode(n, e, t) : null
        }
        ,
        e
    }()
      , ie = Z()((function(e, t, n) {
        var i = n.gutterPixels
          , r = n.layout;
        if (!t.length)
            return {
                containerHeight: 0,
                itemsPositions: []
            };
        switch (r) {
        case a.HORIZONTAL:
            return function(e, t) {
                return {
                    containerHeight: Math.max.apply(Math, e.map((function(e) {
                        return e.height
                    }
                    ))) + 2 * t,
                    itemsPositions: e.map((function(n, i) {
                        return {
                            left: J(e.slice(0, i), t),
                            top: 0
                        }
                    }
                    ))
                }
            }(t, i);
        case a.VERTICAL:
            return function(e, t) {
                return {
                    containerHeight: ee(e, t) + t,
                    itemsPositions: e.map((function(n, i) {
                        return {
                            left: 0,
                            top: ee(e.slice(0, i), t)
                        }
                    }
                    ))
                }
            }(t, i);
        case a.SAME_HEIGHT:
            return function(e, t, n) {
                var i = t.map((function(e, i) {
                    var r = e.width;
                    return t.slice(0, i).reduce((function(e, t) {
                        return e + t.width + 2 * n
                    }
                    ), 0) + r + n
                }
                ))
                  , r = i.reduce((function(t, n, i) {
                    var r, s = Object.keys(t).length;
                    return te({}, t, n > e * s && ((r = {})[s] = i,
                    r))
                }
                ), {
                    0: 0
                })
                  , s = t.map((function(s, o) {
                    var a = s.height
                      , l = Math.floor(i[o] / e);
                    return {
                        left: t.slice(r[l], o).reduce((function(e, t) {
                            return e + t.width + n
                        }
                        ), 0),
                        top: (a + n) * l
                    }
                }
                ));
                return {
                    containerHeight: Object.keys(r).length * (t[0].height + n) + n,
                    itemsPositions: s
                }
            }(e, t, i);
        case a.SAME_WIDTH:
            return function(e, t, n) {
                var i = Math.floor(e / (t[0].width + n))
                  , r = t.map((function(e, r) {
                    var s = e.width
                      , o = Math.floor(r / i);
                    return {
                        left: (r - i * o) * (s + n),
                        top: t.slice(0, r).filter((function(e, t) {
                            return (r - t) % i == 0
                        }
                        )).reduce((function(e, t) {
                            return e + t.height + n
                        }
                        ), 0)
                    }
                }
                ))
                  , s = t.reduce((function(e, t, r) {
                    var s = t.height
                      , o = Math.floor(r / i);
                    return e[r - i * o] += s + n,
                    e
                }
                ), Array.apply(null, Array(i)).map(Number.prototype.valueOf, 0));
                return {
                    containerHeight: Math.max.apply(Math, s) + n,
                    itemsPositions: r
                }
            }(e, t, i);
        case a.PACKED:
            return function(e, t, n) {
                var i = new ne(e)
                  , r = t.map((function(e) {
                    var t = e.width
                      , i = e.height;
                    return {
                        w: t + n,
                        h: i + n
                    }
                }
                ));
                i.fit(r);
                var s = r.map((function(e) {
                    var t = e.fit;
                    return {
                        left: t.x,
                        top: t.y
                    }
                }
                ));
                return {
                    containerHeight: i.root.h + n,
                    itemsPositions: s
                }
            }(e, t, i);
        case a.SAME_SIZE:
        default:
            return function(e, t, n) {
                var i = Math.floor(e / (t[0].width + n))
                  , r = t.map((function(e, t) {
                    var r = e.width
                      , s = e.height
                      , o = Math.floor(t / i);
                    return {
                        left: (t - i * o) * (r + n),
                        top: o * (s + n)
                    }
                }
                ));
                return {
                    containerHeight: Math.ceil(t.length / i) * (t[0].height + n) + n,
                    itemsPositions: r
                }
            }(e, t, i)
        }
    }
    ));
    function re(e) {
        if (!e)
            throw new Error("Filterizr as a jQuery plugin, requires jQuery to work. If you would prefer to use the vanilla JS version, please use the correct bundle file.");
        e.fn.filterizr = function() {
            var t = "." + e.trim(this.get(0).className).replace(/\s+/g, ".")
              , n = arguments;
            if (!this._fltr && 0 === n.length || 1 === n.length && "object" == typeof n[0]) {
                var i = n.length > 0 ? n[0] : b;
                this._fltr = new le(t,i)
            } else if (n.length >= 1 && "string" == typeof n[0]) {
                var r = n[0]
                  , s = Array.prototype.slice.call(n, 1)
                  , o = this._fltr;
                switch (r) {
                case "filter":
                    return o.filter.apply(o, s),
                    this;
                case "insertItem":
                    return o.insertItem.apply(o, s),
                    this;
                case "removeItem":
                    return o.removeItem.apply(o, s),
                    this;
                case "toggleFilter":
                    return o.toggleFilter.apply(o, s),
                    this;
                case "sort":
                    return o.sort.apply(o, s),
                    this;
                case "shuffle":
                    return o.shuffle.apply(o, s),
                    this;
                case "search":
                    return o.search.apply(o, s),
                    this;
                case "setOptions":
                    return o.setOptions.apply(o, s),
                    this;
                case "destroy":
                    return o.destroy.apply(o, s),
                    delete this._fltr,
                    this;
                default:
                    throw new Error("Filterizr: " + r + " is not part of the Filterizr API. Please refer to the docs for more information.")
                }
            }
            return this
        }
    }
    var se = function(e, t, n, i) {
        return new (n || (n = Promise))((function(r, s) {
            function o(e) {
                try {
                    l(i.next(e))
                } catch (e) {
                    s(e)
                }
            }
            function a(e) {
                try {
                    l(i.throw(e))
                } catch (e) {
                    s(e)
                }
            }
            function l(e) {
                e.done ? r(e.value) : new n((function(t) {
                    t(e.value)
                }
                )).then(o, a)
            }
            l((i = i.apply(e, t || [])).next())
        }
        ))
    }
      , oe = function(e, t) {
        var n, i, r, s, o = {
            label: 0,
            sent: function() {
                if (1 & r[0])
                    throw r[1];
                return r[1]
            },
            trys: [],
            ops: []
        };
        return s = {
            next: a(0),
            throw: a(1),
            return: a(2)
        },
        "function" == typeof Symbol && (s[Symbol.iterator] = function() {
            return this
        }
        ),
        s;
        function a(s) {
            return function(a) {
                return function(s) {
                    if (n)
                        throw new TypeError("Generator is already executing.");
                    for (; o; )
                        try {
                            if (n = 1,
                            i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i),
                            0) : i.next) && !(r = r.call(i, s[1])).done)
                                return r;
                            switch (i = 0,
                            r && (s = [2 & s[0], r.value]),
                            s[0]) {
                            case 0:
                            case 1:
                                r = s;
                                break;
                            case 4:
                                return o.label++,
                                {
                                    value: s[1],
                                    done: !1
                                };
                            case 5:
                                o.label++,
                                i = s[1],
                                s = [0];
                                continue;
                            case 7:
                                s = o.ops.pop(),
                                o.trys.pop();
                                continue;
                            default:
                                if (!(r = (r = o.trys).length > 0 && r[r.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                    o = 0;
                                    continue
                                }
                                if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {
                                    o.label = s[1];
                                    break
                                }
                                if (6 === s[0] && o.label < r[1]) {
                                    o.label = r[1],
                                    r = s;
                                    break
                                }
                                if (r && o.label < r[2]) {
                                    o.label = r[2],
                                    o.ops.push(s);
                                    break
                                }
                                r[2] && o.ops.pop(),
                                o.trys.pop();
                                continue
                            }
                            s = t.call(e, o)
                        } catch (e) {
                            s = [6, e],
                            i = 0
                        } finally {
                            n = r = 0
                        }
                    if (5 & s[0])
                        throw s[1];
                    return {
                        value: s[0] ? s[1] : void 0,
                        done: !0
                    }
                }([s, a])
            }
        }
    }
      , ae = n(1)
      , le = function() {
        function e(e, t) {
            void 0 === e && (e = ".filtr-container"),
            void 0 === t && (t = {}),
            this.options = new x(t);
            var n = this.options
              , i = n.areControlsEnabled
              , r = n.controlsSelector
              , s = n.isSpinnerEnabled;
            this.windowEventReceiver = new v(window),
            this.filterContainer = new X(function(e) {
                return "string" == typeof e ? document.querySelector(e) : e
            }(e),this.options),
            this.imagesHaveLoaded = !this.filterContainer.node.querySelectorAll("img").length,
            i && (this.filterControls = new E(this,r)),
            s && (this.spinner = new K(this.filterContainer,this.options)),
            this.initialize()
        }
        return Object.defineProperty(e.prototype, "filterItems", {
            get: function() {
                return this.filterContainer.filterItems
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.filter = function(e) {
            var t = this.filterContainer;
            t.trigger("filteringStart"),
            t.filterizrState = r,
            e = Array.isArray(e) ? e.map((function(e) {
                return e.toString()
            }
            )) : e.toString(),
            this.options.filter = e,
            this.render()
        }
        ,
        e.prototype.destroy = function() {
            var e = this.windowEventReceiver
              , t = this.filterControls;
            this.filterContainer.destroy(),
            e.destroy(),
            this.options.areControlsEnabled && t && t.destroy()
        }
        ,
        e.prototype.insertItem = function(e) {
            return se(this, void 0, void 0, (function() {
                return oe(this, (function(t) {
                    switch (t.label) {
                    case 0:
                        return this.filterContainer.insertItem(e),
                        [4, this.waitForImagesToLoad()];
                    case 1:
                        return t.sent(),
                        this.render(),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.removeItem = function(e) {
            this.filterContainer.removeItem(e),
            this.render()
        }
        ,
        e.prototype.sort = function(e, t) {
            void 0 === e && (e = "index"),
            void 0 === t && (t = "asc");
            var n = this.filterContainer
              , i = this.filterItems;
            n.trigger("sortingStart"),
            n.filterizrState = s,
            i.sort(e, t),
            this.render()
        }
        ,
        e.prototype.search = function(e) {
            void 0 === e && (e = this.options.get().searchTerm),
            this.options.searchTerm = e.toLowerCase(),
            this.render()
        }
        ,
        e.prototype.shuffle = function() {
            var e = this.filterContainer
              , t = this.filterItems;
            e.trigger("shufflingStart"),
            e.filterizrState = o,
            t.shuffle(),
            this.render()
        }
        ,
        e.prototype.setOptions = function(e) {
            var t = this.filterContainer
              , n = this.filterItems
              , i = "animationDuration"in e || "delay"in e || "delayMode"in e;
            (e.callbacks || i) && t.unbindEvents(),
            this.options.set(e),
            (e.easing || i) && n.styles.updateTransitionStyle(),
            (e.callbacks || i) && t.bindEvents(),
            "searchTerm"in e && this.search(e.searchTerm),
            ("filter"in e || "multifilterLomultifilterLogicalOperator"in e) && this.filter(this.options.filter),
            "gutterPixels"in e && (this.filterContainer.styles.updatePaddings(),
            this.filterItems.styles.updateWidthWithTransitionsDisabled(),
            this.render())
        }
        ,
        e.prototype.toggleFilter = function(e) {
            this.options.toggleFilter(e),
            this.filter(this.options.filter)
        }
        ,
        e.prototype.render = function() {
            var e = this.filterContainer
              , t = this.filterItems
              , n = this.options
              , i = t.getFiltered(n.filter);
            t.styles.resetDisplay(),
            t.getFilteredOut(n.filter).forEach((function(e) {
                e.filterOut()
            }
            ));
            var r = ie(e.dimensions.width, i.map((function(e) {
                return e.dimensions
            }
            )), this.options.get())
              , s = r.containerHeight
              , o = r.itemsPositions;
            e.setHeight(s),
            i.forEach((function(e, t) {
                e.filterIn(o[t])
            }
            ))
        }
        ,
        e.prototype.initialize = function() {
            return se(this, void 0, void 0, (function() {
                var e, t, n, i;
                return oe(this, (function(r) {
                    switch (r.label) {
                    case 0:
                        return t = (e = this).filterContainer,
                        n = e.filterItems,
                        i = e.spinner,
                        this.bindEvents(),
                        [4, this.waitForImagesToLoad()];
                    case 1:
                        return r.sent(),
                        this.options.isSpinnerEnabled ? [4, i.destroy()] : [3, 3];
                    case 2:
                        r.sent(),
                        r.label = 3;
                    case 3:
                        return this.render(),
                        [4, n.styles.enableTransitions()];
                    case 4:
                        return r.sent(),
                        t.trigger("init"),
                        [2]
                    }
                }
                ))
            }
            ))
        }
        ,
        e.prototype.bindEvents = function() {
            var e = this
              , t = this.filterItems;
            this.windowEventReceiver.on("resize", d((function() {
                t.styles.updateWidthWithTransitionsDisabled(),
                e.render()
            }
            ), 50, !1))
        }
        ,
        e.prototype.waitForImagesToLoad = function() {
            return se(this, void 0, void 0, (function() {
                var e, t, n, i = this;
                return oe(this, (function(r) {
                    return t = (e = this).imagesHaveLoaded,
                    n = e.filterContainer,
                    t ? [2, Promise.resolve()] : [2, new Promise((function(e) {
                        ae(n.node, (function() {
                            i.imagesHaveLoaded = !0,
                            e()
                        }
                        ))
                    }
                    ))]
                }
                ))
            }
            ))
        }
        ,
        e.FilterContainer = X,
        e.FilterItem = z,
        e.defaultOptions = b,
        e.installAsJQueryPlugin = re,
        e
    }();
    n.d(t, "a", (function() {
        return le
    }
    ))
}
, function(e, t, n) {
    var i, r;
    /*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
    /*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
    !function(s, o) {
        "use strict";
        i = [n(3)],
        void 0 === (r = function(e) {
            return function(e, t) {
                var n = e.jQuery
                  , i = e.console;
                function r(e, t) {
                    for (var n in t)
                        e[n] = t[n];
                    return e
                }
                var s = Array.prototype.slice;
                function o(e, t, a) {
                    if (!(this instanceof o))
                        return new o(e,t,a);
                    var l = e;
                    "string" == typeof e && (l = document.querySelectorAll(e)),
                    l ? (this.elements = function(e) {
                        return Array.isArray(e) ? e : "object" == typeof e && "number" == typeof e.length ? s.call(e) : [e]
                    }(l),
                    this.options = r({}, this.options),
                    "function" == typeof t ? a = t : r(this.options, t),
                    a && this.on("always", a),
                    this.getImages(),
                    n && (this.jqDeferred = new n.Deferred),
                    setTimeout(this.check.bind(this))) : i.error("Bad element for imagesLoaded " + (l || e))
                }
                o.prototype = Object.create(t.prototype),
                o.prototype.options = {},
                o.prototype.getImages = function() {
                    this.images = [],
                    this.elements.forEach(this.addElementImages, this)
                }
                ,
                o.prototype.addElementImages = function(e) {
                    "IMG" == e.nodeName && this.addImage(e),
                    !0 === this.options.background && this.addElementBackgroundImages(e);
                    var t = e.nodeType;
                    if (t && a[t]) {
                        for (var n = e.querySelectorAll("img"), i = 0; i < n.length; i++) {
                            var r = n[i];
                            this.addImage(r)
                        }
                        if ("string" == typeof this.options.background) {
                            var s = e.querySelectorAll(this.options.background);
                            for (i = 0; i < s.length; i++) {
                                var o = s[i];
                                this.addElementBackgroundImages(o)
                            }
                        }
                    }
                }
                ;
                var a = {
                    1: !0,
                    9: !0,
                    11: !0
                };
                function l(e) {
                    this.img = e
                }
                function c(e, t) {
                    this.url = e,
                    this.element = t,
                    this.img = new Image
                }
                return o.prototype.addElementBackgroundImages = function(e) {
                    var t = getComputedStyle(e);
                    if (t)
                        for (var n = /url\((['"])?(.*?)\1\)/gi, i = n.exec(t.backgroundImage); null !== i; ) {
                            var r = i && i[2];
                            r && this.addBackground(r, e),
                            i = n.exec(t.backgroundImage)
                        }
                }
                ,
                o.prototype.addImage = function(e) {
                    var t = new l(e);
                    this.images.push(t)
                }
                ,
                o.prototype.addBackground = function(e, t) {
                    var n = new c(e,t);
                    this.images.push(n)
                }
                ,
                o.prototype.check = function() {
                    var e = this;
                    function t(t, n, i) {
                        setTimeout((function() {
                            e.progress(t, n, i)
                        }
                        ))
                    }
                    this.progressedCount = 0,
                    this.hasAnyBroken = !1,
                    this.images.length ? this.images.forEach((function(e) {
                        e.once("progress", t),
                        e.check()
                    }
                    )) : this.complete()
                }
                ,
                o.prototype.progress = function(e, t, n) {
                    this.progressedCount++,
                    this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded,
                    this.emitEvent("progress", [this, e, t]),
                    this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e),
                    this.progressedCount == this.images.length && this.complete(),
                    this.options.debug && i && i.log("progress: " + n, e, t)
                }
                ,
                o.prototype.complete = function() {
                    var e = this.hasAnyBroken ? "fail" : "done";
                    if (this.isComplete = !0,
                    this.emitEvent(e, [this]),
                    this.emitEvent("always", [this]),
                    this.jqDeferred) {
                        var t = this.hasAnyBroken ? "reject" : "resolve";
                        this.jqDeferred[t](this)
                    }
                }
                ,
                l.prototype = Object.create(t.prototype),
                l.prototype.check = function() {
                    this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                    this.proxyImage.addEventListener("load", this),
                    this.proxyImage.addEventListener("error", this),
                    this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    this.proxyImage.src = this.img.src)
                }
                ,
                l.prototype.getIsImageComplete = function() {
                    return this.img.complete && this.img.naturalWidth
                }
                ,
                l.prototype.confirm = function(e, t) {
                    this.isLoaded = e,
                    this.emitEvent("progress", [this, this.img, t])
                }
                ,
                l.prototype.handleEvent = function(e) {
                    var t = "on" + e.type;
                    this[t] && this[t](e)
                }
                ,
                l.prototype.onload = function() {
                    this.confirm(!0, "onload"),
                    this.unbindEvents()
                }
                ,
                l.prototype.onerror = function() {
                    this.confirm(!1, "onerror"),
                    this.unbindEvents()
                }
                ,
                l.prototype.unbindEvents = function() {
                    this.proxyImage.removeEventListener("load", this),
                    this.proxyImage.removeEventListener("error", this),
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
                }
                ,
                c.prototype = Object.create(l.prototype),
                c.prototype.check = function() {
                    this.img.addEventListener("load", this),
                    this.img.addEventListener("error", this),
                    this.img.src = this.url,
                    this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                    this.unbindEvents())
                }
                ,
                c.prototype.unbindEvents = function() {
                    this.img.removeEventListener("load", this),
                    this.img.removeEventListener("error", this)
                }
                ,
                c.prototype.confirm = function(e, t) {
                    this.isLoaded = e,
                    this.emitEvent("progress", [this, this.element, t])
                }
                ,
                o.makeJQueryPlugin = function(t) {
                    (t = t || e.jQuery) && ((n = t).fn.imagesLoaded = function(e, t) {
                        return new o(this,e,t).jqDeferred.promise(n(this))
                    }
                    )
                }
                ,
                o.makeJQueryPlugin(),
                o
            }(s, e)
        }
        .apply(t, i)) || (e.exports = r)
    }("undefined" != typeof window ? window : this)
}
, function(e, t) {
    function n(e, t, n, i) {
        var r, s = null == (r = i) || "number" == typeof r || "boolean" == typeof r ? i : n(i), o = t.get(s);
        return void 0 === o && (o = e.call(this, i),
        t.set(s, o)),
        o
    }
    function i(e, t, n) {
        var i = Array.prototype.slice.call(arguments, 3)
          , r = n(i)
          , s = t.get(r);
        return void 0 === s && (s = e.apply(this, i),
        t.set(r, s)),
        s
    }
    function r(e, t, n, i, r) {
        return n.bind(t, e, i, r)
    }
    function s(e, t) {
        return r(e, this, 1 === e.length ? n : i, t.cache.create(), t.serializer)
    }
    function o() {
        return JSON.stringify(arguments)
    }
    function a() {
        this.cache = Object.create(null)
    }
    a.prototype.has = function(e) {
        return e in this.cache
    }
    ,
    a.prototype.get = function(e) {
        return this.cache[e]
    }
    ,
    a.prototype.set = function(e, t) {
        this.cache[e] = t
    }
    ;
    var l = {
        create: function() {
            return new a
        }
    };
    e.exports = function(e, t) {
        var n = t && t.cache ? t.cache : l
          , i = t && t.serializer ? t.serializer : o;
        return (t && t.strategy ? t.strategy : s)(e, {
            cache: n,
            serializer: i
        })
    }
    ,
    e.exports.strategies = {
        variadic: function(e, t) {
            return r(e, this, i, t.cache.create(), t.serializer)
        },
        monadic: function(e, t) {
            return r(e, this, n, t.cache.create(), t.serializer)
        }
    }
}
, function(e, t, n) {
    var i, r;
    "undefined" != typeof window && window,
    void 0 === (r = "function" == typeof (i = function() {
        "use strict";
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
            if (e && t) {
                var n = this._events = this._events || {}
                  , i = n[e] = n[e] || [];
                return -1 == i.indexOf(t) && i.push(t),
                this
            }
        }
        ,
        t.once = function(e, t) {
            if (e && t) {
                this.on(e, t);
                var n = this._onceEvents = this._onceEvents || {};
                return (n[e] = n[e] || {})[t] = !0,
                this
            }
        }
        ,
        t.off = function(e, t) {
            var n = this._events && this._events[e];
            if (n && n.length) {
                var i = n.indexOf(t);
                return -1 != i && n.splice(i, 1),
                this
            }
        }
        ,
        t.emitEvent = function(e, t) {
            var n = this._events && this._events[e];
            if (n && n.length) {
                n = n.slice(0),
                t = t || [];
                for (var i = this._onceEvents && this._onceEvents[e], r = 0; r < n.length; r++) {
                    var s = n[r];
                    i && i[s] && (this.off(e, s),
                    delete i[s]),
                    s.apply(this, t)
                }
                return this
            }
        }
        ,
        t.allOff = function() {
            delete this._events,
            delete this._onceEvents
        }
        ,
        e
    }
    ) ? i.call(t, n, t, e) : i) || (e.exports = r)
}
, , function(e, t, n) {
    "use strict";
    n.r(t);
    var i = n(0);
    n.d(t, "default", (function() {
        return i.a
    }
    ))
}
]).default;
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ClipboardJS = t() : e.ClipboardJS = t()
}(this, (function() {
    return t = {
        686: function(e, t, n) {
            "use strict";
            n.d(t, {
                default: function() {
                    return g
                }
            });
            t = n(279);
            var i = n.n(t)
              , r = (t = n(370),
            n.n(t))
              , s = (t = n(817),
            n.n(t));
            function o(e) {
                try {
                    return document.execCommand(e)
                } catch (e) {
                    return
                }
            }
            var a = function(e) {
                return e = s()(e),
                o("cut"),
                e
            };
            function l(e, t) {
                var n, i;
                n = e,
                i = "rtl" === document.documentElement.getAttribute("dir"),
                (e = document.createElement("textarea")).style.fontSize = "12pt",
                e.style.border = "0",
                e.style.padding = "0",
                e.style.margin = "0",
                e.style.position = "absolute",
                e.style[i ? "right" : "left"] = "-9999px",
                i = window.pageYOffset || document.documentElement.scrollTop,
                e.style.top = "".concat(i, "px"),
                e.setAttribute("readonly", ""),
                e.value = n,
                e = e;
                return t.container.appendChild(e),
                t = s()(e),
                o("copy"),
                e.remove(),
                t
            }
            var c = function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {
                    container: document.body
                }
                  , n = "";
                return "string" == typeof e ? n = l(e, t) : e instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(null == e ? void 0 : e.type) ? n = l(e.value, t) : (n = s()(e),
                o("copy")),
                n
            };
            function d(e) {
                return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
            }
            function u(e) {
                return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                )(e)
            }
            function p(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            function f(e, t) {
                return (f = Object.setPrototypeOf || function(e, t) {
                    return e.__proto__ = t,
                    e
                }
                )(e, t)
            }
            function h(e) {
                return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }
                )(e)
            }
            function m(e, t) {
                if (e = "data-clipboard-".concat(e),
                t.hasAttribute(e))
                    return t.getAttribute(e)
            }
            var g = function() {
                !function(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                    t && f(e, t)
                }(o, i());
                var e, t, n, s = function(e) {
                    var t = function() {
                        if ("undefined" == typeof Reflect || !Reflect.construct)
                            return !1;
                        if (Reflect.construct.sham)
                            return !1;
                        if ("function" == typeof Proxy)
                            return !0;
                        try {
                            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}
                            ))),
                            !0
                        } catch (e) {
                            return !1
                        }
                    }();
                    return function() {
                        var n, i = h(e);
                        return n = t ? (n = h(this).constructor,
                        Reflect.construct(i, arguments, n)) : i.apply(this, arguments),
                        i = this,
                        !(n = n) || "object" !== u(n) && "function" != typeof n ? function(e) {
                            if (void 0 !== e)
                                return e;
                            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                        }(i) : n
                    }
                }(o);
                function o(e, t) {
                    var n;
                    return function(e) {
                        if (!(e instanceof o))
                            throw new TypeError("Cannot call a class as a function")
                    }(this),
                    (n = s.call(this)).resolveOptions(t),
                    n.listenClick(e),
                    n
                }
                return e = o,
                n = [{
                    key: "copy",
                    value: function(e) {
                        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {
                            container: document.body
                        };
                        return c(e, t)
                    }
                }, {
                    key: "cut",
                    value: function(e) {
                        return a(e)
                    }
                }, {
                    key: "isSupported",
                    value: function() {
                        var e = "string" == typeof (e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"]) ? [e] : e
                          , t = !!document.queryCommandSupported;
                        return e.forEach((function(e) {
                            t = t && !!document.queryCommandSupported(e)
                        }
                        )),
                        t
                    }
                }],
                (t = [{
                    key: "resolveOptions",
                    value: function() {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = "function" == typeof e.action ? e.action : this.defaultAction,
                        this.target = "function" == typeof e.target ? e.target : this.defaultTarget,
                        this.text = "function" == typeof e.text ? e.text : this.defaultText,
                        this.container = "object" === u(e.container) ? e.container : document.body
                    }
                }, {
                    key: "listenClick",
                    value: function(e) {
                        var t = this;
                        this.listener = r()(e, "click", (function(e) {
                            return t.onClick(e)
                        }
                        ))
                    }
                }, {
                    key: "onClick",
                    value: function(e) {
                        var t = e.delegateTarget || e.currentTarget
                          , n = this.action(t) || "copy";
                        e = function() {
                            var e = void 0 === (n = (i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).action) ? "copy" : n
                              , t = i.container
                              , n = i.target
                              , i = i.text;
                            if ("copy" !== e && "cut" !== e)
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            if (void 0 !== n) {
                                if (!n || "object" !== d(n) || 1 !== n.nodeType)
                                    throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === e && n.hasAttribute("disabled"))
                                    throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === e && (n.hasAttribute("readonly") || n.hasAttribute("disabled")))
                                    throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')
                            }
                            return i ? c(i, {
                                container: t
                            }) : n ? "cut" === e ? a(n) : c(n, {
                                container: t
                            }) : void 0
                        }({
                            action: n,
                            container: this.container,
                            target: this.target(t),
                            text: this.text(t)
                        });
                        this.emit(e ? "success" : "error", {
                            action: n,
                            text: e,
                            trigger: t,
                            clearSelection: function() {
                                t && t.focus(),
                                window.getSelection().removeAllRanges()
                            }
                        })
                    }
                }, {
                    key: "defaultAction",
                    value: function(e) {
                        return m("action", e)
                    }
                }, {
                    key: "defaultTarget",
                    value: function(e) {
                        if (e = m("target", e))
                            return document.querySelector(e)
                    }
                }, {
                    key: "defaultText",
                    value: function(e) {
                        return m("text", e)
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        this.listener.destroy()
                    }
                }]) && p(e.prototype, t),
                n && p(e, n),
                o
            }()
        },
        828: function(e) {
            var t;
            "undefined" == typeof Element || Element.prototype.matches || ((t = Element.prototype).matches = t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector),
            e.exports = function(e, t) {
                for (; e && 9 !== e.nodeType; ) {
                    if ("function" == typeof e.matches && e.matches(t))
                        return e;
                    e = e.parentNode
                }
            }
        },
        438: function(e, t, n) {
            var i = n(828);
            function r(e, t, n, r, s) {
                var o = function(e, t, n, r) {
                    return function(n) {
                        n.delegateTarget = i(n.target, t),
                        n.delegateTarget && r.call(e, n)
                    }
                }
                .apply(this, arguments);
                return e.addEventListener(n, o, s),
                {
                    destroy: function() {
                        e.removeEventListener(n, o, s)
                    }
                }
            }
            e.exports = function(e, t, n, i, s) {
                return "function" == typeof e.addEventListener ? r.apply(null, arguments) : "function" == typeof n ? r.bind(null, document).apply(null, arguments) : ("string" == typeof e && (e = document.querySelectorAll(e)),
                Array.prototype.map.call(e, (function(e) {
                    return r(e, t, n, i, s)
                }
                )))
            }
        },
        879: function(e, t) {
            t.node = function(e) {
                return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
            }
            ,
            t.nodeList = function(e) {
                var n = Object.prototype.toString.call(e);
                return void 0 !== e && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length"in e && (0 === e.length || t.node(e[0]))
            }
            ,
            t.string = function(e) {
                return "string" == typeof e || e instanceof String
            }
            ,
            t.fn = function(e) {
                return "[object Function]" === Object.prototype.toString.call(e)
            }
        },
        370: function(e, t, n) {
            var i = n(879)
              , r = n(438);
            e.exports = function(e, t, n) {
                if (!e && !t && !n)
                    throw new Error("Missing required arguments");
                if (!i.string(t))
                    throw new TypeError("Second argument must be a String");
                if (!i.fn(n))
                    throw new TypeError("Third argument must be a Function");
                if (i.node(e))
                    return c = t,
                    d = n,
                    (l = e).addEventListener(c, d),
                    {
                        destroy: function() {
                            l.removeEventListener(c, d)
                        }
                    };
                if (i.nodeList(e))
                    return s = e,
                    o = t,
                    a = n,
                    Array.prototype.forEach.call(s, (function(e) {
                        e.addEventListener(o, a)
                    }
                    )),
                    {
                        destroy: function() {
                            Array.prototype.forEach.call(s, (function(e) {
                                e.removeEventListener(o, a)
                            }
                            ))
                        }
                    };
                if (i.string(e))
                    return e = e,
                    t = t,
                    n = n,
                    r(document.body, e, t, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                var s, o, a, l, c, d
            }
        },
        817: function(e) {
            e.exports = function(e) {
                var t, n = "SELECT" === e.nodeName ? (e.focus(),
                e.value) : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName ? ((t = e.hasAttribute("readonly")) || e.setAttribute("readonly", ""),
                e.select(),
                e.setSelectionRange(0, e.value.length),
                t || e.removeAttribute("readonly"),
                e.value) : (e.hasAttribute("contenteditable") && e.focus(),
                n = window.getSelection(),
                (t = document.createRange()).selectNodeContents(e),
                n.removeAllRanges(),
                n.addRange(t),
                n.toString());
                return n
            }
        },
        279: function(e) {
            function t() {}
            t.prototype = {
                on: function(e, t, n) {
                    var i = this.e || (this.e = {});
                    return (i[e] || (i[e] = [])).push({
                        fn: t,
                        ctx: n
                    }),
                    this
                },
                once: function(e, t, n) {
                    var i = this;
                    function r() {
                        i.off(e, r),
                        t.apply(n, arguments)
                    }
                    return r._ = t,
                    this.on(e, r, n)
                },
                emit: function(e) {
                    for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), i = 0, r = n.length; i < r; i++)
                        n[i].fn.apply(n[i].ctx, t);
                    return this
                },
                off: function(e, t) {
                    var n = this.e || (this.e = {})
                      , i = n[e]
                      , r = [];
                    if (i && t)
                        for (var s = 0, o = i.length; s < o; s++)
                            i[s].fn !== t && i[s].fn._ !== t && r.push(i[s]);
                    return r.length ? n[e] = r : delete n[e],
                    this
                }
            },
            e.exports = t,
            e.exports.TinyEmitter = t
        }
    },
    n = {},
    e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return e.d(n, {
            a: n
        }),
        n
    }
    ,
    e.d = function(t, n) {
        for (var i in n)
            e.o(n, i) && !e.o(t, i) && Object.defineProperty(t, i, {
                enumerable: !0,
                get: n[i]
            })
    }
    ,
    e.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    e(686).default;
    function e(i) {
        if (n[i])
            return n[i].exports;
        var r = n[i] = {
            exports: {}
        };
        return t[i](r, r.exports, e),
        r.exports
    }
    var t, n
}
));
const $ = e => document.querySelector(e)
  , countdown = function(e) {
    const t = $(e.target).getAttribute("data-date").split("-")
      , n = parseInt(t[0])
      , i = parseInt(t[1])
      , r = parseInt(t[2]);
    let s, o, a = $(e.target).getAttribute("data-time");
    null != a && (a = a.split(":"),
    s = parseInt(a[0]),
    o = parseInt(a[1]));
    (new Date).getFullYear();
    let l = new Date;
    l.getDate(),
    l.getMonth(),
    l.getFullYear(),
    l.getHours(),
    l.getMinutes();
    const c = new Date(r,i - 1,n,s,o,0,0).getTime();
    $(e.target + " .day .word").innerHTML = e.dayWord,
    $(e.target + " .hour .word").innerHTML = e.hourWord,
    $(e.target + " .min .word").innerHTML = e.minWord,
    $(e.target + " .sec .word").innerHTML = e.secWord;
    const d = () => {
        const t = (new Date).getTime()
          , n = c - t
          , i = Math.floor(n / 864e5)
          , r = Math.floor(n % 864e5 / 36e5)
          , s = Math.floor(n % 36e5 / 6e4)
          , o = Math.floor(n % 6e4 / 1e3);
        requestAnimationFrame(d),
        $(e.target + " .day .num").innerHTML = addZero(i),
        $(e.target + " .hour .num").innerHTML = addZero(r),
        $(e.target + " .min .num").innerHTML = addZero(s),
        $(e.target + " .sec .num").innerHTML = addZero(o),
        n < 0 && ($(".countdown").innerHTML = "EXPIRED")
    }
    ;
    d()
}
  , addZero = e => e < 10 && e >= 0 ? "0" + e : e;
!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, (function() {
    return function(e) {
        function t(i) {
            if (n[i])
                return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(r.exports, r, r.exports, t),
            r.loaded = !0,
            r.exports
        }
        var n = {};
        return t.m = e,
        t.c = n,
        t.p = "dist/",
        t(0)
    }([function(e, t, n) {
        "use strict";
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var i in n)
                    Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
            }
            return e
        }
          , s = (i(n(1)),
        n(6))
          , o = i(s)
          , a = i(n(7))
          , l = i(n(8))
          , c = i(n(9))
          , d = i(n(10))
          , u = i(n(11))
          , p = i(n(14))
          , f = []
          , h = !1
          , m = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            startEvent: "DOMContentLoaded",
            throttleDelay: 99,
            debounceDelay: 50,
            disableMutationObserver: !1
        }
          , g = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            if (e && (h = !0),
            h)
                return f = (0,
                u.default)(f, m),
                (0,
                d.default)(f, m.once),
                f
        }
          , v = function() {
            f = (0,
            p.default)(),
            g()
        };
        e.exports = {
            init: function(e) {
                m = r(m, e),
                f = (0,
                p.default)();
                var t = document.all && !window.atob;
                return function(e) {
                    return !0 === e || "mobile" === e && c.default.mobile() || "phone" === e && c.default.phone() || "tablet" === e && c.default.tablet() || "function" == typeof e && !0 === e()
                }(m.disable) || t ? void f.forEach((function(e, t) {
                    e.node.removeAttribute("data-aos"),
                    e.node.removeAttribute("data-aos-easing"),
                    e.node.removeAttribute("data-aos-duration"),
                    e.node.removeAttribute("data-aos-delay")
                }
                )) : (m.disableMutationObserver || l.default.isSupported() || (console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),
                m.disableMutationObserver = !0),
                document.querySelector("body").setAttribute("data-aos-easing", m.easing),
                document.querySelector("body").setAttribute("data-aos-duration", m.duration),
                document.querySelector("body").setAttribute("data-aos-delay", m.delay),
                "DOMContentLoaded" === m.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? g(!0) : "load" === m.startEvent ? window.addEventListener(m.startEvent, (function() {
                    g(!0)
                }
                )) : document.addEventListener(m.startEvent, (function() {
                    g(!0)
                }
                )),
                window.addEventListener("resize", (0,
                a.default)(g, m.debounceDelay, !0)),
                window.addEventListener("orientationchange", (0,
                a.default)(g, m.debounceDelay, !0)),
                window.addEventListener("scroll", (0,
                o.default)((function() {
                    (0,
                    d.default)(f, m.once)
                }
                ), m.throttleDelay)),
                m.disableMutationObserver || l.default.ready("[data-aos]", v),
                f)
            },
            refresh: g,
            refreshHard: v
        }
    }
    , function(e, t) {}
    , , , , , function(e, t) {
        (function(t) {
            "use strict";
            function n(e, t, n) {
                function r(t) {
                    var n = p
                      , i = f;
                    return p = f = void 0,
                    b = t,
                    m = e.apply(i, n)
                }
                function o(e) {
                    return b = e,
                    g = setTimeout(c, t),
                    E ? r(e) : m
                }
                function l(e) {
                    var n = e - v;
                    return void 0 === v || n >= t || n < 0 || _ && e - b >= h
                }
                function c() {
                    var e = x();
                    return l(e) ? d(e) : void (g = setTimeout(c, function(e) {
                        var n = t - (e - v);
                        return _ ? w(n, h - (e - b)) : n
                    }(e)))
                }
                function d(e) {
                    return g = void 0,
                    S && p ? r(e) : (p = f = void 0,
                    m)
                }
                function u() {
                    var e = x()
                      , n = l(e);
                    if (p = arguments,
                    f = this,
                    v = e,
                    n) {
                        if (void 0 === g)
                            return o(v);
                        if (_)
                            return g = setTimeout(c, t),
                            r(v)
                    }
                    return void 0 === g && (g = setTimeout(c, t)),
                    m
                }
                var p, f, h, m, g, v, b = 0, E = !1, _ = !1, S = !0;
                if ("function" != typeof e)
                    throw new TypeError(a);
                return t = s(t) || 0,
                i(n) && (E = !!n.leading,
                h = (_ = "maxWait"in n) ? y(s(n.maxWait) || 0, t) : h,
                S = "trailing"in n ? !!n.trailing : S),
                u.cancel = function() {
                    void 0 !== g && clearTimeout(g),
                    b = 0,
                    p = v = f = g = void 0
                }
                ,
                u.flush = function() {
                    return void 0 === g ? m : d(x())
                }
                ,
                u
            }
            function i(e) {
                var t = void 0 === e ? "undefined" : o(e);
                return !!e && ("object" == t || "function" == t)
            }
            function r(e) {
                return "symbol" == (void 0 === e ? "undefined" : o(e)) || function(e) {
                    return !!e && "object" == (void 0 === e ? "undefined" : o(e))
                }(e) && b.call(e) == c
            }
            function s(e) {
                if ("number" == typeof e)
                    return e;
                if (r(e))
                    return l;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(d, "");
                var n = p.test(e);
                return n || f.test(e) ? h(e.slice(2), n ? 2 : 8) : u.test(e) ? l : +e
            }
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , a = "Expected a function"
              , l = NaN
              , c = "[object Symbol]"
              , d = /^\s+|\s+$/g
              , u = /^[-+]0x[0-9a-f]+$/i
              , p = /^0b[01]+$/i
              , f = /^0o[0-7]+$/i
              , h = parseInt
              , m = "object" == (void 0 === t ? "undefined" : o(t)) && t && t.Object === Object && t
              , g = "object" == ("undefined" == typeof self ? "undefined" : o(self)) && self && self.Object === Object && self
              , v = m || g || Function("return this")()
              , b = Object.prototype.toString
              , y = Math.max
              , w = Math.min
              , x = function() {
                return v.Date.now()
            };
            e.exports = function(e, t, r) {
                var s = !0
                  , o = !0;
                if ("function" != typeof e)
                    throw new TypeError(a);
                return i(r) && (s = "leading"in r ? !!r.leading : s,
                o = "trailing"in r ? !!r.trailing : o),
                n(e, t, {
                    leading: s,
                    maxWait: t,
                    trailing: o
                })
            }
        }
        ).call(t, function() {
            return this
        }())
    }
    , function(e, t) {
        (function(t) {
            "use strict";
            function n(e) {
                var t = void 0 === e ? "undefined" : s(e);
                return !!e && ("object" == t || "function" == t)
            }
            function i(e) {
                return "symbol" == (void 0 === e ? "undefined" : s(e)) || function(e) {
                    return !!e && "object" == (void 0 === e ? "undefined" : s(e))
                }(e) && v.call(e) == l
            }
            function r(e) {
                if ("number" == typeof e)
                    return e;
                if (i(e))
                    return a;
                if (n(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = n(t) ? t + "" : t
                }
                if ("string" != typeof e)
                    return 0 === e ? e : +e;
                e = e.replace(c, "");
                var r = u.test(e);
                return r || p.test(e) ? f(e.slice(2), r ? 2 : 8) : d.test(e) ? a : +e
            }
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
              , o = "Expected a function"
              , a = NaN
              , l = "[object Symbol]"
              , c = /^\s+|\s+$/g
              , d = /^[-+]0x[0-9a-f]+$/i
              , u = /^0b[01]+$/i
              , p = /^0o[0-7]+$/i
              , f = parseInt
              , h = "object" == (void 0 === t ? "undefined" : s(t)) && t && t.Object === Object && t
              , m = "object" == ("undefined" == typeof self ? "undefined" : s(self)) && self && self.Object === Object && self
              , g = h || m || Function("return this")()
              , v = Object.prototype.toString
              , b = Math.max
              , y = Math.min
              , w = function() {
                return g.Date.now()
            };
            e.exports = function(e, t, i) {
                function s(t) {
                    var n = p
                      , i = f;
                    return p = f = void 0,
                    x = t,
                    m = e.apply(i, n)
                }
                function a(e) {
                    return x = e,
                    g = setTimeout(c, t),
                    E ? s(e) : m
                }
                function l(e) {
                    var n = e - v;
                    return void 0 === v || n >= t || n < 0 || _ && e - x >= h
                }
                function c() {
                    var e = w();
                    return l(e) ? d(e) : void (g = setTimeout(c, function(e) {
                        var n = t - (e - v);
                        return _ ? y(n, h - (e - x)) : n
                    }(e)))
                }
                function d(e) {
                    return g = void 0,
                    S && p ? s(e) : (p = f = void 0,
                    m)
                }
                function u() {
                    var e = w()
                      , n = l(e);
                    if (p = arguments,
                    f = this,
                    v = e,
                    n) {
                        if (void 0 === g)
                            return a(v);
                        if (_)
                            return g = setTimeout(c, t),
                            s(v)
                    }
                    return void 0 === g && (g = setTimeout(c, t)),
                    m
                }
                var p, f, h, m, g, v, x = 0, E = !1, _ = !1, S = !0;
                if ("function" != typeof e)
                    throw new TypeError(o);
                return t = r(t) || 0,
                n(i) && (E = !!i.leading,
                h = (_ = "maxWait"in i) ? b(r(i.maxWait) || 0, t) : h,
                S = "trailing"in i ? !!i.trailing : S),
                u.cancel = function() {
                    void 0 !== g && clearTimeout(g),
                    x = 0,
                    p = v = f = g = void 0
                }
                ,
                u.flush = function() {
                    return void 0 === g ? m : d(w())
                }
                ,
                u
            }
        }
        ).call(t, function() {
            return this
        }())
    }
    , function(e, t) {
        "use strict";
        function n() {
            return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        }
        function i(e) {
            e && e.forEach((function(e) {
                var t = Array.prototype.slice.call(e.addedNodes)
                  , n = Array.prototype.slice.call(e.removedNodes);
                if (function e(t) {
                    var n = void 0
                      , i = void 0;
                    for (n = 0; n < t.length; n += 1) {
                        if ((i = t[n]).dataset && i.dataset.aos)
                            return !0;
                        if (i.children && e(i.children))
                            return !0
                    }
                    return !1
                }(t.concat(n)))
                    return r()
            }
            ))
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function() {};
        t.default = {
            isSupported: function() {
                return !!n()
            },
            ready: function(e, t) {
                var s = window.document
                  , o = new (n())(i);
                r = t,
                o.observe(s.documentElement, {
                    childList: !0,
                    subtree: !0,
                    removedNodes: !0
                })
            }
        }
    }
    , function(e, t) {
        "use strict";
        function n() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                    "value"in i && (i.writable = !0),
                    Object.defineProperty(e, i.key, i)
                }
            }
            return function(t, n, i) {
                return n && e(t.prototype, n),
                i && e(t, i),
                t
            }
        }()
          , r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
          , s = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
          , o = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
          , a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
          , l = function() {
            function e() {
                !function(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, e)
            }
            return i(e, [{
                key: "phone",
                value: function() {
                    var e = n();
                    return !(!r.test(e) && !s.test(e.substr(0, 4)))
                }
            }, {
                key: "mobile",
                value: function() {
                    var e = n();
                    return !(!o.test(e) && !a.test(e.substr(0, 4)))
                }
            }, {
                key: "tablet",
                value: function() {
                    return this.mobile() && !this.phone()
                }
            }]),
            e
        }();
        t.default = new l
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e, t) {
            var n = window.pageYOffset
              , i = window.innerHeight;
            e.forEach((function(e, r) {
                !function(e, t, n) {
                    var i = e.node.getAttribute("data-aos-once");
                    t > e.position ? e.node.classList.add("aos-animate") : void 0 !== i && ("false" === i || !n && "true" !== i) && e.node.classList.remove("aos-animate")
                }(e, i + n, t)
            }
            ))
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(12));
        t.default = function(e, t) {
            return e.forEach((function(e, n) {
                e.node.classList.add("aos-init"),
                e.position = (0,
                i.default)(e.node, t.offset)
            }
            )),
            e
        }
    }
    , function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n(13));
        t.default = function(e, t) {
            var n = 0
              , r = 0
              , s = window.innerHeight
              , o = {
                offset: e.getAttribute("data-aos-offset"),
                anchor: e.getAttribute("data-aos-anchor"),
                anchorPlacement: e.getAttribute("data-aos-anchor-placement")
            };
            switch (o.offset && !isNaN(o.offset) && (r = parseInt(o.offset)),
            o.anchor && document.querySelectorAll(o.anchor) && (e = document.querySelectorAll(o.anchor)[0]),
            n = (0,
            i.default)(e).top,
            o.anchorPlacement) {
            case "top-bottom":
                break;
            case "center-bottom":
                n += e.offsetHeight / 2;
                break;
            case "bottom-bottom":
                n += e.offsetHeight;
                break;
            case "top-center":
                n += s / 2;
                break;
            case "bottom-center":
                n += s / 2 + e.offsetHeight;
                break;
            case "center-center":
                n += s / 2 + e.offsetHeight / 2;
                break;
            case "top-top":
                n += s;
                break;
            case "bottom-top":
                n += e.offsetHeight + s;
                break;
            case "center-top":
                n += e.offsetHeight / 2 + s
            }
            return o.anchorPlacement || o.offset || isNaN(t) || (r = t),
            n + r
        }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop); )
                t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0),
                n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0),
                e = e.offsetParent;
            return {
                top: n,
                left: t
            }
        }
    }
    , function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function(e) {
            return e = e || document.querySelectorAll("[data-aos]"),
            Array.prototype.map.call(e, (function(e) {
                return {
                    node: e
                }
            }
            ))
        }
    }
    ])
}
));
/*!
  * NioApp v1.0.0 (https://softnio.com/)
  * Developed by Softnio Team.
  * Copyright by Softnio.
  */
var NioApp = function(e, t) {
    "use strict";
    var n = {
        AppInfo: {
            name: "NioApp",
            version: "1.0.0",
            author: "Softnio"
        },
        Package: {
            name: "NioLand",
            version: "1.0"
        }
    };
    return n.docReady = function(e) {
        document.addEventListener("DOMContentLoaded", e, !1)
    }
    ,
    n.winLoad = function(e) {
        window.addEventListener("load", e, !1)
    }
    ,
    n.onResize = function(e, t) {
        (t = void 0 === t ? window : t).addEventListener("resize", e)
    }
    ,
    n
}(window, document);
NioApp = function(e) {
    "use strict";
    return e.BS = {},
    e.Addons = {},
    e.Custom = {},
    e.Toggle = {},
    e.body = document.querySelector("body"),
    e.Win = {
        height: window.innerHeight,
        width: window.innerWidth
    },
    e.Break = {
        mb: 420,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
        any: 1 / 0
    },
    e.State = {
        isRTL: !(!e.body.classList.contains("has-rtl") && "rtl" !== e.body.getAttribute("dir")),
        isTouch: "ontouchstart"in document.documentElement,
        isMobile: !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i),
        asMobile: e.Win.width < e.Break.md
    },
    e.StateUpdate = function() {
        e.Win = {
            height: window.innerHeight,
            width: window.innerWidth
        },
        e.State.asMobile = e.Win.width < e.Break.md
    }
    ,
    e.SlideUp = function(e, t=500) {
        e.style.transitionProperty = "height, margin, padding",
        e.style.transitionDuration = t + "ms",
        e.style.boxSizing = "border-box",
        e.style.height = e.offsetHeight + "px",
        e.offsetHeight,
        e.style.overflow = "hidden",
        e.style.height = 0,
        e.style.paddingTop = 0,
        e.style.paddingBottom = 0,
        e.style.marginTop = 0,
        e.style.marginBottom = 0,
        window.setTimeout( () => {
            e.style.display = "none",
            e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property")
        }
        , t)
    }
    ,
    e.SlideDown = function(e, t=500) {
        e.style.removeProperty("display");
        let n = window.getComputedStyle(e).display;
        "none" === n && (n = "block"),
        e.style.display = n;
        let i = e.offsetHeight;
        e.style.overflow = "hidden",
        e.style.height = 0,
        e.style.paddingTop = 0,
        e.style.paddingBottom = 0,
        e.style.marginTop = 0,
        e.style.marginBottom = 0,
        e.offsetHeight,
        e.style.boxSizing = "border-box",
        e.style.transitionProperty = "height, margin, padding",
        e.style.transitionDuration = t + "ms",
        e.style.height = i + "px",
        e.style.removeProperty("padding-top"),
        e.style.removeProperty("padding-bottom"),
        e.style.removeProperty("margin-top"),
        e.style.removeProperty("margin-bottom"),
        window.setTimeout( () => {
            e.style.removeProperty("height"),
            e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property")
        }
        , t)
    }
    ,
    e.SlideToggle = function(t, n=500) {
        return "none" === window.getComputedStyle(t).display ? e.SlideDown(t, n) : e.SlideUp(t, n)
    }
    ,
    e.extendObject = function(e, t) {
        return Object.keys(t).forEach((function(n) {
            e[n] = t[n]
        }
        )),
        e
    }
    ,
    e.onResize(e.StateUpdate),
    e
}(NioApp);
