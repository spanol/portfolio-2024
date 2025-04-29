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
        {{ description.slice(0, 150) }}...
      </p>

      <div
        class="actions text-black dark:text-white text-sm sm:text-md mt-8 flex justify-center"
      >
        <a
          :href="projectLink"
          target="_blank"
          class="btn btn-primary items-center flex font-semibold border p-1 sm:p-2 rounded-xl rounded-e-none"
        >
          Ver Projeto
          <v-icon class="ms-1" name="bi-link-45deg" scale="1.5" />
        </a>
        <a
          :href="githubLink"
          target="_blank"
          class="btn btn-secondary border items-center flex font-semibold p-1 sm:p-2 rounded-xl rounded-s-none"
        >
          Código
          <v-icon class="ms-1" name="bi-github" scale="1.5" />
        </a>
      </div>
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
</script>
