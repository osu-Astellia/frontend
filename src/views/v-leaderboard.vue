<template>
  <div class="Leaderboard">
    <center>
      <div class="container center">


        <div class="headers">
          <div class="bgImage"></div>
          <h1 class="bgText">Leaderboard</h1>

        </div>


        <div class="content">
          <div class="options">

            <div :class="classes.mod0" @click="setMode(0)"></div>
            <div :class="classes.mod1" @click="setMode(1)"></div>
            <div :class="classes.mod2" @click="setMode(2)"></div>
            <div :class="classes.mod3" @click="setMode(3)"></div>
            <div :class="classes.mod4" @click="setMode(4)"></div>
          </div>
          <table class="table">

            <tr>
              <th class="col">#</th>
              <th class="col"></th>
              <th class="col">Username</th>
              <th class="col">pp</th>

              <th class="col">Accuracy</th>
              <th class="col">Level</th>
            </tr>

            <tr class="table-last" :key=user v-for="user of this.leaderboard">
              <th class="col" style="font-weight: bold;">{{user.place}}</th>
              <th class="col"><img class="flag" :src="user.flag"></th>
              <th class="col"><router-link :to="user.url">{{user.username}}</router-link></th>
              <th class="col">{{user.pp}}</th>

              <th class="col">{{user.accuracy.toFixed(2)}}%</th>
              <th class="col">{{user.level}}</th>
            </tr>

          </table>

          <div class="paginator">
            <button v-if="an" @click="nextPage" class="button-back enabled"></button>
            <button v-if="nn" @click="prevPage" class="button-next enabled">></button>
          </div>

        </div>
      </div>
    </center>
  </div>
