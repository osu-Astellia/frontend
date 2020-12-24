<template>
    <div class="content">
        <b-overlay :show="logining">
            <b-form>
                Registration is moved to game! if you don't have a game, <a href="https://m1.ppy.sh/r/osu!install.exe"> CLICK HERE</a>, or dowload <a href="https://github.com/MinisBett/ultimate-osu-server-switcher/releases/download/1.4/UltimateOsuServerSwitcher.exe">Swticher</a> to switch to astellia!<br>
                In game click options -> Register account -> Fill all fields and press "Register".
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