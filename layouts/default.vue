<script lang="ts" setup></script>

<template>
  <TheHeader />
  <NuxtLoadingIndicator />
  <UContainer class="pt-56px">
    <main class="min-h-[calc(100vh-var(--ui-header-height))]">
      <slot />
    </main>
  </UContainer>
</template>

<style scoped></style>
