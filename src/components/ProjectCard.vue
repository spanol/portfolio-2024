<template>
  <div class="rounded-3xl flex mt-16 border justify-between shadow-card h-full">
    <img class="hidden lg:block rounded-3xl rounded-e-none w-2/4" :src="image" alt="Preview do Projeto">

    <div class="rounded-e-3xl flex flex-col justify-center text-center p-6">
      <h1 class="font-bold text-xl">
        {{ title }}
      </h1>

      <p class="text-light text-center text-sm sm:text-md mt-5">
        {{ description }}
      </p>

      <div class="font-bold langs text-center mt-4">
        <span v-for="tech in technologies" :key="tech"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
          {{ tech }}
        </span>
      </div>

      <div class="actions text-sm sm:text-md mt-8 flex justify-center">
        <a :href="projectLink" target="_blank"
          class="btn btn-primary items-center flex font-semibold border p-1 sm:p-2 rounded-xl rounded-e-none">
          Ver Projeto
          <v-icon class="ms-1" name="bi-link-45deg" scale="1.5" />
        </a>
        <a :href="githubLink" target="_blank"
          class="btn btn-secondary border items-center flex font-semibold p-1 sm:p-2 rounded-xl rounded-s-none">
          Código
          <v-icon class="ms-1" name="bi-github" scale="1.5" />
        </a>
      </div>
    </div>
  </div>

</template>

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