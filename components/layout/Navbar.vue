<template>
    <div class="h-16 w-full flex items-center gap-x-4 border-b px-8">
        <h1 class="justify-self-start text-lg font-bold leading-none">Organized Me</h1>
        <!-- <Avatar label="G" size="large" class="bg-gray-400 rounded-full" /> -->
        <NuxtLink href="/profile" class="flex items-center gap-x-2 ml-auto">
            <CustomAvatar src="https://avatars.githubusercontent.com/u/4723117?v=4" class="bg-gray-400 rounded-full" />
            Eav Long Sok

        </NuxtLink>
        <!-- <ToggleTheme />
            <LogoutButton /> -->
    </div>
</template>

<script lang="ts" setup>

const emits = defineEmits(['openSidebar']);

const onOpenSidebar = () => {
    emits('openSidebar')
};

</script>

<style></style>