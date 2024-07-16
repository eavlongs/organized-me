<template>
    <TodoList :todos="mockData" class="mt-4" />
</template>

<script lang="ts" setup>

definePageMeta({
    layout: "todo"
})

const mockData: TodoItem[] = [
    {
        id: 1,
        title: "Learn Vue 3",
        isActive: true
    },
    {
        id: 2,
        title: "Learn Vite",
        isActive: true
    },
    {
        id: 3,
        title: "Learn Tailwind CSS",
        isActive: true
    }
]
</script>

<style></style>