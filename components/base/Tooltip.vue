<template>
    <div data-tooltip-target="tooltip-default">
        <slot />
    </div>

    <div id="tooltip-default" role="tooltip"
      class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Tooltip content
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text: string
}>();
</script>

<style></style>