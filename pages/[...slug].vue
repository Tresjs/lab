<script setup lang="ts">
definePageMeta({
  layout: 'experiment',
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('experiments').path(route.path).first()
})
useHead({
  title: `${page?.value?.title} - Tres`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: page?.value?.description,
    },
    {
      hid: 'keywords',
      property: 'keywords',
      keywords: page?.value?.tags?.join(', '),
    },
    // og
    {
      hid: 'og:description',
      property: 'og:description',
      content: page?.value?.description,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: `${page?.value?.title} made with TresJS by @${page?.value?.author}`,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'project',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: page?.value?.thumbnail ?? `/${page?.value?._path?.split('/').pop()}.png`,
    },
    {
      hid: 'og:image:alt',
      property: 'og:image:alt',
      content: page?.value?.title,
    },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@alvarosabu' },
    {
      hid: 'twitter:title',
      property: 'twitter:title',
      content: `${page?.value?.title} - Tres`,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: page?.value?.description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: page?.value?.thumbnail ?? `/${page?.value?._path?.split('/').pop()}.png`,
    },
    {
      hid: 'twitter:image:alt',
      name: 'twitter:image:alt',
      content: page?.value?.title,
    },
  ],
})
</script>

<template>
  <main>
    <ClientOnly>
      <ContentRenderer v-if="page" :value="page" class="w-full h-[100vh]" />
    </ClientOnly>
  </main>
</template>
