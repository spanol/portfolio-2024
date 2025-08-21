<template>
  <div class="about my-auto dark:bg-dark-background dark:text-dark-text">
    <div class="about flex flex-col-reverse xl:flex-row justify-center items-center gap-32">
      <div class="image-wrapper hidden xl:block">
        <SpanolModel />
      </div>

      <div class="infos flex flex-col gap-y-10 lg:w-2/4">
        <AboutInfos />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AboutInfos from '@/components/AboutInfos.vue';
import SpanolModel from '@/components/SpanolModel.vue';

</script>
