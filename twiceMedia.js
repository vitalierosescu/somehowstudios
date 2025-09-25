gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

let scroll
let transitionOffset = 825
let stackedIndex = 2
CustomEase.create('elastic-css', '.2, 1.33, .25 ,1')
CustomEase.create('ease-in-css', '.25, 1, 0.1 ,1')

initPageTransitions()

// Animation - Page Loader
function initLoaderShort() {
  var tl = gsap.timeline()

  tl.set('.loading-container .logo .overlay', {
    scaleX: 0,
  })

  tl.set(
    '.loading-container .copyright-visual',
    {
      scale: 0.9,
      autoAlpha: 0,
    },
    '0'
  )

  tl.set(
    '.loading-container .logo svg',
    {
      yPercent: -100,
      rotate: 6,
    },
    '0'
  )

  tl.set(
    '.loading-screen',
    {
      yPercent: -150,
      rotate: -6,
      duration: 0.8,
      scaleX: 1.1,
      scaleY: 1.05,
      stagger: 0.025,
      ease: 'Expo.easeInOut',
    },
    '0'
  )

  tl.set(
    '.transition-screen',
    {
      yPercent: -150,
      rotate: 6,
      scaleX: 1.1,
      scaleY: 1.05,
    },
    '0'
  )

  tl.set(
    '.cookie-jar',
    {
      yPercent: 0,
      rotate: 0.001,
      opacity: 1,
    },
    '< 2'
  )

  tl.call(
    function () {
      scroll.stop()
    },
    null,
    0
  )

  tl.call(
    function () {
      pageTransitionOut()
    },
    null,
    0
  )

  tl.call(
    function () {
      $('[data-page-transition-bottom]').attr(
        'data-page-transition-bottom',
        'not-active'
      )
    },
    null,
    0
  )

  tl.call(
    function () {
      $('[data-page-transition]').attr('data-page-transition', 'not-active')
    },
    null,
    0
  )
}

// Animation - Page Loader
function initLoader() {
  var tl = gsap.timeline()
  var transitionOffset = 1.2

  tl.set('html', {
    cursor: 'wait',
  })

  tl.set('.loading-screen', {
    yPercent: 0,
    rotate: 0.001,
    scaleX: 1.1,
    scaleY: 1.05,
    transformOrigin: 'left bottom',
  })

  tl.set('.transition-screen', {
    yPercent: 0,
    rotate: 0.001,
    scaleX: 1.1,
    scaleY: 1.05,
    transformOrigin: 'right bottom',
  })

  tl.set('.cookie-jar', {
    yPercent: 130,
    rotate: 0.001,
    transformOrigin: 'right bottom',
    rotate: -6,
    opacity: 0,
  })

  tl.to('.loading-container .logo .overlay', {
    scaleX: 0,
    duration: transitionOffset,
    ease: 'Expo.easeInOut',
  })

  tl.to(
    '.loading-container .copyright-visual',
    {
      scale: 0.9,
      autoAlpha: 0,
      duration: 0.8,
      ease: 'Expo.easeIn',
    },
    transitionOffset - 0.35
  )

  tl.to(
    '.loading-container .logo svg',
    {
      yPercent: -100,
      rotate: 6,
      duration: 0.8,
      ease: 'Expo.easeIn',
    },
    transitionOffset - 0.25
  )

  tl.to(
    '.loading-screen',
    {
      yPercent: -100,
      rotate: -6,
      duration: 0.8,
      scaleX: 1.1,
      scaleY: 1.05,
      stagger: 0.025,
      ease: 'Expo.easeInOut',
    },
    transitionOffset + 0.2
  )

  tl.to(
    '.transition-screen',
    {
      yPercent: -100,
      rotate: 6,
      duration: 0.8,
      scaleX: 1.1,
      scaleY: 1.05,
      stagger: 0.025,
      ease: 'Expo.easeInOut',
    },
    '< 0.35'
  )

  tl.to(
    '.cookie-jar',
    {
      yPercent: 0,
      rotate: 0.001,
      duration: 0.8,
      opacity: 1,
      ease: 'elastic-css',
      clearProps: 'all',
    },
    '< 2'
  )

  tl.set(
    'html',
    {
      cursor: 'auto',
    },
    transitionOffset + 0.6
  )

  tl.call(
    function () {
      scroll.stop()
    },
    null,
    0
  )

  tl.call(
    function () {
      pageTransitionOut()
    },
    null,
    transitionOffset + 0.6
  )

  tl.call(
    function () {
      $('[data-page-transition-bottom]').attr(
        'data-page-transition-bottom',
        'not-active'
      )
    },
    null,
    transitionOffset + 0.6
  )

  tl.call(
    function () {
      $('[data-page-transition]').attr('data-page-transition', 'not-active')
    },
    null,
    transitionOffset + 1
  )
}

// Animation - Page Leave
function pageTransitionIn() {
  var tl = gsap.timeline()

  if (document.querySelector('.lorem-ipsum')) {
  }

  tl.set('.transition-screen', {
    yPercent: 100,
    rotate: -6,
    scaleX: 1.1,
    scaleY: 1.05,
    transformOrigin: 'right top',
  })

  tl.to('.transition-screen', {
    yPercent: 0,
    rotate: 0.001,
    duration: 0.8,
    scaleX: 1.1,
    scaleY: 1.05,
    stagger: 0.025,
    ease: 'Expo.easeInOut',
  })

  tl.set('.transition-screen', {
    transformOrigin: 'right bottom',
  })

  tl.to(
    '.transition-screen',
    {
      delay: 0.05,
      yPercent: -100,
      rotate: 6,
      duration: 0.8,
      scaleX: 1.1,
      scaleY: 1.05,
      stagger: 0.025,
      ease: 'Expo.easeInOut',
    },
    '0.6'
  )

  tl.call(
    function () {
      scroll.stop()
    },
    null,
    0
  )

  tl.call(
    function () {
      $('[data-page-transition-bottom]').attr(
        'data-page-transition-bottom',
        'active'
      )
    },
    null,
    0.3
  )

  tl.call(
    function () {
      $('[data-page-transition]').attr('data-page-transition', 'active')
    },
    null,
    0.5
  )

  tl.call(
    function () {
      $('[data-page-transition-bottom]').attr(
        'data-page-transition-bottom',
        'not-active'
      )
    },
    null,
    1
  )

  tl.call(
    function () {
      $('[data-page-transition]').attr('data-page-transition', 'not-active')
    },
    null,
    1.2
  )
}

