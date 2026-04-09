export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/icon',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        'nuxt-schema-org',
    ],
    site: {
        url: 'https://shatobiaaan.github.io/nuxt4-test-task/',
        name: 'TGames',
    },
    app: {
        baseURL: '/nuxt4-test-task/',
        buildAssetsDir: 'assets',
    },
    nitro: {
        preset: 'github-pages',
    },
    robots: {
        disallow: ['/admin'],
    },
    runtimeConfig: {
        public: {
            apiBase: '',
        },
    },
})
