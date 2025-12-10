;(() => {
  // CustomEase.create('ease-transition', '0.9, 0, 0.1, 1')
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText)
  CustomEase.create('ease-primary', '0.87, 0, 0.13, 1')
  CustomEase.create('ease-secondary', '0.16, 1, 0.35, 1')
  CustomEase.create('ease-tertiary', '0.53, 0.23, 0.25, 1')
  CustomEase.create('ease-menu', '.7,0,.22,1')
  CustomEase.create('ease-transition', '0.9, 0, 0.1, 1')
  CustomEase.create('ease-textloader', '0.83, 0, 0.17, 1')
  let lenis
  var transitionOffset = 375
  var transitionNormal = 0.875
  var transitionSlider = 1
  var isMobileScreen = window.matchMedia('(max-width: 767px)').matches
  const desktopQuery = '(min-width: 992px)'

  const loadWrap = document.querySelector('.load-w')
  const pageOverlay = document.querySelector('.page-overlay')
  const loadBg = loadWrap?.querySelector('.load-bg')
  const loadBlock = loadWrap?.querySelectorAll('.load-block')
  const navW = document.querySelector('.nav-w')

  let ranHomeLoader = false

  function prefersReducedMotion() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    return query.matches
  }

  function initLenis(isHome = false) {
    if (Webflow.env('editor')) return
    lenis = new Lenis({
      duration: 0.8,
      infinite: isHome ? true : false,
      // syncTouch: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    lenis.scrollTo(0, {
      offset: 0,
      duration: 0.2,
      force: true,
    })

    requestAnimationFrame(raf)
  }

  const setRanHomeLoader = () => {
    const STORAGE_KEY = 'ranHomeLoader'
    const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const now = Date.now()

    if (!stored || stored.expires < now || stored.value === 'false') {
      console.log('Running home loader for the first time...')
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          value: 'true',
          expires: now + WEEK_IN_MS,
        })
      )
    } else {
      console.log('Home loader already ran this week')
      ranHomeLoader = true
    }
  }

  setRanHomeLoader()

  //
  //
  // TRANSITIONS
  function transitionOut(current) {
    document.body.style.cursor = 'wait'
    gsap.set(loadWrap, { display: 'flex' })
    gsap.set(loadBlock, { transformOrigin: '50% 100%' })
    gsap.to(current, { y: '-10vh', duration: 1.2, ease: 'expo.inOut' })
    gsap.fromTo(
      pageOverlay,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'expo.inOut' }
    )
  }

  function transitionIn(next, name) {
    if (!next) {
      next = document.querySelector('[data-barba="container"]')
    }
    if (!name) {
      name = next.getAttribute('data-barba-namespace')
    }

    // nav elements
    const navLogo1 = document.querySelector('.nav_logo-svg.is-1')
    const navLogo2 = document.querySelector('.nav_logo-svg.is-2')

    const navLogo = document.querySelectorAll('.nav_logo-svg')

    const spinner = document.querySelector('.loader_spinner')
    const logoSvg = document.querySelectorAll('.loader_logo-svg')
    const logo1 = document.querySelector('#logo-1')
    const logo2 = document.querySelector('#logo-2')
    const loaderEmblemContainer = document.querySelector(
      '.loader_emblem-container'
    )
    const loaderEmblemWrap2 = document.querySelector('.loader_emblem-wrap.is-2')
    const loaderEmblemFill = document.querySelector('.loader_emblem.is-filled')
    const loaderEmblemPath = document.querySelector(
      '.loader_emblem.is-path path'
    )
    const loadBlock = document.querySelectorAll('.load-block')

    const navCounter = document.querySelector('.nav_counter')
    const navButtonText = document.querySelectorAll('.nav_wrapper .button_text')
    const navButtonBg = document.querySelectorAll('.nav_wrapper .button_bg')
    const homeHeroLoader = document.querySelector('.home--hero_loader')

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: 'ease-transition', duration: 1 },
    })

    gsap.set(navLogo1, { y: '-120%' })
    gsap.set(navLogo2, { y: '120%' })

    gsap.fromTo(
      pageOverlay,
      { opacity: 1 },
      { opacity: 0, duration: 1.2, ease: 'expo.inOut' }
    )

    // IF FIRST TIME ON HOME PAGE
    if (name === 'home' && !ranHomeLoader) {
      lenis.stop()
      document.querySelector('body').style.cursor = 'wait'
      gsap.set(loaderEmblemWrap2, { color: '#fdffdd' })
      gsap.set(loaderEmblemContainer, { display: 'flex' })
      gsap.set(homeHeroLoader, { display: 'none' })

      tl.to(spinner, { opacity: 0, duration: 0.3 })
      tl.to(logoSvg, { y: '0%', delay: 0 })
      tl.to(logo1, { y: '110%', delay: 0.7 })
      tl.to(logo2, { y: '-110%' }, '<')
      tl.fromTo(
        loaderEmblemWrap2,
        { scale: 1.1 },
        { scale: 1, duration: 1.5 },
        '<'
      )
      tl.to(
        loaderEmblemWrap2,
        { color: 'black', duration: 0.1, delay: 0.9 },
        '<'
      )
      tl.fromTo(
        loaderEmblemFill,
        { scale: 1.1 },
        { scale: 1, duration: 1.7 },
        '<-.9'
      )
      tl.from(
        loaderEmblemPath,
        { drawSVG: 0, ease: 'power2.inOut', duration: 5, delay: 0.4 },
        0
      )
      tl.to(
        loadBlock,
        {
          scaleY: 0,
          duration: 1.4,
          stagger: 0.1,
          delay: 0.75,
          onComplete: () => {
            const loader = document.querySelector('.load-w')
            if (loader) loader.style.pointerEvents = 'none'
            loader.style.display = 'none'
            document.body.style.cursor = 'default'
            homeHeroLoader.style.display = 'flex'
            loaderEmblemContainer.style.display = 'none'
            lenis.start()
          },
        },
        '<+1'
      )

      tl.to(navLogo, { y: '0%', duration: 1.5 }, '<+.5')
      tl.from(navCounter, { y: '100%', duration: 1.5 }, '<+=.1')
      tl.fromTo(
        navButtonText,
        { y: '100%' },
        { y: '0%', duration: 1.5, stagger: 0.1 },
        '<+=.1'
      )
      tl.fromTo(
        navButtonBg,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 2 },
        '<+=.1'
      )
    } else {
      let isHome = name === 'home' ? true : false

      // ELSE do a standard page loader
      gsap.fromTo(
        next,
        { y: '-10vh' },
        { y: '0vh', duration: 1, ease: 'expo.inOut' }
      )
      gsap.fromTo(
        loadBlock,
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 1,
          ease: 'ease-transition',
          stagger: 0.1,
          onComplete: () => {
            gsap.set(loadWrap, { display: 'none' })
            document.body.style.cursor = 'default'
          },
        }
      )
      if (isHome) {
        gsap.set('.loader_emblem-container.is--home', { display: 'flex' })
        gsap.set('.loader_emblem-container.is--home .loader_emblem-wrap.is-2', {
          display: 'none',
        })
      }

      tl.to(navLogo, { y: '0%', duration: 1.5 })
      tl.to(spinner, { opacity: 0, duration: 0 }, '<')
      tl.from(navCounter, { y: '100%', duration: 1.5 }, '<+=.1')
      tl.fromTo(
        navButtonText,
        { y: '100%' },
        { y: '0%', duration: 1.5, stagger: 0.1 },
        '<+=.1'
      )
      tl.fromTo(
        navButtonBg,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 2 },
        '<+=.1'
      )
    }
  }

  function initCheckWindowHeight() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh-in-px', `${vh}px`)
  }

  window.addEventListener('resize', () => {
    initCheckWindowHeight()
  })

  function resetWebflow(data) {
    let parser = new DOMParser()
    let dom = parser.parseFromString(data.next.html, 'text/html')
    let webflowPageId = $(dom).find('html').attr('data-wf-page')
    $('html').attr('data-wf-page', webflowPageId)
    window.Webflow && window.Webflow.destroy()
    window.Webflow && window.Webflow.ready()
    const ix2 = window.Webflow?.require('ix2')
    if (typeof ix2 !== 'undefined') {
      ix2.init()
    }
    // Remove ALL previous states everywhere
    $('a[aria-current="page"]').removeAttr('aria-current')
    $('a.w--current').removeClass('w--current')

    // Debug
    console.log('cleared all previous currents')

    // Re-apply state
    $('a[href]').each(function () {
      const href = $(this).attr('href')
      if (!href) return

      if (href === window.location.pathname) {
        $(this).addClass('w--current').attr('aria-current', 'page')
      }
    })
  }

  function debounce(func, wait) {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  var activeSplitTexts = []

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

        if (char === ' ') {
          span.style.whiteSpace = 'pre' // Preserve space width
        }

        button.appendChild(span)
      })
    })
  }

  const initParallax = (next) => {
    if (!next) {
      next = document.querySelector('[data-barba="container"]')
    }
    const mm = gsap.matchMedia()

    if (next.querySelector('.parallax-parent')) {
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
    const mm = gsap.matchMedia()

    const homeHero = document.querySelector(
      '.section_home--hero.is--hero .home--hero_fill'
    )
    const triggerEl = document.querySelector('.section_home--gallery')

    mm.add('(min-width: 992px)', () => {
      // Annimate intro picutre
      const tl = gsap.timeline({
        defaults: {
          ease: 'power1.out',
        },
        scrollTrigger: {
          trigger: triggerEl,
          start: 'clamp(top bottom)',
          end: 'bottom 20%',
          scrub: true,
        },
      })

      tl.fromTo(
        '.home--hero_visual-wrapper.is-2',
        {
          y: '90vh',
        },
        {
          y: '0vh',
        }
      )
      gsap.set(
        homeHero,
        {
          y: '0vh',
          ease: 'none',
        },
        0
      )

      // animateHero()
    })

    // Remove animations on tablet and down
    mm.add('(max-width: 991px)', () => {
      gsap.set(homeHero, { clearProps: 'all' })
      ScrollTrigger.refresh()
    })
  }

  const initNavMobile = () => {
    const navStatusEl = document.querySelector('[data-navigation-status]')
    // Toggle Navigation

    document
      .querySelector('[data-navigation-toggle="toggle"]')
      .addEventListener('click', () => {
        if (navStatusEl.getAttribute('data-navigation-status') === 'active') {
          navStatusEl.setAttribute('data-navigation-status', 'not-active')
          console.log('close nav')
          lenis.start()
          return
        } else {
          navStatusEl.setAttribute('data-navigation-status', 'active')
          lenis.stop()
          console.log('open nav')
          return
        }
      })

    const closeNav = () => {
      navStatusEl.setAttribute('data-navigation-status', 'not-active')
      lenis.start()
    }

    const openNav = () => {
      navStatusEl.setAttribute('data-navigation-status', 'active')
      lenis.start()
    }

    // Close Navigation
    document
      .querySelectorAll('[data-navigation-toggle="close"]')
      .forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
          closeNav()
        })
      })

    // Open Navigation
    document
      .querySelectorAll('[data-navigation-toggle="open"]')
      .forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => {
          openNav()
        })
      })

    // Key ESC - Close Navigation
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        if (navStatusEl.getAttribute('data-navigation-status') === 'active') {
          navStatusEl.setAttribute('data-navigation-status', 'not-active')
          lenis.start()
        }
      }
    })
  }

  function initSplitText() {
    const lineElements = document.querySelectorAll('[data-lines-split]')
    if (lineElements.length) {
      lineElements.forEach((element) => {
        if (element.hasAttribute('data-split-initialized')) {
          return
        }
        const parentSplit = new SplitText(element, {
          type: 'lines',
          linesClass: 'split-parent',
        })
        const childSplit = new SplitText(parentSplit.lines, {
          type: 'lines',
          linesClass: 'split-child',
        })
        element.parentSplit = parentSplit
        element.childSplit = childSplit
        element.setAttribute('data-split-initialized', 'true')
        activeSplitTexts.push(parentSplit, childSplit)
      })
    }
  }

  function initScrollTriggerAnimations() {
    const lineAnimElements = document.querySelectorAll(
      '[data-lines-split][data-animate-scroll]'
    )

    if (lineAnimElements.length) {
      lineAnimElements.forEach((element) => {
        const parentSplit = element.parentSplit
        const childSplit = element.childSplit
        if (!parentSplit || !childSplit) return
        // Animate from initial offset; ensure "from" state renders immediately
        gsap.from(childSplit.lines, {
          yPercent: 120,
          rotate: 0.001,
          duration: transitionSlider,
          ease: 'ease-secondary',
          stagger: 0.0625,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    }
  }

  const initHomeClientStack = (container) => {
    if (!container) {
      container = document.querySelector('[data-barba="container"]')
    }

    const sectionsToTransitionBg = container.querySelectorAll('.home--section')
    const homeHero = container.querySelector(
      '.section_home--hero.is--hero .home--hero_fill'
    )

    if (document.querySelector('.section_work-scroll')) {
      let triggerElement = $('.section_work-scroll')
      let slidesAmount = triggerElement.attr('data-slides-amount')
      let targetElement = triggerElement.find(
        '.work-scroll_sticky-wrap .col.col-grow'
      )
      console.log(slidesAmount)

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: true,
          // onEnter: () => {
          //   container.classList.remove('bg-yellow')
          //   sectionsToTransitionBg.forEach((section) => {
          //     section.classList.add('bg-white')
          //   })
          //   homeHero.classList.add('visibility-hidden')
          // },
          // onEnterBack: () => {
          //   container.classList.add('bg-yellow')
          //   sectionsToTransitionBg.forEach((section) => {
          //     section.classList.remove('bg-white')
          //   })
          //   homeHero.classList.remove('visibility-hidden')
          // },
        },
      })

      tl.to(homeHero, { autoAlpha: 0 })
      tl.to(sectionsToTransitionBg, { backgroundColor: '#ffffff' }, 0)
      tl.to(container, { backgroundColor: '#ffffff' }, 0)

      // Check the index of section in view
      function checkIndexSection() {
        var indexSections = document.querySelectorAll(
          '[data-work-height-index]'
        )
        var indexSectionsCount = $('[data-slides-amount]').attr(
          'data-slides-amount'
        )

        for (var i = 0; i < indexSections.length; i++) {
          var indexSection = indexSections[i]
          var indexSectionTop = indexSection.getBoundingClientRect().top
          var indexSectionBottom = indexSection.getBoundingClientRect().bottom
          var indexObserverOffset = window.innerHeight / 2

          if (
            indexSectionTop <= indexObserverOffset &&
            indexSectionBottom >= indexObserverOffset
          ) {
            var singleSectionIndex = $(indexSection).attr(
              'data-work-height-index'
            )
            var currentSlide = parseInt(singleSectionIndex)
            if (
              $('[data-slide-index-active]').attr('data-slide-index-active') ==
              singleSectionIndex
            ) {
              // do nothing
            } else {
              var currentSlidePercentage =
                ((currentSlide - 1) / indexSectionsCount) * -100 + '%'
              $('[data-slide-index-active]').attr(
                'data-slide-index-active',
                singleSectionIndex
              )
              $('.current-slide-index-change').text(singleSectionIndex)
              $('.section_work-scroll').css(
                '--current-slide-precentage',
                currentSlidePercentage
              )
              $('[data-slide-item-index]').attr(
                'data-slide-item-status',
                'not-active'
              )
              // $('[data-slide-item-index="' + (parseInt(singleSectionIndex)) +  '"]').prevAll().attr('data-slide-item-status', 'transition-out');
              $(
                '[data-slide-item-index="' + parseInt(singleSectionIndex) + '"]'
              ).attr('data-slide-item-status', 'active')
              // $('[data-slide-item-index="' + (parseInt(singleSectionIndex)) +  '"]').nextAll().attr('data-slide-item-status', 'transition-in');
            }
            $(
              '[data-thumb-video-status][data-slide-item-index="' +
                parseInt(singleSectionIndex) +
                '"]'
            )
              .attr('data-thumb-video-status', 'active')
              .find('video')
              .trigger('play')
            $(
              '[data-thumb-video-status][data-slide-item-index="' +
                parseInt(singleSectionIndex) +
                '"]'
            )
              .siblings()
              .attr('data-thumb-video-status', 'not-active')
              .find('video')
              .trigger('pause')
          }
        }
      }

      // Check when scrolling
      document.addEventListener('scroll', function () {
        checkIndexSection()
      })

      checkIndexSection()
    }
  }

  /** Nav scroll progress */
  function initScrollProgressNumber() {
    const progressCounter = document.querySelector('[data-progress-nr]')

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = Math.round(self.progress * 100) // Calculate progress as a percentage
        progressCounter.textContent = progress.toString().padStart(2, '0') // Update counter
      },
    })
  }

  // Handle click on elements with data-link="about" and animate targets
  function initAboutLinkAnimation(next) {
    const triggers = document.querySelectorAll('[data-link="about"]')
    if (!triggers.length) return
    if (!next) {
      next = document.querySelector('[data-barba="container"]')
    }
    let namespace = next.getAttribute('data-barba-namespace')

    const targets = []

    if (namespace === 'about') return

    const aboutSection = document.querySelector('.section_about')
    const loader = document.querySelector('.load-w')
    const navigation = document.querySelector('.navigation')
    let mainWrapper

    if (namespace === 'home') {
      // mainWrapper = next.querySelector('.main-wrapper')
      mainWrapper = next
    } else {
      mainWrapper = next

      console.log('Main Wrapper:', mainWrapper)
    }

    targets.push(navigation)
    targets.push(loader)
    targets.push(mainWrapper)

    if (!aboutSection) return

    // build timeline
    const tl = gsap.timeline({
      paused: true,
      reversed: true,
      onStart: () => {
        lenis.stop()
      },
      onReverseComplete: () => {
        lenis.start()
      },
    })

    tl.to(targets, {
      marginTop: '45rem',
      duration: 1.6,
      ease: 'ease-primary',
    })

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (trigger.tagName === 'A') event.preventDefault()
        aboutSection.classList.add('is--active')

        if (tl.reversed()) {
          tl.play()
        } else {
          tl.reverse()
        }
      })
    })

    const allLinks = document.querySelectorAll(
      'a[href]:not([data-link="about"])'
    )
    allLinks.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (trigger.tagName === 'A') event.preventDefault()

        if (tl.reversed()) {
          //tl.play()
        } else {
          tl.reverse()
        }
      })
    })
  }

  const initReviewSlider = (next) => {
    if (!next) {
      next = document.querySelector('[data-barba="container"]')
    }

    document
      .querySelectorAll('.tab_wrap')
      .forEach((tabWrap, componentIndex) => {
        // Prevent double-init
        if (tabWrap.dataset.scriptInitialized) return
        tabWrap.dataset.scriptInitialized = 'true'

        // Config from data-attributes
        let loopControls =
            tabWrap.getAttribute('data-loop-controls') === 'true',
          slideTabs = tabWrap.getAttribute('data-slide-tabs') === 'true', // sliding vs fading animation
          autoplay =
            Number(tabWrap.getAttribute('data-autoplay-duration')) || 0,
          duration = Number(tabWrap.getAttribute('data-duration')) || 0.3,
          buttonList = tabWrap.querySelector('.tab_button_list'),
          panelList = tabWrap.querySelector('.tab_content_list'),
          previousButton = tabWrap.querySelector(
            "[data-tab='previous'] button"
          ),
          nextButton = tabWrap.querySelector("[data-tab='next'] button"),
          animating = false,
          autoplayTl

        // Helper: flatten Webflow CMS lists into static children
        function removeCMSList(slot) {
          const dynList = Array.from(slot.children).find((child) =>
            child.classList.contains('w-dyn-list')
          )
          if (!dynList) return
          const nestedItems = dynList?.firstElementChild?.children
          if (!nestedItems) return
          const staticWrapper = [...slot.children]
          ;[...nestedItems].forEach(
            (el) =>
              el.firstElementChild && slot.appendChild(el.firstElementChild)
          )
          staticWrapper.forEach((el) => el.remove())
        }
        // removeCMSList(buttonList)
        removeCMSList(panelList)

        // let buttonItems = Array.from(buttonList.children)
        let panelItems = Array.from(panelList.children)

        // Safety check
        if (
          // !buttonList ||
          !panelList ||
          // !buttonItems.length ||
          !panelItems.length
        ) {
          console.warn('Missing elements in:', tabWrap)
          return
        }

        // Accessibility setup
        panelItems.forEach((panel) => {
          panel.style.display = 'none'
          panel.setAttribute('role', 'tabpanel')
        })
        // buttonItems.forEach((button) => button.setAttribute('role', 'tab'))
        panelList.removeAttribute('role')
        // buttonList.setAttribute('role', 'tablist')

        let activeIndex = 0

        // Core function: switch active tab
        const makeActive = (
          index,
          focus = false,
          animate = true,
          pause = true
        ) => {
          if (animating) return

          const currentEl = document.querySelector('[data-tab-current-index]')
          const totalEl = document.querySelector('[data-tab-total]')
          if (currentEl) currentEl.textContent = index + 1 // 1-based index
          if (totalEl) totalEl.textContent = panelItems.length

          panelItems.forEach((panel, i) =>
            panel.classList.toggle('is-active', i === index)
          )

          // Enable/disable nav buttons
          if (nextButton)
            nextButton.disabled =
              index === panelItems.length - 1 && !loopControls
          if (previousButton)
            previousButton.disabled = index === 0 && !loopControls

          if (focus) panelItems[index].focus()

          const previousPanel = panelItems[activeIndex]
          const currentPanel = panelItems[index]
          let direction = activeIndex > index ? -1 : 1

          // --- Animation logic ---
          if (typeof gsap !== 'undefined' && animate && activeIndex !== index) {
            // Reset autoplay if running
            if (autoplayTl && typeof autoplayTl.restart === 'function') {
              autoplayTl.restart()
              if (pause) {
                autoplayTl.progress(0)
                autoplayTl.pause()
                gsap.set(tabWrap, { '--progress': 1 })
              }
            }

            animating = true
            let tl = gsap.timeline({
              onComplete: () => (animating = false),
              defaults: { duration: duration, ease: 'power1.out' },
            })

            if (slideTabs) {
              // Slide transition
              tl.set(currentPanel, { display: 'block', position: 'relative' })
              if (previousPanel)
                tl.set(previousPanel, {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                })
              if (previousPanel)
                tl.fromTo(
                  previousPanel,
                  { xPercent: 0 },
                  { xPercent: -120 * direction }
                )
              tl.fromTo(
                currentPanel,
                { xPercent: 120 * direction },
                { xPercent: 0 },
                '<'
              )
              if (previousPanel) tl.set(previousPanel, { display: 'none' })

              // 👉 Here you could inject extra transition code
              // e.g. background fade, scale animation
            } else {
              // Fade transition
              if (previousPanel) tl.to(previousPanel, { opacity: 0 })
              if (previousPanel) tl.set(previousPanel, { display: 'none' })
              tl.set(currentPanel, { display: 'block' })
              tl.fromTo(currentPanel, { opacity: 0 }, { opacity: 1 })

              // 👉 This is the spot to add custom fades or intro animations
            }
          } else {
            // No animation fallback
            if (previousPanel) previousPanel.style.display = 'none'
            if (currentPanel) currentPanel.style.display = 'block'
          }

          // Scroll active button into view
          panelList.scrollTo({
            left: panelItems[index].offsetLeft,
            behavior: 'smooth',
          })
          activeIndex = index
        }

        // Init with first tab
        makeActive(0, false, false)

        // Helper to move to next/prev tab
        const updateIndex = (delta, focus = false, pause = true) =>
          makeActive(
            (activeIndex + delta + panelItems.length) % panelItems.length,
            focus,
            true,
            pause
          )

        nextButton?.addEventListener('click', () => updateIndex(1))
        previousButton?.addEventListener('click', () => updateIndex(-1))

        // Autoplay setup
        if (autoplay !== 0 && typeof gsap !== 'undefined') {
          autoplayTl = gsap.timeline({ repeat: -1 }).fromTo(
            tabWrap,
            { '--progress': 0 },
            {
              '--progress': 1,
              ease: 'power2.inOut',
              duration: autoplay,
              onComplete: () => updateIndex(1, false, false),
            }
          )

          // Pause autoplay on hover, focus, out of view, or prefers-reduced-motion
          let isHovered = false,
            hasFocusInside = false,
            prefersReducedMotion = false,
            inView = true
          function updateAuto() {
            if (prefersReducedMotion || !inView || isHovered || hasFocusInside)
              autoplayTl.pause()
            else autoplayTl.play()
          }
          function handleMotionChange(e) {
            prefersReducedMotion = e.matches
            updateAuto()
          }
          handleMotionChange(
            window.matchMedia('(prefers-reduced-motion: reduce)')
          )
          window
            .matchMedia('(prefers-reduced-motion: reduce)')
            .addEventListener('change', handleMotionChange)

          tabWrap.addEventListener('mouseenter', () => {
            isHovered = true
            updateAuto()
          })
          tabWrap.addEventListener('mouseleave', () => {
            hasFocusInside = false
            isHovered = false
            updateAuto()
          })
          tabWrap.addEventListener('focusin', () => {
            hasFocusInside = true
            updateAuto()
          })
          tabWrap.addEventListener('focusout', (e) => {
            if (!e.relatedTarget || !tabWrap.contains(e.relatedTarget)) {
              hasFocusInside = false
              updateAuto()
            }
          })

          new IntersectionObserver(
            (e) => {
              inView = e[0].isIntersecting
              updateAuto()
            },
            { threshold: 0 }
          ).observe(tabWrap)
        }
      })

    const triggerElement = document.querySelector('.section_reviews')
    const homeHero = document.querySelector(
      '.section_home--hero.is--hero .home--hero_fill'
    )
    const sectionsToTransitionBg = document.querySelectorAll('.home--section')

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    tl.to(homeHero, { autoAlpha: 1 })
    tl.to(sectionsToTransitionBg, { backgroundColor: '#fdffdd' }, 0)
    tl.to(next, { backgroundColor: '#fdffdd' }, 0)
  }

  function initDirectionalListHover(container) {
    container = document.querySelector('body')
    if (!container) return
    const directionMap = {
      top: 'translateY(-100%)',
      bottom: 'translateY(100%)',
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
    }

    document
      .querySelectorAll('[data-directional-hover]')
      .forEach((container) => {
        const type = container.getAttribute('data-type') || 'all'

        container
          .querySelectorAll('[data-directional-hover-item]')
          .forEach((item) => {
            const tile = item.querySelector('[data-directional-hover-tile]')
            if (!tile) return

            item.addEventListener('mouseenter', (e) => {
              const dir = getDirection(e, item, type)
              tile.style.transition = 'none'
              tile.style.transform = directionMap[dir] || 'translate(0, 0)'
              void tile.offsetHeight
              tile.style.transition = ''
              tile.style.transform = 'translate(0%, 0%)'
              item.setAttribute('data-status', `enter-${dir}`)
            })

            item.addEventListener('mouseleave', (e) => {
              const dir = getDirection(e, item, type)
              item.setAttribute('data-status', `leave-${dir}`)
              tile.style.transform = directionMap[dir] || 'translate(0, 0)'
            })
          })

        function getDirection(event, el, type) {
          const { left, top, width: w, height: h } = el.getBoundingClientRect()
          const x = event.clientX - left
          const y = event.clientY - top

          if (type === 'y') return y < h / 2 ? 'top' : 'bottom'
          if (type === 'x') return x < w / 2 ? 'left' : 'right'

          const distances = {
            top: y,
            right: w - x,
            bottom: h - y,
            left: x,
          }

          return Object.entries(distances).reduce((a, b) =>
            a[1] < b[1] ? a : b
          )[0]
        }
      })
  }

  const initAccordion = (container) => {
    if (!container) {
      container = document.querySelector('[data-barba="container"]')
    }

    container
      .querySelectorAll('.accordion_wrap')
      .forEach((component, listIndex) => {
        if (component.dataset.scriptInitialized) return
        component.dataset.scriptInitialized = 'true'

        const closePrevious =
          component.getAttribute('data-close-previous') !== 'false'
        const closeOnSecondClick =
          component.getAttribute('data-close-on-second-click') !== 'false'
        const openOnHover =
          component.getAttribute('data-open-on-hover') === 'true'
        const openByDefault =
          component.getAttribute('data-open-by-default') !== null &&
          !isNaN(+component.getAttribute('data-open-by-default'))
            ? +component.getAttribute('data-open-by-default')
            : false
        const list = component.querySelector('.accordion_list')
        let previousIndex = null,
          closeFunctions = []

        function removeCMSList(slot) {
          const dynList = Array.from(slot.children).find((child) =>
            child.classList.contains('w-dyn-list')
          )
          if (!dynList) return
          const nestedItems = dynList?.firstElementChild?.children
          if (!nestedItems) return
          const staticWrapper = [...slot.children]
          ;[...nestedItems].forEach(
            (el) =>
              el.firstElementChild && slot.appendChild(el.firstElementChild)
          )
          staticWrapper.forEach((el) => el.remove())
        }
        removeCMSList(list)

        component
          .querySelectorAll('.accordion_component')
          .forEach((card, cardIndex) => {
            const button = card.querySelector('.accordion_toggle_button')
            const content = card.querySelector('.accordion_content_wrap')
            const icon = card.querySelector('.accordion_toggle_icon')

            if (!button || !content || !icon)
              return console.warn('Missing elements:', card)

            button.setAttribute('aria-expanded', 'false')
            button.setAttribute(
              'id',
              'accordion_button_' + listIndex + '_' + cardIndex
            )
            content.setAttribute(
              'id',
              'accordion_content_' + listIndex + '_' + cardIndex
            )
            button.setAttribute('aria-controls', content.id)
            content.setAttribute('aria-labelledby', button.id)
            content.style.display = 'none'

            const refresh = () => {
              tl.invalidate()
              if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh()
            }
            const tl = gsap.timeline({
              paused: true,
              defaults: { duration: 0.3, ease: 'ease-textloader' },
              onComplete: refresh,
              onReverseComplete: refresh,
            })
            tl.set(content, { display: 'block' })
            tl.fromTo(content, { height: 0 }, { height: 'auto' })
            tl.fromTo(icon, { rotate: 0 }, { rotate: -225 }, '<')

            const closeAccordion = () =>
              card.classList.contains('is-opened') &&
              (card.classList.remove('is-opened'),
              tl.reverse(),
              button.setAttribute('aria-expanded', 'false'))
            closeFunctions[cardIndex] = closeAccordion

            const openAccordion = (instant = false) => {
              if (
                closePrevious &&
                previousIndex !== null &&
                previousIndex !== cardIndex
              )
                closeFunctions[previousIndex]?.()
              previousIndex = cardIndex
              button.setAttribute('aria-expanded', 'true')
              card.classList.add('is-opened')
              instant ? tl.progress(1) : tl.play()
            }
            if (openByDefault === cardIndex + 1) openAccordion(true)

            button.addEventListener('click', () =>
              card.classList.contains('is-opened') && closeOnSecondClick
                ? (closeAccordion(), (previousIndex = null))
                : openAccordion()
            )
            if (openOnHover)
              button.addEventListener('mouseenter', () => openAccordion())
          })
      })
  }

  const projectsSlider = (next) => {
    if (!next) {
      next = document.querySelector('[data-barba="container"]')
    }

    if (next.querySelectorAll('.slider_wrap:not(.w-condition-invisible)')) {
      next
        .querySelectorAll('.slider_wrap:not(.w-condition-invisible)')
        .forEach((wrap) => {
          if (wrap.dataset.scriptInitialized) return
          wrap.dataset.scriptInitialized = 'true'

          const cmsWrap = wrap.querySelector('.slider_cms_wrap')
          wrap
            .querySelectorAll('.slider_cms_item.w-condition-invisible')
            .forEach((el) => el.remove())

          if (!cmsWrap) {
            console.warn('Missing required elements for Swiper in:', wrap)
            return
          }

          const swiper = new Swiper(cmsWrap, {
            slidesPerView: 'auto',
            followFinger: true,
            freeMode: false,
            slideToClickedSlide: false,
            centeredSlides: false,
            autoHeight: false,
            speed: 600,
            mousewheel: {
              forceToAxis: true,
            },
            loop: true,
            keyboard: {
              enabled: true,
              onlyInViewport: true,
            },
            autoplay: {
              delay: 3500,
            },
            navigation: {
              nextEl: wrap.querySelector('.slider_btn_element.is-next'),
              prevEl: wrap.querySelector('.slider_btn_element.is-prev'),
            },
            pagination: {
              el: wrap.querySelector('.slider_bullet_wrap'),
              bulletActiveClass: 'is-active',
              bulletClass: 'slider_bullet_item',
              bulletElement: 'button',
              clickable: true,
            },
            scrollbar: {
              el: wrap.querySelector('.slider_draggable_wrap'),
              draggable: true,
              dragClass: 'slider_draggable_handle',
              snapOnRelease: true,
            },
            slideActiveClass: 'is-active',
            slideDuplicateActiveClass: 'is-active',
          })
        })
    }
  }

  const initForm = () => {
    document.querySelectorAll('.form_input').forEach((field) => {
      const label = field
        .closest('.form-field-group')
        ?.querySelector('.form_label')
      const isTextarea = field
        .closest('.form-field-group')
        ?.querySelector('.form_input.is-text-area')

      // On focus in
      field.addEventListener('focusin', () => {
        if (label) label.classList.remove('is-large')
        if (isTextarea) field.classList.add('is-active')
      })

      // On focus out
      field.addEventListener('focusout', () => {
        const isEmpty = field.value.trim().length === 0
        if (isEmpty && label) label.classList.add('is-large')
        if (isTextarea && isEmpty) field.classList.remove('is-active')
      })

      // On load
      if (field.value.trim().length > 0) {
        if (label) label.classList.remove('is-large')
        if (isTextarea) field.classList.add('is-active')
      }
    })
  }

  function initBasicFormValidation() {
    const forms = document.querySelectorAll('[data-form-validate]')

    forms.forEach((form) => {
      const fields = form.querySelectorAll(
        '[data-validate] input, [data-validate] textarea'
      )
      const submitButtonDiv = form.querySelector('[data-submit]') // The div wrapping the submit button
      const submitInput = submitButtonDiv.querySelector('input[type="submit"]') // The actual submit button

      // Capture the form load time
      const formLoadTime = new Date().getTime() // Timestamp when the form was loaded

      // Function to validate individual fields (input or textarea)
      const validateField = (field) => {
        const parent = field.closest('[data-validate]') // Get the parent div
        const minLength = field.getAttribute('min')
        const maxLength = field.getAttribute('max')
        const type = field.getAttribute('type')
        let isValid = true

        // Check if the field has content
        if (field.value.trim() !== '') {
          parent.classList.add('is--filled')
        } else {
          parent.classList.remove('is--filled')
        }

        // Validation logic for min and max length
        if (minLength && field.value.length < minLength) {
          isValid = false
        }

        if (maxLength && field.value.length > maxLength) {
          isValid = false
        }

        // Validation logic for email input type
        if (type === 'email' && !/\S+@\S+\.\S+/.test(field.value)) {
          isValid = false
        }

        // Add or remove success/error classes on the parent div
        if (isValid) {
          parent.classList.remove('is--error')
          parent.classList.add('is--success')
        } else {
          parent.classList.remove('is--success')
          parent.classList.add('is--error')
        }

        return isValid
      }

      // Function to start live validation for a field
      const startLiveValidation = (field) => {
        field.addEventListener('input', function () {
          validateField(field)
        })
      }

      // Function to validate and start live validation for all fields, focusing on the first field with an error
      const validateAndStartLiveValidationForAll = () => {
        let allValid = true
        let firstInvalidField = null

        fields.forEach((field) => {
          const valid = validateField(field)
          if (!valid && !firstInvalidField) {
            firstInvalidField = field // Track the first invalid field
          }
          if (!valid) {
            allValid = false
          }
          startLiveValidation(field) // Start live validation for all fields
        })

        // If there is an invalid field, focus on the first one
        if (firstInvalidField) {
          firstInvalidField.focus()
        }

        return allValid
      }

      // Anti-spam: Check if form was filled too quickly
      const isSpam = () => {
        const currentTime = new Date().getTime()
        const timeDifference = (currentTime - formLoadTime) / 1000 // Convert milliseconds to seconds
        return timeDifference < 5 // Return true if form is filled within 5 seconds
      }

      // Handle clicking the custom submit button
      submitButtonDiv.addEventListener('click', function () {
        // Validate the form first
        if (validateAndStartLiveValidationForAll()) {
          // Only check for spam after all fields are valid
          if (isSpam()) {
            alert('Form submitted too quickly. Please try again.')
            return // Stop form submission
          }
          submitInput.click() // Simulate a click on the <input type="submit">
        }
      })

      // Handle pressing the "Enter" key
      form.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
          event.preventDefault() // Prevent the default form submission

          // Validate the form first
          if (validateAndStartLiveValidationForAll()) {
            // Only check for spam after all fields are valid
            if (isSpam()) {
              alert('Form submitted too quickly. Please try again.')
              return // Stop form submission
            }
            submitInput.click() // Trigger our custom form submission
          }
        }
      })
    })
  }

  /*
  function initServices(container) {
    let onResize, dc
    const ctx = gsap.context(() => {
      const panels = Array.from(container.querySelectorAll('.service_card'))
      if (panels.length < 3) return
      const offsetNumber = parseFloat(gsap.getProperty(panels[1], 'top'))
      const getOffset = () => offsetNumber
      console.log(offsetNumber)
      const contrib = panels.map(() => ({}))
      function sum(obj) {
        let s = 0
        for (const k in obj) s += obj[k]
        return s
      }
      function applyFor(idx) {
        const y = -getOffset() * sum(contrib[idx])
        gsap.set(panels[idx], { y })
      }
      panels.forEach((panel, i) => {
        if (i < 2) return
        const a = i - 1
        const b = i - 2
        ScrollTrigger.create({
          trigger: panel,
          start: () => `top ${getOffset() * 2}px`,
          end: () => `+=${getOffset()}px`,
          scrub: true,
          onUpdate: (self) => {
            contrib[a][i] = self.progress
            contrib[b][i] = self.progress
            applyFor(a)
            applyFor(b)
          },
          onRefresh: () => {
            applyFor(a)
            applyFor(b)
          },
        })
      })
      const refresh = () => {
        if (typeof lenis?.resize === 'function') lenis.resize()
        ScrollTrigger.refresh()
      }
      dc = gsap.delayedCall(0.8, refresh)
      let lastW = window.innerWidth
      onResize = debounce(() => {
        const w = window.innerWidth
        if (w === lastW) return
        lastW = w
        refresh()
      }, 200)
      window.addEventListener('resize', onResize)
    }, container)
    return () => {
      window.removeEventListener('resize', onResize)
      if (dc) dc.kill()
      ctx.revert()
    }
  }
    */

  // Function to handle scroll-triggered animations
  const initServices = () => {
    // const mm = gsap.matchMedia()
    // mm.add('(min-width: 992px)', () => {
    //   const contentElements = [...document.querySelectorAll('.service_card')]
    //   const totalContentElements = contentElements.length
    //   contentElements.forEach((el, position) => {
    //     const isLast = position === totalContentElements - 1
    //     const isEven = position % 2 === 0
    //     gsap
    //       .timeline({
    //         scrollTrigger: {
    //           trigger: el,
    //           start: 'bottom 75%',
    //           end: '+=100%',
    //           scrub: true,
    //         },
    //       })
    //       .to(
    //         el.querySelector('.service_card-inner'),
    //         {
    //           ease: 'power1.in',
    //           // rotate: isLast ? 0 : 5 * (isEven ? -1 : 1),
    //           // x: isLast ? 0 : 80 * (isEven ? -1 : 1),
    //           // y: isLast ? 0 : '10vh',
    //         },
    //         0
    //       )
    //       .to(
    //         el,
    //         {
    //           ease: 'power1.in',
    //           y: isLast ? 0 : '40vh',
    //         },
    //         0
    //       )
    //       .to(
    //         el.querySelector('.service_bg'),
    //         {
    //           ease: 'power1.in',
    //           scale: isLast ? 1 : 0.65,
    //           // rotate: isLast ? 0 : 5 * (isEven ? -1 : 1),
    //           startAt: { filter: 'brightness(100%) contrast(100%)' },
    //           filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
    //         },
    //         0
    //       )
    //   })
    // })
  }

  const initPlayVideos = (container) => {
    const videos = container.querySelectorAll('video')
    videos.forEach((video) => {
      video.play().catch((error) => {
        console.warn('Video play was prevented:', error)
      })
    })
  }

  /**
   * Theme Collector 1.1.1
   * Released under the MIT License
   * Released on: January 17, 2025
   */

  function getColorThemes() {
    const STORAGE_KEYS = {
      THEMES: 'colorThemes_data',
      PUBLISH_DATE: 'colorThemes_publishDate',
    }
    function getPublishDate() {
      const htmlComment = document.documentElement.previousSibling
      return htmlComment?.nodeType === Node.COMMENT_NODE
        ? new Date(
            htmlComment.textContent.match(/Last Published: (.+?) GMT/)[1]
          ).getTime()
        : null
    }

    function loadFromStorage() {
      try {
        const storedPublishDate = localStorage.getItem(
            STORAGE_KEYS.PUBLISH_DATE
          ),
          currentPublishDate = getPublishDate()
        if (
          !currentPublishDate ||
          !storedPublishDate ||
          storedPublishDate !== currentPublishDate.toString()
        )
          return null
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.THEMES))
      } catch (error) {
        console.warn('Failed to load from localStorage:', error)
        return null
      }
    }

    function saveToStorage(themes) {
      try {
        const publishDate = getPublishDate()
        if (publishDate) {
          localStorage.setItem(
            STORAGE_KEYS.PUBLISH_DATE,
            publishDate.toString()
          )
          localStorage.setItem(STORAGE_KEYS.THEMES, JSON.stringify(themes))
        }
      } catch (error) {
        console.warn('Failed to save to localStorage:', error)
      }
    }

    window.colorThemes = {
      themes: {},
      getTheme(themeName = '', brandName = '') {
        if (!themeName)
          return this.getTheme(Object.keys(this.themes)[0], brandName)
        const theme = this.themes[themeName]
        if (!theme) return {}
        if (!theme.brands || Object.keys(theme.brands).length === 0)
          return theme
        if (!brandName) return theme.brands[Object.keys(theme.brands)[0]]
        return theme.brands[brandName] || {}
      },
    }

    const cachedThemes = loadFromStorage()
    if (cachedThemes) {
      window.colorThemes.themes = cachedThemes
      document.dispatchEvent(new CustomEvent('colorThemesReady'))
      return
    }

    const firstLink = document.querySelector('link[rel="stylesheet"]')
    if (!firstLink?.href) return null

    const themeVariables = new Set(),
      themeClasses = new Set(),
      brandClasses = new Set()

    fetch(firstLink.href)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to fetch stylesheet: ${response.statusText}`)
        return response.text()
      })
      .then((cssText) => {
        ;(cssText.match(/--_theme[\w-]+:\s*[^;]+/g) || []).forEach((variable) =>
          themeVariables.add(variable.split(':')[0].trim())
        )
        ;(cssText.match(/\.u-(theme|brand)-[\w-]+/g) || []).forEach(
          (className) => {
            if (className.startsWith('.u-theme-')) themeClasses.add(className)
            if (className.startsWith('.u-brand-')) brandClasses.add(className)
          }
        )

        const themeVariablesArray = Array.from(themeVariables)
        function checkClass(themeClass, brandClass = null) {
          let documentClasses = document.documentElement.getAttribute('class')
          document.documentElement.setAttribute('class', '')
          document.documentElement.classList.add(themeClass, brandClass)
          const styleObject = {}
          themeVariablesArray.forEach(
            (variable) =>
              (styleObject[variable] = getComputedStyle(
                document.documentElement
              ).getPropertyValue(variable))
          )
          document.documentElement.setAttribute('class', documentClasses)
          return styleObject
        }

        themeClasses.forEach((themeClassWithDot) => {
          const themeName = themeClassWithDot
            .replace('.', '')
            .replace('u-theme-', '')
          window.colorThemes.themes[themeName] = { brands: {} }
          brandClasses.forEach((brandClassWithDot) => {
            const brandName = brandClassWithDot
              .replace('.', '')
              .replace('u-brand-', '')
            window.colorThemes.themes[themeName].brands[brandName] = checkClass(
              themeClassWithDot.replace('.', ''),
              brandClassWithDot.replace('.', '')
            )
          })
          if (!brandClasses.size)
            window.colorThemes.themes[themeName] = checkClass(
              themeClassWithDot.replace('.', '')
            )
        })

        saveToStorage(window.colorThemes.themes)
        document.dispatchEvent(new CustomEvent('colorThemesReady'))
      })
      .catch((error) => console.error('Error:', error.message))
  }
  window.addEventListener('DOMContentLoaded', (event) => {
    getColorThemes()
    console.log(window.colorThemes)
  })

  /**
   *
   *
   *
   * NAV
   *
   *
   */

  const initCheckTheme = (container) => {
    if (!container) {
      container = document.querySelector('[data-barba="container"]')
    }
    const themeApi = window.colorThemes
    if (!themeApi) {
      console.warn('colorThemes is not ready yet')
      //return
    }
    let isDark = container.getAttribute('data-theme') === 'dark'
    let isLight = container.getAttribute('data-theme') === 'light'

    setTimeout(() => {
      if (isDark) {
        document.querySelector('body').classList.remove('u-theme-light')
        document.querySelector('body').classList.add('u-theme-dark')
      } else if (isLight) {
        document.querySelector('body').classList.remove('u-theme-dark')
        document.querySelector('body').classList.add('u-theme-light')
      }
    }, 100)

    let originalThemeColor = container.getAttribute('data-theme') || 'light'
    let originalTheme = { ...themeApi.getTheme(originalThemeColor) }

    const targetToAnimate = document.querySelector('.page-wrap')
    let currentTheme = originalTheme // Keep track of current theme

    $('[data-theme]').each(function () {
      const defaultDuration = 0.5
      let newTheme = themeApi.getTheme($(this).attr('data-theme'))
      currentTheme = newTheme // Update to the new theme
      console.log(currentTheme)
      gsap.to(targetToAnimate, {
        ...newTheme,
        duration: defaultDuration,
      })
    })

    console.log('this ran')
  }

  /**
   *
   * INITS
   *
   */
  const initGlobal = (container) => {
    initButton()
    initLenis()
    initCheckWindowHeight()
    initParallax()
    initSplitText()
    initScrollTriggerAnimations()
    initScrollProgressNumber()
    initAboutLinkAnimation(container)
    initPlayVideos(container)
    initAccordion(container)
    // initCheckTheme(container)
    // initNavMobile()
  }

  const initHomePage = (next) => {
    initLenis(true)
    initHomeHero(next)
    initHomeClientStack(next)
    initReviewSlider(next)
    initServices(next)
  }

  const initProjectsDetailPage = (next) => {
    projectsSlider(next)
    window.FinsweetAttributes.modules.list.restart()
  }

  const initProjectsPage = (next) => {
    initDirectionalListHover(next)
  }

  const initContactPage = (next) => {
    initForm()
    initBasicFormValidation()
  }

  const initServicesPage = (next) => {
    initServices(next)
  }

  /**
   *
   * BARBA INIT
   *
   */

  barba.hooks.after((data) => {
    $(data.next.container).removeClass('fixed')
    $('.is--transitioning').removeClass('is--transitioning')
    resetWebflow(data)
    ScrollTrigger.refresh()
    lenis.scrollTo(0, {
      immediate: true,
      force: true,
      lock: true,
      onComplete: () => {
        lenis.start()
      },
    })

    initCheckTheme(data.next.container)
  })

  barba.hooks.leave((data) => {
    lenis.stop()
  })

  barba.hooks.enter((data) => {
    $(data.next.container).addClass('fixed')
  })

  barba.init({
    debug: true,
    preventRunning: true,
    prevent: function ({ el }) {
      return el.hasAttribute('data-barba-prevent')
    },
    transitions: [
      {
        name: 'default',
        // sync: true,
        once(data) {
          document.addEventListener('colorThemesReady', () => {
            initCheckTheme()
          })
          initNavMobile()
        },
        leave(data) {
          let current = data.current.container

          transitionOut(current)
          return gsap.fromTo(
            loadBlock,
            { scaleY: 0 },
            {
              scaleY: 1,
              duration: 1.4,
              stagger: 0.1,
              ease: 'ease-transition',
            }
          )
        },
      },
    ],
    views: [
      {
        namespace: 'home',
        afterEnter(data) {
          let next = data.next.container
          initGlobal(next)
          initHomePage(next)
          transitionIn(next)
        },
      },
      {
        namespace: 'projects',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)
          //
          initProjectsPage(next)
        },
      },
      {
        namespace: 'project-detail',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)
          //
          initProjectsDetailPage(next)
        },
      },
      {
        namespace: 'contact',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)

          initContactPage()
        },
      },
      {
        namespace: 'services',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)

          initServicesPage()
        },
      },
      {
        namespace: 'about',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)
        },
      },
      {
        namespace: 'default',
        afterEnter(data) {
          let next = data.next.container
          transitionIn(next)
          initGlobal(next)
        },
      },
    ],
  })
})()
