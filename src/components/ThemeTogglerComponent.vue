<template>
  <button
    @click="cycleTheme"
    class="theme-toggle"
    type="button"
    :aria-label="`Tema atual: ${themeLabel}. Ativar o próximo tema.`"
    :title="`Tema atual: ${themeLabel}`"
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

const themeLabel = computed(() => {
  const labels = { light: "claro", dark: "escuro", matrix: "Matrix" };
  return labels[theme.value];
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

.theme-toggle {
  display: grid;
  width: 2.7rem;
  height: 2.7rem;
  place-items: center;
  border: 1px solid hsl(var(--color-line));
  border-radius: 0;
  color: hsl(var(--color-ink));
  background: hsl(var(--color-surface) / 0.8);
  transition: border-color 150ms ease, background-color 150ms ease;
}

.theme-toggle:hover {
  border-color: hsl(var(--color-primary) / 0.58);
  background: hsl(var(--color-primary) / 0.08);
}
</style>
