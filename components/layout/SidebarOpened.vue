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
                    <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </SidebarOpenedItem>
                <SidebarOpenedItem route="/todo" :currentRoute="props.route" text="To-Do List">
                    <Icon name="ic:outline-checklist" :size="24" />
                </SidebarOpenedItem>
                <SidebarOpenedItem route="/storage" :currentRoute="props.route" text="Storage">
                    <Icon name="ic:baseline-folder-open" :size="24" />
                </SidebarOpenedItem>
                <SidebarOpenedItem route="/tracker" :currentRoute="props.route" text="Tracker">
                    <Icon name="ic:sharp-published-with-changes" :size="24" />
                </SidebarOpenedItem>
                <SidebarOpenedItem route="/temp" :currentRoute="props.route" text="Temp" class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300
                    cursor-pointer">
                    <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                </SidebarOpenedItem>
            </div>

            <SidebarOpenedItem route="/temp" :currentRoute="props.route" text="Temp">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>

            </SidebarOpenedItem>
            <SidebarOpenedItem route="/temp" :currentRoute="props.route" text="Temp">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>

            </SidebarOpenedItem>
            <SidebarOpenedItem route="/temp" :currentRoute="props.route" text="Temp">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>

                <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
            </SidebarOpenedItem>
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
const props = defineProps<{
    route: string;
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