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
    "Current roster around levels 5–6. Each grid below is the skill learning order for the next ~10 levels — read tiles left to right, top to bottom. Later tiles push toward each character's build-defining endgame job. Job names follow this version's War of the Lions–style naming (Rend, not Break; Arithmetician, not Calculator).",
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
    meta: "Squire → Knight → Monk → **Samurai** (endgame) · Level 6",
    path: [
      { label: "Squire (Lv.2 → Knight)" },
      { label: "Knight → Lv.4", now: true },
      { label: "Monk → Lv.5" },
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
      { type: "support", job: "Monk", skill: "Martial Arts", note: "Boosts unarmed damage while banking Monk JP (verify exact name)" },
      { type: "action", job: "Samurai", skill: "Iaido: Asura", note: "First Draw Out — needs a katana equipped to fire (verify unlock level)" },
      { type: "action", job: "Samurai", skill: "Iaido: Kikuichimonji", note: "Line-piercing Draw Out — hits multiple enemies in a row; his signature damage" },
      { type: "action", job: "Samurai", skill: "Iaido: Masamune", note: "Grants Haste + Regen to allies — TODO/verify name & effect this version" },
      { type: "reaction", job: "Samurai", skill: "Blade Grasp", note: "Negates many physical hits (Brave-based) — strong endgame reaction (verify)" },
      { type: "movement", job: "Ninja / Time Mage", skill: "Move +3 / Teleport", note: "Move+3 via Thief/Ninja, or Teleport via Time Mage — TODO/verify best route" },
    ],
    notes: [
      "**Job-level gates:** Knight → Lv.3 unlocks Monk; keep Knight to Lv.4 for Samurai. Monk → Lv.5, then Samurai unlocks at Knight Lv.4 + Monk Lv.5 + Dragoon Lv.2 — don't leave a job until you hit its target level.",
      "Samurai's Dragoon Lv.2 requirement is a side-detour: Archer Lv.3 → Thief Lv.4 → Dragoon Lv.2. Bank that JP before expecting Samurai to open.",
      "Secondary skillset: keep Item equipped until magic cross-skills are further along elsewhere.",
      "Reaction: start banking JP toward Counter once available.",
      "Rend Accessory and Rend Mind/Magic are lowest priority — save for later.",
      "**Endgame identity:** Samurai Iaido/Draw Out is his signature damage and only works with a strong katana equipped — keep his best katana on at all times.",
      "Sequencing: Monk first (Counter + Chakra + Martial Arts) as a bridge, then Samurai for Iaido.",
      "TODO/verify: exact Iaido skill list, unlock levels, and whether Move+3 (Ninja) or Teleport (Time Mage) is the more practical movement pickup in Ivalice Chronicles.",
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
      { type: "action", job: "White Mage", skill: "Esuna", note: "Status cleanup — important once enemies inflict ailments" },
      { type: "action", job: "White Mage", skill: "Curaga", note: "Strong/group heal tier — endgame healing backbone" },
      { type: "action", job: "White Mage", skill: "Arise", note: "Second-tier Raise — revives with full HP (verify name: Raise 2 / Arise)" },
      { type: "action", job: "White Mage", skill: "Reraise", note: "Pre-casts auto-revive on an ally — huge survivability" },
      { type: "action", job: "White Mage", skill: "Regen", note: "Sustained per-turn healing that frees up his actions" },
      { type: "action", job: "White Mage", skill: "Holy", note: "White Mage's nuke — optional offense once heals are locked (verify unlock)" },
      { type: "action", job: "Time Mage", skill: "Haste (secondary)", note: "Layer Time Magic for self-sufficiency — Haste himself and allies" },
      { type: "reaction", job: "Mystic / Chemist", skill: "Regenerator", note: "HP-sustain reaction — adds Regen when hurt; TODO/verify source job & name" },
      { type: "movement", job: "Time Mage", skill: "Teleport", note: "Reachable via Time Mage; otherwise fall back to Move +3" },
    ],
    notes: [
      "**Job-level gates:** White Mage has no level gate — build its tree freely. But Time Mage is NOT reached via White Mage; it unlocks from Black Mage Lv.3, so run a short Black Mage → Lv.3 detour first (that's also what makes Teleport reachable).",
      "Secondary skillset: Item, so he can throw Potions/Phoenix Downs even if Silenced.",
      "Primary healer — prioritize his JP over most others until Cure/Raise are locked in.",
      "**Endgame core:** finish White Mage — Curaga, Arise, Reraise, Regen — before spreading JP into Time Magic.",
      "Time Magic is a secondary layer for self-Haste and, ideally, Teleport movement.",
      "TODO/verify: exact names (Raise 2 vs Arise), Holy's unlock, and the best MP/HP-sustain reaction available in Ivalice Chronicles.",
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
      { type: "action", job: "Black Mage", skill: "Bolt", note: "Covers water/metal-armor weakness" },
      { type: "action", job: "Black Mage", skill: "Ice", note: "Rounds out elemental coverage" },
      { type: "action", job: "Black Mage", skill: "Fira", note: "Upgraded Fire — pushes toward Lv.3" },
      { type: "action", job: "Black Mage", skill: "Thundara", note: "Upgraded Bolt" },
      { type: "action", job: "Black Mage", skill: "Blizzara", note: "Upgraded Ice — near Lv.3, unlocks Time Mage" },
      { type: "action", job: "Time Mage", skill: "Haste", note: "Extra actions for allies — best support effect in the game" },
      { type: "action", job: "Time Mage", skill: "Slow", note: "Same effect in reverse on dangerous enemies" },
      { type: "support", job: "Time Mage", skill: "Swiftness", note: "Halves cast time — huge long-term value" },
      { type: "action", job: "Time Mage", skill: "Stop", note: "Finish Time Mage — freezes an enemy's turns entirely" },
      { type: "action", job: "Time Mage", skill: "Quick", note: "Grants an instant extra turn — top-tier tempo (verify unlock)" },
      { type: "action", job: "Summoner", skill: "Shiva / Ramuh / Ifrit", note: "Elemental AoE summon trio — Summoner unlocks off Black/Time progress" },
      { type: "action", job: "Summoner", skill: "Titan", note: "Wide earth-element AoE — strong mid-tier nuke" },
      { type: "action", job: "Summoner", skill: "Bahamut", note: "Big non-elemental AoE — core endgame damage" },
      { type: "action", job: "Summoner", skill: "Odin / Leviathan", note: "High-tier AoE finisher — TODO/verify top summon & unlock level" },
      { type: "action", job: "Summoner", skill: "Golem", note: "Party-wide physical damage barrier — protects fragile casters" },
      { type: "support", job: "Summoner / Mystic", skill: "Half of MP", note: "Halves MP cost so she can chain summons — TODO/verify exact name" },
    ],
    notes: [
      "**Job-level gates:** Black Mage → Lv.3 unlocks Time Mage; Time Mage → Lv.3 unlocks Summoner. Hit each target level before switching — leaving early just locks you out of the next job.",
      "Secondary: Item for now; swap to White Magic later for backup Cure/Raise.",
      "Skip Poison/Death-line Black Magic — low accuracy early, not worth the JP yet.",
      "After Haste/Slow/Swiftness: Reflect and Stop are the next Time Mage targets.",
      "**Endgame identity:** nuke + turn-order control — finish Time Mage (Stop/Quick) while building Summoner AoE.",
      "**Fragility warning:** she'll be a priority kill target — lean on Golem and Half of MP to keep her casting.",
      "TODO/verify: Summoner unlock requirements, the strongest summon (Bahamut vs Odin/Zodiac), and the exact 'Half of MP' name in Ivalice Chronicles.",
    ],
  },
  {
    name: "Esdeline",
    meta: "Archer → Thief → **Ninja** (endgame) · Level 5",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Archer → Lv.4", now: true },
      { label: "Thief → Lv.5" },
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
      { type: "movement", job: "Thief", skill: "Move +3", note: "Top-tier mobility — reach and reposition before anyone else" },
      { type: "action", job: "Thief", skill: "Steal Weapon", note: "Disarms enemies while adding utility (verify best Steal picks)" },
      { type: "support", job: "Ninja", skill: "Two Swords", note: "Key pickup — dual-wield for two attacks per turn; her damage core" },
      { type: "action", job: "Ninja", skill: "Throw", note: "Ranged option that scales with thrown gear (verify unlock)" },
      { type: "reaction", job: "Thief / Ninja", skill: "Vigilance", note: "Reaction to stay ready between turns — TODO/verify best reaction pick" },
    ],
    notes: [
      "**Job-level gates:** Archer → Lv.3 unlocks Thief; keep Archer to Lv.4 for Ninja. Thief → Lv.5, then Ninja unlocks at Archer Lv.4 + Thief Lv.5 + Geomancer Lv.2 — don't leave a job until you hit its target level.",
      "Ninja's Geomancer Lv.2 requirement is a hidden detour: Knight Lv.3 → Monk Lv.4 → Geomancer Lv.2. Bank that JP before expecting Ninja to open.",
      "Secondary: Item is a safe default for now.",
      "Skip Charge/Aim +6 and above for a long while — too slow, targets move or die first.",
      "Longer-term: good future Thief/Ninja candidate given her ranged/physical foundation.",
      "**Endgame identity:** fastest, hardest-hitting physical unit — Thief for Move+3/Steal, then Ninja for Two Swords.",
      "Carry **Concentration** (already learned on Archer) as her support so dual-wield attacks don't miss.",
      "TODO/verify: Ninja unlock path, the exact 'Two Swords' name, and which Thief steals are worth the JP in Ivalice Chronicles.",
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
      { type: "action", job: "Black Mage", skill: "Fire / Bolt / Ice", note: "Move to Black Mage next, base elemental trio" },
      { type: "action", job: "Black Mage", skill: "Fira / Thundara / Blizzara", note: "Push toward Black Mage Lv.5 — next major milestone" },
      { type: "action", job: "White Mage", skill: "Holy", note: "Learn BEFORE Calculator — becomes a math-targeted nuke via Arithmetics" },
      { type: "action", job: "Black Mage", skill: "Flare", note: "Strongest single-target Black Magic — devastating once Calc-triggered" },
      { type: "action", job: "Black Mage", skill: "Death", note: "Calc can sweep matching units — high value (verify accuracy vs bosses)" },
      { type: "action", job: "Time Mage", skill: "Haste", note: "Mass-Haste allies in one Calc cast — learn before Calculator" },
      { type: "action", job: "Time Mage", skill: "Don't Act / Immobilize", note: "Lock down every matching enemy via Calc — TODO/verify exact names" },
      { type: "action", job: "Mystic", skill: "Silence / Sleep / Petrify-line", note: "Wide status sweeps once Calc-triggered — pick per fight (verify names)" },
      { type: "action", job: "Arithmetician", skill: "Arithmetics (Calculation)", note: "The payoff — triggers any already-learned spell by CT/Level/Height/Prime math" },
    ],
    notes: [
      "**Job-level gates:** Arithmetician needs White Mage Lv.5 + Black Mage Lv.5 + Time Mage Lv.4 + Mystic Lv.4 — hit each target level before moving on. (Mystic itself needs White Mage Lv.3 and Time Mage needs Black Mage Lv.3, both satisfied by the Lv.5 pushes.)",
      "After Black Mage Lv.5: Time Mage — Haste, Slow, Reflect, Stop — push to Lv.4.",
      "Then Mystic (unlocks at White Mage Lv.3, already satisfied): Blind, Poison, Silence-line skills, push to Lv.4.",
      "Arithmetician unlocks once White Mage 5 / Black Mage 5 / Time Mage 4 / Mystic 4 are all satisfied. Keep Item equipped as secondary throughout — she'll be fragile getting there.",
      "**Critical:** Arithmetics only triggers spells she has ALREADY learned on other jobs — her endgame power scales with how deep her learned spell list is before she reaches Calculator.",
      "Best Calc payloads to bank during the WM5/BM5/TM4/Mystic4 grind: Holy, Flare, Death, Haste, and lockdown status (Don't Act/Immobilize, Sleep/Silence) — learn them on the way, not after.",
      "Note: Calc-triggered spells still cost MP and ignore normal range, so watch friendly fire on shared multiples. TODO/verify exact Ivalice Chronicles spell names/costs.",
    ],
  },
];
