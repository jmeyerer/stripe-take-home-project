// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 
    'shadcn-nuxt',
    '@pinia/nuxt',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? "",
    public: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? ""
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
