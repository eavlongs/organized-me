export default defineNuxtPlugin((nuxtApp) => {
    const api = $fetch.create({
        baseURL: "http://localhost:8080/api",
        credentials: "include",
        ignoreResponseError: true,
    });

    return {
        provide: {
            api,
        },
    };
});
