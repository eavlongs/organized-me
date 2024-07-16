<template>
    <div v-if="props.todos.length != 0" v-for="todo in todos" :class="props.class">
        <TodoItem :todo="todo" :key="todo.id" />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    todos: TodoItem[]
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    class: ""
})

</script>

<style></style>