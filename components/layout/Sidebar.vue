<template>
    <div>
        <SidebarOpened v-if="open" @close="open = false" :route="route.path" :featureVisibility="featureVisibility" />
        <SidebarClosed v-if="!open" @open="open = true" :route="route.path" :featureVisibility="featureVisibility" />

        <div v-if="open" class="fixed top-0 w-screen h-screen bg-black opacity-50 cursor-pointer" @click="open = false">
        </div>

        <div class="ml-16">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>

const open = ref(false)
const route = useRoute()
const user = useUser()
const featureVisibility = ref(user.value?.featureVisibility ?? [])

</script>

<style scoped></style>