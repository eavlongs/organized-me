<template>
    <PageWrapper pageName="Feature Visibility">
        <div class="flex flex-col gap-y-2 mt-4">
            <template v-for="i in items" :key="i.id">
                <Checkbox :checked="i.value" @change="newVal => i.value = newVal" :text="i.name" />
            </template>
        </div>

        <div class="flex gap-x-2 justify-end mt-4 mr-4" v-if="changesMade">
            <Button class="bg-red-700 hover:bg-red-800" @click="cancelChanges">
                Cancel
            </Button>
            <Button @click="saveChanges">
                Save Changes
            </Button>
        </div>

        <template v-if="toastProps !== null">
            <Toast :message="toastProps.message" :type="toastProps.type" @close="onCloseToast" />
        </template>
    </PageWrapper>
</template>

<script lang="ts" setup>
import type { ApiResponse, ToastProperty } from '~/utils/types/general';
import { type _Route, allRoutes } from './allRoutes';
definePageMeta({
    layout: "sidebar"
})

const user = useUser()
const { $api } = useNuxtApp()
const toastProps = ref<ToastProperty | null>(null)

const items = ref<(_Route & {
    value: boolean;
})[]>(allRoutes.map((route) => {
    return {
        ...route,
        value: user.value?.featureVisibility.includes(route.id) ?? false
    }
}))

const changesMade = computed(() => {
    return items.value.some((item) => item.value !== user.value?.featureVisibility.includes(item.id))
})

const cancelChanges = () => {
    items.value.forEach((item) => {
        item.value = user.value?.featureVisibility.includes(item.id) ?? false
    })
}

const saveChanges = async () => {
    try {
        const response = await $api<ApiResponse>("/users/feature-visibility", {
            method: "PATCH",
            body: JSON.stringify(items.value.filter((item) => item.value).map((item) => item.id))
        })

        if (response.success) {
            window.location.reload()
            return
        }

        if (response.error) { throw new Error(Object.values(response.error)[0]) }
    } catch (e: any) {
        toastProps.value = {
            message: e.message,
            type: "error"
        }
    }
}

const onCloseToast = () => {
    toastProps.value = null
}
</script>

<style></style>