// Animation - Page Enter
function pageTransitionOut() {
  var tl = gsap.timeline()

  if (document.querySelector('.split-words.animate-transition')) {
    tl.set('.split-words.animate-transition .single-word-inner', {
      yPercent: 120,
      rotate: 6,
    })
  }

  if (document.querySelector('.split-words.animate-transition')) {
    tl.to('.split-words.animate-transition .single-word-inner', {
      yPercent: 0,
      rotate: 0.001,
      stagger: 0.05,
      duration: 1,
      ease: 'elastic-css',
      delay: 0.3,
      clearProps: 'all',
    })
  }

  if (document.querySelector('.animate-slide-in')) {
    tl.fromTo(
      '.animate-slide-in',
      {
        yPercent: 101,
      },
      {
        yPercent: 0,
        rotate: 0.001,
        stagger: 0.05,
        duration: 1,
        ease: 'ease-in-css',
        delay: 0.2,
        clearProps: 'all',
      },
      '<'
    )
  }

  if (document.querySelector('.animate-fade-in')) {
    tl.fromTo(
      '.animate-fade-in',
      {
        y: '40px',
        opacity: 0,
      },
      {
        y: '0px',
        opacity: 1,
        rotate: 0.001,
        stagger: 0.05,
        duration: 1,
        ease: 'elastic-css',
        clearProps: 'all',
      },
      '<'
    )
  }

  tl.call(
    function () {
      scroll.start()
    },
    null,
    0
  )

  tl.call(
    function () {
      initLoopLines()
    },
    null,
    0.2
  )

  tl.call(
    function () {
      ScrollTrigger.refresh()
    },
    null,
    0.4
  )
}

function initPageTransitions() {
  // Reset scroll on page next
  history.scrollRestoration = 'manual'

  barba.hooks.afterEnter(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  })

  barba.hooks.leave(() => {
    initBasicFunctions()
  })

  // Functions Before
  function initResetDataBefore() {
    // $('[data-navigation-status]').attr('data-navigation-status', 'not-active');
  }

  // Functions After
  function initResetDataAfter() {
    $('[data-navigation-status]').attr('data-navigation-status', 'not-active')
    $('[data-scrolling-direction]').attr('data-scrolling-direction', 'down')
    $('[data-scrolling-started]').attr('data-scrolling-started', 'false')
    stackedIndex = 2
    $('[data-stacked-image-id]').removeAttr('style')
    $('.single-stacked-image[data-link-status="active"]')
      .css('z-index', stackedIndex)
      .attr('data-stacked-image-status', 'active')
      .siblings()
      .attr('data-stacked-image-status', 'not-active')
    $('[data-nav-id]').parent().parent().attr('data-links-hover', 'false')
    $('[data-cursor-init]').attr('data-cursor-init', 'false')
    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'not-active')
    $('[data-cursor-status-drag]').attr('data-cursor-status-drag', 'not-active')
    $('[data-cursor-status-move]').attr('data-cursor-status-move', 'not-active')
  }

  barba.init({
    sync: true,
    debug: true,
    timeout: 7000,
    transitions: [
      {
        name: 'self',
        async leave(data) {
          pageTransitionIn(data.current)
          initResetDataBefore()
          await delay(transitionOffset)
          initBarbaNavUpdate(data)
          initResetDataAfter()
          scroll.destroy()
          data.current.container.remove()
        },
        async enter(data) {
          pageTransitionOut(data.next)
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach((t) => t.kill())
          initSmoothScroll(data.next.container)
          initScript()
        },
      },
      {
        name: 'default',
        once(data) {
          initSmoothScroll(data.next.container)
          initScript()
          initLoader()
        },
        async leave(data) {
          pageTransitionIn(data.current)
          initResetDataBefore()
          await delay(transitionOffset)
          initBarbaNavUpdate(data)
          initResetDataAfter()
          scroll.destroy()
          data.current.container.remove()
        },
        async enter(data) {
          pageTransitionOut(data.next)
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach((t) => t.kill())
          initSmoothScroll(data.next.container)
          initScript()
        },
      },
    ],
  })

  function initSmoothScroll(container) {
    // Lenis: https://github.com/studio-freight/lenis
    scroll = new Lenis({
      // duration: 1
    })

    scroll.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      scroll.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh()
  }
}

// Don't touch
function delay(n) {
  n = n || 2000
  return new Promise((done) => {
    setTimeout(() => {
      done()
    }, n)
  })
}

/**
 * Fire all scripts on page load
 */
function initScript() {
  initFlickitySlider()
  initSplitText()
  initCheckWindowHeight()
  initBasicFunctions()
  initLazyLoad()
  initScrollTriggerPlayVideoInview()
  initLenisCheckScrollUpDown()
  initScrollToAnchorLenis()
  initCheckTheme()
  initVimeoBackground()
  initVimeoPlayer()
  initCustomScrollbar()
  initMarqueeScrollV2()
  initPlayVideoHover()
  initCustomCursorV2()
  initScrolltriggerAnimations()
}

/**
 * Barba Update Links outside Main on page Transition
 */
function initBarbaNavUpdate(data) {
  const updateItems = $(data.next.html).find('[data-barba-update]')

  $('[data-barba-update]').each(function (index) {
    if ($(updateItems[index]).get(0)) {
      const newLinkStatus = $(updateItems[index])
        .get(0)
        .getAttribute('data-link-status')
      $(this).attr('data-link-status', newLinkStatus)
    }
  })
}

