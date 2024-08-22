// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxtjs/color-mode", "@nuxt/icon"],

    colorMode: {
        classSuffix: "",
        storageKey: "color-mode",
    },
    // components: {
    //     global: true,
    //     dirs: ["~/components"],
    // },
    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],
    css: ["~/styles/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    plugins: [],
    runtimeConfig: {
        public: {
            tinyKey: process.env.NUXT_TINY_KEY,
            // apiUrl: "http://localhost:8080/api",
            apiUrl: process.env.NUXT_PUBLIC_API_URL,
        },
    },
    nitro: {
        routeRules: {
            "/files/**": { proxy: process.env.FILE_UPLOAD_DIR + "/**" },
        },
    },
    build: {
        transpile: ["chart.js"],
    },
});
