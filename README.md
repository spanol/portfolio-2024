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
`--color-on-primary`) are defined in `src/index.css` for light, dark, and Matrix
themes. Shared spacing, radius, type, and motion values live alongside them.

Route changes turn the two adjacent faces inside `.portfolio-window`. The
`--cube-depth` value is half of the window width; keep it aligned with the
`rotateY()` enter/leave poses if the stage geometry changes. The shared
`--motion-*` tokens tune the 1.2 second recession, face turn, settle, and staggered
content reveal. Reduced-motion preferences collapse those animations and pause
the Matrix and Three.js effects.