/**
 * Window Inner Height Check
 */
function initCheckWindowHeight() {
  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh-in-px', `${vh}px`)
}

/**
 * Basic Functions
 */
function initBasicFunctions() {
  // Toggle Navigation
  $('[data-navigation-toggle="toggle"]').click(function () {
    if (
      $('[data-navigation-status]').attr('data-navigation-status') ==
      'not-active'
    ) {
      $('[data-navigation-status]').attr('data-navigation-status', 'active')
      scroll.stop()
    } else {
      $('[data-navigation-status]').attr('data-navigation-status', 'not-active')
      scroll.start()
    }
  })

  // Close Navigation
  $('[data-navigation-toggle="close"]').click(function () {
    $('[data-navigation-status]').attr('data-navigation-status', 'not-active')
    scroll.start()
  })

  // Key ESC - Close Navigation
  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      if (
        $('[data-navigation-status]').attr('data-navigation-status') == 'active'
      ) {
        $('[data-navigation-status]').attr(
          'data-navigation-status',
          'not-active'
        )
        scroll.start()
      }
    }
  })

  // Stacked Navigation Cards

  $('[data-nav-stacked-images-init]').each(function () {
    $('[data-stacked-image-id][data-link-status="active"]').attr(
      'data-stacked-image-status',
      'active'
    )
    let dataNavIDPrev = $('[data-stacked-image-status="active"]').attr(
      'data-stacked-image-id'
    )

    gsap.set($('[data-stacked-image-status="not-active"]'), {
      yPercent: -100,
      scale: 1,
      rotate: 0.001,
    })

    $('[data-nav-id]').on('mouseenter click', function () {
      let dataNavID = $(this).attr('data-nav-id')
      $(this).parent().parent().attr('data-links-hover', 'true')
      if (
        $('[data-stacked-image-id="' + dataNavID + '"]').attr(
          'data-stacked-image-status'
        ) != 'active'
      ) {
        stackedIndex = stackedIndex + 1

        $('[data-stacked-image-id="' + dataNavID + '"]')
          .attr('data-stacked-image-status', 'active')
          .siblings()
          .attr('data-stacked-image-status', 'not-active')
        $('[data-stacked-image-id="' + dataNavID + '"]').css(
          'z-index',
          stackedIndex
        )

        gsap.fromTo(
          $('[data-stacked-image-id="' + dataNavID + '"]'),
          {
            yPercent: 100,
            scale: 1,
            rotate: 0.001,
            transformOrigin: 'right top',
          },
          {
            yPercent: 0,
            scale: 1,
            rotate: 0.001,
            duration: 0.8,
            ease: 'ease-in-css',
          }
        )

        gsap.fromTo(
          $('[data-stacked-image-id="' + dataNavIDPrev + '"]'),
          {
            yPercent: 0,
            scale: 1,
            rotate: 0.001,
            transformOrigin: 'center top',
          },
          {
            yPercent: -100,
            scale: 1,
            rotate: 0.001,
            duration: 0.8,
            ease: 'ease-in-css',
          }
        )
      }
    })

    $('[data-nav-id]').on('mouseleave', function () {
      dataNavIDPrev = $(this).attr('data-nav-id')
      $(this).parent().attr('data-links-hover', 'false')
    })
  })

  // Looping logo's
  $('.logo-visual').each(function () {
    var logoVisual = $(this)
    var logoVisualClientName = logoVisual
      .find('[data-loop-text]')
      .attr('data-loop-text')
    logoVisual
      .find('[data-loop-text]')
      .css('--cursor-speed', ' ' + logoVisualClientName.length + 's')
  })

  // CycleCards

  $('[data-cyclecards-init]').each(function () {
    var cycleCards = $(this)
    var cycleCardsIndex = 2
    let dataCycleCardIDPrev = cycleCards
      .find('[data-cyclecard-image][data-cyclecard-status="active"]')
      .attr('data-cyclecard-id')

    cycleCards
      .find('[data-cyclecard-image][data-cyclecard-status="active"]')
      .css('z-index', cycleCardsIndex)
    gsap.set(
      cycleCards.find(
        '[data-cyclecard-hover][data-cyclecards-status="not-active"]'
      ),
      {
        yPercent: -100,
        scale: 1,
        rotate: 0.001,
      }
    )

    cycleCards
      .find('[data-cyclecard-hover]')
      .on('mouseenter click', function () {
        let dataCycleCardID = $(this).attr('data-cyclecard-id')
        if (
          cycleCards
            .find(
              '[data-cyclecard-hover][data-cyclecard-id="' +
                dataCycleCardID +
                '"]'
            )
            .attr('data-cyclecard-status') != 'active'
        ) {
          cycleCardsIndex = cycleCardsIndex + 1

          cycleCards
            .find('[data-cyclecard-id="' + dataCycleCardID + '"]')
            .attr('data-cyclecard-status', 'active')
            .siblings()
            .attr('data-cyclecard-status', 'not-active')
          cycleCards
            .find(
              '[data-cyclecard-image][data-cyclecard-id="' +
                dataCycleCardID +
                '"]'
            )
            .css('z-index', cycleCardsIndex)

          gsap.fromTo(
            cycleCards.find(
              '[data-cyclecard-image][data-cyclecard-id="' +
                dataCycleCardID +
                '"]'
            ),
            {
              yPercent: 100,
              scale: 1,
              rotate: 0.001,
              transformOrigin: 'right top',
            },
            {
              yPercent: 0,
              scale: 1,
              rotate: 0.001,
              duration: 0.8,
              ease: 'ease-in-css',
            }
          )

          gsap.fromTo(
            cycleCards.find(
              '[data-cyclecard-image][data-cyclecard-id="' +
                dataCycleCardIDPrev +
                '"]'
            ),
            {
              yPercent: 0,
              scale: 1,
              rotate: 0.001,
              transformOrigin: 'center top',
            },
            {
              yPercent: -100,
              scale: 1,
              rotate: 0.001,
              duration: 0.8,
              ease: 'ease-in-css',
            }
          )
        }
      })

    cycleCards.find('[data-cyclecard-hover]').on('mouseleave', function () {
      dataCycleCardIDPrev = $(this).attr('data-cyclecard-id')
    })
  })

  // Add hover Children

  $('[data-hover-children]').each(function () {
    var dataHoverChildren = $(this)
    dataHoverChildren.find('li > *').on('mouseenter click', function () {
      dataHoverChildren.attr('data-hover-children', 'true')
    })

    dataHoverChildren.find('li > *').on('mouseleave', function () {
      dataHoverChildren.attr('data-hover-children', 'false')
    })
  })

  // Copy to Clipboard
  $('[data-copy-clipboard]').on('click', function () {
    let copyClipboardText = $(this).attr('data-copy-clipboard')
    navigator.clipboard.writeText(copyClipboardText)
    $(this).find('.duplicate').text('Copied to clipboard!')
  })

  $('[data-copy-clipboard]').on('mouseleave', function () {
    let copyClipboard = $(this)
    let copyClipboardText = $(this).attr('data-copy-clipboard')
    setTimeout(function () {
      copyClipboard.find('.duplicate').text(copyClipboardText)
    }, 400)
  })
}

