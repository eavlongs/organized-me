<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="props.open" title="Add New To-Do">
        <div class="flex flex-col gap-y-4">
            <div>
                <label for="title">Title</label>
                <Input v-model="title" @enter="handleSubmit" />
            </div>
            <div>
                <label for="description">Description</label>
                <Textarea v-model="description" @enter="handleSubmit"></Textarea>
            </div>
            <div>
                <label for="date">Date</label>
                <Input type="date" :min="dateMinimum" v-model="date" @enter="handleSubmit" />
            </div>
            <div>
                <label for="hour">Time</label>
                <div class="flex gap-x-4 items-center">
                    <select id="hour" name="hour" class="px-2 cursor-pointer border border-gray-800 rounded"
                      v-model="hour">
                        <option v-for="i in 12" :key="i" :value="i.toString()">
                            {{ i }}
                        </option>
                    </select>

                    <p class="font-bold text-xl">:</p>

                    <select id="minute" name="minute" class="px-2 cursor-pointer border border-gray-800 rounded"
                      v-model="minute">
                        <option v-for="minute in minutes" :key="minute" :value="minute.toString()">{{
                            padZeroLeft(minute, 2) }}
                        </option>
                    </select>

                    <select id="ampm" name="ampm" class="px-2 cursor-pointer border border-gray-800 rounded"
                      v-model="ampm">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </select>
                </div>
            </div>
            <ErrorMessage v-if="errors.length > 0" :message="errors[0].message" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { AddTodoValdiationSchema } from '~/schema/todo';
import type { ApiResponse, ValdiationError } from '~/utils/types/general';

interface Props {
    open: boolean;
}

const now = new Date()
const minDate = new Date("1970-01-01")
const dateMinimum = minDate.toISOString().split('T')[0]
const year = now.getFullYear()
const month = now.getMonth() + 1
const day = now.getDate()

const dateMinimumString = `${year}-${padZeroLeft(month, 2)}-${padZeroLeft(day, 2)}`;

const props = defineProps<Props>()
const hourDefaultValue = new Date().getHours() % 12 == 0 ? 12 : new Date().getHours() % 12

const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

const ampmDefault = new Date().getHours() < 12 ? "am" : "pm"

const minuteDefault = new Date().getMinutes() - (new Date().getMinutes() % 5)

const title = ref<string>('')
const description = ref<string>('')
const date = ref<string>(dateMinimumString)
const hour = ref<string>(hourDefaultValue.toString())
const minute = ref<string>(minuteDefault.toString())
const ampm = ref<string>(ampmDefault)

watch(() => props.open, (value) => {
    if (value) {
        const hourDefaultValue = new Date().getHours() % 12 == 0 ? 12 : new Date().getHours() % 12
        const ampmDefault = new Date().getHours() < 12 ? "am" : "pm"
        const minuteDefault = new Date().getMinutes() - (new Date().getMinutes() % 5)

        title.value = ''
        description.value = ''
        date.value = dateMinimumString
        hour.value = hourDefaultValue.toString()
        minute.value = minuteDefault.toString()
        ampm.value = ampmDefault
        errors.value = []
    }
})

const errors = ref<ValdiationError[]>([])

const emits = defineEmits(["close", "confirm"])

const onClose = () => {
    emits('close')
}

const onConfirm = () => {
    emits('confirm')
}

const handleSubmit = async () => {
    const parseResponse = AddTodoValdiationSchema.safeParse({
        title: title.value,
        description: description.value,
        date: new Date(date.value),
        hour: parseInt(hour.value),
        minute: parseInt(minute.value),
        ampm: ampm.value
    })

    errors.value = extractValidationError(parseResponse)

    if (errors.value.length > 0) {
        return
    }

    try {
        const time = new Date(date.value)
        time.setHours(ampm.value === "pm" ? parseInt(hour.value) + 12 : parseInt(hour.value))
        time.setMinutes(parseInt(minute.value))

        const response = await fetch(`http://localhost:8080/api/todos/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                title: title.value,
                description: description.value,
                time: time
            })
        })

        const json: ApiResponse = await response.json();

        if (!response.ok) {
            if (json.error) {
                errors.value = [{ field: "general", message: Object.values(json.error)[0] }]
                throw new Error(Object.values(json.error)[0])
            }
            errors.value = [{ field: "general", message: "Failed to create todo" }]
            throw new Error("Failed to create todo")
        }

        onConfirm()
    } catch (e) {
        console.error(e)
    }
}

</script>

<style></style>