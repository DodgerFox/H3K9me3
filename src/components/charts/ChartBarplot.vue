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
        chartdata: null,
        options: {
            legend: {
                display: false
            },
            plugins: {
                datalabels: {
                    display: false,
                },
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
    computed: {

        getData() {
            return this.data
        }
    },
    methods: {
        init() {
            this.chartdata = {
                labels: [],
                datasets: [
                    {
                    type: 'scatter',
                    label: 'Scatter',
                    data: [{
            "x": 1.54731865,
            "y": "0.6252581"
          },
          {
            "x": 1.53064353,
            "y": "0.60509"
          },
          {
            "x": 1.52027183,
            "y": "0.61584634"
          }],
                    xAxisID:'left-x-axis',
                    borderColor: colors,
                    backgroundColor: colors
                }
                ],
            };
            let data = this.data;
            console.log(data, 'daatata');
            this.chartdata.labels = this.labels
            let colors = ['#ACDEE7', '#CCAACB', '#FFFFB5', '#FFCDB6', '#ECECEC', '#C7DBDA', '#FEFEFE', '#FDD7C2', '#818181']
            data.forEach((element) => {
                console.log(element);
                // this.chartdata.datasets.push({
                //     type: 'scatter',
                //     label: 'Scatter',
                //     data: element,
                //     xAxisID:'left-x-axis',
                //     borderColor: colors,
                //     backgroundColor: colors
                // })
                // this.chartdata.datasets.push({
                //     type: 'bar',
                //     label: 'bar',
                //     data: [],
                //     xAxisID:'bar-x-axis',
                //     backgroundColor: 'red'
                // })
            });
            this.renderChart(this.chartdata, this.options)
        }
    },
    mounted () {
        this.init()
        console.log(this.data);
        
    },
    watch: {
        getData () {
            this.init()
        }
    }

}
</script>