<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
  clearColor: 'gray',
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Suspense>
      <Environment
        background
        :blur="0.5"
        preset="snow"
      />
    </Suspense>
    <Suspense>
      <Chest />
    </Suspense>
    <Suspense>
      <Knight />
    </Suspense>
    <ContactShadows />
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>