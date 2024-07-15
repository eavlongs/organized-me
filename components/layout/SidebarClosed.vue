<template>
    <div class="fixed top-0 flex flex-col items-center w-16 h-full overflow-hidden text-gray-400 bg-gray-900">
        <div class="flex items-center justify-center mt-3">
            <button class="flex items-center p-1 rounded-md" @click="openSidebar">
                <Icon name="ic:baseline-menu" :size="24" />
            </button>
        </div>
        <div class="flex flex-col items-center mt-3 border-t border-gray-700">
            <SidebarClosedItem route="/" :currentRoute="props.route">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </SidebarClosedItem>
            <SidebarClosedItem route="/todo" :currentRoute="props.route">
                <Icon name="ic:outline-checklist" :size="24" />
            </SidebarClosedItem>
            <SidebarClosedItem route="/tmp" :currentRoute="props.route">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </SidebarClosedItem>
            <SidebarClosedItem route="/tmp" :currentRoute="props.route">
                <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
            </SidebarClosedItem>
        </div>
        <SidebarClosedItem route="/tmp" :currentRoute="props.route">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </SidebarClosedItem>
        <SidebarClosedItem route="/tmp" :currentRoute="props.route">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        </SidebarClosedItem>
        <SidebarClosedItem route="/tmp" :currentRoute="props.route">
            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
        </SidebarClosedItem>

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
const props = defineProps<{
    route: string;
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