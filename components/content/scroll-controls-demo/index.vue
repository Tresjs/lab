<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import {  Stars, ScrollControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#0F4866',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const progress = ref(0)
const scRef = ref()
</script>

<template>
    <main>
    <section>
      <h1>First section</h1>
    </section>
     <section>
      <h2>Second section</h2>
    </section>
    <section>
      <h3 >Third section</h3>
    </section>
  </main>
  <TresCanvas v-bind="gl" window-size>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <ScrollControls ref="scRef" 
      v-model="progress"
      :distance="10"
      :smooth-scroll="0.1"
      >
        <Suspense>
            <LowPolyPlanet />
        </Suspense>
    </ScrollControls>
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>

<style scoped>
.container {
  height: 50vh;
}
main {
  background-color: transparent;
}
section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  outline: 1px solid red;
}
h1,
h2,
h3 {
  color: #f7f7f7;
}
</style>
