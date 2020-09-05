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
                    <div right class="profileavatar" :style="userbgStyle" @click="isOpenDropdown = !isOpenDropdown"></div>
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
                <div class="usermenumenu">

                    <router-link :to="data.url" class="usermenulink">Profile</router-link><br>
                    <router-link to="/profile/settings" class="usermenulink">Settings</router-link><br>
                    <router-link to="#" @click.prevent="logout" class="usermenulink logoutbtn">Logout</router-link><br>
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
                userbgStyle: ''
            }
        },
        methods: {
//s
            logout(){
                this.$store.dispatch('logout')
            },
            async fetchUserData(){
                this.userdata = await this.axios.get('/frontend/api/v1/user/@me', {
                    headers: {
                        'Authorization': this.token
                    }
                }).then(res => {
                    this.user = res.data;

                });
                this.data = {
                    url: `/u/${this.user[0].id}`,
                    username: this.user[0].username,
                    id: this.user[0].id
                };
                this.userbgStyle = `background-image: url(https://astellia.club/frontend/api/v1/avatar/${this.data.id})`;


            },

            getUsername(){
                if(!this.userdata) return this.fetchUserData().then(r => this.userdata.username);
                return this.userdata.username;
            }
        },
        watch: {

        },

        async mounted() {
            await this.fetchUserData();
        }
    }
</script>

<style scoped>

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
    }

    .custom-nav-logo:hover {
        opacity: 1;
        will-change: inherit;
        transform: scale(1.3);
    }




    .profileavatar {
        width: 48px;
        height: 48px;
        background-size: cover;
        background-position: center;
        transition: 0.3s;
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
        z-index: 2;
        display: inline-block;
        width: 130px;
        height: 250px;
        position: absolute;
        right: 1%;
        margin-right: 100px;
        top: 7%;
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

    * {
    font-family: 'geoma_regular_demoregular'
    }
</style>