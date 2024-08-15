<template>
    <PageWrapper>
        <div class="flex items-center gap-x-2">
            <NuxtLink to="/tracker" class="font-bold text-xl">Trackers</NuxtLink>
            <span class="font-bold text-xl">{{ trackerName }}</span>
        </div>
        <div class="flex justify-end items-center gap-x-2 mt-2 mb-4 flex-wrap">
            Timeframe:
            <ChartFilterSelectOptions :value="timeframe"
              @filter="(option: TrackerDataFilterOption) => { timeframe = option.value; forceRefesh = !forceRefesh }" />
        </div>
        <TrackerDataChart :tracker="tracker" :data="trackerData" :filterOption="filterOption" />

        <div class="flex gap-x-2 mt-2">
            <div class="px-8 hover:border-b-4 border-gray-500 cursor-pointer font-semibold leading-10"
              :class="{ 'border-b-4 !border-black': page == 'stats' }" @click="page = 'stats'">
                Stats</div>
            <div class="px-8 hover:border-b-4 border-gray-500 cursor-pointer font-semibold leading-10"
              :class="{ 'border-b-4 !border-black': page == 'history' }" @click="page = 'history'">
                History</div>
        </div>

        <template v-if="page == 'stats'">
            <StatisticsPage :tracker="tracker" :stats="stats" />
        </template>

        <template v-else>
            <HistoryPage :tracker="tracker" :data="trackerData"
              @edit="(data: TrackerData) => { editTrackerData = data }" @delete="forceRefesh = !forceRefesh"
              @error="onError" />
        </template>

        <EnterDataButton :tracker="tracker" @create="forceRefesh = !forceRefesh" />
        <EditTrackerDataDialog :tracker="tracker" :data="editTrackerData" @close="editTrackerData = null"
          @confirm="editTrackerData = null; forceRefesh = !forceRefesh" />

        <template v-if="toastProps !== null">
            <Toast :message="toastProps.message" :type="toastProps.type" @close="onCloseToast" />
        </template>
    </PageWrapper>
</template>

<script lang="ts" setup>
import { filterOptions } from '~/components/tracker/filterOptions';
import TrackerDataChart from '~/components/tracker/TrackerDataChart.vue';
import type { ToastProperty, ApiResponse } from '~/utils/types/general';
import type { TrackerData, Tracker, TrackerDataFilterOption } from '~/utils/types/tracker';

definePageMeta({
    layout: "sidebar"
})

const route = useRoute()
const id: string = route.params.id as string
const trackerName = ref<string>("")
const page = ref<"stats" | "history">("stats")
const stats = ref<{ title: string; description: string; type: "good" | "bad" | "neutral" }[]>([])
const trackerData = ref<TrackerData[]>([])
const tracker = ref<Tracker | null>(null)
const editTrackerData = ref<TrackerData | null>(null)
const forceRefesh = ref(false)
const timeframe = ref<string>("7d")
const { $api } = useNuxtApp()

watch(forceRefesh, () => {
    fetchData()
})

const filterOption = computed(() => {
    return filterOptions.find(option => option.value === timeframe.value) ?? filterOptions[0]
})

const toastProps = ref<ToastProperty | null>(null)

const fetchData = async () => {
    try {
        const rangeParam = encodeURIComponent(timeframe.value)

        const response = await $api<ApiResponse<{
            tracker: Tracker;
            trackerData: TrackerData[];
            average: number;
            best: number;
            worst: number;
            range: number;
        }>>(`/trackers/${id}?range=${rangeParam}`)

        if (response.success) {
            tracker.value = response.data!.tracker
            trackerName.value = " - " + tracker.value.title
            trackerData.value = response.data!.trackerData

            trackerData.value = trackerData.value.map(d => {
                return {
                    ...d,
                    createdAt: new Date(d.createdAt)
                }
            })

            stats.value = [
                {
                    title: `Average ${toTitleCase(tracker.value.name)}`,
                    description: response.data?.average.toFixed(2) + " " + tracker.value.unit ?? "-",
                    type: "neutral"
                },
                {
                    title: `Best ${toTitleCase(tracker.value.name)}`,
                    description: response.data?.best.toFixed(2) + " " + tracker.value.unit ?? "-",
                    type: "good"
                },
                {
                    title: `Worst ${toTitleCase(tracker.value.name)}`,
                    description: response.data?.worst.toFixed(2) + " " + tracker.value.unit ?? "-",
                    type: "bad"
                },
                {
                    title: `Range of ${toTitleCase(tracker.value.name)}`,
                    description: response.data?.range.toFixed(2) + " " + tracker.value.unit ?? "-",
                    type: "neutral"
                }
            ]
        }
    } catch (error) {
        console.error(error)
    }
}

const onError = (message: string) => {
    toastProps.value = {
        message,
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