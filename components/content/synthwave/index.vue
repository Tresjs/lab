<script lang="ts" setup>
import { SRGBColorSpace, CineonToneMapping } from 'three'
import { PALETTE } from './components/palette'

const gl = {
  clearColor: PALETTE[0],
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
  logarithmicDepthBuffer: true,
}
</script>

<template>
  <TresCanvas v-bind="gl" :disable-render="true">
    <Postprocessing />
    <TresWebGLRenderer ref="rendererRef"></TresWebGLRenderer>
    <TresMesh ref="setupRef" :position="[0, 0, 0]"></TresMesh>

    <TresPerspectiveCamera :position="[0, 0, 12]">
      <TresPointLight :intensity="1000" :position="[0, 3, 0]" :color="PALETTE[1]" />
    </TresPerspectiveCamera>

    <TresAmbientLight :intensity="3" />
    <TresPointLight :intensity="10000" :position="[0, 3, -10]" :color="PALETTE[3]" />
    <TresPointLight :intensity="10000" :position="[0, 6, -40]" :color="PALETTE[8]" />

    <Stars />
    <Sun :position="[0, 80, -400]" :color-a="PALETTE[3]" :color-b="PALETTE[7]" />
    <Mountain :color-fills="PALETTE[8]" :position="[0, -4, -160]" />
    <Dust :color-fills="PALETTE[4]" />

    <TresGroup :position="[0, 0, -15]">
      <Terrain :color-fills="PALETTE[2]" :color-lines="PALETTE[6]" :position="[0, -1, 0]" />
    </TresGroup>
    <OrbitControls />
  </TresCanvas>
</template>
