<template>
  <div class="about">

    <div class="flex flex-col-reverse xl:flex-row items-center text-center xl:items-start xl:text-start gap-x-10">
      <div class="info lg:w-3/5 mt-16 lg:mt-0">

        <h1 class="flex flex-col lg:flex-row font-bold text-4xl sm:text-5xl">
          Fullstack Developer
          <span class="hidden lg:block">
            🚀
          </span>
          <span class="lg:hidden">
            😎
          </span>
        </h1>
        <h3 class="text-light text-lg xl:w-4/5 mt-5">Olá! Sou Vinicius Spanol, desenvolvedor fullstack com
          experiência
          na
          criação de aplicativos web e mobile. Além disso, possuo conhecimentos em DevOps e Internet das Coisas (IoT),
          sempre buscando soluções eficientes e inovadoras.
        </h3>

        <h3 class="text-light text-lg xl:w-4/5 mt-5">Olá! Sou Vinicius Spanol, desenvolvedor fullstack com
          experiência
          na
          criação de aplicativos web e mobile. Além disso, possuo conhecimentos em DevOps e Internet das Coisas (IoT),
          sempre buscando soluções eficientes e inovadoras.
        </h3>
        <div class="socials flex justify-center lg:justify-start gap-x-5 mt-6">
          <a href="https://github.com/spanol" target="_blank">
            <v-icon name="bi-github" scale="2.5" />
          </a>

          <a href="https://www.linkedin.com/in/vinicius-spanol/" target="_blank">
            <v-icon name="bi-linkedin" scale="2.5" />
          </a>
        </div>

        <div
          class="stack flex flex-col lg:flex-row items-center gap-y-8 gap-x-5 mt-16 lg:mt-32 shadow-lg border rounded-xl p-5">
          <p class="font-medium border-b-2 border-light lg:border-0 lg:text-nowrap">Main Tech Stack</p>
          <div class="vertical-divisor hidden lg:block">|</div>

          <div class="flex flex-wrap lg:flex-shrink justify-center gap-x-5">
            <div class="flex hover:-translate-y-4 transition-all duration-150 cursor-pointer">
              <v-icon name="vi-file-type-html" scale="3" />
              <v-icon name="vi-file-type-css" scale="3" />
            </div>

            <div class="flex hover:-translate-y-4 transition-all duration-150 cursor-pointer">
              <v-icon name="vi-file-type-typescript" scale="3" />
              <v-icon name="vi-file-type-csharp" scale="3" />
            </div>

            <div class="flex hover:-translate-y-4 transition-all duration-150 cursor-pointer">
              <v-icon name="vi-file-type-angular" scale="3" />
              <v-icon name="si-dotnet" scale="3" />
            </div>

            <div class="flex hover:-translate-y-4 transition-all duration-150 cursor-pointer">
              <v-icon name="vi-file-type-arduino" scale="3" />
              <v-icon name="vi-file-type-docker" scale="3" />
            </div>
            <!-- <div class="flex">
              <v-icon name="vi-file-type-nestjs" scale="3" />
              <v-icon name="vi-file-type-angular" scale="3" />
            </div> -->
          </div>
        </div>
      </div>

      <div>
        <ImageComponent />
      </div>
    </div>

  </div>
</template>

<script setup>
import ImageComponent from "@/components/ImageComponment.vue";
</script>
