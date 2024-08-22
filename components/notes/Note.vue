<template>
    <div class="border-b border-gray-700 py-4 cursor-pointer hover:bg-gray-100 pr-16 pl-2 relative">
        <div @click="emits('select'); editable = true" @focusout="updateTitle(); editable = false">
            <span :contenteditable="editable" class="px-2 py-1" ref="writableFieldRef" @keydown="e => {
                if (e.key === 'Enter') {
                    updateTitle();
                    editable = false;
                }
            }">
                {{ props.note.title }}
            </span>
        </div>
        <IconWrapper text="Delete" @click="deleteNote" class="absolute right-2 top-[50%] translate-y-[-50%]">
            <Icon name="ic:baseline-delete-outline" :size="24" />
        </IconWrapper>
    </div>
</template>

<script lang="ts" setup>
import { CreateAndEditNote } from '~/schema/notes';
import type { ApiResponse } from '~/utils/types/general';
import type { Note } from '~/utils/types/notes';


interface Props {
    note: Note
}

const editable = ref(false)
const writableFieldRef = ref<HTMLSpanElement | null>(null)

const props = defineProps<Props>()
const emits = defineEmits(["select", "update", "error", "delete"])
const { $api } = useNuxtApp()

const updateTitle = async () => {
    if (props.note === null) {
        return
    }
    if (props.note.title === writableFieldRef.value?.textContent) {
        return
    }
    const parseResponse = CreateAndEditNote.safeParse({
        title: writableFieldRef.value?.textContent
    })

    const errors = extractValidationError(parseResponse)

    if (errors.length > 0) {
        emits("error", errors[0].message)
        return
    }
    try {
        const response = await $api<ApiResponse>(`/notes/${props.note!.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: writableFieldRef.value!.textContent,
                content: props.note.content
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

const deleteNote = async () => {
    try {
        const response = await $api<ApiResponse>(`/notes/${props.note.id}`, {
            method: "DELETE"
        })

        if (response.success) {
            emits("delete")
            return
        }
        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to delete note")
    } catch (e: any) {
        emits("error", e.message)
    }
}
</script>

<style></style>