<template>
    <input :class="computedClass" :value="modelValue" @input="onInput" v-bind="$attrs" @keydown="captureKey" />
</template>

<script lang="ts" setup>
import { twMerge } from 'tailwind-merge';

interface Props {
    modelValue: any;
    class?: string;
    block?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    class: '',
    block: true
});

const emits = defineEmits(['update:modelValue', "enter"])

const computedClass = computed(() => {
    return twMerge((props.block ? 'block w-full' : '') + ' border border-gray-800 py-1 px-2 min-h-[1rem] rounded', props.class);
});

const onInput = (event: Event) => {
    emits('update:modelValue', (event.target as HTMLInputElement).value);
}

const captureKey = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        emits('enter');
    }
}
</script>

<style></style>