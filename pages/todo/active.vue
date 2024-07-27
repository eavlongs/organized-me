<template>
    <Button class="fixed bottom-10 right-10 z-10" @click="onOpen">+ Add</Button>
    <TodoList :todos="todos" class="mt-4" @mark-as-done="onMarkAsDone" :loading="loading" @edit="editTodo"
      @delete="onDelete" />
    <AddTodoDialog :open="open" @close="onClose" @confirm="onConfirm" />
    <EditTodoDialog :todo="todoToEdit" @close="onCloseEdit" @confirm="onConfirmEdit" />
    <template v-if="toastProps !== null">
        <Toast :message="toastProps.message" :type="toastProps.type" @close="onCloseToast" />
    </template>
</template>

<script lang="ts" setup>
import type { ToastProperty, ApiResponse } from '~/utils/types/general';
import type { TodoItem } from '~/utils/types/todo';

definePageMeta({
    layout: "todo"
})

const open = ref(false)
const forceRefresh = ref(false)

watch(() => forceRefresh.value, () => {
    fetchData()
})

const onClose = () => {
    open.value = false
}

const onConfirm = () => {
    open.value = false
    forceRefresh.value = !forceRefresh.value
}

const onOpen = () => {
    open.value = true
}

const onCloseEdit = () => {
    todoToEdit.value = null
}

const onConfirmEdit = () => {
    todoToEdit.value = null
    forceRefresh.value = !forceRefresh.value
}

const editTodo = (todo: TodoItem) => {
    todoToEdit.value = {
        ...todo,
        time: new Date(todo.time)
    }
}

const onDelete = (message: string) => {
    toastProps.value = {
        message: message,
        type: "success"
    }

    forceRefresh.value = !forceRefresh.value
}

const onCloseToast = () => {
    toastProps.value = null
}

const todos = ref<TodoItem[]>([])
const loading = ref(true)
const todoToEdit = ref<TodoItem | null>(null)

async function fetchData() {
    try {
        const { data } = await useAPI<ApiResponse>("/todos/active")
        data.value.data!.todos.forEach((todo: TodoItem) => {
            todo.time = new Date(todo.time)
        })
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