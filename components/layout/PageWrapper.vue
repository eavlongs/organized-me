<script lang="ts" setup>
interface Props {
    pageName?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageName: ""
})
</script>

<template>
    <div class="mx-4 mt-2">
        <h1 class="font-bold text-xl">{{ props.pageName }}</h1>
        <slot />
    </div>
</template>
