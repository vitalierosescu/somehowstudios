;(() => {
  // src/app.js
  gsap.registerPlugin(
    ScrollTrigger,
    CustomEase,
    SplitText,
    Draggable,
    InertiaPlugin
  )
  CustomEase.create('ease-primary', '0.87, 0, 0.13, 1')
  CustomEase.create('ease-secondary', '0.16, 1, 0.35, 1')
  CustomEase.create('ease-tertiary', '0.53, 0.23, 0.25, 1')
  CustomEase.create('ease-menu', '.7,0,.22,1')
  CustomEase.create('ease-transition', '0.76, 0, 0.24, 1')
  CustomEase.create('ease-textloader', '0.83, 0, 0.17, 1')
  var lenis
  var transitionOffset = 375
  var transitionNormal = 0.875
  var transitionSlider = 1
  var isMobileScreen = window.matchMedia('(max-width: 767px)').matches
  initPageTransitions()
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
    document.body.removeAttribute('data-lenis-prevent')
    document.body.classList.remove('overflow-hidden')
    const textAnimationTransition = document.querySelectorAll(
      '[data-split-animation][data-lines-split]'
    )
    if (textAnimationTransition.length) {
      textAnimationTransition.forEach((element) => {
        const tl = gsap.timeline()
        const parentSplit = element.parentSplit
        const childSplit = element.childSplit
        if (!parentSplit || !childSplit) return
        tl.from(childSplit.lines, {
          yPercent: 120,
          rotate: 0.001,
          ease: 'ease-secondary',
          duration: transitionSlider,
          stagger: 0.0825,
        })
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
        animateMenuClose()
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
      window.scrollTo(0, 0)
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
            initLoader()
            initScript()
          },
        },
      ],
      views: [
        {
          namespace: 'gallery',
          afterEnter() {
            initGalleryPage()
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
            initHomePage()
          },
        },
        {
          namespace: 'process',
          afterEnter() {
            initProcessPage()
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
            initStudioPage()
          },
        },
        {
          namespace: 'works',
          afterEnter() {
            if (worksPageCleanup) {
              worksPageCleanup()
              worksPageCleanup = null
            }
            worksPageCleanup = initWorksPage()
          },
        },
        {
          namespace: 'precedent-detail',
          afterEnter() {
            initPrecedentPages()
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
  var worksPageCleanup = null
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
    if (worksPageCleanup) {
      worksPageCleanup()
      worksPageCleanup = null
    }
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
    const translateElements = document.querySelectorAll('[data-translate-hero]')
    const scrollContainer = document.querySelector('[data-scroll-container]')
    if (translateElements.length && scrollContainer) {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      const isSmallScreen = gsap.matchMedia()
      const targetTranslate =
        parseFloat(scrollContainer.dataset.targetTranslate) || 800
      const inverseTranslate = scrollContainer.dataset.inverseTranslate
        ? parseFloat(scrollContainer.dataset.inverseTranslate)
        : -targetTranslate
      const startPosition = scrollContainer.dataset.start || 'top top'
      const endPosition = scrollContainer.dataset.end || 'bottom top'
      isSmallScreen.add('(min-width: 768px)', () => {
        if (!prefersReducedMotion) {
          translateElements.forEach((element) => {
            gsap.fromTo(
              element,
              { y: inverseTranslate },
              {
                y: targetTranslate,
                ease: 'none',
                scrollTrigger: {
                  trigger: scrollContainer,
                  start: startPosition,
                  end: endPosition,
                  scrub: 0,
                },
              }
            )
          })
        }
      })
    }
    const overlayContainer = document.querySelector('[data-overlay-container]')
    if (overlayContainer) {
      const targetOpacity = overlayContainer.dataset.targetOpacity || 0.6
      gsap.to('[data-overlay-scroll]', {
        opacity: parseFloat(targetOpacity),
        scrollTrigger: {
          trigger: overlayContainer,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }
    const lineAnimElements = document.querySelectorAll(
      '[data-lines-split][data-animate-scroll]'
    )
    if (lineAnimElements.length) {
      lineAnimElements.forEach((element) => {
        const parentSplit = element.parentSplit
        const childSplit = element.childSplit
        if (!parentSplit || !childSplit) return
        gsap.from(childSplit.lines, {
          yPercent: 120,
          rotate: 0.001,
          ease: 'ease-secondary',
          duration: transitionSlider,
          stagger: 0.0625,
          clearProps: 'all',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    }
  }
  function initScript() {
    initLenis()
    initBasicFunctions()
    initSplitText()
    initScrollTriggerAnimations()
    initMenu()
    initContactForm()
    initNavFunctions()
    initImageReveal()
  }
  function initBasicFunctions() {
    const allProcess = $('[data-process-item]')
    if (allProcess) {
      allProcess.each(function (index) {
        $(this)
          .find('[data-process-value]')
          .text(index + 1)
      })
    }
    function totalProjectCount() {
      const formatProjectCount = (count) => {
        if (count >= 10) {
          return `(${count})`
        } else {
          return `(0${count})`
        }
      }
      const totalProjects = document.querySelectorAll('.project_item')
      const allProjectsIndex = $('[data-projects-count]')
      if (totalProjects.length) {
        allProjectsIndex.text(formatProjectCount(totalProjects.length))
      }
    }
    const currentYear = new Date().getFullYear()
    const currentYearElements = document.querySelectorAll('[data-current-year]')
    currentYearElements.forEach((currentYearElement) => {
      currentYearElement.textContent = currentYear
    })
    function updateLocationTime() {
      const footerTime = document.querySelector('[data-current-time]')
      const footerState = document.querySelector('.footer_bottom_state')
      if (!footerTime || !footerState) return
      const melbourneTime = new Date().toLocaleString('en-US', {
        timeZone: 'Australia/Brisbane',
      })
      const melbourneDate = new Date(melbourneTime)
      const mTime = melbourneDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      })
      footerTime.textContent = mTime
      const day = melbourneDate.getDay()
      const hour = melbourneDate.getHours()
      const minutes = melbourneDate.getMinutes()
      const currentTime = hour * 60 + minutes
      const openingTime = 8 * 60 + 30
      const closingTime = 17 * 60
      const isBusinessDay = day >= 1 && day <= 5
      const isWithinHours =
        currentTime >= openingTime && currentTime < closingTime
      footerState.textContent =
        isBusinessDay && isWithinHours ? 'open' : 'closed'
    }
    updateLocationTime()
    totalProjectCount()
    setInterval(updateLocationTime, 60000)
  }
  function initLenis() {
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
  function animateMenuClose() {
    document.body.removeAttribute('data-lenis-prevent')
    document.body.classList.remove('overflow-hidden')
    const tl = gsap.timeline()
    tl.to('.menu_wrap', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 0.5,
      ease: 'ease-menu',
    }).set('.menu_contain_link', {
      yPercent: 102,
    })
  }
  function animateMenuOpen() {
    document.body.setAttribute('data-lenis-prevent', 'true')
    document.body.classList.add('overflow-hidden')
    const tl = gsap.timeline()
    tl.to('.menu_wrap', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: transitionSlider,
      ease: 'ease-menu',
    }).to(
      '.menu_contain_link',
      {
        yPercent: 0,
        rotate: 0.001,
        duration: 1.15,
        stagger: 0.0425,
        ease: 'ease-secondary',
      },
      '-=0.45'
    )
  }
  function initMenu() {
    const body = document.body
    const menuBtns = document.querySelectorAll('[data-menu-btn]')
    const closeBtn = document.querySelector('[data-menu-close]')
    if (!menuBtns.length) {
      return
    }
    if (!closeBtn) {
      return
    }
    gsap.set('.menu_contain_link', {
      y: 0,
      yPercent: 100,
      rotate: 0.001,
    })
    const toggleMenu = () => {
      const isOpen = body.dataset.navigationStatus === 'is-open'
      body.dataset.navigationStatus = isOpen ? 'is-closed' : 'is-open'
      if (isOpen) {
        animateMenuClose()
      } else {
        animateMenuOpen()
      }
    }
    const closeMenu = () => {
      if (body.dataset.navigationStatus === 'is-open') {
        body.dataset.navigationStatus = 'is-closed'
        animateMenuClose()
        document.body.removeAttribute('data-lenis-prevent')
        document.body.classList.remove('overflow-hidden')
      }
    }
    menuBtns.forEach((btn) => {
      btn.addEventListener('click', toggleMenu)
    })
    closeBtn.addEventListener('click', closeMenu)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    })
  }
  function animateContactClose() {
    document.body.removeAttribute('data-lenis-prevent')
    document.body.classList.remove('overflow-hidden')
    const container = document.querySelector('.contact_modal_wrap')
    const text = container.querySelectorAll('.split-child')
    const coverContainer = container.querySelector(
      '[data-image-reveal-noscroll]'
    )
    const cover = container.querySelector('[data-image-cover]')
    const image = container.querySelector('[data-image]')
    const overlay = document.querySelector('.contact_overlay_close')
    overlay.style.pointerEvents = 'none'
    const tl = gsap.timeline()
    tl.to(container, {
      clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      duration: transitionSlider,
      ease: 'ease-menu',
    })
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: transitionSlider,
          ease: 'ease-menu',
        },
        '<'
      )
      .set(text, {
        yPercent: 102,
      })
      .set(cover, {
        autoAlpha: 1,
      })
      .set(image, {
        scale: 1.1,
      })
  }
  function animateContactOpen() {
    document.body.setAttribute('data-lenis-prevent', 'true')
    document.body.classList.add('overflow-hidden')
    const container = document.querySelector('.contact_modal_wrap')
    const text = container.querySelectorAll('.split-child')
    const coverContainer = container.querySelector(
      '[data-image-reveal-noscroll]'
    )
    const cover = container.querySelector('[data-image-cover]')
    const image = container.querySelector('[data-image]')
    const overlay = document.querySelector('.contact_overlay_close')
    overlay.style.pointerEvents = 'auto'
    const tl = gsap.timeline()
    tl.to(container, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: transitionSlider,
      ease: 'ease-menu',
    })
      .to(
        overlay,
        {
          autoAlpha: 1,
          duration: transitionSlider,
          ease: 'ease-menu',
        },
        '<'
      )
      .to(
        text,
        {
          yPercent: 0,
          rotate: 0.001,
          duration: 1.15,
          stagger: 0.0425,
          ease: 'ease-secondary',
        },
        '-=0.45'
      )
      .to(
        image,
        {
          scale: 1,
          rotate: 0.001,
          duration: 1.2,
          ease: 'ease-secondary',
        },
        '<'
      )
      .to(cover, { autoAlpha: 0, duration: 0.6 }, '<')
  }
  function initContactForm() {
    const customButton = document.querySelector('[data-submit-btn]')
    const customButtonText = document.querySelector('[data-submit-text]')
    const defaultSubmitButton = document.querySelector('.form-submit')
    defaultSubmitButton.addEventListener('click', function (event) {
      customButton.disabled = true
      customButtonText.textContent = 'Submitting...'
    })
    const body = document.body
    const contactBtns = document.querySelectorAll('[data-contact-btn]')
    const closeBtn = document.querySelector('[data-contact-close]')
    const container = document.querySelector('.contact_modal_wrap')
    if (!container) {
      return
    }
    const text = container.querySelectorAll('.split-child')
    const coverContainer = container.querySelector(
      '[data-image-reveal-noscroll]'
    )
    const cover = container.querySelector('[data-image-cover]')
    const image = container.querySelector('[data-image]')
    const overlay = document.querySelector('.contact_overlay_close')
    if (!overlay || !cover || !image) {
      return
    }
    gsap.set(cover, { autoAlpha: 1 })
    gsap.set(image, { scale: 1.1 })
    gsap.set(text, {
      yPercent: 102,
    })
    if (!contactBtns.length) {
      return
    }
    if (!closeBtn) {
      return
    }
    const toggleContactForm = () => {
      const isOpen = body.dataset.contactStatus === 'is-open'
      body.dataset.contactStatus = isOpen ? 'is-closed' : 'is-open'
      if (isOpen) {
        animateContactClose()
      } else {
        animateContactOpen()
      }
    }
    const closeContactForm = () => {
      if (body.dataset.contactStatus === 'is-open') {
        body.dataset.contactStatus = 'is-closed'
        animateContactClose()
        document.body.removeAttribute('data-lenis-prevent')
        document.body.classList.remove('overflow-hidden')
      }
    }
    contactBtns.forEach((btn) => {
      btn.addEventListener('click', toggleContactForm)
    })
    closeBtn.addEventListener('click', closeContactForm)
    overlay.addEventListener('click', closeContactForm)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeContactForm()
      }
    })
  }
  function initNavFunctions() {
    gsap.set('.navbar_mini_wrap > *', {
      yPercent: 102,
      y: 0,
      visibility: 'visible',
    })
    ScrollTrigger.create({
      start: '500px top',
      end: 'max',
      onEnter: () => {
        gsap.to(['.navbar_mini_btn', '.navbar_mini_contain'], {
          yPercent: 0,
          duration: transitionNormal,
          stagger: 0.1,
          ease: 'ease-secondary',
        })
      },
      onLeaveBack: () => {
        gsap.to(['.navbar_mini_contain', '.navbar_mini_btn'], {
          yPercent: 102,
          duration: transitionNormal,
          stagger: 0.05,
          ease: 'ease-secondary',
        })
      },
    })
  }
  function initImageReveal() {
    const revealImages = document.querySelectorAll('[data-image-reveal]')
    revealImages.forEach((container) => {
      const cover = container.querySelector('[data-image-cover]')
      const image = container.querySelector('[data-image]')
      gsap.set(cover, { autoAlpha: 1 })
      gsap.set(image, { scale: 1.05 })
      ScrollTrigger.create({
        trigger: container,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()
          const animate = () => {
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
            image.onload = () => animate()
          }
        },
      })
    })
  }
  function initLoader() {
    window.scrollTo(0, 0)
    document.body.setAttribute('data-lenis-prevent', 'true')
    document.body.classList.add('overflow-hidden')
    const mainTl = gsap.timeline()
    initSplitText()
    gsap.defaults({
      ease: 'ease-transition',
      duration: 1,
    })
    const loopTimeline = gsap.timeline({
      repeat: 0,
      repeatDelay: 0.1,
    })
    loopTimeline
      .set('.oh_text_duplicate', {
        yPercent: 100,
      })
      .to('.oh_text', {
        yPercent: -100,
        ease: 'ease-textloader',
        duration: transitionNormal,
      })
      .to(
        '.oh_text_duplicate',
        {
          yPercent: 0,
          ease: 'ease-textloader',
          duration: transitionNormal,
        },
        '<'
      )
    mainTl.add(loopTimeline, 0)
    mainTl
      .to(
        '.preloader_line',
        {
          xPercent: 58,
        },
        0
      )
      .to(
        '.preloader_line',
        {
          xPercent: 100,
        },
        1.2
      )
    mainTl.call(
      function () {
        pageTransitionOut()
      },
      null,
      1.59
    )
    mainTl.to(
      '.preloader_wrap',
      {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'ease-tertiary',
      },
      1.6
    )
    return mainTl
  }
  function initHomePage() {
    const allWorks = $('.works_collection_item')
    allWorks.each(function (index) {
      $(this)
        .find('.works_content_value')
        .text(index + 1)
    })
    gsap.from('.process_left_item', {
      rotate: 0.0001,
      opacity: 0,
      y: 20,
      stagger: 0.0625,
      ease: 'ease-secondary',
      duration: transitionSlider,
      scrollTrigger: {
        trigger: '.process_left_collection',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }
  function initWorksPage() {
    const worksPage = document.querySelector('[data-barba-namespace="works"]')
    if (worksPage) {
      document.documentElement.classList.add('hide-scrollbar')
    } else {
      document.documentElement.classList.remove('hide-scrollbar')
    }
    const progressCounter = document.querySelector('[data-progress-nr]')
    const horizontalSection = document.querySelector(
      '[data-horizontal-section]'
    )
    const wrapper = document.querySelector('[data-horizontal-wrap]')
    const items = document.querySelectorAll('[data-horizontal-item]')
    const transitionOutDuration = 600
    const transitionInDuration = 600
    let currentScrollTrigger = null
    let overscrollCleanup = null
    let isAtHorizontalEnd = false
    let hasTriggeredOverscrollView = false
    function getScrollAmount() {
      const visibleItems = Array.from(items).filter(
        (item) => item.getAttribute('data-filter-status') === 'active'
      )
      if (visibleItems.length === 0) return 0
      const wrapperWidth = wrapper.scrollWidth
      const viewportWidth = window.innerWidth
      const firstItemLeft = visibleItems[0].getBoundingClientRect().left
      const lastItemMargin = parseFloat(
        getComputedStyle(visibleItems[visibleItems.length - 1]).marginRight
      )
      return -(wrapperWidth - viewportWidth + firstItemLeft + lastItemMargin)
    }
    function showOverscrollContent() {
      if (hasTriggeredOverscrollView) return
      hasTriggeredOverscrollView = true
      const scrollContainer = document.querySelector('.works_scroll_contain')
      const overscrollContent = document.querySelector(
        '.works_overscroll_content'
      )
      if (!scrollContainer || !overscrollContent) {
        console.warn('Overscroll content elements not found')
        return
      }
      gsap.set(overscrollContent, { autoAlpha: 0 })
      const tl = gsap.timeline()
      tl.to(scrollContainer, {
        autoAlpha: 0,
        duration: 0.2,
        ease: 'ease-secondary',
      }).to(
        overscrollContent,
        {
          autoAlpha: 1,
          duration: 0.2,
          ease: 'ease-secondary',
        },
        '<'
      )
      console.log('Showing overscroll content')
    }
    function hideOverscrollContent() {
      if (!hasTriggeredOverscrollView) return
      hasTriggeredOverscrollView = false
      const scrollContainer = document.querySelector('.works_scroll_contain')
      const overscrollContent = document.querySelector(
        '.works_overscroll_content'
      )
      if (!scrollContainer || !overscrollContent) return
      const tl = gsap.timeline()
      tl.to(overscrollContent, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'ease-secondary',
      }).to(
        scrollContainer,
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: 'ease-secondary',
        },
        '-=0.2'
      )
      console.log('Hiding overscroll content')
    }
    function initOverscrollNavigation() {
      if (isMobileScreen) {
        return function cleanup() {}
      }
      const CONFIG = {
        progressThreshold: 100,
        velocityMultiplier: 1.5,
        decayRate: 0.92,
        decayDelay: 150,
        minVelocity: 0.5,
        sensitivity: 25,
        endTolerance: 5,
      }
      let progress = 0
      let decayTimeout = null
      let lastScrollTime = Date.now()
      let velocity = 0
      let overscrollAttempts = 0
      let isNavigating = false
      let isDestroyed = false
      let boundHandleWheelEvent = null
      const targetLink = document.querySelector('.works_filter_floating_link')
      const progressBar = document.querySelector('.cta_bottom_dynamic')
      if (!targetLink) {
        console.warn('Target link .works_filter_floating_link not found')
        return function cleanup() {}
      }
      if (!progressBar) {
        console.warn('Progress bar .cta_bottom_dynamic not found')
        return function cleanup() {}
      }
      const progressBarElement = progressBar
      const originalTransform = getComputedStyle(progressBar).transform
      const updateProgressBar = gsap.quickTo(progressBarElement, 'xPercent', {
        duration: 0.1,
        ease: 'none',
      })
      gsap.set(progressBarElement, { xPercent: -100 })
      function scheduleDecay() {
        if (isDestroyed) return
        clearTimeout(decayTimeout)
        decayTimeout = setTimeout(() => {
          if (!isDestroyed) startDecay()
        }, CONFIG.decayDelay)
      }
      function startDecay() {
        if (isDestroyed || progress <= 0) return
        progress *= CONFIG.decayRate
        if (progress < 0.5) {
          progress = 0
          updateProgressBar(-100)
        } else {
          const translateProgress =
            -100 + (progress / CONFIG.progressThreshold) * 100
          updateProgressBar(translateProgress)
          if (!isDestroyed) {
            requestAnimationFrame(startDecay)
          }
        }
      }
      function triggerNavigation() {
        if (isNavigating || isDestroyed) {
          return
        }
        console.log('Triggering overscroll navigation to next page')
        isNavigating = true
        gsap.to(progressBarElement, {
          xPercent: 0,
          duration: 0.15,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(progressBarElement, { xPercent: -100 })
          },
        })
        setTimeout(() => {
          targetLink.click()
        }, 150)
      }
      function updateProgress(delta) {
        if (isDestroyed || isNavigating || !isAtHorizontalEnd) {
          return
        }
        const currentTime = Date.now()
        const timeDelta = Math.min(currentTime - lastScrollTime, 100)
        lastScrollTime = currentTime
        velocity = Math.abs(delta / Math.max(timeDelta, 1))
        if (velocity > CONFIG.minVelocity) {
          const velocityBoost = Math.min(
            velocity * CONFIG.velocityMultiplier,
            4
          )
          const progressIncrease = (delta * velocityBoost) / CONFIG.sensitivity
          progress = Math.min(
            progress + progressIncrease,
            CONFIG.progressThreshold
          )
          clearTimeout(decayTimeout)
          const translateProgress =
            -100 + (progress / CONFIG.progressThreshold) * 100
          updateProgressBar(translateProgress)
          scheduleDecay()
          if (progress >= CONFIG.progressThreshold) {
            triggerNavigation()
          }
        }
      }
      function handleWheelEvent(e) {
        if (isDestroyed || isNavigating || !isAtHorizontalEnd) return
        if (e.deltaY > 0) {
          e.preventDefault()
          overscrollAttempts++
          updateProgress(e.deltaY)
        }
      }
      boundHandleWheelEvent = handleWheelEvent.bind(this)
      document.addEventListener('wheel', boundHandleWheelEvent, {
        passive: false,
      })
      function cleanup() {
        console.log('Cleaning up overscroll navigation')
        isDestroyed = true
        isNavigating = false
        progress = 0
        if (boundHandleWheelEvent) {
          document.removeEventListener('wheel', boundHandleWheelEvent)
        }
        clearTimeout(decayTimeout)
        decayTimeout = null
        if (progressBarElement) {
          gsap.set(progressBarElement, {
            xPercent: -100,
            clearProps: 'transform',
          })
        }
        boundHandleWheelEvent = null
      }
      return cleanup
    }
    function initScroll() {
      if (overscrollCleanup) {
        overscrollCleanup()
        overscrollCleanup = null
      }
      currentScrollTrigger = gsap.to(wrapper, {
        x: getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSection,
          pin: true,
          start: 'top top',
          end: () => `+=${-getScrollAmount()}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = Math.round(self.progress * 100)
            progressCounter.textContent = progress.toString().padStart(2, '0')
            isAtHorizontalEnd = self.progress >= 0.98
            if (self.progress === 1) {
              const visibleItems = Array.from(items).filter(
                (item) => item.getAttribute('data-filter-status') === 'active'
              )
              if (visibleItems.length > 0) {
                const lastItem = visibleItems[visibleItems.length - 1]
                const lastItemRect = lastItem.getBoundingClientRect()
                const adjustment = window.innerWidth - lastItemRect.right
                if (adjustment > 0) {
                  gsap.set(wrapper, { x: `+=${adjustment}` })
                }
              }
              showOverscrollContent()
              if (!overscrollCleanup) {
                overscrollCleanup = initOverscrollNavigation()
              }
            } else if (self.progress < 0.98 && hasTriggeredOverscrollView) {
              hideOverscrollContent()
            }
          },
          onComplete: () => {
            if (!overscrollCleanup) {
              overscrollCleanup = initOverscrollNavigation()
            }
          },
        },
      })
    }
    function updateScrollTrigger() {
      progressCounter.textContent = '00'
      if (overscrollCleanup) {
        overscrollCleanup()
        overscrollCleanup = null
      }
      if (hasTriggeredOverscrollView) {
        hideOverscrollContent()
      }
      isAtHorizontalEnd = false
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === horizontalSection) {
          st.kill()
        }
      })
      setTimeout(() => {
        initScroll()
      }, 50)
    }
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      initScroll()
    })
    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateScrollTrigger()
      }, 100)
    })
    window.addEventListener('orientationchange', () => {
      updateScrollTrigger()
    })
    return function cleanupWorksPage() {
      if (overscrollCleanup) {
        overscrollCleanup()
        overscrollCleanup = null
      }
      if (hasTriggeredOverscrollView) {
        hideOverscrollContent()
      }
      if (currentScrollTrigger && currentScrollTrigger.scrollTrigger) {
        currentScrollTrigger.scrollTrigger.kill()
      }
      isAtHorizontalEnd = false
      hasTriggeredOverscrollView = false
      if (resizeTimer) {
        clearTimeout(resizeTimer)
      }
      console.log('Works page cleanup completed')
    }
  }
  function initProcessPage() {
    const stageCards = document.querySelectorAll('.process_stages_item')
    if (isMobileScreen) {
      return
    } else {
      stageCards.forEach((card, index) => {
        const cardContainer = card.querySelector('.process_stages_contain')
        const cardOverlay = card.querySelector('.process_stages_overlay')
        if (index === stageCards.length - 1) {
          return
        }
        gsap.to(cardOverlay, {
          opacity: 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top 0%',
            end: 'bottom top',
            scrub: true,
          },
        })
        gsap.to(cardContainer, {
          rotationZ: (Math.random() - 0.5) * 15,
          scale: 0.7,
          rotationX: 30,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: card,
            start: 'top 0%',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }
  }
  function initPrecedentPages() {
    const progressCounter = document.querySelector('[data-progress-nr]')
    const precedentItems = document.querySelectorAll(
      '.precedent_collection_item'
    )
    const mm = gsap.matchMedia()
    const breakPoint = 768
    mm.add(
      {
        isDesktop: `(min-width: ${breakPoint}px)`,
        isMobile: `(max-width: ${breakPoint - 1}px)`,
        reduceMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions
        if (reduceMotion || isMobile) {
          return
        }
        precedentItems.forEach((item, index) => {
          const container = item.querySelector('.precedent_content_contain')
          gsap.set(container, { scale: 0.7, rotationX: 50 })
          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                ease: 'power1.in',
                start: 'top bottom',
                end: 'top 0%',
                scrub: true,
              },
            })
            .to(container, { scale: 1, rotationX: 0 })
          if (index !== precedentItems.length - 1 || index === 0) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: item,
                  ease: 'power1.out',
                  start: 'top top',
                  end: 'bottom 0%',
                  scrub: true,
                },
              })
              .to(container, { scale: 0.7, rotationX: -50 })
          }
        })
      }
    )
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        if (progressCounter) {
          const progress = Math.round(self.progress * 100)
          progressCounter.textContent = progress.toString().padStart(2, '0')
        }
      },
    })
  }
  function initStudioPage() {
    const memberItems = document.querySelectorAll('[data-content-trigger]')
    function updateMemberImage(activeIndex) {
      const images = document.querySelectorAll('[data-content-image]')
      images.forEach((img, index) => {
        if (index === activeIndex) {
          img.classList.add('active')
          gsap.to(img, { opacity: 1, duration: 0.3 })
        } else {
          img.classList.remove('active')
          gsap.to(img, { opacity: 0, duration: 0.3 })
        }
      })
      memberItems.forEach((name, index) => {
        if (index === activeIndex) {
          gsap.to(name, { opacity: 1, duration: 0.3 })
        } else {
          gsap.to(name, { opacity: 0.3, duration: 0.3 })
        }
      })
    }
    updateMemberImage(0)
    memberItems.forEach((member, index) => {
      member.addEventListener('mouseenter', () => {
        updateMemberImage(index)
      })
    })
  }
  function initGalleryPage() {
    const galleryContain = document.querySelector('.gallery_contain')
    const sectionWrap = document.querySelector('.gallery_wrapper_wrap')
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: reduce)', () => {
      Draggable.create(galleryContain, {
        type: 'x,y',
        bounds: window,
        inertia: true,
        edgeResistance: 0.5,
        maxDuration: 1.5,
        zIndexBoost: false,
        onPress: () => {},
        onRelease: () => {},
      })
    })
    mm.add(
      '(prefers-reduced-motion: no-preference), (prefers-reduced-motion: none)',
      () => {
        Draggable.create(galleryContain, {
          type: 'x,y',
          bounds: window,
          inertia: true,
          edgeResistance: 0.5,
          maxDuration: 1.5,
          zIndexBoost: false,
          onPress: function (event) {
            if (event.button !== 0) {
              this.endDrag()
              return
            }
            gsap.to(sectionWrap, {
              scale: 0.9,
              duration: 1.2,
              ease: 'ease-secondary',
            })
            gsap.to('.gallery_tooltip_wrap', {
              autoAlpha: 0,
              duration: 0.6,
              ease: 'ease-menu',
              filter: 'blur(50px)',
            })
          },
          onRelease: () => {
            gsap.to(sectionWrap, {
              scale: 1,
              duration: transitionSlider,
              ease: 'ease-secondary',
            })
          },
        })
      }
    )
  }
})()
