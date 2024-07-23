export default defineNuxtPlugin((nuxtApp) => {
    const api = $fetch.create({
        baseURL: "http://localhost:8080/api",
        credentials: "include",
    });

    return {
        provide: {
            api,
        },
    };
});
