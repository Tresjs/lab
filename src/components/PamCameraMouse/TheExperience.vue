<script setup lang="ts">
import { sRGBEncoding } from 'three'
import { PamCameraMouse } from '@tresjs/cientos'
import { useRenderLoop } from '@tresjs/core'

import Vertex from './shaders/vertex.glsl'
import Fragment from './shaders/fragment.glsl'

const shader = {
  vertexShader: Vertex,
  fragmentShader: Fragment,
  uniforms: {
    uTime: { value: 0 },
  },
}

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  shader.uniforms.uTime.value = elapsed
})
</script>

<template>
  <Suspense>
    <TresCanvas clear-color="#201919" shadows alpha window-size :output-encoding="sRGBEncoding">
      <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" :near="0.1" :far="1000" />
      <PamCameraMouse :factor="2" />
      <TresScene>
        <TresMesh :scale="2" :position="[0.5, 0.5, 0]" cast-shadow>
          <TresSphereGeometry :args="[1, 30, 30]" />
          <TresShaderMaterial v-bind="shader" />
        </TresMesh>
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
