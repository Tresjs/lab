<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'
import type { TresObject } from '@tresjs/core'
import { Color } from 'three'

const { scene, nodes, materials } = await useGLTF('/models/porsche/911-transformed.glb', {
  draco: true,
})

// Apply material properties similar to R3F example
/* Object.values(nodes).forEach((node: TresObject) => {
  if (node.isMesh) {
    node.castShadow = true
    node.receiveShadow = true
  }
}) */

// Update materials to match R3F example
if (materials.rubber) {
  materials.rubber.color = new Color('#222')
  materials.rubber.roughness = 0.6
  materials.rubber.roughnessMap = null
  materials.rubber.normalScale.set(4, 4)
}

if (materials.window) {
  materials.window.color = new Color('black')
  materials.window.roughness = 0
  materials.window.clearcoat = 0.1
}

if (materials.coat) {
  materials.coat.envMapIntensity = 4
  materials.coat.roughness = 0.5
  materials.coat.metalness = 1
}

if (materials.paint) {
  materials.paint.envMapIntensity = 2
  materials.paint.roughness = 0.45
  materials.paint.metalness = 0.8
  materials.paint.color = new Color('#555')
}
</script>

<template>
  <primitive  
    :scale="[1.6, 1.6, 1.6]" 
    :position="[-0.5, -0.18, 0]" 
    :rotation="[0, Math.PI / 5, 0]" 
    :object="scene" 
  />
</template>
