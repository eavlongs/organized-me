<template>
    <div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()

useHead({
    meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})
</script>

<style></style>