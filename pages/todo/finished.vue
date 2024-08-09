<template>
    <TodoList :todos="todos" class="mt-4" @restore-todo="onRestoreTodo" :loading="loading"
      @delete="forceRefresh = !forceRefresh" />
    <template v-if="toastProps !== null">
        <Toast :message="toastProps.message" :type="toastProps.type" />
    </template>
</template>

<script lang="ts" setup>
import type { ApiResponse, ToastProperty } from '~/utils/types/general';
import type { TodoItem } from '~/utils/types/todo';

definePageMeta({
    layout: "todo"
})
const todos = ref<TodoItem[]>([])
const toastProps = ref<ToastProperty | null>(null)
const loading = ref(true)
const forceRefresh = ref(false)

watch(forceRefresh, () => {
    fetchData()
})

async function fetchData() {
    try {
        const { data } = await useAPI<ApiResponse>("/todos/finished")
        data.value.data!.todos.forEach((todo: TodoItem) => {
            todo.time = new Date(todo.time)
        })
        todos.value = data.value.data!.todos
        loading.value = false

    } catch (error) {
        console.error(error)
    }
}

const onRestoreTodo = (message: string) => {
    toastProps.value = {
        message,
        type: "success"
    }
    forceRefresh.value = !forceRefresh.value
}


onBeforeMount(() => {
    nextTick(() => {
        fetchData()
    })
})

</script>

<style></style>