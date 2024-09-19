<template>
  <div class="about">
    <p class="font-extrabold text-lg uppercase text-blue-500">
      Sobre
    </p>
    <div class="about flex flex-col-reverse xl:flex-row justify-center items-center gap-32">
      <div class="image-wrapper hidden xl:block">
        <img class="rounded-3xl" src="@/assets/menino-codando.webp" alt="">
      </div>

      <div class="infos flex flex-col gap-y-10 lg:w-2/4">

        <h1 class="font-bold text-3xl text-center mt-8 lg:mt-0">
          Olá! Eu sou Vinicius Spanol ╰(*°▽°*)╯
        </h1>

        <div class="text-xl text-light mt-3">
          <span>
            Meu nome é Vinicius, sou desenvolvedor fullstack apaixonado por criar aplicações limpas, seguras e
            inovadoras.
            Tenho experiência profissional com Angular e .NET Framework, e me destaco na utilização de bibliotecas de
            estilização como Tailwind e Bootstrap para entregar interfaces modernas e funcionais.
          </span>

          <br>
          <br>

          <span>
            No backend, já trabalhei profissionalmente com C# .NET e NestJS, e desenvolvi pequenos projetos utilizando
            Node.js (Express) e Flask. Também possuo experiência com bancos de dados NoSQL, como MongoDB, e SQL, com
            Oracle.
          </span>
          <br>
          <br>

          <span>
            Ao longo da minha carreira, explorei também o ecossistema de frameworks como React e Vue, além de consolidar
            minha experiência com Angular. No campo dos bancos de dados, já trabalhei com soluções NoSQL, como MongoDB,
            e
            SQL, com Oracle.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-wrapper {
  max-width: 425px;
  min-width: 350px;
}
</style>