</template>
<script>
export default {
    name: 'Leaderboard',
    components: {},
  data(){
      return {
        filter: {
          mode: 0,
          p: 0,
          l: 50,
          relax: false
        },
        classes: {
          'mod0': 'mod0 activemod',
          'mod1': 'mod1 inactivemod',
          'mod2': 'mod2 inactivemod',
          'mod3': 'mod3 inactivemod',
          'mod4': 'mod4 inactivemod'
        },
        leaderboard: null,
        an: false,
        nn: false,

      }
  },
  methods: {
      async fetchLeaderboard(){
        this.leaderboard = await this.axios.get(`/frontend/api/v1/leaderboard?mode=${this.filter.mode}&p=${this.filter.p}&l=${this.filter.l}&relax=${this.filter.relax}`)

                .then(res => this.caluclatePlaces(res.data));

        if(this.leaderboard.length < this.filter.l - 1){
          this.nn = false
        }else{
          this.nn = true;
        }
        if(this.filter.p > 0){
          this.an = true;
        }else{
          this.an = false;
        }

      },
    nextPage(){
        this.filter.p++;
        this.fetchLeaderboard();
    },
    prevPage(){

      this.filter.p--;
      this.fetchLeaderboard();
    },

    setMode(mode){
      this.filter.relax = mode == 4 ? true : false;
      this.filter.mode = this.filter.relax ? 0 : mode;
        for(const entry of Object.entries(this.classes)){
          if(entry[1].split(' ')[1] === 'activemod'){
            this.classes[entry[0]]= this.classes[entry[0]].replace('activemod', 'inactivemod');
          }
        }
        this.classes[`mod${mode}`] = `mod${mode} activemod`
        this.fetchLeaderboard();
    },

    caluclatePlaces(res){
       var p = this.filter.p === 1? 1 : this.filter.p * this.filter.l -1;
       p++;
        for(const i in res){
          p++;
          if(res[i].id > 1000){
            res[i]['place'] = p;
            res[i]['flag'] = `https://osu.gatari.pw/static/images/flags/${res[i].country}.png`;
            res[i]['url'] = `/u/${res[i].id}`;
          };

        }

        return res;
    }
  },
  async mounted(){
      await this.fetchLeaderboard();
  },
  watch: {
      'filter.relax'(val, oldval){
        this.fetchLeaderboard();
      }
  }

}
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,500;1,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap%27');
  @import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');
  table {
    color: white;
    width: 75%;
    border-collapse: collapse;
    color: white;
    margin: 0 auto;
    font-size: 0.9em;
    min-width: 500px;
  }

  .container {
    padding: 30px;
  }

  td {
    height: 30px;
    text-align: center;
  }


  tr.table-last{
    border-bottom: 2px solid #2F2C54;
    border-top: 2px solid #2F2C54;
    border-radius: 10px;
    height: 10px !important;
    background-color: #2F2C7D !important;
  }

  tr.table-last > td:first-child {

    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;


  }

  tr.table-last > td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  tr.table-last > th:first-child {
    height: 20px;

  }


  .paginator {
    justify-content: space-between;
    height: 100px;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    margin-top: 50px;
    font-size: 25px;
    text-align: center;
    font-family: 'Noto Sans', sans-serif;
  }

  .button-back {
    height: 25px;
    background-color: #343D46;
    top: 50%;
    border: 2px solid #FFFFFF;
    border-radius: 5px;
    width: 70px;
    margin-left: 100px;
    font-size: 15px;
    transition: 0.4s;
  }


  .button-next {
    text-align: center;
    height: 25px;
    background-color: #343D46;
    top: 50%;
    border: 2px solid #FFFFFF;
    border-radius: 5px;
    width: 70px;
    font-size: 15px;
    margin-right: 100px;
    transition: 0.4s;

  }

  /*
  mods
  */

  .options {
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    background-color: #2F2C54;
    width: 1000px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 100px;
    display: inline-flex;
  }

  .mod0 {
    width: 64px !important;
    height: 64px !important;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osustd.png);
  }

  .activemod {
    margin: 10px;
    filter: brightness(1);
  }

  .inactivemod {
    margin: 10px;
    filter: brightness(0.60);
    transition: 0.3s;
  }

  .inactivemod:hover {
    filter: brightness(0.90);
  }



  .mod1 {
    width: 64px !important;
    height: 64px !important;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osutaiko.png);
  }

  .mod2 {
    width: 64px !important;
    height: 64px !important;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osuctb.png);
  }

  .mod3 {
    width: 64px !important;
    height: 64px !important;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osumaniapng.png);
  }
  .headers {
    position: relative;
    display: inline-flex;
    z-index: -1;

  }
  * {
    box-sizing: border-box;
  }
  .bgImage {
    position: relative;
    z-index: 0;
    height: 250px;
    width: 1000px;
    background-image: url(/static/img/lbheader.jpg);
    background-size: 1000px 250px;
    background-repeat: no-repeat;
    filter: blur(8px);
  }

  .bgText {
    font-family: 'Varela Round', sans-serif;
    width: 100%;
    font-size: 50px;
    filter: none;
    position: absolute;
    top: 50%;
    z-index: 1;

  }

  * {
    color: white;
    margin: 0px;
  }
  table {
    font-family: 'Cabin', sans-serif;
  }
  th.col {

    width: 10px;
    height: 20px;
    border-color: purple;
    background-color: #2F2C54;
  }

  .table {
    width: 80%;
  }

  .table th, .table td {
    padding: 2px !important;

  }


  .content {
    background-color: #2F2C54;
    width: 1000px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

  }



  a {
    text-decoration: none;
  }



  .enabled:hover {
    background-color: white;
    color: #000000;
    border-color: #2F2C54;
  }

  .flag {
    height: 16px;
  }


  a:hover {
    text-decoration: none !important;
    color: #838e98;

  }

  a {
    transition: 0.4s;

  }
  * {
    font-weight: normal;
  }


  .me {
    color: gold;
  }
  .mod4 {
    width: 64px !important;
    height: 64px !important;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osurx.png);
  }

</style>