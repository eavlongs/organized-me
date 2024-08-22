<template>
    <div class="col-span-7 h-full" :class="{ 'hidden': note == null }">

        <Editor :api-key="key" :init="{
            toolbar_mode: 'sliding',
            plugins: 'autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount a11ychecker advtable advcode autocorrect',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table  | align lineheight | checklist numlist bullist indent outdent | spellcheckdialog | emoticons',
            branding: false,
            resize: false,
            menubar: '',
        }" v-model="editor" @focusout="saveChanges" />
    </div>
</template>

<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
import type { ApiResponse } from '~/utils/types/general';
import type { Note } from '~/utils/types/notes';

interface Props {
    note: Note | null
}

const props = defineProps<Props>()
const emits = defineEmits(["update", "error"])
const { $api } = useNuxtApp()
const config = useRuntimeConfig()
// console.log({ key: config.public.tinyKey })
const key = config.public.tinyKey

watch(props, () => {
    if (props.note !== null) {
        editor.value = props.note.content
    }
})

const editor = ref<string>("")

watch(editor, debounce(() => {
    if (props.note !== null) {
        saveChanges()
    }
}, 1000))


const saveChanges = async () => {
    if (props.note === null) {
        return
    }

    if (editor.value === props.note.content) {
        return
    }
    try {
        const response = await $api<ApiResponse>(`/notes/${props.note!.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: props.note!.title,
                content: editor.value
            })
        })

        if (response.error) {
            const errorMessage = Object.values(response.error)[0]
            throw new Error(errorMessage)
        }

        emits("update")
    } catch (e: any) {
        emits("error", e.message)
    }
}

onMounted(() => {
    if (props.note !== null) {
        editor.value = props.note.content
    }
})
</script>

<style>
.tox.tox-tinymce {
    min-height: 100%;
}
</style>