<template>
    <div class="flex mt-4 gap-x-4 mb-20">
        <StatsCard v-for="stat in props.stats" :title="stat.title" :description="stat.description" :type="stat.type" />
    </div>
</template>

<script lang="ts" setup>
import type { Tracker } from '~/utils/types/tracker';

interface Props {
    tracker: Tracker | null;
    stats: {
        title: string;
        description: string;
        type: "good" | "bad" | "neutral";
    }[]
}

const props = defineProps<Props>();
</script>

<style></style>