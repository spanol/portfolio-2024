<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="project" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click.self="$emit('close')" />

        <div
          class="relative bg-white dark:bg-dark-surface rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
          <button
            class="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
            @click="$emit('close')">
            <v-icon name="io-close" scale="1.5" />
          </button>

          <img :src="project.image" :alt="project.title" class="w-full h-64 object-cover rounded-t-3xl" />

          <div class="p-6 sm:p-8">
            <h2 class="font-bold text-2xl sm:text-3xl text-black dark:text-white">
              {{ project.title }}
            </h2>

            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="tech in project.technologies" :key="tech"
                class="px-3 py-1 text-xs font-semibold rounded-full bg-black/10 dark:bg-white/10 text-black dark:text-white">
                {{ tech }}
              </span>
            </div>

            <p class="text-black/70 dark:text-white/80 mt-6 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex gap-3 mt-8">
              <a v-if="project.projectLink" :href="project.projectLink" target="_blank"
                class="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity">
                Ver Projeto
                <v-icon name="bi-link-45deg" scale="1.3" />
              </a>
              <a v-if="project.githubLink" :href="project.githubLink" target="_blank"
                class="flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl border-2 border-black dark:border-white text-black dark:text-white hover:opacity-70 transition-opacity">
                Código
                <v-icon name="bi-github" scale="1.3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Project } from "@/types/project";

defineProps<{
  project: Project | null;
}>();

defineEmits(["close"]);
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
