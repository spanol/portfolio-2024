<template>
  <div
    class="z-10 img-hero bg-center m-auto bg-cover border-4 border-primary lg:mb-10 h-64 w-64 lg:h-72 lg:w-72 xl:h-96 xl:w-96">
  </div>
</template>

<style scoped>
.img-hero {
  animation: morph 8s ease-in-out infinite;
  background-image: url(/src/assets/spanol.jpeg);
  background-position: 50%;
  background-repeat: no-repeat;
  position: relative;
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
