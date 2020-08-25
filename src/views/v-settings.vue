<template>
    <b-overlay :show="!loaded">
    <div class="settings">

        <form>
            <div class="DataGroup">
                <div class="DataGroupTitle">
                    Account
                </div>
                <div class="DataInputs">
                    <span>Username <input v-model="data.username" type="text" disabled></span>

                    <br>

                </div>
            </div>
            <hr>
            <div class="DataGroup">
                <div class="DataGroupTitle" style="padding: 0 !important;">
                    Avatar
                </div>
                <div class="DataInputs">
                    <br>

                    <div  style="display: flex; flex-direction: column; width: auto; align-items: center;">
                        <img :src="avatarURL"  height="128px" width="128px" style="object-fit: cover">

                        <input @change="avatarUpload" class="inputFile" id="avatarFile" type="file" accept="image/png, image/jpeg">
                        <label class="uploadeBtn" for="avatarFile">Upload</label>

                    </div>
                </div>
            </div>

            <hr>
            <div class="DataGroup">
                <div class="DataGroupTitle">
                    Personalization
                </div>

                <div class="DataInputs">
                    <div class="DataInput">
                        <span>Use NC instead of DT<b-form-checkbox v-model="settings.nc_instead_dt" switch /></span>
                    </div>

                </div>
            </div>
            <div class="DataGroup">
                <div class="DataGroupTitle">
                    Security
                </div>

                <div class="DataInputs">
                    <div class="DataInput">
                       <span>Email<input v-model="data.email"></span><br>
                        <span>New password<input v-model="data.newpassword"></span><br>
                        <span>Current password<input v-model="data.currentpassword"></span><br>
                        <button>Save</button>
                    </div>

                </div>
            </div>

        </form>

    </div>
    </b-overlay>
</template>

<script>
    import { mapState, mapActions  } from 'vuex';
    export default {
        name: "v-settings",
        ...mapState(['token']),
        ...mapActions(['infoAlert', 'errorAlert']),
        data(){
            return {
                token: this.$store.state.token,
                nc_instead_dt: false,
                userdata: null,
                data: {
                    username: null
                },
                settings: {
                    nc_instead_dt: false
                },
                avatarURL: '',
                avatarStyle: '',
                loaded: false
            }
        },
        methods: {
            avatarUpload(file){
                this.loaded = false;
                const data = new FormData();
                data.append('File', file.target.files[0]);
                this.axios.post('/frontend/api/v1/updateUser/avatar', data, {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    this.avatarURL = this.avatarURL + `?t=${Date.now()}`
                    this.$store.dispatch('infoAlert', {
                        message: `Your avatar is uploaded to the server, if it hasn't changed on the site, press CTRL+F5.`,
                        $bvtoast: this.$bvToast
                    });
                    this.loaded = true;
                }).catch(e => {
                    this.loaded = true;
                    this.$store.dispatch('errorAlert', {
                        message: e.response,
                        $bvtoast: this.$bvtoast
                    });

                })
            },
            async fetchUserData(){
                this.userdata = await this.axios.get('/frontend/api/v1/user/@me', {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => res.data)
                .catch(e => {
                    this.$store.dispatch('errorAlert', {
                        message: 'Please log in first!'
                    });
                    this.$bvModal.show('LoginModal');
                    this.$router.push({path: '/'});

                });

                this.data = {
                    url: `/u/${this.userdata.id}`,
                    username: this.userdata[0].username,
                    email: '',
                    new_password: '',
                    currentpassword: ''
                }
                this.avatarURL = `https://astellia.club/frontend/api/v1/avatar/${this.userdata[0].id}`;

                this.nc_instead_dt = this.userdata.nc_instead_dt ? this.userdata.nc_instead_dt : false
                this.settings = this.userdata[1];
                this.loaded = true;
            }
        },

        watch: {
            'settings.nc_instead_dt'(val, oldval){
                if(!this.loaded) return;
                this.loaded = false;
                this.settings.nc_instead_dt = val;
                this.axios.patch('/frontend/api/v1/updateUser', this.settings, {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {this.loaded = true}).catch(e => {
                    this.$router.push({path: '/'})
                });
            }
        },
        mounted() {
            this.fetchUserData();
        },
        metaInfo: {
            title: 'Settings'
        }
    }
</script>

<style scoped>

button {
    outline: none;
    background-color: #5639AC;
    border: 1px solid #5639AC;
    color: white;
    margin-top: 15px;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    transition: 0.2s;
}

button:hover {
    background-color: #5639D5;
    border: 1px solid #5639D5;
}

.settings {
    background-color: #302E38;
}
.view {
    width: 70%;
    margin: 0 auto;
}

.settings {
    border-radius: 30px;
    margin: 30px;
}

span input {
    margin: 0 10px;
    transition: 0.4s;
}
span {
    display: inline-flex;
    justify-content: space-between;
    width: 400px;
}

span:not(:first-child) {
    margin-top: 10px;
}

form {
    padding: 40px;
}

.inputFile {

    height: 0.1px;
    width: 0.1px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    z-index: -1;
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
}

.uploadeBtn:hover {
    background-color: #5639D5;
    border: 2px solid #5639D5;
}
input {
    outline: none;
    margin: 0;
    background: none;
    background-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 4px;
    flex: 1;
    max-width: 250px;
    align-self: stretch;
    background-color: #3D3946;
    border: 2px solid transparent;
    color: #fff;
    font-weight: 400;
    padding: 5px;
}

input:focus {
    border: 3px solid #C2B8E0;
}

.DataGroupTitle {
    font-size: 32px;
    padding: 1.5rem;
}


    .grouptitle {
        font-size: 30px;
    }


</style>