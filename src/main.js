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

  function initCheckWindowHeight() {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh-in-px', `${vh}px`)
  }

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

  const initInitialLoader = (lenis) => {
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

    // filled svg
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
        onStart: () => {
          //gsap.to('.hero-img', { scale: 1, duration: 2, ease: 'ease-transition' })
        },
        onComplete: () => {
          const loader = document.querySelector('.loader')
          if (loader) loader.style.pointerEvents = 'none'
          document.body.style.cursor = 'default'

          lenis.start()
        },
      },
      '<+1'
    )

    tl.to('.nav_logo-svg', { y: '0%', delay: 0, duration: 1.5 }, '<+1')
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

  if (document.querySelector('.section-work-scroll')) {
    $('.section-work-scroll').each(function (index) {
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
            $('.section-work-scroll').css(
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
    const trigger = document.querySelector('[data-link="about"]')
    if (!trigger) return

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
      marginTop: '20rem',
      duration: 1.6,
      ease: 'ease-primary',
    })

    trigger.addEventListener('click', (event) => {
      if (trigger.tagName === 'A') event.preventDefault()

      if (tl.reversed()) {
        tl.play()
      } else {
        tl.reverse()
      }
    })
  }

  const initScript = () => {
    initLenis()
    initInitialLoader(lenis)
    initButton()
    initCheckWindowHeight()
    initParallax()
    initHomeHero()
    initNavMobile()
    initSplitText()
    initScrollTriggerAnimations()
    initScrollProgressNumber()
    initAboutLinkAnimation()
  }

  initScript()
})()
