<template>
    <Dialog title="Edit Tracker" :open="tracker !== null" @close="onClose" @confirm="handleSubmit">
        <div class="flex flex-col gap-y-2">
            <div>
                <Label required>Title</Label>
                <Input v-model="title" id="title" @enter="handleSubmit" :block="false" class="ml-2" />
            </div>
            <div>
                <Label required>Description</Label>
                <Textarea v-model="description" @enter="handleSubmit"></Textarea>
            </div>
            <div>
                <Label required>What You're Tracking</Label>
                <Input v-model="name" @enter="handleSubmit" :block="false" class="ml-2" />
            </div>
            <div>
                <Label required>Image</Label>
                <input type="file" id="" class="ml-4" ref="imageRef" />
            </div>
            <div>
                <Label required>Unit Name</Label>
                <Input v-model="unitName" @enter="handleSubmit" :block="false" class="ml-2" />
            </div>
            <div>
                <Label>Range of Value</Label>
                <span class="ml-4">
                    <Input :block="false" v-model="startRange" type="number" @enter="handleSubmit" class="w-36 mr-2" />
                    to
                    <Input :block="false" v-model="endRange" type="number" @enter="handleSubmit" class="w-36 ml-2" />
                </span>
            </div>
            <div>
                <Toggle v-model="sumValue" label="Sum Value If On The Same Day?" textLeft required />
            </div>
            <div>
                <Toggle v-model="integerOnly" label="Integer Only?" textLeft required />
            </div>
            <div>
                <Toggle v-model="isLargerBetter" label="Is the value better when larger?" textLeft required />
            </div>
            <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { TrackerValidationSchema } from '~/schema/tracker';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';
import type { Tracker } from '~/utils/types/tracker';

interface Props {
    tracker: Tracker | null
}

const props = defineProps<Props>()
const emits = defineEmits(["close", "confirm", "error"])

const title = ref<string>(props.tracker?.title ?? "")
const description = ref<string>(props.tracker?.description ?? "")
const name = ref<string>(props.tracker?.name ?? "")
const imageRef = ref<HTMLInputElement | null>(null)
const unitName = ref<string>(props.tracker?.unit ?? "")
const startRange = ref<number>(props.tracker?.definiteRange?.[0] ?? 0)
const endRange = ref<number>(props.tracker?.definiteRange?.[1] ?? 1)
const sumValue = ref<boolean>(props.tracker?.sumValueOnSameDay ?? false)
const isLargerBetter = ref<boolean>(props.tracker?.largerBetter ?? false)
const integerOnly = ref<boolean>(props.tracker?.integerOnly ?? false)
const { $api } = useNuxtApp()
const errors = ref<ValdiationError[]>([])

watch(props, () => {
    if (props.tracker) {
        title.value = props.tracker.title
        description.value = props.tracker.description
        name.value = props.tracker.name
        unitName.value = props.tracker.unit
        startRange.value = props.tracker.definiteRange?.[0] ?? 0
        endRange.value = props.tracker.definiteRange?.[1] ?? 1
        sumValue.value = props.tracker.sumValueOnSameDay
        isLargerBetter.value = props.tracker.largerBetter
        integerOnly.value = props.tracker.integerOnly

        if (imageRef.value) {
            imageRef.value.files = null
            imageRef.value.value = ""
        }
    }
})

watch([startRange, endRange, sumValue, integerOnly, isLargerBetter], () => {
    startRange.value = parseInt(String(startRange.value))
    endRange.value = parseInt(String(endRange.value))
    sumValue.value = Boolean(sumValue.value)
    integerOnly.value = Boolean(integerOnly.value)
    isLargerBetter.value = Boolean(isLargerBetter.value)
})

const onClose = () => {
    emits('close')
}

const handleSubmit = async () => {
    const parseResponse = TrackerValidationSchema.safeParse({
        title: title.value,
        description: description.value,
        name: name.value,
        image: imageRef.value?.files?.[0],
        unit: unitName.value,
        definiteRange: [startRange.value, endRange.value],
        integerOnly: integerOnly.value,
        sumValueOnTheSameDay: sumValue.value,
        largerBetter: isLargerBetter.value,
        validateImage: false
    })
    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    const formData = new FormData()
    formData.append("title", title.value)
    formData.append("description", description.value)
    formData.append("name", name.value)
    formData.append("unit", unitName.value)
    if (imageRef.value!.files![0]) formData.append("image", imageRef.value!.files![0])
    formData.append("startRange", String(startRange.value))
    formData.append("endRange", String(endRange.value))
    formData.append("integerOnly", String(integerOnly.value))
    formData.append("sumValueOnTheSameDay", String(sumValue.value))
    formData.append("largerBetter", String(isLargerBetter.value))

    try {
        const response = await $api<ApiResponse>(`/trackers/${props.tracker?.id}`, {
            method: "PATCH",
            body: formData
        })

        console.log(response)

        if (response.success) {
            emits('confirm')
            return
        }

        console.log(response.error)
        console.log("here")
        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to edit tracker")
    } catch (e: any) {
        console.log(e)
        errors.value = [{ field: "general", message: e.message }]
    }
}

</script>

<style></style>