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

</script>

<style></style>