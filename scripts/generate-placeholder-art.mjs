// One-off generator for original, brand-consistent procedural SVG cover art.
// Used for package/blog/fleet images where a photographic asset isn't
// available (e.g. image-generation credits were exhausted for this pass).
// Run with: node scripts/generate-placeholder-art.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public", "images");

const PALETTES = [
  ["#0b1226", "#1f2c4d", "#f5a623"],
  ["#1f2c4d", "#3d5280", "#fbbf24"],
  ["#141d38", "#2c3e66", "#ff6b35"],
  ["#0b1226", "#2c3e66", "#1c6ff2"],
  ["#1f2c4d", "#0b1226", "#fcd34d"],
];

function pick(arr, i) {
  return arr[i % arr.length];
}

/** icon builders — simple, flat, line-based glyphs in white/amber */
const ICONS = {
  temple: (c) => `
    <g transform="translate(300,150)" fill="none" stroke="${c}" stroke-width="4" stroke-linejoin="round">
      <polygon points="0,-46 46,-4 -46,-4" fill="${c}" opacity="0.9" />
      <rect x="-34" y="-4" width="68" height="46" fill="${c}" opacity="0.75" />
      <rect x="-10" y="16" width="20" height="26" fill="#0b1226" opacity="0.5" />
      <line x1="-46" y1="42" x2="46" y2="42" />
    </g>`,
  mountain: (c) => `
    <g transform="translate(300,160)" fill="${c}" opacity="0.85">
      <polygon points="-90,40 -30,-40 20,10 60,-30 110,40" />
      <circle cx="70" cy="-55" r="16" fill="#fbbf24" opacity="0.9" />
    </g>`,
  vineyard: (c) => `
    <g transform="translate(300,150)" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M-100,40 Q-60,-10 -20,40" />
      <path d="M-20,40 Q20,-10 60,40" />
      <path d="M60,40 Q100,-10 140,40" />
      <circle cx="-100" cy="40" r="6" fill="${c}" />
      <circle cx="-20" cy="40" r="6" fill="${c}" />
      <circle cx="60" cy="40" r="6" fill="${c}" />
      <circle cx="140" cy="40" r="6" fill="${c}" />
    </g>`,
  city: (c) => `
    <g transform="translate(230,120)" fill="${c}" opacity="0.85">
      <rect x="0" y="40" width="34" height="90" />
      <rect x="44" y="10" width="34" height="120" />
      <rect x="88" y="60" width="34" height="70" />
      <rect x="132" y="-10" width="34" height="140" />
    </g>`,
  wave: (c) => `
    <g transform="translate(300,170)" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round">
      <path d="M-140,20 Q-110,-10 -80,20 T-20,20 T40,20 T100,20 T160,20" />
      <path d="M-140,45 Q-110,15 -80,45 T-20,45 T40,45 T100,45 T160,45" opacity="0.6" />
    </g>`,
  road: (c) => `
    <g transform="translate(300,120)">
      <polygon points="-10,140 10,140 55,-20 -55,-20" fill="${c}" opacity="0.55" />
      <line x1="0" y1="120" x2="0" y2="-10" stroke="#fbbf24" stroke-width="6" stroke-dasharray="16 12" />
    </g>`,
  lake: (c) => `
    <g transform="translate(300,150)">
      <ellipse cx="0" cy="40" rx="150" ry="26" fill="${c}" opacity="0.5" />
      <polygon points="-60,40 -20,-40 20,40" fill="${c}" opacity="0.85" />
      <polygon points="0,40 40,-20 80,40" fill="${c}" opacity="0.7" />
    </g>`,
  document: (c) => `
    <g transform="translate(300,150)" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="-60" y="-70" width="120" height="140" rx="10" />
      <line x1="-36" y1="-36" x2="36" y2="-36" />
      <line x1="-36" y1="-10" x2="36" y2="-10" />
      <line x1="-36" y1="16" x2="10" y2="16" />
    </g>`,
  car: (c) => `
    <g transform="translate(300,170)">
      <ellipse cx="0" cy="46" rx="150" ry="14" fill="#000" opacity="0.18" />
      <path d="M-120,20 Q-110,-28 -70,-34 L-30,-34 Q-10,-52 30,-52 L60,-52 Q90,-52 100,-30 L120,-20 Q140,-16 140,4 L140,20 Z" fill="${c}" opacity="0.92" />
      <path d="M-58,-34 L-38,-50 L44,-50 L58,-34 Z" fill="#0b1226" opacity="0.55" />
      <circle cx="-70" cy="24" r="24" fill="#0b1226" />
      <circle cx="-70" cy="24" r="9" fill="${c}" />
      <circle cx="72" cy="24" r="24" fill="#0b1226" />
      <circle cx="72" cy="24" r="9" fill="${c}" />
      <rect x="-140" y="16" width="18" height="8" rx="3" fill="#fbbf24" opacity="0.9" />
    </g>`,
};

