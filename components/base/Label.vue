<template>
    <label v-bind="$attrs">
        <slot />
        <span class="text-red-700">{{ props.required ? ' *' : '' }}</span>
    </label>
</template>

<script lang="ts" setup>
interface Props {
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
})
</script>

<style></style>