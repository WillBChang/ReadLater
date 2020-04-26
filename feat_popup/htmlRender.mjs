export function renderListFrom(page) {
  return ` 
      <li id=${page.date} title="${encodeTitle()}\n\n${page.url}" tabindex="1">
        <img src="${page.favIconUrl}" alt="">
        <a href="${page.url}" ${getTitleColor()} tabindex="-1">${encodeTitle()}</a>
        ${getScrollPercent()}
      </li>
    `

  function getTitleColor() {
    return page.url === page.title ? 'style="color: gray"' : ''
  }

  function encodeTitle() {
    // eslint-disable-next-line no-undef
    return he.encode(page.title)
  }

  function getScrollPercent() {
    return page.scroll.top
      ? `<span class="position">${page.scroll.percent}</span>`
      : ''
  }
}
