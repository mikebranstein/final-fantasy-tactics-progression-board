/*
 * Party progression content — this is the single source of truth for the board.
 *
 * To update the site you almost always only need to edit THIS file:
 *   - Add/remove/reorder a character  -> edit the `party` array.
 *   - Change a character's job path    -> edit its `path` array (mark current with now:true).
 *   - Add/edit a skill                 -> edit its `tiles` array (order numbers are automatic).
 *   - Change notes                     -> edit its `notes` array.
 *
 * Text fields support **bold** using double asterisks. All values are treated
 * as plain text and HTML is escaped when rendered.
 *
 * Valid tile `type` values: "action" | "support" | "reaction" | "movement".
 */

const site = {
  eyebrow: "Final Fantasy Tactics — The Ivalice Chronicles",
  title: "Party Progression Board",
  subtitle:
    "Current roster around levels 5–6. Each grid below is the skill learning order for the next ~10 levels — read tiles left to right, top to bottom. Later tiles push toward each character's build-defining endgame job. Ability names follow The Ivalice Chronicles (PS5) — e.g. Rend (not Break), Dual Wield (not Two Swords), Arithmeticks (not Calculation), Thunder/Blizzard (not Bolt/Ice).",
  footer:
    "Ivalice Chronicles — party plan · job/skill order prioritized over exact JP costs, which shift slightly by patch",
};

// Skill type -> legend label. Colors live in styles.css as .t-<type>.
const types = {
  action: "Action",
  support: "Support",
  reaction: "Reaction",
  movement: "Movement",
};

