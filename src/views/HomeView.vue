<template>
  <div class="about my-auto dark:text-dark-text transition-all duration-150">
    <div
      class="flex flex-col-reverse xl:flex-row items-center justify-between text-center xl:items-start xl:text-start gap-x-10">
      <div class="info lg:w-3/5 mt-16 lg:mt-0">
        <HomeHeading :contact-icons="contactIcons" />
        <HomeTechnologies :techStackIcons="techStackIcons" />
      </div>
      <HomeImageComponent />
    </div>
  </div>
</template>

<script setup>
import HomeHeading from "@/components/HomeHeading.vue";
import HomeImageComponent from "@/components/HomeImageComponent.vue";
import HomeTechnologies from "@/components/HomeTechnologies.vue";
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
