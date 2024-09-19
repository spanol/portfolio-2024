<template>
  <div class="contact flex flex-col gap-y-10 ">
    <p class="font-extrabold text-lg uppercase text-blue-500">
      Contato
    </p>

    <div>
      <h2 class="font-bold text-3xl">
        Você pode me encontrar nas seguintes redes sociais:
      </h2>
      <div class="social-links mt-4 flex space-x-4">
        <a href="https://github.com/spanol" target="_blank">
          <v-icon name="bi-github" scale="2" class="text-gray-800" />
        </a>
        <a href="https://linkedin.com/in/vinicius-spanol" target="_blank">
          <v-icon name="bi-linkedin" scale="2" class="text-blue-500" />
        </a>
        <a href="https://twitter.com/seu-perfil" target="_blank">
          <v-icon name="bi-twitter" scale="2" class="text-blue-400" />
        </a>
      </div>
    </div>


    <div class="mt-10">
      <h3 class="font-bold text-2xl">
        Ou, se preferir, me envie um email:
      </h3>

      <form class="contact-form mt-5">
        <div class="mb-4">
          <label for="name" class="block font-bold mb-1">Nome</label>
          <input type="text" id="name" class="border w-full p-2 rounded" placeholder="Seu nome" />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-bold mb-1">Email</label>
          <input type="email" id="email" class="border w-full p-2 rounded" placeholder="Seu email" />
        </div>
        <div class="mb-4">
          <label for="message" class="block font-bold mb-1">Mensagem</label>
          <textarea id="message" class="border w-full p-2 rounded" rows="4" placeholder="Sua mensagem"></textarea>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>