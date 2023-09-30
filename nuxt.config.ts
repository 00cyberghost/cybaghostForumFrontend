// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path"
export default defineNuxtConfig({

  ssr: false,

  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname,"/")
  },
  css: ["~/assets/main.scss","@fortawesome/fontawesome-svg-core/styles.css","~/node_modules/bootstrap-icons/font/bootstrap-icons.min.css","~/node_modules/dropzone/dist/dropzone.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // ...
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
  ],
  pwa: {
    /* your pwa options */
    manifest: {
      name: 'Cybaghost Forum',
      short_name: 'CG PWA',
      description: 'Cybaghost Forum Progressive Web App',
      icons: [
        {
          src: '/icons/icon_64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: '/icons/icon_144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/icons/icon_192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon_512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.cybaghost.com.ng/api/v1',
    },
  },

  
  // plugins: [
  //   '~/plugins/fontawesome.js'
  // ],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  }
})