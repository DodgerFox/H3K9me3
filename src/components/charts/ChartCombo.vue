<script>
import { Bar } from 'vue-chartjs'
export default {
    name: 'ChartPeaks',
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
            scales: {
                xAxes: [{
                    id: 'left-x-axis',
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    }),

    mounted () {
        let chartdata = {
            // labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                type: 'scatter',
                label: 'Scatter',
                data: [{
                    x: 30,
                    y: 20
                }, {
                    x: 20,
                    y: 10
                }, {
                    x: 10,
                    y: 40
                }],
                borderColor: '#31b0d9',
                backgroundColor: '#31b0d9'
                // xAxisID: 'left-y-axis'
            },
            {
                type: 'line',
                label: 'Line',
                data: [{x:0, y:0}, {x:50, y:50}, {x:50, y:50}, {x:50, y:50}],
                fill: false,
                backgroundColor: '#fe5c78',
                borderColor: '#fe5c78'
                // xAxisID: 'left-x-axis'
            }],
        };
        let data = this.data.elements;
        console.log(data, 'chart');
        // data.forEach(element => {
        //     chartdata.labels.push(element.label)
        //     chartdata.datasets[0].data.push([0, element.value])
        // });
        this.renderChart(chartdata, this.options)
    }
}
</script>