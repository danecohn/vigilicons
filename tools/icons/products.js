'use strict';
// One icon per VigilTech product, repo and project. Reuses the glyphs from the iOS pack where they fit and adds the ones that were missing.
const { RAD } = require('./engine.js');
const vigil = require('./vigil.js'), apple = require('./apple.js');
const pick = (list, id) => list.find((d) => d.id === id);
const pt = (a, r, cx = 0, cy = 0) => [cx + r * Math.cos(a * RAD), cy + r * Math.sin(a * RAD)];
const P = [];
const reuse = (id, name, bg, src) => { const d = pick(src, id); if (!d) throw new Error('missing glyph ' + id); P.push({ id: id === 'vigiltech' ? 'vigiltech' : id, name, bg: bg || d.bg, draw: d.draw }); };
const add = (id, name, bg, draw) => P.push({ id, name, bg, draw });

reuse('vigiltech', 'VigilTech', 'rose', vigil); reuse('mail', 'Vigil Mail', 'rose', vigil); reuse('calendar', 'Vigil Calendar', 'deep', vigil); reuse('drive', 'Vigil Drive', 'plum', vigil);
reuse('social', 'Vigil Social', 'magenta', vigil); reuse('lookout', 'Vigil Lookout', 'wine', vigil); reuse('notes', 'Vigil Notes', 'rose', vigil);
reuse('producer', 'Vigil Game Producer', 'magenta', vigil); reuse('engine', 'Vigil Engine', 'plum', vigil); reuse('render', 'Vigil Render', 'deep', vigil);
reuse('sprite', 'Vigil Sprite', 'rose', vigil); reuse('box', 'Vigil Box', 'wine', vigil); reuse('assets', 'Vigil Assets', 'plum', vigil); reuse('give', 'Vigil Give', 'deep', vigil);
reuse('journal', 'Vigil Journal', 'deep', apple);

