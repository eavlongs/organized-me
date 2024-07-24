<template>
    <textarea :class="computedClass" v-bind="$attrs" :value="modelValue" @input="onInput"
      @keydown="captureKey"></textarea>
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

const emits = defineEmits(['update:modelValue', 'enter'])

const computedClass = computed(() => {
    return twMerge('block border border-gray-800 w-full py-1 px-2 min-h-[6rem] max-h-[15rem] rounded hide-scrollbar', props.class);
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