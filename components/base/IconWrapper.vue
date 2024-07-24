<template>
    <Tooltip v-if="props.text != ''" :text="props.text">
        <button class="p-2 hover:bg-gray-300 cursor-pointer rounded" v-bind="$attrs">
            <slot />
        </button>
    </Tooltip>
    <button v-else class="p-2 hover:bg-gray-300 cursor-pointer rounded" v-bind="$attrs">
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface Props {
    text?: string
}

const props = withDefaults(defineProps<Props>(), {
    text: ""
})
</script>

<style></style>