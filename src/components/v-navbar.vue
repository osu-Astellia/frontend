<template>
    <div class="topPanel">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand to="/"><div class="custom-nav-logo"></div></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item><router-link to="/leaderboard">Leaderboard</router-link></b-nav-item>
                   
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <div v-if="token && data" right class="profileavatar" :style="userbgStyle" @click="isOpenDropdown = !isOpenDropdown"></div>
                    <b-nav-item v-else style="padding: 0 !important;">


                        <b-nav-item-dropdown right>
                            <template v-slot:button-content >
                                <AccountIcon /> Guest
                            </template>
                            <b-dropdown-item v-b-modal.LoginModal class="black-link">
                                Login
                            </b-dropdown-item>

                            <b-modal id="LoginModal" hide-footer title="Log In">
                                <Login />
                            </b-modal>


                            <b-dropdown-item v-b-modal.registerModal class="black-link">Register</b-dropdown-item>

                            <b-modal id="registerModal" hide-footer title="Register an Account">
                                <modal-register />
                            </b-modal>
                        </b-nav-item-dropdown>

                    </b-nav-item>




                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <transition name="fade" appear>
            <div class="usermenu hidden mr-auto" v-if="isOpenDropdown && data">
                <div class="usermenuBG" :style="userbgStyle"></div>
                <div class="usermenumenu" @click="isOpenDropdown = !isOpenDropdown">

                    <router-link :to="data.url" class="usermenulink">Profile</router-link><br>
                    <router-link to="/profile/settings" class="usermenulink">Settings</router-link><br>
                    <a :style="{color: 'white'}" @click.prevent="logout" class="usermenulink logoutbtn">Logout</a><br>
                </div>

            </div>
        </transition>
    </div>


</template>

<script>

    import {mapState, mapActions} from 'vuex'
    import Login from "../modals/modal-login";
    import ModalRegister from "../modals/modal-register";
    import AccountIcon from 'vue-material-design-icons/Account';



    export default {
        ...mapActions(['logout']),
        ...mapState(['token']),
        name: "v-navbar",
        components: {ModalRegister, Login, AccountIcon},
        data(){
            return {
                token: this.$store.state.token,
                settings: null,
                data: null,
                isOpenDropdown: false,
                userbgStyle: '',
            }
        },
        methods: {
            getToken(){
                return localStorage.getItem('token');
            },
//s
            logout(){
                this.isOpenDropdown = !this.isOpenDropdown;
                
                this.$store.dispatch('logout', {});
                this.data = null;
                this.settings = null;
                this.$forceUpdate();
                

            },
            async fetchUserData(token = this.token){

                if(!token) return;
                this.userdata = await this.axios.get('/api/users/me', {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    this.user = res.data;

                });
                this.data = {
                    url: `/u/${this.user.id}`,
                    username: this.user.username,
                    id: this.user.id
                };

                let avatarStatus = await fetch(`https://a.astellia.club/${this.data.id}`);
                if(!avatarStatus.ok || !this.data) {
                    
                    this.userbgStyle = `background-image: url(https://i1.sndcdn.com/avatars-32EHFzqYhcwAzmuk-mE2q0g-t500x500.jpg); background-size: cover;`;
                } else {
                    this.userbgStyle = `background-image: url(https://a.astellia.club/${this.data.id}); background-size: cover;`;
                }
                


            },

            getUsername(){
                if(!this.userdata) return this.fetchUserData().then(r => this.userdata.username);
                return this.userdata.username;
            }
        },
        watch: {

        },

        async mounted() {

            this.$store.subscribe((action, state) => {

              if(action.type === 'removeToken') {
                this.token = '';
                this.data = undefined;
              }else{
                this.token = action.payload.token;
                this.fetchUserData(this.token);
              }

            })
            
            if(this.token) await this.fetchUserData();
        }
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap');


@media only screen and (max-width: 900px) {
    .usermenu {
        width: 100% !important;
        right: 0 !important;
    }

    .usermenuBG {
        width: 100% !important;
    }

    .usermenumenu {
        text-align: center;
    }

    .navbar-collapse  {
        text-align: center !important;
        
    }
    .profileavatar {
        margin: 0 auto;
    }
}
* {
    font-family: 'Comfortaa', cursive;

}
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

.dropdown-menu {
    transition: 0.4s;
}

.logoutbtn:hover {
    cursor: pointer;
    color: #869aff;
    text-decoration: none;
}
    a.black-link {
        color: black !important;
        transition: 0.4s;
        text-decoration: none;
    }

    a.black-link:hover {
        color: burlywood;
        text-decoration: none;
    }

    .navbar {
        background-color: #21263e;
        transition: 200ms background-color;

        box-shadow: none;
        width: 100%;
    }

    a {
        margin: 0 3px;
        text-decoration: none;
        color: white;
        transition: 0.4s;
    }

    a:hover {
        color: #869aff;
        text-decoration: none;
    }

    .nav-link {
        padding: 0 !important;
    }

    .avatar {
        width: 48px;
        height: 48px;
        padding: 0;
    }
.navbar-brand {
    color: black;
}

    .custom-nav-logo {
        width: 32px;
        height: 32px;
        background-image: url("/static/uoss_logo.png");
        background-size: cover;
        transition: 0.3s;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
	    transform: scale(1);
        animation: pulse 1s infinite;
    }

    .custom-nav-logo:hover {
        opacity: 1;
        will-change: inherit;
        transform: scale(1.3);
        animation: none;
    }




    .profileavatar {
        width: 48px;
        height: 48px;
        background-size: cover;
        background-position: center;
        transition: 0.3s;
        border: 3px solid transparent;
        border-radius: 60px;
        background-repeat: no-repeat;
    }

    .profileavatar:hover {
        cursor: pointer;
    }
    .usermenuBG {
        width: 130px;
        height: 117px;
        filter: brightness(0.4);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-top: 2px solid #18171C;
        border-left: 2px solid #18171C;
        border-right: 2px solid #18171C;
    }
    .usermenu {
        border-radius: 10px;
        background-color: #18171C;
        z-index: 999;
        display: inline-block;
        width: 130px;
        height: 250px;
        position: absolute;
        right: 1%;
        margin-right: 100px;
        transition: 0.2s;
    }

    .usermenumenu {
        margin-top: 20px;
    }

    a.usermenulink {
        padding: 0 20px;
    }


    @font-face {
        font-family: 'geoma_regular_demoregular';
        src: url('/static/fonts/geoma-demo.regular-demo-webfont.woff2') format('woff2'),
        url('/static/fonts/geoma-demo.regular-demo-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;

    }


@keyframes pulse {
    0% {
        transofrm: scale(0.9);
     
    }
	50% {
		transform: scale(1.2);

	}

    50% {
		transform: scale(0.9);

	}
}

</style>