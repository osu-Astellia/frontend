<template>
  <div class="beatmap" v-if="isMounted">
      <div class="beatmapBG" :style="bgStyle"></div>

      <div class="beatmapInfo">
          <div class="bmInfo">
              <div class="beatmapTitle">
                  {{ beatmap.name }}  [ {{ beatmap.diff.name }} ]
              </div>
              <div class="beatmapMapper">
                  Mapped by {{ beatmap.mapper }}
              </div>

              <v-beatmap-statsbox class="stat-box"
                      :a-r="beatmap.AR"
                      :o-d="beatmap.OD"
                      :b-p-m="beatmap.bpm"
                      :c-s="beatmap.CS"
                      :h-p="beatmap.HP"
                      :length="beatmap.time"
                      :stars="beatmap.stars"

              ></v-beatmap-statsbox>
          </div>

          <div class="actions">

              <a class="greenButton btn" :href="beatmap.downloadURL">Download Beatmap</a><br>
              <a class="pinkButton btn" :href="beatmap.osuURL">osu!direct</a><br>
              <select class="selectDiff" style="width: auto; min-width: 20px; margin-right: 50px; margin-top: 10px;" @change="changeBM" v-model="beatmap.diff.link" >
                  <option  v-for="(diff, index) of diffs" :key="index" :value="diff.link"><router-link :to="diff.link">{{ diff.name }}</router-link></option>
              </select><br>
              <a class="aquaButton btn"  v-b-modal.rankBeatmap v-if="isNominator" href="#">Rank Beatmap</a>

          </div>

      </div>


      <b-modal id="rankBeatmap" title="Rank beatmap" @ok="rankBeatmap">

          <b-form-group label="Beatmap ID">
              <b-form-input id="BeatmapID" v-model="bn.beatmapID" required name="Beatnamp ID"> {{ beatmap.beatmapID }}</b-form-input>
          </b-form-group>

          <b-form-group label="is set?">
              <b-form-checkbox id="isSetCheck" v-model="bn.isSet" name="is set?"></b-form-checkbox>
          </b-form-group>

          <b-form-group label="diffs" v-if="!bn.isSet">

              <b-form-checkbox
                               v-for="(diffname, index) of Object.entries(diffs)"
                               @change="selBeatmapID(diffname[0])"
                               :key="index"
              > {{ diffname[1].name }}</b-form-checkbox>

          </b-form-group>

          <b-form-group label="Status">
              <b-form-select
                      v-model="bn.state"
              :options="bn.rankedStates"
              >

              </b-form-select>
          </b-form-group>
      </b-modal>
  </div>
</template>

