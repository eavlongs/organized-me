<template>
    <!-- Component Start -->
    <div class="fixed top-0 z-50 flex flex-col items-center w-56 h-full overflow-hidden text-gray-400 bg-gray-900">
        <div class="flex items-center w-full px-3 mt-3">
            <button class="flex items-center p-1 rounded-md" @click="closeSidebar">
                <Icon name="ic:baseline-menu" :size="24" />
            </button>
            <NuxtLink href="/"><span class="ml-2 text-sm font-bold">Organized Me</span></NuxtLink>
        </div>
        <div class="w-full px-2">
            <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                <SidebarOpenedItem route="/" :currentRoute="props.route" text="Dashboard">
                    <Icon name="ic:baseline-home" :size="24" />
                </SidebarOpenedItem>
                <template v-for="route in allRoutes" :key="route.id">
                    <SidebarOpenedItem v-if="featureVisibility.includes(route.id)" :route="route.path"
                      :currentRoute="props.route" :text="route.name">
                        <Icon :name="route.iconName" :size="24" />
                    </SidebarOpenedItem>
                </template>

                <SidebarOpenedItem route="/feature-visibility" :currentRoute="props.route" text="Feature Visibility">
                    <Icon name="ic:twotone-visibility" :size="24" />
                </SidebarOpenedItem>

            </div>
        </div>

        <div
          class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300 cursor-pointer">
            <CustomAvatar v-if="user && user?.avatarUrl !== null" :src="user.avatarUrl" />

            <CustomAvatar v-else :label="(user?.firstName as string).charAt(1)" />
            <span class="ml-2 text-sm font-medium">Eav Long Sok</span>
        </div>
        <div
          class="flex items-center justify-center w-full h-16 text-gray-200 bg-red-800 hover:bg-red-700 hover:text-gray-300 cursor-pointer"
          @click="logout">
            <Icon name="ic:sharp-log-out" size="24" />
            <span class="ml-2 text-sm font-medium">Log out</span>
        </div>
    </div>
    <!-- Component End  -->
</template>

<script lang="ts" setup>
import { allRoutes } from '~/pages/allRoutes';

const props = defineProps<{
    route: string;
    featureVisibility: number[];
}>()
const emits = defineEmits(['close']);

const user = useUser();

const closeSidebar = () => {
    emits('close');
}

async function logout() {
    await $fetch("/api/logout", {
        method: "POST"
    });
    await navigateTo("/login");
}
</script>

<style></style>