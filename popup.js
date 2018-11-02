const get =  function getChromeStorage(add) {
  chrome.storage.sync.get(data => {
    for (const time in data) {
      add(data[time].url, data[time].title, data[time].favIconUrl, time);
    }
  });
};

const set = function setReadingListToPopup(url, title, favIconUrl, time) {
  const ul = document.getElementById('reading-list');
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  img.src = favIconUrl;
  a.href = url;
  a.innerText = title;
  a.target = '_blank';
  li.id = time;

  li.appendChild(img);
  li.appendChild(a);
  ul.appendChild(li);
};

const open = function openURLForLocalAccess(href) {
  chrome.tabs.create({url: href});
};

const clear = function clearChromeStorageAndReadingList() {
  chrome.storage.sync.clear();
  document.getElementById('reading-list').innerHTML = '';
};

const remove = function removeFromChromeStorage(time) {
  chrome.storage.sync.remove(time);
};

const play = function playAudio() {
  const audio = new Audio('audio.mp3');
  audio.play();
};

document.addEventListener('DOMContentLoaded', () => {
  get(set);

  document.getElementById('reading-list').addEventListener('click', e => {
    const tag = e.target.tagName;
    if (tag !== 'A') return;

    const href = e.target.href;
    const time = e.target.parentNode.id;

    if (href.includes('chrome://') || href.includes('file://')) {
      open(href);
    }

    remove(time);
  });

  document.getElementById('clear').addEventListener('click', () => {
    clear();
    play();
  });
}, false);
