<template>
  <div class="about h-full flex flex-col-reverse lg:flex-row items-center text-center lg:text-start">
    <div class="infos lg1:w-2/4 mt-16 lg:mt-0">
      <h1 class="font-bold text-5xl">
        Fullstack Developer 🚀
      </h1>
      <h3 class="text-slate-400 mt-5">Olá!, eu sou Vinicius Spanol, sou um desenvolvedor full stack, tenho experiência
        com a criação de
        aplicativos web e mobile além de alguns conhecimentos em DevOps e IOT.
      </h3>
      <div class="socials mt-8">
        <a href="https://github.com/spanol" target="_blank">
          <v-icon name="bi-github" scale="2" />
        </a>

        <a href="https://www.linkedin.com/in/vinicius-spanol/" target="_blank">
          <v-icon name="bi-linkedin" scale="2" />
        </a>
      </div>

      <div class="stack flex flex-col lg:flex-row items-center gap-y-8 gap-x-5 mt-20">
        <p class="font-medium border-b-2 border-slate-500 lg:border-0 lg:text-nowrap">Main Tech Stack</p>

        <div class="flex flex-wrap lg:flex-shrink justify-center gap-x-5">
          <div class="flex">
            <v-icon name="vi-file-type-html" scale="3" />
            <v-icon name="vi-file-type-css" scale="3" />
          </div>

          <div class="flex">
            <v-icon name="vi-file-type-js" scale="3" />
            <v-icon name="vi-file-type-docker" scale="3" />
          </div>

          <div class="flex">

            <v-icon name="vi-file-type-nestjs" scale="3" />
            <v-icon name="vi-file-type-csharp" scale="3" />
          </div>

          <div class="flex">
            <v-icon name="vi-file-type-angular" scale="3" />
            <v-icon name="vi-file-type-angular" scale="3" />
          </div>
        </div>
      </div>
    </div>

    <ImageComponent />
  </div>
</template>

<script setup>
import ImageComponent from "./ImageComponment.vue"
</script>

<style></style>