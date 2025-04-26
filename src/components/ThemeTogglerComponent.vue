<template>
  <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface">
    <Transition name="theme-icon" mode="out-in">
      <v-icon :key="isDarkMode ? 'moon' : 'sun'" :name="isDarkMode ? 'bi-moon-fill' : 'bi-sun-fill'" scale="1.5" />
    </Transition>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(true)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  }
  else {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg);
}
</style>