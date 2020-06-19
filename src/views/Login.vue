<template>

    <div class="content">
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


            <b-form-group id="input-group-3" label="Please make us sure you are not a bot" label-for="input-3">
                <vue-recaptcha class="mx-auto" v-model="captcha" sitekey="6LcQU9AUAAAAADuMdR5KDNLZa3TfDzFW6amhOBdj" :loadRecaptchaScript="true"></vue-recaptcha>
            </b-form-group>



            <button type="submit">Submit</button>
        </b-form>
    </div>

</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';
    import { mapActions } from 'vuex';
    export default {
        name: "Login",
        components: {VueRecaptcha},
        ...mapActions(['login']),
        data() {
            return {
                username: '',
                password: '',
                captcha: '',
                show: true
            }
        },
        methods: {
            onSubmit(){


                this.$store.dispatch({
                    type: 'login',

                    login: this.username,
                    password: this.password
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
    .content {
        padding-top: 25px;
    }
input {

    text-align: center;
    margin: 0 auto;
    width: 25%;
    padding: 0 10px;
    border: 0px solid white;
    border-radius: 10px;
}

button {
    margin-bottom: 20px;
    background-color: purple;
    border: 0px solid purple;
    transition: 0.4s;
    padding: 10px 20px;
    color: white;
    border-radius: 10px;
}

button:hover {
    background-color: white;
    border: 0px solid white;
    color: black;
}

    .content {

        background-color: #2c3e50;
        padding: 0;
        margin: 0;
    }
</style>