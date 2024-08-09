<template>
    <Dialog title="Create New Tracker" :open="open" @close="onClose" @confirm="handleSubmit">
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
            <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { TrackerValidationSchema } from '~/schema/tracker';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';

interface Props {
    open: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(["close", "confirm", "error"])

const title = ref<string>("")
const description = ref<string>("")
const name = ref<string>("")
const imageRef = ref<HTMLInputElement | null>(null)
const unitName = ref<string>("")
const startRange = ref<number>(0)
const endRange = ref<number>(1)
const sumValue = ref<boolean>(false)
const integerOnly = ref<boolean>(false)
const { $api } = useNuxtApp()
const errors = ref<ValdiationError[]>([])

watch(props, () => {
    if (!props.open) {
        title.value = ""
        description.value = ""
        name.value = ""
        unitName.value = ""
        startRange.value = 0
        endRange.value = 1
        sumValue.value = false
        integerOnly.value = false
        if (imageRef.value) {
            imageRef.value.files = null
            imageRef.value.value = ""
        }
    }
})

watch([startRange, endRange, sumValue, integerOnly], () => {
    startRange.value = parseInt(String(startRange.value))
    endRange.value = parseInt(String(endRange.value))
    sumValue.value = Boolean(sumValue.value)
    integerOnly.value = Boolean(integerOnly.value)
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
        validateImage: true
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
    formData.append("image", imageRef.value!.files![0])
    formData.append("startRange", String(startRange.value))
    formData.append("endRange", String(endRange.value))
    formData.append("integerOnly", String(integerOnly.value))
    formData.append("sumValueOnTheSameDay", String(sumValue.value))

    try {
        const response = await $api<ApiResponse>("/trackers", {
            method: "POST",
            body: formData
        })

        if (response.success) {
            emits('confirm')
            return
        }

        if (response.error) {
            throw new Error(Object.values(response.error)[0])
        }

        throw new Error("Failed to create tracker")
    } catch (e: any) {
        emits("error", e.message)
    }
    emits('confirm')
}

</script>

<style></style>