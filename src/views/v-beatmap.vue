<template>
  <div class="beatmap" v-if="isMounted">
      <div class="beatmapBG" :style="bgStyle"></div>

      <div class="beatmapInfo">
          <div class="bmInfo">
              <div class="beatmapTitle">
                  {{ beatmap.name }}  [ {{ beatmap.diff }} ]
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
              <a class="aquaButton btn"  v-b-modal.rankBeatmap @click.prevent="rankBeatmap" v-if="isNominator" href="#">Rank Beatmap</a><br>
              <b-form-select class="selectDiff" style="width: auto; min-width: 1px; margin-right: 40px;" v-model="beatmap.diff" :options="Object.values(diffs)"></b-form-select>
          </div>

      </div>


      <b-modal id="rankBeatmap" title="Rank beatmap" @ok="rankBeatmap">

          <b-form-group label="Beatmap ID">
              <b-form-input id="BeatmapID" v-model="beatmap.beatmapID" required name="Beatnamp ID"></b-form-input>
          </b-form-group>

          <b-form-group label="is set?">
              <b-form-checkbox id="isSetCheck" v-model="bn.isSet" name="is set?"></b-form-checkbox>
          </b-form-group>

          <b-form-group label="diffs" v-if="!bn.isSet">

              <b-form-checkbox
                               v-for="diffname of Object.entries(diffs)"
                               @change="selBeatmapID(diffname[0])"
                               :key="diffname[0]"
              > {{ diffname[1] }}</b-form-checkbox>

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
                diff: 'testing',
                downloadURL: `/d/`,
                osuURL: 'osu://b/',
                AR: 8,
                OD: 1,
                HP: 1,
                CS: 1,
                time: moment.duration(60, 'seconds').humanize(),
                bpm: 180,
                stars: 7.08
            },
            diffs: {
                1: 'a',
                2: 's',
                3: 'b',
                1216297: 'testing'
            },

            isNominator: false,
            isMounted: true,
            bn: {
                isSet: false,
                diffsToRank: {},
                state: 'ranked',
                rankedStates: ['ranked', 'loved', 'unranked']
            },
            bgStyle: ''
        }
    },

    methods: {
        changeBM(){

            //console.log(Object.entries(this.diffs).find(e => this.diff === e[1])[0])
        },
        rankBeatmap(){
            fetch('/frontend/api/v1/beatmaps/rank', {
                method: 'POST',
                body: JSON.stringify({
                    setID: this.beatmap.beatmapSetID,
                    beatmapID: this.beatmapID,
                    isSet: this.bn.isSet,
                    diffs: Object.keys(this.bn.diffsToRank),
                    status: this.bn.state
                }),
                headers: {
                    'Authorization': this.$store.state.token
                }
            }).then(e => {
                alert('OK')
            }).catch(e => {
                alert('Can\'t rank beatmap, check console for more information');
                console.log(e)
            })

        },
        selBeatmapID(beatmapID){
            console.log(this.bn.diffsToRank)
            if(this.bn.diffsToRank[beatmapID]) delete this.bn.diffsToRank[beatmapID]
            else this.bn.diffsToRank[beatmapID] = this.diffs[beatmapID]
        }
    },

    async mounted() {



        this.bgStyle = `background-image: url("https://assets.ppy.sh/beatmaps/${this.beatmap.beatmapSetID}/covers/cover@2x.jpg")`;
        this.beatmap.downloadURL = `/d/${this.beatmap.beatmapID}`;
        this.beatmap.osuURL = `osu://b/${this.beatmap.beatmapID}`;
        if(this.$store.state.token){
            let r = await fetch('/frontend/api/user/@me', {
                headers: {
                    'Authorization': this.$store.state.token
                }
            }).then(res => res.json());

            if(!r[0]) return;

            if((r[0].privileges & ( 2 << 7)) > 0) this.isNominator = true;
        }

    },

    watch: {
        'beatmap.diff'(val){

             this.$router.push({path: `/b/${Object.entries(this.diffs).find(e => val === e[1])[0]}`})
        }
    }

}
</script>

<style scoped>


    .beatmapTitle {
        position: absolute;
        margin-top: 30px;
        margin-left: 15px;
        font-size: 48px;
    }

    .beatmapMapper {
        position: absolute;
        margin-top: 100px;
        margin-left: 15px;
        font-size: 24px;
    }
    .beatmapInfo {
        width: 70%;
        min-height: 300px;
        background: #282C34;
        height: auto;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .beatmapBG {
        width: 70%;
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