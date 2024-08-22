<template>
    <div class="text-lg fixed-center" :class="class">{{ message }}</div>
</template>

<script lang="ts" setup>
interface Props {
    class?: string;
    message?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    message: "No data found"
});

</script>

<style></style>