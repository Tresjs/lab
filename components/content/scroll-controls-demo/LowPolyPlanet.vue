<script setup lang="ts">
import { shallowRef } from 'vue'

const { scene: planet } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/planet.gltf',
)


const planetRef = shallowRef()

planet.traverse(child => {
  if (child.isMesh) {
    child.receiveShadow = true
  }
})

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (!planet) return
  planet.rotation.y += delta * 0.04
  planet.rotation.z += delta * 0.02
  planet.rotation.x += delta * 0.05
  planet.updateMatrixWorld()
})
</script>
<template>
  <primitive ref="planetRef" :object="planet" />
<!--   <Cloud v-for="cloud of [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="cloud" :planet="planetRef" /> -->
</template>
