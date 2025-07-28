<script setup lang="ts">
defineProps<{
  title: string
  to: string
}>()
</script>

<template>
  <UButton :to="to" :title="title" icon="i-carbon-logo-github" class="rounded-full" color="neutral" variant="subtle"
    size="sm" />
</template>
