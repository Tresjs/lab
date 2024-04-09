<script setup lang="ts">
defineProps<{
  title: string
  to: string
}>()
</script>

<template>
  <span class="rounded-full border-3">
    <NuxtLink
      :custom="true"
    >
      <a
        :href="to"
        :title="title"
        class="i-carbon-logo-github w-6 h-6"
      />
    </NuxtLink>
  </span>
</template>

<style scoped>
.dark span {
  background-color: rgb(34, 34, 34);
  border-color: rgb(34, 34, 34);
}

.dark a {
  background-color: rgb(209, 213, 219);
  text-shadow: rgb(34, 34, 34) 1px 0 10px;
}

span, .sepia span {
  background-color: #FFF;
  border-color: #FFF;
}

a, .sepia a {
  background-color: rgb(75, 85, 99);
  text-shadow: rgb(209, 213, 219) 1px 0 10px;
}
</style>