const party = [
  {
    name: "Ramza",
    meta: "Squire → Knight → Monk → **Samurai** (endgame, via a Thief Lv.4 → Dragoon Lv.2 gate) · Level 6",
    path: [
      { label: "Squire (Lv.2 → Knight)" },
      { label: "Knight → Lv.4", now: true },
      { label: "Monk → Lv.5" },
      { label: "Archer → Lv.3 (Thief gate)" },
      { label: "Thief → Lv.4 (Dragoon gate)" },
      { label: "Dragoon → Lv.2 (Samurai gate)" },
      { label: "Samurai (endgame)" },
    ],
    baseline: "**Baseline assumed:** Move +1 and JP Boost already learned on Squire.",
    tiles: [
      { type: "action", job: "Knight", skill: "Rend Weapon", note: "Destroys enemy weapon — best all-around Break skill" },
      { type: "action", job: "Knight", skill: "Rend Armor", note: "Lowers enemy defense — pairs with Rend Weapon" },
      { type: "support", job: "Knight", skill: "Equip Armor", note: "Lets him wear heavier armor for survivability" },
      { type: "action", job: "Knight", skill: "Rend Helm", note: "Strips enemy headgear bonuses" },
      { type: "action", job: "Knight", skill: "Rend Shield", note: "Good vs. high-evasion tanky units" },
      { type: "support", job: "Knight", skill: "Equip Shield", note: "Shield use alongside one-handed weapons" },
      { type: "action", job: "Knight", skill: "Rend MP", note: "Strips MP from casters — shuts down mages" },
      { type: "action", job: "Knight", skill: "Rend Speed", note: "Cripples a fast/dangerous enemy's turns" },
      { type: "action", job: "Knight", skill: "Rend Power", note: "Lowers enemy physical attack" },
      { type: "action", job: "Item (secondary)", skill: "Phoenix Down", note: "Equip Item as secondary — self-sustain the party" },
      { type: "action", job: "Monk", skill: "Chakra", note: "Bridge job — restores HP/MP to self and adjacent allies with no MP cost" },
      { type: "reaction", job: "Monk", skill: "Counter", note: "Signature reaction — strikes back when hit; keep equipped into endgame" },
      { type: "support", job: "Monk", skill: "Brawler", note: "TIC unarmed-damage passive (the skillset is Martial Arts, the support ability is Brawler) — banks Monk JP" },
      { type: "action", job: "Thief", skill: "Steal Heart", note: "Cheap, no-weapon Thief command that charms an enemy (TIC: Steal Heart, 150 JP) — handy CC to grab while you grind Thief toward Lv.4, the confirmed Dragoon unlock." },
      { type: "action", job: "Thief", skill: "Steal Weapon", note: "Disarms a dangerous enemy (TIC: Steal Weapon, 600 JP) — a useful optional pickup during the Thief pass; his lasting keeper here is Move +2 (see his movement tile)." },
      { type: "action", job: "Dragoon", skill: "Horizontal Jump 2", note: "Cheapest Jump-range upgrade (TIC: Horizontal Jump 2, 150 JP — there is no ability literally named 'Level Jump'); extends his Jump reach and banks JP toward Dragoon (Lancer) Lv.2, the Samurai gate. Jump needs no weapon, so it's a handy ranged poke." },
      { type: "support", job: "Dragoon", skill: "Equip Polearms", note: "Optional Dragoon support (TIC name for Equip Spears) that lets other jobs wield polearms — NOT core to his Magick-Attack Iaido build; grab it only for the option while clearing the Lv.2 gate." },
      { type: "action", job: "Samurai", skill: "Iaido: Ashura", note: "First Iaido technique — Iaido damage scales with Magick Attack; a katana only needs to be in his inventory" },
      { type: "action", job: "Samurai", skill: "Iaido: Kiku-ichimonji", note: "Range-4 line-piercing Iaido — hits multiple enemies in a row; his signature damage" },
      { type: "action", job: "Samurai", skill: "Iaido: Masamune", note: "Grants Regen + Haste to nearby allies — top support Iaido" },
      { type: "action", job: "Samurai", skill: "Iaido: Chirijiraden", note: "Highest-damage Iaido (about 30x Magick Attack) — his ultimate nuke once JP allows" },
      { type: "reaction", job: "Samurai", skill: "Shirahadori", note: "TIC name for Blade Grasp — chance to negate physical attacks entirely; premier endgame reaction" },
      { type: "support", job: "Black Mage", skill: "Magick Boost", note: "Iaido damage scales with Magick Attack, so a short Black Mage detour for Magick Boost raises his Samurai damage more than raw strength" },
      { type: "movement", job: "Thief / Time Mage", skill: "Move +2 / Teleport", note: "He already visits Thief for the Dragoon gate (Thief Lv.4), so Move +2 is a free keeper (Move +3 is Bard-only); Time Mage grants Teleport — the more practical pickup" },
    ],
    notes: [
      "**Job-level gates:** Knight → Lv.3 unlocks Monk; keep Knight to Lv.4 for Samurai. Monk → Lv.5. The Dragoon branch is a chain — **Archer Lv.3** opens Thief, **Thief Lv.4** opens Dragoon (Lancer), then grind Dragoon to Lv.2; Samurai finally unlocks at Knight Lv.4 + Monk Lv.5 + Dragoon Lv.2 — don't leave a job until you hit its target level.",
      "**The Archer → Thief → Dragoon gate:** Samurai needs Dragoon (Lancer) Lv.2, Dragoon unlocks at **Thief Lv.4**, and Thief unlocks at **Archer Lv.3** (all confirmed) — so budget a real detour: Archer to Lv.3, Thief to Lv.4, then grind Dragoon to Lv.2. It's only a little JP: in Archer optionally grab **Concentration** (guarantees hits, and later boosts his Steal rate); in Thief bank **Move +2** (a permanent keeper) and optionally **Steal Heart**; in Dragoon pick up **Horizontal Jump 2** (cheap, needs no weapon) and optionally **Equip Polearms**. None of it feeds his Iaido endgame — it's purely to open Samurai, so don't over-invest.",
      "Secondary skillset: keep Item equipped until magic cross-skills are further along elsewhere.",
      "Reaction: start banking JP toward Counter once available.",
      "Rend Accessory and Rend Mind/Magic are lowest priority — save for later.",
      "**Endgame identity:** Samurai Iaido is his signature damage — the katana is consumed from his inventory (not equipped), so carry his strongest katana at all times.",
      "Sequencing: Monk first (Counter + Chakra + Brawler) as a bridge, then Samurai for Iaido.",
      "Iaido damage scales with **Magick Attack**, not weapon power — pair it with Black Mage's **Magick Boost** support for bigger techniques.",
      "Movement: Teleport (Time Mage) is the practical pickup — Move +3 isn't available to him (it's Bard-only), so Thief's Move +2 is the physical alternative.",
    ],
    loadouts: [
      { job: "Knight (early, Ch.1–2)", secondary: "Item (use Phoenix Down / Potions on the party)", reaction: "None yet — he learns Counter later, as a Monk", support: "JP Boost — helps him learn his Rend skills faster", movement: "Move +1", why: "A tough frontliner while you build up his Rend skills. Knights already wear heavy armour and carry shields on their own, so equipping Equip Armor would be wasted — use the support slot on JP Boost instead." },
      { job: "Monk (bridge)", secondary: "Rend skills (kept from Knight) or Item", reaction: "Counter — the Monk reaction that hits back whenever he is physically attacked", support: "Brawler — raises his unarmed (Martial Arts) damage while he is a Monk", movement: "Move +1", why: "A short stop as a Monk to learn Counter and Chakra. Keep Counter equipped for the rest of the game." },
      { job: "Archer (Lv.3 gate)", secondary: "Rend skills (kept from Knight) or Item", reaction: "Counter — kept from Monk", support: "JP Boost — the fastest way to Archer Lv.3, which unlocks Thief; grab Concentration here if you want a lasting hit-rate boost", movement: "Move +1", why: "A quick pass purely to reach Archer Lv.3 and open Thief — the first step of the Dragoon → Samurai gate. Concentration (guarantees physical hits, and later boosts his Steal rate as a Thief) is the one worthwhile keeper here; otherwise just bank the levels and move on." },
      { job: "Thief (Lv.4 gate)", secondary: "Rend skills (kept from Knight) or Item — his own command here is Steal", reaction: "Counter — kept from Monk so he still punishes attackers", support: "JP Boost — the fastest way to reach Thief Lv.4, the confirmed Dragoon unlock", movement: "Move +1 → learn Move +2 here and keep it for good", why: "Thief Lv.4 is the confirmed unlock for Dragoon, so this is the first half of the Samurai gate. Grab Move +2 while you're here — it's the one Thief pickup that stays useful on his endgame Samurai — then move into Dragoon. Steal Heart is a nice optional CC, but don't over-invest; this pass is just for the gate." },
      { job: "Dragoon (Lv.2 gate)", secondary: "Rend skills (kept from Knight) or Item — his own command here is Jump", reaction: "Counter — kept from Monk so he still punishes attackers", support: "JP Boost — the fastest way through the gate; swap to Equip Polearms only if you want a spear on him", movement: "Move +1", why: "A brief pass purely to reach Dragoon (Lancer) Lv.2 and open Samurai. Give him a familiar secondary and Counter so he stays useful while you bank the JP — this isn't a combat identity, so don't over-equip it." },
      { job: "Samurai (endgame)", secondary: "Rend skills (kept from Knight) or Item", reaction: "Shirahadori — negates many physical hits; or fall back to Counter", support: "Magick Boost — Iaido scales with Magick Attack, so this adds more damage than raw strength", movement: "Move +2 (from Thief) or Teleport (from Time Mage)", why: "Keep his strongest katana in his inventory — Iaido consumes a katana from there, not the weapon he has equipped." },
    ],
    gear: [
      { name: "Blood Sword", type: "weapon", when: "Ch.1 — steal from Gaffgarion", note: "Drains HP equal to damage dealt — big early survivability." },
      { name: "Save the Queen", type: "weapon", when: "Ch.4 — Beowulf sidequest", note: "Knight's sword that grants permanent Protect." },
      { name: "Ragnarok / Excalibur", type: "weapon", when: "Ch.4", note: "Top knight's swords; Excalibur grants permanent Haste (needs Equip Sword on a Samurai)." },
      { name: "Masamune", type: "weapon", when: "Ch.3–4 (poach/treasure)", note: "Best all-round katana — also a strong Draw Out (Regen + Haste)." },
      { name: "Chirijiraden", type: "weapon", when: "Ch.4 — Nelveska Temple", note: "The ultimate katana and his biggest Iaido nuke." },
      { name: "Genji set (Armor/Helm/Shield)", type: "armor", when: "Ch.4 — steal from Elmdore", note: "Elmdore has Safeguard — strip it first; top-tier heavy gear." },
      { name: "Grand Helm / Maximillian", type: "armor", when: "late game shops/treasure", note: "Best helm and heavy body armor for a frontline Samurai." },
      { name: "Sprint Shoes", type: "accessory", when: "mid game", note: "+1 Speed = more Iaido turns." },
    ],
    braveFaith: "**Keep Brave high.** Ramza is your physical anchor, and his best endgame reaction — **Shirahadori** (Blade Grasp) — triggers more often the higher his Brave, which also raises physical damage. His Faith can sit in the middle; he doesn't lean on magick.",
    storyWarnings: [
      { when: "End of Ch.3 — Riovanes Castle (the Wiegraf duel)", note: "Ramza fights Wiegraf, then the demon Velius, **completely alone**. Before you enter, make sure he can survive solo: a strong weapon, heavy armour, a self-heal (Auto-Potion or Item), and Counter. Don't build the fight around your healers — they aren't there." },
      { when: "Ch.3 — Riovanes rooftop", note: "Right after the duel, the assassins Celia and Lettie can inflict Death, Stop and other nasty status. Bring status protection and burst them down quickly." },
      { when: "Ch.1 — vs Gaffgarion", note: "You can **steal the Blood Sword** from Gaffgarion here — a big early survivability boost, since it drains HP with every hit." },
    ],
  },
  {
    name: "Orrick",
    meta: "Squire → Chemist → **White Mage** (full tree) → Time Magic · Level 5",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Chemist → Lv.2" },
      { label: "White Mage (full tree)", now: true },
      { label: "Black Mage → Lv.3 (gate)" },
      { label: "Time Mage (secondary)" },
    ],
    baseline: "**Baseline assumed:** Move +1 and JP Boost — finish these before switching off Squire.",
    tiles: [
      { type: "movement", job: "Squire", skill: "Move +1", note: "Finish if not already learned" },
      { type: "support", job: "Squire", skill: "JP Boost", note: "Finish if not already learned" },
      { type: "reaction", job: "Chemist", skill: "Auto-Potion", note: "Free self-heal — worth a short detour first" },
      { type: "action", job: "Chemist", skill: "Phoenix Down", note: "Backup revive independent of MP" },
      { type: "action", job: "White Mage", skill: "Cure", note: "Top priority the moment White Mage unlocks" },
      { type: "action", job: "White Mage", skill: "Raise", note: "Revive without spending items" },
      { type: "action", job: "White Mage", skill: "Cura", note: "Upgraded heal once JP allows" },
      { type: "action", job: "White Mage", skill: "Protect", note: "Cheap, high-value physical damage reduction" },
      { type: "action", job: "White Mage", skill: "Shell", note: "Reduces magic damage taken" },
      { type: "action", job: "White Mage", skill: "Wall", note: "Applies Protect + Shell together in a single cast — efficient party buffing" },
      { type: "action", job: "White Mage", skill: "Esuna", note: "Status cleanup — important once enemies inflict ailments" },
      { type: "action", job: "White Mage", skill: "Curaga", note: "Strong/group heal tier — endgame healing backbone" },
      { type: "action", job: "White Mage", skill: "Curaja", note: "Top-tier heal — completes the Cure line for a full White Mage tree" },
      { type: "action", job: "White Mage", skill: "Arise", note: "Second-tier Raise — revives with full HP" },
      { type: "action", job: "White Mage", skill: "Reraise", note: "Pre-casts auto-revive on an ally — huge survivability" },
      { type: "action", job: "White Mage", skill: "Regen", note: "Sustained per-turn healing that frees up his actions" },
      { type: "action", job: "White Mage", skill: "Holy", note: "White Mage's nuke (56 MP) — optional offense once heals are locked in" },
      { type: "action", job: "Time Mage", skill: "Haste (secondary)", note: "Layer Time Magic for self-sufficiency — Haste himself and allies" },
      { type: "support", job: "Black Mage", skill: "Magick Boost", note: "+33% Magick Attack — also raises his healing, since Cure scales with Magick Attack; reachable on his Black Mage Lv.3 detour" },
      { type: "reaction", job: "White Mage", skill: "Regenerate", note: "White Mage reaction — applies Regen when he takes damage; strong self-sustain" },
      { type: "movement", job: "Time Mage", skill: "Teleport", note: "Reachable via Time Mage — ignores terrain to reposition; otherwise fall back to Move +2 (Thief)" },
    ],
    notes: [
      "**Job-level gates:** White Mage has no level gate — build its tree freely. But Time Mage is NOT reached via White Mage; it unlocks from Black Mage Lv.3, so run a short Black Mage → Lv.3 detour first (that's also what makes Teleport reachable).",
      "Secondary skillset: Item, so he can throw Potions/Phoenix Downs even if Silenced.",
      "Primary healer — prioritize his JP over most others until Cure/Raise are locked in.",
      "**Endgame core:** finish White Mage — Curaga/Curaja, Wall, Arise, Reraise, Regen — before spreading JP into Time Magic.",
      "Time Magic is a secondary layer for self-Haste and, ideally, Teleport movement.",
      "In TIC his best sustain reaction is **Regenerate** (White Mage); add **Magick Defense Boost** (White Mage support) if you want extra durability on your healer.",
    ],
    loadouts: [
      { job: "Chemist (early)", secondary: "—", reaction: "Auto-Potion — automatically drinks a Potion when he takes damage", support: "JP Boost — helps him learn White Magic faster", movement: "Move +1", why: "A brief stop as a Chemist to pick up Auto-Potion before White Mage opens up." },
      { job: "White Mage (core)", secondary: "Item (throw Potions / Phoenix Down if he is Silenced)", reaction: "Regenerate — applies Regen to him when he is hit", support: "Magick Boost — raises his healing, since his Cure line scales with Magick Attack", movement: "Move +1, then Teleport once he has it", why: "Your main healer. Item is the fail-safe so he can still revive people if Silence shuts off his spells." },
      { job: "White Mage + Time Magic (endgame)", secondary: "Time Magick (cast Haste on himself for extra turns)", reaction: "Regenerate", support: "Magick Boost", movement: "Teleport — ignores terrain to reach downed allies", why: "Hasting himself gives more healing turns, and Teleport lets him reach anyone who goes down." },
    ],
    gear: [
      { name: "Healing Staff", type: "weapon", when: "mid game shops", note: "Attacking a wounded ally heals them — a free extra heal each turn." },
      { name: "Whale Whisker / Rainbow Staff", type: "weapon", when: "late (poach/treasure)", note: "Whale Whisker gives the biggest Magick boost of any staff." },
      { name: "White Robe", type: "armor", when: "Ch.3+", note: "Halves Fire/Ice/Lightning and raises Magick Defense — great on a healer." },
      { name: "Robe of Lords", type: "armor", when: "Midlight's Deep (postgame)", note: "Best all-round robe." },
      { name: "Holy Miter", type: "armor", when: "mid game", note: "Magick-boosting hat for casters." },
      { name: "Chantage", type: "accessory", when: "poach (female-only Perfume)", note: "Perpetual Reraise + Regen — Orrick is male, so use Reflect Ring or Defense Ring instead." },
      { name: "108 Gems / N-Kai Armlet", type: "accessory", when: "mid game", note: "Blocks common status attacks so your healer stays online." },
    ],
    braveFaith: "**Keep Faith high.** His healing scales with Magick Attack *and* Faith, so higher Faith means bigger Cures — but he also takes more magick damage, so keep him out of enemy spell range. Never let his *permanent* Faith reach 100, or he'll leave the party to join the Church.",
    storyWarnings: [
      { when: "End of Ch.3 — the Riovanes duel", note: "He can't help Ramza in the solo Wiegraf fight — that battle is Ramza alone, so don't rely on Orrick's healing to carry it." },
      { when: "Ch.3 — Riovanes rooftop", note: "Enemies here hit with status and heavy magick; give him a White Robe and a status-blocking accessory so your healer stays online." },
      { when: "Any boss that inflicts Silence", note: "Keep **Item** as his secondary so he can still revive with a Phoenix Down if his spells get sealed." },
    ],
  },
  {
    name: "Margery",
    meta: "Black Mage → Time Mage → **Summoner** (endgame)",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Black Mage → Lv.3", now: true },
      { label: "Time Mage → Lv.3" },
      { label: "Summoner (endgame)" },
    ],
    baseline: "**Baseline assumed:** Move +1 / JP Boost — finish any remaining Squire baseline first.",
    tiles: [
      { type: "movement", job: "Squire", skill: "Move +1 / JP Boost", note: "Finish remaining baseline" },
      { type: "action", job: "Black Mage", skill: "Fire", note: "Cheapest AoE, core early tool if not yet learned" },
      { type: "action", job: "Black Mage", skill: "Thunder", note: "Lightning tier-1 (TIC renames Bolt → Thunder) — covers water/metal-armor weakness" },
      { type: "action", job: "Black Mage", skill: "Blizzard", note: "Ice tier-1 (TIC renames Ice → Blizzard) — rounds out elemental coverage" },
      { type: "action", job: "Black Mage", skill: "Fira", note: "Upgraded Fire — pushes toward Lv.3" },
      { type: "action", job: "Black Mage", skill: "Thundara", note: "Upgraded Thunder" },
      { type: "action", job: "Black Mage", skill: "Blizzara", note: "Upgraded Ice — near Lv.3, unlocks Time Mage" },
      { type: "action", job: "Time Mage", skill: "Haste", note: "Extra actions for allies — best support effect in the game" },
      { type: "action", job: "Time Mage", skill: "Slow", note: "Same effect in reverse on dangerous enemies" },
      { type: "support", job: "Time Mage", skill: "Swiftspell", note: "TIC name for Short Charge — shortens spell/summon cast time; huge long-term value" },
      { type: "action", job: "Time Mage", skill: "Stop", note: "Finish Time Mage — freezes an enemy's turns entirely" },
      { type: "action", job: "Time Mage", skill: "Quick", note: "Grants an instant extra turn — top-tier tempo (verify unlock)" },
      { type: "action", job: "Summoner", skill: "Shiva / Ramuh / Ifrit", note: "Elemental AoE summon trio — Summoner unlocks off Black/Time progress" },
      { type: "action", job: "Summoner", skill: "Titan", note: "Wide earth-element AoE — strong mid-tier nuke" },
      { type: "action", job: "Summoner", skill: "Bahamut", note: "Big non-elemental AoE — core endgame damage" },
      { type: "action", job: "Summoner", skill: "Odin / Leviathan", note: "Odin (Zantetsuken, dark) and Leviathan (Tsunami, water) — high-tier AoE finishers" },
      { type: "action", job: "Summoner", skill: "Golem", note: "Party-wide physical damage barrier — protects fragile casters" },
      { type: "action", job: "Summoner", skill: "Carbuncle", note: "Casts Reflect on allies to bounce enemy magic back — strong control/support summon" },
      { type: "reaction", job: "Summoner", skill: "Critical: Recover MP", note: "Restores MP when she drops to critical HP — keeps her summoning under pressure" },
      { type: "support", job: "Summoner", skill: "Halve MP", note: "TIC name — halves MP cost so she can chain summons back-to-back" },
      { type: "support", job: "Black Mage", skill: "Magick Boost", note: "+33% magick damage — boosts her Black Magic AND her summon damage" },
    ],
    notes: [
      "**Job-level gates:** Black Mage → Lv.3 unlocks Time Mage; Time Mage → Lv.3 unlocks Summoner. Hit each target level before switching — leaving early just locks you out of the next job.",
      "Secondary: Item for now; swap to White Magic later for backup Cure/Raise.",
      "Skip Poison/Death-line Black Magic — low accuracy early, not worth the JP yet.",
      "After Haste/Slow/Swiftspell: Reflect and Stop are the next Time Mage targets.",
      "**Endgame identity:** nuke + turn-order control — finish Time Mage (Stop/Quick) while building Summoner AoE.",
      "**Fragility warning:** she'll be a priority kill target — lean on Golem, Carbuncle (Reflect), and Halve MP to keep her casting.",
      "Aspirational: **Zodiark** is the strongest summon but is learn-only — you must survive an enemy's Zodiark to acquire it, so treat it as a bonus, not a plan.",
      "**Roster shift:** Margery stays your main nuker, but on status-heavy maps **Beowulf** (Ch.4) can take a caster slot for hard control (Sleep, Confuse, Petrify).",
    ],
    loadouts: [
      { job: "Black Mage (early)", secondary: "Item (heal / revive the party)", reaction: "None yet — she learns Critical: Recover MP later, as a Summoner", support: "Magick Boost — +33% to her spell and summon damage", movement: "Move +1", why: "A straight elemental nuker; Magick Boost raises her damage right away." },
      { job: "Time Mage phase", secondary: "Black Magick (keep casting her elemental spells)", reaction: "None yet — Critical: Recover MP still comes from Summoner", support: "Swiftspell — shortens her spell and summon cast times", movement: "Move +1", why: "Adds turn control (Haste, Slow, Stop); Swiftspell means less waiting between casts." },
      { job: "Summoner (endgame)", secondary: "Time Magick or Black Magick", reaction: "Critical: Recover MP — restores MP when she drops to critical HP", support: "Pick one: Halve MP (chain more summons), Swiftspell (cast sooner), or Magick Boost (hit harder)", movement: "Move +1", why: "You only get one support slot, so choose per fight. Golem and Carbuncle keep her alive while she chains summons." },
    ],
    gear: [
      { name: "Wizard Rod / Faith Rod", type: "weapon", when: "mid game", note: "Faith Rod raises Faith for more magick damage (but she also takes more — situational)." },
      { name: "Flame / Ice / Thunder Rod", type: "weapon", when: "Ch.2+", note: "Each boosts its element and can cast a free spell — match to your Black Magic." },
      { name: "Whale Whisker / Wizard Staff", type: "weapon", when: "late (poach/treasure)", note: "Biggest flat Magick boost for summons and spells." },
      { name: "Black Robe", type: "armor", when: "Ch.3+", note: "Boosts Fire/Ice/Lightning damage — ideal during her Black Mage phase." },
      { name: "Light Robe / Robe of Lords", type: "armor", when: "late/postgame", note: "All-round magick body armor once non-elemental summons matter more." },
      { name: "Golden Hairpin", type: "armor", when: "mid game", note: "+MP hat to fuel back-to-back summons." },
      { name: "Sprint Shoes / Sage's Ring", type: "accessory", when: "mid game", note: "Speed for more casts; Sage's Ring / Japa Mala further boost magick." },
    ],
    braveFaith: "**High Faith = maximum damage.** Her spells and summons hit harder the higher her Faith — but she also takes far more magick damage, so she's a glass cannon; keep her at the back. Watch the 100-Faith cap so she doesn't leave the party.",
    storyWarnings: [
      { when: "Ch.3 — Riovanes rooftop", note: "The assassins target fragile back-line units first — give her a status-blocking accessory (108 Gems) or keep her well out of reach for that fight." },
      { when: "Fights with heavy enemy magick", note: "Her low magick defence really hurts here; lead with Golem or Carbuncle (Reflect) once she has them, and stay behind terrain." },
    ],
  },
  {
    name: "Esdeline",
    meta: "Archer → Thief → **Ninja** (endgame, via a Monk Lv.4 → Geomancer Lv.2 gate) · Level 5",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Archer → Lv.4", now: true },
      { label: "Thief → Lv.5" },
      { label: "Knight → Lv.3 (Monk gate)" },
      { label: "Monk → Lv.4 (Geomancer gate)" },
      { label: "Geomancer → Lv.2 (Ninja gate)" },
      { label: "Ninja (endgame)" },
    ],
    baseline: "**Baseline assumed:** Move +1 / JP Boost — finish any remaining Squire skills first.",
    tiles: [
      { type: "movement", job: "Squire", skill: "Move +1 / JP Boost", note: "Finish remaining baseline" },
      { type: "support", job: "Archer", skill: "Concentration", note: "Guarantees physical hits land — top priority, useful forever" },
      { type: "support", job: "Archer", skill: "Equip Bow/Crossbow", note: "Access to stronger ranged weapons" },
      { type: "action", job: "Archer", skill: "Charge +1 (Aim +1)", note: "Small guaranteed damage boost, fast charge" },
      { type: "action", job: "Archer", skill: "Charge +2 (Aim +2)", note: "Slightly stronger, still reliable" },
      { type: "action", job: "Archer", skill: "Charge +3 (Aim +3)", note: "Good damage-to-charge-time ratio" },
      { type: "action", job: "Archer", skill: "Charge +4 (Aim +4)", note: "Only once fights run long enough to use safely" },
      { type: "action", job: "Archer", skill: "Charge +5 (Aim +5)", note: "Best power-to-wait balance — good stopping point" },
      { type: "movement", job: "Thief", skill: "Move +2", note: "Thief grants Move +2 (Move +3 is Bard-only) — still excellent reach and repositioning" },
      { type: "action", job: "Thief", skill: "Steal Weapon", note: "Disarms enemies while adding utility (verify best Steal picks)" },
      { type: "action", job: "Monk", skill: "Chakra", note: "No-MP self/ally HP+MP restore (TIC: Chakra, from the Martial Arts skillset) — cheap sustain to bank while grinding Monk toward Lv.4, which unlocks Geomancer." },
      { type: "reaction", job: "Monk", skill: "Counter", note: "Strikes back when physically hit (TIC: Counter) — a lasting reaction option for a front-line striker; bank it during the Monk pass." },
      { type: "action", job: "Geomancer", skill: "Geomancy", note: "No-MP terrain attack (TIC: the Geomancy command; its grassland ability Tanglevine can inflict Stop) that banks Geomancer JP toward Lv.2, the confirmed Ninja unlock." },
      { type: "support", job: "Geomancer", skill: "Attack Boost", note: "The Geomancer keeper worth the detour — Attack Boost (TIC name for Attack UP; +33% physical attack, 400 JP) raises her damage for good and even lifts her Steal rate; a strong option on her endgame Ninja." },
      { type: "support", job: "Ninja", skill: "Dual Wield", note: "TIC name for Two Swords — a weapon in each hand for two attacks per turn; her damage core" },
      { type: "action", job: "Ninja", skill: "Throw", note: "Ranged option that scales with thrown gear (verify unlock)" },
      { type: "reaction", job: "Ninja", skill: "Reflexes", note: "Doubles physical & magick evasion when targeted — stacks with her high innate evasion" },
      { type: "reaction", job: "Thief", skill: "Vigilance", note: "Thief reaction — assume a defensive stance on HP loss" },
    ],
    notes: [
      "**Job-level gates:** Archer → Lv.3 unlocks Thief; keep Archer to Lv.4 for Ninja. Thief → Lv.5, then Ninja unlocks at Archer Lv.4 + Thief Lv.5 + **Geomancer Lv.2** (confirmed) — don't leave a job until you hit its target level.",
      "**The Knight → Monk → Geomancer gate:** Ninja needs **Geomancer Lv.2**, Geomancer needs **Monk Lv.4**, and Monk needs **Knight Lv.3** (all confirmed) — so it's a deep detour: Knight to Lv.3, Monk to Lv.4 to unlock Geomancer, then grind Geomancer to Lv.2. Bank that JP before expecting Ninja to open — and make it pay: grab **Counter/Chakra** during the Monk pass, and **Attack Boost** (a permanent physical-damage keeper) in Geomancer. Knight has no lasting keeper for her, so pass through it quickly.",
      "Secondary: Item is a safe default for now.",
      "Skip Charge/Aim +6 and above for a long while — too slow, targets move or die first.",
      "Longer-term: good future Thief/Ninja candidate given her ranged/physical foundation.",
      "**Endgame identity:** fastest, hardest-hitting physical unit — Thief for Move +2/Steal, then Ninja for Dual Wield.",
      "Carry **Concentration** (already learned on Archer) as her support so dual-wield attacks don't miss.",
      "For an evasion tank, stack **Reflexes** (Ninja) with a cloak; adding the Samurai's **Shirahadori** later makes her nearly untouchable, though that's a deep detour.",
      "**Roster shift:** Keep Esdeline in the party for her irreplaceable Steal/Poach, but for fights that reward disabling a boss at range, **Mustadio** (Ch.2) can take her slot for that battle.",
    ],
    loadouts: [
      { job: "Archer (early)", secondary: "Item", reaction: "None yet — she learns Vigilance later, as a Thief", support: "Concentration — makes her shots ignore evasion so they always land", movement: "Move +1", why: "Concentration guarantees hits while you build up her Charge/Aim skills." },
      { job: "Thief phase", secondary: "Charge/Aim (kept from Archer) or Item", reaction: "Vigilance — takes a defensive stance when she loses HP", support: "Concentration", movement: "Move +2", why: "Speed and mobility for stealing and repositioning around the map." },
      { job: "Knight (Lv.3 gate)", secondary: "Steal (kept from Thief) or Item", reaction: "Vigilance (kept from Thief)", support: "JP Boost — the fastest way to Knight Lv.3, which unlocks Monk", movement: "Move +2 (kept from Thief)", why: "Knight Lv.3 is the first leg of the deep Ninja detour — it only exists to open Monk. Knight has no lasting keeper for an evasion Ninja, so bank the levels quickly and move into Monk." },
      { job: "Monk (Lv.4 gate)", secondary: "Steal (kept from Thief) or Item", reaction: "Vigilance (kept from Thief) — or start learning Counter here", support: "JP Boost — the fastest way to Monk Lv.4, which unlocks Geomancer", movement: "Move +2 (kept from Thief)", why: "Monk Lv.4 is the confirmed unlock for Geomancer, which in turn gates Ninja — so this is the first leg of a deep detour. Bank Counter and Chakra while you're here (both stay useful), then push into Geomancer." },
      { job: "Geomancer (Lv.2 gate)", secondary: "Steal (kept from Thief) or Item", reaction: "Vigilance — kept from Thief so she still guards on HP loss", support: "JP Boost — the fastest way to Geomancer Lv.2, the confirmed Ninja unlock; learn Attack Boost here to keep for good", movement: "Move +2 (kept from Thief)", why: "Geomancer Lv.2 is the confirmed unlock for Ninja, so this is the last piece of the gate. It's a real detour (Knight Lv.3 → Monk Lv.4 opens Geomancer), so make it pay: bank Attack Boost while you're here — it raises her physical damage for good — then move into Ninja." },
      { job: "Ninja (endgame)", secondary: "Steal (kept from Thief) or Item", reaction: "Reflexes — doubles her evasion when she is targeted", support: "Dual Wield — a weapon in each hand for two attacks per turn", movement: "Move +2", why: "Dual Wield gives more raw damage than Concentration, and her high Speed and Brave keep her hit rate up without it." },
    ],
    gear: [
      { name: "Perseus Bow / Yoichi Bow", type: "weapon", when: "Ch.4 (treasure/steal)", note: "Best bows for her Archer phase — two-hand them for big ranged damage." },
      { name: "Windslash Bow", type: "weapon", when: "Ch.3+", note: "Longbow with extra vertical range — snipe from cliffs." },
      { name: "Koga Knife / Iga Knife", type: "weapon", when: "Ch.4 — poach Ninjas", note: "Best ninja blades; dual-wield a pair for her endgame." },
      { name: "Assassin's Dagger", type: "weapon", when: "Ch.4 (steal/treasure)", note: "Chance to inflict Death/Stop on hit — brutal with Dual Wield." },
      { name: "Vanish Mantle", type: "accessory", when: "poach (rare)", note: "Top evasion cloak; adds Transparent — pairs with her innate evasion + Reflexes." },
      { name: "Sprint Shoes / Germinas Boots", type: "accessory", when: "mid game", note: "Speed, or Move/Jump, for a fast mobile striker." },
      { name: "Thief Hat / Flash Hat", type: "armor", when: "mid game", note: "Speed-boosting light headgear for Thief/Ninja." },
    ],
    braveFaith: "**Keep Brave high.** As a physical striker her damage rises with Brave, and her **Reflexes** evasion (and any Counter) triggers more often at high Brave. Keep her Faith on the lower side so enemy magick does less to her.",
    storyWarnings: [
      { when: "Ch.3 — Riovanes rooftop", note: "This is her moment: she's fast enough to reach and delete the assassins before they wreck your casters." },
      { when: "Ch.4 — vs Elmdore", note: "He carries the **Genji gear** — steal it before the battle ends, but he has Safeguard, so strip that first." },
      { when: "Ch.4 — enemy ninjas", note: "Poach or steal **Koga/Iga Knives** and the **Assassin's Dagger** from enemy ninjas to build her endgame dual-wield kit." },
    ],
  },
  {
    name: "Felice",
    meta: "Long build → **Arithmetician** · payoff = deep learned-spell list",
    path: [
      { label: "Chemist → Lv.2", now: true },
      { label: "White Mage → Lv.5" },
      { label: "Black Mage → Lv.5" },
      { label: "Time Mage → Lv.4" },
      { label: "Mystic → Lv.4" },
      { label: "Arithmetician" },
    ],
    baseline: "**Baseline assumed:** Move +1 / JP Boost, same as every unit. This is a long background project — treat it as ongoing across many fights, not something to rush.",
    tiles: [
      { type: "action", job: "Chemist", skill: "Potion (item skill)", note: "Unlock item skills individually — owning the item isn't enough" },
      { type: "action", job: "Chemist", skill: "Phoenix Down (item skill)", note: "Priority alongside Potion" },
      { type: "reaction", job: "Chemist", skill: "Auto-Potion", note: "Learn before leaving Chemist" },
      { type: "action", job: "White Mage", skill: "Cure", note: "Unlocks at Chemist Lv.2 — start here" },
      { type: "action", job: "White Mage", skill: "Raise", note: "Core revive spell" },
      { type: "action", job: "White Mage", skill: "Cura", note: "Needed for pushing toward Lv.5" },
      { type: "action", job: "White Mage", skill: "Protect / Shell", note: "Cheap, useful, racks up job levels" },
      { type: "action", job: "White Mage", skill: "Esuna", note: "Continue toward White Mage Lv.5" },
      { type: "action", job: "Black Mage", skill: "Fire / Thunder / Blizzard", note: "Base elemental trio (TIC renames Bolt → Thunder, Ice → Blizzard)" },
      { type: "action", job: "Black Mage", skill: "Fira / Thundara / Blizzara", note: "Tier-2 elementals — push toward Black Mage Lv.5" },
      { type: "action", job: "Black Mage", skill: "Firaga / Thundaga / Blizzaga", note: "Tier-3 elementals — the strongest Arithmeticks-eligible AoE (tier-4 -ja spells are NOT eligible)" },
      { type: "action", job: "White Mage", skill: "Holy", note: "Learn BEFORE Arithmetician — becomes a free, instant nuke when fired via Arithmeticks" },
      { type: "action", job: "Black Mage", skill: "Flare", note: "Strongest single-target Black Magic — devastating once fired via Arithmeticks" },
      { type: "action", job: "Black Mage", skill: "Death", note: "Arithmeticks can sweep every matching unit for instant KO — high value (bosses often resist)" },
      { type: "action", job: "Time Mage", skill: "Haste", note: "Mass-Haste allies in one Arithmeticks cast — learn before Arithmetician" },
      { type: "action", job: "Time Mage", skill: "Immobilize", note: "Time Magick lockdown — freezes movement on every matching enemy via Arithmeticks" },
      { type: "action", job: "Mystic", skill: "Mystic Arts: Quiescence / Repose / Induration", note: "TIC status spells — Silence, Sleep and Petrify — for wide Arithmeticks status sweeps" },
      { type: "support", job: "Black Mage", skill: "Magick Boost", note: "+33% magick damage — boosts her spells and, later, her Arithmeticks output; picked up during her Black Mage Lv.5 push" },
      { type: "action", job: "Arithmetician", skill: "Arithmeticks", note: "The payoff — learn the CT / Level / Height / Prime / Multiple algorithms to fire any known spell for free, with no charge time" },
    ],
    notes: [
      "**Job-level gates:** Arithmetician needs White Mage Lv.5 + Black Mage Lv.5 + Time Mage Lv.4 + Mystic Lv.4 — hit each target level before moving on. (Mystic itself needs White Mage Lv.3 and Time Mage needs Black Mage Lv.3, both satisfied by the Lv.5 pushes.)",
      "After Black Mage Lv.5: Time Mage — Haste, Slow, Reflect, Stop — push to Lv.4.",
      "Then Mystic (unlocks at White Mage Lv.3, already satisfied): Mystic Arts status spells — Quiescence (Silence), Repose (Sleep), Induration (Petrify) — push to Lv.4.",
      "Arithmetician unlocks once White Mage 5 / Black Mage 5 / Time Mage 4 / Mystic 4 are all satisfied. Keep Item equipped as secondary throughout — she'll be fragile getting there.",
      "**Critical:** Arithmeticks only triggers spells she has ALREADY learned on other jobs — her endgame power scales with how deep her learned spell list is before she reaches Arithmetician.",
      "Best Arithmeticks payloads to bank during the WM5/BM5/TM4/Mystic4 grind: Holy, Flare, Firaga-tier elementals, Death, Haste, and lockdown status (Immobilize, Repose/Quiescence) — learn them on the way. Note: tier-4 -ja spells and Meteor are NOT Arithmeticks-eligible.",
      "Note: Arithmeticks fires spells with **no MP cost and no charge time**, but hits every unit (allies included) matching the chosen algorithm — watch friendly fire, or use element-absorbing gear to turn it into healing.",
      "**Roster shift:** From Ch.2 onward, **Agrias** usually takes your fifth deployment slot while Felice is still leveling — Agrias hits far harder in the short term. Rotate Felice back in once her Arithmeticks spell list is built, or for maps where calculated spells dominate.",
    ],
    loadouts: [
      { job: "Mage grind (WM/BM/TM/Mystic)", secondary: "Whichever magick set she isn't currently in, so she keeps casting while leveling", reaction: "Auto-Potion — automatically drinks a Potion when she takes damage", support: "Magick Boost — +33% magick damage, which later boosts her Arithmeticks spells too", movement: "Move +1", why: "She is fragile for a long time, so keep Auto-Potion on and keep her behind the front line while she learns spells." },
      { job: "Arithmetician (endgame — best setup)", secondary: "Put Arithmeticks on a Black Mage body (most damage) or White Mage body (most speed) instead of staying the base job", reaction: "Auto-Potion", support: "Magick Boost", movement: "Move +1", why: "The Arithmetician job itself has the lowest magick and speed in the game, so run Arithmeticks as a secondary command on a stronger mage." },
    ],
    gear: [
      { name: "Monster Dictionary / Papyrus Plate (Books)", type: "weapon", when: "mid–late game", note: "Arithmetician weapons; books strike two tiles in a row." },
      { name: "Whale Whisker", type: "weapon", when: "late (poach)", note: "If she fires Arithmeticks from a staff-using mage body, this maximizes magick." },
      { name: "Chameleon Robe", type: "armor", when: "Ch.3+", note: "Absorbs Holy — cast Holy via Arithmeticks to heal herself/allies with zero friendly-fire risk." },
      { name: "Black Robe / Robe of Lords", type: "armor", when: "late/postgame", note: "Black Robe boosts elemental Arithmeticks; Robe of Lords is the all-round pick." },
      { name: "Ribbon", type: "armor", when: "Ch.4 (rare, female-only)", note: "Best hat in the game — blocks nearly all status ailments." },
      { name: "Sage's Ring / Japa Mala", type: "accessory", when: "late game", note: "Boost magick attack for stronger calculations." },
      { name: "Sprint Shoes", type: "accessory", when: "mid game", note: "+1 Speed = noticeably more Arithmeticks turns." },
    ],
    braveFaith: "**High Faith powers her calculations.** Arithmeticks damage scales with Faith just like normal spells, so keep her Faith high — but that also makes enemy magick hurt more, and she's fragile, so keep her protected. Mind the 100-Faith cap.",
    storyWarnings: [
      { when: "The long grind", note: "She's a background project — under-levelled and squishy for a long time. Bench her from the hardest story fights (like Riovanes) until her spell list and job levels are built up." },
      { when: "Before you switch her to Arithmetician", note: "Make sure she has actually **learned** Holy, Flare, the -aga elementals, Death and Haste on other jobs first — Arithmeticks can only fire spells she already knows." },
    ],
  },
];

