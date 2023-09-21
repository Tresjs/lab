<script lang="ts" setup>
import { SRGBColorSpace, WebGLRenderer, Camera, Mesh, Scene, CineonToneMapping, Vector2 } from 'three'
import { shallowRef } from 'vue'
import { BloomEffect, FXAAEffect, ScanlineEffect, EffectComposer, RenderPass, EffectPass } from 'postprocessing'
import { useWindowSize } from '@vueuse/core'
import { PALETTE } from './components/palette'
// Source: https://lospec.com/palette-list/synthwave-9

const gl = {
  clearColor: PALETTE[0],
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: CineonToneMapping,
  logarithmicDepthBuffer: true,
}

const setupRef = shallowRef(null)
const disableRenderRef = shallowRef(false)
let effectComposer: EffectComposer

function setup(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
  disableRenderRef.value = true
  effectComposer = new EffectComposer(renderer)
  const { width, height } = useWindowSize()
  renderer.setSize(width.value, height.value)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  const bloomEffect = new BloomEffect({
    intensity: 0.5,
    luminanceThreshold: 0,
    radius: 4,
  })
  const fxaaEffect = new FXAAEffect()

  fxaaEffect.minEdgeThreshold = 0.01
  const scanline = new ScanlineEffect()

  const renderPass = new RenderPass(scene, camera)
  const effectPass = new EffectPass(camera, fxaaEffect, bloomEffect, scanline)

  effectComposer = new EffectComposer(renderer)
  effectComposer.addPass(renderPass)
  effectComposer.addPass(effectPass)
}

useRenderLoop().onLoop(({ delta, elapsed }) => {
  effectComposer?.render()
})

watch([setupRef], () => {
  if (setupRef.value) {
    const mesh = setupRef.value as Mesh
    mesh.onAfterRender = (renderer, scene, camera, geometry, material, group) => {
      setup(renderer, scene, camera)
      mesh.removeFromParent()
    }
  }
})
</script>

<template>
  <TresCanvas v-bind="gl" :disable-render="disableRenderRef">
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
