<script setup lang="ts">
import type { Mesh } from 'three'
import { Vector3, Color } from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const { onBeforeRender } = useLoop()

const blobRef = ref<Mesh | null>(null)

const { amplitude, frequency, speed, colorA, colorB, colorC, noiseScale, grainIntensity, fresnelPower } = useControls({
  amplitude: {
    value: 0.15,
    min: 0,
    max: 0.5,
    step: 0.01,
    label: 'Amplitude'
  },
  frequency: {
    value: 1.2,
    min: 0.1,
    max: 3,
    step: 0.1,
    label: 'Frequency'
  },
  speed: {
    value: 0.8,
    min: 0.1,
    max: 2,
    step: 0.1,
    label: 'Speed'
  },
  colorA: '#1a66cc',
  colorB: '#cc3366',
  colorC: '#e6e6e6',
  noiseScale: {
    value: 2.0,
    min: 0.5,
    max: 5,
    step: 0.1,
    label: 'Noise Scale'
  },
  grainIntensity: {
    value: 0.05,
    min: 0,
    max: 0.2,
    step: 0.01,
    label: 'Grain'
  },
  fresnelPower: {
    value: 2.0,
    min: 0.5,
    max: 5,
    step: 0.1,
    label: 'Fresnel'
  }
})

function hexToVector3(hex: string): Vector3 {
  const color = new Color(hex)
  return new Vector3(color.r, color.g, color.b)
}

const uniforms = ref({
  u_time: { value: 0.0 },
  u_amplitude: { value: amplitude.value },
  u_frequency: { value: frequency.value },
  u_speed: { value: speed.value },
  u_colorA: { value: hexToVector3(colorA.value) },
  u_colorB: { value: hexToVector3(colorB.value) },
  u_colorC: { value: hexToVector3(colorC.value) },
  u_noiseScale: { value: noiseScale.value },
  u_grainIntensity: { value: grainIntensity.value },
  u_fresnelPower: { value: fresnelPower.value }
})

watch([amplitude, frequency, speed, noiseScale, grainIntensity, fresnelPower], () => {
  uniforms.value.u_amplitude.value = amplitude.value
  uniforms.value.u_frequency.value = frequency.value
  uniforms.value.u_speed.value = speed.value
  uniforms.value.u_noiseScale.value = noiseScale.value
  uniforms.value.u_grainIntensity.value = grainIntensity.value
  uniforms.value.u_fresnelPower.value = fresnelPower.value
})

watch([colorA, colorB, colorC], () => {
  uniforms.value.u_colorA.value = hexToVector3(colorA.value)
  uniforms.value.u_colorB.value = hexToVector3(colorB.value)
  uniforms.value.u_colorC.value = hexToVector3(colorC.value)
})

onBeforeRender(({ elapsed }) => {
  if (uniforms.value) {
    uniforms.value.u_time.value = elapsed
  }
  
  if (blobRef.value) {
    blobRef.value.rotation.y += 0.005
    blobRef.value.rotation.x += 0.002
  }
})
</script>

<template>
  <TresMesh ref="blobRef">
    <TresIcosahedronGeometry :args="[2, 64]" />
    <TresShaderMaterial 
      :uniforms="uniforms" 
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :transparent="false"
      :side="0"
    />
  </TresMesh>
</template>