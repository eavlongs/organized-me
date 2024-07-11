import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxtjs/color-mode", "@nuxt/icon"],

    colorMode: {
        classSuffix: "",
        storageKey: "color-mode",
    },
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
});
