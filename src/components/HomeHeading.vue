<template>
  <div class="home-heading-wrap">
    <h1 id="home-heading" class="home-heading" data-page-focus>
      IDEIAS<br />QUE VIRAM<br /><em>SISTEMAS.</em>
    </h1>

    <p class="home-intro">
      Sou Vinicius Spanol, desenvolvedor fullstack. Transformo problemas reais em
      experiências web e mobile, do frontend ao backend.
    </p>

    <div class="home-actions">
      <RouterLink class="button-primary home-cta" to="/projects">
        <span>Explorar projetos</span>
        <span aria-hidden="true">↗</span>
      </RouterLink>
      <RouterLink class="home-about-link" to="/about">Conhecer o percurso <span aria-hidden="true">→</span></RouterLink>
    </div>

    <nav class="home-socials" aria-label="Perfis profissionais">
      <a
        v-for="icon in contactIcons"
        :key="icon.name"
        class="social-link"
        :href="icon.link"
        :aria-label="icon.name"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon :name="icon.icon" scale="1.1" aria-hidden="true" />
        <span>{{ icon.name }}</span>
      </a>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";

defineProps<{
  contactIcons: Array<{
    name: string;
    link: string;
    icon: string;
  }>;
}>();
</script>

<style scoped>
.home-heading-wrap { max-width: 55rem; }
.home-heading {
  margin: clamp(1rem, 3vh, 2rem) 0 0;
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: clamp(3.65rem, 8.9vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.095em;
  line-height: 0.77;
  text-transform: uppercase;
}
.home-heading em {
  display: inline-block;
  color: hsl(var(--color-primary-ink));
  font-style: normal;
}
.home-intro {
  max-width: 38rem;
  margin: clamp(1.4rem, 3vw, 2.25rem) 0 0;
  color: hsl(var(--color-muted));
  font-size: clamp(0.96rem, 1.5vw, 1.16rem);
  line-height: 1.65;
}
.home-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-top: 1.6rem;
}
.home-cta { min-width: 13rem; justify-content: space-between; }
.home-cta > span:last-child { font-size: 1.25rem; transition: transform var(--motion-fast) ease; }
.home-cta:hover > span:last-child { transform: translate(3px, -3px); }
.home-about-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: hsl(var(--color-muted));
  font-size: 0.72rem;
  font-weight: 750;
  letter-spacing: 0.04em;
}
.home-about-link span { color: hsl(var(--color-primary-ink)); transition: transform var(--motion-fast) ease; }
.home-about-link:hover span { transform: translateX(4px); }
.home-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 1.35rem;
  margin-top: clamp(1.7rem, 4vh, 2.7rem);
}
.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: hsl(var(--color-muted));
  font-size: 0.68rem;
  font-weight: 750;
  transition: color var(--motion-fast) ease;
}
.social-link:hover { color: hsl(var(--color-primary-ink)); }
.social-link :deep(svg) { color: hsl(var(--color-primary-ink)); }

@media (max-width: 640px) {
  .home-heading { font-size: clamp(3.15rem, 14vw, 5.5rem); }
  .home-intro { max-width: 34ch; font-size: 0.94rem; }
  .home-actions { align-items: flex-start; flex-direction: column; gap: 1.1rem; }
  .home-socials { margin-top: 1.6rem; }
}
</style>
