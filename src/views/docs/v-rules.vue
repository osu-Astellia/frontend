<template>
    <div class="docsBox" v-html="this.text">
    </div>
</template>
<script>
    import bbCodeParser from 'js-bbcode-parser';

    export default {
        name: "v-rules",
        data(){
            return {
                text: `

                [h2]text[/h2]
                `
            }
            },
        mounted() {
            this.text = bbCodeParser.parse(this.text)
        }
    }
</script>

<style scoped>
.docsBox {
    margin: 0 auto;
    background-color: #1F2036;
    color: white;
}
</style>