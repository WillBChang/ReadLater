import '../modules_web/jquery.min.js'

export async function getHtml(url) {
  try {
    const data = await $.get(url)
    return $($.parseHTML(data))
  } catch (e) {
    return $('')
  }
}

export async function getTitle(url) {
  const html = await getHtml(url)
  return html.filter('title').text() || url
}
export async function getFavIconUrl(url) {
  const requestUrl = `https://besticon-demo.herokuapp.com/allicons.json?url=${url}`
  const {icons} = await $.get(requestUrl)
  return icons[0].url
}