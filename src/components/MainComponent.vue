<template>
  <div class="resume">
    <div class="about flex justify-between">
      <div class="infos">
        <h1 class="font-bold text-5xl">
          Fullstack Developer 🚀
        </h1>
        <h3 class="font-light mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          necessitatibus
          natus
          nemo laudantium magnam. Omnis nostrum amet nemo doloribus et facilis numquam ea ratione distinctio, saepe
          aperiam praesentium neque. Repellat?
        </h3>
        <div class="socials">
          <a href="https://github.com/spanol" target="_blank">
            <v-icon name="bi-github" scale="2" animation="wrench" />
          </a>

          <a href="https://www.linkedin.com/in/vinicius-spanol/" target="_blank">
            <v-icon name="bi-linkedin" scale="2" animation="wrench" />
          </a>
        </div>
      </div>

      <div class="photo">
        <ImageComponent />
      </div>
    </div>
    <div class="stack flex items-center">
      <p class="bold mr-5">Main Tech Stack |</p>
      <v-icon name="vi-file-type-html" scale="2" />
      <v-icon name="vi-file-type-css" scale="2" />
      <v-icon name="vi-file-type-js" scale="2" />
      <v-icon name="vi-file-type-docker" scale="2" />
      <v-icon name="vi-file-type-nestjs" scale="2" />
      <v-icon name="vi-file-type-csharp" scale="2" />
      <v-icon name="vi-file-type-angular" scale="2" />
    </div>
  </div>
</template>

<script setup>
import ImageComponent from "./ImageComponment.vue"
</script>

<style></style>