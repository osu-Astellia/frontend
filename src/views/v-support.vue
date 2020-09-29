<template>
  <div class="page">
    <div class="supporter__container">
      <div class="supporter__header">
        <div class="supporter__text">
          <h2>Purchase supporter</h2>
          <p v-if="supporterStatus.expires_at > Date.now() / 1000">
            You are supporter for {{ supporterStatus.expires_at_localizated }}
          </p>
        </div>
        <a id="to__purchase"
          ><button class="purchase__button">Purchase</button></a
        >
        <div class="supporter__img">
          <img src="/imgs/old.nekoha.png" height="400" />
        </div>
      </div>
    </div>
    <div class="supporter__container__info">
      <div class="supporter__row__container">
        <div class="row flex">
          <div class="col-3">
            <div class="square__number">1</div>
            <h4 class="bonus__title">Change your nickname</h4>
            <p class="bonus__body">
              You can change your nickname on our server
            </p>
          </div>
          <div class="col-3">
            <div class="square__number">2</div>
            <h4 class="bonus__title">Customazible line</h4>
            <p class="bonus__body">
              Customazible line bellow your badges and country
            </p>
          </div>
          <div class="col-3">
            <div class="square__number">3</div>
            <h4 class="bonus__title">Special role on our server!</h4>
            <p class="bonus__body">You can get special role on our server!</p>
          </div>
          <div class="col-3">
            <div class="square__number">4</div>
            <h4 class="bonus__title">and much more!</h4>
            <p class="bonus__body">
              check this page often to learn about new perks
            </p>
          </div>
        </div>
      </div>
      <div class="" id="">
        <h1 style="color: white; text-align: center">Purchase supporter</h1>
      </div>
      <div class="slider__container">
        <input
          type="range"
          v-model="months"
          min="1"
          max="12"
          value="1"
          class="slider"
          id="myRange"
          v-b-tooltip
          :title="`${months} monts for ${2 * months}$`"
        />
        <div class="text-center">
          <input
            class="input__nickname"
            type="text"
            v-model="gift.username"
            placeholder="Nickname(leave blank if not gift)"
          />
        </div>
        <div class="text-center">
          <form
            action="https://www.free-kassa.ru/merchant/cash.php"
            method="GET"
          >

            <input type="hidden" name="m" :value="generationResult.merchantId">
            <input type="hidden" name="oa" :value="`${190 & months}`">
            <input type="hidden" name="o" :value="generationResult.id">
            <input type="hidden" name="s" :value="generationResult.sign"> 
            <input type="hidden" name="us_userid" :value="gift.user">
            <button class="btn__pay" type="submit" v-if="enabled && token">Purchase</button>

            <button
              class="btn__pay"
              v-else
              v-b-tooltip.hover
              title="You must be logged in to do it!"
              disabled
            >
              Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pencil from "vue-material-design-icons/Pencil";
import moment from "moment";
export default {
  name: "v-support",
  components: { pencil },
  data() {
    return {
      token: this.$store.state.token,
      enabled: false,
      supporterStatus: {
        expires_at: 0,
        expires_at_localizated: "",
      },
      qiwi: {
        number: "",
      },
      gift: {
        username: "",
        user: ''
      },
      sign: "",
      months: 1,
      generationResult: {
        id: 0,
        phone: null,
        email: 'mail@​gmail.com',
        lifetime: 0,
        userid: 1666,
        guid: '0',
        state: 'WAITING',
        type: 'SELF',
        gift_by: 0,
        sign: ''
      },
    };
  },
  methods: {
    async pay(system) {
      if (this.gift.username.trim() != "") {
        let userResponse = await fetch(`https://astellia.club/frontend/api/v1/users/whatid?u=${this.gift.username}`).then(res => res.json());
        if(!!parseInt(userResponse.id)) return alert('Invalid username!')
      }

      //window.location.href = `https://astellia.club/frontend/api/v1/donations/support?m=${this.months}&phone=null&token=${this.token}&m=${this.months}${this.gift.username == '' ? '' : `&username=${this.gift.username}`}`;
    },
  },
  async mounted() {
    if (!localStorage.getItem("token"))
      return this.$router.push({
        path: "/",
      });

    this.supporterStatus = await fetch("/frontend/api/v1/donations/status", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).then((d) => d.json());
    this.supporterStatus.expires_at_localizated = moment
      .duration(this.supporterStatus.expires_at)
      .humanize();

    this.enabled = true;
  },

  watch: {
    "gift.username": async function (val) {
//      let user = await fetch(`https://astellia.club/frontend/api/v1/users/whatid?u=${val}`, {mode: "no-cors"} ).then(res => res.json());
      let user = await fetch(`/frontend/api/v1/users/whatid?u=${val}`).then(res => res.json());
      this.gift.user = user.result;
      if (!user.result) this.enabled = false;
      else {
        
        this.enabled = true
        
        let f = await fetch(
          `/frontend/api/v1/donations/generate?m=${
            this.months
          }&username=${val == "" ? "auto" : val}&token=${this.token}`
        ).then(res => res.json());

        this.generationResult = f;

        };
      
    },

    "enabled": async function (val){
      

    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

.btn__pay {
  margin-top: 20px;
  padding: 5px 20px;
  border: 0;
  border-radius: 10px;
  color: #fff;
  background: #302e63;
}

.input__nickname {
  border-radius: 5px;
  border: 0;
  font-family: "geoma_regular_demoregular";
  background: #302e63;
  color: #fff !important;
  margin-top: 20px;
  padding: 10px 10px;
}

.slider__container {
  margin: 0 auto;
  width: 30%;
  margin-top: 100px;
}

.supporter__banner {
  margin: 0 auto;
  width: 100%;
  background: url("https://images-ext-2.discordapp.net/external/-T2N5DuiwfhfzyOh-nWjGjSufHtUGarrOhrgunpqqlI/https/i.imgur.com/6IwBYsp.png?width=1442&height=94");
  height: 100px;
  text-align: center;
  padding-top: 20px;
  margin-top: 100px;
}

.supporter__banner h1 {
  color: black;
}

.slider {
  width: 100%;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.bonus__title {
  margin-top: 10px;
  font-weight: 500;
}

.square__number {
  width: 40px;
  height: 40px;
  background: #302e63;
  border-radius: 5px;
  text-align: center;
  font-size: 24px;
}

.supporter__row__container {
  margin: 0 auto;
  width: 90%;
  padding-top: 40px;
}

.flex {
  display: flex;
}

.supporter__header {
  margin-left: 80px;
  padding-top: 70px;
  font-family: "geoma_regular_demoregular";
}

.supporter__container__info h1,
h2,
h3,
h4,
h5,
p,
li,
ul {
  font-family: "geoma_regular_demoregular";
}

.supporter__container__info {
  background-color: #21263e;
  width: 80%;
  height: 800px;
  margin: 0 auto;
  margin-top: 5px;
  font-family: "geoma_regular_demoregular";
}

.purchase__button {
  border: 0;
  border-radius: 10px;
  background-color: #302e63;
  color: #fff;
  padding: 5px 15px;
}

.purchase__button:hover {
  border: 0;
  border-radius: 10px;
  background-color: #292de3;
  color: #fff;
  padding: 5px 15px;
}

.supporter__header h2 {
  color: #fff;
}

.supporter__container {
  margin: 0 auto;
  background-color: #21263e;
  width: 80%;
  height: 300px;
  margin-top: 100px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.supporter__img {
  margin-left: 80%;
  margin-top: -300px;
}
</style>