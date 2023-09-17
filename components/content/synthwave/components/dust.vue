<script lang="ts" setup>
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Points,
  PointsMaterial,
  TextureLoader,
} from 'three'

export interface DustProps {
  colorFills: string
}

const props = defineProps<DustProps>()

const width = 40
const height = 40
const depth = 4
const NUM_CHUNKS = 10
const NUM_PARTICLES_PER_CHUNK = 250

const sprite = new TextureLoader().load(
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png',
)

const size = 0.1

const material = new PointsMaterial({
  size: size,
  map: sprite,
  blending: AdditiveBlending,
  depthTest: true,
  transparent: true,
  color: props.colorFills,
})

const rangeSplit = (n: number) => {
  return n * (Math.random() - 0.5)
}
const group = new Group()
for (let i = 0; i < NUM_CHUNKS; i++) {
  const geometry = new BufferGeometry()
  const vertices = []
  const particles = new Points(geometry, material)
  group.add(particles)
  particles.position.z = -depth * i

  for (let i = 0; i < NUM_PARTICLES_PER_CHUNK; i++) {
    const x = rangeSplit(width)
    const y = rangeSplit(height)
    const z = Math.random() * depth
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
}

const { onLoop } = useRenderLoop()
onLoop(({ delta, elapsed }) => {
  group.position.z += delta * 5
  while (group.position.z > depth * 3) {
    group.position.z -= depth
    const c = group.children[0].removeFromParent()
    group.add(c)
    group.children.forEach((child, i) => {
      child.position.z = -i * depth
    })
  }
})
</script>

<template>
  <primitive :object="group" />
</template>
