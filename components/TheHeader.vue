<script lang="ts" setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="bg-(--ui-bg)/75 backdrop-blur border-b border-(--ui-border) h-(--ui-header-height) sticky top-0 z-50">
    <UContainer class="h-full flex items-center justify-between">
      <div class="flex items-center">
        <img src="/logo.svg" alt="Tres.js" class="h-3 mr-4">
        <a class="font-bold text-dark font-sans" href="/" title="Home">Tres<span class="text-primary-300">JS</span></a>
        <UBadge variant="soft" color="neutral" size="xs" class="ml-2">Next</UBadge>
      </div>
      <ul class="flex gap-4 justify-between items-center">
        <button title="Toggle dark mode" class="bg-transparent -mt-1" @click="toggleDark()">
          <i v-if="isDark" class="i-carbon-sun" />
          <i v-else class="i-carbon-moon" />
        </button>
        <a href="https://tresjs.org/" target="_blank" class="i-carbon-document" />
        <a href="https://github.com/Tresjs/lab" target="_blank" class="i-carbon-logo-github" />
      </ul>
    </UContainer>
  </header>
</template>
