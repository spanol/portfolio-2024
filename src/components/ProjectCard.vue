<template>
  <div
    class="project-card rounded-3xl dark:bg-dark-surface flex border-4 dark:border-0 shadow-card h-full"
  >
    <div
      class="rounded-e-3xl flex flex-col justify-evenly text-center gap-y-3 p-6"
    >
      <img
        class="rounded-3xl border-2 dark:border-0 w-full h-52 object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
        :src="image"
        alt="Preview do Projeto"
      />

      <h1 class="font-bold text-xl p-2 text-black dark:text-white sm:text-2xl">
        {{ title }}
      </h1>

      <p class="text-light text-center text-sm sm:text-md dark:text-white mt-2">
        {{ description.length > 100 ? description.slice(0, 100) + '...' : description }}
      </p>

      <button
        class="mt-4 px-4 py-2 text-sm font-semibold rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
        @click="$emit('select')"
      >
        Ver detalhes
      </button>
    </div>
  </div>
</template>

<style>
.project-card {
  max-width: 400px;
}
</style>

<script setup>
defineProps({
  title: String,
  description: String,
  image: String,
  technologies: Array,
  projectLink: String,
  githubLink: String,
});

defineEmits(["select"]);
</script>