/**
 * Loop Lines
 */
function initLoopLines() {
  // Slideshow Header
  $('[data-slideshow-status="active"]').each(function () {
    var slideShowSlideIndex = 2
    var slideshow = $(this)

    var maxWord = ''
    var maxCharCount = 0

    slideshow.find('[data-slideshow-slide-status]').each(function () {
      var currentWord = $(this)
      var currentWordText = currentWord.text()
      var currentCharCount = currentWordText.length

      if (currentCharCount > maxCharCount) {
        maxCharCount = currentCharCount
        maxWord = currentWord
      }
    })

    maxWord.css('position', 'relative')

    slideshow.find('[data-slideshow-slide-status]')

    slideshow.find('[data-slideshow-slide-status="active"]').css('z-index', 2)
    function nextSlideshowSlide() {
      function nextSlideshowSlideSwitch() {
        slideShowSlideIndex = slideShowSlideIndex + 1 // Add z-index each switch

        // Check if next or if first
        if (
          slideshow.find('[data-slideshow-slide-status="active"]').next()
            .length > 0
        ) {
          slideshow
            .find('[data-slideshow-slide-status="active"]')
            .attr('data-slideshow-slide-status', 'transition-out')
            .next()
            .attr('data-slideshow-slide-status', 'active')
            .css('z-index', slideShowSlideIndex)
          setTimeout(function () {
            slideshow
              .find('[data-slideshow-slide-status="transition-out"]')
              .attr('data-slideshow-slide-status', 'not-active')
          }, 800)
        } else {
          slideshow
            .find('[data-slideshow-slide-status="active"]')
            .attr('data-slideshow-slide-status', 'transition-out')
          slideshow
            .find('[data-slideshow-slide-status]')
            .first()
            .attr('data-slideshow-slide-status', 'active')
            .css('z-index', slideShowSlideIndex)
          setTimeout(function () {
            slideshow
              .find('[data-slideshow-slide-status="transition-out"]')
              .attr('data-slideshow-slide-status', 'not-active')
          }, 800)
        }
      }

      // Repeat
      setTimeout(function () {
        nextSlideshowSlideSwitch()
        nextSlideshowSlide()
      }, 2400)
    }

    // First call
    nextSlideshowSlide()
  })
}

/**
 * Lazy Load
 */
function initLazyLoad() {
  // https://github.com/verlok/vanilla-lazyload
  var lazyLoadInstance = new LazyLoad({
    container: document.querySelector('[data-scroll-container]'),
    elements_selector: '.lazy',
  })
}

/**
 * GSAP Split Text
 */
function initSplitText() {
  var splitWords = new SplitText('.split-words', {
    type: 'words',
    wordsClass: 'single-word',
  })
  $('.split-words .single-word').wrapInner('<div class="single-word-inner">')
}

/**
 * Play Video Inview
 */
function initScrollTriggerPlayVideoInview() {
  let allVideoDivs = gsap.utils.toArray('.playpauze')

  allVideoDivs.forEach((videoDiv, i) => {
    let videoElem = videoDiv.querySelector('video')

    ScrollTrigger.create({
      trigger: videoElem,
      start: '0% 150%',
      end: '100% -50%',
      onEnter: () => videoElem.play(),
      onEnterBack: () => videoElem.play(),
      onLeave: () => videoElem.pause(),
      onLeaveBack: () => videoElem.pause(),
    })
  })
}

/**
 * Lenis - Check Scroll up or Down
 */

function initLenisCheckScrollUpDown() {
  var lastScrollTop = 0
  var threshold = 50
  var thresholdTop = 50

  function startCheckScroll() {
    scroll.on('scroll', (e) => {
      var nowScrollTop = e.targetScroll

      if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
        // Check Scroll Direction
        if (nowScrollTop > lastScrollTop) {
          $('[data-scrolling-direction]').attr(
            'data-scrolling-direction',
            'down'
          )
        } else {
          $('[data-scrolling-direction]').attr('data-scrolling-direction', 'up')
        }
        lastScrollTop = nowScrollTop

        // Check if Scroll Started
        if (nowScrollTop > thresholdTop) {
          $('[data-scrolling-started]').attr('data-scrolling-started', 'true')
        } else {
          $('[data-scrolling-started]').attr('data-scrolling-started', 'false')
        }
      }
    })
  }
  startCheckScroll()

  // Reset instance
  barba.hooks.after(() => {
    startCheckScroll()
  })
}

/**
 * Lenis - ScrollTo Anchor Links
 */
function initScrollToAnchorLenis() {
  $('[data-anchor-target]').click(function () {
    let targetScrollToAnchorLenis = $(this).attr('data-anchor-target')
    scroll.scrollTo(targetScrollToAnchorLenis, {
      duration: 1,
      easing: (x) =>
        x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
    })
  })
}

