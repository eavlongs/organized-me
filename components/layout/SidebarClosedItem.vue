<template>
    <NuxtLink :to="props.route" :class="className">
        <slot />
    </NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps<{
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
        return "flex items-center justify-center w-12 h-12 mt-2 text-gray-200 bg-gray-700 rounded cursor-pointer"
    } else {
        return "flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 cursor-pointer"
    }
})
</script>

<style></style>