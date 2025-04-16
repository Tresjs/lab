<script setup lang="ts">
import type { ExperimentItem } from '@/types'

interface Props {
  experiment: ExperimentItem & {
    stem: string
    slug: string
    title: string
    thumbnail: string
    author?: {
      name: string
      avatar: string
    } | null
    repoPath: string
    repoTitle: string
  }
}

const props = defineProps<Props>()

const formattedDate = computed(() =>
  new Date(props.experiment.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
)
</script>

<template>
  <NuxtLink :to="`${experiment.stem}`">
    <UCard class="transition-all duration-300 hover:shadow-lg hover:scale-102 hover:-translate-y-1">
      <div class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md">
        <img :src="`/${experiment.stem}.png`" :alt="experiment.title"
          class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105">
      </div>

      <!-- Tags -->
      <div class="py-4 flex gap-2 flex-wrap">
        <UBadge v-for="tag in experiment.tags" :key="tag" :label="tag" color="primary" variant="soft" size="sm" />
      </div>

      <h3 class="font-display font-bold text-lg">{{ experiment.title }}</h3>
      <p class="font-mono text-xs text-gray-500 dark:text-gray-400 mt-1">
        {{ formattedDate }}
      </p>

      <div class="mt-4 flex justify-between items-center">
        <div v-if="experiment.author">
          <UBadge color="neutral" variant="soft" :avatar="{
            src: experiment.author.avatar,
            alt: experiment.author.name,
          }">
            {{ experiment.author.name }}
          </UBadge>
        </div>
        <UTooltip :text="experiment.repoTitle">
          <UButton color="primary" variant="ghost" icon="i-heroicons-code-bracket" size="xs" :to="experiment.repoPath"
            target="_blank" />
        </UTooltip>
      </div>
    </UCard>
  </NuxtLink>
</template>