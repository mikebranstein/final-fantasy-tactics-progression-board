# Final Fantasy Tactics — Party Progression Board

A single-page, offline-capable tracker for planning your party's **job and skill progression** in *Final Fantasy Tactics: The Ivalice Chronicles* (PS5). Tick off abilities as you learn them, plan each character's build order, and see how your deployed five evolves as recruits join.

### ▶ Live site: **[mikebranstein.github.io/final-fantasy-tactics-progression-board](https://mikebranstein.github.io/final-fantasy-tactics-progression-board/)**

It's a Progressive Web App, so you can also add it to your phone's home screen and use it offline.

---

## Features

- **Per-character progression grids** — each character has an ordered list of abilities to learn (read left-to-right, top-to-bottom) that pushes toward a build-defining endgame job.
- **Checklists that stick** — check off learned skills and completed job-path steps; progress is saved to your browser's `localStorage`, with per-character and whole-party progress bars.
- **Core party + recruits** — tabs for the main five plus optional special units (Agrias, Mustadio, Orlandeau, Beowulf, Reis, Construct 8, Cloud), each with acquisition timing and their own progression.
- **Build guidance** — collapsible sections per character for ability load-outs by job, special gear to watch for, Brave/Faith advice, and story battles to prep for.
- **Party planning panels** — a strategy overview, a **party makeup over time** timeline (how your deployed five changes each chapter), and a **key battles** list of fights that call for a specific unit or setup.
- **Offline-first PWA** — a service worker caches the app so it works with no connection; installable to the home screen.
- **No build step, no tracking** — plain HTML/CSS/JavaScript, everything stored locally.

## Usage

1. Open the [live site](https://mikebranstein.github.io/final-fantasy-tactics-progression-board/).
2. Pick a character tab and work down their grid, checking each ability as you learn it in-game.
3. Expand the collapsible sections (Notes, Load-outs, Gear, Brave & Faith, Story battles) for deeper build advice.
4. Use the top-level panels to plan formation, track how the party shifts as recruits arrive, and prep for key fights.
5. Your progress is remembered on that device/browser. Each character has a **Reset** button to clear just that character.

> Progress lives in your browser only — clearing site data or switching devices/browsers starts you fresh.

## Editing the content

All board content lives in [`data.js`](data.js) — you almost never need to touch anything else:

| Structure | What it controls |
| --- | --- |
| `site` | Page title, subtitle, and footer text. |
| `types` | Legend labels for skill types (`action`, `support`, `reaction`, `movement`). |
| `party` | The core characters: job path, baseline, skill `tiles`, notes, load-outs, gear, Brave/Faith, story warnings. |
| `strategy` | The top-level strategy overview panel. |
| `partyTimeline` | The "party makeup over time" panel. |
| `keyBattles` | The "key battles — who to bring" panel. |
| `recruits` | Optional special units, rendered as extra tabs. |

Text fields support `**bold**` with double asterisks. All values are treated as plain text and HTML is escaped when rendered.

After changing any cached asset, bump the `CACHE` constant in [`sw.js`](sw.js) (e.g. `fft-board-v2` → `fft-board-v3`) so returning visitors receive the update instead of a stale cached copy.

## Running locally

Because it uses a service worker, open it over HTTP rather than the `file://` protocol:

```powershell
# from the project folder — any static server works
python -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html              # markup + section containers
styles.css              # all styling
app.js                  # rendering, checklist state, localStorage persistence
data.js                 # single source of truth for all board content
sw.js                   # service worker (offline cache)
manifest.webmanifest    # PWA metadata
icon-*.png              # app icons
```

## Tech

Vanilla HTML, CSS, and JavaScript — no framework, no bundler, no dependencies. Hosted on GitHub Pages.

## Disclaimer

This is a fan-made planning aid and is not affiliated with or endorsed by Square Enix. Job/skill ordering is prioritized over exact JP costs, which can shift slightly by patch. Some recruit timings and ability names come from general *Final Fantasy Tactics* / *War of the Lions* knowledge and are flagged in-app where they haven't been individually verified against *The Ivalice Chronicles* — always confirm details in-game.

## License

Released under the [Apache License 2.0](LICENSE).