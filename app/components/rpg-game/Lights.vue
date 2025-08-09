<script setup lang="ts">
</script>
<template>
  <TresDirectionalLight :position="[0, 2, 4]" :intensity="0.5" cast-shadow />
  <TresAmbientLight :intensity="0.2" />
  <Suspense>
    <Environment preset="dawn" background :blur="1" />
  </Suspense>
</template>