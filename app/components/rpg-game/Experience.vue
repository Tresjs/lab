<script setup lang="ts">

</script>
<template>
  <TresPerspectiveCamera :position="[8, 2, 8]" :fov="45" :aspect="1" :near="0.1" :far="1000" />
  <OrbitControls />
  <TresGridHelper :args="[30, 30]" :position="[0, 0, 0]" />
  <RpgGameCharacter />
  <RpgGameLights />
</template>