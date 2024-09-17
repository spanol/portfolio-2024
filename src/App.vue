<template>
  <HeaderComponent />
  <router-view v-slot="{ Component, route }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>

</template>


<script setup>
import HeaderComponent from './components/HeaderComponent.vue';

</script>