// Top-level party strategy shown in the collapsible overview panel.
const strategy = {
  formation: [
    "**Front line (soak hits, deal melee damage):** Ramza and Esdeline. Ramza tanks in heavy armour with Shirahadori/Counter; Esdeline dives in with Dual Wield and high evasion.",
    "**Back line (fragile, high value):** Margery and Felice. Keep them behind terrain or allies — one turn caught in the open can delete them.",
    "**Flexible support:** Orrick sits mid-field, close enough to heal the front line but out of the enemy's spell range.",
  ],
  turnOrder:
    "Speed sets turn order, so cast **Haste** (Orrick or Margery) on Ramza and Esdeline early — extra physical turns win fights — and drop **Slow** or **Stop** on the enemy's fastest, most dangerous unit.",
  protectCasters:
    "Actively shield your casters: **Golem** (Margery) soaks physical damage for the whole party, **Carbuncle/Reflect** bounces enemy magick back, and Esdeline can body-block chokepoints so nothing reaches the back line.",
  faithBrave:
    "**Brave** raises physical damage and how often reactions like Shirahadori, Counter and Reflexes trigger — keep it high on Ramza and Esdeline. **Faith** raises the magick you deal *and* the magick you take — keep it high on Orrick, Margery and Felice. Never let a unit's *permanent* Faith reach 100 (they leave to join the Church) or *permanent* Brave reach 0 (they run away for good).",
  poaching:
    "Gear tagged **(poach)** comes from the Thief's **Poach** support ability — equip it on **Esdeline**, then defeat a monster with a normal attack while Poach is on to take its item instead of a clean kill. Stronger members of a monster family yield rarer items. The exact monster-to-item pairs vary, so check a poaching chart in your version to target the pieces you want. *(Poach pairings are unverified against The Ivalice Chronicles.)*",
  otherRecruits:
    "Other optional recruits worth looking up (timing and skills vary — confirm in your version): **Rapha & Marach** (Sky/Nether Seers, Ch.4), **Balthier** the sky pirate (added in War of the Lions / The Ivalice Chronicles, Ch.4), and **Byblos** (a Goug / Deep Dungeon unit).",
  caveat:
    "Recruit join points and some ability names below come from general Final Fantasy Tactics / War of the Lions knowledge and aren't individually verified against The Ivalice Chronicles — confirm exact timing in-game.",
};

