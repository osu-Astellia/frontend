<template>
    <div class="profile" v-if="isMounted">
        <div class="profileBackground" :style="bgStyle" v-if="haveBG"></div>

        <div class="profileBox">

            <div class="infoBox">


                <div class="infoBoxUsernameCountry">
                    <div class="profileAvatar" :style="this.avatarStyle"></div>
                    <div class="infoUsername">{{ this.stats.username }}</div>
                    <div class="infoCountry"> <v-flag size="30" :country="this.stats.country"/> </div>
                </div>


                <div class="statsBoxTable">
                    <v-statsbox class="mr-auto" :pp="this.stats.pp" :accuracy="this.stats.accuracy.toFixed(2)" :level="this.stats.level" :ranked-score="this.stats.ranked_score" :total-playcount="this.stats.playcount"  :watched-replays="this.stats.replays_watched" :totalScore="this.stats.total_score" :total_hits="this.stats.total_hits" />
                </div>
            </div>


                    <div class="scoreBox">
                        <b-form-checkbox size="lg" v-model="isRelax" @change="changeRelax">Relax?</b-form-checkbox>

            <div class="socreBoxTitle">Best Scores</div> 
            <div class="score" :key="score" v-for="score of scores.best">
                <div class="score1">
                     <div class="rank-full">
                         <div :class="score.rankClasses"></div>
                     </div>
                     <router-link :to="score.link" class="beatmapscorelink">{{ score.beatmap_title }} {{ score.difficulty }} {{ getScoreMods(score.mods) }} </router-link>


                </div>
                    <div class="score2">

                        <div class="acc">{{ score.accuracy.toFixed(2) }}%</div>
                        <div class="pp">{{ score.pp }} PP</div>  
                    </div>
                </div>
            </div>

            <button class="score-button" @click="load_scores">

                Load more scores
            </button>
        </div>
    </div>


    
</template>

<script>
    import VFlag from "../components/v-flag";
    import VStatsbox from "../components/v-statsbox";
    import VScorebox from "../components/v-scorebox";
    import VRank from "../components/v-rank";

    export default {
        name: "v-profile",
        components: {VRank, VScorebox, VStatsbox, VFlag},
        methods: {
            async load_scores(){
                this.best_limit += 5;
                let scoresbest_tmp = await this.axios.get(`/frontend/api/v1/user/best?u=${this.id}&m=${this.mode}&r=${this.isRelax}`).then(r => r.data).catch(e => alert(e.message));

                for(let i = 0; i < this.best_limit; i++){

                scoresbest_tmp[i].link = `/b/${scoresbest_tmp[i].beatmap_id}`;
                scoresbest_tmp[i].rankClasses = `rank-${scoresbest_tmp[i].rank} score--rank`;
                this.scores.best.push(scoresbest_tmp[i]);   
            }},
            
            
            async changeRelax(){
                this.scores.best = [];
                this.load_scores();
                this.best_limit = 5;
                this.stats = await this.axios.get(`/frontend/api/v1/profile_info?u=${this.id}&mode=${this.mode}&r=${this.isRelax}`).then(r => r.data[0]).catch(e => this.$router.push({path: '/404'}));


            },
            getScoreMods(m, noplus) {
                
                var modsString = [
                "NF",
                "EZ",
                "NV",
                "HD",
                "HR",
                "SD",
                "DT",
                "RX",
                "HT",
                "NC",
                "FL",
                "AU", // Auto.
                "SO",
                "AP", // Autopilot.
                "PF",
                "K4",
                "K5",
                "K6",
                "K7",
                "K8",
                "K9",
                "RN", // Random
                "LM", // LastMod. Cinema?
                "K9",
                "K0",
                "K1",
                "K3",
                "K2",
                ];
            var r = [];
            // has nc => remove dt
            if ((m & 512) == 512)
                m = m & ~64;
            // has pf => remove sd
            if ((m & 16384) == 16384)
                m = m & ~32;
            modsString.forEach(function (v, idx) {
                var val = 1 << idx;
                if ((m & val) > 0)
                r.push(v);
            });
            if (r.length > 0) {
                return (noplus ? "" : "+ ") + r.join(", ");
            } else {
                return (noplus ? T('None') : '');
            }
            }

        },
        data: function(){
            return {
                    best_limit: 5,
                    isMounted: false,
                    token: this.$store.state.token,
                    id: this.$route.params.id,
                    backgroundURL: 'https://media.discordapp.net/attachments/704347465809133638/733412691288522812/20200711_222935.jpg',
                    haveBG: true,
                    bgStyle: '',
                    avatarURL: '',
                    mode: 0,
                    isRelax: false,
                    avatarStyle: '',
                    stats: {
                        id: 1,
                        username: 'Egg',
                        place: 0,
                        level: 1337,
                        playcount: 0,
                        pp: 0,
                        country: 'XX',
                        ss_ranks: 0,
                        s_ranks: 0,
                        a_ranks: 0,
                        replays_watched: 0,
                        ranked_score: 0,
                        total_score: 0,
                        total_hits: 0,
                        accuracy: 100.0
                    },
                scores: {
                        best: [],
                        recent: []
                }
            }
    },
        mounted: async function () {
            this.stats = await this.axios.get(`/frontend/api/v1/profile_info?u=${this.id}&mode=${this.mode}&r=${this.isRelax}`).then(r => r.data[0]).catch(e => this.$router.push({path: '/404'}));
            let scoresbest_tmp =  await this.axios.get(`/frontend/api/v1/user/best?u=${this.id}&m=${this.mode}&r=${this.isRelax}`).then(r => r.data);

            for(let i = 0; i < 5; i++){
                scoresbest_tmp[i].link = `/b/${scoresbest_tmp[i].beatmap_id}`;
                scoresbest_tmp[i].rankClasses = `rank-${scoresbest_tmp[i].rank} score--rank`;
                this.scores.best.push(scoresbest_tmp[i]);   
            }
            this.bgStyle = `z-index: 0; width: 100%; height: 300px; background-image: url("${this.backgroundURL}");`;
            this.avatarURL = `https://astellia.club/frontend/api/v1/avatar/${this.id}`;
            this.avatarStyle = `width: 64px; height: 64px; background-image: url(${this.avatarURL}); background-position: center; background-size: cover;`
            this.isMounted = true;
        }
    }
