<template>
    <div class="country">
        <img :src="flag_url" :style="flag_style">
    </div>
</template>

<script>
    export default {
        name: "v-flag",
        props: [
            'country',
            'size'
        ],
        data(){

        return {
            flag_url: `https://osu.gatari.pw/static/images/flags/${this.country}.png`,
            flag_style: `height: ${this.size}px;`
        }
    }
    }
</script>

<style scoped>
.country {
    width: 48px;
}
</style>