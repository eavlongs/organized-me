<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="props.open" title="Create New Folder">
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
import { CreateAndEditFolderValidationSchema } from '~/schema/storage';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';

const emits = defineEmits(['close', 'confirm'])

const props = defineProps<{
    open: boolean
}>()

watch(() => props.open, (value) => {
    if (value) {
        name.value = ''
        errors.value = []
    }
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    const { $api } = useNuxtApp()
    const parseResponse = CreateAndEditFolderValidationSchema.safeParse({
        name: name.value
    })

    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    const route = useRoute()
    const id = typeof route.params.path === 'string' ? "root" : (route.params.path.length > 1 ? null : route.params.path[0])

    try {
        const response = await $api<ApiResponse>(`/storage/folder/${id}`, {
            method: 'POST',
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
        errors.value = [{ field: "general", message: "Failed to create folder" }]
        throw new Error("Failed to create folder")

    } catch (err: any) {
        console.log(err)
    }
}

const errors = ref<ValdiationError[]>([])

const name = ref<string>('')
</script>

<style></style>