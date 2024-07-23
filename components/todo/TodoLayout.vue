<template>
    <div class="flex gap-x-2 mt-2">
        <NuxtLink to="/todo/active"
          class="px-8 hover:border-b-4 border-gray-500 cursor-pointer font-semibold leading-10" :class="activeClass">
            Active</NuxtLink>
        <NuxtLink to="/todo/finished"
          class="px-8 hover:border-b-4 border-gray-500 cursor-pointer font-semibold leading-10" :class="finishedClass">
            Finished</NuxtLink>
    </div>
    <slot />

</template>

<script lang="ts" setup>
const route = useRoute()
const open = ref(false)

const activeClass = computed(() => {
    return route.path == '/todo/active' ? 'border-b-4 !border-black' : ''
})

const finishedClass = computed(() => {
    return route.path == '/todo/finished' ? 'border-b-4 !border-black' : ''
})



</script>

<style></style>