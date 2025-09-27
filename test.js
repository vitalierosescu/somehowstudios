function initTabSystem() {
  const wrappers = document.querySelectorAll('[data-tabs="wrapper"]')

  wrappers.forEach((wrapper) => {
    const contentItems = wrapper.querySelectorAll('[data-tabs="content-item"]')
    const visualItems = wrapper.querySelectorAll('[data-tabs="visual-item"]')
    const animateVisuals = visualItems.length > 1 // if only 1 (or 0), keep visuals static
    if (!animateVisuals && visualItems[0]) {
      visualItems[0].classList.add('active')
    }

    const autoplay = wrapper.dataset.tabsAutoplay === 'true'
    const autoplayDuration =
      parseInt(wrapper.dataset.tabsAutoplayDuration) || 5000

    let activeContent = null // keep track of active item/link
    let activeVisual = animateVisuals ? null : visualItems[0] || null
    let isAnimating = false
    let progressBarTween = null // to stop/start the progress bar

    function startProgressBar(index) {
      if (progressBarTween) progressBarTween.kill()
      const bar = contentItems[index].querySelector(
        '[data-tabs="item-progress"]'
      )
      if (!bar) return

      // In this function, you can basically do anything you want, that should happen as a tab is active
      // Maybe you have a circle filling, some other element growing, you name it.
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
      progressBarTween = gsap.to(bar, {
        scaleX: 1,
        duration: autoplayDuration / 1000,
        ease: 'power1.inOut',
        onComplete: () => {
          if (!isAnimating) {
            const nextIndex = (index + 1) % contentItems.length
            switchTab(nextIndex) // once bar is full, set next to active – this is important
          }
        },
      })
    }

    function switchTab(index) {
      if (isAnimating || contentItems[index] === activeContent) return

      isAnimating = true
      if (progressBarTween) progressBarTween.kill() // Stop any running progress bar here

      const outgoingContent = activeContent
      const outgoingVisual = animateVisuals ? activeVisual : null
      const outgoingBar = outgoingContent?.querySelector(
        '[data-tabs="item-progress"]'
      )

      const incomingContent = contentItems[index]
      const incomingVisual = animateVisuals ? visualItems[index] : visualItems[0]
      const incomingBar = incomingContent.querySelector(
        '[data-tabs="item-progress"]'
      )

      outgoingContent?.classList.remove('active')
      if (animateVisuals) outgoingVisual?.classList.remove('active')
      incomingContent.classList.add('active')
      if (animateVisuals) incomingVisual?.classList.add('active')

      const tl = gsap.timeline({
        defaults: { duration: 0.65, ease: 'power3' },
        onComplete: () => {
          activeContent = incomingContent
          if (animateVisuals) activeVisual = incomingVisual
          isAnimating = false
          if (autoplay) startProgressBar(index) // Start autoplay bar here
        },
      })

      // Wrap 'outgoing' in a check to prevent warnings on first run of the function
      // Of course, during first run (on page load), there's no 'outgoing' tab yet!
      if (outgoingContent) {
        outgoingContent.classList.remove('active')
        if (animateVisuals) outgoingVisual?.classList.remove('active')
        tl.set(outgoingBar, { transformOrigin: 'right center' })
          .to(outgoingBar, { scaleX: 0, duration: 0.3 }, 0)
        if (animateVisuals)
          tl.to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
        tl.to(
          outgoingContent.querySelector('[data-tabs="item-details"]'),
          { height: 0 },
          0
        )
      }

      incomingContent.classList.add('active')
      if (animateVisuals) incomingVisual?.classList.add('active')
      if (animateVisuals)
        tl.fromTo(
          incomingVisual,
          { autoAlpha: 0, xPercent: 3 },
          { autoAlpha: 1, xPercent: 0 },
          0.3
        )
      tl.fromTo(
          incomingContent.querySelector('[data-tabs="item-details"]'),
          { height: 0 },
          { height: 'auto' },
          0
        )
        .set(incomingBar, { scaleX: 0, transformOrigin: 'left center' }, 0)
    }

    // on page load, set first to active
    // idea: you could wrap this in a scrollTrigger
    // so it will only start once a user reaches this section
    switchTab(0)

    // switch tabs on click
    contentItems.forEach((item, i) =>
      item.addEventListener('click', () => {
        if (item === activeContent) return // ignore click if current one is already active
        switchTab(i)
      })
    )
  })
}

// Initialize Tab System with Autoplay Option
document.addEventListener('DOMContentLoaded', () => {
  initTabSystem()
})
