<template>
    <div>

        <div class="supporter__container">


            <div class="supporter__header">
                <div class="supporter__status">
                    You are 
                    <bold v-if="supporterStatus.expires_at > Date.now() / 1000">
                        Supporter for {{ supporterStatus.expires_at_localizated }}
                        
                        </bold>
                        
                        <bold v-else>Not supporter</bold>
                        <br>
                        I don't know what i can put on this place
                </div>

                <div class="supporter__image">
                    <img src="/imgs/old.nekoha.png" height="400">
                </div>
            </div>


            <div class="supporter__perks">
                

                <div class="supporter__perk">

              

                    <div class="supporter__perk__title">
                        Change your nickname
                    </div>
                    <div class="supporter__perk__description">
                        You can change your nickname on our server
                    </div>
                </div>

                <div class="supporter__perk">

              

                    <div class="supporter__perk__title">
                        Customazible line
                    </div>
                    <div class="supporter__perk__description">
                        Customazible line bellow your badges and country
                    </div>
                </div>


                <div class="supporter__perk">

              

                    <div class="supporter__perk__title">
                        Special role on our server!
                    </div>
                    <div class="supporter__perk__description">
                        You can get special role on our server!
                    </div>
                </div>

                <div class="supporter__perk">

              

                    <div class="supporter__perk__title">
                        and much more!
                    </div>
                    <div class="supporter__perk__description">
                        check this page often to learn about new perks
                    </div>
                </div>
            </div>



            <div class="supporter__payment">
                <div class="supporter__payment__title">
                    Get supporter
                </div>
                
                <div v-if="supporterStatus.expires_at > Date.now() / 1000" class="supporter__payment__already">
                    You already supporter
                </div>

                <div class="supporter__payment__select" v-else>

                    <div class="supporter__payment__paywith">
                        Pay with
                    </div>
                    <img class="supporter__payment__qiwi" v-b-modal.supporter__pay__qiwi src="https://static.qiwi.com/img/qiwi_com/header/qiwi-wallet-logo.svg" width=128 height="128">

                    <b-modal id="supporter__pay__qiwi" hide-footer title="Pay it with Qiwi/Card">
                            <form ref="form" @submit.stop.prevent="pay('qiwi')">
                                <b-form-group
                             
                                label="Phone Number"
                                label-for="name-input"
                                invalid-feedback="Number is required"
                                >
                                <b-form-input
                                    id="number-input"
                                    v-model="qiwi.number"
                                   
                                    required
                                ></b-form-input>
                                </b-form-group>

                                <button class="supporter__payment__qiwi__pay" type="submit">Pay with Qiwi/Card</button>
                            </form>
                    </b-modal>
                </div>
                
            </div>


            
        </div>
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
                
            }
        },
        async mounted(){

            let token = 'd4e0207c-f3cf-447d-a22e-17f6e9ab7444';
            this.supporterStatus = {
                expires_at: 0,
                expires_at_localizated: moment.duration(0).humanize()
                
                
                } /* await fetch('https://astellia.club/frontend/api/v1/donations/status', {
              
                headers: {
                    'Authorization': token
                }
            }).then(d => d.json());*/
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.supporter__payment__qiwi__pay {
    margin: 0 auto;
    background-color: purple;
    border: 0px solid purple;
    transition: 0.4s;
    padding: 10px 20px;
    color: white;
    border-radius: 10px;
    width: 100%;
    

}

.supporter__payment__qiwi__pay:hover {
    background-color: black;
    border: 0px solid white;
    color: white;

}


.supporter__container {
    margin: 0 auto;
    background-color: #222533;
    width: 90%;
    height: auto;
    min-height: 30%;
    border-radius: 5px;
}


.view {
    margin: 0 0 !important;
    
}


.supporter__header {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
}

.supporter__status {
    margin-top: 5rem;
    font-family: 'Poppins', sans-serif;
}

.supporter__perks {
    margin-top: 2rem;
    display: flex;
    padding: 0 50px;
    align-items: flex-start;
    flex-wrap: nowrap;
}

.supporter__perk {
    display: block;
    border: 2px solid white;
    height: auto;
    width: auto;
    flex: 1;
    min-height: 150px;


}


.supporter__perk__title {
    font-size: 24px;
    color: gold;
}

.supporter__payment__qiwi {
    cursor: pointer;
}

.supporter__payment__title {
    font-size: 32px;
}

.supporter__payment__already {
    font-size: 28px;
}

.supporter__payment__paywith {
    font-size: 28px;
}

.supporter__payment__qiwi {
    text-align: center;
    margin: 0 auto;
}

.supporter__payment__qiwi {
    text-align: center;
    margin: 0 auto;
}
</style>