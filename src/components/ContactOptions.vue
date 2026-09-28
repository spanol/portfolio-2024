<template>
  <a
    class="contact-link"
    :href="icon.link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="contact-link__number">{{ String(index).padStart(2, "0") }}</span>
    <span class="contact-link__icon" aria-hidden="true"><v-icon :name="icon.icon" scale="1.35" /></span>
    <span class="contact-link__copy">
      <small>PERFIL PROFISSIONAL</small>
      <strong>{{ icon.name }}</strong>
      <span>{{ icon.link }}</span>
    </span>
    <span class="contact-link__arrow" aria-hidden="true">↗</span>
  </a>
</template>

<script lang="ts" setup>
defineProps<{
  icon: {
    name: string;
    link: string;
    icon: string;
  };
  index: number;
}>();
</script>

<style scoped>
.contact-link {
  position: relative;
  display: grid;
  min-width: 0;
  align-items: center;
  grid-template-columns: auto 2.6rem minmax(0, 1fr) auto;
  gap: 0.8rem;
  border-bottom: 1px solid hsl(var(--color-line));
  padding: 1.1rem 0.25rem;
  transition: border-color var(--motion-fast) ease, transform var(--motion-fast) var(--ease-kinetic);
}

.contact-link:first-child { border-top: 1px solid hsl(var(--color-line)); }
.contact-link:hover { border-color: hsl(var(--color-primary)); transform: translateX(0.3rem); }
.contact-link__number {
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 900;
}
.contact-link__icon {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  place-items: center;
  border: 1px solid hsl(var(--color-line));
  color: hsl(var(--color-primary-ink));
}
.contact-link__copy { display: grid; min-width: 0; gap: 0.22rem; }
.contact-link__copy small { color: hsl(var(--color-muted)); font-size: 0.5rem; font-weight: 800; letter-spacing: 0.12em; }
.contact-link__copy strong { color: hsl(var(--color-ink)); font-size: 1rem; font-weight: 800; }
.contact-link__copy > span {
  overflow: hidden;
  color: hsl(var(--color-muted));
  font-size: 0.68rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.contact-link__arrow { color: hsl(var(--color-primary-ink)); font-size: 1.2rem; transition: transform var(--motion-fast) ease; }
.contact-link:hover .contact-link__arrow { transform: translate(2px, -2px); }
@media (max-width: 520px) {
  .contact-link { grid-template-columns: auto 2.3rem minmax(0, 1fr) auto; gap: 0.55rem; }
  .contact-link__icon { width: 2.3rem; height: 2.3rem; }
}
</style>
