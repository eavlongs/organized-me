<template>
    <div v-if="props.todos.length != 0" v-for="(todo, i) in todos" :class="props.class">
        <templte v-if="i == 0 || (i != 0 && (todo.time.toDateString() != props.todos[i - 1].time.toDateString()))">
            <Timeline :date="todo.time" :key="todo.id + todo.time.toDateString()" />
        </templte>
        <TodoItem :todo="todo" :key="todo.id" @mark-as-done="onMarkAsDone" @error="onError"
          @restore-todo="onRestoreTodo" @edit="onEdit" @delete="onDelete" />
    </div>
    <div v-else>
        <template v-if="loading">
            <div class="text-lg text-center mt-20">Loading</div>
        </template>
        <template v-else>
            <div class="text-lg text-center mt-20">No todos found</div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { TodoItem } from '~/utils/types/todo';

const emits = defineEmits(["mark-as-done", "error", "restore-todo", "edit", "delete"]);

interface Props {
    todos: TodoItem[]
    class?: string;
    loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

const onMarkAsDone = (message: string) => {
    emits("mark-as-done", message)
}

const onError = (message: string) => {
    emits("error", message)
}

const onRestoreTodo = (message: string) => {
    emits("restore-todo", message)
}

const onEdit = (todo: TodoItem) => {
    emits("edit", todo)
}

const onDelete = (message: string) => {
    emits("delete", message)
}
</script>

<style></style>