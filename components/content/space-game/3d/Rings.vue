<script setup lang="ts">
import { inject } from 'vue'
import * as THREE from 'three'
import type { GameStore } from '../GameStore'

const geometry = new THREE.RingGeometry(1, 1.01, 64)
const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('lightgreen'), side: THREE.DoubleSide })
const gameStore: GameStore = inject('gameStore') as GameStore
</script>

<template>
  <TresGroup>
    <TresMesh
      v-for="{ position, rotation, scale }, i of gameStore.rings"
      :key="i"
      :geometry="geometry"
      :position="position"
      :material="material"
      :rotation="rotation"
      :scale="scale"
    />
  </TresGroup>
</template>
