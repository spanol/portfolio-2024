<template>
  <section class="technology-strip" aria-label="Principais tecnologias">
    <span class="technology-strip__label">STACK <span aria-hidden="true">/</span></span>
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
  min-height: 3.25rem;
  align-items: flex-start;
  gap: 1.1rem;
  border-top: 1px solid hsl(var(--color-line));
  padding-top: 0.8rem;
}

.technology-strip__label {
  flex: 0 0 auto;
  color: hsl(var(--color-primary-ink));
  font-size: 0.61rem;
  font-weight: 850;
  letter-spacing: 0.16em;
}

.technology-list {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.2rem 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.technology-list li {
  color: hsl(var(--color-muted));
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@container (max-width: 480px) {
  .technology-strip {
    gap: 0.8rem;
  }
}
</style>
