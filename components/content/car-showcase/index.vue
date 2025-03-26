<script setup lang="ts">

import Porsche from './Porsche.vue'
import Lightformers from './Lightformers.vue'
import CameraRig from './CameraRig.vue'
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
  LinearToneMapping,
  CineonToneMapping,
  ReinhardToneMapping,
  NoToneMapping,
  AgXToneMapping,
} from 'three'



const gl = {
  clearColor: 'black',
  shadows: true,
  antialias: true,
  alpha: true,
  toneMapping: ACESFilmicToneMapping,
  powerPreference: 'high-performance',
  outputColorSpace: SRGBColorSpace,
  shadowMapType: 'PCFSoftShadowMap',
}

</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 1, 15]" :fov="30" />
    <Suspense>
      <Porsche />
    </Suspense>
    <!-- <TresAmbientLight :intensity="1" /> -->
    <TresSpotLight ref="spotLightRef" :position="[0, 15, 0]" :angle="0.3" :penumbra="1" :intensity="200" :decay="2"
      cast-shadow :shadow-bias="-0.0001" />
    <TresAmbientLight :intensity="0.5" />
    <ContactShadows :frames="20" :blur="3.5" :resolution="512" :opacity="1" />
    <Suspense>
      <Environment :frames="Infinity" preset="sunset" background :blur="1" :resolution="256">
        <Lightformers />
      </Environment>
    </Suspense>
    <CameraRig />

  </TresCanvas>
</template>