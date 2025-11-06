function debounce(e, t) {
  let r
  return function (...a) {
    clearTimeout(r), (r = setTimeout(() => e.apply(this, a), t))
  }
}
function supportsTouch() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function initBarbaNavUpdate(e) {
  const t = $(e.next.html).find('[data-barba-update="nav"]')
  $('[data-barba-update="nav"]').each(function (e) {
    const r = $(t[e])
    if (r.length) {
      const e = r.attr('aria-current')
      void 0 !== e
        ? $(this).attr('aria-current', e)
        : $(this).removeAttr('aria-current')
      const t = r.attr('class')
      $(this).attr('class', t)
    }
  })
}
function initLenis() {
  ;(lenis = new Lenis({ lerp: 0.12 })),
    lenis.on('scroll', ScrollTrigger.update),
    gsap.ticker.add((e) => {
      lenis.raf(1e3 * e)
    }),
    gsap.ticker.lagSmoothing(0)
}
function initLenisCheckScrollUpDown() {
  function e() {
    lenis.on('scroll', r)
  }
  var t = 0,
    r = function (e) {
      var r = e.targetScroll
      Math.abs(t - r) >= 50 &&
        (r > t
          ? document.body.setAttribute('data-scrolling-direction', 'down')
          : document.body.setAttribute('data-scrolling-direction', 'up'),
        (t = r),
        r > 100
          ? document.body.setAttribute('data-scrolling-started', 'true')
          : document.body.setAttribute('data-scrolling-started', 'false'))
    }
  e(),
    barba.hooks.beforeLeave(() => {
      lenis.off('scroll', r), (t = 0)
    }),
    barba.hooks.after(() => {
      e()
    })
}
function initDynamicCurrentYear() {
  const e = new Date().getFullYear()
  document.querySelectorAll('[data-current-year]').forEach((t) => {
    t.textContent = e
  })
}
function initGlobalParallax() {
  gsap
    .matchMedia()
    .add(
      {
        isMobile: '(max-width:479px)',
        isMobileLandscape: '(max-width:767px)',
        isTablet: '(max-width:991px)',
        isDesktop: '(min-width:992px)',
      },
      (e) => {
        const { isMobile: t, isMobileLandscape: r, isTablet: a } = e.conditions,
          o = gsap.context(() => {
            document
              .querySelectorAll('[data-parallax="trigger"]')
              .forEach((e) => {
                const o = e.getAttribute('data-parallax-disable')
                if (
                  ('mobile' === o && t) ||
                  ('mobileLandscape' === o && r) ||
                  ('tablet' === o && a)
                )
                  return
                const n = e.querySelector('[data-parallax="target"]') || e,
                  i =
                    'horizontal' ===
                    (e.getAttribute('data-parallax-direction') || 'vertical')
                      ? 'xPercent'
                      : 'yPercent',
                  l = e.getAttribute('data-parallax-scrub'),
                  s = !l || parseFloat(l),
                  c = e.getAttribute('data-parallax-start'),
                  d = null !== c ? parseFloat(c) : 20,
                  u = e.getAttribute('data-parallax-end'),
                  p = null !== u ? parseFloat(u) : -20,
                  g = `clamp(${
                    e.getAttribute('data-parallax-scroll-start') || 'top bottom'
                  })`,
                  m = `clamp(${
                    e.getAttribute('data-parallax-scroll-end') || 'bottom top'
                  })`
                gsap.fromTo(
                  n,
                  { [i]: d },
                  {
                    [i]: p,
                    ease: 'none',
                    scrollTrigger: { trigger: e, start: g, end: m, scrub: s },
                  }
                )
              })
          })
        return () => o.revert()
      }
    )
}
function initMenu() {
  const e = document.querySelectorAll('[data-menu-toggle]')
  e.length &&
    e.forEach((e) => {
      e.addEventListener('click', () => {
        'closed' === document.body.getAttribute('data-menu-status')
          ? document.body.setAttribute('data-menu-status', 'open')
          : document.body.setAttribute('data-menu-status', 'closed')
      })
    })
}
function initBackToTop(e) {
  const t = e.querySelector('[data-button-back-top]')
  t &&
    t.addEventListener('click', () => {
      lenis.scrollTo(0, { force: !0, duration: 0.8 })
    })
}
function initFooterScrollIn(e) {
  const t = e.querySelector('.footer')
  if (t) {
    const e = t.querySelector('.footer-bottom-bg'),
      r = t.querySelectorAll('[data-footer-enter]'),
      a = t.querySelectorAll('[data-footer-logo]')
    gsap.set(e, { scaleY: 0 }),
      gsap.set(r, { autoAlpha: 0, yPercent: 100 }),
      gsap.set(a[0], { autoAlpha: 0 }),
      gsap.set(a[1], { xPercent: 50, autoAlpha: 0 }),
      ScrollTrigger.create({
        trigger: t,
        start: 'bottom bottom+=7%',
        once: !0,
        onEnter: () => {
          gsap.to(e, { scaleY: 1 }),
            gsap.to(r, { yPercent: 0, autoAlpha: 1, stagger: 0.1, delay: 0.3 }),
            gsap.to(a[0], { autoAlpha: 1 }),
            gsap.to(a[1], { autoAlpha: 1, xPercent: 0 })
        },
      })
  }
}
function initLoadMore(e) {
  e.querySelectorAll('[data-load-list]').forEach((e) => {
    const t = Array.from(e.querySelectorAll('[data-filter-item]')),
      r = parseInt(e.getAttribute('data-load-list'), 10) || 9,
      a = e.parentElement.querySelector('[data-load-button]'),
      o = a ? parseInt(a.getAttribute('data-load-button'), 10) || 6 : 0
    t.forEach((e, t) => {
      e.setAttribute('data-filter-match', '1'),
        t >= r
          ? (e.setAttribute('data-load-item', 'hidden'),
            (e.style.display = 'none'))
          : (e.removeAttribute('data-load-item'), (e.style.display = ''))
    }),
      a && (a.style.display = t.length > r ? '' : 'none'),
      a &&
        a.addEventListener('click', () => {
          let t = Array.from(
              e.querySelectorAll(
                '[data-load-item="hidden"][data-filter-match="1"]'
              )
            ),
            r = 0
          t.forEach((e, t) => {
            'none' === getComputedStyle(e).display &&
              r < o &&
              (e.removeAttribute('data-load-item'),
              (e.style.display = ''),
              gsap.fromTo(
                e,
                { autoAlpha: 0, y: '10em' },
                {
                  autoAlpha: 1,
                  y: '0em',
                  duration: 0.735,
                  delay: 0 + 0.04 * t,
                  overwrite: !0,
                }
              ),
              r++)
          }),
            (t = Array.from(
              e.querySelectorAll(
                '[data-load-item="hidden"][data-filter-match="1"]'
              )
            )),
            0 === t.length && (a.style.display = 'none')
        })
  })
}
function resetLoadMore(e, t) {
  const r = parseInt(e.dataset.loadList, 10) || 9
  Array.from(e.querySelectorAll('[data-filter-item]')).forEach((e) => {
    t.includes(e)
      ? (e.setAttribute('data-filter-match', '1'),
        t.indexOf(e) >= r
          ? ((e.style.display = 'none'),
            e.setAttribute('data-load-item', 'hidden'))
          : ((e.style.display = ''), e.removeAttribute('data-load-item')))
      : (e.setAttribute('data-filter-match', '0'),
        (e.style.display = 'none'),
        e.setAttribute('data-load-item', 'excluded'))
  })
  const a = e.parentElement.querySelector('[data-load-button]')
  if (!a) return
  const o = t.filter((e, t) => t >= r).length
  a.style.display = o > 0 ? '' : 'none'
}
function initAccordionCSS() {
  document.querySelectorAll('[data-accordion-css-init]').forEach((e) => {
    const t = 'true' === e.getAttribute('data-accordion-close-siblings')
    e.addEventListener('click', (r) => {
      const a = r.target.closest('[data-accordion-toggle]')
      if (!a) return
      const o = a.closest('[data-accordion-status]')
      if (!o) return
      gsap.delayedCall(0.6, () => {
        ScrollTrigger.refresh()
      })
      const n = 'active' === o.getAttribute('data-accordion-status')
      o.setAttribute('data-accordion-status', n ? 'not-active' : 'active'),
        t &&
          !n &&
          e
            .querySelectorAll('[data-accordion-status="active"]')
            .forEach((e) => {
              e !== o && e.setAttribute('data-accordion-status', 'not-active')
            })
    })
  })
}
function initContentRevealScroll() {
  const e = window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    t = gsap.context(() => {
      document.querySelectorAll('[data-reveal-group]').forEach((t) => {
        const r = (parseFloat(t.getAttribute('data-stagger')) || 100) / 1e3,
          a = t.getAttribute('data-distance') || '2em',
          o = t.getAttribute('data-start') || 'top 80%',
          n = 0.8,
          i = 'power4.inOut'
        if (e)
          return void gsap.set(t, { clearProps: 'all', y: 0, autoAlpha: 1 })
        const l = Array.from(t.children).filter((e) => 1 === e.nodeType)
        if (!l.length)
          return (
            gsap.set(t, { y: a, autoAlpha: 0 }),
            void ScrollTrigger.create({
              trigger: t,
              start: o,
              once: !0,
              onEnter: () =>
                gsap.to(t, {
                  y: 0,
                  autoAlpha: 1,
                  duration: n,
                  ease: i,
                  onComplete: () => gsap.set(t, { clearProps: 'all' }),
                }),
            })
          )
        const s = []
        l.forEach((e) => {
          const t = e.matches('[data-reveal-group-nested]')
            ? e
            : e.querySelector(':scope [data-reveal-group-nested]')
          if (t) {
            const r =
              'false' === e.getAttribute('data-ignore') ||
              'false' === t.getAttribute('data-ignore')
            s.push({
              type: 'nested',
              parentEl: e,
              nestedEl: t,
              includeParent: r,
            })
          } else s.push({ type: 'item', el: e })
        }),
          s.forEach((e) => {
            if ('item' === e.type) {
              const t = e.el.matches('[data-reveal-group-nested]')
                ? a
                : e.el.getAttribute('data-distance') || a
              gsap.set(e.el, { y: t, autoAlpha: 0 })
            } else {
              e.includeParent && gsap.set(e.parentEl, { y: a, autoAlpha: 0 })
              const t = e.nestedEl.getAttribute('data-distance') || a
              Array.from(e.nestedEl.children).forEach((e) =>
                gsap.set(e, { y: t, autoAlpha: 0 })
              )
            }
          }),
          s.forEach((e) => {
            'nested' === e.type &&
              e.includeParent &&
              gsap.set(e.parentEl, { y: a })
          }),
          ScrollTrigger.create({
            trigger: t,
            start: o,
            once: !0,
            onEnter: () => {
              const e = gsap.timeline()
              s.forEach((t, a) => {
                const o = a * r
                if ('item' === t.type)
                  e.to(
                    t.el,
                    {
                      y: 0,
                      autoAlpha: 1,
                      duration: n,
                      ease: i,
                      onComplete: () => gsap.set(t.el, { clearProps: 'all' }),
                    },
                    o
                  )
                else {
                  t.includeParent &&
                    e.to(
                      t.parentEl,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: n,
                        ease: i,
                        onComplete: () =>
                          gsap.set(t.parentEl, { clearProps: 'all' }),
                      },
                      o
                    )
                  const a = parseFloat(t.nestedEl.getAttribute('data-stagger')),
                    l = isNaN(a) ? r : a / 1e3
                  Array.from(t.nestedEl.children).forEach((t, r) => {
                    e.to(
                      t,
                      {
                        y: 0,
                        autoAlpha: 1,
                        duration: n,
                        ease: i,
                        onComplete: () => gsap.set(t, { clearProps: 'all' }),
                      },
                      o + r * l
                    )
                  })
                }
              })
            },
          })
      })
    })
  return () => t.revert()
}
function initAdvancedFormValidation() {
  document.querySelectorAll('[data-form-validate]').forEach((e) => {
    function t() {
      return new Date().getTime() - n < 5e3
    }
    function r() {
      let e = !0,
        t = null
      return (
        l.forEach(function (r) {
          const n = r.querySelector('input, textarea, select'),
            i = r.querySelector('[data-radiocheck-group]')
          ;(n || i) &&
            (n && (n.__validationStarted = !0),
            i &&
              ((i.__validationStarted = !0),
              i
                .querySelectorAll('input[type="radio"], input[type="checkbox"]')
                .forEach(function (e) {
                  e.__validationStarted = !0
                })),
            o(r),
            a(r) || ((e = !1), t || (t = n || i.querySelector('input'))))
        }),
        !e && t && t.focus(),
        e
      )
    }
    function a(e) {
      const t = e.querySelector('[data-radiocheck-group]')
      if (t) {
        const e = t.querySelectorAll(
            'input[type="radio"], input[type="checkbox"]'
          ),
          r = t.querySelectorAll('input:checked'),
          a = parseInt(t.getAttribute('min')) || 1,
          o = parseInt(t.getAttribute('max')) || e.length,
          n = r.length
        return 'radio' === e[0].type
          ? n >= 1
          : 1 === e.length
          ? e[0].checked
          : n >= a && n <= o
      }
      {
        const t = e.querySelector('input, textarea, select')
        if (!t) return !1
        let r = !0
        const a = parseInt(t.getAttribute('min')) || 0,
          o = parseInt(t.getAttribute('max')) || 1 / 0,
          n = t.value.trim(),
          i = n.length
        return (
          'select' === t.tagName.toLowerCase()
            ? ('' !== n && 'disabled' !== n && 'null' !== n && 'false' !== n) ||
              (r = !1)
            : 'email' === t.type
            ? (r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))
            : (t.hasAttribute('min') && i < a && (r = !1),
              t.hasAttribute('max') && i > o && (r = !1)),
          r
        )
      }
    }
    function o(e) {
      const t = e.querySelector('[data-radiocheck-group]')
      if (t) {
        const r = t.querySelectorAll(
          'input[type="radio"], input[type="checkbox"]'
        )
        t.querySelectorAll('input:checked').length > 0
          ? e.classList.add('is--filled')
          : e.classList.remove('is--filled'),
          a(e)
            ? (e.classList.add('is--success'), e.classList.remove('is--error'))
            : (e.classList.remove('is--success'),
              Array.from(r).some((e) => e.__validationStarted)
                ? e.classList.add('is--error')
                : e.classList.remove('is--error'))
      } else {
        const t = e.querySelector('input, textarea, select')
        if (!t) return
        t.value.trim()
          ? e.classList.add('is--filled')
          : e.classList.remove('is--filled'),
          a(e)
            ? (e.classList.add('is--success'), e.classList.remove('is--error'))
            : (e.classList.remove('is--success'),
              t.__validationStarted
                ? e.classList.add('is--error')
                : e.classList.remove('is--error'))
      }
    }
    const n = new Date().getTime(),
      i = e.querySelector('form')
    if (!i) return
    const l = i.querySelectorAll('[data-validate]'),
      s = i.querySelector('[data-submit]')
    if (!s) return
    const c = s.querySelector('input[type="submit"]')
    c &&
      (l.forEach(function (e) {
        const t = e.querySelector('select')
        t &&
          t.querySelectorAll('option').forEach(function (e) {
            ;('' !== e.value &&
              'disabled' !== e.value &&
              'null' !== e.value &&
              'false' !== e.value) ||
              e.setAttribute('disabled', 'disabled')
          })
      }),
      l.forEach(function (e) {
        const t = e.querySelector('input, textarea, select'),
          r = e.querySelector('[data-radiocheck-group]')
        r
          ? r
              .querySelectorAll('input[type="radio"], input[type="checkbox"]')
              .forEach(function (t) {
                ;(t.__validationStarted = !1),
                  t.addEventListener('change', function () {
                    requestAnimationFrame(function () {
                      t.__validationStarted ||
                        (r.querySelectorAll('input:checked').length >=
                          (parseInt(r.getAttribute('min')) || 1) &&
                          (t.__validationStarted = !0)),
                        t.__validationStarted && o(e)
                    })
                  }),
                  t.addEventListener('blur', function () {
                    ;(t.__validationStarted = !0), o(e)
                  })
              })
          : t &&
            ((t.__validationStarted = !1),
            'select' === t.tagName.toLowerCase()
              ? t.addEventListener('change', function () {
                  ;(t.__validationStarted = !0), o(e)
                })
              : (t.addEventListener('input', function () {
                  const r = t.value.trim().length,
                    n = parseInt(t.getAttribute('min')) || 0,
                    i = parseInt(t.getAttribute('max')) || 1 / 0
                  t.__validationStarted ||
                    ('email' === t.type
                      ? a(e) && (t.__validationStarted = !0)
                      : ((t.hasAttribute('min') && r >= n) ||
                          (t.hasAttribute('max') && r <= i)) &&
                        (t.__validationStarted = !0)),
                    t.__validationStarted && o(e)
                }),
                t.addEventListener('blur', function () {
                  ;(t.__validationStarted = !0), o(e)
                })))
      }),
      s.addEventListener('click', function (e) {
        if (r())
          return t()
            ? (e.preventDefault(),
              void alert('Form submitted too quickly. Please try again.'))
            : void c.click()
        e.preventDefault()
      }),
      i.addEventListener('keydown', function (e) {
        if ('Enter' === e.key && 'TEXTAREA' !== e.target.tagName)
          if (r()) {
            if (t())
              return (
                e.preventDefault(),
                void alert('Form submitted too quickly. Please try again.')
              )
            e.preventDefault(), s.click()
          } else e.preventDefault()
      }))
  })
}
function initHomeHero(e) {
  function t() {
    ;(o = r.getBoundingClientRect()),
      (n = o.width),
      (i = o.height),
      (l = a.offsetWidth),
      (s = a.offsetHeight),
      (c = Math.max(0, l - n)),
      (d = Math.max(0, s - i))
  }
  const r = e.querySelector('[data-home-hero-section]'),
    a = e.querySelector('[data-home-hero-bg]')
  if (!r || !a) return
  let o, n, i, l, s, c, d
  t()
  const u = gsap.quickTo(a, 'x', { duration: 0.6, ease: 'power3' }),
    p = gsap.quickTo(a, 'y', { duration: 0.6, ease: 'power3' })
  r.addEventListener('mousemove', (e) => {
    o = r.getBoundingClientRect()
    const t = (e.clientX - o.left) / o.width,
      n = (e.clientY - o.top) / o.height
    u((t - 0.5) * (a.offsetWidth - o.width)),
      p((n - 0.5) * (a.offsetHeight - o.height))
  }),
    r.addEventListener('mouseleave', () => {
      u(0), p(0)
    })
  const g = debounce(t, 200)
  window.addEventListener('resize', g)
}
function initHeadingReveal(e) {
  let t = e.querySelectorAll('[data-heading-reveal]')
  t.length &&
    t.forEach((e) => {
      MM.add(
        {
          isDesktop: `(min-width: ${BREAKPOINT}px)`,
          isMobile: `(max-width: ${BREAKPOINT - 1}px)`,
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (t) => {
          let { reduceMotion: r } = t.conditions
          if (!r) {
            var a = new SplitText(e, { type: 'lines, words, chars' })
            e.setAttribute('aria-label', e.textContent),
              gsap.set(a.chars, {
                autoAlpha: 0,
                yPercent: 100,
                scaleY: 1.5,
                stagger: 0.01,
              }),
              ScrollTrigger.create({
                trigger: e,
                start: 'top 80%',
                once: !0,
                onEnter: () => {
                  gsap.to(a.chars, {
                    autoAlpha: 1,
                    yPercent: 0,
                    scaleY: 1,
                    stagger: 0.01,
                  })
                },
              })
          }
        }
      )
    })
}
function initHomeClientStack(e) {
  let t, r
  const a = gsap.context(() => {
    function a(e) {
      const t =
        -n() *
        (function (e) {
          let t = 0
          for (const r in e) t += e[r]
          return t
        })(i[e])
      gsap.set(o[e], { y: t })
    }
    const o = Array.from(e.querySelectorAll('.home-client-list__item'))
    if (o.length < 3) return
    const n = () => parseFloat(gsap.getProperty(o[1], 'top')),
      i = o.map(() => ({}))
    o.forEach((e, t) => {
      if (t < 2) return
      const r = t - 1,
        o = t - 2
      ScrollTrigger.create({
        trigger: e,
        start: () => `top ${2 * n()}px`,
        end: () => `+=${n()}px`,
        scrub: !0,
        onUpdate: (e) => {
          ;(i[r][t] = e.progress), (i[o][t] = e.progress), a(r), a(o)
        },
        onRefresh: () => {
          a(r), a(o)
        },
      })
    })
    const l = () => {
      'function' == typeof lenis?.resize && lenis.resize(),
        ScrollTrigger.refresh()
    }
    r = gsap.delayedCall(0.8, l)
    let s = window.innerWidth
    ;(t = debounce(() => {
      const e = window.innerWidth
      e !== s && ((s = e), l())
    }, 200)),
      window.addEventListener('resize', t)
  }, e)
  return () => {
    window.removeEventListener('resize', t), r && r.kill(), a.revert()
  }
}
function initFlickitySlider() {
  document.querySelectorAll('[data-flickity-type="cards"]').forEach((e, t) => {
    const r = 'flickity-type-cards-id-' + t
    e.id = r
    let a = e.querySelectorAll('[data-flickity-item]').length
    e.setAttribute('data-flickity-count', a),
      e.setAttribute('data-flickity-status', 'active')
    const o = document.querySelector('#' + r + ' [data-flickity-list]')
    if (!o) return
    new Flickity(o, {
      watchCSS: !0,
      contain: !0,
      wrapAround: !1,
      dragThreshold: 10,
      prevNextButtons: !1,
      pageDots: !1,
      cellAlign: 'left',
      selectedAttraction: 0.015,
      friction: 0.25,
      percentPosition: !0,
      freeScroll: !1,
      on: {
        dragStart: () => {
          o.style.pointerEvents = 'none'
        },
        dragEnd: () => {
          o.style.pointerEvents = 'auto'
        },
        change: function () {
          !(function () {
            const e = parseInt(
              window.getComputedStyle(o).getPropertyValue('--flick-col'),
              10
            )
            n.cells[n.selectedIndex - 1]
              ? n.cells[n.selectedIndex + e]
                ? (i && i.removeAttribute('disabled'),
                  l && l.removeAttribute('disabled'))
                : (l && l.setAttribute('disabled', 'disabled'),
                  i && i.removeAttribute('disabled'))
              : (i && i.setAttribute('disabled', 'disabled'),
                l && l.removeAttribute('disabled'))
          })(),
            (function () {
              const t = parseInt(
                  window.getComputedStyle(o).getPropertyValue('--flick-col'),
                  10
                ),
                r = n.cells.length - t,
                a = n.selectedIndex < r ? n.selectedIndex : r
              e.querySelectorAll('[data-flickity-dot]').forEach((e, t) => {
                e.setAttribute('data-flickity-dot', t === a ? 'active' : '')
              })
            })()
        },
      },
    })
    const n = Flickity.data(o),
      i = e.querySelector('[data-flickity-control="prev"]')
    i &&
      (i.setAttribute('disabled', ''),
      i.addEventListener('click', function () {
        n.previous()
      }))
    const l = e.querySelector('[data-flickity-control="next"]')
    l &&
      l.addEventListener('click', function () {
        n.next()
      })
    const s = e.querySelectorAll('[data-flickity-dot]')
    s.length &&
      s.forEach((e, t) => {
        e.addEventListener('click', function () {
          const e = parseInt(
              window.getComputedStyle(o).getPropertyValue('--flick-col'),
              10
            ),
            r = n.cells.length - e
          let a = t
          a > r && (a = r), n.select(a)
        })
      })
    const c = e.querySelectorAll('.insight-card'),
      d = e.querySelectorAll('.insight-card-img'),
      u = e.querySelectorAll('.insight-card-details')
    gsap
      .timeline({ scrollTrigger: { trigger: e, start: 'top 80%', once: !0 } })
      .from(c, { autoAlpha: 0, stagger: { each: 0.04, from: 'end' } })
      .from(
        c,
        { xPercent: -80, duration: 1.2, stagger: { each: 0.04, from: 'end' } },
        '<'
      )
      .from(
        d,
        {
          clipPath: 'inset(100% 0px 0px 0px)',
          duration: 1.2,
          stagger: { each: 0.04, from: 'end' },
        },
        '<'
      )
      .from(
        u,
        {
          autoAlpha: 0,
          yPercent: 25,
          duration: 1.2,
          stagger: { each: 0.04, from: 'end' },
        },
        '<'
      )
  })
}
function initFilter(e, t = {}, r = !1) {
  function a(e) {
    e && e > 0 ? i.classList.remove('empty') : i.classList.add('empty')
  }
  function o() {
    const e = Object.keys(s).filter((e) => s[e] && 'reset' !== s[e])
    return e.length ? l.filter((t) => e.every((e) => d(t, e, s[e]))) : l
  }
  const n = Array.from(e.querySelectorAll('[data-filter-list]')),
    i = e.querySelector('[data-filter-grid]')
  if (!i) return
  const l = Array.from(i.querySelectorAll('[data-filter-item]')),
    s = { ...t },
    c = !!i.querySelector('.pf-grid-item'),
    d = (e, t, r) =>
      e.matches(`[data-filter-${t}="${r}"]`) ||
      !!e.querySelector(`[data-filter-${t}="${r}"]`)
  n.forEach((t) => {
    const r = t.dataset.filterList,
      n = t.querySelectorAll('[data-filter-button]')
    n.forEach((t) => {
      t.addEventListener('click', () => {
        const i = t.dataset.filterButton
        let d
        'reset' === i || s[r] === i
          ? (delete s[r], delete FILTER_STATE[r], (d = void 0))
          : ((s[r] = i), (FILTER_STATE[r] = i), (d = i)),
          n.forEach((e) => {
            const t = e.dataset.filterButton
            e.classList.toggle('active', d ? t === d : 'reset' === t)
          }),
          (function () {
            const t = o()
            gsap.to(l, {
              xPercent: c ? 5 : 0,
              y: c ? '0em' : '10em',
              autoAlpha: 0,
              stagger: { amount: 0.25 },
              duration: 0.4,
              onComplete: () => {
                a(t.length),
                  l.forEach((e) => {
                    const r = t.includes(e)
                    ;(e.style.display = r ? '' : 'none'),
                      e.setAttribute('data-filter-match', r ? '1' : '0'),
                      r
                        ? (e.removeAttribute('data-load-item'),
                          gsap.set(e, {
                            xPercent: c ? 5 : 0,
                            y: c ? '0em' : '10em',
                            autoAlpha: 0,
                          }))
                        : e.setAttribute('data-load-item', 'excluded')
                  }),
                  t.length &&
                    (lenis &&
                      lenis.scrollTo('[data-filter-section]', { lerp: 0.1 }),
                    gsap.fromTo(
                      t,
                      {
                        xPercent: c ? 5 : 0,
                        y: c ? '0em' : '10em',
                        autoAlpha: 0,
                      },
                      {
                        xPercent: 0,
                        y: '0em',
                        autoAlpha: 1,
                        stagger: 0.04,
                        overwrite: !0,
                        onComplete: () => ScrollTrigger.refresh(),
                      }
                    )),
                  e
                    .querySelectorAll('[data-load-list]')
                    .forEach((e) => resetLoadMore(e, t))
              },
            })
          })()
      })
    })
  }),
    r &&
      requestAnimationFrame(function () {
        const t = o()
        n.forEach((e) => {
          const t = e.dataset.filterList
          e.querySelectorAll('[data-filter-button]').forEach((e) => {
            const r = e.dataset.filterButton
            e.classList.toggle(
              'active',
              s[t] === r || (void 0 === s[t] && 'reset' === r)
            )
          })
        }),
          a(t.length),
          l.forEach((e) => {
            const r = t.includes(e)
            e.setAttribute('data-filter-match', r ? '1' : '0'),
              r || e.setAttribute('data-load-item', 'excluded'),
              (e.style.display = r ? '' : 'none'),
              r &&
                gsap.set(e, { xPercent: 0, y: '0em', autoAlpha: 1, scale: 1 })
          }),
          e
            .querySelectorAll('[data-load-list]')
            .forEach((e) => resetLoadMore(e, t)),
          lenis && lenis.resize(),
          ScrollTrigger.refresh()
      })
  const u = e.querySelector('[data-filter-status]'),
    p = e.querySelector('[data-filter-open]'),
    g = e.querySelectorAll('[data-filter-close]')
  u &&
    (p &&
      p.addEventListener('click', () => {
        u.setAttribute('data-filter-status', 'open')
      }),
    g.forEach((e) => {
      e.addEventListener('click', () => {
        u.setAttribute('data-filter-status', 'closed')
      })
    }))
}
function initDropdowns(e) {
  function t() {
    r.classList.remove('active')
  }
  const r = e.querySelector('[data-dropdown-toggle]'),
    a = e.querySelector('[data-dropdown-el]')
  r &&
    a &&
    (r.addEventListener('click', (e) => {
      e.stopPropagation(), r.classList.toggle('active')
    }),
    document.addEventListener('click', (e) => {
      r.classList.contains('active') &&
        (e.target === r || r.contains(e.target) || a.contains(e.target) || t())
    }),
    document.addEventListener('keydown', (e) => {
      'Escape' === e.key && r.classList.contains('active') && t()
    }))
}
function initPortfolioFollower(e) {
  const t = e.querySelector('[data-portfolio-grid]')
  if (!t) return
  const r = 'home' === t.dataset.portfolioGrid,
    a = e.querySelectorAll('[data-portfolio-item]'),
    o = e.querySelector('[data-portfolio-follower]')
  if (!o) return
  let n = null,
    i = 0.455 * window.innerWidth,
    l = 0.4 * window.innerHeight
  gsap.set(o, { xPercent: r ? 10 : -10, yPercent: r ? 10 : -10 })
  const s = gsap.quickTo(o, 'x', { duration: 0.6, ease: 'power3' }),
    c = gsap.quickTo(o, 'y', { duration: 0.6, ease: 'power3' })
  window.addEventListener('resize', () => {
    ;(i = 0.5 * window.innerWidth), (l = 0.5 * window.innerHeight)
  }),
    window.addEventListener('mousemove', (e) => {
      s(e.clientX - i), c(e.clientY - l)
    }),
    a.forEach((e, t) => {
      e.addEventListener('mouseenter', () => {
        const a = null === n || t > n
        n = t
        const i = r ? 100 : 150,
          l = i
        o.querySelectorAll('[data-portfolio-item-logo]').forEach((e) => {
          gsap.killTweensOf(e)
          const t = {
            yPercent: a ? -i : i,
            duration: r ? 0.45 : 0.6,
            overwrite: 'auto',
            onComplete: () => e.remove(),
          }
          r || (t.autoAlpha = 0), gsap.to(e, t)
        })
        const s = e.querySelector('[data-portfolio-item-logo]')
        if (!s) return
        const c = s.cloneNode(!0)
        o.appendChild(c)
        const d = { yPercent: a ? l : -l },
          u = {
            yPercent: 0,
            duration: r ? 0.45 : 0.6,
            overwrite: 'auto',
            delay: r ? 0 : 0.1,
          }
        r || ((d.autoAlpha = 0), (u.autoAlpha = 1)), gsap.fromTo(c, d, u)
      }),
        e.addEventListener('mouseleave', () => {
          const e = o.querySelector('[data-portfolio-item-logo]')
          if (!e) return
          gsap.killTweensOf(e)
          const t = {
            yPercent: -(r ? 100 : 150),
            duration: r ? 0.45 : 0.6,
            overwrite: 'auto',
            onComplete: () => e.remove(),
          }
          r || (t.autoAlpha = 0), gsap.to(e, t)
        })
    }),
    t.addEventListener('mouseleave', () => {
      const e = r ? 100 : 150
      o.querySelectorAll('[data-portfolio-item-logo]').forEach((t) => {
        gsap.killTweensOf(t)
        const a = {
          yPercent: -e,
          duration: r ? 0.45 : 0.6,
          overwrite: 'auto',
          onComplete: () => t.remove(),
        }
        r || (a.autoAlpha = 0), gsap.to(t, a)
      })
    })
}
function initAFPage(e) {
  const t = e.querySelector('[data-af-stick-start]'),
    r = e.querySelector('[data-af-scroll-stick]')
  if (!t || !r) return
  gsap.matchMedia().add('(min-width: 992px)', () => {
    const a = gsap.context(() => {
      ScrollTrigger.create({
        trigger: r,
        start: 'top top-=11%',
        endTrigger: t,
        end: 'bottom bottom',
        scrub: !0,
        pin: r,
        pinSpacer: !1,
      })
    }, e)
    return () => a.revert()
  })
  const a = e.querySelectorAll('[data-flickity-item]')
  gsap.delayedCall(1, () => {
    gsap.set(a, { height: '100%' })
  })
}
function initStickyFilters(e) {
  const t = e.querySelector('[data-filter-col]')
  if (!t) return
  const r = e.querySelector('[data-filter-grid]')
  gsap.matchMedia().add('(min-width: 768px)', () => {
    const a = gsap.context(() => {
      ScrollTrigger.create({
        trigger: t,
        start: 'top top+=5%',
        endTrigger: r,
        end: 'bottom bottom-=10%',
        scrub: !0,
        pin: t,
        pinSpacer: !1,
      })
    }, e)
    return () => a.revert()
  })
}
function initSectionStack(e) {
  const t = Array.from(e.querySelectorAll('.section'))
  t.length < 2 ||
    t.forEach((e, r) => {
      if (0 === r) return
      const a = t[r - 1].querySelector('.container')
      a &&
        gsap.fromTo(
          a,
          { autoAlpha: 1, y: '0em' },
          {
            autoAlpha: 0.1,
            y: '30em',
            ease: 'none',
            scrollTrigger: {
              trigger: e,
              start: 'top bottom',
              end: 'top top',
              scrub: !0,
              invalidateOnRefresh: !0,
            },
          }
        )
    })
}
function initSectionsNav(e) {
  const t = Array.from(e.querySelectorAll('.section')),
    r = Array.from(document.querySelectorAll('.b-nav-item')),
    a = document.querySelector('[data-build-nav-theme]')
  if (!t.length || !r.length || !a) return
  const o = (e) => {
    r.forEach((t, r) => t.classList.toggle('active', r === e))
    const o = t[e].getAttribute('data-section-theme')
    o && a.setAttribute('data-build-nav-theme', o)
  }
  t.forEach((e, t) => {
    ScrollTrigger.create({
      trigger: e,
      start: 'top center',
      onEnter: () => o(t),
      onEnterBack: () => o(t),
    })
    const a = r[t] && r[t].querySelector('.b-nav-item__inner')
    a &&
      (gsap.set(a, { scaleY: 0, transformOrigin: 'top' }),
      gsap.to(a, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: e,
          start: 'top center',
          end: 'bottom center',
          scrub: !0,
          invalidateOnRefresh: !0,
        },
      }))
  })
}
function initRotatingHeadlines(e) {
  const t = Array.from(e.querySelectorAll('[data-rotating-headline]'))
  if (t.length < 2) return
  const r = t.map((e) => SplitText.create(e, { type: 'chars' })),
    a = r.flatMap((e) => e.chars)
  gsap.set(t, { visibility: 'visible' }),
    gsap.set(a, { autoAlpha: 0, yPercent: 100 })
  const o = gsap.timeline({ repeat: -1, defaults: { ease: 'n47' } })
  for (let e = 0; e < r.length; e++) {
    const t = r[e].chars
    o.to(t, { autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.01 })
      .to(
        t,
        { autoAlpha: 0, yPercent: -100, duration: 0.6, stagger: 0.01 },
        '+=1.2'
      )
      .set(t, { yPercent: 100 })
  }
  return o
}
function initGeneral(e) {
  initHeadingReveal(e),
    initBackToTop(e),
    initFooterScrollIn(e),
    initDynamicCurrentYear(),
    initGlobalParallax(),
    initFlickitySlider(),
    initLoadMore(e),
    initAccordionCSS(),
    initStickyFilters(e),
    initDropdowns(e),
    initAdvancedFormValidation()
  const t = e.getAttribute('data-barba-namespace')
  initFilter(e, FILTER_STATE, 'insights' === t),
    'builders' === t && initContentRevealScroll()
}
function runDefaultTransition(e, t, r) {
  return (
    gsap.set(t, { position: 'fixed', left: '0', top: '0', right: '0' }),
    'light' !== t.getAttribute('data-nav-theme')
      ? e.removeAttribute('data-nav-theme')
      : e.setAttribute('data-nav-theme', 'light'),
    gsap
      .timeline({
        defaults: { duration: 0.55 },
        onStart: () => {
          gsap.delayedCall(0.3, () => {
            'home' === r ? runHomeLoader(t) : runHeroAnimation(t)
          })
        },
        onComplete: () => {
          lenis.start(),
            ScrollTrigger.refresh(),
            gsap.set(t, { clearProps: !0 })
        },
      })
      .to(e, { autoAlpha: 0 })
      .from(t, {
        autoAlpha: 0,
        onStart: () => {
          window.scrollTo(0, 0)
        },
      })
  )
}
function runPageToModalTransition(e, t) {
  const r = t.querySelector('.modal-w')
  return (
    (savedScrollPos = lenis.scroll),
    (savedScrollStarted = document.body.getAttribute('data-scrolling-started')),
    (savedScrollDirection = document.body.getAttribute(
      'data-scrolling-direction'
    )),
    document.body.setAttribute('data-scrolling-started', 'false'),
    document.body.setAttribute('data-scrolling-direction', 'down'),
    isMobileLandscape || document.body.setAttribute('data-modal-page', 'true'),
    gsap.set(t, {
      position: 'fixed',
      left: '0',
      top: '0',
      right: '0',
      zIndex: 100,
    }),
    gsap.delayedCall(1, () => {
      ScrollTrigger.refresh()
    }),
    gsap
      .timeline({
        defaults: { duration: 0.7 },
        onStart: () => {
          const e = t.querySelectorAll('[data-load-wrap-set]')
          gsap.set(e, { autoAlpha: 0 }),
            gsap.delayedCall(0.3, () => {
              runHeroAnimation(t)
            })
        },
        onComplete: () => {
          lenis.start(),
            lenis.scrollTo(0, { force: !0, immediate: !0 }),
            ScrollTrigger.refresh(),
            gsap.set(t, { clearProps: !0 })
        },
      })
      .to(e, { autoAlpha: 0 }, '<')
      .from(t, { background: 'rgba(1, 29, 15, 0)' }, '<')
      .fromTo(r, { xPercent: 100 }, { xPercent: 0 }, '<')
  )
}
function runModalToPageTransition(e, t, r) {
  const a = e.querySelector('.modal-w')
  return (
    t.getAttribute('data-filter-page'),
    e.getAttribute('data-filter-page'),
    'insight' !== r &&
      gsap.set(t, {
        position: 'fixed',
        left: '0',
        top: `-${savedScrollPos}px`,
        right: '0',
        zIndex: 0,
      }),
    document.body.setAttribute('data-scrolling-started', savedScrollStarted),
    document.body.setAttribute(
      'data-scrolling-direction',
      savedScrollDirection
    ),
    document.body.setAttribute('data-modal-page', 'false'),
    gsap
      .timeline({
        onStart: () => {
          initFilter(t, FILTER_STATE, !0), 'home' === r && runHomeLoader(t)
        },
        onComplete: () => {
          lenis.start(),
            requestAnimationFrame(() => {
              gsap.set(t, { clearProps: !0 }),
                lenis.resize(),
                'insight' !== r
                  ? (lenis.scrollTo(savedScrollPos || 0, {
                      immediate: !0,
                      force: !0,
                    }),
                    requestAnimationFrame(() => {
                      ScrollTrigger.refresh()
                    }))
                  : (lenis.scrollTo(0, { immediate: !0, force: !0 }),
                    requestAnimationFrame(() => {
                      ScrollTrigger.refresh(),
                        'builders' === r &&
                          (initContentRevealScroll(), ScrollTrigger.refresh())
                    }))
            })
        },
      })
      .from(t, { autoAlpha: 0 })
      .to(a, { xPercent: 100 }, '<')
      .to(e, { background: 'rgba(1, 29, 15, 0)' }, '<')
  )
}
function runHeroAnimation(e) {
  if ('home' === e.getAttribute('data-barba-namespace')) return
  const t = e.querySelector('.section')
  if (t) {
    const r = t.querySelector('h1'),
      a = t.querySelector('[data-load-eyebrow]'),
      o = e.querySelectorAll('[data-load-stagger]'),
      n = e.querySelectorAll('[data-load-fade]'),
      i = e.querySelector('[data-load-img-mask]'),
      l = e.querySelector('[data-load-img-inner]'),
      s = e.querySelectorAll('[data-load-wrap-set]')
    let c, d
    r &&
      (c = SplitText.create(r, {
        type: 'lines, words, chars',
        wordsClass: 'word',
        charsClass: 'letter',
      })),
      a && (d = SplitText.create(a, { type: 'lines, words, chars' }))
    const u = gsap.timeline({ defaults: { ease: 'n47', duration: 0.9 } })
    s.length && u.set(s, { autoAlpha: 1 }),
      c &&
        c.chars &&
        u.from(c.chars, {
          autoAlpha: 0,
          yPercent: 100,
          scaleY: 1.5,
          stagger: 0.01,
        }),
      d &&
        d.chars &&
        u.from(
          d.chars,
          { autoAlpha: 0, yPercent: 400, stagger: { amount: 0.2 } },
          '<+=0.25'
        ),
      o.length &&
        (u.from(
          o,
          { autoAlpha: 0, stagger: 0.05, duration: 0.6, ease: 'ease' },
          '<'
        ),
        u.from(o, { y: '10em', stagger: 0.05 }, '<')),
      n.length &&
        u.from(
          n,
          {
            autoAlpha: 0,
            stagger: { amount: 0.3 },
            yPercent: 25,
            duration: 0.6,
          },
          '<'
        ),
      i &&
        u
          .from(i, { clipPath: 'inset(100% 0px 0px 0px)' }, '<')
          .from(l, { scale: 1.4 }, '<')
  }
}
function runHomeLoader(e) {
  const t = e.querySelector('.section'),
    r = t.querySelector('h1'),
    a = t.querySelector('p'),
    o =
      (t.querySelector('.home-hero__arrow'),
      document.querySelector('.nav-inner')),
    n = document.querySelector('.home-hero-wrap')
  MM.add(
    {
      isDesktop: `(min-width: ${BREAKPOINT}px)`,
      isMobile: `(max-width: ${BREAKPOINT - 1}px)`,
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (e) => {
      let { reduceMotion: t } = e.conditions
      if (!t) {
        var i = new SplitText(r, {
            type: 'lines, words, chars',
            charsClass: 'letter',
            mask: 'lines',
          }),
          l = new SplitText(a, { type: 'lines', mask: 'lines' })
        const e = Array.from([i.chars[0], i.chars[1], i.chars[2]]),
          t = Array.from([i.chars[3], i.chars[4], i.chars[5], i.chars[6]])
        gsap.set(i.chars, {
          textFillColor: 'transparent',
          textStrokeColor: 'white',
          textStrokeWidth: '1px',
        }),
          gsap.set(i.lines[0].parentElement, { yPercent: 65 }),
          gsap.set(l.lines, { yPercent: 200, autoAlpha: 0 }),
          gsap.set(i.words[1].querySelectorAll('.letter'), { yPercent: 100 }),
          gsap.set(e, { x: '0.9em' }),
          gsap.set(t, { x: '4em' }),
          gsap
            .timeline({ defaults: { duration: 0.5 } })
            .set(n, { autoAlpha: 1 })
            .from(o, { autoAlpha: 0 })
            .from(e, { yPercent: 110, stagger: 0.05 })
            .to(e, {
              x: '0em',
              textFillColor: 'white',
              textStrokeColor: 'transparent',
              stagger: 0.02,
            })
            .to(t, { x: '0em', stagger: 0.02 }, '<')
            .to(i.words[1].querySelectorAll('.letter'), {
              yPercent: 0,
              stagger: 0.02,
            })
            .set(
              i.lines[0].parentElement,
              { yPercent: 0, overflow: 'visible' },
              '<'
            )
            .set(i.lines[0].querySelectorAll('.letter'), { yPercent: 65 }, '<')
            .to(
              i.lines[0].querySelectorAll('.letter'),
              { yPercent: 0, stagger: 0.02 },
              '<'
            )
            .to(
              t,
              {
                textFillColor: 'white',
                textStrokeColor: 'transparent',
                stagger: 0.02,
              },
              '<'
            )
            .to(
              i.words[1].querySelectorAll('.letter'),
              {
                textFillColor: 'white',
                textStrokeColor: 'transparent',
                stagger: 0.01,
                duration: 0.3,
                ease: 'power1',
              },
              '<+=0.2'
            )
            .to(l.lines, { yPercent: 0, autoAlpha: 1, stagger: 0.075 }, '<')
      }
    }
  )
}
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase),
  CustomEase.create('n47', '0.65, 0.05, 0, 1'),
  gsap.defaults({ ease: 'n47', duration: 0.7 }),
  gsap.config({ nullWarning: !1 })
