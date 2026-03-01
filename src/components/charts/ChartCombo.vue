<template>
    <Chart type="scatter" :data="chartData" :options="options" />
</template>

<script setup>
import { computed } from 'vue'
import { Chart } from 'vue-chartjs'
import '@/utils/chart'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const chartData = computed(() => ({
    datasets: [
        {
            type: 'scatter',
            label: 'Scatter',
            data: props.data?.points ?? [],
            borderColor: '#31b0d9',
            backgroundColor: '#31b0d9'
        },
        {
            type: 'line',
            label: 'Line',
            data: props.data?.line ?? [],
            fill: false,
            backgroundColor: '#fe5c78',
            borderColor: '#fe5c78'
        }
    ]
}))

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            }
        }
}
</script>