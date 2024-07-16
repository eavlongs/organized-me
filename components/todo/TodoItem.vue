<template>
    <div class="grid grid-cols-12 items-center">
        <div class="place-self-center">
            <div class="cursor-pointer">
                <Icon name="ic:baseline-check-box-outline-blank" :size="24" v-if="props.todo.isActive" />
                <Icon name="ic:baseline-check-box" :size="24" v-else />
            </div>
        </div>

        <p class="col-span-10">{{ props.todo.title }}</p>

        <div class="flex gap-x-2">
            <IconWrapper text="Edit" v-if="props.todo.isActive">
                <Icon name="ic:twotone-edit" :size="24" />
            </IconWrapper>
            <IconWrapper text="Delete">
                <Icon name="ic:baseline-delete-outline" :size="24" />
            </IconWrapper>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    todo: TodoItem
}>();

</script>

<style></style>