function svgTemplate({ palette, icon }) {
  const [c1, c2, accent] = palette;
  const id = Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
  </defs>
  <rect width="600" height="300" fill="url(#g-${id})" />
  <circle cx="520" cy="40" r="70" fill="${accent}" opacity="0.12" />
  <circle cx="60" cy="270" r="90" fill="${accent}" opacity="0.10" />
  ${ICONS[icon](accent)}
</svg>`;
}

const items = [
  // Fleet — used as reliable local fallbacks (no external hotlinking)
  { file: "fleet/hatchback.svg", icon: "car", palette: pick(PALETTES, 0) },
  { file: "fleet/sedan.svg", icon: "car", palette: pick(PALETTES, 1) },
  { file: "fleet/premium-sedan.svg", icon: "car", palette: pick(PALETTES, 3) },
  { file: "fleet/suv.svg", icon: "car", palette: pick(PALETTES, 2) },
  { file: "fleet/muv.svg", icon: "car", palette: pick(PALETTES, 4) },
  { file: "fleet/tempo-traveller.svg", icon: "road", palette: pick(PALETTES, 2) },
  // Packages
  { file: "packages/jyotirlinga.svg", icon: "temple", palette: pick(PALETTES, 0) },
  { file: "packages/ashtavinayak.svg", icon: "temple", palette: pick(PALETTES, 1) },
  { file: "packages/shirdi.svg", icon: "temple", palette: pick(PALETTES, 2) },
  { file: "packages/nashik-trimbakeshwar.svg", icon: "vineyard", palette: pick(PALETTES, 3) },
  { file: "packages/mumbai.svg", icon: "city", palette: pick(PALETTES, 4) },
  { file: "packages/wine-tour.svg", icon: "vineyard", palette: pick(PALETTES, 0) },
  { file: "packages/lonavala.svg", icon: "mountain", palette: pick(PALETTES, 1) },
  { file: "packages/mahabaleshwar.svg", icon: "mountain", palette: pick(PALETTES, 2) },
  { file: "packages/goa.svg", icon: "wave", palette: pick(PALETTES, 3) },
  // Blog covers
  { file: "blog/outstation-checklist.svg", icon: "document", palette: pick(PALETTES, 0) },
  { file: "blog/one-way-vs-round-trip.svg", icon: "road", palette: pick(PALETTES, 1) },
  { file: "blog/nashik-road-trips.svg", icon: "mountain", palette: pick(PALETTES, 2) },
  { file: "blog/mumbai-airport-guide.svg", icon: "city", palette: pick(PALETTES, 3) },
  { file: "blog/shirdi-guide.svg", icon: "temple", palette: pick(PALETTES, 4) },
  { file: "blog/family-road-trip.svg", icon: "road", palette: pick(PALETTES, 0) },
  { file: "blog/pune-weekend-drives.svg", icon: "lake", palette: pick(PALETTES, 1) },
  { file: "blog/fare-calculation.svg", icon: "document", palette: pick(PALETTES, 2) },
];

for (const item of items) {
  const outPath = join(publicDir, item.file);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, svgTemplate(item), "utf8");
  console.log("wrote", item.file);
}
