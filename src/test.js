function resetWebflow(data) {
  let parser = new DOMParser()
  let dom = parser.parseFromString(data.next.html, 'text/html')
  let webflowPageId = dom.querySelector('html').getAttribute('data-wf-page')
  document.querySelector('html').setAttribute('data-wf-page', webflowPageId)

  window.Webflow && window.Webflow.destroy()
  window.Webflow && window.Webflow.ready()

  // Reinitialize Webflow forms
  if (window.Webflow && window.Webflow.require) {
    const formsModule = window.Webflow.require('forms')
    if (formsModule) {
      formsModule.ready()
      formsModule.destroy()
      formsModule.ready()
    }
  }

  document.querySelectorAll('a[aria-current="page"]').forEach((el) => {
    el.removeAttribute('aria-current')
  })
  document.querySelectorAll('a.w--current').forEach((el) => {
    el.classList.remove('w--current')
  })

  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href')
    if (href === window.location.pathname) {
      link.classList.add('w--current')
      link.setAttribute('aria-current', 'page')
    }
  })
}
