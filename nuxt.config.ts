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
        url: 'https://test-task-demo.com',
        name: 'Демо-Сайт',
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
