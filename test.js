// Get Webflow locale from the <html> tag
const locale = document.documentElement.getAttribute('data-wf-locale') || 'nl' // Fallback to 'nl'

setTimeout(() => {
  // Init Chathive and set language
  Chathive.widget.init({ apiKey: 'YyXkHMHwajGaYdrRGkyn2QCd', language: locale })

  // Optional: Open widget via custom button
  const openButton = document.querySelector('#open-chathive')
  if (openButton) {
    openButton.addEventListener('click', () => {
      Chathive.widget.open()
    })
  }

  console.log(Chathive.widget.getCurrentLanguage())
}, 800)

// NEW
window.onload = function () {
  var languageMap = {
    nl_BE: 'nl',
    en: 'en',
    fr_BE: 'fr',
  }

  var odooLanguageCode = document.querySelector('.js_change_lang.active')
    ? document
        .querySelector('.js_change_lang.active')
        .getAttribute('data-url_code')
    : null

  var isoLanguageCode = languageMap[odooLanguageCode] || 'en'

  Chathive.widget.init({
    apiKey: 'YyXkHMHwajGaYdrRGkyn2QCd',
    language: isoLanguageCode,
  })
}
