<template>
    <div class="flex items-center gap-x-6 mx-6">
        <div class="place-self-center">
            <div class="cursor-pointer">
                <button v-if="!props.todo.finishedAt" @click="markTodoAsDone" class="w-6 h-6">
                    <Icon name="ic:baseline-check-box-outline-blank" :size="24" />
                </button>
                <button v-else @click="restoreTodo">
                    <Icon name="ic:baseline-check-box" :size="24" class="w-6 h-6" />
                </button>
            </div>
        </div>

        <div class="flex-1 grid grid-cols-9 items-center">
            <p class="col-span-1">{{ formatTime(props.todo.time) }}</p>
            <div class="grid grid-cols-10 col-span-8 gap-x-4">
                <p class="col-span-3">{{ props.todo.title }}</p>
                <p>{{ props.todo.description }}</p>
            </div>
        </div>

        <div class="flex gap-x-2">
            <IconWrapper text="Edit" v-if="!props.todo.finishedAt" @click="editTodo">
                <Icon name="ic:twotone-edit" :size="24" />
            </IconWrapper>
            <IconWrapper text="Delete" @click="deleteTodo">
                <Icon name="ic:baseline-delete-outline" :size="24" />
            </IconWrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ApiResponse } from '~/utils/types/general';
import type { TodoItem } from '~/utils/types/todo';

const emits = defineEmits(["mark-as-done", "error", "restore-todo", "edit", "delete"]);

const props = defineProps<{
    todo: TodoItem
}>();

const markTodoAsDone = async () => {
    const { $api } = useNuxtApp()

    try {
        const response = await $api<ApiResponse>(`/todos/${props.todo.id}/done`, {
            method: "PATCH"
        })

        const message = response.message

        if (response.success) {
            emits("mark-as-done", message)
            return
        }

        throw new Error(message)
    } catch (err: any) {
        console.error(err)
        emits("error", err.message)
    }
};

const restoreTodo = async () => {
    const { $api } = useNuxtApp()

    try {
        const response = await $api<ApiResponse>(`/todos/${props.todo.id}/restore`, {
            method: "PATCH"
        })

        const message = response.message

        if (response.success) {
            emits("restore-todo", message)
            return
        }

        throw new Error(message)
    } catch (err: any) {
        console.error(err)
        emits("error", err.message)
    }
}

const editTodo = () => {
    emits("edit", props.todo)
}

const deleteTodo = async () => {
    const { $api } = useNuxtApp()

    try {
        const response = await $api<ApiResponse>(`/todos/${props.todo.id}`, {
            method: "DELETE"
        })

        const message = response.message

        if (response.success) {
            emits("delete", message)
            return
        }

        throw new Error(message)
    } catch (err: any) {
        console.error(err)
        emits("error", err.message)
    }
}

</script>

<style></style>