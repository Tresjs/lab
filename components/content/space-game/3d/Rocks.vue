<script setup lang="ts">
import { inject, shallowRef } from 'vue'
import { useLoop, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three-stdlib'
import { Group } from 'three'
import type { GameStore } from '../GameStore'

const gameStore: GameStore = inject('gameStore') as GameStore
const { rocks } = gameStore
const rocksGroupRef = shallowRef(new Group())

const { nodes, materials } = await useLoader(GLTFLoader, '/models/space-game/rock.gltf')
const { clock } = gameStore.mutation

useLoop().onBeforeRender(() => {
    let i = 0
    for (const rock of rocksGroupRef.value.children) {
        const data = rocks[i]
        data.rotation = Math.cos((clock.getElapsedTime() / 2) * data.speed) * Math.PI
        rock.rotation.set(data.rotation, data.rotation, data.rotation)
        i++
    }
})
</script>

<template>
    <TresGroup ref="rocksGroupRef">
        <TresGroup v-for="data, i of gameStore.rocks" :key="i" :position="data.offset"
            :scale="[data.scale, data.scale, data.scale]">
            <TresGroup :position="[-0.016298329457640648, -0.012838120572268963, 0.24073271453380585]"
                :rotation="[3.0093872578726644, 0.27444228385461117, -0.22745113653772078]" :scale="[20, 20, 20]">
                <TresMesh :geometry="nodes.node_id4_Material_52_0.geometry" :material="materials.Material_52"
                    :material-roughness="1" :material-metalness="1" />
            </TresGroup>
        </TresGroup>
    </TresGroup>
</template>