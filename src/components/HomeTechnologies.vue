<template>
    <div
        class="stack flex flex-col lg:flex-row items-center gap-y-8 gap-x-5 mt-16 lg:mt-20 shadow-lg border dark:border-dark-border dark:bg-dark-surface rounded-xl p-5">
        <p class="font-medium border-b-2 border-light text-primary dark:border-dark-border lg:border-0 lg:text-nowrap">
            Principais tecnologias
        </p>
        <div class="vertical-divisor hidden lg:block dark:text-dark-text">
            |
        </div>

        <div class="flex flex-wrap lg:flex-shrink justify-center gap-x-5">
            <div v-for="(icon, index) in techStackIcons" :key="index" class="flex hover:-translate-y-4 cursor-pointer">
                <v-icon :name="icon.icon" scale="3" class="dark:text-dark-text" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    techStackIcons: Array<{
        name: string;
        icon: string;
    }>;
}>();
</script>