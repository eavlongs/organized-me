<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="folder !== null" title="Edit Folder">

        <p>Are you sure you want to delete this folder?</p>

        <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />

    </Dialog>
</template>

<script lang="ts" setup>
import type { ApiResponse, ValdiationError } from '~/utils/types/general';
import type { Folder } from '~/utils/types/storage';

const emits = defineEmits(['close', 'confirm'])

const props = defineProps<{
    folder: Folder | null
}>()

const errors = ref<ValdiationError[]>([])

watch(() => props.folder, (value) => {
    if (value) {
        errors.value = []
    }
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    if (!props.folder) {
        return
    }

    const { $api } = useNuxtApp()

    if (errors.value.length > 0) {
        return
    }

    try {
        const response = await $api<ApiResponse>(`/storage/folder/${props.folder.id}`, {
            method: 'DELETE',
        })

        if (response.success) {
            emits('confirm')
            return
        }

        if (response.error) {
            errors.value = [{ field: "general", message: Object.values(response.error)[0] }]
            throw new Error(Object.values(response.error)[0])
        }
        errors.value = [{ field: "general", message: "Failed to create folder" }]
        throw new Error("Failed to create folder")
    } catch (err: any) {
        console.log(err)
    }
}
</script>

<style></style>