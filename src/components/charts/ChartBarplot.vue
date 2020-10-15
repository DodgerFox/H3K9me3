<script>
import { Bar } from 'vue-chartjs'
export default {
    name: 'ChartBarplot',
    props: {
        data: {
            type: Array,
            required: true
        },
        labels: {
            type: Array,
            required: true
        }
    },
    extends: Bar,
    components: {
        Bar
    },
    data: () => ({
        options: {
            legend: {
                display: false
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        id: 'left-x-axis',
                        type: 'linear',
                        position: 'top',
                        ticks: {
                            display: false
                        }
                    },
                    {
                        id: 'bar-x-axis',
                        type: 'category',
                        position: 'bottom',
                        gridLines : {
                            display : false
                        },
                        offset: true
                    }
                ]
            }
        }
    }),

    mounted () {
        console.log(this.data, 'chart');
        let chartdata = {
            labels: [],
            datasets: [],
        };
        let data = this.data;
        chartdata.labels = this.labels
        let colors = ["#31b0d9", "#00D688", "#FF1F40", "#54478C", "#F26D4C", "#2C699A", "#787878"]
        data.forEach((element, index) => {
            console.log(element);
            chartdata.datasets.push({
                type: 'scatter',
                label: 'Scatter',
                data: element,
                xAxisID:'left-x-axis',
                borderColor: colors[index],
                backgroundColor: colors[index]
            })
            chartdata.datasets.push({
                type: 'bar',
                label: 'bar',
                data: [],
                xAxisID:'bar-x-axis',
                backgroundColor: 'red'
            })
        });
        this.renderChart(chartdata, this.options)
    }
}
</script>