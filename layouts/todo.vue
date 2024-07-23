<template>
    <Sidebar :open="sideBarOpen" @close="closeSidebar">
        <PageWrapper pageName="To-Do List">
            <TodoLayout>
                <slot />
            </TodoLayout>
        </PageWrapper>
    </Sidebar>
</template>

<script lang="ts" setup>
const sideBarOpen = ref(false);

const closeSidebar = () => {
    sideBarOpen.value = false;
}

</script>

<style></style>