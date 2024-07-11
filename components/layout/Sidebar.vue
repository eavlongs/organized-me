<template>
    <div>
        <!-- <aside class="fixed top-0 h-screen w-96 z-10 bg-white" @click="stopPropagation">
            <div class="pl-8 h-16 flex items-center gap-x-4 border-b">
                <button class="flex items-center p-1 border rounded-md" @click="closeSidebar">
                    <Icon name="ic:baseline-menu" :size="25" />
                </button>
                <h1 class="justify-self-start text-lg font-bold leading-none">Organized Me</h1>
            </div>
        </aside> -->
        <SidebarOpened v-if="isOpen" @close="closeSidebar" />
        <SidebarClosed v-if="isNotOpen" @open="openSidebar" />

        <div v-if="isOpen" class="fixed top-0 w-screen h-screen bg-black opacity-50 cursor-pointer"
          @click="closeSidebar">
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