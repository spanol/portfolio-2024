  <template>
    <div class="contact flex flex-col gap-y-10 dark:bg-dark-background dark:text-dark-text">


      <div class="social-section mt-5">
        <h2 class="font-bold text-center md:text-start text-3xl">
          Você pode me encontrar nas seguintes redes sociais:
        </h2>

        <div class="social-options flex sm:flex-col justify-center mt-4">
          <!-- GitHub -->
          <div class="flex items-center mb-4">
            <div class="rounded-full shadow-card p-2 mr-4 bg-gray-100 dark:bg-dark-surface">
              <a href="https://github.com/spanol" target="_blank">
                <v-icon name="bi-github" scale="2" class="text-gray-800 dark:text-dark-text" />
              </a>
            </div>
            <div class="hidden sm:block">
              <p class="font-semibold">GitHub</p>
              <a href="https://github.com/spanol" target="_blank" class="text-blue-500 dark:text-blue-400 underline">
                github.com/spanol
              </a>
            </div>
          </div>

          <!-- LinkedIn -->
          <div class="flex items-center mb-4">
            <div class="rounded-full shadow-card p-2 mr-4 bg-blue-100 dark:bg-dark-surface">
              <a href="https://linkedin.com/in/vinicius-spanol" target="_blank"
                class="text-blue-500 dark:text-blue-400 underline">
                <v-icon name="bi-linkedin" scale="2" class="text-blue-500 dark:text-blue-400" />
              </a>
            </div>
            <div class="hidden sm:block">
              <p class="font-semibold">LinkedIn</p>
              <a href="https://linkedin.com/in/vinicius-spanol" target="_blank"
                class="text-blue-500 dark:text-blue-400 underline">
                linkedin.com/in/vinicius-spanol
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </template>