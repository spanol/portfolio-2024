<template>
  <div class="about my-auto dark:text-dark-text transition-all duration-150">
    <div
      class="flex flex-col-reverse xl:flex-row items-center justify-between text-center xl:items-start xl:text-start gap-x-10"
    >
      <div class="info lg:w-3/5 mt-16 lg:mt-0">
        <h1
          class="flex flex-col lg:flex-row font-bold text-4xl sm:text-5xl text-primary transition-colors duration-200 xl:text-nowrap"
        >
          Desenvolvedor Fullstack
          <span class="hidden lg:block"> 🚀 </span>
          <span class="lg:hidden"> 😎 </span>
        </h1>
        <h3 class="text-light dark:text-dark-text text-lg xl:w-4/5 mt-5">
          Olá! Sou Vinicius Spanol, desenvolvedor fullstack com experiência na
          criação de aplicativos web e mobile. Além disso, possuo conhecimentos
          em DevOps e Internet das Coisas (IoT), sempre buscando soluções
          eficientes e inovadoras.
        </h3>

        <div class="socials flex justify-center xl:justify-start gap-x-5 mt-6">
          <a
            v-for="(icon, index) in contactIcons"
            :key="index"
            :href="icon.link"
            target="_blank"
            class="text-primary"
          >
            <v-icon :name="icon.icon" scale="2.5" />
          </a>
        </div>

        <div
          class="stack flex flex-col lg:flex-row items-center gap-y-8 gap-x-5 mt-16 lg:mt-20 shadow-lg border dark:border-dark-border dark:bg-dark-surface rounded-xl p-5"
        >
          <p
            class="font-medium border-b-2 border-light text-primary dark:border-dark-border lg:border-0 lg:text-nowrap"
          >
            Principais tecnologias
          </p>
          <div class="vertical-divisor hidden lg:block dark:text-dark-text">
            |
          </div>

          <div class="flex flex-wrap lg:flex-shrink justify-center gap-x-5">
            <div
              v-for="(icon, index) in techStackIcons"
              :key="index"
              class="flex hover:-translate-y-4 cursor-pointer"
            >
              <v-icon :name="icon.icon" scale="3" class="dark:text-dark-text" />
            </div>
          </div>
        </div>
      </div>
      <HomeImageComponent />
    </div>
  </div>
</template>

<script setup>
import HomeImageComponent from "@/components/HomeImageComponment.vue";
import { contactIcons } from "@/data/contactIcons";

const techStackIcons = [
  {
    name: "HTML",
    icon: "vi-file-type-html",
  },
  {
    name: "CSS",
    icon: "vi-file-type-css",
  },

  {
    name: "TypeScript",
    icon: "vi-file-type-typescript",
  },
  {
    name: "C#",
    icon: "vi-file-type-csharp",
  },
  {
    name: "Angular",
    icon: "vi-file-type-angular",
  },
  {
    name: ".NET",
    icon: "si-dotnet",
  },
  {
    name: "NestJS",
    icon: "vi-file-type-nestjs",
  },
  {
    name: "Arduino",
    icon: "vi-file-type-arduino",
  },
  {
    name: "Docker",
    icon: "vi-file-type-docker",
  },
];
</script>
