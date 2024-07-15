<template>
    <!-- <Navbar @openSidebar="openSidebar" /> -->
    <Sidebar :open="sideBarOpen" @close="closeSidebar">
        <slot />
    </Sidebar>
</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
    meta: [{ property: 'og:title', content: `${route.meta.title}` }]
})

const sideBarOpen = ref(false);

const closeSidebar = () => {
    sideBarOpen.value = false;
}
</script>

<style></style>