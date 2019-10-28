export function get(callback) {
  chrome.storage.sync.get(callback)
}

export function set(page) {
  chrome.storage.sync.set(page)
}

export function remove(time) {
  chrome.storage.sync.remove(time)
}

export function clear() {
  chrome.storage.sync.clear()
}

export function has(pages, page) {
  return Object.values(pages).map(x => x.url)
    .includes(Object.values(page)[0].url)
}

export function setUnique(page) {
  get((pages) => {
    if (!has(pages, page)) set(page)
  })
}
