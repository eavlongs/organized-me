<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="props.open" title="Create New Note">
        <div class="flex flex-col gap-y-4">
            <div>
                <label for="title">Title</label>
                <Input v-model="title" @enter="handleSubmit" />
            </div>

            <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { CreateAndEditNote } from '~/schema/notes';

import type { ApiResponse, ValdiationError } from '~/utils/types/general';

const emits = defineEmits(['close', 'confirm'])
const { $api } = useNuxtApp()

const props = defineProps<{
    open: boolean
}>()

watch(() => props.open, (value) => {
    if (value) {
        title.value = ''
        errors.value = []
    }
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    const parseResponse = CreateAndEditNote.safeParse({
        title: title.value
    })

    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    try {
        const response = await $api<ApiResponse>(`/notes`, {
            method: 'POST',
            body: JSON.stringify({
                title: title.value
            })
        })

        if (response.success) {
            emits('confirm')
            return
        }

        if (response.error) {
            errors.value = [{ field: "general", message: Object.values(response.error)[0] }]
            throw new Error(Object.values(response.error)[0])
        }

        errors.value = [{ field: "general", message: "Failed to create note" }]
        throw new Error("Failed to create note")

    } catch (err: any) {
        console.log(err)
    }
}

const errors = ref<ValdiationError[]>([])

const title = ref<string>('')
</script>

<style></style>