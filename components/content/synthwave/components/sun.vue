<script lang="ts" setup>
import { Color, Vector3 } from 'three'

export interface SunProps {
  colorA: string
  colorB: string
}

const props = defineProps<SunProps>()

const vertex = `
varying vec3 vPos;
void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const frag = `
#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec3 color_main;
uniform vec3 color_accent;
varying vec3 vPos;
void main() {
  vec3 color = mix(color_main, color_accent, vPos.y * 0.007 - 0.1);
  gl_FragColor = vec4(color, 1.0);
}
`

const uniforms = {
  color_main: {
    // sun's top color
    value: new Vector3().setFromColor(new Color(props.colorA)),
  },
  color_accent: {
    // sun's bottom color
    value: new Vector3().setFromColor(new Color(props.colorB)),
  },
}
</script>

<template>
  <TresMesh>
    <TresSphereGeometry :args="[60, 64, 64]" />
    <TresShaderMaterial :uniforms="uniforms" :vertex-shader="vertex" :fragment-shader="frag" :transparent="true" />
  </TresMesh>
</template>
