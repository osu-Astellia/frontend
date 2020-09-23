<template>
    <div class="page">
        <div class="supporter__container">
            <div class="supporter__header">
                <div class="supporter__text">
                    <h2>Purchase supporter</h2>
                    <p>vstavit' suda vue script na proverku supportera</p>
                </div>
                <a id="to__purchase"><button class="purchase__button">Purchase</button></a>
                <div class="supporter__img">
                    <img src="/imgs/old.nekoha.png" height="400">
                </div>
            </div>
        </div>
        <div class="supporter__container__info">
            <div class="supporter__row__container">
                <div class="row flex">
                    <div class="col-3">
                        <div class="square__number">
                            1
                        </div>
                        <h4 class="bonus__title">Change your nickname</h4>
                        <p class="bonus__body">You can change your nickname on our server</p>
                    </div>
                    <div class="col-3">
                        <div class="square__number">
                            2
                        </div>
                        <h4 class="bonus__title">Customazible line</h4>
                        <p class="bonus__body">Customazible line bellow your badges and country</p>
                    </div>
                    <div class="col-3">
                        <div class="square__number">
                            3
                        </div>
                        <h4 class="bonus__title">Special role on our server!</h4>
                        <p class="bonus__body">You can get special role on our server!</p>
                    </div>
                    <div class="col-3">
                        <div class="square__number">
                            4
                        </div>
                        <h4 class="bonus__title">and much more!</h4>
                        <p class="bonus__body">check this page often to learn about new perks</p>
                    </div>
                </div>
            </div>
            <div class="" id="">
                <h1 style="color: white;">Purchase supporter</h1>
            </div>
            <div class="slider__container">
                <input type="range" min="1" max="12" value="1" class="slider" id="myRange" v-b-tooltip.focus
  title="suda chenu">
                <div class="text-center">
                    <input class="input__nickname" type="text" placeholder="Nickname">
                </div>
                <div class="text-center">
                    <button class="btn__pay">Purchase</button>
                </div>
            </div>
        </div>
    <b-tooltip target="link-button" show="True" title="suda chenu" triggers="focus">
      suda chenu
    </b-tooltip>
    </div>
</template>

<script>

import pencil from 'vue-material-design-icons/Pencil';
import moment from 'moment'
    export default {
        name: "v-support",
        components: {pencil},
        data(){
            return {
                token: this.$store.state.token,
                supporterStatus: {
                    expires_at: 0,
                    expires_at_localizated: ''
                },
                qiwi: {
                    number: ''
                }
            }
        },
        methods: {
            pay(system){

                window.location.href = `https://astellia.club/frontend/api/v1/donations/support?phone=${this.qiwi.number}&token=${this.token}`;
                
            },
        },
        async mounted(){

            let token = 'd4e0207c-f3cf-447d-a22e-17f6e9ab7444';
            this.supporterStatus = await fetch('/frontend/api/v1/donations/status', {
              
                headers: {
                    'Authorization': token
                }
            }).then(d => d.json());
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.btn__pay {
    margin-top: 20px;
    padding: 5px 20px;
    border: 0;
    border-radius: 10px;
    color: #fff;
    background: #302E63;
}

.input__nickname {
    border-radius: 5px;
    border: 0;
    font-family: 'geoma_regular_demoregular';
    background: #302E63;
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
    background: #4CAF50;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

.bonus__title {
    margin-top: 10px;
    font-weight: 500;
}

.square__number {
    width: 40px;
    height: 40px;
    background: #302E63;
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
    font-family: 'geoma_regular_demoregular';
}

.supporter__container__info h1, h2, h3, h4, h5, p, li, ul {
    font-family: 'geoma_regular_demoregular';
} 

.supporter__container__info {
    background-color: #21263E;
    width: 80%;
    height: 800px;
    margin: 0 auto;
    margin-top: 5px;
    font-family: 'geoma_regular_demoregular';
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
    background-color: #21263E;
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