// How the deployed five evolves as recruits arrive. Shown in a top-level panel.
// Lineups are suggested defaults, not hard rules — swap freely for your playstyle.
const partyTimeline = [
  {
    phase: "Chapter 1 — the founders",
    when: "Start of the game",
    lineup: [
      { name: "Ramza", role: "Leader / front-line" },
      { name: "Orrick", role: "Healer (White Mage)" },
      { name: "Margery", role: "Magick damage (Black Mage)" },
      { name: "Esdeline", role: "Physical striker / thief" },
      { name: "Felice", role: "5th slot — mage in training" },
    ],
    change:
      "Your starting five. Felice is a long-term Arithmetician project and the weakest link for now — protect her while she banks spells. Steal the **Blood Sword** off Gaffgarion while you're here.",
  },
  {
    phase: "Chapter 2 — royal guards arrive",
    when: "Ch.2 (Ovelia / Goug)",
    lineup: [
      { name: "Ramza", role: "Leader / front-line" },
      { name: "Orrick", role: "Healer" },
      { name: "Margery", role: "Magick damage" },
      { name: "Esdeline", role: "Physical / thief" },
      { name: "Agrias", role: "5th slot — steps in for Felice", recruit: true },
    ],
    change:
      "**Agrias** joins (guest, then permanent) and takes Felice's deployment slot while Felice keeps leveling in the background. **Mustadio** also joins as a ranged-control specialist you rotate in for specific fights — keep him around for the Goug sidequests.",
  },
  {
    phase: "Chapter 3 — the party solidifies",
    when: "Ch.3",
    lineup: [
      { name: "Ramza", role: "Leader / front-line" },
      { name: "Orrick", role: "Healer" },
      { name: "Margery", role: "Magick damage" },
      { name: "Esdeline", role: "Physical / thief" },
      { name: "Agrias", role: "5th slot (Felice returns once built)", recruit: true },
    ],
    change:
      "No new permanent members, but this chapter holds the hardest solo fight: **Riovanes locks Ramza in alone** — build him to survive by himself before you enter. Felice can start seeing play as her spell list fills out.",
  },
  {
    phase: "Chapter 4 — the powerhouses",
    when: "Ch.4",
    lineup: [
      { name: "Ramza", role: "Leader / front-line" },
      { name: "Orrick", role: "Healer" },
      { name: "Orlandeau", role: "Physical powerhouse — takes Agrias's slot", recruit: true },
      { name: "Margery / Felice", role: "Magick damage or Arithmeticks" },
      { name: "Esdeline", role: "Physical / thief — steal Elmdore's Genji gear" },
    ],
    change:
      "**Orlandeau** joins and outclasses your physical units, sliding into Agrias's slot. The **Beowulf & Reis** sidequest, the **Construct 8** build, and the very late **Cloud** unlock here too — all optional. By now Felice's Arithmeticks can rival Margery on the right maps, so rotate the magick slot to fit the fight.",
  },
];

