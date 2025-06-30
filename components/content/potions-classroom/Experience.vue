<script setup lang="ts">
const { state: tableTexture, isReady: isTableTextureReady } = useTexture('/models/potions-classroom/table.png')
const { state: roomTexture, isReady: isRoomTextureReady } = useTexture('/models/potions-classroom/room.png')

watch(tableTexture, (texture) => {
  texture.flipY = false
})

watch(roomTexture, (texture) => {
  texture.flipY = false
})
</script>

<template>
  <template v-if="isTableTextureReady && isRoomTextureReady">
    <Room :texture="roomTexture" />
    <Bricks :texture="roomTexture" />
    <Table :texture="tableTexture" />
    <Stands :texture="roomTexture" />
    <Books :texture="tableTexture" />
    <Bottles />
    <Chalkboard :texture="roomTexture" />
    <Cauldron :texture="tableTexture" />
    <Windows :texture="tableTexture" />
    <Skulls />
    <FloatingCandles />
    <Mortar :texture="tableTexture" />
    <Lamp :texture="tableTexture" />
    <Jars />
  </template>
</template>
