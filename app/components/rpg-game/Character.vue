<script setup lang="ts">
import type { Object3D } from 'three'
import useCharacterCtrl from './composables/useCharacterCtrl'
import usePlayerState from './composables/usePlayerState'

const { state: model, nodes } = useGLTF('/models/knight/Knight.glb')
const rig = computed(() => nodes.value.Rig as Object3D)

const animations = computed(() => model.value?.animations || [])

const { selectedWeapon } = usePlayerState()
const { mixer } = useCharacterCtrl(rig, animations)

const toggableObjects = ref<string[]>([
  'Badge_Shield',
  'Rectangle_Shield',
  'Round_Shield',
  'Spike_Shield',
  '1H_Sword',
  '1H_Sword_Offhand',
  '2H_Sword'
])

watch(nodes, (nodes) => {
  if (!nodes) return
  toggableObjects.value.forEach((name) => {
    const object = nodes[name]
    if (!object) return
    object.visible = false
    object.needUpdate = true
  })
})

watch([selectedWeapon, nodes], ([weapon, nodes]) => {
  const weaponNode = nodes[weapon]
  if (!weaponNode) return
  weaponNode.visible = true
  weaponNode.needUpdate = true
}, { immediate: true })

watch([nodes, animations], ([nodes, animations]) => {
  console.log('Character', {
    nodes,
    animations,
  })
}, { immediate: true })

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  mixer.value?.update(delta)
})

/* const { actions } = useAnimations(animations, rig)

watch(actions, (actions) => {
  if (!actions) return
  actions?.Idle?.play()
}) */

useControls({
  awiwi: false
})

</script>
<template>
  <primitive v-if="rig" :object="rig" />
</template>