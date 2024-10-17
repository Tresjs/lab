<script setup lang="ts">
import { useLoop } from '@tresjs/core'

const { render, pauseRender, resumeRender } = useLoop()

const { off } = render(({ renderer, scene, camera }) => {
  renderer.render(scene, camera)
})
</script>

<template>
  <TresGroup>
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresGroup>
</template>