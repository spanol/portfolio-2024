<template>
  <HeaderComponent />
  <div
    class="app flex items-center min-h-screen p-16 xl:px-32 mt-8 lg:mt-12 xl:mt-10 2xl:mt-0"
    :class="{
      'flex flex-col w-full h-full': true,
      'transition-all duration-100': true,
    }"
  >
    <router-view v-slot="{ Component, route }">
      <Transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { RoutesEnum } from "@/enums/routesEnum";
import { usePrimaryColor } from "./composables/usePrimaryColor";

const { animateHue } = usePrimaryColor();
const transitionName = ref("slide-right");

const route = useRoute();

const previousRouteIndex = ref(RoutesEnum.HOME);

const determineTransition = (fromIndex, toIndex) => {
  if (toIndex > fromIndex) {
    transitionName.value = "slide-left";
  } else {
    transitionName.value = "slide-right";
  }
};

onMounted(() => {
  animateHue();
});

watchEffect(() => {
  const routes = Object.values(RoutesEnum);
  const fromIndex = previousRouteIndex.value;
  const toIndex = routes.indexOf(RoutesEnum[route.name?.toUpperCase()] || 0);

  determineTransition(fromIndex, toIndex);
  previousRouteIndex.value = toIndex;
});
</script>

<style scoped>
.app {
  overflow: hidden;
  transition: all 0.5s ease;
}

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
