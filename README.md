# portfolio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Visual system

The semantic color tokens (`--color-canvas`, `--color-surface`, `--color-ink`,
`--color-muted`, `--color-line`, `--color-primary`, `--color-primary-ink`, and
`--color-on-primary`) live in `src/index.css`, with light, dark, and Matrix
palettes. Type, spacing, edge radius, and motion tokens sit beside them so views
can share the same visual rules.

Navigation is a wide folio: `.scene-stage` supplies perspective and the route
sheet uses the `folio-forward` and `folio-backward` enter/leave poses. The
`--motion-route` and `--ease-kinetic` tokens tune the page turn. Keep the route
sheet's clipping and opacity on the animated face so its 3D edge remains visible.
The reduced-motion preference removes the turn and disables ambient animation.

Project cards read from `public/data/projects.json`; update that file to change
the visible project titles, descriptions, images, technologies, and links.
Projects may also include `status` and `highlights` for a short stage label and
concrete deliverables in the details dialog, plus `featured` and `spotlight`
for portfolio highlights. Use `deployments` for multiple published URLs under
one project. Omit `image` to use the built-in editorial cover.

### Product portals

AffiliaCore and Subiu lead the project index; personal projects follow, then
professional work. Their `portal` metadata in `public/data/projects.json` supplies
brand identity, short copy, logo, feature labels, and a local GIF plus WebP poster.
`ProjectPortalCard.vue` scopes each product's colors and typography independently
of the portfolio theme. `ProjectDemo.vue` loads the GIF when the visitor chooses
**Ver GIF** and offers a pause button; the static poster is the default.

The previews are recordings of the public product pages, captured in OBS and
converted with FFmpeg. Logos and fonts come from the respective product brand
assets. To refresh a recording on Windows with OBS WebSocket enabled and Node 22+:

```powershell
node scripts/capture-showcase.mjs prepare affiliacore
node scripts/capture-showcase.mjs record affiliacore
node scripts/capture-showcase.mjs restore
```

Use `subiu` for the other product. Recordings and temporary capture pages stay
under ignored `tmp/showcase/`. Run `restore` after capture (including after an
interrupted run) to restore the original scene, output directory, and audio.
The helper reads the local OBS connection settings without logging credentials.
