<template>
    <NuxtLink :to="props.route" :class="className">
        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="ml-2 text-sm font-medium">{{ text }}</span>
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text: string,
    route: string,
    currentRoute: string
}>()

const active = computed(() => {
    if (props.route == "/") {
        if (props.currentRoute == "/") {
            return true
        }
        return false
    }
    if (props.currentRoute.startsWith(props.route)) {
        return true
    }
    return false
})

const className = computed(() => {
    if (active.value) {
        return "flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded cursor-pointer"
    } else {
        return "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 cursor-pointer"
    }
})
</script>

<style></style>