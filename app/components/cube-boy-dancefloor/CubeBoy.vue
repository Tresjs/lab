<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'
import { computed } from 'vue'
import type { AnimationAction } from 'three'
import { LoopOnce } from 'three'

const { state: model, nodes } = useGLTF('/models/cube-boy/cube-boy-dance.glb', {
  draco: true,
})

watch(nodes, (nodes) => {
  console.log('nodes', nodes)
}, { immediate: true })
const rig = computed(() => nodes.value.Rig)

const animations = computed(() => model.value?.animations || [])

watch(animations, (animations) => {
  console.log('animations', animations)
}, { immediate: true })

const { actions } = useAnimations(animations, rig)
const currentAction = ref<AnimationAction>()

const transitionToAnimation = (animationName: string, duration = 0.5) => {
  const nextAction = actions[animationName]
  if (!nextAction) return

  // Fade out current animation
  if (currentAction.value) {
    currentAction.value.fadeOut(duration)
  }

  // Fade in new animation
  nextAction.reset()
  nextAction.setEffectiveWeight(1)
  nextAction.play()
  nextAction.fadeIn(duration)

  currentAction.value = nextAction
}

watch(actions, (actions) => {
  if (Object.keys(actions || {}).length === 0) { return }

  currentAction.value = actions.Wave
  currentAction.value.reset().play()
}, { immediate: true })

/* 
const animations = computed(() => model.value?.animations || [])

const { actions } = useAnimations(animations, rig)
const currentAction = ref<AnimationAction>()

watch(actions, (actions) => {
  if (!actions) { return }

  // Play the idle animation by default
  currentAction.value = actions.Cheer
  currentAction.value?.setLoop(LoopOnce, 1)
  currentAction.value?.play()

  const nextAnimation = actions.Idle as AnimationAction

  if (nextAnimation) {
    nextAnimation.setEffectiveWeight(1)
    nextAnimation.enabled = true
    nextAnimation.play()
  }
}, { immediate: true }) */
</script>

<template>
  <primitive v-if="rig" :object="rig" />
</template>
