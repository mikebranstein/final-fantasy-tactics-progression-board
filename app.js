/*
 * Renders the interactive party board from data.js and persists progress.
 * You should not need to edit this file to update content — edit data.js.
 *
 * Progress (which skills/classes are checked) is saved in the browser via
 * localStorage, so it survives page refreshes on the same device/browser.
 */

const STORAGE_KEY = "fft-progress-v1";
const ACTIVE_KEY = "fft-active-v1";
const HIDE_KEY = "fft-hide-done-v1";
const VIEW_KEY = "fft-view-v1";

// Checklist items are stored under synthetic character namespaces so per-character
// resets never touch them. Each checklist has its own namespace + key prefix.
const MISS_CHAR = "__missables__";

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

// Core party plus optional recruits, combined for tabs/board rendering.
const recruitList = typeof recruits === "undefined" ? [] : recruits;
const roster = party.concat(recruitList);

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

function tabButton(character) {
  const { done, total } = tileProgress(character);
  const complete = done === total ? " complete" : "";
  const recruit = character.recruit ? " tab-recruit" : "";
  const prefix = character.recruit ? "+ " : "";
  return `<button class="tab${complete}${recruit}" role="tab" data-char="${escapeAttr(character.name)}" aria-selected="false">
      ${prefix}${escapeHtml(character.name)}
      <span class="tab-progress">${done}/${total}</span>
    </button>`;
}

