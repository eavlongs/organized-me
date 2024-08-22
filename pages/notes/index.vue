<template>
    <PageWrapper pageName="Notes">
        <div class="grid grid-cols-10 border-t min-h-[calc(100vh-53px)] max-h-[calc(100vh-53px)] border-gray-700 mt-4">
            <div
              class="col-span-3 relative border-r border-gray-700 max-h-[calc(100vh-53px)] min-h-full overflow-y-scroll hide-scrollbar">
                <template v-if="loading">
                    <Spinner class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
                </template>

                <template v-else-if="notes.length > 0">
                    <Note v-for="note in notes" :note="note" :key="note.id" @select="onSelectNote(note)"
                      @update="forceRefresh = !forceRefresh" @error="onError" @delete="forceRefresh = !forceRefresh" />
                </template>

                <template v-else>
                    <NoDataFound class="!absolute" message="No Notes Found" />
                </template>

                <Button @click="open = true" class="fixed bottom-10 right-10 z-10">New Note</Button>
            </div>
            <NoteEditor :note="selectedNote" @error="onError" @update="forceRefresh = !forceRefresh" />
        </div>

        <CreateNewNoteDialolg :open="open" @close="open = false"
          @confirm="open = false; forceRefresh = !forceRefresh" />

        <template v-if="toastProps !== null">
            <Toast :message="toastProps.message" :type="toastProps.type" @close="onCloseToast" />
        </template>
    </PageWrapper>
</template>

<script lang="ts" setup>
import type { ApiResponse, ToastProperty } from '~/utils/types/general';
import type { Note } from '~/utils/types/notes';

definePageMeta({
    layout: "sidebar"
})

const forceRefresh = ref(false)
const open = ref(false)
const selectedNote = ref<Note | null>(null)
const notes = ref<Note[]>([])
const loading = ref(true)
const toastProps = ref<ToastProperty | null>(null)
const { $api } = useNuxtApp()

watch(forceRefresh, () => {
    fetchData()
})

const onSelectNote = (note: Note) => {
    selectedNote.value = note
}

const onError = (message: string) => {
    toastProps.value = {
        message: message,
        type: "error"
    }
}

const onCloseToast = () => {
    toastProps.value = null
}

async function fetchData() {
    try {
        const response = await $api<ApiResponse<{ notes: Note[] }>>(`/notes`)
        if (response.success) {
            notes.value = response.data!.notes
        }
    } catch (error) {
        console.error(error)
    }
    loading.value = false
}

onMounted(() => {
    fetchData()
})
</script>

<style></style>