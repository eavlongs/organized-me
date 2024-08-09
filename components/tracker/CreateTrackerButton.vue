<template>
    <Button @click="open = true" class="fixed bottom-10 right-10 z-10">New Tracker</Button>
    <CreateTrackerDialog :open="open" @close="open = false" @confirm="open = false; emits('create')" @error="onError" />
</template>

<script lang="ts" setup>
const open = ref(false)
const emits = defineEmits(["create", "error"])

const onError = (message: string) => {
    emits("error", message)
}
</script>

<style></style>