// Fights that call for a specific unit or setup. Shown in a top-level panel.
const keyBattles = [
  {
    name: "Ch.1 — vs Gaffgarion",
    goal: "Steal the Blood Sword",
    bring: ["Esdeline (Steal)", "Ramza"],
    note:
      "Put **Steal** on Esdeline and take the **Blood Sword** before the fight ends — it drains HP on every hit and carries your early game.",
  },
  {
    name: "Ch.3 — Riovanes Castle (Wiegraf → Velius)",
    goal: "Survive a solo duel",
    bring: ["Ramza — ALONE"],
    note:
      "Ramza fights this one **completely alone** — the rest of your party isn't deployed. Beforehand give him a strong weapon, heavy armour, a self-heal (Auto-Potion or Item) and Counter. Don't lean on your healers; they aren't in this battle.",
  },
  {
    name: "Ch.3 — Riovanes rooftop (Celia & Lettie)",
    goal: "Burst down the assassins",
    bring: ["Esdeline (fast burst)", "Ramza", "Orrick (status protection)", "Margery (Golem)"],
    note:
      "The assassins inflict Death and Stop. Bring fast physical damage to delete them quickly, put status-blocking accessories on your casters, and consider benching fragile Felice for this one.",
  },
  {
    name: "Ch.4 — vs Elmdore",
    goal: "Steal the Genji gear",
    bring: ["Esdeline (Steal)"],
    note:
      "Elmdore carries the **Genji set** but has Safeguard — strip Safeguard first, then steal each piece before the battle ends. Keep a dedicated thief in the party for this fight.",
  },
  {
    name: "Ch.4 — Goland Coal City",
    goal: "Recruit two units at once",
    bring: ["Your strongest five"],
    note:
      "Clear this sidequest to recruit **both Beowulf and Reis**. *(Exact quest steps vary by version — confirm in-game.)*",
  },
  {
    name: "Ch.4 — Goug machine city",
    goal: "Unlock the machine units",
    bring: ["Mustadio (required)"],
    note:
      "Keep **Mustadio** in your roster — he's the key to the Goug sidequests that build **Construct 8** and eventually lead to **Cloud**. *(Steps are general FFT knowledge — confirm in-game.)*",
  },
];

