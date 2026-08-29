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
    "Current roster around levels 5–6. Each grid below is the skill learning order for the next ~10 levels — read tiles left to right, top to bottom. Job names follow this version's War of the Lions–style naming (Rend, not Break; Arithmetician, not Calculator).",
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
    meta: "Squire → **Knight** · Level 6",
    path: [
      { label: "Squire" },
      { label: "Knight", now: true },
      { label: "Monk / Ninja (later)" },
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
    ],
    notes: [
      "Secondary skillset: keep Item equipped until magic cross-skills are further along elsewhere.",
      "Reaction: start banking JP toward Counter once available.",
      "Rend Accessory and Rend Mind/Magic are lowest priority — save for later.",
    ],
  },
  {
    name: "Orrick",
    meta: "Squire → Chemist → **White Mage** · Level 5",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Chemist (brief)" },
      { label: "White Mage", now: true },
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
    ],
    notes: [
      "Secondary skillset: Item, so he can throw Potions/Phoenix Downs even if Silenced.",
      "Primary healer — prioritize his JP over most others until Cure/Raise are locked in.",
    ],
  },
  {
    name: "Margery",
    meta: "Squire Lv.4 / Black Mage Lv.2 → **Black Mage → Time Mage**",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Black Mage (to Lv.3)", now: true },
      { label: "Time Mage" },
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
    ],
    notes: [
      "Secondary: Item for now; swap to White Magic later for backup Cure/Raise.",
      "Skip Poison/Death-line Black Magic — low accuracy early, not worth the JP yet.",
      "After Haste/Slow/Swiftness: Reflect and Stop are the next Time Mage targets.",
    ],
  },
  {
    name: "Esdeline",
    meta: "Squire → **Archer** · Level 5",
    path: [
      { label: "Squire (finish baseline)" },
      { label: "Archer", now: true },
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
    ],
    notes: [
      "Secondary: Item is a safe default for now.",
      "Skip Charge/Aim +6 and above for a long while — too slow, targets move or die first.",
      "Longer-term: good future Thief/Ninja candidate given her ranged/physical foundation.",
    ],
  },
  {
    name: "Felice",
    meta: "Long build → **Arithmetician (Calculator)**",
    path: [
      { label: "Chemist", now: true },
      { label: "White Mage Lv.5" },
      { label: "Black Mage Lv.5" },
      { label: "Time Mage Lv.4" },
      { label: "Mystic Lv.4" },
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
    ],
    notes: [
      "After Black Mage Lv.5: Time Mage — Haste, Slow, Reflect, Stop — push to Lv.4.",
      "Then Mystic (unlocks at White Mage Lv.3, already satisfied): Blind, Poison, Silence-line skills, push to Lv.4.",
      "Arithmetician unlocks once White Mage 5 / Black Mage 5 / Time Mage 4 / Mystic 4 are all satisfied. Keep Item equipped as secondary throughout — she'll be fragile getting there.",
    ],
  },
];
