<template>
  <div class="z-10 img-hero lg:self-center bg-center bg-cover border-4 border-gray-800 h-40 w-40 lg:h-80 lg:w-80"></div>
</template>

<style scoped>
.img-hero {
  animation: morph 8s ease-in-out infinite;
  background-image: url(/src/assets/spanol.jpg);
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
  transition: all 1s ease-in-out;
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
