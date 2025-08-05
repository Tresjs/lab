<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { colors } from './constants'
const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <TresCanvas :clear-color="isDark ? colors.DARK : colors.LIGHT" window-size>
    <BrownianDistributionExperiment />
  </TresCanvas>
  <UButton variant="subtle" color="neutral" :icon="isDark ? 'i-carbon-sun' : 'i-carbon-moon'"
    class="fixed rounded-full z-10 bottom-5 right-15 p-1" @click="toggleDark()" />
</template>
