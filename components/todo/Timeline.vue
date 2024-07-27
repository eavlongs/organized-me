<template>
    <p class="w-full text-center text-sm my-2 border-y py-2 border-[#9ca2b0]">
        {{ text }}
    </p>
</template>

<script lang="ts" setup>
const props = defineProps<{
    date: Date;
}>()

const now = new Date()
let text = ""

if (props.date.getDate() === now.getDate() && props.date.getMonth() === now.getMonth() && props.date.getFullYear() === now.getFullYear()) {
    text = "Today"
} else if (props.date.getDate() === now.getDate() - 1 && props.date.getMonth() === now.getMonth() && props.date.getFullYear() === now.getFullYear()) {
    text = "Yesterday"
} else if (props.date.getDate() === now.getDate() + 1 && props.date.getMonth() === now.getMonth() && props.date.getFullYear() === now.getFullYear()) {
    text = "Tomorrow"
} else {
    text = formatDateToISOFormatUsingLocaleTime(props.date)
}
</script>

<style></style>