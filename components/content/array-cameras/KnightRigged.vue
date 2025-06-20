<script setup lang="ts">
const { nodes, state } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/warcraft-3-alliance-footmanfanmade/source/Footman_RIG.glb',
)

watch(nodes, (newState) => {
  console.log(newState)
})

const model = computed(() => nodes.value.Footman_rig)
const animations = computed(() => state.value?.animations || [])

const { actions, mixer } = useAnimations(animations, model)

const currentAction = ref()


watch(actions, (newActions) => {
  currentAction.value = newActions.Idle
  currentAction.value.play()
})

const { animation } = useControls({
  animation: {
    value: 'Idle',
    options: [
      { text: 'Idle', value: 'Idle' },
      { text: 'SwordAndShieldCrouchBlockIdle', value: 'SwordAndShieldCrouchBlockIdle' },
      { text: 'SwordAndShieldDeath_2', value: 'SwordAndShieldDeath_2' },
      { text: 'SwordAndShieldIdle', value: 'SwordAndShieldIdle' },
      { text: 'SwordAndShieldKick', value: 'SwordAndShieldKick' },
      { text: 'SwordAndShieldRun(back)', value: 'SwordAndShieldRun(back)' },
      { text: 'SwordAndShieldRun', value: 'SwordAndShieldRun' },
      { text: 'SwordAndShieldSlash_2', value: 'SwordAndShieldSlash_2' },
      { text: 'SwordAndShieldSlash', value: 'SwordAndShieldSlash' },
      { text: 'T-Pose', value: 'T-Pose' },
    ],
  },
})

/* watch(animation, (value) => {
  currentAction.value.stop()
  currentAction.value = actions.value[value as unknown as string]
  currentAction.value.play()
}) */

const { onBeforeRender } = useLoop()

/* onBeforeRender(() => {
  if (mixer) {
    mixer.update(0.01)
  }
}) */
</script>

<template>
  <primitive v-if="model" :object="model" />
</template>
