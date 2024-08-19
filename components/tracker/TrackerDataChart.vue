<template>
    <template v-if="tracker !== null">
        <div class="w-full h-80">
            <!-- <canvas id="tracker-chart"></canvas> -->
            <Line id="my-chart-id" :options="chartOptions" :data="chartData" class="w-full" aria-label="Test Chart" />
        </div>
    </template>
</template>

<script lang="ts" setup>
import { Line } from 'vue-chartjs'
import type { Tracker, TrackerData, TrackerDataFilterOption } from '~/utils/types/tracker';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js'

// this component UI style is hard-coded, because this will only be used once
interface Props {
    tracker: Tracker | null,
    data: TrackerData[],
    filterOption: TrackerDataFilterOption;
}

const props = defineProps<Props>();

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const chartOptions = {
    responseive: true,
    maintainAspectRatio: false
}

const reversedData = computed(() => {
    return props.data.slice().reverse()
})

const chartData = computed(() => {
    return {
        labels: reversedData.value.map((data) => formatDate(data.createdAt, false)),
        datasets: [
            {
                label: `${props.tracker!.name}`,
                backgroundColor: '#16a34a',
                data: reversedData.value.map((data) => data.value)
            }
        ]
    }
})

</script>

<style></style>