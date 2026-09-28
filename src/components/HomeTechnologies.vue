<template>
  <section class="technology-strip" aria-label="Principais tecnologias">
    <span class="technology-strip__label">FERRAMENTAS /</span>
    <ul class="technology-list">
      <li v-for="technology in techStackIcons" :key="technology.name">
        {{ technology.name }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  techStackIcons: Array<{
    name: string;
    icon: string;
  }>;
}>();
</script>

<style scoped>
.technology-strip {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: 1rem;
  border-top: 1px solid hsl(var(--color-line));
  padding-top: 0.75rem;
}
.technology-strip__label {
  flex: 0 0 auto;
  color: hsl(var(--color-primary-ink));
  font-size: 0.57rem;
  font-weight: 850;
  letter-spacing: 0.14em;
}
.technology-list {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.35rem 0.95rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.technology-list li {
  color: hsl(var(--color-muted));
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 750;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
@media (max-width: 640px) {
  .technology-strip { flex-direction: column; gap: 0.55rem; }
}
</style>