/**
 * Check Theme of Sections
 */
function initCheckTheme() {
  function checkThemeSection() {
    var themeSections = document.querySelectorAll('[data-theme-section]') // Adjust the selector as needed

    for (var i = 0; i < themeSections.length; i++) {
      var themeSection = themeSections[i]
      var themeSectionTop = themeSection.getBoundingClientRect().top
      var themeSectionBottom = themeSection.getBoundingClientRect().bottom
      var themeObserverOffset = $('.main-nav-bar').innerHeight() / 2
      var themeObserverOffsetBottom =
        $('header .btn-hamburger').position().top +
        $('header .btn-hamburger').innerHeight() / 2

      if (
        themeSectionTop <= themeObserverOffset &&
        themeSectionBottom >= themeObserverOffset
      ) {
        // Check [data-theme-section]
        var themeSectionActive = $(themeSection).attr('data-theme-section')
        if (
          $('[data-theme-nav]').attr('data-theme-nav') == themeSectionActive
        ) {
        } else {
          $('[data-theme-nav]').attr('data-theme-nav', themeSectionActive)
        }
      }

      if (
        themeSectionTop <= themeObserverOffsetBottom &&
        themeSectionBottom >= themeObserverOffsetBottom
      ) {
        // Check [data-theme-section]
        var themeSectionActive = $(themeSection).attr('data-theme-section')
        if (
          $('[data-theme-nav-bottom]').attr('data-theme-nav-bottom') ==
          themeSectionActive
        ) {
        } else {
          $('[data-theme-nav-bottom]').attr(
            'data-theme-nav-bottom',
            themeSectionActive
          )
        }

        // Check [data-bg-section]
        var bgSectionActive = $(themeSection).attr('data-bg-section')
        if (
          $('[data-bg-nav-bottom]').attr('data-bg-nav-bottom') ==
          bgSectionActive
        ) {
        } else {
          $('[data-bg-nav-bottom]').attr('data-bg-nav-bottom', bgSectionActive)
        }
      }
    }
  }
  checkThemeSection()

  document.addEventListener('scroll', function () {
    checkThemeSection()
  })

  barba.hooks.after(() => {
    checkThemeSection()
  })
}

/**
 * Vimeo Background Embed
 */
function initVimeoBackground() {
  // Full controls
  // https://codepen.io/simpson77/pen/YXowmy

  $('[data-vimeo-background-target]').each(function (index) {
    var playerID = $(this)

    var videoIndexID = 'vimeo-background-index-' + index
    $(this).attr('id', videoIndexID)

    var iframe = $(this).attr('id')
    var player = new Vimeo.Player(iframe)

    player.setVolume(0)

    // Loaded
    player.on('bufferend', function () {
      playerID.attr('data-vimeo-status-loaded', 'true')
      playerID.attr('data-vimeo-status-activated', 'true')
    })
  })
}

/**
 * Vimeo Player Embed
 */
function initVimeoPlayer() {
  // Full controls
  // https://codepen.io/simpson77/pen/YXowmy

  $('[data-vimeo-player-target]').each(function (index) {
    var playerID = $(this)

    var videoIndexID = 'vimeo-player-index-' + index
    var videoScrollIndexID = 'vimeo-player-scroll-index-' + index
    var videoScrollIndexIDHashtag = '#vimeo-player-scroll-index-' + index
    $(this).attr('id', videoIndexID)

    var iframe = $(this).attr('id')
    var player = new Vimeo.Player(iframe)

    player.setVolume(1)

    playerID.find('.scroll-to-target').attr('id', videoScrollIndexID)
    playerID
      .find('[data-anchor-target]')
      .attr('data-anchor-target', videoScrollIndexIDHashtag)

    // Loaded
    player.on('play', function () {
      playerID.attr('data-vimeo-status-loaded', 'true')
    })

    // Play
    playerID.find('[data-vimeo-control="play"]').click(function () {
      playerID.attr('data-vimeo-status-activated', 'true')
      playerID.attr('data-vimeo-status-play', 'true')
      player.play()
    })

    // Pause
    playerID.find('[data-vimeo-control="pause"]').click(function () {
      playerID.attr('data-vimeo-status-play', 'false')
      player.pause()
    })

    // Mute
    playerID.find('[data-vimeo-control="mute"]').click(function () {
      if (playerID.attr('data-vimeo-status-muted') == 'false') {
        player.setVolume(0)
        playerID.attr('data-vimeo-status-muted', 'true')
      } else {
        player.setVolume(1)
        playerID.attr('data-vimeo-status-muted', 'false')
      }
    })

    // Convert number into seconds & hrs
    // https://stackoverflow.com/questions/11792726/turn-seconds-into-hms-format-using-jquery
    function secondsTimeSpanToHMS(s) {
      var h = Math.floor(s / 3600) //Get whole hours
      s -= h * 3600
      var m = Math.floor(s / 60) //Get remaining minutes
      s -= m * 60
      return m + ':' + (s < 10 ? '0' + s : s) //zero padding on minutes and seconds
    }

    // Duration
    var vimeoDuration = playerID.find('.vimeo-duration .duration')
    player.getDuration().then(function (duration) {
      vimeoDuration.text(secondsTimeSpanToHMS(duration))
      playerID
        .find('[data-vimeo-control="timeline"], progress')
        .attr('max', duration)
    })

    // Timeline
    playerID
      .find('[data-vimeo-control="timeline"]')
      .on('input change', function () {
        player.getDuration().then(function (duration) {
          var timeVal = playerID.find('[data-vimeo-control="timeline"]').val()
          player.setCurrentTime(timeVal)
          playerID.find('progress').attr('value', timeVal)
        })
      })

    // Progress Time & Timeline
    var vimeoTime = playerID.find('.vimeo-duration .time')
    player.on('timeupdate', function (data) {
      playerID
        .find('[data-vimeo-control="timeline"], progress')
        .val(data.seconds)
      vimeoTime.text(secondsTimeSpanToHMS(Math.trunc(data.seconds)))
    })

    // Remove Controls after hover
    var vimeoHoverTimer
    $(document).on('mousemove', function () {
      if (playerID.attr('data-vimeo-status-hover') == 'false') {
        //Show the element
        playerID.attr('data-vimeo-status-hover', 'true')
      } else {
        //Reset the timer to X amount of ms
        clearTimeout(vimeoHoverTimer)
        vimeoHoverTimer = setTimeout(vimeoHoverTrue, 2000)
      }
    })
    function vimeoHoverTrue() {
      playerID.attr('data-vimeo-status-hover', 'false')
    }

    // Ended
    var onEnd = function () {
      playerID.attr('data-vimeo-status-activated', 'false')
      playerID.attr('data-vimeo-status-play', 'false')
      player.unload()
    }

    player.on('ended', onEnd)
  })
}

