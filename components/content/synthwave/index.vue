<script lang="ts" setup>
import { SRGBColorSpace, CineonToneMapping } from 'three'
import { PALETTE } from './components/palette'

const gl = {
  clearColor: PALETTE[0],
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
}

</script>

<template>
  <MusicPlayer />
  <TresCanvas v-bind="gl">
    <TheExperience />
  </TresCanvas>
</template>
