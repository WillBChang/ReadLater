import * as extension from '../modules-chrome/runtime.mjs'
import * as filter from './filter.js'

const reactive = li => {
  $('.active').removeClass('active')
  li.addClass('active')
}

export const open = ({target, currentTab = false, active = true}) => {
  hide(target, move)
  extension.sendMessage({url: filter.url(target), currentTab, active})
  if (currentTab) window.close()
}

export const remove = target => {
  hide(target, move)
  localStorage.setArray('dependingUrls', filter.url(target))
}

export const restore = () => {
  const url = localStorage.popArray('dependingUrls')
  $(`a[href="${url}"]`).parent().fadeIn().trigger('focus')
}

const hide = (target, move) => {
  const li = filter.li(target)
  li.fadeOut('normal', () => move(li))
}

const move = li => {
  li.attr('id') < $('#reading-list li:visible:last').attr('id') ? up(li) : down(li)
}

export const up = target => {
  $(target).prevAll(':visible:first').trigger('focus')
}

export const down = target => {
  $(target).nextAll(':visible:first').trigger('focus')
}

export const top = () => {
  $('#reading-list li:visible:first').trigger('focus')
}

export const bottom = () => {
  $('#reading-list li:visible:last').trigger('focus')
}

export const copy = async target => {
  await navigator.clipboard.writeText(filter.url(target))
}
