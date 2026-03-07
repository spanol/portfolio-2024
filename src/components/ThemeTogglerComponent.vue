<template>
  <button
    @click="cycleTheme"
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-dark-surface"
  >
    <Transition name="theme-icon" mode="out-in">
      <v-icon
        :key="theme"
        :name="iconName"
        scale="1.5"
        :class="{ 'matrix-glow': isMatrix }"
      />
    </Transition>
  </button>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useTheme } from "@/composables/useTheme";

const { theme, isMatrix, cycleTheme, initTheme } = useTheme();

const iconName = computed(() => {
  const icons = {
    light: "bi-sun-fill",
    dark: "bi-moon-fill",
    matrix: "bi-terminal-fill",
  };
  return icons[theme.value];
});

onMounted(() => {
  initTheme();
});
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

.matrix-glow {
  color: #00ff41;
  filter: drop-shadow(0 0 6px #00ff41);
}
</style>
