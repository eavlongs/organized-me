<template>
    <div>
        <SidebarOpened v-if="isOpen" @close="closeSidebar" :route="route.path" />
        <SidebarClosed v-if="isNotOpen" @open="openSidebar" :route="route.path" />

        <div v-if="isOpen" class="fixed top-0 w-screen h-screen bg-black opacity-50 cursor-pointer"
          @click="closeSidebar">
        </div>

        <div class="ml-16">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    open: boolean;
}>();

const emits = defineEmits(['close', 'open']);

const isOpen = ref(props.open);
const isNotOpen = computed(() => !isOpen.value);
const route = useRoute()


watch(() => props.open, (value) => {
    isOpen.value = value;
});

const openSidebar = () => {
    emits('open');
    isOpen.value = true;
}

const closeSidebar = () => {
    emits('close');
    isOpen.value = false;
}

</script>

<style scoped></style>