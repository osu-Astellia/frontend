<template>

    <div class="profile" v-if="isMounted">
        <div class="profile__container">
            <img class="" src='https://worldofmeat.ru/wp-content/uploads/2020/01/barred_rock_laying_hen.jpg' alt="">
        </div>
    </div>
    
</template>

<script>
    import VFlag from "@/components/v-flag";
    import VStatsbox from "@/components/v-statsbox";
    import VScorebox from "@/components/v-scorebox";
    import VRank from "@/components/v-rank";
    import VStat from "@/components/v-stat";
    import VPpchart from "../components/v-ppchart";
    import moment from 'moment';
    import bbCodeParser from 'js-bbcode-parser';
    import editIcon from 'vue-material-design-icons/Pencil';
    import VScoreTooltip from '../components/v-score-tooltip.vue';

    export default {
        name: "v-profile",
        components: {VPpchart, VStat, VRank, VScorebox, VStatsbox, VFlag, editIcon, VScoreTooltip},

        data(){
            return {
                classes: {
                    'mod0': 'mod0 activemod',
                    'mod1': 'mod1 inactivemod',
                    'mod2': 'mod2 inactivemod',
                    'mod3': 'mod3 inactivemod',
                    'mod4': 'mod4 inactivemod'
                },
                best_limit: 5,
                isMounted: false,
                moreLoading: true,
                token: this.$store.state.token,
                id: this.$route.params.id,
                backgroundURL: 'https://media.discordapp.net/attachments/704347465809133638/733412691288522812/20200711_222935.jpg',
                haveBG: false,
                bgStyle: '',
                avatarURL: '',
                joined: '',
                isMe: false,

                mode:  0,
                isRelax: false,
                chartLoaded: false,
                ppHistory: [],
                parsedUserpage: '',
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
                    accuracy: 100.0,
                    account_created_at: 1,

                },
                scores: {
                    best: [],
                    recent: []
                },
                verified_type: 0,
                verifyed_types_str: [],
                isSupporter: false
            }
        },
        methods: {
            async load_scores(){

                this.scores.best = [];
                this.moreLoading = true;
                this.best_limit += 5;
                let scoresbest_tmp =  await this.axios.get(`https://astellia.club/frontend/api/v1/user/best?u=${this.id}&m=${this.mode}&r=${this.isRelax}`).then(r => r.data).catch(e => alert(e.message));
                scoresbest_tmp = scoresbest_tmp.filter(score => score.pp > 0);
                
                for(let i = 0; i < this.best_limit; i++){
                    let item = scoresbest_tmp[i];
                if(!item) return;
                item.link = `/b/${item.beatmap_id}`;
                item.beatmap_title_full = `${item.beatmap_title} was set ${moment(new Date(Date.parse(item.timestamp))).fromNow()}`
                item.beatmap_title_full += `\n`
                    try {
                        item.beatmap_title = `${item.beatmap_title.split(' - ')[0]} - ${item.beatmap_title.split(' - ')[1].length > 16 ? item.beatmap_title.split(' - ')[1].slice(0, 17) + '...' : item.beatmap_title.split(' - ')[1]}`
                    }catch(e){

                    }
                item.rankClasses = `rank-${item.rank} score--rank`;
                this.scores.best.push(item);
                this.moreLoading = false;
            }},

            async setVerifiedType(){
                const verified_types = {
                    osu: 1 << 4,
                    taiko: 2 << 4,
                    ctb: 4 << 4,
                    mania: 8 << 4,
                    rx: 16 << 4
                }

                let getMode = (type) => {
                    let r = ''
                    switch(type) {
                        case 16:
                            r = {
                                name: 'osu!',
                                mode: 0,
                                url: `/static/osustd.png`
                            };
                            break;
                        case 32:
                            r = {
                                name: 'osu!taiko',
                                mode: 1,
                                url: `/static/osutaiko.png`
                            };
                            break;
                        case 64:
                            r = {
                                name: 'osu!ctb',
                                mode: 2,
                                url: `/static/osuctb.png`
                            };
                            break;
                        case 128:
                            r = {
                                name: 'osu!mania',
                                mode: 3,
                                url: `/static/osumaniapng.png`
                            };
                            break;
                        case 256:
                            r = {
                                name: 'osu!relax',
                                mode: 4,
                                url: `/static/img/osurx.png`
                            };
                            break;
                        default:
                            r = {
                                name: 'unknown',
                                mode: 0,
                                url: `/static/osustd.png`
                            };
                            break;
                    }

                    return r;
                }

                Object.entries(verified_types).forEach(type => {
                    if((this.verified_type & type[1]) > 0) {
                        this.verifyed_types_str.push({
                            tooltip: `Verified ${getMode(type[1]).name} Player`,
                            mode: getMode(type[1]).mode,
                            badgeURL: getMode(type[1]).url
                        })
                    }
                })
            },
            
            
            async changeRelax(){
                this.scores.best = [];
                await this.load_scores();
                this.best_limit = 5;
                await this.setPPHistory();
                this.stats = await this.axios.get(`https://astellia.club/frontend/api/v1/profile_info?u=${this.id}&mode=${this.mode}&r=${this.isRelax}`).then(r => r.data[0]).catch(e => this.$router.push({path: '/404'}));
            },

            async setPPHistory(){
                this.chartLoaded = false;
                this.ppHistory = await fetch(`https://astellia.club/frontend/api/v1/user/pp_graph?id=${this.id}&r=${this.isRelax}`).then(res => res.json());
                this.ppHistory = this.ppHistory.result.filter(score => this.isRelax ? score.is_relax : !score.is_relax);
                this.chartLoaded = true;
            },



            async setMode(mode){
                this.isRelax = mode === 4
                
                this.mode = this.isRelax ? 0 : mode;
            for(const entry of Object.entries(this.classes)){
                if(entry[1].split(' ')[1] === 'activemod'){
                    this.classes[entry[0]]= this.classes[entry[0]].replace('activemod', 'inactivemod');
                }
            }
                this.classes[`mod${mode}`] = `mod${mode} activemod`
                
                this.scores.best = [];
                await this.load_scores();
                this.best_limit = 5;
                this.stats = await this.axios.get(`https://astellia.club/frontend/api/v1/profile_info?u=${this.id}&m=${this.mode}&r=${this.isRelax}`).then(r => r.data[0]).catch(e => this.$router.push({path: '/404'}));
                await this.setPPHistory();
            },
            getScoreMods(m, noplus) {
                let modsString = ["NF","EZ","NV","HD","HR","SD","DT","RX","HT","NC","FL","AU","SO","AP","PF","K4","K5","K6","K7","K8","K9","RN","LM","K9", "K0", "K1", "K3", "K2",];
                let r = [];
                // has nc => remove dt
                if ((m & 512) === 512)
                    m = m & ~64;
                // has pf => remove sd
                if ((m & 16384) === 16384)
                    m = m & ~32;
                modsString.forEach(function (v, idx) {
                    let val = 1 << idx;
                    if ((m & val) > 0)
                    r.push(v);
                });
                if (r.length > 0) {
                    return (noplus ? "" : "+ ") + r.join(", ");
                } else {
                    return '';
                }
            },

            async getID(){
                const { result } = await fetch(`/frontend/api/v1/users/whatid?u=${this.id}`).then(res => res.json()).catch(e => {this.$router.push({path: '/404'})})
                if(!parseInt(result)) return this.$router.push({path: '/404'})
                window.location.href = `/u/${result}`;
            }

        },

        mounted: async function () {
            if(!parseInt(this.id)) return await this.getID();
            this.stats = await this.axios.get(`https://astellia.club/frontend/api/v1/profile_info?u=${this.id}&m=${this.mode}&r=${this.isRelax}`).then(r => {
             
                if(r.data.constructor.name !== 'Array') {
                    this.$router.push({path: '/404'});
                }else {
                    return r.data[0];
                }
            }).catch(e => this.$router.push({path: '/404'}));



            if(this.$store.state.token){
                let myProfile = await fetch('/frontend/api/v1/user/@me', {
                    headers: {
                        'Authorization': this.$store.state.token
                    }
                }).then(res => res.json().catch(e => {}));
                if(!myProfile) myProfile = [{id: 0}];
                let id = myProfile[0].id;
                if(parseInt(this.id) === id) this.isMe = true;
            }


            this.isSupporter = (this.stats.is_supporter) > (Date.now() / 1000);

            this.bgStyle = `z-index: 0; width: 100%; height: 300px; background-image: url("${this.backgroundURL}");`;
            this.avatarURL = `https://astellia.club/frontend/api/v1/avatar/${this.id}`;
            this.avatarStyle = `width: 64px; height: 64px; background-image: url(${this.avatarURL}); background-position: center; background-size: cover;`
            this.isMounted = true;
            this.haveBG = this.isSupporter && this.stats.bg ? true : false
            this.verified_type = this.stats.verification_type;
            this.setVerifiedType();
            await this.load_scores();
            if(this.$route.query.relax === 'true') await this.setMode(4);
            else await this.setMode(this.$route.query.mode || 0);
            this.joined = moment(new Date(this.stats.account_created_at * 1000)).fromNow();
            this.parsedUserpage = bbCodeParser.parse(this.stats.userpage_content);
            this.moreLoading = false;
            
            this.$meta().addApp('custom').set({
                title: `${this.stats.username}\`s Profile - Astellia`
            })



        },
        metaInfo: {
            title: 'Profile'
        }
    }
</script>

<style scoped>
    .profile__container {
        margin: 0 auto;
        width: 80%;
        height: 100px;
        background: #21263E;
        margin-bottom: 400px;
    }
</style>