/**
 * Custom Scrollbar (Lenis)
 */
function initCustomScrollbar() {
  let scrollbar = document.querySelector('[data-scrollbar]')
  let scrollbarHeight = scrollbar.getBoundingClientRect().height
  let thumb = document.querySelector('[data-scrollbar] [data-scrollbar-thumb]')
  let thumbHeight = thumb.getBoundingClientRect().height
  let content = document.querySelector('[data-scroll-container]')
  let contentHeight = content.getBoundingClientRect().height

  if (document.querySelector('[data-scrollbar-thumb-height="variable"]')) {
    gsap.set(thumb, {
      height: (scrollbarHeight / contentHeight) * scrollbarHeight,
    })
    thumbHeight = (scrollbarHeight / contentHeight) * scrollbarHeight
  }

  let scrollTween = gsap.to(thumb, {
    y: scrollbarHeight - thumbHeight,
    ease: 'none',
    scrollTrigger: {
      start: '0%',
      end: 'max',
      scrub: true,
    },
  })

  Draggable.create(thumb, {
    type: 'y',
    bounds: scrollbar,
    inertia: false,
    onDrag() {
      let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
      scroll.scrollTo((contentHeight - scrollbarHeight) * progress, {
        immediate: true,
      })
      $(scrollbar).attr('data-scrollbar-drag', 'true')
    },
    onRelease() {
      let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
      scrollTween.scrollTrigger.enable()
      scrollTween.progress(progress)
      $(scrollbar).attr('data-scrollbar-drag', 'false')
    },
  })
}

/**
 * Marquee on Scroll Direction
 */
function initMarqueeScrollV2() {
  $('[data-marquee-target]').each(function () {
    let marquee = $(this)

    let marqueeItemsWidth = marquee.find('.marquee-content').width()
    let marqueeSpeed =
      marquee.attr('data-marquee-speed') *
      (marqueeItemsWidth / $(window).width())

    // Speed up Marquee on Tablet & Mobile
    if ($(window).width() <= 540) {
      marqueeSpeed = marqueeSpeed * 0.33
    } else if ($(window).width() <= 1024) {
      marqueeSpeed = marqueeSpeed * 0.66
    }

    let marqueeDirection = 1
    let marqueeContent = gsap
      .to(marquee.find('.marquee-content'), {
        xPercent: -100,
        repeat: -1,
        duration: marqueeSpeed,
        ease: 'linear',
        paused: true,
      })
      .totalProgress(0.5)

    gsap.set(marquee.find('.marquee-content'), { xPercent: 50 })

    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self) {
        if (self.direction !== marqueeDirection) {
          marqueeDirection *= -1
          if (marquee.attr('data-marquee-direction') == 'right') {
            gsap.to([marqueeContent], {
              timeScale: marqueeDirection * -1,
              overwrite: true,
            })
          } else {
            gsap.to([marqueeContent], {
              timeScale: marqueeDirection,
              overwrite: true,
            })
          }
        }
        self.direction === -1
          ? marquee.attr('data-marquee-status', 'normal')
          : marquee.attr('data-marquee-status', 'inverted')
      },
      onEnter: () => marqueeContent.play(),
      onEnterBack: () => marqueeContent.play(),
      onLeave: () => marqueeContent.pause(),
      onLeaveBack: () => marqueeContent.pause(),
    })

    // Extra speed on scroll
    marquee.each(function () {
      let triggerElement = $(this)
      let targetElement = $(this).find('.marquee-scroll')
      let marqueeScrollSpeed = $(this).attr('data-marquee-scroll-speed')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0,
        },
      })

      if (triggerElement.attr('data-marquee-direction') == 'left') {
        tl.fromTo(
          targetElement,
          {
            x: marqueeScrollSpeed + 'vw',
          },
          {
            x: marqueeScrollSpeed * -1 + 'vw',
            ease: 'none',
          }
        )
      }

      if (triggerElement.attr('data-marquee-direction') == 'right') {
        tl.fromTo(
          targetElement,
          {
            x: marqueeScrollSpeed * -1 + 'vw',
          },
          {
            x: marqueeScrollSpeed + 'vw',
            ease: 'none',
          }
        )
      }
    })
  })
}

/**
 * Play Video on Hover
 */
function initPlayVideoHover() {
  $('[data-thumb-video-on-hover="true"]').each(function () {
    let videoThumb = $(this)
    let videoOnHoverTrue = videoThumb.find('video')
    videoThumb.on('mouseenter', function () {
      videoThumb.attr('data-thumb-video-status', 'active')
      videoOnHoverTrue.trigger('play')
    })
    videoThumb.on('mouseleave', function () {
      videoThumb.attr('data-thumb-video-status', 'not-active')
      setTimeout(function () {
        videoOnHoverTrue.trigger('pause')
      }, 300)
    })
  })
}

/**
 * Custom Cursor
 */
