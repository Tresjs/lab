<script setup lang="ts">
import { randomLoading as loading } from 'PLS/UIdemo'
import * as THREE from 'three'
import { OrbitControls, Environment } from '@tresjs/cientos'
import background from './background.vue'
import model from './model.vue'

const tcConfig = {
  clearColor: '#ffffff',
  windowSize: true,
  toneMapping: THREE.ACESFilmicToneMapping,
  toneMappingExposure: 0.8,
  shadows: true,
  outputColorSpace: THREE.SRGBColorSpace,
}
</script>

<template>
  <TresCanvas v-bind="tcConfig">
    <TresPerspectiveCamera
      :position="[0, 0, 16]"
      :fov="45"
      :near="0.1"
      :far="10000"
    />
    <OrbitControls
      enable-damping
      :enable-pan="false"
      :enable-zoom="false"
      :max-polar-angle="Math.PI / 1.7"
      :min-polar-angle="Math.PI / 2.4"
      :max-azimuth-angle="0.1"
      :min-azimuth-angle="-0.1"
    />
    <TresAmbientLight :intensity="0.5" />

    <background />

    <Suspense>
      <model />
    </Suspense>
    <Suspense>
      <!-- eslint-disable-next-line max-len -->
      <Environment files="https://raw.githubusercontent.com/hawk86104/icegl-three-vue-tres/refs/heads/master/public/plugins/eCommerce/platz.hdr" />
    </Suspense>
  </TresCanvas>
</template>