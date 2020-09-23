<template>
    <div class="content">
        <b-overlay :show="logining">
            <b-form @submit.prevent="onSubmit">


                <b-form-group
                        style="padding-top: 20px"
                        id="input-group-1"
                        label="Username"
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

                <b-form-group id="input-group-2" label="Your Password" label-for="input-2">
                    <b-form-input
                            type="password"
                            id="input-2"
                            v-model="password"
                            required
                            placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Email" label-for="input-3">
                    <b-form-input
                            type="email"
                            id="input-3"
                            v-model="email"
                            required
                            placeholder="Email"
                    ></b-form-input>
                </b-form-group>

               <!-- <b-form-group id="input-group-4" label="Avatar (Optional)" label-for="input-4">
                    <div  style="display: flex; flex-direction: column; width: auto; align-items: center;">
                        <img v-if="avatarURL" :src="avatarURL"  height="128px" width="128px" style="object-fit: cover">

                        <input @change="avatarUpload" class="inputFile" id="avatarFile" type="file" accept="image/png, image/jpeg">
                        <label class="uploadeBtn" for="avatarFile">Upload</label>

                    </div>
                </b-form-group> -->




                <b-button type="submit" block variant="primary">Register</b-button>
            </b-form>
        </b-overlay>

    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "modal-register",
        ...mapActions(['register', 'errorAlert', 'infoAlert']),
        ...mapState(['ip']),
        data() {
            return {
                username: '',
                password: '',
                captcha: '',
                email: '',
                show: true,
                avatar: '',
                avatarURL: '',
                logining: false,
                avatarFile: null
            }
        },
        methods: {
            avatarUpload(file){
                let fr = new FileReader();
                fr.onload = ()=> {
                    console.log('as')
                    this.avatarURL = fr.result;
                }
                fr.readAsDataURL(file.target.files[0]);
                this.avatarFile = file.target.files[0];

              //this.avatarURL = file.target.files[0].bytes;
            },
            onSubmit(){

                this.logining = true;


                this.$store.dispatch({
                    type: 'register',

                    login: this.username,
                    password: this.password,
                    email: this.email,
                    captcha: this.captcha,
                    $bvtoast: this.$bvToast,
                    ip: this.$store.state.ip,
                    $store: this.$store,
                    $bvModal : this.$bvModal
                }).then(r => {
                    this.verifyCaptcha();
                    this.logining = false;
                    let token = this.$store.state.token;
                    if(this.avatarFile){
                        let fm = new FormData();
                        fm.append('File', this.avatarFile);
                        fetch('/frontend/api/v1/updateUser/avatar', {
                            method: 'POST',
                            body: fm
                        })
                    }
                }).catch(e => {
                    this.verifyCaptcha();
                    this.logining = false;
                });





            },

            async verifyCaptcha(){
                await this.$recaptchaLoaded();

                const token = await this.$recaptcha('login');
                if(!token) return this.$store.dispatch('errorAlert', {$bvtoast: this.$bvToast, title: 'Error!', message: 'Cannot valid captcha, maybe you are robot?'});
                this.captcha = token;
            }
        },
        mounted() {
            this.verifyCaptcha();
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
    .uploadeBtn {
        display: inline-block;
        height: 30px;
        width: 128px;
        background-color: #5639AC;
        margin-top: 10px;
        border: 2px solid #5639AC;
        border-radius: 10px;
        transition: 0.4s;
        color: white;
    }

    .uploadeBtn:hover {
        background-color: #5639D5;
        border: 2px solid #5639D5;
    }
    .inputFile {

        height: 0.1px;
        width: 0.1px;
        opacity: 0;
        visibility: hidden;
        position: absolute;
        z-index: -1;
    }
</style>