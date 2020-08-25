
<script src="../router/index.js"></script>
<script>

    import { Line } from 'vue-chartjs';
    export default {
        extends: Line,
        name: "v-ppchart",
        props: {
            ppHistory: {
                type: Array,
                default: null
            },
            isRelax: {
                type: Boolean,
                default: false
            }
        },
        mounted() {

            let labels = this.ppHistory.map(v => require('moment')(Date.parse(v.time)).fromNow());
            //labels = [...new Set(labels)]

            //console.log([...new Set(this.ppHistory)].filter(score => labels.includes(require('moment')(Date.parse(score.date)).fromNow())))
            this.renderChart({
                labels: labels,
                datasets: [
                    {

                        label: 'PP',
                        backgroundColor: 'gold',
                        data: this.ppHistory.map(val => val.pp),
                        fill: false,
                        borderColor: 'gold'

                    }
                ]
            }, {responsive: true, maintainAspectRatio: false, legend: {display: false}, scales: {
                xAxes: [{
                    ticks: {
                        display: false
                    }
                }]
                }})
        }
    }
</script>

<style scoped>

</style>