function renderTabs() {
  const core = party.map(tabButton).join("\n    ");
  const recs = recruitList.map(tabButton).join("\n    ");
  if (!recs) return core;
  return `${core}\n    <span class="tab-divider" aria-hidden="true">Recruits</span>\n    ${recs}`;
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

// Wraps a titled section so its body can be collapsed by clicking the header.
function collapsible(blockClass, title, sub, bodyHtml, expanded = true) {
  if (!bodyHtml) return "";
  const subHtml = sub ? ` <span class="block-sub">${sub}</span>` : "";
  return `<div class="block ${blockClass}">
      <button type="button" class="block-toggle" aria-expanded="${expanded ? "true" : "false"}">
        <span class="block-h">${title}${subHtml}</span>
        <span class="chev" aria-hidden="true">▾</span>
      </button>
      <div class="block-body">${bodyHtml}</div>
    </div>`;
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
  const sub =
    "— primary command is the job's own skillset; equip these in the other slots. Slots evolve top to bottom.";
  return collapsible("loadout-block", "Ability load-out by job", sub, rows);
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
  const sub =
    "— acquisition points are approximate; confirm exact timing in your version";
  return collapsible(
    "gear-block",
    "Special gear watchlist",
    sub,
    `<ul class="gear-list">\n        ${items}\n      </ul>`
  );
}

function renderBraveFaith(character) {
  if (!character.braveFaith) return "";
  return collapsible(
    "bf-block",
    "Brave &amp; Faith",
    "",
    `<p class="bf-text">${formatText(character.braveFaith)}</p>`
  );
}

function renderStoryWarnings(character) {
  if (!character.storyWarnings || !character.storyWarnings.length) return "";
  const items = character.storyWarnings
    .map(
      (w) => `<li class="story-item">
        <span class="story-when">${formatText(w.when)}</span>
        <span class="story-note">${formatText(w.note)}</span>
      </li>`
    )
    .join("\n        ");
  return collapsible(
    "story-block",
    "Story battles to prep for",
    "",
    `<ul class="story-list">\n        ${items}\n      </ul>`
  );
}

function renderAcquisition(character) {
  if (!character.acquisition) return "";
  return `<div class="acq-banner"><span class="acq-tag">Recruit</span><span class="acq-text">${formatText(character.acquisition)}</span></div>`;
}

function renderReplaces(character) {
  const r = character.replaces;
  if (!r) return "";
  const who = r.who
    ? `Steps into the party for <b>${escapeHtml(r.who)}</b>`
    : "Additive unit — doesn't push anyone out";
  return `<div class="replaces-line">
      <span class="replaces-slot">${formatText(r.slot)}</span>
      <span class="replaces-text">${who}. ${formatText(r.detail)}</span>
    </div>`;
}

function renderPartyTimeline() {
  if (typeof partyTimeline === "undefined") return "";
  const phases = partyTimeline
    .map((p) => {
      const lineup = p.lineup
        .map((u) => {
          const rec = u.recruit ? " tl-recruit" : "";
          return `<li class="tl-unit${rec}"><span class="tl-name">${escapeHtml(u.name)}</span><span class="tl-role">${formatText(u.role)}</span></li>`;
        })
        .join("\n          ");
      return `<div class="tl-phase">
        <div class="tl-phase-head"><span class="tl-when">${escapeHtml(p.when)}</span><h5>${escapeHtml(p.phase)}</h5></div>
        <ul class="tl-lineup">
          ${lineup}
        </ul>
        <p class="tl-change">${formatText(p.change)}</p>
      </div>`;
    })
    .join("\n      ");
  return collapsible(
    "timeline-block",
    "Party makeup over time",
    "— how your deployed five evolves as recruits arrive",
    phases,
    false
  );
}

function renderKeyBattles() {
  if (typeof keyBattles === "undefined") return "";
  const cards = keyBattles
    .map((b) => {
      const bring = (b.bring || [])
        .map((u) => `<span class="kb-unit">${formatText(u)}</span>`)
        .join("\n          ");
      return `<div class="kb-card">
        <div class="kb-head"><h5>${escapeHtml(b.name)}</h5><span class="kb-goal">${escapeHtml(b.goal)}</span></div>
        <div class="kb-bring">
          ${bring}
        </div>
        <p class="kb-note">${formatText(b.note)}</p>
      </div>`;
    })
    .join("\n      ");
  return collapsible(
    "battles-block",
    "Key battles — who to bring",
    "— fights that call for a specific unit or setup",
    cards,
    false
  );
}

const missKey = (chapter, label) => "miss:" + chapter + "|" + label;

// ---------- Generic checklists (missables, poach, treasure, shop) ----------
// Each dataset is an array of groups: { group|chapter, items:[{label, note}] }.
function checklistKey(prefix, groupName, label) {
  return prefix + groupName + "|" + label;
}

function checklistProgress(data, ns, prefix) {
  let done = 0;
  let total = 0;
  (data || []).forEach((g) => {
    (g.items || []).forEach((it) => {
      total++;
      if (isDone(ns, checklistKey(prefix, g.group || g.chapter, it.label))) done++;
    });
  });
  return { done, total };
}

// opts: { ns, prefix, blockClass, title, sub, expanded }
function renderChecklist(data, opts) {
  if (typeof data === "undefined" || !data || !data.length) return "";
  const groups = data
    .map((g) => {
      const groupName = g.group || g.chapter;
      const items = g.items
        .map((it) => {
          const key = checklistKey(opts.prefix, groupName, it.label);
          const done = isDone(opts.ns, key);
          return `<label class="chk-item${done ? " done" : ""}" data-ns="${escapeAttr(opts.ns)}" data-key="${escapeAttr(key)}">
          <input type="checkbox" class="chk-check"${done ? " checked" : ""}>
          <span class="chk-body">
            <span class="chk-label">${formatText(it.label)}</span>
            <span class="chk-note">${formatText(it.note)}</span>
          </span>
        </label>`;
        })
        .join("\n        ");
      return `<div class="chk-group">
        <h5>${escapeHtml(groupName)}</h5>
        ${items}
      </div>`;
    })
    .join("\n      ");
  const { done, total } = checklistProgress(data, opts.ns, opts.prefix);
  const title = `${opts.title} <span class="chk-count">${done}/${total}</span>`;
  return collapsible(
    opts.blockClass,
    title,
    opts.sub,
    groups,
    opts.expanded ?? false
  );
}

function renderMissables() {
  return renderChecklist(typeof missables === "undefined" ? null : missables, {
    ns: MISS_CHAR,
    prefix: "miss:",
    blockClass: "missables-block",
    title: "Missables checklist",
    sub: "— one-time steals, recruits &amp; treasures; timing varies by version, confirm in-game",
  });
}

function renderPoach() {
  return renderChecklist(typeof poach === "undefined" ? null : poach, {
    ns: "__poach__",
    prefix: "poach:",
    blockClass: "poach-block",
    title: "Rare poaching tracker",
    sub: "— Secret Hunt kills → Fur Shop gear; exact drops vary by version, confirm in-game",
  });
}

function renderTreasure() {
  return renderChecklist(typeof treasure === "undefined" ? null : treasure, {
    ns: "__treasure__",
    prefix: "treasure:",
    blockClass: "treasure-block",
    title: "Treasure Hunter map",
    sub: "— Move-Find Item panels; rare vs common depends on Brave, tiles vary by version",
  });
}

function renderShop() {
  return renderChecklist(typeof shop === "undefined" ? null : shop, {
    ns: "__shop__",
    prefix: "shop:",
    blockClass: "shop-block",
    title: "Shop &amp; Fur Shop progression",
    sub: "— no forging in FFT; gear comes from shop tiers, treasure, steals &amp; poaches",
  });
}

function renderOverview() {
  if (typeof strategy === "undefined") return "";
  const s = strategy;
  const parts = [];
  const formation = (s.formation || [])
    .map((line) => `<li>${formatText(line)}</li>`)
    .join("\n        ");
  if (formation)
    parts.push(`<h5>Formation</h5><ul class="ov-list">\n        ${formation}\n      </ul>`);
  if (s.turnOrder) parts.push(`<h5>Turn order</h5><p>${formatText(s.turnOrder)}</p>`);
  if (s.protectCasters)
    parts.push(`<h5>Protecting your casters</h5><p>${formatText(s.protectCasters)}</p>`);
  if (s.faithBrave) parts.push(`<h5>Brave &amp; Faith</h5><p>${formatText(s.faithBrave)}</p>`);
  if (s.poaching) parts.push(`<h5>Poaching gear</h5><p>${formatText(s.poaching)}</p>`);
  if (s.otherRecruits)
    parts.push(`<h5>Other recruits</h5><p>${formatText(s.otherRecruits)}</p>`);
  if (s.caveat) parts.push(`<p class="ov-caveat">${formatText(s.caveat)}</p>`);
  return collapsible(
    "overview-block",
    "Party strategy &amp; recruits",
    "— formation, Brave/Faith, poaching, optional units",
    parts.join("\n      "),
    false
  );
}

function renderCharacter(character, index) {
  const tiles = character.tiles
    .map((tile, i) => renderTile(character.name, tile, i))
    .join("\n      ");
  const notes = character.notes
    .map((note) => `<li>${formatText(note)}</li>`)
    .join("\n        ");
  const notesBlock = collapsible(
    "notes-block",
    "Notes",
    "",
    `<ul>\n        ${notes}\n      </ul>`
  );
  const recruitClass = character.recruit ? " is-recruit" : "";
  const badge = character.recruit ? `<span class="char-badge">Recruit</span>` : "";

  return `<section class="character${recruitClass}" data-char="${escapeAttr(character.name)}" role="tabpanel">
    <div class="char-head">
      <div class="char-index">${index + 1}</div>
      <div class="char-name">${escapeHtml(character.name)}${badge}</div>
      <div class="char-meta">${formatText(character.meta)}</div>
    </div>
    ${renderAcquisition(character)}
    ${renderReplaces(character)}
    <div class="path-strip">${renderPath(character.name, character.path)}</div>
    <div class="baseline-note">${formatText(character.baseline)}</div>
    <div class="char-progress">
      <div class="char-progress-track"><div class="char-progress-fill"></div></div>
      <div class="char-progress-label"></div>
    </div>
    <div class="skill-grid">
      ${tiles}
    </div>
    ${notesBlock}
    ${renderLoadouts(character)}
    ${renderGear(character)}
    ${renderBraveFaith(character)}
    ${renderStoryWarnings(character)}
    <div class="char-reset">
      <button type="button" data-reset="${escapeAttr(character.name)}">Reset ${escapeHtml(character.name)}</button>
    </div>
  </section>`;
}

// ---------- Interactivity ----------
function updateTabProgress(charName) {
  const character = roster.find((c) => c.name === charName);
  if (!character) return;
  const { done, total } = tileProgress(character);
  const tab = document.querySelector(`.tab[data-char="${cssEscape(charName)}"]`);
  if (tab) {
    tab.querySelector(".tab-progress").textContent = `${done}/${total}`;
    tab.classList.toggle("complete", done === total);
  }
}

function updateCharProgress(charName) {
  const character = roster.find((c) => c.name === charName);
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

// Recompute a checklist block's "done/total" badge from its own items.
function updateChecklistCount(block) {
  const count = block.querySelector(".chk-count");
  if (!count) return;
  const total = block.querySelectorAll(".chk-item").length;
  const done = block.querySelectorAll(".chk-item.done").length;
  count.textContent = `${done}/${total}`;
}

// Switch the top-level view (characters / guides / checklists).
function setView(view) {
  document.querySelectorAll(".view").forEach((v) => {
    v.classList.toggle("active", v.id === "view-" + view);
  });
  document.querySelectorAll(".view-tab").forEach((b) => {
    const on = b.dataset.view === view;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on ? "true" : "false");
  });
  localStorage.setItem(VIEW_KEY, view);
  if (location.hash.slice(1) !== view) {
    history.replaceState(null, "", "#" + view);
  }
  window.scrollTo(0, 0);
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

  const missEl = document.getElementById("view-checklists");
  if (missEl) {
    missEl.addEventListener("change", (e) => {
      const cb = e.target;
      if (!cb.matches(".chk-check")) return;
      const label = cb.closest("[data-key]");
      setDone(label.dataset.ns, label.dataset.key, cb.checked);
      label.classList.toggle("done", cb.checked);
      const block = cb.closest(".block");
      if (block) updateChecklistCount(block);
    });
  }

  document.querySelectorAll(".view-tab").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  const hideToggle = document.getElementById("hideDone");
  if (hideToggle) {
    hideToggle.checked = localStorage.getItem(HIDE_KEY) === "1";
    document.body.classList.toggle("hide-done", hideToggle.checked);
    hideToggle.addEventListener("change", () => {
      localStorage.setItem(HIDE_KEY, hideToggle.checked ? "1" : "0");
      document.body.classList.toggle("hide-done", hideToggle.checked);
    });
  }

  // Collapse/expand any titled section (works in the board and the overview).
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest(".block-toggle");
    if (!toggle) return;
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
  });
}

