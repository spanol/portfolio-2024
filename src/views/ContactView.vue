  <template>
    <div class="contact flex flex-col gap-y-10 mt-10 dark:bg-dark-background dark:text-dark-text">

      <div class="social-section mt-5">
        <h2 class="font-bold text-center md:text-start text-3xl">
          Você pode me encontrar nas seguintes redes sociais 😉:
        </h2>

        <div class="social-options flex sm:flex-col justify-center mt-4">
          <div class="flex flex-col items-start mb-4">
            <div v-for="(icon, index) in contactIcons" :key="index" class="flex items-center mb-4">
              <div class="rounded-full shadow-card p-2 mr-4 bg-gray-100 dark:bg-dark-surface">
                <a :href="icon.link" target="_blank">
                  <v-icon :name="icon.icon" scale="2" class="text-gray-800 dark:text-dark-text" />
                </a>
              </div>
              <div class="hidden sm:block">
                <p class="font-semibold">{{ icon.name }}</p>
                <a :href="icon.link" target="_blank" class="text-blue-500 dark:text-blue-400 underline">
                  {{ icon.link }}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </template>

<script setup>
import { contactIcons } from '@/data/contactIcons';
</script>