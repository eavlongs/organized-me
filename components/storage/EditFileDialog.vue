<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="file !== null" title="Edit File">
        <div class="flex flex-col gap-y-4">
            <div>
                <label for="name">Name</label>
                <Input v-model="name" @enter="handleSubmit" />
            </div>

            <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { EditFileValidationSchema } from '~/schema/storage';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';
import type { _File } from '~/utils/types/storage';

const emits = defineEmits(['close', 'confirm'])

const props = defineProps<{
    file: _File | null
}>()

const errors = ref<ValdiationError[]>([])

const name = ref<string>('')

watch(() => props.file, (value) => {
    if (value) {
        name.value = props.file?.name ?? ''
        errors.value = []
    }
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    if (!props.file) {
        return
    }

    const { $api } = useNuxtApp()
    const parseResponse = EditFileValidationSchema.safeParse({
        name: name.value
    })

    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    try {
        const response = await $api<ApiResponse>(`/storage/file/${props.file.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: name.value
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
        errors.value = [{ field: "general", message: "Failed to create file" }]
        throw new Error("Failed to create file")
    } catch (err: any) {
        console.log(err)
    }
}
</script>

<style></style>