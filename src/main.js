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

  function initCheckWindowHeight() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh-in-px', `${vh}px`)
  }

  window.addEventListener('resize', () => {
    initCheckWindowHeight()
  })

  // initPageTransitions()
  /*
  function pageTransitionIn() {
    const tl = gsap.timeline()
    tl.set(
      '.transition_screen',
      {
        autoAlpha: 0,
      },
      0
    )
    tl.to(
      '.transition_screen',
      {
        autoAlpha: 1,
        ease: 'ease-secondary',
        duration: 0.35,
      },
      0
    )
    return tl
  }
  function pageTransitionOut() {
    // document.body.removeAttribute('data-lenis-prevent')
    // document.body.classList.remove('overflow-hidden')
    const textAnimationTransition = document.querySelectorAll(
      '[data-split-animation][data-lines-split]'
    )
    if (textAnimationTransition.length) {
      textAnimationTransition.forEach((element) => {
        const tl = gsap.timeline()
        const parentSplit = element.parentSplit
        const childSplit = element.childSplit
        if (!parentSplit || !childSplit) return
        tl.fromTo(
          childSplit.lines,
          {
            yPercent: 120,
            rotate: 0.001,
            ease: 'ease-secondary',
            duration: transitionSlider,
            stagger: 0.0825,
          },
          {
            yPercent: 0,
            rotate: 0,
            ease: 'ease-secondary',
          }
        )
      })
    }
    if (document.querySelector('[data-image-transition-anim]')) {
      const coverContainers = document.querySelectorAll(
        '[data-image-transition-anim]'
      )
      coverContainers.forEach((coverContainer) => {
        const cover = coverContainer.querySelector('[data-image-cover]')
        const image = coverContainer.querySelector('[data-image]')
        if (cover && image) {
          gsap.set(image, { scale: 1.1 })
          const animate = () => {
            const tl = gsap.timeline()
            tl.to(
              image,
              {
                scale: 1,
                duration: 1.2,
                ease: 'ease-secondary',
              },
              0
            ).to(
              cover,
              {
                autoAlpha: 0,
                duration: 0.6,
              },
              0
            )
          }
          if (image.complete) {
            animate()
          } else {
            image.onload = animate
          }
        }
      })
    }
    if (document.querySelector('.navbar_wrap')) {
      const tl = gsap.timeline()
      gsap.defaults({
        ease: 'ease-secondary',
        duration: transitionSlider,
      })
      tl.from(
        '.navbar_home',
        {
          yPercent: 120,
          rotate: 0.001,
        },
        0.1
      )
        .from(
          '.navbar_links_li',
          {
            yPercent: 200,
            rotate: 0.001,
            stagger: 0.0625,
          },
          '-=0.9'
        )
        .from(
          '.navbar_cta_contain',
          {
            yPercent: 120,
            rotate: 0.001,
          },
          '-=1'
        )
        .from(
          '.navbar_menu_text',
          {
            yPercent: 120,
            rotate: 0.001,
          },
          '-=0.9'
        )
    }
    if (document.querySelector('.hero_image_contain')) {
      const tl = gsap.timeline()
      gsap.set('.hero_image_contain', {
        scale: 1.1,
        filter: 'blur(5px)',
      })
      tl.to(
        '.hero_image_contain',
        {
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: 'ease-secondary',
        },
        '<'
      )
    }
    if (document.querySelector('.hero_collection_details')) {
      const tl = gsap.timeline()
      tl.from('.hero_collection_details > *', {
        yPercent: 200,
        rotate: 0.001,
        ease: 'ease-secondary',
        duration: transitionSlider,
        stagger: 0.125,
      })
    }
    if (document.querySelector('.gallery_tooltip_wrap')) {
      const tl = gsap.timeline()
      tl.from(
        '.gallery_tooltip_wrap',
        {
          yPercent: 150,
          rotate: 0.001,
          ease: 'ease-secondary',
          duration: 1.2,
        },
        0.8
      )
    }
    if (document.querySelector('.gallery_item')) {
      const tl = gsap.timeline()
      tl.from(
        '.gallery_item',
        {
          filter: 'blur(5px)',
          scale: 0.9,
          rotate: 0.001,
          stagger: {
            amount: 0.155,
            from: 'center',
          },
          ease: 'ease-secondary',
          duration: 1.2,
        },
        '<'
      )
    }
    if (document.querySelector('.hero_works_wrap')) {
      const filterWrap = document.querySelector('.works_filter_wrap')
      const filterLinks = filterWrap.querySelectorAll('.g_link')
      const tl = gsap.timeline()
      if (isMobileScreen) {
        tl.from('.works_bottom_content, .works_bottom_scroll', {
          yPercent: 120,
          rotate: 0.001,
          stagger: 0.175,
          ease: 'ease-secondary',
          duration: transitionSlider,
        }).from(
          filterLinks,
          {
            yPercent: 120,
            rotate: 0.001,
            stagger: 0.035,
            ease: 'ease-secondary',
            duration: transitionSlider,
          },
          '-=0.8'
        )
      } else {
        gsap.set('[data-clip-container]', {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          overwrite: 'auto',
        })
        tl.to(
          '[data-clip-container]',
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'ease-secondary',
            duration: 1.2,
          },
          0.1
        )
          .from(
            '.works_bottom_content, .works_bottom_scroll',
            {
              yPercent: 120,
              rotate: 0.001,
              stagger: 0.175,
              ease: 'ease-secondary',
              duration: transitionSlider,
            },
            '-=0.9'
          )
          .from(
            filterLinks,
            {
              yPercent: 120,
              rotate: 0.001,
              stagger: 0.035,
              ease: 'ease-secondary',
              duration: transitionSlider,
            },
            '-=0.9'
          )
      }
    }
    const studioSvg = document.querySelector('.hero_studio_svg')
    if (studioSvg) {
      const tl = gsap.timeline()
      tl.from('.hero_studio_path', {
        yPercent: 120,
        stagger: {
          amount: 0.225,
          from: 'end',
        },
        ease: 'ease-secondary',
        duration: 1.6,
      })
    }
    if (document.querySelector('.hero_project_wrap')) {
      const tl = gsap.timeline()
      gsap.set('.hero_project_thumbnail', {
        scale: 1.05,
      })
      tl.to(
        '.hero_project_thumbnail',
        {
          scale: 1,
          duration: 1.8,
          ease: 'ease-secondary',
        },
        '<'
      ).from(
        '[data-details-animation]',
        {
          yPercent: 200,
          rotate: 0.001,
          stagger: 0.0825,
          ease: 'ease-secondary',
          duration: transitionSlider,
        },
        '-=1.5'
      )
    }
    if (document.querySelector('.terms_wrap')) {
      const tl = gsap.timeline()
      tl.from(
        '.terms_rich_text',
        {
          autoAlpha: 0,
          y: 50,
          ease: 'ease-secondary',
          duration: transitionSlider,
        },
        0.5
      )
    }
    if (document.querySelector('.precedent_item_wrap')) {
      const tl = gsap.timeline()
      tl.from('.precedent_item_wrap', {
        yPercent: 120,
        stagger: 0.0825,
        ease: 'ease-secondary',
        duration: transitionSlider,
      })
    }
  }
    
  function initPageTransitions() {
    async function commonLeaveBefore(data) {
      const body = document.body
      const isMenuOpen = body.dataset.navigationStatus === 'is-open'
      if (isMenuOpen) {
        body.dataset.navigationStatus = 'is-closed'
        //animateMenuClose()
      }
      document
        .querySelectorAll('[data-navigation-status]')
        .forEach((el) => el.setAttribute('data-navigation-status', 'is-closed'))
      pageTransitionIn(data.current)
    }
    async function commonLeaveAfter(data) {
      killAllScrollTriggers()
      data.current.container.remove()
      cleanupSplitTexts()
    }
    async function commonBeforeEnter(data) {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      initResetWebflow(data)
      initSmoothScroll(data.next.container)
      initScript()
    }
    async function commonEnter(data) {
      gsap.to('.transition_screen', {
        autoAlpha: 0,
        ease: 'ease-secondary',
        duration: transitionNormal,
      })
      pageTransitionOut(data.next)
    }
    barba.hooks.after((data) => {
      ScrollTrigger.refresh()
    })
    barba.init({
      sync: true,
      preventRunning: true,
      timeout: 7000,
      transitions: [
        {
          name: 'default',
          async leave(data) {
            await commonLeaveBefore(data)
            await delay(transitionOffset)
            await commonLeaveAfter(data)
          },
          async beforeEnter(data) {
            await commonBeforeEnter(data)
          },
          async enter(data) {
            await commonEnter(data)
          },
          once(data) {
            initSmoothScroll(data.next.container)
            // initLoader()
            initScript()
          },
        },
      ],
      views: [
        {
          namespace: 'gallery',
          afterEnter() {
            // initGalleryPage()
            var vids = document.querySelectorAll('video')
            vids.forEach((vid) => {
              var playPromise = vid.play()
              if (playPromise !== undefined) {
                playPromise.then((_) => {}).catch((error) => {})
              }
            })
          },
        },
        {
          namespace: 'home',
          afterEnter() {
            // initHomePage()
            console.log('home')
          },
        },
        {
          namespace: 'process',
          afterEnter() {
            // initProcessPage()
          },
        },
        {
          namespace: 'project-detail',
          afterEnter() {
            //initProjectDetailPage()
          },
        },
        {
          namespace: 'studio',
          afterEnter() {
            //initStudioPage()
          },
        },
        {
          namespace: 'works',
          afterEnter() {
            // if (worksPageCleanup) {
            //   worksPageCleanup()
            //   worksPageCleanup = null
            // }
            // worksPageCleanup = initWorksPage()
          },
        },
        {
          namespace: 'precedent-detail',
          afterEnter() {
            //initPrecedentPages()
          },
        },
      ],
    })
    function initSmoothScroll() {
      initLenis()
      ScrollTrigger.refresh()
    }
    function killAllScrollTriggers() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.killAll()
      }
    }
    history.scrollRestoration = 'manual'
  }
    */

  function initResetWebflow(data) {
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
    $('.w--current').removeClass('w--current')
    $('a').each(function () {
      if ($(this).attr('href') === window.location.pathname) {
        $(this).addClass('w--current')
      }
    })
  }

  function delay(n) {
    n = n || 2000
    return new Promise((done) => {
      setTimeout(() => {
        done()
      }, n)
    })
  }

  var activeSplitTexts = []

  function cleanupSplitTexts() {
    activeSplitTexts.forEach((splitObj) => {
      if (splitObj && typeof splitObj.revert === 'function') {
        splitObj.revert()
      }
    })
    activeSplitTexts = []
    document.querySelectorAll('[data-split-initialized]').forEach((el) => {
      el.removeAttribute('data-split-initialized')
    })
    // if (worksPageCleanup) {
    //   worksPageCleanup()
    //   worksPageCleanup = null
    // }
  }

  function initLenis() {
    if (Webflow.env('editor')) return
    lenis = new Lenis({
      duration: 0.8,
      infinite: true,
      syncTouch: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    lenis.scrollTo(0, {
      offset: 0,
      duration: 0.2,
      force: true,
      onComplete: () => {
        lenis.stop()
      },
    })

    // lenis.scrollTo(0, 0)

    requestAnimationFrame(raf)
  }

  const initButton = () => {
    const offsetIncrement = 0 // Transition offset increment in seconds
    const buttons = document.querySelectorAll('[data-button-animate-chars]')

    buttons.forEach((button) => {
      const text = button.textContent // Get the button's text content
      button.innerHTML = '' // Clear the original content
      ;[...text].forEach((char, index) => {
        const span = document.createElement('span')
        span.textContent = char
        // span.style.transitionDelay = `${index * offsetIncrement}s`

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

  const initInitialLoader = (lenis, skip = false) => {
    if (skip) {
      // set everything straight to end state
      gsap.set('.loader_spinner', { opacity: 0 })
      gsap.set('.loader_logo-svg', { y: '0%' })
      gsap.set('#logo-1', { y: '100%' })
      gsap.set('#logo-2', { y: '-100%' })
      gsap.set('.loader_emblem-wrap.is-2', { scale: 1, color: 'black' })
      gsap.set('.loader_emblem.is-filled', { scale: 1 })
      gsap.set('.loader_emblem.is-path path', { drawSVG: '100%' })
      gsap.set('.loader_block', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      })
      gsap.set('.nav_logo-svg', { y: '0%' })
      gsap.set('.nav_counter', { y: '0%' })
      gsap.set('.nav_wrapper .button_text', { y: '0%' })
      gsap.set('.nav_wrapper .button_bg', { opacity: 1, scale: 1 })

      const loader = document.querySelector('.loader')
      if (loader) loader.style.pointerEvents = 'none'
      document.body.style.cursor = 'default'
      lenis.start()

      return // 🚀 stop here, no timeline
    }

    // --- normal timeline ---
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: 'ease-transition', duration: 1 },
    })
    document.body.style.cursor = 'wait'

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
    tl.fromTo(
      '.loader_emblem.is-filled',
      { scale: 1.1 },
      { scale: 1, duration: 1.7 },
      '<-.9'
    )
    tl.from(
      '.loader_emblem.is-path path',
      { drawSVG: 0, ease: 'power2.inOut', duration: 5, delay: 0.4 },
      0
    )

    tl.to(
      '.loader_block',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.4,
        stagger: 0.1,
        delay: 0.75,
        onComplete: () => {
          const loader = document.querySelector('.loader')
          if (loader) loader.style.pointerEvents = 'none'
          document.body.style.cursor = 'default'
          lenis.start()
        },
      },
      '<+1'
    )

    tl.to('.nav_logo-svg', { y: '0%', duration: 1.5 }, '<+.5')
    tl.from('.nav_counter', { y: '100%', duration: 1.5 }, '<+=.1')
    tl.fromTo(
      '.nav_wrapper .button_text',
      { y: '100%' },
      { y: '0%', duration: 1.5, stagger: 0.1 },
      '<+=.1'
    )
    tl.fromTo(
      '.nav_wrapper .button_bg',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 2 },
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
        console.log(childSplit)
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

  if (document.querySelector('.section_work-scroll')) {
    $('.section_work-scroll').each(function (index) {
      let triggerElement = $(this)
      let slidesAmount = $(this).attr('data-slides-amount')
      let targetElement = $(this).find('.single-work-slide')
      let targetThumbList = $(this).find('.thumbnail-list')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top top',
          end: 'bottom bottom',
          markers: true,
          scrub: 0,
        },
      })

      tl.fromTo(
        targetThumbList,
        {
          yPercent: 0,
        },
        {
          yPercent: ((slidesAmount - 1) / slidesAmount) * -100,
          ease: 'none',
        }
      )
    })

    // Check the index of section in view
    function checkIndexSection() {
      var indexSections = document.querySelectorAll('[data-work-height-index]')
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
  function initAboutLinkAnimation() {
    const triggers = document.querySelectorAll('[data-link="about"]')
    if (!triggers.length) return

    const targets = []
    const aboutSection = document.querySelector('.section_about')
    const mainWrapper = document.querySelector('.main-wrapper')
    const loader = document.querySelector('.loader_container')
    loader.style.zIndex = 0
    const navigation = document.querySelector('.navigation')
    targets.push(navigation)
    targets.push(loader)
    targets.push(mainWrapper)

    if (!aboutSection || !mainWrapper) return

    // build timeline
    const tl = gsap.timeline({
      paused: true,
      reversed: true,
      onStart: () => {
        // starting to play forward -> stop scroll
        lenis.stop()
      },
      onReverseComplete: () => {
        // finished reversing -> resume scroll
        lenis.start()
      },
    })

    tl.to(targets, {
      marginTop: '45rem',
      duration: 1.6,
      ease: 'ease-primary',
    }).to(
      '.section_work-scroll',
      {
        y: '45rem',
        duration: 1.6,
        ease: 'ease-primary',
      },
      '<'
    )
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        if (trigger.tagName === 'A') event.preventDefault()

        if (tl.reversed()) {
          tl.play()
        } else {
          tl.reverse()
        }
      })
    })
  }

  const initServices = () => {
    const mm = gsap.matchMedia()
    mm.add(desktopQuery, () => {
      const items = [...document.querySelector('.services_list').children]
      const totalItems = items.length

      items.forEach((item, position) => {
        const isLast = position === totalItems - 1

        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: 'bottom bottom',
              end: '+=110%',
              scrub: true,
            },
          })
          .fromTo(
            item,
            { y: '0rem' },
            {
              ease: 'power2.in',
              y: isLast ? '0rem' : '20rem',
            },
            0
          )
      })
    })
  }

  const initReviewSlider = () => {
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

          // Toggle active classes + aria attrs
          // buttonItems.forEach((btn, i) => {
          //   btn.classList.toggle('is-active', i === index)
          //   btn.setAttribute('aria-selected', i === index ? 'true' : 'false')
          //   btn.setAttribute('tabindex', i === index ? '0' : '-1')
          // })
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

        // Setup ids + keyboard navigation
        // buttonItems.forEach((btn, index) => {
        //   let tabId = tabWrap.getAttribute('data-tab-component-id')
        //   tabId = tabId
        //     ? tabId.toLowerCase().replaceAll(' ', '-')
        //     : componentIndex + 1
        //   let itemId = btn.getAttribute('data-tab-item-id')
        //   itemId = itemId
        //     ? itemId.toLowerCase().replaceAll(' ', '-')
        //     : index + 1

        //   btn.setAttribute('id', 'tab-button-' + tabId + '-' + itemId)
        //   btn.setAttribute('aria-controls', 'tab-panel-' + tabId + '-' + itemId)
        //   panelItems[index].setAttribute(
        //     'id',
        //     'tab-panel-' + tabId + '-' + itemId
        //   )
        //   panelItems[index].setAttribute('aria-labelledby', btn.id)

        //   // Deep linking via ?tab-id= param
        //   if (
        //     new URLSearchParams(location.search).get('tab-id') ===
        //     tabId + '-' + itemId
        //   ) {
        //     makeActive(index)
        //     autoplay = 0
        //     tabWrap.scrollIntoView({ behavior: 'smooth', block: 'start' })
        //     history.replaceState(
        //       {},
        //       '',
        //       ((u) => (u.searchParams.delete('tab-id'), u))(
        //         new URL(location.href)
        //       )
        //     )
        //   }

        //   btn.addEventListener('click', () => makeActive(index))
        //   btn.addEventListener('keydown', (e) => {
        //     if (['ArrowRight', 'ArrowDown'].includes(e.key))
        //       updateIndex(1, true)
        //     else if (['ArrowLeft', 'ArrowUp'].includes(e.key))
        //       updateIndex(-1, true)
        //   })
        // })

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
  }

  const initScript = () => {
    initLenis()
    initInitialLoader(lenis, false)
    initButton()
    initCheckWindowHeight()
    initParallax()
    initHomeHero()
    initNavMobile()
    initSplitText()
    initScrollTriggerAnimations()
    initScrollProgressNumber()
    initAboutLinkAnimation()
    initServices()
    initReviewSlider()
  }

  initScript()
})()
