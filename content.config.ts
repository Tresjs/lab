import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    authors: defineCollection({
      type: 'page',
      source: 'authors/**/*.md',
      schema: z.object({
        name: z.string(),
        avatar: z.string(),
        slug: z.string(),
        email: z.string(),
        twitter: z.string(),
        github: z.string(),
        website: z.string(),
      }),
    }),
    experiments: defineCollection({
      type: 'page',
      source: 'experiments/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        author: z.string(),
        tags: z.array(z.string()),
        date: z.string(),
      }),
    }),
  },
})