<template>
    <div class="statsbox">
        <table>
            <tr>
                <td>PP</td>
                <td>{{ this.pp }}</td>
            </tr>
            <tr>
                <td>Ranked Score</td>
                <td> {{ this.rankedScore }}</td>
            </tr>
            <tr>
                <td>Total Score</td>
                <td> {{ this.totalScore }}</td>
            </tr>
            <tr>
                <td>Playcount</td>
                <td> {{ this.totalPlaycount }}</td>
            </tr>
            <tr>
                <td>Watched Replays</td>
                <td> {{ this.watchedReplays }}</td>
            </tr>
            <tr>
                <td>Accuracy</td>
                <td>{{ this.accuracy }}% </td>
            </tr>
            <tr>
                <td>Level</td>
                <td> {{ this.level }}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>

    export default {
        name: "v-statsbox",
        props: [
            'pp',
            'rankedScore',
            'totalScore',
            'totalPlaycount',
            'watchedReplays',
            'total_hits',
            'accuracy',
            'level'
        ],
        methods(){
            // thank mr stackoverflow
            function addCommas(nStr) {
            nStr += '';
            let x = nStr.split('.');
            let x1 = x[0];
            let x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' +
                ',' +
                '$2');
            }
            return x1 + x2;
            }
        },
        beforeMount(){

        }
    }


</script>

<style scoped>
tr {
    width: 400px;
    justify-content: space-between;
    display: flex;
}
</style>