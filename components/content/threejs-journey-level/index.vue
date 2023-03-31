<script setup lang="ts">
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import Level from './Level.vue'

const gl = {
  clearColor: '#e0b7ff',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <OrbitControls />
    <TresPerspectiveCamera :position="[9, 9, 9]" :fov="25" :aspect="1" :near="0.1" :far="1000" />
    <Suspense>
      <TresGroup :position-y="-0.75">
        <Level />
      </TresGroup>
    </Suspense>
    <TheFireFlies />
    <TresAmbientLight />
  </TresCanvas>
</template>
