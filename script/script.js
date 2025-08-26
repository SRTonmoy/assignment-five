let coins = 100;
let heartCount = 0;
let copyCount = 0;

const el = sel => document.querySelector(sel);
const elAll = sel => Array.from(document.querySelectorAll(sel));


function updateNav() {
  el('#navCoins').textContent = coins;
  el('#navHeart').textContent = heartCount;
  el('#navCopy').textContent = `${copyCount} Copy`;
}

function exactLocalTime() {
  const now = new Date();
  return now.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
}


function init() {
  updateNav();
}

init();