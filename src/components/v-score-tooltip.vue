<template>

    <div style="width: auto; max-width: 600px; height: auto; min-height: 300px;">
        <div class="bm" :style="bmStyle">
            <div class="bmName">
                {{ bmDataFull.Artist }} - {{ bmDataFull.Title }} 
            </div>
        </div>
        я тут

    </div>
</template>

<script>
export default {
    name: 'v-bm-score',
    props: {
        beatmapID: {
            type: String,
            required: true,
            default: 0
        },
        scoreID: {
            type: String,
            required: true,
            default: 0
        }
    },
    data(){
        return {
            beatmapData: {
            },
            bmDataFull: {},
            scoreinfo: {
                "score_id": 89421,
                "beatmap_id": 1347841,
                "mods": 64,
                "accuracy": 83.77778,
                "timestamp": Date.parse("2020-09-11T05:48:40.000+00:00"),
                "pp": 99,
                "rank": "C"
            },
            bmStyle: ``
        }
    },

    async mounted(){
        this.beatmapData = await fetch(`https://hentai.ninja/api/b/${this.beatmapID}`).then(res=>res.json());
        this.bmDataFull = await fetch(`https://hentai.ninja/api/md5/${this.beatmapData.FileMD5}`).then(res=> res.json());
        this.bmStyle = {
            color: 'black',
            backdropFilter: 'blur(3px)',

            height: 'auto',
            minHeight: '60px',
            maxWidth: '500px',
            //background: `filter(url(https://assets.ppy.sh/beatmaps/${this.beatmapData.ParentSetID}/covers/cover@2x.jpg), blur(3px))`
        };
    }
}
</script>

<style>



</style>