let resizeTimer,
  lenis,
  savedScrollStarted,
  savedScrollDirection,
  clearHomeCtx,
  isMobile = window.innerWidth < 480,
  isMobileLandscape = window.innerWidth < 768,
  isTablet = window.innerWidth < 992,
  previousWindowWidth = window.innerWidth,
  prefersRM = prefersReducedMotion(),
  MM = gsap.matchMedia(),
  BREAKPOINT = 768,
  FILTER_STATE = {},
  savedScrollPos = 0,
  lastPageHref = '/',
  modalOriginHref = null,
  modalStack = [],
  modalDepth = 0,
  returningToBuilders = !1,
  cameFromModalToBuilders = !1
barba.hooks.beforeLeave((e) => {
  'home' === e.current.namespace &&
    clearHomeCtx &&
    (clearHomeCtx(), (clearHomeCtx = null))
}),
  barba.hooks.leave((e) => {
    lenis.destroy()
    const t = e.current.container.getAttribute('data-filter-page'),
      r = e.next.container.getAttribute('data-filter-page')
    t && t !== r && (FILTER_STATE = {})
  }),
  barba.hooks.enter((e) => {
    initBarbaNavUpdate(e)
  }),
  barba.hooks.afterEnter((e) => {
    let t = e.next.container
    e.next.namespace,
      ScrollTrigger.getAll().forEach((e) => e.kill()),
      void 0 === Webflow.env('editor') &&
        (initLenis(), initLenisCheckScrollUpDown()),
      initGeneral(t),
      gsap.delayedCall(1, () => {
        ScrollTrigger.refresh()
      })
  }),
  barba.init({
    debug: !1,
    preventRunning: !0,
    prevent: function ({ el: e }) {
      if (e.hasAttribute('data-barba-prevent')) return !0
    },
    transitions: [
      {
        name: 'page-to-modal',
        from: {
          namespace: [
            'overview-modal',
            'builders',
            'home',
            'insights',
            'insight',
            'playbooks',
          ],
        },
        to: { namespace: ['modal'] },
        sync: !0,
        leave: (e) => (
          lenis.stop(),
          (modalOriginHref = e.current.url.path || e.current.url.href || '/'),
          (modalStack = []),
          (modalDepth = 1),
          runPageToModalTransition(e.current.container, e.next.container)
        ),
      },
      {
        name: 'modal-to-modal',
        from: { namespace: ['modal'] },
        to: { namespace: ['modal'] },
        sync: !0,
        leave(e) {
          lenis.stop()
          const t = e.current.url.href,
            r = e.next.url.href
          return (
            modalStack.length && r === modalStack[modalStack.length - 1]
              ? (modalStack.pop(), (modalDepth = Math.max(1, modalDepth - 1)))
              : (modalStack.push(t), (modalDepth += 1)),
            runPageToModalTransition(e.current.container, e.next.container)
          )
        },
      },
      {
        name: 'modal-to-page',
        from: { namespace: ['modal'] },
        to: {
          namespace: [
            'overview-modal',
            'builders',
            'home',
            'insights',
            'insight',
            'playbooks',
          ],
        },
        sync: !0,
        leave: (e) => (
          lenis.stop(),
          (returningToBuilders = !1),
          (modalStack = []),
          (modalDepth = 0),
          (modalOriginHref = null),
          runModalToPageTransition(
            e.current.container,
            e.next.container,
            e.next.namespace
          )
        ),
      },
      {
        name: 'custom',
        sync: !0,
        once(e) {
          initMenu(),
            'home' === e.next.namespace
              ? runHomeLoader(e.next.container)
              : runHeroAnimation(e.next.container)
        },
        leave: (e) => (
          window.scrollY,
          lenis.stop(),
          'open' === document.body.getAttribute('data-menu-status') &&
            document.querySelector('.menu-button').click(),
          runDefaultTransition(
            e.current.container,
            e.next.container,
            e.next.namespace
          )
        ),
      },
    ],
    views: [
      {
        namespace: 'home',
        afterEnter(e) {
          let t = e.next.container
          document.body.setAttribute('data-modal-page', 'false'),
            (clearHomeCtx = initHomeClientStack(t)),
            initPortfolioFollower(t),
            gsap.delayedCall(0.5, () => {
              initHomeHero(t)
            })
        },
      },
      {
        namespace: 'overview-modal',
        afterEnter(e) {
          let t = e.next.container
          'portfolio' === t.getAttribute('data-filter-page') &&
            initPortfolioFollower(t)
        },
      },
      {
        namespace: 'modal',
        afterEnter(e) {
          const t = e.next.container
          if (modalOriginHref || modalStack.length > 0) {
            const e =
              (modalDepth > 1 && modalStack[modalStack.length - 1]) ||
              modalOriginHref
            t.querySelectorAll('[data-modal-close]').forEach((t) => {
              t.dataset.originalHref ||
                (t.dataset.originalHref = t.getAttribute('href') || ''),
                t.tagName && 'a' === t.tagName.toLowerCase()
                  ? t.setAttribute('href', e)
                  : t.addEventListener('click', (t) => {
                      t.preventDefault(), barba.go(e)
                    })
            })
          }
          isMobileLandscape ||
            document.body.setAttribute('data-modal-page', 'true')
        },
        leave() {
          document.body.setAttribute('data-modal-page', 'false')
        },
      },
      {
        namespace: 'anticipate-failure',
        afterEnter(e) {
          initAFPage(e.next.container)
        },
      },
      {
        namespace: 'builders',
        afterEnter(e) {
          initSectionStack(e.next.container),
            initSectionsNav(e.next.container),
            initRotatingHeadlines(e.next.container),
            (returningToBuilders = !1),
            gsap.delayedCall(0.5, () => {
              ScrollTrigger.refresh()
            })
        },
      },
      {
        namespace: 'insights',
        beforeEnter(e) {
          initFilter(e.next.container, FILTER_STATE, !0)
        },
      },
      {
        namespace: 'insight',
        afterEnter() {
          gsap.delayedCall(1, () => {
            ScrollTrigger.refresh()
          })
        },
      },
      {
        namespace: 'not-found',
        afterEnter(e) {
          initHomeHero(e.next.container)
        },
      },
    ],
  })
