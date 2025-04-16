<script setup lang="ts">
import type { ExperimentItem } from '@/types'

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
      <p class="text-lg text-gray-600 dark:text-gray-400 text-center max-w-2xl">
        Explore creative WebGL experiments built with TresJS, the declarative ThreeJS framework for Vue
      </p>
    </div>

    <div v-if="formattedExperiments?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TheCard v-for="experiment in formattedExperiments" :key="experiment.slug" :experiment="experiment" />
    </div>

    <div v-else class="flex flex-col items-center py-16">
      <UIcon name="i-heroicons-beaker" class="text-5xl mb-4 text-gray-400 dark:text-gray-600" />
      <p class="text-lg text-gray-500 dark:text-gray-400">Loading experiments...</p>
    </div>
  </UContainer>
</template>
