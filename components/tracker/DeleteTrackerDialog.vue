<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="tracker !== null" title="Delete Tracker">
        <p>Are you sure you want to delete this tracker?</p>
    </Dialog>
</template>

<script lang="ts" setup>
import type { ApiResponse, ValdiationError } from '~/utils/types/general';
import type { Tracker } from '~/utils/types/tracker';

const emits = defineEmits(['close', 'confirm', 'error'])

const props = defineProps<{
    tracker: Tracker | null
}>()


const { $api } = useNuxtApp()

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    if (!props.tracker) {
        return
    }

    try {
        const response = await $api<ApiResponse>(`/trackers/${props.tracker.id}`, {
            method: 'DELETE',
        })

        if (response.success) {
            emits('confirm')
            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }
        throw new Error("Failed to delete tracker")
    } catch (err: any) {
        emits("error", err.message)
    }
}
</script>

<style></style>