<template>
    <div class="grid grid-cols-12 items-center">
        <div class="place-self-center">
            <div class="cursor-pointer flex items-center">
                <button v-if="!props.todo.finishedAt" @click="markTodoAsDone" class="w-6 h-6">
                    <Icon name="ic:baseline-check-box-outline-blank" :size="24" />
                </button>
                <button v-else @click="restoreTodo">
                    <Icon name="ic:baseline-check-box" :size="24" class="w-6 h-6" />
                </button>
            </div>
        </div>

        <p class="col-span-10">{{ props.todo.title }}</p>

        <div class="flex gap-x-2">
            <IconWrapper text="Edit" v-if="!props.todo.finishedAt">
                <Icon name="ic:twotone-edit" :size="24" />
            </IconWrapper>
            <IconWrapper text="Delete">
                <Icon name="ic:baseline-delete-outline" :size="24" />
            </IconWrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { ApiResponse } from '~/utils/types/general';
import type { TodoItem } from '~/utils/types/todo';

const emits = defineEmits(["mark-as-done", "error", "restore-todo"]);

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

</script>

<style></style>