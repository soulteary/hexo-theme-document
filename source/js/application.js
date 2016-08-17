/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */
/* Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
true, function (t) {
        t.prototype.substitute || (t.prototype.substitute = function (e, i) {
            return t(this).replace(i || /\\?\{([^{}]+)\}/g, function (t, i) {
                return "\\" == t.charAt(0) ? t.slice(1) : null !== e[i] ? e[i] : ""
            })
        })
    }(String), function (t) {
    "use strict";
    var e = function (t, e) {
        this.x = t || 0, this.y = e || 0
    };
    e.prototype = {
        clone: function () {
            return new e(this.x, this.y)
        }, add: function (t) {
            return this.x += t.x, this.y += t.y, this
        }, sub: function (t) {
            return this.x -= t.x, this.y -= t.y, this
        }, subVal: function (t) {
            return this.x -= t, this.y -= t, this
        }, mult: function (t) {
            return this.x *= t, this.y *= t, this
        }, div: function (t) {
            return 0 === t ? this : (this.x /= t, this.y /= t, this)
        }, mag: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }, limit: function (t) {
            return this.mag() > t && (this.normalize(), this.mult(t)), this
        }, normalize: function () {
            var t = this.mag();
            return 0 === t ? this : (this.div(t), this)
        }, heading: function () {
            return Math.atan2(this.y, this.x)
        }, set: function (t) {
            return this.x = t.x, this.y = t.y, this
        }
    }, e.add = function (t, e) {
        return t.clone().add(e.clone())
    }, e.sub = function (t, e) {
        return t.clone().sub(e.clone())
    }, e.mult = function (t, e) {
        return t.clone().mult(e)
    }, e.div = function (t, e) {
        return t.clone().div(e)
    }, e.random2D = function () {
        var t = Math.random(0, 1) * Math.PI * 2;
        return new e(Math.cos(t), Math.sin(t))
    }, e.coerce = function (t) {
        return new e(t.x, t.y)
    }, t.Vector = e
}(this), Function.prototype.bind || (Function.prototype.bind = function (t) {
    if ("function" != typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var e = Array.prototype.slice.call(arguments, 1), i = this, n = function () {
    }, o = function () {
        return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
    };
    return n.prototype = this.prototype, o.prototype = new n, o
}), function (t, e, i) {
    "undefined" != typeof module ? module.exports = i() : "undefined" != typeof define && "object" == typeof define.amd ? define(i) : e[t] = i()
}("Base", this, function () {
    var t = function () {
    };
    return t.extend = function (e, i) {
        var n = t.prototype.extend;
        t._prototyping = !0;
        var o = new this;
        n.call(o, e), o.base = function () {
        }, delete t._prototyping;
        var s = o.constructor, r = o.constructor = function () {
            if (!t._prototyping)if (this._constructing || this.constructor === r)this._constructing = !0, s.apply(this, arguments), delete this._constructing; else if (null !== arguments[0])return (arguments[0].extend || n).call(arguments[0], o)
        };
        return r.ancestor = this, r.extend = this.extend, r.forEach = this.forEach, r.implement = this.implement, r.prototype = o, r.toString = this.toString, r.valueOf = function (t) {
            return "object" === t ? r : s.valueOf()
        }, n.call(r, i), "function" == typeof r.init && r.init(), r
    }, t.prototype = {
        extend: function (e, i) {
            if (arguments.length > 1) {
                var n = this[e];
                if (n && "function" == typeof i && (!n.valueOf || n.valueOf() !== i.valueOf()) && /\bbase\b/.test(i)) {
                    var o = i.valueOf();
                    i = function () {
                        var e = this.base || t.prototype.base;
                        this.base = n;
                        var i = o.apply(this, arguments);
                        return this.base = e, i
                    }, i.valueOf = function (t) {
                        return "object" === t ? i : o
                    }, i.toString = t.toString
                }
                this[e] = i
            } else if (e) {
                var s = t.prototype.extend;
                t._prototyping || "function" == typeof this || (s = this.extend || s);
                for (var r = {toSource: null}, a = ["constructor", "toString", "valueOf"], l = t._prototyping ? 0 : 1; l < a.length; l++) {
                    var p = a[l];
                    e[p] !== r[p] && s.call(this, p, e[p])
                }
                for (var c in e)r[c] || s.call(this, c, e[c])
            }
            return this
        }
    }, t = t.extend({
        constructor: function () {
            this.extend(arguments[0])
        }
    }, {
        ancestor: Object, version: "1.1", forEach: function (t, e, i) {
            for (var n in t)void 0 === this.prototype[n] && e.call(i, t[n], n, t)
        }, implement: function () {
            for (var t = 0; t < arguments.length; t++)"function" == typeof arguments[t] ? arguments[t](this.prototype) : this.prototype.extend(arguments[t]);
            return this
        }, toString: function () {
            return String(this.valueOf())
        }
    })
}), function () {
    var t = function (t) {
        this.engine = t, this._chain = [], this._updateTimer = this._updateTimer.bind(this), this._cycle = this._cycle.bind(this)
    };
    t.prototype._running = !1, t.prototype._updateTimer = function (t) {
        this._timer += t, this._timer >= this._timerMax && (this.resetTimer(), this._cycle())
    }, t.prototype.resetTimer = function () {
        return this.engine.updateChainTimer = void 0, this._timer = 0, this._timerMax = 0, this
    }, t.prototype.start = function () {
        return this._running || !this._chain.length ? this : (this._running = !0, this._cycle())
    }, t.prototype.reset = function () {
        return this._running ? (this.resetTimer(), this._timer = 0, this._running = !1, this) : this
    }, t.prototype._cycle = function () {
        var t;
        return this._chain.length ? (t = this._chain.shift(), "function" === t.type ? (t.func.apply(t.scope, t.args), t = null, this._cycle()) : ("wait" === t.type && (this.resetTimer(), this._timerMax = t.time / 1e3, this.engine.updateChainTimer = this._updateTimer, t = null), this)) : this.reset()
    }, t.prototype.then = t.prototype.exec = function (t, e, i) {
        return this._chain.push({type: "function", func: t, scope: e || window, args: i || []}), this.start()
    }, t.prototype.wait = function (t) {
        return this._chain.push({type: "wait", time: t}), this.start()
    }, window.Chainable = t
}(), function () {
    var t, e, i = this, n = i.console || null, o = function () {
    }, s = ["log", "error", "warn", "info", "count", "debug", "profileEnd", "trace", "dir", "dirxml", "assert", "time", "profile", "timeEnd", "group", "groupEnd"], r = {
        enable: function (t) {
            i.dbg = n ? n : r
        }, disable: function () {
            i.dbg = r
        }
    };
    for (e = 0; e < s.length; e++)t = s[e], r[t] = o, n && !n[t] && (n[t] = o);
    n && (n.disable = r.disable, n.enable = r.enable), r.enable()
}.call(this), function () {
    var t = {
        start: function () {
            var t = this.hasClass(document.body, "page-sub");
            t && this.addEventListeners()
        }, hasClass: function (t, e) {
            return new RegExp(" " + e + " ").test(" " + t.className + " ")
        }, addEventListeners: function () {
            var t = this;
            window.addEventListener("resize", t.resizeImage, !1), this.resizeImage()
        }, resizeImage: function () {
            var t = document.getElementById("header"), e = document.getElementById("footer"), i = document.getElementById("main-content"), n = window.innerHeight, o = document.body.clientHeight, s = t.clientHeight, r = e.clientHeight, a = s + r + 830;
            if (n > a && n > o) {
                var l = n - (s + r) + "px";
                i.style.height = l
            }
        }
    };
    t.start()
}();
var Logo = {
    data: {width: 587, height: 587, ar: 1},
    points: [{id: "point-0", x: .5809199318568995, y: .7478705281090289}, {
        id: "point-1",
        x: .8160136286201022,
        y: .616695059625213
    }, {id: "point-2", x: .6081771720613288, y: .8943781942078366}, {
        id: "point-4",
        x: .9761499148211243,
        y: .6550255536626917
    }, {id: "point-5", x: .848381601362862, y: .8603066439522997}, {
        id: "point-12",
        x: .6354344122657581,
        y: .9829642248722317
    }, {id: "point-16", x: .5536626916524702, y: .9982964224872233}, {
        id: "point-20",
        x: .45451448040885867,
        y: .9463373083475298
    }, {id: "point-24", x: .48126064735945484, y: .9982964224872233}, {
        id: "point-28",
        x: .403747870528109,
        y: .994037478705281
    }, {id: "point-32", x: .18143100511073254, y: .8858603066439524}, {
        id: "point-36",
        x: .22998296422487224,
        y: .8057921635434411
    }, {id: "point-40", x: .3373083475298126, y: .7052810902896082}, {
        id: "point-44",
        x: .5143100511073253,
        y: .6933560477001702
    }, {id: "point-56", x: .8918228279386712, y: .46337308347529815}, {
        id: "point-60",
        x: .9974446337308348,
        y: .5366269165247018
    }, {id: "point-64", x: .9574105621805792, y: .368824531516184}, {
        id: "point-68",
        x: .9761499148211243,
        y: .36201022146507666
    }, {id: "point-72", x: .6626916524701874, y: .43781942078364566}, {
        id: "point-84",
        x: .4335604770017036,
        y: .5698466780238501
    }, {id: "point-92", x: .11158432708688246, y: .8197614991482112}, {
        id: "point-96",
        x: .09540034071550256,
        y: .6669505962521295
    }, {id: "point-104", x: .05536626916524703, y: .7257240204429302}, {
        id: "point-108",
        x: .03492333901192504,
        y: .6831345826235093
    }, {id: "point-112", x: .15417376490630325, y: .4892674616695059}, {
        id: "point-116",
        x: .22487223168654175,
        y: .4599659284497445
    }, {id: "point-124", x: .2785349233390119, y: .35945485519591147}, {
        id: "point-128",
        x: .48722316865417375,
        y: .35945485519591147
    }, {id: "point-136", x: .5809199318568995, y: .2925042589437819}, {
        id: "point-140",
        x: .889267461669506,
        y: .27649063032367976
    }, {id: "point-152", x: .944633730834753, y: .2737649063032368}, {
        id: "point-160",
        x: .8802385008517888,
        y: .18177172061328795
    }, {id: "point-168", x: .5809199318568995, y: .19471890971039182}, {
        id: "point-176",
        x: .7989778534923339,
        y: .10391822827938672
    }, {id: "point-180", x: .6218057921635435, y: .018739352640545145}, {
        id: "point-184",
        x: .5252129471890972,
        y: .0005110732538330494
    }, {id: "point-188", x: .3889267461669506, y: .09761499148211243}, {
        id: "point-192",
        x: .38126064735945486,
        y: .018739352640545145
    }, {id: "point-196", x: .30153321976149916, y: .04258943781942079}, {
        id: "point-200",
        x: .2969335604770017,
        y: .09761499148211243
    }, {id: "point-216", x: .049403747870528106, y: .3083475298126065}, {
        id: "point-228",
        x: .002214650766609881,
        y: .47155025553662694
    }, {id: "point-232", x: .0005110732538330494, y: .5289608177172062}, {
        id: "point-244",
        x: .17325383304940373,
        y: .12180579216354344
    }],
    polygons: [{
        id: "poly-0",
        color: {h: 264.688995215311, s: 100, l: 59.01960784313726, a: 1},
        points: ["point-0", "point-1", "point-2"]
    }, {
        id: "poly-1",
        color: {h: 268.3076923076923, s: 100, l: 61.76470588235294, a: 1},
        points: ["point-4", "point-5", "point-1"]
    }, {
        id: "poly-2",
        color: {h: 267.1641791044776, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-5", "point-2", "point-1"]
    }, {
        id: "poly-3",
        color: {h: 268.3076923076923, s: 100, l: 61.76470588235294, a: 1},
        points: ["point-12", "point-2", "point-5"]
    }, {
        id: "poly-4",
        color: {h: 267.1641791044776, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-16", "point-12", "point-2"]
    }, {
        id: "poly-5",
        color: {h: 264.9, s: 92.59259259259261, l: 57.647058823529406, a: 1},
        points: ["point-20", "point-2", "point-16"]
    }, {
        id: "poly-6",
        color: {h: 264.9, s: 92.59259259259261, l: 57.647058823529406, a: 1},
        points: ["point-24", "point-20", "point-16"]
    }, {
        id: "poly-7",
        color: {h: 264.97461928934007, s: 85.28138528138528, l: 54.70588235294118, a: 1},
        points: ["point-28", "point-20", "point-24"]
    }, {
        id: "poly-8",
        color: {h: 265.4347826086956, s: 80, l: 45.09803921568628, a: 1},
        points: ["point-32", "point-20", "point-28"]
    }, {
        id: "poly-9",
        color: {h: 265.4347826086956, s: 80, l: 45.09803921568628, a: 1},
        points: ["point-36", "point-32", "point-20"]
    }, {
        id: "poly-10",
        color: {h: 265.4347826086956, s: 80, l: 45.09803921568628, a: 1},
        points: ["point-40", "point-36", "point-20"]
    }, {
        id: "poly-11",
        color: {h: 265.48387096774195, s: 76.22950819672131, l: 47.84313725490196, a: 1},
        points: ["point-44", "point-20", "point-40"]
    }, {
        id: "poly-12",
        color: {h: 264.61538461538464, s: 79.59183673469387, l: 51.9607843137255, a: 1},
        points: ["point-0", "point-44", "point-20"]
    }, {
        id: "poly-13",
        color: {h: 264.9, s: 92.59259259259261, l: 57.647058823529406, a: 1},
        points: ["point-0", "point-20", "point-2"]
    }, {
        id: "poly-14",
        color: {h: 264.61538461538464, s: 79.59183673469387, l: 51.9607843137255, a: 1},
        points: ["point-56", "point-1", "point-4"]
    }, {
        id: "poly-15",
        color: {h: 264.61538461538464, s: 79.59183673469387, l: 51.9607843137255, a: 1},
        points: ["point-60", "point-4", "point-56"]
    }, {
        id: "poly-16",
        color: {h: 263.64705882352945, s: 86.73469387755101, l: 38.43137254901961, a: 1},
        points: ["point-64", "point-56", "point-60"]
    }, {
        id: "poly-17",
        color: {h: 264.9056603773585, s: 90.85714285714286, l: 34.31372549019608, a: 1},
        points: ["point-68", "point-64", "point-60"]
    }, {
        id: "poly-18",
        color: {h: 263.64705882352945, s: 86.73469387755101, l: 38.43137254901961, a: 1},
        points: ["point-72", "point-56", "point-1"]
    }, {
        id: "poly-19",
        color: {h: 265.4347826086956, s: 80, l: 45.09803921568628, a: 1},
        points: ["point-0", "point-72", "point-1"]
    }, {
        id: "poly-20",
        color: {h: 264.20454545454544, s: 79.27927927927928, l: 43.529411764705884, a: 1},
        points: ["point-72", "point-0", "point-44"]
    }, {
        id: "poly-21",
        color: {h: 264.2307692307692, s: 95.12195121951221, l: 32.15686274509804, a: 1},
        points: ["point-84", "point-44", "point-72"]
    }, {
        id: "poly-22",
        color: {h: 263.64705882352945, s: 86.73469387755101, l: 38.43137254901961, a: 1},
        points: ["point-40", "point-84", "point-44"]
    }, {
        id: "poly-23",
        color: {h: 264.9056603773585, s: 90.85714285714286, l: 34.31372549019608, a: 1},
        points: ["point-92", "point-32", "point-36"]
    }, {
        id: "poly-24",
        color: {h: 264.2307692307692, s: 95.12195121951221, l: 32.15686274509804, a: 1},
        points: ["point-96", "point-92", "point-36"]
    }, {
        id: "poly-25",
        color: {h: 264.9056603773585, s: 90.85714285714286, l: 34.31372549019608, a: 1},
        points: ["point-40", "point-96", "point-36"]
    }, {
        id: "poly-26",
        color: {h: 264.2307692307692, s: 95.12195121951221, l: 32.15686274509804, a: 1},
        points: ["point-104", "point-92", "point-96"]
    }, {
        id: "poly-27",
        color: {h: 261.6, s: 100, l: 14.705882352941178, a: 1},
        points: ["point-108", "point-104", "point-96"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-28",
        color: {h: 261.6, s: 100, l: 14.705882352941178, a: 1},
        points: ["point-112", "point-40", "point-96"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-29",
        color: {h: 257.910447761194, s: 100, l: 13.137254901960786, a: 1},
        points: ["point-116", "point-112", "point-40"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-30",
        color: {h: 262.8571428571429, s: 100, l: 16.470588235294116, a: 1},
        points: ["point-84", "point-40", "point-116"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-31",
        color: {h: 252.00000000000003, s: 100, l: 9.803921568627452, a: 1},
        points: ["point-124", "point-84", "point-116"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-32",
        color: {h: 252.00000000000003, s: 100, l: 9.803921568627452, a: 1},
        points: ["point-128", "point-84", "point-124"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-33",
        color: {h: 257.910447761194, s: 100, l: 13.137254901960786, a: 1},
        points: ["point-72", "point-128", "point-84"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-34",
        color: {h: 252.00000000000003, s: 100, l: 9.803921568627452, a: 1},
        points: ["point-136", "point-128", "point-72"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-35",
        color: {h: 253.44827586206898, s: 100, l: 11.372549019607844, a: 1},
        points: ["point-140", "point-136", "point-72"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-36",
        color: {h: 261.6, s: 100, l: 14.705882352941178, a: 1},
        points: ["point-140", "point-56", "point-72"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-37",
        color: {h: 262.8571428571429, s: 100, l: 16.470588235294116, a: 1},
        points: ["point-64", "point-56", "point-140"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-38",
        color: {h: 259.4366197183098, s: 100, l: 13.92156862745098, a: 1},
        points: ["point-152", "point-140", "point-64"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-39",
        color: {h: 259.4366197183098, s: 100, l: 13.92156862745098, a: 1},
        points: ["point-68", "point-64", "point-152"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-40",
        color: {h: 253.44827586206898, s: 100, l: 11.372549019607844, a: 1},
        points: ["point-160", "point-140", "point-152"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-41",
        color: {h: 245.58139534883722, s: 100, l: 8.431372549019608, a: 1},
        points: ["point-136", "point-160", "point-140"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-42",
        color: {h: 246.15384615384613, s: 100, l: 7.647058823529412, a: 1},
        points: ["point-168", "point-128", "point-136"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-43",
        color: {h: 245.58139534883722, s: 100, l: 8.431372549019608, a: 1},
        points: ["point-160", "point-168", "point-136"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-44",
        color: {h: 246.15384615384613, s: 100, l: 7.647058823529412, a: 1},
        points: ["point-176", "point-160", "point-168"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-45",
        color: {h: 246.15384615384613, s: 100, l: 7.647058823529412, a: 1},
        points: ["point-180", "point-168", "point-176"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-46",
        color: {h: 240, s: 100, l: 4.509803921568627, a: 1},
        points: ["point-184", "point-168", "point-180"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-47",
        color: {h: 240, s: 100, l: 4.509803921568627, a: 1},
        points: ["point-188", "point-168", "point-184"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-48",
        color: {h: 240, s: 100, l: 4.509803921568627, a: 1},
        points: ["point-192", "point-188", "point-184"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-49",
        color: {h: 240, s: 100, l: 4.509803921568627, a: 1},
        points: ["point-196", "point-188", "point-192"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-50",
        color: {h: 240, s: 100, l: .5882352941176471, a: 1},
        points: ["point-200", "point-196", "point-188"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-51",
        color: {h: 240, s: 100, l: 3.3333333333333335, a: 1},
        points: ["point-188", "point-124", "point-200"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-52",
        color: {h: 240, s: 100, l: 5.294117647058823, a: 1},
        points: ["point-188", "point-124", "point-128"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-53",
        color: {h: 245.1428571428571, s: 100, l: 6.862745098039216, a: 1},
        points: ["point-188", "point-128", "point-168"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-54",
        color: {h: 240, s: 100, l: 3.3333333333333335, a: 1},
        points: ["point-216", "point-200", "point-124"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-55",
        color: {h: 240, s: 100, l: 5.294117647058823, a: 1},
        points: ["point-216", "point-116", "point-124"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-56",
        color: {h: 245.1428571428571, s: 100, l: 6.862745098039216, a: 1},
        points: ["point-112", "point-216", "point-116"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-57",
        color: {h: 240, s: 100, l: 5.294117647058823, a: 1},
        points: ["point-228", "point-216", "point-112"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-58",
        color: {h: 249.13043478260872, s: 100, l: 9.019607843137255, a: 1},
        points: ["point-232", "point-112", "point-96"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-59",
        color: {h: 253.44827586206898, s: 100, l: 11.372549019607844, a: 1},
        points: ["point-108", "point-96", "point-232"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-60",
        color: {h: 240, s: 100, l: 5.294117647058823, a: 1},
        points: ["point-228", "point-112", "point-232"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-61",
        color: {h: 240, s: 100, l: .5882352941176471, a: 1},
        points: ["point-244", "point-216", "point-200"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }, {
        id: "poly-62",
        color: {h: 240, s: 100, l: .5882352941176471, a: 1},
        points: ["point-196", "point-200", "point-244"],
        stroke: {h: 262.24719101123594, s: 60.544217687074834, l: 28.82352941176471, a: .4}
    }]
}, Grid = {
    data: {width: 1572, height: 979, ar: .6227735368956743},
    points: [{id: "point-0", x: .01743002544529262, y: .045658835546476005}, {
        id: "point-1",
        x: -.0001272264631043257,
        y: .7701736465781408
    }, {id: "point-2", x: .012468193384223917, y: .32665985699693567}, {
        id: "point-7",
        x: .04052162849872774,
        y: .12277834525025537
    }, {id: "point-12", x: .13568702290076337, y: .030847803881511746}, {
        id: "point-17",
        x: .14465648854961832,
        y: .16772216547497446
    }, {id: "point-22", x: .20184478371501274, y: .05536261491317671}, {
        id: "point-27",
        x: .37099236641221384,
        y: .02696629213483146
    }, {id: "point-32", x: .49357506361323156, y: .00020429009193054137}, {
        id: "point-37",
        x: .1993002544529262,
        y: .16281920326864147
    }, {id: "point-42", x: .30337150127226464, y: .05965270684371808}, {
        id: "point-52",
        x: .32461832061068707,
        y: .1689479060265577
    }, {id: "point-62", x: .4028625954198473, y: .12502553626149132}, {
        id: "point-72",
        x: .5604325699745547,
        y: .13003064351378957
    }, {id: "point-77", x: .5724554707379135, y: .01491317671092952}, {
        id: "point-82",
        x: .8836513994910941,
        y: .05372829417773237
    }, {id: "point-87", x: .9759541984732825, y: .061184882533197135}, {
        id: "point-92",
        x: .7122137404580152,
        y: .07405515832482125
    }, {id: "point-102", x: .6561704834605598, y: .218488253319714}, {
        id: "point-107",
        x: .7784351145038169,
        y: .1319713993871297
    }, {id: "point-112", x: .7912213740458014, y: .08672114402451482}, {
        id: "point-122",
        x: .8616412213740458,
        y: .12941777323799797
    }, {id: "point-132", x: .9780534351145039, y: .17242083758937693}, {
        id: "point-142",
        x: .9898854961832061,
        y: .30960163432073545
    }, {id: "point-152", x: .12888040712468193, y: .36149131767109294}, {
        id: "point-162",
        x: .21743002544529266,
        y: .39662921348314606
    }, {id: "point-167", x: .3361959287531807, y: .2868232890704801}, {
        id: "point-182",
        x: .37220101781170484,
        y: .3344228804902961
    }, {id: "point-187", x: .4620865139949109, y: .32533197139938713}, {
        id: "point-192",
        x: .5159033078880407,
        y: .24106230847803883
    }, {id: "point-202", x: .5856234096692112, y: .3547497446373851}, {
        id: "point-217",
        x: .7061704834605598,
        y: .30643513789581206
    }, {id: "point-227", x: .7717557251908397, y: .35556690500510724}, {
        id: "point-232",
        x: .8581424936386769,
        y: .2822267620020429
    }, {id: "point-252", x: .009287531806615776, y: .47477017364657814}, {
        id: "point-257",
        x: .10756997455470736,
        y: .4454545454545455
    }, {id: "point-267", x: .17767175572519084, y: .5234933605720122}, {
        id: "point-277",
        x: .2962468193384224,
        y: .5465781409601634
    }, {id: "point-292", x: .4138676844783716, y: .4349336057201226}, {
        id: "point-302",
        x: .5194020356234097,
        y: .5248212461695607
    }, {id: "point-307", x: .5548982188295165, y: .49836567926455566}, {
        id: "point-317",
        x: .6503816793893129,
        y: .5194075587334014
    }, {id: "point-327", x: .7473282442748093, y: .4626149131767109}, {
        id: "point-337",
        x: .8691475826972009,
        y: .49458631256384067
    }, {id: "point-352", x: .9832061068702289, y: .4917262512768131}, {
        id: "point-357",
        x: .9990458015267175,
        y: .7504596527068438
    }, {id: "point-362", x: .05012722646310432, y: .6356486210418795}, {
        id: "point-372",
        x: .14440203562340967,
        y: .6027579162410623
    }, {id: "point-382", x: .17550890585241732, y: .6821246169560776}, {
        id: "point-392",
        x: .3370229007633587,
        y: .6620020429009194
    }, {id: "point-397", x: .38403307888040716, y: .6074565883554648}, {
        id: "point-407",
        x: .49141221374045796,
        y: .609090909090909
    }, {id: "point-417", x: .6092239185750636, y: .6490296220633298}, {
        id: "point-432",
        x: .6994910941475826,
        y: .6377936670071501
    }, {id: "point-442", x: .8021628498727735, y: .6412665985699693}, {
        id: "point-452",
        x: .8450381679389314,
        y: .6878447395301328
    }, {id: "point-457", x: .9385496183206108, y: .5991828396322778}, {
        id: "point-472",
        x: .08269720101781171,
        y: .8129724208375894
    }, {id: "point-487", x: .19293893129770992, y: .7488253319713994}, {
        id: "point-497",
        x: .3399491094147582,
        y: .7432073544433095
    }, {id: "point-507", x: .4349872773536895, y: .8191011235955056}, {
        id: "point-517",
        x: .4825699745547074,
        y: .8216547497446374
    }, {id: "point-527", x: .6143129770992367, y: .8338100102145046}, {
        id: "point-532",
        x: .6626590330788804,
        y: .7674157303370785
    }, {id: "point-542", x: .80470737913486, y: .7797752808988764}, {
        id: "point-557",
        x: .858587786259542,
        y: .780388151174668
    }, {id: "point-571", x: .04058524173027989, y: .9923391215526047}, {
        id: "point-577",
        x: .10038167938931299,
        y: .9534218590398367
    }, {id: "point-587", x: .21615776081424937, y: .9832482124616956}, {
        id: "point-592",
        x: .31653944020356234,
        y: .8937691521961184
    }, {id: "point-602", x: .3648218829516539, y: .9393258426966292}, {
        id: "point-612",
        x: .4798346055979643,
        y: .9085801838610827
    }, {id: "point-627", x: .6159669211195928, y: .9221654749744637}, {
        id: "point-632",
        x: .7001272264631042,
        y: .9664964249233913
    }, {id: "point-647", x: .7608778625954199, y: .9989785495403473}, {
        id: "point-652",
        x: .8911577608142494,
        y: .9557711950970379
    }, {id: "point-667", x: .9989821882951655, y: .9853932584269665}],
    polygons: [{
        id: "poly-0",
        color: {h: 269.25373134328356, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-0", "point-1", "point-2"]
    }, {
        id: "poly-1",
        color: {h: 277.1428571428571, s: 100, l: 67.05882352941177, a: 1},
        points: ["point-0", "point-2", "point-7"]
    }, {
        id: "poly-2",
        color: {h: 277.1428571428571, s: 100, l: 67.05882352941177, a: 1},
        points: ["point-0", "point-7", "point-12"]
    }, {
        id: "poly-3",
        color: {h: 275.31428571428575, s: 100, l: 65.68627450980392, a: 1},
        points: ["point-12", "point-7", "point-17"]
    }, {
        id: "poly-4",
        color: {h: 276.26373626373623, s: 100, l: 64.31372549019608, a: 1},
        points: ["point-12", "point-17", "point-22"]
    }, {
        id: "poly-5",
        color: {h: 272.23404255319144, s: 100, l: 63.13725490196078, a: 1},
        points: ["point-12", "point-22", "point-27"]
    }, {
        id: "poly-6",
        color: {h: 268.2692307692307, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-12", "point-27", "point-32"]
    }, {
        id: "poly-7",
        color: {h: 274.46808510638294, s: 100, l: 63.13725490196078, a: 1},
        points: ["point-22", "point-17", "point-37"]
    }, {
        id: "poly-8",
        color: {h: 272.23404255319144, s: 100, l: 63.13725490196078, a: 1},
        points: ["point-22", "point-37", "point-42"]
    }, {
        id: "poly-9",
        color: {h: 269.25373134328356, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-22", "point-42", "point-27"]
    }, {
        id: "poly-10",
        color: {h: 269.25373134328356, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-42", "point-37", "point-52"]
    }, {
        id: "poly-11",
        color: {h: 268.2692307692307, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-42", "point-52", "point-27"]
    }, {
        id: "poly-12",
        color: {h: 265.96153846153845, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-27", "point-52", "point-62"]
    }, {
        id: "poly-13",
        color: {h: 265.88235294117646, s: 86.4406779661017, l: 53.72549019607843, a: 1},
        points: ["point-27", "point-62", "point-32"]
    }, {
        id: "poly-14",
        color: {h: 265.48387096774195, s: 76.22950819672131, l: 47.84313725490196, a: 1},
        points: ["point-32", "point-62", "point-72"]
    }, {
        id: "poly-15",
        color: {h: 265.1933701657459, s: 83.41013824884793, l: 42.549019607843135, a: 1},
        points: ["point-32", "point-72", "point-77"]
    }, {
        id: "poly-16",
        color: {h: 264.45859872611464, s: 96.31901840490798, l: 31.960784313725487, a: 1},
        points: ["point-32", "point-77", "point-82"]
    }, {
        id: "poly-17",
        color: {h: 261.69230769230774, s: 100, l: 25.49019607843137, a: 1},
        points: ["point-32", "point-82", "point-87"]
    }, {
        id: "poly-18",
        color: {h: 263.3532934131737, s: 91.2568306010929, l: 35.88235294117647, a: 1},
        points: ["point-77", "point-72", "point-92"]
    }, {
        id: "poly-19",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-77", "point-92", "point-82"]
    }, {
        id: "poly-20",
        color: {h: 264.45859872611464, s: 96.31901840490798, l: 31.960784313725487, a: 1},
        points: ["point-92", "point-72", "point-102"]
    }, {
        id: "poly-21",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-92", "point-102", "point-107"]
    }, {
        id: "poly-22",
        color: {h: 261.69230769230774, s: 100, l: 25.49019607843137, a: 1},
        points: ["point-92", "point-107", "point-112"]
    }, {
        id: "poly-23",
        color: {h: 260, s: 100, l: 24.11764705882353, a: 1},
        points: ["point-92", "point-112", "point-82"]
    }, {
        id: "poly-24",
        color: {h: 260, s: 100, l: 24.11764705882353, a: 1},
        points: ["point-112", "point-107", "point-122"]
    }, {
        id: "poly-25",
        color: {h: 260, s: 100, l: 24.11764705882353, a: 1},
        points: ["point-112", "point-122", "point-82"]
    }, {
        id: "poly-26",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-82", "point-122", "point-132"]
    }, {
        id: "poly-27",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-82", "point-132", "point-87"]
    }, {
        id: "poly-28",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-87", "point-132", "point-142"]
    }, {
        id: "poly-29",
        color: {h: 275.31428571428575, s: 100, l: 65.68627450980392, a: 1},
        points: ["point-7", "point-2", "point-17"]
    }, {
        id: "poly-30",
        color: {h: 274.46808510638294, s: 100, l: 63.13725490196078, a: 1},
        points: ["point-17", "point-2", "point-152"]
    }, {
        id: "poly-31",
        color: {h: 272.23404255319144, s: 100, l: 63.13725490196078, a: 1},
        points: ["point-17", "point-152", "point-37"]
    }, {
        id: "poly-32",
        color: {h: 269.25373134328356, s: 100, l: 60.588235294117645, a: 1},
        points: ["point-37", "point-152", "point-162"]
    }, {
        id: "poly-33",
        color: {h: 268.2692307692307, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-37", "point-162", "point-167"]
    }, {
        id: "poly-34",
        color: {h: 268.2692307692307, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-37", "point-167", "point-52"]
    }, {
        id: "poly-35",
        color: {h: 265.92233009708735, s: 92.7927927927928, l: 56.470588235294116, a: 1},
        points: ["point-52", "point-167", "point-62"]
    }, {
        id: "poly-36",
        color: {h: 265.88235294117646, s: 86.4406779661017, l: 53.72549019607843, a: 1},
        points: ["point-62", "point-167", "point-182"]
    }, {
        id: "poly-37",
        color: {h: 265.48387096774195, s: 76.22950819672131, l: 47.84313725490196, a: 1},
        points: ["point-62", "point-182", "point-187"]
    }, {
        id: "poly-38",
        color: {h: 265.24590163934425, s: 79.22077922077922, l: 45.294117647058826, a: 1},
        points: ["point-62", "point-187", "point-192"]
    }, {
        id: "poly-39",
        color: {h: 265.24590163934425, s: 79.22077922077922, l: 45.294117647058826, a: 1},
        points: ["point-62", "point-192", "point-72"]
    }, {
        id: "poly-40",
        color: {h: 263.3532934131737, s: 91.2568306010929, l: 35.88235294117647, a: 1},
        points: ["point-192", "point-187", "point-202"]
    }, {
        id: "poly-41",
        color: {h: 264.45859872611464, s: 96.31901840490798, l: 31.960784313725487, a: 1},
        points: ["point-192", "point-202", "point-102"]
    }, {
        id: "poly-42",
        color: {h: 263.3532934131737, s: 91.2568306010929, l: 35.88235294117647, a: 1},
        points: ["point-192", "point-102", "point-72"]
    }, {
        id: "poly-43",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-102", "point-202", "point-217"]
    }, {
        id: "poly-44",
        color: {h: 261.69230769230774, s: 100, l: 25.49019607843137, a: 1},
        points: ["point-102", "point-217", "point-107"]
    }, {
        id: "poly-45",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-107", "point-217", "point-227"]
    }, {
        id: "poly-46",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-107", "point-227", "point-232"]
    }, {
        id: "poly-47",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-107", "point-232", "point-122"]
    }, {
        id: "poly-48",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-122", "point-232", "point-132"]
    }, {
        id: "poly-49",
        color: {h: 255.31914893617022, s: 100, l: 18.43137254901961, a: 1},
        points: ["point-132", "point-232", "point-142"]
    }, {
        id: "poly-50",
        color: {h: 265.24590163934425, s: 79.22077922077922, l: 45.294117647058826, a: 1},
        points: ["point-2", "point-1", "point-252"]
    }, {
        id: "poly-51",
        color: {h: 265.96153846153845, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-2", "point-252", "point-257"]
    }, {
        id: "poly-52",
        color: {h: 268.2692307692307, s: 100, l: 59.21568627450981, a: 1},
        points: ["point-2", "point-257", "point-152"]
    }, {
        id: "poly-53",
        color: {h: 265.54455445544556, s: 80.8, l: 50.98039215686274, a: 1},
        points: ["point-152", "point-257", "point-267"]
    }, {
        id: "poly-54",
        color: {h: 265.54455445544556, s: 80.8, l: 50.98039215686274, a: 1},
        points: ["point-152", "point-267", "point-162"]
    }, {
        id: "poly-55",
        color: {h: 264.68571428571425, s: 91.62303664921467, l: 37.450980392156865, a: 1},
        points: ["point-162", "point-267", "point-277"]
    }, {
        id: "poly-56",
        color: {h: 265.24590163934425, s: 79.22077922077922, l: 45.294117647058826, a: 1},
        points: ["point-162", "point-277", "point-167"]
    }, {
        id: "poly-57",
        color: {h: 265.1933701657459, s: 83.41013824884793, l: 42.549019607843135, a: 1},
        points: ["point-167", "point-277", "point-182"]
    }, {
        id: "poly-58",
        color: {h: 263.3532934131737, s: 91.2568306010929, l: 35.88235294117647, a: 1},
        points: ["point-182", "point-277", "point-292"]
    }, {
        id: "poly-59",
        color: {h: 264.68571428571425, s: 91.62303664921467, l: 37.450980392156865, a: 1},
        points: ["point-182", "point-292", "point-187"]
    }, {
        id: "poly-60",
        color: {h: 262.3448275862069, s: 100, l: 28.431372549019606, a: 1},
        points: ["point-187", "point-292", "point-302"]
    }, {
        id: "poly-61",
        color: {h: 260, s: 100, l: 24.11764705882353, a: 1},
        points: ["point-187", "point-302", "point-307"]
    }, {
        id: "poly-62",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-187", "point-307", "point-202"]
    }, {
        id: "poly-63",
        color: {h: 255.31914893617022, s: 100, l: 18.43137254901961, a: 1},
        points: ["point-202", "point-307", "point-317"]
    }, {
        id: "poly-64",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-202", "point-317", "point-217"]
    }, {
        id: "poly-65",
        color: {h: 249.75, s: 100, l: 15.686274509803921, a: 1},
        points: ["point-217", "point-317", "point-327"]
    }, {
        id: "poly-66",
        color: {h: 249.75, s: 100, l: 15.686274509803921, a: 1},
        points: ["point-217", "point-327", "point-227"]
    }, {
        id: "poly-67",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-227", "point-327", "point-337"]
    }, {
        id: "poly-68",
        color: {h: 246.57534246575347, s: 100, l: 14.313725490196077, a: 1},
        points: ["point-227", "point-337", "point-232"]
    }, {
        id: "poly-69",
        color: {h: 242.99999999999997, s: 100, l: 11.76470588235294, a: 1},
        points: ["point-232", "point-337", "point-142"]
    }, {
        id: "poly-70",
        color: {h: 240, s: 100, l: 8.03921568627451, a: 1},
        points: ["point-142", "point-337", "point-352"]
    }, {
        id: "poly-71",
        color: {h: 240, s: 100, l: 1.5686274509803921, a: 1},
        points: ["point-142", "point-352", "point-357"]
    }, {
        id: "poly-72",
        color: {h: 264.45859872611464, s: 96.31901840490798, l: 31.960784313725487, a: 1},
        points: ["point-252", "point-1", "point-362"]
    }, {
        id: "poly-73",
        color: {h: 265.24590163934425, s: 79.22077922077922, l: 45.294117647058826, a: 1},
        points: ["point-252", "point-362", "point-257"]
    }, {
        id: "poly-74",
        color: {h: 264.68571428571425, s: 91.62303664921467, l: 37.450980392156865, a: 1},
        points: ["point-257", "point-362", "point-372"]
    }, {
        id: "poly-75",
        color: {h: 264.9438202247191, s: 87.25490196078431, l: 40, a: 1},
        points: ["point-257", "point-372", "point-267"]
    }, {
        id: "poly-76",
        color: {h: 262.3448275862069, s: 100, l: 28.431372549019606, a: 1},
        points: ["point-267", "point-372", "point-382"]
    }, {
        id: "poly-77",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-267", "point-382", "point-277"]
    }, {
        id: "poly-78",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-277", "point-382", "point-392"]
    }, {
        id: "poly-79",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-277", "point-392", "point-397"]
    }, {
        id: "poly-80",
        color: {h: 261.69230769230774, s: 100, l: 25.49019607843137, a: 1},
        points: ["point-277", "point-397", "point-292"]
    }, {
        id: "poly-81",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-292", "point-397", "point-407"]
    }, {
        id: "poly-82",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-292", "point-407", "point-302"]
    }, {
        id: "poly-83",
        color: {h: 240, s: 100, l: 10.588235294117647, a: 1},
        points: ["point-302", "point-407", "point-417"]
    }, {
        id: "poly-84",
        color: {h: 242.99999999999997, s: 100, l: 11.76470588235294, a: 1},
        points: ["point-302", "point-417", "point-307"]
    }, {
        id: "poly-85",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-307", "point-417", "point-317"]
    }, {
        id: "poly-86",
        color: {h: 240, s: 100, l: 4.705882352941177, a: 1},
        points: ["point-317", "point-417", "point-432"]
    }, {
        id: "poly-87",
        color: {h: 240, s: 100, l: 6.862745098039216, a: 1},
        points: ["point-317", "point-432", "point-327"]
    }, {
        id: "poly-88",
        color: {h: 240, s: 100, l: 1.5686274509803921, a: 1},
        points: ["point-327", "point-432", "point-442"]
    }, {
        id: "poly-89",
        color: {h: 240, s: 100, l: 2.549019607843137, a: 1},
        points: ["point-327", "point-442", "point-337"]
    }, {
        id: "poly-90",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-337", "point-442", "point-452"]
    }, {
        id: "poly-91",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-337", "point-452", "point-457"]
    }, {
        id: "poly-92",
        color: {h: 240, s: 100, l: 1.5686274509803921, a: 1},
        points: ["point-337", "point-457", "point-352"]
    }, {
        id: "poly-93",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-352", "point-457", "point-357"]
    }, {
        id: "poly-94",
        color: {h: 261.69230769230774, s: 100, l: 25.49019607843137, a: 1},
        points: ["point-362", "point-1", "point-472"]
    }, {
        id: "poly-95",
        color: {h: 260, s: 100, l: 24.11764705882353, a: 1},
        points: ["point-362", "point-472", "point-382"]
    }, {
        id: "poly-96",
        color: {h: 263.64963503649636, s: 100, l: 26.862745098039216, a: 1},
        points: ["point-362", "point-382", "point-372"]
    }, {
        id: "poly-97",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-382", "point-472", "point-487"]
    }, {
        id: "poly-98",
        color: {h: 255.31914893617022, s: 100, l: 18.43137254901961, a: 1},
        points: ["point-382", "point-487", "point-392"]
    }, {
        id: "poly-99",
        color: {h: 249.75, s: 100, l: 15.686274509803921, a: 1},
        points: ["point-392", "point-487", "point-497"]
    }, {
        id: "poly-100",
        color: {h: 246.57534246575347, s: 100, l: 14.313725490196077, a: 1},
        points: ["point-392", "point-497", "point-397"]
    }, {
        id: "poly-101",
        color: {h: 240, s: 100, l: 10.588235294117647, a: 1},
        points: ["point-397", "point-497", "point-507"]
    }, {
        id: "poly-102",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-397", "point-507", "point-407"]
    }, {
        id: "poly-103",
        color: {h: 240, s: 100, l: 6.862745098039216, a: 1},
        points: ["point-407", "point-507", "point-517"]
    }, {
        id: "poly-104",
        color: {h: 240, s: 100, l: 5.686274509803922, a: 1},
        points: ["point-407", "point-517", "point-417"]
    }, {
        id: "poly-105",
        color: {h: 240, s: 100, l: 1.5686274509803921, a: 1},
        points: ["point-417", "point-517", "point-527"]
    }, {
        id: "poly-106",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-417", "point-527", "point-532"]
    }, {
        id: "poly-107",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-417", "point-532", "point-432"]
    }, {
        id: "poly-108",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-432", "point-532", "point-542"]
    }, {
        id: "poly-109",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-432", "point-542", "point-442"]
    }, {
        id: "poly-110",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-442", "point-542", "point-452"]
    }, {
        id: "poly-111",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-452", "point-542", "point-557"]
    }, {
        id: "poly-112",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-452", "point-557", "point-457"]
    }, {
        id: "poly-113",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-457", "point-557", "point-357"]
    }, {
        id: "poly-114",
        color: {h: 259.44444444444446, s: 100, l: 21.176470588235293, a: 1},
        points: ["point-1", "point-571", "point-472"]
    }, {
        id: "poly-115",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-472", "point-571", "point-577"]
    }, {
        id: "poly-116",
        color: {h: 257.2277227722772, s: 100, l: 19.80392156862745, a: 1},
        points: ["point-472", "point-577", "point-487"]
    }, {
        id: "poly-117",
        color: {h: 252.41379310344828, s: 100, l: 17.058823529411764, a: 1},
        points: ["point-487", "point-577", "point-587"]
    }, {
        id: "poly-118",
        color: {h: 246.57534246575347, s: 100, l: 14.313725490196077, a: 1},
        points: ["point-487", "point-587", "point-592"]
    }, {
        id: "poly-119",
        color: {h: 246.57534246575347, s: 100, l: 14.313725490196077, a: 1},
        points: ["point-487", "point-592", "point-497"]
    }, {
        id: "poly-120",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-497", "point-592", "point-602"]
    }, {
        id: "poly-121",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-497", "point-602", "point-507"]
    }, {
        id: "poly-122",
        color: {h: 240, s: 100, l: 5.686274509803922, a: 1},
        points: ["point-507", "point-602", "point-612"]
    }, {
        id: "poly-123",
        color: {h: 240, s: 100, l: 5.686274509803922, a: 1},
        points: ["point-507", "point-612", "point-517"]
    }, {
        id: "poly-124",
        color: {h: 240, s: 100, l: 1.5686274509803921, a: 1},
        points: ["point-517", "point-612", "point-527"]
    }, {
        id: "poly-125",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-527", "point-612", "point-627"]
    }, {
        id: "poly-126",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-527", "point-627", "point-632"]
    }, {
        id: "poly-127",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-527", "point-632", "point-532"]
    }, {
        id: "poly-128",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-532", "point-632", "point-542"]
    }, {
        id: "poly-129",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-542", "point-632", "point-647"]
    }, {
        id: "poly-130",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-542", "point-647", "point-652"]
    }, {
        id: "poly-131",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-542", "point-652", "point-557"]
    }, {
        id: "poly-132",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-557", "point-652", "point-357"]
    }, {
        id: "poly-133",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-357", "point-652", "point-667"]
    }, {
        id: "poly-134",
        color: {h: 240, s: 100, l: 6.862745098039216, a: 1},
        points: ["point-571", "point-647", "point-587"]
    }, {
        id: "poly-135",
        color: {h: 252.41379310344828, s: 100, l: 17.058823529411764, a: 1},
        points: ["point-571", "point-587", "point-577"]
    }, {
        id: "poly-136",
        color: {h: 240, s: 100, l: 2.549019607843137, a: 1},
        points: ["point-587", "point-647", "point-602"]
    }, {
        id: "poly-137",
        color: {h: 240, s: 100, l: 9.215686274509805, a: 1},
        points: ["point-587", "point-602", "point-592"]
    }, {
        id: "poly-138",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-602", "point-647", "point-632"]
    }, {
        id: "poly-139",
        color: {h: 240, s: 100, l: .5882352941176471, a: 1},
        points: ["point-602", "point-632", "point-612"]
    }, {
        id: "poly-140",
        color: {h: 0, s: 0, l: 0, a: 1},
        points: ["point-612", "point-632", "point-627"]
    }, {id: "poly-141", color: {h: 0, s: 0, l: 0, a: 1}, points: ["point-647", "point-667", "point-652"]}]
};
!function (t, e, i, n, o) {
    var s, r, a;
    window.requestAnimationFrame || (window.requestAnimationFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
                window.setTimeout(t, 1e3 / 60)
            }
    }()), s = Math.sqrt, r = Math.pow, a = t.extend({
        scale: window.devicePixelRatio || 1,
        shapes: [],
        particles: [],
        particlesA: [],
        particlesB: [],
        _deferredParticles: [],
        ticks: [],
        starGeneratorRate: 600,
        mouse: {x: -9999, y: -9999},
        constructor: function (t, e, i) {
            return this.canvas = t, this.background = e, this.tagLine = i, this.canvas.getContext ? (this.context = this.canvas.getContext("2d"), this.setupEvents(), this.setupStarfield(), this.setupTessellation(), this.setupMisc(), void this.startEngine()) : null
        },
        startEngine: function () {
            var t = this.canvas.parentNode;
            this.background.className += " show", this.canvas.style.opacity = 1, new o(this).wait(1e3).then(function () {
                this.starGeneratorRate = 200
            }, this).wait(500).then(function () {
                t.className += " state-one"
            }).wait(150).then(function () {
                t.className += " state-two"
            }).wait(150).then(function () {
                t.className += " state-three"
            }).wait(500).then(function () {
                t.className += " state-four"
            }).wait(100).then(function () {
                this.showShapes = !0
            }, this).wait(1e3).then(function () {
                this.logo.startBreathing(), this.showGrid = !0
            }, this).wait(1e3).then(function () {
                this.typewriter.start()
            }, this), this.render()
        },
        setupMisc: function () {
            this.last = Date.now() / 1e3, this.render = this.render.bind(this), this.typewriter = new a.Typewriter(this.tagLine)
        },
        setupEvents: function () {
            this.resize = this.resize.bind(this), this.resize(), window.addEventListener("resize", this.resize, !1), this._handleScroll = this._handleScroll.bind(this), this._handleScroll(), window.addEventListener("scroll", this._handleScroll, !1), this._handleMouseCoords = this._handleMouseCoords.bind(this), window.addEventListener("mousemove", this._handleMouseCoords, !1)
        },
        setupStarfield: function () {
            this.particles = [], this.generateParticles(400)
        },
        setupTessellation: function (t) {
            var e, o;
            this.shapes = [], window.innerWidth < 570 ? (e = 300, o = 0) : (e = 360, o = 40), this.logo = new a.Shape(-(e / 2), -(e / 2 + o), e, e, i.points, i.polygons), this.grid = new a.Shape.Puller(this.width, this.height, n)
        },
        getAverageTickTime: function () {
            var t, e = 0;
            for (t = 0; t < this.ticks.length; t++)e += this.ticks[t];
            window.console.log("Average Tick Time:", e / this.ticks.length)
        },
        getLongestTick: function () {
            var t, e, i = 0;
            for (e = 0; e < this.ticks.length; e++)this.ticks[e] > i && (i = this.ticks[e], t = e);
            window.console.log("Max tick was:", i, "at index:", t)
        },
        render: function () {
            var t, e, i, n = this.scale;
            if (!this.paused) {
                if (this.scrollY > this.height)return void window.requestAnimationFrame(this.render);
                for (this.context.clearRect(-(this.width / 2) * n, -(this.height / 2) * n, this.width * n, this.height * n), this.now = Date.now() / 1e3, this.tick = Math.min(this.now - this.last, .017), this.updateChainTimer && this.updateChainTimer(this.tick), t = 0; t < this.particles.length; t++)this.particles[t].update(this);
                for (this.context.fillStyle = "#8750c2", t = 0; t < this.particlesA.length; t++)e = this.particlesA[t], e.radius < .25 || this.context.fillRect(e.pos.x * n >> 0, e.pos.y * n >> 0, e.radius * n, e.radius * n);
                for (this.context.fillStyle = "#b976ff", t = 0; t < this.particlesB.length; t++)e = this.particlesB[t], e.radius < .25 || this.context.fillRect(e.pos.x * n >> 0, e.pos.y * n >> 0, e.radius * n, e.radius * n);
                for (this.particlesA.length = 0, this.particlesB.length = 0, t = 0; t < this._deferredParticles.length; t++)i = this.particles.indexOf(this._deferredParticles.pop()), i >= 0 && this.particles.splice(i, 1);
                this.showGrid && this.grid.update(this).draw(this.context, n, this), this.showShapes && this.logo.update(this).draw(this.context, n, this), this.typewriter.update(this), this.last = this.now, this.generateParticles(this.starGeneratorRate * this.tick >> 0), window.requestAnimationFrame(this.render)
            }
        },
        generateParticles: function (t, e) {
            var i;
            for (i = 0; t > i; i++)e ? this.particles.push(new a.Particle.Fixed(this.width, this.height)) : this.particles.push(new a.Particle(this.width, this.height))
        },
        resize: function () {
            var t, e, i = this.scale;
            window.innerWidth < 570 ? this.height = 560 : this.height = 700, this.width = window.innerWidth, this.canvas.width = this.width * i, this.canvas.height = this.height * i, this.context.translate(this.width / 2 * i >> 0, this.height / 2 * i >> 0), this.context.lineJoin = "bevel", this.grid && this.grid.resize(this.width, this.height), this.logo && (560 === this.height ? (t = 300, e = 0) : (t = 360, e = 40), this.logo.resize(t, e))
        },
        _handleMouseCoords: function (t) {
            this.mouse.x = t.pageX, this.mouse.y = t.pageY
        },
        _handleScroll: function () {
            this.scrollY = window.scrollY
        },
        pause: function () {
            this.paused = !0
        },
        resume: function () {
            this.paused && (this.paused = !1, this.render())
        },
        getSnapshot: function () {
            window.open(this.canvas.toDataURL("image/png"))
        }
    }), a.map = function (t, e, i, n, o) {
        return n + (o - n) * ((t - e) / (i - e))
    }, a.getRandomFloat = function (t, e) {
        return Math.random() * (e - t) + t
    }, a.getRandomInt = function (t, e) {
        return Math.floor(Math.random() * (e - t + 1) + t)
    }, a.clone = function (t) {
        var e, i = {};
        for (e in t)i[e] = t[e];
        return i
    }, window.Engine = a
}(window.Base, window.Vector, window.Logo, window.Grid, window.Chainable), function (t, e) {
    t.Particle = function (i, n) {
        var o, s, r;
        this.accel = e.coerce(this.accel), this.vel = e.coerce(this.vel), this.pos = new e(0, 0), this.maxRadius = t.getRandomFloat(.1, 2.5), this.maxSpeed = t.getRandomFloat(20, 1e3), o = t.getRandomInt(0, 3), 0 === o || 2 === o ? (r = 0 === o ? -(n / 2) : n / 2, s = t.getRandomInt(-(i / 2), i / 2)) : (r = t.getRandomInt(-(n / 2), n / 2), s = 3 === o ? -(i / 2) : i / 2), this.target = new e(s, r), this.getAccelVector(), this.maxDistance = this.distanceTo(this.target), this.fillA = "#8750c2", this.fillB = "#b976ff", this.frameMax = t.getRandomInt(1, 5)
    }, t.Particle.prototype = {
        radius: 1,
        frame: 0,
        showA: !1,
        accel: {x: 0, y: 0},
        vel: {x: 0, y: 0},
        pos: {x: 0, y: 0},
        opacity: 1,
        maxSpeed: 1500,
        maxForce: 1500,
        getAccelVector: function () {
            this.accel = e.sub(this.target, this.pos).normalize().mult(this.maxSpeed)
        },
        update: function (t) {
            var i, n, o;
            return this.vel.add(this.accel).limit(this.maxSpeed), this.pos.add(e.mult(this.vel, t.tick)), n = t.width / 2 + this.maxRadius, o = t.height / 2 + this.maxRadius, (this.pos.x < -n || this.pos.x > n || this.pos.y < -o || this.pos.y > o) && this.kill(t), i = (this.maxDistance - this.distanceTo(this.target)) / this.maxDistance, this.radius = Math.max(.1, this.maxRadius * i), this.frame++, this.frame > this.frameMax && (this.frame = 0, this.showA = !this.showA), this.showA ? t.particlesA[t.particlesA.length] = this : t.particlesB[t.particlesB.length] = this, this
        },
        draw: function (t, e) {
            return this.radius < .25 ? void 0 : (this.showA ? t.fillStyle = this.fillA : t.fillStyle = this.fillB, t.fillRect(this.pos.x * e >> 0, this.pos.y * e >> 0, this.radius * e, this.radius * e), this)
        },
        kill: function (t) {
            return t._deferredParticles.push(this), this
        },
        distanceTo: function (t) {
            var e = this.pos.x - t.x, i = this.pos.y - t.y;
            return Math.sqrt(e * e + i * i)
        }
    }
}(window.Engine, window.Vector), function (t, e, i) {
    t.Fixed = function (t, n) {
        var o, s;
        this.radius = e.getRandomFloat(.1, 1), this.fillA = "#3a1066", this.fillB = "#561799", this.frameMax = e.getRandomInt(4, 10), this.max = {
            x: t + this.maxRadius,
            y: n + this.maxRadius
        }, this.min = {
            x: 0 - this.maxRadius,
            y: 0 - this.maxRadius
        }, o = e.getRandomInt(0 + this.radius, t + this.radius), s = e.getRandomInt(0 + this.radius, n + this.radius), this.pos = new i(o, s)
    }, e.Particle.Fixed.prototype = {
        radius: 1, pos: {x: 0, y: 0}, frame: 0, showA: !1, update: function (t) {
            return this.frame++, this.frame > this.frameMax && (this.frame = 0, this.showA = !this.showA), this
        }, draw: function (t, e) {
            return t.beginPath(), t.arc(this.pos.x * e >> 0, this.pos.y * e >> 0, this.radius * e, 0, 2 * Math.PI, !1), this.showA ? t.fillStyle = this.fillA : t.fillStyle = this.fillB, t.fill(), this
        }
    }
}(window.Engine.Particle, window.Engine, window.Vector), function (t, e) {
    "use strict";
    t.Point = function (i, n, o, s) {
        this.id = i, this.shapeSize = s, this.ref = new e(n, o), this.pos = new e(n * s.x, o * s.y), this.target = this.pos.clone(), this.pos.x = s.x / 2, this.pos.y = s.y / 2, this.accel = e.coerce(this.accel), this.vel = e.coerce(this.vel), this.stiffness = t.getRandomFloat(150, 600), this.friction = t.getRandomFloat(12, 18)
    }, t.Point.prototype = {
        radius: 1,
        stiffness: 200,
        friction: 13,
        threshold: .03,
        pos: {x: 0, y: 0},
        accel: {x: 0, y: 0},
        vel: {x: 0, y: 0},
        target: {x: 0, y: 0},
        resize: function () {
            this.target.x = this.pos.x = this.ref.x * this.shapeSize.x, this.target.y = this.pos.y = this.ref.y * this.shapeSize.y
        },
        updateBreathingPhysics: function () {
            this.stiffness = t.getRandomFloat(2, 4), this.friction = t.getRandomFloat(1, 2)
        },
        updateTarget: function (i) {
            var n;
            this.target.x = this.ref.x * i.x, this.target.y = this.ref.y * i.y, n = e.sub(i, this.shapeSize).div(2), this.target.sub(n), this.target.add({
                x: t.getRandomFloat(-3, 3),
                y: t.getRandomFloat(-3, 3)
            })
        },
        update: function (t) {
            var i;
            return i = e.sub(this.target, this.pos).mult(this.stiffness).sub(e.mult(this.vel, this.friction)), this.accel.set(i), this.vel.add(e.mult(this.accel, t.tick)), this.pos.add(e.mult(this.vel, t.tick)), i = null, this
        },
        draw: function (t, e) {
            return t.beginPath(), t.arc(this.pos.x * e, this.pos.y * e, this.radius * e, 0, 2 * Math.PI, !1), t.fillStyle = "#ffffff", t.fill(), this
        }
    }
}(window.Engine, window.Vector), function (t, e) {
    t.Point.Puller = function (t, i, n, o) {
        this.id = t, this.shapeSize = o, this.ref = new e(i, n), this.pos = new e(i * o.x, n * o.y), this.home = this.pos.clone(), this.accel = e.coerce(this.accel), this.vel = e.coerce(this.vel)
    }, t.Point.Puller.prototype = {
        fillStyle: null,
        defaultFillstyle: "#b976ff",
        chasingFillstyle: "#ff6b6b",
        radius: 1,
        maxSpeed: 160,
        maxForce: 50,
        pos: {x: 0, y: 0},
        accel: {x: 0, y: 0},
        vel: {x: 0, y: 0},
        aRad: 200,
        safety: .25,
        resize: function () {
            return this.home.x = this.pos.x = this.ref.x * this.shapeSize.x, this.home.y = this.pos.y = this.ref.y * this.shapeSize.y, this
        },
        update: function (t) {
            var i, n, o, s, r = e.coerce(t.mouse);
            return r.x += (this.shapeSize.x - t.width) / 2, r.y += (this.shapeSize.y - t.height) / 2, i = this.distanceTo(r), this.accel.mult(0), i < this.aRad ? (this._chasing = !0, this.toChase(r), this.fillStyle = this.chasingFillstyle) : (this._chasing = !1, this.fillStyle = this.defaultFillstyle), this.toChase(this.home, this.maxForce / 2), this.vel.add(this.accel), this.pos.add(e.mult(this.vel, t.tick)), n = e.sub(this.home, this.pos), o = n.mag(), s = this.aRad * (3 * this.safety), o > this.aRad - s && (n.normalize(), n.mult(this.aRad - s), this.pos = e.sub(this.home, n)), r = null, n = null, this
        },
        toChase: function (i, n) {
            var o, s, r, a, l;
            n = n || this.maxForce, i = e.coerce(i), o = e.sub(i, this.pos), r = o.mag(), o.normalize(), l = this.aRad * this.safety, a = l > r ? t.map(r, 0, l, 0, this.maxSpeed) : r > this.aRad - l ? t.map(this.aRad - r, 0, l, 0, this.maxSpeed) : this.maxSpeed, o.mult(a), s = e.sub(o, this.vel), s.limit(n), this.accel.add(s), i = null, o = null, s = null
        },
        draw: function (t, e) {
            return t.fillStyle = this.fillStyle, t.fillRect((this.pos.x - this.radius / 2) * e >> 0, (this.pos.y - this.radius / 2) * e >> 0, this.radius * e, this.radius * e), this
        },
        distanceTo: function (t) {
            var e = this.home.x - t.x, i = this.home.y - t.y;
            return Math.sqrt(e * e + i * i)
        }
    }
}(window.Engine, window.Vector), function (t, e) {
    t.Polygon = function (e, i, n, o, s) {
        this.a = e, this.b = i, this.c = n, this.color = t.clone(o), this.strokeColor = s ? t.clone(s) : t.clone(o), s ? this.strokeColor = t.clone(s) : this.strokeColor = t.clone(o), this.strokeWidth = .25, this.maxStrokeS = this.strokeColor.s, this.maxStrokeL = this.strokeColor.l, this.maxColorL = this.color.l, this.strokeColor.s = 0, this.strokeColor.l = 100, this.color.l = 0, this.fillStyle = this.hslaTemplate.substitute(this.color), this.strokeStyle = this.hslaTemplate.substitute(this.strokeColor)
    }, t.Polygon.prototype = {
        rgbaTemplate: "rgba({r},{g},{b},{a})",
        hslaTemplate: "hsla({h},{s}%,{l}%,{a})",
        hueShiftSpeed: 20,
        duration: 2,
        delay: 0,
        start: 0,
        update: function (t) {
            var e;
            this.simple || (this.start += t.tick, e = this.start, e > this.delay && e < this.delay + this.duration + 1 && this.color.l < this.maxColorL && (this.color.l = this.maxColorL * (e - this.delay) / this.duration, this.strokeColor.s = this.maxStrokeS * (e - this.delay) / this.duration, this.strokeColor.l = (this.maxStrokeL - 100) * (e - this.delay) / this.duration + 100, this.strokeWidth = 1.5 * (e - this.delay) / this.duration + .25, this.color.l > this.maxColorL && (this.color.l = this.maxColorL, this.strokeColor.l = this.maxStrokeL, this.strokeWidth = 1.5), this.strokeStyle = this.hslaTemplate.substitute(this.strokeColor), this.fillStyle = this.hslaTemplate.substitute(this.color)))
        }
    }
}(window.Engine, window.Vector), function (t, e) {
    t.Polygon.Puller = function (t, e, i, n, o) {
        this.a = t, this.b = e, this.c = i, this.strokeStyle = "#ffffff"
    }, t.Polygon.Puller.prototype = {
        checkChasing: function () {
            return this.a._chasing === !0 && this.b._chasing === !0 && this.c._chasing === !0 ? !0 : !1
        }
    }
}(window.Engine, window.Vector), function (t, e, i, n) {
    t.Shape = function (t, o, s, r, a, l) {
        var p, c, h, u;
        for (this.pos = new n(t, o), this.size = new n(s, r), this.sizeRef = this.size.clone(), c = {}, this.points = [], this.polygons = [], p = 0; p < a.length; p++)h = new e(a[p].id, a[p].x, a[p].y, this.size), c[h.id] = h, this.points.push(h);
        for (p = 0; p < l.length; p++)u = l[p], this.polygons.push(new i(c[u.points[0]], c[u.points[1]], c[u.points[2]], u.color, u.stroke))
    }, t.Shape.prototype = {
        breathing: !1, breath: 0, breathLength: 1, breatheIn: !1, resize: function (t, e) {
            var i, n;
            for (this.size.x = t, this.size.y = t, this.sizeRef.x = t, this.sizeRef.y = t, this.pos.x = -(t / 2), this.pos.y = -(t / 2 + e), n = 0, i = this.points.length; i > n; n++)this.points[n].resize()
        }, startBreathing: function () {
            var t;
            for (this.breathing = !0, this.breath = this.breathLength, t = 0; t < this.points.length; t++)this.points[t].updateBreathingPhysics()
        }, breathe: function (t) {
            var e, i, o;
            if (this.breath += t, !(this.breath < this.breathLength)) {
                for (i = 1, o = n.mult(this.sizeRef, i), e = 0; e < this.points.length; e++)this.points[e].updateTarget(o);
                this.breath = 0
            }
        }, update: function (t) {
            var e;
            for (this.breathing === !0 && this.breathe(t.tick), e = 0; e < this.points.length; e++)this.points[e].update(t);
            for (e = 0; e < this.polygons.length; e++)this.polygons[e].update(t);
            return this
        }, draw: function (t, e, i) {
            var n, o;
            for (t.translate(this.pos.x * e >> 0, this.pos.y * e >> 0), n = 0; n < this.polygons.length; n++)o = this.polygons[n], t.beginPath(), t.moveTo(o.a.pos.x * e, o.a.pos.y * e), t.lineTo(o.b.pos.x * e, o.b.pos.y * e), t.lineTo(o.c.pos.x * e, o.c.pos.y * e), t.closePath(), t.fillStyle = o.fillStyle, t.fill(), t.lineWidth = o.strokeWidth * e, t.strokeStyle = o.strokeStyle, t.stroke();
            return t.setTransform(1, 0, 0, 1, 0, 0), t.translate(i.width / 2 * i.scale >> 0, i.height / 2 * i.scale >> 0), this
        }
    }
}(window.Engine, window.Engine.Point, window.Engine.Polygon, window.Vector), function (t, e, i, n) {
    t.Shape.Puller = function (t, o, s) {
        var r, a, l, p;
        for (this.pos = new n(0, 0), this.size = new n(t, o), this.heightRatio = s.data.width / s.data.height, this.widthRatio = s.data.ar, this.resize(t, o, !0), a = {}, this.points = [], this.polygons = [], r = 0; r < s.points.length; r++)l = new e(s.points[r].id, s.points[r].x, s.points[r].y, this.size), a[l.id] = l, this.points.push(l);
        for (r = 0; r < s.polygons.length; r++)p = s.polygons[r], this.polygons.push(new i(a[p.points[0]], a[p.points[1]], a[p.points[2]], p.color)), this.polygons[this.polygons.length - 1].noFill = !0;
        this.ref = void 0
    }, t.Shape.Puller.prototype = {
        alpha: 0, sizeOffset: 100, resize: function (t, e, i) {
            var n, o, s, r;
            if (r = e + this.sizeOffset, s = this.size.y * this.heightRatio, t > s && (s = t + this.sizeOffset, r = s * this.widthRatio), this.size.y = r, this.size.x = s, this.pos.x = -(s / 2), this.pos.y = -(r / 2), i)return this;
            for (o = 0, n = this.points.length; n > o; o++)this.points[o].resize()
        }, update: function (t) {
            var e;
            for (e = 0; e < this.points.length; e++)this.points[e].update(t);
            return this.alpha < 1 && (this.alpha = Math.min(this.alpha + 2 * t.tick, 1)), this
        }, draw: function (t, e, i) {
            var n, o;
            for (t.translate(this.pos.x * e >> 0, this.pos.y * e >> 0), this.alpha < 1 && (t.globalAlpha = this.alpha), t.beginPath(), n = 0; n < this.polygons.length; n++)o = this.polygons[n], t.moveTo(o.a.pos.x * e >> 0, o.a.pos.y * e >> 0), t.lineTo(o.b.pos.x * e >> 0, o.b.pos.y * e >> 0), t.lineTo(o.c.pos.x * e >> 0, o.c.pos.y * e >> 0), t.lineTo(o.a.pos.x * e >> 0, o.a.pos.y * e >> 0);
            for (t.closePath(), t.lineWidth = .4 * e, t.strokeStyle = "rgba(108,0,243,0.15)", t.stroke(), this.alpha < 1 && (t.globalAlpha = 1), n = 0; n < this.points.length; n++)this.points[n].draw(t, e);
            for (t.beginPath(), n = 0; n < this.polygons.length; n++)this.polygons[n].checkChasing() && (o = this.polygons[n], t.moveTo(o.a.pos.x * e >> 0, o.a.pos.y * e >> 0), t.lineTo(o.b.pos.x * e >> 0, o.b.pos.y * e >> 0), t.lineTo(o.c.pos.x * e >> 0, o.c.pos.y * e >> 0), t.lineTo(o.a.pos.x * e >> 0, o.a.pos.y * e >> 0));
            return t.closePath(), t.fillStyle = "rgba(108,0,243,0.05)", t.fill(), t.setTransform(1, 0, 0, 1, 0, 0), t.translate(i.width / 2 * i.scale >> 0, i.height / 2 * i.scale >> 0), this
        }
    }
}(window.Engine, window.Engine.Point.Puller, window.Engine.Polygon.Puller, window.Vector), function (t) {
    "use strict";
    t.Typewriter = function (t) {
        this.element = t, this.content = this.element.textContent.split(""), this.element.innerHTML = "", this.element.style.visibility = "visible"
    }, t.Typewriter.prototype = {
        running: !1,
        letterInterval: .02,
        spaceInterval: .4,
        charCount: -1,
        waitSpace: !1,
        toDraw: "",
        start: function () {
            return this.content.length ? (this._last = this.letterInterval, void(this.running = !0)) : this
        },
        update: function (t) {
            var e;
            return this.running ? (this._last += t.tick, this.waitSpace && this._last < this.spaceInterval ? this : !this.waitSpace && this._last < this.letterInterval ? this : (this._last = 0, e = this.content.shift(), this.toDraw += e, "," === e ? this.waitSpace = !0 : this.waitSpace = !1, this.element.innerHTML = this.toDraw + '<span class="cursor">_</span>', this.content.length || (this.running = !1), this)) : this
        }
    }
}(window.Engine), function () {
    Sidebar = Base.extend({
        $body: null,
        $overlay: null,
        $sidebar: null,
        $sidebarHeader: null,
        $sidebarImg: null,
        $toggleButton: null,
        constructor: function () {
            this.$body = $("body"), this.$overlay = $(".sidebar-overlay"), this.$sidebar = $("#sidebar"), this.$sidebarHeader = $("#sidebar .sidebar-header"), this.$toggleButton = $(".navbar-toggle"), this.sidebarImg = this.$sidebarHeader.css("background-image"), this.addEventListeners()
        },
        addEventListeners: function () {
            var t = this;
            t.$toggleButton.on("click", function () {
                return t.$sidebar.toggleClass("open"), (t.$sidebar.hasClass("sidebar-fixed-left") || t.$sidebar.hasClass("sidebar-fixed-right")) && t.$sidebar.hasClass("open") ? (t.$overlay.addClass("active"), t.$body.css("overflow", "hidden")) : (t.$overlay.removeClass("active"), t.$body.css("overflow", "auto")), !1
            }), t.$overlay.on("click", function () {
                $(this).removeClass("active"), t.$body.css("overflow", "auto"), t.$sidebar.removeClass("open")
            })
        }
    }), window.Sidebar = Sidebar
}(), function (t) {
    var e = function () {
        return window.navigator.userAgent.match("Trident") ? !0 : !1
    }(), i = {
        start: function () {
            var t = document.body.id.toLowerCase();
            this.Pages[t] && this.Pages[t](), i.initializeSidebar()
        }, initializeSidebar: function () {
            new Sidebar
        }, generateAnimatedLogo: function () {
            var t, e, i;
            for (t = document.createElement("div"), t.className = "animated-logo", e = 1; 5 > e; e++)i = document.createElement("div"), i.className = "white-block block-" + e, t.appendChild(i);
            return t
        }, initializeEngine: function () {
            var e, n, o = document.getElementById("jumbotron"), s = document.getElementById("jumbotron-content"), r = document.getElementById("tag-line");
            o && (n = document.createElement("div"), n.id = "galaxy-bg", n.className = "galaxy-bg", o.appendChild(n), s.appendChild(i.generateAnimatedLogo()), e = document.createElement("canvas"), e.className = "terraform-canvas", o.appendChild(e), new t(e, n, r))
        }, Pages: {
            "page-home": function () {
                return e ? (document.getElementById("jumbotron").className += " static", void(document.getElementById("tag-line").style.visibility = "visible")) : void i.initializeEngine()
            }
        }
    };
    i.start()
}(window.Engine);