<template>
  <a
    class="contact-card surface-card"
    :href="icon.link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="contact-card__icon" aria-hidden="true">
      <v-icon :name="icon.icon" scale="1.35" />
    </span>
    <span class="min-w-0">
      <span class="block text-sm font-bold text-ink">{{ icon.name }}</span>
      <span class="contact-card__url">{{ icon.link }}</span>
    </span>
    <v-icon class="ml-auto shrink-0 text-muted" name="bi-link-45deg" scale="1.15" aria-hidden="true" />
  </a>
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

<style scoped>
.contact-card {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  transition: border-color var(--motion-fast) ease, transform var(--motion-fast) ease;
}

.contact-card:hover {
  transform: translateY(-2px);
  border-color: hsl(var(--color-primary) / 0.55);
}

.contact-card__icon {
  display: grid;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: var(--radius-control);
  color: hsl(var(--color-primary));
  background: hsl(var(--color-primary) / 0.1);
}

.contact-card__url {
  display: block;
  overflow: hidden;
  margin-top: 0.25rem;
  color: hsl(var(--color-muted));
  font-size: 0.74rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
