<template>
    <label class="inline-flex items-center cursor-pointer">
        <input type="checkbox" class="sr-only peer" :checked="modelValue" @input="onInput" v-bind="$attrs">
        <template v-if="props.textLeft">
            <span class="text-sm">{{ props.label }}</span>
            <span class="text-red-700 mr-2 ml-1">{{ props.required ? '*' : '' }}</span>
        </template>
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
          :class="{ 'after:translate-x-full rtl:after:-translate-x-full after:border-white !bg-green-600': modelValue }">
        </div>
        <template v-if="!props.textLeft">
            <span class="ml-2 text-sm">{{ props.label }}</span>
            <span class="text-red-700 ml-1">{{ props.required ? '*' : '' }}</span>
        </template>
    </label>
</template>

<script lang="ts" setup>
interface Props {
    label: string;
    required: boolean;
    modelValue: boolean;
    textLeft: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    textLeft: false,
})

const emits = defineEmits(['update:modelValue', "enter"])

const onInput = (event: Event) => {
    emits('update:modelValue', props.modelValue ? false : true);
}

</script>

<style></style>