<template>
    <div v-if="props.todos.length != 0" v-for="todo in todos" :class="props.class">
        <TodoItem :todo="todo" :key="todo.id" @mark-as-done="onMarkAsDone" @error="onError"
          @restore-todo="onRestoreTodo" />
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


const emits = defineEmits(["mark-as-done", "error", "restore-todo"]);

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

</script>

<style></style>