function renderBoard() {
  document.getElementById("eyebrow").textContent = site.eyebrow;
  document.getElementById("title").textContent = site.title;
  document.getElementById("subtitle").textContent = site.subtitle;
  document.getElementById("footer").textContent = site.footer;
  document.getElementById("legend").innerHTML = renderLegend();
  document.getElementById("tabs").innerHTML = renderTabs();
  const overviewEl = document.getElementById("overview");
  if (overviewEl) overviewEl.innerHTML = renderOverview();
  const timelineEl = document.getElementById("timeline");
  if (timelineEl) timelineEl.innerHTML = renderPartyTimeline();
  const battlesEl = document.getElementById("battles");
  if (battlesEl) battlesEl.innerHTML = renderKeyBattles();
  const missablesEl = document.getElementById("missables");
  if (missablesEl) missablesEl.innerHTML = renderMissables();
  const poachEl = document.getElementById("poach");
  if (poachEl) poachEl.innerHTML = renderPoach();
  const treasureEl = document.getElementById("treasure");
  if (treasureEl) treasureEl.innerHTML = renderTreasure();
  const shopEl = document.getElementById("shop");
  if (shopEl) shopEl.innerHTML = renderShop();
  document.getElementById("board").innerHTML = roster
    .map(renderCharacter)
    .join("\n\n  ");

  wireEvents();

  roster.forEach((c) => {
    updateCharProgress(c.name);
    updateNextHighlight(c.name);
  });
  updatePartyProgress();

  const initial =
    roster.some((c) => c.name === activeChar) ? activeChar : roster[0].name;
  setActive(initial);

  const validViews = ["characters", "guides", "checklists"];
  const hashView = location.hash.slice(1);
  const storedView = localStorage.getItem(VIEW_KEY);
  const startView = validViews.includes(hashView)
    ? hashView
    : validViews.includes(storedView)
      ? storedView
      : "characters";
  setView(startView);
}

document.addEventListener("DOMContentLoaded", renderBoard);

// Register the service worker for offline use (only when served over http/https).
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
