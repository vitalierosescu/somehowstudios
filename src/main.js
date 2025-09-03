;(() => {
  CustomEase.create('hop', '0.9, 0, 0.1, 1')
  let lenis

  const initLenis = () => {
    if (Webflow.env('editor')) return
    lenis = new Lenis({
      duration: 0.8,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }

  const initButton = () => {
    const offsetIncrement = 0.01 // Transition offset increment in seconds
    const buttons = document.querySelectorAll('[data-button-animate-chars]')

    buttons.forEach((button) => {
      const text = button.textContent // Get the button's text content
      button.innerHTML = '' // Clear the original content
      ;[...text].forEach((char, index) => {
        const span = document.createElement('span')
        span.textContent = char
        span.style.transitionDelay = `${index * offsetIncrement}s`

        // Handle spaces explicitly
        if (char === ' ') {
          span.style.whiteSpace = 'pre' // Preserve space width
        }

        button.appendChild(span)
      })
    })
  }

  const initParallax = () => {
    const mm = gsap.matchMedia()

    if (document.querySelector('.parallax-parent')) {
      mm.add('(min-width: 992px)', () => {
        // Animatie alleen op schermen groter dan 991px breed
        document
          .querySelectorAll('.parallax-parent')
          .forEach((parallaxParent) => {
            const parallaxImg = parallaxParent.querySelector('.parallax')

            if (parallaxImg) {
              const tl = gsap.timeline({
                defaults: {
                  ease: 'none',
                },
                scrollTrigger: {
                  trigger: parallaxParent,
                  start: 'clamp(top bottom)',
                  end: 'bottom top',
                  scrub: true,
                },
              })

              tl.to(parallaxImg, {
                yPercent: 18,
              })
            }
          })
      })

      mm.add('(max-width: 991px)', () => {
        // Schakel animatie uit op tablet en kleiner
        document
          .querySelectorAll('.parallax-parent')
          .forEach((parallaxParent) => {
            const parallaxImg = parallaxParent.querySelector('.parallax')
            if (parallaxImg) gsap.set(parallaxImg, { clearProps: 'all' })
          })
      })
    }
  }

  const initHomeHero = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'none',
      },
      scrollTrigger: {
        trigger: '.section_home--gallery',
        start: 'clamp(top bottom)',
        end: 'bottom 60%',
        scrub: true,
      },
    })

    tl.fromTo(
      '.home--hero_visual-wrapper.is-2',
      {
        y: '90vh',
      },
      { y: '0vh' }
    )
  }

  const initPreloader = (lenis) => {
    //const divider = document.querySelector('.loader_divider')

    // stop Lenis if available
    if (lenis && typeof lenis.stop === 'function') {
      lenis.stop()
    }

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: 'hop', duration: 1 },
    })

    gsap.set('.loader_emblem-wrap.is-2', { color: '#fdffdd' })

    tl.to('.loader_spinner', { opacity: 0, duration: 0.3 })
    tl.to('.loader_logo-svg', { y: '0%', delay: 0 })

    tl.to('#logo-1', { y: '100%', delay: 0.7 })
    tl.to('#logo-2', { y: '-100%' }, '<')

    tl.fromTo(
      '.loader_emblem-wrap.is-2',
      { scale: 1.1 },
      { scale: 1, duration: 1.5 },
      '<'
    )
    tl.to(
      '.loader_emblem-wrap.is-2',
      { color: 'black', duration: 0.1, delay: 0.9 },
      '<'
    )

    // filled svg
    tl.from('.loader_emblem.is-filled', { scale: 1.1, duration: 1.5 }, '<-.9')

    tl.from(
      '.loader_emblem.is-path path',
      { drawSVG: 0, ease: 'power2.inOut', duration: 4, delay: 0.4 },
      0
    )

    tl.to(
      '.loader_block',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.4,
        stagger: 0.1,
        delay: 0.75,
        onStart: () => {
          //gsap.to('.hero-img', { scale: 1, duration: 2, ease: 'hop' })
        },
        onComplete: () => {
          const loader = document.querySelector('.loader')
          if (loader) loader.style.pointerEvents = 'none'

          // restart Lenis if available
          if (lenis && typeof lenis.start === 'function') {
            lenis.start()
          }
        },
      },
      '<+1'
    )

    tl.to('.nav_logo-svg', { y: '0%', delay: 0, duration: 1.5 }, '<+1')
    tl.from('.nav_counter', { y: '100%', duration: 1.5 }, '<+=.1')
    tl.from(
      '.nav_wrapper .button_text',
      { y: '100%', stagger: 0.1, duration: 1.5 },
      '<+=.1'
    )
    tl.from(
      '.nav_wrapper .button_bg',
      { opacity: 0, scale: 0.8, stagger: 0.1, duration: 2 },
      '<+=.1'
    )
  }

  const initNavMobile = () => {
    // Toggle Navigation
    document
      .querySelectorAll('[data-navigation-toggle="toggle"]')
      .forEach((toggleBtn) => {
        toggleBtn.addEventListener('click', () => {
          const navStatusEl = document.querySelector('[data-navigation-status]')
          if (!navStatusEl) return
          if (
            navStatusEl.getAttribute('data-navigation-status') === 'not-active'
          ) {
            navStatusEl.setAttribute('data-navigation-status', 'active')
            // If you use Lenis you can 'stop' Lenis here: Example Lenis.stop();
          } else {
            navStatusEl.setAttribute('data-navigation-status', 'not-active')
            // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
          }
        })
      })

    // Close Navigation
    document
      .querySelectorAll('[data-navigation-toggle="close"]')
      .forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
          const navStatusEl = document.querySelector('[data-navigation-status]')
          if (!navStatusEl) return
          navStatusEl.setAttribute('data-navigation-status', 'not-active')
          // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
        })
      })

    // Key ESC - Close Navigation
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        const navStatusEl = document.querySelector('[data-navigation-status]')
        if (!navStatusEl) return
        if (navStatusEl.getAttribute('data-navigation-status') === 'active') {
          navStatusEl.setAttribute('data-navigation-status', 'not-active')
          // If you use Lenis you can 'start' Lenis here: Example Lenis.start();
        }
      }
    })
  }

  const initServices = () => {
    const mm = gsap.matchMedia()
    const services = gsap.utils.toArray('.service_card')
    if (!services.length) return

    // get a sensible container to pin
    const container =
      document.querySelector('.services') ||
      services[0].closest('.services') ||
      services[0].parentElement

    // remove CSS overlap during measurements
    gsap.set(services, { marginTop: 'unset' })

    mm.add('(min-width: 1001px)', () => {
      // build one scrubbed timeline that controls all cards
      const seg = services.map(() => ({ v: 0 }))

      const getGap = () => {
        // tune this to your design
        const mt =
          parseFloat(
            getComputedStyle(services[1] || services[0]).marginTop || '0'
          ) || 0
        return mt || 0
      }

      let gap = getGap()

      const tl = gsap.timeline({
        paused: true,
        onUpdate: () => {
          let cum = 0
          services.forEach((el, i) => {
            if (i === 0) return
            cum += seg[i].v
            gsap.set(el, { y: cum * gap })
          })
        },
      })

      // add a flat segment per card
      for (let i = 1; i < services.length; i++) {
        tl.to(seg[i], { v: 1, duration: 1, ease: 'none' }, '>')
      }

      // single pin, single spacer
      const st = ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinSpacing: true, // one spacer only
        start: 'top top',
        end: () => `+=${container.scrollHeight - services[0].clientHeight}`,
        scrub: true,
        invalidateOnRefresh: true,
        onRefreshInit: () => {
          gap = getGap()
        },
        onUpdate: (self) => tl.progress(self.progress),
      })

      // optional per-card inner shift during scroll
      const second = services[1] || services[0]
      const inners = services
        .map((s) => s.querySelector('.service_card-inner'))
        .slice(1)

      inners.forEach((inner, index) => {
        if (!inner) return
        gsap.to(inner, {
          y: `-${(services.length + index) * 15.6}rem`,
          ease: 'none',
          scrollTrigger: {
            trigger: second, // 2nd service item
            start: 'bottom bottom', // when its bottom hits viewport bottom
            end: () => `+=${container.scrollHeight - services[0].clientHeight}`,
            scrub: true,
            markers: true,
          },
        })
      })

      return () => {
        st.kill()
        tl.kill()
        gsap.set(services, { clearProps: 'y' })
        inners.forEach((i) => i && gsap.set(i, { clearProps: 'y' }))
      }
    })

    mm.add('(max-width: 1000px)', () => {
      // mobile, no pinning
      gsap.set(services, { clearProps: 'y' })
    })

    // handle resize
    window.addEventListener('resize', () => ScrollTrigger.refresh())
  }

  const initTextAnimation = () => {
    if (!window.gsap || !window.SplitType) {
      console.error(
        'AnimatedCopy: gsap and SplitType must be loaded before this script.'
      )
      return
    }

    var gsap = window.gsap
    var ScrollTrigger = window.ScrollTrigger
    if (ScrollTrigger && !gsap.core.globals().ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger)
    }

    window.initAnimatedCopy = function initAnimatedCopy(target, opts) {
      opts = opts || {}
      var delay = opts.delay != null ? opts.delay : 0
      var duration = opts.duration != null ? opts.duration : 1
      var ease = opts.ease || 'power4.out'
      var stagger = opts.stagger != null ? opts.stagger : 0.05
      var lineSelector = opts.lineSelector || ''
      var animateOnScroll = opts.animateOnScroll !== false
      var direction = opts.direction === 'top' ? 'top' : 'bottom'
      var start = opts.start || 'top 80%'

      var el =
        typeof target === 'string' ? document.querySelector(target) : target
      if (!el) return null
      if (el.dataset.acInitialized === 'true') return el._ac

      var id = 'copy-' + Math.floor(Math.random() * 10000)
      var lineClass = 'line-' + id
      var split = new window.SplitType(el, {
        types: 'lines',
        lineClass: lineClass,
      })

      var selector = lineSelector || '.' + lineClass
      var lines = Array.prototype.slice.call(
        document.querySelectorAll(selector)
      )
      var innerClass = 'line-inner-' + id

      lines.forEach(function (line) {
        var html = line.innerHTML
        line.innerHTML =
          '<span class="' +
          innerClass +
          '" style="display:block">' +
          html +
          '</span>'
      })

      var initialY = direction === 'top' ? '-100%' : '100%'
      gsap.set('.' + innerClass, { y: initialY })

      var tlConfig = { defaults: { ease: ease, duration: duration } }
      if (animateOnScroll && ScrollTrigger) {
        tlConfig.scrollTrigger = {
          trigger: el,
          start: start,
          toggleActions: 'play none none none',
        }
      }

      var tl = gsap.timeline(tlConfig)
      tl.to('.' + innerClass, { y: '0%', stagger: stagger, delay: delay })

      el.dataset.acInitialized = 'true'
      el._ac = {
        element: el,
        timeline: tl,
        split: split,
        kill: function () {
          try {
            tl.kill()
          } catch (e) {}
          if (animateOnScroll && ScrollTrigger) {
            var sts = ScrollTrigger.getAll()
            for (var i = 0; i < sts.length; i++) {
              if (sts[i].vars.trigger === el) sts[i].kill()
            }
          }
          try {
            split.revert()
          } catch (e) {}
          el.dataset.acInitialized = 'false'
          el._ac = null
        },
      }
      return el._ac
    }

    // Optional auto init: elements with data-animated-copy
    document.addEventListener('DOMContentLoaded', function () {
      var autoEls = document.querySelectorAll('[data-animated-copy]')
      autoEls.forEach(function (el) {
        if (el.dataset.acInitialized === 'true') return
        window.initAnimatedCopy(el, {
          delay: parseFloat(el.dataset.acDelay || '0') || 0,
          duration: parseFloat(el.dataset.acDuration || '1') || 1,
          ease: el.dataset.acEase || 'power4.out',
          stagger: parseFloat(el.dataset.acStagger || '0.05') || 0.05,
          animateOnScroll: el.dataset.acScroll === 'false' ? false : true,
          direction: el.dataset.acDirection || 'bottom',
          start: el.dataset.acStart || 'top 80%',
        })
      })
    })
  }

  const init = () => {
    initLenis()
    initPreloader(lenis)
    initButton()
    initParallax()
    initHomeHero()
    initNavMobile()
    initTextAnimation()

    initServices()
  }

  init()
})()
