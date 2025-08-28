<script setup lang="ts">
import usePlayerState from './composables/usePlayerState'

const { ph, maxPH, ap, maxAP, level, exp } = usePlayerState()

</script>
<template>
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
    <div class="relative p-4 w-full h-full">
      <div class="absolute flex flex-row justify-between gap-2 top-0 left-0 w-[200px] p-4">
        <div class="flex flex-col items-center gap-1">
          <UAvatar :ui="{
            image: 'border-2 border-gray-500'
          }" size="3xl" :src="`/models/knight/thumbnail.png`" />
          <span class="font-bold tracking-tighter text-warning-400 text-sm text-outline-2 text-outline-gray-500">LV
            <span class="text-lg text-white text-outline-2 text-outline-gray-500">{{ level }}</span></span>
          <UProgress v-model="exp" size="sm" :ui="{
            base: 'bg-gray-500'
          }" color="warning" :max="100" />
        </div>
        <div class="flex flex-col w-full pt-2 gap-1">
          <UProgress v-model="ph" size="lg" :ui="{
            base: 'border-2 border-gray-500 bg-gray-500'
          }" color="success" :max="maxPH" />
          <UProgress v-model="ap" :ui="{
            base: 'border-2 border-gray-500 bg-gray-500'
          }" color="secondary" :max="maxAP" />
        </div>
      </div>
    </div>
  </div>
</template>
