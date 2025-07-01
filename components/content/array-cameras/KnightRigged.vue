<script setup lang="ts">
import type { TresObject } from '@tresjs/core'

const { nodes, state } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb',
)

watch(nodes, (newState) => {
  console.log(newState)
})

const model = computed(() => nodes.value.Footman_rig)
const animations = computed(() => state.value?.animations || [])

const { actions } = useAnimations(animations, model)

const currentAction = ref()


watch(actions, (newActions) => {
  currentAction.value = newActions.Idle
  currentAction.value.play()
})

</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
