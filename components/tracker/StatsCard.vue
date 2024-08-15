<template>
    <div class="w-60 min-h-28 border border-gray-400 rounded shadow-md py-8 px-4">
        <p class="text-lg font-semibold mb-2 line-clamp-2">{{ title }}</p>
        <p class="font-semibold"
          :class="{ 'text-gray-500': props.type == 'neutral', 'text-green-600': props.type == 'good', 'text-red-600': props.type == 'bad' }">
            {{ description }}</p>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    class?: string;
    title: string;
    description: string;
    type: "good" | "bad" | "neutral";
}

const props = withDefaults(defineProps<Props>(), {
    class: "",
    type: "neutral",
});
</script>

<style></style>