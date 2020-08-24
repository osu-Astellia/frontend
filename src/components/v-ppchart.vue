
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


            this.renderChart({
                labels: this.ppHistory.filter(score => this.isRelax ? score.is_relax : !score.is_relax ).map(v => v.time),
                datasets: [
                    {
                        label: 'PP',
                        backgroundColor: 'gold',
                        data: this.ppHistory.map(v => v.pp),
                        fill: false,
                        borderColor: 'gold'

                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>

<style scoped>

</style>