<template>
  <div class="Leaderboard">
    <center>
      <div class="container center">


        <div class="headers">
          <div class="bgImage"></div>
          <h1 class="bgText"><label class="pink-lb">L</label>eaderboar<label class="blue-lb">d</label></h1>

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
              <th class="col"></th>
              <th class="col"></th>
              <th class="col">Username</th>
              <th class="col">Perfomance</th>

              <th class="col">Accuracy</th>
              <th class="col">Level</th>
            </tr>

            <tr class="table-last"  v-for="(user, index) of this.leaderboard" :key=index>
              
              
              <th  :class="`col place lines index__${user.place}`" style="font-weight: bold;">{{user.place}}</th>
              <th  class="col lines"><img class="flag" :src="user.flag"></th>
              <th  class="col lines"><router-link :to="user.url">{{user.username}}</router-link></th>
              <th  class="col lines">{{user.performance}}</th>

              <th class="col lines">{{(user.accuracy * 100).toFixed(2)}}%</th>
              <th class="col level lines">{{user.level}}</th>
            </tr>

          </table>

          <div class="paginator" :style="nn && !an ? `flex-direction: column; align-items: flex-end`: ``">
            <button v-if="an" @click="prevPage" class="button-back enabled"> < </button>
            <button v-if="nn" @click="nextPage" class="button-next enabled">></button>
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
          p: 1,
          l: 51,
          relax: false,
          startat: 1
        },
        classes: {
          'mod0': 'mod0 activemod',
          'mod1': 'mod1 inactivemod',
          'mod2': 'mod2 inactivemod',
          'mod3': 'mod3 inactivemod',
          'mod4': 'mod4 inactivemod',
          buttons: {
            'p': 'button-back enabled',
            'n': 'button-next enabled'
          }
        },
        leaderboard: null,
        an: false,
        nn: false,

      }
  },
  methods: {
      async fetchLeaderboard(){
        this.nn = false;
        this.an = false;
        this.leaderboard = [];
        this.classes.buttons.p = this.classes.buttons.p.replace('enabled', 'hidden')

        this.leaderboard = await this.axios.get(`/api/leaderboard?mode=${this.filter.mode}&p=${this.filter.p}&l=${this.filter.l}&relax=${this.filter.relax}&country=`)

                .then(res => this.caluclatePlaces(res.data));

        if(this.leaderboard.length < this.filter.l - 2){
          this.classes.buttons.n = this.classes.buttons.n.replace('hidden', 'enabled')
          this.nn = false;
        }else{
          this.classes.buttons.n = this.classes.buttons.p.replace('enabled', 'hidden')
          this.nn = true;
        }
        if(this.filter.p > 1){
          this.an = true;
          this.classes.buttons.n = this.classes.buttons.n.replace('hidden', 'enabled')
        }else{
          this.an = false;
          this.classes.buttons.n = this.classes.buttons.n.replace('enabled', 'hidden')
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
      this.filter.p = 1;
      this.filter.relax = mode === 4;
      this.filter.mode = this.filter.relax ? 0 : mode;
        for(const entry of Object.entries(this.classes)){

          if(typeof entry[1].split !== 'undefined' && entry[1].split(' ')[1] === 'activemod'){
            this.classes[entry[0]]= this.classes[entry[0]].replace('activemod', 'inactivemod');
          }
        }
        this.classes[`mod${mode}`] = `mod${mode} activemod`
        this.fetchLeaderboard();
    },

    caluclatePlaces(res){
        res = res.filter(u => u.id !== 999);
        let p = this.filter.p === 1 ? 0 : this.filter.p * this.filter.l;

        res = res.map((res, index) => {
         
  
            res.place = (this.filter.p == 1 ? 0 : this.filter.l * (this.filter.p > 2 ? this.filter.p : 1)) + (index + 1) ;
            res.flag = `https://osu.gatari.pw/static/images/flags/${res.country}.png`;
            res.url = `/u/${res.id}${this.filter.mode < 4 && !this.filter.relax ? `?mode=${this.filter.mode}` : '?relax=true'}`;
            return res;

        })

        res[res.length - 1].place = 0;

        return res.filter(u => u.place !== 0);
    }
  },
  async mounted(){
      await this.fetchLeaderboard();
  },
  watch: {
      'filter.relax'(val, oldval){
        this.fetchLeaderboard();
      }
  },
  metaInfo: {
      title: 'Leaderboard'
  }
//bruh
}
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,500;1,500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap%27');
  @import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Arvo&display=swap');



  @media only screen and (max-width: 900px) {
    	table, thead, tbody, th, td, tr { 
        display: block; 
      }


    table {
      width: auto !important;
      margin: 0 !important;
      font-size: 16px;
      min-width: auto !important;
      
    }

    .col {
      margin: 0 auto !important;
    }
    th.lines {
      background: none !important;
    }

    .content {
      width: 100% !important;
    }
    .options {
      width: 100% !important;
    }

    .mod0 {
      width: 32px !important;
      height: 32px !important;
    }
    .mod1 {
      width: 32px !important;
      height: 32px !important;
    }
    
    .mod2 {
      width: 32px !important;
      height: 32px !important;
    }
    .mod3 {
      width: 32px !important;
      height: 32px !important;
    }
    .mod4 {
      width: 32px !important;
      height: 32px !important;
    }
    .bgImage {
      width: 100% !important;
    }
	td:before { 

		position: absolute;
	
		top: 6px;
		left: 6px;
		width: 45%; 
		padding-right: 10px; 
		white-space: nowrap;
	}
    .container {
      padding: 0 !important;
    }
    .bgText {
      font-size: 300% !important;
    }

    tr {
      width: 100%;
    }

    tr.table-last {
      background: none !important;
      border: 2px solid white;
    }
      #app > div.Leaderboard.view > center > div > div.content > table > tr:nth-child(1) > th:nth-child(1) {
    display: none;
  }
  #app > div.Leaderboard.view > center > div > div.content > table > tr:nth-child(1) > th:nth-child(2) {
    display: none;
  }
  }
  table {
    color: white;
    width: 75%;
    border-collapse: collapse;
    margin: 0 auto;
    font-size: 0.9em;
    min-width: 500px;
  }

  tr.table-last {
    height: auto !important;
  }

  th.place {
    background: #302E63 !important;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }


  


  @font-face {
    font-family: 'geoma_regular_demoregular';
    src: url('/static/fonts/geoma-demo.regular-demo-webfont.woff2') format('woff2'),
    url('/static/fonts/geoma-demo.regular-demo-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;

  }


  td {
    height: 30px;
    text-align: center;
  }


  tr.table-last {
    border-bottom: 2px solid #2F2C54;
    border-top: 2px solid #2F2C54;
    border-radius: 10px;
    height: 10px;
    padding-top: 2px;
    background-color: #2F2C7D;
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
    transition: 0.4s;
    margin-right: 150px;

  }

  /*
  mods
  */

  .options {
    justify-content: center;
    align-items: center;
    background-color: #2F2C54;
    width: 1000px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 100px;
    display: inline-flex;
  }

  .mod0 {
    width: 48px;
    height: 48px;
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
    width: 48px;
    height: 48px;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osutaiko.png);
  }

  .mod2 {
    width: 48px ;
    height: 48px;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osuctb.png);
  }

  .mod3 {
    width: 48px;
    height: 48px;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osumaniapng.png);
  }
  .headers {
    position: relative;

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
    background-image: url(/static/img/lbheader.png);
    background-size: 1000px 250px;
    background-repeat: no-repeat;
  }

  .bgText {
    font-family: 'geoma_regular_demoregular';
    width: 100%;
    font-size: 60px;
    filter: none;
    position: absolute;
    top: 40%;
    z-index: 1;

  }

  th.level {
    border-bottom-right-radius: 7px;
    border-top-right-radius: 7px;
  }

  * {
    color: white;
    margin: 0px;
  }
  table {
    font-family: 'Cabin', sans-serif;
  }
  th.col {

    width: 12px;
    height: 20px;
    border-color: transparent;
    text-align: center;
  }

  th.lines {
    background-color: #302E55;
  }



  .table {
    width: 90%;
  }

  .table th, .table td {
    padding: 5px !important;
      text-align: center;

  }


  .content {
    background-color: #2F2C54;
    width: 1000px;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;

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
    margin-left: -10px;
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
    width: 48px;
    height: 48px;
    z-index: 10;
    background-size: cover;
    background-image: url(/static/img/osurx.png);
  }

  .hidden {
    visibility: hidden;
  }

  .pink-lb {
    color: #FF8CAC;
  }

  .blue-lb {
    color: #8CE3FF;
  }

  .index__1 {
    color: gold;
  }

  .index__2 {
    color: silver;
  }

  .index__3 {
    color: brown;
  }
</style>