<script setup lang="ts">
const { scene } = await useGLTF('/models/halloween/halloween-decoration.glb', { draco: true })
scene.traverse((child) => {
  if (child.isMesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})
</script>

<template>
  <primitive :object="scene" />
</template>