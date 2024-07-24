<template>
    <Dialog @close="onClose" @confirm="handleSubmit" :open="props.todo !== null" title="Edit To-Do">
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
import type { TodoItem } from '~/utils/types/todo';

interface Props {
    todo: TodoItem | null;
}

const props = defineProps<Props>()

const now = new Date()
const minDate = new Date("1970-01-01")
const dateMinimum = minDate.toISOString().split('T')[0]


const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

const title = ref<string>('')
const description = ref<string>('')
const date = ref<string>('')
const hour = ref<string>('')
const minute = ref<string>('')
const ampm = ref<string>('')

watch(() => props.todo, (value) => {
    if (value) {
        title.value = props.todo?.title ?? ''
        description.value = props.todo?.description ?? ''
        date.value = formatDateToISOFormatUsingLocaleTime(props.todo?.time ?? now)
        hour.value = (props.todo ? (props.todo?.time.getHours() % 12 == 0 ? 12 : props.todo?.time.getHours() % 12) : 0).toString()
        minute.value = (props.todo ? (props.todo.time.getMinutes() - (props.todo.time.getMinutes() % 5)) : 0).toString()
        ampm.value = props.todo ? (props.todo?.time.getHours() < 12 ? "am" : "pm") : "am"
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
    try {
        const parseResponse = AddTodoValdiationSchema.safeParse({
            title: title.value,
            description: description.value,
            date: new Date(date.value),
            hour: parseInt(hour.value),
            minute: parseInt(minute.value),
            ampm: ampm.value
        })

        if (!parseResponse.success) {
            let errArr: any[] = [];
            const { errors: err } = parseResponse.error;
            for (var i = 0; i < err.length; i++) {
                errArr.push({ field: err[i].path[0], message: err[i].message });
            }
            errors.value = errArr
            throw new Error("Validation Error")
        }

        const time = new Date(date.value)
        time.setHours(ampm.value === "pm" ? parseInt(hour.value) + 12 : parseInt(hour.value))
        time.setMinutes(parseInt(minute.value))

        const response = await fetch(`http://localhost:8080/api/todos/${props.todo!.id}`, {
            method: 'PATCH',
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