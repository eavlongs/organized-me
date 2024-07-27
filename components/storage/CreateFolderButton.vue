<template>
    <Button class="fixed bottom-10 right-10 z-10" @click="open = !open">Create Folder</Button>
    <CreateFolderDialog :open="open" @close="onClose" @confirm="onConfirm" />
</template>

<script lang="ts" setup>;

const emits = defineEmits(["create"])
const open = ref(false)

const onClose = () => {
    open.value = false
}

const onConfirm = () => {
    open.value = false
    emits('create')
}
</script>

<style></style>