// One-time steals, recruits and treasures that are easy to lose forever.
// Each item is checkable; exact timing varies by version — confirm in-game.
const missables = [
  {
    chapter: "Chapter 1",
    items: [
      {
        label: "Steal the Blood Sword from Gaffgarion",
        note: "Drains HP equal to damage dealt — a huge early survivability boost. Put **Steal** on a Thief and take it before the fight ends.",
      },
    ],
  },
  {
    chapter: "Chapters 2–3",
    items: [
      {
        label: "Keep Mustadio in your roster",
        note: "He's the key to the Ch.4 Goug machine sidequests (**Construct 8**, and eventually **Cloud**) — don't dismiss him.",
      },
      {
        label: "Steal / poach as named enemies appear",
        note: "Many enemy-only weapons and accessories are one-time **steals** or **poaches**. Bring those abilities to fights with bosses and their escorts.",
      },
    ],
  },
  {
    chapter: "Chapter 4 — the big one",
    items: [
      {
        label: "Steal the Genji set from Elmdore",
        note: "Genji Armor/Helm/Shield are top-tier heavy gear — but Elmdore has **Safeguard**, so strip that first, then steal each piece before the battle ends.",
      },
      {
        label: "Poach the Koga/Iga Knives and steal the Assassin's Dagger",
        note: "From enemy ninjas — the pieces of Esdeline's endgame dual-wield kit.",
      },
      {
        label: "Grab Chirijiraden at Nelveska Temple",
        note: "The ultimate katana and Ramza's biggest Iaido nuke — a one-time map.",
      },
      {
        label: "Recruit Beowulf & Reis (Goland Coal City)",
        note: "One sidequest recruits **both** — clear it or lose both.",
      },
      {
        label: "Build Construct 8 / Worker 8 (Goug)",
        note: "The machine-city sidequest; requires Mustadio in the party.",
      },
      {
        label: "Recruit Cloud (very late, optional)",
        note: "Buy a flower in **Zarghidas** after the machine quest, and get the **Materia Blade** from a Ch.4 map — his Limits don't work without it.",
      },
      {
        label: "Look up other optional recruits",
        note: "**Rapha & Marach**, **Balthier** (War of the Lions / The Ivalice Chronicles), and **Byblos** — timing and steps vary by version.",
      },
      {
        label: "Zodiark (bonus, learn-only)",
        note: "The strongest summon is only learned by surviving an enemy's Zodiark — treat it as a lucky bonus, not a plan.",
      },
    ],
  },
];

