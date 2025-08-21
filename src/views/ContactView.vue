  <template>
    <div class="contact flex flex-col my-auto gap-y-10 dark:text-dark-text">
      <div class="social-section">
        <h2 class="font-bold text-center md:text-start text-3xl">
          Você pode me encontrar nas seguintes redes sociais! 😉
        </h2>

        <div class="social-options flex sm:flex-col items-center sm:items-start justify-center mt-4">
          <ContactOptions v-for="(icon, index) in contactIcons" :key="index" :icon="icon" />
        </div>
      </div>
    </div>
  </template>

<script setup>
import ContactOptions from '@/components/ContactOptions.vue';
import { contactIcons } from '@/data/contactIcons';
</script>