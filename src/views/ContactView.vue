  <template>
    <div class="contact flex flex-col gap-y-10 ">
      <p class="font-extrabold text-lg uppercase text-blue-500">
        Contato
      </p>

      <div class="social-section mt-5">
        <h2 class="font-bold text-center md:text-start text-3xl">
          Você pode me encontrar nas seguintes redes sociais:
        </h2>

        <div class="social-options flex sm:flex-col justify-center mt-4">
          <!-- GitHub -->
          <div class="flex items-center mb-4">
            <div class="rounded-full shadow-card p-2 mr-4 bg-gray-100">
              <a href="https://github.com/spanol" target="_blank">
                <v-icon name="bi-github" scale="2" class="text-gray-800" />
              </a>
            </div>
            <div class="hidden sm:block">
              <p class="font-semibold">GitHub</p>
              <a href="https://github.com/spanol" target="_blank" class="text-blue-500 underline">
                github.com/spanol
              </a>
            </div>
          </div>

          <!-- LinkedIn -->
          <div class="flex items-center mb-4">
            <div class="rounded-full shadow-card p-2 mr-4 bg-blue-100">
              <a href="https://linkedin.com/in/vinicius-spanol" target="_blank" class="text-blue-500 underline">
                <v-icon name="bi-linkedin" scale="2" class="text-blue-500" />
              </a>
            </div>
            <div class="hidden sm:block">
              <p class="font-semibold">LinkedIn</p>
              <a href="https://linkedin.com/in/vinicius-spanol" target="_blank" class="text-blue-500 underline">
                linkedin.com/in/vinicius-spanol
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </template>