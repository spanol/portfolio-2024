<template>
  <section class="contact-view px-6 py-9 sm:px-9 sm:py-12 lg:px-14" aria-labelledby="contact-heading">
    <div class="contact-copy">
      <p class="eyebrow">CONTATO</p>
      <h1 id="contact-heading" class="section-title mt-3">Vamos conversar.</h1>
      <p class="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        Você pode me encontrar nestas redes sociais.
      </p>

      <nav class="contact-options mt-8" aria-label="Redes sociais e contato">
        <ContactOptions v-for="icon in contactIcons" :key="icon.name" :icon="icon" />
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactOptions from "@/components/ContactOptions.vue";
import { contactIcons } from "@/data/contactIcons";
</script>

<style scoped>
.contact-view {
  display: flex;
  min-height: 100%;
  align-items: center;
}

.contact-copy {
  width: 100%;
  max-width: 52rem;
  margin-inline: auto;
}

.contact-options {
  display: grid;
  gap: 0.75rem;
}

@container (min-width: 600px) {
  .contact-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
