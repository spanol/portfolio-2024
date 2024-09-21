<template>
  <HeaderComponent />
  <div class="min-h-[500px] m-8 mt-20 mb-0 md:m-24 md:mb-0 lg:m-28 lg:mb-0 xl:m-32 p-5 sm:p-10 xl:mt-16">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>
</template>


<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { RoutesEnum } from '@/enums/routesEnum'; // Importa o enum das rotas

// Estado reativo para armazenar o nome da transição
const transitionName = ref('slide-right');

// Pegando a rota atual
const route = useRoute();

// Estado reativo para manter o índice da rota anterior
const previousRouteIndex = ref(RoutesEnum.HOME);

// Função para determinar a direção da transição
const determineTransition = (fromIndex, toIndex) => {
  if (toIndex > fromIndex) {
    transitionName.value = 'slide-left';
  } else {
    transitionName.value = 'slide-right';
  }
};

// Usamos watchEffect para reagir às mudanças de rota
watchEffect(() => {
  const routes = Object.values(RoutesEnum);
  const fromIndex = previousRouteIndex.value;
  const toIndex = routes.indexOf(RoutesEnum[route.name?.toUpperCase()] || 0);

  determineTransition(fromIndex, toIndex);
  previousRouteIndex.value = toIndex;
});
</script>

<style scoped>
/* Animação para a direita */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-leave,
.slide-right-enter-to {
  transform: translateX(0%);
}

/* Animação para a esquerda */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.5s ease;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-leave,
.slide-left-enter-to {
  transform: translateX(0%);
}
</style>