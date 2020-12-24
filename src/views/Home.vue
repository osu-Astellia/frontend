<template>
  <div class="home">
    <div class="content">
      <div class="image"></div>


      <div class="serverText">
        <div class="bigText">
          Astellia
        </div>
        <div class="description cent">
          Astellia - a unique server with its own website, an active development team that adds new features and fixes bugs.
        </div>


        <div class="buttongroup">
          <button v-b-modal.registerModal>Register</button>
          <a class="link download" href="https://github.com/MinisBett/ultimate-osu-server-switcher/releases/download/1.4/UltimateOsuServerSwitcher.exe">Download Switcher</a>
        </div>


      </div>
    </div>


    <div class="bestScores">
      <div v-if="vanillaScore"  class="bestScore"></div>
      <div v-if="relaxScore" class="bestScore"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'Home',
  ...mapGetters([
    'getUser'
  ]),
  ...mapActions(['getUser']),
  components: {

  },
  data(){
    return {

      relaxScore: undefined,
      vanillaScore: undefined

    }
  },

  methods: {
    async loadScores() {
      this.relaxScore = await this.axios.get('/astellia/api/get_top_play?s=1').then(res => res.data);
      this.relaxScore.bg = `https://assets.ppy.sh/beatmaps/${this.relaxScore.BeatmapSetId}/covers/card.jpg`;
      this.relaxScore.bgStyle = `background-image: url(${this.relaxScore.bg}); z-index: 1;`
      this.relaxScore.avatarStyle = this.generateAvatarCss(this.relaxScore.UserId);


      this.vanillaScore = await this.axios.get('/astellia/api/get_top_play?s=0').then(res => res.data);
      this.vanillaScore.bg = `https://assets.ppy.sh/beatmaps/${this.vanillaScore.BeatmapSetId}/covers/card.jpg`;
      this.vanillaScore.bgStyle = `background-image: url(${this.vanillaScore.bg})`
      this.vanillaScore.avatarStyle = this.generateAvatarCss(this.vanillaScore.UserId);

    },

    generateAvatarCss(id){
      return`margin: 10px; background-size: cover; background-image: url(frontend/api/v1/avatar/${id}); border-radius: 20px; width: 48px; height: 48px; z-index: 2;`
    }
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Krona+One&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap');

  .download {
    width: 250px !important;
    background-color: #9B7A9B !important;
    transition: 0.4s !important;
  }

  .download:hover {
    background-color: #745B6B !important;
  }
  .home {
    text-align: center;
  }

  .scoreinfo {
      transform: translate(-50%, -50%);
  }
  .username {
      font-family: 'Comfortaa', cursive;
  }
  .bgImage {
    height: 186px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

  }
  .bestScores {
    width: 90%;
    height: auto;
    display: inline-flex;
  }

  .bestScore:first-child {
    margin-right: auto;
  }
  .bestScore:last-child {
    margin-left: auto;
  }
  .buttongroup {
    margin-top: 15px;
    display: inline-flex;
  }

  .MapBg {
    z-index: 0;
    border-radius: 20px;
    width: 100%;
  }

  .link {
    background-color: #46297C;
    border: 1px solid #46298E;
    color: white;
    width: 150px;
    height: 50px;
    text-align: center;
    line-height: 2.9;
    margin: 0 20px;
    border-radius: 10px;
    text-decoration: none !important;
    transition: .4s;
  }

  .link:hover {
    background-color: #25293E;
    border: 1px solid #25293E;
  }

  button {
    background-color: #46297C;
    border: 1px solid #46298E;
    color: white;
    border-radius: 10px;
    width: 120px;
    height: 50px;
    transition: .4s;
    text-align: center;
  }

  .download {
    display: none;
  }

  button:hover {
    background-color: #25293E;
    border: 1px solid #25293E;
  }
  .content {
    text-align: center !important;
    width: 90%;
    height: 400px;
    background-color: #222533;
    display: inline-flex;
    margin: 25px auto;
    border-radius: 30px;
    font-family: 'Comfortaa', cursive;

  }

  .cent {
    margin: 0 auto;
  }
  .description {
    width: 90%;
  }

  .bigText {
    margin-left: 0;
    font-size: 35px;
    font-family: 'Krona One', sans-serif;

  }

  .serverText {
    margin: 50px auto;
  }


  @media only screen and (min-width: 900px) {



    .image {
      background-image: url("/imgs/nekoha.png");
      width: 500px;
      height: 400px;
      background-size: cover;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .bigText {
      font-size: 60px;
      font-family: 'Krona One', sans-serif;
    }

    .description {
      font-size: 20px;
    }

    

  }
</style>