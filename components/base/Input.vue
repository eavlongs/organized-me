<template>
    <input :class="computedClass" :value="modelValue" @input="onInput" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

interface Props {
    modelValue: any;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: '',
});

const emits = defineEmits(['update:modelValue'])

const computedClass = computed(() => {
    return twMerge('block border border-gray-800 w-full py-1 px-2 min-h-[1rem] rounded', props.class);
});

const onInput = (event: Event) => {
    emits('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style></style>