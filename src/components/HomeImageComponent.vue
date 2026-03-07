<template>
  <div class="hero-container relative z-10 m-auto lg:mb-10">
    <div class="wave-wrapper">
      <WaveBackground />
    </div>
    <div
      class="img-hero bg-center bg-cover h-64 w-64 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
    </div>
  </div>
</template>

<script setup lang="ts">
import WaveBackground from "@/components/WaveBackground.vue";
</script>

<style scoped>
.hero-container {
  position: relative;
  width: fit-content;
}

.wave-wrapper {
  position: absolute;
  inset: -2rem;
  border-radius: 50%;
  overflow: hidden;
  animation: morph 8s ease-in-out infinite;
}

.img-hero {
  position: relative;
  z-index: 1;
  animation: morph 8s ease-in-out infinite;
  background-image: url(/src/assets/spanol.jpeg);
  background-position: 50%;
  background-repeat: no-repeat;
}

@keyframes morph {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }

  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
}
</style>