// Rare poaching tracker. Poaching turns a slain monster into gear at the Fur Shop.
// Exact monster→item pairs shift between versions — confirm in The Ivalice Chronicles.
const poach = [
  {
    group: "How poaching works",
    items: [
      {
        label: "Learn **Poach** (Secret Hunt)",
        note: "The **Thief's** Poach support ability (TIC: Poach; PS name Secret Hunt) — 200 JP. Equip it on whoever lands the killing blow — it only works on **monsters**, not humans.",
      },
      {
        label: "Finish monsters with a **physical** attack",
        note: "The poach fires on the killing blow. Magic and non-damage finishes don't poach — soften the monster, then let the poacher land the last hit.",
      },
      {
        label: "Collect goods at the **Fur Shop**",
        note: "Poached items don't drop on the field — they appear for sale (and resale) at the Fur Shop in town. Check it after farming.",
      },
      {
        label: "Grab a poach list for your version",
        note: "Which monster yields which item **varies by version** — keep an in-game or community poach chart handy before farming.",
      },
    ],
  },
  {
    group: "Worthwhile targets (confirm exact drops in-game)",
    items: [
      {
        label: "Dragon family",
        note: "Commonly farmed for strong poach rewards. Exact item depends on the dragon type and version — verify before grinding.",
      },
      {
        label: "Chocobo family (Yellow / Black / Red)",
        note: "Easy, plentiful poach fodder in many regions. Good for early materials; confirm the current drop.",
      },
      {
        label: "Great Malboro",
        note: "A classic high-value poach target. Bring status protection and confirm the reward for your version.",
      },
      {
        label: "Coeurl / Vampire cats",
        note: "Late-game feline monsters known for desirable poaches — check the exact item in-game.",
      },
    ],
  },
];

// Treasure Hunter / Move-Find Item tracker for hidden tiles on maps.
const treasure = [
  {
    group: "How Move-Find Item works",
    items: [
      {
        label: "Equip **Treasure Hunter** (Move-Find Item)",
        note: "A **Move** ability. End a unit's movement on a hidden panel to dig up an item. Some panels only appear at map edges or specific tiles.",
      },
      {
        label: "Raise **Brave** before you dig",
        note: "Each panel gives a **rare** item at high Brave and a **common** one otherwise. Pump the digger's Brave first for the better roll.",
      },
      {
        label: "One find per panel per battle",
        note: "You can't re-farm the same tile in a single fight. For revisitable maps you can return; story-only maps are one-shot.",
      },
      {
        label: "Grab a map/tile guide for your version",
        note: "Which tile yields what — and the rare vs. common split — **varies by version**. Confirm with a Move-Find map before hunting.",
      },
    ],
  },
  {
    group: "Don't-miss sweeps (confirm tiles in-game)",
    items: [
      {
        label: "Sweep Nelveska Temple",
        note: "The one-time Construct 8 map is worth a full Move-Find sweep before you leave — you won't get another pass.",
      },
      {
        label: "Check story-only maps before advancing",
        note: "Any map you can't revisit may hide a rare panel. If it's a one-time battle, sweep it while you're there.",
      },
    ],
  },
];

// Shop and Fur Shop progression — FFT has no forging; gear improves by story tier, treasure, steals and poaches.
const shop = [
  {
    group: "Keeping stock current",
    items: [
      {
        label: "Re-check town shops each chapter",
        note: "Base shops stock better weapons and armor as the story advances. Swing back through towns at each chapter to buy the new tier.",
      },
      {
        label: "Watch the **Fur Shop** for poaches",
        note: "Rare gear you can't buy anywhere else shows up here once you've poached it. It's the payoff for the poach tracker.",
      },
      {
        label: "Re-equip fresh recruits on arrival",
        note: "New units often join in outdated gear. Budget gil so an incoming recruit isn't fielded under-equipped.",
      },
      {
        label: "Remember: there's no forging",
        note: "Better gear comes from **shop tiers, treasure, steals, and poaches** — not upgrades. Plan gil and steals around the fights that matter.",
      },
    ],
  },
];

