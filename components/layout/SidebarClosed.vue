<template>
    <div class="fixed top-0 flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900">
        <div class="flex items-center justify-center mt-3">
            <button class="flex items-center p-1 rounded-md" @click="openSidebar">
                <Icon name="ic:baseline-menu" :size="24" />
            </button>
        </div>
        <div class="flex flex-col items-center mt-3 border-t border-gray-700">
            <SidebarClosedItem route="/" :currentRoute="props.route">
                <Icon name="ic:baseline-home" :size="24" />
            </SidebarClosedItem>
            <template v-for="route in allRoutes" :key="route.id">
                <SidebarClosedItem v-if="featureVisibility.includes(route.id)" :route="route.path"
                  :currentRoute="props.route">
                    <Icon :name="route.iconName" :size="24" />
                </SidebarClosedItem>
            </template>

            <SidebarClosedItem route="/feature-visibility" :currentRoute="props.route">
                <Icon name="ic:twotone-visibility" :size="24" />
            </SidebarClosedItem>
        </div>

        <div
          class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 cursor-pointer">
            <CustomAvatar v-if="user && user?.avatarUrl !== null" :src="user.avatarUrl" />

            <CustomAvatar v-else :label="(user?.firstName as string).charAt(1)" />
        </div>
        <div
          class="flex items-center justify-center w-16 h-16  bg-red-800 hover:bg-red-700 hover:text-gray-300 cursor-pointer"
          @click="logout">
            <Icon name="ic:sharp-log-out" size="24" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { allRoutes } from '~/pages/allRoutes';

const props = defineProps<{
    route: string;
    featureVisibility: number[];
}>();

const emits = defineEmits(['open']);

const user = useUser();

const openSidebar = () => {
    emits('open');
}

async function logout() {
    await $fetch("/api/logout", {
        method: "POST"
    });
    await navigateTo("/login");
}


</script>

<style></style>