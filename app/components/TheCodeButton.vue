<script setup lang="ts">
defineProps<{
  title: string
  to: string
}>()

const visible = ref(true)

defineShortcuts({
  h: () => {
    visible.value = !visible.value
  }
})
</script>

<template>
  <UButton v-if="visible" :to="to" :title="title" icon="i-carbon-logo-github" class="rounded-full" color="neutral"
    variant="subtle" size="sm" />
</template>
