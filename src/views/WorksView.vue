<template>
  <section class="archive-scene" aria-labelledby="archive-heading">
    <p class="page-kicker">ARQUIVO / ÍNDICE</p>
    <div class="archive-scene__layout">
      <h1 id="archive-heading" class="display-title" data-page-focus>
        TRABALHO<br /><em>EM FLUXO.</em>
      </h1>
      <div class="archive-scene__note">
        <span class="archive-scene__index">01 — 04</span>
        <p>
          Os projetos e experimentos selecionados estão reunidos no índice do portfólio.
          Cada peça parte de um problema real e ganha forma em código.
        </p>
        <RouterLink class="button-primary" to="/projects">
          Abrir índice de projetos <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </div>
    <div class="archive-scene__rule" aria-hidden="true" />
    <p class="archive-scene__footnote">VINICIUS SPANOL / DESENVOLVIMENTO FULL STACK</p>
  </section>
</template>

<style scoped>
.archive-scene {
  display: flex;
  min-height: min(100svh - 11rem, 75rem);
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 9vh, 7rem) clamp(0.5rem, 5vw, 5rem);
}
.archive-scene__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(17rem, 0.42fr);
  align-items: end;
  gap: clamp(2rem, 7vw, 8rem);
  margin-top: 2rem;
}
.archive-scene .display-title { font-size: clamp(4rem, 11vw, 10.5rem); }
.archive-scene__note { max-width: 28rem; padding-bottom: 0.6rem; }
.archive-scene__index, .archive-scene__footnote {
  color: hsl(var(--color-muted));
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}
.archive-scene__note p { margin: 1rem 0 1.6rem; color: hsl(var(--color-muted)); font-size: 1rem; line-height: 1.75; }
.archive-scene__rule { width: 100%; height: 1px; margin-top: clamp(3rem, 8vh, 6rem); background: hsl(var(--color-line)); }
.archive-scene__footnote { margin: 0.8rem 0 0; font-size: 0.55rem; }
@media (max-width: 760px) {
  .archive-scene { padding-inline: 0; }
  .archive-scene__layout { grid-template-columns: minmax(0, 1fr); align-items: start; gap: 2.1rem; }
  .archive-scene .display-title { font-size: clamp(3.7rem, 17vw, 7rem); }
  .archive-scene__note { max-width: 32rem; }
}
</style>
