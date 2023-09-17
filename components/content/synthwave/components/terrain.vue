<script lang="ts" setup>
import { PlaneGeometry, TypedArray } from 'three'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise'
import { shallowRef } from 'vue'

export interface TerrainProps {
  colorFills: string
  colorLines: string
}

const props = defineProps<TerrainProps>()

const width = 40
const depth = 60
const STEP = 5

const ANIMATION = {
  speed: 3,
}

const NOISE_SCALE = 0.3

const landscapeRef = shallowRef({ position: { x: 0, y: 0, z: 0 } })
const positionArrayRef = shallowRef(new Uint32Array() as TypedArray)
const geometryRef = shallowRef(undefined as unknown as PlaneGeometry)
const lineMeshRef = shallowRef(undefined as unknown as Line2)

const noise = new ImprovedNoise().noise
function getVertexArray(offset = 0) {
  const geometry = new PlaneGeometry(width, depth, width, depth)
  const vertices = geometry.attributes.position.array
  const numVertices = vertices.length / 3
  for (let v = 0; v < numVertices; v++) {
    const i = v * 3
    const x = vertices[i]
    const y = vertices[i + 1] + offset
    vertices[i] += Math.sin(y * 0.33) * 0.25
    vertices[i + 2] = Math.abs(noise(x * NOISE_SCALE, y * NOISE_SCALE, 0)) * 7
    vertices[i + 2] *= Math.abs(Math.sin(x * 0.2)) + 0.1
    vertices[i + 2] += Math.sin(y * 0.133) * 0.5
  }
  return vertices
}

function getLinePositions() {
  let linePositions = []
  for (let row = 0; row < depth; row++) {
    let isEvenRow = row % 2 == 0
    for (let col = isEvenRow ? 0 : width - 1; isEvenRow ? col < width : col >= 0; isEvenRow ? col++ : col--) {
      for (let point = isEvenRow ? 0 : 3; isEvenRow ? point < 4 : point >= 0; isEvenRow ? point++ : point--) {
        let mappedIndex
        let rowOffset = row * (width + 1)
        if (point < 2) {
          mappedIndex = rowOffset + col + point
        } else {
          mappedIndex = rowOffset + col + point + width - 1
        }

        linePositions.push(positionArrayRef.value[mappedIndex * 3])
        linePositions.push(positionArrayRef.value[mappedIndex * 3 + 1])
        linePositions.push(positionArrayRef.value[mappedIndex * 3 + 2])
      }
    }
  }
  return linePositions
}

{
  positionArrayRef.value = getVertexArray()
  // the grid lines, reference: https://threejs.org/examples/?q=line#webgl_lines_fat
  const lineGeometry = new LineGeometry()
  lineGeometry.setPositions(getLinePositions())
  // This is a specific way to map line points to cooresponding vertices of the planeGeometry

  // the material for the grid lines
  let lineMaterial = new LineMaterial({
    color: new Number(props.colorLines) as number,
    linewidth: 0.005, // in world units with size attenuation, pixels otherwise
    alphaToCoverage: false,
    worldUnits: true, // such that line width depends on world distance
  })

  // create the lines mesh and add to scene
  let line = new Line2(lineGeometry, lineMaterial)
  line.position.set(0, 0.01, 0)
  line.rotation.x -= Math.PI / 2
  lineMeshRef.value = line
}

let offset = 0
useRenderLoop().onLoop(({ delta }) => {
  landscapeRef.value.position.z += delta * ANIMATION.speed

  while (landscapeRef.value.position.z > STEP) {
    landscapeRef.value.position.z -= STEP
    offset += STEP
    positionArrayRef.value = getVertexArray(offset)
    lineMeshRef.value.geometry.setPositions(getLinePositions())
    if (geometryRef.value) {
      geometryRef.value.attributes.position.needsUpdate = true
      geometryRef.value.computeVertexNormals()
    }
  }
})
</script>

<template>
  <TresGroup ref="landscapeRef">
    <TresMesh :rotation="[-Math.PI * 0.5, 0, 0]">
      <TresPlaneGeometry
        ref="geometryRef"
        :args="[width, depth, width, depth]"
        :attributes-position-array="positionArrayRef"
      />
      <TresMeshPhongMaterial :color="props.colorFills" :flat-shading="true" :shininess="100" />
    </TresMesh>
    <primitive :object="lineMeshRef" />
  </TresGroup>
</template>
