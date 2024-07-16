<template>
    <img v-if="props.src !== undefined" :src="props.src" :class="computedClassNameForImage" />
    <div v-else :class="computedClassNameForFallbackText">
        {{ props.label }}
    </div>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'
interface Props {
    src?: string,
    class?: string,
    label?: string
}

const defaultClassNameForImage = "rounded-full w-10 aspect-square cursor-pointer object-cover"
const defaultClassNameForFallbackText = "bg-gray-200 rounded-full w-10 h-10 flex items-center text-black justify-center font-semibold cursor-pointer"

const props = withDefaults(defineProps<Props>(), {
    class: '',
    label: ''
})


const computedClassNameForImage = computed(() => {
    return twMerge(defaultClassNameForImage, props.class)
})

const computedClassNameForFallbackText = computed(() => {
    return twMerge(defaultClassNameForFallbackText, props.class)
})

</script>

<style></style>