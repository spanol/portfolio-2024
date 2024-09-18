<template>
  <header class="z-50 bg-white fixed top-0 w-full shadow-md h-16">
    <div class="h-full flex items-center px-5 justify-between font-extrabold" :class="{ 'border-b': isOpen }">
      <span>
        Spanol.dev
      </span>

      <div class="hidden md:flex justify-between items-center gap-x-5">
        <RouterLink to="/" :class="{ 'border-b-4 border-blue-500': $route.path === '/' }"
          class="transition-all duration-300">
          Home
        </RouterLink>
        <RouterLink to="/about" :class="{ 'border-b-4 border-blue-500': $route.path === '/about' }"
          class="transition-all duration-300">
          About
        </RouterLink>
        <RouterLink to="/projects" :class="{ 'border-b-4 border-blue-500': $route.path === '/projects' }"
          class="transition-all duration-300">
          Projects
        </RouterLink>
        <RouterLink to="/works" :class="{ 'border-b-4 border-blue-500': $route.path === '/works' }"
          class="transition-all duration-300">
          Works
        </RouterLink>
        <RouterLink to="/contact" :class="{ 'border-b-4 border-blue-500': $route.path === '/contact' }"
          class="transition-all duration-300">
          Contact
        </RouterLink>
        <a class="border p-2 border-blue-500 bg-blue-500 rounded-3xl text-white" href="#">
          Download Resume
        </a>
      </div>

      <div class="md:hidden">
        <a href="#" @click="toggleMenu()">
          <v-icon name="bi-list" scale="2" />
        </a>
      </div>
    </div>

    <div v-if="isOpen" class="list bg-white">
      <div class="md:hidden flex flex-col items-center gap-y-3">
        <RouterLink to="/" :class="{ 'border-b-4 border-blue-500': $route.path === '/' }"
          class="p-2 transition-all duration-300">
          Home
        </RouterLink>
        <RouterLink to="/about" :class="{ 'border-b-4 border-blue-500': $route.path === '/about' }"
          class="p-2 transition-all duration-300">
          About
        </RouterLink>
        <RouterLink to="/projects" :class="{ 'border-b-4 border-blue-500': $route.path === '/projects' }"
          class="p-2 transition-all duration-300">
          Projects
        </RouterLink>
        <RouterLink to="/works" :class="{ 'border-b-4 border-blue-500': $route.path === '/works' }"
          class="p-2 transition-all duration-300">
          Works
        </RouterLink>
        <RouterLink to="/contact" :class="{ 'border-b-4 border-blue-500': $route.path === '/contact' }"
          class="p-2 transition-all duration-300">
          Contact
        </RouterLink>
      </div>
    </div>
  </header>

</template>


<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<style></style>