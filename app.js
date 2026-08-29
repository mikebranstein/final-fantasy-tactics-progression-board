/*
 * Renders the interactive party board from data.js and persists progress.
 * You should not need to edit this file to update content — edit data.js.
 *
 * Progress (which skills/classes are checked) is saved in the browser via
 * localStorage, so it survives page refreshes on the same device/browser.
 */

const STORAGE_KEY = "fft-progress-v1";
const ACTIVE_KEY = "fft-active-v1";

// ---------- Persistence ----------
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
let state = loadState();
let activeChar = localStorage.getItem(ACTIVE_KEY);

const tileKey = (skill) => "tile:" + skill;
const pathKey = (label) => "path:" + label;

function isDone(charName, key) {
  return !!(state[charName] && state[charName][key]);
}
function setDone(charName, key, value) {
  if (!state[charName]) state[charName] = {};
  if (value) state[charName][key] = true;
  else delete state[charName][key];
  saveState();
}

// ---------- Escaping ----------
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function escapeAttr(text) {
  return escapeHtml(text).replace(/"/g, "&quot;");
}
function formatText(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

// ---------- Progress helpers ----------
function tileProgress(character) {
  const total = character.tiles.length;
  const done = character.tiles.reduce(
    (n, t) => n + (isDone(character.name, tileKey(t.skill)) ? 1 : 0),
    0
  );
  return { done, total };
}

// ---------- Rendering ----------
function renderLegend() {
  return Object.entries(types)
    .map(
      ([key, label]) =>
        `<span><span class="dot t-${key}"></span>${escapeHtml(label)}</span>`
    )
    .join("\n    ");
}

function renderTabs() {
  return party
    .map((character) => {
      const { done, total } = tileProgress(character);
      const complete = done === total ? " complete" : "";
      return `<button class="tab${complete}" role="tab" data-char="${escapeAttr(character.name)}" aria-selected="false">
      ${escapeHtml(character.name)}
      <span class="tab-progress">${done}/${total}</span>
    </button>`;
    })
    .join("\n    ");
}

function renderPath(charName, path) {
  return path
    .map((node) => {
      const done = isDone(charName, pathKey(node.label));
      const cls =
        "path-node" + (node.now ? " now" : "") + (done ? " done" : "");
      return `<label class="${cls}" data-char="${escapeAttr(charName)}" data-key="${escapeAttr(pathKey(node.label))}"><input type="checkbox" class="path-check"${done ? " checked" : ""}>${escapeHtml(node.label)}</label>`;
    })
    .join('<span class="path-arrow">→</span>');
}

function renderTile(charName, tile, index) {
  const order = String(index + 1).padStart(2, "0");
  const done = isDone(charName, tileKey(tile.skill));
  return `<label class="tile${done ? " done" : ""}" data-char="${escapeAttr(charName)}" data-key="${escapeAttr(tileKey(tile.skill))}">
        <div class="tile-top">
          <span class="tile-order">${order}</span>
          <span class="tile-top-right">
            <span class="tile-type-dot t-${tile.type}"></span>
            <input type="checkbox" class="tile-check"${done ? " checked" : ""}>
          </span>
        </div>
        <div class="tile-job">${escapeHtml(tile.job)}</div>
        <div class="tile-skill">${escapeHtml(tile.skill)}</div>
        <div class="tile-note">${escapeHtml(tile.note)}</div>
      </label>`;
}

function renderCharacter(character, index) {
  const tiles = character.tiles
    .map((tile, i) => renderTile(character.name, tile, i))
    .join("\n      ");
  const notes = character.notes
    .map((note) => `<li>${formatText(note)}</li>`)
    .join("\n        ");

  return `<section class="character" data-char="${escapeAttr(character.name)}" role="tabpanel">
    <div class="char-head">
      <div class="char-index">${index + 1}</div>
      <div class="char-name">${escapeHtml(character.name)}</div>
      <div class="char-meta">${formatText(character.meta)}</div>
    </div>
    <div class="path-strip">${renderPath(character.name, character.path)}</div>
    <div class="baseline-note">${formatText(character.baseline)}</div>
    <div class="skill-grid">
      ${tiles}
    </div>
    <div class="notes-block">
      <h4>Notes</h4>
      <ul>
        ${notes}
      </ul>
    </div>
    <div class="char-reset">
      <button type="button" data-reset="${escapeAttr(character.name)}">Reset ${escapeHtml(character.name)}</button>
    </div>
  </section>`;
}

// ---------- Interactivity ----------
function updateTabProgress(charName) {
  const character = party.find((c) => c.name === charName);
  if (!character) return;
  const { done, total } = tileProgress(character);
  const tab = document.querySelector(`.tab[data-char="${cssEscape(charName)}"]`);
  if (tab) {
    tab.querySelector(".tab-progress").textContent = `${done}/${total}`;
    tab.classList.toggle("complete", done === total);
  }
}

function setActive(charName) {
  activeChar = charName;
  localStorage.setItem(ACTIVE_KEY, charName);
  document.querySelectorAll(".character").forEach((section) => {
    section.classList.toggle("active", section.dataset.char === charName);
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    const on = tab.dataset.char === charName;
    tab.classList.toggle("active", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });
  window.scrollTo(0, 0);
}

function resetCharacter(charName) {
  delete state[charName];
  saveState();
  document
    .querySelectorAll(`[data-char="${cssEscape(charName)}"] input[type="checkbox"]`)
    .forEach((cb) => {
      cb.checked = false;
      cb.closest("[data-key]").classList.remove("done");
    });
  updateTabProgress(charName);
}

// Minimal CSS.escape fallback for attribute selectors.
function cssEscape(value) {
  return window.CSS && CSS.escape ? CSS.escape(value) : value.replace(/"/g, '\\"');
}

function wireEvents() {
  document.getElementById("tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (tab) setActive(tab.dataset.char);
  });

  const board = document.getElementById("board");

  board.addEventListener("change", (e) => {
    const cb = e.target;
    if (!cb.matches(".tile-check, .path-check")) return;
    const label = cb.closest("[data-key]");
    setDone(label.dataset.char, label.dataset.key, cb.checked);
    label.classList.toggle("done", cb.checked);
    if (cb.classList.contains("tile-check")) updateTabProgress(label.dataset.char);
  });

  board.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reset]");
    if (btn) resetCharacter(btn.dataset.reset);
  });
}

function renderBoard() {
  document.getElementById("eyebrow").textContent = site.eyebrow;
  document.getElementById("title").textContent = site.title;
  document.getElementById("subtitle").textContent = site.subtitle;
  document.getElementById("footer").textContent = site.footer;
  document.getElementById("legend").innerHTML = renderLegend();
  document.getElementById("tabs").innerHTML = renderTabs();
  document.getElementById("board").innerHTML = party
    .map(renderCharacter)
    .join("\n\n  ");

  wireEvents();

  const initial =
    party.some((c) => c.name === activeChar) ? activeChar : party[0].name;
  setActive(initial);
}

document.addEventListener("DOMContentLoaded", renderBoard);
