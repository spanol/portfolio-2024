<template>
  <div class="about flex justify-center gap-32">
    <div class="image-wrapper">
      <img class="rounded-3xl" src="@/assets/menino-feliz.webp" alt="">
      <img class="rounded-3xl" src="@/assets/menino-barba.webp" alt="">
    </div>

    <div class="infos flex flex-col gap-y-10 w-2/4">
      <h1 class="font-extrabold text-lg text-blue-500">
        SOBRE
      </h1>


      <h2 class="font-bold text-3xl">
        Fullstack Developer
        based in São Paulo, Brazil 🚩
      </h2>

      <span class="text-xl mt-10">
        Meu nome é Vinicius, eu sou um desenvolvedor fullstack, minha paixão é criar e desenvolver aplicações limpas,
        seguras, e inovadoras.

        Minha stack atual é Angular com o .NET Framework, tenho experiencia com bibliotecas de estilização como
        tailwind, bootstrap, já efetuei diversos projetos para explorar pelo menos o básico de React, Vue e Angular que
        eu já tenho uma experiência profissional, também já estudei bancos de dado como Mongo (no-sql), oracle sql.
      </span>
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  width: 425px;
}
</style>