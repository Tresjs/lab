
<script setup lang="ts">
const { scene } = await useGLTF('/models/kaykit-adventure-pack/chest_large.glb', { draco: true })

scene.position.set(3, 0, -3)
</script>

<template>
  <primitive :object="scene" />
</template>