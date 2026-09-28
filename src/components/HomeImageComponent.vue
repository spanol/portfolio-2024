<template>
  <figure class="portrait-object">
    <span class="portrait-object__plate" aria-hidden="true" />
    <div class="portrait-object__frame">
      <img :src="portrait" alt="Retrato de Vinicius Spanol" />
      <figcaption>
        <span>VINICIUS SPANOL</span>
        <span>WEB / MOBILE</span>
      </figcaption>
    </div>
    <span class="portrait-object__side-label" aria-hidden="true">ANGULAR — .NET</span>
  </figure>
</template>

<script setup lang="ts">
import portrait from "@/assets/spanol.png";
</script>

<style scoped>
.portrait-object {
  position: relative;
  width: 100%;
  max-width: 19rem;
  aspect-ratio: 0.76;
  justify-self: center;
  margin: 0;
  isolation: isolate;
}

.portrait-object__plate,
.portrait-object__frame {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 100% 0, 100% 91%, 91% 100%, 0 100%);
}

.portrait-object__plate {
  z-index: -1;
  inset: 0 -0.8rem 0.8rem 0.8rem;
  background: hsl(var(--color-primary));
}

.portrait-object__frame {
  background: hsl(var(--color-surface-raised));
}

.portrait-object__frame > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
  filter: grayscale(1) contrast(1.08);
}

.portrait-object__frame figcaption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem 1rem 1.1rem;
  color: white;
  background: linear-gradient(0deg, rgb(0 0 0 / 0.82), rgb(0 0 0 / 0));
  font-size: 0.57rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.portrait-object__side-label {
  position: absolute;
  right: -1.6rem;
  bottom: 12%;
  color: hsl(var(--color-primary-ink));
  font-size: 0.54rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  writing-mode: vertical-rl;
}
</style>
