'use strict';
// Builds the full icon kit for every VigilTech product.  node tools/build-icons.js [id ...]
const fs = require('fs');
const path = require('path');
const os = require('os');
const { renderIcon } = require('./icons/engine.js');
const { PRODUCTS, REPOS } = require('./icons/products.js');
const PL = require('./icons/platform.js');
const ROOT = path.join(__dirname, '..');
const only = process.argv.slice(2), list = only.length ? PRODUCTS.filter((p) => only.includes(p.id)) : PRODUCTS;
const put = (rel, buf) => { const f = path.join(ROOT, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, Buffer.from(buf)); };
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vigilicons-'));
let icnsOk = true;
for (const p of list) {
  const dir = 'products/' + p.id + '/', cache = {}, full = (variant, n) => cache[variant + n] || (cache[variant + n] = renderIcon(p, variant, n));
  // full-bleed masters: iOS, Android, web, stores
  const rose = full('rose', 1024), night = full('night', 1024);
  put(dir + p.id + '-rose-1024.png', PL.png({ w: 1024, h: 1024, toRGBA: () => rose.toRGBA(false) }));
  put(dir + p.id + '-night-1024.png', PL.png({ w: 1024, h: 1024, toRGBA: () => night.toRGBA(false) }));
  // desktop (macOS, Windows, Linux): squircle with margin and shadow, natively drawn then reduced
  const app = PL.desktop((n) => full('rose', n), 1024), sizes = [1024, 512, 256, 128, 64, 48, 32, 16], pngs = {};
  for (const s of sizes) { const cv = s === 1024 ? app : s >= 128 ? PL.resample(app, s) : PL.resample(PL.desktop((n) => full('rose', n), 256, { shadow: false, art: 0.96 }), s); pngs[s] = PL.png(cv); put(dir + 'desktop/' + p.id + '-' + s + '.png', pngs[s]); }
  put(dir + 'desktop/' + p.id + '.ico', PL.ico([16, 32, 48, 64, 128, 256].map((s) => ({ size: s, png: Buffer.from(pngs[s]) }))));
  if (icnsOk) icnsOk = PL.icns(path.join(ROOT, dir + 'desktop/' + p.id + '.icns'), pngs, tmp);
  // web: favicon, apple touch icon, PWA (maskable keeps the glyph inside the safe zone)
  const fav = PL.squircleFill(PL.resample(rose, 256));
  put(dir + 'web/favicon-16.png', PL.png(PL.resample(fav, 16))); put(dir + 'web/favicon-32.png', PL.png(PL.resample(fav, 32)));
  put(dir + 'web/favicon.ico', PL.ico([16, 32, 48].map((s) => ({ size: s, png: Buffer.from(PL.png(PL.resample(fav, s))) }))));
  put(dir + 'web/apple-touch-icon.png', PL.png(PL.resample(rose, 180)));
  put(dir + 'web/icon-192.png', PL.png(PL.resample(rose, 192))); put(dir + 'web/icon-512.png', PL.png(PL.resample(rose, 512))); put(dir + 'web/maskable-512.png', PL.png(PL.resample(rose, 512)));
  // android launcher (square, the system rounds it) and the Play Store icon
  for (const [d, s] of Object.entries({ mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 })) put(dir + 'android/mipmap-' + d + '/ic_launcher.png', PL.png(PL.resample(rose, s)));
  put(dir + 'android/play-store-512.png', PL.png(PL.resample(rose, 512)));
  console.log(p.id);
}
if (!only.length) {
  const out = PRODUCTS.map((p) => ({ id: p.id, name: p.name, folder: 'products/' + p.id, repos: Object.keys(REPOS).filter((r) => REPOS[r].includes(p.id)) }));
  fs.writeFileSync(path.join(ROOT, 'products.json'), JSON.stringify(out, null, 1));
  fs.writeFileSync(path.join(ROOT, 'repos.json'), JSON.stringify(Object.fromEntries(Object.entries(REPOS).map(([r, ids]) => [r, ids.map((id) => ({ id, name: PRODUCTS.find((p) => p.id === id).name, folder: 'products/' + id }))])), null, 1));
}
console.log(icnsOk ? 'icns written' : 'icns skipped (needs macOS iconutil)');
fs.rmSync(tmp, { recursive: true, force: true });
