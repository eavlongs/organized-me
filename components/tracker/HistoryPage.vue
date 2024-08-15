<template>
    <template v-if="tracker !== null && data.length > 0">
        <div class="w-full px-12 mt-4 mb-20">
            <table class="w-full table-auto">
                <thead>
                    <tr class="flex gap-x-8 items-center">
                        <th class="w-40 text-start">{{ tracker.name }}</th>
                        <th class="flex-grow text-start">Date</th>
                        <th class="w-40 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="d in props.data" :key="d.id">
                        <tr class="flex gap-x-8 items-center">
                            <td class="w-40 text-start">{{ d.value }} ({{ tracker.unit }})</td>
                            <td class="flex-grow text-start">{{ formatDateTime(d.createdAt) }}</td>
                            <td class="w-40 flex gap-x-2 justify-center">
                                <IconWrapper text="Edit" @click="emits('edit', d)" class="p-1">
                                    <Icon name="ic:twotone-edit" :size="24" />
                                </IconWrapper>
                                <IconWrapper text="Delete" @click="deleteTrackerData(d.id)">
                                    <Icon name="ic:baseline-delete-outline" :size="24" class="p-1" />
                                </IconWrapper>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </template>
</template>

<script lang="ts" setup>
import type { ApiResponse } from '~/utils/types/general';
import type { Tracker, TrackerData } from '~/utils/types/tracker';

interface Props {
    tracker: Tracker | null;
    data: TrackerData[]
}

const props = defineProps<Props>()
const emits = defineEmits(["edit", "delete", "error"])
const { $api } = useNuxtApp()

const deleteTrackerData = async (id: string) => {
    try {
        const response = await $api<ApiResponse>(`/trackers/entry/${id}`, {
            method: "DELETE",
        })

        if (response.success) {
            emits('delete')
            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to delete tracker data")
    } catch (e: any) {
        emits("error", e.message)
    }
}
</script>

<style></style>