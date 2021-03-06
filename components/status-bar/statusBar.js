import * as action from '../reading-list/action.js'
import * as readingList from '../reading-list/readingList.js'
import * as runtime from '../../modules/chrome/runtime.mjs'

export function setup() {
  init()
  updateCountNumber()
  changeStatusOnClick()
}

function init() {
  const documentUrl = 'https://github.com/willbchang/chrome-read-later#features'
  const feedbackUrl = 'https://github.com/willbchang/chrome-read-later/issues/new'
  $('#status-bar').append(`
     <li id="count" title="Row Number: Total Count"><span id="row">0</span>:<span id="total">0</span></li>
     <li id="history" title="Reading List History">History</li>
     <li id="document" title="${documentUrl}">
        <a href="${documentUrl}" target="_blank">Document</a>
     </li>
     <li id="feedback" title="${feedbackUrl}">
        <a href="${feedbackUrl}" target="_blank">Feedback</a>
     </li>
  `)
}

function updateCountNumber() {
  action.updateRowNumber()
  action.updateTotalNumber()
}

function changeStatusOnClick() {
  const history = $('#history')
  history.on('click', async () => {
    window.isHistoryPage = !window.isHistoryPage
    window.lastKey = ''
    window.port.disconnect()
    window.port = runtime.connect()
    await readingList.setup()
    updateCountNumber()
    window.isHistoryPage
      ? history.addClass('highlight')
      : history.removeClass('highlight')
  })
}