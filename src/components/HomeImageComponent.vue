<template>
  <figure class="hero-object">
    <span class="hero-object__backplate" aria-hidden="true" />
    <span class="hero-object__edge" aria-hidden="true" />
    <img class="hero-object__image" :src="portrait" alt="Retrato de Vinicius Spanol" />
    <span class="hero-object__coordinate" aria-hidden="true">V / 01</span>
    <figcaption class="hero-object__caption">
      <span><strong>VINICIUS SPANOL</strong><small>FULLSTACK DEVELOPER</small></span>
      <span aria-hidden="true">2026</span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import portrait from "@/assets/spanol.png";
</script>

<style scoped>
.hero-object {
  position: relative;
  width: min(100%, 25rem);
  aspect-ratio: 0.78;
  margin: 0;
  perspective: 1200px;
  transform-style: preserve-3d;
  animation: object-float 8s ease-in-out infinite;
}

.hero-object__backplate,
.hero-object__edge,
.hero-object__image {
  position: absolute;
  inset: 0;
}

.hero-object__backplate {
  inset: 1.2rem -1.2rem -1.2rem 1.2rem;
  border: 1px solid hsl(var(--color-ink) / 0.5);
  background: hsl(var(--color-surface-raised));
  transform: translateZ(-2rem) rotateY(-11deg) rotateX(3deg);
}

.hero-object__edge {
  z-index: 1;
  inset: auto -0.95rem 1.7rem auto;
  width: 1.35rem;
  height: 62%;
  background: hsl(var(--color-primary));
  clip-path: polygon(0 0, 100% 10%, 100% 100%, 0 88%);
  transform: translateZ(1.25rem) rotateY(-11deg);
}

.hero-object__image {
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid hsl(var(--color-line));
  object-fit: cover;
  object-position: center 37%;
  filter: grayscale(1) contrast(1.12) brightness(0.92);
  transform: rotateY(-11deg) rotateX(3deg);
  box-shadow: 1.2rem 1.6rem 0 hsl(var(--color-ink) / 0.12);
}

.hero-object__coordinate {
  position: absolute;
  z-index: 2;
  top: 0.7rem;
  left: -1.5rem;
  color: hsl(var(--color-primary-ink));
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  transform: rotate(-90deg);
  transform-origin: bottom left;
}

.hero-object__caption {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 0.5rem;
  padding: 1.5rem 1.25rem 1.1rem;
  color: white;
  background: linear-gradient(0deg, rgb(0 0 0 / 0.88), transparent);
  transform: rotateY(-11deg) rotateX(3deg);
}

.hero-object__caption > span:first-child { display: grid; gap: 0.3rem; }
.hero-object__caption strong { font-size: 0.66rem; letter-spacing: 0.15em; }
.hero-object__caption small,
.hero-object__caption > span:last-child { font-size: 0.54rem; font-weight: 800; letter-spacing: 0.15em; }

@keyframes object-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.55rem); }
}

@media (max-width: 640px) {
  .hero-object { width: min(75vw, 19rem); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-object { animation: none; }
}
</style>
