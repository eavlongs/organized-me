<template>
    <PageWrapper pageName="Trackers">
        <template v-if="loading">
            <Spinner class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </template>

        <template v-else-if="trackers.length > 0">
            <div class="flex gap-x-4 mt-4">
                <TrackerCard v-for="t in trackers" :tracker="t" @edit="forceRefresh = !forceRefresh"
                  @delete="forceRefresh = !forceRefresh" @error="onError" />
            </div>
        </template>

        <template v-else>
            <NoDataFound message="No Tracker Found" />
        </template>

        <CreateTrackerButton @create="forceRefresh = !forceRefresh" />
        <template v-if="toastProps !== null">
            <Toast :message="toastProps.message" :type="toastProps.type" @close="onCloseToast" />
        </template>
    </PageWrapper>
</template>

<script lang="ts" setup>
import type { ApiResponse, ToastProperty } from '~/utils/types/general';
import type { Tracker } from '~/utils/types/tracker';

definePageMeta({
    layout: "sidebar"
})

const forceRefresh = ref(false)
const { $api } = useNuxtApp()

const trackers = ref<Tracker[]>([])
const toastProps = ref<ToastProperty | null>(null)
const loading = ref(true)

watch(forceRefresh, () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const { data } = await $api<ApiResponse<Tracker[]>>("/trackers")
        if (!data) return
        trackers.value = data.trackers
        data.trackers.forEach((tracker) => {
            tracker.createdAt = new Date(tracker.createdAt)
            tracker.updatedAt = new Date(tracker.updatedAt)
        })
    } catch (error) {
        console.error(error)
    }
    loading.value = false
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

onBeforeMount(() => {
    nextTick(() => {
        fetchData()
    })
})
</script>

<style></style>