</script>

<style scoped>

    .profileBackground {
        filter: brightness(.4);

    }

    .infoBox {
        position: relative;
        display: flex;
        padding: 100px;
        justify-content: space-between;


    }

    .profileAvatar {
        padding: 70px;
        border-radius: 30px;
    }

    .infoUsername {
        font-size: 30px;
        margin-left: 5px;
    }

    .profileBox {
        background-color: #1F2036;
        width: 90%;
        height: auto;
        margin: 0 auto;
        padding-bottom: 50px;


    }

    .infoBoxUsernameCountry {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .scoreinfo {
	width: 600px;
	height: 50px;
	border: 2px;
	border-radius: 10px;
	background-color: #2F2C70;


}

.rankContainer {
	display: block;
	width: 40px;
	height: 30px;
}

.rankA {
	position: relative;
    left: 50%;
    top: 50%;
    height: 40px;
    transform: scale(1.5);
}
.rank-A {
    background-image: url(/static/ranks/A.svg?3);
}
.rank-B {
    background-image: url(/static/ranks/B.svg?3);
}
.rank-C {
    background-image: url(/static/ranks/C.svg?3);
}
.rank-D {
    background-image: url(/static/ranks/D.svg?3);
}
.rank-SHD {
    background-image: url(/static/ranks/SHD.svg?3);
}
.rank-S {
    background-image: url(/static/ranks/S.svg?3);
}
.rank-SSHD {
    background-image: url(/static/ranks/SSHD.svg?3);
}
.rank-SS {
    background-image: url(/static/ranks/SS.svg?3);
}
.score-rank {
    width: 2em;
    height: 1em;
    background-size: 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
    transform: scale(1.5);
}

.scoreleft {
    flex: 1;
    align-items: center;
    display: flex;
    min-width: 0;
    border-radius: 10px 0 0 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 0;
}

@media (min-width: 900px){
.play-detail__icon--main {
    display: block;
    height: 20px;
    width: 40px;
}
}

@media (min-width: 900px){
.score {
    display: flex;
    min-height: auto;
}
}

.score {
    border-radius: 10px;
    background-color: #2F2C70;
    line-height: normal;
    color: #fff;
    font-size: 12px;
    min-height: 60px;
    margin: 0 auto;
    margin-top: 2px;
    width: 850px;
}

.scoreBox {
    justify-content: space-between;
    display: block;
    background-color: #1F2036;
    min-width: auto;
    min-height: auto;
    align-content: center;
}

.score--rank {
    width: 128px;
    height: 64px;

    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(0.4);
}

.rank {
    font-size: 48px;
}
.score1 {
    display: inline-flex;
    flex: 1;
}

.score2 {
    width: 128;
    font-size: 24px;
    display: flex;
    background-color: #2F2C50;
}

.score2::before {
    content: "";
    width: 10px;
    height: 100%;

    left: 0;
    top: 0;
    background-color: #2F2C70;
    -webkit-clip-path: polygon(0 0,100% 50%,0 100%);
    clip-path: polygon(0 0,100% 50%,0 100%);

}

.beatmapscorelink {
    font-size: 18px;
    text-decoration: none;
    color: white;
    height: 25px;
    margin-top: 20px;
}

.beatmapscorelink:hover {
     text-decoration: none;
     color: white;
}

.acc {
    padding: 0 10px;
    height: 30px;
    margin-top: 20px;
    font-size: 20px;
}
.pp {
    height: 30px;
    margin-top: 20px;
    font-size: 20px;
    padding-right: 20px;
}


.score-button {
    outline: none;
    background-color: #5639AC;
    border: 1px solid #5639AC;
    color: white;
    margin-top: 15px;
    width: 156px;
    height: 40px;
    border-radius: 10px;
    transition: 0.2s;
}

.score-button:hover {
    background-color: #5639D5;
    border: 1px solid #5639D5;
}

.socreBoxTitle {
    font-size: 32px;
}
</style>