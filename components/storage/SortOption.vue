<template>
    <select :class="computedClass" @change="onChange">
        <option value="" disabled selected class="text-gray-500">Sort By</option>
        <option v-for="option in sortOptions" :key="option.id" :value="option.id">{{ option.label }}</option>
    </select>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';
import type { SortOption } from '~/utils/types/storage';


interface Props {
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

const emits = defineEmits(["sort"])

const sortOptions: SortOption[] =
    [{
        id: "1",
        key: "name",
        sortDirection: "asc",
        label: "Name (A-Z)"
    }, {
        id: "2",
        key: "name",
        sortDirection: "desc",
        label: "Name (Z-A)"
    }, {
        id: "3",
        key: "createdAt",
        sortDirection: "asc",
        label: "Date Created (Oldest)"
    }, {
        id: "4",
        key: "createdAt",
        sortDirection: "desc",
        label: "Date Created (Newest)"
    }, {
        id: "5",
        key: "updatedAt",
        sortDirection: "asc",
        label: "Date Modified (Oldest)"
    }, {
        id: "6",
        key: "updatedAt",
        sortDirection: "desc",
        label: "Date Modified (Newest)"
    }]

const computedClass = computed(() => {
    return twMerge("border border-gray-700 rounded px-2 py-1 cursor-pointer", props.class)
})

const onChange = (event: Event) => {
    const target = event.target as HTMLSelectElement
    const selectedOption = sortOptions.find(option => option.id === target.value)
    if (selectedOption) {
        emits("sort", selectedOption)
    }
}


</script>

<style></style>