function initCustomCursorV2() {
  const cursorObject = document.querySelector('.custom-cursor')
  const cursorPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const mousePos = { x: cursorPos.x, y: cursorPos.y }

  var cursorMoveSpeed = 0.2
  var cursorDragSpeed = 0.4
  var cursorSpeed = cursorMoveSpeed
  var cursorActive = false

  const xCursorSet = gsap.quickSetter(cursorObject, 'x', 'px')
  const yCursorSet = gsap.quickSetter(cursorObject, 'y', 'px')

  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.x
    mousePos.y = e.y
  })

  gsap.ticker.add(customCursor)

  function customCursor() {
    if (!cursorActive) {
      const dt = 1.0 - Math.pow(1.0 - cursorSpeed, gsap.ticker.deltaRatio())
      cursorPos.x += (mousePos.x - cursorPos.x) * dt
      cursorPos.y += (mousePos.y - cursorPos.y) * dt
      xCursorSet(cursorPos.x)
      yCursorSet(cursorPos.y)
    }
  }

  // Flickity (update position on drag with Flickity)
  var flickityCursorCarousel = $('[data-flickity-slider-type]')

  flickityCursorCarousel.on('dragMove.flickity', function (e, mousemove) {
    mousePos.x = e.clientX
    mousePos.y = e.clientY
    cursorSpeed = cursorDragSpeed // set Drag Speed

    gsap.to({}, 0.0, {
      onUpdate: function () {
        gsap.set(cursorObject, {
          x: mousePos.x,
          y: mousePos.y,
        })
      },
    })

    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'active')
    $('[data-cursor-status-drag]').attr('data-cursor-status-drag', 'active')
  })

  flickityCursorCarousel.on('dragEnd.flickity', function () {
    cursorActive = false
    cursorSpeed = cursorMoveSpeed

    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'not-active')
    $('[data-cursor-status-drag]').attr('data-cursor-status-drag', 'not-active')
  })

  $('[data-flickity-slider-type="cards"]').on('mousemove', function () {
    if (
      $('[data-cursor-status-move]').attr('data-cursor-status-move') ==
      'not-active'
    ) {
      $('[data-cursor-status-move]').attr('data-cursor-status-move', 'active')
      setTimeout(function () {
        $('[data-cursor-status-move]').attr(
          'data-cursor-status-move',
          'not-active'
        )
      }, 1000)
    }
  })

  // Mouse Init
  $(document).on('mousemove', function () {
    if ($('[data-cursor-init]').attr('data-cursor-init') == 'false') {
      $('[data-cursor-init]').attr('data-cursor-init', 'true')
    }
  })

  // Text Hover
  $('[data-cursor-bubble-text]').on('mouseenter', function () {
    let dataCursorText = $(this).data('cursor-bubble-text')
    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'active')
    $('.custom-cursor .cursor-bubble .cursor-text').text(dataCursorText)
  })
  $('[data-cursor-bubble-text]').on('mouseleave', function () {
    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'not-active')
  })

  // Flickity
  $('.flickity-enabled .flickity-slide').on('mouseenter', function () {
    if ($(this).attr('data-cursor-bubble-text')) {
    } else {
      $('[data-cursor-bubble]').attr('data-cursor-bubble', 'active')
      $('[data-cursor-bubble]').attr('data-cursor-status-onlydrag', 'active')
    }
  })
  $('.flickity-enabled .flickity-slide').on('mouseleave', function () {
    $('[data-cursor-bubble]').attr('data-cursor-bubble', 'not-active')
    $('[data-cursor-bubble]').attr('data-cursor-status-onlydrag', 'not-active')
  })
}

/**
 * Flickity Slider
 */
function initFlickitySlider() {
  // Source
  // https://flickity.metafizzy.co/

  // Slider type: Cards

  $('[data-flickity-slider-type="cards"]').each(function (index) {
    var sliderIndexID = 'flickity-slider-type-cards-id-' + index
    $(this).attr('id', sliderIndexID)

    var sliderThis = $(this)

    var flickitySliderGroup = document.querySelector(
      '#' + sliderIndexID + ' .flickity-carousel'
    )
    var flickitySlider = sliderThis.find('.flickity-carousel').flickity({
      // options
      watchCSS: true,
      contain: true,
      wrapAround: false,
      dragThreshold: 10,
      prevNextButtons: false,
      pageDots: false,
      cellAlign: 'left',
      selectedAttraction: 0.015,
      friction: 0.25,
      percentPosition: true,
      freeScroll: false,
      on: {
        dragStart: () => {
          flickitySlider.css('pointer-events', 'none')
        },
        dragEnd: () => {
          flickitySlider.css('pointer-events', 'auto')
        },
        change: function () {
          updatePagination()
        },
      },
    })

    // Flickity instance
    var flkty = flickitySlider.data('flickity')

    // previous
    var prevButton = sliderThis
      .find('[data-flickity-control="prev"]')
      .on('click', function () {
        flickitySlider.flickity('previous')
      })
    // next
    var nextButton = sliderThis
      .find('[data-flickity-control="next"]')
      .on('click', function () {
        flickitySlider.flickity('next')
      })
    // Get the amount of columns variable and use to calc last slide
    var inviewColumns = window
      .getComputedStyle(flickitySliderGroup)
      .getPropertyValue('--columns')

    function updatePagination() {
      // enable/disable previous/next buttons
      if (!flkty.cells[flkty.selectedIndex - 1]) {
        prevButton.attr('disabled', 'disabled')
        nextButton.removeAttr('disabled') // <-- remove disabled from the next
      } else if (!flkty.cells[flkty.selectedIndex + parseInt(inviewColumns)]) {
        nextButton.attr('disabled', 'disabled')
        prevButton.removeAttr('disabled') //<-- remove disabled from the prev
      } else {
        prevButton.removeAttr('disabled')
        nextButton.removeAttr('disabled')
      }
    }
  })
}

/**
 * Scrolltrigger Animations Desktop + Mobile
 */
