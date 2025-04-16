<script setup lang="ts">
import { Color, DoubleSide, MeshStandardMaterial } from 'three'

const { state, nodes, materials } = useGLTF('/models/cult-of-the-lamb/Ritual.glb', { draco: true })

const pentagram = computed(() => nodes.value?.['Pentagram'])
const pentagramTexture = await useTexture(['/models/cult-of-the-lamb/pentagram.png'])
pentagramTexture.flipY = false


watch(pentagram, (pentagramObject) => {
  pentagramObject.material = new MeshStandardMaterial({
    alphaMap: pentagramTexture,
    transparent: true,
    side: DoubleSide,
  })
})

const symbols = computed(() => {
  if (!nodes.value) return []
  return Object.entries(nodes.value)
    .filter(([key]) => key.includes('Symbol'))
    .map(([_, node]) => node)
})


const symbolsTexture = await useTexture(['/models/cult-of-the-lamb/symbols.png'])

symbolsTexture.flipY = false

const symbolsMaterial = new MeshStandardMaterial({
  alphaMap: symbolsTexture,
  transparent: true,
  side: DoubleSide,
  emissive: 0xff0000,
  emissiveIntensity: 8,
  emissiveMap: symbolsTexture,
})

watch(symbols, (value) => {
  value.forEach((items) => {
    items.material = symbolsMaterial
  })
})

// Candles

// const candles = seekAllByName(state.value?.scene, 'Candle')
const candles = computed(() => {
  if (!nodes.value) return []
  return Object.entries(nodes.value)
    .filter(([key]) => key.includes('Candle'))
    .map(([_, node]) => node)
})

watch(materials, (value) => {
  value['Flame'].emissiveIntensity = 8
  value['Flame'].emissive = new Color('#C55B37')
})
</script>

<template>
  <TresGroup>
    <primitive v-if="pentagram" :object="pentagram" />
    <template v-for="(symbol, index) in symbols" :key="index">
      <Levioso>
        <primitive v-if="symbol" :object="symbol" />
      </Levioso>
    </template>
    <template v-for="(candle, index) in candles" :key="index">
      <primitive v-if="candle" :object="candle" />
    </template>
  </TresGroup>
</template>
