export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = false;

    if (isLoggedIn && to.path === "/login") {
        return navigateTo("/");
    }

    if (!isLoggedIn && to.path !== "/login") {
        return navigateTo("/login");
    }
});
