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
            maintainAspectRatio: false
        }
    }),

    mounted () {
        let chartdata = {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                type: 'scatter',
                label: 'Bar Dataset',
                data: [{
                    x: -10,
                    y: 0
                }, {
                    x: 0,
                    y: 10
                }, {
                    x: 10,
                    y: 5
                }]
            }, {
                type: 'line',
                label: 'Line Dataset',
                data: [0, 50, 50, 50],
            }],
        };
        let data = this.data.elements;
        console.log(data, 'chartв');
        // data.forEach(element => {
        //     chartdata.labels.push(element.label)
        //     chartdata.datasets[0].data.push([0, element.value])
        // });
        this.renderChart(chartdata, this.options)
    }
}
</script>