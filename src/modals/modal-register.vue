<template>
    <div class="content">
        <b-overlay :show="logining">
            <b-form @submit.prevent="onSubmit">


                <b-form-group
                        style="padding-top: 20px"
                        id="input-group-1"
                        label="Username:"
                        label-for="input-1"
                >
                    <b-form-input


                            id="input-1"
                            v-model="username"
                            type="text"
                            required
                            placeholder="Enter Username"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                    <b-form-input
                            type="password"
                            id="input-2"
                            v-model="password"
                            required
                            placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Email:" label-for="input-3">
                    <b-form-input
                            type="email"
                            id="input-3"
                            v-model="email"
                            required
                            placeholder="Email"
                    ></b-form-input>
                </b-form-group>


                <b-form-group id="input-group-4" label="Please make us sure you are not a bot" label-for="input-3">
                    <vue-recaptcha v-model="captcha" sitekey="6LcQU9AUAAAAADuMdR5KDNLZa3TfDzFW6amhOBdj" :loadRecaptchaScript="true"></vue-recaptcha>
                </b-form-group>



                <b-button type="submit" block variant="primary">Login</b-button>
            </b-form>
        </b-overlay>

    </div>
</template>

<script>
    import VueRecaptcha from "vue-recaptcha";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "modal-register",
        components: {VueRecaptcha},
        ...mapActions(['register', 'errorAlert']),
        ...mapState(['ip']),
        data() {
            return {
                username: '',
                password: '',
                captcha: '',
                email: '',
                show: true,
                logining: false
            }
        },
        methods: {
            onSubmit(){

                this.logining = true;


                this.$store.dispatch({
                    type: 'register',

                    login: this.username,
                    password: this.password,
                    email: this.email,
                    captcha: this.captcha,
                    $bvtoast: this.$bvToast,
                    ip: this.$store.state.ip
                }).then(r => {
                    this.logining = false;
                }).catch(e => {
                    this.logining = false;
                });

            }
        }
    }
</script>

<style scoped>

    #rc-anchor-container {
        margin: 0 auto;
    }

    .bv-no-focus-ring {
        padding: 0 150px;
    }


    button {
        margin: 0 auto;
        background-color: purple;
        border: 0px solid purple;
        transition: 0.4s;
        padding: 10px 20px;
        color: white;
        border-radius: 10px;

    }

    button:hover {
        background-color: black;
        border: 0px solid white;
        color: white;

    }
    .content {
        width: 300px;
        height: auto;
    }
    * {
        margin: 0 auto;
        text-align: center;
    }
</style>