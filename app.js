/*
 * Renders the party progression board from data.js into the page.
 * You should not need to edit this file to update content — edit data.js.
 */

// Escape HTML so author text can never inject markup.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Escape, then turn **bold** into <b>bold</b>.
function formatText(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

function renderLegend() {
  return Object.entries(types)
    .map(
      ([key, label]) =>
        `<span><span class="dot t-${key}"></span>${escapeHtml(label)}</span>`
    )
    .join("\n    ");
}

function renderPath(path) {
  return path
    .map((node) => {
      const cls = node.now ? "path-node now" : "path-node";
      return `<span class="${cls}">${escapeHtml(node.label)}</span>`;
    })
    .join('<span class="path-arrow">→</span>');
}

function renderTile(tile, index) {
  const order = String(index + 1).padStart(2, "0");
  return `<div class="tile">
        <div class="tile-top">
          <span class="tile-order">${order}</span>
          <span class="tile-type-dot t-${tile.type}"></span>
        </div>
        <div class="tile-job">${escapeHtml(tile.job)}</div>
        <div class="tile-skill">${escapeHtml(tile.skill)}</div>
        <div class="tile-note">${escapeHtml(tile.note)}</div>
      </div>`;
}

function renderCharacter(character, index) {
  const tiles = character.tiles.map(renderTile).join("\n      ");
  const notes = character.notes
    .map((note) => `<li>${formatText(note)}</li>`)
    .join("\n        ");

  return `<section class="character">
    <div class="char-head">
      <div class="char-index">${index + 1}</div>
      <div class="char-name">${escapeHtml(character.name)}</div>
      <div class="char-meta">${formatText(character.meta)}</div>
    </div>
    <div class="path-strip">${renderPath(character.path)}</div>
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
  </section>`;
}

function renderBoard() {
  document.getElementById("eyebrow").textContent = site.eyebrow;
  document.getElementById("title").textContent = site.title;
  document.getElementById("subtitle").textContent = site.subtitle;
  document.getElementById("footer").textContent = site.footer;
  document.getElementById("legend").innerHTML = renderLegend();
  document.getElementById("board").innerHTML = party.map(renderCharacter).join("\n\n  ");
}

document.addEventListener("DOMContentLoaded", renderBoard);
