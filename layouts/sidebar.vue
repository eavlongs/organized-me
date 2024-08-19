<template>
    <!-- <Navbar @openSidebar="openSidebar" /> -->
    <Sidebar>
        <slot />
    </Sidebar>
</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
    meta: [{ property: 'og:title', content: `${route.meta.title}` }]
})
</script>

<style></style>