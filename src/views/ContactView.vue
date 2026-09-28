<template>
  <section class="contact-scene" aria-labelledby="contact-heading">
    <div class="contact-scene__message">
      <p class="page-kicker">CAPÍTULO 04 / CONTATO</p>
      <h1 id="contact-heading" class="display-title" data-page-focus>
        IDEIA BOA<br />PEDE <em>CONVERSA.</em>
      </h1>
      <p>Se quiser trocar uma ideia sobre produto, tecnologia ou um projeto, estou por aqui.</p>
      <span class="contact-scene__signature">VINICIUS SPANOL / FULLSTACK</span>
    </div>

    <nav class="contact-options" aria-label="Redes sociais e contato">
      <ContactOptions v-for="(icon, index) in contactIcons" :key="icon.name" :icon="icon" :index="index + 1" />
    </nav>
  </section>
</template>

<script setup lang="ts">
import ContactOptions from "@/components/ContactOptions.vue";
import { contactIcons } from "@/data/contactIcons";
</script>

<style scoped>
.contact-scene {
  display: grid;
  min-height: min(100svh - 11rem, 75rem);
  align-items: center;
  grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.7fr);
  gap: clamp(2rem, 7vw, 8rem);
  padding-block: clamp(3rem, 9vh, 7rem);
}
.contact-scene__message > p:not(.page-kicker) {
  max-width: 34rem;
  margin: 1.7rem 0 0;
  color: hsl(var(--color-muted));
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  line-height: 1.65;
}
.contact-scene__message .page-kicker { margin-bottom: 1.6rem; }
.contact-scene__signature {
  display: inline-block;
  margin-top: 2.2rem;
  border-left: 2px solid hsl(var(--color-primary));
  padding-left: 0.7rem;
  color: hsl(var(--color-muted));
  font-size: 0.56rem;
  font-weight: 850;
  letter-spacing: 0.14em;
}
.contact-options { display: grid; }
@media (max-width: 760px) {
  .contact-scene { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
  .contact-options { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 520px) {
  .contact-scene { min-height: 0; padding-block: 2.5rem; }
  .contact-options { grid-template-columns: minmax(0, 1fr); }
  .contact-scene__message .display-title { font-size: clamp(3rem, 13vw, 4.4rem); }
}
</style>
