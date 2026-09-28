<template>
  <section class="about-view px-6 py-9 sm:px-9 sm:py-12 lg:px-14" aria-labelledby="about-heading">
    <div class="about-layout">
      <div class="about-model" aria-hidden="true">
        <SpanolModel />
      </div>
      <AboutInfos />
    </div>
  </section>
</template>

<script lang="ts" setup>
import AboutInfos from "@/components/AboutInfos.vue";
import SpanolModel from "@/components/SpanolModel.vue";
</script>

<style scoped>
.about-view {
  min-height: 100%;
}

.about-layout {
  display: grid;
  min-height: 100%;
  align-items: center;
  gap: clamp(1.5rem, 4cqi, 3rem);
}

.about-model {
  display: none;
  width: min(100%, 18rem);
  aspect-ratio: 1;
  margin-inline: auto;
}

@container (min-width: 640px) {
  .about-layout {
    grid-template-columns: minmax(175px, 0.78fr) minmax(0, 1.22fr);
  }

  .about-model {
    display: block;
  }
}
</style>
