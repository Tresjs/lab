<script setup lang="ts">
const { scene, animations } = await useGLTF('/models/kaykit-adventure-pack/Knight.glb', { draco: true })

const { actions, mixer } = useAnimations(animations, scene)

const currentAction = ref(actions['Idle'])
currentAction.value.play()

const weapons = reactive({})
const shields = reactive({})
const { seekByName } = useSeek()
const helmet = seekByName(scene, 'Knight_Helmet')
helmet.visible = false

// Hide Weapons
scene.traverse((child) => {
  if (child.name.includes('Sword')) {
    child.visible = false
    weapons[child.name] = child
  }
})

// Hide Shields
scene.traverse((child) => {
  if (child.name.includes('Shield')) {
    child.visible = false
    shields[child.name] = child
  }
})

const { weapon, shield, animation, helmetVisible } = useControls({
  helmetVisible: false,
  weapon: {
    value: 'Sword',
    options: Object.keys(weapons),
    /* onChange: (value) => {
      Object.values(weapons).forEach((weapon) => {
        weapon.visible = false
      })
      weapons[value].visible = true
    }, */
  },
  shield: {
    value: 'Shield',
    options: Object.keys(shields),
    /*  onChange: (value) => {
      Object.values(shields).forEach((shield) => {
        shield.visible = false
      })
      shields[value].visible = true
    }, */
  },
  animation: {
    value: 'Idle',
    options: Object.keys(actions),
    /* onChange: (value) => {
      currentAction.value.stop()
      currentAction.value = actions[value]
      currentAction.value.play()
    }, */
  },

})

watch(helmetVisible.value, ({ value }) => {
  helmet.visible = value
})

watch(weapon.value, ({ value }) => {
  Object.values(weapons).forEach((weapon) => {
    weapon.visible = false
  })
  weapons[value].visible = true
})

watch(shield.value, ({ value }) => {
  Object.values(shields).forEach((shield) => {
    shield.visible = false
  })
  shields[value].visible = true
})

watch(animation.value, ({ value }) => {
  if (currentAction.value) {
    currentAction.value.fadeOut(0.2)
  }
  
  currentAction.value = actions[value]
  currentAction.value.reset()
  currentAction.value.fadeIn(0.2)
  currentAction.value.play()
})
</script>

<template>
  <primitive :object="scene" />
</template>