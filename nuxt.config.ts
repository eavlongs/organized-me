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
        public: { apiUrl: process.env.API_URL },
    },
});
