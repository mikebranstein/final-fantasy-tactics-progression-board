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

function renderLoadouts(character) {
  if (!character.loadouts || !character.loadouts.length) return "";
  const rows = character.loadouts
    .map(
      (lo) => `<div class="loadout-row">
        <div class="loadout-job">${formatText(lo.job)}</div>
        <div class="loadout-slots">
          <div class="loadout-slot"><span class="loadout-tag t-action">2nd</span>${formatText(lo.secondary)}</div>
          <div class="loadout-slot"><span class="loadout-tag t-reaction">React</span>${formatText(lo.reaction)}</div>
          <div class="loadout-slot"><span class="loadout-tag t-support">Support</span>${formatText(lo.support)}</div>
          <div class="loadout-slot"><span class="loadout-tag t-movement">Move</span>${formatText(lo.movement)}</div>
        </div>
        ${lo.why ? `<div class="loadout-why">${formatText(lo.why)}</div>` : ""}
      </div>`
    )
    .join("\n      ");
  return `<div class="loadout-block">
      <h4>Ability load-out by job <span class="block-sub">— primary command is the job's own skillset; equip these in the other slots. Slots evolve top to bottom.</span></h4>
      ${rows}
    </div>`;
}

function renderGear(character) {
  if (!character.gear || !character.gear.length) return "";
  const items = character.gear
    .map(
      (g) => `<li class="gear-item">
        <span class="gear-type gear-${escapeAttr(g.type)}">${escapeHtml(g.type)}</span>
        <span class="gear-body">
          <span class="gear-name">${formatText(g.name)}</span>
          <span class="gear-when">${formatText(g.when)}</span>
          <span class="gear-note">${formatText(g.note)}</span>
        </span>
      </li>`
    )
    .join("\n        ");
  return `<div class="gear-block">
      <h4>Special gear watchlist <span class="block-sub">— acquisition points are approximate; confirm exact timing in your version</span></h4>
      <ul class="gear-list">
        ${items}
      </ul>
    </div>`;
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
    <div class="char-progress">
      <div class="char-progress-track"><div class="char-progress-fill"></div></div>
      <div class="char-progress-label"></div>
    </div>
    <div class="skill-grid">
      ${tiles}
    </div>
    <div class="notes-block">
      <h4>Notes</h4>
      <ul>
        ${notes}
      </ul>
    </div>
    ${renderLoadouts(character)}
    ${renderGear(character)}
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

function updateCharProgress(charName) {
  const character = party.find((c) => c.name === charName);
  if (!character) return;
  const { done, total } = tileProgress(character);
  const section = document.querySelector(`.character[data-char="${cssEscape(charName)}"]`);
  if (!section) return;
  const pct = total ? Math.round((done / total) * 100) : 0;
  section.querySelector(".char-progress-fill").style.width = pct + "%";
  section.querySelector(".char-progress-label").textContent = `${done}/${total} skills learned`;
}

function updatePartyProgress() {
  let done = 0;
  let total = 0;
  party.forEach((c) => {
    const p = tileProgress(c);
    done += p.done;
    total += p.total;
  });
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("partyFill").style.width = pct + "%";
  document.getElementById("partyLabel").textContent = `Party progress · ${done}/${total} skills learned`;
}

// Flag the first not-yet-learned skill for a character as the next target.
function updateNextHighlight(charName) {
  const section = document.querySelector(`.character[data-char="${cssEscape(charName)}"]`);
  if (!section) return;
  let found = false;
  section.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("next");
    const cb = tile.querySelector(".tile-check");
    if (!found && cb && !cb.checked) {
      tile.classList.add("next");
      found = true;
    }
  });
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
  if (!window.confirm(`Reset all progress for ${charName}?`)) return;
  delete state[charName];
  saveState();
  document
    .querySelectorAll(`[data-char="${cssEscape(charName)}"] input[type="checkbox"]`)
    .forEach((cb) => {
      cb.checked = false;
      cb.closest("[data-key]").classList.remove("done");
    });
  updateTabProgress(charName);
  updateCharProgress(charName);
  updatePartyProgress();
  updateNextHighlight(charName);
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
    if (cb.classList.contains("tile-check")) {
      updateTabProgress(label.dataset.char);
      updateCharProgress(label.dataset.char);
      updatePartyProgress();
      updateNextHighlight(label.dataset.char);
    }
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

  party.forEach((c) => {
    updateCharProgress(c.name);
    updateNextHighlight(c.name);
  });
  updatePartyProgress();

  const initial =
    party.some((c) => c.name === activeChar) ? activeChar : party[0].name;
  setActive(initial);
}

document.addEventListener("DOMContentLoaded", renderBoard);

// Register the service worker for offline use (only when served over http/https).
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
