/*!
 * AdminLTE v3.2.0 (https://adminlte.io)
 * Copyright 2014-2022 Colorlib <https://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */ !(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("jquery"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery"], t)
    : t(
        ((e =
          "undefined" != typeof globalThis ? globalThis : e || self).adminlte =
          {}),
        e.jQuery
      );
})(this, function (e, t) {
  "use strict";
  var a,
    i = (a = t) && "object" == typeof a && "default" in a ? a : { default: a },
    n = "CardRefresh",
    o = "lte.cardrefresh",
    l = "." + o,
    s = i.default.fn[n],
    r = "loaded" + l,
    f = "overlay.added" + l,
    d = "overlay.removed" + l,
    u = "card",
    c = "." + u,
    h = '[data-card-widget="card-refresh"]',
    g = {
      source: "",
      sourceSelector: "",
      params: {},
      trigger: h,
      content: ".card-body",
      loadInContent: !0,
      loadOnInit: !0,
      loadErrorTemplate: !0,
      responseType: "",
      overlayTemplate:
        '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
      errorTemplate: '<span class="text-danger"></span>',
      onLoadStart: function e() {},
      onLoadDone: function e(t) {
        return t;
      },
      onLoadFail: function e(t, a, i) {},
    },
    p = (function () {
      function e(e, t) {
        if (
          ((this._element = e),
          (this._parent = e.parents(c).first()),
          (this._settings = i.default.extend({}, g, t)),
          (this._overlay = i.default(this._settings.overlayTemplate)),
          e.hasClass(u) && (this._parent = e),
          "" === this._settings.source)
        )
          throw Error(
            "Source url was not defined. Please specify a url in your CardRefresh source option."
          );
      }
      var t = e.prototype;
      return (
        (t.load = function e() {
          var t = this;
          this._addOverlay(),
            this._settings.onLoadStart.call(i.default(this)),
            i.default
              .get(
                this._settings.source,
                this._settings.params,
                function (e) {
                  t._settings.loadInContent &&
                    ("" !== t._settings.sourceSelector &&
                      (e = i
                        .default(e)
                        .find(t._settings.sourceSelector)
                        .html()),
                    t._parent.find(t._settings.content).html(e)),
                    t._settings.onLoadDone.call(i.default(t), e),
                    t._removeOverlay();
                },
                "" !== this._settings.responseType &&
                  this._settings.responseType
              )
              .fail(function (e, a, n) {
                if ((t._removeOverlay(), t._settings.loadErrorTemplate)) {
                  var o = i.default(t._settings.errorTemplate).text(n);
                  t._parent.find(t._settings.content).empty().append(o);
                }
                t._settings.onLoadFail.call(i.default(t), e, a, n);
              }),
            i.default(this._element).trigger(i.default.Event(r));
        }),
        (t._addOverlay = function e() {
          this._parent.append(this._overlay),
            i.default(this._element).trigger(i.default.Event(f));
        }),
        (t._removeOverlay = function e() {
          this._parent.find(this._overlay).remove(),
            i.default(this._element).trigger(i.default.Event(d));
        }),
        (t._init = function e() {
          var t = this;
          i
            .default(this)
            .find(this._settings.trigger)
            .on("click", function () {
              t.load();
            }),
            this._settings.loadOnInit && this.load();
        }),
        (e._jQueryInterface = function t(a) {
          var n = i.default(this).data(o),
            l = i.default.extend({}, g, i.default(this).data());
          n ||
            ((n = new e(i.default(this), l)),
            i.default(this).data(o, "string" == typeof a ? n : a)),
            "string" == typeof a && /load/.test(a)
              ? n[a]()
              : n._init(i.default(this));
        }),
        e
      );
    })();
  i.default(document).on("click", h, function (e) {
    e && e.preventDefault(), p._jQueryInterface.call(i.default(this), "load");
  }),
    i.default(function () {
      i.default(h).each(function () {
        p._jQueryInterface.call(i.default(this));
      });
    }),
    (i.default.fn[n] = p._jQueryInterface),
    (i.default.fn[n].Constructor = p),
    (i.default.fn[n].noConflict = function () {
      return (i.default.fn[n] = s), p._jQueryInterface;
    });
  var m = "CardWidget",
    v = "lte.cardwidget",
    b = "." + v,
    C = i.default.fn[m],
    y = "expanded" + b,
    w = "collapsed" + b,
    x = "maximized" + b,
    $ = "minimized" + b,
    I = "removed" + b,
    T = "card",
    j = "collapsed-card",
    S = "collapsing-card",
    k = "expanding-card",
    Q = "was-collapsed",
    H = "maximized-card",
    z = '[data-card-widget="remove"]',
    E = '[data-card-widget="collapse"]',
    F = '[data-card-widget="maximize"]',
    D = "." + T,
    L = ".card-header",
    _ = ".card-body",
    A = ".card-footer",
    R = {
      animationSpeed: "normal",
      collapseTrigger: E,
      removeTrigger: z,
      maximizeTrigger: F,
      collapseIcon: "fa-minus",
      expandIcon: "fa-plus",
      maximizeIcon: "fa-expand",
      minimizeIcon: "fa-compress",
    },
    M = (function () {
      function e(e, t) {
        (this._element = e),
          (this._parent = e.parents(D).first()),
          e.hasClass(T) && (this._parent = e),
          (this._settings = i.default.extend({}, R, t));
      }
      var t = e.prototype;
      return (
        (t.collapse = function e() {
          var t = this;
          this._parent
            .addClass(S)
            .children(_ + ", " + A)
            .slideUp(this._settings.animationSpeed, function () {
              t._parent.addClass(j).removeClass(S);
            }),
            this._parent
              .find(
                "> " +
                  L +
                  " " +
                  this._settings.collapseTrigger +
                  " ." +
                  this._settings.collapseIcon
              )
              .addClass(this._settings.expandIcon)
              .removeClass(this._settings.collapseIcon),
            this._element.trigger(i.default.Event(w), this._parent);
        }),
        (t.expand = function e() {
          var t = this;
          this._parent
            .addClass(k)
            .children(_ + ", " + A)
            .slideDown(this._settings.animationSpeed, function () {
              t._parent.removeClass(j).removeClass(k);
            }),
            this._parent
              .find(
                "> " +
                  L +
                  " " +
                  this._settings.collapseTrigger +
                  " ." +
                  this._settings.expandIcon
              )
              .addClass(this._settings.collapseIcon)
              .removeClass(this._settings.expandIcon),
            this._element.trigger(i.default.Event(y), this._parent);
        }),
        (t.remove = function e() {
          this._parent.slideUp(),
            this._element.trigger(i.default.Event(I), this._parent);
        }),
        (t.toggle = function e() {
          if (this._parent.hasClass(j)) {
            this.expand();
            return;
          }
          this.collapse();
        }),
        (t.maximize = function e() {
          this._parent
            .find(
              this._settings.maximizeTrigger +
                " ." +
                this._settings.maximizeIcon
            )
            .addClass(this._settings.minimizeIcon)
            .removeClass(this._settings.maximizeIcon),
            this._parent
              .css({
                height: this._parent.height(),
                width: this._parent.width(),
                transition: "all .15s",
              })
              .delay(150)
              .queue(function () {
                var e = i.default(this);
                e.addClass(H),
                  i.default("html").addClass(H),
                  e.hasClass(j) && e.addClass(Q),
                  e.dequeue();
              }),
            this._element.trigger(i.default.Event(x), this._parent);
        }),
        (t.minimize = function e() {
          this._parent
            .find(
              this._settings.maximizeTrigger +
                " ." +
                this._settings.minimizeIcon
            )
            .addClass(this._settings.maximizeIcon)
            .removeClass(this._settings.minimizeIcon),
            this._parent
              .css(
                "cssText",
                "height: " +
                  this._parent[0].style.height +
                  " !important; width: " +
                  this._parent[0].style.width +
                  " !important; transition: all .15s;"
              )
              .delay(10)
              .queue(function () {
                var e = i.default(this);
                e.removeClass(H),
                  i.default("html").removeClass(H),
                  e.css({ height: "inherit", width: "inherit" }),
                  e.hasClass(Q) && e.removeClass(Q),
                  e.dequeue();
              }),
            this._element.trigger(i.default.Event($), this._parent);
        }),
        (t.toggleMaximize = function e() {
          if (this._parent.hasClass(H)) {
            this.minimize();
            return;
          }
          this.maximize();
        }),
        (t._init = function e(t) {
          var a = this;
          (this._parent = t),
            i
              .default(this)
              .find(this._settings.collapseTrigger)
              .click(function () {
                a.toggle();
              }),
            i
              .default(this)
              .find(this._settings.maximizeTrigger)
              .click(function () {
                a.toggleMaximize();
              }),
            i
              .default(this)
              .find(this._settings.removeTrigger)
              .click(function () {
                a.remove();
              });
        }),
        (e._jQueryInterface = function t(a) {
          var n = i.default(this).data(v),
            o = i.default.extend({}, R, i.default(this).data());
          n ||
            ((n = new e(i.default(this), o)),
            i.default(this).data(v, "string" == typeof a ? n : a)),
            "string" == typeof a &&
            /collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/.test(
              a
            )
              ? n[a]()
              : "object" == typeof a && n._init(i.default(this));
        }),
        e
      );
    })();
  i.default(document).on("click", E, function (e) {
    e && e.preventDefault(), M._jQueryInterface.call(i.default(this), "toggle");
  }),
    i.default(document).on("click", z, function (e) {
      e && e.preventDefault(),
        M._jQueryInterface.call(i.default(this), "remove");
    }),
    i.default(document).on("click", F, function (e) {
      e && e.preventDefault(),
        M._jQueryInterface.call(i.default(this), "toggleMaximize");
    }),
    (i.default.fn[m] = M._jQueryInterface),
    (i.default.fn[m].Constructor = M),
    (i.default.fn[m].noConflict = function () {
      return (i.default.fn[m] = C), M._jQueryInterface;
    });
  var q = "ControlSidebar",
    N = "lte.controlsidebar",
    O = "." + N,
    P = i.default.fn[q],
    U = "collapsed" + O,
    B = "collapsed-done" + O,
    W = "expanded" + O,
    V = ".control-sidebar",
    G = ".control-sidebar-content",
    J = '[data-widget="control-sidebar"]',
    K = ".main-header",
    X = ".main-footer",
    Y = "control-sidebar-animate",
    Z = "control-sidebar-open",
    ee = "control-sidebar-slide-open",
    et = "layout-fixed",
    ea = {
      controlsidebarSlide: !0,
      scrollbarTheme: "os-theme-light",
      scrollbarAutoHide: "l",
      target: V,
      animationSpeed: 300,
    },
    ei = (function () {
      function e(e, t) {
        (this._element = e), (this._config = t);
      }
      var t = e.prototype;
      return (
        (t.collapse = function e() {
          var t = this,
            a = i.default("body"),
            n = i.default("html");
          this._config.controlsidebarSlide
            ? (n.addClass(Y),
              a
                .removeClass(ee)
                .delay(300)
                .queue(function () {
                  i.default(V).hide(),
                    n.removeClass(Y),
                    i.default(this).dequeue();
                }))
            : a.removeClass(Z),
            i.default(this._element).trigger(i.default.Event(U)),
            setTimeout(function () {
              i.default(t._element).trigger(i.default.Event(B));
            }, this._config.animationSpeed);
        }),
        (t.show = function e(t) {
          void 0 === t && (t = !1);
          var a = i.default("body"),
            n = i.default("html");
          t && i.default(V).hide(),
            this._config.controlsidebarSlide
              ? (n.addClass(Y),
                i
                  .default(this._config.target)
                  .show()
                  .delay(10)
                  .queue(function () {
                    a
                      .addClass(ee)
                      .delay(300)
                      .queue(function () {
                        n.removeClass(Y), i.default(this).dequeue();
                      }),
                      i.default(this).dequeue();
                  }))
              : a.addClass(Z),
            this._fixHeight(),
            this._fixScrollHeight(),
            i.default(this._element).trigger(i.default.Event(W));
        }),
        (t.toggle = function e() {
          var t = i.default("body"),
            a = this._config.target,
            n = !i.default(a).is(":visible"),
            o = t.hasClass(Z) || t.hasClass(ee),
            l = n && (t.hasClass(Z) || t.hasClass(ee));
          n || l ? this.show(n) : o && this.collapse();
        }),
        (t._init = function e() {
          var t = this,
            a = i.default("body");
          a.hasClass(Z) || a.hasClass(ee)
            ? (i.default(V).not(this._config.target).hide(),
              i.default(this._config.target).css("display", "block"))
            : i.default(V).hide(),
            this._fixHeight(),
            this._fixScrollHeight(),
            i.default(window).resize(function () {
              t._fixHeight(), t._fixScrollHeight();
            }),
            i.default(window).scroll(function () {
              var e = i.default("body");
              (e.hasClass(Z) || e.hasClass(ee)) && t._fixScrollHeight();
            });
        }),
        (t._isNavbarFixed = function e() {
          var t = i.default("body");
          return (
            t.hasClass("layout-navbar-fixed") ||
            t.hasClass("layout-sm-navbar-fixed") ||
            t.hasClass("layout-md-navbar-fixed") ||
            t.hasClass("layout-lg-navbar-fixed") ||
            t.hasClass("layout-xl-navbar-fixed")
          );
        }),
        (t._isFooterFixed = function e() {
          var t = i.default("body");
          return (
            t.hasClass("layout-footer-fixed") ||
            t.hasClass("layout-sm-footer-fixed") ||
            t.hasClass("layout-md-footer-fixed") ||
            t.hasClass("layout-lg-footer-fixed") ||
            t.hasClass("layout-xl-footer-fixed")
          );
        }),
        (t._fixScrollHeight = function e() {
          var t = i.default("body"),
            a = i.default(this._config.target);
          if (t.hasClass(et)) {
            var n = {
                scroll: i.default(document).height(),
                window: i.default(window).height(),
                header: i.default(K).outerHeight(),
                footer: i.default(X).outerHeight(),
              },
              o = {
                bottom: Math.abs(
                  n.window + i.default(window).scrollTop() - n.scroll
                ),
                top: i.default(window).scrollTop(),
              },
              l =
                this._isNavbarFixed() &&
                "fixed" === i.default(K).css("position"),
              s =
                this._isFooterFixed() &&
                "fixed" === i.default(X).css("position"),
              r = i.default(
                this._config.target + ", " + this._config.target + " " + G
              );
            if (0 === o.top && 0 === o.bottom)
              a.css({ bottom: n.footer, top: n.header }),
                r.css("height", n.window - (n.header + n.footer));
            else if (o.bottom <= n.footer) {
              if (!1 === s) {
                var f = n.header - o.top;
                a.css("bottom", n.footer - o.bottom).css("top", f >= 0 ? f : 0),
                  r.css("height", n.window - (n.footer - o.bottom));
              } else a.css("bottom", n.footer);
            } else
              o.top <= n.header
                ? !1 === l
                  ? (a.css("top", n.header - o.top),
                    r.css("height", n.window - (n.header - o.top)))
                  : a.css("top", n.header)
                : !1 === l
                ? (a.css("top", 0), r.css("height", n.window))
                : a.css("top", n.header);
            s && l
              ? (r.css("height", "100%"), a.css("height", ""))
              : (s || l) && (r.css("height", "100%"), r.css("height", ""));
          }
        }),
        (t._fixHeight = function e() {
          var t = i.default("body"),
            a = i.default(this._config.target + " " + G);
          if (!t.hasClass(et)) {
            a.attr("style", "");
            return;
          }
          var n = {
              window: i.default(window).height(),
              header: i.default(K).outerHeight(),
              footer: i.default(X).outerHeight(),
            },
            o = n.window - n.header;
          this._isFooterFixed() &&
            "fixed" === i.default(X).css("position") &&
            (o = n.window - n.header - n.footer),
            a.css("height", o),
            void 0 !== i.default.fn.overlayScrollbars &&
              a.overlayScrollbars({
                className: this._config.scrollbarTheme,
                sizeAutoCapable: !0,
                scrollbars: {
                  autoHide: this._config.scrollbarAutoHide,
                  clickScrolling: !0,
                },
              });
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(N),
              n = i.default.extend({}, ea, i.default(this).data());
            if (
              (t || ((t = new e(this, n)), i.default(this).data(N, t)),
              "undefined" === t[a])
            )
              throw Error(a + " is not a function");
            t[a]();
          });
        }),
        e
      );
    })();
  i.default(document).on("click", J, function (e) {
    e.preventDefault(), ei._jQueryInterface.call(i.default(this), "toggle");
  }),
    i.default(document).ready(function () {
      ei._jQueryInterface.call(i.default(J), "_init");
    }),
    (i.default.fn[q] = ei._jQueryInterface),
    (i.default.fn[q].Constructor = ei),
    (i.default.fn[q].noConflict = function () {
      return (i.default.fn[q] = P), ei._jQueryInterface;
    });
  var en = "DirectChat",
    eo = "lte.directchat",
    el = i.default.fn[en],
    es = "toggled." + eo,
    er = (function () {
      function e(e) {
        this._element = e;
      }
      return (
        (e.prototype.toggle = function e() {
          i
            .default(this._element)
            .parents(".direct-chat")
            .first()
            .toggleClass("direct-chat-contacts-open"),
            i.default(this._element).trigger(i.default.Event(es));
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(eo);
            t || ((t = new e(i.default(this))), i.default(this).data(eo, t)),
              t[a]();
          });
        }),
        e
      );
    })();
  i
    .default(document)
    .on("click", '[data-widget="chat-pane-toggle"]', function (e) {
      e && e.preventDefault(),
        er._jQueryInterface.call(i.default(this), "toggle");
    }),
    (i.default.fn[en] = er._jQueryInterface),
    (i.default.fn[en].Constructor = er),
    (i.default.fn[en].noConflict = function () {
      return (i.default.fn[en] = el), er._jQueryInterface;
    });
  var ef = "Dropdown",
    ed = "lte.dropdown",
    eu = i.default.fn[ef],
    ec = ".dropdown-menu",
    eh = '[data-toggle="dropdown"]',
    eg = {},
    ep = (function () {
      function e(e, t) {
        (this._config = t), (this._element = e);
      }
      var t = e.prototype;
      return (
        (t.toggleSubmenu = function e() {
          this._element.siblings().show().toggleClass("show"),
            this._element.next().hasClass("show") ||
              this._element
                .parents(ec)
                .first()
                .find(".show")
                .removeClass("show")
                .hide(),
            this._element
              .parents("li.nav-item.dropdown.show")
              .on("hidden.bs.dropdown", function () {
                i.default(".dropdown-submenu .show").removeClass("show").hide();
              });
        }),
        (t.fixPosition = function e() {
          var t = i.default(".dropdown-menu.show");
          if (0 !== t.length) {
            t.hasClass("dropdown-menu-right")
              ? t.css({ left: "inherit", right: 0 })
              : t.css({ left: 0, right: "inherit" });
            var a = t.offset(),
              n = t.width(),
              o = i.default(window).width() - a.left;
            a.left < 0
              ? t.css({ left: "inherit", right: a.left - 5 })
              : o < n && t.css({ left: "inherit", right: 0 });
          }
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(ed),
              n = i.default.extend({}, eg, i.default(this).data());
            t || ((t = new e(i.default(this), n)), i.default(this).data(ed, t)),
              ("toggleSubmenu" === a || "fixPosition" === a) && t[a]();
          });
        }),
        e
      );
    })();
  i.default(ec + " " + eh).on("click", function (e) {
    e.preventDefault(),
      e.stopPropagation(),
      ep._jQueryInterface.call(i.default(this), "toggleSubmenu");
  }),
    i.default(".navbar " + eh).on("click", function (e) {
      e.preventDefault(),
        i.default(e.target).parent().hasClass("dropdown-submenu") ||
          setTimeout(function () {
            ep._jQueryInterface.call(i.default(this), "fixPosition");
          }, 1);
    }),
    (i.default.fn[ef] = ep._jQueryInterface),
    (i.default.fn[ef].Constructor = ep),
    (i.default.fn[ef].noConflict = function () {
      return (i.default.fn[ef] = eu), ep._jQueryInterface;
    });
  var em = "ExpandableTable",
    ev = "lte.expandableTable",
    e8 = "." + ev,
    eb = i.default.fn[em],
    eC = "expanded" + e8,
    ey = "collapsed" + e8,
    ew = ".expandable-body",
    ex = '[data-widget="expandable-table"]',
    e$ = "aria-expanded",
    eI = (function () {
      function e(e, t) {
        (this._options = t), (this._element = e);
      }
      var t = e.prototype;
      return (
        (t.init = function e() {
          i.default(ex).each(function (e, t) {
            var a = i.default(t).attr(e$),
              n = i.default(t).next(ew).children().first().children();
            "true" === a
              ? n.show()
              : "false" === a &&
                (n.hide(), n.parent().parent().addClass("d-none"));
          });
        }),
        (t.toggleRow = function e() {
          var t = this._element;
          "TR" !== t[0].nodeName &&
            "TR" !== (t = t.parent())[0].nodeName &&
            (t = t.parent());
          var a = t.attr(e$),
            n = t.next(ew).children().first().children();
          n.stop(),
            "true" === a
              ? (n.slideUp(500, function () {
                  t.next(ew).addClass("d-none");
                }),
                t.attr(e$, "false"),
                t.trigger(i.default.Event(ey)))
              : "false" === a &&
                (t.next(ew).removeClass("d-none"),
                n.slideDown(500),
                t.attr(e$, "true"),
                t.trigger(i.default.Event(eC)));
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(ev);
            t || ((t = new e(i.default(this))), i.default(this).data(ev, t)),
              "string" == typeof a && /init|toggleRow/.test(a) && t[a]();
          });
        }),
        e
      );
    })();
  i.default(".expandable-table").ready(function () {
    eI._jQueryInterface.call(i.default(this), "init");
  }),
    i.default(document).on("click", ex, function () {
      eI._jQueryInterface.call(i.default(this), "toggleRow");
    }),
    (i.default.fn[em] = eI._jQueryInterface),
    (i.default.fn[em].Constructor = eI),
    (i.default.fn[em].noConflict = function () {
      return (i.default.fn[em] = eb), eI._jQueryInterface;
    });
  var eT = "Fullscreen",
    ej = "lte.fullscreen",
    eS = i.default.fn[eT],
    ek = '[data-widget="fullscreen"]',
    eQ = ek + " i",
    eH = {
      minimizeIcon: "fa-compress-arrows-alt",
      maximizeIcon: "fa-expand-arrows-alt",
    },
    ez = (function () {
      function e(e, t) {
        (this.element = e), (this.options = i.default.extend({}, eH, t));
      }
      var t = e.prototype;
      return (
        (t.toggle = function e() {
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
            ? this.windowed()
            : this.fullscreen();
        }),
        (t.toggleIcon = function e() {
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
            ? i
                .default(eQ)
                .removeClass(this.options.maximizeIcon)
                .addClass(this.options.minimizeIcon)
            : i
                .default(eQ)
                .removeClass(this.options.minimizeIcon)
                .addClass(this.options.maximizeIcon);
        }),
        (t.fullscreen = function e() {
          document.documentElement.requestFullscreen
            ? document.documentElement.requestFullscreen()
            : document.documentElement.webkitRequestFullscreen
            ? document.documentElement.webkitRequestFullscreen()
            : document.documentElement.msRequestFullscreen &&
              document.documentElement.msRequestFullscreen();
        }),
        (t.windowed = function e() {
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.webkitExitFullscreen
            ? document.webkitExitFullscreen()
            : document.msExitFullscreen && document.msExitFullscreen();
        }),
        (e._jQueryInterface = function t(a) {
          var n = i.default(this).data(ej);
          n || (n = i.default(this).data());
          var o = i.default.extend({}, eH, "object" == typeof a ? a : n),
            l = new e(i.default(this), o);
          i.default(this).data(ej, "object" == typeof a ? a : n),
            "string" == typeof a &&
            /toggle|toggleIcon|fullscreen|windowed/.test(a)
              ? l[a]()
              : l.init();
        }),
        e
      );
    })();
  i.default(document).on("click", ek, function () {
    ez._jQueryInterface.call(i.default(this), "toggle");
  }),
    i
      .default(document)
      .on(
        "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange",
        function () {
          ez._jQueryInterface.call(i.default(ek), "toggleIcon");
        }
      ),
    (i.default.fn[eT] = ez._jQueryInterface),
    (i.default.fn[eT].Constructor = ez),
    (i.default.fn[eT].noConflict = function () {
      return (i.default.fn[eT] = eS), ez._jQueryInterface;
    });
  var eE = "IFrame",
    eF = "lte.iframe",
    eD = i.default.fn[eE],
    eL = '[data-widget="iframe"]',
    e_ = '[data-widget="iframe-fullscreen"]',
    eA = ".content-wrapper",
    eR = eA + " iframe",
    eM = eA + ".iframe-mode .nav",
    eq = eA + ".iframe-mode .navbar-nav",
    eN = eq + " .nav-item",
    eO = eq + " .nav-link",
    e3 = eA + ".iframe-mode .tab-content",
    e0 = e3 + " .tab-empty",
    eP = e3 + " .tab-loading",
    e1 = e3 + " .tab-pane",
    eU = ".main-sidebar .nav-item > a.nav-link",
    eB = ".main-header .nav-item a.nav-link",
    e2 = ".main-header a.dropdown-item",
    e9 = "iframe-mode",
    eW = "iframe-mode-fullscreen",
    e6 = {
      onTabClick: function e(t) {
        return t;
      },
      onTabChanged: function e(t) {
        return t;
      },
      onTabCreated: function e(t) {
        return t;
      },
      autoIframeMode: !0,
      autoItemActive: !0,
      autoShowNewTab: !0,
      autoDarkMode: !1,
      allowDuplicates: !1,
      allowReload: !0,
      loadingScreen: !0,
      useNavbarItems: !0,
      scrollOffset: 40,
      scrollBehaviorSwap: !1,
      iconMaximize: "fa-expand",
      iconMinimize: "fa-compress",
    },
    e7 = (function () {
      function e(e, t) {
        (this._config = t), (this._element = e), this._init();
      }
      var t = e.prototype;
      return (
        (t.onTabClick = function e(t) {
          this._config.onTabClick(t);
        }),
        (t.onTabChanged = function e(t) {
          this._config.onTabChanged(t);
        }),
        (t.onTabCreated = function e(t) {
          this._config.onTabCreated(t);
        }),
        (t.createTab = function e(t, a, n, o) {
          var l = this,
            s = "panel-" + n,
            r = "tab-" + n;
          this._config.allowDuplicates &&
            ((s += "-" + Math.floor(1e3 * Math.random())),
            (r += "-" + Math.floor(1e3 * Math.random())));
          var f =
            '<li class="nav-item" role="presentation"><a href="#" class="btn-iframe-close" data-widget="iframe-close" data-type="only-this"><i class="fas fa-times"></i></a><a class="nav-link" data-toggle="row" id="' +
            r +
            '" href="#' +
            s +
            '" role="tab" aria-controls="' +
            s +
            '" aria-selected="false">' +
            t +
            "</a></li>";
          i.default(eq).append(unescape(escape(f)));
          var d =
            '<div class="tab-pane fade" id="' +
            s +
            '" role="tabpanel" aria-labelledby="' +
            r +
            '"><iframe src="' +
            a +
            '"></iframe></div>';
          if ((i.default(e3).append(unescape(escape(d))), o)) {
            if (this._config.loadingScreen) {
              var u = i.default(eP);
              u.fadeIn(),
                i.default(s + " iframe").ready(function () {
                  "number" == typeof l._config.loadingScreen
                    ? (l.switchTab("#" + r),
                      setTimeout(function () {
                        u.fadeOut();
                      }, l._config.loadingScreen))
                    : (l.switchTab("#" + r), u.fadeOut());
                });
            } else this.switchTab("#" + r);
          }
          this.onTabCreated(i.default("#" + r));
        }),
        (t.openTabSidebar = function e(t, a) {
          void 0 === a && (a = this._config.autoShowNewTab);
          var n = i.default(t).clone();
          void 0 === n.attr("href") && (n = i.default(t).parent("a").clone()),
            n.find(".right, .search-path").remove();
          var o = n.find("p").text();
          "" === o && (o = n.text());
          var l = n.attr("href");
          if ("#" !== l && "" !== l && void 0 !== l) {
            var s = unescape(l)
                .replace("./", "")
                .replace(/["#&'./:=?[\]]/gi, "-")
                .replace(/(--)/gi, ""),
              r = "tab-" + s;
            if (!this._config.allowDuplicates && i.default("#" + r).length > 0)
              return this.switchTab("#" + r, this._config.allowReload);
            ((!this._config.allowDuplicates &&
              0 === i.default("#" + r).length) ||
              this._config.allowDuplicates) &&
              this.createTab(o, l, s, a);
          }
        }),
        (t.switchTab = function e(t, a) {
          var n = this;
          void 0 === a && (a = !1);
          var o = i.default(t),
            l = o.attr("href");
          if ((i.default(e0).hide(), a)) {
            var s = i.default(eP);
            this._config.loadingScreen
              ? s.show(0, function () {
                  i.default(l + " iframe")
                    .attr("src", i.default(l + " iframe").attr("src"))
                    .ready(function () {
                      n._config.loadingScreen &&
                        ("number" == typeof n._config.loadingScreen
                          ? setTimeout(function () {
                              s.fadeOut();
                            }, n._config.loadingScreen)
                          : s.fadeOut());
                    });
                })
              : i
                  .default(l + " iframe")
                  .attr("src", i.default(l + " iframe").attr("src"));
          }
          i
            .default(eq + " .active")
            .tab("dispose")
            .removeClass("active"),
            this._fixHeight(),
            o.tab("show"),
            o.parents("li").addClass("active"),
            this.onTabChanged(o),
            this._config.autoItemActive &&
              this._setItemActive(i.default(l + " iframe").attr("src"));
        }),
        (t.removeActiveTab = function e(t, a) {
          if ("all" == t)
            i.default(eN).remove(),
              i.default(e1).remove(),
              i.default(e0).show();
          else if ("all-other" == t)
            i.default(eN + ":not(.active)").remove(),
              i.default(e1 + ":not(.active)").remove();
          else if ("only-this" == t) {
            var n = i.default(a),
              o = n.parent(".nav-item"),
              l = o.parent(),
              s = o.index(),
              r = n.siblings(".nav-link").attr("aria-controls");
            o.remove(),
              i.default("#" + r).remove(),
              i.default(e3).children().length ==
              i.default(e0 + ", " + eP).length
                ? i.default(e0).show()
                : this.switchTab(
                    l
                      .children()
                      .eq(s - 1)
                      .find("a.nav-link")
                  );
          } else {
            var f = i.default(eN + ".active"),
              d = f.parent(),
              u = f.index();
            f.remove(),
              i.default(e1 + ".active").remove(),
              i.default(e3).children().length ==
              i.default(e0 + ", " + eP).length
                ? i.default(e0).show()
                : this.switchTab(
                    d
                      .children()
                      .eq(u - 1)
                      .find("a.nav-link")
                  );
          }
        }),
        (t.toggleFullscreen = function e() {
          i.default("body").hasClass(eW)
            ? (i
                .default(e_ + " i")
                .removeClass(this._config.iconMinimize)
                .addClass(this._config.iconMaximize),
              i.default("body").removeClass(eW),
              i.default(e0 + ", " + eP).height("100%"),
              i.default(eA).height("100%"),
              i.default(eR).height("100%"))
            : (i
                .default(e_ + " i")
                .removeClass(this._config.iconMaximize)
                .addClass(this._config.iconMinimize),
              i.default("body").addClass(eW)),
            i.default(window).trigger("resize"),
            this._fixHeight(!0);
        }),
        (t._init = function e() {
          var t = i.default(e3).children().length > 2;
          if ((this._setupListeners(), this._fixHeight(!0), t)) {
            var a = i.default("" + e1).first();
            console.log(a);
            var n = a.attr("id").replace("panel-", "");
            this.switchTab("#tab-" + n, !0);
          }
        }),
        (t._initFrameElement = function e() {
          if (window.frameElement && this._config.autoIframeMode) {
            var t = i.default("body");
            t.addClass(e9),
              this._config.autoDarkMode && t.addClass("dark-mode");
          }
        }),
        (t._navScroll = function e(t) {
          var a = i.default(eq).scrollLeft();
          i.default(eq).animate({ scrollLeft: a + t }, 250, "linear");
        }),
        (t._setupListeners = function e() {
          var t = this;
          i.default(window).on("resize", function () {
            setTimeout(function () {
              t._fixHeight();
            }, 1);
          }),
            i.default(eA).hasClass(e9) &&
              (i
                .default(document)
                .on(
                  "click",
                  eU + ", .sidebar-search-results .list-group-item",
                  function (e) {
                    e.preventDefault(), t.openTabSidebar(e.target);
                  }
                ),
              this._config.useNavbarItems &&
                i.default(document).on("click", eB + ", " + e2, function (e) {
                  e.preventDefault(), t.openTabSidebar(e.target);
                })),
            i.default(document).on("click", eO, function (e) {
              e.preventDefault(), t.onTabClick(e.target), t.switchTab(e.target);
            }),
            i.default(document).on("click", eO, function (e) {
              e.preventDefault(), t.onTabClick(e.target), t.switchTab(e.target);
            }),
            i
              .default(document)
              .on("click", '[data-widget="iframe-close"]', function (e) {
                e.preventDefault();
                var a = e.target;
                "I" == a.nodeName && (a = e.target.offsetParent),
                  t.removeActiveTab(
                    a.attributes["data-type"]
                      ? a.attributes["data-type"].nodeValue
                      : null,
                    a
                  );
              }),
            i.default(document).on("click", e_, function (e) {
              e.preventDefault(), t.toggleFullscreen();
            });
          var a = !1,
            n = null;
          i
            .default(document)
            .on("mousedown", '[data-widget="iframe-scrollleft"]', function (e) {
              e.preventDefault(), clearInterval(n);
              var i = t._config.scrollOffset;
              t._config.scrollBehaviorSwap || (i = -i),
                (a = !0),
                t._navScroll(i),
                (n = setInterval(function () {
                  t._navScroll(i);
                }, 250));
            }),
            i
              .default(document)
              .on(
                "mousedown",
                '[data-widget="iframe-scrollright"]',
                function (e) {
                  e.preventDefault(), clearInterval(n);
                  var i = t._config.scrollOffset;
                  t._config.scrollBehaviorSwap && (i = -i),
                    (a = !0),
                    t._navScroll(i),
                    (n = setInterval(function () {
                      t._navScroll(i);
                    }, 250));
                }
              ),
            i.default(document).on("mouseup", function () {
              a && ((a = !1), clearInterval(n), (n = null));
            });
        }),
        (t._setItemActive = function e(t) {
          i.default(eU + ", " + e2).removeClass("active"),
            i.default(eB).parent().removeClass("active");
          var a = i.default(eB + '[href$="' + t + '"]'),
            n = i.default(e2 + '[href$="' + t + '"]'),
            o = i.default(eU + '[href$="' + t + '"]');
          a.each(function (e, t) {
            i.default(t).parent().addClass("active");
          }),
            n.each(function (e, t) {
              i.default(t).addClass("active");
            }),
            o.each(function (e, t) {
              i.default(t).addClass("active"),
                i
                  .default(t)
                  .parents(".nav-treeview")
                  .prevAll(".nav-link")
                  .addClass("active");
            });
        }),
        (t._fixHeight = function e(t) {
          if ((void 0 === t && (t = !1), i.default("body").hasClass(eW))) {
            var a = i.default(window).height(),
              n = i.default(eM).outerHeight();
            i.default(e0 + ", " + eP + ", " + eR).height(a - n),
              i.default(eA).height(a);
          } else {
            var o = parseFloat(i.default(eA).css("height")),
              l = i.default(eM).outerHeight();
            !0 == t
              ? setTimeout(function () {
                  i.default(e0 + ", " + eP).height(o - l);
                }, 50)
              : i.default(eR).height(o - l);
          }
        }),
        (e._jQueryInterface = function t(a) {
          if (i.default(eL).length > 0) {
            var n = i.default(this).data(eF);
            n || (n = i.default(this).data());
            var o = i.default.extend({}, e6, "object" == typeof a ? a : n);
            localStorage.setItem("AdminLTE:IFrame:Options", JSON.stringify(o));
            var l = new e(i.default(this), o);
            i.default(this).data(eF, "object" == typeof a ? a : n),
              "string" == typeof a &&
                /createTab|openTabSidebar|switchTab|removeActiveTab/.test(a) &&
                l[a]();
          } else
            new e(
              i.default(this),
              JSON.parse(localStorage.getItem("AdminLTE:IFrame:Options"))
            )._initFrameElement();
        }),
        e
      );
    })();
  i.default(window).on("load", function () {
    e7._jQueryInterface.call(i.default(eL));
  }),
    (i.default.fn[eE] = e7._jQueryInterface),
    (i.default.fn[eE].Constructor = e7),
    (i.default.fn[eE].noConflict = function () {
      return (i.default.fn[eE] = eD), e7._jQueryInterface;
    });
  var eV = "Layout",
    e5 = "lte.layout",
    eG = i.default.fn[eV],
    eJ = ".main-header",
    eK = ".main-sidebar",
    eX = ".main-sidebar .sidebar",
    eY = ".main-footer",
    eZ = "sidebar-focused",
    e4 = {
      scrollbarTheme: "os-theme-light",
      scrollbarAutoHide: "l",
      panelAutoHeight: !0,
      panelAutoHeightMode: "min-height",
      preloadDuration: 200,
      loginRegisterAutoHeight: !0,
    },
    te = (function () {
      function e(e, t) {
        (this._config = t), (this._element = e);
      }
      var t = e.prototype;
      return (
        (t.fixLayoutHeight = function e(t) {
          void 0 === t && (t = null);
          var a = i.default("body"),
            n = 0;
          (a.hasClass("control-sidebar-slide-open") ||
            a.hasClass("control-sidebar-open") ||
            "control_sidebar" === t) &&
            (n = i.default(".control-sidebar-content").outerHeight());
          var o = {
              window: i.default(window).height(),
              header:
                i.default(eJ).length > 0 ? i.default(eJ).outerHeight() : 0,
              footer:
                i.default(eY).length > 0 ? i.default(eY).outerHeight() : 0,
              sidebar: i.default(eX).length > 0 ? i.default(eX).height() : 0,
              controlSidebar: n,
            },
            l = this._max(o),
            s = this._config.panelAutoHeight;
          !0 === s && (s = 0);
          var r = i.default(".content-wrapper");
          !1 !== s &&
            (l === o.controlSidebar
              ? r.css(this._config.panelAutoHeightMode, l + s)
              : l === o.window
              ? r.css(
                  this._config.panelAutoHeightMode,
                  l + s - o.header - o.footer
                )
              : r.css(this._config.panelAutoHeightMode, l + s - o.header),
            this._isFooterFixed() &&
              r.css(
                this._config.panelAutoHeightMode,
                parseFloat(r.css(this._config.panelAutoHeightMode)) + o.footer
              )),
            a.hasClass("layout-fixed") &&
              (void 0 !== i.default.fn.overlayScrollbars
                ? i
                    .default(eX)
                    .overlayScrollbars({
                      className: this._config.scrollbarTheme,
                      sizeAutoCapable: !0,
                      scrollbars: {
                        autoHide: this._config.scrollbarAutoHide,
                        clickScrolling: !0,
                      },
                    })
                : i.default(eX).css("overflow-y", "auto"));
        }),
        (t.fixLoginRegisterHeight = function e() {
          var t = i.default("body"),
            a = i.default(".login-box, .register-box");
          if (t.hasClass("iframe-mode"))
            t.css("height", "100%"),
              i.default(".wrapper").css("height", "100%"),
              i.default("html").css("height", "100%");
          else if (0 === a.length)
            t.css("height", "auto"), i.default("html").css("height", "auto");
          else {
            var n = a.height();
            t.css(this._config.panelAutoHeightMode) !== n &&
              t.css(this._config.panelAutoHeightMode, n);
          }
        }),
        (t._init = function e() {
          var t = this;
          this.fixLayoutHeight(),
            !0 === this._config.loginRegisterAutoHeight
              ? this.fixLoginRegisterHeight()
              : this._config.loginRegisterAutoHeight ===
                  parseInt(this._config.loginRegisterAutoHeight, 10) &&
                setInterval(
                  this.fixLoginRegisterHeight,
                  this._config.loginRegisterAutoHeight
                ),
            i
              .default(eX)
              .on("collapsed.lte.treeview expanded.lte.treeview", function () {
                t.fixLayoutHeight();
              }),
            i.default(eK).on("mouseenter mouseleave", function () {
              i.default("body").hasClass("sidebar-collapse") &&
                t.fixLayoutHeight();
            }),
            i
              .default('[data-widget="pushmenu"]')
              .on("collapsed.lte.pushmenu shown.lte.pushmenu", function () {
                setTimeout(function () {
                  t.fixLayoutHeight();
                }, 300);
              }),
            i
              .default('[data-widget="control-sidebar"]')
              .on("collapsed.lte.controlsidebar", function () {
                t.fixLayoutHeight();
              })
              .on("expanded.lte.controlsidebar", function () {
                t.fixLayoutHeight("control_sidebar");
              }),
            i.default(window).resize(function () {
              t.fixLayoutHeight();
            }),
            setTimeout(function () {
              i.default("body.hold-transition").removeClass("hold-transition");
            }, 50),
            setTimeout(function () {
              var e = i.default(".preloader");
              e &&
                (e.css("height", 0),
                setTimeout(function () {
                  e.children().hide();
                }, 200));
            }, this._config.preloadDuration);
        }),
        (t._max = function e(t) {
          var a = 0;
          return (
            Object.keys(t).forEach(function (e) {
              t[e] > a && (a = t[e]);
            }),
            a
          );
        }),
        (t._isFooterFixed = function e() {
          return "fixed" === i.default(eY).css("position");
        }),
        (e._jQueryInterface = function t(a) {
          return (
            void 0 === a && (a = ""),
            this.each(function () {
              var t = i.default(this).data(e5),
                n = i.default.extend({}, e4, i.default(this).data());
              t ||
                ((t = new e(i.default(this), n)), i.default(this).data(e5, t)),
                "init" === a || "" === a
                  ? t._init()
                  : ("fixLayoutHeight" === a ||
                      "fixLoginRegisterHeight" === a) &&
                    t[a]();
            })
          );
        }),
        e
      );
    })();
  i.default(window).on("load", function () {
    te._jQueryInterface.call(i.default("body"));
  }),
    i
      .default(eX + " a")
      .on("focusin", function () {
        i.default(eK).addClass(eZ);
      })
      .on("focusout", function () {
        i.default(eK).removeClass(eZ);
      }),
    (i.default.fn[eV] = te._jQueryInterface),
    (i.default.fn[eV].Constructor = te),
    (i.default.fn[eV].noConflict = function () {
      return (i.default.fn[eV] = eG), te._jQueryInterface;
    });
  var tt = "PushMenu",
    ta = "lte.pushmenu",
    ti = "." + ta,
    tn = i.default.fn[tt],
    to = "collapsed" + ti,
    tl = "collapsed-done" + ti,
    ts = "shown" + ti,
    tr = '[data-widget="pushmenu"]',
    tf = "body",
    td = "sidebar-collapse",
    tu = "sidebar-open",
    tc = "sidebar-is-opening",
    th = "sidebar-closed",
    tg = {
      autoCollapseSize: 992,
      enableRemember: !1,
      noTransitionAfterReload: !0,
      animationSpeed: 300,
    },
    tp = (function () {
      function e(e, t) {
        (this._element = e),
          (this._options = i.default.extend({}, tg, t)),
          0 === i.default("#sidebar-overlay").length && this._addOverlay(),
          this._init();
      }
      var t = e.prototype;
      return (
        (t.expand = function e() {
          var t = i.default(tf);
          this._options.autoCollapseSize &&
            i.default(window).width() <= this._options.autoCollapseSize &&
            t.addClass(tu),
            t
              .addClass(tc)
              .removeClass(td + " " + th)
              .delay(50)
              .queue(function () {
                t.removeClass(tc), i.default(this).dequeue();
              }),
            this._options.enableRemember &&
              localStorage.setItem("remember" + ti, tu),
            i.default(this._element).trigger(i.default.Event(ts));
        }),
        (t.collapse = function e() {
          var t = this,
            a = i.default(tf);
          this._options.autoCollapseSize &&
            i.default(window).width() <= this._options.autoCollapseSize &&
            a.removeClass(tu).addClass(th),
            a.addClass(td),
            this._options.enableRemember &&
              localStorage.setItem("remember" + ti, td),
            i.default(this._element).trigger(i.default.Event(to)),
            setTimeout(function () {
              i.default(t._element).trigger(i.default.Event(tl));
            }, this._options.animationSpeed);
        }),
        (t.toggle = function e() {
          i.default(tf).hasClass(td) ? this.expand() : this.collapse();
        }),
        (t.autoCollapse = function e(t) {
          if ((void 0 === t && (t = !1), this._options.autoCollapseSize)) {
            var a = i.default(tf);
            i.default(window).width() <= this._options.autoCollapseSize
              ? a.hasClass(tu) || this.collapse()
              : !0 === t &&
                (a.hasClass(tu)
                  ? a.removeClass(tu)
                  : a.hasClass(th) && this.expand());
          }
        }),
        (t.remember = function e() {
          if (this._options.enableRemember) {
            var t = i.default("body");
            localStorage.getItem("remember" + ti) === td
              ? this._options.noTransitionAfterReload
                ? t
                    .addClass("hold-transition")
                    .addClass(td)
                    .delay(50)
                    .queue(function () {
                      i.default(this).removeClass("hold-transition"),
                        i.default(this).dequeue();
                    })
                : t.addClass(td)
              : this._options.noTransitionAfterReload
              ? t
                  .addClass("hold-transition")
                  .removeClass(td)
                  .delay(50)
                  .queue(function () {
                    i.default(this).removeClass("hold-transition"),
                      i.default(this).dequeue();
                  })
              : t.removeClass(td);
          }
        }),
        (t._init = function e() {
          var t = this;
          this.remember(),
            this.autoCollapse(),
            i.default(window).resize(function () {
              t.autoCollapse(!0);
            });
        }),
        (t._addOverlay = function e() {
          var t = this,
            a = i.default("<div />", { id: "sidebar-overlay" });
          a.on("click", function () {
            t.collapse();
          }),
            i.default(".wrapper").append(a);
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(ta),
              n = i.default.extend({}, tg, i.default(this).data());
            t || ((t = new e(this, n)), i.default(this).data(ta, t)),
              "string" == typeof a &&
                /collapse|expand|toggle/.test(a) &&
                t[a]();
          });
        }),
        e
      );
    })();
  i.default(document).on("click", tr, function (e) {
    e.preventDefault();
    var t = e.currentTarget;
    "pushmenu" !== i.default(t).data("widget") &&
      (t = i.default(t).closest(tr)),
      tp._jQueryInterface.call(i.default(t), "toggle");
  }),
    i.default(window).on("load", function () {
      tp._jQueryInterface.call(i.default(tr));
    }),
    (i.default.fn[tt] = tp._jQueryInterface),
    (i.default.fn[tt].Constructor = tp),
    (i.default.fn[tt].noConflict = function () {
      return (i.default.fn[tt] = tn), tp._jQueryInterface;
    });
  var tm = "SidebarSearch",
    tv = "lte.sidebar-search",
    t8 = i.default.fn[tm],
    tb = "sidebar-search-open",
    tC = "fa-search",
    ty = "fa-times",
    tw = "sidebar-search-results",
    tx = "list-group",
    t$ = '[data-widget="sidebar-search"]',
    tI = t$ + " .form-control",
    tT = t$ + " .btn",
    tj = tT + " i",
    tS = "." + tx,
    tk = "." + tw,
    tQ = tk + " ." + tx,
    tH = {
      arrowSign: "->",
      minLength: 3,
      maxResults: 7,
      highlightName: !0,
      highlightPath: !1,
      highlightClass: "text-light",
      notFoundText: "No element found!",
    },
    tz = [],
    tE = (function () {
      function e(e, t) {
        (this.element = e),
          (this.options = i.default.extend({}, tH, t)),
          (this.items = []);
      }
      var a = e.prototype;
      return (
        (a.init = function e() {
          var t = this;
          0 !== i.default(t$).length &&
            (0 === i.default(t$).next(tk).length &&
              i.default(t$).after(i.default("<div />", { class: tw })),
            0 === i.default(tk).children(tS).length &&
              i.default(tk).append(i.default("<div />", { class: tx })),
            this._addNotFound(),
            i
              .default(".main-sidebar .nav-sidebar")
              .children()
              .each(function (e, a) {
                t._parseItem(a);
              }));
        }),
        (a.search = function e() {
          var t = this,
            a = i.default(tI).val().toLowerCase();
          if (a.length < this.options.minLength) {
            i.default(tQ).empty(), this._addNotFound(), this.close();
            return;
          }
          var n = tz.filter(function (e) {
              return e.name.toLowerCase().includes(a);
            }),
            o = i.default(n.slice(0, this.options.maxResults));
          i.default(tQ).empty(),
            0 === o.length
              ? this._addNotFound()
              : o.each(function (e, a) {
                  i.default(tQ).append(
                    t._renderItem(escape(a.name), encodeURI(a.link), a.path)
                  );
                }),
            this.open();
        }),
        (a.open = function e() {
          i.default(t$).parent().addClass(tb),
            i.default(tj).removeClass(tC).addClass(ty);
        }),
        (a.close = function e() {
          i.default(t$).parent().removeClass(tb),
            i.default(tj).removeClass(ty).addClass(tC);
        }),
        (a.toggle = function e() {
          i.default(t$).parent().hasClass(tb) ? this.close() : this.open();
        }),
        (a._parseItem = function e(t, a) {
          var n = this;
          if (
            (void 0 === a && (a = []), !i.default(t).hasClass("nav-header"))
          ) {
            var o = {},
              l = i.default(t).clone().find("> .nav-link"),
              s = i.default(t).clone().find("> .nav-treeview"),
              r = l.attr("href"),
              f = l.find("p").children().remove().end().text();
            if (
              ((o.name = this._trimText(f)),
              (o.link = r),
              (o.path = a),
              0 === s.length)
            )
              tz.push(o);
            else {
              var d = o.path.concat([o.name]);
              s.children().each(function (e, t) {
                n._parseItem(t, d);
              });
            }
          }
        }),
        (a._trimText = function e(a) {
          return t.trim(a.replace(/(\r\n|\n|\r)/gm, " "));
        }),
        (a._renderItem = function e(t, a, n) {
          var o = this;
          if (
            ((n = n.join(" " + this.options.arrowSign + " ")),
            (t = unescape(t)),
            (a = decodeURI(a)),
            this.options.highlightName || this.options.highlightPath)
          ) {
            var l = i.default(tI).val().toLowerCase(),
              s = RegExp(l, "gi");
            this.options.highlightName &&
              (t = t.replace(s, function (e) {
                return (
                  '<strong class="' +
                  o.options.highlightClass +
                  '">' +
                  e +
                  "</strong>"
                );
              })),
              this.options.highlightPath &&
                (n = n.replace(s, function (e) {
                  return (
                    '<strong class="' +
                    o.options.highlightClass +
                    '">' +
                    e +
                    "</strong>"
                  );
                }));
          }
          var r = i.default("<a/>", {
              href: decodeURIComponent(a),
              class: "list-group-item",
            }),
            f = i.default("<div/>", { class: "search-title" }).html(t),
            d = i.default("<div/>", { class: "search-path" }).html(n);
          return r.append(f).append(d), r;
        }),
        (a._addNotFound = function e() {
          i.default(tQ).append(
            this._renderItem(this.options.notFoundText, "#", [])
          );
        }),
        (e._jQueryInterface = function t(a) {
          var n = i.default(this).data(tv);
          n || (n = i.default(this).data());
          var o = i.default.extend({}, tH, "object" == typeof a ? a : n),
            l = new e(i.default(this), o);
          i.default(this).data(tv, "object" == typeof a ? a : n),
            "string" == typeof a && /init|toggle|close|open|search/.test(a)
              ? l[a]()
              : l.init();
        }),
        e
      );
    })();
  i.default(document).on("click", tT, function (e) {
    e.preventDefault(), tE._jQueryInterface.call(i.default(t$), "toggle");
  }),
    i.default(document).on("keyup", tI, function (e) {
      if (38 == e.keyCode) {
        e.preventDefault(), i.default(tQ).children().last().focus();
        return;
      }
      if (40 == e.keyCode) {
        e.preventDefault(), i.default(tQ).children().first().focus();
        return;
      }
      setTimeout(function () {
        tE._jQueryInterface.call(i.default(t$), "search");
      }, 100);
    }),
    i.default(document).on("keydown", tQ, function (e) {
      var t = i.default(":focus");
      38 == e.keyCode &&
        (e.preventDefault(),
        t.is(":first-child") ? t.siblings().last().focus() : t.prev().focus()),
        40 == e.keyCode &&
          (e.preventDefault(),
          t.is(":last-child")
            ? t.siblings().first().focus()
            : t.next().focus());
    }),
    i.default(window).on("load", function () {
      tE._jQueryInterface.call(i.default(t$), "init");
    }),
    (i.default.fn[tm] = tE._jQueryInterface),
    (i.default.fn[tm].Constructor = tE),
    (i.default.fn[tm].noConflict = function () {
      return (i.default.fn[tm] = t8), tE._jQueryInterface;
    });
  var tF = "NavbarSearch",
    tD = "lte.navbar-search",
    tL = i.default.fn[tF],
    t_ = '[data-widget="navbar-search"]',
    tA = ".form-control",
    tR = "navbar-search-open",
    tM = { resetOnClose: !0, target: ".navbar-search-block" },
    tq = (function () {
      function e(e, t) {
        (this._element = e), (this._config = i.default.extend({}, tM, t));
      }
      var t = e.prototype;
      return (
        (t.open = function e() {
          i
            .default(this._config.target)
            .css("display", "flex")
            .hide()
            .fadeIn()
            .addClass(tR),
            i.default(this._config.target + " " + tA).focus();
        }),
        (t.close = function e() {
          i.default(this._config.target).fadeOut().removeClass(tR),
            this._config.resetOnClose &&
              i.default(this._config.target + " " + tA).val("");
        }),
        (t.toggle = function e() {
          i.default(this._config.target).hasClass(tR)
            ? this.close()
            : this.open();
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(tD),
              n = i.default.extend({}, tM, i.default(this).data());
            if (
              (t || ((t = new e(this, n)), i.default(this).data(tD, t)),
              !/toggle|close|open/.test(a))
            )
              throw Error("Undefined method " + a);
            t[a]();
          });
        }),
        e
      );
    })();
  i.default(document).on("click", t_, function (e) {
    e.preventDefault();
    var t = i.default(e.currentTarget);
    "navbar-search" !== t.data("widget") && (t = t.closest(t_)),
      tq._jQueryInterface.call(t, "toggle");
  }),
    (i.default.fn[tF] = tq._jQueryInterface),
    (i.default.fn[tF].Constructor = tq),
    (i.default.fn[tF].noConflict = function () {
      return (i.default.fn[tF] = tL), tq._jQueryInterface;
    });
  var tN = "Toasts",
    tO = ".lte.toasts",
    t3 = i.default.fn[tN],
    t0 = "init" + tO,
    tP = "created" + tO,
    t1 = "removed" + tO,
    tU = "topRight",
    tB = "topLeft",
    t2 = "bottomRight",
    t9 = "bottomLeft",
    tW = {
      position: tU,
      fixed: !0,
      autohide: !1,
      autoremove: !0,
      delay: 1e3,
      fade: !0,
      icon: null,
      image: null,
      imageAlt: null,
      imageHeight: "25px",
      title: null,
      subtitle: null,
      close: !0,
      body: null,
      class: null,
    },
    t6 = (function () {
      function e(e, t) {
        (this._config = t),
          this._prepareContainer(),
          i.default("body").trigger(i.default.Event(t0));
      }
      var t = e.prototype;
      return (
        (t.create = function e() {
          var t = i.default(
            '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>'
          );
          t.data("autohide", this._config.autohide),
            t.data("animation", this._config.fade),
            this._config.class && t.addClass(this._config.class),
            this._config.delay &&
              500 != this._config.delay &&
              t.data("delay", this._config.delay);
          var a = i.default('<div class="toast-header">');
          if (null != this._config.image) {
            var n = i
              .default("<img />")
              .addClass("rounded mr-2")
              .attr("src", this._config.image)
              .attr("alt", this._config.imageAlt);
            null != this._config.imageHeight &&
              n.height(this._config.imageHeight).width("auto"),
              a.append(n);
          }
          if (
            (null != this._config.icon &&
              a.append(
                i.default("<i />").addClass("mr-2").addClass(this._config.icon)
              ),
            null != this._config.title &&
              a.append(
                i
                  .default("<strong />")
                  .addClass("mr-auto")
                  .html(this._config.title)
              ),
            null != this._config.subtitle &&
              a.append(i.default("<small />").html(this._config.subtitle)),
            !0 == this._config.close)
          ) {
            var o = i
              .default('<button data-dismiss="toast" />')
              .attr("type", "button")
              .addClass("ml-2 mb-1 close")
              .attr("aria-label", "Close")
              .append('<span aria-hidden="true">&times;</span>');
            null == this._config.title && o.toggleClass("ml-2 ml-auto"),
              a.append(o);
          }
          t.append(a),
            null != this._config.body &&
              t.append(
                i.default('<div class="toast-body" />').html(this._config.body)
              ),
            i.default(this._getContainerId()).prepend(t);
          var l = i.default("body");
          l.trigger(i.default.Event(tP)),
            t.toast("show"),
            this._config.autoremove &&
              t.on("hidden.bs.toast", function () {
                i.default(this).delay(200).remove(),
                  l.trigger(i.default.Event(t1));
              });
        }),
        (t._getContainerId = function e() {
          return this._config.position == tU
            ? "#toastsContainerTopRight"
            : this._config.position == tB
            ? "#toastsContainerTopLeft"
            : this._config.position == t2
            ? "#toastsContainerBottomRight"
            : this._config.position == t9
            ? "#toastsContainerBottomLeft"
            : void 0;
        }),
        (t._prepareContainer = function e() {
          if (0 === i.default(this._getContainerId()).length) {
            var t = i
              .default("<div />")
              .attr("id", this._getContainerId().replace("#", ""));
            this._config.position == tU
              ? t.addClass("toasts-top-right")
              : this._config.position == tB
              ? t.addClass("toasts-top-left")
              : this._config.position == t2
              ? t.addClass("toasts-bottom-right")
              : this._config.position == t9 && t.addClass("toasts-bottom-left"),
              i.default("body").append(t);
          }
          this._config.fixed
            ? i.default(this._getContainerId()).addClass("fixed")
            : i.default(this._getContainerId()).removeClass("fixed");
        }),
        (e._jQueryInterface = function t(a, n) {
          return this.each(function () {
            var t = i.default.extend({}, tW, n),
              o = new e(i.default(this), t);
            "create" === a && o[a]();
          });
        }),
        e
      );
    })();
  (i.default.fn[tN] = t6._jQueryInterface),
    (i.default.fn[tN].Constructor = t6),
    (i.default.fn[tN].noConflict = function () {
      return (i.default.fn[tN] = t3), t6._jQueryInterface;
    });
  var t7 = "TodoList",
    tV = "lte.todolist",
    t5 = i.default.fn[t7],
    tG = "done",
    tJ = {
      onCheck: function e(t) {
        return t;
      },
      onUnCheck: function e(t) {
        return t;
      },
    },
    tK = (function () {
      function e(e, t) {
        (this._config = t), (this._element = e), this._init();
      }
      var t = e.prototype;
      return (
        (t.toggle = function e(t) {
          if (
            (t.parents("li").toggleClass(tG), !i.default(t).prop("checked"))
          ) {
            this.unCheck(i.default(t));
            return;
          }
          this.check(t);
        }),
        (t.check = function e(t) {
          this._config.onCheck.call(t);
        }),
        (t.unCheck = function e(t) {
          this._config.onUnCheck.call(t);
        }),
        (t._init = function e() {
          var t = this,
            a = this._element;
          a.find("input:checkbox:checked").parents("li").toggleClass(tG),
            a.on("change", "input:checkbox", function (e) {
              t.toggle(i.default(e.target));
            });
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(tV);
            t || (t = i.default(this).data());
            var n = i.default.extend({}, tJ, "object" == typeof a ? a : t),
              o = new e(i.default(this), n);
            i.default(this).data(tV, "object" == typeof a ? a : t),
              "init" === a && o[a]();
          });
        }),
        e
      );
    })();
  i.default(window).on("load", function () {
    tK._jQueryInterface.call(i.default('[data-widget="todo-list"]'));
  }),
    (i.default.fn[t7] = tK._jQueryInterface),
    (i.default.fn[t7].Constructor = tK),
    (i.default.fn[t7].noConflict = function () {
      return (i.default.fn[t7] = t5), tK._jQueryInterface;
    });
  var tX = "Treeview",
    tY = "lte.treeview",
    tZ = "." + tY,
    t4 = i.default.fn[tX],
    ae = "expanded" + tZ,
    at = "collapsed" + tZ,
    aa = ".nav-item",
    ai = ".nav-treeview",
    an = ".menu-open",
    ao = '[data-widget="treeview"]',
    al = "menu-open",
    as = "menu-is-opening",
    ar = {
      trigger: ao + " .nav-link",
      animationSpeed: 300,
      accordion: !0,
      expandSidebar: !1,
      sidebarButtonSelector: '[data-widget="pushmenu"]',
    },
    af = (function () {
      function e(e, t) {
        (this._config = t), (this._element = e);
      }
      var t = e.prototype;
      return (
        (t.init = function e() {
          i.default("" + aa + an + " " + ai + an).css("display", "block"),
            this._setupListeners();
        }),
        (t.expand = function e(t, a) {
          var n = this,
            o = i.default.Event(ae);
          if (this._config.accordion) {
            var l = a.siblings(an).first(),
              s = l.find(ai).first();
            this.collapse(s, l);
          }
          a.addClass(as),
            t.stop().slideDown(this._config.animationSpeed, function () {
              a.addClass(al), i.default(n._element).trigger(o);
            }),
            this._config.expandSidebar && this._expandSidebar();
        }),
        (t.collapse = function e(t, a) {
          var n = this,
            o = i.default.Event(at);
          a.removeClass(as + " " + al),
            t.stop().slideUp(this._config.animationSpeed, function () {
              i.default(n._element).trigger(o),
                t.find(an + " > " + ai).slideUp(),
                t.find(an).removeClass(as + " " + al);
            });
        }),
        (t.toggle = function e(t) {
          var a = i.default(t.currentTarget),
            n = a.parent(),
            o = n.find("> " + ai);
          if (
            o.is(ai) ||
            (n.is(aa) || (o = n.parent().find("> " + ai)), o.is(ai))
          ) {
            t.preventDefault();
            var l = a.parents(aa).first();
            l.hasClass(al)
              ? this.collapse(i.default(o), l)
              : this.expand(i.default(o), l);
          }
        }),
        (t._setupListeners = function e() {
          var t = this,
            a =
              void 0 !== this._element.attr("id")
                ? "#" + this._element.attr("id")
                : "";
          i.default(document).on(
            "click",
            "" + a + this._config.trigger,
            function (e) {
              t.toggle(e);
            }
          );
        }),
        (t._expandSidebar = function e() {
          i.default("body").hasClass("sidebar-collapse") &&
            i.default(this._config.sidebarButtonSelector).PushMenu("expand");
        }),
        (e._jQueryInterface = function t(a) {
          return this.each(function () {
            var t = i.default(this).data(tY),
              n = i.default.extend({}, ar, i.default(this).data());
            t || ((t = new e(i.default(this), n)), i.default(this).data(tY, t)),
              "init" === a && t[a]();
          });
        }),
        e
      );
    })();
  i.default(window).on("load" + tZ, function () {
    i.default(ao).each(function () {
      af._jQueryInterface.call(i.default(this), "init");
    });
  }),
    (i.default.fn[tX] = af._jQueryInterface),
    (i.default.fn[tX].Constructor = af),
    (i.default.fn[tX].noConflict = function () {
      return (i.default.fn[tX] = t4), af._jQueryInterface;
    }),
    (e.CardRefresh = p),
    (e.CardWidget = M),
    (e.ControlSidebar = ei),
    (e.DirectChat = er),
    (e.Dropdown = ep),
    (e.ExpandableTable = eI),
    (e.Fullscreen = ez),
    (e.IFrame = e7),
    (e.Layout = te),
    (e.NavbarSearch = tq),
    (e.PushMenu = tp),
    (e.SidebarSearch = tE),
    (e.Toasts = t6),
    (e.TodoList = tK),
    (e.Treeview = af),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
