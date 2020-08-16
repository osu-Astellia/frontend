<template>
    <div class="rank">
        <div class="rankImage">
            <div class="image" :style="this.rankStyle"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-rank",
        props: ['rank'],
        data(){
            return {
                rankStyle: `background-image: url(https://osu.ppy.sh/images/badges/score-ranks-v2019/GradeSmall-${this.rank.toUpperCase()}.svg);`
            }
        }
    }
</script>

<style scoped>
.image {
    width: 100%;
    height: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
}

    .rankImage {
        height: 32px;
        width: 100%;
        display: block;
    }
</style>