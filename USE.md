# Applying these icons to a repo

1. Find the repo in `repos.json`. It lists the product folder(s) to use, for example `AltStackMail` uses `products/mail` and `products/calendar`.
2. Copy files from that product folder into the repo, using the table for the platform the repo targets:

| Target | Copy | To (typical) |
| --- | --- | --- |
| Electron / desktop app | `desktop/<id>.ico`, `desktop/<id>.icns`, `desktop/<id>-512.png` | `build/icon.ico`, `build/icon.icns`, `build/icon.png` (electron-builder expects `icon.icns`, `icon.ico`, and a 512+ `icon.png`) |
| Windows app | `desktop/<id>.ico` | the app's `.ico` resource |
| Linux app | `desktop/<id>-{16,32,48,64,128,256,512}.png` | `share/icons/hicolor/<size>x<size>/apps/<name>.png` |
| macOS app | `desktop/<id>.icns` | `AppIcon.icns` (or the 1024 PNG for an asset catalog) |
| iOS app | `<id>-rose-1024.png` (no transparency) | `AppIcon` in `Assets.xcassets` |
| Android app | `android/mipmap-*/ic_launcher.png`, `android/play-store-512.png` | `res/mipmap-*/` and the Play listing |
| Website / PWA | `web/*` | site root; link `favicon.ico`, `apple-touch-icon.png`; manifest icons `icon-192`, `icon-512`, `maskable-512` (purpose `maskable`) |
| README / docs | `desktop/<id>-256.png` | the README header |

3. Delete the old icon files in the repo so no old branding is left, and update any config that names them (package.json `build.icon`, `Info.plist`, `AndroidManifest.xml`, `manifest.json`, `<link rel="icon">`).
4. Do not edit, recolour or re-export the images. If a size is missing, resample from the 1024 master. Use `rose` for app icons by default; `night` is the dark variant for dark-mode splash screens.
5. Several repos share an icon on purpose (all the Social clients use `social`; both search repos use `search`).
