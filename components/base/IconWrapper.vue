<template>
    <Tooltip v-if="props.text != ''" :text="props.text">
        <div class="p-2 hover:bg-gray-300 cursor-pointer rounded">
            <slot />
        </div>
    </Tooltip>
    <div v-else class="p-2 hover:bg-gray-300 cursor-pointer rounded">
        <slot />
    </div>
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