<script>
import VBeatmapStatsbox from "../components/v-beatmap-statsbox";
import moment from 'moment';
export default {
    name: 'v-beatmap',
    components: {VBeatmapStatsbox},
    data(){
        return {
            beatmap: {
                beatmapID: this.$route.params.id,
                beatmapSetID: 574273,
                mapper: 'Alumetri',
                name: 'agga - gawgawg',
                diff: {
                    link: '/b/13124124'
                },
                downloadURL: `/d/`,
                osuURL: 'osu://b/',
                AR: 8,
                OD: 1,
                HP: 1,
                CS: 1,
                time: moment.duration(60, 'seconds').humanize(),
                bpm: 180,
                stars: 7.08,
            },
            diffs: {
                1: 'a',
                2: 's',
                3: 'b',
                1216297: 'testing'
            },

            isNominator: false,
            isMounted: false,
            bn: {
                beatmapID: 0,
                isSet: false,
                diffsToRank: {},
                state: 'ranked',
                rankedStates: ['ranked', 'loved', 'unranked']
            },
            bgStyle: ''
        }
    },

    methods: {
        fancyTimeFormat(duration)
        {
            // Hours, minutes and seconds
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;

            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";

            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },
        changeBM(){

            if(!this.isMounted) return;
            console.log('a')
            this.loadMap(Object.values(this.diffs).find(s => s.link === this.beatmap.diff.link).id);
            //console.log(Object.entries(this.diffs).find(e => this.diff === e[1])[0])
        },
        rankBeatmap(){
            fetch('/frontend/api/v1/beatmaps/rank', {
                method: 'POST',
                body: JSON.stringify({
                    set_id: this.beatmap.beatmapSetID,
                    beatmap_id: this.beatmap.beatmapID,
                    is_set: this.bn.isSet,
                    diffs: Object.keys(this.bn.diffsToRank),
                    status: this.bn.state
                }),
                headers: {
                    'Authorization': this.$store.state.token,
                    'Content-Type': 'application/json'
                }
            }).then(e => {
                alert('OK')
            }).catch(e => {
                alert('Can\'t rank beatmap, check console for more information');
                console.log(e)
            })

        },
        selBeatmapID(beatmapID){

            if(this.bn.diffsToRank[beatmapID]) delete this.bn.diffsToRank[beatmapID]
            else this.bn.diffsToRank[beatmapID] = this.diffs[beatmapID]
        },
        async loadMap(id){
            let data = await fetch(`https://astellia.club/frontend/api/v1/beatmaps/info?beatmapid=${id}`).then(res => res.json()).catch(e => {this.$router.push({path: '/404'})});

            if(!data) return this.$router.push({path: '/404'});

            this.diffs = {};

            data.diffs.forEach(diff => {

                this.diffs[diff.id] = {
                    id: diff.id,
                    link: `/b/${diff.id}`,
                    name: diff.difficulty_name
                };
            });
            this.beatmap = {

                mapper: data.mapper,
                name: data.name,
                AR: data.AR,
                OD: data.OD,
                HP: data.HP,
                CS: data.CS,
                time: this.fancyTimeFormat(data.time),
                bpm: data.bpm,
                stars: data.stars.toFixed(3),
                beatmapSetID: data.beatmapSetID,
                diff: this.diffs[data.beatmapID],
                diffname: this.diffs[data.beatmapID].name

            }

            this.bn.beatmapID = data.beatmapID;

            this.bgStyle = `background-image: url("https://assets.ppy.sh/beatmaps/${data.beatmapSetID}/covers/cover@2x.jpg")`;
            this.beatmap.downloadURL = `/d/${data.beatmapSetID}`;
            this.beatmap.osuURL = `osu://b/${data.beatmapID}`;
        }
    },

    async mounted() {

        await this.loadMap(this.$route.params.id);

        this.isMounted = true;

        if(this.$store.state.token){
            let r = await fetch('/frontend/api/v1/user/@me', {
                headers: {
                    'Authorization': this.$store.state.token
                }
            }).then(res => res.json());

            if(!r[0]) return;

            if((r[0].privileges & (2 << 7)) > 1) this.isNominator = true;
        }



    },


}
</script>

<style scoped>


    .beatmapTitle {
        position: absolute;
        margin-top: 30px;
        margin-left: 15px;
        font-size: 32px;
    }

    .beatmapMapper {
        position: absolute;
        margin-top: 100px;
        margin-left: 15px;
        font-size: 24px;
    }
    .beatmapInfo {
        width: auto;
        min-width: 70%;
        max-width: 100%;
        min-height: 300px;
        background: #282C34;
        height: auto;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .beatmapBG {
        width: 100%;
        height: 250px;
        margin: 0 auto;
        background-size: cover;
        filter: brightness(.5);
    }


    .greenButton {
        color: white;
        background-color: green;
        margin-right: 40px;
        margin-top: 100px;


    }

    .greenButton:hover {
        color: white;
        background: #005A00;
    }

    .pinkButton {
        color: white;
        background-color: purple;
        margin-right: 40px;
        margin-top: 10px;


    }

    .pinkButton:hover {
        color: white;
        background: #800058;
    }

    .aquaButton {
        color: white;
        background-color: #00B9FF;
        margin-right: 40px;
        margin-top: 10px;


    }

    .aquaButton:hover {
        color: white;
        background: #0082FF;
    }

    .stat-box {
        margin-top: 150px;
        margin-left: 15px;
    }




</style>