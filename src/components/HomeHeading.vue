<template>
  <div class="home-heading-wrap">
    <h1 id="home-heading" class="home-heading" aria-label="Full stack">
      <span>FULL</span>
      <span class="home-heading__accent">STACK</span>
    </h1>

    <p class="home-intro">
      Sou Vinicius Spanol. Desenvolvo aplicações web e mobile com experiência
      em Angular, C# e .NET.
    </p>

    <RouterLink class="button-primary home-cta" to="/projects">
      <span>Explorar projetos</span>
      <span aria-hidden="true">↗</span>
    </RouterLink>

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
.home-heading-wrap {
  max-width: 25rem;
}

.home-heading {
  color: hsl(var(--color-ink));
  font-family: var(--font-display);
  font-size: clamp(4.25rem, 14.8cqi, 9.7rem);
  font-weight: 900;
  letter-spacing: -0.09em;
  line-height: 0.73;
  text-transform: uppercase;
}

.home-heading > span {
  display: block;
}

.home-heading__accent {
  position: relative;
  z-index: 0;
  width: fit-content;
  margin-top: 0.14em;
  color: hsl(var(--color-ink));
}

.home-heading__accent::before {
  position: absolute;
  z-index: -1;
  right: -0.02em;
  bottom: 0.04em;
  left: 0.08em;
  height: 0.15em;
  background: hsl(var(--color-primary));
  content: "";
}

.home-intro {
  max-width: 34ch;
  margin-top: clamp(1.1rem, 2.5cqi, 1.65rem);
  color: hsl(var(--color-muted));
  font-size: clamp(0.9rem, 1.7cqi, 1.05rem);
  line-height: 1.55;
}

.home-cta {
  min-height: 3.1rem;
  justify-content: space-between;
  margin-top: 1.2rem;
  padding-inline: 1rem;
  font-size: 0.77rem;
  letter-spacing: 0.02em;
}

.home-cta > span:last-child {
  font-size: 1.15rem;
  transition: transform var(--motion-fast) ease;
}

.home-cta:hover > span:last-child {
  transform: translate(2px, -2px);
}

.home-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  margin-top: 1.15rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-bottom: 1px solid hsl(var(--color-line));
  padding-bottom: 0.35rem;
  color: hsl(var(--color-muted));
  font-size: 0.68rem;
  font-weight: 700;
  transition: color var(--motion-fast) ease, border-color var(--motion-fast) ease;
}

.social-link:hover {
  border-color: hsl(var(--color-primary-ink));
  color: hsl(var(--color-primary-ink));
}
</style>