add('search', 'Vigil Search', 'plum', (g) => { g.ring(-0.1, -0.1, 0.32, 0.12, 'm'); g.ln(0.14, 0.14, 0.46, 0.46, 0.15, 'm'); g.star(-0.1, -0.1, 0.15, 'a'); });
add('office', 'Vigil Office', 'rose', (g) => { for (const [x, y, t] of [[-0.25, -0.25, 'm'], [0.25, -0.25, 'a'], [-0.25, 0.25, 'a'], [0.25, 0.25, 'm']]) g.rr(x, y, 0.21, 0.21, 0.07, t); g.star(0.25, 0.25, 0.1, 'c'); g.star(-0.25, -0.25, 0.1, 'c'); });
add('write', 'Vigil Write', 'magenta', (g) => { g.rr(-0.08, 0, 0.36, 0.5, 0.08, 'm'); for (const y of [-0.28, -0.12, 0.04, 0.2]) g.ln(-0.28, y, 0.1, y, 0.05, 'c'); g.rr(0.28, 0.2, 0.07, 0.3, 0.03, 'a', 40); g.poly([[0.12, 0.5], [0.2, 0.34], [0.3, 0.44]], 'a'); });
add('sheets', 'Vigil Sheets', 'deep', (g) => { g.rr(0, 0, 0.5, 0.5, 0.1, 'm'); g.rr(0, -0.32, 0.5, 0.1, 0.0, 'a'); for (const x of [-0.17, 0.17]) g.ln(x, -0.5, x, 0.5, 0.04, 'c'); for (const y of [-0.08, 0.16]) g.ln(-0.5, y, 0.5, y, 0.04, 'c'); });
add('slides', 'Vigil Slides', 'plum', (g) => { g.rr(0, -0.1, 0.56, 0.36, 0.08, 'm'); g.star(0, -0.1, 0.18, 'c'); g.ln(0, 0.26, 0, 0.46, 0.08, 'm'); g.ln(-0.24, 0.52, 0.24, 0.52, 0.08, 'm'); });
add('prompter', 'Vigil Prompter', 'wine', (g) => { g.rr(0, 0, 0.46, 0.56, 0.1, 'm'); [[-0.34, 0.3], [-0.2, 0.34], [-0.06, 0.24], [0.08, 0.32], [0.22, 0.28]].forEach(([y, w], i) => g.ln(-0.28, y, -0.28 + w * 1.4, y, 0.06, i === 2 ? 'a' : 'c')); });
add('mind', 'Vigil Mind', 'magenta', (g) => { for (let i = 0; i < 5; i++) { const [x, y] = pt(i * 72 - 90, 0.42); g.ln(0, 0, x, y, 0.05, 'm'); } for (let i = 0; i < 5; i++) { const [x, y] = pt(i * 72 - 90, 0.42); g.disc(x, y, 0.1, 'm'); } g.disc(0, 0, 0.17, 'a'); g.star(0, 0, 0.1, 'm'); });
add('rentals', 'Vigil Rentals', 'rose', (g) => { g.poly([[0, -0.58], [-0.62, 0.0], [0.62, 0.0]], 'm', 0.05); g.rr(0, 0.22, 0.42, 0.3, 0.06, 'm'); g.ring(0, 0.14, 0.08, 0.05, 'c'); g.ln(0, 0.2, 0, 0.4, 0.05, 'c'); g.ln(0, 0.34, 0.08, 0.34, 0.04, 'c'); });
add('banshees', 'Vigil Banshees', 'plum', (g) => { g.disc(0, 0, 0.12, 'a'); for (const r of [0.28, 0.42, 0.56]) { g.arc(0, 0, r, -45, 45, 0.07, 'm'); g.arc(0, 0, r, 135, 225, 0.07, 'm'); } });
add('os', 'Vigil OS', 'deep', (g) => { g.rrs(0, 0, 0.56, 0.44, 0.1, 0.08, 'm'); g.ln(-0.56, -0.2, 0.56, -0.2, 0.06, 'm'); g.pl([[-0.3, -0.02], [-0.12, 0.1], [-0.3, 0.22]], 0.07, 'a'); g.ln(-0.04, 0.24, 0.2, 0.24, 0.07, 'a'); });
add('venture', 'Vigil Venture', 'magenta', (g) => { g.poly([[-0.62, 0.42], [-0.12, -0.3], [0.18, 0.1], [0.38, -0.12], [0.64, 0.42]], 'm'); g.star(0.3, -0.44, 0.14, 'a'); g.poly([[-0.12, -0.3], [-0.24, -0.1], [0.0, -0.14]], 'c'); });
add('icons', 'Vigil Icons', 'rose', (g) => { for (const [x, y] of [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25]]) g.rr(x, y, 0.2, 0.2, 0.08, 'm'); g.rr(0.25, 0.25, 0.2, 0.2, 0.08, 'a'); g.star(0.25, 0.25, 0.1, 'm'); });
add('iosicons', 'Vigil iOS Icons', 'wine', (g) => { g.rrs(0, 0, 0.34, 0.58, 0.12, 0.08, 'm'); for (let j = 0; j < 3; j++) for (let i = 0; i < 2; i++) g.rr(-0.1 + i * 0.2, -0.28 + j * 0.2, 0.065, 0.065, 0.025, (i + j) % 3 === 0 ? 'a' : 'm'); });
add('account', 'Vigil Account', 'plum', (g) => { g.ring(0, 0, 0.54, 0.07, 'm'); g.disc(0, -0.12, 0.16, 'm'); g.ell(0, 0.32, 0.28, 0.2, 'm'); g.star(0.4, -0.4, 0.1, 'a'); });

/** Which repository uses which icon. Aliases share an icon on purpose. */
const REPOS = {
  AltStackMail: ['mail', 'calendar'], cohnemail: ['mail'], AltStackWarehouse: ['drive'], AltStackSearch: ['search'], Artemisearch: ['search'],
  amerikasocial: ['social'], amerikaios: ['social'], amerikaandroid: ['social'], AmerikaWindows: ['social'], AmerikaLinux: ['social'], amerikamacos: ['social'],
  AmerikaOffice: ['office', 'write', 'sheets', 'slides'], AmerikaEngine: ['engine'], AmerikaRender: ['render'], AmerikaSprite: ['sprite'], AmerikaBox: ['box'],
  GameProducer: ['producer'], lookout: ['lookout'], artemisprompter: ['prompter'], artemismind: ['mind'], zephyrrentals: ['rentals'], 'F-M-Journal': ['journal'],
  banshees: ['banshees'], MakOS: ['os'], AmerikaVenture: ['venture'], cohnsoftassets: ['assets'], ios27icons: ['iosicons'], vigilicons: ['icons'], vigilmacos: ['os'],
};
module.exports = { PRODUCTS: P, REPOS };
