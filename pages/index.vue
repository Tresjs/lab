<script setup lang="ts">
import type { ExperimentItem, AuthorItem } from '@/types'

// Fetch all experiments ordered by date using useAsyncData
const { data: experiments } = await useAsyncData('experiments', () =>
  queryCollection('experiments').order('date', 'DESC').all()
)

// Format experiments with additional data using a second useAsyncData to handle the dependencies
const { data: formattedExperiments } = await useAsyncData('formatted-experiments',
  async () => {
    if (!experiments.value) return []

    return await Promise.all(
      experiments.value.map(async (experiment) => {
        const slug = getSlugFromExperiment(experiment)

        // Fetch the author using useAsyncData to leverage caching
        const { data: author } = experiment.author
          ? await useAsyncData(`author-${experiment.author}`, () =>
            queryCollection('authors')
              .where('slug', '=', experiment.author)
              .first()
          )
          : { data: null }

        return {
          ...experiment,
          slug,
          title: getTitleFromExperiment(experiment),
          thumbnail: getThumbnailFromExperiment(experiment),
          author: author?.value,
          repoPath: getRepoPathFromExperiment(experiment),
          repoTitle: getRepoTitleFromExperiment(experiment),
        }
      })
    )
  },
  {
    // Watch the experiments data to re-evaluate when it changes
    watch: [experiments]
  }
)

function getSlugFromExperiment(experiment: ExperimentItem): string {
  return experiment.path?.split('/').pop() ?? ''
}

function getTitleFromExperiment(experiment: ExperimentItem): string {
  return experiment.title
    ?? getSlugFromExperiment(experiment).split('-')
      .map(capitalize)
      .join(' ')
}

function capitalize(word: string): string {
  if (word.length === 0) {
    return word
  }
  else if (word.length === 1) {
    return word.toUpperCase()
  }
  else {
    return word[0].toUpperCase() + word.slice(1)
  }
}

function getThumbnailFromExperiment(experiment: ExperimentItem): string {
  return experiment.thumbnail ?? `/${getSlugFromExperiment(experiment)}.png`
}

function getRepoPathFromExperiment(experiment: ExperimentItem): string {
  return `https://github.com/Tresjs/lab/tree/main/components/content/${getSlugFromExperiment(experiment)}`
}

function getRepoTitleFromExperiment(experiment: ExperimentItem): string {
  return `${getSlugFromExperiment(experiment)} – code on Github`
}
</script>

<template>
  <UContainer class="py-12">
    <div class="flex flex-col items-center mb-12">
      <h1 class="text-4xl font-display font-bold text-center mb-4">TresJS Experiments</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
        Explore creative WebGL experiments built with TresJS, the declarative ThreeJS framework for Vue
      </p>
    </div>

    <div v-if="formattedExperiments?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="experiment in formattedExperiments" :key="experiment.slug" :to="`${experiment.stem}`">
        <template #header>
          <div class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-md">
            <img :src="`/${experiment.stem}.png`" :alt="experiment.title"
              class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105">
          </div>
        </template>

        <h3 class="font-display font-medium text-lg">{{ experiment.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ new Date(experiment.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day:
              'numeric'
          }) }}
        </p>
        <div v-if="experiment.author">
          <UBadge color="neutral" variant="soft" :avatar="{
            src: experiment.author.avatar,
            alt: experiment.author.name,
          }">
            {{ experiment.author.name }}
          </UBadge>
        </div>
        <template #footer>
          <div class="flex items-center justify-between" />

          <div class="mt-4 flex justify-between items-center">
            <UBadge v-for="tag in experiment.tags" :key="tag" :label="tag" color="primary" variant="soft" size="sm" />
            <UTooltip :text="experiment.repoTitle">
              <UButton color="primary" variant="ghost" icon="i-heroicons-code-bracket" size="xs"
                :to="experiment.repoPath" target="_blank" />
            </UTooltip>
          </div>
        </template>
      </UCard>
    </div>

    <div v-else class="flex flex-col items-center py-16">
      <UIcon name="i-heroicons-beaker" class="text-5xl mb-4 text-gray-400 dark:text-gray-600" />
      <p class="text-lg text-gray-500 dark:text-gray-400">Loading experiments...</p>
    </div>
  </UContainer>
</template>
