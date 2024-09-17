<template>
  <HeaderComponent />
  <div class="m-40 border p-10 rounded-3xl">
    <router-view v-slot="{ Component, route }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
  </div>

</template>


<script setup>
import HeaderComponent from './components/HeaderComponent.vue';

</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>