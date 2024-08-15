<template>
    <template v-if="tracker !== null">
        <Dialog title="New Data Entry" :open="open" @close="onClose" @confirm="handleSubmit">
            <div class="flex flex-col gap-y-4">
                <div>
                    <label required>{{ tracker.name }} (in {{ tracker.unit }})</label>
                    <Input type="number" v-model="value" @enter="handleSubmit" />
                </div>

                <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
            </div>
        </Dialog>
    </template>
</template>

<script lang="ts" setup>
import { createTrackerDataEntryValidationSchema } from '~/schema/tracker';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';
import type { Tracker } from '~/utils/types/tracker';

interface Props {
    open: boolean,
    tracker: Tracker | null
}

const props = defineProps<Props>()
const value = ref<number>(0)
const errors = ref<ValdiationError[]>([])
const { $api } = useNuxtApp()

const emits = defineEmits(["close", "confirm"])

watch(props, () => {
    if (!props.open) {
        value.value = 0
    }
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    const parseResponse = createTrackerDataEntryValidationSchema(props.tracker!.definiteRange).safeParse({
        value: value.value = parseFloat(String(value.value))
    })

    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    try {
        const response = await $api<ApiResponse>(`/trackers/entry/${props.tracker!.id}`, {
            method: "POST",
            body: JSON.stringify({
                value: parseFloat(String(value.value))
            })
        })

        if (response.success) {
            emits('confirm')
            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to create tracker data")
    } catch (e: any) {
        errors.value = [{ field: "general", message: e.message }]
    }
}

</script>

<style></style>