<template>
    <Chart type="bar" :data="chartData" :options="options" />
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

const chartData = computed(() => {
    const elements = props.data?.elements ?? []
    return {
        labels: elements.map((element) => element.label),
        datasets: [
            {
                label: '',
                data: elements.map((element) => [0, element.value]),
                minBarLength: 0,
                backgroundColor: Array(elements.length).fill('#fe5c78')
            }
        ]
    }
})

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    }
}
</script>