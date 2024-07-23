<template>
    <button :class="computedClass" @click="onClick">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'
interface Props {
    class?: string;
}

const emits = defineEmits(['click'])

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

const computedClass = computed(() => {
    return twMerge("bg-gray-700 text-gray-50 font-semibold rounded-lg px-3 py-2 hover:bg-gray-800 hover:text-white", props.class)
})

const onClick = () => {
    emits("click")
}

</script>

<style></style>