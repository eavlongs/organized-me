<template>
    <select :class="computedClass" @change="onChange" :value="value">
        <option v-for="option in filterOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { TrackerDataFilterOption } from '~/utils/types/tracker';
import { filterOptions } from './filterOptions';

interface Props {
    class?: string,
    value: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

const emits = defineEmits(["filter"])

const computedClass = computed(() => {
    return twMerge("border border-gray-700 rounded px-2 py-1 cursor-pointer", props.class)
})

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const selectedOption = filterOptions.find(option => option.value === target.value)
    if (selectedOption) {
        emits("filter", selectedOption)
    }
}
</script>

<style></style>