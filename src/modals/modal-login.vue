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





                <b-button type="submit" block variant="primary">Login</b-button>
            </b-form>
        </b-overlay>

    </div>

</template>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        name: "Login",
        ...mapActions(['login', 'errorAlert', 'infoAlert']),
        ...mapState(['ip']),
        data() {
            return {
                username: '',
                password: '',
                captcha: '',
                show: true,
                logining: false
            }
        },
        methods: {
            async verifyCaptcha(){
                await this.$recaptchaLoaded();

                const token = await this.$recaptcha('login');
                if(!token) return this.$store.dispatch('errorAlert', {$bvtoast: this.$bvToast, title: 'Error!', message: 'Cannot valid captcha, maybe you are robot?'});
                this.captcha = token;
            },
            onSubmit(){

                this.logining = true;
                this.$store.dispatch({
                    type: 'login',

                    login: this.username,
                    password: this.password,
                    captcha: this.captcha,
                    $bvtoast: this.$bvToast,
                    ip: this.$store.state.ip
                }).then(r => {
                    this.logining = false;
                    this.verifyCaptcha();
                    this.$store.dispatch('infoAlert', {$bvtoast: this.$bvToast, title: 'Info', message: 'Authorization successful!'});
                }).catch(e => {
                    this.verifyCaptcha();
                    this.logining = false;
                    this.$store.dispatch('errorAlert', {$bvtoast: this.$bvToast, title: 'Error!', message: e});
                });

            },

        },
        mounted() {
            this.verifyCaptcha()
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