<template>
    <div class="flex items-center mb-4">
        <div class="rounded-full shadow-card p-2 mr-4 bg-gray-100 dark:bg-dark-surface">
            <a :href="icon.link" class="text-primary" target="_blank">
                <v-icon :name="icon.icon" scale="2" />
            </a>
        </div>
        <div class="hidden sm:block">
            <p class="font-semibold">{{ icon.name }}</p>
            <a :href="icon.link" target="_blank" class="text-blue-500 dark:text-blue-400 underline">
                {{ icon.link }}
            </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    icon: {
        name: string;
        link: string;
        icon: string;
    };
}>();
</script>