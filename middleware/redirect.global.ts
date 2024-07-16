export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path == "/todo") {
        return navigateTo("/todo/active");
    }
});
