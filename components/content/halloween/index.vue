<script setup lang="ts">
import type { Object3D } from 'three'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, DoubleSide, Vector3, PCFSoftShadowMap } from 'three'
import { vLightHelper, vAlwaysLookAt } from '@tresjs/cientos'

const gl = {
  clearColor: '#A590FF',
  shadows: true,
  alpha: false,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { value: position } = useControls({
  position: new Vector3(0, 1.5, -0.3),
})

const { value: intensity } = useControls({
  intensity: { 
    value: 5,
    min: 0,
    max: 100,
    step: 1,
  },
})

const { value: distance } = useControls({
  distance: { 
    value: 0,
    min: -100,
    max: 100,
    step: 0.1,
  },
})

const { value: decay } = useControls({
  decay: { 
    value: 100,
    min: 0,
    max: 1000,
    step: 10,
  },
})

const bloomParams = reactive({
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.3,
  mipmapBlur: true,
  intensity: 0.1,
})

const insideLightRef = ref<Object3D | null>(null)
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (insideLightRef.value) {
    insideLightRef.value.intensity = Math.sin(elapsed) * 6 + 7
  }
})
</script>

<template>
  <TresLeches />
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <Backdrop
      :floor="10"
      :scale="[100, 100, 10]"
      :position="[0, -0.15, -20]"
      receive-shadow
    >
      <TresMeshStandardMaterial
        :color="gl.clearColor"
        :side="DoubleSide"
      />
    </Backdrop>
    <TresPointLight
      ref="insideLightRef"
      color="#FF3F00"
      :scale="[0.5, 0.5, 0.5]"
      :intensity="intensity"
      :position-x="position.x"
      :position-y="position.y"
      :position-z="position.z"
      :distance="distance"
      :decay="decay"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      :shadow-camera-far="50"
      :shadow-camera-left="-10"
      :shadow-camera-right="10"
      :shadow-camera-top="10"
      :shadow-camera-bottom="-10"
      :shadow-bias="-0.000001"
      cast-shadow
    />

    <Suspense>
      <PumpkinIvysaur />
    </Suspense>
    <Suspense>
      <HalloweenDecorations />
    </Suspense>
    <EffectComposer :depth-buffer="true">
      <Bloom v-bind="bloomParams" />
    </EffectComposer>
    <TresAmbientLight :intensity="0.1" />
    <TresDirectionalLight
      v-light-helper
      color="#FF3F00"
      :intensity="0.2"
      :position="[3, 3, 3]"
      :shadow-mapSize-width="1024"
      :shadow-mapSize-height="1024"
      :shadow-camera-far="50"
      :shadow-camera-left="-10"
      :shadow-camera-right="10"
      :shadow-camera-top="10"
      :shadow-camera-bottom="-10"
      cast-shadow
    />
  </TresCanvas>
</template>