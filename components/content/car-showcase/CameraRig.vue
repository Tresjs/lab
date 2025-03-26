<script setup lang="ts">
import { SpotLight, SpotLightHelper, Vector3 } from 'three'
const { onBeforeRender } = useLoop()


onBeforeRender(({ elapsed, camera }) => {
  camera.position.lerp(new Vector3().set(Math.sin(elapsed / 5), 0, 12 + Math.cos(elapsed / 5) / 2), 0.05)
  camera.lookAt(0, 0, 0)
})
</script>

<template>
</template>