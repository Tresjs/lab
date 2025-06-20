<script setup>
import { PerspectiveCamera, Vector4, Vector3 } from 'three'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const WIDTH = (width.value / 4) * window.devicePixelRatio
const HEIGHT = (height.value / 4) * window.devicePixelRatio
const ASPECT_RATIO = computed(() => width.value / height.value)

const cameras = []

const cameraOptions = [
  {
    viewPort: new Vector4(Math.floor(0), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(15, 0, 3),
    factor: 0.4,
    name: 'left_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(0, 0, -3),
    factor: 2,
    name: 'center_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH * 2), Math.floor(0), Math.ceil(WIDTH * 2), Math.ceil(HEIGHT * 2)),
    position: new Vector3(-15, 0, 3),
    factor: 0.4,
    name: 'right_bottom',
  },
  {
    viewPort: new Vector4(Math.floor(WIDTH - 75), Math.floor(HEIGHT), Math.ceil(WIDTH * 2.5), Math.ceil(HEIGHT * 2.5)),
    position: new Vector3(0, 0, 3),
    factor: 2,
    name: 'center_top',
  },
]

cameraOptions.forEach((data) => {
  const currentCam = new PerspectiveCamera(40, ASPECT_RATIO.value, 0.1, 10)
  currentCam.name = data.name
  currentCam.viewport = data.viewPort
  currentCam.position.set(...data.position)
  currentCam.position.multiplyScalar(data.factor)
  currentCam.lookAt(0, 0, 0)
  currentCam.updateMatrixWorld()
  cameras.push(currentCam)
})
useControls('fpsgraph')
</script>

<template>
  <TresCanvas window-size clear-color="#82DBC5">
    <TresArrayCamera :args="[cameras]" :position="[0, 2, 5]" />
    <KnightRigged />
    <TresAmbientLight :color="0xffffff" :intensity="1" />
    <TresSpotLight :color="0xffffff" :intensity="100" :position="[0, 0, 5]" />
    <TresDirectionalLight :color="0xffffff" :intensity="5" />
    <TresHemisphereLight />
    <TresGridHelper :size="10" :divisions="10" />
  </TresCanvas>
</template>
