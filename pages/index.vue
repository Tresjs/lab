<script setup>
const { data: experiments } = await useAsyncData('/', 
  () => queryContent('experiments')
    .where({ status: 'published' })
    .sort({ date: -1 })
    .find(),
)
const { data: formattedExperiments } = await useAsyncData('/', () =>
  Promise.all(
    experiments.value.map(async experiment => ({
      ...experiment,
      author: await queryContent('authors')
        .where({ slug: experiment.author })
        .only(['name', 'avatar', 'slug'])
        .findOne(),
    })),
  ),
)

function getRepoPath(slug) {
  return `https://github.com/Tresjs/lab/tree/main/components/content/${slug}`
}

function getRepoTitle(slug) {
  return `${slug} – code on Github` 
}
</script>

<template>
  <main>
    <div class="w-full container mx-auto px-4 md:px-0 mb-60 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 pt-8">
      <TheCard
        v-for="experiment in formattedExperiments"
        :key="experiment._path"
        :title="experiment.title"
        :path="experiment._path"
        :repo-title="getRepoTitle(experiment.slug)"
        :repo-path="getRepoPath(experiment.slug)"
        :media="experiment.thumbnail"
        :description="experiment.description"
        :author="experiment.author"
        :tags="experiment.tags"
      />
    </div>
  </main>
</template>
