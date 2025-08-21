<template>
    <h1
        class="flex flex-col lg:flex-row font-bold text-4xl sm:text-5xl text-primary transition-colors duration-200 xl:text-nowrap">
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
        <a v-for="(icon, index) in contactIcons" :key="index" :href="icon.link" target="_blank" class="text-primary">
            <v-icon :name="icon.icon" scale="2.5" />
        </a>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    contactIcons: Array<{
        name: string;
        link: string;
        icon: string;
    }>;
}>();
</script>