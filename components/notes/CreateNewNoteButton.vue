<template>
    <Button @click="emits('click')" class="absolute bottom-10 right-10 z-10">New Note</Button>
</template>

<script lang="ts" setup>;

const emits = defineEmits(["click"])
</script>

<style></style>