<template>
    <div class="profile" v-if="isMounted">
        <div class="profileBackground" :style="bgStyle" v-if="haveBG"></div>

        <div class="profileBox">

            <div class="infoBox">
                <div class="profileAvatar" :style="this.avatarStyle"></div>
                {{ this.username }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-profile",
        data: function(){
            return {
                    isMounted: false,
                    token: this.$store.state.token,
                    id: this.$route.params.id,
                    backgroundURL: 'https://media.discordapp.net/attachments/704347465809133638/733412691288522812/20200711_222935.jpg',
                    username: 'Cherry',
                    haveBG: true,
                    bgStyle: '',
                    avatarURL: '',
                    avatarStyle: ''


            }
    },
        mounted() {
            this.bgStyle = `z-index: 0; width: 100%; height: 300px; background-image: url("${this.backgroundURL}");`;
            this.avatarURL = `https://a.astellia.club/${this.id}`;
            this.avatarStyle = `width: 64px; height: 64px; background-image: url(${this.avatarURL}); background-position: center; background-size: cover;`
            this.isMounted = true;
        }
    }
</script>

<style scoped>

    .profileBackground {
        filter: blur(4px);

    }

    .infoBox {
        position: relative;
        display: flex;

    }

    .profileBox {
        background-color: #1F2036;
        width: 90%;
        height: auto;
        margin: 0 auto;
        z-index: 1;
        padding-bottom: 100px;
    }
</style>