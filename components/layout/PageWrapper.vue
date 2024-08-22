<script lang="ts" setup>
interface Props {
    pageName?: string;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    pageName: "",
    class: "",
})
</script>

<template>
    <div class="mx-4 mt-2" :class="class">
        <h1 class="font-bold text-xl">{{ props.pageName }}</h1>
        <slot />
    </div>
</template>
