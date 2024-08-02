<template>
    <form enctype="multipart/form-data">
        <Button type="button" :disable="isUploading" class="fixed bottom-10 right-10 z-10">
            <label for="files">
                {{ isUploading ? 'Uploading...' : 'Upload Files' }}
            </label>
        </Button>
        <input type="file" multiple id="files" name="files" hidden @input="handleSubmit" ref="inputRef" />
    </form>
</template>

<script lang="ts" setup>;
import type { ApiResponse } from '~/utils/types/general';

const inputRef = ref<HTMLInputElement | null>(null)
const emits = defineEmits(['create', 'error']);
const isUploading = ref(false)

const handleSubmit = async () => {
    const route = useRoute()

    const id = typeof route.params.path === 'string' ? "root" : (route.params.path.length > 1 ? null : route.params.path[0])

    if (!inputRef.value) return

    if (inputRef.value.files) {
        const { $api } = useNuxtApp()
        try {
            const formData = new FormData()
            for (let i = 0; i < inputRef.value.files.length; i++) {
                formData.append('files', inputRef.value.files[i])
            }
            inputRef.value.files = null
            inputRef.value.value = ''

            isUploading.value = true

            const response = await $api<ApiResponse>(`/storage/file/${id}`, {
                method: 'POST',
                body: formData
            })

            isUploading.value = false

            if (response.success) {
                emits('create')
                return
            }

            if (response.error) {
                throw new Error(Object.values(response.error)[0])
            }
            throw new Error("Failed to create folder")
        } catch (err: any) {
            emits('error', err.message)
            isUploading.value = false
            console.log(err)
        }
    }
}
</script>

<style></style>