<template>
    <span :class="computedClass" v-bind="$attrs">{{ props.message }}</span>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

interface Props {
    message: string;
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    class: ''
})

const computedClass = computed(() => {
    return twMerge('text-red-700 font-semibold text-sm', props.class)
})

</script>

<style></style>