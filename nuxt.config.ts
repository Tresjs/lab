import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui-pro',
    'nuxt-svgo',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/devtools',
    '@tresjs/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/styles/main.css'],
  declare: ['*.glsl'],
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE
  },
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

  image: {
    format: ['webp', 'avif'],
  },

  content: {
    // @ts-ignore - highlight option exists but not in types
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

  tailwindcss: {
    config: {
      plugins: [
        function({ addUtilities, theme, e }: any) {
          // Generate text-outline utilities with different sizes
          const textOutlineSizes = {
            '1': '1px',
            '2': '2px', 
            '3': '3px',
            '4': '4px',
          }

          const textOutlineUtilities: Record<string, any> = {}

          // Generate size-only utilities (defaults to black)
          Object.entries(textOutlineSizes).forEach(([key, size]) => {
            textOutlineUtilities[`.${e(`text-outline-${key}`)}`] = {
              'text-shadow': `
                -${size} -${size} 0 #000,
                 ${size} -${size} 0 #000,
                -${size}  ${size} 0 #000,
                 ${size}  ${size} 0 #000
              `.replace(/\s+/g, ' ').trim()
            }
          })

          // Generate color utilities that work with existing sizes
          const colors = theme('colors') || {}
          Object.entries(colors).forEach(([colorName, colorValue]) => {
            if (typeof colorValue === 'object' && colorValue !== null) {
              Object.entries(colorValue as Record<string, string>).forEach(([shade, hex]) => {
                textOutlineUtilities[`.${e(`text-outline-${colorName}-${shade}`)}`] = {
                  '--text-outline-color': hex,
                }
              })
            } else if (typeof colorValue === 'string') {
              textOutlineUtilities[`.${e(`text-outline-${colorName}`)}`] = {
                '--text-outline-color': colorValue,
              }
            }
          })

          addUtilities(textOutlineUtilities)
        }
      ]
    }
  },

  compatibilityDate: '2024-08-29',
})