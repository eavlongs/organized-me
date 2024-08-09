<template>
    <div :class="computedClass">{{ message }}</div>
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

const computedClass = computed(() => {
    return `text-lg fixed-center ${props.class}`
})
</script>

<style></style>