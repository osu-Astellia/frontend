<template>
    <div class="scoreBox">
    <div class="scoreBoxTitle">
        {{ this.title }}
    </div>
    <div class="scores" v-for="score of this.scores">
        <v-score :beatmap_id="score.beatmap_id" :accuracy="score.accuracy" :beatmap_title="score.beatmap_title" :mods="score.mods" :socre-timstamp="score.timestamp" :version="score.version" :pp="score.pp"></v-score>
    </div>
    </div>
</template>

<script>
    import VScore from "./v-score";
    export default {
        name: "v-scorebox",
        components: {VScore},
        props: [
            'scores',
            'title'
        ]

    }
</script>

<style scoped>

</style>