function initScrolltriggerAnimations() {
  if (document.querySelector('.section-home-header')) {
    $('.section-home-header').each(function (index) {
      let triggerElement = $(this)
      let targetElement = $(this).find('.col-row-title')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
          // toggleActions: "none play none reverse",
          markers: false,
        },
      })

      tl.to(targetElement, {
        ease: 'none',
        yPercent: -50,
      })
    })

    $('.section-home-header').each(function (index) {
      let triggerElement = $(this)
      let targetElement = $(this).find('.told')
      let targetElementSeen = $(this).find('.seen')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '1% 0%',
          end: '1% 0%',
          toggleActions: 'none play none reverse',
          markers: false,
        },
      })

      tl.fromTo(
        targetElement,
        {
          yPercent: 0,
          rotate: 0.001,
        },
        {
          yPercent: -100,
          rotate: 12,
          duration: 1.2,
          ease: 'Expo.easeInOut',
        }
      )

      tl.fromTo(
        targetElementSeen,
        {
          yPercent: 100,
          rotate: 12,
        },
        {
          yPercent: 0,
          rotate: 0.001,
          duration: 1.2,
          ease: 'Expo.easeInOut',
        },
        '<'
      )
    })
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
          markers: false,
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

    // Check on page-transition
    barba.hooks.after(() => {
      checkIndexSection()
    })
  }

  if (document.querySelector('.section-services-header')) {
    $('.section-services-header').each(function () {
      let triggerElement = $(this)
      let targetElement = $(this).find('.row-image')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
          markers: false,
        },
      })

      tl.to(targetElement, {
        ease: 'none',
        yPercent: -50,
      })
    })
  }

  if (document.querySelector('.split-words.animate-scroll')) {
    $('.split-words.animate-scroll').each(function () {
      let triggerElement = $(this)
      let targetElement = $(this).find('.single-word-inner')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 75%',
          end: '100% 0%',
          toggleActions: 'play none none none',
          markers: false,
        },
      })

      gsap.set(targetElement, {
        yPercent: 120,
        rotate: 6,
      })

      tl.to(targetElement, {
        yPercent: 0,
        rotate: 0.001,
        stagger: 0.05,
        duration: 1,
        ease: 'elastic-css',
        clearProps: 'all',
      })
    })
  }

  if (document.querySelector('.animate-scroll-fade-in')) {
    $('.animate-scroll-group').each(function () {
      let triggerElement = $(this)
      let targetElement = $(this).find('.animate-scroll-fade-in')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 85%',
          end: '100% 0%',
          toggleActions: 'play none none none',
        },
      })

      gsap.set(targetElement, {
        y: '40px',
        opacity: 0,
      })

      tl.to(targetElement, {
        y: '0px',
        opacity: 1,
        rotate: 0.001,
        stagger: 0.05,
        duration: 1,
        ease: 'elastic-css',
        clearProps: 'all',
      })
    })
  }

  if (document.querySelector('.section-twopercent-header')) {
    $('.section-twopercent-header').each(function () {
      let triggerElement = $(this)
      let targetElement = $(this).find('figure')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
          markers: false,
        },
      })

      tl.to(targetElement, {
        ease: 'none',
        yPercent: 10,
      })
    })
  }

  // Globe animation
  $('.globe-wrapper').each(function () {
    var globeWrapper = $(this)
    var globe = $(this).find('.globe')
    var globeScrollVelocity

    gsap.config({
      overwrite: 'auto',
    })

    var tl = gsap.timeline({
      repeat: -1,
      defaults: {
        duration: 1,
      },
      paused: true,
    })

    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: globe,
        start: '-50% 100%',
        end: '150% 0%',
        onUpdate: function (self) {
          globeScrollVelocity = self.getVelocity()
          var globeScrollVelocityMath = Math.abs(globeScrollVelocity * 0.005)
          tl.timeScale(globeScrollVelocityMath + 1)
        },
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      },
    })

    tl.fromTo(
      globe.find('.circle-1'),
      {
        width: '50%',
      },
      {
        width: '37.5%',
        ease: 'none',
      }
    )

    tl.fromTo(
      globe.find('.circle-2'),
      {
        width: '37.5%',
      },
      {
        width: '25%',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-3'),
      {
        width: '25%',
      },
      {
        width: '12.5%',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-4'),
      {
        width: '12.5%',
      },
      {
        width: 'calc(0% + 1px)',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-5'),
      {
        width: 'calc(0% + 1px)',
      },
      {
        width: '12.5%',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-6'),
      {
        width: '12.5%',
      },
      {
        width: '25%',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-7'),
      {
        width: '25%',
      },
      {
        width: '37.5%',
        ease: 'none',
      },
      '<'
    )

    tl.fromTo(
      globe.find('.circle-8'),
      {
        width: '37.5%',
      },
      {
        width: '50%',
        ease: 'none',
      },
      '<'
    )
  })

  if (document.querySelector('.block-full-image')) {
    $('.block-full-image .col-small-image').each(function () {
      let triggerElement = $(this)
      let targetElement = $(this)

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 100%',
          end: '100% 0%',
          scrub: 0,
          markers: false,
        },
      })

      tl.fromTo(
        targetElement,
        {
          yPercent: 0,
        },
        {
          ease: 'none',
          yPercent: -25,
        }
      )
    })
  }

  if (document.querySelector('.block-stats')) {
    // Scrolltrigger Animation : Count Up
    $('.block-stats .col').each(function (index) {
      let triggerElement = $(this)
      let targetElement = $(this).find('.count-up')

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 75%',
          end: '100% 0%',
          markers: false,
        },
      })

      tl.from(
        targetElement,
        {
          duration: 2,
          ease: Expo.easeInOut,
          innerText: 0,
          roundProps: 'innerText',
          delay: 0.5,
          onUpdate: function () {
            this.targets().forEach((target) => {
              const val = gsap.getProperty(target, 'innerText')
              target.innerText = numberWithCommas(val)
            })
          },
        },
        '<'
      )
      function numberWithCommas(n) {
        var parts = n.toString().split('.')
        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    })
  }
}
