<template>
    <Button class="fixed bottom-10 right-10" @click="onOpen">+ Add</Button>
    <TodoList :todos="todos" class="mt-4" @mark-as-done="onMarkAsDone" :loading="loading" />
    <AddTodoDialog :open="open" @close="onClose" @confirm="onConfirm" />
    <template v-if="toastProps !== null">
        <Toast :message="toastProps.message" :type="toastProps.type" />
    </template>
</template>

<script lang="ts" setup>
import type { ToastProperty, ApiResponse } from '~/utils/types/general';
import type { TodoItem } from '~/utils/types/todo';

definePageMeta({
    layout: "todo"
})

const open = ref(false)

const onClose = () => {
    open.value = false
}

const onConfirm = async () => {
    open.value = false
    await refreshNuxtData()
}

const onOpen = () => {
    open.value = true
}

const todos = ref<TodoItem[]>([])
const loading = ref(true)

async function fetchData() {
    try {
        const { data } = await useAPI<ApiResponse>("/todos/active")
        todos.value = data.value.data!.todos
        loading.value = false

    } catch (error) {
        console.error(error)
    }
}

const toastProps = ref<ToastProperty | null>(null)

const onMarkAsDone = async (message: string) => {
    toastProps.value = {
        message,
        type: "success"
    }
    await fetchData()
}

onBeforeMount(() => {
    nextTick(() => {
        fetchData()
    })
})

</script>

<style></style>