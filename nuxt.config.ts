import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',

    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },

    css: ['~/assets/scss/main.scss'],

    build: { transpile: ['vuetify'] },

    modules: [
        '@nuxt/eslint',
        '@nuxt/test-utils',
        '@nuxt/content',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins?.push(vuetify({ autoImport: true }));
            });
        },
    ],

    eslint: {},

    app: {
        head: {
            title: '未來路口 | JavaScript、TypeScript、Node.js、未來科技與生活趨勢',
            meta: [
                {
                    name: 'description',
                    content:
                  '未來路口是一個探索 JavaScript、TypeScript 與 Node.js 技術核心的部落格，涵蓋未來趨勢、生活想像、環境議題與旅行故事，帶你在科技與人文之間找到靈感的交會點。',
                },
                {
                    property: 'og:title',
                    content: '未來路口｜深入 JavaScript、TypeScript、Node.js、未來科技與生活趨勢',
                },
                {
                    property: 'og:description',
                    content:
                  '未來路口是一個探索 JavaScript、TypeScript 與 Node.js 技術核心的部落格，涵蓋未來趨勢、生活想像、環境議題與旅行故事，帶你在科技與人文之間找到靈感的交會點。',
                },
                {
                    property: 'og:image',
                    content: 'https://ssg-site.pages.dev/ogimage',
                },
            ],
            link: [
                {
                    rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png',
                },
                {
                    rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png',
                },
                {
                    rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png',
                },
                {
                    rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', 
                },
                {
                    rel: 'manifest', href: '/site.webmanifest',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap',
                },
            ],
        },
    },

    vite: { vue: { template: { transformAssetUrls } } },
});
