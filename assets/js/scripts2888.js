!function(NioApp) {
    "use strict";
    let nav = {
        classes: {
            main: "nk-nav",
            item: "nk-nav-item",
            link: "nk-nav-link",
            toggle: "nk-nav-toggle",
            sub: "nk-nav-sub",
            subparent: "has-sub",
            active: "active",
            current: "current-page"
        }
    };
    NioApp.Dropdown = {
        load: function(e, t) {
            let o = e.parentElement;
            o.classList.contains(t) || o.classList.add(t)
        },
        toggle: function(e, t) {
            let o = e.parentElement
              , n = e.nextElementSibling
              , a = n.children.length > 5 ? 400 + 10 * n.children.length : 400;
            o.classList.contains(t) ? (o.classList.remove(t),
            NioApp.SlideUp(n, a)) : (o.classList.add(t),
            NioApp.SlideDown(n, a))
        },
        closeSiblings: function(e, t, o, n) {
            let a = e.parentElement
              , s = a.parentElement.children;
            Array.from(s).forEach(e => {
                if (e !== a && (e.classList.remove(t),
                e.classList.contains(o))) {
                    e.querySelectorAll("." + n).forEach(e => {
                        e.parentElement.classList.remove(t),
                        NioApp.SlideUp(e, 400)
                    }
                    )
                }
            }
            )
        }
    },
    NioApp.Dropdown.header = function(selector) {
        const elm = document.querySelectorAll(selector);
        let active = nav.classes.active
          , subparent = nav.classes.subparent
          , submenu = nav.classes.sub
          , navbarCollapse = NioApp.body.dataset.navbarCollapse ? NioApp.body.dataset.navbarCollapse : NioApp.Break.lg;
        elm.forEach(item => {
            NioApp.Dropdown.load(item, subparent),
            item.addEventListener("click", (function(e) {
                e.preventDefault(),
                NioApp.Win.width < eval("NioApp.Break." + navbarCollapse) && (NioApp.Dropdown.toggle(item, active),
                NioApp.Dropdown.closeSiblings(item, active, subparent, submenu))
            }
            ))
        }
        )
    }
    ;
    let navbar = {
        classes: {
            base: "nk-navbar",
            toggle: "navbar-toggle",
            toggleActive: "active",
            active: "navbar-active",
            overlay: "navbar-overlay",
            body: "navbar-shown"
        },
        break: {
            main: NioApp.body.dataset.navbarCollapse ? eval("NioApp.Break." + NioApp.body.dataset.navbarCollapse) : NioApp.Break.lg
        }
    };
    NioApp.Navbar = {
        show: function(e, t) {
            e.forEach(e => {
                e.classList.add(navbar.classes.toggleActive)
            }
            ),
            t.classList.add(navbar.classes.active),
            NioApp.body.classList.add(navbar.classes.body);
            let o = `<div class='${navbar.classes.overlay}'></div>`;
            t.insertAdjacentHTML("beforebegin", o)
        },
        hide: function(e, t) {
            e.forEach(e => {
                e.classList.remove(navbar.classes.toggleActive)
            }
            ),
            t.classList.remove(navbar.classes.active),
            NioApp.body.classList.remove(navbar.classes.body);
            let o = document.querySelector("." + navbar.classes.overlay);
            setTimeout( () => {
                o && o.remove()
            }
            , 400)
        },
        mobile: function(e) {
            navbar.break.main < NioApp.Win.width ? e.classList.remove("navbar-mobile") : setTimeout( () => {
                e.classList.add("navbar-mobile")
            }
            , 500)
        },
        sticky: function(e) {
            let t = document.querySelectorAll(e);
            t.length > 0 && t.forEach(e => {
                let t = e.offsetTop;
                window.addEventListener("scroll", (function() {
                    window.scrollY > t ? e.classList.add("has-fixed") : e.classList.remove("has-fixed")
                }
                ))
            }
            )
        }
    },
    NioApp.Navbar.init = function() {
        let e = document.querySelector("." + navbar.classes.base)
          , t = document.querySelectorAll("." + navbar.classes.toggle);
        t.forEach(o => {
            NioApp.Navbar.mobile(e),
            o.addEventListener("click", (function(o) {
                o.preventDefault(),
                navbar.break.main > NioApp.Win.width && (e.classList.contains(navbar.classes.active) ? NioApp.Navbar.hide(t, e) : NioApp.Navbar.show(t, e))
            }
            )),
            window.addEventListener("resize", (function(o) {
                navbar.break.main < NioApp.Win.width && NioApp.Navbar.hide(t, e),
                NioApp.Navbar.mobile(e)
            }
            )),
            document.addEventListener("mouseup", (function(o) {
                null === o.target.closest("." + navbar.classes.base) && NioApp.Navbar.hide(t, e)
            }
            ))
        }
        ),
        NioApp.Navbar.sticky(".nk-header .nk-header-main")
    }
    ,
    NioApp.CurrentLink = function(e, t, o, n, a, s) {
        let i = document.querySelectorAll(e)
          , r = document.location.href
          , l = r.substring(0, -1 == r.indexOf("#") ? r.length : r.indexOf("#"))
          , c = l.substring(0, -1 == l.indexOf("?") ? l.length : l.indexOf("?"));
        i.forEach((function(e) {
            var i = e.getAttribute("href");
            if (c.match(i)) {
                NioApp.getParents(e, "." + n, t).forEach(e => {
                    e.classList.add(...a);
                    let t = e.querySelector("." + o);
                    null !== t && (t.style.display = "block")
                }
                ),
                s && e.scrollIntoView({
                    block: "end"
                })
            } else
                e.parentElement.classList.remove(...a)
        }
        ))
    }
    ,
    NioApp.Addons.swiperCarousel = function(e) {
        let t = document.querySelectorAll(e);
        t.length > 0 && t.forEach(e => {
            let t = e
              , o = t.dataset.breakpoints ? JSON.parse(t.dataset.breakpoints) : null
              , n = !!t.dataset.autoplay && JSON.parse(t.dataset.autoplay)
              , a = !!t.dataset.loop && JSON.parse(t.dataset.loop)
              , s = !!t.dataset.centeredslides && JSON.parse(t.dataset.centeredslides)
              , i = t.dataset.slidesperview ? t.dataset.slidesperview : ""
              , r = t.dataset.speed ? parseInt(t.dataset.speed) : 900
              , l = t.dataset.spaceBetween ? parseInt(t.dataset.spaceBetween) : 0
              , c = t.dataset.effect ? t.dataset.effect : "slide";
            new Swiper(t,{
                centeredSlides: s,
                slidesPerView: i,
                loop: a,
                speed: r,
                autoplay: n,
                spaceBetween: l,
                effect: c,
                freeMode: !1,
                pagination: {
                    el: t.querySelectorAll(".swiper-pagination")[0],
                    type: "bullets",
                    clickable: !0
                },
                navigation: {
                    prevEl: t.querySelectorAll(".swiper-button-prev")[0],
                    nextEl: t.querySelectorAll(".swiper-button-next")[0],
                    clickable: !0
                },
                breakpoints: o
            })
        }
        )
    }
    ,
    NioApp.Addons.swiperThumbs = function(e, t) {
        var o = new Swiper(e,{
            loop: !0,
            freeMode: !0,
            centeredSlides: !0,
            watchSlidesProgress: !1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                0: {
                    spaceBetween: 12,
                    slidesPerView: 3
                },
                992: {
                    spaceBetween: 24,
                    slidesPerView: 4
                }
            }
        });
        new Swiper(t,{
            loop: !0,
            spaceBetween: 24,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            thumbs: {
                swiper: o
            }
        })
    }
    ,
    NioApp.Addons.parallax = function(e) {
        let t = document.querySelectorAll(e);
        t.length > 0 && t.forEach(e => {
            let t = !e.dataset.background || !JSON.parse(e.dataset.background)
              , o = e.dataset.delay ? parseInt(e.dataset.delay) : 0
              , n = e.dataset.scale ? parseFloat(e.dataset.scale) : 1.4
              , a = e.dataset.orientation ? e.dataset.orientation : "down"
              , s = e.dataset.transition ? e.dataset.transition : "cubic-bezier(0,0,0,1)";
            new simpleParallax(e,{
                delay: o,
                orientation: a,
                scale: n,
                overflow: t,
                transition: s
            })
        }
        )
    }
    ,
    NioApp.Addons.aos = function() {
        AOS.init({
            disable: !1,
            startEvent: "DOMContentLoaded",
            initClassName: "aos-init",
            animatedClassName: "aos-animate",
            useClassNames: !1,
            disableMutationObserver: !1,
            debounceDelay: 50,
            throttleDelay: 60,
            offset: 0,
            delay: 0,
            duration: 900,
            easing: "ease",
            once: !0,
            mirror: !1,
            anchorPlacement: "top-bottom"
        }),
        AOS.refresh()
    }
    ,
    NioApp.Custom.priceToggle = function(e, t) {
        let o = document.querySelectorAll(e)
          , n = document.querySelectorAll(t);
        o && o.forEach(e => {
            e.addEventListener("click", (function() {
                n.forEach(e => {
                    e.classList.toggle("is-active")
                }
                )
            }
            ))
        }
        )
    }
    ,
    NioApp.Custom.characterCounter = function(e, t, o, n) {
        let a, s = document.getElementById(e), i = document.getElementById(t), r = document.getElementById(o), l = document.getElementById(n);
        null !== r && (a = r.dataset.charMax,
        r.innerHTML = a);
        const c = () => {
            let e = 0 + s.value.length;
            i.textContent = e,
            l.disabled = !1,
            e > a ? (i.style.color = "red",
            l.disabled = !0) : i.style.color = e > 240 ? "orange" : 0 == e ? "#8094ae" : "#2a3962"
        }
        ;
        null !== s && s.addEventListener("input", c)
    }
    ,
    NioApp.Custom.showHidePassword = function(e) {
        let t = document.querySelectorAll(e);
        t && t.forEach(e => {
            e.addEventListener("click", (function(t) {
                t.preventDefault();
                let o = document.getElementById(e.getAttribute("href"));
                "password" == o.type ? (o.type = "text",
                e.classList.add("is-shown")) : (o.type = "password",
                e.classList.remove("is-shown"))
            }
            ))
        }
        )
    }
    ,
    NioApp.Custom.backToTop = function(e) {
        let t = document.querySelector(e);
        window.addEventListener("scroll", () => {
            window.scrollY > 60 ? t.classList.add("active") : t.classList.remove("active")
        }
        )
    }
    ,
    NioApp.Custom.dropdownSelectMenu = function() {
        Array.from(document.querySelectorAll(".nk-dropdown")).forEach(e => {
            const t = e.querySelector(".nk-dropdown-field")
              , o = e.querySelector(".nk-dropdown-filter-selected");
            Array.from(e.querySelectorAll(".nk-dropdown-select-option")).forEach(e => {
                e.addEventListener("click", () => {
                    o.innerHTML = e.innerHTML
                }
                )
            }
            ),
            document.addEventListener("click", e => {
                const o = e.target;
                if (o === t)
                    return;
                o.closest(".nk-dropdown") || (t.checked = !1)
            }
            )
        }
        )
    }
    ,
    NioApp.Custom.Clipboard = function(e) {
        let t = document.querySelectorAll(e);
        if (t) {
            let o = {
                tooltip: {
                    selector: e.slice(1) + "-tooltip",
                    init: "Copy",
                    success: "Copied"
                },
                icon: {
                    init: "copy",
                    success: "copy-fill"
                }
            };
            t.forEach(e => {
                let t = new ClipboardJS(e)
                  , n = `<span class="fs-6 fw-medium">${o.tooltip.init}</span>`
                  , a = `<span class="fs-6 fw-medium text-success">${o.tooltip.success}</span>`;
                e.innerHTML = n,
                t.on("success", (function(e) {
                    let t = e.trigger;
                    t.innerHTML = a,
                    setTimeout((function() {
                        t.innerHTML = n
                    }
                    ), 1e3)
                }
                ))
            }
            )
        }
    }
    ,
    NioApp.Custom.setbgImage = function(e) {
        document.querySelectorAll(`[${e}]`).forEach(t => {
            let o = t.getAttribute(e);
            t.style.backgroundImage = `url(images/${o})`
        }
        )
    }
    ,
    NioApp.Custom.addBGSpace = function(e) {
        let t = document.getElementsByClassName(e);
        for (let e = 0; e < t.length; e++) {
            let o = t[e];
            o.classList && Array.from(o.classList).some(e => e.includes("bg-")) && o.classList.add("py-7", "py-lg-120")
        }
    }
    ,
    NioApp.Addons.pristine = function(e, t) {
        return new Pristine(e,{
            classTo: "form-control-wrap",
            errorClass: "nk-error",
            successClass: "nk-sucess",
            errorTextParent: "form-control-wrap",
            errorTextTag: "span",
            errorTextClass: "nk-message nk-message-error"
        },t)
    }
    ,
    NioApp.Addons.scrollTexts = function(e) {
        let t = document.querySelectorAll(e);
        t.length > 0 && t.forEach(e => {
            let t = e
              , o = t.dataset.speed ? JSON.parse(t.dataset.speed) : null
              , n = !!t.dataset.smartSpeed && JSON.parse(t.dataset.smartSpeed)
              , a = !t.dataset.autoplay || JSON.parse(t.dataset.autoplay)
              , s = t.dataset.margin ? JSON.parse(t.dataset.margin) : null
              , i = t.dataset.dir ? t.dataset.dir : "ltr";
            new ScrollCarousel(t,{
                speed: o,
                margin: s,
                direction: i,
                autoplay: a,
                smartSpeed: n
            })
        }
        )
    }
    ,
    NioApp.Addons.toast = function(e, t) {
        let o = `\n    <div class="nk-toast ${"success" === e ? " nk-toast-success" : "warning" === e ? " nk-toast-warning" : "error" === e ? " nk-toast-error" : ""} toast show animate animate-slide-right animate-duration-12 position-fixed m-3 border-0" role="alert" aria-live="assertive" aria-atomic="true" id="toastContainer" >\n      <div>\n        <span class="nk-toast-icon">\n          <em class="icon ni ni-${"success" === e ? "check" : "error" === e ? "alert-circle-fill" : "warning" === e ? "alert-fill" : "info-i"}"></em>\n        </span>\n      </div>\n      <div class="nk-toast-info">\n        <h6 class="m-0 text-capitalize text-dark">\n          ${"success" === e ? "Success" : "error" === e ? "Error" : "warning" === e ? "Warning" : "info-i"} \n        </h6>\n        <p>${t}\n      </div>\n        <button type="button" class="nk-toast-btn" data-bs-dismiss="toast" aria-label="Close">\n          <em class="icon ni ni-cross"></em>\n        </button>\n      </div>\n    `;
        NioApp.body.insertAdjacentHTML("beforeend", o),
        setTimeout( () => document.getElementById("toastContainer").remove(), 6e3)
    }
    ,
    NioApp.Addons.filterTab = function() {
        var e = document.querySelector(".nk-filter-container")
          , t = document.querySelectorAll(".nk-filter-control");
        if (e) {
            new Filterizr(e,{
                gridItemsSelector: ".nk-filter-item",
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
            });
            t.forEach((function(e) {
                e.addEventListener("click", (function(e) {
                    e.preventDefault();
                    var o = e.currentTarget;
                    t.forEach((function(e) {
                        e.classList.remove("active")
                    }
                    )),
                    o.classList.add("active")
                }
                ))
            }
            ))
        }
    }
    ,
    NioApp.Addons.countDown = function() {
        if (document.querySelector(".nk-countdown")) {
            new countdown({
                target: ".nk-countdown",
                dayWord: "Days",
                hourWord: "Hours",
                minWord: "Min",
                secWord: "Sec"
            })
        }
    }
    ,
    NioApp.Custom.submitForm = function(e) {
        let t = document.querySelectorAll(e);
        t && t.forEach(e => {
            const t = e.dataset.action;
            let o = NioApp.Addons.pristine(e, !1);
            e.addEventListener("submit", (function(n) {
                if (n.preventDefault(),
                o.validate()) {
                    let o = new FormData(e);
                    const n = new XMLHttpRequest;
                    n.onreadystatechange = function() {
                        if (4 == this.readyState && 200 == this.status) {
                            let e = null;
                            try {
                                e = JSON.parse(n.responseText)
                            } catch (e) {}
                            e ? NioApp.Addons.toast(e.result, e.message) : NioApp.Addons.toast("error", "Oops! There was something went wrong.")
                        }
                    }
                    ,
                    n.open("POST", t, !0),
                    n.send(o),
                    e.reset()
                }
            }
            ))
        }
        )
    }
    ,
    NioApp.Custom.tooltip = function(e) {
        [...document.querySelectorAll(e)].map(e => new bootstrap.Tooltip(e))
    }
    ,
    NioApp.Custom.currentYear = function(e) {
        let t = document.querySelector(e);
        t && (t.textContent = (new Date).getFullYear())
    }
    ,
    NioApp.Custom.preLoader = function(e) {
        let t = document.querySelector(e);
        t && t.classList.add("hide")
    }
    ,
    NioApp.Custom.counterButton = function() {
        let e = 0;
        const t = document.getElementById("counter")
          , o = document.getElementById("increment")
          , n = document.getElementById("decrement")
          , a = document.getElementById("count");
        function s() {
            e++,
            r()
        }
        function i() {
            e > 0 && (e--,
            r())
        }
        function r() {
            a.textContent = e
        }
        return t && (o.addEventListener("click", s),
        n.addEventListener("click", i)),
        {
            increment: s,
            decrement: i
        }
    }
    ,
    NioApp.Custom.init = function() {
        NioApp.Navbar.init(),
        NioApp.Custom.dropdownSelectMenu(),
        NioApp.Custom.preLoader(".preloader"),
        NioApp.Custom.backToTop(".scroll-top"),
        NioApp.Custom.currentYear("#currentYear"),
        // NioApp.Custom.submitForm(".form-submit-init"),
        NioApp.Custom.showHidePassword(".password-toggle"),
        NioApp.Custom.Clipboard(".js-copy"),
        NioApp.Custom.counterButton(),
        NioApp.Custom.setbgImage("data-bg-image"),
        NioApp.Custom.addBGSpace("nk-section"),
        NioApp.Dropdown.header("." + nav.classes.toggle),
        NioApp.Addons.swiperCarousel(".swiper-init"),
        NioApp.Addons.swiperThumbs(".product-slider-sm", ".product-slider-lg"),
        NioApp.Addons.scrollTexts(".texts-animation-scroll"),
        NioApp.Addons.parallax(".parallax-init"),
        setTimeout( () => {
            NioApp.Addons.aos()
        }
        , 300),
        NioApp.Addons.filterTab(),
        NioApp.Addons.countDown(),
        NioApp.Custom.priceToggle(".price-toggle-input", ".nk-pricing"),
        NioApp.Custom.characterCounter("textarea-box", "char-count", "char-max", "submit-btn")
    }
    ,
    NioApp.init = function() {
        NioApp.winLoad(NioApp.Custom.init)
    }
    ,
    NioApp.init()
}(NioApp);
