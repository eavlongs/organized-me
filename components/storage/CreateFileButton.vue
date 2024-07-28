<template>
    <form enctype="multipart/form-data">
        <Button type="button">
            <label for="files">
                Upload File
            </label>
        </Button>
        <input type="file" multiple id="files" name="files" hidden @input="handleSubmit" ref="inputRef" />
    </form>
</template>

<script lang="ts" setup>;
import type { ApiResponse } from '~/utils/types/general';

const inputRef = ref<HTMLInputElement | null>(null)
const emits = defineEmits(['create']);

const handleSubmit = async () => {
    const route = useRoute()

    const id = typeof route.params.path === 'string' ? "root" : (route.params.path.length > 1 ? null : route.params.path[0])

    if (!inputRef.value) return

    if (inputRef.value.files) {
        const formData = new FormData()
        for (let i = 0; i < inputRef.value.files.length; i++) {
            formData.append('files', inputRef.value.files[i])
        }
        inputRef.value.files = null
        inputRef.value.value = ''

        await useAPI<ApiResponse>(`/storage/file/${id}`, {
            method: 'POST',
            body: formData
        })

        emits('create')
    }
}
</script>

<style></style>