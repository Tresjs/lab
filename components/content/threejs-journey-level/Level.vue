<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene: model } = await useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/threejs-journey/threejs-journey-level-vue.glb',
  {
    draco: true,
  },
)
console.log(model)
</script>

<template>
  <TresMesh v-bind="model" />
</template>
