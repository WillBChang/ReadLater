// Use scrollBottom to calculate scrollPercent to avoid the situation:
// Scroll page to the bottom, but the percent is not 100%.
class ScrollPosition {
  constructor(scrolled) {
    this.scrolled = scrolled
  }

  get() {
    return {
      top: this.top,
      bottom: this.bottom,
      height: this.height,
    }
  }

  get top() {
    return this.scrolled.height
      ? this.dynamicTop
      : document.documentElement.scrollTop
  }

  get dynamicTop() {
    return this.scrolled.top
      / this.scrolled.height
      * this.height
  }

  get height() {
    return document.documentElement.scrollHeight
  }

  get bottom() {
    return window.scrollY + window.innerHeight
  }

  scrollPage() {
    window.scrollTo({
      top: this.top,
      behavior: 'smooth'
    })
  }
}

export function getScrollPosition() {
  // In popup.js, there is a `if` statement to check if the scrollTop is 0,
  // if it is 0, the scrollPercent won't add to popup.html.
  // Do not worry this situation: scrollTop: 0, scrollPercent: 100%
  const scrollPosition = new ScrollPosition({})
  return {
    scroll: {...scrollPosition.get()}
  }
}

export function setScrollPosition(position) {
  const scrollPosition = new ScrollPosition(position.scroll)
  scrollPosition.scrollPage()
}