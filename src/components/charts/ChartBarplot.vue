<script>
import { Bar } from 'vue-chartjs'
export default {
    name: 'ChartBarplot',
    props: {
        data: {
            type: Object,
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
            // scales: {
            //     xAxes: [{
            //         id: 'left-x-axis',
            //         type: 'linear',
            //         position: 'bottom'
            //     }]
            // }
        }
    }),

    mounted () {
        let chartdata = {
            labels: [],
            datasets: [],
        };
        let data = this.data.elements;
        console.log(data, 'chart');
        chartdata.labels = this.data.labels
        let colors = ["#31b0d9", "#00D688", "#FF1F40", "#54478C", "#F26D4C", "#2C699A", "#787878"]
        data.forEach((element, index) => {
            console.log(element);
            chartdata.datasets.push({
                type: 'scatter',
                label: 'Scatter',
                data: element,
                borderColor: colors[index],
                backgroundColor: colors[index]
            })
        });
        this.renderChart(chartdata, this.options)
    }
}
</script>