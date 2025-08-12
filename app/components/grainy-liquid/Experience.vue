<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import Blob from './Blob.vue'
import { BlendFunction } from 'postprocessing'

</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 6]" />
  <OrbitControls />
  
  <Blob />
  
  <TresDirectionalLight :position="[5, 5, 5]" :intensity="0.8" />
  <TresAmbientLight :intensity="0.3" />
  <Suspense>
    <EffectComposerPmndrs>
      <NoisePmndrs
        premultiply
        :blend-function="BlendFunction.COLOR_DODGE"
      />
    </EffectComposerPmndrs>
  </Suspense>
</template>