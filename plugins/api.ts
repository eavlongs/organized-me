export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiUrl;
    const api = $fetch.create({
        // baseURL: "http://localhost:8080/api",
        baseURL: baseURL,
        credentials: "include",
        ignoreResponseError: true,
    });

    return {
        provide: {
            api,
        },
    };
});
