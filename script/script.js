let coins = 100;
let heartCount = 0;
let copyCount = 0;

const el = sel => document.querySelector(sel);
const elAll = sel => Array.from(document.querySelectorAll(sel));

function updateNav() {
  el("#navCoins").textContent = coins;
  el("#navHeart").textContent = heartCount;
  el("#navCopy").textContent = `${copyCount} Copy`;
}

/*  pc local time */
function exactLocalTime() {
  const now = new Date();
  return now.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/* history entry  */
function addHistoryEntry(name, number, imgSrc) {
  const list = el("#historyList");
  const empty = el("#historyEmpty");
  if (empty) empty.remove();

  const li = document.createElement("li");
  li.className = "bg-emerald-50 rounded-xl p-3 flex items-start gap-3";

  const img = document.createElement("img");
  img.src = imgSrc || "assets/emergency.png";
  img.alt = name;
  img.className = "h-10 w-10 rounded-lg object-cover";

  const info = document.createElement("div");
  info.className = "flex-1";

  const title = document.createElement("div");
  title.className = "text-sm font-semibold";
  title.textContent = name;

  const numberEl = document.createElement("div");
  numberEl.className = "text-xs muted";
  numberEl.textContent = number;

  const time = document.createElement("div");
  time.className = "text-xs text-slate-500 mt-1";
  time.textContent = exactLocalTime();

  info.appendChild(title);
  info.appendChild(numberEl);
  info.appendChild(time);

  li.appendChild(img);
  li.appendChild(info);

  list.prepend(li);
}

/*  copy text*/
function copyText(text) {
  if (!text) return Promise.reject(new Error("No text"));
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (ok) resolve();
        else reject(new Error("execCommand copy failed"));
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }
}

/*  attach card events  */
function attachCardEvents() {
  const cards = elAll("#cardsGrid article");

  cards.forEach(card => {
    const heartBtn = card.querySelector(".heart-btn");
    const copyBtn = card.querySelector(".copy-btn");
    const callBtn = card.querySelector(".call-btn");
    const numberDiv = card.querySelector(".text-lg.font-extrabold");

    const nameEn =
      card.dataset.nameEn ||
      card.dataset.name ||
      card.querySelector("p")?.textContent ||
      "Service";
    const number = card.dataset.number || "";
    const img =
      card.dataset.img ||
      card.querySelector("img")?.src ||
      "assets/emergency.png";

    // Heart click
    if (heartBtn) {
      heartBtn.addEventListener("click", () => {
        heartCount += 1;
        updateNav();
      });
    }

    // Copy click
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await copyText(number);
          copyCount += 1;
          updateNav();
          alert(`Copied ${nameEn} number: ${number}`);
        } catch (err) {
          alert("Copy failed. Try selecting and copying manually.");
        }
      });
    }

    // Click on number for copies
    if (numberDiv) {
      numberDiv.style.cursor = "pointer"; 
      numberDiv.addEventListener("click", async () => {
        try {
          await copyText(number);
          copyCount += 1;
          updateNav();
          alert(`Copied ${nameEn} number: ${number}`);
        } catch (err) {
          alert("Copy failed. Try selecting and copying manually.");
        }
      });
    }

    // Call click
    if (callBtn) {
      callBtn.addEventListener("click", () => {
        if (coins < 20) {
          alert("Not enough coins to make a call. You need at least 20 coins.");
          return;
        }
        coins -= 20;
        updateNav();
        alert(`Calling ${nameEn} (${number})`);
        addHistoryEntry(nameEn, number, img);
      });
    }
  });
}

// clearhistory
el("#clearHistoryBtn").addEventListener("click", () => {
  const list = el("#historyList");
  list.innerHTML = "";
  const empty = document.createElement("li");
  empty.id = "historyEmpty";
  empty.className = "text-sm text-slate-500";
  empty.textContent = "No calls yet.";
  list.appendChild(empty);
});


function init() {
  updateNav();
  attachCardEvents();
}

init();
