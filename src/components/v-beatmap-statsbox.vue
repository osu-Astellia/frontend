<template>
    <div class="statsbox">
        <table>
            <tr>
                <td>AR</td>
                <td> {{ this.AR }}</td>
            </tr>
            <tr>
                <td>OD</td>
                <td> {{ this.OD }}</td>
            </tr>
            <tr>
                <td>HP</td>
                <td> {{ this.HP }}</td>
            </tr>
            <tr>
                <td>CS</td>
                <td> {{ this.CS }}</td>
            </tr>
            <tr>
                <td>Length</td>
                <td>{{ this.length }} </td>
            </tr>
            <tr>
                <td>Stars</td>
                <td> {{  this.stars }}</td>
            </tr>
            <tr>
                <td>BPM</td>
                <td> {{  this.BPM }}</td>
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
        name: "v-beatmap-statsbox",
        props: [
            'AR',
            'OD',
            'HP',
            'CS',
            'length',
            'stars',
            'BPM'
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