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
        isActive: false
    },
    {
        id: 2,
        title: "Learn Vite",
        isActive: false
    },
    {
        id: 3,
        title: "Learn Tailwind CSS",
        isActive: false
    }
]
</script>

<style></style>