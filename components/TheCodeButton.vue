<script setup lang="ts">
defineProps<{
  title: string
  to: string
}>()
</script>

<template>
  <NuxtLink
    :custom="true"
  >
    <a
      :href="to"
      :title="title"
      class="i-carbon-logo-github w-6 h-6"
    />
  </NuxtLink>
</template>

<style scoped>
a {
  display: inline-block;
  z-index: 10;
}
.dark a {
  background-color: rgb(209, 213, 219);
  text-shadow: rgb(34, 34, 34) 1px 0 10px;
}

.sepia a {
  text-shadow: rgb(209, 213, 219) 1px 0 10px;
  background-color: rgb(34, 34, 34);
}
</style>
