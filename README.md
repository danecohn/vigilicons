# VigilTech icons

An icon for every VigilTech product, repo and project: mail, calendar, drive, search, social, the office suite (Write, Sheets, Slides), the game tools, and the rest. Free software, GNU GPL v3.

Each product has a complete kit in `products/<id>/`:

| Path | For |
| --- | --- |
| `<id>-rose-1024.png`, `<id>-night-1024.png` | full-bleed masters (iOS app icon, stores, anywhere you want a square) |
| `desktop/` | macOS, Windows and Linux: squircle with margin and shadow in 1024, 512, 256, 128, 64, 48, 32, 16, plus `.ico` and `.icns` |
| `web/` | `favicon.ico`, 16 and 32 favicons, `apple-touch-icon.png`, PWA `icon-192`, `icon-512`, `maskable-512` |
| `android/` | `mipmap-*/ic_launcher.png` (48 to 192) and `play-store-512.png` |

`products.json` lists every product and which repos use it. `repos.json` goes the other way: for each repo, which icon folder(s) to use. **`USE.md` explains how to apply them to a repo** (written so a person or an AI assistant can follow it step by step).

Open `index.html` (serve the folder) for the gallery. Rebuild: `node tools/build-icons.js` (Node 20+, macOS for `.icns`).

Code and artwork: GPL v3 (`LICENSE`). Font: SIL OFL 1.1.
