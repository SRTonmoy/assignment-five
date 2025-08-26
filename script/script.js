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


function init() {
  updateNav();
}

init();