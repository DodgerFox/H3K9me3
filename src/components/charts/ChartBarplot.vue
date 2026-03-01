<template>
    <Chart type="bar" :data="chartData" :options="options" />
</template>

<script setup>
import { computed } from 'vue'
import { Chart } from 'vue-chartjs'
import '@/utils/chart'

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    labels: {
        type: Array,
        required: true
    }
})

const colors = ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9', '#3498DB', '#1ABC9C', '#16A085', '#16A085', '#27AE60', '#2ECC71', '#F1C40F', '#F39C12', '#D35400', '#34495E', '#2C3E50', '#A93226', '#CB4335', '#884EA0', '#7D3C98', '#2471A3', '#2E86C1', '#17A589', '#28B463']

const chartData = computed(() => {
    const datasets = []
    props.data.forEach((element, index) => {
        datasets.push({
            type: 'scatter',
            label: 'Scatter',
            data: element,
            xAxisID: 'left-x-axis',
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length]
        })
        datasets.push({
            type: 'bar',
            label: 'bar',
            data: [],
            xAxisID: 'bar-x-axis',
            backgroundColor: 'red'
        })
    })

    return {
        labels: props.labels,
        datasets
    }
})

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        'left-x-axis': {
            type: 'linear',
            position: 'top',
            ticks: {
                beginAtZero: true,
                stepSize: 10,
                display: false
            }
        },
        'bar-x-axis': {
            type: 'category',
            position: 'bottom',
            grid: {
                display: false
            },
            offset: true
        }
    }
}
</script>