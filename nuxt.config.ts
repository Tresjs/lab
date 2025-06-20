import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'TresJS Lab',
      meta: [
        { name: 'description', content: 'Showcase and examples lab for TresJS.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#82DBC5' },
        { name: 'keywords', content: 'threejs, vuejs, renderer, vue, three, 3D' },
        // Open Graph
        { property: 'og:title', content: 'TresJS Lab' },
        { property: 'og:description', content: 'Showcase and examples lab for TresJS.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://lab.tresjs.org' },
        { property: 'og:image', content: '/tresjs-lab-og.png' },
        { property: 'og:image:alt', content: 'TresJS Lab' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@tresjs' },
        { name: 'twitter:title', content: 'TresJS Lab' },
        { name: 'twitter:description', content: 'Showcase and examples lab for TresJS.' },
        { name: 'twitter:image', content: '/tresjs-lab-og.png' },
        { name: 'twitter:image:alt', content: 'TresJS Lab' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg',
          href: '/flask.svg',
        },
      ],
    },
  },

  modules: [
    '@tresjs/nuxt',
    '@nuxt/ui-pro',
    'nuxt-svgo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/devtools',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],

  css: ['/styles/main.css', '@tresjs/leches/styles'],
  declare: ['*.glsl'],

  tres: {
    devtools: true,
    glsl: true,
  },

  fonts: {
    families: [
      { name: 'Manrope', provider: 'google' },
      { name: 'Inter', provider: 'google' },
    ],
  },

  routeRules: {
    '/': { prerender: true },
  },

  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai',
      },
      preload: ['bash', 'css', 'javascript', 'json', 'markdown', 'scss', 'vue', 'glsl'],
    },
  },

  vite: {
    plugins: [svgLoader()],
  },

  compatibilityDate: '2024-08-29',
})