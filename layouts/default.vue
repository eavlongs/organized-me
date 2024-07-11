<template>
    <!-- <Navbar @openSidebar="openSidebar" /> -->
    <Sidebar :open="sideBarOpen" @close="closeSidebar" />
    <slot />
</template>

<script lang="ts" setup>
const sideBarOpen = ref(false);

const openSidebar = () => {
    sideBarOpen.value = true;
}

const closeSidebar = () => {
    sideBarOpen.value = false;
}
</script>

<style></style>