// Optional special characters. Rendered as extra tabs after the core party.
const recruits = [
  {
    name: "Agrias",
    recruit: true,
    acquisition:
      "**Joins in Ch.2** — she guards Princess Ovelia as a guest, then becomes a permanent party member after the Chapter 2 (Lionel) events. One of your earliest and most reliable special units.",
    replaces: {
      who: "Felice",
      slot: "5th / flex slot",
      detail:
        "While Felice is still an under-leveled Arithmetician project, Agrias is a far stronger fifth deployment — reliable front-line damage from the moment she joins. Rotate Felice back in once her spell list is built (or for maps where calculated spells shine).",
    },
    meta: "Holy Knight · **Holy Sword** — ranged holy sword-waves",
    path: [{ label: "Holy Knight (fixed class)", now: true }],
    baseline:
      "**Signature:** her Holy Sword skills fire a sword-wave in a line, hitting at range and ignoring normal evasion — great for chipping distant or dodgy enemies.",
    tiles: [
      { type: "action", job: "Holy Knight", skill: "Stasis Sword", note: "Ranged sword-wave — reliable early damage" },
      { type: "action", job: "Holy Knight", skill: "Split Punch", note: "Ranged hit with a chance to Stop" },
      { type: "action", job: "Holy Knight", skill: "Crush Punch", note: "Ranged hit with a chance to inflict Death" },
      { type: "action", job: "Holy Knight", skill: "Lightning Stab", note: "Wider ranged sword-wave" },
      { type: "action", job: "Holy Knight", skill: "Holy Explosion", note: "Her strongest Holy Sword — a big holy burst" },
    ],
    notes: [
      "Give her the strongest Knight's Sword you can — Holy Sword damage scales with weapon power and her physical stats.",
      "She slots in as a second front-line bruiser next to Ramza; a physical support like Attack Boost suits her.",
      "Her skills are Holy-element: excellent versus undead, but anything that absorbs Holy will heal from them.",
      "**Roster shift:** When **Orlandeau** joins in Ch.4 he outclasses her and usually takes her slot — keep Agrias as a second Holy Sword, or a deliberate challenge pick.",
    ],
    gear: [
      { name: "Save the Queen", type: "weapon", when: "Ch.4 (Beowulf sidequest)", note: "Knight's Sword granting permanent Protect — excellent on her." },
      { name: "Excalibur", type: "weapon", when: "Ch.4", note: "Permanent Haste plus a Holy boost — arguably her best blade." },
      { name: "Grand Armor / Genji Armor", type: "armor", when: "late game", note: "Top heavy armour for a front-line Holy Knight." },
    ],
    braveFaith:
      "**Keep Brave high** — she's a physical attacker whose damage and reactions scale with Brave. Faith can stay moderate.",
  },
  {
    name: "Mustadio",
    recruit: true,
    acquisition:
      "**Joins in Ch.2** after the events in the clockwork city of Goug. A long-range gunner whose shots disable enemies.",
    replaces: {
      who: "",
      slot: "situational — ranged control",
      detail:
        "He doesn't push anyone out for good. Rotate him in over **Esdeline** (or the flex slot) for fights where disabling a boss at range beats melee theft — and keep him around permanently, since he's the key to the Goug machine sidequests.",
    },
    meta: "Machinist · **Aim/Snipe** — status-inflicting gunshots",
    path: [{ label: "Machinist (fixed class)", now: true }],
    baseline:
      "**Signature:** guns fire at long range for fixed damage that ignores evasion, and his targeted shots shut enemies down.",
    tiles: [
      { type: "action", job: "Machinist", skill: "Leg Aim", note: "Ranged shot that inflicts Immobilize (can't move)" },
      { type: "action", job: "Machinist", skill: "Arm Aim", note: "Ranged shot that inflicts Disable (can't act)" },
      { type: "action", job: "Machinist", skill: "Seal Evil", note: "Petrifies undead enemies outright" },
    ],
    notes: [
      "Leg Aim plus Arm Aim let you lock down a dangerous enemy from a safe distance — excellent control.",
      "Guns deal fixed damage at long range and ignore evasion, so he's reliable against dodgy foes.",
      "He's also the key to the Goug machine sidequests (Construct 8 and, eventually, Cloud).",
    ],
    gear: [
      { name: "Blaze Gun / Glacier Gun / Blast Gun", type: "weapon", when: "mid–late game", note: "Elemental guns fire a fixed-power elemental shot at long range." },
      { name: "Status-blocking accessory", type: "accessory", when: "mid game", note: "Keeps him acting freely from the back line." },
    ],
    braveFaith: "**Keep Brave high** for gun damage and reaction rate; his shots don't use Faith.",
  },
  {
    name: "Orlandeau",
    recruit: true,
    acquisition:
      "**Joins in Ch.4.** Cidolfus Orlandeau — the 'Thunder God' — arrives with almost every sword skill in the game already learned, and is widely considered the strongest unit in FFT.",
    replaces: {
      who: "Agrias",
      slot: "front-line physical",
      detail:
        "He does everything Agrias does — ranged Holy Sword — and adds HP/MP-draining Dark Sword, so he slides straight into her deployment slot. Keep Agrias only as a second Holy Sword, or bench Orlandeau on purpose if you want a harder game.",
    },
    meta: "Sword Saint · **all sword skills** (Holy Sword + Dark Sword)",
    path: [{ label: "Sword Saint (fixed class)", now: true }],
    baseline:
      "**Signature:** he combines Agrias's ranged Holy Sword with HP/MP-draining Dark Sword — enormous range, damage and self-sustain from the moment he joins.",
    tiles: [
      { type: "action", job: "Sword Saint", skill: "Night Sword", note: "Ranged sword-wave that drains HP to him — huge sustain" },
      { type: "action", job: "Sword Saint", skill: "Dark Sword", note: "Ranged hit that drains the target's MP" },
      { type: "action", job: "Sword Saint", skill: "Holy Explosion", note: "Big ranged holy burst from the Holy Sword set" },
      { type: "action", job: "Sword Saint", skill: "Lightning Stab", note: "Wide ranged sword-wave for multi-hits" },
    ],
    notes: [
      "He barely needs a build — hand him Excalibur or a strong Knight's Sword and he carries fights by himself.",
      "Night Sword makes him nearly unkillable: he heals for the damage he deals, at range.",
      "If you want a challenge, some players bench him precisely because he's so dominant.",
    ],
    gear: [
      { name: "Excalibur", type: "weapon", when: "Ch.4", note: "Permanent Haste and a Holy boost — his signature blade." },
      { name: "Grand Armor / Genji set", type: "armor", when: "late game", note: "Top heavy gear, though he rarely needs the bulk." },
    ],
    braveFaith:
      "**Keep Brave high** — his sword skills are physical, so Brave maximises damage. Faith is a non-issue for him.",
  },
  {
    name: "Beowulf",
    recruit: true,
    acquisition:
      "**Joins in a Ch.4 sidequest** (the Goland Coal City questline, alongside Reis). A Temple Knight who inflicts status ailments with sword magick at range.",
    replaces: {
      who: "",
      slot: "situational — status control",
      detail:
        "A flex control pick rather than a permanent starter. Swap him in over **Margery** on status-heavy maps where locking enemies down (Sleep, Confuse, Petrify) matters more than raw magick damage.",
    },
    meta: "Temple Knight · **Magick Sword** — ranged status infliction",
    path: [{ label: "Temple Knight (fixed class)", now: true }],
    baseline:
      "**Signature:** ranged sword spells that inflict Silence, Sleep, Confuse, Petrify and worse — a control specialist with high success rates.",
    tiles: [
      { type: "action", job: "Temple Knight", skill: "Sleep (sword magick)", note: "Puts an enemy to sleep at range" },
      { type: "action", job: "Temple Knight", skill: "Silence / Blind", note: "Shuts down casters and lowers enemy hit rates" },
      { type: "action", job: "Temple Knight", skill: "Confuse / Petrify", note: "Hard control — remove a dangerous enemy from the fight" },
      { type: "action", job: "Temple Knight", skill: "Spell Absorb / Life Drain", note: "Drain MP/HP from range for sustain" },
    ],
    notes: [
      "Use him to disable the enemy's scariest units before they get a turn.",
      "His status spells reach out at range and land reliably — great against a boss's escorts.",
      "Reis joins from the same sidequest, so finish it to get both.",
      "*Unverified:* exact Magick Sword ability names may differ in The Ivalice Chronicles — confirm in-game.",
    ],
    braveFaith:
      "Higher Faith improves his status-spell success and magickal range damage — keep it moderate-to-high, but mind the 100 cap.",
  },
  {
    name: "Reis",
    recruit: true,
    acquisition:
      "**Joins from the same Ch.4 sidequest as Beowulf.** She starts as a Holy Dragon and becomes a human **Dragoner** once the questline completes.",
    replaces: {
      who: "",
      slot: "additive — buffs / support",
      detail:
        "A bonus support unit; she doesn't replace a core member. Bring her for long attrition fights where Reraise and her stat buffs pay off over time.",
    },
    meta: "Dragoner · dragon breath + party buffs",
    path: [{ label: "Holy Dragon → Dragoner (fixed)", now: true }],
    baseline:
      "**Signature:** elemental dragon-breath attacks plus strong party buffs like Reraise and stat boosts.",
    tiles: [
      { type: "action", job: "Dragoner", skill: "Dragon breath (Fire/Ice/Thunder)", note: "Elemental area breath attacks" },
      { type: "action", job: "Dragoner", skill: "Dragon Spirit", note: "Grants Reraise (auto-revive) to an ally" },
      { type: "support", job: "Dragoner", skill: "Dragon-power buffs", note: "Boosts allies' offence and defence" },
    ],
    notes: [
      "A hybrid attacker/support — her buffs, especially Reraise, shine in long fights.",
      "*Unverified:* her exact ability list in The Ivalice Chronicles — confirm in-game.",
    ],
    braveFaith: "Keep Faith moderate so her magickal breath hits without leaving her too fragile.",
  },
  {
    name: "Construct 8",
    recruit: true,
    acquisition:
      "**Built in the Ch.4 Goug sidequest** (needs Mustadio and the machine-city questline). A mechanical unit with high HP and heavy physical hits — also known as Worker 8.",
    replaces: {
      who: "",
      slot: "additive — front-line tank",
      detail:
        "A bonus bruiser, strong the moment you build it. It can't grow, so bench it once late enemies outscale it — it isn't a permanent slot-holder.",
    },
    meta: "Automaton · high HP, physical hits — immune to most status",
    path: [{ label: "Steel Giant (fixed — no jobs)", now: true }],
    baseline:
      "**Signature:** a robot. It can't learn jobs or earn JP, but it has big HP, hits hard, and ignores most status effects.",
    tiles: [
      { type: "action", job: "Automaton", skill: "Compress / Destroy", note: "Heavy mechanical melee attacks" },
      { type: "reaction", job: "Automaton", skill: "Fixed innate kit", note: "It comes with its abilities — there's no JP to spend" },
    ],
    notes: [
      "It **can't be healed by White Magic** the normal way — repair it with items/Potions instead.",
      "No Brave or Faith to manage — a low-maintenance bruiser for a good while.",
      "It can't grow, so it falls off against high-tier late enemies, but it's strong when you first get it.",
    ],
    braveFaith: "Not applicable — as a machine it ignores Brave/Faith and shrugs off most status.",
  },
  {
    name: "Cloud",
    recruit: true,
    acquisition:
      "**Ch.4 hidden sidequest (very late, fully optional).** Finish the Goug machine questline, then buy a flower from the girl in **Zarghidas**; Cloud appears afterward. He needs the **Materia Blade** (found on a Ch.4 map) before his Limits are usable.",
    replaces: {
      who: "",
      slot: "additive — bonus unit",
      detail:
        "He arrives so late he's a novelty pick, not a replacement. Field him for fun once he has the Materia Blade equipped.",
    },
    meta: "Soldier · **Limit** — huge damage, long charge times",
    path: [{ label: "Soldier (fixed class)", now: true }],
    baseline:
      "**Signature:** Final Fantasy VII Limit Breaks — enormous damage, but every Limit has a long charge time and whiffs without the Materia Blade equipped.",
    tiles: [
      { type: "action", job: "Soldier", skill: "Braver", note: "First Limit — single-target burst" },
      { type: "action", job: "Soldier", skill: "Cross-Slash / Blade Beam", note: "Bigger hits as you spend JP" },
      { type: "action", job: "Soldier", skill: "Climhazzard / Meteorain", note: "High-damage area Limits" },
      { type: "action", job: "Soldier", skill: "Finishing Touch / Omnislash", note: "Top-tier Limits — devastating but slow to charge" },
    ],
    notes: [
      "**Get the Materia Blade first** — without it his Limits miss almost every time.",
      "Pair him with **Haste** and **Swiftspell** to offset the brutal charge times.",
      "He arrives so late he's really a fun bonus unit rather than a core pick.",
    ],
    braveFaith:
      "**Keep Brave high** — his Limits are physical and scale with Brave. Faith is irrelevant to them.",
  },
];
